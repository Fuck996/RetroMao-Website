import releaseData from './releases.json';

/**
 * 下载页数据。版本、文件、大小、摘要和 GitHub 链接由 Action 从 GitHub Release 同步到
 * releases.json，不要手工修改；网盘链接在下面的 cloudMirrors 中维护。
 * url 留空时，页面显示“链接准备中”的不可点击状态，不会产生死链。
 */

/** 增加网盘：先在这里登记一个渠道，再到 cloudMirrors 里填地址。 */
export const providers = {
  github: { icon: 'github', name: { 'zh-hans': 'GitHub', 'zh-hant': 'GitHub', en: 'GitHub', ja: 'GitHub' } },
  baidu: { icon: 'cloud', name: { 'zh-hans': '百度网盘', 'zh-hant': '百度網盤', en: 'Baidu Netdisk', ja: 'Baidu Netdisk' } },
} as const;

export type ProviderId = keyof typeof providers;

export interface Mirror {
  provider: ProviderId;
  /** 留空表示链接尚未提供。 */
  url: string;
  /** 网盘提取码，没有则省略。 */
  code?: string;
}

export interface Release {
  id: 'android' | '3ds';
  version: string;
  file: string;
  sizeBytes: number;
  sha256: string;
  mirrors: Mirror[];
}

/** 网盘分享的是固定文件夹，发新版时把安装包放进同一文件夹，链接不用改。 */
const cloudMirrors: Mirror[] = [
  { provider: 'baidu', url: 'https://pan.baidu.com/s/19SldHTM3vbN2bW5PnuQ-1g?pwd=pgb4', code: 'pgb4' },
];

export const releases: Release[] = (['android', '3ds'] as const).map((id) => {
  const { githubUrl, ...info } = releaseData.products[id];
  return { id, ...info, mirrors: [{ provider: 'github', url: githubUrl }, ...cloudMirrors] };
});

export const author = {
  name: '4NPC',
  links: [
    { id: 'github', url: 'https://github.com/Fuck996', handle: 'Fuck996' },
    { id: 'bilibili', url: 'https://space.bilibili.com/3706971291126166', handle: '3706971291126166' },
    { id: 'xiaohongshu', url: 'https://xhslink.cn/o/A6lISDxIPiT', handle: '' },
  ],
} as const;

/** 首页介绍视频。按语言依次尝试 sources 里的平台，第一个已填写的生效；加 YouTube 只需填 youtube。 */
export const introVideo = {
  bilibili: 'BV11Y476ZENF',
  youtube: '',
  sources: {
    'zh-hans': ['bilibili', 'youtube'],
    'zh-hant': ['bilibili', 'youtube'],
    en: ['youtube', 'bilibili'],
    ja: ['youtube', 'bilibili'],
  },
} as const;

export const communityRepo = 'https://github.com/Fuck996/RetroMao-Community';

/** 内置机种，与 app/src/main/assets/models/catalog.json 对应。 */
export const platformGroups = [
  { maker: { 'zh-hans': '任天堂', 'zh-hant': '任天堂', en: 'Nintendo', ja: '任天堂' },
    names: ['Famicom', 'Famicom Disk System', 'Super Famicom', 'Game Boy', 'Game Boy Color', 'Game Boy Advance', 'Nintendo 64', 'GameCube', 'Wii', 'Wii U', 'Nintendo DS', 'Nintendo 3DS', 'Nintendo Switch'] },
  { maker: { 'zh-hans': '世嘉', 'zh-hant': '世嘉', en: 'SEGA', ja: 'セガ' },
    names: ['Master System', 'Mega Drive', 'Mega CD', 'SEGA 32X', 'Game Gear', 'SEGA Saturn', 'Dreamcast'] },
  { maker: { 'zh-hans': '索尼', 'zh-hant': '索尼', en: 'Sony', ja: 'ソニー' },
    names: ['PlayStation', 'PlayStation 2', 'PlayStation 3', 'PSP', 'PS Vita'] },
  { maker: { 'zh-hans': 'SNK', 'zh-hant': 'SNK', en: 'SNK', ja: 'SNK' },
    names: ['NEO GEO', 'NEO GEO CD', 'NEO GEO Pocket', 'NEO GEO Pocket Color'] },
  { maker: { 'zh-hans': 'NEC', 'zh-hant': 'NEC', en: 'NEC', ja: 'NEC' }, names: ['PC Engine', 'PC Engine CD'] },
  { maker: { 'zh-hans': '万代', 'zh-hant': '萬代', en: 'Bandai', ja: 'バンダイ' }, names: ['WonderSwan', 'WonderSwan Color'] },
  { maker: { 'zh-hans': '微软', 'zh-hant': '微軟', en: 'Microsoft', ja: 'マイクロソフト' }, names: ['Xbox', 'Xbox 360'] },
];

/**
 * 首页游戏库的演示内容。全部是虚构游戏，封面由 AI 绘制，不对应任何真实作品。
 * model 机种要与 scripts/build-web-models.py 的 PLATFORMS 一致。
 */
export const demoGames = [
  { title: 'ねこまる探検隊', aspect: 0.854, system: 'gb', year: 1990, cover: '/covers/nekomaru-expedition.jpg', spine: '/covers/nekomaru-expedition-spine.png', tint: '#3E7D6A',
    genre: { 'zh-hans': '冒险', 'zh-hant': '冒險', en: 'Adventure', ja: 'アドベンチャー' } },
  { title: '星霜のルミナリア', aspect: 0.552, system: 'sfc', year: 1994, cover: '/covers/luminaria-of-the-stars.jpg', spine: '/covers/luminaria-of-the-stars-spine.png', tint: '#7A3F7E',
    genre: { 'zh-hans': '角色扮演', 'zh-hant': '角色扮演', en: 'RPG', ja: 'RPG' } },
  { title: 'IRON COMET', aspect: 0.719, system: 'md', year: 1991, cover: '/covers/iron-comet.jpg', spine: '/covers/iron-comet-spine.png', tint: '#2B4C9B',
    genre: { 'zh-hans': '射击', 'zh-hant': '射擊', en: 'Shooter', ja: 'シューティング' } },
];
