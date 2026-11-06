---
title: 开发插件
description: 用 JavaScript 和网页为复古猫增加功能。
---

插件是包含 `plugin.json` 的 ZIP，由后台脚本和包内网页组成。它们通过 SDK 调用宿主的公共能力，并受权限约束。

## 跑起第一个插件

```bash
python tools/retromao.py init plugin --id demo-plugin --name Demo --author YourName
python tools/retromao.py check extensions/demo-plugin
python tools/retromao.py preview extensions/demo-plugin
```

预览地址会显示在终端，按 Ctrl+C 停止。预览运行正式 SDK 和你的代码，使用本地样本，不连接真实网盘。

## 清单

```json
{
  "schemaVersion": 1,
  "apiVersion": 1,
  "id": "example.hello",
  "name": "插件示例",
  "author": "Your name",
  "version": "1.0.0",
  "minAppVersion": "0.9.96",
  "defaultLocale": "zh-Hans",
  "description": "读取游戏库并运行一个后台动作。",
  "entryPoint": "main.js",
  "iconName": "plugin",
  "capabilities": ["LIBRARY_READ"],
  "pages": [{ "id": "main", "title": "游戏库", "path": "index.html" }],
  "actions": [{ "id": "count", "title": "统计游戏" }]
}
```

作者、版本和最低应用版本都是必填项。发布时必须包含简体中文，其他语言通过 `localizations` 提供。

## 后台动作

`entryPoint` 用 `retromao.define` 注册与 `actions` 同 ID 的函数：

```js
retromao.define({ actions: {
  async count() {
    let after = null, total = 0;
    do {
      const page = await retromao.library.records({ after, limit: 200 });
      total += page.games.length;
      after = page.next;
      await retromao.tasks.progress(total);
    } while (after);
    return { total };
  }
} });
```

动作运行在隔离的 JavaScript 引擎中。同一插件一次只运行一个动作；关闭页面不会取消任务，取消、禁用或卸载才会终止。

## 页面

`pages` 声明包内的 HTML 页面。SDK 由宿主注入，不需要打包。等待 `retromao.ready` 后再调用接口。可以使用自己打包的前端框架，但不能从 CDN 加载运行代码。

页面通过 `retromao.tasks.run(id, args)` 发起动作，用 `tasks.watch` 观察进度。SDK 提供主题 CSS 变量和方向键焦点移动，布局、触摸和手柄操作仍需自行验证。

配置页声明 `kind: "CONFIGURATION"`，使用单独的 HTML 文件。简单配置可以直接用清单中的 `settings`（`TEXT`、`SECRET`、`BOOLEAN`、`NUMBER`、`CHOICE`），由宿主绘制表单，`SECRET` 会加密保存。

## 权限

| 能力 | 用途 |
| --- | --- |
| `LIBRARY_READ` | 读取游戏库 |
| `LIBRARY_WRITE` | 修改资料、收藏、最近记录和媒体关联 |
| `NETWORK` | 访问 `networkHosts` 声明的主机 |
| `STORAGE` | 读写玩家允许的网盘连接中的 JSON 文档 |

请只声明需要的能力。`networkHosts` 中的 `*` 会向玩家标为高风险。

## 常用接口

| 接口 | 作用 |
| --- | --- |
| `library.game/games/records` | 读取游戏，键集分页，每页最多 200 项 |
| `library.edit/apply` | 批量修改资料，按批原子提交 |
| `favorites.list/set`、`recent.list/edit` | 收藏和最近记录 |
| `media.folders/assets/edit` | 查询或关联已授权的媒体 |
| `index.patch` | 在插件命名空间下保存字段，随索引同步 |
| `settings.get`、`data.get/patch` | 插件配置和私有 JSON |
| `http.request` | 访问声明的主机，正文最多 256 KiB |
| `storage.sources/read/write` | 读写网盘 JSON 文档，单个最大 384 KiB |
| `tasks.run/get/result/cancel/watch/progress` | 任务管理 |

完整接口和示例见 [接口调用手册](https://github.com/Fuck996/RetroMao-Community/blob/main/sdk/API_REFERENCE.md) 和 [类型定义](https://github.com/Fuck996/RetroMao-Community/blob/main/sdk/retromao.d.ts)。

:::note[插件字段会同步]
`index.patch` 写入的扩展字段会随索引同步到网盘和其他设备，不要存放密钥或个人信息。
:::

## 可参考的示例

- [游戏笔记](https://github.com/Fuck996/RetroMao-Community/tree/main/examples/library-notes)：页面和索引字段
- [收藏同步与最近游戏同步](https://github.com/Fuck996/RetroMao-Community/blob/main/examples/SYNC_EXAMPLES.md)：网盘 JSON 文档
- [Vita3K ROM 同步](https://github.com/Fuck996/RetroMao-Community/tree/main/examples/vita3k-sync)：ROM 资源提供者

## 发布

```bash
python tools/retromao.py pack extensions/demo-plugin --release-tag demo-plugin-1.0.0
```

先把 ZIP 导入设备，验证安装、授权、配置、更新和卸载，再按 [发布流程](../contribute/) 发布。发布后，玩家可以在 **插件 → 商店** 中看到它。
