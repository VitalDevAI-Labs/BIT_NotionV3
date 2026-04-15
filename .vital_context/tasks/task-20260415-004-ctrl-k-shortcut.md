# task-20260415-004: Ctrl+K Search Shortcut
- **Date:** 2026-04-15
- **Status:** done
- **Stage:** UI/UX Refinement
- **Requirements:** —

## Goal
Add keyboard shortcut (Ctrl+K or Cmd+K on Mac) to focus the search input from anywhere on the page.

## Files Changed
- `src/App.tsx` — create `searchRef` via `useRef`; add `useEffect` with keydown listener for Ctrl+K/Cmd+K; pass ref to Header

## Outcome
Done. Press Ctrl+K (or Cmd+K on Mac) anywhere on the page to focus the search input and start typing immediately.
