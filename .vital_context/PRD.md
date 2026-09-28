# Product Requirements Document

---

## Document Meta

| Field | Value |
|-------|-------|
| **Product Name** | AI Bridge Unified |
| **Version** | 1.0 |
| **Owner** | VitalDev |
| **Status** | Approved |
| **Last Updated** | 2026-04-06 |

---

## 1. Product Overview

- **What:** A personal web application to save, search, and navigate AI prompts, chat links, and agent contexts in one unified interface
- **Why:** Good prompts get lost in notes and chat history; valuable AI conversations scatter across platforms; specialized agent contexts disappear; no AI tool offers unified cross-platform search
- **Who:** VitalDev (solo developer, personal use -- power AI user across ChatGPT, Claude, Gemini, Perplexity)

---

## 2. Personas

### Persona 1 -- Power AI User (VitalDev)
- **Profile:** Solo developer who uses 4+ AI platforms daily for coding, research, writing, and creative work
- **Goals:** Instantly find and reuse saved prompts; navigate to important past conversations; maintain agent personalities across sessions
- **Frictions:** Prompts buried in scattered notes/docs; chats fragmented across platforms; no single search across tools; agent contexts lost when chats expire
- **Success:** Can find any saved prompt, chat link, or agent context in under 5 seconds via search or filter

---

## 3. Problem Statements

| # | Problem | Who | Urgency |
|---|---------|-----|---------|
| 1 | Prompt entropy -- good prompts get lost in notes, docs, and chat history with no reliable retrieval | Power AI User | Critical |
| 2 | Chat fragmentation -- valuable AI conversations scattered across 4+ platforms with no unified index | Power AI User | Critical |
| 3 | Context loss -- specialized agent personalities and system prompts disappear when chats expire or are lost | Power AI User | Important |
| 4 | No unified search -- each AI tool has weak or non-existent search for past conversations and prompts | Power AI User | Critical |

---

## 4. Goals & Success Metrics

