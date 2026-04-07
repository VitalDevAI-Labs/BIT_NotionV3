import { useState, useMemo } from 'react';

import { Toaster, toast } from 'sonner';

import type { FilterType, Resource } from '@/types/resource';
import { useNotionResources } from '@/hooks/useNotionResources';
import { Header } from '@/components/Header';
import { FilterBar } from '@/components/FilterBar';
import { ResourceGrid } from '@/components/ResourceGrid';
import { AddResourceDialog } from '@/components/AddResourceDialog';
import { EditResourceDialog } from '@/components/EditResourceDialog';
import { DeleteConfirmDialog } from '@/components/DeleteConfirmDialog';

export function App() {
  const { resources, loading, error, refetch } = useNotionResources();

  // Filter state
  const [activeFilter, setActiveFilter] = useState<FilterType>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedModel, setSelectedModel] = useState('');
  const [popularOnly, setPopularOnly] = useState(false);

  // Dialog state
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editResource, setEditResource] = useState<Resource | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteResource, setDeleteResource] = useState<Resource | null>(null);

  // Optimistic updates
  const [optimisticResources, setOptimisticResources] = useState<Resource[]>([]);

  const allResources = useMemo(
    () => [...optimisticResources, ...resources],
    [optimisticResources, resources],
  );

  // Combined filter logic
  const filtered = useMemo(() => {
    let result = allResources;

    // Type filter
    if (activeFilter !== 'All') {
      result = result.filter((r) => r.type === activeFilter);
    }

    // Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (r) =>
          r.title.toLowerCase().includes(q) ||
          r.description.toLowerCase().includes(q),
      );
    }

    // Category filter
    if (selectedCategories.length > 0) {
      result = result.filter((r) =>
        selectedCategories.some((c) => r.categories.includes(c)),
      );
    }

    // Tag filter
    if (selectedTags.length > 0) {
      result = result.filter((r) =>
        selectedTags.some((t) => r.tags.includes(t)),
      );
    }

    // Model filter
    if (selectedModel) {
      result = result.filter((r) => r.model === selectedModel);
    }

    // Popular filter
    if (popularOnly) {
      result = result.filter((r) => r.isPopular);
    }

    return result;
  }, [allResources, activeFilter, searchQuery, selectedCategories, selectedTags, selectedModel, popularOnly]);

  // Handlers
  function handleCreated(resource: Resource) {
    setOptimisticResources((prev) => [resource, ...prev]);
    setAddDialogOpen(false);
    toast.success('Resource saved');
    refetch();
  }

  function handleEditClick(resource: Resource) {
    setEditResource(resource);
    setEditDialogOpen(true);
  }

  function handleUpdated(resource: Resource) {
    setOptimisticResources((prev) =>
      prev.map((r) => (r.id === resource.id ? resource : r)),
    );
    setEditDialogOpen(false);
    toast.success('Resource updated');
    refetch();
  }

  function handleDeleteClick(resource: Resource) {
    setDeleteResource(resource);
    setDeleteDialogOpen(true);
  }

  function handleDeleted(resourceId: string) {
    setOptimisticResources((prev) => prev.filter((r) => r.id !== resourceId));
    setDeleteDialogOpen(false);
    toast.success('Resource deleted');
    refetch();
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-50">
      <div className="max-w-7xl mx-auto px-6 space-y-6 py-6">
        <Header onAddClick={() => setAddDialogOpen(true)} resourceCount={allResources.length} />

        <FilterBar
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedCategories={selectedCategories}
          onCategoriesChange={setSelectedCategories}
          selectedTags={selectedTags}
          onTagsChange={setSelectedTags}
          selectedModel={selectedModel}
          onModelChange={setSelectedModel}
          popularOnly={popularOnly}
          onPopularChange={setPopularOnly}
          resources={resources}
        />

        <ResourceGrid
          resources={filtered}
          loading={loading}
          error={error}
          searchQuery={searchQuery}
          onEdit={handleEditClick}
          onDelete={handleDeleteClick}
        />
      </div>

      {/* Dialogs */}
      <AddResourceDialog
        open={addDialogOpen}
        onOpenChange={setAddDialogOpen}
        onCreated={handleCreated}
      />

      <EditResourceDialog
        open={editDialogOpen}
        resource={editResource}
        onOpenChange={setEditDialogOpen}
        onUpdated={handleUpdated}
      />

      <DeleteConfirmDialog
        open={deleteDialogOpen}
        resource={deleteResource}
        onOpenChange={setDeleteDialogOpen}
        onDeleted={handleDeleted}
      />

      <Toaster position="bottom-right" />
    </div>
  );
}
