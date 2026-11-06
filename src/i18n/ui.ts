export const locales = [
  { code: 'zh-hans', lang: 'zh-Hans', label: '简体中文' },
  { code: 'zh-hant', lang: 'zh-Hant', label: '繁體中文' },
  { code: 'en', lang: 'en', label: 'English' },
  { code: 'ja', lang: 'ja', label: '日本語' },
] as const;

export type Locale = (typeof locales)[number]['code'];
export const defaultLocale: Locale = 'zh-hans';
export const langOf = (locale: Locale) => locales.find((l) => l.code === locale)!.lang;

/** 去掉路径开头的语言段，返回以 / 开头、以 / 结尾的路径。 */
export function stripLocale(pathname: string) {
  const parts = pathname.split('/').filter(Boolean);
  if (parts.length && locales.some((l) => l.code === parts[0])) parts.shift();
  return parts.length ? `/${parts.join('/')}/` : '/';
}

export const localePath = (locale: Locale, path = '/') => `/${locale}${path === '/' ? '/' : path}`;

/**
 * 语言匹配规则与 App 一致：先看手动选择，再按系统语言列表顺序匹配，
 * 中文区分简繁脚本，没有匹配时显示简体中文。
 * 以字符串导出，供静态页面内联执行，不需要边缘函数。
 */
export const detectLocaleScript = `window.rmLocale=function(){var s=null;try{s=localStorage.getItem('retromao-locale')}catch(e){}if(s&&/^(zh-hans|zh-hant|en|ja)$/.test(s))return s;var l=navigator.languages&&navigator.languages.length?navigator.languages:[navigator.language||''];for(var i=0;i<l.length;i++){var t=String(l[i]).toLowerCase();if(t.indexOf('zh')===0)return /hant|-tw|-hk|-mo/.test(t)?'zh-hant':'zh-hans';if(t.indexOf('en')===0)return 'en';if(t.indexOf('ja')===0)return 'ja'}return 'zh-hans'};`;

