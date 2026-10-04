import {type ReactNode} from 'react';
import {ThemeClassNames} from '@docusaurus/theme-common';
import {useDoc} from '@docusaurus/plugin-content-docs/client';
import TOC from '@theme/TOC';

export default function DocItemTOCDesktop(): ReactNode {
  const {toc, frontMatter} = useDoc();
  return (
    <>
      <TOC
        toc={toc}
        minHeadingLevel={frontMatter.toc_min_heading_level}
        maxHeadingLevel={frontMatter.toc_max_heading_level}
        className={ThemeClassNames.docs.docTocDesktop}
      />
      <div className="rail__links">
        <a href="https://github.com/Sanmo-Labs/rumpty-docs">Edit this page ↗</a>
        <a href="https://github.com/Sanmo-Labs/rumpty-docs/issues">Report an issue ↗</a>
      </div>
    </>
  );
}
