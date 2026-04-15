# task-20260415-002: Remove Model Dropdown + Tags as Text Search
- **Date:** 2026-04-15
- **Status:** done
- **Stage:** UI/UX Refinement
- **Requirements:** —

## Goal
Simplify FilterBar: remove Model dropdown entirely, replace tag multi-select with simple text search.

## Files Changed
- `src/components/FilterBar.tsx` — removed Model `<select>`, removed tag `ImprovedMultiSelect`, added tag text `<input>`
- `src/App.tsx` — replaced `selectedModel` + `selectedTags` state with `tagQuery` string; updated filter memo to substring-match tags

## Outcome
Done. FilterBar is now simpler: categories dropdown, tag text search, popular toggle. Tag filtering is now substring-match instead of exact multi-select.
