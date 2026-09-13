'use client';

import React, { useState } from 'react';
import {
  evaluateCortisolStatus,
  evaluatePrimaryAldosteronism,
  evaluatePheoSafety,
  evaluateIncidentaloma,
  type AdrenalCortisolEvalInput,
  type PrimaryAldoEvalInput,
  type PheoEvalInput,
  type AdrenalIncidentalomaInput,
} from '@/lib/endocrinology/adrenal/adrenal-reasoning-engine';
import { AlertCircle, CheckCircle2, Info, ShieldAlert, Sparkles, Activity } from 'lucide-react';

export interface AdrenalWorkbenchPresetState {
  focusSection?: 'hpa_cortisol' | 'primary_aldosteronism' | 'pheochromocytoma' | 'incidentaloma';
  visibleControls?: string[];
  lockedFields?: string[];
  initialCortisol?: Partial<AdrenalCortisolEvalInput>;
  initialPA?: Partial<PrimaryAldoEvalInput>;
  initialPheo?: Partial<PheoEvalInput>;
  initialIncidentaloma?: Partial<AdrenalIncidentalomaInput>;
}

export interface AdrenalWorkbenchProps {
  mode?: 'standalone' | 'embedded';
  preset?: AdrenalWorkbenchPresetState;
  onStateChange?: (state: unknown) => void;
}

