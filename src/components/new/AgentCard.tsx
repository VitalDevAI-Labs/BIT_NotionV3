import { useState } from 'react';
import { Play, Copy, Check, ExternalLink, MoreVertical, Zap, Pencil, Trash2 } from 'lucide-react';
import type { Resource } from '@/types/resource';

interface AgentCardProps {
  resource: Resource;
  onEdit: (r: Resource) => void;
  onDelete: (r: Resource) => void;
}

// Derive a stable gradient from any string ID (works for both mock and real Notion UUIDs)
const GRADIENTS = [
  'from-violet-600 to-purple-800',
  'from-cyan-500 to-blue-700',
  'from-emerald-500 to-teal-700',
  'from-orange-500 to-red-700',
  'from-pink-500 to-rose-700',
  'from-indigo-500 to-blue-700',
  'from-blue-500 to-cyan-700',
  'from-amber-500 to-orange-700',
  'from-fuchsia-500 to-violet-700',
  'from-lime-500 to-green-700',
];

function idToGradient(id: string): string {
  let hash = 0;
  for (let i = 0; i < id.length; i++) hash = (hash * 31 + id.charCodeAt(i)) >>> 0;
  return GRADIENTS[hash % GRADIENTS.length];
}

function AgentAvatar({ resource }: { resource: Resource }) {
  const gradient = idToGradient(resource.id);
  const initials = resource.title
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();

  return (
    <div
      className={`w-11 h-11 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0 bg-linear-to-br ${gradient}`}
      style={{ border: '1px solid rgba(255,255,255,0.06)' }}
    >
      {initials}
    </div>
  );
}

function StatusDot({ isPopular }: { isPopular: boolean }) {
  return (
    <span
      className="w-2.5 h-2.5 rounded-full shrink-0"
      style={{
        background: isPopular ? '#22C55E' : '#F59E0B',
        boxShadow: isPopular ? '0 0 6px rgba(34,197,94,0.5)' : 'none',
      }}
      title={isPopular ? 'Popular' : 'Standard'}
    />
  );
}

