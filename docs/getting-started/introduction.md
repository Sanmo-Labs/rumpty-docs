---
id: introduction
title: Introduction
sidebar_label: Introduction
slug: /getting-started/introduction
---

# Welcome to Rumpty<span style={{color: '#59C2FF'}}>Cloud</span>

RumptyCloud is a cloud platform for developers. Run virtual machines, deploy projects from GitHub or manually, spin up Kubernetes clusters, store files and data, and control network access — all organised into workspaces.

## Core features

| Feature               | Description                                                                                                       |
| --------------------- | ----------------------------------------------------------------------------------------------------------------- |
| **Virtual Machines**  | Linux VMs with private networking, SSH via the Rumpty CLI, snapshots, and metrics                                 |
| **Deployments**       | Deploy packaged projects from a GitHub repository or a manual repo URL — web apps, static sites, and backend APIs |
| **Kubernetes**        | Managed K8s clusters with autoscaling node pools                                                                  |
| **Volumes**           | Persistent block storage you can attach, detach, and move between VMs                                             |
| **Buckets**           | S3-compatible object storage with public or private visibility                                                    |
| **Databases**         | Managed Postgres, Redis, and MySQL with a public connection endpoint                                              |
| **Firewall Policies** | Workspace-scoped network rules — default inbound deny with per-port allow rules                                   |

## How it's organised

All resources live inside a **workspace**. Use workspaces to separate environments, projects, or clients. Switch between them from the top navbar at any time.

See [Workspaces](./workspaces) to create your first one.

## Where to start

- New to the platform? → [Account Setup](./account-setup)
- Ready to deploy? → [Quick Start](./quick-start)
- Setting up the CLI? → [Rumpty CLI](/cli/introduction)
