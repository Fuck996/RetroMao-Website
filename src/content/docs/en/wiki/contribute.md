---
title: Contribute
description: An overview of the development setup, tools and publishing.
---

RetroMao extensions are developed in a separate public repository, [RetroMao-Community](https://github.com/Fuck996/RetroMao-Community). **You don't need the app's source code or an APK build.**

## Choose what to build

| Goal | Skills | Guide |
| --- | --- | --- |
| Translate the interface | Editing a JSON file | [Translate](../contribute-language/) |
| Add a system or theme | Config files, images, GLB models | [Make systems and themes](../contribute-platform/) |
| Add features | JavaScript, HTML/CSS | [Develop plugins](../contribute-plugin/) |

## Set up

You need Python 3.11+, plus Node.js 22+ for plugin tests and browser checks. We recommend creating and activating a Python virtual environment. Fork the repository, then run these from its root:

```bash
python -m pip install -r requirements-dev.txt
npm ci
python tools/retromao.py check
```

## One tool for everything

`tools/retromao.py` covers everything from creating to publishing:

| Command | What it does |
| --- | --- |
| `init plugin｜platform｜language --id --name --author` | Creates from a template |
| `check [path]` | Validates languages, schemas, templates and APIs |
| `preview <path>` | Previews locally with sample data, without real cloud storage |
| `pack <path> --release-tag <tag>` | Packages a ZIP |
| `publish <path> --tag <tag> --repository <repo>` | Publishes a Release and updates the catalog |

## Publish to your fork

Players who add your repository URL to RetroMao can see what you publish.

```bash
python tools/retromao.py check extensions/demo-plugin
git add extensions/demo-plugin
git commit -m "Add demo plugin 1.0.0"
git push origin HEAD
python tools/retromao.py publish extensions/demo-plugin --tag demo-plugin-1.0.0 --repository YourAccount/RetroMao-Community --notes extensions/demo-plugin/RELEASE_NOTES.md
git add plugins/index.json
git commit -m "Publish verified demo plugin catalog"
git push origin HEAD
```

`publish` validates and packages your extension, creates a new Release and downloads the asset to check its size and SHA-256. It updates the catalog only if all of this succeeds. Versions and tags can't be overwritten.

:::caution[Forks don't inherit Releases]
Copying only the upstream catalog points to assets your repository doesn't have. Publish those assets yourself, or remove those entries.
:::

## Contribute upstream

Publishing to your fork and contributing upstream are separate. In a pull request to the official repository, include:

- The purpose, author and minimum host version
- Permissions, plus asset sources and licenses
- Local checks, previews and device testing, including anything you didn't test

After review, maintainers publish the assets in the official repository.

## Rules

- Don't submit ROMs, firmware, saves, keys or account details.
- Only package assets with clear permission to redistribute, and credit the original authors.
- Before publishing, test at least 16:9, 4:3 and 1:1 layouts, with both touch and controller.
- Automated checks don't replace testing on devices, emulators and real cloud storage.

## Full reference

- [Public interfaces](https://github.com/Fuck996/RetroMao-Community/blob/main/docs/INTERFACES.md)
- [Development and acceptance](https://github.com/Fuck996/RetroMao-Community/blob/main/docs/TESTING.md)
- [Publishing](https://github.com/Fuck996/RetroMao-Community/blob/main/docs/PUBLISHING.md)
