'use client';
import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  HelpCircle,
  ShieldAlert,
  Sliders,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  AlertCircle,
  Layers,
  Activity,
} from 'lucide-react';
import type { InlineEnhancementRef } from '@/lib/course-types';
import { getPreset } from '@/lib/content/preset-registry';
import { getPsychiatryPreset } from '@/lib/psychiatry/presets';
import { evaluateHunterCriteria } from '@/lib/psychiatry-engine';
import { getPsychiatryDiagramComponent } from './psychiatry-diagrams';
import {
  PsychiatryReceptorLab,
  PsychiatryLithiumTdmLab,
  PsychiatryQtcLab,
} from './psychiatry-receptor-lab';
import { MicroCaseCard } from './psychiatry-micro-case-card';
import type { Navigation } from '../views/types';
import type { WhatWouldChangeYourMind } from '@/lib/psychiatry/types';
import { NeuroGeriatricQuickWidget } from './psychiatry-neuro-quick-widgets';

import { EvidenceBadge } from './evidence-badge';
import { EvidenceInspectorModal } from './evidence-inspector-modal';
export { EvidenceBadge, EvidenceInspectorModal };

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
  onOpenLab,
}: {
  enhancement: InlineEnhancementRef;
  lessonId: string;
  go: Navigation;
  onOpenEvidence: () => void;
  onOpenLab?: (presetId?: string) => void;
}) {
  if (enhancement.kind === 'workbench-deeplink') {
    const generalPreset = enhancement.presetId ? getPreset(enhancement.presetId) : undefined;
    const psychPreset = enhancement.presetId ? getPsychiatryPreset(enhancement.presetId) : undefined;
    const title = generalPreset?.title || psychPreset?.title || 'Pracownia kliniczna';
    const subtitle = psychPreset?.patientSummary || 'Zbadaj ten mechanizm w pracowni klinicznej.';
    const targetRoute = enhancement.presetId ? (`simulator?preset=${enhancement.presetId}` as const) : 'simulator';
    return (
      <div className="workbench-deeplink-card my-3 p-3 bg-gradient-to-r from-indigo-50 to-sky-50 border border-indigo-200 rounded-xl flex items-center justify-between text-xs">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-indigo-600 text-white rounded-lg shadow-sm">
            <Sliders size={16} />
          </div>
          <div>
            <div className="font-bold text-slate-900">{title}</div>
            <div className="text-slate-600 line-clamp-1">{subtitle}</div>
          </div>
        </div>
        <button
          type="button"
          onClick={() => {
            if (onOpenLab) {
              onOpenLab(enhancement.presetId);
            } else {
              go(targetRoute);
            }
          }}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow-sm transition-colors text-xs whitespace-nowrap ml-2 cursor-pointer"
        >
          <span>Zbadaj przypadek w pracowni</span>
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
    if (
      id.includes('4at') ||
      id.includes('bpsd') ||
      id.includes('geriatric') ||
      id.includes('capacity') ||
      id.includes('cause-hunt') ||
      id.includes('neuro-clock')
    ) {
      return (
        <NeuroGeriatricQuickWidget
          widgetId={enhancement.id}
          onOpenLab={onOpenLab}
          onOpenEvidence={onOpenEvidence}
        />
      );
    }
    return (
      <div className="my-3 p-3 bg-slate-50 border border-indigo-200 rounded-xl text-xs flex items-center justify-between">
        <div className="flex items-center gap-2 text-slate-800">
          <Activity size={16} className="text-indigo-600" />
          <span>Interaktywny moduł kliniczny: <strong>{enhancement.id}</strong></span>
        </div>
        <button
          type="button"
          onClick={() => {
            if (onOpenLab) {
              onOpenLab();
            } else {
              go('simulator');
            }
          }}
          className="text-indigo-600 hover:text-indigo-800 font-semibold underline text-xs cursor-pointer"
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
