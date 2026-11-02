---
id: postgres-extensions
title: Postgres extensions
sidebar_label: Postgres extensions
---

# Postgres Extensions

Extensions add features to Postgres, such as vector search or scheduled jobs. Your database user can enable any extension on this page with `CREATE EXTENSION`; no support request is needed.

## Available extensions

| Extension | What it's for | Enable with |
|-----------|---------------|-------------|
| `vector` (pgvector 0.8) | Storing embeddings and finding similar ones: semantic search, RAG, recommendations | `CREATE EXTENSION vector;` |
| `pg_cron` | Running SQL on a schedule inside the database | `CREATE EXTENSION pg_cron;` |
| `pg_stat_statements` | Finding your slowest and most frequent queries | `CREATE EXTENSION pg_stat_statements;` |

All extensions that ship with Postgres are also available, including `pgcrypto`, `uuid-ossp`, `pg_trgm`, `citext`, `hstore`, `unaccent`, `btree_gin`, `btree_gist`, `ltree`, `fuzzystrmatch`, `tablefunc`, and `postgres_fdw`. To see the full list from your database:

```sql
SELECT name, default_version FROM pg_available_extensions ORDER BY name;
```

Extensions that aren't listed, such as PostGIS or TimescaleDB, are not available. If you need one, contact support and tell us what you're building.

:::note Databases created before November 2, 2026
`vector`, `pg_cron`, and `pg_stat_statements` reach older databases after a short restart. We'll do it in an announced maintenance window, or the next time you resize the database, whichever comes first. If `CREATE EXTENSION vector` says the extension is not available and you need it sooner, contact support.
:::

## pgvector

pgvector stores embeddings, the lists of numbers an embedding model produces for a piece of text or an image, and finds the ones closest to a query. Generate embeddings with your embedding provider, then store and search them in Postgres:

```sql
CREATE EXTENSION IF NOT EXISTS vector;

CREATE TABLE documents (
  id bigserial PRIMARY KEY,
  content text NOT NULL,
  embedding vector(1536)  -- match your embedding model's dimensions
);

-- Speeds up similarity search on large tables.
CREATE INDEX ON documents USING hnsw (embedding vector_cosine_ops);

-- The 5 documents closest in meaning to a query embedding.
SELECT id, content
FROM documents
ORDER BY embedding <=> $1
LIMIT 5;
```

`<=>` is cosine distance, the usual choice for text embeddings. Use the index operator class that matches it (`vector_cosine_ops` for `<=>`); otherwise the index isn't used.

An HNSW index on the `vector` type supports up to 2,000 dimensions. For larger embeddings, such as 3,072-dimension models, store them as `halfvec(3072)` and index with `halfvec_cosine_ops`.

Building an index on millions of rows takes memory and time. On smaller plans, create the index after loading your data rather than before.

## pg_cron

pg_cron runs SQL on a schedule, in standard cron format, inside your database. Schedules use UTC.

```sql
CREATE EXTENSION IF NOT EXISTS pg_cron;

-- Every night at 03:00 UTC, delete sessions that expired more than a day ago.
SELECT cron.schedule('purge-sessions', '0 3 * * *',
  $$DELETE FROM sessions WHERE expires_at < now() - interval '1 day'$$);

-- See your jobs and their recent runs.
SELECT jobid, jobname, schedule, command FROM cron.job;
SELECT jobid, status, start_time, return_message FROM cron.job_run_details ORDER BY start_time DESC LIMIT 20;

-- Stop a job.
SELECT cron.unschedule('purge-sessions');
```

Jobs run in the database shown on your **Connection** tab, and only while the database is running.

## pg_stat_statements

pg_stat_statements records how often each query runs and how long it takes, so you can find what to optimize:

```sql
CREATE EXTENSION IF NOT EXISTS pg_stat_statements;

-- The 10 queries using the most total time.
SELECT calls, round(total_exec_time) AS total_ms, round(mean_exec_time::numeric, 1) AS mean_ms, query
FROM pg_stat_statements
ORDER BY total_exec_time DESC
LIMIT 10;
```

Statistics are kept across restarts. To start a fresh measurement, for example after adding an index, run `SELECT pg_stat_statements_reset();`.
