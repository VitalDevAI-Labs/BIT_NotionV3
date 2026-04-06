# Product Backlog

> Approved-but-not-scheduled work. When an item is ready, add it to the Active Tasks table in [CONTEXT.md](CONTEXT.md) and start a task log.

---

## Backlog

| ID | Title | Priority | Status | Req ID | Notes |
|----|-------|----------|--------|--------|-------|
| PB-001 | Multi-user support with authentication | L | idea | -- | Requires backend + auth service; out of scope for personal tool |
| PB-002 | Real-time collaboration | L | idea | -- | Requires websockets + backend; not needed for single user |
| PB-003 | Browser extension for quick-save | M | groomed | V3-REQ-008 | Save current chat URL with one click from any AI platform |
| PB-004 | AI-powered prompt suggestions | L | idea | -- | Suggest similar prompts based on current context |
| PB-005 | Prompt versioning | M | idea | -- | Track changes to prompts over time |
| PB-006 | Analytics dashboard | L | idea | -- | Usage stats: most copied prompts, most opened chats |
| PB-007 | Team sharing | L | idea | -- | Share resource collections with other users |
| PB-008 | Link prompts to chat links (relationships) | M | groomed | V3-REQ-006 | Associate a prompt with the chats it was used in |
| PB-009 | Usage tracking (copy/open counts) | M | groomed | V3-REQ-007 | Count how many times each resource is accessed |
| PB-010 | Keyboard shortcuts | M | groomed | V3-REQ-009 | Ctrl+K search, Ctrl+N new, Esc close |
| PB-011 | Mobile responsive optimization | M | groomed | V3-REQ-010 | Touch targets, responsive grid, mobile-friendly forms |

---

## Entry Template

```yaml
- id: PB-NNN
  title: "Outcome-based title"
  priority: high | med | low
  status: idea | groomed | ready
  req_id: "V3-REQ-XXX or --"
  summary: >
    1-2 sentences on user value.
  acceptance_hints:
    - "Testable condition"
  dependencies: []
  notes: >
    Links to research/decisions.
```

---

## Status Model
- **idea** -- captured, not vetted
- **groomed** -- scoped, acceptance hints drafted, has requirement ID in PRD.md §7
- **ready** -- meets Definition of Ready, can move to CONTEXT.md active tasks

## Definition of Ready
- Acceptance hints are testable
- Blocking dependencies known
- Design link present if UI work involved
- Requirement ID assigned in PRD.md §7

## Promotion
When `status = ready`: add to Active Tasks in `CONTEXT.md`, create `tasks/task-*.md` when work starts.

---

## Parking Lot (unvetted ideas)

```
- id: IDEA-001
  title: "Chrome extension that auto-detects AI chat URLs and suggests saving"
  next_step: "Research Chrome extension API + Notion API integration"

- id: IDEA-002
  title: "Notion template gallery -- share curated prompt collections"
  next_step: "Explore Notion template marketplace"

- id: IDEA-003
  title: "Drag-and-drop card reordering for manual prioritization"
  next_step: "Research react-beautiful-dnd or similar"
```
