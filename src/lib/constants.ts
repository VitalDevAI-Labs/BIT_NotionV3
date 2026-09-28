import type { ResourceType, FilterType } from '@/types/resource';

export const RESOURCE_TYPES: ResourceType[] = ['Chat Link', 'Agent'];

export const FILTER_TYPES: FilterType[] = ['All', 'Chat Link', 'Agent'];

export const DEFAULT_CATEGORIES: string[] = [
  'Code Assistant',
  'Creative Writing',
  'Data Analysis',
  'English Expert',
  'Formatters',
  'General Experts',
  'Research',
  'Tools',
];

export const MODEL_OPTIONS: string[] = [
  'GPT-4',
  'GPT-4 Turbo',
  'GPT-3.5',
  'Claude Opus',
  'Claude Sonnet',
  'Claude Haiku',
  'Gemini Pro',
  'Gemini Ultra',
  'Perplexity',
  'Other',
];

export const TYPE_COLORS: Record<ResourceType, string> = {
  'Chat Link': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  'Agent': 'bg-violet-500/20 text-violet-400 border-violet-500/30',
};

export const TYPE_BORDER_ACCENT: Record<ResourceType, string> = {
  'Chat Link': 'border-l-blue-500',
  'Agent': 'border-l-violet-500',
};
