'use client';

import React, { useState } from 'react';
import {
  evaluateTraumaDissociation,
  DEFAULT_TRAUMA_INPUT,
  type TraumaDissociationInput,
  type TraumaDissociationOutput,
  type FrameworkEvaluation,
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
  CheckCircle2,
  XCircle,
  Scale,
} from 'lucide-react';

export type { TraumaDissociationWorkbenchPresetState };

export interface TraumaDissociationWorkbenchProps {
  mode?: 'standalone' | 'embedded';
  preset?: TraumaDissociationWorkbenchPresetState;
  definition?: WidgetPresetDefinition;
  claimIds?: string[];
  onStateChange?: (state: unknown) => void;
}

export function TraumaDissociationWorkbench({
  mode = 'standalone',
  preset,
  definition,
  claimIds,
}: TraumaDissociationWorkbenchProps) {
  const initialSection = preset?.focusSection || 'differential';
  const [section, setSection] = useState<'differential' | 'dissociation_axes' | 'safety_neurology'>(initialSection);
  const [frameworkView, setFrameworkView] = useState<'compare' | 'icd11' | 'dsm5tr'>('compare');
  const [input, setInput] = useState<TraumaDissociationInput>(() => ({
    ...DEFAULT_TRAUMA_INPUT,
    ...(preset?.input as Partial<TraumaDissociationInput> | undefined),
  }));

  // Rehydration pattern during render phase
  const [prevPreset, setPrevPreset] = useState(preset);
  if (preset !== prevPreset) {
    setPrevPreset(preset);
    if (preset?.focusSection) setSection(preset.focusSection);
    setInput({
      ...DEFAULT_TRAUMA_INPUT,
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

  const renderFrameworkCard = (fw: FrameworkEvaluation) => (
    <div className="rounded-xl border border-border/80 bg-card p-3 text-xs shadow-sm">
      <div className="flex items-center justify-between border-b pb-2 mb-2">
        <span className="font-bold text-foreground">
          {fw.conditionName} {fw.diagnosisCode && `(${fw.diagnosisCode})`}
        </span>
        <span
          className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
            fw.compatibility === 'meets'
              ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
              : fw.compatibility === 'possible'
              ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
              : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
          }`}
        >
          {fw.compatibility === 'meets'
            ? 'Spełnia kryteria'
            : fw.compatibility === 'possible'
            ? 'Częściowo / Możliwe'
            : 'Nie spełnia'}
        </span>
      </div>
      <p className="text-muted-foreground text-[11px] mb-2">{fw.explanation}</p>
      {fw.criteriaMet.length > 0 && (
        <div className="space-y-1 mb-2">
          <span className="font-semibold text-emerald-700 dark:text-emerald-400 block">Kryteria spełnione:</span>
          {fw.criteriaMet.map((c, i) => (
            <div key={i} className="flex items-start gap-1.5 text-[11px] text-emerald-800 dark:text-emerald-300">
              <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-600 mt-0.5" />
              <span>{c}</span>
            </div>
          ))}
        </div>
      )}
      {fw.criteriaMissing.length > 0 && (
        <div className="space-y-1 mb-2">
          <span className="font-semibold text-amber-700 dark:text-amber-400 block">Kryteria brakujące:</span>
          {fw.criteriaMissing.map((c, i) => (
            <div key={i} className="flex items-start gap-1.5 text-[11px] text-amber-800 dark:text-amber-300">
              <XCircle className="h-3.5 w-3.5 shrink-0 text-amber-600 mt-0.5" />
              <span>{c}</span>
            </div>
          ))}
        </div>
      )}
      {fw.exclusions.length > 0 && (
        <div className="rounded-md bg-rose-50 p-2 text-[11px] text-rose-800 dark:bg-rose-950/40 dark:text-rose-300">
          <span className="font-semibold">Wykluczenia / kryteria niespełnione: </span>
          {fw.exclusions.join('; ')}
        </div>
      )}
    </div>
  );

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
              Różnicowanie: DID (ICD-11 6B64 vs DSM-5-TR) · cPTSD · PTSD · BPD · psychoza · mimik skroniowy (TLE)
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

      {/* TAB 1: DIFFERENTIAL SYNTHESIS & NOZOLOGY */}
      {section === 'differential' && (
        <div className="space-y-4">
          {/* Framework Comparison Selector */}
          <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-indigo-100 bg-indigo-50/50 p-2 text-xs dark:border-indigo-900/40 dark:bg-indigo-950/30">
            <div className="flex items-center gap-1.5 font-semibold text-indigo-900 dark:text-indigo-200">
              <Scale className="h-3.5 w-3.5 text-indigo-600" />
              <span>Porównanie kryteriów nozologicznych:</span>
            </div>
            <div className="flex items-center gap-1 rounded-md bg-white/80 dark:bg-slate-900/80 p-0.5 border border-indigo-200/60 dark:border-indigo-800/60">
              <button
                type="button"
                onClick={() => setFrameworkView('compare')}
                className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
                  frameworkView === 'compare' ? 'bg-indigo-600 text-white shadow-xs' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Porównanie (ICD-11 vs DSM-5-TR)
              </button>
              <button
                type="button"
                onClick={() => setFrameworkView('icd11')}
                className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
                  frameworkView === 'icd11' ? 'bg-indigo-600 text-white shadow-xs' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Tylko ICD-11 (6B64)
              </button>
              <button
                type="button"
                onClick={() => setFrameworkView('dsm5tr')}
                className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
                  frameworkView === 'dsm5tr' ? 'bg-indigo-600 text-white shadow-xs' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Tylko DSM-5-TR
              </button>
            </div>
          </div>

          {/* Framework Cards Display */}
          {frameworkView === 'compare' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {renderFrameworkCard(evalOutput.frameworkAnalysis.icd11)}
              {renderFrameworkCard(evalOutput.frameworkAnalysis.dsm5tr)}
            </div>
          ) : frameworkView === 'icd11' ? (
            renderFrameworkCard(evalOutput.frameworkAnalysis.icd11)
          ) : (
            renderFrameworkCard(evalOutput.frameworkAnalysis.dsm5tr)
          )}

          {/* Diagnostic Hypotheses Grid */}
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
                  <div className="flex items-center gap-1">
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
                    <span className="rounded-full bg-muted px-1.5 py-0.5 text-[9px] text-muted-foreground font-medium">
                      Pewność: {hyp.confidence === 'high' ? 'wysoka' : hyp.confidence === 'moderate' ? 'umiarkowana' : 'niska'}
                    </span>
                  </div>
                </div>

                {hyp.dataSufficiency === 'insufficient' && (
                  <div className="my-1.5 flex items-center gap-1 rounded bg-amber-100/70 px-2 py-0.5 text-[10px] font-medium text-amber-900 dark:bg-amber-950/40 dark:text-amber-300">
                    <HelpCircle className="h-3 w-3 shrink-0" />
                    <span>Niewystarczające dane do wiarygodnej oceny (wymaga dookreślenia)</span>
                  </div>
                )}

                <p className="text-muted-foreground leading-relaxed">{hyp.rationale}</p>

                {/* Missing critical info */}
                {hyp.missingCriticalInformation.length > 0 && (
                  <div className="mt-1.5 text-[11px] text-amber-700 dark:text-amber-400">
                    <span className="font-semibold">Brakujące osie: </span>
                    {hyp.missingCriticalInformation.join('; ')}
                  </div>
                )}

                {/* Supporting evidence */}
                {hyp.supportingEvidence.length > 0 && (
                  <div className="mt-2 text-[11px] text-emerald-800 dark:text-emerald-300">
                    <span className="font-semibold">Dowody za: </span>
                    {hyp.supportingEvidence.join('; ')}
                  </div>
                )}

                {/* Opposing evidence */}
                {hyp.opposingEvidence.length > 0 && (
                  <div className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">
                    <span className="font-semibold">Argumenty przeciw: </span>
                    {hyp.opposingEvidence.join('; ')}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Neurological Safety Interpretation */}
          {evalOutput.neurologicalAssessment.concern !== 'low' && (
            <div className="rounded-xl border border-sky-200 bg-sky-50/70 p-3 text-xs dark:border-sky-900/50 dark:bg-sky-950/30">
              <div className="flex items-center justify-between font-semibold text-sky-900 dark:text-sky-300 mb-1">
                <span className="flex items-center gap-1.5">
                  <Activity className="h-4 w-4 text-sky-600" />
                  Ocena neurologiczna (TLE Workup Priority): {evalOutput.neurologicalAssessment.workupPriority}
                </span>
                <span className="text-[10px] rounded-full bg-sky-200 px-2 py-0.5 text-sky-800 dark:bg-sky-900 dark:text-sky-200">
                  Poziom niepokoju: {evalOutput.neurologicalAssessment.concern}
                </span>
              </div>
              <div className="text-[11px] space-y-1 text-sky-800 dark:text-sky-200">
                <p>{evalOutput.neurologicalAssessment.investigationInterpretation.eeg}</p>
                <p>{evalOutput.neurologicalAssessment.investigationInterpretation.mri}</p>
                <p className="font-semibold text-rose-700 dark:text-rose-400 mt-1">
                  {evalOutput.neurologicalAssessment.investigationInterpretation.safetyInvariant}
                </p>
              </div>
            </div>
          )}

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
