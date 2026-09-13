'use client';

import React, { useState } from 'react';
import type { EvidenceClaim } from '@/lib/content/schemas/lesson-revision';
import type { Source } from '@/lib/course-types';
import { useEvidenceInspector } from '@/app/components/evidence-inspector-context';
import { Sparkles, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';

export interface WorkbenchEvidenceCardProps {
  claims: EvidenceClaim[];
  sources: Record<string, Source>;
}

export function WorkbenchEvidenceCard({ claims, sources }: WorkbenchEvidenceCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const inspector = useEvidenceInspector();

  if (!claims || claims.length === 0) return null;

  return (
    <div className="mt-4 border-t border-border/60 pt-3">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between text-xs font-semibold text-primary hover:underline"
      >
        <span className="flex items-center gap-1.5">
          <Sparkles className="h-3.5 w-3.5" />
          Dlaczego taki próg? / Dowody i źródła ({claims.length})
        </span>
        {isOpen ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
      </button>
      {isOpen && (
        <div className="mt-2.5 space-y-2.5 rounded-lg bg-muted/30 p-3 text-xs border border-border/40">
          {claims.map((claim) => (
            <div key={claim.id} className="space-y-1 border-b border-border/30 pb-2 last:border-b-0 last:pb-0">
              <div className="flex flex-wrap items-center gap-1.5">
                {claim.evidenceType && (
                  <span className="rounded bg-primary/10 px-1.5 py-0.5 text-[10px] font-semibold text-primary">
                    {claim.evidenceType}
                  </span>
                )}
                {claim.strength && (
                  <span className="rounded bg-slate-200 dark:bg-slate-700 px-1.5 py-0.5 text-[10px] font-medium text-slate-700 dark:text-slate-300">
                    {claim.strength === 'strong' ? 'Zalecenie silne' : 'Zalecenie warunkowe'}
                  </span>
                )}
                <span className="font-mono text-[10px] text-muted-foreground">{claim.id}</span>
                {inspector && (
                  <button
                    type="button"
                    onClick={() => inspector.openEvidence(claim.id)}
                    className="inline-flex items-center gap-1 text-[10px] text-primary hover:underline ml-auto"
                  >
                    <span>Inspektor dowodu</span>
                    <ExternalLink className="h-2.5 w-2.5" />
                  </button>
                )}
              </div>
              <p className="text-foreground leading-relaxed">{claim.statement}</p>
              {claim.sourceIds && claim.sourceIds.length > 0 && (
                <div className="flex flex-wrap gap-1 text-[11px] text-muted-foreground">
                  <span>Źródła:</span>
                  {claim.sourceIds.map((sid) => (
                    <span key={sid} className="underline decoration-dotted" title={sources[sid]?.title || sid}>
                      {sources[sid]?.title ? `${sources[sid].title.slice(0, 42)}... (${sources[sid].year})` : sid}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
