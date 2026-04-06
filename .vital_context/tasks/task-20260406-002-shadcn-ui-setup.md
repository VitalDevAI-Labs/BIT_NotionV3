# task-20260406-002: Install shadcn/ui + Vite Proxy + Stage 0 Complete
- **Date:** 2026-04-06
- **Status:** done
- **Stage:** Stage 0 - Foundations
- **Requirements:** V0-REQ-004, V0-REQ-009

## Goal
Install shadcn/ui with Tailwind v4 compatibility, add all required components (button, input, card, badge, dialog, select, checkbox, label), configure Vite dev proxy for Notion API, verify build passes and Stage 0 DoD is met.

## Plan
1. Run shadcn/ui init (Tailwind v4 mode)
2. Add required components: button, input, card, badge, dialog, select, checkbox, label
3. Configure Vite proxy for Notion API calls in dev (/notion-api → https://api.notion.com)
4. Verify `npm run build` passes with 0 errors
5. Update CONTEXT.md, playbook.md, tasks/index.md

## Log
- shadcn@4.1.2 init failed on first run — root tsconfig.json had no paths, only tsconfig.app.json. Fixed by adding compilerOptions.baseUrl+paths to tsconfig.json (root). shadcn validator reads root tsconfig directly, doesn't traverse references.
- shadcn init detected Tailwind v4 correctly — no tailwind.config.js needed.
- shadcn generated: button.tsx + updated utils.ts + updated globals.css (added @import "shadcn/tailwind.css", tw-animate-css, geist font, dark theme CSS vars).
- Added 7 more components in one command: input, card, badge, dialog, select, checkbox, label. Added textarea + separator separately.
- shadcn replaced utils.ts — restored truncateText() and extractPlainText() helpers.
- globals.css :root overridden to dark values (dark-first strategy). violet-500 set as --primary in oklch.
- Added `class="dark"` to <html> in index.html so shadcn components use dark mode CSS vars.
- Updated page title from "ai-bridge-temp" to "AI Bridge Unified".
- notion.ts updated: uses /notion-api/v1 proxy in dev (import.meta.env.DEV), direct https://api.notion.com/v1 in production.
- ESLint errors in shadcn-generated badge.tsx and button.tsx (react-refresh/only-export-components) — silenced with eslint-disable-next-line comments.
- Final: npm run lint → 0 errors. npm run build → 49 modules, 0 errors.

## Files Changed
- `tsconfig.json` — modified — added compilerOptions with baseUrl + @/* paths alias for shadcn validator
- `src/components/ui/button.tsx` — created by shadcn + lint fix
- `src/components/ui/input.tsx` — created by shadcn
- `src/components/ui/card.tsx` — created by shadcn
- `src/components/ui/badge.tsx` — created by shadcn + lint fix
- `src/components/ui/dialog.tsx` — created by shadcn
- `src/components/ui/select.tsx` — created by shadcn
- `src/components/ui/checkbox.tsx` — created by shadcn
- `src/components/ui/label.tsx` — created by shadcn
- `src/components/ui/textarea.tsx` — created by shadcn
- `src/components/ui/separator.tsx` — created by shadcn
- `src/lib/utils.ts` — modified — restored truncateText(), extractPlainText() after shadcn overwrote
- `src/styles/globals.css` — modified — overrode :root to dark theme values, violet-500 as --primary
- `src/lib/notion.ts` — modified — dev proxy vs production direct URL
- `index.html` — modified — class="dark", title "AI Bridge Unified"
- `src/App.tsx` — modified — renders Button + Badge to verify shadcn wiring
- `vite.config.ts` — modified — added /notion-api proxy

## Outcome
Done. All Stage 0 requirements complete. lint 0 errors, build 0 errors, 49 modules. shadcn/ui components verified rendering in App.tsx. Notion API client ready with dev proxy. Stage 0 DoD fully met — ready for Stage 1.
