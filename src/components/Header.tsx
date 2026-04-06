import { Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';

interface HeaderProps {
  onAddClick: () => void;
  resourceCount: number;
}

export function Header({ onAddClick, resourceCount }: HeaderProps) {
  return (
    <header className="flex items-center justify-between py-5">
      <div className="flex items-center gap-3">
        <h1 className="text-2xl font-bold text-violet-400 tracking-tight">AI Bridge</h1>
        {resourceCount > 0 && (
          <span className="text-sm text-slate-500">{resourceCount} resources</span>
        )}
      </div>
      <Button onClick={onAddClick} className="gap-2 bg-violet-600 hover:bg-violet-500 text-white">
        <Plus className="h-4 w-4" />
        Add Resource
      </Button>
    </header>
  );
}
