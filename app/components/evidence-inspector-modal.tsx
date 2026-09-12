'use client';
import { useState } from 'react';
import { ExternalLink, ShieldAlert, X } from 'lucide-react';
import { PSYCHIATRY_EVIDENCE_REGISTRY } from '@/lib/psychiatry/evidence/model-limitations';
import { psychiatrySources } from '@/lib/course-psychiatry-sources';

export function EvidenceInspectorModal({
  mode,
  claimKey,
  onClose,
}: {
  mode?: string;
  claimKey?: string;
  onClose: () => void;
}) {
  const [activeTab, setActiveTab] = useState<'quick' | 'clinical' | 'research'>('quick');

  const resolvedKey =
    claimKey ||
    (mode === 'pet-model'
      ? 'd2-kapur-heuristic'
      : mode === 'measured-tdm'
        ? 'lithium-tdm-window'
        : mode === 'validated-decision-rule'
          ? 'hunter-decision-criteria'
          : mode === 'safety-context'
            ? 'safety-context'
            : mode === 'clinical-framework'
              ? 'clinical-framework'
              : 'fridericia-qtc-threshold');

  const item =
    PSYCHIATRY_EVIDENCE_REGISTRY[resolvedKey] ||
    PSYCHIATRY_EVIDENCE_REGISTRY['clinical-framework'];

  const sourceMeta = item.sourceId ? psychiatrySources[item.sourceId] : undefined;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 border border-slate-200 text-slate-800 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-3 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs uppercase tracking-wide font-bold text-indigo-600">
                Evidence Inspector
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 border border-slate-200 font-mono font-semibold text-slate-700">
                {item.origin} · {item.level}
              </span>
            </div>
            <h3 className="text-base font-bold text-slate-900">{item.claimLabel}</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100"
          >
            <X size={20} />
          </button>
        </div>

        {/* Zakładki 3-poziomowe */}
        <div className="flex gap-2 border-b border-slate-200 pt-3 pb-2 text-xs">
          <button
            type="button"
            onClick={() => setActiveTab('quick')}
            className={`px-3 py-1 rounded-lg font-medium transition-colors ${activeTab === 'quick' ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:bg-slate-100'}`}
          >
            1. Quick (Kliniczne)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('clinical')}
            className={`px-3 py-1 rounded-lg font-medium transition-colors ${activeTab === 'clinical' ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:bg-slate-100'}`}
          >
            2. Clinical (Metoda)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('research')}
            className={`px-3 py-1 rounded-lg font-medium transition-colors ${activeTab === 'research' ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:bg-slate-100'}`}
          >
            3. Research (EBM &amp; Ryzyka)
          </button>
        </div>

        <div className="mt-4 space-y-4 text-xs">
          {activeTab === 'quick' && (
            <div className="space-y-3">
              <div>
                <span className="font-bold text-slate-700 block mb-1">Podsumowanie i wniosek:</span>
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 leading-relaxed">
                  {item.quickSummary}
                </div>
              </div>
              {sourceMeta && (
                <div className="p-2.5 bg-indigo-50/50 border border-indigo-100 rounded-lg">
                  <span className="font-bold text-indigo-900 block mb-1">Główne źródło referencyjne:</span>
                  <div className="text-slate-700">{sourceMeta.title} ({sourceMeta.year}) — <em>{sourceMeta.kind}</em></div>
                  {sourceMeta.url && (
                    <a href={sourceMeta.url} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline flex items-center gap-1 mt-1 font-semibold">
                      Szczegóły / Odnośnik <ExternalLink size={12} />
                    </a>
                  )}
                </div>
              )}
            </div>
          )}

          {activeTab === 'clinical' && (
            <div className="space-y-3">
              <div>
                <span className="font-bold text-slate-700 block mb-1">Metodologia i zastosowanie:</span>
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 space-y-1.5">
                  <div><strong>Metoda pomiaru:</strong> {item.clinicalContext.measurementMethod}</div>
                  <div><strong>Populacja badana:</strong> {item.clinicalContext.population}</div>
                  <div><strong>Wskazania / Aplikowalność:</strong> {item.clinicalContext.applicability}</div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'research' && (
            <div className="space-y-3">
              <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg space-y-1">
                <div><strong>Model / metoda:</strong> {item.researchContext.modelType}</div>
                {item.researchContext.uncertaintyOrCI && <div><strong>Niepewność / CI:</strong> {item.researchContext.uncertaintyOrCI}</div>}
              </div>
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl">
                <div className="flex items-center gap-1.5 text-rose-800 font-bold mb-1">
                  <ShieldAlert size={15} />
                  <span>Ograniczenia modelu (Czego NIE wolno ekstrapolować):</span>
                </div>
                <ul className="list-disc list-inside text-rose-900 space-y-1">
                  {item.researchContext.limitations.map((limit: string, idx: number) => (
                    <li key={idx}>{limit}</li>
                  ))}
                  {item.researchContext.whatCannotBeInferred.map((noInfer: string, idx: number) => (
                    <li key={`no-infer-${idx}`}>{noInfer}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>

        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-medium rounded-lg text-xs transition-colors"
          >
            Zamknij
          </button>
        </div>
      </div>
    </div>
  );
}
