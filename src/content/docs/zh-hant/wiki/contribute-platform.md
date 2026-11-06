---
title: 製作機種與主題
description: 用設定檔案增加機種，或製作主題包。
---

機種和主題都是不執行程式碼的 ZIP 包，透過 `catalog.json` 釋出。

## 機種包

```bash
python tools/retromao.py init platform --id msx --name MSX --author YourName
```

ZIP 根資料夾放 `platform.json`：

```json
{
  "schemaVersion": 2,
  "platform": {
    "id": "msx",
    "name": "MSX",
    "aliases": ["msx", "msx computer"],
    "extensions": ["rom", "mx1", "mx2"],
    "medium": "CARTRIDGE"
  },
  "manufacturer": "ASCII / Microsoft",
  "releaseYear": 1983,
  "coverAspectRatio": 0.75
}
```

- **id**：2～32 位小寫字母、數字、`_`、`-`，不能與內建機種或已安裝擴充重複。
- **extensions**：不帶點。可以與其他機種重疊，但重疊的副檔名不能單獨用於自動識別。
- **coverAspectRatio**：封面的寬／高，範圍 0.5～2。
- **圖示**：PNG/WebP，單張不超過 8 MiB、寬高不超過 2048 畫素。

### 格式版本

| schemaVersion | 新增內容 | 最低宿主 |
| --- | --- | --- |
| 1 | 機種身份、副檔名、圖示 | 0.9.44 |
| 2 | 宣告式啟動設定（URI／RetroArch） | 0.9.108 |
| 3 | 包內預設 Logo 和畫素圖、有無包裝、無介質機種、包裝和介質 GLB、區域封面比例、材質描述 | 1.0.32 |

新增啟動設定時，必須核對模擬器官方的包名、完整 Activity、URI 支援或核心 ID。

## 主題包

ZIP 根資料夾放 `theme.json`：

```json
{
  "schemaVersion": 3,
  "id": "example",
  "name": "示例主题",
  "author": "作者",
  "colors": {
    "background": "#141210", "surface": "#22201D", "foreground": "#F8F3EA",
    "muted": "#BBB0A0", "accent": "#E8A94C", "outline": "#514536"
  },
  "assets": {
    "background.library": "art/library.png",
    "platform.msx.logo": "art/msx-logo.png",
    "model.msx.packaging": "models/msx-box.glb",
    "model.msx.gameMedia": "models/msx-cart.glb"
  }
}
```

- 主題可以包含配色、背景、動效、機種圖示、字型和模型，省略的槽位不會被憑空生成。
- 模型使用 GLB 2.0，單個不超過 32 MiB。替換模型只換幾何檔案，仍使用復古貓的渲染和燈光，請確認貼圖正確對映。
- 使用擴充機種的素材時，要先安裝對應的機種。
- 線上主題還需要 1280×720 的 PNG/WebP 預覽圖（`previews/<id>.png`）。
- 格式版本 4 增加可選的 `dualScreen` 物件，可以調整雙屏佈局。宣告後還要檢查上屏和下屏的多種比例。

完整示例見倉庫的 [`examples/amber`](https://github.com/Fuck996/RetroMao-Community/tree/main/examples/amber)。

## 驗收

```bash
python tools/retromao.py check extensions/msx
python tools/retromao.py preview extensions/msx
python tools/retromao.py pack extensions/msx --release-tag msx-1.0.0
```

把 ZIP 複製到裝置，用 [離線匯入入口](../extensions/) 安裝，然後驗證：

- 16:9、4:3、1:1 的佈局，以及觸控和控制器操作
- 機種：掃描、模擬器版本、核心和韌體依賴、啟動和返回
- 主題：實際介面、封面對映

完成後，按 [釋出流程](../contribute/) 釋出。

## 版權

名稱、圖示、背景、包裝圖和模型必須由你自行創作，或者有可再分發的許可。
