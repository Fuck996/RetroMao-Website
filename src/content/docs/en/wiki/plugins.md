---
title: Plugin system
description: What plugins can do, how they run and how players control permissions.
---

RetroMao can do more than what's built in. Plugins add features and pages without changing the app or rebuilding an APK.

## What a plugin is

A plugin is a ZIP containing a `plugin.json` manifest, background scripts and optional web pages. Scripts call RetroMao through a public SDK.

| Part | What it does |
| --- | --- |
| Manifest | Declares the name, author, version, minimum app version, capabilities and pages |
| Background actions | Run in an isolated JavaScript engine, and can do long work and report progress |
| Pages | Written in HTML, CSS and JavaScript, and open within RetroMao's navigation |
| Settings | The host can draw the form, or you can write your own settings page. Secret fields are stored encrypted |

## What plugins can do

- Read and edit game details, favorites and recent records
- Find and link authorized media
- Store extension fields that sync to other devices with the index
- Reach declared network hosts
- Read and write JSON documents in cloud connections you allow
- Add extra game resources to system ROM sync
- Add emulator launch entries and search matching

## Plugins you can install now

Install these from **Plugins → Store**:

| Plugin | What it does |
| --- | --- |
| Favorites sync | Syncs favorites through a configured cloud connection, without transferring ROMs, media or saves |
| Recent games sync | Syncs recent play dates, play counts and durations |
| Pinyin initials search | Searches games and apps using Chinese pinyin initials, such as `jsq` for 计算器 |
| Vita3K ROM sync | Syncs Vita3K games, updates, DLC and licenses |
| Custom launch entries | Lets you choose a system and customize emulator launch parameters |

## How you control permissions

A plugin must declare the capabilities it needs, and you approve them before it can be enabled:

| Capability | Meaning |
| --- | --- |
| `LIBRARY_READ` | Read the library |
| `LIBRARY_WRITE` | Edit details, favorites, recent records and media links |
| `NETWORK` | Reach declared hosts |
| `STORAGE` | Read and write JSON documents in cloud connections you allow |

- If an update adds a capability or host, the plugin stays disabled until you approve it.
- Plugins that can reach any host are marked high risk.
- Plugins can't read other plugins' extension fields, or settings and secrets from other sources.
- You can disable or uninstall a plugin at any time from its details, and choose to clear its data when uninstalling.

:::caution
Plugins can run code. Only install plugins from sources you trust.
:::

## Games aren't affected

Launching a game doesn't wait for plugins. Background scripts are created on demand and released when done, and closing a page doesn't cancel a task. Interrupted tasks aren't replayed automatically, but you can run them again.

## Next steps

- [Add a repository and install](../extensions/)
- [Develop your own plugin](../contribute-plugin/)
- To add systems or change the look, see [Make systems and themes](../contribute-platform/)
