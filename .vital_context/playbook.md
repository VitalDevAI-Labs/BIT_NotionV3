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

### Definition of Done
- [x] V2-REQ-001 to 008, 012 to 014 status set to `done`
- [x] User can edit any existing resource without visiting Notion
- [x] User can delete resources with confirmation
- [x] All filter combinations work together without conflict
- [ ] Table view and card view both render correctly (table view deferred to next sprint)
- [x] Toast notifications provide feedback for every action
- [x] No regressions in Stage 0 or Stage 1 functionality
- [x] Code committed and pushed

**Risks:** None identified

**Hand-off:** Feature-complete app ready for Stage 3 polish

---

## Stage 3: Polish & Hardening -- `pending`

**Window:** Week 3+

**Goals:**
- Make app installable as PWA
- Add offline capability with LocalStorage cache
- Implement dark/light theme toggle
- Build data export/import features

### Requirements

| ID | Requirement | Priority | Status |
|----|-------------|----------|--------|
| V3-REQ-001 | PWA manifest.json | P2 | planned |
| V3-REQ-002 | Service worker for offline caching | P2 | planned |
| V3-REQ-003 | Offline mode with LocalStorage cache | P2 | planned |
| V3-REQ-004 | ThemeToggle component | P2 | planned |
| V3-REQ-005 | Light theme CSS variables | P2 | planned |
| V3-REQ-006 | Export to JSON | P3 | planned |
| V3-REQ-007 | Export to CSV | P3 | planned |
| V3-REQ-008 | Import from JSON | P3 | planned |
| V3-REQ-009 | Keyboard shortcuts | P3 | planned |
| V3-REQ-010 | Mobile responsive optimization | P3 | planned |

**Key Tasks:** TBD -- generate when stage becomes active

**Acceptance Criteria:**
- [ ] PWA manifest valid, app installable on Chrome desktop
- [ ] Service worker caches app shell
- [ ] Offline mode serves cached resources (not blank screen)
- [ ] Theme toggle switches dark/light, preference survives refresh
- [ ] Export produces valid JSON and CSV files
- [ ] Import creates resources from JSON file
- [ ] Keyboard shortcuts work (Ctrl+K, Ctrl+N, Esc)
- [ ] Touch targets meet 44px minimum on mobile

### Definition of Done
- [ ] All P2 requirements (V3-REQ-001 through V3-REQ-005) status set to `done`
- [ ] App installable as PWA on Chrome desktop
- [ ] Offline mode serves cached data gracefully
- [ ] Theme toggle works and preference persists
- [ ] No regressions in Stage 0, 1, and 2 functionality
- [ ] Code committed and pushed

**Risks:** Service worker caching bugs; cache invalidation complexity

**Hand-off:** Production-ready app for Stage 4 deployment

---

## Stage 4: Launch -- `pending`

**Window:** After Stage 3

**Goals:**
- Deploy to Vercel
- Validate with real user data
- Fix bugs and tune performance

### Requirements

| ID | Requirement | Priority | Status |
|----|-------------|----------|--------|
| V4-REQ-001 | Deploy to Vercel free tier | P0 | planned |
| V4-REQ-002 | Validate with real data (10+ resources) | P0 | planned |
| V4-REQ-003 | Fix critical/high bugs | P0 | planned |
| V4-REQ-004 | Performance audit (<2s load) | P1 | planned |
| V4-REQ-005 | Write README.md | P2 | planned |

**Key Tasks:** TBD -- generate when stage becomes active

**Acceptance Criteria:**
- [ ] App accessible via Vercel URL
- [ ] All real data loads and displays correctly
- [ ] No critical or high bugs open in [bugs.md](bugs.md)
- [ ] Initial page load under 2 seconds
- [ ] README.md has setup instructions

### Definition of Done
- [ ] All V4-REQ-001 through V4-REQ-005 status set to `done`
- [ ] App live and accessible via Vercel URL
- [ ] Tested with VitalDev's real data (minimum 10 resources)
- [ ] No critical or high bugs open
- [ ] Page load under 2 seconds on standard connection
- [ ] All previous stage DoDs still passing (no regressions)

**Risks:** None identified

**Hand-off:** Live product

---

## Requirement ID Reference

| Range | Stage | Count |
|-------|-------|-------|
| V0-REQ-001 to V0-REQ-009 | Stage 0: Foundations | 9 |
| V1-REQ-001 to V1-REQ-016 | Stage 1: Core Experience | 16 |
| V2-REQ-001 to V2-REQ-014 | Stage 2: Enhancement | 14 |
| V3-REQ-001 to V3-REQ-010 | Stage 3: Polish & Hardening | 10 |
| V4-REQ-001 to V4-REQ-005 | Stage 4: Launch | 5 |
| **Total** | | **54** |
