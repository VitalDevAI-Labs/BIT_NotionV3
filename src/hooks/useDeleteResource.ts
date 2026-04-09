import { useState } from 'react';

import { deleteResource } from '@/lib/notion';

interface UseDeleteResourceReturn {
  delete: (id: string) => Promise<boolean>;
  loading: boolean;
  error: string | null;
}

export function useDeleteResource(): UseDeleteResourceReturn {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteResourceFn = async (id: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      await deleteResource(id);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete resource. Try again.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { delete: deleteResourceFn, loading, error };
}
