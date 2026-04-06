## Universal Prompt

Use this to start **any** task with an AI agent:

```
Read .vital_context/CONTEXT.md.
Task: [describe the work].

1. Create .vital_context/tasks/task-YYYYMMDD-NNN-[name].md with goal + plan.
2. Check referenced docs ONLY if CONTEXT.md points you there for this type of work.
3. Implement. Log key steps and decisions in the task file.
4. Update the Active Tasks table in CONTEXT.md and tasks/index.md when done.
```

### Variants

**Bug fix:**
```
Read .vital_context/CONTEXT.md. Check .vital_context/bugs.md.
Bug: [describe the bug].
Fix it, log in .vital_context/tasks/, update bugs.md with resolution.
```

**Resume previous work:**
```
Read .vital_context/CONTEXT.md. Read .vital_context/tasks/task-YYYYMMDD-NNN-[name].md.
Continue from where it left off. Update the task log when done.
```

**Phase status / what was delivered:**
```
Read .vital_context/playbook.md.
Show me the current status of all stages — what's done, what's active, what's next.
```

**Architecture / schema questions:**
```
Read .vital_context/architecture.md.
[Ask your question about stack, schemas, data flows, or API endpoints.]
```

**Agentic auto-dev (minimal intervention):**
```
Read .vital_context/CONTEXT.md. Pick the next active task from the Active Tasks table.
Execute it end-to-end following the universal prompt workflow.
When done, pick the next task. Continue until all active tasks are complete.
```


## Task Simulation 

## Phase 0: New Project Setup

**You do once:**

1. Copy `.vital_context/` into your new project root
2. Fill in the templates

**Your prompt to agent:**

```
Read .vital_context/CONTEXT.md.
This is a new project. I'm building [Smart Task Manager] with 
[React 18 + Node.js + Firebase + Vercel].

Fill in these files with my project details:
1. .vital_context/CONTEXT.md — name, stack, stages, first active tasks
2. .vital_context/PRD.md — product overview, personas, epics with features
3. .vital_context/architecture.md — stack table, data models, API endpoints, architecture diagram
4. .vital_context/reference.md — file structure, dev commands, env vars
5. .vital_context/rules/structure.md — folder layout, naming conventions

Here's what I'm building: [paste your product description, features list, tech choices]
```

**Agent responds:** Fills all 5 files with your project-specific content. Now every future session starts with full context.

---

## Phase 1: Starting a Feature Task

**Your prompt:**

```
Read .vital_context/CONTEXT.md. 
Task: Build the task CRUD API endpoints (Phase 2, Task 2.3).

Follow the workflow — create a task log, check architecture.md for schemas, 
implement, and update docs when done.
```

**What the agent does:**

1. Reads `CONTEXT.md` — knows the project, current phase, active tasks
2. Reads `architecture.md` — gets the data model schemas, API endpoint patterns
3. Reads `rules/structure.md` — knows where to put files (`backend/routes/`, `backend/services/`)
4. Creates `tasks/task-20260319-001-crud-api.md` with goal + plan
5. Implements the code
6. Updates the task log with what was done, files changed, decisions
7. Updates `CONTEXT.md` active tasks table (marks task done)
8. Updates `tasks/index.md` with new entry

---

## Phase 2: Architecture / Design Decision

**Your prompt:**

```
Read .vital_context/CONTEXT.md. Read .vital_context/architecture.md.
I need to decide: should we use WebSockets or Server-Sent Events for real-time alerts?
Research both, recommend one, and update architecture.md with the decision.
```

**Agent responds:** Analyzes tradeoffs, picks one, then updates:

- `architecture.md` → adds row to Key Decisions table + updates Architecture Diagram if needed
- `CONTEXT.md` → adds to Key Decisions summary
- Optionally creates a task log if the research was significant

---

## Phase 3: Bug Investigation

**Your prompt:**

```
Read .vital_context/CONTEXT.md. Check .vital_context/bugs.md.
Bug: Calendar sync creates duplicate events when task is updated twice within 1 minute.
Fix it, log in tasks/, update bugs.md with resolution.
```

**Agent does:**

1. Reads `bugs.md` — checks if it's already known
2. Reads `architecture.md` — understands the Calendar sync data flow
3. Creates `tasks/task-20260319-002-fix-duplicate-sync.md`
4. Investigates, finds root cause, implements fix
5. Updates `bugs.md` — adds entry with root cause + resolution
6. Updates task log with outcome

---

## Phase 4: Planning Next Phase

**Your prompt:**

```
Read .vital_context/CONTEXT.md. Read .vital_context/PRD.md. Read .vital_context/backlog.md.
Phase 2 (Backend) is complete. Plan Phase 3 (Frontend Dashboard).
Break it into tasks, update CONTEXT.md with the new phase status and active tasks,
and promote items from backlog.md if applicable.
```

**Agent updates:**

- `CONTEXT.md` → Phase 2 marked `done`, Phase 3 marked `active`, new Active Tasks table
- `backlog.md` → promoted items removed or marked
- `PRD.md` → if any feature scope changed during Phase 2, updates the epic

---

## Phase 5: Resuming After a Break

**Your prompt:**

```
Read .vital_context/CONTEXT.md. Read .vital_context/tasks/index.md.
What's the current status? What should I work on next?
```

**Agent responds:** Reads the phase table, active tasks, recent task logs — gives you a status summary and recommends the next task. No re-explanation needed.

---

## Phase 6: New Developer / New Agent Session

**Your prompt (or paste into any AI tool):**

```
Read .vital_context/CONTEXT.md.
Task: [whatever you need].
```

That's it. The agent has everything. If it needs deeper info, CONTEXT.md's reference table tells it exactly which file to read.

---

## Quick Cheat Sheet: Which File Gets Updated When

|Situation|Files to update|
|---|---|
|**Starting a task**|Create `tasks/task-*.md`, update `CONTEXT.md` active tasks|
|**Finishing a task**|Update task log, `tasks/index.md`, `CONTEXT.md` active tasks|
|**Tech decision made**|`architecture.md` decisions table, `CONTEXT.md` decisions|
|**Schema changed**|`architecture.md` data models|
|**New API endpoint**|`architecture.md` endpoints, `reference.md` quick lookup|
|**Bug found/fixed**|`bugs.md`, create task log if significant|
|**New feature scoped**|`PRD.md` epic, `backlog.md` or `CONTEXT.md` active tasks|
|**Phase completed**|`CONTEXT.md` phases table + active tasks|
|**File structure changed**|`rules/structure.md`, `reference.md` file structure|
|**New env var added**|`reference.md` env vars table|
|**UI component pattern**|`rules/design.md`|

---

## The One Rule

**Every prompt starts with:**

```
Read .vital_context/CONTEXT.md.
```

Everything else follows from there. The agent knows what to read, what to update, and where things go.