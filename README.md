# Cloud Platform Documentation

Built with [Docusaurus](https://docusaurus.io/).

## Getting started

Install dependencies:

```bash
npm install
```

Run the local dev server:

```bash
npm run start
```

Your docs will be live at [http://localhost:3000](http://localhost:3000).

## Build for production

```bash
npm run build
```

The static site is output to the `build/` folder. Deploy it to any static host (Vercel, Netlify, GitHub Pages, etc.).

## Deploy to GitHub Pages

```bash
GIT_USER=<your-github-username> npm run deploy
```

## Project structure

```
docs/
├── getting-started/    # Introduction, account setup, quick start
├── compute/            # VMs, Kubernetes
├── deployments/        # Manual and GitHub deployments
├── storage/            # Volumes, buckets
├── database/           # Database overview, connecting, backups
├── networking/         # Firewall policies
└── billing/            # Billing, activity logs, settings
```

## Edit a page

Each page is a Markdown (`.md`) file inside `docs/`. Edit the file and the dev server hot-reloads automatically.

## Add a new page

1. Create a `.md` file in the appropriate folder
2. Add the page id to `sidebars.ts`

## Docs homepage design

The homepage adapts the RumptyCloud `docs-home` reference in React. Its scoped
styles are in `src/css/docs-home.css`; illustrations, icons, and licensed fonts
live in `static/docs-design/`. Existing documentation routes remain unchanged.

`plugins/docs-search.ts` builds the search index from published Docusaurus docs,
including their actual permalinks. Draft and unlisted pages are excluded. Search
works on the homepage and `/search?q=...`, with `/` and Ctrl/Cmd+K shortcuts.

Run `npm run typecheck` and `npm run build` before publishing.
