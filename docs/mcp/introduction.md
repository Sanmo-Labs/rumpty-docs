---
id: introduction
title: "MCP Server: Connect Cursor, Claude Code & VS Code"
sidebar_label: MCP server
slug: /mcp
description: Connect Cursor, Claude Code, VS Code or any MCP client to RumptyCloud. AI agents get over 100 tools to deploy apps, read logs, and manage VMs, databases, buckets, firewalls and billing.
keywords:
  - RumptyCloud MCP
  - Model Context Protocol
  - MCP server
  - Cursor MCP
  - Claude Code MCP
  - VS Code MCP
  - AI agent cloud deployment
---

# MCP Server

The RumptyCloud MCP server lets AI agents manage your account. Connect Cursor, Claude Code, VS Code or any other [Model Context Protocol](https://modelcontextprotocol.io) client, then ask in plain language: "deploy my repo and show me the build logs", "why is my app crashing?", "create a free Postgres database and connect it to my API".

| | |
|---|---|
| **Server URL** | `https://mcp.rumptycloud.com/mcp` |
| **Transport** | Streamable HTTP |
| **Authentication** | `Authorization: Bearer <your API key>` |
| **Price** | Free. You pay only for the resources an agent creates. |

## Before you start

Create a personal API key under **Manage Profile → My profile → Personal API keys**. See [API keys](/settings/api-keys).

The agent acts as you: in each workspace it has exactly your role, so a viewer key can read but not change anything. Give the key a clear name such as `Cursor MCP` so you can spot it in [audit logs](/audit-logs/introduction), and revoke it to cut the agent off.

## Connect your client

### Cursor

Add the server to `~/.cursor/mcp.json` (all projects) or `.cursor/mcp.json` (one project):

```json
{
  "mcpServers": {
    "rumptycloud": {
      "url": "https://mcp.rumptycloud.com/mcp",
      "headers": { "Authorization": "Bearer rumpty_..." }
    }
  }
}
```

Restart Cursor or toggle the server under **Settings → MCP**. RumptyCloud appears with its tools listed.

### Claude Code

```bash
claude mcp add --transport http rumptycloud \
  https://mcp.rumptycloud.com/mcp \
  --header "Authorization: Bearer rumpty_..."
```

Run `claude mcp list` to confirm it connected.

### VS Code

Add the server to `.vscode/mcp.json` in your project:

```json
{
  "servers": {
    "rumptycloud": {
      "type": "http",
      "url": "https://mcp.rumptycloud.com/mcp",
      "headers": { "Authorization": "Bearer rumpty_..." }
    }
  }
}
```

### Other clients

Any client that can reach a remote HTTP MCP server and send a custom header works. Use the server URL above and send your API key in the `Authorization` header as `Bearer <key>`.

:::warning
Your API key grants full access to everything your role allows. Keep config files that contain it out of version control, or use your client's support for environment variables or secret inputs where it has one.
:::

## Check that it works

Ask your agent "Which RumptyCloud workspaces do I have?". It calls `list_workspaces` and lists them. Most other tools take a workspace slug, so agents usually start there.

## Safety

- **Agents confirm first.** The server tells agents that creating, changing or deleting resources acts on real, billed infrastructure, and to confirm with you before doing so.
- **Deletes need the name typed back.** Permanent deletes (deployments, VMs, volumes, snapshots, firewall policies, SSH keys) require the resource's name as confirmed by you. Removing a card requires its last four digits.
- **Database access is read-only.** `run_database_query` runs one read-only SQL statement on PostgreSQL or MySQL, or one read-only Redis command.
- **No silent charges.** `top_up_wallet` and `add_payment_card` return a checkout link that you open and pay yourself.
- **Everything is audited.** Every change the agent makes shows up in [audit logs](/audit-logs/introduction) under your name.

## Tools

The server has 106 tools.

| Area | Tools |
|------|-------|
| **Account** | `whoami`, `list_workspaces`, `get_workspace_overview`, `list_workspace_members`, `list_audit_logs`, `list_operations`, `get_catalog`, `list_apps` |
| **Deployments** | `list_deployments`, `create_deployment`, `deploy`, `restart_deployment`, `rollback_deployment`, `delete_deployment`, `update_deployment_settings`, `change_deployment_plan`, `list_deployment_runs`, `list_deployment_instances`, `get_deployment_activity` |
| **Logs & metrics** | `get_build_logs`, `get_runtime_logs`, `get_metrics` |
| **Environment** | `list_deployment_env_vars`, `set_deployment_env_var`, `delete_deployment_env_var`, `connect_database_to_deployment`, `connect_bucket_to_deployment` |
| **GitHub** | `connect_github`, `link_github_connection`, `list_github_repositories` |
| **Domains** | `list_domains`, `add_deployment_domain`, `verify_deployment_domain`, `remove_deployment_domain`, `add_vm_domain`, `verify_vm_domain`, `remove_vm_domain` |
| **Virtual machines** | `list_vms`, `create_vm`, `start_vm`, `stop_vm`, `reboot_vm`, `resize_vm`, `delete_vm`, `run_vm_command`, `expose_vm_port`, `unexpose_vm_port`, `list_vm_exposed_ports`, `set_vm_app_port` |
| **Snapshots** | `list_snapshots`, `create_vm_snapshot`, `restore_vm_snapshot`, `delete_vm_snapshot` |
| **Volumes** | `list_volumes`, `create_volume`, `attach_volume`, `detach_volume`, `delete_volume` |
| **Databases** | `list_databases`, `create_database`, `resize_database`, `delete_database`, `rotate_database_password`, `create_database_snapshot`, `restore_database_snapshot`, `delete_database_snapshot`, `list_database_tables`, `browse_database_table`, `run_database_query`, `list_redis_keys` |
| **Buckets** | `list_buckets`, `create_bucket`, `delete_bucket`, `list_bucket_objects`, `get_object_download_url`, `delete_bucket_object`, `set_bucket_cors`, `list_bucket_access_keys`, `revoke_bucket_access_key` |
| **Firewalls** | `list_firewall_policies`, `create_firewall_policy`, `update_firewall_policy`, `delete_firewall_policy`, `add_firewall_rule`, `update_firewall_rule`, `delete_firewall_rule`, `attach_firewall_policy`, `detach_firewall_policy` |
| **SSH keys** | `list_ssh_keys`, `add_ssh_key`, `delete_ssh_key` |
| **Kubernetes** | `list_kubernetes_clusters` |
| **AI inference** | `list_inference_projects`, `get_inference_usage` |
| **Billing** | `get_billing`, `list_invoices`, `list_wallet_transactions`, `list_wallet_ledger`, `list_payment_methods`, `top_up_wallet`, `add_payment_card`, `remove_payment_card`, `settle_outstanding_balance`, `get_promotions`, `redeem_promo_code` |
| **Support** | `list_support_tickets` |

## Example prompts

- "Deploy github.com/me/my-api to my workspace and show me the build logs."
- "My deployment keeps restarting. Check the runtime logs and tell me why."
- "Create a free Postgres database, connect it to my api deployment, and redeploy."
- "Spin up a small VM, expose port 3000 and give me the URL."
- "Only allow 203.0.113.10 to reach my database."
- "What did I spend this month, and on what?"

## Troubleshooting

| Problem | Fix |
|---------|-----|
| `401 Unauthorized` | The key is wrong, expired or revoked. Create a new one and check the header reads `Bearer <key>`. |
| The agent can read but not change things | Your role in that workspace is viewer. Ask an admin to change it. |
| Tools don't appear | Restart your client after editing its config, and check the URL ends in `/mcp`. |
