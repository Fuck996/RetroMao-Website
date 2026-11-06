---
title: 開発に参加
description: 開発環境、ツール、公開手順の概要。
---

RetroMao の拡張は、独立した公開リポジトリ [RetroMao-Community](https://github.com/Fuck996/RetroMao-Community) で開発します。**本体のソースコードや APK のビルドは不要です。**

## 作りたいものを選ぶ

| 目的 | 技術 | ガイド |
| --- | --- | --- |
| 画面を翻訳 | JSON の編集 | [翻訳](../contribute-language/) |
| 機種やテーマを追加 | 設定ファイル、画像、GLB モデル | [機種とテーマの制作](../contribute-platform/) |
| 機能を追加 | JavaScript、HTML/CSS | [プラグインの開発](../contribute-plugin/) |

## 準備

Python 3.11 以降が必要です。プラグインのテストとブラウザーでの確認には Node.js 22 以降も必要です。Python の仮想環境を作成して有効にすることをおすすめします。リポジトリを Fork し、ルートで次を実行します。

```bash
python -m pip install -r requirements-dev.txt
npm ci
python tools/retromao.py check
```

## 共通ツール

`tools/retromao.py` で作成から公開までを行えます。

| コマンド | 内容 |
| --- | --- |
| `init plugin｜platform｜language --id --name --author` | テンプレートから作成 |
| `check [パス]` | 言語、スキーマ、テンプレート、API を検証 |
| `preview <パス>` | サンプルデータでローカルプレビュー（実際のクラウドには接続しません） |
| `pack <パス> --release-tag <タグ>` | ZIP を作成 |
| `publish <パス> --tag <タグ> --repository <リポジトリ>` | Release を公開し、カタログを更新 |

## 自分の Fork に公開

プレイヤーがあなたのリポジトリ URL を RetroMao に追加すると、公開した拡張が表示されます。

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

`publish` は検証とパッケージ化を行って新しい Release を作成し、アセットをダウンロードしてサイズと SHA-256 を確認します。すべて成功したときだけカタログを更新します。バージョンとタグは上書きできません。

:::caution[Fork は Release を継承しません]
上流のカタログだけを複製すると、自分のリポジトリにないアセットを参照します。そのアセットを自分で公開するか、該当の項目を削除してください。
:::

## 上流に投稿

Fork での公開と上流への投稿は別の作業です。公式リポジトリへの PR には次の内容を記載してください。

- 目的、作者、必要なホストバージョン
- 権限、素材の出典とライセンス
- ローカル検査、プレビュー、実機検証（未実施の検証も明記）

レビュー後、保守担当者が公式リポジトリでアセットを公開します。

## ルール

- ROM、ファームウェア、セーブ、鍵、アカウント情報を提出しないでください。
- 再配布の許可が明確な素材だけを含め、元の作者を明記してください。
- 公開前に、少なくとも 16:9、4:3、1:1 のレイアウトとタッチ、コントローラー操作を確認してください。
- 自動検査は、実機、エミュレーター、実際のクラウドでの検証の代わりにはなりません。

## 詳細なリファレンス

- [公開インターフェース](https://github.com/Fuck996/RetroMao-Community/blob/main/docs/INTERFACES.md)
- [開発と検証](https://github.com/Fuck996/RetroMao-Community/blob/main/docs/TESTING.md)
- [公開手順](https://github.com/Fuck996/RetroMao-Community/blob/main/docs/PUBLISHING.md)
