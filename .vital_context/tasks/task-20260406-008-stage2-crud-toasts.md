# task-20260406-008: Stage 2 — Toast System + CRUD Hooks + Dialogs
- **Date:** 2026-04-06
- **Status:** done
- **Stage:** Stage 2 — Enhancement
- **Requirements:** V2-REQ-001, V2-REQ-002, V2-REQ-003, V2-REQ-004, V2-REQ-013

## Goal
Build full CRUD edit/delete functionality with confirmation dialogs and toast notifications for all user actions.

## Plan
1. Install `sonner` for toast notifications
2. Create `useUpdateResource` hook wrapping `updateResource()` API
3. Create `useDeleteResource` hook wrapping `deleteResource()` API
4. Build `EditResourceDialog` with pre-populated form (reuse `AddResourceForm`)
5. Build `DeleteConfirmDialog` with "Are you sure?" confirmation
6. Add `<Toaster />` to `App.tsx`
7. Wire handlers in `App.tsx`: optimistic updates, toast messages

## Files Changed
- `src/hooks/useUpdateResource.ts` — created
- `src/hooks/useDeleteResource.ts` — created
- `src/components/AddResourceForm.tsx` — modified — added `initialValues` + `submitLabel` props
- `src/components/EditResourceDialog.tsx` — created
- `src/components/DeleteConfirmDialog.tsx` — created
- `src/App.tsx` — modified — edit/delete state + handlers + Toaster
- `package.json` — added `sonner` dependency

## Outcome
Done. Full edit/delete CRUD implemented. Toasts fire on create/update/delete/error. Dialogs handle optimistic updates and sync with Notion API.
