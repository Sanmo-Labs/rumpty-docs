import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  docsSidebar: [
    {
      type: 'category',
      label: 'Getting Started',
      collapsed: false,
      items: [
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
      label: 'Storage',
      collapsed: false,
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
      ],
    },
    {
      type: 'category',
      label: 'Data',
      collapsed: false,
      items: [
        {
          type: 'category',
          label: 'Databases',
          items: [
            'databases/introduction',
            'databases/connecting',
            'databases/backups',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Networking & Security',
      collapsed: false,
      items: [
        'firewall-policies/introduction',
        'firewall-policies/create-a-policy',
        'firewall-policies/allow-rules',
        'firewall-policies/attaching',
      ],
    },
    {
      type: 'category',
      label: 'Others',
      collapsed: false,
      items: [
        'audit-logs/introduction',
        'billing/introduction',
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
