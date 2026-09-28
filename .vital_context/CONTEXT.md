# Project Context

<!-- Agents: Read this file FIRST and ONLY this per task. Read other docs only when directed. -->

## Project

- **Name:** `AI Bridge Unified`
- **Description:** `Personal web app to save, search, and navigate AI prompts, chat links, and agent contexts across all AI platforms (ChatGPT, Claude, Gemini, Perplexity)`
- **Stack:** `React 18 + TypeScript + Vite | Tailwind CSS + shadcn/ui | Notion API (database) | Vercel (hosting)`

## Current Stage

- **Stage:** `Stage 2.5 - Notion Schema Stabilization`
- **Objective:** `Restore reliable create/update behavior by aligning the application with one canonical Notion schema`
- **Status:** `Active`
- **Exit Criteria:** `Schema constants, reads, writes, forms, validation, and setup guidance match the canonical schema; create and update are verified against the real Notion database`

## Phases

| # | Phase | Goal | Status |
|---|-------|------|--------|
| 0 | Foundations | Project scaffolding, Notion DB creation, API client, Tailwind + shadcn/ui setup | done |
| 1 | Core Experience | Card grid view, type filters, search, add resource form, copy/open actions | done |
| 2 | Enhancement | Edit/delete CRUD, advanced filters, quick actions, toasts | done |
| 2.5 | Notion Schema Stabilization | Canonicalize Notion property names/types and restore verified create/update flows | active |
| 3 | Polish & Hardening | PWA manifest, offline cache, dark/light theme toggle, export/import | pending |
| 4 | Launch | Vercel deployment, real-data validation, bug fixes, performance tuning | pending |

## Active Tasks

| ID | Task | Status | Owner |
|----|------|--------|-------|
| task-20260406-001 | Scaffold Vite + TS + types + constants + Notion API client | done | Claude Code |
| task-20260406-002 | shadcn/ui install, dark theme, Vite proxy, Stage 0 complete | done | Claude Code |
| task-20260406-003 | useNotionResources hook + ResourceCard + ResourceGrid (V1-REQ-001, V1-REQ-002, V1-REQ-003) | done | Claude Code |
| task-20260406-004 | Header + FilterBar + TypeFilter + SearchInput (V1-REQ-004, V1-REQ-005, V1-REQ-006, V1-REQ-007) | done | Claude Code |
| task-20260406-005 | AddResourceDialog + Form + useCreateResource (V1-REQ-008, V1-REQ-009, V1-REQ-010) | done | Claude Code |
| task-20260406-006 | Type actions + ImprovedMultiSelect + App wire-up (V1-REQ-011 to V1-REQ-016) | done | Claude Code |
| task-20260406-008 | Stage 2: toast system, CRUD hooks, dialogs | done | Claude Code |
| task-20260406-009 | Stage 2: filters (category, tags, model, popular), quick menu | done | Claude Code |
| task-20260408-010 | Stage 2 fix: Prompt→Agent type merge + runtime Config Dialog | done | Claude Code |
| task-20260406-007 | Fix transformPage crash: defensive property lookup with fallback keys | done | Claude Code |
| task-20260928-001 | Finalize canonical Notion schema in project context | done | Codex |
| task-20260928-002 | Align application CRUD with canonical Notion schema | active | Codex |
| task-20260928-003 | Mobile directory actions and guarded back navigation | done | Codex |

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
| 9 | Canonical Notion schema | `Title`, `Type`, `Description`, `Categories`, `Tags`, `Url`, `PromptText`, `Model`, `IsPopular` | Matches the previously verified database; exact names and property types prevent create/update failures |

### Canonical Notion Schema

Property names are case-sensitive. `Categories` and `Tags` are both Notion `multi_select` properties. The only values created for `Type` are `Agent` and `Chat Link`; legacy `Prompt` records may be read as `Agent` but must not be created. Property names and Notion types are centralized in `src/lib/notion-schema.ts`.

See [architecture.md](architecture.md#notion-database-ai-resources) for the authoritative mapping and conditional validation rules.

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
- `tasks/index.md` — check if similar work was done before to avoid duplication
- Then follow the rules below based on task type

**Create before you implement:**
- `tasks/task-YYYYMMDD-NNN-[name].md` — goal, plan, requirements being addressed

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
| [playbook.md](playbook.md) | Phase-level progress, requirements, acceptance criteria, hand-offs |
| [PRD.md](PRD.md) | Product vision, features, requirements registry (§7) |
| [rules/structure.md](rules/structure.md) | Creating new files, directories, or modules |
| [rules/design.md](rules/design.md) | Any UI/UX work -- colors, components, layout |
| [backlog.md](backlog.md) | Checking what's planned for future stages |
| [bugs.md](bugs.md) | Investigating or logging a bug |
| [architecture.md](architecture.md) | Stack, schemas, data flows, API endpoints, decisions |
| [reference.md](reference.md) | Commands, env vars, file structure, quick lookups |
| [tasks/index.md](tasks/index.md) | Finding history of past work or avoiding duplicate effort |
