---
title: 参与贡献
description: 开发环境、工具和发布流程总览。
---

复古猫的扩展在独立的公开仓库 [RetroMao-Community](https://github.com/Fuck996/RetroMao-Community) 中开发，**不需要主程序源码，也不需要构建 APK**。

## 选择你想做的

| 想做什么 | 技术 | 教程 |
| --- | --- | --- |
| 翻译界面 | 编辑一个 JSON | [翻译语言](../contribute-language/) |
| 增加机种或主题 | 配置文件、图片、GLB 模型 | [制作平台与主题](../contribute-platform/) |
| 增加功能 | JavaScript、HTML/CSS | [开发插件](../contribute-plugin/) |

## 准备环境

需要 Python 3.11+；插件测试和浏览器验证还需要 Node.js 22+。建议先创建并激活一个 Python 虚拟环境。Fork 仓库后，在仓库根目录运行：

```bash
python -m pip install --index-url https://pypi.tuna.tsinghua.edu.cn/simple -r requirements-dev.txt
npm ci --registry=https://registry.npmmirror.com
python tools/retromao.py check
```

## 统一工具

`tools/retromao.py` 覆盖了从创建到发布的流程：

| 命令 | 作用 |
| --- | --- |
| `init plugin｜platform｜language --id --name --author` | 从模板创建 |
| `check [路径]` | 校验语言、Schema、模板和接口 |
| `preview <路径>` | 本地预览，使用样本数据，不连接真实网盘 |
| `pack <路径> --release-tag <标签>` | 打包 ZIP |
| `publish <路径> --tag <标签> --repository <仓库>` | 发布 Release 并更新目录 |

## 发布到自己的 Fork

玩家把你的仓库地址加入复古猫后，就能看到你发布的扩展。

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

`publish` 会校验并打包、创建新 Release、回读资产核对大小和 SHA-256，全部成功后才更新目录。版本和标签不可覆盖。

:::caution[Fork 不继承 Release]
只复制上游目录，会指向你仓库中不存在的资产。保留上游条目就需要自行发布其资产，否则请移除。
:::

## 向官方投稿

发布到 Fork 和向上游投稿是两件事。向官方仓库提交 PR 时请说明：

- 目的、作者和最低宿主版本
- 权限、素材来源及许可
- 本地检查、预览和设备验收情况，未进行的验收也要写明

维护者审核后，会在官方仓库发布资产。

## 规则

- 不提交 ROM、固件、存档、密钥或账号资料。
- 只打包有明确再分发许可的素材，并保留原作者署名。
- 发布前至少验证 16:9、4:3、1:1 的布局，以及触摸和手柄操作。
- 自动检查不能替代设备、模拟器和真实网盘验收。

## 完整参考

- [公共接口导航](https://github.com/Fuck996/RetroMao-Community/blob/main/docs/INTERFACES.md)
- [开发与验收](https://github.com/Fuck996/RetroMao-Community/blob/main/docs/TESTING.md)
- [发布流程](https://github.com/Fuck996/RetroMao-Community/blob/main/docs/PUBLISHING.md)
