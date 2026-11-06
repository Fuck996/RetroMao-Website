// 从本仓库的 GitHub Release 同步下载页数据（src/data/releases.json）。
// 由 .github/workflows/website.yml 运行，也可以本地运行：node scripts/sync-releases.mjs
//
// 规则：只读取已正式发布的 Release；文件名必须是 RetroMao-x.x.x.apk 或 RetroMao-3DS-x.x.x.cia；
// 版本不会回退；仓库不存在或没有匹配文件时保留现有数据。
import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const dataPath = join(dirname(fileURLToPath(import.meta.url)), '../src/data/releases.json');
const api = process.env.GITHUB_API_URL || 'https://api.github.com';
const headers = { Accept: 'application/vnd.github+json', 'User-Agent': 'retromao-website' };
if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;

const PATTERNS = { android: /^RetroMao-(\d+\.\d+\.\d+)\.apk$/, '3ds': /^RetroMao-3DS-(\d+\.\d+\.\d+)\.cia$/ };

const parts = (version) => version.split('.').map(Number);
const compare = (a, b) => {
  const [x, y] = [parts(a), parts(b)];
  return x[0] - y[0] || x[1] - y[1] || x[2] - y[2];
};

async function digestOf(asset) {
  const match = /^sha256:([0-9a-f]{64})$/.exec(asset.digest ?? '');
  if (match) return match[1];
  // 旧 Release 没有摘要字段时，下载后自行计算。
  const response = await fetch(asset.browser_download_url, { headers: { 'User-Agent': headers['User-Agent'] } });
  if (!response.ok) throw new Error(`下载 ${asset.name} 失败：HTTP ${response.status}`);
  return createHash('sha256').update(Buffer.from(await response.arrayBuffer())).digest('hex');
}

const data = JSON.parse(readFileSync(dataPath, 'utf8'));
const response = await fetch(`${api}/repos/${data.repository}/releases?per_page=100`, { headers });
if (response.status !== 404 && !response.ok) throw new Error(`读取 Release 失败：HTTP ${response.status}`);
if (response.status === 404) console.log(`仓库 ${data.repository} 不存在或不公开，保留现有下载数据。`);

const latest = {};
for (const release of response.ok ? await response.json() : []) {
  if (release.draft || release.prerelease) continue;
  for (const asset of release.assets ?? []) {
    for (const [product, pattern] of Object.entries(PATTERNS)) {
      const version = pattern.exec(asset.name)?.[1];
      if (version && (!latest[product] || compare(version, latest[product].version) > 0)) {
        latest[product] = { version, asset };
      }
    }
  }
}

let changed = false;
for (const [product, found] of Object.entries(latest)) {
  const current = data.products[product];
  if (compare(found.version, current.version) < 0) {
    console.log(`${product}：Release 最新为 ${found.version}，低于当前 ${current.version}，不回退。`);
    continue;
  }
  const next = {
    version: found.version,
    file: found.asset.name,
    sizeBytes: found.asset.size,
    sha256: await digestOf(found.asset),
    githubUrl: found.asset.browser_download_url,
  };
  if (JSON.stringify(next) !== JSON.stringify(current)) {
    data.products[product] = next;
    changed = true;
    console.log(`${product}：更新为 ${next.version}`);
  } else {
    console.log(`${product}：已是最新（${next.version}）`);
  }
}

if (changed) writeFileSync(dataPath, `${JSON.stringify(data, null, 2)}\n`);
else console.log('下载数据没有变化。');
