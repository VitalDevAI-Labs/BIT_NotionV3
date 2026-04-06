import { useState, useMemo } from 'react';

import type { FilterType, Resource } from '@/types/resource';
import { useNotionResources } from '@/hooks/useNotionResources';
import { Header } from '@/components/Header';
import { FilterBar } from '@/components/FilterBar';
import { ResourceGrid } from '@/components/ResourceGrid';
import { AddResourceDialog } from '@/components/AddResourceDialog';

export function App() {
  const { resources, loading, error, refetch } = useNotionResources();
  const [activeFilter, setActiveFilter] = useState<FilterType>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [optimisticResources, setOptimisticResources] = useState<Resource[]>([]);

  const allResources = useMemo(
    () => [...optimisticResources, ...resources],
    [optimisticResources, resources],
  );

  const filtered = useMemo(() => {
    let result = allResources;

    if (activeFilter !== 'All') {
      result = result.filter((r) => r.type === activeFilter);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (r) =>
          r.title.toLowerCase().includes(q) ||
          r.description.toLowerCase().includes(q),
      );
    }

    return result;
  }, [allResources, activeFilter, searchQuery]);

  function handleCreated(resource: Resource) {
    setOptimisticResources((prev) => [resource, ...prev]);
    // Re-fetch in background to sync (removes optimistic duplicate by id)
    refetch();
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-50">
      <div className="max-w-7xl mx-auto px-6 space-y-6">
        <Header onAddClick={() => setDialogOpen(true)} resourceCount={allResources.length} />

        <FilterBar
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        <ResourceGrid
          resources={filtered}
          loading={loading}
          error={error}
          searchQuery={searchQuery}
        />
      </div>

      <AddResourceDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onCreated={handleCreated}
      />
    </div>
  );
}
