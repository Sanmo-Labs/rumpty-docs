---
id: create-a-database
title: Create a Database
sidebar_label: Create a Database
---

# Create a Database

Go to **Data → Databases → Create database**.

> Start with a small managed database. You can verify the routing and tighten access controls once the service is online.

## Step 1 — Database engine

Choose the engine that fits your workload. Versions and sizes are selected separately.

| Engine | Best for | Tags |
|--------|----------|------|
| **Postgres** | APIs, dashboards, SaaS backends, jobs, and anything that wants SQL with structure | SQL + transactions, Independent versions, Good default for most apps |
| **Redis** | Queues, cache, sessions, rate limits, realtime counters, and coordination locks | Low-latency cache, Great beside your app, Persistent storage |
| **MySQL** | Laravel, WordPress-style apps, internal tools, and services already built around MySQL | Familiar SQL, Broad app support, Independent versions |

## Step 2 — Version

Pick the database build. This maps to a backend image but stays separate from size.

Available versions are shown per engine (e.g. Postgres 16).

## Step 3 — Size

Choose compute, memory, and storage. Version is selected separately.

| Plan | Price | CPU | Memory | Storage |
|------|-------|-----|--------|---------|
| **Playground** | Free | 1 CPU | 256 MB | 1 GB |
| **Seed** | $1.15/mo | 1 CPU | 512 MB | 5 GB |
| **Sprout** | $2.70/mo | 1 CPU | 1 GB | 10 GB |
| **Bloom** | $4.60/mo | 1 CPU | 2 GB | 20 GB |

## Step 4 — Zone

Choose where the database runs. New databases default to `olas-closet`. Your database will be provisioned in the selected zone with the resources included in the plan.

## Step 5 — Service basics

| Field | Details |
|-------|---------|
| **Database name** | A name for the instance, e.g. `main-db` |
| **Public connection endpoint** | Checked by default — creates a connection URL for clients outside the cluster |

## Service summary

The right panel updates as you configure:

| Field | Example |
|-------|---------|
| **Service** | Postgres 16 |
| **Name** | `main-db` |
| **Size** | Playground |
| **Resources** | 1 CPU · 256 MB · 1 GB |
| **Zone** | olas-closet |
| **Endpoint** | Public database URL |

**What you get:**
- A database instance sized by the selected plan
- Dedicated storage for database files and runtime state
- A connection endpoint your apps can use when provisioning completes

Click **Create database**.