export function AgentCard({ resource, onEdit, onDelete }: AgentCardProps) {
  const [copied, setCopied] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hovered, setHovered] = useState(false);

  const visibleTags = resource.tags.slice(0, 3);

  async function handleCopy() {
    const text = resource.promptText || resource.url || resource.title;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function handleOpen() {
    if (resource.url) window.open(resource.url, '_blank', 'noopener,noreferrer');
  }

  return (
    <div
      className="relative flex flex-col rounded-2xl p-4.5 gap-3 transition-all duration-200"
      style={{
        background: hovered ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.02)',
        border: hovered ? '1px solid rgba(168,85,247,0.18)' : '1px solid #1F2024',
        boxShadow: hovered ? '0 18px 48px rgba(168,85,247,0.10)' : 'none',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setMenuOpen(false); }}
    >
      {/* Header: avatar + status + quick icon */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2.5 min-w-0">
          <AgentAvatar resource={resource} />
          <div className="flex items-center gap-1.5">
            <StatusDot isPopular={resource.isPopular} />
            {resource.model && (
              <span className="text-xs truncate max-w-25" style={{ color: '#9A9BA0' }}>{resource.model}</span>
            )}
          </div>
        </div>
        <button
          className="w-8 h-8 flex items-center justify-center rounded-xl transition-colors hover:bg-white/5 shrink-0"
          style={{ color: '#A855F7' }}
          title={resource.type === 'Agent' ? 'Run agent' : 'Open chat'}
          onClick={resource.type === 'Chat Link' ? handleOpen : undefined}
        >
          {resource.type === 'Agent' ? <Zap className="w-4 h-4" /> : <ExternalLink className="w-4 h-4" />}
        </button>
      </div>

      {/* Title + category */}
      <div>
        <h3 className="font-semibold text-sm leading-snug line-clamp-2" style={{ color: '#E8E8EA' }}>
          {resource.title}
        </h3>
        {resource.categories[0] && (
          <p className="text-xs mt-0.5" style={{ color: '#A855F7' }}>{resource.categories[0]}</p>
        )}
      </div>

      {/* Description */}
      {resource.description && (
        <p className="text-sm leading-relaxed line-clamp-2 flex-1" style={{ color: '#9A9BA0' }}>
          {resource.description}
        </p>
      )}

      {/* Tags */}
      {visibleTags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {visibleTags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded-full text-[11px] font-bold uppercase"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.06)',
                color: '#9A9BA0',
                letterSpacing: '0.08em',
                fontFamily: 'Menlo, Monaco, "Courier New", monospace',
              }}
            >
              {tag}
            </span>
          ))}
          {resource.tags.length > 3 && (
            <span
              className="px-2 py-0.5 rounded-full text-[11px] font-bold uppercase"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.06)',
                color: '#9A9BA0',
                letterSpacing: '0.08em',
                fontFamily: 'Menlo, Monaco, "Courier New", monospace',
              }}
            >
              +{resource.tags.length - 3}
            </span>
          )}
        </div>
      )}

      {/* Footer: primary action + icon row */}
      <div className="flex items-center justify-between pt-1 border-t border-white/4">
        {resource.type === 'Agent' ? (
          <button
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-medium transition-all"
            style={{ background: 'rgba(168,85,247,0.10)', border: '1px solid rgba(168,85,247,0.18)', color: '#A855F7' }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(168,85,247,0.18)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(168,85,247,0.14)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(168,85,247,0.10)'; e.currentTarget.style.boxShadow = 'none'; }}
          >
            <Play className="w-3.5 h-3.5" />
            Run Agent
          </button>
        ) : (
          <button
            onClick={handleOpen}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-medium transition-all"
            style={{ background: 'rgba(168,85,247,0.10)', border: '1px solid rgba(168,85,247,0.18)', color: '#A855F7' }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(168,85,247,0.18)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(168,85,247,0.14)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(168,85,247,0.10)'; e.currentTarget.style.boxShadow = 'none'; }}
          >
            <ExternalLink className="w-3.5 h-3.5" />
            Open Chat
          </button>
        )}

        <div className="flex items-center gap-0.5">
          {/* Copy prompt/URL */}
          {(resource.promptText || resource.url) && (
            <button
              onClick={handleCopy}
              className="w-8 h-8 flex items-center justify-center rounded-lg transition-colors hover:bg-white/5"
              style={{ color: copied ? '#22C55E' : '#9A9BA0' }}
              title={resource.promptText ? 'Copy prompt' : 'Copy URL'}
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            </button>
          )}

          {/* 3-dot menu */}
          <div className="relative">
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="w-8 h-8 flex items-center justify-center rounded-lg transition-colors hover:bg-white/5"
              style={{ color: '#9A9BA0' }}
            >
              <MoreVertical className="w-4 h-4" />
            </button>

            {menuOpen && (
              <div
                className="absolute right-0 bottom-full mb-1 py-1 rounded-xl min-w-35 z-10"
                style={{ background: '#0F1115', border: '1px solid #1F2024', boxShadow: '0 16px 40px rgba(0,0,0,0.5)' }}
              >
                <button
                  onClick={() => { setMenuOpen(false); onEdit(resource); }}
                  className="w-full flex items-center gap-2.5 px-3.5 py-2 text-sm transition-colors hover:bg-white/5 text-left"
                  style={{ color: '#E8E8EA' }}
                >
                  <Pencil className="w-3.5 h-3.5" style={{ color: '#9A9BA0' }} />
                  Edit
                </button>
                <div className="my-1 border-t border-white/5" />
                <button
                  onClick={() => { setMenuOpen(false); onDelete(resource); }}
                  className="w-full flex items-center gap-2.5 px-3.5 py-2 text-sm transition-colors hover:bg-red-500/10 text-left"
                  style={{ color: '#F87171' }}
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
