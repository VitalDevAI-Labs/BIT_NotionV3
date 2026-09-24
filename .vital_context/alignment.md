# SOT Alignment Ledger

> Traceability between external product intent, repository requirements, architectural choices, and observed implementation. Never erase a deviation by silently rewriting the expected state.

## Status Model

- `aligned` - implementation and approved intent agree.
- `deviated-pending` - difference exists and needs resolution.
- `deviated-accepted` - product owner accepted the difference.
- `implementation-ahead` - code introduced behavior not yet represented in the SOT.
- `obsolete` - the source expectation was explicitly retired.
- `needs-owner-decision` - materially different paths require product-owner direction.

## Ledger

| ID | SOT / requirement reference | Expected | Observed implementation | Status | Reason or tradeoff | Decision owner | Evidence / task |
|---|---|---|---|---|---|---|---|
| ALIGN-001 | Original resource taxonomy | Chat Link, Prompt, and Agent are separate types | Prompt records are transformed to Agent; UI exposes Chat Link and Agent | deviated-pending | UX was simplified during development; product acceptance is not recorded | VitalDev | `task-20260408-010`; `src/lib/notion.ts` |
| ALIGN-002 | Original category model | Categories allow multiple values | Notion uses one select; app persists only the first selected value | deviated-pending | Current Notion schema supports one category, while the form still presents multi-select behavior | VitalDev | `task-20260415-007`; `src/lib/notion.ts` |
| ALIGN-003 | Architecture security assumption | Personal browser-to-Notion connection is adequate | Browser stores the secret and production sends it through an unrestricted proxy | deviated-pending | Acceptable only for private prototyping; unsuitable for multi-user release | VitalDev | `CURRENT_PROJECT.md`; `api/notion-proxy.js` |
| ALIGN-004 | Current delivery strategy | Improve UX/functionality before database and auth migration | Stage 3.5 is focused on functional stabilization | aligned | Explicit owner direction on 2026-09-20 | VitalDev | `CURRENT_PROJECT.md`; `CONTEXT.md` |

## Entry Template

| ID | SOT / requirement reference | Expected | Observed implementation | Status | Reason or tradeoff | Decision owner | Evidence / task |
|---|---|---|---|---|---|---|---|
| ALIGN-NNN | External note or REQ-ID | Intended behavior | Actual behavior | deviated-pending | Why they differ | Owner | Task and code references |
