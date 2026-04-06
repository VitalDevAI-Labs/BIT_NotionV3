# UI / UX Reference

> Design system, interaction rules, and accessibility guardrails for AI Bridge Unified.

---

## 1. Design Principles
- **Clarity:** Minimal layouts, action-oriented copy -- user finds what they need in seconds
- **Speed:** One-click actions (Copy, Open) -- no unnecessary steps between intent and result
- **Consistency:** Every resource type follows the same card pattern with type-specific accent colors
- **Dark-first:** Dark theme is primary; light mode added in Stage 3

---

## 2. Design Tokens

### 2.1 Color Palette

| Token | HEX | Usage |
|-------|-----|-------|
| `background.primary` | `#0F172A` | Main app background (slate-900) |
| `background.card` | `#1E293B` | Card surfaces (slate-800) |
| `background.elevated` | `#334155` | Hover states, dialogs (slate-700) |
| `text.primary` | `#F8FAFC` | Headings, primary text (slate-50) |
| `text.secondary` | `#94A3B8` | Descriptions, metadata (slate-400) |
| `text.muted` | `#64748B` | Placeholders, disabled (slate-500) |
| `accent.primary` | `#8B5CF6` | Primary accent, buttons, links (violet-500) |
| `accent.hover` | `#A78BFA` | Accent hover state (violet-400) |
| `accent.muted` | `#6D28D9` | Accent pressed/active state (violet-700) |
| `type.chatlink` | `#3B82F6` | Chat Link badge and accent (blue-500) |
| `type.prompt` | `#22C55E` | Prompt badge and accent (green-500) |
| `type.agent` | `#8B5CF6` | Agent badge and accent (violet-500) |
| `intent.success` | `#22C55E` | Success states, confirmations (green-500) |
| `intent.warning` | `#F59E0B` | Warnings (amber-500) |
| `intent.error` | `#EF4444` | Errors, destructive actions (red-500) |
| `border.default` | `#334155` | Card borders, dividers (slate-700) |
| `border.focus` | `#8B5CF6` | Focus rings (violet-500) |

### 2.2 Typography

| Token | Font | Weight | Size / Line Height | Usage |
|-------|------|--------|--------------------|-------|
| `type.heading.lg` | System sans-serif | 700 | 24px / 32px | Page title ("AI Bridge") |
| `type.heading.md` | System sans-serif | 600 | 18px / 28px | Section headers, dialog titles |
| `type.body.md` | System sans-serif | 400 | 16px / 24px | Card descriptions, form labels |
| `type.body.sm` | System sans-serif | 400 | 14px / 20px | Tags, badges, metadata |
| `type.body.xs` | System sans-serif | 400 | 12px / 16px | Timestamps, helper text |
| `type.mono` | System monospace | 500 | 14px / 20px | Prompt text display |

**Font stack:** `ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`

### 2.3 Spacing & Layout

- **Base unit:** 4px (Tailwind default)
- **Component padding:** `p-3` (12px), `p-4` (16px), `p-6` (24px)
- **Card gap:** `gap-4` (16px) in grid
- **Section spacing:** `space-y-6` (24px) between major sections
- **Border radius:** `rounded-lg` (8px) for cards, `rounded-md` (6px) for badges/buttons

### 2.4 Responsive Breakpoints

| Breakpoint | Width | Layout |
|------------|-------|--------|
| `sm` | 640px+ | 1 column grid |
| `md` | 768px+ | 2 column grid |
| `lg` | 1024px+ | 3 column grid |
| `xl` | 1280px+ | 4 column grid |

**Primary target:** Desktop (lg and above). Mobile is secondary (Stage 3 optimization).

---

## 3. Component Library

All components from **shadcn/ui** customized with Tailwind. Installed via `npx shadcn-ui@latest add <name>`.

