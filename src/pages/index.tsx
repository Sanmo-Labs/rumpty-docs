import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import styles from './index.module.css';

type Product = {
  code: string;
  color: string;
  title: string;
  description: string;
  to: string;
};

const products: Product[] = [
  {
    code: 'DP',
    color: 'var(--accent)',
    title: 'Deployments',
    description: 'Ship apps straight from GitHub with builds, auto-deploy, and rollbacks.',
    to: '/deployments/introduction',
  },
  {
    code: 'VM',
    color: 'var(--accent-2)',
    title: 'Virtual Machines',
    description: 'Provision VMs with SSH access, snapshots, metrics, and firewalls.',
    to: '/virtual-machines/introduction',
  },
  {
    code: 'K8',
    color: 'var(--accent-3)',
    title: 'Kubernetes',
    description: 'Managed clusters with storage classes and kubectl access.',
    to: '/kubernetes/introduction',
  },
  {
    code: 'DB',
    color: '#f8e7c9',
    title: 'Databases',
    description: 'Managed databases with backups and private connectivity.',
    to: '/databases/introduction',
  },
  {
    code: 'BK',
    color: 'var(--accent)',
    title: 'Buckets',
    description: 'S3-compatible object storage for uploads, assets, and backups.',
    to: '/buckets/introduction',
  },
  {
    code: 'VL',
    color: 'var(--accent-2)',
    title: 'Volumes',
    description: 'Persistent block storage you can attach and mount to VMs.',
    to: '/volumes/introduction',
  },
  {
    code: 'FW',
    color: 'var(--accent-3)',
    title: 'Firewall Policies',
    description: 'Allow-rules you attach to workloads to control traffic.',
    to: '/firewall-policies/introduction',
  },
  {
    code: 'CLI',
    color: '#f8e7c9',
    title: 'CLI',
    description: 'Manage everything from your terminal with the Rumpty CLI.',
    to: '/cli/introduction',
  },
];

const popular: {title: string; to: string}[] = [
  {title: 'Quick start', to: '/getting-started/quick-start'},
  {title: 'Create a deployment', to: '/deployments/create-a-deployment'},
  {title: 'Ports & health checks', to: '/deployments/ports'},
  {title: 'GitHub deploy', to: '/deployments/github-deploy'},
  {title: 'Create a VM', to: '/virtual-machines/create-a-vm'},
  {title: 'Connect to a VM', to: '/virtual-machines/connecting'},
  {title: 'Create a database', to: '/databases/create-a-database'},
  {title: 'Upload to a bucket', to: '/buckets/uploading'},
  {title: 'Workspaces', to: '/getting-started/workspaces'},
  {title: 'API keys', to: '/settings/api-keys'},
  {title: 'Billing', to: '/billing/introduction'},
  {title: 'Audit logs', to: '/audit-logs/introduction'},
];

function ProductCard({code, color, title, description, to}: Product): ReactNode {
  return (
    <Link to={to} className={styles.card}>
      <span className={styles.cardMark} style={{color}}>
        {code}
      </span>
      <span className={styles.cardBody}>
        <span className={styles.cardTitle}>{title}</span>
        <span className={styles.cardDesc}>{description}</span>
      </span>
      <span className={styles.cardArrow} aria-hidden="true">
        →
      </span>
    </Link>
  );
}

