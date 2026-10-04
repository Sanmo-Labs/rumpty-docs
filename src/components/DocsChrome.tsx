import {useEffect, useState, type ReactNode} from 'react';
import Link from '@docusaurus/Link';
import {useLocation} from '@docusaurus/router';
import {useColorMode} from '@docusaurus/theme-common';

const TABS = [
  {href: '/', label: 'Home', match: (path: string) => path === '/'},
  {href: '/getting-started/introduction', label: 'Get started', match: (path: string) => path.startsWith('/getting-started')},
  {href: '/virtual-machines/introduction', label: 'Compute', match: (path: string) => /\/(virtual-machines|deployments)(\/|$)/.test(path)},
  {href: '/buckets/introduction', label: 'Storage & Data', match: (path: string) => /\/(buckets|volumes|databases)(\/|$)/.test(path)},
  {href: '/firewall-policies/introduction', label: 'Networking', match: (path: string) => path.startsWith('/firewall')},
  {href: '/cli/introduction', label: 'CLI', match: (path: string) => path.startsWith('/cli')},
  {href: '/billing/introduction', label: 'Account', match: (path: string) => /\/(billing|audit-logs|settings)(\/|$)/.test(path)},
];

function ThemeToggle() {
  const {colorMode, setColorMode} = useColorMode();
  return (
    <button className="theme-btn" type="button" aria-label="Switch theme" onClick={() => setColorMode(colorMode === 'dark' ? 'light' : 'dark')}>
      <svg className="i-sun" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><circle cx="8" cy="8" r="3" stroke="currentColor" strokeWidth="1.5"/><path d="M8 1.25v1.5M8 13.25v1.5M1.25 8h1.5M13.25 8h1.5M3.2 3.2l1.06 1.06M11.74 11.74l1.06 1.06M3.2 12.8l1.06-1.06M11.74 4.26l1.06-1.06" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
      <svg className="i-moon" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M13.6 9.9A5.75 5.75 0 0 1 6.1 2.4a5.75 5.75 0 1 0 7.5 7.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/></svg>
    </button>
  );
}

export default function DocsChrome({children}: {children: ReactNode}) {
  const {pathname} = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const escape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && document.getElementById('menu-btn')?.getAttribute('aria-expanded') === 'true') {
        setMenuOpen(false);
        document.getElementById('menu-btn')?.focus();
      }
    };
    document.addEventListener('keydown', escape);
    return () => document.removeEventListener('keydown', escape);
  }, []);
  return (
    <>
      <header className="dnav">
        <div className="dwrap dnav__bar">
          <div className="dnav__left">
            <Link className="logo" href="/" aria-label="RumptyCloud Docs home">
              <img className="logo__mark" src="/docs-design/icons/logo-mark.svg" width="20" height="20" alt="" />
              <span className="logo__name">RumptyCloud</span>
              <span className="logo__rule" aria-hidden="true"></span>
              <span className="dnav__docs">Docs</span>
            </Link>
          </div>
          <nav className="dnav__actions" aria-label="Search, help and theme">
            <Link className="dnav__ghost" href="https://discord.gg/Rukmqzg3uX">Community</Link>
            <Link className="dnav__ghost" href="https://discord.gg/Rukmqzg3uX">Support</Link>
            <Link className="dnav__ghost" href="https://status.rumptycloud.com">Status</Link>
            <ThemeToggle />
            <Link className="btn btn--primary" href="https://console.rumptycloud.com"><span>Open console</span><span aria-hidden="true">↗</span></Link>
            <Link className="search-link" href="/search" aria-label="Search the docs">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true"><path d="M8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14Z" stroke="currentColor" strokeWidth="1.6"/><path d="M12.5 12.5L16 16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>
            </Link>
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
            {TABS.map((tab) => (
              <Link key={tab.href} href={tab.href} aria-current={tab.match(pathname) ? 'page' : undefined}>{tab.label}</Link>
            ))}
          </div>
        </nav>
      </header>
      {children}
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
          <Link className="dfoot__status" href="https://status.rumptycloud.com"><i aria-hidden="true"></i>All systems normal</Link>
        </div>
      </footer>
    </>
  );
}
