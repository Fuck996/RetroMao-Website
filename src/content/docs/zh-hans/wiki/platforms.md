---
title: 机种与模拟器
description: 复古猫内置的机种，以及已适配的模拟器。
---

## 内置机种

下列 35 个机种都有包装盒和游戏介质模型。

| 厂商 | 机种 |
| --- | --- |
| 任天堂 | FC、FC 磁碟机、SFC、Game Boy、Game Boy Color、Game Boy Advance、N64、GameCube、Wii、Wii U、NDS、3DS、Switch |
| 世嘉 | Master System、Mega Drive、Mega CD、32X、Game Gear、Saturn、Dreamcast |
| 索尼 | PlayStation、PlayStation 2、PlayStation 3、PSP、PS Vita |
| NEC | PC Engine、PC Engine CD |
| SNK | NEO GEO、NEO GEO CD、NEO GEO Pocket、NEO GEO Pocket Color |
| 万代 | WonderSwan、WonderSwan Color |
| 微软 | Xbox、Xbox 360 |

街机另外按内置 ROM 识别库划分为 CPS、PGM、NAOMI、NEO GEO 和其他街机，同一个物理目录可以分属多个平台。

需要其他机种时，可以安装 [社区平台](../extensions/)，或者 [自己制作平台包](../contribute-platform/)。

## 已适配的模拟器

复古猫通过各模拟器公开的启动入口传递 ROM。模拟器需要你自行安装并完成首次初始化。

| 机种 | 模拟器 |
| --- | --- |
| 多机种 | RetroArch、RetroArch 64 |
| PSP | PPSSPP、PPSSPP Gold |
| NDS | melonDS、DraStic、NooDS |
| 3DS | Azahar、Citra 派生版 |
| GameCube、Wii | Dolphin 及其派生版 |
| N64 | Mupen64Plus AE、M64Plus FZ |
| PlayStation | DuckStation |
| PlayStation 2 | NetherSX2、ARMSX2 |
| Saturn | Yaba Sanshiro 2 |
| Dreamcast | Flycast |
| PS Vita | Vita3K |
| Wii U | Cemu |
| Switch | Eden、Citron、Kenji-NX |

可选的模拟器以 **设置 → 模拟器与启动** 中的列表为准。第三方模拟器更新可能改变启动方式；遇到问题时，请反馈模拟器的名称和版本。

## 使用模拟器前

- **先打开一次模拟器**，完成它自己的初始化。
- **BIOS 和固件**由模拟器读取，请在模拟器内配置。
- **Vita3K**：游戏须已安装在 Vita3K 内。
- **Dolphin 多碟游戏**：使用 M3U 列表时，复古猫按列表顺序传递光盘。
