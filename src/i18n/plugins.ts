import type { Locale } from './ui';

/** 首页“插件系统与可扩展性”文案；插件名称和说明来自社区仓库 plugins/index.json。 */
interface PluginCopy {
  eyebrow: string;
  title: string;
  lead: string;
  points: [string, string][];
  permission: { title: string; body: string; caps: string[]; allow: string };
  publishedTitle: string;
  publishedNote: string;
  published: [string, string][];
  kindsTitle: string;
  kindsLead: string;
  code: string;
  noCode: string;
  guide: string;
  install: string;
  kinds: [string, string, boolean, string][];
}

const zhHans: PluginCopy = {
  eyebrow: '插件系统',
  title: '不只是前端，也是一个平台',
  lead: '插件是真正能运行的程序：一段后台脚本加几个网页，通过公开的 SDK 调用复古猫的能力。不用改主程序，也不用重新打包 APK。',
  points: [
    ['能做真正的功能', '读写游戏资料、收藏和最近记录，管理媒体关联，把字段随索引同步，调用网络，读写网盘里的 JSON，为 ROM 同步增加资源，自定义启动入口。'],
    ['有自己的界面', '用 HTML、CSS 和 JavaScript 写页面，框架随你选。页面在复古猫的导航里打开，配色跟随主题，手柄方向键可以移动焦点。'],
    ['权限由玩家决定', '插件要先声明能力，玩家同意后才能启用。更新时新增能力，插件会保持停用，直到玩家再次同意。联网必须声明主机。'],
    ['不拖慢游戏', '启动游戏不等待插件。后台脚本在隔离的引擎中按需运行，任务结束后释放，关闭页面也不会中断任务。'],
    ['发布不用等我', '每个人都能用自己的 GitHub 仓库发布。玩家添加仓库地址后，就能在商店看到更新、版本和作者。'],
  ],
  permission: { title: '安装“收藏同步”？', body: '这个插件需要以下能力：', caps: ['读取和修改游戏库', '使用你允许的网盘连接'], allow: '同意并启用' },
  publishedTitle: '现在就能在商店安装',
  publishedNote: '这些插件都用同一套公开 SDK 开发，也是可参考的示例。',
  published: [
    ['收藏同步', '通过已配置的网盘同步收藏，不传输 ROM、媒体或存档。'],
    ['最近游戏记录同步', '同步最近游玩时间、次数和时长。'],
    ['拼音首字母搜索', '用拼音首字母搜索游戏和应用，例如 jsq 搜索计算器。'],
    ['Vita3K ROM 同步', '同步 Vita3K 的游戏本体、补丁、DLC 和许可。'],
    ['自定义启动入口', '选择平台并自定义模拟器启动参数。'],
  ],
  kindsTitle: '四种扩展方式',
  kindsLead: '扩展都放在公开的 GitHub 仓库里，开发时不需要主程序源码。',
  code: '运行代码',
  noCode: '不运行代码',
  guide: '开发插件',
  install: '如何安装',
  kinds: [
    ['插件', '增加功能和页面，需要玩家授权能力。', true, 'wiki/contribute-plugin/'],
    ['平台', '增加机种、扩展名、图标、3D 模型和启动配置。', false, 'wiki/contribute-platform/'],
    ['主题', '更换配色、布局、背景、动效、字体和模型。', false, 'wiki/contribute-platform/'],
    ['语言', '翻译一个 JSON 文件，就能增加一种语言。', false, 'wiki/contribute-language/'],
  ],
};

