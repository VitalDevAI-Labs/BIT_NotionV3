import type { Resource } from '@/types/resource';
import { useDeleteResource } from '@/hooks/useDeleteResource';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface DeleteConfirmDialogProps {
  open: boolean;
  resource: Resource | null;
  onOpenChange: (open: boolean) => void;
  onDeleted: (resourceId: string) => void;
}

export function DeleteConfirmDialog({ open, resource, onOpenChange, onDeleted }: DeleteConfirmDialogProps) {
  const { delete: deleteResource, loading } = useDeleteResource();

  async function handleDelete() {
    if (!resource) return;
    const success = await deleteResource(resource.id);
    if (success) {
      onDeleted(resource.id);
      onOpenChange(false);
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="bg-slate-800 border border-slate-700 text-slate-50">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-slate-50">Delete Resource</AlertDialogTitle>
          <AlertDialogDescription className="text-slate-400">
            Are you sure you want to delete <span className="font-semibold text-slate-200">{resource?.title}</span>? This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="flex gap-2 justify-end">
          <AlertDialogCancel disabled={loading} className="bg-slate-700 text-slate-200 border-slate-600 hover:bg-slate-600">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={loading}
            className="bg-red-600 hover:bg-red-500 text-white"
          >
            {loading ? 'Deleting...' : 'Delete'}
          </AlertDialogAction>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
