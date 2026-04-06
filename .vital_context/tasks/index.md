# Task Index

All completed and active task logs, newest first.

| ID | Title | Req IDs | Status | Date |
|----|-------|---------|--------|------|
| task-20260406-001 | Scaffold React + Vite + TypeScript project | V0-REQ-002, V0-REQ-003, V0-REQ-005, V0-REQ-006, V0-REQ-007, V0-REQ-008 | done | 2026-04-06 |

---

## Task Log Template

When creating a new task file (`task-YYYYMMDD-NNN-brief-name.md`), use this structure:

```markdown
# task-YYYYMMDD-NNN: Brief Title
- **Date:** YYYY-MM-DD
- **Status:** planned | active | done | blocked
- **Stage:** [which stage this belongs to]
- **Requirements:** [V0-REQ-001, V0-REQ-002, etc.]

## Goal
[1-2 sentences: what does success look like?]

## Plan
1. [step]
2. [step]

## Log
- [what actually happened, key decisions, commands run]

## Files Changed
- `path/to/file` — created/modified — why

## Outcome
[done/partial/blocked — summary + next steps if any]
```

Keep it under 30 lines. If a task takes <5 minutes, skip the log.

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