const zhHant: PluginCopy = {
  eyebrow: '外掛程式系統',
  title: '不只是前端，也是一個平台',
  lead: '外掛程式是真正能執行的程式：一段背景指令碼加幾個網頁，透過公開的 SDK 呼叫復古貓的能力。不用改主程式，也不用重新打包 APK。',
  points: [
    ['能做真正的功能', '讀寫遊戲資料、收藏和最近紀錄，管理媒體關聯，把欄位隨索引同步，呼叫網路，讀寫網盤裡的 JSON，為 ROM 同步增加資源，自訂啟動入口。'],
    ['有自己的介面', '用 HTML、CSS 和 JavaScript 寫頁面，框架隨你選。頁面在復古貓的導覽裡開啟，配色跟隨主題，控制器方向鍵可以移動焦點。'],
    ['權限由玩家決定', '外掛程式要先宣告能力，玩家同意後才能啟用。更新時新增能力，外掛程式會保持停用，直到玩家再次同意。連網必須宣告主機。'],
    ['不拖慢遊戲', '啟動遊戲不等待外掛程式。背景指令碼在隔離的引擎中按需執行，任務結束後釋放，關閉頁面也不會中斷任務。'],
    ['發布不用等我', '每個人都能用自己的 GitHub 倉庫發布。玩家加入倉庫位址後，就能在商店看到更新、版本和作者。'],
  ],
  permission: { title: '安裝「收藏同步」？', body: '這個外掛程式需要以下能力：', caps: ['讀取和修改遊戲庫', '使用你允許的網盤連線'], allow: '同意並啟用' },
  publishedTitle: '現在就能在商店安裝',
  publishedNote: '這些外掛程式都用同一套公開 SDK 開發，也是可參考的範例。',
  published: [
    ['收藏同步', '透過已設定的網盤同步收藏，不傳輸 ROM、媒體或存檔。'],
    ['最近遊戲紀錄同步', '同步最近遊玩時間、次數和時長。'],
    ['拼音首字母搜尋', '用拼音首字母搜尋遊戲和應用程式，例如 jsq 搜尋計算器。'],
    ['Vita3K ROM 同步', '同步 Vita3K 的遊戲本體、更新、DLC 與授權。'],
    ['自訂啟動入口', '選擇機種並自訂模擬器啟動參數。'],
  ],
  kindsTitle: '四種擴充方式',
  kindsLead: '擴充都放在公開的 GitHub 倉庫裡，開發時不需要主程式原始碼。',
  code: '執行程式碼',
  noCode: '不執行程式碼',
  guide: '開發外掛程式',
  install: '如何安裝',
  kinds: [
    ['外掛程式', '增加功能和頁面，需要玩家授權能力。', true, 'wiki/contribute-plugin/'],
    ['機種', '增加機種、副檔名、圖示、3D 模型和啟動設定。', false, 'wiki/contribute-platform/'],
    ['主題', '更換配色、版面、背景、動態效果、字型和模型。', false, 'wiki/contribute-platform/'],
    ['語言', '翻譯一個 JSON 檔案，就能增加一種語言。', false, 'wiki/contribute-language/'],
  ],
};

const en: PluginCopy = {
  eyebrow: 'Plugin system',
  title: 'More than a frontend. RetroMao is a platform.',
  lead: 'Plugins are real programs: a background script and a few web pages that call RetroMao through a public SDK. You don’t need to change the app or rebuild an APK.',
  points: [
    ['Build real features', 'Read and edit game details, favorites and recent records, manage media links, sync fields with the index, use the network, read and write JSON in cloud storage, add resources to ROM sync and customize launch entries.'],
    ['Bring your own interface', 'Write pages in HTML, CSS and JavaScript with any framework you bundle. Pages open within RetroMao’s navigation, follow the theme colors, and support D-pad focus.'],
    ['Players control permissions', 'Plugins declare capabilities, and players approve them before enabling. If an update adds a capability, the plugin stays disabled until it’s approved. Network access requires declared hosts.'],
    ['Games stay fast', 'Launching a game never waits for plugins. Background scripts run on demand in an isolated engine and are released when done. Closing a page doesn’t interrupt a task.'],
    ['Publish on your own', 'Anyone can publish from their own GitHub repository. After players add the URL, the Store shows updates, versions and authors.'],
  ],
  permission: { title: 'Install “Favorites sync”?', body: 'This plugin needs these capabilities:', caps: ['Read and edit your library', 'Use cloud connections you allow'], allow: 'Allow and enable' },
  publishedTitle: 'Available in the Store today',
  publishedNote: 'These plugins all use the same public SDK, so you can learn from them too.',
  published: [
    ['Favorites sync', 'Sync favorites through a configured cloud connection, without transferring ROMs, media or saves.'],
    ['Recent games sync', 'Sync recent play dates, play counts and durations.'],
    ['Pinyin initials search', 'Search games and apps using Chinese pinyin initials, such as jsq for 计算器.'],
    ['Vita3K ROM sync', 'Sync Vita3K games, updates, DLC and licenses.'],
    ['Custom launch entries', 'Choose a system and customize emulator launch parameters.'],
  ],
  kindsTitle: 'Four ways to extend',
  kindsLead: 'Extensions live in public GitHub repositories, and you don’t need the app’s source code to build them.',
  code: 'Runs code',
  noCode: 'No code',
  guide: 'Develop plugins',
  install: 'How to install',
  kinds: [
    ['Plugins', 'Add features and pages, using capabilities players approve.', true, 'wiki/contribute-plugin/'],
    ['Systems', 'Add systems, file extensions, icons, 3D models and launch settings.', false, 'wiki/contribute-platform/'],
    ['Themes', 'Change colors, layout, backgrounds, motion, fonts and models.', false, 'wiki/contribute-platform/'],
    ['Languages', 'Translate one JSON file to add a language.', false, 'wiki/contribute-language/'],
  ],
};

