import { Plus, Loader2 } from 'lucide-react';
import type { Resource } from '@/types/resource';
import { AgentCard } from './AgentCard';

interface AgentGridProps {
  resources: Resource[];
  loading: boolean;
  error: string | null;
  onAdd: () => void;
  onView: (r: Resource) => void;
  onEdit: (r: Resource) => void;
  onDelete: (r: Resource) => void;
}

export function AgentGrid({ resources, loading, error, onAdd, onView, onEdit, onDelete }: AgentGridProps) {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-32" style={{ color: '#9A9BA0' }}>
        <Loader2 className="w-5 h-5 animate-spin mr-2.5" />
        <span className="text-sm">Loading agents...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-32 gap-3">
        <div
          className="px-4 py-3 rounded-xl text-sm max-w-md text-center"
          style={{ background: 'rgba(248,113,113,0.08)', border: '1px solid rgba(248,113,113,0.15)', color: '#F87171' }}
        >
          {error}
        </div>
      </div>
    );
  }

  return (
    <div
      className="grid gap-6"
      style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))' }}
    >
      {/* Create new card */}
      <button
        onClick={onAdd}
        className="flex flex-col items-center justify-center gap-3 rounded-2xl p-7 transition-all duration-200 group min-h-[200px]"
        style={{
          background: 'transparent',
          border: '2px dashed rgba(255,255,255,0.05)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.border = '2px dashed rgba(168,85,247,0.20)';
          e.currentTarget.style.boxShadow = '0 10px 30px rgba(168,85,247,0.06)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.border = '2px dashed rgba(255,255,255,0.05)';
          e.currentTarget.style.boxShadow = 'none';
        }}
      >
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center transition-all group-hover:scale-110"
          style={{ background: 'rgba(168,85,247,0.08)', border: '1px solid rgba(168,85,247,0.14)' }}
        >
          <Plus className="w-5 h-5" style={{ color: '#A855F7' }} />
        </div>
        <div className="text-center">
          <p className="text-sm font-semibold" style={{ color: '#9A9BA0' }}>Create New Agent</p>
          <p className="text-xs mt-0.5" style={{ color: '#9A9BA0', opacity: 0.6 }}>Start from scratch or a template</p>
        </div>
      </button>

      {/* Agent cards */}
      {resources.map((r) => (
        <AgentCard key={r.id} resource={r} onView={onView} onEdit={onEdit} onDelete={onDelete} />
      ))}

      {/* Empty state filler cards (decorative) */}
      {resources.length === 0 && (
        <>
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="rounded-2xl min-h-[200px]"
              style={{ background: 'transparent', border: '1px dashed rgba(255,255,255,0.03)' }}
            />
          ))}
        </>
      )}
    </div>
  );
}
