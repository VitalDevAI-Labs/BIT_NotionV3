import { useState } from 'react';

import { ExternalLink, Copy, Check, MoreVertical } from 'lucide-react';

import { cn } from '@/lib/utils';
import { TYPE_BORDER_ACCENT } from '@/lib/constants';
import type { Resource } from '@/types/resource';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface ResourceCardProps {
  resource: Resource;
  onEdit: (resource: Resource) => void;
  onDelete: (resource: Resource) => void;
}

export function ResourceCard({ resource, onEdit, onDelete }: ResourceCardProps) {
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
      {/* Top row: model + menu */}
      <div className="flex items-center justify-between gap-2">
        {resource.model && (
          <span className="text-xs text-slate-500 truncate">{resource.model}</span>
        )}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-6 w-6 text-slate-400 hover:text-slate-200 ml-auto">
              <MoreVertical className="h-4 w-4" />
              <span className="sr-only">Actions</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-slate-800 border-slate-700">
            <DropdownMenuItem onClick={() => onEdit(resource)} className="text-slate-200 cursor-pointer hover:bg-slate-700">
              Edit
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-slate-700" />
            <DropdownMenuItem onClick={() => onDelete(resource)} className="text-red-400 cursor-pointer hover:bg-slate-700">
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
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
      {resource.type === 'Chat Link' && (
        <div className="pt-1">
          <Button size="sm" variant="secondary" onClick={handleOpen} className="w-full gap-2">
            <ExternalLink className="h-3.5 w-3.5" />
            Open Chat
          </Button>
        </div>
      )}
      {resource.type === 'Agent' && (resource.url || resource.promptText) && (
        <div className="flex gap-2 pt-1">
          {resource.url && (
            <Button size="sm" variant="secondary" onClick={handleOpen} className={resource.promptText ? 'flex-1 gap-2' : 'w-full gap-2'}>
              <ExternalLink className="h-3.5 w-3.5" />
              Open URL
            </Button>
          )}
          {resource.promptText && (
            <Button
              size="sm"
              variant="secondary"
              onClick={() => handleCopy(resource.promptText!)}
              className={resource.url ? 'px-3' : 'w-full gap-2'}
              title="Copy prompt text"
            >
              {copied ? <Check className="h-3.5 w-3.5 text-green-400" /> : <Copy className="h-3.5 w-3.5" />}
              {!resource.url && (copied ? 'Copied!' : 'Copy Prompt')}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
