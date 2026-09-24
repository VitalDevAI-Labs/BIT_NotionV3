# Project Structure & Conventions

> Where every file lives and how to name things in AI Bridge Unified. Agents read this when creating new files, directories, or modules.

---

## 1. Purpose
- Deterministic directory layout so agents know exactly where to create or edit files
- Naming conventions to minimize code review friction
- Import rules to keep dependencies clean

---

## 2. Directory Layout

The application layout below is complemented by the Vital Context framework layout documented in `.vital_context/README.md`. New framework directories such as `.vital_context/agents/` and `.vital_context/scripts/` are allowed when recorded there and in `reference.md`.

```
src/
├── components/
│   ├── ui/              # shadcn/ui primitives ONLY (Button, Input, Card, etc.)
│   │                    # Do NOT put app logic here
│   │                    # Added via: npx shadcn-ui@latest add <component>
│   │
│   └── *.tsx            # App-level components (Header, FilterBar, ResourceCard, etc.)
│                        # Each component = one file unless it has sub-components
│
├── hooks/               # Custom React hooks
│                        # One hook per file, one concern per hook
│                        # Example: useNotionResources.ts, useCreateResource.ts
│
├── lib/                 # Utilities and service clients
│   ├── notion.ts        # ALL Notion API calls (query, create, update, delete)
│   ├── utils.ts         # cn() class merge, shared helpers
│   └── constants.ts     # Category/tag/model/type option arrays
│
├── types/               # TypeScript interfaces and type definitions
│   ├── resource.ts      # App-level types (Resource, CreateResourceInput, FilterType)
│   └── notion.ts        # Notion API response types (NotionPage, NotionQueryResponse)
│
└── styles/
    └── globals.css      # Tailwind directives only (@tailwind base/components/utilities)
```

### Where new files go

| Creating... | Put it in... | Example |
|-------------|-------------|---------|
| New UI primitive (from shadcn) | `src/components/ui/` | `toast.tsx` |
| New app component | `src/components/` | `EditResourceDialog.tsx` |
| New custom hook | `src/hooks/` | `useDeleteResource.ts` |
| New API function | `src/lib/notion.ts` (add to existing) | `deleteResource()` |
| New utility function | `src/lib/utils.ts` (add to existing) | `truncateText()` |
| New constant/option list | `src/lib/constants.ts` (add to existing) | `SORT_OPTIONS` |
| New TypeScript type | `src/types/resource.ts` or `src/types/notion.ts` | `UpdateResourceInput` |
| New CSS | `src/styles/globals.css` (add to existing) | Custom Tailwind layers |

**Rules:**
- Do NOT create new directories without updating this file
- Do NOT create `services/`, `store/`, `context/`, `pages/`, or `screens/` directories -- this app doesn't need them
- Keep it flat. One level of nesting is enough for this project scale.

---

## 3. Naming Conventions

| Item | Convention | Example |
|------|------------|---------|
| React components | `PascalCase.tsx` | `ResourceCard.tsx`, `FilterBar.tsx`, `AddResourceDialog.tsx` |
| Custom hooks | `use[Name].ts` (camelCase with `use` prefix) | `useNotionResources.ts`, `useCreateResource.ts` |
| Utility modules | `camelCase.ts` | `notion.ts`, `utils.ts`, `constants.ts` |
| Type definition files | `camelCase.ts` | `resource.ts`, `notion.ts` |
| TypeScript interfaces | `PascalCase` | `Resource`, `CreateResourceInput`, `NotionPage` |
| TypeScript type aliases | `PascalCase` | `ResourceType`, `FilterType` |
| shadcn/ui components | `kebab-case.tsx` (shadcn default) | `improved-multi-select.tsx` |
| CSS files | `camelCase.css` | `globals.css` |
| Environment variables | `VITE_SCREAMING_SNAKE_CASE` | `VITE_NOTION_API_KEY` |
| Constants (exported) | `SCREAMING_SNAKE_CASE` for arrays, `camelCase` for objects | `DEFAULT_CATEGORIES`, `modelOptions` |

---

## 4. Import Order

Enforce this order in all files (top to bottom):

```typescript
// 1. React core
import { useState, useEffect } from 'react';

// 2. Third-party packages
import { ExternalLink, Copy } from 'lucide-react';

// 3. Internal lib/utils
import { cn } from '@/lib/utils';
import { queryResources } from '@/lib/notion';
import { DEFAULT_CATEGORIES } from '@/lib/constants';

// 4. Types
import type { Resource, FilterType } from '@/types/resource';

// 5. Hooks
import { useNotionResources } from '@/hooks/useNotionResources';

// 6. Components (ui first, then app)
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ResourceCard } from '@/components/ResourceCard';

// 7. Styles (rare -- usually only in main.tsx)
import './styles/globals.css';
```

**Path aliases:** Configure `@/` → `src/` in `tsconfig.json` and `vite.config.ts` to avoid deep relative paths.

---

## 5. Module Boundaries

### What can import what

| Module | Can import from | Cannot import from |
|--------|----------------|-------------------|
| `components/ui/` | Only React, third-party libs, `@/lib/utils` | hooks, other components, types (except props) |
| `components/` | ui/, hooks/, lib/, types/ | Nothing restricted |
| `hooks/` | lib/, types/ | components/ (hooks must be UI-agnostic) |
| `lib/` | types/ only | components/, hooks/ |
| `types/` | Nothing (pure type definitions) | Everything |

### Key patterns
- **No circular imports:** If A imports B, B cannot import A
- **Hooks don't render:** Hooks return data/functions, never JSX
- **lib/ is framework-agnostic:** `notion.ts` uses fetch, not React -- could be used outside React
- **Types are pure:** No runtime code in `types/` -- only interfaces, type aliases, and enums

---

## 6. Component Patterns

```typescript
// Standard component structure
import { cn } from '@/lib/utils';
import type { Resource } from '@/types/resource';

interface ResourceCardProps {
  resource: Resource;
  onAction: (resource: Resource) => void;
}

export function ResourceCard({ resource, onAction }: ResourceCardProps) {
  // hooks first
  // derived state
  // handlers
  // render
  return (
    <div className={cn('...')}>
      {/* JSX */}
    </div>
  );
}
```

**Rules:**
- Named exports only (no `export default`)
- Props interface defined in the same file, named `[Component]Props`
- No inline styles -- use Tailwind classes
- Use `cn()` for conditional class merging
