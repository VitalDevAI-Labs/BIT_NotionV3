import type { FilterType } from '@/types/resource';
import { TypeFilter } from '@/components/TypeFilter';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface FilterBarProps {
  activeFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  selectedCategories: string[];
  onCategoriesChange: (categories: string[]) => void;
  tagQuery: string;
  onTagQueryChange: (query: string) => void;
  popularOnly: boolean;
  onPopularChange: (popular: boolean) => void;
  availableCategories: string[];
}

export function FilterBar({
  activeFilter,
  onFilterChange,
  selectedCategories,
  onCategoriesChange,
  tagQuery,
  onTagQueryChange,
  popularOnly,
  onPopularChange,
  availableCategories,
}: FilterBarProps) {
  return (
    <div className="flex flex-col gap-3">
      {/* Row 1: Type filter */}
      <TypeFilter active={activeFilter} onChange={onFilterChange} />

      {/* Row 2: Categories + Tag search + Popular */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
        {/* Categories */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <label className="text-xs text-slate-400 whitespace-nowrap">Categories:</label>
          <select
            value={selectedCategories[0] ?? ''}
            onChange={(e) => onCategoriesChange(e.target.value ? [e.target.value] : [])}
            className="bg-slate-900 border border-slate-700 text-slate-50 rounded-md px-2 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-violet-500 flex-1 sm:flex-initial"
          >
            <option value="">All categories</option>
            {availableCategories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        {/* Tag search */}
        <div className="flex items-center gap-2 w-full sm:w-auto flex-1">
          <label className="text-xs text-slate-400 whitespace-nowrap">Tags:</label>
          <Input
            value={tagQuery}
            onChange={(e) => onTagQueryChange(e.target.value)}
            placeholder="Search tags..."
            className="bg-slate-900 border-slate-700 text-slate-50 placeholder:text-slate-500 focus-visible:ring-violet-500 text-xs h-8"
          />
        </div>

        {/* Popular toggle */}
        <Button
          onClick={() => onPopularChange(!popularOnly)}
          variant={popularOnly ? 'default' : 'secondary'}
          className={`text-xs whitespace-nowrap ${popularOnly ? 'bg-violet-600 hover:bg-violet-500' : ''}`}
        >
          ⭐ Popular
        </Button>
      </div>
    </div>
  );
}
