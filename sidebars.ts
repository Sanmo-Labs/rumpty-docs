import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  docsSidebar: [
    {
      type: 'category',
      label: 'Get started',
      collapsed: false,
      collapsible: false,
      items: [
        {type: 'link', label: 'Overview', href: '/'},
        'getting-started/introduction',
        'getting-started/account-setup',
        'getting-started/workspaces',
        'getting-started/quick-start',
      ],
    },
    {
      type: 'category',
      label: 'Compute',
      collapsed: false,
      collapsible: false,
      items: [
        {
          type: 'category',
          label: 'Virtual Machines',
          items: [
            'virtual-machines/introduction',
            'virtual-machines/create-a-vm',
            'virtual-machines/connecting',
            'virtual-machines/plans',
            'virtual-machines/metrics',
            'virtual-machines/snapshots',
            'virtual-machines/firewall',
            'virtual-machines/settings',
            'virtual-machines/deploy',
          ],
        },
        {
          type: 'category',
          label: 'Deployments',
          items: [
            'deployments/introduction',
            'deployments/create-a-deployment',
            'deployments/github-deploy',
            'deployments/ports',
            'deployments/persistent-storage',
          ],
        },
        {
          type: 'category',
          label: 'Kubernetes',
          items: [
            'kubernetes/introduction',
            'kubernetes/create-a-cluster',
            'kubernetes/connecting',
            'kubernetes/storage',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Storage & Data',
      collapsed: false,
      collapsible: false,
      items: [
        {
          type: 'category',
          label: 'Volumes',
          items: [
            'volumes/introduction',
            'volumes/create-a-volume',
            'volumes/attach-and-mount',
          ],
        },
        {
          type: 'category',
          label: 'Buckets',
          items: [
            'buckets/introduction',
            'buckets/create-a-bucket',
            'buckets/uploading',
          ],
        },
        {
          type: 'category',
          label: 'Databases',
          items: [
            'databases/introduction',
            'databases/create-a-database',
            'databases/connecting',
            'databases/backups',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Networking',
      collapsed: false,
      collapsible: false,
      items: [
        {
          type: 'category',
          label: 'Firewall Policies',
          items: [
            'firewall-policies/introduction',
            'firewall-policies/create-a-policy',
            'firewall-policies/allow-rules',
            'firewall-policies/attaching',
            'networking/outbound-email',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Tools',
      collapsed: false,
      collapsible: false,
      items: [
        {
          type: 'category',
          label: 'CLI',
          items: [
            'cli/introduction',
            'cli/login',
            'cli/sync',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Account',
      collapsed: false,
      collapsible: false,
      items: [
        'billing/introduction',
        'audit-logs/introduction',
        {
          type: 'category',
          label: 'Settings',
          items: [
            'settings/introduction',
            'settings/account',
            'settings/workspaces',
            'settings/integrations',
            'settings/ssh-keys',
            'settings/api-keys',
          ],
        },
      ],
    },
  ],
};

export default sidebars;
