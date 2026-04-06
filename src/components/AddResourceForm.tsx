import { useState } from 'react';

import { Loader2 } from 'lucide-react';

import { DEFAULT_CATEGORIES, MODEL_OPTIONS, RESOURCE_TYPES } from '@/lib/constants';
import type { CreateResourceInput, ResourceType } from '@/types/resource';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { ImprovedMultiSelect } from '@/components/ui/improved-multi-select';

interface AddResourceFormProps {
  onSubmit: (input: CreateResourceInput) => Promise<void>;
  loading: boolean;
  error: string | null;
  onCancel: () => void;
}

const DEFAULT_FORM: CreateResourceInput = {
  title: '',
  type: 'Prompt',
  description: '',
  categories: [],
  tags: [],
  url: '',
  promptText: '',
  model: '',
  isPopular: false,
};

export function AddResourceForm({ onSubmit, loading, error, onCancel }: AddResourceFormProps) {
  const [form, setForm] = useState<CreateResourceInput>(DEFAULT_FORM);

  function set<K extends keyof CreateResourceInput>(key: K, value: CreateResourceInput[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title.trim()) return;
    await onSubmit({
      ...form,
      title: form.title.trim(),
      description: form.description?.trim() || undefined,
      url: form.url?.trim() || undefined,
      promptText: form.promptText?.trim() || undefined,
      model: form.model?.trim() || undefined,
    });
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {/* Title */}
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="title" className="text-slate-200">Title <span className="text-red-400">*</span></Label>
        <Input
          id="title"
          value={form.title}
          onChange={(e) => set('title', e.target.value)}
          placeholder="e.g. React debugging assistant"
          required
          className="bg-slate-900 border-slate-700 text-slate-50 placeholder:text-slate-500 focus-visible:ring-violet-500"
        />
      </div>

      {/* Type */}
      <div className="flex flex-col gap-1.5">
        <Label className="text-slate-200">Type <span className="text-red-400">*</span></Label>
        <div className="flex gap-2">
          {RESOURCE_TYPES.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => set('type', t as ResourceType)}
              className={`flex-1 py-2 text-sm rounded-md border transition-colors font-medium ${
                form.type === t
                  ? 'bg-violet-600 border-violet-500 text-white'
                  : 'bg-slate-900 border-slate-700 text-slate-400 hover:text-slate-200 hover:border-slate-600'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Description */}
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="description" className="text-slate-200">Description</Label>
        <Input
          id="description"
          value={form.description ?? ''}
          onChange={(e) => set('description', e.target.value)}
          placeholder="Brief description"
          className="bg-slate-900 border-slate-700 text-slate-50 placeholder:text-slate-500 focus-visible:ring-violet-500"
        />
      </div>

      {/* URL (Chat Link only) */}
      {form.type === 'Chat Link' && (
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="url" className="text-slate-200">URL</Label>
          <Input
            id="url"
            type="url"
            value={form.url ?? ''}
            onChange={(e) => set('url', e.target.value)}
            placeholder="https://chat.openai.com/..."
            className="bg-slate-900 border-slate-700 text-slate-50 placeholder:text-slate-500 focus-visible:ring-violet-500"
          />
        </div>
      )}

      {/* Prompt text (Prompt + Agent) */}
      {(form.type === 'Prompt' || form.type === 'Agent') && (
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="promptText" className="text-slate-200">
            {form.type === 'Agent' ? 'Agent Context' : 'Prompt Text'}
          </Label>
          <Textarea
            id="promptText"
            value={form.promptText ?? ''}
            onChange={(e) => set('promptText', e.target.value)}
            placeholder={form.type === 'Agent' ? 'You are a senior React developer...' : 'Write a...'}
            rows={4}
            className="bg-slate-900 border-slate-700 text-slate-50 placeholder:text-slate-500 focus-visible:ring-violet-500 resize-none font-mono text-sm"
          />
        </div>
      )}

      {/* Model */}
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="model" className="text-slate-200">Model</Label>
        <select
          id="model"
          value={form.model ?? ''}
          onChange={(e) => set('model', e.target.value)}
          className="bg-slate-900 border border-slate-700 text-slate-50 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
        >
          <option value="">Select model (optional)</option>
          {MODEL_OPTIONS.map((m) => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>
      </div>

      {/* Categories */}
      <div className="flex flex-col gap-1.5">
        <Label className="text-slate-200">Categories</Label>
        <ImprovedMultiSelect
          options={DEFAULT_CATEGORIES}
          value={form.categories ?? []}
          onChange={(v) => set('categories', v)}
          placeholder="Add categories..."
        />
      </div>

      {/* Tags */}
      <div className="flex flex-col gap-1.5">
        <Label className="text-slate-200">Tags</Label>
        <ImprovedMultiSelect
          options={[]}
          value={form.tags ?? []}
          onChange={(v) => set('tags', v)}
          placeholder="Add tags..."
        />
      </div>

      {/* Is Popular */}
      <div className="flex items-center gap-2">
        <Checkbox
          id="isPopular"
          checked={form.isPopular ?? false}
          onCheckedChange={(checked) => set('isPopular', !!checked)}
          className="border-slate-600"
        />
        <Label htmlFor="isPopular" className="text-slate-300 cursor-pointer">Mark as popular</Label>
      </div>

      {/* Error */}
      {error && <p className="text-red-400 text-sm">{error}</p>}

      {/* Actions */}
      <div className="flex gap-2 justify-end pt-2">
        <Button type="button" variant="ghost" onClick={onCancel} disabled={loading} className="text-slate-400 hover:text-slate-200">
          Cancel
        </Button>
        <Button type="submit" disabled={loading || !form.title.trim()} className="bg-violet-600 hover:bg-violet-500 text-white gap-2">
          {loading && <Loader2 className="h-4 w-4 animate-spin" />}
          {loading ? 'Saving...' : 'Add Resource'}
        </Button>
      </div>
    </form>
  );
}
