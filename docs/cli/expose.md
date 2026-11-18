---
id: expose
title: Expose a VM Service
sidebar_label: Expose a service
---

# Expose a VM Service

`rumpty expose` gives a service running inside a VM a public HTTPS URL through Rumpty HTTP access. `rumpty unexpose` removes it, and `rumpty vm expose ls` lists the URLs a VM already has.

## Quick start

```bash
rumpty expose api-box -p 3000
```

Name the URL instead of the default `port-<port>`:

```bash
rumpty expose test-vm8 --ws production-team-019e2b95 --port 18789 --name openclaw
```

List the exposed URLs for a VM:

```bash
rumpty vm expose ls test-vm8 --ws production-team-019e2b95
```

## Remove an exposed service

`rumpty unexpose` removes a URL by its name:

```bash
rumpty unexpose test-vm8 --ws production-team-019e2b95 --name openclaw
```

## Requirements

- A signed-in session (`rumpty login`) or the `RUMPTY_API_KEY` environment variable. See [Login & Logout](./login).
- A workspace: the `--ws` flag or `$RUMPTY_WORKSPACE`. The examples without `--ws` assume `RUMPTY_WORKSPACE` is set.

:::warning
The service inside the VM must listen on `0.0.0.0:<port>`, not only `127.0.0.1`. A service bound to `127.0.0.1` accepts connections from inside the VM itself, but not from the Rumpty HTTP route.
:::

## Flags

| Flag | Description |
|------|-------------|
| `-p`, `--port` | Port inside the VM to expose |
| `--name` | Public app name; defaults to `port-<port>` |
| `--protocol` | Application protocol: `http` (default) or `grpc` |

## gRPC services

Pass `--protocol grpc` for a gRPC service:

```bash
rumpty expose api-box --ws production-team-019e2b95 -p 50051 --protocol grpc
```
