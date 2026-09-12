'use client';
import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  HelpCircle,
  ShieldAlert,
  Sliders,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  X,
  FileCheck2,
} from 'lucide-react';
import type { InlineEnhancementRef } from '@/lib/course-types';
import type { WhatWouldChangeYourMind } from '@/lib/psychiatry/types';
import { getPsychiatryPreset } from '@/lib/psychiatry/presets';
import { PSYCHIATRY_EVIDENCE_REGISTRY } from '@/lib/psychiatry/evidence/model-limitations';
import type { Navigation } from '../views/types';

export function EvidenceBadge({
  mode,
  onClick,
}: {
  mode?: string;
  onClick: () => void;
}) {
  if (!mode) return null;

  const modeLabels: Record<string, { label: string; color: string }> = {
    'pet-model': { label: 'Badania PET (Meyer / Kapur)', color: 'bg-emerald-100 text-emerald-800 border-emerald-300' },
    'measured-tdm': { label: 'Oznaczenie TDM (AGNP 2026)', color: 'bg-blue-100 text-blue-800 border-blue-300' },
    'validated-decision-rule': { label: 'Reguła walidowana (Hunter 2003)', color: 'bg-rose-100 text-rose-800 border-rose-300' },
    'pk-sensitivity': { label: 'Model wrażliwości PK', color: 'bg-amber-100 text-amber-800 border-amber-300' },
    'safety-context': { label: 'Nadzór bezpieczeństwa', color: 'bg-red-100 text-red-800 border-red-300' },
    'clinical-framework': { label: 'Standard ICD-11 / DSM-5-TR', color: 'bg-indigo-100 text-indigo-800 border-indigo-300' },
  };

  const current = modeLabels[mode] || { label: 'Dowody kliniczne', color: 'bg-slate-100 text-slate-800 border-slate-300' };

  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-full border shadow-sm transition-all hover:opacity-85 ${current.color}`}
      title="Kliknij, aby otworzyć Evidence Inspector i sprawdzić metodologię"
    >
      <FileCheck2 size={13} />
      <span>{current.label}</span>
    </button>
  );
}

export function WhatChangesYourMindCard({
  whatChanges,
}: {
  whatChanges?: WhatWouldChangeYourMind;
}) {
  const [open, setOpen] = useState(false);

  if (!whatChanges) return null;

  return (
    <div className="what-changes-card border border-amber-300 bg-amber-50/70 rounded-xl p-4 my-5 shadow-sm">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between text-left font-semibold text-amber-950 text-sm focus:outline-none"
      >
        <div className="flex items-center gap-2">
          <HelpCircle size={18} className="text-amber-700" />
          <span>Co zmieniłoby Twoją decyzję? (Analiza kontrfaktyczna)</span>
        </div>
        {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>

      {open && (
        <div className="mt-3 pt-3 border-t border-amber-200 text-xs space-y-3">
          <div>
            <span className="font-bold text-slate-700 uppercase tracking-wide block mb-1">
              Znane fakty kliniczne:
            </span>
            <ul className="list-disc list-inside text-slate-700 space-y-0.5">
              {whatChanges.knownFacts.map((fact, idx) => (
                <li key={idx}>{fact}</li>
              ))}
            </ul>
          </div>

          <div>
            <span className="font-bold text-slate-700 uppercase tracking-wide block mb-1">
              Czynniki nieznane / luki w wywiadzie:
            </span>
            <ul className="list-disc list-inside text-slate-700 space-y-0.5">
              {whatChanges.unknownFactors.map((factor, idx) => (
                <li key={idx}>{factor}</li>
              ))}
            </ul>
          </div>

          <div className="p-2.5 bg-white border border-amber-300 rounded-lg shadow-xs">
            <span className="font-bold text-amber-900 block mb-0.5">
              Krytyczny czynnik zmieniający rozpoznanie / leczenie:
            </span>
            <p className="text-slate-800 leading-relaxed">
              {whatChanges.criticalDifferentiatingFactor}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export function InlineEnhancementRenderer({
  enhancement,
  lessonId,
  go,
  onOpenEvidence,
}: {
  enhancement: InlineEnhancementRef;
  lessonId: string;
  go: Navigation;
  onOpenEvidence: () => void;
}) {
  if (enhancement.kind === 'workbench-deeplink' && enhancement.presetId) {
    const preset = getPsychiatryPreset(enhancement.presetId);
    return (
      <div className="workbench-deeplink-card my-3 p-3 bg-gradient-to-r from-indigo-50 to-sky-50 border border-indigo-200 rounded-xl flex items-center justify-between text-xs">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-indigo-600 text-white rounded-lg shadow-sm">
            <Sliders size={16} />
          </div>
          <div>
            <div className="font-bold text-slate-900">{preset ? preset.title : 'Psychiatry Command Center'}</div>
            <div className="text-slate-600 line-clamp-1">{preset ? preset.patientSummary : 'Zbadaj ten mechanizm na żywym pacjencie.'}</div>
          </div>
        </div>
        <button
          type="button"
          onClick={() => go('simulator')}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow-sm transition-colors text-xs whitespace-nowrap ml-2"
        >
          <span>Otwórz w Command Center</span>
          <ArrowRight size={13} />
        </button>
      </div>
    );
  }

  if (enhancement.kind === 'evidence-panel') {
    return (
      <div className="evidence-panel-card my-3 p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between text-xs">
        <div className="flex items-center gap-2 text-slate-700">
          <Sparkles size={16} className="text-indigo-600" />
          <span>Poziom dowodów naukowych i ograniczenia modelu</span>
        </div>
        <button
          type="button"
          onClick={onOpenEvidence}
          className="text-indigo-600 hover:text-indigo-800 font-semibold underline text-xs"
        >
          Sprawdź szczegóły w Evidence Inspector
        </button>
      </div>
    );
  }

  return null;
}

export function EvidenceInspectorModal({
  mode,
  onClose,
}: {
  mode?: string;
  onClose: () => void;
}) {
  const evidenceKey =
    mode === 'pet-model'
      ? 'd2-kapur-heuristic'
      : mode === 'measured-tdm'
        ? 'lithium-tdm-window'
        : mode === 'validated-decision-rule'
          ? 'hunter-decision-criteria'
          : mode === 'safety-context'
            ? 'safety-context'
            : mode === 'clinical-framework'
              ? 'clinical-framework'
              : 'fridericia-qtc-threshold';

  const item =
    PSYCHIATRY_EVIDENCE_REGISTRY[evidenceKey] ||
    PSYCHIATRY_EVIDENCE_REGISTRY['clinical-framework'];

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

        <div className="mt-4 space-y-4 text-xs">
          <div>
            <span className="font-bold text-slate-700 block mb-1">Podsumowanie kliniczne:</span>
            <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 leading-relaxed">
              {item.quickSummary}
            </div>
          </div>

          <div>
            <span className="font-bold text-slate-700 block mb-1">Metodologia i zastosowanie:</span>
            <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 space-y-1">
              <div><strong>Metoda:</strong> {item.clinicalContext.measurementMethod}</div>
              <div><strong>Populacja:</strong> {item.clinicalContext.population}</div>
              <div><strong>Zastosowanie:</strong> {item.clinicalContext.applicability}</div>
            </div>
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
