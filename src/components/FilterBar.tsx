import type { FilterType } from '@/types/resource';
import { TypeFilter } from '@/components/TypeFilter';
import { SearchInput } from '@/components/SearchInput';

interface FilterBarProps {
  activeFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function FilterBar({ activeFilter, onFilterChange, searchQuery, onSearchChange }: FilterBarProps) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
      <TypeFilter active={activeFilter} onChange={onFilterChange} />
      <SearchInput value={searchQuery} onChange={onSearchChange} className="w-full sm:w-72" />
    </div>
  );
}
