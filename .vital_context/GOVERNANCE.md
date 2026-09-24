# Vital Context Governance

> Operating contract for humans and AI agents. This file defines where truth lives, how work moves, and what must be reconciled before completion.

## Purpose

Vital Context preserves shared understanding across developers, AI providers, research sessions, and implementation cycles. It connects external product intent to repository requirements, architecture, actual code, tradeoffs, verification, and history.

```text
External SOT / research
        -> repository requirements and decisions
        -> implementation
        -> verification
        -> alignment and context reconciliation
```

## Authority Map

Each information type has exactly one canonical owner. Other files may summarize it but must link to the owner and must not create an independent status.

| Information | Canonical owner | Other files may do |
|---|---|---|
| Framework rules and lifecycle | `GOVERNANCE.md` | Link only |
| Current machine-readable lifecycle state | `state.json` | Render/summarize |
| Project entry and routing | `CONTEXT.md` | Show a concise dashboard |
| Product intent and requirements | `PRD.md` | Reference requirement IDs |
| Stage scope and acceptance | `playbook.md` | Reference requirement IDs |
| Architecture, data flows, ADRs | `architecture.md` | Summarize accepted decisions |
| External-SOT alignment and deviations | `alignment.md` | Reference alignment IDs |
| Current implementation snapshot | `CURRENT_PROJECT.md` | Describe observed code state |
| Task status and evidence | Individual `tasks/task-*.md` | `tasks/index.md` indexes it |
| Bugs and incident resolution | `bugs.md` | Tasks reference bug IDs |
| Future approved work | `backlog.md` | Promote into state/tasks |
| Commands, environment, file lookup | `reference.md` | No lifecycle status |
| Code/design constraints | `rules/*.md` | Tasks reference relevant rules |
| Provider behavior | `agents/*.md` | Adapt workflow, never redefine truth |

## Required Reading

1. Always read `CONTEXT.md`.
2. Read `state.json` and the active task file for implementation work.
3. Follow the task-type routing table in `CONTEXT.md`.
4. Read the applicable provider adapter in `agents/` when available.

## Task Lifecycle

Allowed states:

```text
proposed -> ready -> active -> implemented -> verified -> accepted
                         \-> blocked
                         \-> cancelled
```

- **proposed**: captured but not sufficiently scoped.
- **ready**: requirement, scope, and acceptance criteria are clear.
- **active**: implementation or investigation is underway.
- **implemented**: code/content exists but verification or reconciliation remains.
- **verified**: acceptance checks passed; context reconciliation remains.
- **accepted**: verification and context reconciliation are complete.
- **blocked**: progress requires a recorded external decision or dependency.
- **cancelled**: intentionally stopped with a reason.

Historical task files using `done` remain valid historical records. New tasks use `accepted` as the terminal success state.

## Start Gate

Before meaningful implementation:

- Select or create a task file from `tasks/TEMPLATE.md`.
- Record requirement IDs or explicitly state why none exists.
- Record SOT/alignment IDs when the task changes expected product behavior.
- Define testable acceptance criteria.
- Set the task to `active` in its file, `tasks/index.md`, and `state.json`.

Tiny read-only questions and changes under five minutes may omit a task only when they do not alter product behavior, architecture, requirements, or framework state.

## Completion Gate

A task may become `accepted` only when all are true:

1. Acceptance criteria are checked.
2. Verification commands and results are recorded.
3. Files changed are recorded.
4. Requirement status is reconciled or marked N/A with a reason.
5. Architecture impact is reconciled or marked N/A with a reason.
6. SOT alignment/tradeoff is reconciled or marked N/A with a reason.
7. Bugs and backlog impact are reconciled or marked N/A with a reason.
8. `CURRENT_PROJECT.md` impact is reviewed.
9. Task file, task index, `state.json`, and `CONTEXT.md` agree.
10. `npm run context:check` passes.

“Code implemented” is not equivalent to “task accepted.”

## Change-Impact Matrix

| Change | Required review/update |
|---|---|
| UI behavior or component pattern | Task, PRD, playbook, `rules/design.md`, alignment |
| Requirement or scope | PRD, playbook, alignment, state/task |
| Data model or schema | Architecture, reference, alignment, current project |
| API or persistence behavior | Architecture, reference, security notes, task |
| Architecture decision | Architecture decision log, alignment, CONTEXT summary |
| Bug found or fixed | Bugs, task, affected requirement |
| New dependency | Architecture and reference |
| New environment variable | Reference and security review |
| File/folder convention | `rules/structure.md` and reference |
| Stage transition | State, playbook handoff, CONTEXT dashboard |
| SOT differs from implementation | Alignment ledger; never silently overwrite intent |

If a listed document is not changed, the task must record `N/A` and why.

## SOT Reconciliation Rules

- Preserve the external SOT reference even when implementation diverges.
- Record expected behavior, observed implementation, reason, owner, and disposition in `alignment.md`.
- Use one of: `aligned`, `deviated-pending`, `deviated-accepted`, `implementation-ahead`, `obsolete`, `needs-owner-decision`.
- A developer or agent may identify a deviation; only an authorized product owner may accept a material product-intent change.
- Architecture constraints may explain a deviation but do not automatically rewrite the requirement.

## Agent Handoff Contract

Every final implementation handoff must state:

- Outcome and verification result.
- Task ID and final lifecycle state.
- Product/architecture tradeoffs made.
- Context files updated.
- Remaining blockers or deviations.

Provider adapters may add tool-specific guidance but cannot weaken this contract.
