import { useState } from 'react';

import { createResource } from '@/lib/notion';
import type { Resource, CreateResourceInput } from '@/types/resource';

interface UseCreateResourceReturn {
  create: (input: CreateResourceInput) => Promise<Resource | null>;
  loading: boolean;
  error: string | null;
}

export function useCreateResource(): UseCreateResourceReturn {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = async (input: CreateResourceInput): Promise<Resource | null> => {
    setLoading(true);
    setError(null);
    try {
      const resource = await createResource(input);
      return resource;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save resource. Check your Notion API key and try again.');
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { create, loading, error };
}
