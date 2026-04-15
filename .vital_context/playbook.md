# Stage Playbook

<!-- Quick phase-level view: requirements, goals, acceptance criteria, definition of done, hand-offs -->
<!-- Agents: Use requirement IDs (e.g., V0-REQ-001) when creating tasks. Requirements defined in PRD.md §7. -->

---

## Stage 0: Foundations -- `done`

**Window:** Week 1, Days 1-2

**Goals:**
- Create Notion database with unified schema (11 properties)
- Scaffold React + Vite + TypeScript project
- Install and configure Tailwind CSS + shadcn/ui
- Build Notion API client and type definitions

### Requirements

| ID | Requirement | Priority | Status |
|----|-------------|----------|--------|
| V0-REQ-001 | Create Notion database with unified schema | P0 | done |
| V0-REQ-002 | Scaffold React + Vite + TypeScript project | P0 | done |
| V0-REQ-003 | Install and configure Tailwind CSS v4 | P0 | done |
| V0-REQ-004 | Install and configure shadcn/ui components | P0 | done |
| V0-REQ-005 | Build Notion API client module | P0 | done |
| V0-REQ-006 | Create TypeScript type definitions | P0 | done |
| V0-REQ-007 | Create .env.example with required env vars | P0 | done |
| V0-REQ-008 | Create constants.ts with default options | P1 | done |
| V0-REQ-009 | Configure Vite proxy for Notion API (if needed) | P1 | done |

**Key Tasks:** TBD -- generate when stage becomes active

**Acceptance Criteria:**
- [x] Notion database exists with all 11 properties matching schema in [architecture.md](architecture.md)
- [x] `npm run dev` starts Vite dev server on localhost:5173 without errors
- [x] Tailwind utility classes render correctly (bg-slate-900, text-violet-400, etc.)
- [x] shadcn/ui Button + Badge components render and are interactive
- [x] `src/lib/notion.ts` exports queryResources, createResource, updateResource, deleteResource
- [x] `src/types/resource.ts` exports Resource, CreateResourceInput, ResourceType, FilterType
- [x] `.env.example` exists with VITE_NOTION_API_KEY and VITE_NOTION_DATABASE_ID

### Definition of Done
- [x] All V0-REQ-001 through V0-REQ-009 status set to done
- [x] `npm run lint` → 0 errors, 0 warnings
- [x] `npm run build` → 0 errors (49 modules, TypeScript + Vite clean)
- [x] File structure matches layout in [reference.md](reference.md)
- [x] Vite dev proxy configured for /notion-api → https://api.notion.com

**Risks:** Notion API CORS may require Vite dev proxy (V0-REQ-009 is contingency)

**Hand-off:** Working project shell with API connectivity, ready for Stage 1 UI build

---

## Stage 1: Core Experience -- `done`

**Window:** Week 1, Days 3-7

**Goals:**
- Display all resources in a card grid with type badges and tags
- Enable filtering by type and searching by title/description
- Build add resource form with type-conditional fields
- Implement one-click actions (Open, Copy, Use)

### Requirements

| ID | Requirement | Priority | Status |
|----|-------------|----------|--------|
| V1-REQ-001 | useNotionResources hook | P0 | done |
| V1-REQ-002 | ResourceCard component | P0 | done |
| V1-REQ-003 | ResourceGrid component | P0 | done |
| V1-REQ-004 | Header component | P0 | done |
| V1-REQ-005 | TypeFilter component | P0 | done |
| V1-REQ-006 | SearchInput component | P0 | done |
| V1-REQ-007 | FilterBar component | P0 | done |
| V1-REQ-008 | AddResourceForm component | P0 | done |
| V1-REQ-009 | AddResourceDialog component | P0 | done |
| V1-REQ-010 | useCreateResource hook | P0 | done |
| V1-REQ-011 | "Open" action for Chat Links | P0 | done |
| V1-REQ-012 | "Copy" action for Prompts | P0 | done |
| V1-REQ-013 | "Use" action for Agents | P0 | done |
| V1-REQ-014 | ImprovedMultiSelect component | P0 | done |
| V1-REQ-015 | Wire App.tsx with all components | P0 | done |
| V1-REQ-016 | Dark theme styling | P1 | done |

**Key Tasks:** TBD -- generate when stage becomes active

**Acceptance Criteria:**
- [x] All resources from Notion database display as styled cards
- [x] Type filter tabs show only matching resources (All / Chat Link / Prompt / Agent)
- [x] Search input filters results in real-time by title and description
- [x] Add resource form opens from Header, creates entry in Notion, card appears without reload
- [x] "Open" button opens Chat Link URL in new tab
- [x] "Copy" button copies Prompt text to clipboard with visual feedback
- [x] "Use" button copies Agent context to clipboard with visual feedback
- [x] Category/Tag multi-selects are searchable with create-new option
- [x] App loads in under 2 seconds

