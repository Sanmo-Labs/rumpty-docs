---
id: integrations
title: Integrations
sidebar_label: Integrations
---

# Integrations

The **Integrations** tab manages external service connections. Currently the only integration is the GitHub App.

## GitHub App

The GitHub App lets RumptyCloud access your repositories for deployments — choosing repos to build, building private code, and receiving automatic deploys on Git pushes.

### Install

1. Go to **Settings → Integrations**
2. Click **Install GitHub App**
3. You'll be redirected to GitHub to authorise the app
4. Select which repositories RumptyCloud can access (specific repos or all)
5. Confirm the installation

Once installed, your GitHub account appears here and is available when creating a new deployment under **Source → GitHub**.

### Remove

To disconnect GitHub, click **Configure** and remove the app from your GitHub account's installed apps. Existing deployments that were connected via GitHub will stop receiving automatic deploys.