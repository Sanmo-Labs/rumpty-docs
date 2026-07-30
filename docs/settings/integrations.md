---
id: integrations
title: Integrations
sidebar_label: Integrations
---

# Integrations

The **GitHub** tab under workspace **Settings** manages the GitHub accounts a workspace can use for deployments. Currently the only integration is the GitHub App.

## GitHub App

The GitHub App lets RumptyCloud access your repositories for deployments: choosing repos to build, building private code, and receiving automatic deploys on Git pushes.

The connection is workspace-scoped: repositories exposed here are visible to every workspace member who can create deployments.

### Install

1. Go to **Settings → GitHub** in the sidebar
2. Click **Connect GitHub App**
3. You'll be redirected to GitHub to authorise the app
4. Select which repositories RumptyCloud can access; prefer **Only select repositories** over all repositories
5. Confirm the installation; you return to the settings page afterwards

Once installed, your GitHub account appears here with its repository selection, and is available when creating a new deployment.

### Remove

Click **Disconnect** next to an installation and confirm. The workspace loses access to repositories from that GitHub account; new builds and automatic deploys that depend on the connection will stop working. Disconnecting is limited to workspace owners and administrators.