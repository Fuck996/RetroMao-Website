---
title: 翻譯語言
description: 補充現有翻譯，或者為復古貓增加一種新語言。
---

每種語言是 `languages/` 下的一個 UTF-8、LF 換行的 JSON 檔案，比如 `en.json`、`ja.json`。增加語言不需要改動其他語言。

## 增加新語言

```bash
python tools/retromao.py init language --id fr --name Français --author YourName
```

`locale` 使用 BCP 47 形式，如 `fr`、`pt-BR`；`name` 使用該語言自己的名稱。

## 翻譯規則

- 對照 `zh-Hans.json` 的原句和實際介面翻譯，不要修改中文基線。
- 保留 key、數字引數和受保護的名稱。`%1$s` 這樣的引數可以調整順序，不能增刪或改變型別。
- 未翻譯的條目保持 `null`，不要用中文佔位，也不要刪除。
- 短標籤按介面語境精簡，但要保留動作、方向、狀態和存檔型別。
- 不清楚上下文的句子，可以檢視 `contracts/message-context.json`，或在 PR 中提問。
- 填寫 `author` 和 `credits`。在 Fork 中修改譯文時，保留原作者和譯者的貢獻。

## 校驗和預覽

```bash
python tools/validate_languages.py --write-index
python tools/validate_languages.py
python tools/retromao.py preview languages/fr.json
```

預覽可以檢索原文和譯文。校驗會拒絕重複、缺失或未知的 key、引數錯誤、基線不相容、保護詞丟失，以及索引和檔案不一致。

`index.json` 由工具生成，不要手工修改。也不要修改 `catalog_version` 和 `catalog_hash`，它們標識的是中文基線。

## 釋出

語言不需要 ZIP 或 Release。提交語言 JSON 和生成的 `languages/index.json`，推送後即可。

玩家把你的倉庫地址加入復古貓後，在 **設定 → 主題與顯示 → 語言 → 下載語言** 中就能看到它。只有內容完整、基線匹配並透過校驗的語言才能安裝。
