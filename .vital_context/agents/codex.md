# Codex Adapter

Codex uses Vital Context as the persistent project memory across sessions.

- Enter through root `AGENTS.md`, then read `../CONTEXT.md` and `../GOVERNANCE.md`.
- Respect existing worktree changes and update only in-scope context records.
- Use the active task to record acceptance criteria, verification evidence, tradeoffs, and changed files.
- Compare implementation with PRD, architecture, and alignment records before accepting a task.
- Run normal code checks plus `npm run context:check`.
- Keep this adapter procedural. Do not create a second source of product truth.
