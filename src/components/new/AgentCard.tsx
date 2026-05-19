import { useState } from 'react';
import { Play, Copy, Check, ExternalLink, MoreVertical, Zap, Pencil, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Resource } from '@/types/resource';
import { AVATAR_COLORS, MOCK_RUN_COUNTS } from '@/data/mockAgents';

interface AgentCardProps {
  resource: Resource;
  onEdit: (r: Resource) => void;
  onDelete: (r: Resource) => void;
}

function AgentAvatar({ resource }: { resource: Resource }) {
  const gradient = AVATAR_COLORS[resource.id] ?? 'from-violet-600 to-purple-800';
  const initials = resource.title
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();

  return (
    <div
      className={cn('w-11 h-11 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0 bg-gradient-to-br', gradient)}
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
      style={{ background: isPopular ? '#22C55E' : '#F59E0B', boxShadow: isPopular ? '0 0 6px rgba(34,197,94,0.5)' : 'none' }}
      title={isPopular ? 'Active' : 'Idle'}
    />
  );
}

export function AgentCard({ resource, onEdit, onDelete }: AgentCardProps) {
  const [copied, setCopied] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hovered, setHovered] = useState(false);

  const runCount = MOCK_RUN_COUNTS[resource.id];
  const visibleTags = resource.tags.slice(0, 3);

  async function handleCopy() {
    const text = resource.promptText || resource.title;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function handleOpen() {
    if (resource.url) window.open(resource.url, '_blank', 'noopener,noreferrer');
  }

  return (
    <div
      className="relative flex flex-col rounded-2xl p-[18px] gap-3 transition-all duration-200 cursor-default"
      style={{
        background: hovered ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.02)',
        border: hovered ? '1px solid rgba(168,85,247,0.18)' : '1px solid #1F2024',
        boxShadow: hovered ? '0 18px 48px rgba(168,85,247,0.10)' : 'none',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setMenuOpen(false); }}
    >
      {/* Header row */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2.5 min-w-0">
          <AgentAvatar resource={resource} />
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <StatusDot isPopular={resource.isPopular} />
              {runCount && runCount !== '—' && (
                <span className="text-xs font-medium" style={{ color: '#9A9BA0' }}>{runCount} runs</span>
              )}
            </div>
          </div>
        </div>

        {/* Quick action: play or open */}
        <div className="flex items-center gap-1.5 shrink-0">
          {resource.type === 'Agent' ? (
            <button
              className="w-8 h-8 flex items-center justify-center rounded-xl transition-colors hover:bg-white/5"
              style={{ color: '#A855F7' }}
              title="Run agent"
            >
              <Zap className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleOpen}
              className="w-8 h-8 flex items-center justify-center rounded-xl transition-colors hover:bg-white/5"
              style={{ color: '#A855F7' }}
              title="Open chat"
            >
              <ExternalLink className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Title */}
      <div>
        <h3
          className="font-semibold text-sm leading-snug line-clamp-2"
          style={{ color: '#E8E8EA' }}
        >
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
              className="px-2 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wide"
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
        </div>
      )}

      {/* Footer: primary action + secondary icons */}
      <div className="flex items-center justify-between pt-1 border-t border-white/[0.04]">
        {resource.type === 'Agent' ? (
          <button
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-medium transition-all"
            style={{
              background: 'rgba(168,85,247,0.10)',
              border: '1px solid rgba(168,85,247,0.18)',
              color: '#A855F7',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(168,85,247,0.18)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(168,85,247,0.14)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(168,85,247,0.10)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <Play className="w-3.5 h-3.5" />
            Run Agent
          </button>
        ) : (
          <button
            onClick={handleOpen}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-medium transition-all"
            style={{
              background: 'rgba(168,85,247,0.10)',
              border: '1px solid rgba(168,85,247,0.18)',
              color: '#A855F7',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(168,85,247,0.18)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(168,85,247,0.14)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(168,85,247,0.10)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <ExternalLink className="w-3.5 h-3.5" />
            Open Chat
          </button>
        )}

        <div className="flex items-center gap-0.5">
          {/* Copy */}
          {(resource.promptText || resource.url) && (
            <button
              onClick={handleCopy}
              className="w-8 h-8 flex items-center justify-center rounded-lg transition-colors hover:bg-white/5"
              style={{ color: copied ? '#22C55E' : '#9A9BA0' }}
              title="Copy"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            </button>
          )}

          {/* Menu */}
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
                className="absolute right-0 bottom-full mb-1 py-1 rounded-xl min-w-[140px] z-10"
                style={{
                  background: '#0F1115',
                  border: '1px solid #1F2024',
                  boxShadow: '0 16px 40px rgba(0,0,0,0.5)',
                }}
              >
                <button
                  onClick={() => { setMenuOpen(false); onEdit(resource); }}
                  className="w-full flex items-center gap-2.5 px-3.5 py-2 text-sm transition-colors hover:bg-white/5 text-left"
                  style={{ color: '#E8E8EA' }}
                >
                  <Pencil className="w-3.5 h-3.5" style={{ color: '#9A9BA0' }} />
                  Edit
                </button>
                <div className="my-1 border-t border-white/[0.05]" />
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
