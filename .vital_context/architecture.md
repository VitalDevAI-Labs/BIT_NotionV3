# Technical Architecture

> The technical brain of the project. Agents read this to understand how the system is built, what schemas exist, and why key decisions were made.

---

## Stack

| Layer | Technology | Version | Why |
|-------|-----------|---------|-----|
| Frontend | React | 18.x | Developer familiar, large ecosystem, type-safe with TS |
| Language | TypeScript | 5.x | Type safety, better DX, catch errors at compile time |
| Build | Vite | 5.x | Fast HMR, minimal config, native TypeScript support |
| Styling | Tailwind CSS | 3.x | Utility-first, rapid prototyping, dark mode support |
| Components | shadcn/ui | latest | Copy-paste components, Tailwind-native, fully customizable |
| Icons | Lucide React | latest | Clean icon set, tree-shakeable, consistent style |
| Database | Notion API | 2022-06-28 | Free tier, already in user's workflow, rich REST API |
| Hosting | Vercel | free tier | Zero cost, git-based deploy, edge CDN |
| Package Manager | npm | 9.x+ | Default for Node.js, lockfile support |

---

## Architecture Diagram

```
┌──────────────────────────────────────────┐
│            Browser (Desktop / PWA)        │
│                                          │
│  ┌─────────────────────────────────────┐ │
│  │         React 18 + TypeScript       │ │
│  │                                     │ │
│  │  App.tsx                            │ │
│  │  ├── Header (logo, Add button)      │ │
│  │  ├── FilterBar                      │ │
│  │  │   ├── TypeFilter                 │ │
│  │  │   ├── SearchInput                │ │
│  │  │   ├── CategoryFilter (V2)        │ │
│  │  │   └── TagFilter (V2)            │ │
│  │  ├── ResourceGrid / ResourceTable   │ │
│  │  │   └── ResourceCard[]             │ │
│  │  └── AddResourceDialog              │ │
│  │      └── AddResourceForm            │ │
│  └──────────────┬──────────────────────┘ │
│                 │                         │
│     ┌───────────┴───────────┐            │
│     │  src/lib/notion.ts    │            │
│     │  (API Client)         │            │
│     └───────────┬───────────┘            │
│                 │                         │
│     ┌───────────┴───────────┐            │
│     │  localStorage         │            │
│     │  (API key + cache)    │            │
│     └───────────────────────┘            │
└─────────────────┬────────────────────────┘
                  │ HTTPS (REST)
                  │ Authorization: Bearer {token}
                  │ Notion-Version: 2022-06-28
                  ▼
┌──────────────────────────────────────────┐
│          Notion API                       │
│          api.notion.com                   │
│                                          │
│  POST /v1/databases/{id}/query → List    │
│  POST /v1/pages                → Create  │
│  PATCH /v1/pages/{id}          → Update  │
│  PATCH /v1/pages/{id} (archive)→ Delete  │
└──────────────────────────────────────────┘
```

No backend server. Browser calls Notion API directly. API key stored in browser localStorage or .env (via Vite).

---

## Data Models

### Notion Database: `AI Resources`

Property-level schema (maps directly to Notion database configuration):

| Property | Notion Type | Required | Options / Format |
|----------|-------------|----------|------------------|
| Title | title | Yes | Free text |
| Type | select | Yes | `Chat Link`, `Prompt`, `Agent` |
| Description | rich_text | No | Free text |
| Categories | multi_select | No | Code Assistant, Creative Writing, Data Analysis, English Expert, Formatters, General Experts, Research, Tools |
| Tags | multi_select | No | Freeform (React, Python, API, Debug, etc.) |
| URL | url | No | Valid URL (for Chat Links) |
| Prompt Text | rich_text | No | Long text (for Prompts and Agents) |
| Model | select | No | GPT-4, GPT-4 Turbo, GPT-3.5, Claude Opus, Claude Sonnet, Claude Haiku, Gemini Pro, Gemini Ultra, Perplexity, Other |
| Is Popular | checkbox | No | true/false |
| Created | created_time | Auto | ISO timestamp |
| Last Edited | last_edited_time | Auto | ISO timestamp |

