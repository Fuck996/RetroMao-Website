---
title: Develop plugins
description: Add features to RetroMao with JavaScript and web pages.
---

A plugin is a ZIP containing `plugin.json`, background scripts and web pages. Plugins call the host's public capabilities through the SDK, within the permissions players grant.

## Run your first plugin

```bash
python tools/retromao.py init plugin --id demo-plugin --name Demo --author YourName
python tools/retromao.py check extensions/demo-plugin
python tools/retromao.py preview extensions/demo-plugin
```

The terminal shows the preview address. Press Ctrl+C to stop. The preview runs the shipped SDK and your code with local samples and doesn't connect to real cloud storage.

## Manifest

```json
{
  "schemaVersion": 1,
  "apiVersion": 1,
  "id": "example.hello",
  "name": "Plugin example",
  "author": "Your name",
  "version": "1.0.0",
  "minAppVersion": "0.9.96",
  "defaultLocale": "zh-Hans",
  "description": "Read the library and run a background action.",
  "entryPoint": "main.js",
  "iconName": "plugin",
  "capabilities": ["LIBRARY_READ"],
  "pages": [{ "id": "main", "title": "Library", "path": "index.html" }],
  "actions": [{ "id": "count", "title": "Count games" }]
}
```

The author, version and minimum app version are required. Published plugins must include Simplified Chinese. Add other languages with `localizations`.

## Background actions

In `entryPoint`, use `retromao.define` to register functions with the same IDs as `actions`:

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

Actions run in an isolated JavaScript engine, and each plugin runs one action at a time. Closing a page doesn't cancel a task. Canceling, disabling or uninstalling does.

## Pages

`pages` lists HTML pages in the package. The host injects the SDK, so you don't need to bundle it. Wait for `retromao.ready` before calling APIs. You can use a front-end framework you've bundled, but you can't load running code from a CDN.

Pages start actions with `retromao.tasks.run(id, args)` and follow progress with `tasks.watch`. The SDK provides theme CSS variables and D-pad focus movement, but you still need to test your layout with touch and controller.

Configuration pages declare `kind: "CONFIGURATION"` and use a separate HTML file. For simple settings, use `settings` in the manifest (`TEXT`, `SECRET`, `BOOLEAN`, `NUMBER`, `CHOICE`). The host draws the form and stores `SECRET` values encrypted.

## Permissions

| Capability | Use |
| --- | --- |
| `LIBRARY_READ` | Read the library |
| `LIBRARY_WRITE` | Edit details, favorites, recent records and media links |
| `NETWORK` | Reach hosts declared in `networkHosts` |
| `STORAGE` | Read and write JSON documents in cloud connections the player allows |

Only declare what you need. A `*` in `networkHosts` is shown to players as high risk.

## Common APIs

| API | Use |
| --- | --- |
| `library.game/games/records` | Read games with keyset paging, up to 200 per page |
| `library.edit/apply` | Edit details in batches, committed atomically per batch |
| `favorites.list/set`, `recent.list/edit` | Favorites and recent records |
| `media.folders/assets/edit` | Find or link authorized media |
| `index.patch` | Store fields in the plugin's namespace, synced with the index |
| `settings.get`, `data.get/patch` | Plugin settings and private JSON |
| `http.request` | Reach declared hosts, with bodies up to 256 KiB |
| `storage.sources/read/write` | Read and write cloud JSON documents, up to 384 KiB each |
| `tasks.run/get/result/cancel/watch/progress` | Manage tasks |

For every API with examples, see the [API reference](https://github.com/Fuck996/RetroMao-Community/blob/main/sdk/API_REFERENCE.md) and [type definitions](https://github.com/Fuck996/RetroMao-Community/blob/main/sdk/retromao.d.ts).

:::note[Plugin fields sync]
Fields written with `index.patch` sync to cloud storage and other devices with the index. Don't store secrets or personal information in them.
:::

## Examples

- [Game notes](https://github.com/Fuck996/RetroMao-Community/tree/main/examples/library-notes): pages and index fields
- [Favorites and recent games sync](https://github.com/Fuck996/RetroMao-Community/blob/main/examples/SYNC_EXAMPLES.md): cloud JSON documents
- [Vita3K ROM sync](https://github.com/Fuck996/RetroMao-Community/tree/main/examples/vita3k-sync): ROM resource providers

## Publish

```bash
python tools/retromao.py pack extensions/demo-plugin --release-tag demo-plugin-1.0.0
```

Import the ZIP on a device and test installing, permissions, settings, updating and uninstalling. Then follow the [publishing steps](../contribute/). Players will find your plugin in **Plugins → Store**.
