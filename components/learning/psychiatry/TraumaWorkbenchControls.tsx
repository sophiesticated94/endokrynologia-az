'use client';

import React from 'react';
import type {
  TraumaDissociationInput,
  IdentityDiscontinuity,
  AmnesiaType,
  RealityTesting,
  TraumaIntrusions,
  NegativeSelfConcept,
  InterpersonalPattern,
  HallucinationType,
  SymptomDuration,
  SuicidalityRisk,
} from '@/lib/psychiatry/engines/trauma-dissociation-engine';
import type { TraumaDissociationControlId } from '@/lib/content/preset-registry';
import { Lock, Info } from 'lucide-react';

interface TraumaWorkbenchControlsProps {
  section: 'dissociation_axes' | 'safety_neurology';
  input: TraumaDissociationInput;
  setInput: React.Dispatch<React.SetStateAction<TraumaDissociationInput>>;
  locked: (field: TraumaDissociationControlId) => boolean;
  visible: (field: TraumaDissociationControlId) => boolean;
}

export function TraumaWorkbenchControls({
  section,
  input,
  setInput,
  locked,
  visible,
}: TraumaWorkbenchControlsProps) {
  if (section === 'dissociation_axes') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
        {/* Identity Discontinuity */}
        {visible('identityDiscontinuity') && (
          <div className="rounded-xl border border-border/70 p-3 bg-card space-y-1.5">
            <label className="flex items-center justify-between font-semibold">
              <span>Ciągłość tożsamości (Identity Discontinuity)</span>
              {locked('identityDiscontinuity') && <Lock className="h-3 w-3 text-amber-500" />}
            </label>
            <select
              disabled={locked('identityDiscontinuity')}
              value={input.identityDiscontinuity}
              onChange={(e) => setInput({ ...input, identityDiscontinuity: e.target.value as IdentityDiscontinuity })}
              className="w-full rounded-md border border-input bg-background p-1.5 text-xs disabled:opacity-60"
            >
              <option value="none">Brak zaburzenia (spójna tożsamość)</option>
              <option value="disturbed_sense_of_self">Niestabilne poczucie jaźni (profil BPD)</option>
              <option value="distinct_personality_states">Odrębne stany tożsamości / alterzy (profil DID)</option>
            </select>
          </div>
        )}

        {/* Amnesia Type */}
        {visible('amnesiaType') && (
          <div className="rounded-xl border border-border/70 p-3 bg-card space-y-1.5">
            <label className="flex items-center justify-between font-semibold">
              <span>Wzorzec amnezji (Amnesia Pattern)</span>
              {locked('amnesiaType') && <Lock className="h-3 w-3 text-amber-500" />}
            </label>
            <select
              disabled={locked('amnesiaType')}
              value={input.amnesiaType}
              onChange={(e) => setInput({ ...input, amnesiaType: e.target.value as AmnesiaType })}
              className="w-full rounded-md border border-input bg-background p-1.5 text-xs disabled:opacity-60"
            >
              <option value="none">Brak luk pamięciowych</option>
              <option value="trauma_specific">Amnezja ograniczona do traumy (PTSD/ASD)</option>
              <option value="recurrent_daily_activities">Nawracające luki w zdarzeniach codziennych (DID/time loss)</option>
              <option value="generalized_identity_loss">Uogólniona utrata tożsamości (Fuga)</option>
              <option value="brief_paroxysmal">Krótka ponapadowa (mimik TLE)</option>
            </select>
          </div>
        )}

        {/* Reality Testing */}
        {visible('realityTesting') && (
          <div className="rounded-xl border border-border/70 p-3 bg-card space-y-1.5">
            <label className="flex items-center justify-between font-semibold">
              <span>Testowanie rzeczywistości (Reality Testing)</span>
              {locked('realityTesting') && <Lock className="h-3 w-3 text-amber-500" />}
            </label>
            <select
              disabled={locked('realityTesting')}
              value={input.realityTesting}
              onChange={(e) => setInput({ ...input, realityTesting: e.target.value as RealityTesting })}
              className="w-full rounded-md border border-input bg-background p-1.5 text-xs disabled:opacity-60"
            >
              <option value="intact">Nienaruszone (pełny krytycyzm — DPDR/DID)</option>
              <option value="transient_stress_induced">Przemijające zakłócenia w skrajnym stresie (BPD)</option>
              <option value="impaired_delusional">Zniesione / urojeniowe (Psychoza/Schizofrenia)</option>
            </select>
          </div>
        )}

        {/* Hallucinations */}
        {visible('hallucinations') && (
          <div className="rounded-xl border border-border/70 p-3 bg-card space-y-1.5">
            <label className="flex items-center justify-between font-semibold">
              <span>Fenomenologia głosów / omamów</span>
              {locked('hallucinations') && <Lock className="h-3 w-3 text-amber-500" />}
            </label>
            <select
              disabled={locked('hallucinations')}
              value={input.hallucinations}
              onChange={(e) => setInput({ ...input, hallucinations: e.target.value as HallucinationType })}
              className="w-full rounded-md border border-input bg-background p-1.5 text-xs disabled:opacity-60"
            >
              <option value="none">Brak omamów ani głosów</option>
              <option value="internal_dialogue_ego_dystonic">Wewnętrzny dialog stanów jaźni (profil DID)</option>
              <option value="external_commentary_ego_syntonic">Głosy w przestrzeni zewnętrznej, komentujące (Psychoza)</option>
              <option value="hypnagogic_or_sensory">Przejściowe omamy przysenne / czuciowe</option>
            </select>
          </div>
        )}

        {/* Trauma Intrusions */}
        {visible('traumaIntrusions') && (
          <div className="rounded-xl border border-border/70 p-3 bg-card space-y-1.5">
            <label className="flex items-center justify-between font-semibold">
              <span>Intruzje traumatyczne (Re-experiencing)</span>
              {locked('traumaIntrusions') && <Lock className="h-3 w-3 text-amber-500" />}
            </label>
            <select
              disabled={locked('traumaIntrusions')}
              value={input.traumaIntrusions}
              onChange={(e) => setInput({ ...input, traumaIntrusions: e.target.value as TraumaIntrusions })}
              className="w-full rounded-md border border-input bg-background p-1.5 text-xs disabled:opacity-60"
            >
              <option value="none">Brak intruzji</option>
              <option value="distressing_memories">Natrętne przykre wspomnienia / koszmary</option>
              <option value="flashbacks_acting_as_if">Flashbacks (odżywanie traumy w tu i teraz)</option>
            </select>
          </div>
        )}

        {/* Negative Self-Concept (DSO Triad) */}
        {visible('negativeSelfConcept') && (
          <div className="rounded-xl border border-border/70 p-3 bg-card space-y-1.5">
            <label className="flex items-center justify-between font-semibold">
              <span>Obraz siebie (DSO: Negative Self-Concept)</span>
              {locked('negativeSelfConcept') && <Lock className="h-3 w-3 text-amber-500" />}
            </label>
            <select
              disabled={locked('negativeSelfConcept')}
              value={input.negativeSelfConcept}
              onChange={(e) => setInput({ ...input, negativeSelfConcept: e.target.value as NegativeSelfConcept })}
              className="w-full rounded-md border border-input bg-background p-1.5 text-xs disabled:opacity-60"
            >
              <option value="none">Brak trwałego negatywnego obrazu siebie</option>
              <option value="persistent_shame_guilt">Uporczywe poczucie wstydu, winy i porażki (cPTSD)</option>
              <option value="worthlessness_failure">Głębokie poczucie bezwartościowości i defektu (cPTSD)</option>
              <option value="trauma_related_negative_identity">Tożsamość zorganizowana wokół trwałego uszkodzenia</option>
            </select>
          </div>
        )}

        {/* Interpersonal & Abandonment */}
        {visible('interpersonalPattern') && (
          <div className="rounded-xl border border-border/70 p-3 bg-card space-y-1.5">
            <label className="flex items-center justify-between font-semibold">
              <span>Wzorzec relacji interpersonalnych</span>
              {locked('interpersonalPattern') && <Lock className="h-3 w-3 text-amber-500" />}
            </label>
            <select
              disabled={locked('interpersonalPattern')}
              value={input.interpersonalPattern}
              onChange={(e) => setInput({ ...input, interpersonalPattern: e.target.value as InterpersonalPattern })}
              className="w-full rounded-md border border-input bg-background p-1.5 text-xs disabled:opacity-60"
            >
              <option value="stable">Względnie stabilne relacje</option>
              <option value="intense_fear_of_abandonment">Paniczny lęk przed porzuceniem, splitting (BPD)</option>
              <option value="alienated_avoidant">Unikanie bliskości, poczucie wyobcowania (cPTSD)</option>
            </select>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
      {/* Suicidality / Crisis */}
      {visible('suicidalityRisk') && (
        <div className="rounded-xl border border-border/70 p-3 bg-card space-y-1.5">
          <label className="flex items-center justify-between font-semibold text-rose-700 dark:text-rose-400">
            <span>Ocena ryzyka samobójczego i autoagresji</span>
            {locked('suicidalityRisk') && <Lock className="h-3 w-3 text-amber-500" />}
          </label>
          <select
            disabled={locked('suicidalityRisk')}
            value={input.suicidalityRisk}
            onChange={(e) => setInput({ ...input, suicidalityRisk: e.target.value as SuicidalityRisk })}
            className="w-full rounded-md border border-input bg-background p-1.5 text-xs disabled:opacity-60"
          >
            <option value="none">Brak myśli rezygnacyjnych</option>
            <option value="passive_ideation">Myśli bierne bez planu ani zamiaru</option>
            <option value="active_with_intent">Aktywne myśli z planem i zamiarem (Stan nagły!)</option>
            <option value="recent_severe_self_harm">Niedawne ciężkie samouszkodzenia (NSSI / dekompensacja)</option>
          </select>
        </div>
      )}

      {/* Symptom Duration / Attack pattern */}
      {visible('symptomDuration') && (
        <div className="rounded-xl border border-border/70 p-3 bg-card space-y-1.5">
          <label className="flex items-center justify-between font-semibold">
            <span>Dynamika czasowa pojedynczych epizodów</span>
            {locked('symptomDuration') && <Lock className="h-3 w-3 text-amber-500" />}
          </label>
          <select
            disabled={locked('symptomDuration')}
            value={input.symptomDuration}
            onChange={(e) => setInput({ ...input, symptomDuration: e.target.value as SymptomDuration })}
            className="w-full rounded-md border border-input bg-background p-1.5 text-xs disabled:opacity-60"
          >
            <option value="chronic_months">Przewlekłe / wielogodzinne fale (typowo psychogenne)</option>
            <option value="brief_episodes_seconds">Ściśle stereotypowe 30–120 sekund (Czerwona flaga TLE!)</option>
            <option value="days_under_3">Ostre do 3 dni (profil ASR)</option>
            <option value="days_under_30">Od 3 do 30 dni (profil ASD)</option>
          </select>
        </div>
      )}

      {/* Neurological checklist */}
      <div className="rounded-xl border border-border/70 p-3 bg-card space-y-2 col-span-1 md:col-span-2">
        <span className="font-semibold text-foreground flex items-center gap-1.5">
          <Info className="h-3.5 w-3.5 text-indigo-500" />
          Symptomy neurologiczne (Przesiew w kierunku padaczki skroniowej)
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={input.neurologicalFeatures?.hasAuraOrEpigastricRising ?? false}
              onChange={(e) =>
                setInput({
                  ...input,
                  neurologicalFeatures: { ...input.neurologicalFeatures, hasAuraOrEpigastricRising: e.target.checked },
                })
              }
              className="rounded border-input text-indigo-600"
            />
            <span>Aura nadbrzuszna („wznoszenie z żołądka”) lub węchowa</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={input.neurologicalFeatures?.stereotypedSecondsDuration ?? false}
              onChange={(e) =>
                setInput({
                  ...input,
                  neurologicalFeatures: { ...input.neurologicalFeatures, stereotypedSecondsDuration: e.target.checked },
                })
              }
              className="rounded border-input text-indigo-600"
            />
            <span>Stereotypowe napady 30–60 s z mlaskaniem</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={input.neurologicalFeatures?.postictalConfusion ?? false}
              onChange={(e) =>
                setInput({
                  ...input,
                  neurologicalFeatures: { ...input.neurologicalFeatures, postictalConfusion: e.target.checked },
                })
              }
              className="rounded border-input text-indigo-600"
            />
            <span>Stan ponapadowy (senność, afazja, splątanie)</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={input.neurologicalFeatures?.focalDeficits ?? false}
              onChange={(e) =>
                setInput({
                  ...input,
                  neurologicalFeatures: { ...input.neurologicalFeatures, focalDeficits: e.target.checked },
                })
              }
              className="rounded border-input text-indigo-600"
            />
            <span>Ogniskowe ubytki neurologiczne (asymetria odruchów)</span>
          </label>
        </div>
      </div>
    </div>
  );
}
