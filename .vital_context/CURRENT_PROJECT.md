# Current Project Information

> Canonical handoff snapshot for developers and AI agents. Read this after `CONTEXT.md` before planning or implementing work. This describes the code as it exists; older phase documents may describe intended or historical behavior.

## Snapshot

| Field | Current value |
|---|---|
| Project | AI Bridge Unified |
| Product state | Private Notion-backed prototype; not ready for public users |
| Current focus | UX and functional stabilization before real database and authentication |
| Git branch | `UI_Changes-V1.01` |
| Git commit at audit | `0b59b62` |
| Branch/release label | `V1.01` |
| Package version | `0.0.0` |
| Snapshot date | 2026-09-20 |
| Primary stack | React 19, TypeScript 6, Vite 8, Tailwind CSS 4, shadcn/ui |
| Current persistence | Notion API through a Vite development proxy or Vercel serverless proxy |

The branch label and package version are currently different. Until formal release versioning is introduced, use `UI_Changes-V1.01` when identifying this working version and preserve `0.0.0` when referring specifically to `package.json`.

## Product Intent

AI Bridge is a personal library for saving, finding, and using AI resources across platforms. The current UI exposes two resource types:

- **Agent**: reusable agent instructions/context, optionally paired with a URL.
- **Chat Link**: a saved URL to an AI conversation.

The near-term goal is to make the UX and core CRUD behavior reliable using Notion as temporary storage. Only after that should the project move to a real multi-user database and authentication system.

## Current Capabilities

- Load resources from Notion.
- Search resource titles and descriptions.
- Filter by resource type, one category, tag text, and popular status.
- Create, edit, and archive resources.
- Copy agent context and open saved URLs.
- Save Notion credentials in browser local storage.
- Focus global search with `Ctrl+K` or `Cmd+K`.

```text
React UI -> React hooks -> Notion client
         -> Vite proxy (development) or Vercel function (production)
         -> Notion database
```

## Current Data Model

Notion is the source of truth. Property names are centralized in `src/lib/notion-schema.ts`.

| App field | Notion property | Notion type | Notes |
|---|---|---|---|
| title | `Title` | title | Required by the UI |
| type | `Type` | select | Current UI values: Agent, Chat Link |
| description | `Description` | rich text | Optional |
| categories | `Categories` | select | App type is an array, but only the first value is persisted |
| tags | `Tags` | multi-select | Multiple values supported |
| url | `Url` | URL | Optional for Agent; intended to be required for Chat Link |
| promptText | `PromptText` | rich text | Displayed as Agent Context |
| model | `Model` | select | Optional; current options are hardcoded |
| isPopular | `IsPopular` | checkbox | Used by the Popular filter |

Legacy Notion records with type `Prompt` are transformed into `Agent` when read.

## Confirmed Functional Risks

1. **Duplicate cards after create.** Created resources remain in `optimisticResources` after the Notion refetch returns the same resource.
2. **Stale form state.** Add values can persist across openings; Edit can show the previously edited resource because form state initializes only on mount.
3. **Inconsistent update/delete feedback.** Existing fetched resources are not immediately updated or removed; refetch replaces the grid with a loading state.
4. **Category control mismatch.** The form permits multiple selections while only the first category is saved.
5. **Incomplete validation.** Chat Link URL is not enforced, an Agent can be saved without useful content, and type changes can retain irrelevant values.
6. **Narrow global search.** Search excludes tags, categories, agent context, model, and URL.
7. **Misleading filtered empty states.** Copy only considers the main search query, not all active filters.
8. **Missing Notion pagination.** Only the first Notion result page is queried.
9. **Unhandled action failures.** Clipboard and URL action failures have limited or no feedback.
10. **No automated coverage.** CRUD reconciliation, form reset, validation, and filtering lack regression tests.

## Security and Launch Boundary

The current Notion connection is suitable only for a private prototype:

- The Notion secret is stored in `localStorage` and sent from the browser to the proxy.
- The proxy has no application authentication, ownership checks, rate limiting, or strict Notion path allowlist.
- Users would need to understand and configure Notion integrations themselves.

Do not treat this architecture as safe for public multi-user release. Public launch requires a backend that owns credentials, validates requests, authenticates users, and enforces per-user authorization.

## Documentation Drift

When documents disagree, prefer the running code plus this snapshot until the relevant document is updated.

- Some documents say React 18; `package.json` uses React 19.
- Older documents describe Prompt as a separate visible type.
- Light-mode and stage-completion statements are inconsistent.
- `README.md` is still the generic Vite starter.
- `reference.md` contains a historical target tree rather than the exact current tree.
- Architecture text mentions direct browser-to-Notion access, while the implementation uses proxies.

## Recommended Work Sequence

### 1. Functional correctness

- Establish one canonical resource state and reconcile create/update/delete results.
- Reset and synchronize Add/Edit forms correctly.
- Make category selection genuinely single-select.
- Add resource-type-aware validation and clear action errors.
- Add Notion pagination.
- Add tests for CRUD state, form behavior, and filtering.

### 2. UX foundation

- Improve information hierarchy in the header, filters, and cards.
- Expand global search across meaningful resource fields.
- Add active-filter visibility and a Clear All action.
- Improve loading, retry, connection, empty, and no-results states.
- Simplify Add/Edit with type-aware progressive disclosure.
- Verify keyboard, screen-reader, touch-target, and responsive behavior.

### 3. Production platform

- Define a persistence-neutral domain model and API boundary.
- Add a real database, user authentication, ownership, and authorization.
- Migrate/import existing Notion data.
- Add server-side validation, rate limiting, observability, and migrations.
- Remove browser-managed Notion secrets from the public product.

## Verification Status

The source and documentation were reviewed on 2026-09-20. The Git working tree was clean at the start of the audit. Build and lint could not run because dependencies were not installed (`tsc` and `eslint` were unavailable). Run `npm install`, then `npm run build` and `npm run lint` before implementation work.

## Key Files

- `CONTEXT.md` - documentation entry point and orchestration rules.
- `src/App.tsx` - filter, dialog, and resource state coordination.
- `src/components/AddResourceForm.tsx` - shared Add/Edit form.
- `src/components/ResourceCard.tsx` - primary resource interaction surface.
- `src/lib/notion.ts` - Notion CRUD and response transformation.
- `src/lib/notion-schema.ts` - canonical Notion property names.
- `api/notion-proxy.js` - current production Notion proxy.

