---
id: github-deploy
title: GitHub Deployment
sidebar_label: GitHub Deploy
---

# GitHub Deployment

Connect your GitHub repository for automatic deployments on every push.

## Connect GitHub

1. Go to **Settings → Integrations → GitHub**
2. Click **Connect GitHub Account**
3. Authorise the platform on GitHub (you can restrict access to specific repositories)

## Create a GitHub deployment

1. Go to **Deployments → New Deployment**
2. Select **GitHub** as the source
3. Choose your repository and branch
4. Configure build settings:

| Setting | Example |
|---------|---------|
| Build command | `npm run build` |
| Output directory | `dist` |
| Start command | `node dist/server.js` |
| Port | `3000` |

5. Click **Deploy**

## Auto-deploy on push

Once connected, every push to the selected branch triggers a new deployment automatically.

To disable auto-deploy: open the deployment → **Settings → Deployment → Auto-deploy: Off**

## Environment variables

Set environment variables for each deployment under **Settings → Environment**. These are injected at build time and runtime.

## Deploy previews (pull requests)

When enabled, every pull request gets its own preview URL:

1. Open the deployment → **Settings → Preview Deployments**
2. Toggle **Enable preview deployments**

Preview URLs follow the format: `https://pr-<number>.<your-deployment>.yourplatform.app`

## Build logs

View the full build log under **Deployments → [your deployment] → Builds → [build ID]**.

## Rollback

To roll back to a previous build:

1. Go to **Deployments → [your deployment] → Builds**
2. Find the build you want to restore
3. Click **Rollback to this build**
