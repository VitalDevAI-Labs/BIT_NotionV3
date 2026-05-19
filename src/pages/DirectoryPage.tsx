import { useState, useMemo } from 'react';
import { toast } from 'sonner';
import type { FilterType, Resource } from '@/types/resource';
import { MOCK_AGENTS } from '@/data/mockAgents';
import { FilterTabs } from '@/components/new/FilterTabs';
import { ControlsRow } from '@/components/new/ControlsRow';
import { AgentGrid } from '@/components/new/AgentGrid';
import { FloatingAction } from '@/components/new/FloatingAction';

interface DirectoryPageProps {
  onAddClick: () => void;
  onEditClick: (r: Resource) => void;
  onDeleteClick: (r: Resource) => void;
  searchQuery: string;
}

export function DirectoryPage({ onAddClick, onEditClick, onDeleteClick, searchQuery }: DirectoryPageProps) {
  const [activeFilter, setActiveFilter] = useState<FilterType>('All');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [popularOnly, setPopularOnly] = useState(false);

  // Using mock data — swap MOCK_AGENTS for real resources once backend is wired
  const resources = MOCK_AGENTS;

  const filtered = useMemo(() => {
    let result = resources;

    if (activeFilter !== 'All') {
      result = result.filter((r) => r.type === activeFilter);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (r) => r.title.toLowerCase().includes(q) || r.description.toLowerCase().includes(q),
      );
    }
    if (selectedCategory) {
      result = result.filter((r) => r.categories.includes(selectedCategory));
    }
    if (selectedModel) {
      result = result.filter((r) => r.model === selectedModel);
    }
    if (popularOnly) {
      result = result.filter((r) => r.isPopular);
    }

    return result;
  }, [resources, activeFilter, searchQuery, selectedCategory, selectedModel, popularOnly]);

  const activeAgentCount = filtered.filter((r) => r.type === 'Agent' && r.isPopular).length;

  function handleDelete(r: Resource) {
    onDeleteClick(r);
    toast.success(`"${r.title}" deleted`);
  }

  return (
    <main className="max-w-[1180px] mx-auto px-4 md:px-6 pb-24">
      {/* Page hero */}
      <div className="pt-10 pb-8">
        <div className="flex items-center gap-3 mb-2">
          <div
            className="w-9 h-9 flex items-center justify-center rounded-xl"
            style={{ background: 'rgba(168,85,247,0.12)', border: '1px solid rgba(168,85,247,0.20)' }}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <rect x="2" y="2" width="6" height="6" rx="1.5" stroke="#A855F7" strokeWidth="1.5" />
              <rect x="10" y="2" width="6" height="6" rx="1.5" stroke="#A855F7" strokeWidth="1.5" />
              <rect x="2" y="10" width="6" height="6" rx="1.5" stroke="#A855F7" strokeWidth="1.5" />
              <rect x="10" y="10" width="6" height="6" rx="1.5" stroke="#A855F7" strokeWidth="1.5" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold tracking-tight" style={{ color: '#E8E8EA' }}>
            Agent Directory
          </h1>
        </div>
        <p className="text-sm" style={{ color: '#9A9BA0' }}>
          Manage, configure, and deploy your specialized AI agents.
        </p>
      </div>

      {/* Filter tabs + Add button row */}
      <div className="flex items-center justify-between gap-4 mb-5">
        <FilterTabs active={activeFilter} onChange={setActiveFilter} />

        <button
          onClick={onAddClick}
          className="hidden md:flex shrink-0 items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all"
          style={{ background: '#A855F7', color: '#07070A' }}
          onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 12px 36px rgba(168,85,247,0.28)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'none'; }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M7 2V12M2 7H12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          New Agent
        </button>
      </div>

      {/* Controls row */}
      <div className="mb-6">
        <ControlsRow
          activeCount={activeAgentCount}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          selectedModel={selectedModel}
          onModelChange={setSelectedModel}
          popularOnly={popularOnly}
          onPopularChange={setPopularOnly}
        />
      </div>

      {/* Divider */}
      <div className="mb-6 border-t" style={{ borderColor: '#1F2024' }} />

      {/* Grid */}
      <AgentGrid
        resources={filtered}
        loading={false}
        error={null}
        onAdd={onAddClick}
        onEdit={onEditClick}
        onDelete={handleDelete}
      />

      {/* Mobile FAB */}
      <FloatingAction onClick={onAddClick} />
    </main>
  );
}
