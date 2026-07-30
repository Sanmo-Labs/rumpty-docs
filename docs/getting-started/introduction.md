---
id: introduction
title: Introduction
sidebar_label: Introduction
slug: /getting-started/introduction
---

# Welcome to Rumpty<span style={{color: '#59C2FF'}}>Cloud</span>

RumptyCloud is a cloud platform for developers and everyone. Run virtual machines, deploy projects from GitHub, spin up Kubernetes clusters, store files and data, and control network access, all organised into workspaces.

## Core features

| Feature               | Description                                                                                                       |
| --------------------- | ----------------------------------------------------------------------------------------------------------------- |
| **Virtual Machines**  | Linux VMs with private networking, SSH via the Rumpty CLI, snapshots, and metrics                                 |
| **Deployments**       | Build and deploy web apps, static sites, and backend APIs from a GitHub repository, with automatic deploys on push |
| **One-Click Apps**    | Deploy prepackaged apps such as WordPress from ready-made templates                                               |
| **Kubernetes**        | Managed Kubernetes clusters with your choice of version, worker count, and worker plan                           |
| **Inference**         | Inference projects with an OpenAI-compatible endpoint and API key for hosted models                              |
| **Volumes**           | Persistent block storage you can attach, detach, and move between VMs                                             |
| **Buckets**           | S3-compatible object storage with public or private visibility                                                    |
| **Snapshots**         | Point-in-time VM snapshots you can restore into new VMs                                                           |
| **Databases**         | Managed Postgres with a public connection endpoint; Redis and MySQL coming soon                                   |
| **Firewall Policies** | Workspace-scoped network rules: default inbound deny with per-port allow rules                                   |

## How it's organised

All resources live inside a **workspace**. Use workspaces to separate environments, projects, or clients. Switch between them from the top navbar at any time.

See [Workspaces](./workspaces) to create your first one.

## Where to start

- New to the platform? → [Account Setup](./account-setup)
- Ready to deploy? → [Quick Start](./quick-start)
- Setting up the CLI? → [Rumpty CLI](/cli/introduction)
