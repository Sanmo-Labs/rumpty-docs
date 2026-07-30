---
id: storage
title: Persistent Storage
sidebar_label: Persistent Storage
---

# Persistent Storage

Clusters run k3s, which includes the built-in `local-path` storage class as the default. PersistentVolumeClaims are provisioned as directories on the disk of the node where the pod is scheduled.

```yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: my-pvc
spec:
  accessModes: [ReadWriteOnce]
  storageClassName: local-path
  resources:
    requests:
      storage: 10Gi
```

Because `local-path` is the default storage class, you can also omit `storageClassName` entirely.

:::warning
`local-path` volumes are node-local. Data lives on the disk of a single node, is not replicated, and a pod using the volume is pinned to that node. Deleting the cluster destroys all persistent volumes on its nodes. Keep your own backups of anything you cannot lose.
:::