const zhHans = {
  meta: {
    homeTitle: '复古猫 RetroMao：现代化的复古游戏前端',
    homeDesc: '本地优先的 Android 复古游戏前端：35 个机种的 3D 包装与介质、手柄优先的操作、网盘同步和存档版本历史。',
    downloadTitle: '下载复古猫',
    downloadDesc: '下载复古猫 Android 版与 3DS 存档同步程序。',
    aboutTitle: '关于作者',
    aboutDesc: '复古猫的作者 4NPC 与相关链接。',
    notFound: '页面不存在',
  },
  nav: { home: '首页', download: '下载', changelog: '更新日志', wiki: 'Wiki', about: '关于', language: '语言', followSystem: '跟随系统', theme: '切换明暗', menu: '主导航' },
  hero: {
    title: '把卡带和光盘，\n重新摆回架子上。',
    lead: '复古猫是一款本地优先的 Android 复古游戏前端。选一个 ROM 目录就能开始，用手柄浏览每台游戏机原本的包装和介质，再用插件、主题和平台包扩展成你想要的样子。',
    cta: '下载复古猫',
    ctaWiki: '阅读 Wiki',
    meta: 'Android 8.0 及以上 · 3DS 存档同步程序另行提供',
  },
  mock: {
    nav: ['游戏库', '最近游戏', '收藏', '应用', '同步存档', '插件', '设置'],
    hints: [['A', '确认'], ['L1 R1', '切换机种'], ['L2 R2', '切换页面'], ['X', '操作'], ['Y', '收藏']],
    play: '开始游戏',
    local: '本机',
    caption: '网页重现的 App 界面，不是实机截图。包装盒是 App 的同款模型，可以拖动查看。这里的游戏都是虚构的演示内容，封面由 AI 绘制。',
    pickSystem: '选择机种', systemSettings: '机种设置', search: '搜索', searchGames: '搜索游戏',
    modelLicense: '网站上的 3D 模型和复古猫标志版权归 4NPC 所有，仅用于展示复古猫。未经许可，不得下载后再分发，也不得用于其他项目。',
    themes: { modern: '流光', library: '藏馆', warm: '简约白', black: '简约黑' },
    all: '全部',
  },
  stats: [['35', '个机种的包装与介质模型'], ['4', '种内置语言，可自动匹配'], ['3', '种界面风格，主题可扩展'], ['0', '个账号，不配置网盘也能用']],
  shelf: {
    title: '每台机器，都有它自己的盒子',
    body: '纸盒、塑料盒、珠宝盒、卡带和光盘分别建模，默认采用日版造型。内置 35 个机种，封面会贴到实物比例的 3D 模型上。',
  },
  local: {
    title: '选一次目录，剩下的交给它',
    steps: [
      ['选择 ROM 总目录', '按目录名、索引和明确的扩展名发现机种，无法判断的目录才询问你。'],
      ['自动匹配媒体', '同名图片和视频自动归位，也可以读取 ES-DE、Pegasus、LaunchBox 的已有索引。'],
      ['按下 A 开始游戏', '通过模拟器的公开入口启动：RetroArch、PPSSPP、Dolphin、DuckStation、Azahar 等。'],
    ],
  },
  sync: {
    title: '存档跟着你走，版本由你做主',
    body: '通过 WebDAV 或百度网盘同步 ROM、媒体和存档。存档由你主动同步，出现分叉时由你选择；每个版本都保存在你自己的网盘里，可以随时恢复。',
    device: 'Android 掌机',
    cloud: '你的网盘',
    ds: '3DS 原机',
    pair: '局域网一键配置，新设备不用重新填写账号。',
    versions: '版本历史',
    fork: '分叉：由你选择',
    more: '了解存档同步',
  },
  control: {
    title: '手柄优先，也适配各种屏幕',
    body: '方向键只在封面间移动，肩键切机种，扳机键切页面，按键可以重新映射，A/B 确认方向也能互换。界面以 16:9 设计，同时适配 4:3、1:1 和双屏掌机。',
    dual: '双屏',
  },
  closing: { title: '准备好把游戏摆上架了吗？', note: '复古猫不附带任何游戏 ROM、BIOS 或模拟器。' },
  download: {
    title: '下载',
    lead: '选择你的设备，再选择方便的下载渠道。不同渠道提供的是同一个文件，可以用 SHA-256 核对。',
    android: { name: '复古猫', platform: 'Android 版', desc: '游戏库、3D 媒体、模拟器启动和网盘同步。', req: 'Android 8.0 及以上', install: 'wiki/install-android/' },
    ds: { name: '复古猫 3DS 同步程序', platform: 'Nintendo 3DS 版', desc: '直接读写 3DS 原机存档，并与 Android 版使用同一份网盘存档。', req: '需要 Luma3DS 等自制固件和 FBI', install: 'wiki/install-3ds/' },
    version: '版本',
    size: '大小',
    requirement: '要求',
    file: '文件',
    sha: 'SHA-256',
    copy: '复制',
    copied: '已复制',
    get: '前往下载',
    pending: '链接准备中',
    code: '提取码',
    guide: '安装教程',
    changes: '更新日志',
    extTitle: '在找插件、主题或平台？',
    extBody: '扩展直接在复古猫里安装，也可以到社区仓库下载 ZIP 手动导入。',
    extLink: '查看社区仓库',
    syncNote: '使用同一份网盘存档的 Android 版和 3DS 版，都应先升级到最新版本再同步。',
  },
  about: {
    title: '关于作者',
    role: '复古猫作者',
    bio: '开发并维护复古猫 Android 前端、3DS 原机存档同步程序和社区扩展仓库。',
    linksTitle: '在这些地方找到我',
    links: { github: ['GitHub', '代码与社区扩展'], bilibili: ['哔哩哔哩', '视频内容'], xiaohongshu: ['小红书', '图文动态'] },
    projectTitle: '反馈与参与',
    project: [
      ['提交问题或建议', '在社区仓库创建 Issue，附上版本号和操作步骤。', 'https://github.com/Fuck996/RetroMao-Community/issues'],
      ['参与开发', '制作插件、平台、主题，或者帮忙翻译。', 'wiki/contribute/'],
    ],
  },
  footer: {
    legal: '复古猫不提供、不分发任何游戏 ROM、BIOS 或固件，请使用你合法拥有的内容。文中提及的游戏机与模拟器名称归各自权利人所有，本项目与其无隶属关系。',
    wiki: 'Wiki',
  },
  changelog: { pager: '分页', prev: '上一页', next: '下一页', title: '更新日志', lead: '复古猫 Android 版和 3DS 同步程序的版本更新记录。', all: '全部', android: 'Android', ds: '3DS', note: '', metaDesc: '复古猫 Android 版和 3DS 同步程序的更新日志。' },
  notFound: { title: '这张卡带读不出来', body: '你要找的页面不存在，或者已经搬走了。', back: '回到首页' },
};

