---
title: AI integration plan
description: Planned AI search, assistant suggestions, sync, artwork, translation and plugin development for RetroMao.
---

November 17, 2026 · Planned

RetroMao plans to add shared AI capabilities, starting with its existing search interface. The plan also covers library artwork, screen translation, plugin development, sync based on play activity and posters for recently played games. On dual-screen handhelds, the idle secondary screen can surface suggestions from the assistant.

## Shared AI capabilities

RetroMao will manage services, models and credentials in one place. Each feature will use the capabilities it needs, such as text understanding, image recognition, translation or image generation. The first prototype will inform the choice of providers and models. Cloud features will explain what they send and limit each request to the required query, game metadata, play or diagnostic summary and player-selected reference images. Credentials, ROMs and save files stay in their existing workflows. If a capability is unavailable, RetroMao will show why and keep ordinary search and local features available.

## AI in the existing search interface

The library, recent games, favorites and apps will keep their existing top-bar search and L3 or custom shortcut. Matching names, filenames and enabled Pinyin aliases will appear immediately. Players can start or cancel an AI query in the same panel. Changing pages or systems ends the previous request. Closing the panel restores list focus. [Game library](../library/)

- **Find games by description.** Ask for “that GBA game where you catch monsters.” RetroMao searches the visible games in the current page and system and explains its matches. Results use the existing version grouping, launch and multi-select behavior.
- **Choose what to play next.** Ask “What should I play next?” in search or open the same panel from Recent Games. RetroMao picks one game from your library based on recently played genres, favorites and stated preferences, and explains its pick. Refine a suggestion with “something shorter for tonight.” Players with little play history can start with a genre or occasion.
- **Understand launch, file and save problems.** Use real diagnostics to explain the cause and jump to the relevant setting. When saves conflict, the assistant can summarize the devices, times and known versions side by side. The existing conflict screen handles the player's choice.
- **Find a walkthrough or a hint.** Use the current game and known release, with an optional screenshot selected by the player. Show a spoiler-free clue first. Players can expand it to see the full solution and its source, and choose the version or stage when needed.

Existing search scopes and plugin aliases still apply. The panel supports touch and controllers. The keyboard opens when the player selects the input. Verify controls and focus restoration at 16:9, 4:3 and 1:1, including both A/B layouts.

## Assistant suggestions on the secondary screen

When the assistant has a proactive suggestion and the idle secondary screen is showing RetroMao's quick settings bubble, the bubble gradually transitions into a chat bubble. Tapping it opens the assistant conversation on that screen and goes straight to the suggestion that triggered it, such as syncing a recently updated RPG save. Players can act on the suggestion or defer it. Once the suggestion has been read and the conversation is closed, the bubble returns to its quick settings appearance. The bubble and conversation follow the existing secondary-screen visibility and OLED protections.

## ROM and save sync based on play activity

RetroMao will reassess sync periodically in the background and when the player returns to the frontend. Recent games, changes in play activity, pending changes, the last successful sync and the current connection help determine what to sync, in which direction and when. For example, after several sessions with the same RPG, it can prioritize syncing its updated save. Changed ROMs in mapped folders can prompt an upload or download suggestion with the files and estimated size.

The frontend shows the reason, scope, direction and destination. Players can run the sync or defer it. If automatic execution is enabled, eligible tasks within the player's authorization go to the existing sync queue. Players can inspect the reason, progress and result and use the existing pause or cancel actions. ROM and save permissions are granted separately. Unreadable files, saves still being written and version conflicts follow existing checks and resolution flows. The sync engine still determines actual differences, validates transfers and publishes versions. [Cloud sync](../cloud-sync/) · [Save sync](../saves/)

## Artwork organization and scraping

Check a system or selection for missing artwork, mismatched releases and incorrect media roles. Use existing ROM hashes, release IDs and indexes to identify the game. AI can read text on an image, tell box fronts from cartridge labels and rank candidates with known sources. Preview the match evidence, region and 2D or 3D appearance. Players can accept clear missing-art matches in batches and resolve uncertain ones individually. Custom artwork changes only for replacements the player selects. The feature uses existing scraper tasks, cache, media editing and ScreenScraper authorization.

If image generation is available, RetroMao can create candidates for digital or preinstalled releases and games with no usable original after checking. Art follows the system and media-role templates, records references and flags generated content. Players preview it before import. Artwork collections retain their existing release checks, source records and disclosure for generated art.

## Recently played game posters

With an image generation model, players can choose one or more recent games and make a poster. The model uses the selected games, cover art and optional screenshots as visual references. RetroMao typesets titles, systems, dates and optional play statistics from recorded data. Players choose what to show in the preview.

Export square or portrait images for social sharing. Players can choose another version, save the image or select a social app in the system share sheet.

## Screen translation

Start with one-button translation through a custom shortcut or secondary-screen quick settings. With system permission, RetroMao captures the current game screen, reads menus or dialogue and shows the original text with its translation. Dual-screen devices use an available idle screen. Single-screen devices get a dismissible overlay. Capture restrictions are shown when they occur. Test the shortcut on representative handhelds and emulators before adding automatic updates as dialogue changes and per-game terminology. Dual-screen translation follows the existing display session and OLED protections.

## AI-assisted plugin development

Describe a plugin such as “List Japanese NDS releases missing cartridge art.” Use the existing SDK, examples and packaging tools to generate a manifest, script and any required pages. Check the minimum host version, APIs and permissions, then let the player import and try it locally. Start with a read-only missing-art report, then test batch previews and search aliases. Installation, activation, permissions and execution use the existing plugin flow. [Plugin development](../contribute-plugin/)

## Suggested implementation order

1. Add shared AI capabilities. Verify natural-language game search and immediate ordinary results, then add next-game recommendations.
2. Check for missing and mismatched artwork, preview batch changes and use the missing-art report to test plugin generation. When image generation is available, verify poster preview, export and sharing.
3. Verify shortcut translation, single-screen presentation and dual-screen handoff on real hardware, then add automatic dialogue updates. Add answers grounded in diagnostics and walkthrough sources to search.
4. Verify sync suggestions and one-action execution, the idle-screen bubble transition and direct navigation to the suggestion. Then verify periodic reassessment, preauthorized execution, task deduplication and conflict handling.
