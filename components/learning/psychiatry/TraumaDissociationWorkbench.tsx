'use client';

import React, { useState } from 'react';
import {
  evaluateTraumaDissociation,
  type TraumaDissociationInput,
  type TraumaDissociationOutput,
} from '@/lib/psychiatry/engines/trauma-dissociation-engine';
import type {
  TraumaDissociationWorkbenchPresetState,
  TraumaDissociationControlId,
  WidgetPresetDefinition,
} from '@/lib/content/preset-registry';
import { traumaClaims, traumaSources } from '@/lib/psychiatry/trauma-content';
import { WorkbenchEvidenceCard } from '../endocrinology/WorkbenchEvidenceCard';
import { TraumaWorkbenchControls } from './TraumaWorkbenchControls';
import {
  AlertTriangle,
  ShieldAlert,
  Brain,
  Sparkles,
  HelpCircle,
  Activity,
  Layers,
} from 'lucide-react';

export type { TraumaDissociationWorkbenchPresetState };

export interface TraumaDissociationWorkbenchProps {
  mode?: 'standalone' | 'embedded';
  preset?: TraumaDissociationWorkbenchPresetState;
  definition?: WidgetPresetDefinition;
  claimIds?: string[];
  onStateChange?: (state: unknown) => void;
}

const DEFAULT_INPUT: TraumaDissociationInput = {
  identityDiscontinuity: 'none',
  amnesiaType: 'none',
  depersonalizationDerealization: false,
  realityTesting: 'intact',
  traumaIntrusions: 'none',
  avoidanceHyperarousal: false,
  affectInstability: 'none',
  interpersonalPattern: 'stable',
  hallucinations: 'none',
  thoughtDisorder: false,
  symptomDuration: 'chronic_months',
  neurologicalFeatures: {
    hasAuraOrEpigastricRising: false,
    stereotypedSecondsDuration: false,
    postictalConfusion: false,
    focalDeficits: false,
  },
  substanceContext: {
    activeIntoxicationOrWithdrawal: false,
    onsetDirectlyTiedToSubstance: false,
    substanceDetails: '',
  },
  suicidalityRisk: 'none',
};

