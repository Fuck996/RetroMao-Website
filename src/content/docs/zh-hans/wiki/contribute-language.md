---
title: 翻译语言
description: 补充现有翻译，或者为复古猫增加一种新语言。
---

每种语言是 `languages/` 下的一个 UTF-8、LF 换行的 JSON 文件，比如 `en.json`、`ja.json`。增加语言不需要改动其他语言。

## 增加新语言

```bash
python tools/retromao.py init language --id fr --name Français --author YourName
```

`locale` 使用 BCP 47 形式，如 `fr`、`pt-BR`；`name` 使用该语言自己的名称。

## 翻译规则

- 对照 `zh-Hans.json` 的原句和实际界面翻译，不要修改中文基线。
- 保留 key、数字参数和受保护的名称。`%1$s` 这样的参数可以调整顺序，不能增删或改变类型。
- 未翻译的条目保持 `null`，不要用中文占位，也不要删除。
- 短标签按界面语境精简，但要保留动作、方向、状态和存档类型。
- 不清楚上下文的句子，可以查看 `contracts/message-context.json`，或在 PR 中提问。
- 填写 `author` 和 `credits`。在 Fork 中修改译文时，保留原作者和译者的贡献。

## 校验和预览

```bash
python tools/validate_languages.py --write-index
python tools/validate_languages.py
python tools/retromao.py preview languages/fr.json
```

预览可以检索原文和译文。校验会拒绝重复、缺失或未知的 key、参数错误、基线不兼容、保护词丢失，以及索引和文件不一致。

`index.json` 由工具生成，不要手工修改。也不要修改 `catalog_version` 和 `catalog_hash`，它们标识的是中文基线。

## 发布

语言不需要 ZIP 或 Release。提交语言 JSON 和生成的 `languages/index.json`，推送后即可。

玩家把你的仓库地址加入复古猫后，在 **设置 → 主题与显示 → 语言 → 下载语言** 中就能看到它。只有内容完整、基线匹配并通过校验的语言才能安装。
