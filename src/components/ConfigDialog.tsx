import { useState, useEffect, useRef } from 'react';

import { Eye, EyeOff, Check, XCircle, Loader2 } from 'lucide-react';

import { queryResources, saveCredentials } from '@/lib/notion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

interface ConfigDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSaved: () => void;
}

type TestStatus = 'idle' | 'testing' | 'success' | 'error';

export function ConfigDialog({ open, onOpenChange, onSaved }: ConfigDialogProps) {
  const [apiKey, setApiKey] = useState('');
  const [dbId, setDbId] = useState('');
  const [showApiKey, setShowApiKey] = useState(false);
  const [testStatus, setTestStatus] = useState<TestStatus>('idle');
  const [testError, setTestError] = useState('');

  const previousApiKey = useRef('');
  const previousDbId = useRef('');

  // Reload from localStorage each time the dialog opens
  useEffect(() => {
    if (open) {
      const storedKey = localStorage.getItem('notion_api_key') ?? '';
      const storedDb = localStorage.getItem('notion_database_id') ?? '';
      setApiKey(storedKey);
      setDbId(storedDb);
      setTestStatus('idle');
      setTestError('');
      previousApiKey.current = storedKey;
      previousDbId.current = storedDb;
    }
  }, [open]);

  async function handleTest() {
    setTestStatus('testing');
    setTestError('');
    // Temporarily write so getApiKey()/getDatabaseId() pick them up
    localStorage.setItem('notion_api_key', apiKey.trim());
    localStorage.setItem('notion_database_id', dbId.trim());
    try {
      await queryResources();
      setTestStatus('success');
    } catch (err) {
      setTestStatus('error');
      setTestError(err instanceof Error ? err.message : 'Connection failed');
      // Restore previous values on failure
      localStorage.setItem('notion_api_key', previousApiKey.current);
      localStorage.setItem('notion_database_id', previousDbId.current);
    }
  }

  function handleSave() {
    saveCredentials(apiKey.trim(), dbId.trim());
    onOpenChange(false);
    onSaved();
  }

  const canSave = apiKey.trim().length > 0 && dbId.trim().length > 0;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-slate-800 border border-slate-700 text-slate-50 max-w-md">
        <DialogHeader>
          <DialogTitle className="text-slate-50 text-lg font-semibold">Notion Configuration</DialogTitle>
          <DialogDescription className="text-slate-400 text-sm">
            Connect your Notion workspace. Settings are saved locally in your browser.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4 pt-2">
          {/* API Key */}
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="apiKey" className="text-slate-200">
              Notion Secret Key <span className="text-red-400">*</span>
            </Label>
            <div className="relative">
              <Input
                id="apiKey"
                type={showApiKey ? 'text' : 'password'}
                value={apiKey}
                onChange={(e) => { setApiKey(e.target.value); setTestStatus('idle'); }}
                placeholder="secret_..."
                className="bg-slate-900 border-slate-700 text-slate-50 placeholder:text-slate-500 focus-visible:ring-violet-500 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowApiKey((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200"
                tabIndex={-1}
              >
                {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            <p className="text-xs text-slate-500">
              Get it from <span className="text-slate-400">notion.so/my-integrations</span>
            </p>
          </div>

          {/* Database ID */}
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="dbId" className="text-slate-200">
              Database ID <span className="text-red-400">*</span>
            </Label>
            <Input
              id="dbId"
              value={dbId}
              onChange={(e) => { setDbId(e.target.value); setTestStatus('idle'); }}
              placeholder="32-character database ID"
              className="bg-slate-900 border-slate-700 text-slate-50 placeholder:text-slate-500 focus-visible:ring-violet-500"
            />
            <p className="text-xs text-slate-500">
              Found in your Notion database URL
            </p>
          </div>

          {/* Test status */}
          {testStatus !== 'idle' && (
            <div className={`flex items-center gap-2 text-sm px-3 py-2 rounded-md ${
              testStatus === 'success' ? 'bg-green-500/10 text-green-400' :
              testStatus === 'error' ? 'bg-red-500/10 text-red-400' :
              'bg-slate-700 text-slate-300'
            }`}>
              {testStatus === 'testing' && <Loader2 className="h-4 w-4 animate-spin" />}
              {testStatus === 'success' && <Check className="h-4 w-4" />}
              {testStatus === 'error' && <XCircle className="h-4 w-4" />}
              <span>
                {testStatus === 'testing' && 'Testing connection...'}
                {testStatus === 'success' && 'Connected successfully'}
                {testStatus === 'error' && (testError || 'Connection failed')}
              </span>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-2 justify-end pt-1">
            <Button
              type="button"
              variant="ghost"
              onClick={handleTest}
              disabled={!canSave || testStatus === 'testing'}
              className="text-slate-400 hover:text-slate-200"
            >
              {testStatus === 'testing' ? (
                <><Loader2 className="h-4 w-4 animate-spin mr-2" />Testing...</>
              ) : 'Test Connection'}
            </Button>
            <Button
              type="button"
              onClick={handleSave}
              disabled={!canSave}
              className="bg-violet-600 hover:bg-violet-500 text-white"
            >
              Save
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
