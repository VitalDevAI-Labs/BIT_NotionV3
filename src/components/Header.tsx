import { Plus, Settings } from 'lucide-react';

import { Button } from '@/components/ui/button';

interface HeaderProps {
  onAddClick: () => void;
  onConfigClick: () => void;
  resourceCount: number;
}

export function Header({ onAddClick, onConfigClick, resourceCount }: HeaderProps) {
  return (
    <header className="flex items-center justify-between py-5">
      <div className="flex items-center gap-3">
        <h1 className="text-2xl font-bold text-violet-400 tracking-tight">AI Bridge</h1>
        {resourceCount > 0 && (
          <span className="text-sm text-slate-500">{resourceCount} resources</span>
        )}
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={onConfigClick}
          className="text-slate-400 hover:text-white"
          title="Configure Notion connection"
        >
          <Settings className="h-4 w-4" />
          <span className="sr-only">Settings</span>
        </Button>
        <Button onClick={onAddClick} className="gap-2 bg-violet-600 hover:bg-violet-500 text-white">
          <Plus className="h-4 w-4" />
          Add Resource
        </Button>
      </div>
    </header>
  );
}
