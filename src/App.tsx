import { useState } from 'react';
import { Toaster } from 'sonner';
import type { Resource } from '@/types/resource';
import { TopNav } from '@/components/new/TopNav';
import { DirectoryPage } from '@/pages/DirectoryPage';
import { SettingsPage } from '@/pages/SettingsPage';
import { AddResourceDialog } from '@/components/AddResourceDialog';
import { EditResourceDialog } from '@/components/EditResourceDialog';
import { DeleteConfirmDialog } from '@/components/DeleteConfirmDialog';

type Page = 'directory' | 'settings';

export function App() {
  const [page, setPage] = useState<Page>('directory');
  const [searchQuery, setSearchQuery] = useState('');

  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editResource, setEditResource] = useState<Resource | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteResource, setDeleteResource] = useState<Resource | null>(null);

  function handleCreated(_resource: Resource) {
    setAddDialogOpen(false);
  }

  function handleUpdated(_resource: Resource) {
    setEditDialogOpen(false);
  }

  function handleDeleted(_id: string) {
    setDeleteDialogOpen(false);
  }

  return (
    <div className="min-h-screen" style={{ background: '#07070A' }}>
      <TopNav
        onAddClick={() => setAddDialogOpen(true)}
        onSettingsClick={() => setPage(page === 'settings' ? 'directory' : 'settings')}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {page === 'directory' && (
        <DirectoryPage
          onAddClick={() => setAddDialogOpen(true)}
          onEditClick={(r) => { setEditResource(r); setEditDialogOpen(true); }}
          onDeleteClick={(r) => { setDeleteResource(r); setDeleteDialogOpen(true); }}
          searchQuery={searchQuery}
        />
      )}

      {page === 'settings' && <SettingsPage />}

      {/* Footer */}
      <footer className="border-t py-7 text-center" style={{ borderColor: '#1F2024' }}>
        <p className="text-sm" style={{ color: '#9A9BA0' }}>© 2026 AgentOS Platform. All rights reserved.</p>
      </footer>

      {/* Dialogs (wired to existing hooks — swap in real data later) */}
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
