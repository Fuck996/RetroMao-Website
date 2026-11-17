// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// 绑定自定义域名后只改这一处；sitemap 与 hreflang 都由它生成。
const SITE = 'https://retromao.pages.dev';

const group = (zhHans, zhHant, en, ja, items) => ({
  label: zhHans,
  translations: { 'zh-Hans': zhHans, 'zh-Hant': zhHant, en, ja },
  items,
});

export default defineConfig({
  site: SITE,
  trailingSlash: 'always',
  build: { format: 'directory' },
  integrations: [
    starlight({
      title: {
        'zh-Hans': '复古猫 Wiki',
        'zh-Hant': '復古貓 Wiki',
        en: 'RetroMao Wiki',
        ja: 'RetroMao Wiki',
      },
      favicon: '/favicon.png',
      defaultLocale: 'zh-hans',
      locales: {
        'zh-hans': { label: '简体中文', lang: 'zh-Hans' },
        'zh-hant': { label: '繁體中文', lang: 'zh-Hant' },
        en: { label: 'English', lang: 'en' },
        ja: { label: '日本語', lang: 'ja' },
      },
      disable404Route: true,
      customCss: ['./src/styles/tokens.css', './src/styles/wiki.css'],
      components: {
        Header: './src/components/WikiHeader.astro',
        Footer: './src/components/WikiFooter.astro',
      },
      sidebar: [
        group('了解复古猫', '認識復古貓', 'Overview', 'RetroMao について', [
          { slug: 'wiki' },
          { slug: 'wiki/platforms' },
          { slug: 'wiki/plugins' },
        ]),
        group('安装', '安裝', 'Install', 'インストール', [
          { slug: 'wiki/install-android' },
          { slug: 'wiki/install-3ds' },
        ]),
        group('使用', '使用', 'Use', '使い方', [
          { slug: 'wiki/quick-start' },
          { slug: 'wiki/library' },
          { slug: 'wiki/themes' },
          { slug: 'wiki/import' },
          { slug: 'wiki/cloud-sync' },
          { slug: 'wiki/saves' },
          { slug: 'wiki/extensions' },
          { slug: 'wiki/faq' },
        ]),
        group('参与贡献', '參與貢獻', 'Contribute', '開発に参加', [
          { slug: 'wiki/contribute' },
          { slug: 'wiki/contribute-language' },
          { slug: 'wiki/contribute-platform' },
          { slug: 'wiki/contribute-plugin' },
        ]),
      ],
    }),
  ],
});
