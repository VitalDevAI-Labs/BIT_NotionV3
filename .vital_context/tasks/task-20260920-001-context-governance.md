# task-20260920-001: Vital Context Governance

- **Date:** 2026-09-20
- **Status:** accepted
- **Stage:** Stage 3.5 - UX and Functional Stabilization
- **Requirements:** S35-REQ-001
- **Alignment:** ALIGN-004
- **Owner:** Codex + VitalDev

## Goal

Make `.vital_context` a durable, provider-neutral memory and reconciliation framework for developers and AI agents across sessions.

## Plan

1. Define document authority, lifecycle, and context-impact rules.
2. Add structured state, SOT alignment, agent adapters, and stronger templates.
3. Add a context validator and repository discovery pointers.
4. Reconcile current status contradictions and verify the framework.

## Acceptance Criteria

- [x] Every fact/status type has one canonical owner.
- [x] Claude, Codex, and generic agents enter the same workflow.
- [x] Tasks cannot be considered done without verification and context reconciliation.
- [x] SOT-to-implementation deviations have a dedicated ledger.
- [x] Automated context validation runs from npm.

## Verification

| Check | Result | Evidence |
|---|---|---|
| Context validator | passed | `npm run context:check` - 18 task records checked |
| Patch integrity | passed | `git diff --check` returned no errors |
| Discovery paths | passed | Root `AGENTS.md` and `claude.md` route into provider-neutral Vital Context |

## Decisions and Tradeoffs

- Provider-specific instructions live in `.vital_context/agents/`; root files remain thin discovery adapters because tools need reliable repository entry points.
- `state.json` owns current lifecycle state; Markdown dashboards summarize it.
- Historical `done` tasks remain valid, while new successful tasks terminate at `accepted`.

## Context Reconciliation

- [x] Requirement/playbook state reconciled through S35-REQ-001.
- [x] Architecture impact N/A: framework authority is defined in `GOVERNANCE.md`, not product architecture.
- [x] SOT alignment reconciled through ALIGN-004 and the new ledger.
- [x] Bugs/backlog reviewed; audited product bugs were added, and no framework backlog item is needed.
- [x] `CURRENT_PROJECT.md` impact reviewed; its product audit remains valid.
- [x] State, task index, and CONTEXT dashboard agree.
- [x] Governance and provider adapters are linked from the entry point.
- [x] Framework structure/reference documentation is updated.
- [x] `npm run context:check` passes.

## Log

- Started after auditing the existing framework and finding competing SOT claims, duplicated status, and no enforceable completion gate.
- Added authority ownership, task lifecycle, acceptance gate, change-impact routing, provider adapters, structured state, alignment tracking, and automated validation.
- Replaced the stale root Claude project brain with a compatibility pointer into shared memory.

## Files Changed

- `AGENTS.md`, `claude.md` - provider discovery pointers.
- `.vital_context/GOVERNANCE.md`, `state.json`, `alignment.md` - framework core.
- `.vital_context/agents/`, `tasks/TEMPLATE.md`, `scripts/check-context.mjs` - adapters, task contract, and validation.
- `.vital_context/CONTEXT.md`, `README.md`, `QuickPrompts.md`, `reference.md`, `rules/structure.md` - routing and framework documentation.
- `.vital_context/playbook.md`, `bugs.md`, `tasks/index.md` - reconciled operational records.
- `package.json` - added `context:check` command.

## Outcome

Accepted. Vital Context v1.0.0 now provides shared, provider-neutral memory with an enforceable verification and reconciliation workflow. Product documentation still contains historical drift that Stage 3.5 tasks must reconcile incrementally.
