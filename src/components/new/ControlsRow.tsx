import { Filter, ChevronDown, Sparkles } from 'lucide-react';
import { DEFAULT_CATEGORIES, MODEL_OPTIONS } from '@/lib/constants';

interface ControlsRowProps {
  activeCount: number;
  selectedCategory: string;
  onCategoryChange: (v: string) => void;
  selectedModel: string;
  onModelChange: (v: string) => void;
  popularOnly: boolean;
  onPopularChange: (v: boolean) => void;
}

function SelectControl({
  icon,
  value,
  onChange,
  options,
  placeholder,
}: {
  icon?: React.ReactNode;
  value: string;
  onChange: (v: string) => void;
  options: string[];
  placeholder: string;
}) {
  return (
    <div className="relative flex items-center">
      <div className="absolute left-3 flex items-center gap-1.5 pointer-events-none" style={{ color: '#9A9BA0' }}>
        {icon}
      </div>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none pl-8 pr-7 py-2.5 rounded-xl text-sm font-medium outline-none cursor-pointer transition-colors"
        style={{
          background: 'rgba(255,255,255,0.02)',
          border: '1px solid #1F2024',
          color: value ? '#E8E8EA' : '#9A9BA0',
          minWidth: '140px',
        }}
        onFocus={(e) => { e.currentTarget.style.borderColor = 'rgba(168,85,247,0.35)'; }}
        onBlur={(e) => { e.currentTarget.style.borderColor = '#1F2024'; }}
      >
        <option value="">{placeholder}</option>
        {options.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
      <ChevronDown className="absolute right-2.5 w-3.5 h-3.5 pointer-events-none" style={{ color: '#9A9BA0' }} />
    </div>
  );
}

export function ControlsRow({
  activeCount,
  selectedCategory,
  onCategoryChange,
  selectedModel,
  onModelChange,
  popularOnly,
  onPopularChange,
}: ControlsRowProps) {
  return (
    <div className="flex items-center justify-between gap-3 flex-wrap">
      <div className="flex items-center gap-2 flex-wrap">
        <SelectControl
          icon={<Filter className="w-3.5 h-3.5" />}
          value={selectedCategory}
          onChange={onCategoryChange}
          options={DEFAULT_CATEGORIES}
          placeholder="Category"
        />
        <SelectControl
          value={selectedModel}
          onChange={onModelChange}
          options={MODEL_OPTIONS}
          placeholder="Model"
        />

        {/* Popular toggle */}
        <button
          onClick={() => onPopularChange(!popularOnly)}
          className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all"
          style={popularOnly ? {
            background: 'rgba(168,85,247,0.12)',
            border: '1px solid rgba(168,85,247,0.25)',
            color: '#A855F7',
          } : {
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid #1F2024',
            color: '#9A9BA0',
          }}
        >
          <Sparkles className="w-3.5 h-3.5" />
          Popular
        </button>
      </div>

      {/* Active count badge */}
      {activeCount > 0 && (
        <div
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium"
          style={{
            background: 'rgba(168,85,247,0.08)',
            border: '1px solid rgba(168,85,247,0.14)',
            color: '#A855F7',
          }}
        >
          <Sparkles className="w-3 h-3" />
          {activeCount} active agents
        </div>
      )}
    </div>
  );
}
