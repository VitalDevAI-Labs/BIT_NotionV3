# task-20260406-009: Stage 2 — Advanced Filters + Quick Menu
- **Date:** 2026-04-06
- **Status:** done
- **Stage:** Stage 2 — Enhancement
- **Requirements:** V2-REQ-005, V2-REQ-006, V2-REQ-007, V2-REQ-008, V2-REQ-012, V2-REQ-014

## Goal
Add advanced filtering (category/tag/model/popular) and quick actions menu per card to enable sophisticated resource discovery.

## Plan
1. Extend `FilterBar.tsx` with 3-row UI: type+search, categories+model+popular, tags
2. Create dynamic tag options from loaded resources
3. Add filter state to `App.tsx`: selectedCategories, selectedTags, selectedModel, popularOnly
4. Implement combined filter memo (type → search → categories → tags → model → popular)
5. Add `DropdownMenu` to `ResourceCard` with Edit/Delete actions
6. Thread `onEdit`/`onDelete` props through `ResourceGrid` → `ResourceCard`
7. Install radix-ui dropdown-menu + alert-dialog components

## Files Changed
- `src/components/FilterBar.tsx` — rewritten — 3-row filter layout with selects + ImprovedMultiSelect
- `src/components/ResourceCard.tsx` — modified — added QuickActionsMenu (Edit/Delete)
- `src/components/ResourceGrid.tsx` — modified — thread onEdit/onDelete props
- `src/components/ui/dropdown-menu.tsx` — created
- `src/components/ui/alert-dialog.tsx` — created
- `src/App.tsx` — modified — filter state + combined memo logic
- `package.json` — added `@radix-ui/react-dropdown-menu` + `@radix-ui/react-alert-dialog`

## Outcome
Done. Advanced filters fully functional with combined logic. Quick menu on every card. All filters chain correctly: type → search → categories → tags → model → popular.
