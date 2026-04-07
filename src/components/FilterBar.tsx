import type { FilterType, Resource } from '@/types/resource';
import { DEFAULT_CATEGORIES, MODEL_OPTIONS } from '@/lib/constants';
import { TypeFilter } from '@/components/TypeFilter';
import { SearchInput } from '@/components/SearchInput';
import { ImprovedMultiSelect } from '@/components/ui/improved-multi-select';
import { Button } from '@/components/ui/button';

interface FilterBarProps {
  activeFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategories: string[];
  onCategoriesChange: (categories: string[]) => void;
  selectedTags: string[];
  onTagsChange: (tags: string[]) => void;
  selectedModel: string;
  onModelChange: (model: string) => void;
  popularOnly: boolean;
  onPopularChange: (popular: boolean) => void;
  resources: Resource[];
}

export function FilterBar({
  activeFilter,
  onFilterChange,
  searchQuery,
  onSearchChange,
  selectedCategories,
  onCategoriesChange,
  selectedTags,
  onTagsChange,
  selectedModel,
  onModelChange,
  popularOnly,
  onPopularChange,
  resources,
}: FilterBarProps) {
  // Derive available tags from loaded resources
  const availableTags = Array.from(new Set(resources.flatMap((r) => r.tags))).sort();

  return (
    <div className="flex flex-col gap-3">
      {/* Row 1: Type + Search */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <TypeFilter active={activeFilter} onChange={onFilterChange} />
        <SearchInput value={searchQuery} onChange={onSearchChange} className="w-full sm:w-72" />
      </div>

      {/* Row 2: Advanced filters */}
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
            {DEFAULT_CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        {/* Model */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <label className="text-xs text-slate-400 whitespace-nowrap">Model:</label>
          <select
            value={selectedModel}
            onChange={(e) => onModelChange(e.target.value)}
            className="bg-slate-900 border border-slate-700 text-slate-50 rounded-md px-2 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-violet-500 flex-1 sm:flex-initial"
          >
            <option value="">All models</option>
            {MODEL_OPTIONS.map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
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

      {/* Row 3: Tags (if available) */}
      {availableTags.length > 0 && (
        <div className="flex items-center gap-2">
          <label className="text-xs text-slate-400 whitespace-nowrap">Tags:</label>
          <ImprovedMultiSelect
            options={availableTags}
            value={selectedTags}
            onChange={onTagsChange}
            placeholder="Filter by tags..."
            className="flex-1"
          />
        </div>
      )}
    </div>
  );
}
