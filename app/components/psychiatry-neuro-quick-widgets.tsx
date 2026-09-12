'use client';
import React, { useState } from 'react';
import {
  Activity,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Pill,
  Search,
  Scale,
  ShieldAlert,
  ArrowRight,
} from 'lucide-react';
import {
  evaluate4AT,
  evaluateAnticholinergicBurden,
  evaluateBeersCriteria,
  evaluateBpsdEtiology,
  evaluateNeurocognitiveClock,
  evaluateCapacityDomains,
  type TempoCategory,
} from '@/lib/psychiatry/engines/neurocognitive-engine';
import { EvidenceBadge } from './evidence-badge';

export function FourATQuickLab({
  onOpenLab,
  onOpenEvidence,
}: {
  onOpenLab?: (presetId?: string) => void;
  onOpenEvidence?: () => void;
}) {
  const [alertness, setAlertness] = useState<0 | 4>(0);
  const [amt4, setAmt4] = useState<0 | 1 | 2>(0);
  const [attention, setAttention] = useState<0 | 1 | 2>(0);
  const [acuteChange, setAcuteChange] = useState<0 | 4>(4);

  const result = evaluate4AT({
    alertness,
    amt4,
    attention,
    acuteChange,
  });

  return (
    <div className="four-at-quick-lab my-3 p-3.5 bg-amber-50/70 border border-amber-300 rounded-xl text-xs">
      <div className="flex items-center justify-between mb-2 flex-wrap gap-1">
        <span className="font-bold text-amber-950 flex items-center gap-1.5">
          <Activity size={15} className="text-amber-700" /> Szybki kalkulator 4AT (Bellelli 2014)
        </span>
        <div className="flex items-center gap-1.5">
          <EvidenceBadge claimKey="4at-validation" label="4AT EBM (90% / 88%)" onClick={onOpenEvidence} />
          <span
            className={`px-2 py-0.5 rounded-full font-bold text-[11px] ${
              result.score >= 4
                ? 'bg-red-600 text-white animate-pulse'
                : result.score >= 1
                ? 'bg-amber-500 text-white'
                : 'bg-emerald-600 text-white'
            }`}
          >
            {result.score} pkt — {result.category.toUpperCase()}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 my-2">
        <div className="bg-white/80 p-2 rounded-lg border border-amber-200">
          <label className="font-semibold text-slate-800 block mb-1">1. Czuwanie / Przytomność:</label>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setAlertness(0)}
              className={`px-2 py-1 rounded text-[11px] ${alertness === 0 ? 'bg-amber-600 text-white font-bold' : 'bg-slate-100 text-slate-700'}`}
            >
              Norma (0)
            </button>
            <button
              type="button"
              onClick={() => setAlertness(4)}
              className={`px-2 py-1 rounded text-[11px] ${alertness === 4 ? 'bg-red-600 text-white font-bold' : 'bg-slate-100 text-slate-700'}`}
            >
              Senny / pobudzony (4)
            </button>
          </div>
        </div>

        <div className="bg-white/80 p-2 rounded-lg border border-amber-200">
          <label className="font-semibold text-slate-800 block mb-1">2. AMT4 (wiek, data, miejsce, rok):</label>
          <div className="flex gap-1.5">
            {[0, 1, 2].map(err => (
              <button
                key={err}
                type="button"
                onClick={() => setAmt4(err as any)}
                className={`px-2 py-1 rounded text-[11px] ${amt4 === err ? 'bg-amber-600 text-white font-bold' : 'bg-slate-100 text-slate-700'}`}
              >
                {err === 0 ? '0 błędów (0)' : err === 1 ? '1 błąd (1)' : '2+ błędy (2)'}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white/80 p-2 rounded-lg border border-amber-200">
          <label className="font-semibold text-slate-800 block mb-1">3. Uwaga (Miesiące wstecz):</label>
          <div className="flex gap-1.5">
            {[0, 1, 2].map(err => (
              <button
                key={err}
                type="button"
                onClick={() => setAttention(err as any)}
                className={`px-2 py-1 rounded text-[11px] ${attention === err ? 'bg-amber-600 text-white font-bold' : 'bg-slate-100 text-slate-700'}`}
              >
                {err === 0 ? '7+ mies. (0)' : err === 1 ? '<7 mies. (1)' : 'Nie podejmuje (2)'}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white/80 p-2 rounded-lg border border-amber-200">
          <label className="font-semibold text-slate-800 block mb-1">4. Ostry początek / wahania:</label>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setAcuteChange(0)}
              className={`px-2 py-1 rounded text-[11px] ${acuteChange === 0 ? 'bg-amber-600 text-white font-bold' : 'bg-slate-100 text-slate-700'}`}
            >
              Nie (0)
            </button>
            <button
              type="button"
              onClick={() => setAcuteChange(4)}
              className={`px-2 py-1 rounded text-[11px] ${acuteChange === 4 ? 'bg-red-600 text-white font-bold' : 'bg-slate-100 text-slate-700'}`}
            >
              Tak — ostry/fluktuuje (4)
            </button>
          </div>
        </div>
      </div>

      <div className="mt-2 p-2 bg-white/90 border border-amber-200 rounded-lg flex items-center justify-between">
        <span className="text-slate-700 text-[11px]">{result.interpretation}</span>
        {onOpenLab && (
          <button
            type="button"
            onClick={() => onOpenLab('delirium-jan-uti-4at')}
            className="inline-flex items-center gap-1 text-indigo-700 hover:text-indigo-900 font-bold underline text-[11px] shrink-0 ml-2 cursor-pointer"
          >
            <span>Zbadaj Jana w pracowni</span>
            <ArrowRight size={12} />
          </button>
        )}
      </div>
    </div>
  );
}

export function GeriatricMedQuickLab({
  onOpenLab,
  onOpenEvidence,
}: {
  onOpenLab?: (presetId?: string) => void;
  onOpenEvidence?: () => void;
}) {
  const [selectedMeds, setSelectedMeds] = useState<string[]>([
    'hydroksyzyna',
    'diazepam',
    'tramadol',
  ]);

  const toggleMed = (med: string) => {
    setSelectedMeds(prev =>
      prev.includes(med) ? prev.filter(m => m !== med) : [...prev, med]
    );
  };

  const acb = evaluateAnticholinergicBurden(selectedMeds);
  const beers = evaluateBeersCriteria(82, selectedMeds, ['otepienie', 'upadki']);

  return (
    <div className="geriatric-med-quick-lab my-3 p-3.5 bg-rose-50/60 border border-rose-200 rounded-xl text-xs">
      <div className="flex items-center justify-between mb-2 flex-wrap gap-1">
        <span className="font-bold text-rose-950 flex items-center gap-1.5">
          <Pill size={15} className="text-rose-700" /> Bezpieczeństwo lekowe: ACB &amp; Beers 2023
        </span>
        <div className="flex items-center gap-1.5">
          <EvidenceBadge claimKey="acb-burden" label="ACB Evidence" onClick={onOpenEvidence} />
          <span
            className={`px-2 py-0.5 rounded-full font-bold text-[11px] ${
              acb.totalScore >= 3 ? 'bg-red-600 text-white' : 'bg-amber-500 text-white'
            }`}
          >
            ACB: {acb.totalScore} pkt ({acb.burdenCategory.toUpperCase()})
          </span>
        </div>
      </div>

      <div className="bg-white/80 p-2 rounded-lg border border-rose-100 my-1">
        <span className="font-semibold text-slate-700 block mb-1.5">Wybierz leki w schemacie pacjenta 82 l.:</span>
        <div className="flex flex-wrap gap-1.5">
          {[
            { id: 'hydroksyzyna', name: 'Hydroksyzyna (ACB 3)' },
            { id: 'diazepam', name: 'Diazepam (Beers BZD)' },
            { id: 'tramadol', name: 'Tramadol (ACB 1 / OUN)' },
            { id: 'kwetiapina', name: 'Kwetiapina (ACB 1 / Beers)' },
            { id: 'donepezil', name: 'Donepezil (ChEI - interakcja!)' },
            { id: 'sertralina', name: 'Sertralina (ACB 1)' },
          ].map(m => {
            const active = selectedMeds.includes(m.id);
            return (
              <button
                key={m.id}
                type="button"
                onClick={() => toggleMed(m.id)}
                className={`px-2 py-1 rounded-md text-[11px] border transition-colors ${
                  active
                    ? 'bg-rose-600 text-white border-rose-700 font-bold'
                    : 'bg-white text-slate-700 border-slate-300'
                }`}
              >
                {m.name}
              </button>
            );
          })}
        </div>
      </div>

      {beers.flags.length > 0 && (
        <div className="p-2 bg-rose-100/80 border border-rose-300 rounded-lg text-rose-900 text-[11px] my-1.5">
          <strong>Kryteria Beers 2023:</strong> {beers.flags.length} leków potencjalnie nieodpowiednich (PIM).
          <div className="mt-1 font-semibold text-red-800">
            {beers.flags[0].criterion}: {beers.flags[0].rationale}
          </div>
        </div>
      )}

      <div className="mt-2 p-1.5 bg-white/90 border border-rose-200 rounded-lg flex items-center justify-between">
        <span className="text-slate-600 text-[11px]">Kryteria Beers to wsparcie decyzji, nie zakaz terapii.</span>
        {onOpenLab && (
          <button
            type="button"
            onClick={() => onOpenLab('geriatric-polypharmacy-falls')}
            className="inline-flex items-center gap-1 text-rose-700 hover:text-rose-900 font-bold underline text-[11px] shrink-0 ml-2 cursor-pointer"
          >
            <span>Pełny przegląd lekowy</span>
            <ArrowRight size={12} />
          </button>
        )}
      </div>
    </div>
  );
}

export function BpsdHuntQuickLab({
  onOpenLab,
  onOpenEvidence,
}: {
  onOpenLab?: (presetId?: string) => void;
  onOpenEvidence?: () => void;
}) {
  const [pain, setPain] = useState(true);
  const [infection, setInfection] = useState(false);
  const [constipation, setConstipation] = useState(false);
  const [recentMed, setRecentMed] = useState(false);

  const result = evaluateBpsdEtiology({
    behaviour: 'Pobudzenie ruchowe, niepokój wieczorny',
    hasPainIndicators: pain,
    hasFeverOrInfectionSigns: infection,
    hasUrinaryRetentionOrConstipation: constipation,
    recentMedicationChange: recentMed,
    environmentalOverload: false,
  });

  return (
    <div className="bpsd-quick-lab my-3 p-3.5 bg-indigo-50/60 border border-indigo-200 rounded-xl text-xs">
      <div className="flex items-center justify-between mb-2 flex-wrap gap-1">
        <span className="font-bold text-indigo-950 flex items-center gap-1.5">
          <Search size={15} className="text-indigo-700" /> BPSD Cause Hunt: PINCH ME &amp; DICE
        </span>
        <EvidenceBadge claimKey="antipsychotics-dementia-blackbox" label="Black-Box Warning" onClick={onOpenEvidence} />
      </div>

      <div className="bg-white/80 p-2 rounded-lg border border-indigo-100 my-1">
        <span className="font-semibold text-slate-700 block mb-1">Poszukiwanie niezaspokojonej potrzeby:</span>
        <div className="grid grid-cols-2 gap-1.5">
          {[
            { label: 'Ból (stawy, uraz, ząb)', val: pain, set: setPain },
            { label: 'Infekcja (ZUM, płuca)', val: infection, set: setInfection },
            { label: 'Zaparcia / retencja moczu', val: constipation, set: setConstipation },
            { label: 'Nowy lek w schemacie', val: recentMed, set: setRecentMed },
          ].map((opt, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => opt.set(!opt.val)}
              className={`p-1.5 text-left rounded text-[11px] border ${
                opt.val
                  ? 'bg-indigo-600 text-white border-indigo-700 font-bold'
                  : 'bg-white text-slate-700 border-slate-200'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-2 p-2 bg-white/90 border border-indigo-200 rounded-lg text-[11px]">
        <div className="font-semibold text-indigo-900">Interwencja I rzutu (niefarmakologiczna):</div>
        <div className="text-slate-700">{result.nextSteps.join('; ')}</div>
        {result.antipsychoticWarning && (
          <div className="text-red-700 font-semibold mt-1">
            {result.antipsychoticWarning}
          </div>
        )}
      </div>

      <div className="mt-2 flex justify-end">
        {onOpenLab && (
          <button
            type="button"
            onClick={() => onOpenLab('dlb-neuroleptic-reaction')}
            className="inline-flex items-center gap-1 text-indigo-700 hover:text-indigo-900 font-bold underline text-[11px] cursor-pointer"
          >
            <span>Zbadaj nadwrażliwość w DLB</span>
            <ArrowRight size={12} />
          </button>
        )}
      </div>
    </div>
  );
}

export function CapacityQuickLab({
  onOpenLab,
  onOpenEvidence,
}: {
  onOpenLab?: (presetId?: string) => void;
  onOpenEvidence?: () => void;
}) {
  const [understands, setUnderstands] = useState(true);
  const [retains, setRetains] = useState(true);
  const [weighs, setWeighs] = useState(false);
  const [communicates, setCommunicates] = useState(true);

  const evaluation = evaluateCapacityDomains({
    decisionContext: 'Odmowa cewnikowania i antybiotykoterapii w majaczeniu',
    understandsInformation: understands,
    retainsInformation: retains,
    weighsOrReasons: weighs,
    communicatesDecision: communicates,
  });

  return (
    <div className="capacity-quick-lab my-3 p-3.5 bg-slate-50 border border-slate-300 rounded-xl text-xs">
      <div className="flex items-center justify-between mb-2 flex-wrap gap-1">
        <span className="font-bold text-slate-900 flex items-center gap-1.5">
          <Scale size={15} className="text-indigo-700" /> Cztery domeny zdolności decyzyjnej (MCA 2005)
        </span>
        <EvidenceBadge claimKey="capacity-framework" label="MCA 2005 EBM" onClick={onOpenEvidence} />
      </div>

      <div className="grid grid-cols-2 gap-1.5 my-2">
        {[
          { label: '1. Zrozumienie informacji', val: understands, set: setUnderstands },
          { label: '2. Zapamiętanie na czas decyzji', val: retains, set: setRetains },
          { label: '3. Zważenie i ocena konsekwencji', val: weighs, set: setWeighs },
          { label: '4. Zakomunikowanie decyzji', val: communicates, set: setCommunicates },
        ].map((item, idx) => (
          <label
            key={idx}
            className={`flex items-center gap-1.5 p-1.5 rounded-lg border cursor-pointer ${
              item.val ? 'bg-emerald-50 border-emerald-200 text-emerald-900' : 'bg-rose-50 border-rose-200 text-rose-900'
            }`}
          >
            <input
              type="checkbox"
              checked={item.val}
              onChange={e => item.set(e.target.checked)}
              className="rounded"
            />
            <span className="font-semibold text-[11px]">{item.label}</span>
          </label>
        ))}
      </div>

      <div className="p-2 bg-white border rounded-lg text-[11px] my-1.5">
        <div className="font-bold text-slate-900">
          Status: {evaluation.isCapacityPreserved === true ? 'Zdolność decyzyjna zachowana' : 'Brak zdolności w tej konkretnej decyzji'}
        </div>
        <div className="text-slate-600 mt-0.5">{evaluation.interpretation}</div>
        <div className="text-slate-500 text-[10px] mt-1">{evaluation.safeguardingNote}</div>
      </div>

      <div className="mt-2 flex justify-end">
        {onOpenLab && (
          <button
            type="button"
            onClick={() => onOpenLab('capacity-refusal-jan')}
            className="inline-flex items-center gap-1 text-indigo-700 hover:text-indigo-900 font-bold underline text-[11px] cursor-pointer"
          >
            <span>Zbadaj odmowę leczenia Jana</span>
            <ArrowRight size={12} />
          </button>
        )}
      </div>
    </div>
  );
}

export function NeuroGeriatricQuickWidget({
  widgetId,
  onOpenLab,
  onOpenEvidence,
}: {
  widgetId: string;
  onOpenLab?: (presetId?: string) => void;
  onOpenEvidence?: () => void;
}) {
  const id = widgetId.toLowerCase();

  if (id.includes('4at')) {
    return <FourATQuickLab onOpenLab={onOpenLab} onOpenEvidence={onOpenEvidence} />;
  }
  if (id.includes('geriatric-med') || id.includes('acb') || id.includes('beers')) {
    return <GeriatricMedQuickLab onOpenLab={onOpenLab} onOpenEvidence={onOpenEvidence} />;
  }
  if (id.includes('bpsd')) {
    return <BpsdHuntQuickLab onOpenLab={onOpenLab} onOpenEvidence={onOpenEvidence} />;
  }
  if (id.includes('capacity')) {
    return <CapacityQuickLab onOpenLab={onOpenLab} onOpenEvidence={onOpenEvidence} />;
  }

  return (
    <div className="cause-hunt-quick-card my-3 p-3 bg-indigo-50/70 border border-indigo-200 rounded-xl text-xs flex items-center justify-between">
      <div className="flex items-center gap-2 text-slate-800">
        <Activity size={16} className="text-indigo-600" />
        <div>
          <span className="font-bold">Narzędzie kliniczne: {widgetId}</span>
          <p className="text-slate-600 text-[11px]">Interaktywny model analizy osiowej i różnicowania wtórnego.</p>
        </div>
      </div>
      {onOpenLab && (
        <button
          type="button"
          onClick={() => onOpenLab('delirium-jan-uti-4at')}
          className="px-2.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg text-xs cursor-pointer inline-flex items-center gap-1"
        >
          <span>Otwórz w pracowni</span>
          <ArrowRight size={12} />
        </button>
      )}
    </div>
  );
}
