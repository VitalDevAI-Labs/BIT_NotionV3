/**
 * Single source of truth for the Notion database schema.
 *
 * If a property name changes in Notion, update it HERE ONLY.
 * All read/write logic in src/lib/notion.ts references these constants.
 *
 * To verify: open your Notion DB, click each column header, and confirm
 * the name and type match exactly (case-sensitive, including spaces).
 */

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
