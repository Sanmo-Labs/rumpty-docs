import {useEffect, useState, type ReactNode} from 'react';
import Link from '@docusaurus/Link';
import LayoutProvider from '@theme/Layout/Provider';
import {PageMetadata, useColorMode} from '@docusaurus/theme-common';
import DocsSearch from '../components/DocsSearch';

const HERO_TITLE = 'What are you building today?';

function ThemeToggle() {
  const {colorMode, setColorMode} = useColorMode();
  return <button className="theme-toggle" type="button" aria-label="Toggle light and dark mode" onClick={() => setColorMode(colorMode === 'dark' ? 'light' : 'dark')}><span aria-hidden="true">◐</span></button>;
}

function HeroTitle() {
  const [count, setCount] = useState(0);
  const [caret, setCaret] = useState(true);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setCount(HERO_TITLE.length);
      setCaret(false);
      return;
    }
    let typed = 0;
    let intervalId = 0;
    let hideCaretId = 0;
    const startId = window.setTimeout(() => {
      intervalId = window.setInterval(() => {
        typed += 1;
        setCount(typed);
        if (typed >= HERO_TITLE.length) {
          window.clearInterval(intervalId);
          hideCaretId = window.setTimeout(() => setCaret(false), 1400);
        }
      }, 36);
    }, 220);
    return () => {
      window.clearTimeout(startId);
      window.clearInterval(intervalId);
      window.clearTimeout(hideCaretId);
    };
  }, []);
  const nodes: ReactNode[] = [];
  let index = 0;
  HERO_TITLE.split(' ').forEach((word, wordIndex, words) => {
    nodes.push(
      <span className="dhero__word" key={wordIndex}>
        {[...word].map((character) => {
          const at = index++;
          return (
            <span key={at} className={at < count ? 'dhero__char is-in' : 'dhero__char'}>
              {character}
              {caret && at === count - 1 && <span className="dhero__caret" aria-hidden="true" />}
            </span>
          );
        })}
      </span>,
    );
    if (wordIndex < words.length - 1) {
      const at = index++;
      nodes.push(
        <span key={`space-${wordIndex}`} className={at < count ? 'dhero__char is-in' : 'dhero__char'}>
          {' '}
          {caret && at === count - 1 && <span className="dhero__caret" aria-hidden="true" />}
        </span>,
      );
    }
  });
  return (
    <h1 className="dhero__title">
      {nodes}
      {caret && count === 0 && <span className="dhero__caret" aria-hidden="true" />}
    </h1>
  );
}