const ja: PluginCopy = {
  eyebrow: 'プラグインシステム',
  title: 'RetroMao はフロントエンドであり、プラットフォームです',
  lead: 'プラグインは実際に動くプログラムです。バックグラウンドスクリプトと Web ページで構成され、公開 SDK を通じて RetroMao の機能を呼び出します。本体の変更や APK の再ビルドは不要です。',
  points: [
    ['本格的な機能を作れる', 'ゲーム情報、お気に入り、最近の記録の読み書き、メディアの関連付け、インデックスと同期するフィールド、ネットワーク、クラウドの JSON、ROM 同期へのリソース追加、起動設定のカスタマイズに対応します。'],
    ['独自の画面を持てる', 'HTML、CSS、JavaScript でページを作成でき、フレームワークも自由に同梱できます。ページは RetroMao のナビゲーション内で開き、テーマの配色に従い、十字キーでフォーカスを移動できます。'],
    ['権限はプレイヤーが決める', 'プラグインは機能を宣言し、プレイヤーが許可してから有効になります。更新で機能が増えると、再度許可するまで無効のままです。ネットワークの利用にはホストの宣言が必要です。'],
    ['ゲームを遅くしない', 'ゲームの起動はプラグインを待ちません。バックグラウンドスクリプトは分離されたエンジンで必要なときだけ動作し、終了後に解放されます。ページを閉じてもタスクは中断されません。'],
    ['自分で公開できる', '誰でも自分の GitHub リポジトリから公開できます。プレイヤーが URL を追加すると、ストアに更新、バージョン、作者が表示されます。'],
  ],
  permission: { title: '「お気に入りの同期」をインストールしますか？', body: 'このプラグインには次の機能が必要です：', caps: ['ライブラリの読み取りと変更', '許可したクラウド接続の利用'], allow: '許可して有効にする' },
  publishedTitle: '今すぐストアからインストール',
  publishedNote: 'これらのプラグインはすべて同じ公開 SDK で作られており、参考例としても使えます。',
  published: [
    ['お気に入りの同期', '設定済みのクラウド接続でお気に入りを同期します。ROM、メディア、セーブは転送しません。'],
    ['最近遊んだゲームの同期', '最終プレイ日、回数、時間を同期します。'],
    ['ピンイン頭文字検索', 'ゲームとアプリを中国語ピンインの頭文字で検索します（例：jsq で「计算器」）。'],
    ['Vita3K ROM 同期', 'Vita3K のゲーム本体、更新、DLC、ライセンスを同期します。'],
    ['カスタム起動設定', '機種を選び、エミュレーターの起動パラメーターを設定します。'],
  ],
  kindsTitle: '4 つの拡張方法',
  kindsLead: '拡張は公開 GitHub リポジトリで管理され、本体のソースコードがなくても開発できます。',
  code: 'コードを実行',
  noCode: 'コードなし',
  guide: 'プラグインの開発',
  install: 'インストール方法',
  kinds: [
    ['プラグイン', '機能とページを追加します。機能の利用にはプレイヤーの許可が必要です。', true, 'wiki/contribute-plugin/'],
    ['機種', '機種、拡張子、アイコン、3D モデル、起動設定を追加します。', false, 'wiki/contribute-platform/'],
    ['テーマ', '配色、レイアウト、背景、モーション、フォント、モデルを変更します。', false, 'wiki/contribute-platform/'],
    ['言語', 'JSON ファイルを 1 つ翻訳すれば言語を追加できます。', false, 'wiki/contribute-language/'],
  ],
};

export const pluginCopy: Record<Locale, PluginCopy> = { 'zh-hans': zhHans, 'zh-hant': zhHant, en, ja };
