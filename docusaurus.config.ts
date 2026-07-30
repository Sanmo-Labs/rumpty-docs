import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'RumptyCloud Documentation',
  tagline: 'Deploy and scale your infrastructure with ease',
  favicon: 'img/favicon.svg',
  url: 'https://docs.rumptycloud.com',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

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
    metadata: [
      {name: 'keywords', content: 'virtual machines, AI sandboxes, kubernetes, databases, storage, domains, CI/CD pipelines, cloud provider'},
      {name: 'description', content: 'RumptyCloud Documentation - Provision and manage virtual machines, AI sandboxes, Kubernetes, databases, storage, domains, and CI/CD workflows with ease.'},
      {property: 'og:title', content: 'RumptyCloud Documentation'},
      {property: 'og:description', content: 'Provision and manage virtual machines, AI sandboxes, Kubernetes, databases, storage, domains, and CI/CD workflows with ease.'},
      {property: 'og:type', content: 'website'},
      {property: 'og:url', content: 'https://docs.rumptycloud.com/'},
      {property: 'og:image', content: 'https://docs.rumptycloud.com/img/social-card.png'},
      {property: 'og:site_name', content: 'RumptyCloud'},
      {name: 'twitter:card', content: 'summary_large_image'},
      {name: 'twitter:title', content: 'RumptyCloud Documentation'},
      {name: 'twitter:description', content: 'Provision and manage virtual machines, AI sandboxes, Kubernetes, databases, storage, domains, and CI/CD workflows with ease.'},
      {name: 'twitter:image', content: 'https://docs.rumptycloud.com/img/social-card.png'},
    ],
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: '',
      logo: {
        alt: 'RumptyCloud Logo',
        src: 'img/brand-logo.svg',
        srcDark: 'img/brand-logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docsSidebar',
          position: 'left',
          label: 'Documentation',
        },
        {
          href: 'https://discord.com/invite/ypbVhEzH',
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
