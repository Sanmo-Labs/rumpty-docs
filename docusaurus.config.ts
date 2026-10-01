import {themes as prismThemes} from 'prism-react-renderer';
import docsSearch from './plugins/docs-search';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'RumptyCloud Documentation',
  tagline: 'Deploy and scale your infrastructure with ease',
  favicon: 'img/favicon.png',
  url: 'https://docs.rumptycloud.com',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

  i18n: { defaultLocale: 'en', locales: ['en'] },

  plugins: [docsSearch],

  headTags: [
    {
      tagName: 'style',
      attributes: {},
      innerHTML: 'html{background:#0c0f14;color-scheme:dark}html[data-theme=light]{background:#f8f5ed;color-scheme:light}',
    },
    {
      tagName: 'script',
      attributes: {},
      innerHTML: `(function(){var t;try{t=new URLSearchParams(window.location.search).get("docusaurus-theme")}catch(e){}if(!t){try{t=window.localStorage.getItem("theme")}catch(e){}}var m=t||(window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light");document.documentElement.setAttribute("data-theme",m);document.documentElement.setAttribute("data-theme-choice",t||"system")})();`,
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'preload',
        href: '/docs-design/fonts/space-grotesk-latin.woff2',
        as: 'font',
        type: 'font/woff2',
        crossorigin: 'anonymous',
      },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'preload',
        href: '/docs-design/fonts/bricolage-grotesque-latin.woff2',
        as: 'font',
        type: 'font/woff2',
        crossorigin: 'anonymous',
      },
    },
  ],

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          routeBasePath: '/',
          // editUrl: 'https://github.com/Sanmo-Labs/rumpty-docs/tree/main/',
        },
        blog: false,
        theme: { customCss: ['./src/css/custom.css', './src/css/docs-home.css'] },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'docs-design/img/start-deploy-864.webp',
    metadata: [
      {name: 'theme-color', content: '#0c0f14'},
      {name: 'color-scheme', content: 'dark light'},
    ],
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
    navbar: {
      // "Cloud" is appended in accent color via .navbar__title::after in custom.css,
      // because SVG <text> can't use web fonts when loaded through an <img> tag.
      title: 'Rumpty',
      logo: {
        alt: 'RumptyCloud Logo',
        src: 'img/brand-logo.svg',
        srcDark: 'img/brand-logo.svg',
      },
      items: [
        {to: '/search', label: 'Search', position: 'right'},
        {
          type: 'docSidebar',
          sidebarId: 'docsSidebar',
          position: 'left',
          label: 'Documentation',
        },
        {
          href: 'https://discord.gg/Rukmqzg3uX',
          label: 'Support',
          position: 'right',
        },
        {
          href: 'https://github.com/Sanmo-Labs/rumpty-docs',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Platform',
          items: [
            { label: 'Getting Started', to: '/getting-started/introduction' },
            { label: 'Virtual Machines', to: '/virtual-machines/introduction' },
            { label: 'Deployments', to: '/deployments/introduction' },
            { label: 'Kubernetes', to: '/kubernetes/introduction' },
          ],
        },
        {
          title: 'Storage & Data',
          items: [
            { label: 'Volumes', to: '/volumes/introduction' },
            { label: 'Buckets', to: '/buckets/introduction' },
            { label: 'Databases', to: '/databases/introduction' },
            { label: 'Firewall Policies', to: '/firewall-policies/introduction' },
          ],
        },
        {
          title: 'Account',
          items: [
            { label: 'Billing', to: '/billing/introduction' },
            { label: 'Audit Logs', to: '/audit-logs/introduction' },
            { label: 'Settings', to: '/settings/introduction' },
            { label: 'Status Page', href: 'https://status.rumptycloud.com' },
          ],
        },
        {
          title: 'Community',
          items: [
            { label: 'Discord', href: 'https://discord.gg/Rukmqzg3uX' },
            { label: 'YouTube', href: 'https://www.youtube.com/channel/UCp7tjsn-Fb7oAUngUIdGq5Q' },
            { label: 'GitHub', href: 'https://github.com/Sanmo-Labs' },
            { label: 'Blog', href: 'https://blog.rumptycloud.com' },
          ],
        },
      ],
      copyright: `© ${new Date().getFullYear()} RumptyCloud. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.oneDark,
      darkTheme: prismThemes.oneDark,
      additionalLanguages: ['bash', 'yaml', 'json', 'docker'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
