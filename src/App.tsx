import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export function App() {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-50">
      <div className="max-w-7xl mx-auto px-6 py-8 space-y-4">
        <h1 className="text-2xl font-bold text-violet-400">AI Bridge Unified</h1>
        <p className="text-slate-400">Stage 0 complete — scaffold, Tailwind v4, shadcn/ui ✓</p>
        <div className="flex items-center gap-3">
          <Button>Primary Button</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Destructive</Button>
        </div>
        <div className="flex items-center gap-2">
          <Badge className="bg-blue-500/20 text-blue-400">Chat Link</Badge>
          <Badge className="bg-green-500/20 text-green-400">Prompt</Badge>
          <Badge className="bg-violet-500/20 text-violet-400">Agent</Badge>
        </div>
      </div>
    </div>
  )
}
