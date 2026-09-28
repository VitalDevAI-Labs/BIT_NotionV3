# Quick Reference

> Cheat sheet for common commands, environment setup, and key lookups. Agents read this to run the project without asking how.

---

## File Structure

```
ai-bridge-unified/
├── .vital_context/               # Project documentation framework
│   ├── CONTEXT.md                # Entry point -- read first
│   ├── PRD.md                    # Product requirements + registry (§7)
│   ├── playbook.md               # Stage requirements, acceptance criteria, DoD
│   ├── architecture.md           # Stack, schemas, data flows, API endpoints
│   ├── reference.md              # THIS FILE -- commands, env vars, structure
│   ├── backlog.md                # Deferred features and ideas
│   ├── bugs.md                   # Bug tracking
│   ├── rules/
│   │   ├── structure.md          # Folder layout, naming conventions
│   │   └── design.md             # Colors, typography, components, accessibility
│   └── tasks/
│       ├── index.md              # Task log index
│       └── task-*.md             # Individual task logs
├── public/
│   ├── favicon.ico
│   └── manifest.json             # PWA manifest (Stage 3)
├── src/
│   ├── components/
│   │   ├── ui/                   # shadcn/ui primitives
│   │   │   ├── button.tsx
│   │   │   ├── input.tsx
│   │   │   ├── card.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── select.tsx
│   │   │   ├── checkbox.tsx
│   │   │   └── toast.tsx         # Stage 2
│   │   ├── Header.tsx
│   │   ├── FilterBar.tsx
│   │   ├── TypeFilter.tsx
│   │   ├── SearchInput.tsx
│   │   ├── ResourceGrid.tsx
│   │   ├── ResourceCard.tsx
│   │   ├── ResourceTable.tsx     # Stage 2
│   │   ├── AddResourceDialog.tsx
│   │   ├── AddResourceForm.tsx
│   │   ├── EditResourceDialog.tsx  # Stage 2
│   │   ├── ImprovedMultiSelect.tsx
│   │   ├── ViewToggle.tsx        # Stage 2
│   │   └── QuickActionsMenu.tsx  # Stage 2
│   ├── hooks/
│   │   ├── useNotionResources.ts # Fetch + transform resources
│   │   ├── useCreateResource.ts  # Create via Notion API
│   │   ├── useUpdateResource.ts  # Update via Notion API (Stage 2)
│   │   ├── useDeleteResource.ts  # Archive via Notion API (Stage 2)
│   │   └── useResourceActions.ts # Open/Copy/Use actions
│   ├── lib/
│   │   ├── notion.ts             # Notion API client (query, create, update, delete)
│   │   ├── utils.ts              # cn() class merge helper, misc utilities
│   │   └── constants.ts          # Default categories, tags, models, type options
│   ├── types/
│   │   ├── resource.ts           # Resource, CreateResourceInput, ResourceType, FilterType
│   │   └── notion.ts             # NotionPage, NotionQueryResponse
│   ├── styles/
│   │   └── globals.css           # Tailwind directives (@tailwind base/components/utilities)
│   ├── App.tsx                   # Root component -- composes all sections
│   ├── main.tsx                  # ReactDOM.createRoot entry point
│   └── vite-env.d.ts            # Vite type declarations
├── .env                          # Local env vars (NOT committed)
├── .env.example                  # Env var template (committed)
├── .gitignore
├── CLAUDE.md                     # Project brain / context bridge
├── index.html                    # Vite entry HTML
├── package.json
├── postcss.config.js             # PostCSS config (Tailwind plugin)
├── tailwind.config.js            # Tailwind config (dark mode, theme extensions)
├── tsconfig.json                 # TypeScript config
├── tsconfig.node.json            # TypeScript config for Vite
└── vite.config.ts                # Vite config (proxy, aliases)
```

**Note:** This is the target structure. Files will be created progressively through stages. Currently (pre-Stage 0) only `.vital_context/` and `CLAUDE.md` exist.

---

## Common Commands

