# Project Context

<!-- Agents: Read this file FIRST and ONLY this per task. Read other docs only when directed. -->

## Project

- **Name:** `AI Bridge Unified`
- **Description:** `Personal web app to save, search, and navigate AI prompts, chat links, and agent contexts across all AI platforms (ChatGPT, Claude, Gemini, Perplexity)`
- **Stack:** `React 18 + TypeScript + Vite | Tailwind CSS + shadcn/ui | Notion API (database) | Vercel (hosting)`

## Current Stage

- **Stage:** `Stage 1 - Core Experience`
- **Objective:** `Card grid view, type filters, search, add resource form, copy/open actions`
- **Status:** `Not started`
- **Exit Criteria:** `All resources display from Notion, filters and search work, add form creates entries, actions (Open/Copy/Use) functional`

## Phases

| # | Phase | Goal | Status |
|---|-------|------|--------|
| 0 | Foundations | Project scaffolding, Notion DB creation, API client, Tailwind + shadcn/ui setup | done |
| 1 | Core Experience | Card grid view, type filters, search, add resource form, copy/open actions | pending |
| 2 | Enhancement | Edit/delete CRUD, advanced filters (category, tags, model, popular), table view, sorting, toasts | pending |
| 3 | Polish & Hardening | PWA manifest, offline cache, dark/light theme toggle, export/import | pending |
| 4 | Launch | Vercel deployment, real-data validation, bug fixes, performance tuning | pending |

## Active Tasks

| ID | Task | Status | Owner |
|----|------|--------|-------|
| task-20260406-001 | Scaffold Vite + TS + types + constants + Notion API client | done | Claude Code |
| task-20260406-002 | shadcn/ui install, dark theme, Vite proxy, Stage 0 complete | done | Claude Code |
| TBD | useNotionResources hook + ResourceCard + ResourceGrid (V1-REQ-001, V1-REQ-002, V1-REQ-003) | planned | Claude Code |
| TBD | Header + FilterBar + TypeFilter + SearchInput (V1-REQ-004, V1-REQ-005, V1-REQ-006, V1-REQ-007) | planned | Claude Code |
| TBD | AddResourceDialog + Form + useCreateResource (V1-REQ-008, V1-REQ-009, V1-REQ-010) | planned | Claude Code |
| TBD | Type actions + ImprovedMultiSelect + App wire-up (V1-REQ-011 to V1-REQ-016) | planned | Claude Code |

## Key Decisions

| # | Decision | Choice | Why |
|---|----------|--------|-----|
| 1 | Platform | Web app (React SPA) | Desktop browser is primary use case |
| 2 | Database | Notion API (free tier) | Free, already in user's workflow, rich REST API |
| 3 | Backend | None -- direct browser-to-Notion API | No server complexity, Notion supports CORS |
| 4 | Hosting | Vercel (free tier) | Zero cost, one-click deploy from git |
| 5 | Data model | Single unified table with Type field | Flexible filtering vs separate tables per resource type |
| 6 | Component library | shadcn/ui | Lightweight, Tailwind-native, copy-paste customizable |
| 7 | State management | React hooks (useState, useEffect) | App is simple enough -- no Redux/Zustand needed |
| 8 | Build tool | Vite | Fast HMR, minimal config, TypeScript out of the box |

Full decision log with alternatives in [architecture.md](architecture.md).

## Key Rules

- **File placement:** Follow `rules/structure.md` when creating new files or directories
- **Naming:** PascalCase for React components (`ResourceCard.tsx`), camelCase for hooks/utils (`useNotionResources.ts`), kebab-case for shadcn/ui primitives (`improved-multi-select.tsx`)
- **UI work:** Follow `rules/design.md` for colors, components, spacing, and accessibility
- **Bugs:** Check `bugs.md` before investigating any issue -- it may already be documented
- **Dark mode first:** Design for dark theme; light mode is Stage 3

## Reference Docs

Read these **only when needed**, not every task:

| Doc | When to read |
|-----|-------------|
| [playbook.md](playbook.md) | Phase-level progress, requirements, acceptance criteria, hand-offs |
| [PRD.md](PRD.md) | Product vision, features, requirements registry (§7) |
| [rules/structure.md](rules/structure.md) | Creating new files, directories, or modules |
| [rules/design.md](rules/design.md) | Any UI/UX work -- colors, components, layout |
| [backlog.md](backlog.md) | Checking what's planned for future stages |
| [bugs.md](bugs.md) | Investigating or logging a bug |
| [architecture.md](architecture.md) | Stack, schemas, data flows, API endpoints, decisions |
| [reference.md](reference.md) | Commands, env vars, file structure, quick lookups |
| [tasks/index.md](tasks/index.md) | Finding history of past work or avoiding duplicate effort |