| Metric | Baseline | Target | Notes |
|--------|----------|--------|-------|
| Time to find a resource | Minutes (searching notes, bookmarks, chat history) | <5 seconds | Via search + type/category filter |
| Prompt reuse rate | Low (can't find them) | High (one-click copy) | Copy to clipboard action |
| App load time | N/A | <2 seconds | Vite + minimal bundle size |
| Resources saved | 0 | 50+ within first month | Real prompts, chats, agents |

---

## 5. Scope

### In Scope (V1 -- Stages 0-1)
- Save and view prompts, chat links, and agent contexts
- Filter by type, search by title/description
- One-click copy prompts, one-click open chat links
- Add new resources via form with type-conditional fields
- Category and tag organization with multi-select

### Out of Scope
- Multi-user / collaboration -- tracked in [backlog.md](backlog.md) (PB-001)
- Real-time sync / websockets -- REST sufficient for single user
- AI-powered prompt suggestions -- future enhancement (PB-004)
- Native mobile app -- PWA covers mobile access (V3-REQ-002)
- Browser extension -- deferred (PB-003)

### Assumptions & Constraints
- Single user only (no auth required)
- Notion API free tier sufficient (3 requests/second)
- Desktop browser is primary platform (Chrome, Firefox, Edge)
- User already has a Notion workspace
- Notion API supports CORS from browser (no backend proxy needed in production)

---

## 6. Epics & Features

### Epic 1: Project Foundation -- `MVP`
- **Persona:** Power AI User
- **Problem:** Need a working app shell before any features
- **Outcome:** Running React app connected to Notion database
- **Features:**
  1. Vite + React + TypeScript project scaffold
     - Success: `npm run dev` starts without errors
     - Dependencies: Node.js, npm
  2. Tailwind CSS + shadcn/ui setup
     - Success: Tailwind utility classes render, shadcn Button component works
     - Dependencies: PostCSS, Tailwind config
  3. Notion database with unified schema
     - Success: Database has all 11 properties, accessible via API
     - Dependencies: Notion workspace, integration token
  4. Notion API client module
     - Success: Can query database and return typed resource data
     - Dependencies: Notion integration token, database ID

### Epic 2: Resource Display & Navigation -- `MVP`
- **Persona:** Power AI User
- **Problem:** #1, #2, #3 -- resources exist but can't be found or accessed
- **Outcome:** All saved AI resources visible in a searchable, filterable card grid
- **Features:**
  1. Card grid view displaying all resources
     - Success: All Notion DB entries render as cards with title, type badge, description, tags
     - Dependencies: Notion API client, Resource type definitions
  2. Type filter tabs (All / Chat Links / Prompts / Agents)
     - Success: Clicking a type shows only matching resources
     - Dependencies: Client-side filtering on type field
  3. Text search by title and description
     - Success: Typing filters results in real-time (<100ms)
     - Dependencies: Client-side string matching
  4. Category and tag multi-select filter dropdowns
     - Success: Multi-select filters resources by category/tag combinations
     - Dependencies: ImprovedMultiSelect component
- **Overall Success Criteria:** User can find any resource in <5 seconds
- **Risks:** None

### Epic 3: Resource Creation -- `MVP`
- **Persona:** Power AI User
- **Problem:** #1, #2, #3 -- no way to save new resources
- **Outcome:** User can save prompts, chat links, and agent contexts via a form
- **Features:**
  1. Add resource dialog with type selection
     - Success: Dialog opens, type selector changes visible fields
     - Dependencies: shadcn Dialog, Select components
  2. Type-conditional form fields (URL for Chat Links, Prompt Text for Prompts/Agents)
     - Success: Only relevant fields show per type
     - Dependencies: React conditional rendering
  3. Category and tag multi-select inputs
     - Success: Can select existing or create new categories/tags
     - Dependencies: ImprovedMultiSelect component
  4. Form submission to Notion API
     - Success: Resource appears in grid without page reload
     - Dependencies: Notion create page endpoint
- **Overall Success Criteria:** User can save a new resource in under 30 seconds
- **Risks:** None

### Epic 4: Resource Actions -- `MVP`
- **Persona:** Power AI User
- **Problem:** #4 -- resources saved but no quick actions
- **Outcome:** One-click interactions per resource type
- **Features:**
  1. "Open" button for Chat Links (opens URL in new tab)
     - Success: `window.open(url, '_blank')` fires correctly
     - Dependencies: Valid URL in resource
  2. "Copy" button for Prompts (copies text to clipboard)
     - Success: `navigator.clipboard.writeText()` works, user sees feedback
     - Dependencies: Clipboard API, HTTPS or localhost
  3. "Use" button for Agents (copies agent context to clipboard)
     - Success: Agent context/system prompt copied with feedback
     - Dependencies: Same as Copy
- **Overall Success Criteria:** Any resource action completes in one click
- **Risks:** Clipboard API requires secure context (HTTPS or localhost)

### Epic 5: Full CRUD -- `V2`
- **Persona:** Power AI User
- **Outcome:** Complete resource lifecycle management without visiting Notion
- **Features:**
  1. Edit resource via dialog
     - Success: All fields editable, changes persist to Notion
     - Dependencies: Notion PATCH endpoint
  2. Delete resource with confirmation
     - Success: Archived in Notion, removed from UI
     - Dependencies: Notion archive endpoint
  3. Quick actions menu (three-dot) on cards
     - Success: Edit, Delete, Copy, Open accessible from menu
     - Dependencies: shadcn DropdownMenu
- **Overall Success Criteria:** User never needs to open Notion to manage resources
- **Risks:** None

### Epic 6: Advanced Filters & Views -- `V2`
- **Persona:** Power AI User
- **Outcome:** Power-user navigation with multiple filter dimensions and views
- **Features:**
  1. Filter by category, tags, model, popular
  2. Table view as alternate to card grid
  3. Sort by created, last edited, title (A-Z / Z-A)
  4. Toast notifications for all user actions
- **Overall Success Criteria:** User can slice and view data any way they want
- **Risks:** None

### Epic 7: PWA & Offline -- `Future`
- **Persona:** Power AI User
- **Outcome:** Installable app that works without internet
- **Features:**
  1. PWA manifest + service worker
  2. LocalStorage cache for offline access
  3. Dark/Light theme toggle
  4. Export/Import (JSON, CSV)
  5. Keyboard shortcuts
  6. Mobile responsive optimization
- **Overall Success Criteria:** App installable on desktop, usable offline
- **Risks:** Service worker complexity

---

## 7. Requirements Registry

<!-- Master list of all requirements. Use these IDs in playbook.md and task files. -->
<!-- Status: planned | active | done -->

### Stage 0: Foundations

| ID | Requirement | Priority | Status | Notes |
|----|-------------|----------|--------|-------|
| V0-REQ-001 | Create Notion database with canonical schema: Title (title), Type (select: Chat Link/Agent), Description (text), Categories (multi-select), Tags (multi-select), Url (url), PromptText (text), Model (select), IsPopular (checkbox) | P0 | done | Exact names are case-sensitive; timestamps use built-in page metadata |
| V0-REQ-002 | Scaffold React 18 + TypeScript + Vite project with working dev server | P0 | planned | `npm create vite@latest` |
| V0-REQ-003 | Install and configure Tailwind CSS v3 + PostCSS + autoprefixer | P0 | planned | |
| V0-REQ-004 | Install and configure shadcn/ui with at least Button, Input, Card, Badge, Dialog, Select, Checkbox components | P0 | planned | |
| V0-REQ-005 | Build Notion API client module (`src/lib/notion.ts`) with query, create, update, delete functions | P0 | planned | Uses fetch, Bearer token auth |
| V0-REQ-006 | Create TypeScript type definitions for Resource interface and Notion API response types | P0 | planned | `src/types/resource.ts`, `src/types/notion.ts` |
| V0-REQ-007 | Create `.env.example` with VITE_NOTION_API_KEY and VITE_NOTION_DATABASE_ID | P0 | planned | |
| V0-REQ-008 | Create `src/lib/constants.ts` with default categories, tags, model options, type options | P1 | planned | |
| V0-REQ-009 | Configure Vite proxy for Notion API in development (if CORS blocked) | P1 | planned | May not be needed |

### Stage 1: Core Experience

| ID | Requirement | Priority | Status | Notes |
|----|-------------|----------|--------|-------|
| V1-REQ-001 | Create `useNotionResources` hook -- fetch all resources from Notion, transform to Resource[], expose loading/error states | P0 | planned | |
| V1-REQ-002 | Build ResourceCard component -- displays title, type badge (color-coded), description (truncated), tags as badges, action button | P0 | planned | |
| V1-REQ-003 | Build ResourceGrid component -- responsive card grid layout using CSS Grid or Tailwind grid | P0 | planned | |
| V1-REQ-004 | Build Header component -- app logo/title, Add Resource button | P0 | planned | |
| V1-REQ-005 | Build TypeFilter component -- tab buttons for All / Chat Links / Prompts / Agents with active state | P0 | planned | |
| V1-REQ-006 | Build SearchInput component -- text input that filters resources by title and description in real-time | P0 | planned | |
| V1-REQ-007 | Build FilterBar component -- composes TypeFilter + SearchInput | P0 | planned | |
| V1-REQ-008 | Build AddResourceForm component -- type selector, conditional fields (URL for Chat Link, Prompt Text for Prompt/Agent), category/tag multi-select, model select, popular checkbox | P0 | planned | |
| V1-REQ-009 | Build AddResourceDialog component -- shadcn Dialog wrapping AddResourceForm, opens from Header button | P0 | planned | |
| V1-REQ-010 | Create `useCreateResource` hook -- submit form data to Notion create page endpoint, handle loading/error, trigger resource list refresh | P0 | planned | |
| V1-REQ-011 | Implement "Open" action on Chat Link cards -- `window.open(url, '_blank')` | P0 | planned | |
| V1-REQ-012 | Implement "Copy" action on Prompt cards -- `navigator.clipboard.writeText(promptText)` with visual feedback | P0 | planned | |
| V1-REQ-013 | Implement "Use" action on Agent cards -- copy agent context/system prompt to clipboard with visual feedback | P0 | planned | |
| V1-REQ-014 | Build ImprovedMultiSelect component -- searchable dropdown with existing options + create new option | P0 | planned | Custom component |
| V1-REQ-015 | Wire App.tsx -- compose Header, FilterBar, ResourceGrid, AddResourceDialog with shared state | P0 | planned | |
| V1-REQ-016 | Apply dark theme styling to all components (purple/violet accent #8B5CF6, #A78BFA) | P1 | planned | |

### Stage 2: Enhancement

| ID | Requirement | Priority | Status | Notes |
|----|-------------|----------|--------|-------|
| V2-REQ-001 | Build EditResourceDialog -- pre-populated form for editing any resource field | P1 | planned | |
| V2-REQ-002 | Create `useUpdateResource` hook -- PATCH to Notion, handle optimistic UI update | P1 | planned | |
| V2-REQ-003 | Build DeleteConfirmation dialog -- confirm before archiving resource in Notion | P1 | planned | |
| V2-REQ-004 | Create `useDeleteResource` hook -- archive page in Notion, remove from local state | P1 | planned | |
| V2-REQ-005 | Add category filter dropdown to FilterBar | P1 | planned | |
| V2-REQ-006 | Add tag filter dropdown to FilterBar | P1 | planned | |
| V2-REQ-007 | Add model filter dropdown to FilterBar | P1 | planned | |
| V2-REQ-008 | Add "Popular" toggle to FilterBar -- show only isPopular=true resources | P1 | planned | |
| V2-REQ-009 | Build ResourceTable component -- alternate table layout with columns for all fields | P2 | planned | |
| V2-REQ-010 | Build ViewToggle component -- switch between card grid and table view | P2 | planned | |
| V2-REQ-011 | Add sort controls -- sort by Created (newest), Last Edited (newest), Title (A-Z / Z-A) | P2 | planned | |
| V2-REQ-012 | Build QuickActionsMenu component -- three-dot dropdown on each card: Edit, Delete, Copy, Open | P2 | planned | |
| V2-REQ-013 | Add toast notification system -- feedback for copy, save, delete, error actions | P2 | planned | shadcn Toast |
| V2-REQ-014 | Ensure all filters work in combination (type + category + tags + model + popular + search) | P1 | planned | |
| V2-REQ-017 | Restore the canonical Notion schema contract across reads, writes, types, forms, settings guidance, and schema validation; verify create/update against the real database | P0 | active | Canonical mapping finalized 2026-09-28; implementation pending |

### Stage 3: Polish & Hardening

| ID | Requirement | Priority | Status | Notes |
|----|-------------|----------|--------|-------|
| V3-REQ-001 | Create PWA manifest.json with app name, icons, theme color, display: standalone | P2 | planned | |
| V3-REQ-002 | Implement service worker for offline caching of app shell and last-fetched resources | P2 | planned | |
| V3-REQ-003 | Build offline mode -- serve LocalStorage cached resources when Notion API unreachable | P2 | planned | |
| V3-REQ-004 | Build ThemeToggle component -- dark/light mode switch, persist preference in localStorage | P2 | planned | |
| V3-REQ-005 | Implement light theme CSS variables and Tailwind dark: variants | P2 | planned | |
| V3-REQ-006 | Build export feature -- download resources as JSON file | P3 | planned | |
| V3-REQ-007 | Build export feature -- download resources as CSV file | P3 | planned | |
| V3-REQ-008 | Build import feature -- upload JSON file to create resources in Notion | P3 | planned | |
| V3-REQ-009 | Add keyboard shortcuts: Ctrl+K (search focus), Ctrl+N (new resource), Esc (close dialog) | P3 | planned | |
| V3-REQ-010 | Mobile responsive optimization -- touch targets (44px min), responsive grid breakpoints | P3 | planned | |

### Stage 4: Launch

| ID | Requirement | Priority | Status | Notes |
|----|-------------|----------|--------|-------|
| V4-REQ-001 | Deploy to Vercel free tier -- connect git repo, configure env vars | P0 | planned | |
| V4-REQ-002 | Validate with real data -- load VitalDev's actual prompts, chat links, agent contexts (minimum 10 resources) | P0 | planned | |
| V4-REQ-003 | Fix all critical and high-severity bugs found during real-data testing | P0 | planned | |
| V4-REQ-004 | Performance audit -- initial load <2s, smooth scrolling, no UI jank | P1 | planned | |
| V4-REQ-005 | Write minimal README.md with setup instructions and env var documentation | P2 | planned | |

---

## 8. Experience Scenarios

| Scenario | Trigger | Steps | Happy Path | Edge Cases |
|----------|---------|-------|------------|------------|
| Copy a prompt | User needs a saved prompt for AI chat | Search or filter -> find card -> click "Copy" | Prompt copied to clipboard, feedback shown | Empty prompt text; clipboard API blocked (non-HTTPS) |
| Open a chat link | User wants to continue an AI conversation | Filter to Chat Links -> find card -> click "Open" | New tab opens with chat URL | Invalid/expired URL; URL field empty |
| Save new resource | User discovers a useful prompt or chat | Click "Add" -> select type -> fill form -> submit | Resource appears in grid immediately | Notion API error; required fields missing; duplicate title |
| Find a specific resource | User knows roughly what they're looking for | Type in search box or select type filter -> scan results | Target resource visible within 5 seconds | No results found; typo in search; resource miscategorized |
| Edit a resource (V2) | User wants to update tags or description | Click three-dot menu -> Edit -> modify fields -> save | Changes saved, card updates | Notion API timeout; concurrent edit |
| Delete a resource (V2) | User wants to remove outdated item | Click three-dot menu -> Delete -> confirm | Resource removed from grid and archived in Notion | Accidental delete (confirmation prevents); Notion API error |

---

## 9. Risks & Open Questions

| ID | Risk / Question | Severity | Owner | Mitigation |
|----|-----------------|----------|-------|------------|
| R-01 | Notion API CORS may be blocked in some browsers or change policy | Medium | VitalDev | Use Vite dev proxy; test in production early; fallback to serverless function if needed |
| R-02 | Notion API key stored in localStorage is visible in browser devtools | Low | VitalDev | Acceptable for personal single-user app; no sensitive data exposed |
| R-03 | Notion rate limit (3 req/sec) could cause issues with rapid actions | Low | VitalDev | Sufficient for single user; add debounce to search; batch operations if needed |
| R-04 | Notion rich text format differs from plain text -- transformation needed | Medium | VitalDev | Build transformer in notion.ts; handle edge cases (bold, links, etc.) |
| R-05 | Service worker (Stage 3) adds complexity and caching bugs | Medium | VitalDev | Implement last; use well-tested patterns (Workbox); test cache invalidation |

---

## Checklist
- [x] Every epic links to a persona + problem statement
- [x] Out-of-scope items tracked in `backlog.md`
- [x] Success metrics are measurable
- [x] No implementation specifics in this doc (kept in architecture.md)
- [x] Requirements registry (§7) has unique IDs for all requirements