```bash
# Setup (Stage 0)
npm create vite@latest . -- --template react-ts    # Scaffold project
npm install                                         # Install dependencies
npx shadcn-ui@latest init                           # Initialize shadcn/ui

# Development
npm run dev                 # Start Vite dev server (localhost:5173)
npm run build               # Production build to dist/
npm run preview             # Preview production build locally

# Linting
npm run lint                # ESLint check

# shadcn/ui components
npx shadcn-ui@latest add button     # Add Button component
npx shadcn-ui@latest add input      # Add Input component
npx shadcn-ui@latest add card       # etc.
npx shadcn-ui@latest add badge
npx shadcn-ui@latest add dialog
npx shadcn-ui@latest add select
npx shadcn-ui@latest add checkbox
npx shadcn-ui@latest add toast

# Deployment (Stage 4)
vercel                      # Deploy to Vercel (if CLI installed)
# Or: push to git → Vercel auto-deploys
```

---

## Environment Variables

| Variable | Purpose | Example | Required |
|----------|---------|---------|----------|
| `VITE_NOTION_API_KEY` | Notion integration API key (Bearer token) | `ntn_xxxxxxxxxxxxx` | Yes |
| `VITE_NOTION_DATABASE_ID` | Notion database ID for AI Resources | `abc123def456...` | Yes |

**How to get these:**
1. **API Key:** Go to https://www.notion.so/my-integrations → Create integration → Copy "Internal Integration Secret"
2. **Database ID:** Open the Notion database → Copy ID from URL: `notion.so/{workspace}/{DATABASE_ID}?v=...`
3. **Connect integration:** In Notion, open database → three-dot menu → Connections → Add your integration

### Canonical Notion Database Properties

Property names are case-sensitive. Configure the database exactly as follows:

| Property | Notion type | Notes |
|----------|-------------|-------|
| `Title` | Title | Required |
| `Type` | Select | Options created by the app: `Agent`, `Chat Link` |
| `Description` | Text | Optional |
| `Categories` | Multi-select | Optional; multiple categories allowed |
| `Tags` | Multi-select | Optional; multiple tags allowed |
| `Url` | URL | Required for Chat Link; optional for Agent |
| `PromptText` | Text | Agent instructions/context |
| `Model` | Select | Optional |
| `IsPopular` | Checkbox | Optional; defaults false |

Do not add custom `Created` or `Last Edited` properties. The application uses Notion page metadata. Legacy `Prompt` type records may be read as `Agent`, but new records must use only `Agent` or `Chat Link`.

**Usage in code:**
```typescript
const NOTION_API_KEY = import.meta.env.VITE_NOTION_API_KEY;
const DATABASE_ID = import.meta.env.VITE_NOTION_DATABASE_ID;
```

---

## Key File Locations

| What | Where |
|------|-------|
| App entry point | `src/main.tsx` |
| Root component | `src/App.tsx` |
| Notion API client | `src/lib/notion.ts` |
| Canonical Notion property mapping | `src/lib/notion-schema.ts` (required by V2-REQ-017; restore during implementation) |
| Type definitions | `src/types/resource.ts`, `src/types/notion.ts` |
| Constants (categories, models) | `src/lib/constants.ts` |
| shadcn/ui primitives | `src/components/ui/*.tsx` |
| App components | `src/components/*.tsx` |
| Custom hooks | `src/hooks/*.ts` |
| Global styles | `src/styles/globals.css` |
| Tailwind config | `tailwind.config.js` |
| Vite config | `vite.config.ts` |
| Env template | `.env.example` |
| Project documentation | `.vital_context/` |

---

## External Services & Documentation

| Service | URL | Purpose |
|---------|-----|---------|
| Notion API docs | https://developers.notion.com/ | Database queries, page CRUD |
| Notion integrations | https://www.notion.so/my-integrations | Create/manage API keys |
| React docs | https://react.dev/ | Component patterns, hooks |
| Vite docs | https://vitejs.dev/ | Build config, dev server, env vars |
| Tailwind CSS docs | https://tailwindcss.com/docs | Utility classes, dark mode, config |
| shadcn/ui docs | https://ui.shadcn.com/ | Component installation, customization |
| Lucide icons | https://lucide.dev/icons | Icon search and usage |
| Vercel | https://vercel.com/ | Deployment platform |
