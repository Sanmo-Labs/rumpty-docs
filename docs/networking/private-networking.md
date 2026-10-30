---
id: private-networking
title: Private Networking
sidebar_label: Private networking
---

# Private Networking

Every workspace has its own private network. Deployments, databases and VMs in the same workspace reach each other by their internal hostnames, such as `db-6fdcd9.db.rumpty.internal` or `deploy-776dd5.app.rumpty.internal`, without leaving Rumpty Cloud.

Connections between workspaces are allowed only in one case, described below. Everything else is blocked.

## When an app can reach another workspace

An app in workspace **A** can connect to resources in workspace **B** when both of these are true:

1. **A and B have the same owner.**
2. **Everyone who is a member of A is also a member of B.**

The rule is one-way. If B has members that A doesn't, A can reach B but B can't reach A.

| Example | A → B | B → A |
|---|---|---|
| You are the only member of both workspaces | Allowed | Allowed |
| A has you and Sam; B has you, Sam and Kemi | Allowed | Blocked (Kemi isn't in A) |
| A has you and Kemi; B has only you | Blocked (Kemi isn't in B) | Allowed |
| A and B belong to different owners | Blocked | Blocked |

Changes to membership take effect within a few seconds. Accepting an invitation or removing a member updates which workspaces can reach each other. A workspace's first resource is covered within 5 minutes of being created.

## Why the rule works this way

Anyone you invite to a workspace can deploy code into it. If that code could reach your other workspaces, inviting someone to one workspace would quietly give them a way into all of them. Many services trust anything on their network, such as Redis without a password, admin endpoints and metrics pages.

The rule only connects workspaces when that grants nobody new access: everyone who can deploy into A is already a member of B.

## What a blocked connection looks like

Blocked connections are dropped silently, so your app sees a **timeout**, not "connection refused". Typical errors:

- `ETIMEDOUT`, `connect ETIMEDOUT`, `Connection timed out`
- Prisma `P1001: Can't reach database server`
- ioredis `Connection is closed`

If an app keeps crashing because of this, the console and the email we send will name the host it can't reach and link to this page.

Public database hostnames (`*.db.rumptycloud.com`) used from an app on Rumpty Cloud stay inside the platform, so the same rule applies to them.

## How to connect across workspaces

Pick whichever fits:

- **Give both workspaces the same members.** Once everyone in the app's workspace is also in the other workspace, the connection is allowed.
- **Move the resources into one workspace.** This is simplest for an app and the database it depends on.
- **For MySQL and Redis, use the public connection string.** It goes through the public endpoint, so it works from any workspace. This doesn't help for Postgres: from inside Rumpty Cloud, public Postgres hostnames resolve to the private network and follow the same rule as internal ones.

## Related

- [Connecting to a database](/databases/connecting)
- [Workspaces](/settings/workspaces)
- [Sending email (SMTP)](/networking/outbound-email)
