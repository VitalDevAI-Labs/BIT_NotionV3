import { Loader2 } from 'lucide-react';

import type { Resource } from '@/types/resource';
import { ResourceCard } from '@/components/ResourceCard';

interface ResourceGridProps {
  resources: Resource[];
  loading: boolean;
  error: string | null;
  searchQuery: string;
  onEdit: (resource: Resource) => void;
  onDelete: (resource: Resource) => void;
}

export function ResourceGrid({ resources, loading, error, searchQuery, onEdit, onDelete }: ResourceGridProps) {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-24 text-slate-400">
        <Loader2 className="h-6 w-6 animate-spin mr-3" />
        Loading resources...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-24">
        <p className="text-red-400 text-sm max-w-md text-center">{error}</p>
      </div>
    );
  }

  if (resources.length === 0) {
    const message = searchQuery
      ? `No results for "${searchQuery}". Try a different search or clear filters.`
      : 'No resources yet. Add your first prompt, chat link, or agent context.';
    return (
      <div className="flex items-center justify-center py-24">
        <p className="text-slate-400 text-sm text-center max-w-md">{message}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {resources.map((resource) => (
        <ResourceCard key={resource.id} resource={resource} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  );
}
