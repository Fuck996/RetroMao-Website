---
title: Save sync
description: Set up save folders, sync saves, resolve diverged histories and restore versions.
---

You start save sync yourself. It doesn't run when a game launches, and it never uses timestamps to decide which save wins.

## Set up

1. Add a cloud connection first. See [Cloud sync](../cloud-sync/).
2. Open **Save sync** in the main navigation, choose **Add save folder**, select a system, emulator and cloud connection, then allow access to the emulator's save folder.

Different emulators for one system can be set up separately. One folder can also sync to several cloud connections, each with its own version history.

Set up in-game saves and save states separately, and don't mix the two in one location. RetroArch options are in **Settings → RetroArch saves**.

## Sync

On the **Save sync** page, tap **Sync all**. RetroMao compares your device with your cloud storage, plans uploads, downloads, matches and conflicts, then transfers only what differs. Interrupted tasks continue from a checkpoint.

## Diverged histories

If two devices continue from the same version, the history diverges. RetroMao doesn't decide which to keep. It asks you to choose.

## Version history and restoring

- Each synced version is stored in your cloud storage.
- See versions in a game's actions menu or in **Settings → Save sync history**.
- If restoring would overwrite your progress, RetroMao protects the current content first.

## What sync won't do

- It won't delete cloud saves because a local file is missing. Missing local files are restored from the cloud.
- It won't automatically remove past versions.

## Syncing with a 3DS

The Android app and the [3DS sync app](../install-3ds/) use the same save folder structure. Update all devices to the latest version first.

## Saves in Android/data

Some emulators keep saves in `Android/data`, which newer Android versions restrict. When needed, RetroMao asks for the system's All files access permission and lets you pick the exact folder in the system picker.
