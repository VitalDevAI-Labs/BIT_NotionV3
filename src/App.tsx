import { useState, useMemo, useRef, useEffect } from 'react';

import { Toaster, toast } from 'sonner';

import type { FilterType, Resource } from '@/types/resource';
import { useNotionResources } from '@/hooks/useNotionResources';
import { hasCredentials } from '@/lib/notion';
import { Header } from '@/components/Header';
import { FilterBar } from '@/components/FilterBar';
import { ResourceGrid } from '@/components/ResourceGrid';
import { AddResourceDialog } from '@/components/AddResourceDialog';
import { EditResourceDialog } from '@/components/EditResourceDialog';
import { DeleteConfirmDialog } from '@/components/DeleteConfirmDialog';
import { ConfigDialog } from '@/components/ConfigDialog';

export function App() {
  const { resources, loading, error, refetch } = useNotionResources();
  const searchRef = useRef<HTMLInputElement>(null);

  // Filter state
  const [activeFilter, setActiveFilter] = useState<FilterType>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [tagQuery, setTagQuery] = useState('');
  const [popularOnly, setPopularOnly] = useState(false);

  // Config dialog — auto-opens if no credentials found
  const [configOpen, setConfigOpen] = useState(() => !hasCredentials());

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

  // Derive available categories dynamically from resources
  const availableCategories = useMemo(
    () => Array.from(new Set(allResources.flatMap((r) => r.categories))).sort(),
    [allResources],
  );

  // Derive available tags dynamically from resources
  const availableTags = useMemo(
    () => Array.from(new Set(allResources.flatMap((r) => r.tags))).sort(),
    [allResources],
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

    // Tag filter (text search)
    if (tagQuery.trim()) {
      const q = tagQuery.toLowerCase();
      result = result.filter((r) =>
        r.tags.some((t) => t.toLowerCase().includes(q)),
      );
    }

    // Popular filter
    if (popularOnly) {
      result = result.filter((r) => r.isPopular);
    }

    return result;
  }, [allResources, activeFilter, searchQuery, selectedCategories, tagQuery, popularOnly]);

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

  // Ctrl+K to focus search
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        searchRef.current?.focus();
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-50">
      <div className="max-w-7xl mx-auto px-6 space-y-6 py-6">
        <Header
          onAddClick={() => setAddDialogOpen(true)}
          onConfigClick={() => setConfigOpen(true)}
          resourceCount={allResources.length}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          searchRef={searchRef}
        />

        <FilterBar
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          selectedCategories={selectedCategories}
          onCategoriesChange={setSelectedCategories}
          tagQuery={tagQuery}
          onTagQueryChange={setTagQuery}
          popularOnly={popularOnly}
          onPopularChange={setPopularOnly}
          availableCategories={availableCategories}
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
        availableCategories={availableCategories}
        availableTags={availableTags}
      />

      <EditResourceDialog
        open={editDialogOpen}
        resource={editResource}
        onOpenChange={setEditDialogOpen}
        onUpdated={handleUpdated}
        availableCategories={availableCategories}
        availableTags={availableTags}
      />

      <DeleteConfirmDialog
        open={deleteDialogOpen}
        resource={deleteResource}
        onOpenChange={setDeleteDialogOpen}
        onDeleted={handleDeleted}
      />

      <ConfigDialog
        open={configOpen}
        onOpenChange={setConfigOpen}
        onSaved={refetch}
      />

      <Toaster position="bottom-right" />
    </div>
  );
}
