---
id: create-a-deployment
title: Create a Deployment
sidebar_label: Create a deployment
---

# Create a Deployment

Go to **Compute → Deployments → New deployment**.

## Source

Deployments are created from a **GitHub** repository (connected through the GitHub App, see [GitHub deploy](./github-deploy)). Give the deployment a **Name**, pick a repository and branch, and optionally set a **Root directory** (e.g. `apps/api`) for monorepos.

## Application type

| Type | Use for |
|------|---------|
| **Static Site/SPA** | Frontend apps, docs, landing pages, sites |
| **Web Service/Backend** | Services that expose an HTTP endpoint |

## Readiness/health check path

The platform polls this path (default `/`) to confirm your service is healthy before marking the deployment active. It must return a successful response without authentication.

## Port

The **Port** field (default `8080`) is the port your app must listen on. The platform routes traffic to it, health-checks it, and injects it into your container as the `PORT` environment variable. It's editable for **Web Service/Backend** apps; for **Static Site/SPA** deployments it's locked, since the platform serves your built assets from its own web server.

The easiest setup is to make your app read `$PORT` and bind `0.0.0.0`; then the default always works. If your app listens on a hardcoded port instead, set this field to match. A mismatch here is the most common reason a deployment builds successfully but never becomes active. See [Ports & Health Checks](./ports) for details and troubleshooting.

## Build method

| Option | When to use |
|--------|-------------|
| **Auto** | Common frameworks: the platform detects your stack and builds automatically |
| **Dockerfile** | When your repo root directory contains a `Dockerfile` |

## Environment variables

Add key/value pairs your app needs before the first deployment. Values are stored encrypted and treated as secrets, and they are available during the build and at runtime. You can add more later from the deployment's **Env** tab.

## Persistent storage (optional)

Deployment filesystems are wiped on every deploy. If your app needs files that survive deploys — a SQLite database, a search index, app-managed state — tick **Add persistent storage** and choose a mount path (e.g. `/data`) and size. Everything your app writes under that path is kept across deploys and restarts.

Volumes come with trade-offs (deploys briefly stop the app, single instance, size only grows). See [Persistent Storage](./persistent-storage) for details and for guidance on when a [database](/databases/introduction) or [bucket](/buckets/introduction) is the better home for your data.

## Runtime size

Pick a compute plan in the right panel. Five sizes are offered:

| Size | Slug | vCPU | RAM | Transfer | Price |
|------|------|------|-----|----------|-------|
| **Free** | `deploy-free` | Up to 1 | 512 MB | 50 GB | Free |
| **Tiny** | `deploy-tiny` | Up to 1 | 512 MB | 50 GB | NGN 3.70/hr, up to NGN 2,699.28/mo |
| **Starter** | `deploy-starter` | Up to 1.5 | 1 GB | 75 GB | NGN 7.40/hr, up to NGN 5,399.55/mo |
| **Scale** | `deploy-scale` | Up to 2 | 2 GB | 250 GB | NGN 14.79/hr, up to NGN 10,799.11/mo |
| **Pro** | `deploy-pro` | Up to 3 | 4 GB | 500 GB | NGN 27.74/hr, up to NGN 20,249.07/mo |

Paid sizes bill hourly for the compute that runs, with the monthly figure as an always-on ceiling. Free apps always sleep when idle (scale-to-zero is forced on Free, with a ~8 second cold start on the first request after a sleep), and up to 5 free apps are included per account. On paid sizes scale-to-zero is optional: under **Autoscaling** you can keep the app always on, tune **Sleep after idle (minutes)**, and set **Min/Max instances** to scale out under load (each running instance is billed at the plan rate).

You can change a deployment's plan later from its **Settings** tab under **Compute plan**. Billing switches to the new rate straight away. If the app is live, it is redeployed on the new size with a rolling update (no rebuild, no downtime); if nothing is live yet, the new plan is used on the first deploy.

## Start a build

**Start a build after creating this deployment** is checked by default. Uncheck it if you want to configure more settings before the first build runs.

**Automatically deploy when this branch receives new pushes** is also checked by default; see [GitHub deploy](./github-deploy) for how auto-deploy works.

## Auto-canceling Superseded Builds

To maximize resource efficiency, RumptyCloud automatically cancels any older, ongoing runs (whether they are still `queued` or actively `building`) for a deployment if you trigger a newer run. This prevents redundant builds and ensures your latest commit or manual update is deployed as fast as possible.

Click **Create deployment** to finish.