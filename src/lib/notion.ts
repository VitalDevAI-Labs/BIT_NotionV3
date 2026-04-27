import type { Resource, CreateResourceInput, UpdateResourceInput } from '@/types/resource';
import type { NotionPage, NotionQueryResponse } from '@/types/notion';
import { extractPlainText } from '@/lib/utils';
import { NOTION_PROPS } from '@/lib/notion-schema';

// In dev, Vite proxies /notion-api → https://api.notion.com to avoid CORS issues.
// In production (Vercel), requests route through /api/notion-proxy serverless function.

const NOTION_VERSION = '2022-06-28';

const LS_API_KEY = 'notion_api_key';
const LS_DB_ID = 'notion_database_id';

function getApiKey(): string {
  return localStorage.getItem(LS_API_KEY) || import.meta.env.VITE_NOTION_API_KEY || '';
}

function getDatabaseId(): string {
  return localStorage.getItem(LS_DB_ID) || import.meta.env.VITE_NOTION_DATABASE_ID || '';
}

export function hasCredentials(): boolean {
  return !!(getApiKey() && getDatabaseId());
}

export function saveCredentials(apiKey: string, dbId: string): void {
  localStorage.setItem(LS_API_KEY, apiKey);
  localStorage.setItem(LS_DB_ID, dbId);
}

function notionHeaders(): HeadersInit {
  return {
    Authorization: `Bearer ${getApiKey()}`,
    'Notion-Version': NOTION_VERSION,
    'Content-Type': 'application/json',
  };
}

async function notionFetch(notionPath: string, method: string, body?: unknown): Promise<Response> {
  if (import.meta.env.DEV) {
    return fetch(`/notion-api/v1${notionPath}`, {
      method,
      headers: notionHeaders(),
      body: body ? JSON.stringify(body) : undefined,
    });
  } else {
    return fetch('/api/notion-proxy', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        apiKey: getApiKey(),
        notionPath,
        method,
        body,
      }),
    });
  }
}

function transformPage(page: NotionPage): Resource {
  const p = page.properties as Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any

  const titleProp = p[NOTION_PROPS.title];
  const typeProp = p[NOTION_PROPS.type];
  const descProp = p[NOTION_PROPS.description];
  const catProp = p[NOTION_PROPS.categories];
  const tagProp = p[NOTION_PROPS.tags];
  const urlProp = p[NOTION_PROPS.url];
  const promptProp = p[NOTION_PROPS.promptText];
  const modelProp = p[NOTION_PROPS.model];
  const popularProp = p[NOTION_PROPS.isPopular];

  return {
    id: page.id,
    title: titleProp?.title ? extractPlainText(titleProp.title) : 'Untitled',
    type: (typeProp?.select?.name === 'Prompt' ? 'Agent' : (typeProp?.select?.name ?? 'Agent')) as Resource['type'],
    description: descProp?.rich_text ? extractPlainText(descProp.rich_text) : '',
    categories: catProp?.select?.name ? [catProp.select.name] : [],
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
  const res = await notionFetch(`/databases/${getDatabaseId()}/query`, 'POST', {});

  if (!res.ok) {
    const err = await res.json();
    throw new Error(`Notion API error: ${err.message ?? res.statusText}`);
  }

  const data: NotionQueryResponse = await res.json();
  return data.results.filter((p) => !p.archived).map(transformPage);
}

export async function createResource(input: CreateResourceInput): Promise<Resource> {
  const firstCategory = input.categories?.[0];
  const properties: Record<string, unknown> = {
    [NOTION_PROPS.title]: { title: [{ text: { content: input.title } }] },
    [NOTION_PROPS.type]: { select: { name: input.type } },
    [NOTION_PROPS.description]: { rich_text: [{ text: { content: input.description ?? '' } }] },
    [NOTION_PROPS.categories]: firstCategory ? { select: { name: firstCategory } } : { select: null },
    [NOTION_PROPS.tags]: { multi_select: (input.tags ?? []).map((name) => ({ name })) },
  };

  if (input.isPopular !== undefined) properties[NOTION_PROPS.isPopular] = { checkbox: input.isPopular };
  if (input.url) properties[NOTION_PROPS.url] = { url: input.url };
  if (input.promptText) properties[NOTION_PROPS.promptText] = { rich_text: [{ text: { content: input.promptText } }] };
  if (input.model) properties[NOTION_PROPS.model] = { select: { name: input.model } };

  const res = await notionFetch('/pages', 'POST', {
    parent: { database_id: getDatabaseId() },
    properties,
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

  if (input.title !== undefined) properties[NOTION_PROPS.title] = { title: [{ text: { content: input.title } }] };
  if (input.type !== undefined) properties[NOTION_PROPS.type] = { select: { name: input.type } };
  if (input.description !== undefined) properties[NOTION_PROPS.description] = { rich_text: [{ text: { content: input.description } }] };
  if (input.categories !== undefined) {
    const firstCategory = input.categories[0];
    properties[NOTION_PROPS.categories] = firstCategory ? { select: { name: firstCategory } } : { select: null };
  }
  if (input.tags !== undefined) properties[NOTION_PROPS.tags] = { multi_select: input.tags.map((name) => ({ name })) };
  if (input.url !== undefined) properties[NOTION_PROPS.url] = { url: input.url };
  if (input.promptText !== undefined) properties[NOTION_PROPS.promptText] = { rich_text: [{ text: { content: input.promptText } }] };
  if (input.model !== undefined) properties[NOTION_PROPS.model] = { select: { name: input.model } };
  if (input.isPopular !== undefined) properties[NOTION_PROPS.isPopular] = { checkbox: input.isPopular };

  const res = await notionFetch(`/pages/${input.id}`, 'PATCH', { properties });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(`Notion API error: ${err.message ?? res.statusText}`);
  }

  const page: NotionPage = await res.json();
  return transformPage(page);
}

export async function deleteResource(id: string): Promise<void> {
  const res = await notionFetch(`/pages/${id}`, 'PATCH', { archived: true });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(`Notion API error: ${err.message ?? res.statusText}`);
  }
}