export type Dict = typeof zhHans;

const zhHant: Dict = {
  meta: {
    homeTitle: '復古貓 RetroMao：現代化的復古遊戲前端',
    homeDesc: '本機優先的 Android 復古遊戲前端：35 個機種的 3D 包裝與媒介、以控制器為優先的操作、網盤同步和存檔版本歷史。',
    downloadTitle: '下載復古貓',
    downloadDesc: '下載復古貓 Android 版與 3DS 存檔同步程式。',
    aboutTitle: '關於作者',
    aboutDesc: '復古貓的作者 4NPC 與相關連結。',
    notFound: '找不到頁面',
  },
  nav: { home: '首頁', download: '下載', changelog: '更新日誌', wiki: 'Wiki', about: '關於', language: '語言', followSystem: '跟隨系統', theme: '切換明暗', menu: '主導覽' },
  hero: {
    title: '把卡帶和光碟，\n重新擺回架上。',
    lead: '復古貓是一款本機優先的 Android 復古遊戲前端。選一個 ROM 資料夾就能開始，用控制器瀏覽每台遊戲機原本的包裝和媒介，再用外掛程式、主題和機種包擴充成你想要的樣子。',
    cta: '下載復古貓',
    ctaWiki: '閱讀 Wiki',
    meta: 'Android 8.0 以上 · 3DS 存檔同步程式另行提供',
  },
  mock: {
    nav: ['遊戲庫', '最近遊戲', '收藏', '應用程式', '存檔同步', '外掛程式', '設定'],
    hints: [['A', '確認'], ['L1 R1', '切換機種'], ['L2 R2', '切換頁面'], ['X', '操作'], ['Y', '收藏']],
    play: '開始遊戲',
    local: '本機',
    caption: '網頁重現的 App 介面，不是實機截圖。包裝盒是 App 的同款模型，可以拖曳檢視。這裡的遊戲都是虛構的示範內容，封面由 AI 繪製。',
    pickSystem: '選擇機種', systemSettings: '機種設定', search: '搜尋', searchGames: '搜尋遊戲',
    modelLicense: '網站上的 3D 模型和復古貓標誌版權歸 4NPC 所有，僅用於展示復古貓。未經許可，不得下載後再散布，也不得用於其他專案。',
    themes: { modern: '流光', library: '藏館', warm: '簡約白', black: '簡約黑' },
    all: '全部',
  },
  stats: [['35', '個機種的包裝與媒介模型'], ['4', '種內建語言，可自動比對'], ['3', '種介面風格，主題可擴充'], ['0', '個帳號，不設定網盤也能用']],
  shelf: {
    title: '每台機器，都有它自己的盒子',
    body: '紙盒、塑膠盒、珠寶盒、卡帶和光碟分別建模，預設採用日版造型。內建 35 個機種，封面會貼到實物比例的 3D 模型上。',
  },
  local: {
    title: '選一次資料夾，其他交給它',
    steps: [
      ['選擇 ROM 總資料夾', '依資料夾名稱、索引和明確的副檔名找出機種，無法判斷的資料夾才詢問你。'],
      ['自動比對媒體', '同名圖片和影片自動歸位，也能讀取 ES-DE、Pegasus、LaunchBox 的既有索引。'],
      ['按下 A 開始遊戲', '透過模擬器的公開入口啟動：RetroArch、PPSSPP、Dolphin、DuckStation、Azahar 等。'],
    ],
  },
  sync: {
    title: '存檔跟著你走，版本由你決定',
    body: '透過 WebDAV 或百度網盤同步 ROM、媒體和存檔。存檔由你主動同步，出現分岔時由你選擇；每個版本都保存在你自己的網盤裡，可以隨時還原。',
    device: 'Android 掌機',
    cloud: '你的網盤',
    ds: '3DS 原機',
    pair: '區域網路一鍵設定，新裝置不用重新填寫帳號。',
    versions: '版本歷史',
    fork: '分岔：由你選擇',
    more: '了解存檔同步',
  },
  control: {
    title: '控制器優先，也適配各種螢幕',
    body: '方向鍵只在封面間移動，肩鍵切機種，扳機鍵切頁面，按鍵可以重新對應，A/B 確認方向也能互換。介面以 16:9 設計，同時適配 4:3、1:1 和雙螢幕掌機。',
    dual: '雙螢幕',
  },
  closing: { title: '準備好把遊戲擺上架了嗎？', note: '復古貓不附帶任何遊戲 ROM、BIOS 或模擬器。' },
  download: {
    title: '下載',
    lead: '選擇你的裝置，再選擇方便的下載管道。不同管道提供的是同一個檔案，可以用 SHA-256 核對。',
    android: { name: '復古貓', platform: 'Android 版', desc: '遊戲庫、3D 媒體、模擬器啟動和網盤同步。', req: 'Android 8.0 以上', install: 'wiki/install-android/' },
    ds: { name: '復古貓 3DS 同步程式', platform: 'Nintendo 3DS 版', desc: '直接讀寫 3DS 原機存檔，並與 Android 版使用同一份網盤存檔。', req: '需要 Luma3DS 等自製韌體和 FBI', install: 'wiki/install-3ds/' },
    version: '版本',
    size: '大小',
    requirement: '需求',
    file: '檔案',
    sha: 'SHA-256',
    copy: '複製',
    copied: '已複製',
    get: '前往下載',
    pending: '連結準備中',
    code: '提取碼',
    guide: '安裝教學',
    changes: '更新日誌',
    extTitle: '在找外掛程式、主題或機種？',
    extBody: '擴充可以直接在復古貓裡安裝，也可以到社群倉庫下載 ZIP 手動匯入。',
    extLink: '查看社群倉庫',
    syncNote: '使用同一份網盤存檔的 Android 版和 3DS 版，都應先升級到最新版本再同步。',
  },
  about: {
    title: '關於作者',
    role: '復古貓作者',
    bio: '開發並維護復古貓 Android 前端、3DS 原機存檔同步程式和社群擴充倉庫。',
    linksTitle: '在這些地方找到我',
    links: { github: ['GitHub', '程式碼與社群擴充'], bilibili: ['嗶哩嗶哩', '影片內容'], xiaohongshu: ['小紅書', '圖文動態'] },
    projectTitle: '回饋與參與',
    project: [
      ['回報問題或提出建議', '在社群倉庫建立 Issue，附上版本號和操作步驟。', 'https://github.com/Fuck996/RetroMao-Community/issues'],
      ['參與開發', '製作外掛程式、機種、主題，或者幫忙翻譯。', 'wiki/contribute/'],
    ],
  },
  footer: {
    legal: '復古貓不提供、不散布任何遊戲 ROM、BIOS 或韌體，請使用你合法擁有的內容。文中提及的遊戲機與模擬器名稱歸各自權利人所有，本專案與其無隸屬關係。',
    wiki: 'Wiki',
  },
  changelog: { pager: '分頁', prev: '上一頁', next: '下一頁', title: '更新日誌', lead: '復古貓 Android 版和 3DS 同步程式的版本更新紀錄。', all: '全部', android: 'Android', ds: '3DS', note: '', metaDesc: '復古貓 Android 版和 3DS 同步程式的更新日誌。' },
  notFound: { title: '這張卡帶讀不出來', body: '你要找的頁面不存在，或者已經搬走了。', back: '回到首頁' },
};

