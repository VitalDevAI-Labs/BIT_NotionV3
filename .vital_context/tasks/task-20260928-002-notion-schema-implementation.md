# task-20260928-002: Align CRUD With Canonical Notion Schema
- **Date:** 2026-09-28
- **Status:** active
- **Stage:** 2.5 - Notion Schema Stabilization
- **Requirements:** V2-REQ-017

## Goal
Make create and update requests use the finalized Notion property names and types.

## Plan
1. Restore the schema constant module and route all Notion reads/writes through it.
2. Align application types, category input, and Settings guidance.
3. Verify static checks and real Notion create/update operations.

## Log
- Replaced write property `URL` with canonical `Url` and `Prompt Text` with `PromptText`.
- Confirmed Categories is `multi_select` from the live Notion validation response and restored multi-value serialization, parsing, and form input.
- Centralized both property names and Notion types in `src/lib/notion-schema.ts`; Settings now renders its field guide from that definition.
- Removed Prompt from new-record resource types while retaining legacy read conversion.
- `npx tsc -b` passes. Lint has three pre-existing errors in App, ConfigDialog, and SettingsPage.

## Files Changed
- `src/lib/notion-schema.ts`, `src/lib/notion.ts`, resource/Notion types, constants, AddResourceForm, and SettingsPage.

## Outcome
Implementation is ready for real database create/update verification. Keep task active and BUG-001 in progress until both operations succeed.
