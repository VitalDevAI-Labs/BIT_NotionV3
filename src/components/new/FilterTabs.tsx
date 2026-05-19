import type { FilterType } from '@/types/resource';
import { cn } from '@/lib/utils';

const TABS: { label: string; value: FilterType | 'Bookmarks' }[] = [
  { label: 'All', value: 'All' },
  { label: 'Chat Links', value: 'Chat Link' },
  { label: 'Agents', value: 'Agent' },
  { label: 'Bookmarks', value: 'Bookmarks' },
];

interface FilterTabsProps {
  active: FilterType;
  onChange: (v: FilterType) => void;
}

export function FilterTabs({ active, onChange }: FilterTabsProps) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-0.5">
      {TABS.map((tab) => {
        const isActive = tab.value === active || (tab.value === 'Bookmarks' && false);
        return (
          <button
            key={tab.value}
            onClick={() => {
              if (tab.value !== 'Bookmarks') onChange(tab.value as FilterType);
            }}
            className={cn(
              'shrink-0 px-3.5 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap',
              isActive
                ? 'text-[#A855F7]'
                : 'text-[#9A9BA0] hover:text-[#E8E8EA]'
            )}
            style={isActive ? {
              background: 'rgba(168,85,247,0.12)',
              border: '1px solid rgba(168,85,247,0.20)',
            } : {
              background: 'rgba(255,255,255,0.01)',
              border: '1px solid rgba(255,255,255,0.03)',
            }}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