export function AdrenalWorkbench({ mode = 'standalone', preset }: AdrenalWorkbenchProps) {
  const activeTab = preset?.focusSection || 'primary_aldosteronism';
  const [section, setSection] = useState<'hpa_cortisol' | 'primary_aldosteronism' | 'pheochromocytoma' | 'incidentaloma'>(activeTab);

  // 1. Cortisol state
  const [cortisolInput, setCortisolInput] = useState<AdrenalCortisolEvalInput>({
    morningCortisolUgDl: preset?.initialCortisol?.morningCortisolUgDl ?? 8.5,
    cbgAltered: preset?.initialCortisol?.cbgAltered ?? false,
    synacthenPeakUgDl: preset?.initialCortisol?.synacthenPeakUgDl,
    recentPituitaryEventWeeks: preset?.initialCortisol?.recentPituitaryEventWeeks,
    assayMethod: preset?.initialCortisol?.assayMethod ?? 'immunoassay',
  });

  // 2. PA state
  const [paInput, setPaInput] = useState<PrimaryAldoEvalInput>({
    aldosteroneNgDl: preset?.initialPA?.aldosteroneNgDl ?? 24.0,
    reninType: preset?.initialPA?.reninType ?? 'pra_ng_ml_h',
    reninValue: preset?.initialPA?.reninValue ?? 0.4,
    potassiumMmolL: preset?.initialPA?.potassiumMmolL ?? 3.4,
    medications: preset?.initialPA?.medications ?? ['acei_arb'],
    spontaneousHypokalemia: preset?.initialPA?.spontaneousHypokalemia ?? true,
  });

  // 3. Pheo state
  const [pheoInput, setPheoInput] = useState<PheoEvalInput>({
    normetanephrineFraction: preset?.initialPheo?.normetanephrineFraction ?? 4.2,
    metanephrineFraction: preset?.initialPheo?.metanephrineFraction ?? 1.1,
    currentMedications: preset?.initialPheo?.currentMedications ?? [],
    alphaBlockerInitiated: preset?.initialPheo?.alphaBlockerInitiated ?? false,
    betaBlockerInitiated: preset?.initialPheo?.betaBlockerInitiated ?? true,
    plannedSurgeryOrBiopsy: preset?.initialPheo?.plannedSurgeryOrBiopsy ?? false,
  });

  // 4. Incidentaloma state
  const [incInput, setIncInput] = useState<AdrenalIncidentalomaInput>({
    sizeMm: preset?.initialIncidentaloma?.sizeMm ?? 28,
    unenhancedHu: preset?.initialIncidentaloma?.unenhancedHu ?? 8,
    postDstCortisolUgDl: preset?.initialIncidentaloma?.postDstCortisolUgDl ?? 2.4,
    arrPositive: preset?.initialIncidentaloma?.arrPositive ?? false,
    metanephrinesPositive: preset?.initialIncidentaloma?.metanephrinesPositive ?? false,
  });

  const cortisolRes = evaluateCortisolStatus(cortisolInput);
  const paRes = evaluatePrimaryAldosteronism(paInput);
  const pheoRes = evaluatePheoSafety(pheoInput);
  const incRes = evaluateIncidentaloma(incInput);

  return (
    <div className="rounded-xl border border-border bg-card p-5 text-card-foreground shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-3">
        <div className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-primary" />
          <h3 className="font-semibold text-base tracking-tight">Adrenal Clinical Reasoning Workbench</h3>
          <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
            {mode === 'embedded' ? 'Guided Practice' : 'Full Workbench'}
          </span>
        </div>

        {mode === 'standalone' && (
          <div className="flex gap-1 rounded-lg bg-muted p-1 text-xs">
            <button
              onClick={() => setSection('primary_aldosteronism')}
              className={`rounded px-2.5 py-1 font-medium transition ${section === 'primary_aldosteronism' ? 'bg-background shadow-xs text-foreground' : 'text-muted-foreground'}`}
            >
              Hiperaldosteronizm (PA)
            </button>
            <button
              onClick={() => setSection('hpa_cortisol')}
              className={`rounded px-2.5 py-1 font-medium transition ${section === 'hpa_cortisol' ? 'bg-background shadow-xs text-foreground' : 'text-muted-foreground'}`}
            >
              Oś HPA / Kortyzol
            </button>
            <button
              onClick={() => setSection('pheochromocytoma')}
              className={`rounded px-2.5 py-1 font-medium transition ${section === 'pheochromocytoma' ? 'bg-background shadow-xs text-foreground' : 'text-muted-foreground'}`}
            >
              Guz chromochłonny
            </button>
            <button
              onClick={() => setSection('incidentaloma')}
              className={`rounded px-2.5 py-1 font-medium transition ${section === 'incidentaloma' ? 'bg-background shadow-xs text-foreground' : 'text-muted-foreground'}`}
            >
              Incydentaloma / MACS
            </button>
          </div>
        )}
      </div>

      <div className="mt-4">
        {section === 'primary_aldosteronism' && (
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-foreground flex items-center gap-1.5">
                <Sparkles className="h-4 w-4 text-amber-500" />
                Parametry biochemiczne i leki (ES 2025)
              </h4>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <label className="flex flex-col gap-1">
                  <span className="text-muted-foreground">Aldosteron (PAC, ng/dl)</span>
                  <input
                    type="number"
                    value={paInput.aldosteroneNgDl}
                    onChange={(e) => setPaInput({ ...paInput, aldosteroneNgDl: Number(e.target.value) })}
                    className="rounded border border-input bg-background px-2.5 py-1.5"
                  />
                </label>
                <label className="flex flex-col gap-1">
                  <span className="text-muted-foreground">Renina (PRA, ng/ml/h)</span>
                  <input
                    type="number"
                    step="0.1"
                    value={paInput.reninValue}
                    onChange={(e) => setPaInput({ ...paInput, reninValue: Number(e.target.value) })}
                    className="rounded border border-input bg-background px-2.5 py-1.5"
                  />
                </label>
                <label className="flex flex-col gap-1">
                  <span className="text-muted-foreground">Potas (K+, mmol/l)</span>
                  <input
                    type="number"
                    step="0.1"
                    value={paInput.potassiumMmolL}
                    onChange={(e) => setPaInput({ ...paInput, potassiumMmolL: Number(e.target.value) })}
                    className="rounded border border-input bg-background px-2.5 py-1.5"
                  />
                </label>
                <label className="flex items-center gap-2 pt-4">
                  <input
                    type="checkbox"
                    checked={paInput.spontaneousHypokalemia}
                    onChange={(e) => setPaInput({ ...paInput, spontaneousHypokalemia: e.target.checked })}
                  />
                  <span className="text-xs">Spontaniczna hipokaliemia</span>
                </label>
              </div>
            </div>

            <div className="rounded-lg bg-muted/40 p-3.5 text-xs space-y-2 border border-border/50">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-sm">Wskaźnik ARR:</span>
                <span className="font-mono text-base font-bold text-primary">{paRes.arrValue} {paRes.arrUnit}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">Status przesiewowy:</span>
                <span className={`font-semibold ${paRes.isArrPositive ? 'text-emerald-600 dark:text-emerald-400' : 'text-muted-foreground'}`}>
                  {paRes.isArrPositive ? 'DODATNI (Podejrzenie PA)' : 'UJEMNY'}
                </span>
              </div>
              {paRes.medicationInterferences.map((m, idx) => (
                <div key={idx} className="flex gap-1.5 items-start text-amber-700 dark:text-amber-300">
                  <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                  <span>{m}</span>
                </div>
              ))}
              <div className="pt-2 border-t border-border/50 text-foreground font-medium">
                {paRes.recommendation}
              </div>
            </div>
          </div>
        )}

        {section === 'hpa_cortisol' && (
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-3 text-xs">
              <label className="flex flex-col gap-1">
                <span className="text-muted-foreground">Kortyzol poranny (µg/dl)</span>
                <input
                  type="number"
                  step="0.5"
                  value={cortisolInput.morningCortisolUgDl}
                  onChange={(e) => setCortisolInput({ ...cortisolInput, morningCortisolUgDl: Number(e.target.value) })}
                  className="rounded border border-input bg-background px-2.5 py-1.5"
                />
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={cortisolInput.cbgAltered}
                  onChange={(e) => setCortisolInput({ ...cortisolInput, cbgAltered: e.target.checked })}
                />
                <span>Zmienione CBG (estrogeny doustne, ciąża)</span>
              </label>
            </div>
            <div className="rounded-lg bg-muted/40 p-3.5 text-xs space-y-2 border border-border/50">
              <div className="font-semibold text-sm">{cortisolRes.interpretation}</div>
              <p className="text-muted-foreground">{cortisolRes.actionRequired}</p>
            </div>
          </div>
        )}

        {section === 'pheochromocytoma' && (
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-3 text-xs">
              <label className="flex items-center gap-2 text-rose-600 font-medium">
                <input
                  type="checkbox"
                  checked={pheoInput.betaBlockerInitiated}
                  onChange={(e) => setPheoInput({ ...pheoInput, betaBlockerInitiated: e.target.checked })}
                />
                <span>Włączono beta-bloker</span>
              </label>
              <label className="flex items-center gap-2 text-emerald-600 font-medium">
                <input
                  type="checkbox"
                  checked={pheoInput.alphaBlockerInitiated}
                  onChange={(e) => setPheoInput({ ...pheoInput, alphaBlockerInitiated: e.target.checked })}
                />
                <span>Wdrożono alfa-blokadę</span>
              </label>
            </div>
            <div className="rounded-lg bg-muted/40 p-3.5 text-xs space-y-2 border border-border/50">
              {pheoRes.safetyAlerts.map((a, i) => (
                <div key={i} className="flex gap-1.5 items-start text-rose-600 font-semibold">
                  <ShieldAlert className="h-4 w-4 shrink-0 mt-0.5" />
                  <span>{a}</span>
                </div>
              ))}
              {pheoRes.nextSteps.map((s, i) => (
                <div key={i} className="flex gap-1.5 items-start text-muted-foreground">
                  <Info className="h-3.5 w-3.5 shrink-0 mt-0.5" />
                  <span>{s}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {section === 'incidentaloma' && (
          <div className="grid gap-4 md:grid-cols-2 text-xs">
            <div className="space-y-2">
              <label className="flex flex-col gap-1">
                <span>Gęstość natywna CT (HU)</span>
                <input
                  type="number"
                  value={incInput.unenhancedHu}
                  onChange={(e) => setIncInput({ ...incInput, unenhancedHu: Number(e.target.value) })}
                  className="rounded border border-input bg-background px-2.5 py-1.5"
                />
              </label>
              <label className="flex flex-col gap-1">
                <span>Kortyzol po teście 1 mg deksametazonu (DST, µg/dl)</span>
                <input
                  type="number"
                  step="0.1"
                  value={incInput.postDstCortisolUgDl}
                  onChange={(e) => setIncInput({ ...incInput, postDstCortisolUgDl: Number(e.target.value) })}
                  className="rounded border border-input bg-background px-2.5 py-1.5"
                />
              </label>
            </div>
            <div className="rounded-lg bg-muted/40 p-3.5 space-y-2 border border-border/50">
              <div className="font-semibold text-sm">Fenotyp: {incRes.imagingCategory} | {incRes.endocrineActivity}</div>
              <p className="text-muted-foreground">{incRes.recommendation}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
