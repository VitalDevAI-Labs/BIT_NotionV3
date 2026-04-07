import { useState } from 'react';

import { updateResource } from '@/lib/notion';
import type { Resource, UpdateResourceInput } from '@/types/resource';

interface UseUpdateResourceReturn {
  update: (input: UpdateResourceInput) => Promise<Resource | null>;
  loading: boolean;
  error: string | null;
}

export function useUpdateResource(): UseUpdateResourceReturn {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const update = async (input: UpdateResourceInput): Promise<Resource | null> => {
    setLoading(true);
    setError(null);
    try {
      const resource = await updateResource(input);
      return resource;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update resource. Check your Notion API key and try again.');
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { update, loading, error };
}
