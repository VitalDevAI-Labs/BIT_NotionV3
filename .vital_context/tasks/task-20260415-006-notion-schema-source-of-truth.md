# task-20260415-006: Single Source of Truth for Notion Schema

- **Date:** 2026-04-15
- **Status:** done
- **Stage:** Stage 3 - UI/UX Polish (continuation)
- **Requirements:** —

## Problem

Property names are repeated 3+ times across `src/lib/notion.ts` (in `transformPage`, `createResource`, `updateResource`). Every typo or schema rename means hunting through multiple functions. We've hit this bug 3 times now (`Prompt Text` vs `PromptText`, `URL` vs `Uri` vs `Url`, etc.).

Latest error: `Notion API error: Categories is expected to be select. Uri is not a property that exists.`

## Goal

1. Define Notion property names + types in ONE place: `src/lib/notion-schema.ts`
2. All read/write code in `notion.ts` references this single source
3. Confirm dynamic categories sync both ways (app → Notion creates new categories, Notion → app shows them)

## Confirmed Schema (from user)

| App Field | Notion Property | Notion Type |
|-----------|----------------|-------------|
| title | `Title` | title |
| type | `Type` | select |
| description | `Description` | rich_text |
| categories | `Categories` | multi_select |
| tags | `Tags` | multi_select |
| url | `Url` | url |
| promptText | `PromptText` | rich_text |
| model | `Model` | select |
| isPopular | `IsPopular` | checkbox |

## Plan

1. Create `src/lib/notion-schema.ts` exporting `NOTION_PROPS` constant with exact names
2. Refactor `src/lib/notion.ts` to import and use `NOTION_PROPS` everywhere
3. Remove the multi-name fallback `prop()` helper (no longer needed — schema is fixed)
4. Verify build, commit, document

## Log

1. Created `src/lib/notion-schema.ts` exporting `NOTION_PROPS` const with all 9 exact property names
2. Refactored `src/lib/notion.ts`:
   - Removed multi-name fallback `prop()` helper
   - All reads (`transformPage`) now use `NOTION_PROPS.<key>` for property lookup
   - All writes (`createResource`, `updateResource`) use `[NOTION_PROPS.<key>]` as object keys
3. Build verified: 0 errors

## Files Changed

- `src/lib/notion-schema.ts` — NEW: single source of truth for Notion property names
- `src/lib/notion.ts` — refactored to use NOTION_PROPS everywhere; removed prop() fallback

## Outcome

Done. To rename a property in Notion, change ONE line in `src/lib/notion-schema.ts`. Dynamic categories already work bidirectionally: app pushes new category names → Notion auto-creates them; Notion-added categories appear in app on refresh (via `availableCategories` derivation in App.tsx).
