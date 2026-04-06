import { useState, useEffect, useCallback } from 'react';

import { queryResources } from '@/lib/notion';
import type { Resource } from '@/types/resource';

interface UseNotionResourcesReturn {
  resources: Resource[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useNotionResources(): UseNotionResourcesReturn {
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchResources = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await queryResources();
      setResources(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load resources.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchResources();
  }, [fetchResources]);

  return { resources, loading, error, refetch: fetchResources };
}
