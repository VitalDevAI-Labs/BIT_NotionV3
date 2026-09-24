# Bug Tracking

> Log bugs that required meaningful investigation or had user-visible impact. Check this file before investigating any issue -- it may already be documented.

---

## Status Board

| ID | Title | Severity | Status | Owner |
|----|-------|----------|--------|-------|
| BUG-001 | Created resource can appear twice after refetch | high | open | unassigned |
| BUG-002 | Add/Edit forms can retain stale values | high | open | unassigned |
| BUG-003 | Update/delete UI state is inconsistent during refetch | medium | open | unassigned |
| BUG-004 | Category UI allows multiple values but persistence saves one | high | open | unassigned |
| BUG-005 | Resource-type validation is incomplete | medium | open | unassigned |
| BUG-006 | Notion query does not paginate beyond the first result page | high | open | unassigned |

These issues were identified by source audit on 2026-09-20. Reproduction and resolution evidence must be added by their implementation tasks.

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
