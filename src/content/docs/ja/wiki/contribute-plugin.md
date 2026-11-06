---
title: プラグインの開発
description: JavaScript と Web ページで RetroMao に機能を追加します。
---

プラグインは `plugin.json`、バックグラウンドスクリプト、Web ページを含む ZIP です。SDK を通じてホストの公開機能を呼び出し、プレイヤーが許可した権限の範囲で動作します。

## 最初のプラグインを動かす

```bash
python tools/retromao.py init plugin --id demo-plugin --name Demo --author YourName
python tools/retromao.py check extensions/demo-plugin
python tools/retromao.py preview extensions/demo-plugin
```

プレビューのアドレスはターミナルに表示されます。Ctrl+C で停止します。プレビューは正式な SDK とあなたのコードをローカルのサンプルで実行し、実際のクラウドには接続しません。

## マニフェスト

```json
{
  "schemaVersion": 1,
  "apiVersion": 1,
  "id": "example.hello",
  "name": "プラグインの例",
  "author": "Your name",
  "version": "1.0.0",
  "minAppVersion": "0.9.96",
  "defaultLocale": "zh-Hans",
  "description": "ライブラリを読み取り、バックグラウンド処理を実行します。",
  "entryPoint": "main.js",
  "iconName": "plugin",
  "capabilities": ["LIBRARY_READ"],
  "pages": [{ "id": "main", "title": "ライブラリ", "path": "index.html" }],
  "actions": [{ "id": "count", "title": "ゲームを数える" }]
}
```

作者、バージョン、必要なアプリのバージョンは必須です。公開するプラグインには簡体字中国語が必要です。他の言語は `localizations` で追加します。

## バックグラウンド処理

`entryPoint` で `retromao.define` を使い、`actions` と同じ ID の関数を登録します。

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

処理は分離された JavaScript エンジンで実行され、各プラグインは一度に 1 つの処理だけを実行します。ページを閉じてもタスクはキャンセルされません。キャンセル、無効化、アンインストールで終了します。

## ページ

`pages` にパッケージ内の HTML ページを指定します。SDK はホストが挿入するため、同梱は不要です。`retromao.ready` を待ってから API を呼び出してください。自分でバンドルしたフレームワークは使えますが、実行コードを CDN から読み込むことはできません。

ページは `retromao.tasks.run(id, args)` で処理を開始し、`tasks.watch` で進行状況を確認します。SDK はテーマの CSS 変数と十字キーのフォーカス移動を提供しますが、レイアウト、タッチ、コントローラー操作は確認が必要です。

設定ページは `kind: "CONFIGURATION"` を宣言し、別の HTML ファイルを使います。簡単な設定にはマニフェストの `settings`（`TEXT`、`SECRET`、`BOOLEAN`、`NUMBER`、`CHOICE`）を使うと、ホストがフォームを描画し、`SECRET` を暗号化して保存します。

## 権限

| 機能 | 用途 |
| --- | --- |
| `LIBRARY_READ` | ライブラリの読み取り |
| `LIBRARY_WRITE` | 情報、お気に入り、最近の記録、メディアの関連付けの変更 |
| `NETWORK` | `networkHosts` で宣言したホストへのアクセス |
| `STORAGE` | プレイヤーが許可したクラウド接続の JSON ドキュメントの読み書き |

必要な機能だけを宣言してください。`networkHosts` の `*` はプレイヤーに高リスクと表示されます。

## よく使う API

| API | 用途 |
| --- | --- |
| `library.game/games/records` | ゲームの読み取り。キーセットページングで 1 ページ最大 200 件 |
| `library.edit/apply` | 情報の一括変更。バッチ単位でアトミックに確定 |
| `favorites.list/set`、`recent.list/edit` | お気に入りと最近の記録 |
| `media.folders/assets/edit` | 許可されたメディアの検索と関連付け |
| `index.patch` | プラグインの名前空間にフィールドを保存し、インデックスと同期 |
| `settings.get`、`data.get/patch` | プラグインの設定と非公開の JSON |
| `http.request` | 宣言したホストへのアクセス。本文は最大 256 KiB |
| `storage.sources/read/write` | クラウドの JSON ドキュメントの読み書き。1 件最大 384 KiB |
| `tasks.run/get/result/cancel/watch/progress` | タスクの管理 |

すべての API と例は [API リファレンス](https://github.com/Fuck996/RetroMao-Community/blob/main/sdk/API_REFERENCE.md) と [型定義](https://github.com/Fuck996/RetroMao-Community/blob/main/sdk/retromao.d.ts) をご覧ください。

:::note[プラグインのフィールドは同期されます]
`index.patch` で書き込んだフィールドは、インデックスとともにクラウドや他の端末に同期されます。秘密情報や個人情報を保存しないでください。
:::

## サンプル

- [ゲームノート](https://github.com/Fuck996/RetroMao-Community/tree/main/examples/library-notes)：ページとインデックスのフィールド
- [お気に入りと最近のゲームの同期](https://github.com/Fuck996/RetroMao-Community/blob/main/examples/SYNC_EXAMPLES.md)：クラウドの JSON ドキュメント
- [Vita3K ROM 同期](https://github.com/Fuck996/RetroMao-Community/tree/main/examples/vita3k-sync)：ROM リソースプロバイダー

## 公開

```bash
python tools/retromao.py pack extensions/demo-plugin --release-tag demo-plugin-1.0.0
```

ZIP を端末に取り込み、インストール、権限、設定、更新、アンインストールを確認してから、[公開手順](../contribute/) に従って公開します。公開後、プレイヤーは **プラグイン → ストア** で確認できます。