export default function Home(): ReactNode {
  return (
    <Layout description="RumptyCloud documentation: deployments, virtual machines, Kubernetes, databases, storage, and networking, built and operated in Lagos.">
      <main className={styles.home}>
        {/* Hero */}
        <section className={styles.hero}>
          <div className={styles.heroInner}>
            <div className={styles.heroCopy}>
              <p className={styles.eyebrow}>rumptycloud docs</p>
              <h1 className={styles.heroTitle}>
                Everything you need to <span className={styles.heroAccent}>ship</span>.
              </h1>
              <p className={styles.heroLede}>
                Deploy applications, provision infrastructure, store data, configure
                networking, and integrate with RumptyCloud using guides, tutorials,
                and API references.
              </p>
              <div className={styles.heroActions}>
                <Link className={styles.btnPrimary} to="/getting-started/quick-start">
                  Quick start
                </Link>
                <Link
                  className={styles.btnGhost}
                  href="https://console.rumptycloud.com"
                >
                  Open console
                </Link>
              </div>
            </div>
            <div className={styles.heroShell}>
              <div className={styles.shellBar}>
                <span className={styles.shellDot} />
                <span className={styles.shellDot} />
                <span className={styles.shellDot} />
                <span className={styles.shellTitle}>rumpty ssh</span>
              </div>
              <pre className={styles.shellBody}>
                <span className={styles.shellPrompt}>➜</span>
                {'  ~ '}
                <span className={styles.shellCmd}>rumpty ssh tet --ws platform</span>
                {'\n'}
                <span className={styles.shellStep}>›</span>
                <span className={styles.shellMuted}>{' Preparing SSH access for tet\n'}</span>
                <span className={styles.shellStep}>›</span>
                <span className={styles.shellMuted}>{' Opening SSH session as rumpty\n'}</span>
                {'Welcome to Ubuntu 24.04.4 LTS (GNU/Linux 6.8.0-124-generic x86_64)\n\n'}
                <span className={styles.shellMuted}>
                  {' System information as of Thu Jul 30 01:23:54 UTC 2026\n\n'}
                  {'  System load:  0.0               Processes:    113\n'}
                  {'  Usage of /:   23.6% of 8.61GB   Memory usage: 38%\n\n'}
                </span>
                <span className={styles.shellBanner}>
                  {'▄▖       ▗   ▄▖▜      ▌\n'}
                  {'▙▘▌▌▛▛▌▛▌▜▘▌▌▌ ▐ ▛▌▌▌▛▌\n'}
                  {'▌▌▙▌▌▌▌▙▌▐▖▙▌▙▖▐▖▙▌▙▌▙▌\n'}
                  {'       ▌   ▄▌\n'}
                </span>
                {'\nRumptyCloud\n'}
                <span className={styles.shellMuted}>
                  {'Sanmọ̀Labs™ - Surpass your limits!\n'}
                  {'Last login: Thu Jul 30 01:23:55 2026 from 100.64.0.4\n'}
                </span>
                <span className={styles.shellUser}>root@rockets</span>
                {':'}
                <span className={styles.shellPath}>~</span>
                {'$ '}
                <span className={styles.shellCaret} />
              </pre>
            </div>
          </div>
        </section>

        {/* Products */}
        <section className={styles.section}>
          <p className={styles.eyebrow}>explore by product</p>
          <h2 className={styles.sectionTitle}>Pick where you're building.</h2>
          <div className={styles.cardGrid}>
            {products.map((product) => (
              <ProductCard key={product.code} {...product} />
            ))}
          </div>
        </section>

        {/* Popular */}
        <section className={styles.section}>
          <p className={styles.eyebrow}>most viewed</p>
          <h2 className={styles.sectionTitle}>Straight to the answer.</h2>
          <div className={styles.popularGrid}>
            {popular.map((item) => (
              <Link key={item.to} to={item.to} className={styles.popularLink}>
                {item.title}
              </Link>
            ))}
          </div>
        </section>

        {/* Help strip */}
        <section className={styles.section}>
          <div className={styles.helpGrid}>
            <div className={styles.helpCard}>
              <h3 className={styles.helpTitle}>Need a hand?</h3>
              <p className={styles.helpDesc}>
                Our team answers real questions from real builders. No chat bots.
              </p>
              <Link className={styles.btnGhost} href="https://discord.com/invite/ypbVhEzH">
                Contact support
              </Link>
            </div>
            <div className={styles.helpCard}>
              <h3 className={styles.helpTitle}>Is it us or you?</h3>
              <p className={styles.helpDesc}>
                Check live platform status before you start debugging your own app.
              </p>
              <Link className={styles.btnGhost} href="https://status.rumptycloud.com">
                Platform status
              </Link>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
