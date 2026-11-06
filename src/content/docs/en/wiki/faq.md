---
title: FAQ
description: Common questions about games, sync and troubleshooting.
---

## Does RetroMao provide games?

No. RetroMao is a frontend and doesn't include ROMs, BIOS files or emulators.

## Do I need cloud storage?

No. Cloud storage is optional.

## What if a game won't launch?

1. Open the emulator and check that first-run setup is done and any BIOS files are set up.
2. In **Settings → Emulators**, check that the right emulator is selected for the system. For RetroArch, check the core too.
3. Check that the selected edition matches the one you installed. Editions with different package names are listed separately.

## Why did a game disappear from my list?

A game is hidden when its ROM is deleted and isn't in your cloud storage. If the file comes back, the same record is used, so favorites and save links aren't lost.

A temporarily unreadable SD card doesn't hide games. If they don't return after you reinsert it, pull to refresh.

## Why isn't a cover showing?

Check that the media file has the same name as the ROM or is in a media folder you've added, then rescan in **Library**.

## Does online scraping work?

Local identification and media matching don't need a network. ScreenScraper lookups are waiting on project authorization and aren't available yet, so use local media and compatible indexes for now.

## Sync says a version isn't compatible

Update every device that syncs, including your 3DS, to the latest version.

## Why did my WebDAV check fail?

RetroMao requires servers that can guarantee safe writes. A failure usually means the server's locking or version tags don't meet the requirements. Read the reason shown, or try a different WebDAV server.

## How do I report a problem?

Open an issue in the [community repository](https://github.com/Fuck996/RetroMao-Community/issues) with:

- Your RetroMao version (**Settings → About**)
- Your device model and Android version
- The name and version of any emulator involved
- What you did and what happened

After a crash, export crash diagnostics in **Settings → About** and attach the ZIP. It only reads this app's system exit information, not your library database or credentials.
