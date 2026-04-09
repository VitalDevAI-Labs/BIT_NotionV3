import { useState, useRef, useEffect } from 'react';

import { X, ChevronDown, Plus } from 'lucide-react';

import { cn } from '@/lib/utils';

interface ImprovedMultiSelectProps {
  options: string[];
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
  allowCreate?: boolean;
  className?: string;
}

export function ImprovedMultiSelect({
  options,
  value,
  onChange,
  placeholder = 'Select...',
  allowCreate = true,
  className,
}: ImprovedMultiSelectProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
        setQuery('');
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filtered = options.filter(
    (o) => o.toLowerCase().includes(query.toLowerCase()) && !value.includes(o),
  );

  const canCreate = allowCreate && query.trim() && !options.includes(query.trim()) && !value.includes(query.trim());

  function toggle(item: string) {
    if (value.includes(item)) {
      onChange(value.filter((v) => v !== item));
    } else {
      onChange([...value, item]);
    }
  }

  function createNew() {
    const trimmed = query.trim();
    if (trimmed) {
      onChange([...value, trimmed]);
      setQuery('');
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (filtered.length > 0) {
        toggle(filtered[0]);
        setQuery('');
      } else if (canCreate) {
        createNew();
      }
    }
    if (e.key === 'Escape') {
      setOpen(false);
      setQuery('');
    }
  }

  return (
    <div ref={containerRef} className={cn('relative', className)}>
      {/* Selected tags */}
      <div
        className="min-h-10 w-full flex flex-wrap gap-1.5 items-center px-3 py-2 rounded-md border border-slate-700 bg-slate-900 cursor-text"
        onClick={() => { setOpen(true); inputRef.current?.focus(); }}
      >
        {value.map((v) => (
          <span
            key={v}
            className="flex items-center gap-1 bg-slate-700 text-slate-200 text-xs px-2 py-0.5 rounded-md"
          >
            {v}
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); toggle(v); }}
              className="hover:text-red-400 transition-colors"
              aria-label={`Remove ${v}`}
            >
              <X className="h-3 w-3" />
            </button>
          </span>
        ))}
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => { setQuery(e.target.value); setOpen(true); }}
          onFocus={() => setOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={value.length === 0 ? placeholder : ''}
          className="flex-1 min-w-20 bg-transparent text-sm text-slate-50 placeholder:text-slate-500 outline-none"
        />
        <ChevronDown className={cn('h-4 w-4 text-slate-400 transition-transform ml-auto', open && 'rotate-180')} />
      </div>

      {/* Dropdown */}
      {open && (
        <div className="absolute z-50 mt-1 w-full rounded-md border border-slate-700 bg-slate-800 shadow-lg max-h-52 overflow-y-auto">
          {filtered.map((o) => (
            <button
              key={o}
              type="button"
              onClick={() => { toggle(o); setQuery(''); inputRef.current?.focus(); }}
              className="w-full text-left px-3 py-2 text-sm text-slate-200 hover:bg-slate-700 transition-colors"
            >
              {o}
            </button>
          ))}
          {canCreate && (
            <button
              type="button"
              onClick={createNew}
              className="w-full text-left px-3 py-2 text-sm text-violet-400 hover:bg-slate-700 transition-colors flex items-center gap-2"
            >
              <Plus className="h-3.5 w-3.5" />
              Create &quot;{query.trim()}&quot;
            </button>
          )}
          {filtered.length === 0 && !canCreate && (
            <div className="px-3 py-2 text-sm text-slate-500">No options found.</div>
          )}
        </div>
      )}
    </div>
  );
}