const en: Dict = {
  meta: {
    homeTitle: 'RetroMao: a modern frontend for retro games',
    homeDesc: 'A local-first Android frontend for retro games, with 3D boxes and media for 35 systems, controller-first navigation, cloud sync and save version history.',
    downloadTitle: 'Download RetroMao',
    downloadDesc: 'Download RetroMao for Android and the 3DS save sync app.',
    aboutTitle: 'About the author',
    aboutDesc: '4NPC, the author of RetroMao, and where to find them.',
    notFound: 'Page not found',
  },
  nav: { home: 'Home', download: 'Download', changelog: 'Changelog', wiki: 'Wiki', about: 'About', language: 'Language', followSystem: 'Follow system', theme: 'Toggle light or dark', menu: 'Main navigation' },
  hero: {
    title: 'Put your cartridges\nback on the shelf.',
    lead: 'RetroMao is a local-first Android frontend for retro games. Pick a ROM folder and start browsing every console’s original boxes and media with your controller. Then make it your own with plugins, themes and system packs.',
    cta: 'Download RetroMao',
    ctaWiki: 'Read the Wiki',
    meta: 'Android 8.0 or later · 3DS save sync app available separately',
  },
  mock: {
    nav: ['Library', 'Recent', 'Favorites', 'Apps', 'Save sync', 'Plugins', 'Settings'],
    hints: [['A', 'Select'], ['L1 R1', 'System'], ['L2 R2', 'Page'], ['X', 'Actions'], ['Y', 'Favorite']],
    play: 'Play',
    local: 'Local',
    caption: 'A web recreation of the app’s interface, not a device screenshot. The box is the same model the app uses, and you can drag it. These games are fictional demo content, with AI-generated covers.',
    pickSystem: 'Choose system', systemSettings: 'System settings', search: 'Search', searchGames: 'Search games',
    modelLicense: 'The 3D models and RetroMao logo on this site are © 4NPC and shown only to present RetroMao. Don’t redistribute them or use them in other projects without permission.',
    themes: { modern: 'Lumen', library: 'Vault', warm: 'Minimal White', black: 'Minimal Black' },
    all: 'All',
  },
  stats: [['35', 'systems with box and media models'], ['4', 'built-in languages, matched automatically'], ['3', 'interface styles, plus theme packs'], ['0', 'accounts needed, no cloud required']],
  shelf: {
    title: 'Every console gets its own box',
    body: 'Paper boxes, plastic cases, jewel cases, cartridges and discs are modeled separately, using Japanese designs by default. All 35 built-in systems wrap covers on true-to-size 3D models.',
  },
  local: {
    title: 'Choose a folder once. It handles the rest.',
    steps: [
      ['Pick your ROM root folder', 'Systems are found from folder names, indexes and unambiguous extensions. It only asks when it can’t tell.'],
      ['Media falls into place', 'Images and videos with matching names are linked automatically. Existing ES-DE, Pegasus and LaunchBox indexes can be imported.'],
      ['Press A to play', 'Games launch through each emulator’s public entry point: RetroArch, PPSSPP, Dolphin, DuckStation, Azahar and more.'],
    ],
  },
  sync: {
    title: 'Your saves travel with you. You decide the version.',
    body: 'Sync ROMs, media and saves over WebDAV or Baidu Netdisk. Saves sync when you say so, and you choose when histories diverge. Every version stays in your own cloud storage, ready to restore.',
    device: 'Android handheld',
    cloud: 'Your cloud',
    ds: 'Real 3DS',
    pair: 'One-tap pairing over your local network, so new devices don’t need your account details again.',
    versions: 'Version history',
    fork: 'Diverged: you choose',
    more: 'Learn about save sync',
  },
  control: {
    title: 'Built for controllers, fits every screen',
    body: 'The D-pad moves between covers, shoulder buttons switch systems and triggers switch pages. Buttons can be remapped and A/B confirm can be swapped. Designed at 16:9, it adapts to 4:3, 1:1 and dual-screen handhelds.',
    dual: 'Dual',
  },
  closing: { title: 'Ready to fill the shelf?', note: 'RetroMao doesn’t include any game ROMs, BIOS files or emulators.' },
  download: {
    title: 'Download',
    lead: 'Choose your device, then whichever source works best for you. Every source provides the same file, which you can verify with SHA-256.',
    android: { name: 'RetroMao', platform: 'for Android', desc: 'Library, 3D media, emulator launching and cloud sync.', req: 'Android 8.0 or later', install: 'wiki/install-android/' },
    ds: { name: 'RetroMao 3DS Sync', platform: 'for Nintendo 3DS', desc: 'Reads and writes saves directly on a real 3DS, sharing one set of cloud saves with the Android app.', req: 'Custom firmware such as Luma3DS, plus FBI', install: 'wiki/install-3ds/' },
    version: 'Version',
    size: 'Size',
    requirement: 'Requires',
    file: 'File',
    sha: 'SHA-256',
    copy: 'Copy',
    copied: 'Copied',
    get: 'Download',
    pending: 'Link coming soon',
    code: 'Access code',
    guide: 'Installation guide',
    changes: 'Changelog',
    extTitle: 'Looking for plugins, themes or systems?',
    extBody: 'Install extensions inside RetroMao, or download ZIPs from the community repository and import them.',
    extLink: 'Open the community repository',
    syncNote: 'If your Android and 3DS apps share cloud saves, update both to the latest version before syncing.',
  },
  about: {
    title: 'About the author',
    role: 'Author of RetroMao',
    bio: 'Builds and maintains the RetroMao Android frontend, the 3DS save sync app and the community extension repository.',
    linksTitle: 'Find me here',
    links: { github: ['GitHub', 'Code and community extensions'], bilibili: ['Bilibili', 'Videos'], xiaohongshu: ['Xiaohongshu', 'Posts and updates'] },
    projectTitle: 'Feedback and contributing',
    project: [
      ['Report a problem or suggest an idea', 'Open an issue in the community repository, with your version and the steps you took.', 'https://github.com/Fuck996/RetroMao-Community/issues'],
      ['Get involved', 'Make plugins, systems and themes, or help with translation.', 'wiki/contribute/'],
    ],
  },
  footer: {
    legal: 'RetroMao doesn’t provide or distribute game ROMs, BIOS files or firmware. Use only content you legally own. Console and emulator names belong to their respective owners, and this project isn’t affiliated with them.',
    wiki: 'Wiki',
  },
  changelog: { pager: 'Pages', prev: 'Previous', next: 'Next', title: 'Changelog', lead: 'Release history for RetroMao for Android and the 3DS sync app.', all: 'All', android: 'Android', ds: '3DS', note: '', metaDesc: 'Release history for RetroMao for Android and the 3DS sync app.' },
  notFound: { title: 'This cartridge won’t read', body: 'The page you’re looking for doesn’t exist or has moved.', back: 'Back to home' },
};

