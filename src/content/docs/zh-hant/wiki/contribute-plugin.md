---
title: 開發外掛程式
description: 用 JavaScript 和網頁為復古貓增加功能。
---

外掛程式是包含 `plugin.json` 的 ZIP，由背景指令碼和包內網頁組成。它們透過 SDK 呼叫宿主的公共能力，並受權限約束。

## 跑起第一個外掛程式

```bash
python tools/retromao.py init plugin --id demo-plugin --name Demo --author YourName
python tools/retromao.py check extensions/demo-plugin
python tools/retromao.py preview extensions/demo-plugin
```

預覽地址會顯示在終端，按 Ctrl+C 停止。預覽執行正式 SDK 和你的程式碼，使用本地樣本，不連線真實網盤。

## 清單

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

作者、版本和最低應用版本都是必填項。釋出時必須包含簡體中文，其他語言透過 `localizations` 提供。

## 背景動作

`entryPoint` 用 `retromao.define` 註冊與 `actions` 同 ID 的函式：

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

動作執行在隔離的 JavaScript 引擎中。同一外掛程式一次只執行一個動作；關閉頁面不會取消任務，取消、禁用或解除安裝才會終止。

## 頁面

`pages` 宣告包內的 HTML 頁面。SDK 由宿主注入，不需要打包。等待 `retromao.ready` 後再呼叫介面。可以使用自己打包的前端框架，但不能從 CDN 載入執行程式碼。

頁面透過 `retromao.tasks.run(id, args)` 發起動作，用 `tasks.watch` 觀察進度。SDK 提供主題 CSS 變數和方向鍵焦點移動，佈局、觸控和控制器操作仍需自行驗證。

設定頁宣告 `kind: "CONFIGURATION"`，使用單獨的 HTML 檔案。簡單設定可以直接用清單中的 `settings`（`TEXT`、`SECRET`、`BOOLEAN`、`NUMBER`、`CHOICE`），由宿主繪製表單，`SECRET` 會加密儲存。

## 權限

| 能力 | 用途 |
| --- | --- |
| `LIBRARY_READ` | 讀取遊戲庫 |
| `LIBRARY_WRITE` | 修改資料、收藏、最近記錄和媒體關聯 |
| `NETWORK` | 訪問 `networkHosts` 宣告的主機 |
| `STORAGE` | 讀寫玩家允許的網盤連線中的 JSON 文件 |

請只宣告需要的能力。`networkHosts` 中的 `*` 會向玩家標為高風險。

## 常用介面

| 介面 | 作用 |
| --- | --- |
| `library.game/games/records` | 讀取遊戲，鍵集分頁，每頁最多 200 項 |
| `library.edit/apply` | 批次修改資料，按批原子提交 |
| `favorites.list/set`、`recent.list/edit` | 收藏和最近記錄 |
| `media.folders/assets/edit` | 查詢或關聯已授權的媒體 |
| `index.patch` | 在外掛程式名稱空間下儲存欄位，隨索引同步 |
| `settings.get`、`data.get/patch` | 外掛程式設定和私有 JSON |
| `http.request` | 訪問宣告的主機，正文最多 256 KiB |
| `storage.sources/read/write` | 讀寫網盤 JSON 文件，單個最大 384 KiB |
| `tasks.run/get/result/cancel/watch/progress` | 任務管理 |

完整介面和示例見 [介面呼叫手冊](https://github.com/Fuck996/RetroMao-Community/blob/main/sdk/API_REFERENCE.md) 和 [型別定義](https://github.com/Fuck996/RetroMao-Community/blob/main/sdk/retromao.d.ts)。

:::note[外掛程式欄位會同步]
`index.patch` 寫入的擴充欄位會隨索引同步到網盤和其他裝置，不要存放金鑰或個人資訊。
:::

## 可參考的示例

- [遊戲筆記](https://github.com/Fuck996/RetroMao-Community/tree/main/examples/library-notes)：頁面和索引欄位
- [收藏同步與最近遊戲同步](https://github.com/Fuck996/RetroMao-Community/blob/main/examples/SYNC_EXAMPLES.md)：網盤 JSON 文件
- [Vita3K ROM 同步](https://github.com/Fuck996/RetroMao-Community/tree/main/examples/vita3k-sync)：ROM 資源提供者

## 釋出

```bash
python tools/retromao.py pack extensions/demo-plugin --release-tag demo-plugin-1.0.0
```

先把 ZIP 匯入裝置，驗證安裝、授權、設定、更新和解除安裝，再按 [釋出流程](../contribute/) 釋出。釋出後，玩家可以在 **外掛程式 → 商店** 中看到它。