### Definition of Done
- [x] All V1-REQ-001 through V1-REQ-016 status set to `done`
- [x] User can view all saved resources from Notion
- [x] User can filter by type (Chat Link, Prompt, Agent)
- [x] User can search resources by title/description
- [x] User can add new resources via form
- [x] User can open chat links in new tab with one click
- [x] User can copy prompts to clipboard with one click
- [x] App works on desktop browser (Chrome, Firefox, Edge)
- [x] No console errors in production build (`npm run build` succeeds)
- [x] Code committed and pushed

**Risks:** None identified

**Hand-off:** Fully functional Phase 1 app ready for Stage 2 enhancements

---

## Stage 2: Enhancement -- `done`

**Window:** Week 2

**Goals:**
- Complete CRUD with edit and delete
- Add advanced filters (category, tags, model, popular)
- Build table view as alternate layout
- Add sorting and toast notifications

### Requirements

| ID | Requirement | Priority | Status |
|----|-------------|----------|--------|
| V2-REQ-001 | EditResourceDialog component | P1 | done |
| V2-REQ-002 | useUpdateResource hook | P1 | done |
| V2-REQ-003 | DeleteConfirmation dialog | P1 | done |
| V2-REQ-004 | useDeleteResource hook | P1 | done |
| V2-REQ-005 | Category filter dropdown | P1 | done |
| V2-REQ-006 | Tag filter dropdown | P1 | done |
| V2-REQ-007 | Model filter dropdown | P1 | done |
| V2-REQ-008 | Popular toggle | P1 | done |
| V2-REQ-009 | ResourceTable component | P2 | pending |
| V2-REQ-010 | ViewToggle component | P2 | pending |
| V2-REQ-011 | Sort controls | P2 | pending |
| V2-REQ-012 | QuickActionsMenu component | P2 | done |
| V2-REQ-013 | Toast notification system | P2 | done |
| V2-REQ-014 | Combined filter logic | P1 | done |
| V2-REQ-015 | Merge Prompt type into Agent (2 types: Agent + Chat Link) | P1 | done |
| V2-REQ-016 | Runtime Config Dialog (Notion key + DB ID via localStorage) | P1 | done |

**Key Tasks:** TBD -- generate when stage becomes active

**Acceptance Criteria:**
- [x] Edit dialog pre-populates all fields, saves changes to Notion
- [x] Delete shows confirmation, archives in Notion, removes from UI
- [x] Category, tag, and model filter dropdowns filter correctly
- [x] Popular toggle shows only bookmarked resources
- [ ] Table view renders all resources with sortable columns
- [ ] Sort controls change resource order
- [x] Quick actions menu works on each card
- [x] Toasts appear for all user actions (copy, save, delete, errors)
- [x] All filters combine correctly (type + category + tags + model + popular + search)
- [x] Type filter shows only All / Chat Links / Agents (Prompt merged into Agent)
- [x] Legacy Notion records with type "Prompt" render as Agent cards
- [x] Agent cards show "Open URL" + copy icon when both URL and promptText present
- [x] Config dialog accessible via gear icon; saves Notion credentials to localStorage
- [x] App auto-opens Config dialog on first load if no credentials found

### Definition of Done
- [x] V2-REQ-001 to 008, 012 to 016 status set to `done`
- [x] User can edit any existing resource without visiting Notion
- [x] User can delete resources with confirmation
- [x] All filter combinations work together without conflict
- [ ] Table view and card view both render correctly (V2-REQ-009/010/011 deferred to next sprint)
- [x] Type merge and Config Dialog implemented (V2-REQ-015, V2-REQ-016)
- [x] Toast notifications provide feedback for every action
- [x] No regressions in Stage 0 or Stage 1 functionality
- [x] Code committed and pushed

**Risks:** None identified

**Hand-off:** Feature-complete app ready for Stage 3 polish

---

## Stage 3: UI/UX Polish -- `done`

**Window:** 2026-04-15

**Goals:**
- Simplify FilterBar UI (remove Model dropdown, replace Tag multi-select with text search)
- Fetch categories dynamically from Notion data instead of hardcoded list
- Move search input to Header (right side) for better space utilization
- Implement Ctrl+K keyboard shortcut to focus search from anywhere
- Remove visual clutter (type badges from cards)

### Requirements

