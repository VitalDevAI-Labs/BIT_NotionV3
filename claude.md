# AI Bridge Unified - Project Context

**Last Updated:** 2026-04-06  
**Status:** Phase 1 - Foundation  
**Developer:** VitalDev (solo)  
**AI Assistant:** Claude (planning layer) + Claude Code CLI (execution)

---

## 🎯 Project Overview

### Core Purpose
AI Bridge is a personal navigation layer for AI tools - a unified system to save, search, and navigate prompts, chat links, and agent contexts across all AI platforms (ChatGPT, Claude, Gemini, Perplexity, etc.).

### The Problem We're Solving
- **Prompt entropy:** Good prompts get lost in notes, docs, chat history
- **Chat fragmentation:** Valuable AI conversations scattered across platforms
- **Context loss:** Specialized agent personalities disappear when chats are lost
- **No unified search:** Each AI tool has weak or non-existent search

### The Solution
Single web application where users can:
- Save reusable prompts
- Bookmark important AI chat links
- Store agent contexts/personalities
- Search across everything
- Copy prompts instantly
- Navigate to saved chats with one click

---

## 🏗️ Architecture

### Tech Stack
```
Frontend: React 18 + TypeScript + Vite
Styling: Tailwind CSS + shadcn/ui components
Database: Notion API (free tier, sufficient for personal use)
Storage: Browser LocalStorage (for offline cache, optional)
Hosting: Vercel (free tier)
Build: Vite (fast dev + production builds)
Deployment: PWA (installable on desktop + mobile)
```

### Why This Stack?
- **React + TypeScript:** Developer familiar, type-safe
- **Notion as Database:** Free, already user's workspace, rich API
- **No Backend Server:** Direct Notion API calls from browser (CORS-enabled)
- **No Auth Complexity:** Simple Notion API key stored locally
- **Free Forever:** Zero hosting costs, zero database costs
- **PWA:** Works on desktop (primary) and mobile (secondary)

### Data Flow
```
User Action (Browser)
    ↓
React App State
    ↓
Notion API Call (REST)
    ↓
Notion Database (Single Source of Truth)
    ↓
Response → Update UI
    ↓
Optional: Cache in LocalStorage
```

---

## 📊 Data Model

### Notion Database Schema

**Database Name:** `AI Resources`

**Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| Title | Title | ✅ Yes | Resource name/title |
| Type | Select | ✅ Yes | Options: `Chat Link`, `Prompt`, `Agent` |
| Description | Text | No | Brief description of the resource |
| Categories | Multi-select | No | e.g., Code Assistant, Writing, Research |
| Tags | Multi-select | No | e.g., React, Python, Grammar, API |
| URL | URL | No | For Chat Links - the actual chat URL |
| Prompt Text | Text (long) | No | For Prompts - the prompt content |
| Model | Select | No | Options: GPT-4, Claude Sonnet, Gemini Pro, etc. |
| Is Popular | Checkbox | No | Mark frequently used resources |
| Created | Created time | Auto | Timestamp |
| Last Edited | Last edited time | Auto | Timestamp |

**Type Field Options:**
1. **Chat Link** - Saved AI conversation URLs
2. **Prompt** - Reusable prompt templates
3. **Agent** - AI agent contexts/personas

**Model Field Options:**
- GPT-4
- GPT-4 Turbo
- GPT-3.5
- Claude Opus
- Claude Sonnet
- Claude Haiku
- Gemini Pro
- Gemini Ultra
- Perplexity
- Other

**Default Categories:**
- Code Assistant
- Creative Writing
- Data Analysis
- English Expert
- Formatters
- General Experts
- Research
- Tools

**Common Tags Examples:**
- Languages: Python, JavaScript, TypeScript, React, Vue, etc.
- Domains: API, Database, Frontend, Backend, DevOps
- Tasks: Debug, Refactor, Explain, Translate, Summarize

---

## 📋 Requirements

### **Phase 1: Foundation (V1)**

**Status:** 🔲 Not Started

| ID | Requirement | Priority | Status |
|---|---|---|---|
| V1-REQ-001 | Create Notion database with unified schema | P0 | 🔲 |
| V1-REQ-002 | Setup React + Vite + TypeScript project | P0 | 🔲 |
| V1-REQ-003 | Install Tailwind CSS + shadcn/ui | P0 | 🔲 |
| V1-REQ-004 | Notion API integration (list resources) | P0 | 🔲 |
| V1-REQ-005 | Display resources in card grid view | P0 | 🔲 |
| V1-REQ-006 | Type filter: All / Chat Links / Prompts / Agents | P0 | 🔲 |
| V1-REQ-007 | Search by title and description | P0 | 🔲 |
| V1-REQ-008 | Add new resource form with type selection | P0 | 🔲 |
| V1-REQ-009 | Type-specific actions (Open URL, Copy Prompt, Use Agent) | P0 | 🔲 |
| V1-REQ-010 | Category and Tag multi-select with improved dropdown | P0 | 🔲 |

