# task-20260406-004: Header + FilterBar + TypeFilter + SearchInput
- **Date:** 2026-04-06
- **Status:** done
- **Stage:** Stage 1 — Core Experience
- **Requirements:** V1-REQ-004, V1-REQ-005, V1-REQ-006, V1-REQ-007

## Goal
Header with Add button and resource count. Filter bar with type tabs and real-time search.

## Plan
1. Create `Header` (logo, count, Add button)
2. Create `TypeFilter` (All / Chat Links / Prompts / Agents tabs)
3. Create `SearchInput` (clear button, focus ring)
4. Create `FilterBar` composing the two

## Files Changed
- `src/components/Header.tsx` — created
- `src/components/TypeFilter.tsx` — created — role=tablist, violet active tab
- `src/components/SearchInput.tsx` — created — X clear button
- `src/components/FilterBar.tsx` — created — composes TypeFilter + SearchInput

## Outcome
Done. Type filter and search both live-filter the grid.