### 3.1 Button
- **Variants:** `default` (violet), `secondary` (slate), `ghost` (transparent), `destructive` (red)
- **Sizes:** `default`, `sm`, `lg`, `icon`
- **States:** default / hover / pressed / loading / disabled
- **Hit area:** Minimum 36px height, 44px for mobile

### 3.2 Card (ResourceCard)
- **Background:** `bg-slate-800` with `border border-slate-700`
- **Hover:** `hover:border-slate-600` subtle highlight
- **Anatomy:**
  - Type badge (top-left, color-coded)
  - Title (heading.md weight)
  - Description (body.sm, truncated to 2 lines)
  - Tags row (Badge components, max 3 visible + "+N more")
  - Action button (bottom-right, type-specific)
- **Type-specific accents:**
  - Chat Link: `border-l-4 border-l-blue-500`
  - Prompt: `border-l-4 border-l-green-500`
  - Agent: `border-l-4 border-l-violet-500`

### 3.3 Badge
- **Variants:** Type badges (colored), tag badges (slate/muted)
- **Type badge colors:**
  - Chat Link: `bg-blue-500/20 text-blue-400`
  - Prompt: `bg-green-500/20 text-green-400`
  - Agent: `bg-violet-500/20 text-violet-400`
- **Tag badge:** `bg-slate-700 text-slate-300`

### 3.4 Dialog
- **Overlay:** `bg-black/50` backdrop
- **Panel:** `bg-slate-800 border border-slate-700 rounded-lg`
- **Max width:** `max-w-lg` (512px) for forms
- **Close:** X button top-right + Esc key

### 3.5 Input / Select
- **Background:** `bg-slate-900 border-slate-700`
- **Focus:** `ring-2 ring-violet-500 border-violet-500`
- **Placeholder:** `text-slate-500`

### 3.6 Toast (Stage 2)
- **Position:** Bottom-right
- **Duration:** 3 seconds auto-dismiss
- **Variants:** success (green), error (red), info (slate)

---

## 4. Interaction Patterns

| Pattern | Trigger | Behavior |
|---------|---------|----------|
| **Copy prompt** | Click "Copy" button on Prompt card | Copy to clipboard → button text changes to "Copied!" for 2s → revert |
| **Open chat link** | Click "Open" button on Chat Link card | `window.open(url, '_blank')` → new tab |
| **Add resource** | Click "+" or "Add" button in Header | Dialog slides in → form with type selector → submit → dialog closes → new card appears |
| **Search** | Type in search input | Real-time filter (<100ms debounce) → grid updates → clear button appears when non-empty |
| **Type filter** | Click tab (All / Chat Links / Prompts / Agents) | Active tab highlighted → grid filters → maintains search query |
| **Quick actions (V2)** | Click three-dot icon on card | Dropdown: Edit, Delete, Copy, Open → action fires → dropdown closes |

---

## 5. Accessibility Requirements

- **Contrast:** Minimum 4.5:1 for body text, 3:1 for large headings (WCAG AA)
- **Focus indicators:** Visible `ring-2 ring-violet-500` on all interactive elements
- **Keyboard navigation:** Tab through cards, Enter to activate action, Esc to close dialogs
- **Button labels:** All icon-only buttons must have `aria-label`
- **Screen reader:** Type badges include sr-only text ("Type: Chat Link")
- **Motion:** Respect `prefers-reduced-motion` -- disable transitions when set
- **Touch targets:** Minimum 44x44px on mobile (Stage 3)

---

## 6. Content & Tone

- **Voice:** Minimal, functional -- no marketing speak
- **Microcopy:**
  - Buttons: verb-first ("Add Resource", "Copy Prompt", "Open Chat")
  - Empty state: "No resources yet. Add your first prompt, chat link, or agent context."
  - Search empty: "No results for '{query}'. Try a different search or clear filters."
- **Error messages:** "{What failed}. {What to try}." -- e.g., "Failed to save resource. Check your Notion API key and try again."
