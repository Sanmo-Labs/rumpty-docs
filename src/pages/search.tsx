import Head from '@docusaurus/Head';
import LayoutProvider from '@theme/Layout/Provider';
import {PageMetadata} from '@docusaurus/theme-common';
import DocsChrome from '../components/DocsChrome';
import DocsSearch from '../components/DocsSearch';

export default function Search() {
  return (
    <LayoutProvider>
      <PageMetadata title="Search" description="Search every RumptyCloud guide and CLI command." />
      <Head>
        <meta name="robots" content="noindex, follow" />
      </Head>
      <div className="docs-home">
        <a className="skip" href="#main">Skip to content</a>
        <DocsChrome>
          <main id="main">
            <section className="dhero">
              <div className="dwrap dhero__inner">
                <h1 className="dhero__title">Search the docs</h1>
                <p className="dhero__sub">Find a guide by product, command, or task.</p>
                <DocsSearch resultsPage />
              </div>
            </section>
          </main>
        </DocsChrome>
      </div>
    </LayoutProvider>
  );
}
