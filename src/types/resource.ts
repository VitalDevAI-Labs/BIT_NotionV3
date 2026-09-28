export type ResourceType = 'Chat Link' | 'Agent';
export type FilterType = 'All' | 'Agent' | 'Chat Link';

export interface Resource {
  id: string;
  title: string;
  type: ResourceType;
  description: string;
  categories: string[];
  tags: string[];
  url?: string;
  promptText?: string;
  model?: string;
  isPopular: boolean;
  createdAt: string;
  lastEditedAt: string;
}

export interface CreateResourceInput {
  title: string;
  type: ResourceType;
  description?: string;
  categories?: string[];
  tags?: string[];
  url?: string;
  promptText?: string;
  model?: string;
  isPopular?: boolean;
}

export interface UpdateResourceInput extends Partial<CreateResourceInput> {
  id: string;
}
