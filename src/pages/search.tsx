import Head from '@docusaurus/Head';
import Layout from '@theme/Layout';
import DocsSearch from '../components/DocsSearch';

export default function Search() {
  return <Layout title="Search docs" description="Find RumptyCloud guides and references."><Head><meta name="robots" content="noindex, follow" /></Head><main className="docs-home"><section className="dhero"><div className="dwrap dhero__inner"><h1 className="dhero__title">Search the docs</h1><p className="dhero__sub">Find a guide by product, command, or task.</p><DocsSearch resultsPage /></div></section></main></Layout>;
}
