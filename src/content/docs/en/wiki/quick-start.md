---
title: Get started
description: Add a ROM folder, set up emulators and launch your first game.
---

## 1. Organize your ROMs

We recommend one root folder with a subfolder for each system:

```text
ROMs/
├── FC/
├── SFC/
├── GBA/
└── PSX/
```

## 2. Add your ROM root folder

1. Open **Settings → Library → Add ROM folder**.
2. In the system file picker, choose the root folder, such as `ROMs`, and allow access.
3. RetroMao finds systems from folder names, indexes and unambiguous file extensions. It only asks about folders it can't identify.

You don't need to add systems one at a time. Arcade folders are automatically split into series using a built-in database.

## 3. Add media (optional)

Scanning automatically matches:

- PNG, JPG, WebP, BMP and GIF images, and MP4, WebM and AVI videos, with the same name as the ROM
- Media in the ROM folder and its subfolders
- Common names such as `-cover`, `_box_front`, `-cartridge`, `-disc` and `-logo`
- Existing indexes in the folder, such as `gamelist.xml` and `metadata.pegasus.txt`

If your media is somewhere else, use **Add media folder**, then rescan the matching ROM folder.

When a cover is missing, the library shows a built-in placeholder, and 3D models can still be previewed.

## 4. Set up emulators

1. Install an emulator and open it once to finish its setup.
2. Open **Settings → Emulators** and choose an emulator for the system. RetroArch also needs a core.

## 5. Play

Go back to your library, select a game and press A or tap **Play**.

## How your library stays up to date

RetroMao checks in the background when it starts, when you return to it and when you pull to refresh:

- New ROMs and index changes are found automatically.
- If a ROM is deleted and isn't in your cloud storage, it's hidden from the list. Its details, favorites and save links are kept, and the same record is used if the file comes back.
- If an SD card is removed or temporarily unreadable, its games aren't treated as deleted. They come back when the card is reinserted.

## Next steps

- [Library and controls](../library/)
- [Import from another frontend](../import/)
- [Cloud sync](../cloud-sync/)
