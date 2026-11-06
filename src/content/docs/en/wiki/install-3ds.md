---
title: Install the 3DS sync app
description: Install the sync app on a 3DS and import your cloud settings over your local network.
---

The 3DS sync app reads and writes the saves games actually use through the system save services, with no need for Checkpoint. It supports WebDAV and Baidu Netdisk, and shares one set of cloud saves with the Android app.

## Before you start

- Your 3DS needs custom firmware such as Luma3DS, and FBI. An unmodified system can't install CIA files. See the [3DS Hacks Guide](https://3ds.hacks.guide/finalizing-setup.html).
- You need the RetroMao Android app with cloud storage already connected, on the same local network as the 3DS.

## Install

1. On the [Download page](../../download/), download `RetroMao-3DS-x.x.x.cia`.
2. Copy the CIA to the `cias` folder on your SD card.
3. Open FBI, go to `SD → cias`, select the CIA, choose `Install and delete CIA` and press A to confirm.
4. Return to the HOME Menu and open RetroMao.

To update, install the new version over the old one with FBI. Settings, task records and backups in `sdmc:/3ds/RetroMao/` are kept.

## Import cloud settings

You can't enter account details on the 3DS. Settings are only imported through local network pairing.

1. On the 3DS, open `START → Sync settings → One-tap setup → New device`. The screen shows its IP address and a 4-digit pairing code.
2. In the Android app, open **Settings → Cloud and WebDAV → One-tap setup (一键配置) → Existing device (我是老设备)**. Find the 3DS or enter its IP address, then enter the pairing code.
3. Select the connections to send, then tap **Sync settings** (同步配置).
4. Back in the 3DS sync settings, select a sync source.

The exact labels can differ slightly by language.

## Sync saves

1. Choose games in the lower-screen grid: touch or press A to select, use the D-pad to move and L/R to change pages.
2. Press START, choose **Sync saves** and confirm the games and source.
3. Wait for it to finish. The upper screen shows each stage and result.

:::note[If it's interrupted]
Downloaded saves are fully staged and verified first. The current save is then backed up, and the new one is written last. After an interruption, the original task must be restored or finished before you can sync again.
:::

Use `Language` (SELECT) at the upper left of the lower screen to switch between Simplified Chinese, Traditional Chinese, English and Japanese.

## Limitations

- Some games' extra data needs you to confirm which game it belongs to. The app lists the game and archive ID so you can confirm or skip it.
- Some system software, such as Luma3DS 7.1, limits Loader connections, so extra data may not be confirmed. The results will say so.
- If part of a save can't be read, the results show that only readable areas were synced, along with the original error code. This doesn't repair damaged data.
- Credentials are tied to the current console. Copying `sdmc:/3ds/RetroMao/` to another console can't replace pairing.
