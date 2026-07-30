---
id: connecting
title: Connecting with kubectl
sidebar_label: Connecting
---

# Connecting with kubectl

## Download kubeconfig

1. Open the cluster detail page
2. Click **Download Kubeconfig** (top right). The file is saved as `<cluster-slug>-kubeconfig.yaml`
3. Point `kubectl` at the downloaded file:

```bash
export KUBECONFIG=~/Downloads/<cluster-slug>-kubeconfig.yaml
kubectl get nodes
```

The **Access** tab on the cluster detail page shows this command with your cluster's actual file name, and lets you copy the raw kubeconfig contents directly.

:::note
The kubeconfig is generated shortly after the cluster reaches the running state. If the button shows **Generating Kubeconfig...**, wait a moment; the download becomes available automatically.
:::

## Pulling private images

To pull images from a private container registry, create an image pull secret with your registry's credentials:

```bash
kubectl create secret docker-registry regcred \
  --docker-server=<your-registry-host> \
  --docker-username=<your-username> \
  --docker-password=<your-token>
```

Then reference it in your pod spec:

```yaml
spec:
  imagePullSecrets:
    - name: regcred
```
