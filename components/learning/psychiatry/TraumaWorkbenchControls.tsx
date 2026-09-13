'use client';

import React from 'react';
import {
  DEFAULT_TRAUMA_INPUT,
  type TraumaDissociationInput,
  type IdentityDiscontinuity,
  type AmnesiaType,
  type RealityTesting,
  type NegativeSelfConcept,
  type ReExperiencingInPresent,
  type TraumaAvoidance,
  type PersistentCurrentThreat,
  type SymptomDuration,
  type SuicidalityRisk,
  type VoicePhenomenology,
  type AffectRegulation,
  type NeurologicalInvestigations,
} from '@/lib/psychiatry/engines/trauma-dissociation-engine';
import type { TraumaDissociationControlId } from '@/lib/content/preset-registry';
import { Lock, Info, ShieldAlert } from 'lucide-react';

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
              <option value="trauma_specific">Amnezja ograniczona do urazu (PTSD / wczesne DID wg ICD-11)</option>
              <option value="recurrent_daily_activities">Nawracające luki w zdarzeniach codziennych (DID/time loss)</option>
              <option value="generalized_identity_loss">Uogólniona utrata tożsamości autobiograficznej (Fuga)</option>
              <option value="brief_paroxysmal">Krótka paroksyzmalna (mimik TLE)</option>
            </select>
          </div>
        )}

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
              <option value="impaired_delusional">Zniesione / urojeniowe (Psychoza)</option>
            </select>
          </div>
        )}

        <div className="rounded-xl border border-border/70 p-3 bg-card space-y-2 col-span-1 md:col-span-2">
          <div className="flex items-center justify-between font-semibold">
            <span className="flex items-center gap-1.5">
              <Info className="h-3.5 w-3.5 text-indigo-500" />
              Fenomenologia głosów (Metadane niebędące samodzielnym kryterium)
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <div>
              <label className="text-[11px] text-muted-foreground block mb-1">Lokalizacja:</label>
              <select
                value={input.voicePhenomenology?.location || 'unclear'}
                onChange={(e) => {
                  const curr = input.voicePhenomenology || DEFAULT_TRAUMA_INPUT.voicePhenomenology!;
                  const val = e.target.value as VoicePhenomenology['location'];
                  setInput({ ...input, voicePhenomenology: { ...curr, present: val !== 'unclear', location: val } });
                }}
                className="w-full rounded-md border border-input bg-background p-1.5 text-xs"
              >
                <option value="unclear">Brak głosów / niejasne</option>
                <option value="internal">Wewnątrz głowy (subiektywna przestrzeń)</option>
                <option value="external">W przestrzeni zewnętrznej</option>
                <option value="both">Zarówno wewnątrz, jak i z zewnątrz</option>
              </select>
            </div>
            <div>
              <label className="text-[11px] text-muted-foreground block mb-1">Atrybucja źródła:</label>
              <select
                value={input.voicePhenomenology?.attribution || 'uncertain'}
                onChange={(e) => {
                  const curr = input.voicePhenomenology || DEFAULT_TRAUMA_INPUT.voicePhenomenology!;
                  setInput({ ...input, voicePhenomenology: { ...curr, attribution: e.target.value as VoicePhenomenology['attribution'] } });
                }}
                className="w-full rounded-md border border-input bg-background p-1.5 text-xs"
              >
                <option value="uncertain">Niejasna / niesprecyzowana</option>
                <option value="identity_state_related">Dialog stanów tożsamości</option>
                <option value="self_related">Własne myśli w formie echa</option>
                <option value="external_agent">Obce byty / siły zewnętrzne</option>
              </select>
            </div>
            <div>
              <label className="text-[11px] text-muted-foreground block mb-1">Krytycyzm:</label>
              <select
                value={input.voicePhenomenology?.conviction || 'insight_preserved'}
                onChange={(e) => {
                  const curr = input.voicePhenomenology || DEFAULT_TRAUMA_INPUT.voicePhenomenology!;
                  setInput({ ...input, voicePhenomenology: { ...curr, conviction: e.target.value as VoicePhenomenology['conviction'] } });
                }}
                className="w-full rounded-md border border-input bg-background p-1.5 text-xs"
              >
                <option value="insight_preserved">Zachowany krytycyzm (wgląd)</option>
                <option value="partial_insight">Częściowy krytycyzm</option>
                <option value="fixed_external_attribution">Utrwalone urojenia</option>
              </select>
            </div>
          </div>
          <p className="text-[10px] text-muted-foreground italic">
            Uwaga: Lokalizacja głosu nie przesądza o diagnozie; głosy wewnętrzne bywają obecne w psychozie, a głosy z zewnątrz w dysocjacji pourazowej.
          </p>
        </div>

        <div className="rounded-xl border border-border/70 p-3 bg-card space-y-2 col-span-1 md:col-span-2">
          <span className="font-semibold text-foreground">Kryteria rdzeniowe PTSD (ICD-11 Triad)</span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <div>
              <label className="text-[11px] text-muted-foreground block mb-1">1. Ponowne przeżywanie:</label>
              <select
                value={input.reExperiencingInPresent || 'none'}
                onChange={(e) => setInput({ ...input, reExperiencingInPresent: e.target.value as ReExperiencingInPresent })}
                className="w-full rounded-md border border-input bg-background p-1.5 text-xs"
              >
                <option value="none">Brak intruzji</option>
                <option value="intrusive_memories_without_here_and_now_quality">Natrętne wspomnienia (brak tu i teraz)</option>
                <option value="vivid_flashback_here_and_now">Flashback tu i teraz (re-experiencing)</option>
                <option value="trauma_nightmares_with_reexperiencing">Koszmary senne z re-living</option>
              </select>
            </div>
            <div>
              <label className="text-[11px] text-muted-foreground block mb-1">2. Unikanie bodźców:</label>
              <select
                value={input.traumaAvoidance || 'none'}
                onChange={(e) => setInput({ ...input, traumaAvoidance: e.target.value as TraumaAvoidance })}
                className="w-full rounded-md border border-input bg-background p-1.5 text-xs"
              >
                <option value="none">Brak unikania</option>
                <option value="internal">Wewnętrzne (myśli, uczucia)</option>
                <option value="external">Zewnętrzne (miejsca, osoby)</option>
                <option value="both">Zarówno wewnętrzne, jak i zewnętrzne</option>
              </select>
            </div>
            <div>
              <label className="text-[11px] text-muted-foreground block mb-1">3. Poczucie zagrożenia:</label>
              <select
                value={input.persistentCurrentThreat || 'none'}
                onChange={(e) => setInput({ ...input, persistentCurrentThreat: e.target.value as PersistentCurrentThreat })}
                className="w-full rounded-md border border-input bg-background p-1.5 text-xs"
              >
                <option value="none">Brak wzmożonej czujności</option>
                <option value="hypervigilance">Nadmierna czujność (hypervigilance)</option>
                <option value="exaggerated_startle">Wzmożony odruch zaskoczenia</option>
                <option value="both">Czujność i odruch zaskoczenia</option>
              </select>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-border/70 p-3 bg-card space-y-2 col-span-1 md:col-span-2">
          <span className="font-semibold text-foreground">Triada DSO (cPTSD) i Wymiary Osobowości (BPD)</span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <div>
              <label className="text-[11px] text-muted-foreground block mb-1">DSO 1: Negatywny obraz siebie:</label>
              <select
                value={input.negativeSelfConcept}
                onChange={(e) => setInput({ ...input, negativeSelfConcept: e.target.value as NegativeSelfConcept })}
                className="w-full rounded-md border border-input bg-background p-1.5 text-xs"
              >
                <option value="none">Brak trwałego negatywnego obrazu</option>
                <option value="persistent_shame_guilt">Trwały wstyd, wina i porażka</option>
                <option value="worthlessness_failure">Głęboka bezwartościowość</option>
                <option value="trauma_related_negative_identity">Tożsamość trwale uszkodzona</option>
              </select>
            </div>
            <div>
              <label className="text-[11px] text-muted-foreground block mb-1">DSO 2: Dysregulacja afektu:</label>
              <select
                value={input.affectRegulation?.persistentDysregulation || 'none'}
                onChange={(e) => {
                  const curr = input.affectRegulation || { reactiveLability: 'none', persistentDysregulation: 'none' };
                  setInput({ ...input, affectRegulation: { ...curr, persistentDysregulation: e.target.value as AffectRegulation['persistentDysregulation'] } });
                }}
                className="w-full rounded-md border border-input bg-background p-1.5 text-xs"
              >
                <option value="none">Brak trwałej dysregulacji</option>
                <option value="hyperactivation">Trwała nadreaktywność (gniew)</option>
                <option value="hypoactivation_numbing">Odrętwienie / numbing</option>
                <option value="mixed">Mieszana nadreaktywność i odrętwienie</option>
              </select>
            </div>
            <div>
              <label className="text-[11px] text-muted-foreground block mb-1">DSO 3: Trudność w bliskości:</label>
              <select
                value={input.relationalDisturbance?.sustainedDifficultyWithCloseness || 'none'}
                onChange={(e) => {
                  const curr = input.relationalDisturbance || { sustainedDifficultyWithCloseness: 'none', persistentDetachmentOrAlienation: 'none', unstableIntenseRelationships: 'none', abandonmentSensitivity: 'none' };
                  const val = e.target.value as 'none' | 'present';
                  setInput({ ...input, relationalDisturbance: { ...curr, sustainedDifficultyWithCloseness: val, persistentDetachmentOrAlienation: val } });
                }}
                className="w-full rounded-md border border-input bg-background p-1.5 text-xs"
              >
                <option value="none">Zdolność do bliskości</option>
                <option value="present">Trudność w bliskości i wyobcowanie</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 border-t border-border/40">
            <div>
              <label className="text-[11px] text-muted-foreground block mb-1">Cecha BPD: Lęk przed porzuceniem:</label>
              <select
                value={input.relationalDisturbance?.abandonmentSensitivity || 'none'}
                onChange={(e) => {
                  const curr = input.relationalDisturbance || { sustainedDifficultyWithCloseness: 'none', persistentDetachmentOrAlienation: 'none', unstableIntenseRelationships: 'none', abandonmentSensitivity: 'none' };
                  setInput({ ...input, relationalDisturbance: { ...curr, abandonmentSensitivity: e.target.value as 'none' | 'present' | 'marked' } });
                }}
                className="w-full rounded-md border border-input bg-background p-1.5 text-xs"
              >
                <option value="none">Brak lęku przed porzuceniem</option>
                <option value="present">Umiarkowany lęk</option>
                <option value="marked">Paniczny lęk i wysiłki zapobiegawcze</option>
              </select>
            </div>
            <div>
              <label className="text-[11px] text-muted-foreground block mb-1">Cecha BPD: Reaktywna chwiejność afektu:</label>
              <select
                value={input.affectRegulation?.reactiveLability || 'none'}
                onChange={(e) => {
                  const curr = input.affectRegulation || { reactiveLability: 'none', persistentDysregulation: 'none' };
                  setInput({ ...input, affectRegulation: { ...curr, reactiveLability: e.target.value as 'none' | 'mild' | 'marked' } });
                }}
                className="w-full rounded-md border border-input bg-background p-1.5 text-xs"
              >
                <option value="none">Brak nagłej chwiejności</option>
                <option value="mild">Łagodna chwiejność</option>
                <option value="marked">Gwałtowna chwiejność (godziny)</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
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

      <div className="rounded-xl border border-border/70 p-3 bg-card space-y-2 col-span-1 md:col-span-2">
        <span className="font-semibold text-foreground flex items-center gap-1.5">
          <ShieldAlert className="h-3.5 w-3.5 text-indigo-500" />
          Różnicowanie neurologiczne (Wytyczne ILAE 2017 / NICE NG217)
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={Boolean(input.neurologicalFeatures?.aura?.epigastricRising || input.neurologicalFeatures?.hasAuraOrEpigastricRising)}
              onChange={(e) => {
                const baseNeuro = input.neurologicalFeatures || DEFAULT_TRAUMA_INPUT.neurologicalFeatures!;
                setInput({
                  ...input,
                  neurologicalFeatures: {
                    ...baseNeuro,
                    hasAuraOrEpigastricRising: e.target.checked,
                    aura: { ...baseNeuro.aura, epigastricRising: e.target.checked },
                  },
                });
              }}
              className="rounded border-input text-indigo-600"
            />
            <span>Aura nadbrzuszna („wznoszenie z żołądka”) lub węchowa/smakowa</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={Boolean(input.neurologicalFeatures?.episodicPattern === 'stereotyped' || input.neurologicalFeatures?.stereotypedSecondsDuration)}
              onChange={(e) => {
                const baseNeuro = input.neurologicalFeatures || DEFAULT_TRAUMA_INPUT.neurologicalFeatures!;
                setInput({
                  ...input,
                  neurologicalFeatures: {
                    ...baseNeuro,
                    episodicPattern: e.target.checked ? 'stereotyped' : 'non_stereotyped',
                    stereotypedSecondsDuration: e.target.checked,
                  },
                });
              }}
              className="rounded border-input text-indigo-600"
            />
            <span>Stereotypowe napady z automatyzmami oralnymi/ruchowymi</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={Boolean(input.neurologicalFeatures?.postictalState?.confusion || input.neurologicalFeatures?.postictalConfusion)}
              onChange={(e) => {
                const baseNeuro = input.neurologicalFeatures || DEFAULT_TRAUMA_INPUT.neurologicalFeatures!;
                setInput({
                  ...input,
                  neurologicalFeatures: {
                    ...baseNeuro,
                    postictalConfusion: e.target.checked,
                    postictalState: { ...baseNeuro.postictalState, confusion: e.target.checked },
                  },
                });
              }}
              className="rounded border-input text-indigo-600"
            />
            <span>Stan ponapadowy (senność, afazja, kilkuminutowe splątanie)</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={input.neurologicalFeatures?.witnessHistory === 'available_supportive'}
              onChange={(e) => {
                const baseNeuro = input.neurologicalFeatures || DEFAULT_TRAUMA_INPUT.neurologicalFeatures!;
                setInput({
                  ...input,
                  neurologicalFeatures: {
                    ...baseNeuro,
                    witnessHistory: e.target.checked ? 'available_supportive' : 'unavailable',
                  },
                });
              }}
              className="rounded border-input text-indigo-600"
            />
            <span>Relacja świadka potwierdza stałą sekwencję napadu</span>
          </label>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-border/40">
          <div>
            <label className="text-[11px] text-muted-foreground block mb-1">Wynik EEG:</label>
            <select
              value={input.neurologicalInvestigations?.eeg?.status || 'not_done'}
              onChange={(e) => {
                const inv = input.neurologicalInvestigations || {};
                type EegStatus = NonNullable<NeurologicalInvestigations['eeg']>['status'];
                setInput({
                  ...input,
                  neurologicalInvestigations: {
                    ...inv,
                    eeg: { ...inv.eeg, status: e.target.value as EegStatus },
                  },
                });
              }}
              className="w-full rounded-md border border-input bg-background p-1.5 text-xs"
            >
              <option value="not_done">Badanie niewykonane</option>
              <option value="normal">Prawidłowy (UWAGA: nie wyklucza TLE!)</option>
              <option value="epileptiform">Wyładowania padaczkokształtne (wspiera TLE)</option>
              <option value="nonspecific">Zmiany niespecyficzne</option>
            </select>
          </div>
          <div>
            <label className="text-[11px] text-muted-foreground block mb-1">Wynik MRI głowy (protokół padaczkowy):</label>
            <select
              value={input.neurologicalInvestigations?.mri?.status || 'not_done'}
              onChange={(e) => {
                const inv = input.neurologicalInvestigations || {};
                type MriStatus = NonNullable<NeurologicalInvestigations['mri']>['status'];
                setInput({
                  ...input,
                  neurologicalInvestigations: {
                    ...inv,
                    mri: { ...inv.mri, status: e.target.value as MriStatus },
                  },
                });
              }}
              className="w-full rounded-md border border-input bg-background p-1.5 text-xs"
            >
              <option value="not_done">Badanie niewykonane</option>
              <option value="normal">Prawidłowy (nie wyklucza padaczki nielesyjnej)</option>
              <option value="potential_epileptogenic_lesion">Zmiana padaczkorodna (np. stwardnienie hipokampa)</option>
            </select>
          </div>
        </div>

        <div className="rounded bg-sky-50 p-2 text-[10px] text-sky-800 dark:bg-sky-950/40 dark:text-sky-300 font-medium">
          Niezmiennik bezpieczeństwa: Prawidłowy zapis EEG ani prawidłowy MRI NIE potwierdzają zaburzenia dysocjacyjnego ani nie wykluczają definitywnie padaczki.
        </div>
      </div>
    </div>
  );
}
