// 校验更新日志，由 GitHub Action 和本地发版时运行：node scripts/check-changelog.mjs
// 规则：每个版本一个 JSON，必须同时有中文和英文，条数相同；下载页的版本必须已有日志。
// 网站放在主仓库的 website/ 目录下运行时，还会核对主程序当前版本；Action 里没有主程序，跳过这项。
import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const websiteDir = join(dirname(fileURLToPath(import.meta.url)), '..');
const repoDir = join(websiteDir, '..');
const dir = join(websiteDir, 'changelog');
const errors = [];
const seen = new Set();
const HAN = /\p{Script=Han}/u;

for (const name of readdirSync(dir).filter((f) => f.endsWith('.json'))) {
  const fail = (message) => errors.push(`${name}: ${message}`);
  let entry;
  try {
    entry = JSON.parse(readFileSync(join(dir, name), 'utf8'));
  } catch (error) {
    fail(`JSON 无法解析：${error.message}`);
    continue;
  }
  const { product, version, date, zh, en } = entry;
  if (product !== 'android' && product !== '3ds') fail('product 只能是 android 或 3ds');
  if (!/^\d+\.\d+\.\d+$/.test(version ?? '')) fail('version 必须是 x.x.x');
  if (name !== `${product}-${version}.json`) fail(`文件名应为 ${product}-${version}.json`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date ?? '') || Number.isNaN(Date.parse(date))) fail('date 必须是 YYYY-MM-DD');
  for (const [key, label] of [['zh', '中文'], ['en', '英文']]) {
    const list = entry[key];
    if (!Array.isArray(list) || list.length === 0) fail(`缺少${label}日志（${key}）`);
    else if (list.some((line) => typeof line !== 'string' || !line.trim())) fail(`${key} 含有空条目`);
  }
  if (Array.isArray(zh) && Array.isArray(en)) {
    if (zh.length !== en.length) fail(`中文 ${zh.length} 条，英文 ${en.length} 条，条数必须相同`);
    zh.forEach((line, i) => { if (!HAN.test(line)) fail(`zh 第 ${i + 1} 条没有中文`); });
    en.forEach((line, i) => { if (HAN.test(line)) fail(`en 第 ${i + 1} 条含有中文`); });
  }
  seen.add(`${product}-${version}`);
}

function currentVersion(file, pattern) {
  const path = join(repoDir, file);
  if (!existsSync(path)) return null;
  return readFileSync(path, 'utf8').match(pattern)?.[1] ?? null;
}

const current = [
  ['android', currentVersion('app/build.gradle.kts', /versionName\s*=\s*"([^"]+)"/)],
  ['3ds', currentVersion('3ds/tools/package.py', /VERSION\s*=\s*'([^']+)'/)],
];
for (const [product, version] of current) {
  if (version && !seen.has(`${product}-${version}`)) {
    errors.push(`当前 ${product} 版本是 ${version}，缺少 changelog/${product}-${version}.json`);
  }
}

const download = JSON.parse(readFileSync(join(websiteDir, 'src/data/releases.json'), 'utf8')).products;
for (const [product, { version }] of Object.entries(download)) {
  if (!seen.has(`${product}-${version}`)) {
    errors.push(`下载页的 ${product} 版本是 ${version}，缺少 changelog/${product}-${version}.json`);
  }
}

if (errors.length) {
  console.error(`更新日志校验失败（${errors.length} 项）：`);
  errors.forEach((e) => console.error(`  - ${e}`));
  process.exit(1);
}
console.log(`更新日志校验通过：${seen.size} 个版本，当前 ${current.map(([p, v]) => `${p} ${v}`).join('、')}`);
