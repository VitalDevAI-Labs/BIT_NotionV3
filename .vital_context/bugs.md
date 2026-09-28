# Bug Tracking

> Log bugs that required meaningful investigation or had user-visible impact. Check this file before investigating any issue -- it may already be documented.

---

## Status Board

| ID | Title | Severity | Status | Owner |
|----|-------|----------|--------|-------|
| BUG-001 | Create/update fails when application property names or types differ from Notion | critical | in-progress | Codex |

### BUG-001: Notion schema drift prevents create/update

- **Reported:** 2026-09-28
- **Requirement:** V2-REQ-017
- **Expected:** Add and Edit serialize fields using the database's exact property names and Notion types.
- **Actual:** The branch sent incorrect property names (`URL`, `Prompt Text`) and temporarily documented Categories as `select`; the live database expects `Url`, `PromptText`, and Categories as `multi_select`.
- **Root cause:** Property names and Notion types were duplicated across API code, TypeScript declarations, UI controls, and documentation.
- **Implementation:** Centralized names and types in `src/lib/notion-schema.ts`; aligned API reads/writes, Categories multi-select behavior, resource types, and Settings guidance on 2026-09-28.
- **Resolution target:** Verify real create and update operations, then add database-schema validation to the connection test before closing.
- **Task log:** `tasks/task-20260928-002-notion-schema-implementation.md`

---

## Bug Entry Template

```yaml
- id: BUG-001
  title: "Describe the symptom, not the fix"
  severity: critical | high | medium | low
  status: open | in-progress | fixed | won't-fix
  reported: YYYY-MM-DD
  environment: "Browser / OS / version"
  requirement: "V1-REQ-XXX (if related)"
  steps_to_reproduce:
    - "Step 1"
    - "Step 2"
  expected: "What should happen"
  actual: "What actually happens"
  root_cause: "Once known"
  resolution: "The fix + code references"
  task_log: "tasks/task-YYYYMMDD-NNN-*.md (if applicable)"
```

---

## Known Limitations (Not Bugs)

| Pattern | Description | Mitigation |
|---------|-------------|------------|
| Notion API rate limit | 3 req/sec -- rapid actions may fail | Add debounce to search; queue rapid writes |
| No real-time sync | Changes in Notion don't auto-update UI | User must refresh; add manual refresh button |
| Rich text loss | Notion rich_text formatting (bold, links) stripped to plain text | Accept for V1; improve transformer in V2 if needed |
| Clipboard API | Requires HTTPS or localhost -- won't work on plain HTTP | Deploy to Vercel (HTTPS) or use localhost for dev |

---

## Incident Response
1. Assign severity
2. Create `tasks/task-*.md` for the investigation
3. Reference the requirement ID if related (e.g., V1-REQ-012)
4. Update this doc with root cause + resolution once fixed
