import { useState } from 'react';
import { Toaster, toast } from 'sonner';
import type { Resource } from '@/types/resource';
import { hasCredentials } from '@/lib/notion';
import { TopNav } from '@/components/new/TopNav';
import { DirectoryPage } from '@/pages/DirectoryPage';
import { SettingsPage } from '@/pages/SettingsPage';
import { AddResourceDialog } from '@/components/AddResourceDialog';
import { EditResourceDialog } from '@/components/EditResourceDialog';
import { DeleteConfirmDialog } from '@/components/DeleteConfirmDialog';

type Page = 'directory' | 'settings';

export function App() {
  // Auto-open settings if no credentials yet
  const [page, setPage] = useState<Page>(() => hasCredentials() ? 'directory' : 'settings');
  const [searchQuery, setSearchQuery] = useState('');

  // Dialogs
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editResource, setEditResource] = useState<Resource | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteResource, setDeleteResource] = useState<Resource | null>(null);

  // Increment to signal DirectoryPage to refetch after any mutation
  const [refetchTrigger, setRefetchTrigger] = useState(0);
  function triggerRefetch() { setRefetchTrigger((n) => n + 1); }

  function handleCreated(resource: Resource) {
    setAddDialogOpen(false);
    toast.success(`"${resource.title}" saved`);
    triggerRefetch();
  }

  function handleUpdated(resource: Resource) {
    setEditDialogOpen(false);
    toast.success(`"${resource.title}" updated`);
    triggerRefetch();
  }

  function handleDeleted(_id: string) {
    setDeleteDialogOpen(false);
    triggerRefetch();
  }

  function handleSettingsClick() {
    setPage((p) => p === 'settings' ? 'directory' : 'settings');
  }

  return (
    <div className="min-h-screen" style={{ background: '#07070A' }}>
      <TopNav
        onAddClick={() => setAddDialogOpen(true)}
        onSettingsClick={handleSettingsClick}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {page === 'directory' && (
        <DirectoryPage
          onAddClick={() => setAddDialogOpen(true)}
          onEditClick={(r) => { setEditResource(r); setEditDialogOpen(true); }}
          onDeleteClick={(r) => { setDeleteResource(r); setDeleteDialogOpen(true); }}
          searchQuery={searchQuery}
          refetchTrigger={refetchTrigger}
        />
      )}

      {page === 'settings' && <SettingsPage />}

      <footer className="border-t py-7 text-center" style={{ borderColor: '#1F2024' }}>
        <p className="text-sm" style={{ color: '#9A9BA0' }}>© 2026 AgentOS Platform. All rights reserved.</p>
      </footer>

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
