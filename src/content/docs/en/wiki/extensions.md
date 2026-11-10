---
title: Install extensions
description: Add extension repositories and install languages, systems, themes and plugins.
---

Extensions come from public GitHub repositories. The official one is [RetroMao-Community](https://github.com/Fuck996/RetroMao-Community), and you can add forks maintained by others.

## Add a repository

1. Tap the unlabeled repository button at the **lower right of the Settings home page**.
2. Enter one public GitHub repository URL per line.
3. Save. Languages, themes, systems and plugins all use this list.

Keep a line for each source to use official and community content together. If the list is empty, no repositories are contacted.

## Install online

| Type | Where |
| --- | --- |
| Languages | Settings → Appearance → Language → Download languages |
| Themes | Settings → Appearance → Community themes |
| Systems | Settings → Library → Community systems |
| Plugins | Main navigation → Plugins → Store |

Each download's exact size and SHA-256 are checked, and files that don't match aren't installed. Online downloads need access to GitHub.

## Install offline

Download the ZIP from the repository's Release. **Don't unzip it.** Copy it to your device, then import it:

- Themes: **Settings → Appearance → Import theme pack**
- Systems: **Settings → Library → Import system pack**
- Plugins: Import from **Plugins → Installed**

For installation, preview, and update instructions, see [Install and update themes](../themes/).

## Security

- Languages, systems and themes only contain configuration and assets. They don't run code.
- Plugins can run scripts, but only with the capabilities they declare and you approve. If an update adds capabilities, the plugin stays disabled until you approve them.
- Plugins that can reach any host are marked high risk. Only install plugins you trust.

## What system packs don't include

System packs define a system's identity, extensions, icons and similar details. **They don't include games or emulators.** You still need to add a ROM folder and set up an emulator.
