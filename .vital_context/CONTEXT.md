# Project Context

<!-- Humans and agents: read this file first, then follow GOVERNANCE.md and the routing table. -->

> **Framework entry:** [GOVERNANCE.md](GOVERNANCE.md) defines authority and lifecycle. [state.json](state.json) owns current machine-readable status. Provider adapters live in [agents/](agents/README.md).

## Project

- **Name:** `AI Bridge Unified`
- **Description:** `Personal web app to save, search, and navigate AI prompts, chat links, and agent contexts across all AI platforms (ChatGPT, Claude, Gemini, Perplexity)`
- **Stack:** `React 19 + TypeScript 6 + Vite 8 | Tailwind CSS 4 + shadcn/ui | Notion API (temporary database) | Vercel`

## Current Handoff Snapshot

- **Read next:** [CURRENT_PROJECT.md](CURRENT_PROJECT.md) for the audited code state, confirmed risks, and work sequence
- **Git branch:** `UI_Changes-V1.01`
- **Branch/release label:** `V1.01`
- **Package version:** `0.0.0`
- **Current product state:** Private Notion-backed prototype; not ready for public users
- **Current priority:** Fix UX and core functionality first, then replace Notion with a real database and authentication
- **Snapshot:** `2026-09-20` at commit `0b59b62`

## Current Stage

- **Stage:** `Stage 3.5 - UX and Functional Stabilization`
- **Objective:** `Correct CRUD state, synchronize forms, improve validation/search/filter feedback, add pagination, and establish a reliable UX foundation`
- **Status:** `Active`
- **Exit Criteria:** `Critical risks in CURRENT_PROJECT.md resolved, build/lint/tests pass, and core desktop/mobile flows are verified`

## Phases

| # | Phase | Goal | Status |
|---|-------|------|--------|
| 0 | Foundations | Project scaffolding, Notion DB creation, API client, Tailwind + shadcn/ui setup | done |
| 1 | Core Experience | Card grid view, type filters, search, add resource form, copy/open actions | done |
| 2 | Enhancement | Edit/delete CRUD, advanced filters, quick actions, toasts | done |
| 3 | UI/UX Polish | Simplified filters, dynamic categories, search in header, Ctrl+K, remove visual clutter | done |
| 3.5 | UX & Functional Stabilization | Fix audited UX and CRUD reliability gaps before backend migration | planned |
| 4 | Hardening & Launch | PWA manifest, offline cache, dark/light theme toggle, Vercel deploy, perf tuning | pending |

## Active Tasks

| ID | Task | Status | Owner |
|----|------|--------|-------|
| -- | No active implementation task; select the next Stage 3.5 requirement | -- | -- |

Completed work belongs in [tasks/index.md](tasks/index.md), not in this active-task dashboard.

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
--- 
## Orchestration Rules

> These rules tell you exactly what to read and what to update for every type of work.
> Follow them on every task — don't read more than needed, don't skip updates.

### Starting a Task

**Read before you start:**
- This file (done) — you know the stage, active tasks, and decisions
- `GOVERNANCE.md` and `state.json` — authority, lifecycle, and current state
- `tasks/index.md` — check if similar work was done before to avoid duplication
- Then follow the rules below based on task type

**Create before you implement:**
- A task from `tasks/TEMPLATE.md` with expected behavior, acceptance criteria, requirements, and alignment references

---

### By Task Type — What to Read

| Task Type | Read These Files |
|-----------|-----------------|
| **Feature / UI work** | `rules/structure.md`, `rules/design.md`, `architecture.md` (data models + endpoints) |
| **API / backend work** | `architecture.md` (full), `rules/structure.md` |
| **Bug fix** | `bugs.md` first, then `architecture.md` for the affected flow |
| **Architecture decision** | `architecture.md` (Key Decisions — check if already decided) |
| **Planning next stage** | `PRD.md`, `playbook.md`, `backlog.md` |
| **Resume previous work** | `tasks/task-[ID].md` for the specific task log |
| **Checking requirements** | `PRD.md` §7 (Requirements Registry) |
| **New component / module** | `rules/structure.md`, `rules/design.md` |
| **Deploy / environment** | `reference.md` (commands, env vars) |

---

### By Task Type — What to Update When Done

| Task Type | Update These Files |
|-----------|--------------------|
| **Any task** | `tasks/task-[ID].md` (log outcome), `tasks/index.md` (status), this file (Active Tasks) |
| **Feature complete** | `PRD.md` §7 (mark requirements done), `playbook.md` (check off DoD items) |
| **Bug fixed** | `bugs.md` (add resolution), task log |
| **Architecture decision** | `architecture.md` (Key Decisions table), this file (Key Decisions summary) |
| **Schema / data model changed** | `architecture.md` (Data Models), `reference.md` (Key Collections table) |
| **New API endpoint** | `architecture.md` (API Endpoints), `reference.md` (Quick Lookup) |
| **New file / folder created** | `rules/structure.md` (if pattern changes), `reference.md` (File Structure) |
| **New env var** | `reference.md` (Environment Variables table) |
| **Stage complete** | `playbook.md` (mark AC + DoD done, fill Hand-off), this file (Phases table + Current Stage) |
| **New requirement discovered** | `PRD.md` §7 (Requirements Inbox), then assign ID + stage |
| **Backlog item promoted** | `backlog.md` (remove), `CONTEXT.md` Active Tasks (add), `playbook.md` (add to stage) |

---

### Completing a Stage — Checklist

Before marking a stage done, verify:
- [ ] All requirements for this stage are `done` in `PRD.md` §7
- [ ] All Acceptance Criteria checked in `playbook.md`
- [ ] All Definition of Done items checked in `playbook.md`
- [ ] Hand-off note written in `playbook.md` (what the next stage inherits)
- [ ] This file's Phases table updated to `done`
- [ ] Current Stage section updated to the next stage
- [ ] Active Tasks table refreshed with next stage tasks


## Reference Docs

Read these **only when needed**, not every task:

| Doc | When to read |
|-----|-------------|
| [GOVERNANCE.md](GOVERNANCE.md) | Mandatory authority map, task lifecycle, completion gate, and context-impact rules |
| [state.json](state.json) | Canonical current stage, version, active tasks, and reconciliation state |
| [alignment.md](alignment.md) | Comparing external SOT/requirements with observed implementation and tradeoffs |
| [agents/](agents/README.md) | Provider-specific workflow adapters; never project truth |
| [CURRENT_PROJECT.md](CURRENT_PROJECT.md) | Current branch/version, implemented behavior, known risks, and handoff roadmap |
| [playbook.md](playbook.md) | Phase-level progress, requirements, acceptance criteria, hand-offs |
| [PRD.md](PRD.md) | Product vision, features, requirements registry (§7) |
| [rules/structure.md](rules/structure.md) | Creating new files, directories, or modules |
| [rules/design.md](rules/design.md) | Any UI/UX work -- colors, components, layout |
| [backlog.md](backlog.md) | Checking what's planned for future stages |
| [bugs.md](bugs.md) | Investigating or logging a bug |
| [architecture.md](architecture.md) | Stack, schemas, data flows, API endpoints, decisions |
| [reference.md](reference.md) | Commands, env vars, file structure, quick lookups |
| [tasks/index.md](tasks/index.md) | Finding history of past work or avoiding duplicate effort |
