function eyebrowForPath(path: string): string | undefined {
  if (path.startsWith('/getting-started/quick-start')) return 'Guide · about 5 min';
  if (path.startsWith('/getting-started')) return 'Get started';
  if (path.startsWith('/virtual-machines/create-a-vm')) return 'Guide · 10 steps · about 5 min';
  if (path.startsWith('/virtual-machines/connecting')) return 'Guide · Virtual Machines';
  if (path.startsWith('/virtual-machines') || path.startsWith('/deployments') || path.startsWith('/kubernetes')) return 'Compute';
  if (path.startsWith('/buckets') || path.startsWith('/volumes') || path.startsWith('/databases')) return 'Storage & Data';
  if (path.startsWith('/firewall')) return 'Networking';
  if (path.startsWith('/cli')) return 'Tools';
  if (path.startsWith('/billing') || path.startsWith('/audit-logs') || path.startsWith('/settings')) return 'Account';
  return undefined;
}

function injectEyebrow() {
  const markdown = document.querySelector('.theme-doc-markdown');
  if (!markdown || markdown.querySelector('.eyebrow')) return;
  const label = eyebrowForPath(window.location.pathname);
  if (!label) return;
  const p = document.createElement('p');
  p.className = 'eyebrow';
  p.textContent = label;
  markdown.insertBefore(p, markdown.firstChild);
}

function injectRail() {
  const toc = document.querySelector('.theme-doc-toc-desktop');
  if (!toc || toc.parentElement?.querySelector('.rail__links')) return;
  const links = document.createElement('div');
  links.className = 'rail__links';
  links.innerHTML =
    '<a href="https://github.com/Sanmo-Labs/rumpty-docs">Edit this page ↗</a>' +
    '<a href="https://github.com/Sanmo-Labs/rumpty-docs/issues">Report an issue ↗</a>';
  toc.insertAdjacentElement('afterend', links);
}

function enhance() {
  injectEyebrow();
  injectRail();
}

export function onRouteDidUpdate() {
  enhance();
}

export function onClientEntry() {
  enhance();
}
