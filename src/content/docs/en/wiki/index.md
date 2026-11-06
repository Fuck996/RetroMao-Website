---
title: Meet RetroMao
description: What RetroMao is, what it does and what it doesn't do.
---

RetroMao is a local-first Android frontend for retro games. It organizes your library, displays media, launches emulators and syncs files. It doesn't emulate games itself.

## Key features

- **A library that feels physical**: 3D box and game media models for 35 systems, using Japanese designs by default.
- **Local first**: Works with no cloud storage and no account. Launching a game doesn't need a network.
- **Automatic organizing**: Pick a ROM root folder once. RetroMao finds system subfolders, matches media with the same name and reads compatible indexes.
- **Controller first**: Default controls, button mapping and A/B layout are all configurable. Touch works too.
- **Cloud sync**: Sync ROMs, media and saves over WebDAV or Baidu Netdisk, tracked by RetroMao's own index.
- **Save version history**: Saves sync when you say so, and you choose when histories diverge. Past versions stay in your own cloud storage.
- **Sync on a real 3DS**: A separate 3DS app reads and writes saves directly and shares one set of cloud saves with the Android app.
- **Fits your screen**: Designed at 16:9 and adapted to 4:3, 1:1 and dual-screen handhelds.
- **Extensible**: Plugins add features and pages, system packs add systems, themes change the look, and anyone can translate it. Development happens in a public repository, without the app's source code. See [Plugin system](plugins/).
- **Multilingual**: Includes Simplified Chinese, Traditional Chinese, English and Japanese, and you can download community languages.

## What RetroMao doesn't do

:::caution[No games included]
RetroMao doesn't include or provide game ROMs, BIOS files, firmware or emulators. Install emulators yourself and use only content you legally own.
:::

- It doesn't use files from other frontends such as ES-DE as its day-to-day index. Imports are converted to RetroMao's own data.
- It doesn't sync saves unless you ask, and it doesn't automatically delete saves from cloud storage.
- Installing extensions doesn't upload your ROMs, saves or cloud credentials.

## Where to start

1. [Install the Android app](install-android/)
2. [Get started](quick-start/): add a ROM folder and set up emulators
3. To sync between devices, read [Cloud sync](cloud-sync/) and [Save sync](saves/)

Want to help build it? See [Contribute](contribute/).
