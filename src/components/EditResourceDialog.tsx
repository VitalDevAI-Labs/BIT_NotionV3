import type { Resource, CreateResourceInput } from '@/types/resource';
import { useUpdateResource } from '@/hooks/useUpdateResource';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { AddResourceForm } from '@/components/AddResourceForm';

interface EditResourceDialogProps {
  open: boolean;
  resource: Resource | null;
  onOpenChange: (open: boolean) => void;
  onUpdated: (resource: Resource) => void;
  availableCategories?: string[];
  availableTags?: string[];
}

export function EditResourceDialog({ open, resource, onOpenChange, onUpdated, availableCategories, availableTags }: EditResourceDialogProps) {
  const { update, loading, error } = useUpdateResource();

  async function handleSubmit(input: CreateResourceInput) {
    if (!resource) return;
    const updated = await update({
      id: resource.id,
      ...input,
    });
    if (updated) {
      onUpdated(updated);
      onOpenChange(false);
    }
  }

  const initialValues = resource ? {
    title: resource.title,
    type: resource.type,
    description: resource.description,
    categories: resource.categories,
    tags: resource.tags,
    url: resource.url,
    promptText: resource.promptText,
    model: resource.model,
    isPopular: resource.isPopular,
  } : undefined;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-slate-800 border border-slate-700 text-slate-50 max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-slate-50 text-lg font-semibold">Edit Resource</DialogTitle>
        </DialogHeader>
        {resource && (
          <AddResourceForm
            onSubmit={handleSubmit}
            loading={loading}
            error={error}
            onCancel={() => onOpenChange(false)}
            initialValues={initialValues}
            submitLabel="Save Changes"
            availableCategories={availableCategories}
            availableTags={availableTags}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
