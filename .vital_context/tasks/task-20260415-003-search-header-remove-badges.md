# task-20260415-003: Move Search to Header Right + Remove Type Badges
- **Date:** 2026-04-15
- **Status:** done
- **Stage:** UI/UX Refinement
- **Requirements:** —

## Goal
Remove cluttered type badges from ResourceCard. Move search input to Header right side (cleaner layout).

## Files Changed
- `src/components/SearchInput.tsx` — add `forwardRef` support for keyboard focus
- `src/components/Header.tsx` — add SearchInput in right section between space and Settings button
- `src/components/ResourceCard.tsx` — remove type `<Badge>` from top row (keep model text, dropdown menu, left border accent)
- `src/components/FilterBar.tsx` — remove SearchInput entirely
- `src/App.tsx` — pass search props to Header instead of FilterBar

## Outcome
Done. Search is now in the Header right side. Type badges removed from cards (left border accent still signals type). Layout is cleaner.
