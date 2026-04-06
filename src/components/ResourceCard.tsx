import { useState } from 'react';

import { ExternalLink, Copy, Bot, Check } from 'lucide-react';

import { cn } from '@/lib/utils';
import { TYPE_COLORS, TYPE_BORDER_ACCENT } from '@/lib/constants';
import type { Resource } from '@/types/resource';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface ResourceCardProps {
  resource: Resource;
}

export function ResourceCard({ resource }: ResourceCardProps) {
  const [copied, setCopied] = useState(false);

  function handleOpen() {
    if (resource.url) window.open(resource.url, '_blank', 'noopener,noreferrer');
  }

  async function handleCopy(text: string) {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const visibleTags = resource.tags.slice(0, 3);
  const extraTags = resource.tags.length - 3;

  return (
    <div
      className={cn(
        'flex flex-col bg-slate-800 border border-slate-700 rounded-lg p-4 gap-3',
        'border-l-4 hover:border-slate-600 transition-colors',
        TYPE_BORDER_ACCENT[resource.type],
      )}
    >
      {/* Top row: type badge + model */}
      <div className="flex items-center justify-between gap-2">
        <Badge className={cn('text-xs font-medium border', TYPE_COLORS[resource.type])}>
          <span className="sr-only">Type: </span>
          {resource.type}
        </Badge>
        {resource.model && (
          <span className="text-xs text-slate-500 truncate">{resource.model}</span>
        )}
      </div>

      {/* Title */}
      <h3 className="font-semibold text-slate-50 leading-snug line-clamp-2">{resource.title}</h3>

      {/* Description */}
      {resource.description && (
        <p className="text-sm text-slate-400 line-clamp-2 flex-1">{resource.description}</p>
      )}

      {/* Tags */}
      {visibleTags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {visibleTags.map((tag) => (
            <Badge key={tag} variant="secondary" className="bg-slate-700 text-slate-300 text-xs">
              {tag}
            </Badge>
          ))}
          {extraTags > 0 && (
            <Badge variant="secondary" className="bg-slate-700 text-slate-400 text-xs">
              +{extraTags}
            </Badge>
          )}
        </div>
      )}

      {/* Action button */}
      <div className="pt-1">
        {resource.type === 'Chat Link' && (
          <Button size="sm" variant="secondary" onClick={handleOpen} className="w-full gap-2">
            <ExternalLink className="h-3.5 w-3.5" />
            Open Chat
          </Button>
        )}
        {resource.type === 'Prompt' && (
          <Button
            size="sm"
            variant="secondary"
            onClick={() => handleCopy(resource.promptText ?? resource.title)}
            className="w-full gap-2"
          >
            {copied ? <Check className="h-3.5 w-3.5 text-green-400" /> : <Copy className="h-3.5 w-3.5" />}
            {copied ? 'Copied!' : 'Copy Prompt'}
          </Button>
        )}
        {resource.type === 'Agent' && (
          <Button
            size="sm"
            variant="secondary"
            onClick={() => handleCopy(resource.promptText ?? resource.description ?? resource.title)}
            className="w-full gap-2"
          >
            {copied ? <Check className="h-3.5 w-3.5 text-green-400" /> : <Bot className="h-3.5 w-3.5" />}
            {copied ? 'Copied!' : 'Use Agent'}
          </Button>
        )}
      </div>
    </div>
  );
}
