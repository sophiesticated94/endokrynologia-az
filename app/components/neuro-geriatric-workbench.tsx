'use client';
import { useState, useEffect } from 'react';
import {
  Clock,
  ShieldAlert,
  Pill,
  Search,
  CheckCircle2,
  AlertTriangle,
  Info,
  Sliders,
  Scale,
  Activity,
} from 'lucide-react';
import type { PatientProfile } from '@/lib/psychiatry-engine';
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

export function NeuroGeriatricWorkbench({
  patient,
  presetData,
}: {
  patient?: PatientProfile;
  presetData?: Record<string, unknown>;
}) {
  const [subtool, setSubtool] = useState<
    'delirium-detective' | 'med-review' | 'bpsd-hunt' | 'neuro-clock' | 'capacity'
  >(() => (presetData?.subtool as any) || 'delirium-detective');

  useEffect(() => {
    if (presetData?.subtool) {
      setSubtool(presetData.subtool as any);
    }
  }, [presetData]);

  // 1. Delirium Detective / 4AT State
  const [alertness, setAlertness] = useState<0 | 4>(
    () => ((presetData?.alertness as 0 | 4) ?? 4)
  );
  const [amt4, setAmt4] = useState<0 | 1 | 2>(
    () => ((presetData?.amt4 as 0 | 1 | 2) ?? 2)
  );
  const [attention, setAttention] = useState<0 | 1 | 2>(
    () => ((presetData?.attention as 0 | 1 | 2) ?? 2)
  );
  const [acuteChange, setAcuteChange] = useState<0 | 4>(
    () => ((presetData?.acuteChange as 0 | 4) ?? 4)
  );

  const fourAtResult = evaluate4AT({ alertness, amt4, attention, acuteChange });

  // Cause Hunt Checklist State
  const [causePain, setCausePain] = useState(true);
  const [causeInfection, setCauseInfection] = useState(false);
  const [causeRetention, setCauseRetention] = useState(true);
  const [causeOpioid, setCauseOpioid] = useState(true);
  const [causeHypoxia, setCauseHypoxia] = useState(false);
  const [causeElectrolytes, setCauseElectrolytes] = useState(false);

  // 2. Geriatric Medication Review State
  const [medList, setMedList] = useState<string[]>(() =>
    Array.isArray(presetData?.currentDrugs)
      ? (presetData.currentDrugs as string[])
      : ['Oksybutynina', 'Hydroksyzyna', 'Zolpidem', 'Tramadol', 'Sertralina', 'Ramipryl']
  );
  const [newDrugInput, setNewDrugInput] = useState('');

  const acbResult = evaluateAnticholinergicBurden(medList);
  const beersResult = evaluateBeersCriteria(patient?.age || 82, medList, ['otępienie']);

  const addDrug = () => {
    if (newDrugInput.trim() && !medList.includes(newDrugInput.trim())) {
      setMedList([...medList, newDrugInput.trim()]);
      setNewDrugInput('');
    }
  };

  const removeDrug = (drugName: string) => {
    setMedList(medList.filter(d => d !== drugName));
  };

  // 3. BPSD State
  const [bpsdPain, setBpsdPain] = useState(true);
  const [bpsdUti, setBpsdUti] = useState(true);
  const [bpsdRetention, setBpsdRetention] = useState(false);
  const [bpsdMedChange, setBpsdMedChange] = useState(true);
  const [bpsdEnvOverload, setBpsdEnvOverload] = useState(false);

  const bpsdResult = evaluateBpsdEtiology({
    behaviour: 'Agresja słowna i pobudzenie wieczorne',
    hasPainIndicators: bpsdPain,
    hasFeverOrInfectionSigns: bpsdUti,
    hasUrinaryRetentionOrConstipation: bpsdRetention,
    recentMedicationChange: bpsdMedChange,
    environmentalOverload: bpsdEnvOverload,
  });

  // 4. Neurocognitive Clock State
  const [clockTempo, setClockTempo] = useState<TempoCategory>(
    () => (presetData?.tempo as TempoCategory) || 'hours_days'
  );
  const clockResult = evaluateNeurocognitiveClock(clockTempo);

  // 5. Capacity State
  const [capUnderstand, setCapUnderstand] = useState<boolean | null>(false);
  const [capRetain, setCapRetain] = useState<boolean | null>(false);
  const [capWeigh, setCapWeigh] = useState<boolean | null>(false);
  const [capCommunicate, setCapCommunicate] = useState<boolean | null>(true);

  const capacityResult = evaluateCapacityDomains({
    decisionContext: 'Zgoda na hospitalizację i leczenie pooperacyjne',
    understandsInformation: capUnderstand,
    retainsInformation: capRetain,
    weighsOrReasons: capWeigh,
    communicatesDecision: capCommunicate,
  });

  return (
    <div className="neuro-geriatric-workbench" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Subtool selector tabs */}
      <div className="subtool-bar" style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        <button
          className={subtool === 'delirium-detective' ? 'active' : ''}
          onClick={() => setSubtool('delirium-detective')}
        >
          <Clock size={14} /> 1. Delirium Detective &amp; 4AT
        </button>
        <button
          className={subtool === 'med-review' ? 'active' : ''}
          onClick={() => setSubtool('med-review')}
        >
          <Pill size={14} /> 2. Geriatric Medication Review (ACB / Beers)
        </button>
        <button
          className={subtool === 'bpsd-hunt' ? 'active' : ''}
          onClick={() => setSubtool('bpsd-hunt')}
        >
          <ShieldAlert size={14} /> 3. BPSD Cause Hunt
        </button>
        <button
          className={subtool === 'neuro-clock' ? 'active' : ''}
          onClick={() => setSubtool('neuro-clock')}
        >
          <Activity size={14} /> 4. Neurocognitive Clock &amp; RPD
        </button>
        <button
          className={subtool === 'capacity' ? 'active' : ''}
          onClick={() => setSubtool('capacity')}
        >
          <Scale size={14} /> 5. Capacity &amp; Safeguarding
        </button>
      </div>

      {/* Subtool 1: Delirium Detective & 4AT */}
      {subtool === 'delirium-detective' && (
        <div className="panel" style={{ padding: '16px', background: 'var(--surface)', borderRadius: '10px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Clock size={18} color="var(--accent)" /> Delirium Detective: Narzędzie 4AT &amp; Cause Hunt
            </h3>
            <EvidenceBadge claimKey="4at-delirium-validity" label="Walidacja 4AT (Bellelli 2014)" />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginBottom: '16px' }}>
            {/* 4AT Sliders/Buttons */}
            <div style={{ padding: '12px', background: 'var(--bg-subtle)', borderRadius: '8px' }}>
              <h4 style={{ margin: '0 0 8px 0', fontSize: '0.85rem' }}>1. Czujność (Alertness):</h4>
              <div style={{ display: 'flex', gap: '6px' }}>
                <button className={alertness === 0 ? 'active' : ''} onClick={() => setAlertness(0)}>0: Prawidłowa (przytomny)</button>
                <button className={alertness === 4 ? 'active' : ''} onClick={() => setAlertness(4)}>4: Zmieniona (senność/pobudzenie)</button>
              </div>

              <h4 style={{ margin: '12px 0 8px 0', fontSize: '0.85rem' }}>2. Orientacja AMT4 (Wiek, data ur., miejsce, rok):</h4>
              <div style={{ display: 'flex', gap: '6px' }}>
                <button className={amt4 === 0 ? 'active' : ''} onClick={() => setAmt4(0)}>0: Bez błędu</button>
                <button className={amt4 === 1 ? 'active' : ''} onClick={() => setAmt4(1)}>1: 1 błąd</button>
                <button className={amt4 === 2 ? 'active' : ''} onClick={() => setAmt4(2)}>2: 2+ błędy / brak kontaktu</button>
              </div>

              <h4 style={{ margin: '12px 0 8px 0', fontSize: '0.85rem' }}>3. Uwaga (Miesiące od tyłu):</h4>
              <div style={{ display: 'flex', gap: '6px' }}>
                <button className={attention === 0 ? 'active' : ''} onClick={() => setAttention(0)}>0: 7+ miesięcy</button>
                <button className={attention === 1 ? 'active' : ''} onClick={() => setAttention(1)}>1: &lt;7 miesięcy</button>
                <button className={attention === 2 ? 'active' : ''} onClick={() => setAttention(2)}>2: Niezdolny / nie zaczyna</button>
              </div>

              <h4 style={{ margin: '12px 0 8px 0', fontSize: '0.85rem' }}>4. Ostry początek lub fluktuacja:</h4>
              <div style={{ display: 'flex', gap: '6px' }}>
                <button className={acuteChange === 0 ? 'active' : ''} onClick={() => setAcuteChange(0)}>0: Nie</button>
                <button className={acuteChange === 4 ? 'active' : ''} onClick={() => setAcuteChange(4)}>4: Tak (falowanie w dobie)</button>
              </div>
            </div>

            {/* Cause Hunt Checklist */}
            <div style={{ padding: '12px', background: 'var(--bg-subtle)', borderRadius: '8px' }}>
              <h4 style={{ margin: '0 0 8px 0', fontSize: '0.85rem' }}>Cause Hunt: Wykryte czynniki wyzwalające (PINCHES)</h4>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', marginBottom: '6px' }}>
                <input type="checkbox" checked={causePain} onChange={e => setCausePain(e.target.checked)} />
                Ból pooperacyjny / somatyczny (NRS &gt; 4)
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', marginBottom: '6px' }}>
                <input type="checkbox" checked={causeRetention} onChange={e => setCauseRetention(e.target.checked)} />
                Zatrzymanie moczu (pęcherz &gt; 400 ml) lub zaparcie
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', marginBottom: '6px' }}>
                <input type="checkbox" checked={causeOpioid} onChange={e => setCauseOpioid(e.target.checked)} />
                Nowy lek opioidowy / sedatywny (np. tramadol)
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', marginBottom: '6px' }}>
                <input type="checkbox" checked={causeInfection} onChange={e => setCauseInfection(e.target.checked)} />
                Cechy zakażenia (ZUM, zapalenie płuc)
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', marginBottom: '6px' }}>
                <input type="checkbox" checked={causeHypoxia} onChange={e => setCauseHypoxia(e.target.checked)} />
                Hipoksja (SpO2 &lt; 92%)
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', marginBottom: '6px' }}>
                <input type="checkbox" checked={causeElectrolytes} onChange={e => setCauseElectrolytes(e.target.checked)} />
                Zaburzenia elektrolitowe (hiponatremia, hipokaliemia)
              </label>
            </div>
          </div>

          <div style={{ padding: '12px', background: fourAtResult.category === 'possible_delirium' ? 'var(--warning-subtle)' : 'var(--surface)', border: '1px solid var(--border)', borderRadius: '8px' }}>
            <div style={{ fontWeight: 600, fontSize: '0.9rem', marginBottom: '4px' }}>{fourAtResult.summary}</div>
            <p style={{ margin: '0 0 8px 0', fontSize: '0.8rem', color: 'var(--text-muted)' }}>{fourAtResult.interpretation}</p>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              <strong>Ograniczenia metody:</strong> {fourAtResult.limitations.join(' ')}
            </div>
          </div>
        </div>
      )}

      {/* Subtool 2: Geriatric Medication Review (ACB / Beers) */}
      {subtool === 'med-review' && (
        <div className="panel" style={{ padding: '16px', background: 'var(--surface)', borderRadius: '10px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Pill size={18} color="var(--accent)" /> Geriatric Medication Review: ACB &amp; Beers 2023
            </h3>
            <div style={{ display: 'flex', gap: '6px' }}>
              <EvidenceBadge claimKey="acb-anticholinergic-model" label="ACB (Boustani 2008)" />
              <EvidenceBadge claimKey="beers-decision-support" label="AGS Beers 2023" />
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
            <input
              type="text"
              placeholder="Wpisz lek (np. hydroksyzyna, oksybutynina, zolpidem)..."
              value={newDrugInput}
              onChange={e => setNewDrugInput(e.target.value)}
              style={{ flex: 1, padding: '8px', borderRadius: '6px', border: '1px solid var(--border)' }}
            />
            <button onClick={addDrug}>Dodaj lek</button>
          </div>

          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '16px' }}>
            {medList.map(drug => (
              <span
                key={drug}
                className="badge"
                style={{ padding: '4px 8px', background: 'var(--bg-subtle)', borderRadius: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                {drug}
                <button
                  onClick={() => removeDrug(drug)}
                  style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 0, color: 'var(--danger)' }}
                >
                  &times;
                </button>
              </span>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
            {/* ACB Panel */}
            <div style={{ padding: '12px', background: 'var(--bg-subtle)', borderRadius: '8px' }}>
              <h4 style={{ margin: '0 0 8px 0', fontSize: '0.85rem' }}>
                Obciążenie Antycholinergiczne: <strong>{acbResult.totalScore} pkt</strong> ({acbResult.burdenCategory.toUpperCase()})
              </h4>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '8px' }}>{acbResult.recommendation}</p>
              {acbResult.contributingDrugs.length > 0 && (
                <div style={{ fontSize: '0.75rem', marginBottom: '8px' }}>
                  <strong>Leki kontrybuujące do ACB:</strong>
                  <ul style={{ margin: '4px 0', paddingLeft: '16px' }}>
                    {acbResult.contributingDrugs.map(c => (
                      <li key={c.drug}>{c.drug} (+{c.score} pkt) — {c.rationale}</li>
                    ))}
                  </ul>
                </div>
              )}
              {acbResult.affectedDomains.length > 0 && (
                <div style={{ fontSize: '0.75rem' }}>
                  <strong>Narażone domeny kliniczne:</strong>
                  <ul style={{ margin: '4px 0', paddingLeft: '16px' }}>
                    {acbResult.affectedDomains.map(d => (
                      <li key={d}>{d}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Beers Panel */}
            <div style={{ padding: '12px', background: 'var(--bg-subtle)', borderRadius: '8px' }}>
              <h4 style={{ margin: '0 0 8px 0', fontSize: '0.85rem' }}>Ostrzeżenia Beers 2023 (Decision-Support)</h4>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '8px' }}>{beersResult.summary}</p>
              {beersResult.flags.map(f => (
                <div key={f.drug} style={{ padding: '6px', background: 'var(--warning-subtle)', borderRadius: '4px', marginBottom: '6px', fontSize: '0.75rem' }}>
                  <strong>{f.drug}: {f.criterion}</strong>
                  <p style={{ margin: '2px 0' }}>{f.rationale}</p>
                  <small style={{ color: 'var(--text-muted)' }}>Wyjątki: {f.exceptions}</small>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Subtool 3: BPSD Cause Hunt */}
      {subtool === 'bpsd-hunt' && (
        <div className="panel" style={{ padding: '16px', background: 'var(--surface)', borderRadius: '10px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ShieldAlert size={18} color="var(--danger)" /> BPSD: Poszukiwanie Odwracalnych Przyczyn Pobudzenia
            </h3>
            <EvidenceBadge claimKey="evidence-antipsychotics-dementia-blackbox" label="Black Box Warning (FDA/EMA)" />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginBottom: '16px' }}>
            <div style={{ padding: '12px', background: 'var(--bg-subtle)', borderRadius: '8px' }}>
              <h4 style={{ margin: '0 0 8px 0', fontSize: '0.85rem' }}>Wywiad i badanie fizykalne:</h4>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', marginBottom: '6px' }}>
                <input type="checkbox" checked={bpsdPain} onChange={e => setBpsdPain(e.target.checked)} />
                Wskaźniki bólu (skala Doloplus/PAINAD, ból stawów, odleżyna)
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', marginBottom: '6px' }}>
                <input type="checkbox" checked={bpsdUti} onChange={e => setBpsdUti(e.target.checked)} />
                Zakażenie układu moczowego (bakteriuria, bolesność podbrzusza)
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', marginBottom: '6px' }}>
                <input type="checkbox" checked={bpsdRetention} onChange={e => setBpsdRetention(e.target.checked)} />
                Zatrzymanie moczu lub zaklinowanie stolca
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', marginBottom: '6px' }}>
                <input type="checkbox" checked={bpsdMedChange} onChange={e => setBpsdMedChange(e.target.checked)} />
                Niedawne włączenie leku antycholinergicznego lub sedatywnego
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', marginBottom: '6px' }}>
                <input type="checkbox" checked={bpsdEnvOverload} onChange={e => setBpsdEnvOverload(e.target.checked)} />
                Przebodźcowanie środowiskowe / zmiana personelu
              </label>
            </div>

            <div style={{ padding: '12px', background: 'var(--bg-subtle)', borderRadius: '8px' }}>
              <h4 style={{ margin: '0 0 8px 0', fontSize: '0.85rem' }}>Zidentyfikowane wyzwalacze somatyczne:</h4>
              <ul style={{ margin: '4px 0', paddingLeft: '16px', fontSize: '0.78rem' }}>
                {bpsdResult.identifiedTriggers.map(t => (
                  <li key={t} style={{ marginBottom: '4px' }}>{t}</li>
                ))}
              </ul>
              <div style={{ marginTop: '8px', fontSize: '0.78rem', color: 'var(--accent)' }}>
                <strong>Zalecane kroki:</strong> {bpsdResult.nextSteps.join(' ')}
              </div>
            </div>
          </div>

          <div style={{ padding: '12px', background: 'var(--danger-subtle)', border: '1px solid var(--danger)', borderRadius: '8px', fontSize: '0.8rem' }}>
            <div style={{ fontWeight: 600, color: 'var(--danger)', marginBottom: '4px' }}>Zasada bezpieczeństwa lekowego w BPSD:</div>
            {bpsdResult.antipsychoticWarning}
          </div>
        </div>
      )}

      {/* Subtool 4: Neurocognitive Clock */}
      {subtool === 'neuro-clock' && (
        <div className="panel" style={{ padding: '16px', background: 'var(--surface)', borderRadius: '10px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Activity size={18} color="var(--accent)" /> Zegar Neurokognitywny: Triaging Szybko Postępujących Zespołów
            </h3>
            <EvidenceBadge claimKey="evidence-rpd-autoimmune-redflags" label="RPD Red Flags (Lancet Neurol 2019)" />
          </div>

          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
            <button className={clockTempo === 'hours_days' ? 'active' : ''} onClick={() => setClockTempo('hours_days')}>1. Godziny – Dni (Ostre)</button>
            <button className={clockTempo === 'days_weeks' ? 'active' : ''} onClick={() => setClockTempo('days_weeks')}>2. Dni – Tygodnie (Podostre)</button>
            <button className={clockTempo === 'weeks_months' ? 'active' : ''} onClick={() => setClockTempo('weeks_months')}>3. Tygodnie – Miesiące (RPD)</button>
            <button className={clockTempo === 'months_years' ? 'active' : ''} onClick={() => setClockTempo('months_years')}>4. Miesiące – Lata (Przewlekłe)</button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
            <div style={{ padding: '12px', background: 'var(--bg-subtle)', borderRadius: '8px' }}>
              <h4 style={{ margin: '0 0 8px 0', fontSize: '0.85rem' }}>Główne grupy etiologiczne dla tempa: {clockResult.tempoLabel}</h4>
              <ul style={{ margin: '4px 0', paddingLeft: '16px', fontSize: '0.78rem' }}>
                {clockResult.primaryDifferentialBuckets.map(b => (
                  <li key={b} style={{ marginBottom: '4px' }}>{b}</li>
                ))}
              </ul>
            </div>

            <div style={{ padding: '12px', background: 'var(--bg-subtle)', borderRadius: '8px' }}>
              <h4 style={{ margin: '0 0 8px 0', fontSize: '0.85rem' }}>Priorytetowe badania różnicujące:</h4>
              <ul style={{ margin: '4px 0', paddingLeft: '16px', fontSize: '0.78rem' }}>
                {clockResult.priorityInvestigations.map(i => (
                  <li key={i} style={{ marginBottom: '4px' }}>{i}</li>
                ))}
              </ul>
              <div style={{ marginTop: '8px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                <strong>Czego nie wolno wnioskować:</strong> {clockResult.whatCannotBeInferred.join(' ')}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Subtool 5: Capacity & Safeguarding */}
      {subtool === 'capacity' && (
        <div className="panel" style={{ padding: '16px', background: 'var(--surface)', borderRadius: '10px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Scale size={18} color="var(--accent)" /> Ocena Zdolności Decyzyjnej (Mental Capacity Framework)
            </h3>
            <EvidenceBadge claimKey="evidence-capacity-framework" label="Mental Capacity Act 2005" />
          </div>

          <div style={{ padding: '12px', background: 'var(--bg-subtle)', borderRadius: '8px', marginBottom: '16px' }}>
            <h4 style={{ margin: '0 0 8px 0', fontSize: '0.85rem' }}>Kontekst decyzji: Zgoda na proponowane postępowanie medyczne</h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '12px', fontSize: '0.8rem' }}>
              <div>
                <strong>1. Understanding (Zrozumienie):</strong>
                <div style={{ display: 'flex', gap: '6px', marginTop: '4px' }}>
                  <button className={capUnderstand === true ? 'active' : ''} onClick={() => setCapUnderstand(true)}>Zachowane</button>
                  <button className={capUnderstand === false ? 'active' : ''} onClick={() => setCapUnderstand(false)}>Zaburzone</button>
                </div>
              </div>

              <div>
                <strong>2. Retention (Zatrzymanie):</strong>
                <div style={{ display: 'flex', gap: '6px', marginTop: '4px' }}>
                  <button className={capRetain === true ? 'active' : ''} onClick={() => setCapRetain(true)}>Zachowane</button>
                  <button className={capRetain === false ? 'active' : ''} onClick={() => setCapRetain(false)}>Zaburzone</button>
                </div>
              </div>

              <div>
                <strong>3. Weighing (Wyważenie):</strong>
                <div style={{ display: 'flex', gap: '6px', marginTop: '4px' }}>
                  <button className={capWeigh === true ? 'active' : ''} onClick={() => setCapWeigh(true)}>Zachowane</button>
                  <button className={capWeigh === false ? 'active' : ''} onClick={() => setCapWeigh(false)}>Zaburzone</button>
                </div>
              </div>

              <div>
                <strong>4. Communicating (Zakomunikowanie):</strong>
                <div style={{ display: 'flex', gap: '6px', marginTop: '4px' }}>
                  <button className={capCommunicate === true ? 'active' : ''} onClick={() => setCapCommunicate(true)}>Zachowane</button>
                  <button className={capCommunicate === false ? 'active' : ''} onClick={() => setCapCommunicate(false)}>Zaburzone</button>
                </div>
              </div>
            </div>
          </div>

          <div style={{ padding: '12px', background: capacityResult.isCapacityPreserved === true ? 'var(--accent-subtle)' : 'var(--warning-subtle)', borderRadius: '8px', border: '1px solid var(--border)', fontSize: '0.8rem' }}>
            <div style={{ fontWeight: 600, marginBottom: '4px' }}>Status zdolności decyzyjnej:</div>
            <p style={{ margin: '0 0 6px 0' }}>{capacityResult.interpretation}</p>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              <strong>Zasada etyczna:</strong> {capacityResult.safeguardingNote}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
