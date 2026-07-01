import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'RumptyCloud Documentation',
  tagline: 'Deploy and scale your infrastructure with ease',
  favicon: 'img/favicon.ico',
  url: 'https://docs.rumptycloud.com',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: { defaultLocale: 'en', locales: ['en'] },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          routeBasePath: '/',
          // editUrl: 'https://github.com/rumptycloud/docs/tree/main/',
        },
        blog: false,
        theme: { customCss: './src/css/custom.css' },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/social-card.png',
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'RumptyCloud',
      logo: {
        alt: 'RumptyCloud Logo',
        src: 'img/logo.svg',
        srcDark: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docsSidebar',
          position: 'left',
          label: 'Documentation',
        },
        {
          href: 'https://rumptycloud.com/support',
          label: 'Support',
          position: 'right',
        },
        {
          href: 'https://github.com/rumptycloud/docs',
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
            { label: 'Firewall Policies', to: '/firewall.md-policies/introduction' },
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
