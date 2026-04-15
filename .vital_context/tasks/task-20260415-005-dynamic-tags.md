# task-20260415-005: Dynamic Tags from Notion

- **Date:** 2026-04-15
- **Status:** done
- **Stage:** Stage 3 - UI/UX Polish (continuation)
- **Requirements:** —

## Goal

Replace hardcoded tags with dynamically derived values from actual Notion data. Allow users to search, filter, and create/update tags both from the app and Notion.

## Plan

1. **Derive available tags** from loaded resources using Set deduplication (same pattern as categories)
   - In App.tsx: `const availableTags = useMemo(() => Array.from(new Set(allResources.flatMap(r => r.tags))).sort(), [allResources])`

2. **Update AddResourceForm** to accept `availableTags` prop instead of relying on implied tags
   - Replace ImprovedMultiSelect for tags to show `availableTags` + allow create-new behavior

3. **Pass availableTags through dialog hierarchy**
   - AddResourceDialog → AddResourceForm
   - EditResourceDialog → AddResourceForm (same form)

4. **Update TagSearch filter in FilterBar**
   - Currently accepts `tagQuery` string for text search
   - No change needed — already substring-matches against dynamic tags
   - Could optionally add suggestions/autocomplete UI later

5. **Update App.tsx filter memo**
   - Already filters tags via substring match: `r.tags.some(t => t.toLowerCase().includes(q))`
   - Works with dynamic tags automatically

## Log

1. Added `availableTags` derivation in App.tsx (same pattern as categories)
   ```typescript
   const availableTags = useMemo(
     () => Array.from(new Set(allResources.flatMap((r) => r.tags))).sort(),
     [allResources],
   );
   ```

2. Threaded `availableTags` prop through dialog hierarchy:
   - App.tsx → AddResourceDialog, EditResourceDialog
   - AddResourceDialog → AddResourceForm
   - EditResourceDialog → AddResourceForm

3. Updated AddResourceForm to use `availableTags` in ImprovedMultiSelect:
   - Changed from `options={[]}` to `options={availableTags}`
   - Users can now select from existing tags or create new ones

4. Build verified: 0 errors, TypeScript clean

## Files Changed

- `src/App.tsx` — added availableTags useMemo; passed to AddResourceDialog and EditResourceDialog
- `src/components/AddResourceDialog.tsx` — added availableTags prop; passed to AddResourceForm
- `src/components/EditResourceDialog.tsx` — added availableTags prop; passed to AddResourceForm
- `src/components/AddResourceForm.tsx` — added availableTags prop; use in ImprovedMultiSelect options

## Outcome

Done. Tags are now dynamically derived from Notion data. Users can search, filter, and manage tags both from the app and Notion. Tag suggestions appear in the form when creating/editing resources.
