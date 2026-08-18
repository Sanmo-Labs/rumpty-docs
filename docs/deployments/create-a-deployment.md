---
id: create-a-deployment
title: Create a Deployment
sidebar_label: Create a Deployment
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

Add key/value pairs your app needs before the first deployment. Values are stored encrypted and treated as secrets, and they are injected at **runtime** only; they are deliberately kept out of the build so secret values can't leak into the built image. You can add more later from the deployment's **Env** tab.

## Persistent storage (optional)

Deployment filesystems are wiped on every deploy. If your app needs files that survive deploys — a SQLite database, a search index, app-managed state — tick **Add persistent storage** and choose a mount path (e.g. `/data`) and size. Everything your app writes under that path is kept across deploys and restarts.

Volumes come with trade-offs (deploys briefly stop the app, single instance, size only grows). See [Persistent Storage](./persistent-storage) for details and for guidance on when a [database](/databases/introduction) or [bucket](/buckets/introduction) is the better home for your data.

## Runtime size

Pick a compute plan in the right panel:

| Plan | Price | CPU | Memory |
|------|-------|-----|--------|
| **Tiny** | ~$2/mo | 0.25 vCPU | 512 MB |
| **Starter** | ~$4/mo | 0.75 vCPU | 1 GB |
| **Scale** | ~$8/mo | 1 vCPU | 2 GB |
| **Pro** | ~$15/mo | 2 vCPU | 4 GB |

Prices are shown in the console as an hourly rate with an approximate monthly equivalent. The **Tiny** plan includes 3 free deployments.

## Start a build

**Start a build after creating this deployment** is checked by default. Uncheck it if you want to configure more settings before the first build runs.

**Automatically deploy when this branch receives new pushes** is also checked by default; see [GitHub deploy](./github-deploy) for how auto-deploy works.

## Auto-canceling Superseded Builds

To maximize resource efficiency, RumptyCloud automatically cancels any older, ongoing runs (whether they are still `queued` or actively `building`) for a deployment if you trigger a newer run. This prevents redundant builds and ensures your latest commit or manual update is deployed as fast as possible.

Click **Create deployment** to finish.