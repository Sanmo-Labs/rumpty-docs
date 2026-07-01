---
id: create-a-deployment
title: Create a Deployment
sidebar_label: Create a Deployment
---

# Create a Deployment

Go to **Compute → Deployments → New Deployment**.

## Source

Choose between **Manual** (paste a repository URL directly) or **GitHub** (OAuth-connected, see [GitHub deploy](./github-deploy)).

For Manual, fill in:

| Field | Example |
|-------|---------|
| **Name** | `orders-api` |
| **Repository URL** | `https://github.com/acme/orders-api.git` |
| **Branch** | `main` |
| **Root directory** *(optional)* | `apps/api` — use this for monorepos |

## Application type

| Type | Use for |
|------|---------|
| **Web or static app** | Frontend apps, docs, landing pages, sites |
| **Backend API** | Services that expose an HTTP endpoint |

Selecting **Backend API** reveals a **Backend readiness path** field (default `/`) — the platform polls this endpoint to confirm your service is healthy before marking the deployment active.

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

Click **Create deployment** to finish.