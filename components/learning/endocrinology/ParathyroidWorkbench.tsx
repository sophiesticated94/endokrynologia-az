'use client';

import React, { useState } from 'react';
import {
  calculateCorrectedCalcium,
  evaluateCCCR,
  evaluateHypoparathyroidismManagement,
  evaluateHungryBoneRisk,
  type CalciumCorrectionInput,
  type CCCREvaluationInput,
  type HypoparathyroidismEvalInput,
  type HungryBoneRiskInput,
} from '@/lib/endocrinology/parathyroid/parathyroid-reasoning-engine';
import { AlertTriangle, CheckCircle, Info, Beaker, ShieldAlert, Sparkles } from 'lucide-react';

export interface ParathyroidWorkbenchPresetState {
  focusSection?: 'hypercalcemia_cccr' | 'calcium_correction' | 'hypoparathyroidism' | 'hungry_bone';
  visibleControls?: string[];
  lockedFields?: string[];
  initialCorrection?: Partial<CalciumCorrectionInput>;
  initialCCCR?: Partial<CCCREvaluationInput>;
  initialHypopara?: Partial<HypoparathyroidismEvalInput>;
  initialHungryBone?: Partial<HungryBoneRiskInput>;
}

export interface ParathyroidWorkbenchProps {
  mode?: 'standalone' | 'embedded';
  preset?: ParathyroidWorkbenchPresetState;
  onStateChange?: (state: unknown) => void;
}

