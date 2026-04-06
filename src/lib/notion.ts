import type { Resource, CreateResourceInput, UpdateResourceInput } from '@/types/resource';
import type { NotionPage, NotionQueryResponse } from '@/types/notion';
import { extractPlainText } from '@/lib/utils';

// In dev, Vite proxies /notion-api → https://api.notion.com to avoid CORS issues.
// In production (Vercel), Notion API supports CORS from browser directly.
const NOTION_API_BASE = import.meta.env.DEV
  ? '/notion-api/v1'
  : 'https://api.notion.com/v1';

const NOTION_VERSION = '2022-06-28';

function getApiKey(): string {
  return import.meta.env.VITE_NOTION_API_KEY ?? '';
}

function getDatabaseId(): string {
  return import.meta.env.VITE_NOTION_DATABASE_ID ?? '';
}

function notionHeaders(): HeadersInit {
  return {
    Authorization: `Bearer ${getApiKey()}`,
    'Notion-Version': NOTION_VERSION,
    'Content-Type': 'application/json',
  };
}

function transformPage(page: NotionPage): Resource {
  // Use a loosely-typed alias so we can safely access any property name
  // (Notion property names are case-sensitive and may differ from the schema)
  const p = page.properties as Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any

  // Helper: first matching property key from a list of candidates
  function prop(keys: string[]) {
    for (const k of keys) if (p[k] !== undefined) return p[k];
    return undefined;
  }

  const titleProp = prop(['Title', 'title', 'Name', 'name']);
  const typeProp  = prop(['Type', 'type']);
  const descProp  = prop(['Description', 'description']);
  const catProp   = prop(['Categories', 'categories', 'Category', 'category']);
  const tagProp   = prop(['Tags', 'tags', 'Tag', 'tag']);
  const urlProp   = prop(['URL', 'url', 'Url', 'Link', 'link']);
  const promptProp = prop(['Prompt Text', 'prompt_text', 'PromptText', 'Prompt', 'prompt']);
  const modelProp  = prop(['Model', 'model']);
  const popularProp = prop(['IsPopular', 'Is Popular', 'is_popular', 'Popular', 'popular']);

  return {
    id: page.id,
    title: titleProp?.title ? extractPlainText(titleProp.title) : (titleProp?.rich_text ? extractPlainText(titleProp.rich_text) : 'Untitled'),
    type: (typeProp?.select?.name ?? 'Prompt') as Resource['type'],
    description: descProp?.rich_text ? extractPlainText(descProp.rich_text) : '',
    categories: catProp?.multi_select?.map((c: { name: string }) => c.name) ?? [],
    tags: tagProp?.multi_select?.map((t: { name: string }) => t.name) ?? [],
    url: urlProp?.url ?? undefined,
    promptText: promptProp?.rich_text ? (extractPlainText(promptProp.rich_text) || undefined) : undefined,
    model: modelProp?.select?.name ?? undefined,
    isPopular: popularProp?.checkbox ?? false,
    createdAt: page.created_time,
    lastEditedAt: page.last_edited_time,
  };
}

export async function queryResources(): Promise<Resource[]> {
  const res = await fetch(`${NOTION_API_BASE}/databases/${getDatabaseId()}/query`, {
    method: 'POST',
    headers: notionHeaders(),
    body: JSON.stringify({}),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(`Notion API error: ${err.message ?? res.statusText}`);
  }

  const data: NotionQueryResponse = await res.json();
  return data.results.filter((p) => !p.archived).map(transformPage);
}

export async function createResource(input: CreateResourceInput): Promise<Resource> {
  const properties: Record<string, unknown> = {
    Title: { title: [{ text: { content: input.title } }] },
    Type: { select: { name: input.type } },
    Description: { rich_text: [{ text: { content: input.description ?? '' } }] },
    Categories: { multi_select: (input.categories ?? []).map((name) => ({ name })) },
    Tags: { multi_select: (input.tags ?? []).map((name) => ({ name })) },
  };

  if (input.isPopular !== undefined) properties['IsPopular'] = { checkbox: input.isPopular };
  if (input.url) properties['URL'] = { url: input.url };
  if (input.promptText) properties['Prompt Text'] = { rich_text: [{ text: { content: input.promptText } }] };
  if (input.model) properties['Model'] = { select: { name: input.model } };

  const res = await fetch(`${NOTION_API_BASE}/pages`, {
    method: 'POST',
    headers: notionHeaders(),
    body: JSON.stringify({ parent: { database_id: getDatabaseId() }, properties }),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(`Notion API error: ${err.message ?? res.statusText}`);
  }

  const page: NotionPage = await res.json();
  return transformPage(page);
}

export async function updateResource(input: UpdateResourceInput): Promise<Resource> {
  const properties: Record<string, unknown> = {};

  if (input.title !== undefined) properties['Title'] = { title: [{ text: { content: input.title } }] };
  if (input.type !== undefined) properties['Type'] = { select: { name: input.type } };
  if (input.description !== undefined) properties['Description'] = { rich_text: [{ text: { content: input.description } }] };
  if (input.categories !== undefined) properties['Categories'] = { multi_select: input.categories.map((name) => ({ name })) };
  if (input.tags !== undefined) properties['Tags'] = { multi_select: input.tags.map((name) => ({ name })) };
  if (input.url !== undefined) properties['URL'] = { url: input.url };
  if (input.promptText !== undefined) properties['Prompt Text'] = { rich_text: [{ text: { content: input.promptText } }] };
  if (input.model !== undefined) properties['Model'] = { select: { name: input.model } };
  if (input.isPopular !== undefined) properties['IsPopular'] = { checkbox: input.isPopular };

  const res = await fetch(`${NOTION_API_BASE}/pages/${input.id}`, {
    method: 'PATCH',
    headers: notionHeaders(),
    body: JSON.stringify({ properties }),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(`Notion API error: ${err.message ?? res.statusText}`);
  }

  const page: NotionPage = await res.json();
  return transformPage(page);
}

export async function deleteResource(id: string): Promise<void> {
  const res = await fetch(`${NOTION_API_BASE}/pages/${id}`, {
    method: 'PATCH',
    headers: notionHeaders(),
    body: JSON.stringify({ archived: true }),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(`Notion API error: ${err.message ?? res.statusText}`);
  }
}
