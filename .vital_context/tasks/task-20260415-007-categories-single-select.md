# task-20260415-007: Categories as Single-Select (Schema Fix)

- **Date:** 2026-04-15
- **Status:** done
- **Stage:** Stage 3 - UI/UX Polish (continuation)
- **Requirements:** —

## Problem

Notion API error: `Categories is expected to be select`. The actual Notion column for `Categories` is type `select` (single-value), not `multi_select`. Code was reading/writing as multi_select.

## Goal

Fix Categories I/O to match the actual `select` type in Notion. Keep app-side shape (`categories: string[]`) so existing UI keeps working unchanged — just treat it as a 1-element array at the Notion boundary.

## Files Changed

- `src/lib/notion.ts` — three fixes:
  - `transformPage`: read `catProp.select.name` into `[name]` (or `[]` if empty)
  - `createResource`: write `{ select: { name: firstCategory } }` (or `{ select: null }`)
  - `updateResource`: same pattern as create
- `src/lib/notion-schema.ts` — added comment block documenting each property's Notion type so future readers don't have to guess

## Outcome

Done. Categories now reads/writes correctly. App keeps array shape so dialogs, filters, and dynamic-categories derivation are unchanged. Build clean.

## Note for Future Work

If you later switch the Notion column to `multi_select` (to allow multiple categories per resource), update:
- `transformPage`: back to `multi_select.map(...)`
- `createResource` / `updateResource`: back to `{ multi_select: ... }`
- `notion-schema.ts` comment