export function TraumaDissociationWorkbench({
  mode = 'standalone',
  preset,
  definition,
  claimIds,
}: TraumaDissociationWorkbenchProps) {
  const initialSection = preset?.focusSection || 'differential';
  const [section, setSection] = useState<'differential' | 'dissociation_axes' | 'safety_neurology'>(initialSection);
  const [input, setInput] = useState<TraumaDissociationInput>(() => ({
    ...DEFAULT_INPUT,
    ...(preset?.input as Partial<TraumaDissociationInput> | undefined),
  }));

  // Rehydration pattern during render phase
  const [prevPreset, setPrevPreset] = useState(preset);
  if (preset !== prevPreset) {
    setPrevPreset(preset);
    if (preset?.focusSection) setSection(preset.focusSection);
    setInput({
      ...DEFAULT_INPUT,
      ...(preset?.input as Partial<TraumaDissociationInput> | undefined),
    });
  }

  const locked = (field: TraumaDissociationControlId): boolean => {
    return Boolean(preset?.lockedFields?.includes(field));
  };

  const visible = (field: TraumaDissociationControlId): boolean => {
    if (!preset?.visibleControls || preset.visibleControls.length === 0) return true;
    return preset.visibleControls.includes(field);
  };

  const evalOutput: TraumaDissociationOutput = evaluateTraumaDissociation(input);

  const relevantClaims = React.useMemo(() => {
    const ids = claimIds || definition?.claimIds || [];
    if (ids.length > 0) {
      return traumaClaims.filter((c) => ids.includes(c.id));
    }
    return traumaClaims.slice(0, 3);
  }, [claimIds, definition]);

  return (
    <div className={`trauma-dissociation-workbench flex flex-col gap-4 text-slate-800 dark:text-slate-100 ${mode === 'embedded' ? 'text-sm' : ''}`}>
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/60 pb-3">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
            <Brain className="h-4 w-4" />
          </span>
          <div>
            <h3 className="text-sm font-bold tracking-tight text-foreground">
              {definition?.title || 'Kliniczna Pracownia Traumy i Dysocjacji'}
            </h3>
            <p className="text-[11px] text-muted-foreground">
              Różnicowanie: DID · cPTSD · PTSD · BPD · psychoza · mimik skroniowy (TLE)
            </p>
          </div>
        </div>

        {/* Section Tabs */}
        <div className="flex items-center gap-1 rounded-lg bg-muted/60 p-0.5 text-xs">
          <button
            type="button"
            onClick={() => setSection('differential')}
            className={`rounded-md px-2.5 py-1 font-medium transition-colors ${
              section === 'differential'
                ? 'bg-white dark:bg-slate-800 text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <span className="flex items-center gap-1">
              <Layers className="h-3 w-3" />
              Różnicowanie
            </span>
          </button>
          <button
            type="button"
            onClick={() => setSection('dissociation_axes')}
            className={`rounded-md px-2.5 py-1 font-medium transition-colors ${
              section === 'dissociation_axes'
                ? 'bg-white dark:bg-slate-800 text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <span className="flex items-center gap-1">
              <Activity className="h-3 w-3" />
              Osie objawowe
            </span>
          </button>
          <button
            type="button"
            onClick={() => setSection('safety_neurology')}
            className={`rounded-md px-2.5 py-1 font-medium transition-colors ${
              section === 'safety_neurology'
                ? 'bg-white dark:bg-slate-800 text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <span className="flex items-center gap-1">
              <ShieldAlert className="h-3 w-3" />
              Bezpieczeństwo i OUN
            </span>
          </button>
        </div>
      </div>

      {/* Red Flags Alert */}
      {evalOutput.redFlags.length > 0 && (
        <div className="rounded-xl border border-rose-200 bg-rose-50/80 p-3 text-xs dark:border-rose-900/50 dark:bg-rose-950/30">
          <div className="flex items-center gap-2 font-semibold text-rose-800 dark:text-rose-300">
            <AlertTriangle className="h-4 w-4 shrink-0 text-rose-600 dark:text-rose-400" />
            <span>Czerwone flagi kliniczne ({evalOutput.redFlags.length})</span>
          </div>
          <ul className="mt-1.5 list-inside list-disc space-y-1 text-rose-700 dark:text-rose-300">
            {evalOutput.redFlags.map((flag, idx) => (
              <li key={idx} className="leading-snug">{flag}</li>
            ))}
          </ul>
          {evalOutput.safetyActionRequired && (
            <div className="mt-2 rounded-lg bg-rose-100/80 p-2 font-medium text-rose-900 dark:bg-rose-900/40 dark:text-rose-200">
              Priorytet: {evalOutput.safetyActionRequired}
            </div>
          )}
        </div>
      )}

      {/* TAB 1: DIFFERENTIAL SYNTHESIS */}
      {section === 'differential' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {evalOutput.hypotheses.map((hyp, idx) => (
              <div
                key={idx}
                className={`rounded-xl border p-3 text-xs transition-all ${
                  hyp.level === 'primary_candidate'
                    ? 'border-emerald-300 bg-emerald-50/70 dark:border-emerald-900/50 dark:bg-emerald-950/20'
                    : hyp.level === 'possible_consideration'
                    ? 'border-amber-300 bg-amber-50/60 dark:border-amber-900/50 dark:bg-amber-950/20'
                    : 'border-slate-200 bg-slate-50/50 opacity-70 dark:border-slate-800 dark:bg-slate-900/30'
                }`}
              >
                <div className="flex items-center justify-between gap-1 mb-1">
                  <span className="font-bold text-foreground">{hyp.condition}</span>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                      hyp.level === 'primary_candidate'
                        ? 'bg-emerald-200 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200'
                        : hyp.level === 'possible_consideration'
                        ? 'bg-amber-200 text-amber-800 dark:bg-amber-900 dark:text-amber-200'
                        : 'bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-400'
                    }`}
                  >
                    {hyp.level === 'primary_candidate' ? 'Kandydat główny' : hyp.level === 'possible_consideration' ? 'Do rozważenia' : 'Mało prawdopodobne'}
                  </span>
                </div>
                <p className="text-muted-foreground leading-relaxed">{hyp.rationale}</p>
                {/* Supporting evidence */}
                {evalOutput.supportingEvidence[hyp.category]?.length > 0 && (
                  <div className="mt-2 text-[11px] text-emerald-800 dark:text-emerald-300">
                    <span className="font-semibold">Dowody za: </span>
                    {evalOutput.supportingEvidence[hyp.category].join('; ')}
                  </div>
                )}
                {/* Opposing evidence */}
                {evalOutput.opposingEvidence[hyp.category]?.length > 0 && (
                  <div className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">
                    <span className="font-semibold">Argumenty przeciw: </span>
                    {evalOutput.opposingEvidence[hyp.category].join('; ')}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Missing Information */}
          {evalOutput.missingInformation.length > 0 && (
            <div className="rounded-xl border border-amber-200 bg-amber-50/70 p-3 text-xs dark:border-amber-900/50 dark:bg-amber-950/20">
              <div className="flex items-center gap-1.5 font-semibold text-amber-900 dark:text-amber-300">
                <HelpCircle className="h-3.5 w-3.5" />
                <span>Brakujące dane do rozstrzygnięcia ({evalOutput.missingInformation.length})</span>
              </div>
              <ul className="mt-1.5 list-inside list-disc space-y-1 text-amber-800 dark:text-amber-300/90">
                {evalOutput.missingInformation.map((info, idx) => (
                  <li key={idx}>{info}</li>
                ))}
              </ul>
            </div>
          )}

          {/* What would change decision */}
          <div className="rounded-xl border border-indigo-100 bg-indigo-50/40 p-3 text-xs dark:border-indigo-900/40 dark:bg-indigo-950/20">
            <div className="flex items-center gap-1.5 font-semibold text-indigo-900 dark:text-indigo-300">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Co zmieniłoby decyzję kliniczną? (Myślenie kontrfaktyczne)</span>
            </div>
            <ul className="mt-1.5 list-inside list-disc space-y-1 text-indigo-800/90 dark:text-indigo-300/90">
              {evalOutput.whatWouldChangeDecision.map((item, idx) => (
                <li key={idx} className="leading-snug">{item}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* TAB 2 & TAB 3: CONTROLS */}
      {(section === 'dissociation_axes' || section === 'safety_neurology') && (
        <TraumaWorkbenchControls
          section={section}
          input={input}
          setInput={setInput}
          locked={locked}
          visible={visible}
        />
      )}

      {/* Evidence and citations card */}
      <WorkbenchEvidenceCard claims={relevantClaims} sources={traumaSources} />
    </div>
  );
}