| ID | Requirement | Priority | Status |
|----|-------------|----------|--------|
| (S3-001) | Dynamic categories from Notion data | P0 | done |
| (S3-002) | Remove Model filter from FilterBar | P0 | done |
| (S3-003) | Replace Tag multi-select with text search | P0 | done |
| (S3-004) | Move SearchInput to Header right side | P0 | done |
| (S3-005) | Remove type badges from ResourceCard | P0 | done |
| (S3-006) | Implement Ctrl+K focus shortcut | P0 | done |

**Key Tasks:** task-20260415-001, task-20260415-002, task-20260415-003, task-20260415-004

**Acceptance Criteria:**
- [x] Categories dropdown shows values from actual Notion data (auto-updates as users add new values)
- [x] Model `<select>` completely removed from FilterBar
- [x] Tag filtering uses simple text input with substring matching
- [x] SearchInput moved from FilterBar Row 1 to Header right section
- [x] Type badges removed from ResourceCard (left border accent still visible)
- [x] Pressing Ctrl+K from anywhere on page focuses search input
- [x] All existing filters (type, category, popular) continue to work correctly
- [x] No regressions in Stage 0, 1, and 2 functionality

### Definition of Done
- [x] All S3 requirements status set to `done`
- [x] FilterBar simplified to 2 rows: TypeFilter | Categories + TagSearch + Popular
- [x] ResourceCard simplified: top row shows model + menu only (no type badge)
- [x] Header search accessible from anywhere via Ctrl+K
- [x] Build succeeds with 0 errors
- [x] Code committed and pushed (commits: 18cd09b, fe62757)

**Risks:** None identified

**Hand-off:** UI-polished app with simplified filters and improved keyboard accessibility. Ready for Stage 4 (Hardening & Launch).

---

## Stage 4: Hardening & Launch -- `pending`

**Window:** After Stage 3

**Goals:**
- Make app installable as PWA
- Add offline capability with LocalStorage cache
- Implement dark/light theme toggle
- Deploy to Vercel and validate with real data

### Requirements

| ID | Requirement | Priority | Status |
|----|-------------|----------|--------|
| V4-REQ-001 | PWA manifest.json | P2 | planned |
| V4-REQ-002 | Service worker for offline caching | P2 | planned |
| V4-REQ-003 | Offline mode with LocalStorage cache | P2 | planned |
| V4-REQ-004 | ThemeToggle component | P2 | planned |
| V4-REQ-005 | Light theme CSS variables | P2 | planned |
| V4-REQ-006 | Deploy to Vercel free tier | P0 | planned |
| V4-REQ-007 | Validate with real data (10+ resources) | P0 | planned |
| V4-REQ-008 | Fix critical/high bugs | P0 | planned |
| V4-REQ-009 | Performance audit (<2s load) | P1 | planned |
| V4-REQ-010 | Write README.md | P2 | planned |

**Key Tasks:** TBD -- generate when stage becomes active

**Acceptance Criteria:**
- [ ] PWA manifest valid, app installable on Chrome desktop
- [ ] Service worker caches app shell
- [ ] Offline mode serves cached resources (not blank screen)
- [ ] Theme toggle switches dark/light, preference survives refresh
- [ ] App accessible via Vercel URL
- [ ] All real data loads and displays correctly
- [ ] No critical or high bugs open in [bugs.md](bugs.md)
- [ ] Initial page load under 2 seconds

### Definition of Done
- [ ] All P2 requirements (V4-REQ-001 through V4-REQ-005) status set to `done`
- [ ] App installable as PWA on Chrome desktop
- [ ] Offline mode serves cached data gracefully
- [ ] Theme toggle works and preference persists
- [ ] App live and accessible via Vercel URL
- [ ] Tested with VitalDev's real data (minimum 10 resources)
- [ ] No critical or high bugs open
- [ ] No regressions in Stage 0, 1, 2, and 3 functionality
- [ ] Code committed and pushed

**Risks:** Service worker caching bugs; cache invalidation complexity

**Hand-off:** Live production app

---

## Requirement ID Reference

| Range | Stage | Count |
|-------|-------|-------|
| V0-REQ-001 to V0-REQ-009 | Stage 0: Foundations | 9 |
| V1-REQ-001 to V1-REQ-016 | Stage 1: Core Experience | 16 |
| V2-REQ-001 to V2-REQ-016 | Stage 2: Enhancement | 16 |
| S3-001 to S3-006 | Stage 3: UI/UX Polish | 6 |
| V4-REQ-001 to V4-REQ-010 | Stage 4: Hardening & Launch | 10 |
| **Total** | | **57** |