### TypeScript Interface: `Resource`

```typescript
// src/types/resource.ts
export interface Resource {
  id: string;                                    // Notion page ID
  title: string;                                 // Title property
  type: 'Chat Link' | 'Prompt' | 'Agent';       // Type select
  description: string;                           // Rich text → plain text
  categories: string[];                          // Multi-select values
  tags: string[];                                // Multi-select values
  url?: string;                                  // URL property (Chat Links)
  promptText?: string;                           // Rich text → plain text (Prompts/Agents)
  model?: string;                                // Model select value
  isPopular: boolean;                            // Checkbox
  createdAt: string;                             // ISO timestamp
  lastEditedAt: string;                          // ISO timestamp
}

export type ResourceType = 'Chat Link' | 'Prompt' | 'Agent';
export type FilterType = 'All' | ResourceType;
```

### TypeScript Interface: `CreateResourceInput`

```typescript
// src/types/resource.ts
export interface CreateResourceInput {
  title: string;
  type: ResourceType;
  description?: string;
  categories?: string[];
  tags?: string[];
  url?: string;
  promptText?: string;
  model?: string;
  isPopular?: boolean;
}
```

### Notion API Response Shape (relevant fields)

```typescript
// src/types/notion.ts
export interface NotionPage {
  id: string;
  created_time: string;
  last_edited_time: string;
  archived: boolean;
  properties: {
    Title: { title: Array<{ plain_text: string }> };
    Type: { select: { name: string } | null };
    Description: { rich_text: Array<{ plain_text: string }> };
    Categories: { multi_select: Array<{ name: string }> };
    Tags: { multi_select: Array<{ name: string }> };
    URL: { url: string | null };
    'Prompt Text': { rich_text: Array<{ plain_text: string }> };
    Model: { select: { name: string } | null };
    'Is Popular': { checkbox: boolean };
  };
}

export interface NotionQueryResponse {
  results: NotionPage[];
  has_more: boolean;
  next_cursor: string | null;
}
```

---

## Data Flows

### Flow: Fetch All Resources
```
App mounts
→ useNotionResources hook fires
→ POST https://api.notion.com/v1/databases/{VITE_NOTION_DATABASE_ID}/query
  Headers: Authorization: Bearer {VITE_NOTION_API_KEY}, Notion-Version: 2022-06-28
  Body: {} (no filters = all pages)
→ Notion returns NotionQueryResponse
→ Transform each NotionPage → Resource (extract plain_text, map properties)
→ Set resources state → Render ResourceGrid
→ Optional: Cache in localStorage for offline (Stage 3)
```

### Flow: Add New Resource
```
User clicks "Add" in Header
→ AddResourceDialog opens
→ User selects type → conditional fields appear
→ User fills form → clicks Submit
→ useCreateResource hook fires
→ POST https://api.notion.com/v1/pages
  Body: { parent: { database_id }, properties: { ...mapped fields } }
→ Notion creates page, returns new NotionPage
→ Transform to Resource → Prepend to resources state
→ Close dialog → New card appears in grid
```

### Flow: Filter & Search (client-side)
```
User types in SearchInput or clicks TypeFilter tab
→ Filter state updates (searchQuery, selectedType)
→ resources.filter(r =>
    (selectedType === 'All' || r.type === selectedType) &&
    (r.title.toLowerCase().includes(query) || r.description.toLowerCase().includes(query))
  )
→ Filtered array passed to ResourceGrid → Re-render
```

### Flow: Copy Prompt
```
User clicks "Copy" on Prompt card
→ navigator.clipboard.writeText(resource.promptText)
→ Show visual feedback (button text changes / toast)
→ Reset after 2 seconds
```

