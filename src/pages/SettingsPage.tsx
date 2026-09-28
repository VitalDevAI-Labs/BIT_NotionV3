import { useState, useEffect, useRef } from 'react';
import {
  Eye, EyeOff, Check, XCircle, Loader2, ExternalLink,
  Database, Key, RefreshCw, ChevronRight, Info,
} from 'lucide-react';
import { queryResources, saveCredentials } from '@/lib/notion';
import { NOTION_FIELDS } from '@/lib/notion-schema';
import { toast } from 'sonner';

type TestStatus = 'idle' | 'testing' | 'success' | 'error';

const FIELD_MAPPING = NOTION_FIELDS.map((field) => ({
  field: field.name,
  type: field.type,
  required: field.required,
  description: field.description,
}));

function SectionCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-2xl p-6 ${className}`}
      style={{ background: '#0F1115', border: '1px solid #1F2024' }}
    >
      {children}
    </div>
  );
}

function SectionTitle({ icon, title, subtitle }: { icon: React.ReactNode; title: string; subtitle?: string }) {
  return (
    <div className="flex items-start gap-3 mb-5">
      <div
        className="w-9 h-9 flex items-center justify-center rounded-xl shrink-0 mt-0.5"
        style={{ background: 'rgba(168,85,247,0.10)', border: '1px solid rgba(168,85,247,0.18)' }}
      >
        <span style={{ color: '#A855F7' }}>{icon}</span>
      </div>
      <div>
        <h2 className="text-base font-semibold" style={{ color: '#E8E8EA' }}>{title}</h2>
        {subtitle && <p className="text-sm mt-0.5" style={{ color: '#9A9BA0' }}>{subtitle}</p>}
      </div>
    </div>
  );
}

export function SettingsPage() {
  const [apiKey, setApiKey] = useState('');
  const [dbId, setDbId] = useState('');
  const [showApiKey, setShowApiKey] = useState(false);
  const [testStatus, setTestStatus] = useState<TestStatus>('idle');
  const [testError, setTestError] = useState('');

  const previousApiKey = useRef('');
  const previousDbId = useRef('');

  useEffect(() => {
    const storedKey = localStorage.getItem('notion_api_key') ?? '';
    const storedDb = localStorage.getItem('notion_database_id') ?? '';
    setApiKey(storedKey);
    setDbId(storedDb);
    previousApiKey.current = storedKey;
    previousDbId.current = storedDb;
  }, []);

  async function handleTest() {
    setTestStatus('testing');
    setTestError('');
    localStorage.setItem('notion_api_key', apiKey.trim());
    localStorage.setItem('notion_database_id', dbId.trim());
    try {
      await queryResources();
      setTestStatus('success');
    } catch (err) {
      setTestStatus('error');
      setTestError(err instanceof Error ? err.message : 'Connection failed');
      localStorage.setItem('notion_api_key', previousApiKey.current);
      localStorage.setItem('notion_database_id', previousDbId.current);
    }
  }

  function handleSave() {
    if (!apiKey.trim() || !dbId.trim()) return;
    saveCredentials(apiKey.trim(), dbId.trim());
    previousApiKey.current = apiKey.trim();
    previousDbId.current = dbId.trim();
    setTestStatus('idle');
    toast.success('Notion credentials saved');
  }

  const canSave = apiKey.trim().length > 0 && dbId.trim().length > 0;

  return (
    <main className="max-w-[760px] mx-auto px-4 md:px-6 pb-24">
      {/* Page header */}
      <div className="pt-10 pb-8">
        <h1 className="text-3xl font-bold tracking-tight" style={{ color: '#E8E8EA' }}>Settings</h1>
        <p className="text-sm mt-1.5" style={{ color: '#9A9BA0' }}>
          Configure your Notion workspace connection and database field mapping.
        </p>
      </div>

      <div className="flex flex-col gap-5">
        {/* ── Notion Credentials ── */}
        <SectionCard>
          <SectionTitle
            icon={<Key className="w-4 h-4" />}
            title="Notion Connection"
            subtitle="Credentials are stored locally in your browser — never sent to any server."
          />

          <div className="flex flex-col gap-4">
            {/* API Key */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium" style={{ color: '#E8E8EA' }}>
                Notion Secret Key <span style={{ color: '#F87171' }}>*</span>
              </label>
              <div className="relative">
                <input
                  type={showApiKey ? 'text' : 'password'}
                  value={apiKey}
                  onChange={(e) => { setApiKey(e.target.value); setTestStatus('idle'); }}
                  placeholder="secret_..."
                  className="w-full px-4 pr-10 py-2.5 rounded-xl text-sm outline-none transition-all font-mono"
                  style={{
                    background: 'rgba(255,255,255,0.02)',
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
                <button
                  type="button"
                  onClick={() => setShowApiKey((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors"
                  style={{ color: '#9A9BA0' }}
                  tabIndex={-1}
                >
                  {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <div className="flex items-center gap-1.5">
                <p className="text-xs" style={{ color: '#9A9BA0' }}>
                  Get yours at
                </p>
                <a
                  href="https://notion.so/my-integrations"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-0.5 text-xs transition-colors hover:underline"
                  style={{ color: '#A855F7' }}
                >
                  notion.so/my-integrations
                  <ExternalLink className="w-3 h-3 ml-0.5" />
                </a>
              </div>
            </div>

            {/* Database ID */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium" style={{ color: '#E8E8EA' }}>
                Database ID <span style={{ color: '#F87171' }}>*</span>
              </label>
              <input
                type="text"
                value={dbId}
                onChange={(e) => { setDbId(e.target.value); setTestStatus('idle'); }}
                placeholder="32-character database ID"
                className="w-full px-4 py-2.5 rounded-xl text-sm outline-none transition-all font-mono"
                style={{
                  background: 'rgba(255,255,255,0.02)',
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
              <p className="text-xs" style={{ color: '#9A9BA0' }}>
                Found in your Notion database URL — the 32-char hex string before the "?"
              </p>
            </div>

            {/* Test status */}
            {testStatus !== 'idle' && (
              <div
                className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-sm"
                style={
                  testStatus === 'success'
                    ? { background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.18)', color: '#22C55E' }
                    : testStatus === 'error'
                    ? { background: 'rgba(248,113,113,0.08)', border: '1px solid rgba(248,113,113,0.18)', color: '#F87171' }
                    : { background: 'rgba(255,255,255,0.03)', border: '1px solid #1F2024', color: '#9A9BA0' }
                }
              >
                {testStatus === 'testing' && <Loader2 className="w-4 h-4 animate-spin shrink-0" />}
                {testStatus === 'success' && <Check className="w-4 h-4 shrink-0" />}
                {testStatus === 'error' && <XCircle className="w-4 h-4 shrink-0" />}
                <span>
                  {testStatus === 'testing' && 'Testing connection...'}
                  {testStatus === 'success' && 'Connected successfully — database is reachable'}
                  {testStatus === 'error' && (testError || 'Connection failed')}
                </span>
              </div>
            )}

            {/* Action buttons */}
            <div className="flex items-center gap-2 pt-1">
              <button
                type="button"
                onClick={handleTest}
                disabled={!canSave || testStatus === 'testing'}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-medium transition-all disabled:opacity-40"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid #1F2024',
                  color: '#9A9BA0',
                }}
                onMouseEnter={(e) => { if (canSave) e.currentTarget.style.color = '#E8E8EA'; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = '#9A9BA0'; }}
              >
                {testStatus === 'testing' ? (
                  <><Loader2 className="w-4 h-4 animate-spin" /> Testing...</>
                ) : (
                  <><RefreshCw className="w-4 h-4" /> Test Connection</>
                )}
              </button>

              <button
                type="button"
                onClick={handleSave}
                disabled={!canSave}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all disabled:opacity-40"
                style={{ background: '#A855F7', color: '#07070A' }}
                onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 12px 36px rgba(168,85,247,0.28)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'none'; }}
              >
                <Check className="w-4 h-4" />
                Save Credentials
              </button>
            </div>
          </div>
        </SectionCard>

        {/* ── Field Mapping Guide ── */}
        <SectionCard>
          <SectionTitle
            icon={<Database className="w-4 h-4" />}
            title="Notion Database Field Mapping"
            subtitle="Your Notion database must have these property names (case-sensitive) for the app to read data correctly."
          />

          <div
            className="rounded-xl overflow-hidden"
            style={{ border: '1px solid #1F2024' }}
          >
            {/* Table header */}
            <div
              className="grid grid-cols-[140px_1fr_auto] gap-4 px-4 py-2.5 text-xs font-semibold uppercase tracking-wide"
              style={{ background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid #1F2024', color: '#9A9BA0', letterSpacing: '0.08em' }}
            >
              <span>Field Name</span>
              <span>Description</span>
              <span>Type</span>
            </div>

            {FIELD_MAPPING.map((row, i) => (
              <div
                key={row.field}
                className="grid grid-cols-[140px_1fr_auto] gap-4 px-4 py-3 items-start"
                style={{
                  borderBottom: i < FIELD_MAPPING.length - 1 ? '1px solid rgba(31,32,36,0.8)' : 'none',
                  background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.01)',
                }}
              >
                <div className="flex items-center gap-2">
                  <code
                    className="text-xs px-1.5 py-0.5 rounded font-mono"
                    style={{ background: 'rgba(168,85,247,0.10)', color: '#A855F7' }}
                  >
                    {row.field}
                  </code>
                  {row.required && (
                    <span className="text-[10px] font-bold" style={{ color: '#F87171' }}>REQ</span>
                  )}
                </div>
                <p className="text-xs leading-relaxed" style={{ color: '#9A9BA0' }}>{row.description}</p>
                <span
                  className="text-[11px] font-mono px-2 py-0.5 rounded-full shrink-0"
                  style={{ background: 'rgba(255,255,255,0.03)', color: '#9A9BA0', border: '1px solid rgba(255,255,255,0.05)' }}
                >
                  {row.type}
                </span>
              </div>
            ))}
          </div>

          {/* Tip */}
          <div
            className="flex items-start gap-2.5 mt-4 px-3.5 py-3 rounded-xl text-sm"
            style={{ background: 'rgba(168,85,247,0.05)', border: '1px solid rgba(168,85,247,0.10)' }}
          >
            <Info className="w-4 h-4 shrink-0 mt-0.5" style={{ color: '#A855F7' }} />
            <p style={{ color: '#9A9BA0' }}>
              Property names are <strong style={{ color: '#E8E8EA' }}>case-sensitive</strong>. If the app shows empty cards,
              check that your Notion database property names exactly match the Field Names above.
              The app auto-detects common variants (e.g. <code className="text-xs" style={{ color: '#A855F7' }}>title</code> → <code className="text-xs" style={{ color: '#A855F7' }}>Title</code>).
            </p>
          </div>

          <a
            href="https://www.notion.so/help/create-a-database"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 mt-4 text-sm transition-colors hover:underline"
            style={{ color: '#A855F7' }}
          >
            How to create a Notion database
            <ChevronRight className="w-4 h-4" />
          </a>
        </SectionCard>

        {/* ── About ── */}
        <SectionCard>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-semibold" style={{ color: '#E8E8EA' }}>AgentOS</h2>
              <p className="text-xs mt-0.5" style={{ color: '#9A9BA0' }}>v3.0 · Visual-first phase · Notion backend</p>
            </div>
            <span
              className="text-xs px-2.5 py-1 rounded-full font-medium"
              style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.18)', color: '#22C55E' }}
            >
              Active
            </span>
          </div>
        </SectionCard>
      </div>
    </main>
  );
}
