# task-20260408-010: Type Merge (Prompt→Agent) + Config Dialog
- **Date:** 2026-04-08
- **Status:** done
- **Stage:** Stage 2 (pre-Stage 3 fixes)
- **Requirements:** V2-REQ-001 (edit/config), new req: type merge, runtime config

## Goal
Merge Prompt type into Agent (only 3 UI types: All / Agents / Chat Links). Add a runtime Config Dialog so users can set their Notion API key and DB ID via localStorage without touching .env.

## Plan
1. Narrow FilterType in types/resource.ts
2. Update RESOURCE_TYPES, FILTER_TYPES, remap Prompt colors in constants.ts
3. Update notion.ts: localStorage credentials, map Prompt→Agent in transformPage, export hasCredentials/saveCredentials
4. Update ResourceCard: unified Agent action area (Open URL + copy icon when both fields present)
5. Update AddResourceForm: Agent gets URL field (optional), default type→Agent
6. Create ConfigDialog.tsx (new file)
7. Update Header.tsx: gear icon + onConfigClick prop
8. Update App.tsx: wire ConfigDialog, auto-open if no credentials

## Files Changed
- `src/types/resource.ts` — modified
- `src/lib/constants.ts` — modified
- `src/lib/notion.ts` — modified
- `src/components/ResourceCard.tsx` — modified
- `src/components/AddResourceForm.tsx` — modified
- `src/components/ConfigDialog.tsx` — created
- `src/components/Header.tsx` — modified
- `src/App.tsx` — modified

## Outcome
done — all 8 files updated, 1 new file created, build passes cleanly.
