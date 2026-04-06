# task-20260406-005: AddResourceDialog + AddResourceForm + useCreateResource
- **Date:** 2026-04-06
- **Status:** done
- **Stage:** Stage 1 — Core Experience
- **Requirements:** V1-REQ-008, V1-REQ-009, V1-REQ-010

## Goal
Modal dialog with a form that creates a new Notion page and immediately shows the card without reload.

## Plan
1. Create `useCreateResource` hook (wraps createResource, exposes loading/error)
2. Create `AddResourceForm` with type-conditional fields (URL for Chat Link, Prompt Text for Prompt/Agent)
3. Create `AddResourceDialog` modal wrapper

## Files Changed
- `src/hooks/useCreateResource.ts` — created
- `src/components/AddResourceForm.tsx` — created — type selector, model select, categories/tags multiselect
- `src/components/AddResourceDialog.tsx` — created — shadcn Dialog wrapper

## Outcome
Done. Form resets after submit; new card appears via optimistic insert in App.tsx.