export function ParathyroidWorkbench({ mode = 'standalone', preset }: ParathyroidWorkbenchProps) {
  const activeTab = preset?.focusSection || 'hypercalcemia_cccr';
  const [section, setSection] = useState<'hypercalcemia_cccr' | 'calcium_correction' | 'hypoparathyroidism' | 'hungry_bone'>(activeTab);

  // 1. CCCR State
  const [cccrInput, setCccrInput] = useState<CCCREvaluationInput>({
    serumCalciumMmolL: preset?.initialCCCR?.serumCalciumMmolL ?? 2.72,
    serumCreatinineUmolL: preset?.initialCCCR?.serumCreatinineUmolL ?? 78,
    urineCalcium24hMmolL: preset?.initialCCCR?.urineCalcium24hMmolL ?? 2.4,
    urineCreatinine24hMmolL: preset?.initialCCCR?.urineCreatinine24hMmolL ?? 10.5,
    vitaminD25OhNgMl: preset?.initialCCCR?.vitaminD25OhNgMl ?? 14,
    eGfrMlMin: preset?.initialCCCR?.eGfrMlMin ?? 85,
    takingThiazides: preset?.initialCCCR?.takingThiazides ?? false,
    takingLithium: preset?.initialCCCR?.takingLithium ?? false,
  });

  // 2. Hypopara State
  const [hypoInput, setHypoInput] = useState<HypoparathyroidismEvalInput>({
    serumCalciumMmolL: preset?.initialHypopara?.serumCalciumMmolL ?? 2.08,
    serumPhosphateMmolL: preset?.initialHypopara?.serumPhosphateMmolL ?? 1.55,
    urineCalcium24hMmolDay: preset?.initialHypopara?.urineCalcium24hMmolDay ?? 6.2,
    hasParesthesiasOrTetany: preset?.initialHypopara?.hasParesthesiasOrTetany ?? false,
    calcitriolMicrogDay: preset?.initialHypopara?.calcitriolMicrogDay ?? 0.5,
    calciumElementalMgDay: preset?.initialHypopara?.calciumElementalMgDay ?? 1000,
  });

  // 3. Hungry Bone State
  const [hungryInput, setHungryInput] = useState<HungryBoneRiskInput>({
    preopCalciumMmolL: preset?.initialHungryBone?.preopCalciumMmolL ?? 3.12,
    preopPthPgMl: preset?.initialHungryBone?.preopPthPgMl ?? 420,
    alkalinePhosphataseUPerL: preset?.initialHungryBone?.alkalinePhosphataseUPerL ?? 280,
    patientAge: preset?.initialHungryBone?.patientAge ?? 64,
  });

  const cccrRes = evaluateCCCR(cccrInput);
  const hypoRes = evaluateHypoparathyroidismManagement(hypoInput);
  const hungryRes = evaluateHungryBoneRisk(hungryInput);

  return (
    <div className="rounded-xl border border-border bg-card p-5 text-card-foreground shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-3">
        <div className="flex items-center gap-2">
          <Beaker className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
          <h3 className="font-semibold text-base tracking-tight">Parathyroid & Mineral Metabolism Workbench</h3>
          <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-medium text-emerald-600 dark:text-emerald-400">
            {mode === 'embedded' ? 'Guided Practice' : 'Full Workbench'}
          </span>
        </div>

        {mode === 'standalone' && (
          <div className="flex gap-1 rounded-lg bg-muted p-1 text-xs">
            <button
              onClick={() => setSection('hypercalcemia_cccr')}
              className={`rounded px-2.5 py-1 font-medium transition ${section === 'hypercalcemia_cccr' ? 'bg-background shadow-xs text-foreground' : 'text-muted-foreground'}`}
            >
              PHPT vs FHH (CCCR)
            </button>
            <button
              onClick={() => setSection('hypoparathyroidism')}
              className={`rounded px-2.5 py-1 font-medium transition ${section === 'hypoparathyroidism' ? 'bg-background shadow-xs text-foreground' : 'text-muted-foreground'}`}
            >
              Niedoczynność przytarczyc (ESE 2025)
            </button>
            <button
              onClick={() => setSection('hungry_bone')}
              className={`rounded px-2.5 py-1 font-medium transition ${section === 'hungry_bone' ? 'bg-background shadow-xs text-foreground' : 'text-muted-foreground'}`}
            >
              Zespół głodnych kości
            </button>
          </div>
        )}
      </div>

      <div className="mt-4">
        {section === 'hypercalcemia_cccr' && (
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-3 text-xs">
              <h4 className="text-sm font-semibold flex items-center gap-1.5">
                <Sparkles className="h-4 w-4 text-emerald-500" />
                Kalkulator CCCR i modyfikatory nerkowe
              </h4>
              <div className="grid grid-cols-2 gap-2">
                <label className="flex flex-col gap-1">
                  <span className="text-muted-foreground">Wapń w surowicy (mmol/l)</span>
                  <input
                    type="number"
                    step="0.05"
                    value={cccrInput.serumCalciumMmolL}
                    onChange={(e) => setCccrInput({ ...cccrInput, serumCalciumMmolL: Number(e.target.value) })}
                    className="rounded border border-input bg-background px-2.5 py-1.5"
                  />
                </label>
                <label className="flex flex-col gap-1">
                  <span className="text-muted-foreground">Kreatynina w surowicy (µmol/l)</span>
                  <input
                    type="number"
                    value={cccrInput.serumCreatinineUmolL}
                    onChange={(e) => setCccrInput({ ...cccrInput, serumCreatinineUmolL: Number(e.target.value) })}
                    className="rounded border border-input bg-background px-2.5 py-1.5"
                  />
                </label>
                <label className="flex flex-col gap-1">
                  <span className="text-muted-foreground">Wapń w moczu 24h (mmol/24h)</span>
                  <input
                    type="number"
                    step="0.1"
                    value={cccrInput.urineCalcium24hMmolL}
                    onChange={(e) => setCccrInput({ ...cccrInput, urineCalcium24hMmolL: Number(e.target.value) })}
                    className="rounded border border-input bg-background px-2.5 py-1.5"
                  />
                </label>
                <label className="flex flex-col gap-1">
                  <span className="text-muted-foreground">Kreatynina w moczu 24h (mmol/24h)</span>
                  <input
                    type="number"
                    step="0.5"
                    value={cccrInput.urineCreatinine24hMmolL}
                    onChange={(e) => setCccrInput({ ...cccrInput, urineCreatinine24hMmolL: Number(e.target.value) })}
                    className="rounded border border-input bg-background px-2.5 py-1.5"
                  />
                </label>
                <label className="flex flex-col gap-1">
                  <span className="text-muted-foreground">25(OH)D (ng/ml)</span>
                  <input
                    type="number"
                    value={cccrInput.vitaminD25OhNgMl ?? 20}
                    onChange={(e) => setCccrInput({ ...cccrInput, vitaminD25OhNgMl: Number(e.target.value) })}
                    className="rounded border border-input bg-background px-2.5 py-1.5"
                  />
                </label>
                <label className="flex items-center gap-2 pt-4">
                  <input
                    type="checkbox"
                    checked={cccrInput.takingThiazides}
                    onChange={(e) => setCccrInput({ ...cccrInput, takingThiazides: e.target.checked })}
                  />
                  <span>Diuretyki tiazydowe</span>
                </label>
              </div>
            </div>

            <div className="rounded-lg bg-muted/40 p-3.5 text-xs space-y-2 border border-border/50">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-sm">Wskaźnik CCCR:</span>
                <span className="font-mono text-base font-bold text-emerald-600 dark:text-emerald-400">{cccrRes.cccr}</span>
              </div>
              <div className="font-semibold text-foreground">
                Kategoria: {cccrRes.classification === 'fhh_more_likely' ? 'Sugeruje FHH (<0,010)' : cccrRes.classification === 'overlap_zone' ? 'Strefa nakładania (0,010 - 0,020)' : 'Sugeruje PHPT (>0,020)'}
              </div>
              <p className="text-muted-foreground">{cccrRes.clinicalInterpretation}</p>

              {cccrRes.confoundersDetected.map((c, i) => (
                <div key={i} className="flex gap-1.5 items-start text-amber-700 dark:text-amber-300">
                  <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
                  <span>{c}</span>
                </div>
              ))}

              <div className="pt-2 border-t border-border/50 font-medium text-foreground">
                {cccrRes.recommendedAction}
              </div>
            </div>
          </div>
        )}

        {section === 'hypoparathyroidism' && (
          <div className="grid gap-4 md:grid-cols-2 text-xs">
            <div className="space-y-3">
              <h4 className="text-sm font-semibold">Parametry monitorowania (ESE 2025)</h4>
              <label className="flex flex-col gap-1">
                <span className="text-muted-foreground">Wapń w surowicy (mmol/l, cel: 2,00–2,20)</span>
                <input
                  type="number"
                  step="0.05"
                  value={hypoInput.serumCalciumMmolL}
                  onChange={(e) => setHypoInput({ ...hypoInput, serumCalciumMmolL: Number(e.target.value) })}
                  className="rounded border border-input bg-background px-2.5 py-1.5"
                />
              </label>
              <label className="flex flex-col gap-1">
                <span className="text-muted-foreground">Fosforany w surowicy (mmol/l)</span>
                <input
                  type="number"
                  step="0.05"
                  value={hypoInput.serumPhosphateMmolL}
                  onChange={(e) => setHypoInput({ ...hypoInput, serumPhosphateMmolL: Number(e.target.value) })}
                  className="rounded border border-input bg-background px-2.5 py-1.5"
                />
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={hypoInput.hasParesthesiasOrTetany}
                  onChange={(e) => setHypoInput({ ...hypoInput, hasParesthesiasOrTetany: e.target.checked })}
                />
                <span>Występują objawy tężyczkowe / parestezje</span>
              </label>
            </div>
            <div className="rounded-lg bg-muted/40 p-3.5 space-y-2 border border-border/50">
              <div className="flex items-center gap-2 font-semibold">
                {hypoRes.targetMet ? (
                  <CheckCircle className="h-4 w-4 text-emerald-600" />
                ) : (
                  <AlertTriangle className="h-4 w-4 text-amber-600" />
                )}
                <span>{hypoRes.targetMet ? 'Cele terapeutyczne ESE 2025 osiągnięte' : 'Wymagana modyfikacja dawek'}</span>
              </div>
              {hypoRes.safetyAlerts.map((a, i) => (
                <div key={i} className="flex gap-1.5 items-start text-rose-600 dark:text-rose-400">
                  <ShieldAlert className="h-4 w-4 shrink-0 mt-0.5" />
                  <span>{a}</span>
                </div>
              ))}
              <p className="pt-2 border-t border-border/50 text-muted-foreground">{hypoRes.treatmentAdjustment}</p>
            </div>
          </div>
        )}

        {section === 'hungry_bone' && (
          <div className="grid gap-4 md:grid-cols-2 text-xs">
            <div className="space-y-2">
              <label className="flex flex-col gap-1">
                <span>Wyjściowy wapń przedoperacyjny (mmol/l)</span>
                <input
                  type="number"
                  step="0.1"
                  value={hungryInput.preopCalciumMmolL}
                  onChange={(e) => setHungryInput({ ...hungryInput, preopCalciumMmolL: Number(e.target.value) })}
                  className="rounded border border-input bg-background px-2.5 py-1.5"
                />
              </label>
              <label className="flex flex-col gap-1">
                <span>Wyjściowy PTH przedoperacyjny (pg/ml)</span>
                <input
                  type="number"
                  value={hungryInput.preopPthPgMl}
                  onChange={(e) => setHungryInput({ ...hungryInput, preopPthPgMl: Number(e.target.value) })}
                  className="rounded border border-input bg-background px-2.5 py-1.5"
                />
              </label>
              <label className="flex flex-col gap-1">
                <span>Fosfataza alkaliczna ALP (U/l)</span>
                <input
                  type="number"
                  value={hungryInput.alkalinePhosphataseUPerL}
                  onChange={(e) => setHungryInput({ ...hungryInput, alkalinePhosphataseUPerL: Number(e.target.value) })}
                  className="rounded border border-input bg-background px-2.5 py-1.5"
                />
              </label>
            </div>
            <div className="rounded-lg bg-muted/40 p-3.5 space-y-2 border border-border/50">
              <div className="font-semibold text-sm">
                Ryzyko zespołu głodnych kości: <span className="uppercase text-primary">{hungryRes.riskScore}</span>
              </div>
              <div className="text-muted-foreground">Oczekiwany nadir: {hungryRes.expectedNadirDaysPostop}</div>
              <p className="font-medium text-foreground">{hungryRes.prophylacticStrategy}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
