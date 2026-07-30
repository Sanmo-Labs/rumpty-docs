---
id: create-a-cluster
title: Create a Cluster
sidebar_label: Create a Cluster
---

# Create a Cluster

1. Go to **Compute → Kubernetes** and click **Create Cluster**
2. Enter a **Cluster name**
3. Choose a **Kubernetes version** (for example `v1.36.2+k3s1`)
4. Configure the **default worker pool**:
   - **Worker count**: 1, 2, or 3 nodes
   - **Worker size**: pick a plan (CPU and RAM per worker node)
5. Click **Create Cluster**

The **Zone** is currently fixed to `olas-closet`, and the **control plane** runs on a fixed Pro plan (2 vCPU, 2 GB RAM). The **Estimated Cost** panel shows the monthly total for the control plane plus workers before you create the cluster.

Provisioning progress is shown on the cluster page: setting up the control plane, setting up and joining worker nodes, installing the network overlay, and validating the cluster API.

:::note
Node autoscaling is not available. The worker count you choose at creation is the size of the pool.
:::

## Upgrading Kubernetes

Self-service upgrades are not available yet. When cluster upgrades roll out, they will be applied to the control plane first, then to worker nodes.

## Delete a cluster

1. Open the cluster detail page and go to the **Settings** tab
2. Click **Delete Cluster**
3. Type the cluster name to confirm

:::warning
Deleting a cluster permanently terminates the control plane and worker nodes. All containers and persistent volumes on the cluster's nodes are destroyed. Billing stops once the cluster is deleted.
:::
