import { useState } from 'react';
import {
  ArrowLeft, Play, Copy, Check, ExternalLink,
  Pencil, Trash2, Zap, Tag, Layers, Cpu, Star,
  Calendar, Clock,
} from 'lucide-react';
import type { Resource } from '@/types/resource';

interface AgentDetailPageProps {
  resource: Resource;
  onBack: () => void;
  onEdit: (r: Resource) => void;
  onDelete: (r: Resource) => void;
}

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

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

function MetaRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3 py-3 border-b" style={{ borderColor: '#1F2024' }}>
      <span style={{ color: '#9A9BA0' }}>{icon}</span>
      <span className="text-sm w-28 shrink-0" style={{ color: '#9A9BA0' }}>{label}</span>
      <span className="text-sm font-medium" style={{ color: '#E8E8EA' }}>{value}</span>
    </div>
  );
}

export function AgentDetailPage({ resource, onBack, onEdit, onDelete }: AgentDetailPageProps) {
  const [copied, setCopied] = useState(false);
  const gradient = idToGradient(resource.id);
  const initials = resource.title.split(' ').slice(0, 2).map((w) => w[0]).join('').toUpperCase();

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
    <main className="max-w-295 mx-auto px-4 md:px-6 pb-24 pt-8">
      {/* Back nav */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 mb-8 text-sm transition-colors group"
        style={{ color: '#9A9BA0' }}
        onMouseEnter={(e) => { e.currentTarget.style.color = '#E8E8EA'; }}
        onMouseLeave={(e) => { e.currentTarget.style.color = '#9A9BA0'; }}
      >
        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
        Back to Directory
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
        {/* ── Left column ── */}
        <div className="flex flex-col gap-5">

          {/* Hero card */}
          <div className="rounded-2xl p-6" style={{ background: '#0F1115', border: '1px solid #1F2024' }}>
            <div className="flex items-start gap-4">
              {/* Avatar */}
              <div
                className={`w-16 h-16 rounded-2xl flex items-center justify-center text-lg font-bold text-white shrink-0 bg-linear-to-br ${gradient}`}
                style={{ border: '1px solid rgba(255,255,255,0.08)' }}
              >
                {initials}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    {/* Type badge */}
                    <span
                      className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase mb-2"
                      style={{
                        background: 'rgba(168,85,247,0.10)',
                        border: '1px solid rgba(168,85,247,0.20)',
                        color: '#A855F7',
                        letterSpacing: '0.08em',
                      }}
                    >
                      {resource.type === 'Agent' ? <Zap className="w-3 h-3" /> : <ExternalLink className="w-3 h-3" />}
                      {resource.type}
                    </span>
                    <h1 className="text-2xl font-bold leading-snug" style={{ color: '#E8E8EA' }}>
                      {resource.title}
                    </h1>
                    {resource.categories[0] && (
                      <p className="text-sm mt-1" style={{ color: '#A855F7' }}>{resource.categories[0]}</p>
                    )}
                  </div>

                  {/* Status dot */}
                  <span
                    className="w-3 h-3 rounded-full shrink-0 mt-1"
                    style={{
                      background: resource.isPopular ? '#22C55E' : '#F59E0B',
                      boxShadow: resource.isPopular ? '0 0 8px rgba(34,197,94,0.5)' : 'none',
                    }}
                    title={resource.isPopular ? 'Popular' : 'Standard'}
                  />
                </div>

                {resource.description && (
                  <p className="mt-3 text-sm leading-relaxed" style={{ color: '#9A9BA0' }}>
                    {resource.description}
                  </p>
                )}
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap gap-2 mt-5 pt-5 border-t" style={{ borderColor: '#1F2024' }}>
              {resource.type === 'Agent' ? (
                <button
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all"
                  style={{ background: '#A855F7', color: '#07070A' }}
                  onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 12px 36px rgba(168,85,247,0.28)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'none'; }}
                >
                  <Play className="w-4 h-4" />
                  Run Agent
                </button>
              ) : (
                <button
                  onClick={handleOpen}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all"
                  style={{ background: '#A855F7', color: '#07070A' }}
                  onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 12px 36px rgba(168,85,247,0.28)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'none'; }}
                >
                  <ExternalLink className="w-4 h-4" />
                  Open Chat
                </button>
              )}

              <button
                onClick={handleCopy}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid #1F2024',
                  color: copied ? '#22C55E' : '#9A9BA0',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(168,85,247,0.25)'; e.currentTarget.style.color = '#E8E8EA'; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#1F2024'; e.currentTarget.style.color = copied ? '#22C55E' : '#9A9BA0'; }}
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Copied!' : resource.promptText ? 'Copy Prompt' : 'Copy URL'}
              </button>

              <button
                onClick={() => onEdit(resource)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid #1F2024', color: '#9A9BA0' }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(168,85,247,0.25)'; e.currentTarget.style.color = '#E8E8EA'; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#1F2024'; e.currentTarget.style.color = '#9A9BA0'; }}
              >
                <Pencil className="w-4 h-4" />
                Edit
              </button>

              <button
                onClick={() => onDelete(resource)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all"
                style={{ background: 'rgba(248,113,113,0.05)', border: '1px solid rgba(248,113,113,0.15)', color: '#F87171' }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(248,113,113,0.10)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(248,113,113,0.05)'; }}
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
            </div>
          </div>

          {/* Prompt / Context block */}
          {resource.promptText && (
            <div className="rounded-2xl p-6" style={{ background: '#0F1115', border: '1px solid #1F2024' }}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-semibold uppercase tracking-wide" style={{ color: '#9A9BA0', letterSpacing: '0.08em' }}>
                  Agent Context
                </h2>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-lg transition-colors"
                  style={{ color: copied ? '#22C55E' : '#9A9BA0', background: 'rgba(255,255,255,0.03)' }}
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? 'Copied' : 'Copy'}
                </button>
              </div>
              <pre
                className="text-sm leading-relaxed whitespace-pre-wrap break-words"
                style={{
                  color: '#E8E8EA',
                  fontFamily: 'Menlo, Monaco, "Courier New", monospace',
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid #1F2024',
                  borderRadius: '12px',
                  padding: '16px',
                  margin: 0,
                }}
              >
                {resource.promptText}
              </pre>
            </div>
          )}

          {/* URL block (Chat Links) */}
          {resource.url && (
            <div className="rounded-2xl p-6" style={{ background: '#0F1115', border: '1px solid #1F2024' }}>
              <h2 className="text-sm font-semibold uppercase tracking-wide mb-4" style={{ color: '#9A9BA0', letterSpacing: '0.08em' }}>
                Chat Link
              </h2>
              <a
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm break-all transition-colors hover:underline"
                style={{ color: '#A855F7' }}
              >
                <ExternalLink className="w-4 h-4 shrink-0" />
                {resource.url}
              </a>
            </div>
          )}
        </div>

        {/* ── Right sidebar ── */}
        <div className="flex flex-col gap-4">

          {/* Metadata */}
          <div className="rounded-2xl p-5" style={{ background: '#0F1115', border: '1px solid #1F2024' }}>
            <h2 className="text-xs font-semibold uppercase tracking-wide mb-1" style={{ color: '#9A9BA0', letterSpacing: '0.08em' }}>
              Details
            </h2>

            {resource.model && (
              <MetaRow icon={<Cpu className="w-4 h-4" />} label="Model" value={resource.model} />
            )}
            <MetaRow
              icon={<Star className="w-4 h-4" />}
              label="Popular"
              value={resource.isPopular ? 'Yes' : 'No'}
            />
            <MetaRow
              icon={<Calendar className="w-4 h-4" />}
              label="Created"
              value={formatDate(resource.createdAt)}
            />
            <MetaRow
              icon={<Clock className="w-4 h-4" />}
              label="Last edited"
              value={formatDate(resource.lastEditedAt)}
            />
          </div>

          {/* Categories */}
          {resource.categories.length > 0 && (
            <div className="rounded-2xl p-5" style={{ background: '#0F1115', border: '1px solid #1F2024' }}>
              <h2 className="text-xs font-semibold uppercase tracking-wide mb-3" style={{ color: '#9A9BA0', letterSpacing: '0.08em' }}>
                <Layers className="w-3.5 h-3.5 inline mr-1.5" />
                Categories
              </h2>
              <div className="flex flex-wrap gap-2">
                {resource.categories.map((c) => (
                  <span
                    key={c}
                    className="px-2.5 py-1 rounded-full text-xs font-medium"
                    style={{ background: 'rgba(168,85,247,0.10)', border: '1px solid rgba(168,85,247,0.18)', color: '#A855F7' }}
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Tags */}
          {resource.tags.length > 0 && (
            <div className="rounded-2xl p-5" style={{ background: '#0F1115', border: '1px solid #1F2024' }}>
              <h2 className="text-xs font-semibold uppercase tracking-wide mb-3" style={{ color: '#9A9BA0', letterSpacing: '0.08em' }}>
                <Tag className="w-3.5 h-3.5 inline mr-1.5" />
                Tags
              </h2>
              <div className="flex flex-wrap gap-2">
                {resource.tags.map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-1 rounded-full text-[11px] font-bold uppercase"
                    style={{
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.07)',
                      color: '#9A9BA0',
                      letterSpacing: '0.08em',
                      fontFamily: 'Menlo, Monaco, "Courier New", monospace',
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
