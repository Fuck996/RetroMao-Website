---
title: Translate
description: Improve existing translations or add a new language to RetroMao.
---

Each language is one UTF-8 JSON file with LF line endings in `languages/`, such as `en.json` or `ja.json`. Adding a language doesn't require changing the others.

## Add a language

```bash
python tools/retromao.py init language --id fr --name Français --author YourName
```

`locale` uses BCP 47, such as `fr` or `pt-BR`. `name` is the language's own name for itself.

## Translation rules

- Translate from the sentences in `zh-Hans.json` and the actual interface. Don't change the Chinese baseline.
- Preserve keys, numbered placeholders and protected names. Placeholders like `%1$s` can be reordered, but not added, removed or changed in type.
- Leave unfinished entries as `null`. Don't use Chinese as a placeholder or delete them.
- Keep short labels concise for their context, while preserving actions, directions, states and save types.
- If the context isn't clear, check `contracts/message-context.json` or ask in your pull request.
- Fill in `author` and `credits`. When editing in a fork, keep credit for the original authors and translators.

## Validate and preview

```bash
python tools/validate_languages.py --write-index
python tools/validate_languages.py
python tools/retromao.py preview languages/fr.json
```

The preview lets you search source and translated text. Validation rejects duplicate, missing or unknown keys, placeholder errors, incompatible baselines, missing protected names and indexes that don't match their files.

`index.json` is generated, so don't edit it by hand. Don't change `catalog_version` or `catalog_hash`, which identify the Chinese baseline.

## Publish

Languages don't use a ZIP or a Release. Commit the language JSON and generated `languages/index.json`, then push.

Players who add your repository URL can find the language in **Settings → Appearance → Language → Download languages**. Only complete languages that match the baseline and pass validation can be installed.
