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

Add key/value pairs your app needs before the first deployment. Values are stored encrypted and treated as secrets. They are available during the **build** and at **runtime**, so frameworks that inline values into the bundle (Vite, Next.js, CRA) see them. Changing a variable requires a redeploy. You can add more later from the deployment's **Env** tab.

## Persistent storage (optional)

Deployment filesystems are wiped on every deploy. If your app needs files that survive deploys — a SQLite database, a search index, app-managed state — tick **Add persistent storage** and choose a mount path (e.g. `/data`) and size. Everything your app writes under that path is kept across deploys and restarts.

Volumes come with trade-offs (deploys briefly stop the app, single instance, size only grows). See [Persistent Storage](./persistent-storage) for details and for guidance on when a [database](/databases/introduction) or [bucket](/buckets/introduction) is the better home for your data.

## Runtime size

Pick a compute plan in the right panel. **First 3 apps are free. After that, Tiny is $2 per app.**

| Plan | Price | CPU (burst) | Memory | Egress |
|------|-------|-------------|---------|--------|
| **Free** | $0 (3 apps) | up to 0.5 vCPU | 512 MB | 50 GB |
| **Tiny** | $2/app | up to 0.5 vCPU | 512 MB | 50 GB |
| **Starter** | $4/app | up to 1 vCPU | 1 GB | 75 GB |
| **Scale** | $8/app | up to 1.5 vCPU | 2 GB | 250 GB |
| **Pro** | $15/app | up to 2 vCPU | 4 GB | 500 GB |

Prices are shown in the console as an hourly rate with an approximate monthly equivalent. CPU is the burst limit — the reservation underneath stays small so idle apps pack cheaply. Free apps always [sleep when idle](./scale-to-zero); paid plans can stay always-on. Browsers hitting a sleeping app see a wake page until it is ready.

## Start a build

**Start a build after creating this deployment** is checked by default. Uncheck it if you want to configure more settings before the first build runs.

**Automatically deploy when this branch receives new pushes** is also checked by default; see [GitHub deploy](./github-deploy) for how auto-deploy works.

## Auto-canceling Superseded Builds

To maximize resource efficiency, RumptyCloud automatically cancels any older, ongoing runs (whether they are still `queued` or actively `building`) for a deployment if you trigger a newer run. This prevents redundant builds and ensures your latest commit or manual update is deployed as fast as possible.

Click **Create deployment** to finish.