const ja: Dict = {
  meta: {
    homeTitle: 'RetroMao：現代的なレトロゲームフロントエンド',
    homeDesc: 'ローカル優先の Android 向けレトロゲームフロントエンド。35 機種の 3D パッケージとメディア、コントローラー中心の操作、クラウド同期、セーブのバージョン履歴に対応します。',
    downloadTitle: 'RetroMao をダウンロード',
    downloadDesc: 'RetroMao の Android 版と 3DS セーブ同期アプリをダウンロードできます。',
    aboutTitle: '作者について',
    aboutDesc: 'RetroMao の作者 4NPC と関連リンクです。',
    notFound: 'ページが見つかりません',
  },
  nav: { home: 'ホーム', download: 'ダウンロード', changelog: '更新履歴', wiki: 'Wiki', about: '作者', language: '言語', followSystem: 'システムに従う', theme: 'ライト／ダークを切り替え', menu: 'メインナビゲーション' },
  hero: {
    title: 'カセットとディスクを、\nもう一度棚に並べよう。',
    lead: 'RetroMao はローカル優先の Android 向けレトロゲームフロントエンドです。ROM フォルダーを選ぶだけで、各機種本来のパッケージとメディアをコントローラーで眺められます。プラグイン、テーマ、機種パックで自由に拡張することもできます。',
    cta: 'ダウンロード',
    ctaWiki: 'Wiki を読む',
    meta: 'Android 8.0 以降 · 3DS セーブ同期アプリは別途提供',
  },
  mock: {
    nav: ['ライブラリ', '最近', 'お気に入り', 'アプリ', 'セーブ同期', 'プラグイン', '設定'],
    hints: [['A', '決定'], ['L1 R1', '機種切替'], ['L2 R2', 'ページ切替'], ['X', '操作'], ['Y', 'お気に入り']],
    play: 'プレイ',
    local: 'ローカル',
    caption: 'アプリの画面を Web で再現したもので、実機のスクリーンショットではありません。パッケージはアプリと同じモデルで、ドラッグして確認できます。ゲームは架空のデモ用コンテンツで、カバーは AI で生成しています。',
    pickSystem: '機種を選択', systemSettings: '機種設定', search: '検索', searchGames: 'ゲームを検索',
    modelLicense: 'このサイトの 3D モデルと RetroMao ロゴの著作権は 4NPC に帰属し、RetroMao の紹介のためにのみ掲載しています。許可なく再配布したり、他のプロジェクトで使用したりしないでください。',
    themes: { modern: 'ルーメン', library: 'ヴォルト', warm: 'シンプル白', black: 'シンプル黒' },
    all: 'すべて',
  },
  stats: [['35', '機種のパッケージとメディアのモデル'], ['4', '内蔵言語（自動で選択）'], ['3', '画面スタイルとテーマパック'], ['0', 'アカウント不要、クラウドなしでも利用可']],
  shelf: {
    title: 'どの機種にも、その機種の箱を',
    body: '紙箱、プラケース、ジュエルケース、カセット、ディスクを個別にモデリングし、既定では日本版の造形を使います。内蔵の 35 機種すべてで、カバーを実物比率の 3D モデルに貼ります。',
  },
  local: {
    title: 'フォルダーを選ぶのは一度だけ',
    steps: [
      ['ROM のルートフォルダーを選択', 'フォルダー名、インデックス、明確な拡張子から機種を判別します。判別できないときだけ確認します。'],
      ['メディアを自動で関連付け', '同じ名前の画像と動画を自動で関連付けます。ES-DE、Pegasus、LaunchBox の既存インデックスも取り込めます。'],
      ['A ボタンでプレイ', 'RetroArch、PPSSPP、Dolphin、DuckStation、Azahar などを公開された入口から起動します。'],
    ],
  },
  sync: {
    title: 'セーブはどこへでも。どの版を残すかはあなたが決める',
    body: 'WebDAV または Baidu Netdisk で ROM、メディア、セーブを同期します。セーブの同期は手動で行い、分岐したときはあなたが選びます。すべてのバージョンは自分のクラウドに保存され、いつでも復元できます。',
    device: 'Android 携帯機',
    cloud: 'あなたのクラウド',
    ds: '3DS 実機',
    pair: 'ローカルネットワークのワンタッチ設定で、新しい端末にアカウント情報を再入力する必要はありません。',
    versions: 'バージョン履歴',
    fork: '分岐：あなたが選択',
    more: 'セーブ同期について',
  },
  control: {
    title: 'コントローラー中心、どの画面にも対応',
    body: '十字キーはカバーの間だけを移動し、ショルダーボタンで機種、トリガーでページを切り替えます。ボタンは割り当て直せて、A/B の決定方向も入れ替えられます。16:9 を基準に、4:3、1:1、2 画面の携帯機にも対応します。',
    dual: '2 画面',
  },
  closing: { title: 'ゲームを棚に並べる準備はできましたか？', note: 'RetroMao にゲーム ROM、BIOS、エミュレーターは含まれていません。' },
  download: {
    title: 'ダウンロード',
    lead: 'デバイスを選び、使いやすいダウンロード元を選んでください。どの配布元でも同じファイルで、SHA-256 で確認できます。',
    android: { name: 'RetroMao', platform: 'Android 版', desc: 'ライブラリ、3D メディア、エミュレーターの起動、クラウド同期。', req: 'Android 8.0 以降', install: 'wiki/install-android/' },
    ds: { name: 'RetroMao 3DS 同期アプリ', platform: 'Nintendo 3DS 版', desc: '3DS 実機のセーブを直接読み書きし、Android 版と同じクラウドセーブを使います。', req: 'Luma3DS などのカスタムファームウェアと FBI が必要', install: 'wiki/install-3ds/' },
    version: 'バージョン',
    size: 'サイズ',
    requirement: '動作条件',
    file: 'ファイル',
    sha: 'SHA-256',
    copy: 'コピー',
    copied: 'コピーしました',
    get: 'ダウンロード',
    pending: 'リンク準備中',
    code: '抽出コード',
    guide: 'インストール手順',
    changes: '更新履歴',
    extTitle: 'プラグイン、テーマ、機種をお探しですか？',
    extBody: '拡張は RetroMao の中からインストールできます。コミュニティリポジトリから ZIP をダウンロードして取り込むこともできます。',
    extLink: 'コミュニティリポジトリを開く',
    syncNote: 'Android 版と 3DS 版で同じクラウドセーブを使う場合は、同期する前に両方を最新版に更新してください。',
  },
  about: {
    title: '作者について',
    role: 'RetroMao 作者',
    bio: 'RetroMao の Android フロントエンド、3DS セーブ同期アプリ、コミュニティ拡張リポジトリを開発・保守しています。',
    linksTitle: 'リンク',
    links: { github: ['GitHub', 'コードとコミュニティ拡張'], bilibili: ['Bilibili', '動画'], xiaohongshu: ['小紅書', '投稿と近況'] },
    projectTitle: 'フィードバックと参加',
    project: [
      ['問題の報告や提案', 'コミュニティリポジトリに Issue を作成し、バージョンと操作手順を記載してください。', 'https://github.com/Fuck996/RetroMao-Community/issues'],
      ['開発に参加', 'プラグイン、機種、テーマの制作や翻訳で参加できます。', 'wiki/contribute/'],
    ],
  },
  footer: {
    legal: 'RetroMao はゲーム ROM、BIOS、ファームウェアを提供・配布しません。合法的に所有するコンテンツをご利用ください。記載のゲーム機とエミュレーターの名称は各権利者に帰属し、本プロジェクトとの提携関係はありません。',
    wiki: 'Wiki',
  },
  changelog: { pager: 'ページ', prev: '前へ', next: '次へ', title: '更新履歴', lead: 'RetroMao Android 版と 3DS 同期アプリの更新履歴です。', all: 'すべて', android: 'Android', ds: '3DS', note: '更新履歴は中国語と英語で管理しているため、英語で表示しています。', metaDesc: 'RetroMao Android 版と 3DS 同期アプリの更新履歴です。' },
  notFound: { title: 'このカセットは読み込めません', body: 'お探しのページは存在しないか、移動しました。', back: 'ホームに戻る' },
};

export const dictionaries: Record<Locale, Dict> = { 'zh-hans': zhHans, 'zh-hant': zhHant, en, ja };
export const t = (locale: Locale) => dictionaries[locale];