export default function Home(): ReactNode {
 const [menuOpen, setMenuOpen] = useState(false);
 useEffect(() => {
  const escape = (event: KeyboardEvent) => { if (event.key === 'Escape' && document.getElementById('menu-btn')?.getAttribute('aria-expanded') === 'true') {setMenuOpen(false); document.getElementById('menu-btn')?.focus();} };
  document.addEventListener('keydown', escape);
  return () => document.removeEventListener('keydown', escape);
 }, []);
 return <LayoutProvider><PageMetadata title="Documentation" description="Search RumptyCloud guides for deployments, virtual machines, databases, storage, Kubernetes, and the CLI." /><div className="docs-home"><a className="skip" href="#main">Skip to content</a>
  <noscript><style>{`.docs-home .dhero__char{opacity:1!important}.docs-home .dhero__caret{display:none}`}</style></noscript>




  <header className="dnav">
    <div className="dwrap dnav__bar">
      <Link className="logo" href="/" aria-label="RumptyCloud Docs home">
        <img className="logo__mark" src="/docs-design/icons/logo-mark.svg" width="20" height="20" alt="" />
        <span className="logo__name">RumptyCloud</span>
        <span className="logo__rule" aria-hidden="true"></span>
        <span className="dnav__docs">Docs</span>
      </Link>
      <ThemeToggle /><nav className="dnav__actions" aria-label="Help">
        <Link className="dnav__ghost" href="https://discord.gg/Rukmqzg3uX">Community</Link>
        <Link className="dnav__ghost" href="https://discord.gg/Rukmqzg3uX">Support</Link>
        <Link className="dnav__ghost" href="https://status.rumptycloud.com">Status</Link>
        <Link className="btn btn--primary" href="https://console.rumptycloud.com"><span>Open console</span><span aria-hidden="true">↗</span></Link>
      </nav>
      <button className="menu-btn" id="menu-btn" type="button" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)} aria-controls="menu" aria-label="Menu">
        <span></span><span></span>
      </button>
    </div>

    <div className="dnav__panel" id="menu" hidden={!menuOpen}>
      <div className="dwrap">
        <nav aria-label="Help, mobile">
          <Link href="https://discord.gg/Rukmqzg3uX">Community</Link>
          <Link href="https://discord.gg/Rukmqzg3uX">Support</Link>
          <Link href="https://status.rumptycloud.com">Status</Link>
        </nav>
        <Link className="btn btn--primary btn--block" href="https://console.rumptycloud.com"><span>Open console</span><span aria-hidden="true">↗</span></Link>
      </div>
    </div>

    <nav className="dtabs" aria-label="Documentation sections">
      <div className="dwrap dtabs__row">
        <Link href="/" aria-current="page">Home</Link>
        <Link href="/getting-started/introduction">Get started</Link>
        <Link href="/virtual-machines/introduction">Compute</Link>
        <Link href="/buckets/introduction">Storage &amp; Data</Link>
        <Link href="/firewall-policies/introduction">Networking</Link>
        <Link href="/kubernetes/introduction">Kubernetes</Link>
        <Link href="/cli/introduction">CLI</Link>
        <Link href="https://blog.rumptycloud.com">Journal</Link>
      </div>
    </nav>
  </header>

  <main id="main">

    <section className="dhero">
      <div className="dwrap dhero__inner">
        <p className="dhero__eyebrow">RumptyCloud Documentation</p>
        <HeroTitle />
        <p className="dhero__sub">Search every guide and reference. Find the steps to deploy your app, connect your infrastructure, and keep building.</p>

        <DocsSearch popular />
      </div>
    </section>

    <div className="dwrap dbody">

      <section className="dsec" aria-labelledby="start-title">
        <div className="dsec__head">
          <div>
            <h2 className="dsec__title" id="start-title">Start here</h2>
            <p className="dsec__sub">Pick a path and have something running in minutes.</p>
          </div>
          <Link className="dsec__more" href="/getting-started/quick-start">Quick start <span className="arr">→</span></Link>
        </div>
        <div className="paths">
          <article className="path">
            <img src="/docs-design/img/start-deploy-864.webp" srcSet="/docs-design/img/start-deploy-432.webp 432w, /docs-design/img/start-deploy-864.webp 864w" sizes="(min-width: 1440px) 432px, (min-width: 960px) 30vw, (min-width: 640px) 45vw, 100vw" width="432" height="240" alt="" fetchPriority="high" decoding="async" />
            <div className="path__body">
              <h3>Deploy an app</h3>
              <p>Connect a GitHub repo and get a live URL. Every push ships a new build.</p>
              <Link className="path__cta" href="/deployments/github-deploy">Deploy from GitHub <span className="arr">→</span></Link>
            </div>
          </article>
          <article className="path">
            <img src="/docs-design/img/start-vm-864.webp" srcSet="/docs-design/img/start-vm-432.webp 432w, /docs-design/img/start-vm-864.webp 864w" sizes="(min-width: 1440px) 432px, (min-width: 960px) 30vw, (min-width: 640px) 45vw, 100vw" width="432" height="240" alt="" decoding="async" />
            <div className="path__body">
              <h3>Launch a VM</h3>
              <p>Spin up an Ubuntu server, add your SSH key and connect in under a minute.</p>
              <Link className="path__cta" href="/virtual-machines/create-a-vm">Create a VM <span className="arr">→</span></Link>
            </div>
          </article>
          <article className="path">
            <img src="/docs-design/img/start-cli-864.webp" srcSet="/docs-design/img/start-cli-432.webp 432w, /docs-design/img/start-cli-864.webp 864w" sizes="(min-width: 1440px) 432px, (min-width: 960px) 30vw, (min-width: 640px) 45vw, 100vw" width="432" height="240" alt="" decoding="async" />
            <div className="path__body">
              <h3>Use the CLI</h3>
              <p>Install rumpty and manage every resource from your terminal or CI.</p>
              <Link className="path__cta" href="/cli/introduction">Install the CLI <span className="arr">→</span></Link>
            </div>
          </article>
        </div>
      </section>


      <section className="dsec" aria-labelledby="viewed-title">
        <div className="dsec__head">
          <div>
            <h2 className="dsec__title" id="viewed-title">Most viewed</h2>
            <p className="dsec__sub">Quick links to the pages builders open most.</p>
          </div>
        </div>
        <div className="viewed">
          <nav className="viewed__col" aria-labelledby="v-start">
            <h3 id="v-start">Get started</h3>
            <Link href="/getting-started/quick-start">Quick start <span className="arr">→</span></Link>
            <Link href="/getting-started/workspaces">Workspaces <span className="arr">→</span></Link>
            <Link href="/settings/api-keys">API keys <span className="arr">→</span></Link>
            <Link href="/cli/introduction">Install the CLI <span className="arr">→</span></Link>
          </nav>
          <nav className="viewed__col" aria-labelledby="v-compute">
            <h3 id="v-compute">Compute</h3>
            <Link href="/deployments/create-a-deployment">Create a deployment <span className="arr">→</span></Link>
            <Link href="/deployments/github-deploy">Deploy from GitHub <span className="arr">→</span></Link>
            <Link href="/virtual-machines/create-a-vm">Create a VM <span className="arr">→</span></Link>
            <Link href="/virtual-machines/connecting">Connect to a VM <span className="arr">→</span></Link>
          </nav>
          <nav className="viewed__col" aria-labelledby="v-data">
            <h3 id="v-data">Data</h3>
            <Link href="/databases/create-a-database">Create a database <span className="arr">→</span></Link>
            <Link href="/databases/backups">Backups <span className="arr">→</span></Link>
            <Link href="/buckets/uploading">Upload to a bucket <span className="arr">→</span></Link>
            <Link href="/volumes/attach-and-mount">Attach a volume <span className="arr">→</span></Link>
          </nav>
          <nav className="viewed__col" aria-labelledby="v-account">
            <h3 id="v-account">Account</h3>
            <Link href="/billing/introduction">Billing <span className="arr">→</span></Link>
            <Link href="/audit-logs/introduction">Audit logs <span className="arr">→</span></Link>
            <Link href="https://blog.rumptycloud.com">Journal <span className="arr">→</span></Link>
            <Link href="https://github.com/Sanmo-Labs/rumpty-docs">Contribute to docs <span className="arr">→</span></Link>
          </nav>
        </div>
      </section>


      <section className="dsec" aria-labelledby="products-title">
        <div className="dsec__head">
          <div>
            <h2 className="dsec__title" id="products-title">Explore by product</h2>
            <p className="dsec__sub">Everything RumptyCloud runs for you.</p>
          </div>

        </div>
        <div className="products">
          <Link className="product" href="/deployments/introduction" data-tone="sky"><span className="product__code">DP</span><span className="product__name">Deployments</span><span className="product__desc">Ship apps straight from GitHub with builds, auto-deploy, and rollbacks.</span></Link>
          <Link className="product" href="/virtual-machines/introduction" data-tone="orange"><span className="product__code">VM</span><span className="product__name">Virtual Machines</span><span className="product__desc">Provision VMs with SSH access, snapshots, metrics, and firewalls.</span></Link>
          <Link className="product" href="/databases/introduction" data-tone="lime"><span className="product__code">DB</span><span className="product__name">Databases</span><span className="product__desc">Create databases, connect your apps, and manage access.</span></Link>
          <Link className="product" href="/kubernetes/introduction" data-tone="sky"><span className="product__code">K8</span><span className="product__name">Kubernetes</span><span className="product__desc">Managed clusters with storage classes and kubectl access.</span></Link>
          <Link className="product" href="/buckets/introduction" data-tone="sky"><span className="product__code">BK</span><span className="product__name">Buckets</span><span className="product__desc">S3-compatible object storage for uploads, assets, and backups.</span></Link>
          <Link className="product" href="/volumes/introduction" data-tone="lime"><span className="product__code">VL</span><span className="product__name">Volumes</span><span className="product__desc">Persistent block storage you can attach and mount to VMs.</span></Link>
          <Link className="product" href="/firewall-policies/introduction" data-tone="orange"><span className="product__code">FW</span><span className="product__name">Firewall Policies</span><span className="product__desc">Allow-rules you attach to workloads to control traffic.</span></Link>
          <Link className="product" href="/cli/introduction" data-tone="lime"><span className="product__code">CLI</span><span className="product__name">CLI</span><span className="product__desc">Manage everything from your terminal with the Rumpty CLI.</span></Link>
        </div>
      </section>


      <section className="dsec" aria-labelledby="help-title">
        <div className="dsec__head">
          <div>
            <h2 className="dsec__title" id="help-title">Need a hand?</h2>
            <p className="dsec__sub">Real people, a live status page and a community that answers.</p>
          </div>
        </div>
        <div className="helpers">
          <Link className="helper" href="https://discord.gg/Rukmqzg3uX"><span className="helper__title">Ask the community</span><span className="helper__desc">The team and other builders answer questions in Discord.</span><span className="helper__cta">Join Discord ↗</span></Link>
          <Link className="helper" href="https://status.rumptycloud.com"><span className="helper__title">Is it us or you?</span><span className="helper__desc">Check live platform status before you start debugging.</span><span className="helper__cta">Status page ↗</span></Link>
          <Link className="helper" href="https://discord.gg/Rukmqzg3uX"><span className="helper__title">Still stuck?</span><span className="helper__desc">Ask your question in our support community and get help from the team.</span><span className="helper__cta">Contact support ↗</span></Link>
        </div>
      </section>
    </div>
  </main>


  <footer className="dfoot">
    <div className="dwrap dfoot__row">
      <p className="dfoot__brand"><img src="/docs-design/icons/logo-mark.svg" width="20" height="20" alt="" />© {new Date().getFullYear()} RumptyCloud</p>
      <nav className="dfoot__links" aria-label="Footer">
        <Link href="https://status.rumptycloud.com">Status</Link>
        <Link href="https://discord.gg/Rukmqzg3uX">Discord</Link>
        <Link href="https://github.com/Sanmo-Labs">GitHub</Link>
        <Link href="https://www.youtube.com/channel/UCp7tjsn-Fb7oAUngUIdGq5Q">YouTube</Link>
        <Link href="https://blog.rumptycloud.com">Blog</Link>
      </nav>
      <Link className="dfoot__status" href="https://status.rumptycloud.com"><i aria-hidden="true"></i>Platform status ↗</Link>
    </div>
  </footer>

</div></LayoutProvider>;
}
