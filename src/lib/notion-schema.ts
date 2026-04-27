/**
 * Single source of truth for the Notion database schema.
 *
 * If a property name changes in Notion, update it HERE ONLY.
 * All read/write logic in src/lib/notion.ts references these constants.
 *
 * To verify: open your Notion DB, click each column header, and confirm
 * the name and type match exactly (case-sensitive, including spaces).
 */

// Notion property types (for reference — keep in sync with the actual DB):
//   Title       → title
//   Type        → select          (Chat Link / Agent)
//   Description → rich_text
//   Categories  → select          (single-value; app stores as 1-element array)
//   Tags        → multi_select
//   Url         → url
//   PromptText  → rich_text
//   Model       → select
//   IsPopular   → checkbox

export const NOTION_PROPS = {
  title: 'Title',
  type: 'Type',
  description: 'Description',
  categories: 'Categories',
  tags: 'Tags',
  url: 'Url',
  promptText: 'PromptText',
  model: 'Model',
  isPopular: 'IsPopular',
} as const;

export type NotionPropKey = keyof typeof NOTION_PROPS;
