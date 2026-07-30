---
id: introduction
title: Kubernetes
sidebar_label: Introduction
slug: /kubernetes/introduction
---

# Kubernetes

Run containerised workloads on managed Kubernetes clusters. Clusters run [k3s](https://k3s.io), a lightweight, CNCF-certified Kubernetes distribution, and are currently in preview. Go to **Compute → Kubernetes**.

## How it works

Each cluster belongs to a workspace. When you create a cluster, the platform provisions a control plane node and the worker nodes you choose, then exposes the cluster API through a public endpoint. You manage the cluster with standard `kubectl` once you download its kubeconfig.

The cluster detail page has four tabs: **Overview** (control plane and worker pool summary), **Nodes** (each node's role, status, plan, and private IP), **Access** (connection instructions), and **Settings** (upgrades and deletion).

## What's next

- [Create a cluster](./create-a-cluster)
- [Connecting with kubectl](./connecting)
- [Persistent storage](./storage)
