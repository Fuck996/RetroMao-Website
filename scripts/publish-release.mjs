// 把已验证的安装包发布到本仓库的 Release，说明取自更新日志；发布后 Action 自动同步下载页并部署。
// 用法：node scripts/publish-release.mjs <android|3ds> <安装包路径> [Android 签名更新清单]
// 需要已登录的 gh。发布是公开操作，只在确认要对外发布时运行。
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { existsSync, mkdtempSync, readFileSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { basename, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { hasAndroidUpdateManifest, verifyAndroidUpdateManifest } from './android-update.mjs';

const websiteDir = join(dirname(fileURLToPath(import.meta.url)), '..');
const [product, file, updateManifest] = process.argv.slice(2);
const fail = (message) => {
  console.error(message);
  process.exit(1);
};

const PATTERNS = { android: /^RetroMao-(\d+\.\d+\.\d+)\.apk$/, '3ds': /^RetroMao-3DS-(\d+\.\d+\.\d+)\.cia$/ };
if (!PATTERNS[product] || !file) fail('用法：node scripts/publish-release.mjs <android|3ds> <安装包路径>');
if (!existsSync(file)) fail(`找不到文件：${file}`);
const version = PATTERNS[product].exec(basename(file))?.[1];
if (!version) fail(`文件名不符合规则：${basename(file)}`);

const logPath = join(websiteDir, 'changelog', `${product}-${version}.json`);
if (!existsSync(logPath)) fail(`缺少更新日志：${logPath}`);
const log = JSON.parse(readFileSync(logPath, 'utf8'));
if (!log.zh?.length || !log.en?.length) fail('更新日志必须同时有中文和英文。');

const { repository } = JSON.parse(readFileSync(join(websiteDir, 'src/data/releases.json'), 'utf8'));
const sha256 = createHash('sha256').update(readFileSync(file)).digest('hex');
const size = statSync(file).size;
const files = [file];
if (product === 'android' && hasAndroidUpdateManifest(version)) {
  const manifest = updateManifest ?? join(dirname(file), `RetroMao-${version}.update.json`);
  if (!existsSync(manifest) || basename(manifest) !== `RetroMao-${version}.update.json`) {
    fail(`缺少打包时生成的签名更新清单 RetroMao-${version}.update.json`);
  }
  verifyAndroidUpdateManifest(readFileSync(manifest), version, size, sha256);
  files.push(manifest);
}
const tag = `${product}-${version}`;
const title = product === 'android' ? `RetroMao ${version}` : `RetroMao 3DS ${version}`;
const list = (lines) => lines.map((line) => `- ${line}`).join('\n');
const notes = `## 更新内容\n\n${list(log.zh)}\n\n## What's changed\n\n${list(log.en)}\n\nSHA-256: \`${sha256}\`\n`;

const gh = (...args) => execFileSync('gh', args, { encoding: 'utf8' });
const dir = mkdtempSync(join(tmpdir(), 'retromao-release-'));
try {
  const notesFile = join(dir, 'notes.md');
  writeFileSync(notesFile, notes);
  gh('release', 'create', tag, ...files, '--repo', repository, '--title', title, '--notes-file', notesFile);
} finally {
  rmSync(dir, { recursive: true, force: true });
}

// 回读核对：GitHub 上的文件必须与本地一致。
const assets = JSON.parse(gh('api', `repos/${repository}/releases/tags/${tag}`)).assets;
for (const path of files) {
  const asset = assets.find((entry) => entry.name === basename(path) && entry.state === 'uploaded');
  if (!asset || asset.size !== statSync(path).size) fail(`发布附件缺失或大小不一致：${basename(path)}`);
  const hash = path === file ? sha256 : createHash('sha256').update(readFileSync(path)).digest('hex');
  if (asset.digest && asset.digest !== `sha256:${hash}`) fail(`发布附件摘要不一致：${basename(path)}`);
}
console.log(`已发布 ${tag}，SHA-256 ${sha256}`);
console.log(assets.find((asset) => asset.name === basename(file)).browser_download_url);

console.log('GitHub Action 会自动同步下载页并部署网站。');
