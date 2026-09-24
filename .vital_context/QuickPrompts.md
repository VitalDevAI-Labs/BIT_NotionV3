# Vital Context Prompts

These prompts reinforce the framework, but repository instructions and `GOVERNANCE.md` remain authoritative.

## Start or Continue Work

```text
Read .vital_context/CONTEXT.md, .vital_context/GOVERNANCE.md, and
.vital_context/state.json. Identify the relevant active task or create one from
.vital_context/tasks/TEMPLATE.md. Read only the task-type references routed by
CONTEXT.md. Implement and verify the work. Before reporting success, reconcile
requirements, architecture, SOT alignment, bugs/backlog, task status, state.json,
and the CONTEXT dashboard. Run npm run context:check.
```

## Plan Without Implementing

```text
Read the Vital Context entry, governance, current state, PRD, playbook,
alignment ledger, and relevant architecture. Compare expected intent with the
observed implementation. Propose a plan with requirement IDs, alignment impact,
acceptance criteria, dependencies, and the context files each task must reconcile.
Do not edit code.
```

## Investigate a Bug

```text
Read the Vital Context entry and governance, then bugs.md and the affected flow in
architecture.md. Create or use a task record. Distinguish symptom, reproduction,
root cause, fix, and verification. Reconcile the bug, requirement, alignment,
current snapshot, and task lifecycle before acceptance.
```

## Make an Architecture Decision

```text
Read the relevant requirement, alignment record, and current architecture. Record
options, constraints, tradeoffs, decision owner, and consequences. Update the
architecture decision log and alignment ledger. Do not silently change product
intent to fit the implementation.
```

## Finish a Task

```text
Do not assume implementation means completion. Open the task record and complete
its acceptance, verification, decisions/tradeoffs, context reconciliation, files
changed, and outcome sections. Reconcile state.json, tasks/index.md, CONTEXT.md,
requirements, architecture, alignment, bugs, and backlog as applicable. Run normal
code checks and npm run context:check. Mark the task accepted only if every gate
passes; otherwise leave it implemented, verified, or blocked.
```

## Resume in a New Session

```text
Read .vital_context/CONTEXT.md, GOVERNANCE.md, state.json, and each active task.
Summarize the current stage, verified progress, pending reconciliation, open
deviations, blockers, and the next acceptance criterion. Continue from recorded
evidence instead of reconstructing history from chat.
```

## Audit Context Health

```text
Audit .vital_context against GOVERNANCE.md. Check competing SOT claims, duplicate
status ownership, task/index/state disagreement, stale architecture, unresolved
alignment entries, missing verification, broken links, and undocumented code drift.
Run npm run context:check. Report findings before making repairs.
```
