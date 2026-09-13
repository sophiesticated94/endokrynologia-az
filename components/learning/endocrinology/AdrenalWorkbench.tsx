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
import type {
  AdrenalWorkbenchPresetState,
  AdrenalControlId,
  WidgetPresetDefinition,
} from '@/lib/content/preset-registry';
import { adrenalClaims, adrenalSources } from '@/lib/endocrinology/nadnercza-content';
import { WorkbenchEvidenceCard } from './WorkbenchEvidenceCard';
import { AlertCircle, ShieldAlert, Sparkles, Activity, Lock } from 'lucide-react';

export type { AdrenalWorkbenchPresetState };

export interface AdrenalWorkbenchProps {
  mode?: 'standalone' | 'embedded';
  preset?: AdrenalWorkbenchPresetState;
  definition?: WidgetPresetDefinition;
  claimIds?: string[];
  onStateChange?: (state: unknown) => void;
}

const SECTION_CLAIM_MAP: Record<string, string[]> = {
  primary_aldosteronism: ['claim-adn-pa-screening-2025', 'claim-adn-pa-confirmatory-exemption'],
  hpa_cortisol: ['claim-adn-synacthen-recent-secondary', 'claim-adn-cbg-estrogens'],
  pheochromocytoma: ['claim-adn-pheo-alpha-before-beta'],
  incidentaloma: ['claim-adn-incidentaloma-hu-10', 'claim-adn-macs-dst-thresholds'],
};

