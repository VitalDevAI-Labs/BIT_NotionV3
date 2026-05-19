import { useState } from 'react';
import { Search, Bookmark, MessageSquare, Settings, Plus, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TopNavProps {
  onAddClick: () => void;
  onSettingsClick: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export function TopNav({ onAddClick, onSettingsClick, searchQuery, onSearchChange }: TopNavProps) {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header
      className="sticky top-0 z-50 w-full border-b border-white/[0.04]"
      style={{ background: 'rgba(18,18,20,0.72)', backdropFilter: 'blur(16px)' }}
    >
      <div className="max-w-[1180px] mx-auto px-6 h-[72px] flex items-center justify-between gap-4">
        {/* Logo */}
        <div className="flex items-center gap-2.5 shrink-0">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center"
               style={{ background: 'rgba(168,85,247,0.15)', border: '1px solid rgba(168,85,247,0.25)' }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 2L14 5.5V10.5L8 14L2 10.5V5.5L8 2Z"
                    stroke="#A855F7" strokeWidth="1.5" strokeLinejoin="round" />
              <circle cx="8" cy="8" r="2" fill="#A855F7" />
            </svg>
          </div>
          <span className="text-sm font-bold tracking-tight" style={{ color: '#A855F7' }}>AgentOS</span>
        </div>

        {/* Desktop search */}
        <div className="hidden md:flex flex-1 max-w-[480px]">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: '#9A9BA0' }} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search agents, tags, or description..."
              className="w-full pl-9 pr-4 py-2.5 text-sm rounded-xl outline-none transition-all"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid #1F2024',
                color: '#E8E8EA',
              }}
              onFocus={(e) => {
                e.currentTarget.style.border = '1px solid rgba(168,85,247,0.4)';
                e.currentTarget.style.boxShadow = '0 0 0 3px rgba(168,85,247,0.08)';
              }}
              onBlur={(e) => {
                e.currentTarget.style.border = '1px solid #1F2024';
                e.currentTarget.style.boxShadow = 'none';
              }}
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors"
                style={{ color: '#9A9BA0' }}
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          {/* Mobile search toggle */}
          <button
            className={cn(
              'md:hidden w-9 h-9 flex items-center justify-center rounded-lg transition-colors',
              searchOpen ? 'bg-white/5' : 'hover:bg-white/5'
            )}
            style={{ color: '#9A9BA0' }}
            onClick={() => setSearchOpen((v) => !v)}
          >
            <Search className="w-5 h-5" />
          </button>

          <button
            className="hidden md:flex w-9 h-9 items-center justify-center rounded-lg transition-colors hover:bg-white/5"
            style={{ color: '#9A9BA0' }}
            title="Bookmarks"
          >
            <Bookmark className="w-[18px] h-[18px]" />
          </button>

          <button
            className="hidden md:flex w-9 h-9 items-center justify-center rounded-lg transition-colors hover:bg-white/5"
            style={{ color: '#9A9BA0' }}
            title="Messages"
          >
            <MessageSquare className="w-[18px] h-[18px]" />
          </button>

          <button
            onClick={onSettingsClick}
            className="w-9 h-9 flex items-center justify-center rounded-lg transition-colors hover:bg-white/5"
            style={{ color: '#9A9BA0' }}
            title="Settings"
          >
            <Settings className="w-[18px] h-[18px]" />
          </button>

          {/* Avatar */}
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-semibold shrink-0"
            style={{
              background: 'linear-gradient(135deg, #A855F7, #7C3AED)',
              border: '2px solid rgba(168,85,247,0.3)',
              color: '#fff',
            }}
          >
            V
          </div>

          {/* Add button — desktop */}
          <button
            onClick={onAddClick}
            className="hidden md:flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-medium transition-all shrink-0"
            style={{
              background: '#A855F7',
              color: '#07070A',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 12px 36px rgba(168,85,247,0.28)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <Plus className="w-4 h-4" />
            New Agent
          </button>
        </div>
      </div>

      {/* Mobile search panel */}
      {searchOpen && (
        <div className="md:hidden px-4 pb-3 border-t border-white/[0.04]">
          <div className="relative mt-3">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: '#9A9BA0' }} />
            <input
              type="text"
              autoFocus
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search agents, tags, or description..."
              className="w-full pl-9 pr-4 py-2.5 text-sm rounded-xl outline-none"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(168,85,247,0.4)',
                color: '#E8E8EA',
                boxShadow: '0 0 0 3px rgba(168,85,247,0.08)',
              }}
            />
          </div>
        </div>
      )}
    </header>
  );
}
