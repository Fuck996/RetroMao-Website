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

### 正式日志写什么

每次按产品汇总**上一次正式发布到本次发布的全部重要变化**。结合这段范围内的主程序源码差异、已完成事项和交付记录核对，不能只总结最后一次对话、最后一个提交或上一个临时包。Android 与 3DS 分别确定正式发布基线；首次正式发布总结当前交付的主要能力。网站 Release 标签不能代替主程序构建源码版本。

- 挑选玩家可感知的新功能、重要修复，以及有证据支持的性能、稳定性和兼容性改进；保留必要的兼容性、迁移和已知限制说明，省略琐碎细节。
- 同一功能的多轮修改合并为最终效果，只写相对上一正式版实际交付的变化，不逐次罗列调试或中间版本。
- 不将反复测试、验证次数、排查过程、尝试性修改、失败或已撤回方案、纯内部重构，以及未交付或未经验证的能力写成正式更新内容。内部验证证据单独保存。
- 发布前核对重要变化是否完整、重复事项是否归并、每一条是否已在最终包中交付。中英文按同一重点一一对应，网站日志与 Release 说明共用这份结果；Action 只做格式等自动校验，不代替内容筛选。

## 发布新版本

正式发布须有项目所有者明确的“正式更新”“正式发布”或同等指令。开发、测试、打包和本地交付不自动授权源码推送、公开 Release、网站上线或网盘更新；获得本次发布授权后，在指定产品和版本范围内连续完成整条流程。

安装包在主程序仓库本地构建、签名和验证，Action 不参与编译。主程序源码提交到 `Fuck996/RetroMao`，官网、Wiki、更新日志及后续 APK／CIA Release 统一在本仓库维护；主仓库历史 Release 保留。

1. 核对本次产品、版本和验证记录，将已验证产物交付到既定本地目录，回读核对 SHA-256。推送对应主程序源码并回读远端 ref，记录构建源码 SHA。网站 Release 标签属于网站仓库，不能代替主程序源码版本。
2. 按上面的正式日志口径汇总自上次同产品正式发布以来的重要最终变化，筛选、归并并核对本次交付范围，写入 `changelog/<android|3ds>-x.x.x.json`，运行 `node scripts/check-changelog.mjs`；核对并安全同步本仓库远端（包括 Action 自动提交的下载数据），再提交、推送到 `main`。日志内容人工编写，Action 负责校验与构建展示，不从代码自动总结。推送会部署日志；Release 发布前下载页仍指向上一版，所以不得在获得上线授权前推送待发布日志。
3. 使用同一安装包发布 Release。脚本从更新日志生成中英文说明，标签为 `android-x.x.x` 或 `3ds-x.x.x`，发布后读取附件核对大小和可用摘要：

   ```bash
   node scripts/publish-release.mjs android "U:/安卓应用/自研应用/RetroMao-x.x.x.apk"
   ```

   3DS 使用 `node scripts/publish-release.mjs 3ds <已验证的CIA路径>`。当前脚本在标签不存在时由 GitHub 从网站默认分支创建标签，需先确认日志已推送。已有同名 Release 时先核对，不重复创建或覆盖不同内容；没有远端摘要时须另行下载附件计算 SHA-256，不能只凭文件大小认定一致。

4. Release 发布后，Action 自动同步版本、文件名、大小、SHA-256 和 GitHub 链接到 `src/data/releases.json`，提交后部署网站。Android 与 3DS 分别按数字版本选最新正式附件，不依赖全局 “Latest”；排除草稿和预发布。现有同步最多读取最近 100 个 Release，404 或没有匹配附件会保留旧数据，因此必须核对目标版本已同步。
5. 等待对应 Action，确认 Cloudflare 部署步骤实际执行成功，再检查线上更新日志、下载页和下载链接。自动运行已触发时不重复手动触发；缺失时可在该次授权内运行 `gh workflow run website.yml --repo Fuck996/RetroMao-Website --ref main`。使用 Actions 自带 `GITHUB_TOKEN` 创建 Release 通常不会触发后续发布事件工作流，需要显式 dispatch 等正式触发方式并核对真实运行。
6. 发布执行者通过本机已登录的 OpenList，将同一安装包上传到既定百度网盘分享文件夹。先等待成功、回读并核验内容，再清理超额旧版：Android APK 和 3DS CIA **分别保留最新两个正式版本**，按三段数字排序。只删除该目录内本次产品的超额旧安装包，保留另一产品、PDF、教程和其他文件；上传或校验失败时不删旧包。分享目录和链接固定，不按日期更换。网盘步骤由本机执行者完成，Action 不连接私人存储。
7. 在主程序仓库的内部交付记录中保存源码 SHA、安装包摘要、Release／Action 链接和各渠道验收、保留及删除结果。任一环节失败须单独报告，不将本地交付或构建成功等同于整条发布完成。

网盘保留规则只适用于指定的百度分享文件夹，GitHub 历史 Release 及本地交付文件不自动清理。OpenList 地址、内部目录和登录信息仅在内部发布规范维护，不写入本公开仓库。

## 自动校验与部署

[.github/workflows/website.yml](.github/workflows/website.yml) 在推送到 `main`、Release 的 `published` 事件和手动 `workflow_dispatch` 时运行。非拉取请求运行依次同步下载数据、校验日志、安装锁定依赖、构建、提交数据变化并部署；Release 事件也检出 `main`。校验或构建失败时不会提交，也不会部署。拉取请求只校验和构建。推送 `main` 和手动触发均属于上线操作，须有对应授权。

需要在仓库的 Settings → Secrets and variables → Actions 中添加：

| Secret | 内容 |
| --- | --- |
| `CLOUDFLARE_API_TOKEN` | Cloudflare API 令牌，权限为 Cloudflare Pages: Edit |
| `CLOUDFLARE_ACCOUNT_ID` | Cloudflare 账户 ID |

没有配置令牌时，Action 只构建并给出警告，不会部署，整体仍可能显示成功；发布验收必须查看部署步骤和线上结果。部署前需要先创建 Pages 项目 `retromao`。Action 使用 `GITHUB_TOKEN` 回写下载数据通常不会再触发一次 push 工作流，同一次运行负责部署。

现有发布通道为 GitHub Action 直接上传 Cloudflare Pages。下文的 Cloudflare Git 集成属于替代方案，避免与现有通道同时启用，导致重复部署或抢先发布未同步的下载信息；切换通道需先核对完整同步流程。

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
