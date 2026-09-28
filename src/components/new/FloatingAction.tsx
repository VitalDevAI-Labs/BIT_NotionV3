import { Plus, Search } from 'lucide-react';

interface FloatingActionProps {
  onAddClick: () => void;
  onSearchClick: () => void;
}

export function FloatingAction({ onAddClick, onSearchClick }: FloatingActionProps) {
  return (
    <div className="md:hidden fixed bottom-[18px] right-[18px] z-40 flex flex-col items-center gap-3">
      <button
        onClick={onSearchClick}
        className="w-12 h-12 flex items-center justify-center rounded-2xl transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
        style={{
          background: '#15161B',
          color: '#E8E8EA',
          border: '1px solid rgba(168,85,247,0.28)',
          boxShadow: '0 14px 36px rgba(0,0,0,0.4)',
        }}
        aria-label="Search records"
      >
        <Search className="w-5 h-5" />
      </button>

      <button
        onClick={onAddClick}
        className="w-14 h-14 flex items-center justify-center rounded-2xl transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300"
        style={{
          background: '#A855F7',
          color: '#07070A',
          boxShadow: '0 18px 48px rgba(168,85,247,0.28)',
        }}
        aria-label="Add record"
      >
        <Plus className="w-6 h-6" />
      </button>
    </div>
  );
}
