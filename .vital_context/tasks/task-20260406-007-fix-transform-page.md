# task-20260406-007: Fix transformPage crash — defensive Notion property lookup
- **Date:** 2026-04-06
- **Status:** done
- **Stage:** Stage 1 — Core Experience
- **Requirements:** —

## Goal
Fix runtime crash "Cannot read properties of undefined (reading 'title')" when Notion property names don't exactly match the TypeScript schema.

## Log
- `transformPage` used hardcoded keys (`p.Title.title`) — any casing mismatch crashed the whole fetch
- Replaced with a `prop(keys[])` helper that tries multiple name variants and falls back to safe defaults

## Files Changed
- `src/lib/notion.ts` — modified — defensive property lookup with fallback key lists

## Outcome
Done. App no longer crashes on property name mismatches; falls back to "Untitled"/empty values.
