import {useEffect, useMemo, useRef, useState} from 'react';
import Link from '@docusaurus/Link';
import {usePluginData} from '@docusaurus/useGlobalData';
import {useHistory, useLocation} from '@docusaurus/router';

type Doc = {title: string; description: string; url: string; text: string};
const popularQueries = ['Deploy a Django app', 'Connect to Postgres', 'SSH into a VM', 'Open port 443', 'Upload to a bucket'];
const stopwords = new Set(['a', 'an', 'the', 'to', 'into', 'from', 'how', 'do', 'i', 'my', 'with', 'and']);
const normalize = (value: string) => value.toLowerCase().replace(/postgresql/g, 'postgres').replace(/deployments?/g, 'deploy').replace(/virtual machines?/g, 'vm').replace(/connecting|connection/g, 'connect').replace(/uploading/g, 'upload');

export default function DocsSearch({popular = false, resultsPage = false}: {popular?: boolean; resultsPage?: boolean}) {
  const {docs} = usePluginData('docs-search') as {docs: Doc[]};
  const location = useLocation();
  const history = useHistory();
  const initialQuery = new URLSearchParams(location.search).get('q') ?? '';
  const [query, setQuery] = useState(initialQuery);
  const [shortcut, setShortcut] = useState('Ctrl K');
  const input = useRef<HTMLInputElement>(null);
  useEffect(() => {setQuery(initialQuery);}, [initialQuery]);
  useEffect(() => {
    setShortcut(/Mac|iPhone|iPad/.test(navigator.platform) ? '⌘K' : 'Ctrl K');
    const handler = (event: KeyboardEvent) => {
      const editing = event.target instanceof HTMLElement && (event.target.isContentEditable || /INPUT|TEXTAREA|SELECT/.test(event.target.tagName));
      if ((event.key.toLowerCase() === 'k' && (event.metaKey || event.ctrlKey)) || (event.key === '/' && !editing && !event.metaKey && !event.ctrlKey && !event.altKey)) {
        event.preventDefault(); input.current?.focus();
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, []);
  const matches = useMemo(() => {
    const terms = normalize(query).match(/[a-z0-9]+/g)?.filter(term => !stopwords.has(term)) ?? [];
    if (!terms.length) return [];
    return docs.map(doc => {
      const title = normalize(doc.title), body = normalize(doc.text);
      const hits = terms.filter(term => title.includes(term) || body.includes(term));
      const frequency = terms.reduce((sum, term) => sum + Math.min(8, body.split(term).length - 1), 0);
      const score = frequency * 2 + hits.length * 10 + terms.filter(term => title.includes(term)).length * 15 + (hits.length === terms.length ? 50 : 0);
      return {doc, score: hits.length ? score : 0};
    }).filter(item => item.score > 0).sort((a, b) => b.score - a.score || a.doc.title.localeCompare(b.doc.title));
  }, [query, docs]);
  const shown = matches.slice(0, resultsPage ? 50 : 6);
  return <>
    <noscript><p>Enable JavaScript to search, or <a href="/">browse the documentation by product</a>.</p></noscript>
    <form className="ask" role="search" action="/search" method="get" onSubmit={event => {event.preventDefault(); history.push(`/search?q=${encodeURIComponent(query.trim())}`);}}>
      <label className="ask__field">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true"><path d="M8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14Z" stroke="currentColor" strokeWidth="1.6"/><path d="M12.5 12.5L16 16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>
        <span className="sr-only">Search the docs</span>
        <input ref={input} id="docs-q" name="q" type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Search guides, CLI commands and API…" autoComplete="off" spellCheck={false} aria-keyshortcuts="Meta+K Control+K /" aria-controls="docs-results" />
        <kbd className="ask__kbd">{shortcut}</kbd>
      </label>
    </form>
    <div id="docs-results" className="search-results" hidden={!query.trim()}>
      <p className="search-count" role="status">{matches.length ? `${matches.length} matching ${matches.length === 1 ? 'guide' : 'guides'}` : 'No matching guides. Try a product name or a shorter search.'}</p>
      {shown.length > 0 && <ul>{shown.map(({doc}) => <li key={doc.url}><Link href={doc.url}><strong>{doc.title}</strong><span>{doc.description || doc.text.slice(0, 160)}</span></Link></li>)}</ul>}
      {!resultsPage && matches.length > shown.length && <Link className="search-all" href={`/search?q=${encodeURIComponent(query.trim())}`}>View all results →</Link>}
    </div>
    {popular && <div className="popular"><span className="popular__label">Popular:</span>{popularQueries.map(text => <button key={text} type="button" className="chip" onClick={() => {setQuery(text); input.current?.focus();}}>{text}</button>)}</div>}
  </>;
}
