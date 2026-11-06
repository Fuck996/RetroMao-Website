---
title: 參與貢獻
description: 開發環境、工具和釋出流程總覽。
---

復古貓的擴充在獨立的公開倉庫 [RetroMao-Community](https://github.com/Fuck996/RetroMao-Community) 中開發，**不需要主程式原始碼，也不需要構建 APK**。

## 選擇你想做的

| 想做什麼 | 技術 | 教程 |
| --- | --- | --- |
| 翻譯介面 | 編輯一個 JSON | [翻譯語言](../contribute-language/) |
| 增加機種或主題 | 設定檔案、圖片、GLB 模型 | [製作機種與主題](../contribute-platform/) |
| 增加功能 | JavaScript、HTML/CSS | [開發外掛程式](../contribute-plugin/) |

## 準備環境

需要 Python 3.11+；外掛程式測試和瀏覽器驗證還需要 Node.js 22+。建議先建立並啟用一個 Python 虛擬環境。Fork 倉庫後，在倉庫根資料夾執行：

```bash
python -m pip install --index-url https://pypi.tuna.tsinghua.edu.cn/simple -r requirements-dev.txt
npm ci --registry=https://registry.npmmirror.com
python tools/retromao.py check
```

## 統一工具

`tools/retromao.py` 覆蓋了從建立到釋出的流程：

| 命令 | 作用 |
| --- | --- |
| `init plugin｜platform｜language --id --name --author` | 從模板建立 |
| `check [路径]` | 校驗語言、Schema、模板和介面 |
| `preview <路径>` | 本地預覽，使用樣本資料，不連線真實網盤 |
| `pack <路径> --release-tag <标签>` | 打包 ZIP |
| `publish <路径> --tag <标签> --repository <仓库>` | 釋出 Release 並更新資料夾 |

## 釋出到自己的 Fork

玩家把你的倉庫地址加入復古貓後，就能看到你釋出的擴充。

```bash
python tools/retromao.py check extensions/demo-plugin
git add extensions/demo-plugin
git commit -m "Add demo plugin 1.0.0"
git push origin HEAD
python tools/retromao.py publish extensions/demo-plugin --tag demo-plugin-1.0.0 --repository YourAccount/RetroMao-Community --notes extensions/demo-plugin/RELEASE_NOTES.md
git add plugins/index.json
git commit -m "Publish verified demo plugin catalog"
git push origin HEAD
```

`publish` 會校驗並打包、建立新 Release、回讀資產核對大小和 SHA-256，全部成功後才更新資料夾。版本和標籤不可覆蓋。

:::caution[Fork 不繼承 Release]
只複製上游資料夾，會指向你倉庫中不存在的資產。保留上游條目就需要自行釋出其資產，否則請移除。
:::

## 向官方投稿

釋出到 Fork 和向上遊投稿是兩件事。向官方倉庫提交 PR 時請說明：

- 目的、作者和最低宿主版本
- 權限、素材來源及許可
- 本地檢查、預覽和裝置驗收情況，未進行的驗收也要寫明

維護者稽核後，會在官方倉庫釋出資產。

## 規則

- 不提交 ROM、韌體、存檔、金鑰或帳號資料。
- 只打包有明確再分發許可的素材，並保留原作者署名。
- 釋出前至少驗證 16:9、4:3、1:1 的佈局，以及觸控和控制器操作。
- 自動檢查不能替代裝置、模擬器和真實網盤驗收。

## 完整參考

- [公共介面導航](https://github.com/Fuck996/RetroMao-Community/blob/main/docs/INTERFACES.md)
- [開發與驗收](https://github.com/Fuck996/RetroMao-Community/blob/main/docs/TESTING.md)
- [釋出流程](https://github.com/Fuck996/RetroMao-Community/blob/main/docs/PUBLISHING.md)
