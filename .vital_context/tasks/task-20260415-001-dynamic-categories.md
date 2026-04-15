# task-20260415-001: Dynamic Categories from Notion
- **Date:** 2026-04-15
- **Status:** done
- **Stage:** UI/UX Refinement
- **Requirements:** —

## Goal
Replace hardcoded categories list with dynamically derived values from actual Notion data.

## Files Changed
- `src/components/AddResourceForm.tsx` — accept `availableCategories` prop (replaces `DEFAULT_CATEGORIES` from constants)
- `src/components/AddResourceDialog.tsx` — pass `availableCategories` prop down
- `src/components/EditResourceDialog.tsx` — pass `availableCategories` prop down
- `src/components/FilterBar.tsx` — accept `availableCategories` prop, use in select dropdown
- `src/App.tsx` — derive `availableCategories` from loaded `resources` using Set + sort

## Outcome
Done. Categories dropdown now shows only values that exist in the actual Notion database. List updates automatically as users add new category values.
