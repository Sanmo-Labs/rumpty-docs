---
id: create-a-cluster
title: Create a Cluster
sidebar_label: Create a Cluster
---

# Create a Cluster

1. Go to **Compute → Kubernetes → New Cluster**
2. Choose a Kubernetes version
3. Select a region
4. Configure your **node pool**:
   - Node plan (CPU/RAM per node)
   - Node count (minimum and maximum for autoscaling)
5. Click **Create Cluster**

Cluster provisioning takes 2–5 minutes.

## Autoscaling

Node autoscaling is enabled by default. Set the minimum and maximum node count when creating the cluster, and the platform scales the pool up or down based on pod resource requests.

## Upgrading Kubernetes

1. Open the cluster detail page
2. Click **Upgrade**
3. Select the target version and confirm

Upgrades are performed with a rolling node replacement. Your workloads remain available if you have multiple replicas.
