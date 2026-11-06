---
title: 制作平台与主题
description: 用配置文件增加机种，或制作主题包。
---

平台和主题都是不运行代码的 ZIP 包，通过 `catalog.json` 发布。

## 平台包

```bash
python tools/retromao.py init platform --id msx --name MSX --author YourName
```

ZIP 根目录放 `platform.json`：

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

- **id**：2～32 位小写字母、数字、`_`、`-`，不能与内置机种或已安装扩展重复。
- **extensions**：不带点。可以与其他机种重叠，但重叠的扩展名不能单独用于自动识别。
- **coverAspectRatio**：封面的宽／高，范围 0.5～2。
- **图标**：PNG/WebP，单张不超过 8 MiB、宽高不超过 2048 像素。

### 格式版本

| schemaVersion | 新增内容 | 最低宿主 |
| --- | --- | --- |
| 1 | 机种身份、扩展名、图标 | 0.9.44 |
| 2 | 声明式启动配置（URI／RetroArch） | 0.9.108 |
| 3 | 包内默认 Logo 和像素图、有无包装、无介质机种、包装和介质 GLB、区域封面比例、材质描述 | 1.0.32 |

添加启动配置时，必须核对模拟器官方的包名、完整 Activity、URI 支持或核心 ID。

## 主题包

ZIP 根目录放 `theme.json`：

```json
{
  "schemaVersion": 3,
  "id": "example",
  "name": "示例主题",
  "author": "作者",
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

- 主题可以包含配色、背景、动效、机种图标、字体和模型，省略的槽位不会被凭空生成。
- 模型使用 GLB 2.0，单个不超过 32 MiB。替换模型只换几何文件，仍使用复古猫的渲染和灯光，请确认贴图正确映射。
- 使用扩展平台的素材时，要先安装对应的平台。
- 在线主题还需要 1280×720 的 PNG/WebP 预览图（`previews/<id>.png`）。
- 格式版本 4 增加可选的 `dualScreen` 对象，可以调整双屏布局。声明后还要检查上屏和下屏的多种比例。

完整示例见仓库的 [`examples/amber`](https://github.com/Fuck996/RetroMao-Community/tree/main/examples/amber)。

## 验收

```bash
python tools/retromao.py check extensions/msx
python tools/retromao.py preview extensions/msx
python tools/retromao.py pack extensions/msx --release-tag msx-1.0.0
```

把 ZIP 复制到设备，用 [离线导入入口](../extensions/) 安装，然后验证：

- 16:9、4:3、1:1 的布局，以及触摸和手柄操作
- 平台：扫描、模拟器版本、核心和固件依赖、启动和返回
- 主题：实际界面、封面映射

完成后，按 [发布流程](../contribute/) 发布。

## 版权

名称、图标、背景、包装图和模型必须由你自行创作，或者有可再分发的许可。
