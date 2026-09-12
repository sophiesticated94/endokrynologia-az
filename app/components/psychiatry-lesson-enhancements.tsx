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
  CheckCircle2,
  AlertCircle,
  Layers,
  Activity,
} from 'lucide-react';
import type { InlineEnhancementRef } from '@/lib/course-types';
import { getPsychiatryPreset } from '@/lib/psychiatry/presets';
import { evaluateHunterCriteria } from '@/lib/psychiatry-engine';
import { PSYCHIATRY_EVIDENCE_REGISTRY } from '@/lib/psychiatry/evidence/model-limitations';
import { getPsychiatryDiagramComponent } from './psychiatry-diagrams';
import {
  PsychiatryReceptorLab,
  PsychiatryLithiumTdmLab,
  PsychiatryQtcLab,
} from './psychiatry-receptor-lab';
import { psychiatrySources } from '@/lib/course-psychiatry-sources';
import { MicroCaseCard } from './psychiatry-micro-case-card';
import type { Navigation } from '../views/types';
import type { WhatWouldChangeYourMind } from '@/lib/psychiatry/types';

export function EvidenceBadge({
  mode,
  claimKey,
  label,
  onClick,
}: {
  mode?: string;
  claimKey?: string;
  label?: string;
  onClick?: () => void;
}) {
  if (!mode && !claimKey) return null;

  const modeLabels: Record<string, { label: string; color: string }> = {
    'pet-model': { label: 'Badania PET (Meyer / Kapur)', color: 'bg-emerald-100 text-emerald-800 border-emerald-300' },
    'measured-tdm': { label: 'Oznaczenie TDM (AGNP 2026)', color: 'bg-blue-100 text-blue-800 border-blue-300' },
    'validated-decision-rule': { label: 'Reguła walidowana (Hunter 2003)', color: 'bg-rose-100 text-rose-800 border-rose-300' },
    'pk-sensitivity': { label: 'Model wrażliwości PK', color: 'bg-amber-100 text-amber-800 border-amber-300' },
    'safety-context': { label: 'Nadzór bezpieczeństwa', color: 'bg-red-100 text-red-800 border-red-300' },
    'clinical-framework': { label: 'Standard ICD-11 / DSM-5-TR', color: 'bg-indigo-100 text-indigo-800 border-indigo-300' },
  };

  const claimItem = claimKey ? PSYCHIATRY_EVIDENCE_REGISTRY[claimKey] : undefined;
  const current = mode ? (modeLabels[mode] || { label: 'Dowody kliniczne', color: 'bg-slate-100 text-slate-800 border-slate-300' }) : {
    label: claimItem?.claimLabel || 'EBM Dowody',
    color: 'bg-indigo-100 text-indigo-800 border-indigo-300',
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-1 px-2 py-0.5 text-[11px] font-semibold rounded-full border shadow-xs transition-all hover:opacity-85 ${current.color}`}
      title="Kliknij, aby otworzyć Evidence Inspector i sprawdzić metodologię"
    >
      <FileCheck2 size={12} />
      <span className="truncate max-w-[200px]">{label || current.label}</span>
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
        <div className="mt-3 pt-3 border-t border-amber-200 text-xs text-amber-900 space-y-2">
          {whatChanges.knownFacts && whatChanges.knownFacts.length > 0 && (
            <div>
              <span className="font-semibold text-slate-800">Znane fakty kliniczne:</span>
              <ul className="list-disc list-inside mt-0.5 space-y-0.5 text-slate-700">
                {whatChanges.knownFacts.map((fact, idx) => (
                  <li key={idx}>{fact}</li>
                ))}
              </ul>
            </div>
          )}
          {whatChanges.unknownFactors && whatChanges.unknownFactors.length > 0 && (
            <div>
              <span className="font-semibold text-slate-800">Czynniki nieznane / luki:</span>
              <ul className="list-disc list-inside mt-0.5 space-y-0.5 text-slate-700">
                {whatChanges.unknownFactors.map((f, idx) => (
                  <li key={idx}>{f}</li>
                ))}
              </ul>
            </div>
          )}
          {whatChanges.criticalDifferentiatingFactor && (
            <div className="bg-white/80 p-2.5 rounded-lg border border-amber-200 text-slate-700">
              <strong className="text-amber-950">Kluczowy czynnik różnicujący:</strong>{' '}
              {whatChanges.criticalDifferentiatingFactor}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export function HunterCriteriaQuickLab({ onOpenClaim }: { onOpenClaim?: (key: string) => void }) {
  const [exposure, setExposure] = useState<boolean | 'unknown'>('unknown');
  const [clonus, setClonus] = useState(false);
  const [inducible, setInducible] = useState(false);
  const [ocular, setOcular] = useState(false);
  const [agitation, setAgitation] = useState(false);
  const [diaphoresis, setDiaphoresis] = useState(false);
  const [tremor, setTremor] = useState(false);
  const [hyperreflexia, setHyperreflexia] = useState(false);
  const [hypertonia, setHypertonia] = useState(false);
  const [tempOver38, setTempOver38] = useState(false);

  const evaluation = evaluateHunterCriteria(exposure, {
    spontaneousClonus: clonus,
    inducibleClonus: inducible,
    ocularClonus: ocular,
    agitation,
    diaphoresis,
    tremor,
    hyperreflexia,
    hypertonia,
    hyperthermiaOver38: tempOver38,
  });

  return (
    <div className="hunter-quick-lab my-3 p-3.5 bg-rose-50/60 border border-rose-200 rounded-xl text-xs">
      <div className="flex items-center justify-between mb-2 flex-wrap gap-1">
        <span className="font-bold text-rose-950 flex items-center gap-1.5">
          <ShieldAlert size={15} className="text-rose-700" /> Kryteria Huntera (Dunkley 2003)
        </span>
        <div className="flex items-center gap-1.5">
          {onOpenClaim && <EvidenceBadge claimKey="hunter-validation" label="Hunter EBM (84% / 97%)" onClick={() => onOpenClaim('hunter-validation')} />}
          <span className={`px-2 py-0.5 rounded-full font-bold text-[11px] ${
            evaluation.meetsCriteria ? 'bg-red-600 text-white animate-pulse' : exposure === 'unknown' ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-700'
          }`}>
            {evaluation.meetsCriteria ? 'KRYTERIA SPEŁNIONE' : exposure === 'unknown' ? 'EKSPOZYCJA NIEZNANA' : 'Kryteria niespełnione'}
          </span>
        </div>
      </div>
      <div className="mb-2 p-1.5 bg-white/80 border border-rose-100 rounded-lg flex items-center gap-2 flex-wrap">
        <span className="font-semibold text-slate-700">Ekspozycja serotoninergiczna:</span>
        <label className="cursor-pointer flex items-center gap-1"><input type="radio" name="hq-exp" checked={exposure === true} onChange={() => setExposure(true)} /> Potwierdzona</label>
        <label className="cursor-pointer flex items-center gap-1"><input type="radio" name="hq-exp" checked={exposure === false} onChange={() => setExposure(false)} /> Brak</label>
        <label className="cursor-pointer flex items-center gap-1"><input type="radio" name="hq-exp" checked={exposure === 'unknown'} onChange={() => setExposure('unknown')} /> Nieznana</label>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 my-2 text-slate-700">
        {[
          { label: 'Klonus samoistny', val: clonus, set: setClonus },
          { label: 'Klonus indukowany', val: inducible, set: setInducible },
          { label: 'Klonus oczny', val: ocular, set: setOcular },
          { label: 'Pobudzenie (agitation)', val: agitation, set: setAgitation },
          { label: 'Zlewne poty', val: diaphoresis, set: setDiaphoresis },
          { label: 'Drżenie mięśniowe', val: tremor, set: setTremor },
          { label: 'Hiperrefleksja', val: hyperreflexia, set: setHyperreflexia },
          { label: 'Hipertonia (sztywność)', val: hypertonia, set: setHypertonia },
          { label: 'Gorączka >38°C', val: tempOver38, set: setTempOver38 },
        ].map((item, idx) => (
          <label key={idx} className="flex items-center gap-1.5 cursor-pointer">
            <input type="checkbox" checked={item.val} onChange={e => item.set(e.target.checked)} className="rounded text-rose-600" />
            <span className="text-[11px]">{item.label}</span>
          </label>
        ))}
      </div>
      <div className="mt-1.5 p-2 bg-white/90 border border-rose-200 rounded-lg text-[11px]">
        {evaluation.conditionMet && <div className="font-semibold text-rose-900">{evaluation.conditionMet}</div>}
        <div className="text-slate-600">{evaluation.rationale}</div>
        {evaluation.missingInformation && evaluation.missingInformation.length > 0 && (
          <div className="text-amber-800 font-medium mt-0.5">Brak: {evaluation.missingInformation.join('; ')}</div>
        )}
      </div>
      <p className="text-[10px] text-slate-500 mt-1 leading-tight">{evaluation.disclaimer}</p>
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
  if (enhancement.kind === 'workbench-deeplink') {
    const preset = enhancement.presetId ? getPsychiatryPreset(enhancement.presetId) : undefined;
    const targetRoute = enhancement.presetId ? (`simulator?preset=${enhancement.presetId}` as const) : 'simulator';
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
          onClick={() => go(targetRoute)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow-sm transition-colors text-xs whitespace-nowrap ml-2"
        >
          <span>Otwórz w Command Center</span>
          <ArrowRight size={13} />
        </button>
      </div>
    );
  }

  if (enhancement.kind === 'diagram') {
    const DiagramComp = getPsychiatryDiagramComponent(enhancement.id);
    if (DiagramComp) {
      return <DiagramComp />;
    }
    return (
      <div className="my-3 p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs flex items-center gap-2 text-slate-700">
        <Layers size={16} className="text-indigo-600" />
        <span>Diagram kliniczny: <strong>{enhancement.id.replace(/^diagram-/, '')}</strong></span>
      </div>
    );
  }

  if (enhancement.kind === 'interactive-widget') {
    const id = enhancement.id.toLowerCase();
    if (id.includes('d2-pet') || id.includes('receptor')) {
      return <PsychiatryReceptorLab compact />;
    }
    if (id.includes('lithium') || id.includes('tdm')) {
      return <PsychiatryLithiumTdmLab compact />;
    }
    if (id.includes('qtc') || id.includes('fridericia')) {
      return <PsychiatryQtcLab compact />;
    }
    if (id.includes('hunter')) {
      return <HunterCriteriaQuickLab onOpenClaim={onOpenEvidence} />;
    }
    return (
      <div className="my-3 p-3 bg-slate-50 border border-indigo-200 rounded-xl text-xs flex items-center justify-between">
        <div className="flex items-center gap-2 text-slate-800">
          <Activity size={16} className="text-indigo-600" />
          <span>Interaktywny moduł kliniczny: <strong>{enhancement.id}</strong></span>
        </div>
        <button
          type="button"
          onClick={() => go('simulator')}
          className="text-indigo-600 hover:text-indigo-800 font-semibold underline text-xs"
        >
          Otwórz w pracowni
        </button>
      </div>
    );
  }

  if (enhancement.kind === 'micro-case') {
    return <MicroCaseCard caseId={enhancement.id} />;
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

  return (
    <div className="my-2 p-2 bg-slate-50 border rounded text-xs text-slate-600">
      Moduł dydaktyczny: {enhancement.id}
    </div>
  );
}

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
