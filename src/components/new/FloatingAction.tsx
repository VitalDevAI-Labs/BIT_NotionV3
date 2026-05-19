import { Plus } from 'lucide-react';

interface FloatingActionProps {
  onClick: () => void;
}

export function FloatingAction({ onClick }: FloatingActionProps) {
  return (
    <button
      onClick={onClick}
      className="md:hidden fixed bottom-[18px] right-[18px] w-14 h-14 flex items-center justify-center rounded-2xl z-40 transition-all duration-200"
      style={{
        background: '#A855F7',
        color: '#07070A',
        boxShadow: '0 18px 48px rgba(168,85,247,0.28)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = '0 28px 72px rgba(168,85,247,0.36)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 18px 48px rgba(168,85,247,0.28)';
      }}
      aria-label="Create new agent"
    >
      <Plus className="w-6 h-6" />
    </button>
  );
}
