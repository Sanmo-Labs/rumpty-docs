---
id: introduction
title: Introduction
sidebar_label: Introduction
slug: /getting-started/introduction
eyebrow: Get started
---

<p className="eyebrow">Get started</p>

# Welcome to RumptyCloud

RumptyCloud is a cloud platform for developers and everyone. Run virtual machines, deploy projects from GitHub, spin up Kubernetes clusters, store files and data, and control network access, all organised into workspaces.

## Core features

| Feature | Description |
| --- | --- |
| Virtual Machines | Linux VMs with private networking, SSH via the Rumpty CLI, snapshots, and metrics |
| Deployments | Build and deploy web apps, static sites, and backend APIs from a GitHub repository, with automatic deploys on push |
| One-Click Apps | Deploy prepackaged apps such as WordPress from ready-made templates |
| Kubernetes | Managed Kubernetes clusters with your choice of version, worker count, and worker plan |
| Inference | Inference projects with an OpenAI-compatible endpoint and API key for hosted models |
| Volumes | Persistent block storage you can attach, detach, and move between VMs |
| Buckets | S3-compatible object storage with public or private visibility |
| Snapshots | Point-in-time VM snapshots you can restore into new VMs |
| Databases | Managed Postgres with a public connection endpoint. Redis and MySQL coming soon |
| Firewall Policies | Workspace-scoped network rules: default inbound deny with per-port allow rules |

## How it's organised

All resources live inside a workspace. Use workspaces to separate environments, projects, or clients. Switch between them from the top navbar at any time.

:::tip Tip
Make one workspace per environment, like staging and production, so VMs, databases and firewall rules never mix.
:::

## Where to start

<div className="cards">
  <a className="card" href="/getting-started/account-setup">
    <span className="card__title">Account setup →</span>
    <span className="card__desc">New to the platform? Create your account and first workspace.</span>
  </a>
  <a className="card" href="/getting-started/quick-start">
    <span className="card__title">Quick start →</span>
    <span className="card__desc">Ready to deploy? Get your first app running in under 5 minutes.</span>
  </a>
  <a className="card" href="/cli/introduction">
    <span className="card__title">Rumpty CLI →</span>
    <span className="card__desc">Setting up the CLI? Install it and sign in from your terminal.</span>
  </a>
</div>
