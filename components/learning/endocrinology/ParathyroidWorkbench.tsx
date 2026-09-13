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
import type {
  ParathyroidWorkbenchPresetState,
  ParathyroidControlId,
  WidgetPresetDefinition,
} from '@/lib/content/preset-registry';
import { parathyroidClaims, parathyroidSources } from '@/lib/endocrinology/przytarczyce-content';
import { WorkbenchEvidenceCard } from './WorkbenchEvidenceCard';
import { AlertTriangle, CheckCircle, Beaker, ShieldAlert, Sparkles, Lock } from 'lucide-react';

export type { ParathyroidWorkbenchPresetState };

export interface ParathyroidWorkbenchProps {
  mode?: 'standalone' | 'embedded';
  preset?: ParathyroidWorkbenchPresetState;
  definition?: WidgetPresetDefinition;
  claimIds?: string[];
  onStateChange?: (state: unknown) => void;
}

const SECTION_CLAIM_MAP: Record<string, string[]> = {
  hypercalcemia_cccr: ['claim-pt-cccr-overlap-zone', 'claim-pt-vitd-confounder-cccr'],
  calcium_correction: ['claim-pt-payne-formula'],
  hypoparathyroidism: ['claim-pt-hypopara-target-ca-2025', 'claim-pt-cyp27b1-stimulation'],
  hungry_bone: ['claim-pt-hungry-bone-predictors'],
};

