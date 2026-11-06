---
title: 機種とテーマの制作
description: 設定ファイルで機種を追加したり、テーマパックを制作したりできます。
---

機種とテーマは、コードを実行しない ZIP パックで、`catalog.json` を通じて公開します。

## 機種パック

```bash
python tools/retromao.py init platform --id msx --name MSX --author YourName
```

ZIP のルートに `platform.json` を置きます。

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

- **id**：2～32 文字の英小文字、数字、`_`、`-`。内蔵の機種やインストール済みの拡張と重複できません。
- **extensions**：ドットなしで指定します。他の機種と重複できますが、重複する拡張子だけでは自動判別に使えません。
- **coverAspectRatio**：カバーの幅／高さ。0.5～2 の範囲です。
- **アイコン**：PNG または WebP、1 枚 8 MiB 以下、幅と高さ 2048 ピクセル以下です。

### 形式バージョン

| schemaVersion | 追加内容 | 必要なホスト |
| --- | --- | --- |
| 1 | 機種情報、拡張子、アイコン | 0.9.44 |
| 2 | 宣言的な起動設定（URI／RetroArch） | 0.9.108 |
| 3 | パック内の既定のロゴとピクセルアート、パッケージの有無、メディアのない機種、パッケージとメディアの GLB、地域別のカバー比率、材質の記述 | 1.0.32 |

起動設定を追加するときは、エミュレーター公式のパッケージ名、完全な Activity 名、URI 対応またはコア ID を確認してください。

## テーマパック

ZIP のルートに `theme.json` を置きます。

```json
{
  "schemaVersion": 3,
  "id": "example",
  "name": "サンプルテーマ",
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

- テーマには配色、背景、モーション、機種アイコン、フォント、モデルを含められます。省略したスロットが自動で生成されることはありません。
- モデルは GLB 2.0 で、1 つ 32 MiB 以下です。置き換えるのは形状だけで、描画とライティングは RetroMao のものを使います。画像が正しく貼られることを確認してください。
- 拡張機種の素材を使うときは、先にその機種をインストールしてください。
- オンラインのテーマには 1280×720 の PNG または WebP のプレビュー（`previews/<id>.png`）も必要です。
- 形式バージョン 4 では、2 画面のレイアウトを調整する `dualScreen` を任意で追加できます。指定した場合は、上下の画面の比率も確認してください。

完全な例は [`examples/amber`](https://github.com/Fuck996/RetroMao-Community/tree/main/examples/amber) をご覧ください。

## 検証

```bash
python tools/retromao.py check extensions/msx
python tools/retromao.py preview extensions/msx
python tools/retromao.py pack extensions/msx --release-tag msx-1.0.0
```

ZIP を端末にコピーし、[オフラインのインポート](../extensions/) でインストールして、次の項目を確認します。

- 16:9、4:3、1:1 のレイアウト、タッチとコントローラー操作
- 機種：スキャン、エミュレーターのバージョン、コアとファームウェアの依存関係、起動と復帰
- テーマ：実際の画面、カバーの貼り付け

完了したら [公開手順](../contribute/) に従って公開します。

## 著作権

名称、アイコン、背景、パッケージ画像、モデルは、自作または再配布が許可されたものを使ってください。
