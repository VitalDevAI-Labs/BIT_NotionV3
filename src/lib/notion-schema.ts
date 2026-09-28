export type NotionPropertyType = 'title' | 'select' | 'rich_text' | 'multi_select' | 'url' | 'checkbox';

interface NotionFieldDefinition {
  name: string;
  type: NotionPropertyType;
  required: boolean;
  description: string;
}

/** Single source of truth for every case-sensitive Notion property name and type. */
export const NOTION_SCHEMA = {
  title: { name: 'Title', type: 'title', required: true, description: 'Resource name' },
  type: { name: 'Type', type: 'select', required: true, description: 'Agent or Chat Link' },
  description: { name: 'Description', type: 'rich_text', required: false, description: 'Short resource description' },
  categories: { name: 'Categories', type: 'multi_select', required: false, description: 'One or more categories' },
  tags: { name: 'Tags', type: 'multi_select', required: false, description: 'One or more searchable tags' },
  url: { name: 'Url', type: 'url', required: false, description: 'Required for Chat Link; optional for Agent' },
  promptText: { name: 'PromptText', type: 'rich_text', required: false, description: 'Agent system prompt or context' },
  model: { name: 'Model', type: 'select', required: false, description: 'Associated AI model' },
  isPopular: { name: 'IsPopular', type: 'checkbox', required: false, description: 'Popular or frequently used flag' },
} as const satisfies Record<string, NotionFieldDefinition>;

export const NOTION_PROPS = {
  title: NOTION_SCHEMA.title.name,
  type: NOTION_SCHEMA.type.name,
  description: NOTION_SCHEMA.description.name,
  categories: NOTION_SCHEMA.categories.name,
  tags: NOTION_SCHEMA.tags.name,
  url: NOTION_SCHEMA.url.name,
  promptText: NOTION_SCHEMA.promptText.name,
  model: NOTION_SCHEMA.model.name,
  isPopular: NOTION_SCHEMA.isPopular.name,
} as const;

export const NOTION_FIELDS = Object.values(NOTION_SCHEMA);
