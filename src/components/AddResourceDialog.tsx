import type { CreateResourceInput, Resource } from '@/types/resource';
import { useCreateResource } from '@/hooks/useCreateResource';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { AddResourceForm } from '@/components/AddResourceForm';

interface AddResourceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreated: (resource: Resource) => void;
}

export function AddResourceDialog({ open, onOpenChange, onCreated }: AddResourceDialogProps) {
  const { create, loading, error } = useCreateResource();

  async function handleSubmit(input: CreateResourceInput) {
    const resource = await create(input);
    if (resource) {
      onCreated(resource);
      onOpenChange(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-slate-800 border border-slate-700 text-slate-50 max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-slate-50 text-lg font-semibold">Add Resource</DialogTitle>
        </DialogHeader>
        <AddResourceForm
          onSubmit={handleSubmit}
          loading={loading}
          error={error}
          onCancel={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
