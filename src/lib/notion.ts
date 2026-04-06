import type { Resource, CreateResourceInput, UpdateResourceInput } from '@/types/resource';
import type { NotionPage, NotionQueryResponse } from '@/types/notion';
import { extractPlainText } from '@/lib/utils';

const NOTION_API_BASE = 'https://api.notion.com/v1';
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
  const p = page.properties;
  return {
    id: page.id,
    title: extractPlainText(p.Title.title),
    type: (p.Type.select?.name ?? 'Prompt') as Resource['type'],
    description: extractPlainText(p.Description.rich_text),
    categories: p.Categories.multi_select.map((c) => c.name),
    tags: p.Tags.multi_select.map((t) => t.name),
    url: p.URL.url ?? undefined,
    promptText: extractPlainText(p['Prompt Text'].rich_text) || undefined,
    model: p.Model.select?.name ?? undefined,
    isPopular: p['Is Popular'].checkbox,
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
    'Is Popular': { checkbox: input.isPopular ?? false },
  };

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
  if (input.isPopular !== undefined) properties['Is Popular'] = { checkbox: input.isPopular };

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