**Phase 1 Definition of Done:**
- ✅ User can view all saved resources
- ✅ User can filter by type (Chat Link, Prompt, Agent)
- ✅ User can search resources by title/description
- ✅ User can add new resources via form
- ✅ User can open chat links in new tab
- ✅ User can copy prompts to clipboard
- ✅ User can see all resources from Notion database
- ✅ App works on desktop browser

---

### **Phase 2: Enhancement (V2)**

**Status:** 📅 Planned

| ID | Requirement | Priority | Status |
|---|---|---|---|
| V2-REQ-001 | Edit existing resources | P1 | 📅 |
| V2-REQ-002 | Delete resources with confirmation | P1 | 📅 |
| V2-REQ-003 | Filter by category (multi-select) | P1 | 📅 |
| V2-REQ-004 | Filter by tags (multi-select) | P1 | 📅 |
| V2-REQ-005 | Filter by model | P1 | 📅 |
| V2-REQ-006 | "Popular" filter toggle | P1 | 📅 |
| V2-REQ-007 | Table view option (alternate to card grid) | P2 | 📅 |
| V2-REQ-008 | Sort by: Created, Last Edited, Title (A-Z) | P2 | 📅 |
| V2-REQ-009 | Quick actions menu on each card | P2 | 📅 |
| V2-REQ-010 | Toast notifications for actions | P2 | 📅 |

---

### **Phase 3: Advanced Features (V3)**

**Status:** 💡 Future

| ID | Requirement | Priority | Status |
|---|---|---|---|
| V3-REQ-001 | Offline mode with LocalStorage cache | P2 | 💡 |
| V3-REQ-002 | PWA manifest for installation | P2 | 💡 |
| V3-REQ-003 | Dark/Light theme toggle | P2 | 💡 |
| V3-REQ-004 | Export resources (JSON, CSV) | P3 | 💡 |
| V3-REQ-005 | Import resources (JSON) | P3 | 💡 |
| V3-REQ-006 | Link prompts to chat links (relationships) | P3 | 💡 |
| V3-REQ-007 | Usage tracking (copy count, open count) | P3 | 💡 |
| V3-REQ-008 | Browser extension for quick-save | P3 | 💡 |
| V3-REQ-009 | Mobile responsive optimization | P3 | 💡 |
| V3-REQ-010 | Keyboard shortcuts | P3 | 💡 |

---

## 🎨 Design Guidelines

