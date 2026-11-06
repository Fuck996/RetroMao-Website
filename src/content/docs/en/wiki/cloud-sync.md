---
title: Cloud sync
description: Connect WebDAV or Baidu Netdisk, sync ROMs and media, and send settings to a new device.
---

Cloud storage is optional. RetroMao keeps its own index there and only publishes local items you confirm. It doesn't automatically take over other files in your storage.

## Add a connection

Open **Settings → Cloud and WebDAV**.

**WebDAV**: Enter your server address, username and password, then run **Check sync writes**. It tells you if the server can't guarantee safe writes.

**Baidu Netdisk**: Choose to connect Baidu Netdisk, open the authorization page, follow the steps and paste the Refresh Token back into the app.

Each connection has a RetroMao root folder (`RetroMao` by default) and a save sync folder (`RetroMao/存档` by default). They can't overlap.

## Sync ROMs and media

1. In **Library**, set a cloud source and folder for the system.
2. Choose games in the list to upload or download, individually or in batches.
3. Track progress in **Settings → Transfers**, where you can pause, resume and cancel.

RetroMao only transfers files that differ, so a new device doesn't redownload everything. Interrupted tasks continue from the unfinished stage.

The cloud folder looks like this:

```text
RetroMao/
└── 游戏库/
    └── ps1/
        ├── ROM/
        └── 媒体/
```

:::tip[Replacing a local ROM]
You can launch a replaced ROM right away without rescanning. The next sync handles any differences.
:::

## Send settings to a new device

Use local network pairing instead of entering your account details again:

1. On the new device, open **Settings → Cloud and WebDAV → One-tap setup** (一键配置), choose **New device** (我是新设备) and note the 4-digit pairing code.
2. On the existing device, choose **Existing device** (我是老设备), find the new device or enter its IP address, then enter the pairing code.
3. Select the connections to send, then tap **Sync settings** (同步配置).

Pairing is encrypted. Both devices only need to be on the same local network, with no camera or online pairing service.
