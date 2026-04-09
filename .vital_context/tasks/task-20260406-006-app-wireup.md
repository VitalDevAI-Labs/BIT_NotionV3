# task-20260406-006: Type actions + ImprovedMultiSelect + App wire-up
- **Date:** 2026-04-06
- **Status:** done
- **Stage:** Stage 1 — Core Experience
- **Requirements:** V1-REQ-011, V1-REQ-012, V1-REQ-013, V1-REQ-014, V1-REQ-015, V1-REQ-016

## Goal
Wire all components into App.tsx with filter/search logic; build ImprovedMultiSelect for categories/tags.

## Plan
1. Create `ImprovedMultiSelect` (searchable dropdown, create-new option)
2. Wire App.tsx: useNotionResources + optimistic inserts + filter/search memo

## Files Changed
- `src/components/ui/improved-multi-select.tsx` — created — click-outside, keyboard nav, create-new
- `src/App.tsx` — rewritten — full filter/search/optimistic logic

## Outcome
Done. All V1 requirements wired. Build: 0 errors.
