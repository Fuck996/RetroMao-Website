---
title: 翻訳
description: 既存の翻訳を改善したり、RetroMao に新しい言語を追加したりできます。
---

各言語は `languages/` にある UTF-8、LF 改行の JSON ファイルです（例：`en.json`、`ja.json`）。言語を追加するときに他の言語を変更する必要はありません。

## 言語を追加

```bash
python tools/retromao.py init language --id fr --name Français --author YourName
```

`locale` は `fr` や `pt-BR` のような BCP 47 形式です。`name` にはその言語での名称を使います。

## 翻訳のルール

- `zh-Hans.json` の原文と実際の画面を見ながら翻訳します。中国語の基準を変更しないでください。
- キー、番号付きパラメーター、保護された名称を保持します。`%1$s` などは順序を変更できますが、追加、削除、型の変更はできません。
- 未翻訳の項目は `null` のままにします。中国語で埋めたり、削除したりしないでください。
- 短いラベルは文脈に合わせて簡潔にし、動作、方向、状態、セーブの種類は残します。
- 文脈が不明なときは `contracts/message-context.json` を確認するか、PR で質問してください。
- `author` と `credits` を記入します。Fork で編集するときは、元の作者と翻訳者のクレジットを残してください。

## 検証とプレビュー

```bash
python tools/validate_languages.py --write-index
python tools/validate_languages.py
python tools/retromao.py preview languages/fr.json
```

プレビューでは原文と訳文を検索できます。検証では、キーの重複、欠落、不明なキー、パラメーターのエラー、基準の不一致、保護された名称の欠落、インデックスとファイルの不一致を拒否します。

`index.json` は自動生成されるため、手動で編集しないでください。中国語の基準を示す `catalog_version` と `catalog_hash` も変更しないでください。

## 公開

言語に ZIP や Release は不要です。言語の JSON と生成された `languages/index.json` をコミットしてプッシュします。

プレイヤーがあなたのリポジトリ URL を追加すると、**設定 → 外観 → 言語 → 言語をダウンロード** に表示されます。インストールできるのは、すべて翻訳され、基準が一致し、検証に通った言語だけです。
