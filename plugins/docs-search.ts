import {readFile} from 'node:fs/promises';
import path from 'node:path';
import type {LoadContext, Plugin} from '@docusaurus/types';
import type {LoadedContent} from '@docusaurus/plugin-content-docs';

export default function docsSearch(context: LoadContext): Plugin {
  return {
    name: 'docs-search',
    async allContentLoaded({allContent, actions}) {
      const content = allContent['docusaurus-plugin-content-docs']?.default as LoadedContent | undefined;
      const docs = await Promise.all((content?.loadedVersions[0]?.docs ?? [])
        .filter(doc => !doc.draft && !doc.unlisted)
        .map(async doc => {
          const raw = await readFile(path.resolve(context.siteDir, doc.source.replace(/^@site\//, '')), 'utf8');
          const text = raw.replace(/^---[\s\S]*?---\s*/, '').replace(/<[^>]*>/g, ' ')
            .replace(/!?\[([^\]]*)\]\([^)]*\)/g, '$1').replace(/[#*`|>]/g, ' ').replace(/\s+/g, ' ').trim();
          return {title: doc.title, description: doc.description, url: doc.permalink, text};
        }));
      actions.setGlobalData({docs});
    },
  };
}
