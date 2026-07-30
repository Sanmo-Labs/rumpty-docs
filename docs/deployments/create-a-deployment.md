---
id: create-a-deployment
title: Create a Deployment
sidebar_label: Create a Deployment
---

# Create a Deployment

Go to **Compute → Deployments → New Deployment**.

## Source

Deployments are created from a **GitHub** repository (OAuth-connected, see [GitHub deploy](./github-deploy)). Connect your GitHub account, pick a repository and branch, and optionally set a **Root directory** (e.g. `apps/api`) for monorepos.

## Application type

| Type | Use for |
|------|---------|
| **Static Site/SPA** | Frontend apps, docs, landing pages, sites |
| **Web Service/Backend** | Services that expose an HTTP endpoint |

## Readiness/health check path

The platform polls this path (default `/`) to confirm your service is healthy before marking the deployment active. It must return a successful response without authentication.

## Port

The **Port** field (default `8080`) is the port your app must listen on — the platform routes traffic to it, health-checks it, and injects it into your container as the `PORT` environment variable. It's editable for **Web Service/Backend** apps; for **Static Site/SPA** deployments it's locked, since the platform serves your built assets from its own web server.

The easiest setup is to make your app read `$PORT` and bind `0.0.0.0`; then the default always works. If your app listens on a hardcoded port instead, set this field to match. A mismatch here is the most common reason a deployment builds successfully but never becomes active — see [Ports & Health Checks](./ports) for details and troubleshooting.

## Build method

| Option | When to use |
|--------|-------------|
| **Auto** | Common frameworks — the platform detects your stack and builds automatically |
| **Dockerfile** | When your repo root directory contains a `Dockerfile` |

## Environment variables

Add key/value pairs your app needs at build or runtime before the first deployment. You can add more later from the deployment's settings.

## Runtime size

Pick a compute plan in the right panel:

| Plan | Price | vCPU | Memory | Storage |
|------|-------|------|--------|---------|
| **Ephemeral Trial** | Free | 1 vCPU | 512 MB | 5 GB SSD |
| **Launch** | $1.55/mo | 1 vCPU | 512 MB | 10 GB SSD |
| **Micro** | $2.70/mo | 1 vCPU | 1 GB | 20 GB SSD |
| **Core** | $4.60/mo | 1 vCPU | 2 GB | 30 GB SSD |
| **Scale** | $6.15/mo | 2 vCPU | 2 GB | 50 GB SSD |

## Start a build

**Start a build after creating this deployment** is checked by default — uncheck it if you want to configure more settings before the first build runs.

## Auto-canceling Superseded Builds

To maximize resource efficiency, Rumpty Cloud automatically cancels any older, ongoing runs (whether they are still `queued` or actively `building`) for a deployment if you trigger a newer run. This prevents redundant builds and ensures your latest commit or manual update is deployed as fast as possible.

Click **Create deployment** to finish.