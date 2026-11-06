# 复古猫官网

公开仓库，包含产品官网、Wiki、更新日志和安装包下载（Releases）。复古猫主程序的源码不在这里。

网站使用 [Astro](https://astro.build) + [Starlight](https://starlight.astro.build) 生成纯静态页面，部署到 Cloudflare Pages 免费版。

```bash
npm install
npm run dev      # 本地开发（搜索只在 build 后可用）
npm run build    # 输出到 dist/
npm run preview  # 预览 dist/
```

## 日常维护

| 要改什么 | 改哪里 |
| --- | --- |
| 版本号、文件大小、SHA-256、GitHub 链接 | 由 Action 自动同步到 `src/data/releases.json`，不要手改 |
| 网盘链接 | `src/data/site.ts` 的 `cloudMirrors` |
| 增加网盘种类 | `src/data/site.ts`：在 `providers` 登记，再到 `cloudMirrors` 加一行 |
| 个人链接 | `src/data/site.ts` 的 `author` |
| 首页、下载页、关于页文案（四语） | `src/i18n/ui.ts` |
| Wiki 内容 | `src/content/docs/<语言>/wiki/*.md` |
| Wiki 目录 | `astro.config.mjs` 的 `sidebar` |
| 正式域名 | `astro.config.mjs` 的 `SITE` |

下载链接留空时，页面显示“链接准备中”，不会出现死链。网盘提取码填在 `code`。

Cloudflare Pages 的单文件上限是 25 MiB，APK 放不进站点，下载页只保存外部链接。

## 更新日志

每个版本一个文件：`changelog/<android|3ds>-x.x.x.json`。

```json
{
  "product": "android",
  "version": "1.0.33",
  "date": "2026-11-07",
  "zh": ["中文说明，一条一个变化。"],
  "en": ["The same change in English."]
}
```

- `zh` 和 `en` 必填且条数相同。繁中由简中自动转换，日语显示英文。
- 本地校验：`node scripts/check-changelog.mjs`。
- 下载页的版本必须有对应的日志文件，否则校验失败、不会部署。
- 把本仓库放在主仓库的 `website/` 目录下运行校验时，还会核对主程序当前的版本号。

## 发布新版本

安装包在本地签名构建，Action 不参与编译。

1. 写好 `changelog/<android|3ds>-x.x.x.json` 并推送。
2. 发布安装包，脚本会用更新日志生成 Release 说明，并回读核对大小和摘要：

   ```bash
   node scripts/publish-release.mjs android "U:/安卓应用/自研应用/RetroMao-x.x.x.apk"
   ```

3. Release 发布后，Action 自动把版本、大小、SHA-256 和 GitHub 链接写入 `src/data/releases.json`，提交后部署网站。
4. 把同一个安装包上传到百度网盘的分享文件夹。这一步需要手动完成；链接固定，不用改。

## 自动校验与部署

[.github/workflows/website.yml](.github/workflows/website.yml) 在推送到 `main` 或发布 Release 时运行。校验或构建失败时不会提交，也不会部署。拉取请求只校验和构建。

需要在仓库的 Settings → Secrets and variables → Actions 中添加：

| Secret | 内容 |
| --- | --- |
| `CLOUDFLARE_API_TOKEN` | Cloudflare API 令牌，权限为 Cloudflare Pages: Edit |
| `CLOUDFLARE_ACCOUNT_ID` | Cloudflare 账户 ID |

没有配置时，Action 只构建并给出警告，不会部署。部署前需要先创建 Pages 项目 `retromao`。

## 首页的模型和游戏图片

- `public/models/` 由 `scripts/build-web-models.py` 从主仓库的 App 模型生成，只包含首页用到的机种。几何和材质与 App 相同，背面和书脊贴图含有厂商商标，已换成单色。版权和使用限制见 `public/models/LICENSE.txt`。
- `public/covers/` 是虚构演示游戏的封面和书脊，由 AI 绘制，不对应任何真实作品，数据在 `src/data/site.ts` 的 `demoGames`。不要放入真实商业游戏的封面。
- 首页界面按 App 在 1280×720 下的实际布局还原，`src/components/LibraryMock.astro` 注明了对照的截图。App 布局变化时需要同步修改。

## 多语言

路由为 `/zh-hans/`、`/zh-hant/`、`/en/`、`/ja/`。`/`、`/download/`、`/wiki/`、`/about/` 由浏览器脚本跳转，不需要边缘函数：

1. 优先使用手动选择（`localStorage` 的 `retromao-locale`）。
2. 否则按 `navigator.languages` 顺序匹配，中文区分简繁。
3. 没有匹配时使用简体中文，与 App 规则一致。

增加语言需要同时修改 `src/i18n/ui.ts`、`astro.config.mjs` 和 `src/content/docs/<语言>/wiki/`，并把新语言加入 `detectLocaleScript`。

## 部署到 Cloudflare Pages

### 方式一：本机直接上传

```bash
npx wrangler login
npx wrangler pages project create retromao --production-branch main
npm run deploy
```

项目名被占用时，同时修改 `wrangler.toml` 的 `name` 和 `astro.config.mjs` 的 `SITE`。

### 方式二：在 Cloudflare 连接 GitHub

在 Cloudflare 控制台选择 Workers & Pages → Create → Pages → Connect to Git，然后设置：

| 配置项 | 值 |
| --- | --- |
| Root directory | 留空 |
| Build command | `npm run build` |
| Build output directory | `dist` |
| 环境变量 | `NODE_VERSION` = `22` |

绑定自定义域名：Pages 项目 → Custom domains。绑定后修改 `SITE` 并重新部署。

## 版权

本仓库的代码、文案、3D 模型和复古猫标志版权归 4NPC 所有，All rights reserved。3D 模型的使用限制见 `public/models/LICENSE.txt`。
