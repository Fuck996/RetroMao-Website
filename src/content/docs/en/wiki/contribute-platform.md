---
title: Make systems and themes
description: Add a system with a config file, or make a theme pack.
---

Systems and themes are ZIP packs that don't run code, and they're published through `catalog.json`.

## System packs

```bash
python tools/retromao.py init platform --id msx --name MSX --author YourName
```

Put `platform.json` in the root of the ZIP:

```json
{
  "schemaVersion": 2,
  "platform": {
    "id": "msx",
    "name": "MSX",
    "aliases": ["msx", "msx computer"],
    "extensions": ["rom", "mx1", "mx2"],
    "medium": "CARTRIDGE"
  },
  "manufacturer": "ASCII / Microsoft",
  "releaseYear": 1983,
  "coverAspectRatio": 0.75
}
```

- **id**: 2–32 lowercase letters, digits, `_` or `-`. It can't match a built-in system or an installed extension.
- **extensions**: No leading dot. They can overlap with other systems, but overlapping extensions aren't enough for automatic identification.
- **coverAspectRatio**: Cover width divided by height, from 0.5 to 2.
- **Icons**: PNG or WebP, up to 8 MiB and 2048 pixels on each side.

### Format versions

| schemaVersion | Adds | Minimum host |
| --- | --- | --- |
| 1 | System identity, extensions, icons | 0.9.44 |
| 2 | Declarative launch settings (URI or RetroArch) | 0.9.108 |
| 3 | Default logo and pixel art in the pack, physical box availability, systems with no media, box and media GLBs, regional cover ratios, material descriptors | 1.0.32 |

For launch settings, verify the emulator's official package name, full Activity, URI support or core ID.

## Theme packs

Put `theme.json` in the root of the ZIP:

```json
{
  "schemaVersion": 3,
  "id": "example",
  "name": "Example theme",
  "author": "Author",
  "colors": {
    "background": "#141210", "surface": "#22201D", "foreground": "#F8F3EA",
    "muted": "#BBB0A0", "accent": "#E8A94C", "outline": "#514536"
  },
  "assets": {
    "background.library": "art/library.png",
    "platform.msx.logo": "art/msx-logo.png",
    "model.msx.packaging": "models/msx-box.glb",
    "model.msx.gameMedia": "models/msx-cart.glb"
  }
}
```

- Themes can include colors, backgrounds, motion, system icons, fonts and models. Slots you leave out aren't generated for you.
- Models use GLB 2.0, up to 32 MiB each. Replacing a model only swaps the geometry and keeps RetroMao's rendering and lighting, so check that artwork maps correctly.
- To use assets for an extension system, install that system first.
- Online themes also need a 1280×720 PNG or WebP preview at `previews/<id>.png`.
- Format version 4 adds an optional `dualScreen` object for dual-screen layouts. If you declare it, also check the upper and lower screens at their supported ratios.

See [`examples/amber`](https://github.com/Fuck996/RetroMao-Community/tree/main/examples/amber) for a full example.

## Test

```bash
python tools/retromao.py check extensions/msx
python tools/retromao.py preview extensions/msx
python tools/retromao.py pack extensions/msx --release-tag msx-1.0.0
```

Copy the ZIP to a device, install it using the [offline import options](../extensions/), then check:

- 16:9, 4:3 and 1:1 layouts, with touch and controller
- Systems: scanning, emulator versions, core and firmware dependencies, launching and returning
- Themes: the actual interface and cover mapping

When you're done, follow the [publishing steps](../contribute/).

## Copyright

Names, icons, backgrounds, box art and models must be your own work or have a license that allows redistribution.
