# Vital Context Framework

Vital Context is the company framework for preserving product and engineering understanding across developers, AI providers, research, and implementation sessions.

It is not merely a documentation folder. It is the repository-side memory and reconciliation system between:

```text
External SOT and research
        <-> requirements and architecture
        <-> tasks, implementation, and verification
        <-> decisions, deviations, and development history
```

## Entry Flow

1. Root discovery files (`AGENTS.md`, `claude.md`, or another tool adapter) point here.
2. Every participant reads `CONTEXT.md` first.
3. `GOVERNANCE.md` defines authority, lifecycle, and completion gates.
4. `state.json` identifies the current stage and active tasks.
5. The routing table in `CONTEXT.md` identifies task-specific reading.
6. Work ends only after verification and context reconciliation.

## Structure

```text
.vital_context/
├── CONTEXT.md          # Human-readable entry and current dashboard
├── GOVERNANCE.md       # Authority map, lifecycle, and completion contract
├── state.json          # Machine-readable current lifecycle state
├── CURRENT_PROJECT.md  # Audited observed implementation snapshot
├── alignment.md        # External SOT vs requirements/code deviations
├── PRD.md              # Product intent and requirements
├── playbook.md         # Stage scope and acceptance criteria
├── architecture.md     # Technical model, flows, and decisions
├── bugs.md             # Defects and resolutions
├── backlog.md          # Approved future work
├── reference.md        # Commands, environment, and file lookup
├── QuickPrompts.md     # Safe workflow prompts
├── agents/             # Claude, Codex, and generic adapters
├── rules/              # Code and design constraints
├── scripts/            # Framework validation/automation
└── tasks/              # Task records, index, and canonical template
```

## Core Principles

- **One owner per fact:** summaries link to canonical owners instead of duplicating truth.
- **Provider-neutral memory:** Claude, Codex, humans, and other agents use the same records.
- **Intent is preserved:** implementation drift is recorded in `alignment.md`, not hidden by rewriting history.
- **Evidence before acceptance:** implemented work is not accepted work until verified and reconciled.
- **History remains useful:** task and decision records explain how and why the product changed.
- **Automation supports discipline:** `npm run context:check` catches lifecycle inconsistencies.

## Framework Version

The installed framework version is recorded in `state.json`. Provider adapter files contain procedures only and must never become competing project brains.