### Visual Style
- **Theme:** Dark mode primary (with light mode option in V3)
- **Accent Color:** Purple/Violet (#8B5CF6, #A78BFA)
- **Typography:** System fonts, clean and readable
- **Layout:** Card grid (default), Table view (V2)
- **Icons:** Lucide React icons

### UI Components (shadcn/ui)
- Button
- Input
- Card
- Badge
- Dialog (for Add/Edit forms)
- Dropdown Menu
- Checkbox
- Toast (notifications)
- Custom: ImprovedMultiSelect (already created)

### Resource Type Visual Indicators
- 💬 **Chat Link** - Blue accent, "Open" button
- 📝 **Prompt** - Green accent, "Copy" button
- 🤖 **Agent** - Purple accent, "Use" button

---

## 🔧 Technical Implementation Notes

### Notion API Integration

**Authentication:**
```typescript
// Store API key in localStorage
const NOTION_API_KEY = localStorage.getItem('notion_api_key');

// API calls use Authorization header
headers: {
  'Authorization': `Bearer ${NOTION_API_KEY}`,
  'Notion-Version': '2022-06-28',
  'Content-Type': 'application/json'
}
```

**Key Endpoints:**
- `POST /v1/databases/{database_id}/query` - List resources with filters
- `POST /v1/pages` - Create new resource
- `PATCH /v1/pages/{page_id}` - Update resource
- `DELETE /v1/pages/{page_id}` - Delete resource (archive)

**Rate Limits:**
- 3 requests per second
- Sufficient for personal single-user app

### Data Transformation

**Notion Response → App State:**
```typescript
interface Resource {
  id: string;
  title: string;
  type: 'Chat Link' | 'Prompt' | 'Agent';
  description: string;
  categories: string[];
  tags: string[];
  url?: string;
  promptText?: string;
  model?: string;
  isPopular: boolean;
  createdAt: string;
  lastEditedAt: string;
}
```

### Component Structure
```
App.tsx
├── Header (Logo, Theme Toggle, Add Button)
├── FilterBar
│   ├── TypeFilter (All, Chat Links, Prompts, Agents)
│   ├── SearchInput
│   ├── CategoryFilter
│   └── TagFilter
├── ResourceGrid (or ResourceTable)
│   └── ResourceCard[]
│       ├── Title
│       ├── Type Badge
│       ├── Description
│       ├── Tags (badges)
│       └── Action Button (Open/Copy/Use)
└── AddResourceDialog
    └── AddResourceForm
        ├── Title Input
        ├── Type Select
        ├── Description Input
        ├── URL Input (conditional)
        ├── Prompt Text Textarea (conditional)
        ├── Model Select
        ├── Categories MultiSelect
        ├── Tags MultiSelect
        └── Is Popular Checkbox
```

---

## 🚀 Development Workflow

### Two-Session Pattern
1. **Claude Chat (this session):** Planning, architecture, decision-making
2. **Claude Code CLI:** Implementation, code execution

### Context Handoff
- This `claude.md` file is the bridge between sessions
- Always reference this file in Claude Code CLI prompts
- Update this file when requirements change
- Version control: Git repo (optional but recommended)

### Prompt Structure for Claude Code CLI
```
Context: I'm building AI Bridge Unified, a web app for managing AI prompts and chat links.
Full context is in claude.md (attach file).

Task: [Specific implementation task]
Requirements: [Reference specific REQ-IDs from claude.md]
Acceptance Criteria: [Clear success conditions]

Please implement this and confirm when done.
```

---

## 📁 Project Structure

```
ai-bridge-unified/
├── public/
│   ├── manifest.json          # PWA manifest (V3)
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── ui/                # shadcn/ui components
│   │   │   ├── button.tsx
│   │   │   ├── input.tsx
│   │   │   ├── card.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── checkbox.tsx
│   │   │   ├── select.tsx
│   │   │   ├── toast.tsx
│   │   │   └── improved-multi-select.tsx  # Custom component
│   │   ├── Header.tsx
│   │   ├── FilterBar.tsx
│   │   ├── TypeFilter.tsx
│   │   ├── SearchInput.tsx
│   │   ├── ResourceGrid.tsx
│   │   ├── ResourceCard.tsx
│   │   ├── ResourceTable.tsx  # V2
│   │   ├── AddResourceDialog.tsx
│   │   └── AddResourceForm.tsx
│   ├── hooks/
│   │   ├── useNotionResources.ts  # Fetch resources
│   │   ├── useCreateResource.ts   # Create resource
│   │   ├── useUpdateResource.ts   # Update resource (V2)
│   │   ├── useDeleteResource.ts   # Delete resource (V2)
│   │   └── useResourceActions.ts  # Open/Copy/Use actions
│   ├── lib/
│   │   ├── notion.ts              # Notion API client
│   │   ├── utils.ts               # Helper functions
│   │   └── constants.ts           # App constants
│   ├── types/
│   │   ├── resource.ts            # Resource type definitions
│   │   └── notion.ts              # Notion API types
│   ├── styles/
│   │   └── globals.css            # Tailwind imports
│   ├── App.tsx                    # Main app component
│   ├── main.tsx                   # Entry point
│   └── vite-env.d.ts
├── .env.example                   # Environment variables template
├── .gitignore
├── claude.md                      # THIS FILE (project brain)
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

---

## 🔐 Security & Privacy

### API Key Storage
- Notion API key stored in browser localStorage
- No backend server = no key exposure risk
- User's personal Notion workspace = their data only
- No multi-tenancy, no shared database

### CORS
- Notion API supports CORS from browser
- No proxy server needed
- Direct client → Notion communication

---

## 📝 Development Phases Timeline

### Phase 1: Foundation (Target: Week 1)
- Day 1-2: Project setup + Notion API integration
- Day 3-4: Resource display (card grid) + filters
- Day 5-6: Add resource form + actions
- Day 7: Testing + bug fixes

### Phase 2: Enhancement (Target: Week 2)
- Edit/Delete functionality
- Advanced filters (category, tags, model)
- Table view option
- Sort options

### Phase 3: Polish (Target: Week 3+)
- PWA setup
- Offline mode
- Theme toggle
- Export/Import
- Browser extension (if needed)

---

## 🐛 Known Limitations & Future Considerations

### Current Limitations
- **No collaboration:** Single-user only (by design)
- **No mobile app:** Web-only (PWA for mobile access)
- **No real-time sync:** Notion API is REST-based (no websockets)
- **Rate limits:** 3 req/sec (sufficient for personal use)

### Future Enhancements (Not in Scope Yet)
- Multi-user support (requires backend + auth)
- Real-time collaboration
- AI-powered prompt suggestions
- Prompt versioning
- Analytics dashboard
- Team sharing

---

## 📚 Reference Links

### Documentation
- Notion API: https://developers.notion.com/
- React: https://react.dev/
- Vite: https://vitejs.dev/
- Tailwind CSS: https://tailwindcss.com/
- shadcn/ui: https://ui.shadcn.com/

### Tools
- Notion API Key: https://www.notion.so/my-integrations
- Vercel Deployment: https://vercel.com/
- Lucide Icons: https://lucide.dev/

---

## 🎓 Key Learnings & Principles

### From Previous Projects (Task Alarm)
- ✅ Notion API is free and reliable for personal apps
- ✅ Local JSON cache improves perceived performance
- ✅ Expo Go works well for mobile development
- ✅ `claude.md` prevents context loss across sessions
- ✅ Phased requirements keep scope manageable

### For This Project
- ✅ Web-first approach (desktop is primary use case)
- ✅ Single unified table better than separate modules
- ✅ Direct browser → Notion API (no backend complexity)
- ✅ Type field enables flexible resource management
- ✅ PWA provides mobile access without separate app

---

## 🤝 Collaboration Model

### Developer (VitalDev)
- Provides requirements and use cases
- Makes architectural decisions
- Reviews implementations
- Tests functionality

### AI Assistant (Claude Chat)
- Analyzes requirements
- Proposes solutions
- Plans architecture
- Generates implementation prompts
- Updates this `claude.md` file

### AI Assistant (Claude Code CLI)
- Executes code implementations
- Runs tests
- Fixes bugs
- Follows prompts from Claude Chat

---

## 📊 Success Metrics

### Phase 1 Success
- ✅ Can view all resources from Notion
- ✅ Can add new resources via form
- ✅ Can filter by type
- ✅ Can search by title
- ✅ Can copy prompts with one click
- ✅ Can open chat links in new tab
- ✅ App loads in under 2 seconds

### Phase 2 Success
- ✅ Can edit existing resources
- ✅ Can delete resources
- ✅ Can filter by category/tags/model
- ✅ Can switch between card and table view
- ✅ Can sort resources

### Phase 3 Success
- ✅ Works offline with cached data
- ✅ Installable as PWA on desktop
- ✅ Supports dark and light themes
- ✅ Can export/import data

---

## 🔄 Version History

**v0.1.0 (Current)** - 2026-04-06
- Initial `claude.md` creation
- Project structure defined
- Requirements Phase 1-3 documented
- Architecture decided: React + Notion API
- Ready for implementation

---

## 📋 Requirements Inbox

_New requirements discovered during development will be captured here before being assigned to a phase._

| ID | Requirement | Date Added | Notes |
|---|---|---|---|
| - | - | - | - |

---

## 🚦 Current Status

**Phase:** Planning Complete → Ready for Implementation  
**Next Step:** Setup React + Vite + TypeScript project (V1-REQ-002)  
**Blockers:** None  
**Dependencies:** Notion database must be created first (V1-REQ-001)

---

## 💭 Notes for Future Sessions

### Context Reminders
- This is a **personal tool** for VitalDev's AI workflow
- Primary use case: Desktop browser (laptop/desktop)
- Secondary: Mobile via PWA (responsive web)
- No multi-user, no auth complexity, no backend server
- Free forever approach (Notion + Vercel free tiers)

### Implementation Notes
- Start with minimal features in Phase 1
- Focus on core workflow: Save → Search → Copy/Open
- Polish can come later (Phase 3)
- Test on real data early (VitalDev's actual prompts/links)

### Decision Log
- **2026-04-06:** Chose web app over mobile app (desktop primary use case)
- **2026-04-06:** Merged LLM Links + Prompt Bank into unified AI Resources
- **2026-04-06:** Selected Notion as database (free, familiar, rich API)
- **2026-04-06:** Direct browser → Notion (no backend needed)

---

**End of claude.md**

_This file is the single source of truth for AI Bridge Unified project. Update it whenever requirements, architecture, or decisions change. Reference it in all Claude Code CLI prompts to maintain context._
