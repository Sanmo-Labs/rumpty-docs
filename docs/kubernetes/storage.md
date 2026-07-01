---
id: storage
title: Persistent Storage
sidebar_label: Persistent Storage
---

# Persistent Storage

Attach [Volumes](/volumes/introduction) to your pods using the platform's CSI driver. A `StorageClass` named `platform-block` is pre-configured in every cluster.

```yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: my-pvc
spec:
  accessModes: [ReadWriteOnce]
  storageClassName: platform-block
  resources:
    requests:
      storage: 10Gi
```
