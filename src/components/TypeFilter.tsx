import { cn } from '@/lib/utils';
import { FILTER_TYPES } from '@/lib/constants';
import type { FilterType } from '@/types/resource';

interface TypeFilterProps {
  active: FilterType;
  onChange: (filter: FilterType) => void;
}

export function TypeFilter({ active, onChange }: TypeFilterProps) {
  return (
    <div className="flex gap-1 bg-slate-800 border border-slate-700 rounded-lg p-1" role="tablist" aria-label="Filter by type">
      {FILTER_TYPES.map((filter) => (
        <button
          key={filter}
          role="tab"
          aria-selected={active === filter}
          onClick={() => onChange(filter)}
          className={cn(
            'px-3 py-1.5 text-sm rounded-md transition-colors font-medium',
            active === filter
              ? 'bg-violet-600 text-white shadow-sm'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700',
          )}
        >
          {filter === 'All' ? 'All' : `${filter}s`}
        </button>
      ))}
    </div>
  );
}
