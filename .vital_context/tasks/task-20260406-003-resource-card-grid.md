# task-20260406-003: useNotionResources + ResourceCard + ResourceGrid
- **Date:** 2026-04-06
- **Status:** done
- **Stage:** Stage 1 — Core Experience
- **Requirements:** V1-REQ-001, V1-REQ-002, V1-REQ-003

## Goal
Fetch all resources from Notion and display them in a responsive card grid with type badges, tags, and type-specific action buttons.

## Plan
1. Create `useNotionResources` hook (fetch + loading/error state)
2. Create `ResourceCard` with Open/Copy/Use actions and type accent border
3. Create `ResourceGrid` with loading spinner, error, and empty states

## Files Changed
- `src/hooks/useNotionResources.ts` — created — fetches resources, exposes refetch
- `src/components/ResourceCard.tsx` — created — card UI with clipboard copy and window.open
- `src/components/ResourceGrid.tsx` — created — responsive 1→4 column grid

## Outcome
Done. Cards render with correct type colors, Copy button shows "Copied!" feedback for 2s.
