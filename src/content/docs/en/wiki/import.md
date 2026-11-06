---
title: Import from another frontend
description: Import from ES-DE, EmulationStation, Pegasus and LaunchBox.
---

If you've used another frontend, you can bring its data into RetroMao. Imports are converted to RetroMao's own data, so everyday use and sync no longer depend on the original files.

## Supported formats

| Source | Index files |
| --- | --- |
| ES-DE, EmulationStation | `gamelist.xml` |
| Pegasus | `metadata.txt`, and files starting with `metadata.pegasus` and ending in `.txt` |
| LaunchBox | Platform XML |

## Automatic import

RetroMao checks for compatible indexes when you add a ROM folder, rescan or pull to refresh:

- If there's one index, it's read automatically.
- If there are several, you choose which to use, and your choice is saved. You're asked again if the candidates change.
- Relative ROM and media paths are resolved from the index file's folder, with no extra mapping needed.

## Manual import

Open **Settings → Library → Import existing library** and choose an index file. If media paths are outside the folders you've allowed, such as drive-letter paths from a PC, follow the prompts to relocate them.

## How systems are identified

- Pegasus: known shortnames and collection names
- LaunchBox: the Platform field
- ROM extensions and folder names that clearly belong to one system

If it can't tell, RetroMao asks you. It never assumes the system you're browsing. Indexes with several systems are imported separately for each system.

:::note[External launch commands aren't run]
Launch commands in an index are never run. Games always start with the emulator you've configured.
:::

## Your changes are kept

Reimporting keeps your favorites, play history and any details you've edited.