export function AdrenalWorkbench({
  mode = 'standalone',
  preset,
  definition,
  claimIds,
}: AdrenalWorkbenchProps) {
  const activeTab = preset?.focusSection || 'primary_aldosteronism';
  const [section, setSection] = useState<
    'hpa_cortisol' | 'primary_aldosteronism' | 'pheochromocytoma' | 'incidentaloma'
  >(activeTab);

  const [cortisolInput, setCortisolInput] = useState<AdrenalCortisolEvalInput>({
    morningCortisolUgDl: preset?.initialCortisol?.morningCortisolUgDl ?? 8.5,
    cbgAltered: preset?.initialCortisol?.cbgAltered ?? false,
    synacthenPeakUgDl: preset?.initialCortisol?.synacthenPeakUgDl,
    recentPituitaryEventWeeks: preset?.initialCortisol?.recentPituitaryEventWeeks,
    assayMethod: preset?.initialCortisol?.assayMethod ?? 'immunoassay',
  });

  const [paInput, setPaInput] = useState<PrimaryAldoEvalInput>({
    aldosteroneNgDl: preset?.initialPA?.aldosteroneNgDl ?? 24.0,
    reninType: preset?.initialPA?.reninType === 'drc_miu_l' ? 'drc_miu_l' : 'pra_ng_ml_h',
    reninValue: preset?.initialPA?.reninValue ?? 0.4,
    potassiumMmolL: preset?.initialPA?.potassiumMmolL ?? 3.4,
    medications: (preset?.initialPA?.medications as PrimaryAldoEvalInput['medications']) ?? ['acei_arb'],
    spontaneousHypokalemia: preset?.initialPA?.spontaneousHypokalemia ?? true,
  });

  const [pheoInput, setPheoInput] = useState<PheoEvalInput>({
    normetanephrineFraction: preset?.initialPheo?.normetanephrineFraction ?? 4.2,
    metanephrineFraction: preset?.initialPheo?.metanephrineFraction ?? 1.1,
    currentMedications: preset?.initialPheo?.currentMedications ?? [],
    alphaBlockerInitiated: preset?.initialPheo?.alphaBlockerInitiated ?? false,
    betaBlockerInitiated: preset?.initialPheo?.betaBlockerInitiated ?? true,
    plannedSurgeryOrBiopsy: preset?.initialPheo?.plannedSurgeryOrBiopsy ?? false,
  });

  const [incInput, setIncInput] = useState<AdrenalIncidentalomaInput>({
    sizeMm: preset?.initialIncidentaloma?.sizeMm ?? 28,
    unenhancedHu: preset?.initialIncidentaloma?.unenhancedHu ?? 8,
    postDstCortisolUgDl: preset?.initialIncidentaloma?.postDstCortisolUgDl ?? 2.4,
    arrPositive: preset?.initialIncidentaloma?.arrPositive ?? false,
    metanephrinesPositive: preset?.initialIncidentaloma?.metanephrinesPositive ?? false,
  });

  const [prevPreset, setPrevPreset] = useState(preset);
  if (preset !== prevPreset) {
    setPrevPreset(preset);
    if (preset?.focusSection) setSection(preset.focusSection);
    setCortisolInput({
      morningCortisolUgDl: preset?.initialCortisol?.morningCortisolUgDl ?? 8.5,
      cbgAltered: preset?.initialCortisol?.cbgAltered ?? false,
      synacthenPeakUgDl: preset?.initialCortisol?.synacthenPeakUgDl,
      recentPituitaryEventWeeks: preset?.initialCortisol?.recentPituitaryEventWeeks,
      assayMethod: preset?.initialCortisol?.assayMethod ?? 'immunoassay',
    });
    setPaInput({
      aldosteroneNgDl: preset?.initialPA?.aldosteroneNgDl ?? 24.0,
      reninType: preset?.initialPA?.reninType === 'drc_miu_l' ? 'drc_miu_l' : 'pra_ng_ml_h',
      reninValue: preset?.initialPA?.reninValue ?? 0.4,
      potassiumMmolL: preset?.initialPA?.potassiumMmolL ?? 3.4,
      medications: (preset?.initialPA?.medications as PrimaryAldoEvalInput['medications']) ?? ['acei_arb'],
      spontaneousHypokalemia: preset?.initialPA?.spontaneousHypokalemia ?? true,
    });
    setPheoInput({
      normetanephrineFraction: preset?.initialPheo?.normetanephrineFraction ?? 4.2,
      metanephrineFraction: preset?.initialPheo?.metanephrineFraction ?? 1.1,
      currentMedications: preset?.initialPheo?.currentMedications ?? [],
      alphaBlockerInitiated: preset?.initialPheo?.alphaBlockerInitiated ?? false,
      betaBlockerInitiated: preset?.initialPheo?.betaBlockerInitiated ?? true,
      plannedSurgeryOrBiopsy: preset?.initialPheo?.plannedSurgeryOrBiopsy ?? false,
    });
    setIncInput({
      sizeMm: preset?.initialIncidentaloma?.sizeMm ?? 28,
      unenhancedHu: preset?.initialIncidentaloma?.unenhancedHu ?? 8,
      postDstCortisolUgDl: preset?.initialIncidentaloma?.postDstCortisolUgDl ?? 2.4,
      arrPositive: preset?.initialIncidentaloma?.arrPositive ?? false,
      metanephrinesPositive: preset?.initialIncidentaloma?.metanephrinesPositive ?? false,
    });
  }

  const isVisible = (id: AdrenalControlId) =>
    !preset?.visibleControls || preset.visibleControls.length === 0 || preset.visibleControls.includes(id);
  const isLocked = (id: AdrenalControlId) => Boolean(preset?.lockedFields?.includes(id));

  const cortisolRes = evaluateCortisolStatus(cortisolInput);
  const paRes = evaluatePrimaryAldosteronism(paInput);
  const pheoRes = evaluatePheoSafety(pheoInput);
  const incRes = evaluateIncidentaloma(incInput);

  const activeClaimIds =
    claimIds || definition?.claimIds || (preset as { claimIds?: string[] })?.claimIds || SECTION_CLAIM_MAP[section] || [];
  const relevantClaims = adrenalClaims.filter((c) => activeClaimIds.includes(c.id));

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
            {(['primary_aldosteronism', 'hpa_cortisol', 'pheochromocytoma', 'incidentaloma'] as const).map((s) => (
              <button
                key={s}
                onClick={() => setSection(s)}
                className={`rounded px-2.5 py-1 font-medium transition ${section === s ? 'bg-background shadow-xs text-foreground' : 'text-muted-foreground'}`}
              >
                {s === 'primary_aldosteronism' && 'Hiperaldosteronizm (PA)'}
                {s === 'hpa_cortisol' && 'Oś HPA / Kortyzol'}
                {s === 'pheochromocytoma' && 'Guz chromochłonny'}
                {s === 'incidentaloma' && 'Incydentaloma / MACS'}
              </button>
            ))}
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
                {isVisible('aldosterone') && (
                  <label className="flex flex-col gap-1">
                    <span className="text-muted-foreground flex items-center">
                      Aldosteron (PAC, ng/dl) {isLocked('aldosterone') && <Lock className="h-3 w-3 ml-1 text-muted-foreground" />}
                    </span>
                    <input
                      type="number"
                      disabled={isLocked('aldosterone')}
                      value={paInput.aldosteroneNgDl}
                      onChange={(e) => setPaInput({ ...paInput, aldosteroneNgDl: Number(e.target.value) })}
                      className="rounded border border-input bg-background px-2.5 py-1.5 disabled:opacity-75 disabled:cursor-not-allowed"
                    />
                  </label>
                )}
                {isVisible('renin') && (
                  <label className="flex flex-col gap-1">
                    <span className="text-muted-foreground flex items-center">
                      Renina (PRA, ng/ml/h) {isLocked('renin') && <Lock className="h-3 w-3 ml-1 text-muted-foreground" />}
                    </span>
                    <input
                      type="number"
                      step="0.1"
                      disabled={isLocked('renin')}
                      value={paInput.reninValue}
                      onChange={(e) => setPaInput({ ...paInput, reninValue: Number(e.target.value) })}
                      className="rounded border border-input bg-background px-2.5 py-1.5 disabled:opacity-75 disabled:cursor-not-allowed"
                    />
                  </label>
                )}
                {isVisible('potassium') && (
                  <label className="flex flex-col gap-1">
                    <span className="text-muted-foreground flex items-center">
                      Potas (K+, mmol/l) {isLocked('potassium') && <Lock className="h-3 w-3 ml-1 text-muted-foreground" />}
                    </span>
                    <input
                      type="number"
                      step="0.1"
                      disabled={isLocked('potassium')}
                      value={paInput.potassiumMmolL}
                      onChange={(e) => setPaInput({ ...paInput, potassiumMmolL: Number(e.target.value) })}
                      className="rounded border border-input bg-background px-2.5 py-1.5 disabled:opacity-75 disabled:cursor-not-allowed"
                    />
                  </label>
                )}
                {isVisible('spontaneousHypokalemia') && (
                  <label className="flex items-center gap-2 pt-4">
                    <input
                      type="checkbox"
                      disabled={isLocked('spontaneousHypokalemia')}
                      checked={paInput.spontaneousHypokalemia}
                      onChange={(e) => setPaInput({ ...paInput, spontaneousHypokalemia: e.target.checked })}
                    />
                    <span className="text-xs flex items-center">
                      Spontaniczna hipokaliemia {isLocked('spontaneousHypokalemia') && <Lock className="h-3 w-3 ml-1 text-muted-foreground" />}
                    </span>
                  </label>
                )}
                {isVisible('medications') && (
                  <label className="flex items-center gap-2 pt-2 col-span-2">
                    <input
                      type="checkbox"
                      disabled={isLocked('medications')}
                      checked={paInput.medications.includes('acei_arb')}
                      onChange={(e) => {
                        const next = e.target.checked
                          ? [...paInput.medications.filter((m) => m !== 'acei_arb'), 'acei_arb' as const]
                          : paInput.medications.filter((m) => m !== 'acei_arb');
                        setPaInput({ ...paInput, medications: next });
                      }}
                    />
                    <span className="text-xs flex items-center">
                      Leki wpływające na RAA (np. ACEI/ARB) {isLocked('medications') && <Lock className="h-3 w-3 ml-1 text-muted-foreground" />}
                    </span>
                  </label>
                )}
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
              <div className="pt-2 border-t border-border/50 text-foreground font-medium">{paRes.recommendation}</div>
            </div>
          </div>
        )}

        {section === 'hpa_cortisol' && (
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-3 text-xs">
              {isVisible('morningCortisol') && (
                <label className="flex flex-col gap-1">
                  <span className="text-muted-foreground flex items-center">
                    Kortyzol poranny (µg/dl) {isLocked('morningCortisol') && <Lock className="h-3 w-3 ml-1 text-muted-foreground" />}
                  </span>
                  <input
                    type="number"
                    step="0.5"
                    disabled={isLocked('morningCortisol')}
                    value={cortisolInput.morningCortisolUgDl}
                    onChange={(e) => setCortisolInput({ ...cortisolInput, morningCortisolUgDl: Number(e.target.value) })}
                    className="rounded border border-input bg-background px-2.5 py-1.5 disabled:opacity-75 disabled:cursor-not-allowed"
                  />
                </label>
              )}
              {isVisible('synacthenPeak') && (
                <label className="flex flex-col gap-1">
                  <span className="text-muted-foreground flex items-center">
                    Szczyt w teście Synacthenem 250 µg (µg/dl) {isLocked('synacthenPeak') && <Lock className="h-3 w-3 ml-1 text-muted-foreground" />}
                  </span>
                  <input
                    type="number"
                    step="0.5"
                    disabled={isLocked('synacthenPeak')}
                    value={cortisolInput.synacthenPeakUgDl ?? ''}
                    onChange={(e) => setCortisolInput({ ...cortisolInput, synacthenPeakUgDl: e.target.value === '' ? undefined : Number(e.target.value) })}
                    className="rounded border border-input bg-background px-2.5 py-1.5 disabled:opacity-75 disabled:cursor-not-allowed"
                  />
                </label>
              )}
              {isVisible('recentPituitaryEvent') && (
                <label className="flex flex-col gap-1">
                  <span className="text-muted-foreground flex items-center">
                    Czas od ostrego incydentu przysadkowego (tygodnie) {isLocked('recentPituitaryEvent') && <Lock className="h-3 w-3 ml-1 text-muted-foreground" />}
                  </span>
                  <input
                    type="number"
                    min="0"
                    disabled={isLocked('recentPituitaryEvent')}
                    value={cortisolInput.recentPituitaryEventWeeks ?? ''}
                    onChange={(e) => setCortisolInput({ ...cortisolInput, recentPituitaryEventWeeks: e.target.value === '' ? undefined : Number(e.target.value) })}
                    className="rounded border border-input bg-background px-2.5 py-1.5 disabled:opacity-75 disabled:cursor-not-allowed"
                  />
                </label>
              )}
              {isVisible('cbgAltered') && (
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    disabled={isLocked('cbgAltered')}
                    checked={cortisolInput.cbgAltered}
                    onChange={(e) => setCortisolInput({ ...cortisolInput, cbgAltered: e.target.checked })}
                  />
                  <span className="flex items-center">
                    Zmienione CBG (estrogeny doustne, ciąża) {isLocked('cbgAltered') && <Lock className="h-3 w-3 ml-1 text-muted-foreground" />}
                  </span>
                </label>
              )}
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
              {isVisible('normetanephrine') && (
                <label className="flex flex-col gap-1">
                  <span className="text-muted-foreground flex items-center">
                    Normetanefryna wolna (x GGN) {isLocked('normetanephrine') && <Lock className="h-3 w-3 ml-1 text-muted-foreground" />}
                  </span>
                  <input
                    type="number"
                    step="0.1"
                    disabled={isLocked('normetanephrine')}
                    value={pheoInput.normetanephrineFraction}
                    onChange={(e) => setPheoInput({ ...pheoInput, normetanephrineFraction: Number(e.target.value) })}
                    className="rounded border border-input bg-background px-2.5 py-1.5 disabled:opacity-75 disabled:cursor-not-allowed"
                  />
                </label>
              )}
              {isVisible('betaBlocker') && (
                <label className="flex items-center gap-2 text-rose-600 font-medium">
                  <input
                    type="checkbox"
                    disabled={isLocked('betaBlocker')}
                    checked={pheoInput.betaBlockerInitiated}
                    onChange={(e) => setPheoInput({ ...pheoInput, betaBlockerInitiated: e.target.checked })}
                  />
                  <span className="flex items-center">
                    Włączono beta-bloker {isLocked('betaBlocker') && <Lock className="h-3 w-3 ml-1 text-muted-foreground" />}
                  </span>
                </label>
              )}
              {isVisible('alphaBlocker') && (
                <label className="flex items-center gap-2 text-emerald-600 font-medium">
                  <input
                    type="checkbox"
                    disabled={isLocked('alphaBlocker')}
                    checked={pheoInput.alphaBlockerInitiated}
                    onChange={(e) => setPheoInput({ ...pheoInput, alphaBlockerInitiated: e.target.checked })}
                  />
                  <span className="flex items-center">
                    Wdrożono skuteczną alfa-blokadę {isLocked('alphaBlocker') && <Lock className="h-3 w-3 ml-1 text-muted-foreground" />}
                  </span>
                </label>
              )}
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
                  <AlertCircle className="h-3.5 w-3.5 shrink-0 mt-0.5" />
                  <span>{s}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {section === 'incidentaloma' && (
          <div className="grid gap-4 md:grid-cols-2 text-xs">
            <div className="space-y-2">
              {isVisible('sizeMm') && (
                <label className="flex flex-col gap-1">
                  <span className="text-muted-foreground flex items-center">
                    Wielkość guza w CT (mm) {isLocked('sizeMm') && <Lock className="h-3 w-3 ml-1 text-muted-foreground" />}
                  </span>
                  <input
                    type="number"
                    disabled={isLocked('sizeMm')}
                    value={incInput.sizeMm}
                    onChange={(e) => setIncInput({ ...incInput, sizeMm: Number(e.target.value) })}
                    className="rounded border border-input bg-background px-2.5 py-1.5 disabled:opacity-75 disabled:cursor-not-allowed"
                  />
                </label>
              )}
              {isVisible('unenhancedHu') && (
                <label className="flex flex-col gap-1">
                  <span className="text-muted-foreground flex items-center">
                    Gęstość natywna CT (HU) {isLocked('unenhancedHu') && <Lock className="h-3 w-3 ml-1 text-muted-foreground" />}
                  </span>
                  <input
                    type="number"
                    disabled={isLocked('unenhancedHu')}
                    value={incInput.unenhancedHu}
                    onChange={(e) => setIncInput({ ...incInput, unenhancedHu: Number(e.target.value) })}
                    className="rounded border border-input bg-background px-2.5 py-1.5 disabled:opacity-75 disabled:cursor-not-allowed"
                  />
                </label>
              )}
              {isVisible('postDstCortisol') && (
                <label className="flex flex-col gap-1">
                  <span className="text-muted-foreground flex items-center">
                    Kortyzol po teście 1 mg DST (µg/dl) {isLocked('postDstCortisol') && <Lock className="h-3 w-3 ml-1 text-muted-foreground" />}
                  </span>
                  <input
                    type="number"
                    step="0.1"
                    disabled={isLocked('postDstCortisol')}
                    value={incInput.postDstCortisolUgDl}
                    onChange={(e) => setIncInput({ ...incInput, postDstCortisolUgDl: Number(e.target.value) })}
                    className="rounded border border-input bg-background px-2.5 py-1.5 disabled:opacity-75 disabled:cursor-not-allowed"
                  />
                </label>
              )}
            </div>
            <div className="rounded-lg bg-muted/40 p-3.5 space-y-2 border border-border/50">
              <div className="font-semibold text-sm">Fenotyp: {incRes.imagingCategory} | {incRes.endocrineActivity}</div>
              <p className="text-muted-foreground">{incRes.recommendation}</p>
            </div>
          </div>
        )}

        <WorkbenchEvidenceCard claims={relevantClaims} sources={adrenalSources} />
      </div>
    </div>
  );
}
