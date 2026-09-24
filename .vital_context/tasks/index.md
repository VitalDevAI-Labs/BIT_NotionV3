# Task Index

All completed and active task logs, newest first.

| ID | Title | Req IDs | Status | Date |
|----|-------|---------|--------|------|
| task-20260920-001 | Vital Context governance and enforcement | S35-REQ-001 | accepted | 2026-09-20 |
| task-20260415-007 | Categories as single-select (Notion schema fix) | — | done | 2026-04-15 |
| task-20260415-006 | Single source of truth for Notion schema (notion-schema.ts) | — | done | 2026-04-15 |
| task-20260415-005 | Dynamic tags from Notion | — | done | 2026-04-15 |
| task-20260415-004 | Ctrl+K search shortcut | — | done | 2026-04-15 |
| task-20260415-003 | Move search to Header, remove type badges | — | done | 2026-04-15 |
| task-20260415-002 | Remove Model dropdown, Tags as text search | — | done | 2026-04-15 |
| task-20260415-001 | Dynamic categories from Notion | — | done | 2026-04-15 |
| task-20260408-010 | Type merge (Prompt→Agent) + Config Dialog | — | done | 2026-04-08 |
| task-20260406-009 | Stage 2: advanced filters + quick menu | V2-REQ-005, V2-REQ-006, V2-REQ-007, V2-REQ-008, V2-REQ-012, V2-REQ-014 | done | 2026-04-06 |
| task-20260406-008 | Stage 2: toast system + CRUD hooks + dialogs | V2-REQ-001, V2-REQ-002, V2-REQ-003, V2-REQ-004, V2-REQ-013 | done | 2026-04-06 |
| task-20260406-007 | Fix transformPage crash — defensive Notion property lookup | — | done | 2026-04-06 |
| task-20260406-006 | Type actions + ImprovedMultiSelect + App wire-up | V1-REQ-011, V1-REQ-012, V1-REQ-013, V1-REQ-014, V1-REQ-015, V1-REQ-016 | done | 2026-04-06 |
| task-20260406-005 | AddResourceDialog + AddResourceForm + useCreateResource | V1-REQ-008, V1-REQ-009, V1-REQ-010 | done | 2026-04-06 |
| task-20260406-004 | Header + FilterBar + TypeFilter + SearchInput | V1-REQ-004, V1-REQ-005, V1-REQ-006, V1-REQ-007 | done | 2026-04-06 |
| task-20260406-003 | useNotionResources + ResourceCard + ResourceGrid | V1-REQ-001, V1-REQ-002, V1-REQ-003 | done | 2026-04-06 |
| task-20260406-002 | shadcn/ui install, dark theme, Vite proxy, Stage 0 wrap-up | V0-REQ-004, V0-REQ-009 | done | 2026-04-06 |
| task-20260406-001 | Scaffold Vite + TS + types + constants + Notion API client | V0-REQ-002, V0-REQ-003, V0-REQ-005, V0-REQ-006, V0-REQ-007, V0-REQ-008 | done | 2026-04-06 |

---

## Task Log Template

Use [TEMPLATE.md](TEMPLATE.md), the canonical task contract defined by [GOVERNANCE.md](../GOVERNANCE.md). New tasks use the lifecycle `proposed -> ready -> active -> implemented -> verified -> accepted`; historical `done` records remain unchanged.

Tiny work under five minutes may skip a task only under the exception defined in GOVERNANCE—not merely because it is brief.

---

## Task Naming Convention

`task-YYYYMMDD-NNN-brief-name.md`

- `YYYYMMDD`: Date task was created
- `NNN`: Sequential number for that day (001, 002, etc.)
- `brief-name`: 2-4 word kebab-case summary

Examples:
- `task-20260406-001-scaffold-vite-project.md`
- `task-20260406-002-notion-api-client.md`
- `task-20260407-001-resource-card-grid.md`
