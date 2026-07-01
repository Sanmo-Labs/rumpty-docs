---
id: connecting
title: Connecting with kubectl
sidebar_label: Connecting
---

# Connecting with kubectl

## Download kubeconfig

1. Open the cluster detail page
2. Click **Download kubeconfig**
3. Move the file to `~/.kube/config` or set `KUBECONFIG`:

```bash
export KUBECONFIG=~/Downloads/your-cluster.yaml
kubectl get nodes
```

## Connecting a container registry

To pull private images into your cluster, create an image pull secret:

```bash
kubectl create secret docker-registry regcred \
  --docker-server=registry.yourplatform.com \
  --docker-username=<your-username> \
  --docker-password=<your-token>
```

Then reference it in your pod spec:

```yaml
spec:
  imagePullSecrets:
    - name: regcred
```
