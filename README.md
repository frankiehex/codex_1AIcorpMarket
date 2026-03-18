# ProjectOS

ProjectOS is an AI Project Company OS MVP that accepts a project input and produces analysis, tasks, content, CRM prioritization, alerts, and a daily executive summary.

## Current implementation note

The requested architecture called for Next.js, Express, PostgreSQL, Redis, and external providers. This environment cannot download npm packages because outbound registry access returns HTTP 403, so the delivered MVP uses a dependency-free Node.js fallback while preserving the requested monorepo shape and service boundaries for future upgrades.

## Included modules

- Web dashboard: `projectos/apps/web/server.mjs`
- API server: `projectos/apps/api/server.mjs`
- Agents + orchestrator: `projectos/agents/*`, `projectos/orchestrator/*`
- Services: analyzer, task, content, CRM, notification
- PostgreSQL schema draft: `projectos/db/schema.sql`
- Daily summary job: `projectos/jobs/dailySummary.job.mjs`
- Provider adapters: `projectos/lib/llm.mjs`, `projectos/lib/scraper.mjs`, `projectos/lib/storage.mjs`

## Quick start

```bash
cp .env.example .env
npm run dev
```

- Web: `http://localhost:3000`
- API: `http://localhost:4000`

## Commands

```bash
npm run build
npm run lint
npm test
```

## MVP workflow

1. Submit a project through the dashboard.
2. API runs the orchestrator.
3. Agents generate analysis, tasks, content, CRM inbox triage, alerts, and a daily summary.
4. Result is stored in local JSON for single-project demo persistence.

## Upgrade path

- Replace local JSON storage with PostgreSQL repositories.
- Swap notification stubs for Telegram/email adapters.
- Replace scraper/LLM mocks with real providers.
- Reintroduce Next.js and BullMQ once package installation is available.