export function ParathyroidWorkbench({
  mode = 'standalone',
  preset,
  definition,
  claimIds,
}: ParathyroidWorkbenchProps) {
  const activeTab = preset?.focusSection || 'hypercalcemia_cccr';
  const [section, setSection] = useState<
    'hypercalcemia_cccr' | 'calcium_correction' | 'hypoparathyroidism' | 'hungry_bone'
  >(activeTab);

  const [correctionInput, setCorrectionInput] = useState<CalciumCorrectionInput>({
    totalCalciumMmolL:
      preset?.initialCorrection?.totalCalciumMmolL ??
      preset?.initialCorrection?.measuredTotalCalciumMmolL ??
      2.65,
    albuminGPerL:
      preset?.initialCorrection?.albuminGPerL ??
      (preset?.initialCorrection?.albuminGDL ? preset.initialCorrection.albuminGDL * 10 : 32),
  });

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

  const [hypoInput, setHypoInput] = useState<HypoparathyroidismEvalInput>({
    serumCalciumMmolL: preset?.initialHypopara?.serumCalciumMmolL ?? 2.08,
    serumPhosphateMmolL: preset?.initialHypopara?.serumPhosphateMmolL ?? 1.55,
    urineCalcium24hMmolDay: preset?.initialHypopara?.urineCalcium24hMmolDay ?? 6.2,
    hasParesthesiasOrTetany: preset?.initialHypopara?.hasParesthesiasOrTetany ?? false,
    calcitriolMicrogDay: preset?.initialHypopara?.calcitriolMicrogDay ?? 0.5,
    calciumElementalMgDay: preset?.initialHypopara?.calciumElementalMgDay ?? 1000,
  });

  const [hungryInput, setHungryInput] = useState<HungryBoneRiskInput>({
    preopCalciumMmolL: preset?.initialHungryBone?.preopCalciumMmolL ?? 3.12,
    preopPthPgMl: preset?.initialHungryBone?.preopPthPgMl ?? 420,
    alkalinePhosphataseUPerL: preset?.initialHungryBone?.alkalinePhosphataseUPerL ?? 280,
    patientAge: preset?.initialHungryBone?.patientAge ?? 64,
  });

  const [prevPreset, setPrevPreset] = useState(preset);
  if (preset !== prevPreset) {
    setPrevPreset(preset);
    if (preset?.focusSection) setSection(preset.focusSection);
    setCorrectionInput({
      totalCalciumMmolL:
        preset?.initialCorrection?.totalCalciumMmolL ??
        preset?.initialCorrection?.measuredTotalCalciumMmolL ??
        2.65,
      albuminGPerL:
        preset?.initialCorrection?.albuminGPerL ??
        (preset?.initialCorrection?.albuminGDL ? preset.initialCorrection.albuminGDL * 10 : 32),
    });
    setCccrInput({
      serumCalciumMmolL: preset?.initialCCCR?.serumCalciumMmolL ?? 2.72,
      serumCreatinineUmolL: preset?.initialCCCR?.serumCreatinineUmolL ?? 78,
      urineCalcium24hMmolL: preset?.initialCCCR?.urineCalcium24hMmolL ?? 2.4,
      urineCreatinine24hMmolL: preset?.initialCCCR?.urineCreatinine24hMmolL ?? 10.5,
      vitaminD25OhNgMl: preset?.initialCCCR?.vitaminD25OhNgMl ?? 14,
      eGfrMlMin: preset?.initialCCCR?.eGfrMlMin ?? 85,
      takingThiazides: preset?.initialCCCR?.takingThiazides ?? false,
      takingLithium: preset?.initialCCCR?.takingLithium ?? false,
    });
    setHypoInput({
      serumCalciumMmolL: preset?.initialHypopara?.serumCalciumMmolL ?? 2.08,
      serumPhosphateMmolL: preset?.initialHypopara?.serumPhosphateMmolL ?? 1.55,
      urineCalcium24hMmolDay: preset?.initialHypopara?.urineCalcium24hMmolDay ?? 6.2,
      hasParesthesiasOrTetany: preset?.initialHypopara?.hasParesthesiasOrTetany ?? false,
      calcitriolMicrogDay: preset?.initialHypopara?.calcitriolMicrogDay ?? 0.5,
      calciumElementalMgDay: preset?.initialHypopara?.calciumElementalMgDay ?? 1000,
    });
    setHungryInput({
      preopCalciumMmolL: preset?.initialHungryBone?.preopCalciumMmolL ?? 3.12,
      preopPthPgMl: preset?.initialHungryBone?.preopPthPgMl ?? 420,
      alkalinePhosphataseUPerL: preset?.initialHungryBone?.alkalinePhosphataseUPerL ?? 280,
      patientAge: preset?.initialHungryBone?.patientAge ?? 64,
    });
  }

  const isVisible = (id: ParathyroidControlId) =>
    !preset?.visibleControls || preset.visibleControls.length === 0 || preset.visibleControls.includes(id);
  const isLocked = (id: ParathyroidControlId) => Boolean(preset?.lockedFields?.includes(id));

  const correctionRes = calculateCorrectedCalcium(correctionInput);
  const cccrRes = evaluateCCCR(cccrInput);
  const hypoRes = evaluateHypoparathyroidismManagement(hypoInput);
  const hungryRes = evaluateHungryBoneRisk(hungryInput);

  const activeClaimIds =
    claimIds || definition?.claimIds || (preset as { claimIds?: string[] })?.claimIds || SECTION_CLAIM_MAP[section] || [];
  const relevantClaims = parathyroidClaims.filter((c) => activeClaimIds.includes(c.id));

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
            {(['hypercalcemia_cccr', 'calcium_correction', 'hypoparathyroidism', 'hungry_bone'] as const).map((s) => (
              <button
                key={s}
                onClick={() => setSection(s)}
                className={`rounded px-2.5 py-1 font-medium transition ${section === s ? 'bg-background shadow-xs text-foreground' : 'text-muted-foreground'}`}
              >
                {s === 'hypercalcemia_cccr' && 'PHPT vs FHH (CCCR)'}
                {s === 'calcium_correction' && 'Wzór Payne’a'}
                {s === 'hypoparathyroidism' && 'Niedoczynność przytarczyc'}
                {s === 'hungry_bone' && 'Głodne kości'}
              </button>
            ))}
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
                {isVisible('serumCalcium') && (
                  <label className="flex flex-col gap-1">
                    <span className="text-muted-foreground flex items-center">
                      Wapń w surowicy (mmol/l) {isLocked('serumCalcium') && <Lock className="h-3 w-3 ml-1 text-muted-foreground" />}
                    </span>
                    <input
                      type="number"
                      step="0.05"
                      disabled={isLocked('serumCalcium')}
                      value={cccrInput.serumCalciumMmolL}
                      onChange={(e) => setCccrInput({ ...cccrInput, serumCalciumMmolL: Number(e.target.value) })}
                      className="rounded border border-input bg-background px-2.5 py-1.5 disabled:opacity-75 disabled:cursor-not-allowed"
                    />
                  </label>
                )}
                {isVisible('serumCreatinine') && (
                  <label className="flex flex-col gap-1">
                    <span className="text-muted-foreground flex items-center">
                      Kreatynina w surowicy (µmol/l) {isLocked('serumCreatinine') && <Lock className="h-3 w-3 ml-1 text-muted-foreground" />}
                    </span>
                    <input
                      type="number"
                      disabled={isLocked('serumCreatinine')}
                      value={cccrInput.serumCreatinineUmolL}
                      onChange={(e) => setCccrInput({ ...cccrInput, serumCreatinineUmolL: Number(e.target.value) })}
                      className="rounded border border-input bg-background px-2.5 py-1.5 disabled:opacity-75 disabled:cursor-not-allowed"
                    />
                  </label>
                )}
                {isVisible('urineCalcium24h') && (
                  <label className="flex flex-col gap-1">
                    <span className="text-muted-foreground flex items-center">
                      Wapń w moczu 24h (mmol/24h) {isLocked('urineCalcium24h') && <Lock className="h-3 w-3 ml-1 text-muted-foreground" />}
                    </span>
                    <input
                      type="number"
                      step="0.1"
                      disabled={isLocked('urineCalcium24h')}
                      value={cccrInput.urineCalcium24hMmolL}
                      onChange={(e) => setCccrInput({ ...cccrInput, urineCalcium24hMmolL: Number(e.target.value) })}
                      className="rounded border border-input bg-background px-2.5 py-1.5 disabled:opacity-75 disabled:cursor-not-allowed"
                    />
                  </label>
                )}
                {isVisible('urineCreatinine24h') && (
                  <label className="flex flex-col gap-1">
                    <span className="text-muted-foreground flex items-center">
                      Kreatynina w moczu 24h (mmol/24h) {isLocked('urineCreatinine24h') && <Lock className="h-3 w-3 ml-1 text-muted-foreground" />}
                    </span>
                    <input
                      type="number"
                      step="0.5"
                      disabled={isLocked('urineCreatinine24h')}
                      value={cccrInput.urineCreatinine24hMmolL}
                      onChange={(e) => setCccrInput({ ...cccrInput, urineCreatinine24hMmolL: Number(e.target.value) })}
                      className="rounded border border-input bg-background px-2.5 py-1.5 disabled:opacity-75 disabled:cursor-not-allowed"
                    />
                  </label>
                )}
                {isVisible('vitaminD25Oh') && (
                  <label className="flex flex-col gap-1">
                    <span className="text-muted-foreground flex items-center">
                      25(OH)D (ng/ml) {isLocked('vitaminD25Oh') && <Lock className="h-3 w-3 ml-1 text-muted-foreground" />}
                    </span>
                    <input
                      type="number"
                      disabled={isLocked('vitaminD25Oh')}
                      value={cccrInput.vitaminD25OhNgMl ?? 20}
                      onChange={(e) => setCccrInput({ ...cccrInput, vitaminD25OhNgMl: Number(e.target.value) })}
                      className="rounded border border-input bg-background px-2.5 py-1.5 disabled:opacity-75 disabled:cursor-not-allowed"
                    />
                  </label>
                )}
                {isVisible('takingThiazides') && (
                  <label className="flex items-center gap-2 pt-4">
                    <input
                      type="checkbox"
                      disabled={isLocked('takingThiazides')}
                      checked={cccrInput.takingThiazides}
                      onChange={(e) => setCccrInput({ ...cccrInput, takingThiazides: e.target.checked })}
                    />
                    <span className="flex items-center">
                      Diuretyki tiazydowe {isLocked('takingThiazides') && <Lock className="h-3 w-3 ml-1 text-muted-foreground" />}
                    </span>
                  </label>
                )}
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
              <div className="pt-2 border-t border-border/50 font-medium text-foreground">{cccrRes.recommendedAction}</div>
            </div>
          </div>
        )}

        {section === 'calcium_correction' && (
          <div className="grid gap-4 md:grid-cols-2 text-xs">
            <div className="space-y-3">
              <h4 className="text-sm font-semibold">Korekta stężenia wapnia o albuminę (Wzór Payne’a)</h4>
              {isVisible('measuredTotalCalcium') && (
                <label className="flex flex-col gap-1">
                  <span className="text-muted-foreground flex items-center">
                    Wapń zmierzony w surowicy (mmol/l) {isLocked('measuredTotalCalcium') && <Lock className="h-3 w-3 ml-1 text-muted-foreground" />}
                  </span>
                  <input
                    type="number"
                    step="0.05"
                    disabled={isLocked('measuredTotalCalcium')}
                    value={correctionInput.totalCalciumMmolL}
                    onChange={(e) => setCorrectionInput({ ...correctionInput, totalCalciumMmolL: Number(e.target.value) })}
                    className="rounded border border-input bg-background px-2.5 py-1.5 disabled:opacity-75 disabled:cursor-not-allowed"
                  />
                </label>
              )}
              {isVisible('albumin') && (
                <label className="flex flex-col gap-1">
                  <span className="text-muted-foreground flex items-center">
                    Albumina (g/l) {isLocked('albumin') && <Lock className="h-3 w-3 ml-1 text-muted-foreground" />}
                  </span>
                  <input
                    type="number"
                    step="1"
                    disabled={isLocked('albumin')}
                    value={correctionInput.albuminGPerL}
                    onChange={(e) => setCorrectionInput({ ...correctionInput, albuminGPerL: Number(e.target.value) })}
                    className="rounded border border-input bg-background px-2.5 py-1.5 disabled:opacity-75 disabled:cursor-not-allowed"
                  />
                </label>
              )}
            </div>
            <div className="rounded-lg bg-muted/40 p-3.5 space-y-2 border border-border/50">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-sm">Wapń skorygowany:</span>
                <span className="font-mono text-base font-bold text-emerald-600 dark:text-emerald-400">{correctionRes.correctedCalciumMmolL} mmol/l</span>
              </div>
              <p className="text-muted-foreground">{correctionRes.comment}</p>
            </div>
          </div>
        )}

        {section === 'hypoparathyroidism' && (
          <div className="grid gap-4 md:grid-cols-2 text-xs">
            <div className="space-y-3">
              <h4 className="text-sm font-semibold">Parametry monitorowania (ESE 2025)</h4>
              {isVisible('serumCalcium') && (
                <label className="flex flex-col gap-1">
                  <span className="text-muted-foreground flex items-center">
                    Wapń w surowicy (mmol/l, cel: 2,00–2,20) {isLocked('serumCalcium') && <Lock className="h-3 w-3 ml-1 text-muted-foreground" />}
                  </span>
                  <input
                    type="number"
                    step="0.05"
                    disabled={isLocked('serumCalcium')}
                    value={hypoInput.serumCalciumMmolL}
                    onChange={(e) => setHypoInput({ ...hypoInput, serumCalciumMmolL: Number(e.target.value) })}
                    className="rounded border border-input bg-background px-2.5 py-1.5 disabled:opacity-75 disabled:cursor-not-allowed"
                  />
                </label>
              )}
              {isVisible('serumPhosphate') && (
                <label className="flex flex-col gap-1">
                  <span className="text-muted-foreground flex items-center">
                    Fosforany w surowicy (mmol/l) {isLocked('serumPhosphate') && <Lock className="h-3 w-3 ml-1 text-muted-foreground" />}
                  </span>
                  <input
                    type="number"
                    step="0.05"
                    disabled={isLocked('serumPhosphate')}
                    value={hypoInput.serumPhosphateMmolL}
                    onChange={(e) => setHypoInput({ ...hypoInput, serumPhosphateMmolL: Number(e.target.value) })}
                    className="rounded border border-input bg-background px-2.5 py-1.5 disabled:opacity-75 disabled:cursor-not-allowed"
                  />
                </label>
              )}
              {isVisible('hasParesthesiasOrTetany') && (
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    disabled={isLocked('hasParesthesiasOrTetany')}
                    checked={hypoInput.hasParesthesiasOrTetany}
                    onChange={(e) => setHypoInput({ ...hypoInput, hasParesthesiasOrTetany: e.target.checked })}
                  />
                  <span className="flex items-center">
                    Występują objawy tężyczkowe / parestezje {isLocked('hasParesthesiasOrTetany') && <Lock className="h-3 w-3 ml-1 text-muted-foreground" />}
                  </span>
                </label>
              )}
            </div>
            <div className="rounded-lg bg-muted/40 p-3.5 space-y-2 border border-border/50">
              <div className="flex items-center gap-2 font-semibold">
                {hypoRes.targetMet ? <CheckCircle className="h-4 w-4 text-emerald-600" /> : <AlertTriangle className="h-4 w-4 text-amber-600" />}
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
              {isVisible('preopCalcium') && (
                <label className="flex flex-col gap-1">
                  <span className="text-muted-foreground flex items-center">
                    Wyjściowy wapń przedoperacyjny (mmol/l) {isLocked('preopCalcium') && <Lock className="h-3 w-3 ml-1 text-muted-foreground" />}
                  </span>
                  <input
                    type="number"
                    step="0.1"
                    disabled={isLocked('preopCalcium')}
                    value={hungryInput.preopCalciumMmolL}
                    onChange={(e) => setHungryInput({ ...hungryInput, preopCalciumMmolL: Number(e.target.value) })}
                    className="rounded border border-input bg-background px-2.5 py-1.5 disabled:opacity-75 disabled:cursor-not-allowed"
                  />
                </label>
              )}
              {isVisible('preopPth') && (
                <label className="flex flex-col gap-1">
                  <span className="text-muted-foreground flex items-center">
                    Wyjściowy PTH przedoperacyjny (pg/ml) {isLocked('preopPth') && <Lock className="h-3 w-3 ml-1 text-muted-foreground" />}
                  </span>
                  <input
                    type="number"
                    disabled={isLocked('preopPth')}
                    value={hungryInput.preopPthPgMl}
                    onChange={(e) => setHungryInput({ ...hungryInput, preopPthPgMl: Number(e.target.value) })}
                    className="rounded border border-input bg-background px-2.5 py-1.5 disabled:opacity-75 disabled:cursor-not-allowed"
                  />
                </label>
              )}
              {isVisible('alkalinePhosphatase') && (
                <label className="flex flex-col gap-1">
                  <span className="text-muted-foreground flex items-center">
                    Fosfataza alkaliczna ALP (U/l) {isLocked('alkalinePhosphatase') && <Lock className="h-3 w-3 ml-1 text-muted-foreground" />}
                  </span>
                  <input
                    type="number"
                    disabled={isLocked('alkalinePhosphatase')}
                    value={hungryInput.alkalinePhosphataseUPerL}
                    onChange={(e) => setHungryInput({ ...hungryInput, alkalinePhosphataseUPerL: Number(e.target.value) })}
                    className="rounded border border-input bg-background px-2.5 py-1.5 disabled:opacity-75 disabled:cursor-not-allowed"
                  />
                </label>
              )}
              {isVisible('patientAge') && (
                <label className="flex flex-col gap-1">
                  <span className="text-muted-foreground flex items-center">
                    Wiek pacjenta (lata) {isLocked('patientAge') && <Lock className="h-3 w-3 ml-1 text-muted-foreground" />}
                  </span>
                  <input
                    type="number"
                    disabled={isLocked('patientAge')}
                    value={hungryInput.patientAge}
                    onChange={(e) => setHungryInput({ ...hungryInput, patientAge: Number(e.target.value) })}
                    className="rounded border border-input bg-background px-2.5 py-1.5 disabled:opacity-75 disabled:cursor-not-allowed"
                  />
                </label>
              )}
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

        <WorkbenchEvidenceCard claims={relevantClaims} sources={parathyroidSources} />
      </div>
    </div>
  );
}
