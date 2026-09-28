import { useEffect, useState } from 'react';
import { Toaster, toast } from 'sonner';
import type { Resource } from '@/types/resource';
import { hasCredentials } from '@/lib/notion';
import { TopNav } from '@/components/new/TopNav';
import { DirectoryPage } from '@/pages/DirectoryPage';
import { AgentDetailPage } from '@/pages/AgentDetailPage';
import { SettingsPage } from '@/pages/SettingsPage';
import { AddResourceDialog } from '@/components/AddResourceDialog';
import { EditResourceDialog } from '@/components/EditResourceDialog';
import { DeleteConfirmDialog } from '@/components/DeleteConfirmDialog';

type Page = 'directory' | 'detail' | 'settings';

export function App() {
  const [page, setPage] = useState<Page>(() => hasCredentials() ? 'directory' : 'settings');
  const [detailResource, setDetailResource] = useState<Resource | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editResource, setEditResource] = useState<Resource | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteResource, setDeleteResource] = useState<Resource | null>(null);

  const [refetchTrigger, setRefetchTrigger] = useState(0);
  function triggerRefetch() { setRefetchTrigger((n) => n + 1); }

  useEffect(() => {
    const homeState = { agentOsPage: 'directory' };
    window.history.replaceState(homeState, '');
    window.history.pushState(homeState, '');

    function handlePopState() {
      setPage('directory');
      setDetailResource(null);
      setMobileSearchOpen(false);
      setAddDialogOpen(false);
      setEditDialogOpen(false);
      setDeleteDialogOpen(false);
      window.history.pushState(homeState, '');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  function navigateTo(nextPage: Exclude<Page, 'directory'>) {
    window.history.pushState({ agentOsPage: nextPage }, '');
    setPage(nextPage);
  }

  function goHome() {
    setPage('directory');
    setDetailResource(null);
    setMobileSearchOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function handleViewClick(r: Resource) {
    setDetailResource(r);
    navigateTo('detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function handleCreated(resource: Resource) {
    setAddDialogOpen(false);
    toast.success(`"${resource.title}" saved`);
    triggerRefetch();
  }

  function handleUpdated(resource: Resource) {
    setEditDialogOpen(false);
    toast.success(`"${resource.title}" updated`);
    // If we're on the detail page, refresh the resource shown
    if (page === 'detail' && detailResource?.id === resource.id) {
      setDetailResource(resource);
    }
    triggerRefetch();
  }

  function handleDeleted() {
    setDeleteDialogOpen(false);
    // Navigate back to directory after delete
    goHome();
    setDetailResource(null);
    triggerRefetch();
  }

  function handleEditClick(r: Resource) {
    setEditResource(r);
    setEditDialogOpen(true);
  }

  function handleDeleteClick(r: Resource) {
    setDeleteResource(r);
    setDeleteDialogOpen(true);
  }

  function handleSettingsClick() {
    if (page === 'settings') goHome();
    else navigateTo('settings');
  }

  return (
    <div className="min-h-screen" style={{ background: '#07070A' }}>
      <TopNav
        onAddClick={() => setAddDialogOpen(true)}
        onSettingsClick={handleSettingsClick}
        searchQuery={searchQuery}
        mobileSearchOpen={mobileSearchOpen}
        onMobileSearchOpenChange={setMobileSearchOpen}
          onSearchChange={(q) => {
          setSearchQuery(q);
          // Jump back to directory when searching from detail page
          if (page === 'detail') goHome();
        }}
      />

      {page === 'directory' && (
        <DirectoryPage
          onAddClick={() => setAddDialogOpen(true)}
          onViewClick={handleViewClick}
          onEditClick={handleEditClick}
          onDeleteClick={handleDeleteClick}
          searchQuery={searchQuery}
          refetchTrigger={refetchTrigger}
          onSearchClick={() => setMobileSearchOpen(true)}
        />
      )}

      {page === 'detail' && detailResource && (
        <AgentDetailPage
          resource={detailResource}
          onBack={goHome}
          onEdit={handleEditClick}
          onDelete={handleDeleteClick}
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
