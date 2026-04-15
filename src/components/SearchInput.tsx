import { forwardRef } from 'react';

import { Search, X } from 'lucide-react';

import { cn } from '@/lib/utils';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  ({ value, onChange, className }, ref) => {
    return (
      <div className={cn('relative flex items-center', className)}>
        <Search className="absolute left-3 h-4 w-4 text-slate-500 pointer-events-none" />
        <input
          ref={ref}
          type="search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search resources..."
          className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-9 pr-9 py-2 text-sm text-slate-50 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-colors"
        />
        {value && (
          <button
            onClick={() => onChange('')}
            className="absolute right-3 text-slate-500 hover:text-slate-200 transition-colors"
            aria-label="Clear search"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    );
  }
);

SearchInput.displayName = 'SearchInput';