### Flow: Open Chat Link
```
User clicks "Open" on Chat Link card
→ window.open(resource.url, '_blank')
→ New browser tab opens
```

### Flow: Edit Resource (Stage 2)
```
User clicks Edit in QuickActionsMenu
→ EditResourceDialog opens with pre-populated fields
→ User modifies fields → clicks Save
→ useUpdateResource hook fires
→ PATCH https://api.notion.com/v1/pages/{resource.id}
  Body: { properties: { ...changed fields } }
→ Notion updates page
→ Update resource in local state → Card re-renders
```

### Flow: Delete Resource (Stage 2)
```
User clicks Delete in QuickActionsMenu
→ DeleteConfirmation dialog opens
→ User confirms
→ useDeleteResource hook fires
→ PATCH https://api.notion.com/v1/pages/{resource.id}
  Body: { archived: true }
→ Notion archives page
→ Remove from local state → Card disappears
```

---

## API Endpoints (Notion API)

| Method | Path | Purpose | Auth | Request Body |
|--------|------|---------|------|-------------|
| POST | `/v1/databases/{database_id}/query` | List/filter resources | Bearer token | `{}` or `{ filter: {...}, sorts: [...] }` |
| POST | `/v1/pages` | Create new resource | Bearer token | `{ parent: { database_id }, properties: {...} }` |
| PATCH | `/v1/pages/{page_id}` | Update resource fields | Bearer token | `{ properties: {...} }` |
| PATCH | `/v1/pages/{page_id}` | Delete (archive) resource | Bearer token | `{ archived: true }` |

**Headers for all requests:**
```
Authorization: Bearer {NOTION_API_KEY}
Notion-Version: 2022-06-28
Content-Type: application/json
```

**Base URL:** `https://api.notion.com`

**Rate Limits:** 3 requests per second (sufficient for single user)

---

## Key Decisions

| # | Decision | Chose | Over | Why |
|---|----------|-------|------|-----|
| 1 | Platform | Web app (React SPA) | React Native mobile app | Desktop browser is primary use case; PWA covers mobile |
| 2 | Data model | Single unified table with Type field | Separate databases per type | Simpler API, one query gets everything, Type field enables flexible filtering |
| 3 | Database | Notion API (free) | Supabase, Firebase, PlanetScale | Free forever, already in user's workflow, rich API, no server needed |
| 4 | Backend | None (direct browser → Notion) | Express/Node proxy, serverless functions | No server complexity; Notion supports CORS; single-user app |
| 5 | State management | React hooks (useState, useEffect) | Redux, Zustand, Jotai | App is simple enough; hooks + prop drilling covers all use cases |
| 6 | Component library | shadcn/ui | Material UI, Chakra UI, Radix raw | Lightweight, Tailwind-native, copy-paste (no package dependency), fully customizable |
| 7 | Build tool | Vite | Create React App, Next.js | Fast HMR, minimal config, no SSR needed (SPA is sufficient) |
| 8 | Auth | None (API key in env/localStorage) | OAuth, Notion OAuth flow | Single-user personal app; API key is simplest secure-enough approach |
| 9 | Search | Client-side string matching | Notion API filter, Algolia | Fast for small datasets (<500 resources); no additional service needed |
| 10 | Styling approach | Dark mode first | Light mode first | User preference; matches AI tool aesthetics |

---

## Constraints & Limitations

- **Notion API rate limit:** 3 requests per second -- add debounce to rapid actions
- **No real-time sync:** REST only, no websockets -- user must refresh for external changes
- **Rich text transformation:** Notion rich_text format differs from plain text -- need mapper utility
- **No backend:** Cannot aggregate, cache server-side, or do background jobs
- **API key exposure:** Visible in browser devtools -- acceptable for personal single-user app
- **Dataset size:** Client-side filtering works well under ~500 resources; may need server-side filtering beyond that
- **CORS:** Notion API supports CORS from browsers, but policy could change -- have Vite proxy as fallback
