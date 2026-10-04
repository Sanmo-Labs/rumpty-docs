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
  clientModules: ['./src/clientModules/docChrome.ts'],

  headTags: [
    {
      tagName: 'style',
      attributes: {},
      innerHTML: 'html{background:#0c0f14;color-scheme:dark}html[data-theme=light]{background:#f5f0e5;color-scheme:light}',
    },
    {
      tagName: 'script',
      attributes: {},
      innerHTML: `(function(){var t;try{t=new URLSearchParams(window.location.search).get("docusaurus-theme")}catch(e){}if(!t){try{t=window.localStorage.getItem("theme")}catch(e){}}var m=t||(window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light");document.documentElement.setAttribute("data-theme",m);document.documentElement.setAttribute("data-theme-choice",t||"system")})();`,
    },
    {
      tagName: 'script',
      attributes: {},
      innerHTML: `(function(){function inject(){var toc=document.querySelector(".theme-doc-toc-desktop");if(!toc||!toc.parentElement||toc.parentElement.querySelector(".rail__links"))return;var d=document.createElement("div");d.className="rail__links";d.innerHTML='<a href="https://github.com/Sanmo-Labs/rumpty-docs">Edit this page ↗</a><a href="https://github.com/Sanmo-Labs/rumpty-docs/issues">Report an issue ↗</a>';toc.insertAdjacentElement("afterend",d)}var obs=new MutationObserver(inject);function start(){inject();obs.observe(document.documentElement,{childList:true,subtree:true})}if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",start);else start()})();`,
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
        theme: { customCss: ['./src/css/custom.css', './src/css/docs-home.css', './src/css/docs-article.css'] },
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
      title: 'RumptyCloud',
      logo: {
        alt: 'RumptyCloud Logo',
        src: 'docs-design/icons/logo-mark.svg',
        srcDark: 'docs-design/icons/logo-mark.svg',
      },
      items: [
        {to: '/', label: 'Home', position: 'left', activeBaseRegex: '^/$'},
        {to: '/getting-started/introduction', label: 'Get started', position: 'left'},
        {to: '/virtual-machines/introduction', label: 'Compute', position: 'left'},
        {to: '/buckets/introduction', label: 'Storage & Data', position: 'left'},
        {to: '/firewall-policies/introduction', label: 'Networking', position: 'left'},
        {to: '/cli/introduction', label: 'CLI', position: 'left'},
        {to: '/billing/introduction', label: 'Account', position: 'left'},
        {to: '/search', label: 'Search…', position: 'right'},
        {href: 'https://discord.gg/Rukmqzg3uX', label: 'Community', position: 'right'},
        {href: 'https://discord.gg/Rukmqzg3uX', label: 'Support', position: 'right'},
        {href: 'https://status.rumptycloud.com', label: 'Status', position: 'right'},
        {href: 'https://console.rumptycloud.com', label: 'Open console', position: 'right'},
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Footer',
          items: [
            {label: 'Status', href: 'https://status.rumptycloud.com'},
            {label: 'Discord', href: 'https://discord.gg/Rukmqzg3uX'},
            {label: 'GitHub', href: 'https://github.com/Sanmo-Labs'},
            {label: 'YouTube', href: 'https://www.youtube.com/channel/UCp7tjsn-Fb7oAUngUIdGq5Q'},
            {label: 'Blog', href: 'https://blog.rumptycloud.com'},
          ],
        },
      ],
      copyright: `© ${new Date().getFullYear()} RumptyCloud`,
    },
    prism: {
      theme: prismThemes.oneDark,
      darkTheme: prismThemes.oneDark,
      additionalLanguages: ['bash', 'yaml', 'json', 'docker'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
