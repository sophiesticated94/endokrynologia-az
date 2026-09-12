'use client';
import { useState, useEffect } from 'react';
import { Pill, Activity, AlertTriangle, CheckCircle, Info, Heart, ShieldAlert } from 'lucide-react';
import {
  calculateD2Occupancy,
  interpretMeasuredLithiumTdm,
  evaluateLithiumPkSensitivity,
  evaluateQtcRisk,
} from '@/lib/psychiatry-pharmacokinetics-engine';

export function PsychiatryReceptorLab({
  compact = false,
  initialDrug = 'risperidone',
  initialDose = 4,
}: {
  compact?: boolean;
  initialDrug?: 'haloperidol' | 'risperidone' | 'olanzapine' | 'aripiprazole' | 'quetiapine';
  initialDose?: number;
}) {
  const [selectedDrug, setSelectedDrug] = useState(initialDrug);
  const [dose, setDose] = useState(initialDose);
  const [showEvidence, setShowEvidence] = useState(false);

  const model = calculateD2Occupancy(selectedDrug, dose);

  return (
    <div className={`receptor-lab-widget ${compact ? 'compact' : ''}`} style={{
      background: '#fff', border: '1px solid #dce5df', borderRadius: '10px',
      padding: compact ? '14px' : '20px', margin: '20px 0', boxShadow: '0 2px 10px rgba(18, 50, 38, 0.05)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px', flexWrap: 'wrap', gap: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Pill size={18} color="var(--accent, #187765)" />
          <strong style={{ fontSize: '0.95rem', color: 'var(--text, #1c3540)' }}>
            D2 PET Evidence Explorer: Wiązanie z receptorami D2
          </strong>
        </div>
        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, padding: '3px 8px', borderRadius: '4px', background: '#eaf3ee', color: '#187765' }}>
            {model.pharmacologicClass === 'partial_agonist' ? 'CZĘŚCIOWY AGONISTA' : 'ANTAGONISTA D2'}
          </span>
          <button
            type="button"
            onClick={() => setShowEvidence(!showEvidence)}
            style={{ fontSize: '0.75rem', border: '1px solid #ccd8d1', background: '#fff', borderRadius: '4px', padding: '3px 8px', cursor: 'pointer' }}
          >
            {showEvidence ? 'Ukryj EBM' : 'Skąd te dane?'}
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: compact ? '1fr' : '1fr 1.2fr', gap: '16px', alignItems: 'center' }}>
        <div>
          <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted, #62757a)', marginBottom: '4px' }}>
            Wybierz lek przeciwpsychotyczny:
          </label>
          <select
            value={selectedDrug}
            onChange={e => {
              const val = e.target.value as typeof selectedDrug;
              setSelectedDrug(val);
              setDose(val === 'haloperidol' ? 3 : val === 'risperidone' ? 4 : val === 'olanzapine' ? 15 : val === 'aripiprazole' ? 15 : 400);
            }}
            style={{ width: '100%', padding: '6px 8px', borderRadius: '6px', border: '1px solid #ccd8d1', fontSize: '0.85rem' }}
          >
            <option value="risperidone">Risperidon (SGA · czysty antagonista · ED50 ~1.4 mg)</option>
            <option value="olanzapine">Olanzapina (SGA · czysty antagonista · ED50 ~7.2 mg)</option>
            <option value="aripiprazole">Aripiprazol (częściowy agonista ~30% · ED50 ~3.5 mg)</option>
            <option value="haloperidol">Haloperidol (FGA · czysty antagonista · ED50 ~1.6 mg)</option>
            <option value="quetiapine">Kwetiapina (szybka dysocjacja · ED50 ~180 mg)</option>
          </select>

          <div style={{ marginTop: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '4px' }}>
              <span>Dawka dobowa:</span>
              <strong>{dose} mg/d</strong>
            </div>
            <input
              type="range"
              min={selectedDrug === 'quetiapine' ? 50 : 0.5}
              max={selectedDrug === 'quetiapine' ? 800 : selectedDrug === 'olanzapine' ? 30 : selectedDrug === 'aripiprazole' ? 30 : 16}
              step={selectedDrug === 'quetiapine' ? 25 : 0.5}
              value={dose}
              onChange={e => setDose(parseFloat(e.target.value))}
              style={{ width: '100%', accentColor: 'var(--accent, #187765)' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: '#688275', marginTop: '4px' }}>
              <span>Aktywność wewnętrzna: <strong>{model.intrinsicActivityPercent}%</strong></span>
              <span>Tendencja prolaktynowa: <strong>{model.prolactinTendency}</strong></span>
            </div>
          </div>
        </div>

        <div style={{ background: '#f8faf9', padding: '12px', borderRadius: '8px', border: '1px solid #e2ece6' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '6px' }}>
            <span style={{ fontSize: '0.82rem', color: '#556b60' }}>Szacowane occupancy D2 w PET:</span>
            <strong style={{ fontSize: '1.3rem', color: model.heuristicZone === 'within_kapur_heuristic' ? '#187765' : model.heuristicZone === 'above_heuristic' ? '#c0392b' : '#31708f' }}>
              ~{model.d2OccupancyPercent}%
            </strong>
          </div>

          <div style={{ position: 'relative', height: '12px', background: '#e0eae4', borderRadius: '6px', overflow: 'hidden', marginBottom: '6px' }}>
            <div style={{ position: 'absolute', left: '65%', width: '15%', height: '100%', background: '#a2d6be', borderLeft: '1px solid #187765', borderRight: '1px solid #187765' }} title="Historyczna heurystyka Kapura 65–80% dla antagonistów" />
            <div style={{
              position: 'absolute', left: `${Math.min(98, model.d2OccupancyPercent)}%`, top: 0, bottom: 0, width: '4px',
              background: model.heuristicZone === 'within_kapur_heuristic' ? '#187765' : model.heuristicZone === 'above_heuristic' ? '#c0392b' : '#2980b9',
              transform: 'translateX(-50%)',
            }} />
          </div>

          <p style={{ margin: '0 0 4px', fontSize: '0.8rem', color: '#2b4438', lineHeight: 1.4 }}>
            {model.clinicalInterpretation}
          </p>
          <small style={{ fontSize: '0.7rem', color: '#688275', display: 'block', fontStyle: 'italic' }}>
            {model.limitationNote}
          </small>
        </div>
      </div>

      {showEvidence && (
        <div style={{ marginTop: '12px', padding: '10px', background: '#f0f5f3', borderRadius: '6px', fontSize: '0.75rem', color: '#334e42' }}>
          <strong>Źródło i ograniczenia PET:</strong> {model.evidenceSource}. Prążkowie, [11C]raklopryd. Okno 65–80% jest heurystyką historyczną dla antagonistów (nie prawem biologicznym; nie dotyczy częściowych agonistów).
        </div>
      )}
    </div>
  );
}

export function PsychiatryLithiumTdmLab({
  compact = false,
  initialConcentration = 0.72,
  initialHoursPostDose = 12,
  initialDaysOnDose = 7,
  initialEgfr = 85,
  initialDehydration = false,
  initialHasThiazide = false,
  initialHasNsaid = false,
  initialDecreasedConsciousness,
  initialSeizures,
  initialDangerousDysrhythmias,
  initialConfusion,
  initialProjectedHours,
}: {
  compact?: boolean;
  initialConcentration?: number;
  initialHoursPostDose?: number;
  initialDaysOnDose?: number;
  initialEgfr?: number;
  initialDehydration?: boolean;
  initialHasThiazide?: boolean;
  initialHasNsaid?: boolean;
  initialDecreasedConsciousness?: boolean;
  initialSeizures?: boolean;
  initialDangerousDysrhythmias?: boolean;
  initialConfusion?: boolean;
  initialProjectedHours?: number;
}) {
  const [mode, setMode] = useState<'measured' | 'pk_trend'>('measured');
  const [measuredConc, setMeasuredConc] = useState(initialConcentration);
  const [hoursPostDose, setHoursPostDose] = useState(initialHoursPostDose);
  const [daysOnDose, setDaysOnDose] = useState(initialDaysOnDose);
  const [hasThiazide, setHasThiazide] = useState(initialHasThiazide);
  const [hasNsaid, setHasNsaid] = useState(initialHasNsaid);
  const [dehydration, setDehydration] = useState(initialDehydration);
  const [eGfr, setEGfr] = useState(initialEgfr);
  const [volumeStatus, setVolumeStatus] = useState<'euvolemia' | 'mild_dehydration' | 'severe_dehydration'>('euvolemia');

  // EXTRIP clinical context
  const [decreasedConsciousness, setDecreasedConsciousness] = useState<boolean | undefined>(initialDecreasedConsciousness);
  const [seizures, setSeizures] = useState<boolean | undefined>(initialSeizures);
  const [dangerousDysrhythmias, setDangerousDysrhythmias] = useState<boolean | undefined>(initialDangerousDysrhythmias);
  const [confusion, setConfusion] = useState<boolean | undefined>(initialConfusion);
  const [projectedHours, setProjectedHours] = useState<number | undefined>(initialProjectedHours);

  const measuredInterp = interpretMeasuredLithiumTdm({
    measuredConcentrationMmolL: measuredConc,
    hoursSinceLastDose: hoursPostDose,
    daysOnCurrentRegimen: daysOnDose,
    indication: 'maintenance',
    eGfr,
    interactingMedications: [
      ...(hasThiazide ? ['thiazide' as const] : []),
      ...(hasNsaid ? ['nsaid' as const] : []),
    ],
    hydrationLoss: dehydration,
    decreasedConsciousness,
    seizures,
    dangerousDysrhythmias,
    significantConfusion: confusion,
    projectedHoursToLessThan1MmolL: projectedHours,
  });

  const pkTrend = evaluateLithiumPkSensitivity({
    eGfr,
    volumeStatus,
    interactingDrugs: [
      ...(hasThiazide ? ['thiazide' as const] : []),
      ...(hasNsaid ? ['nsaid' as const] : []),
    ],
  });

  const extrip = measuredInterp.extripGuidance;

  return (
    <div style={{
      background: '#fff', border: '1px solid #dce5df', borderRadius: '10px',
      padding: compact ? '14px' : '20px', margin: '20px 0', boxShadow: '0 2px 10px rgba(18, 50, 38, 0.05)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px', flexWrap: 'wrap', gap: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Activity size={18} color="#255b85" />
          <strong style={{ fontSize: '0.95rem', color: 'var(--text, #1c3540)' }}>
            Lithium TDM Lab &amp; Wytyczne EXTRIP 2015
          </strong>
        </div>
        <div style={{ display: 'flex', gap: '6px' }}>
          <button
            type="button"
            onClick={() => setMode('measured')}
            style={{
              padding: '3px 8px', fontSize: '0.75rem', borderRadius: '4px', border: '1px solid #255b85',
              background: mode === 'measured' ? '#255b85' : '#fff', color: mode === 'measured' ? '#fff' : '#255b85', cursor: 'pointer', fontWeight: 600,
            }}
          >
            Interpretacja próbki TDM
          </button>
          <button
            type="button"
            onClick={() => setMode('pk_trend')}
            style={{
              padding: '3px 8px', fontSize: '0.75rem', borderRadius: '4px', border: '1px solid #255b85',
              background: mode === 'pk_trend' ? '#255b85' : '#fff', color: mode === 'pk_trend' ? '#fff' : '#255b85', cursor: 'pointer', fontWeight: 600,
            }}
          >
            Model wrażliwości PK
          </button>
        </div>
      </div>

      {mode === 'measured' ? (
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: compact ? '1fr' : 'repeat(4, 1fr)', gap: '10px', marginBottom: '12px' }}>
            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted, #62757a)', display: 'block' }}>Stężenie litu:</label>
              <input type="number" step="0.05" min="0.1" max="6.0" value={measuredConc} onChange={e => setMeasuredConc(parseFloat(e.target.value) || 0.1)} style={{ width: '100%', padding: '4px 8px', borderRadius: '6px', border: '1px solid #ccd8d1' }} />
              <small style={{ fontSize: '0.68rem', color: '#7a8e83' }}>mmol/l (AGNP: 0,6–0,8)</small>
            </div>
            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted, #62757a)', display: 'block' }}>Czas od dawki:</label>
              <input type="number" min="2" max="48" value={hoursPostDose} onChange={e => setHoursPostDose(parseInt(e.target.value, 10) || 12)} style={{ width: '100%', padding: '4px 8px', borderRadius: '6px', border: '1px solid #ccd8d1' }} />
              <small style={{ fontSize: '0.68rem', color: '#7a8e83' }}>Standard: 12 h (±30 min)</small>
            </div>
            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted, #62757a)', display: 'block' }}>Dni na dawce:</label>
              <input type="number" min="1" max="60" value={daysOnDose} onChange={e => setDaysOnDose(parseInt(e.target.value, 10) || 7)} style={{ width: '100%', padding: '4px 8px', borderRadius: '6px', border: '1px solid #ccd8d1' }} />
              <small style={{ fontSize: '0.68rem', color: '#7a8e83' }}>Stan stacjonarny: ≥5 dni</small>
            </div>
            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted, #62757a)', display: 'block' }}>eGFR (ml/min):</label>
              <input type="number" min="10" max="130" value={eGfr} onChange={e => setEGfr(parseInt(e.target.value, 10) || 85)} style={{ width: '100%', padding: '4px 8px', borderRadius: '6px', border: '1px solid #ccd8d1' }} />
              <small style={{ fontSize: '0.68rem', color: '#7a8e83' }}>EXTRIP renal: &lt;45</small>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '10px', fontSize: '0.78rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><input type="checkbox" checked={hasThiazide} onChange={e => setHasThiazide(e.target.checked)} /> Tiazyd</label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><input type="checkbox" checked={hasNsaid} onChange={e => setHasNsaid(e.target.checked)} /> NLPZ</label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><input type="checkbox" checked={dehydration} onChange={e => setDehydration(e.target.checked)} /> Odwodnienie</label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><input type="checkbox" checked={Boolean(decreasedConsciousness)} onChange={e => setDecreasedConsciousness(e.target.checked)} /> Śpiączka/stupor</label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><input type="checkbox" checked={Boolean(seizures)} onChange={e => setSeizures(e.target.checked)} /> Drgawki</label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><input type="checkbox" checked={Boolean(dangerousDysrhythmias)} onChange={e => setDangerousDysrhythmias(e.target.checked)} /> Dysrytmie</label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><input type="checkbox" checked={Boolean(confusion)} onChange={e => setConfusion(e.target.checked)} /> Splątanie</label>
          </div>

          <div style={{
            background: measuredInterp.therapeuticZone === 'optimal' ? '#f0f7f3' : measuredInterp.therapeuticZone === 'subtherapeutic' ? '#f0f4f8' : '#fdf2f0',
            padding: '12px', borderRadius: '8px', border: `1px solid ${measuredInterp.therapeuticZone === 'optimal' ? '#c8e5d3' : measuredInterp.therapeuticZone === 'subtherapeutic' ? '#cbddec' : '#f5c6cb'}`,
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
              <strong style={{ fontSize: '0.88rem', color: '#1c3540' }}>{measuredInterp.therapeuticZoneLabel}</strong>
              <span style={{ fontSize: '1.2rem', fontWeight: 700, color: measuredInterp.therapeuticZone === 'optimal' ? '#187765' : '#c0392b' }}>
                {measuredInterp.measuredConcentration} mmol/l
              </span>
            </div>
            <p style={{ margin: '0 0 4px', fontSize: '0.8rem', color: '#324a3e' }}>{measuredInterp.sampleStatusRationale}</p>
            {extrip && (
              <div style={{ marginTop: '6px', padding: '6px 8px', borderRadius: '4px', background: extrip.recommendation === 'RECOMMENDED' ? '#f8d7da' : extrip.recommendation === 'SUGGESTED' ? '#fff3cd' : '#eaf2f8', fontSize: '0.78rem' }}>
                <strong>EXTRIP:</strong> {extrip.recommendationLabel}
                {extrip.missingCriticalInputs.length > 0 && (
                  <div style={{ color: '#856404', fontSize: '0.72rem' }}>Brak danych: {extrip.missingCriticalInputs.join(', ')}</div>
                )}
              </div>
            )}
          </div>
        </div>
      ) : (
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: compact ? '1fr' : '1fr 1fr', gap: '12px', marginBottom: '10px' }}>
            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted, #62757a)' }}>eGFR pacjenta: {eGfr} ml/min</label>
              <input type="range" min="15" max="120" step="5" value={eGfr} onChange={e => setEGfr(parseInt(e.target.value, 10))} style={{ width: '100%' }} />
            </div>
            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted, #62757a)' }}>Stan nawodnienia:</label>
              <select value={volumeStatus} onChange={e => setVolumeStatus(e.target.value as any)} style={{ width: '100%', padding: '4px 8px' }}>
                <option value="euvolemia">Ewolemia (prawidłowe)</option>
                <option value="mild_dehydration">Niewielkie odwodnienie</option>
                <option value="severe_dehydration">Ciężkie odwodnienie</option>
              </select>
            </div>
          </div>
          <div style={{ background: '#f8faf9', padding: '10px', borderRadius: '6px', border: '1px solid #ccd8d1', fontSize: '0.8rem' }}>
            <strong>Nacisk na ekspozycję:</strong> {pkTrend.trendDescription}
            <small style={{ color: '#882222', fontSize: '0.7rem', display: 'block', marginTop: '2px' }}>{pkTrend.disclaimer}</small>
          </div>
        </div>
      )}
    </div>
  );
}

export function PsychiatryQtcLab({
  compact = false,
  initialRawQt = 410,
  initialHr = 72,
  initialIsFemale = true,
  initialPotassium = 4.1,
  initialMagnesium,
  initialConcurrentQtDrugs = [],
}: {
  compact?: boolean;
  initialRawQt?: number;
  initialHr?: number;
  initialIsFemale?: boolean;
  initialPotassium?: number;
  initialMagnesium?: number;
  initialConcurrentQtDrugs?: string[];
}) {
  const [rawQt, setRawQt] = useState(initialRawQt);
  const [hr, setHr] = useState(initialHr);
  const [isFemale, setIsFemale] = useState(initialIsFemale);
  const [potassium, setPotassium] = useState<number | undefined>(initialPotassium);
  const [magnesium, setMagnesium] = useState<number | undefined>(initialMagnesium);

  useEffect(() => {
    if (initialPotassium !== undefined) {
      setPotassium(initialPotassium);
    }
  }, [initialPotassium]);

  const qtc = evaluateQtcRisk({
    rawQtMs: rawQt,
    heartRateBpm: hr,
    isFemale,
    potassiumMmolL: potassium,
    magnesiumMmolL: magnesium,
    concurrentQtDrugs: initialConcurrentQtDrugs,
  });

  return (
    <div style={{
      background: '#fff', border: '1px solid #dce5df', borderRadius: '10px',
      padding: compact ? '14px' : '20px', margin: '20px 0', boxShadow: '0 2px 10px rgba(18, 50, 38, 0.05)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px', flexWrap: 'wrap', gap: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Heart size={18} color="#c0392b" />
          <strong style={{ fontSize: '0.95rem', color: 'var(--text, #1c3540)' }}>
            Kalkulator QTcF i ryzyko arytmii (CredibleMeds)
          </strong>
        </div>
        <span style={{ fontSize: '0.75rem', fontWeight: 700, padding: '3px 8px', borderRadius: '4px', background: '#fdedec', color: '#c0392b' }}>
          Fridericia: QT / RR^(1/3)
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: compact ? '1fr' : 'repeat(3, 1fr)', gap: '10px', marginBottom: '12px' }}>
        <div>
          <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted, #62757a)', display: 'block' }}>QT (ms):</label>
          <input type="number" min="250" max="650" value={rawQt} onChange={e => setRawQt(parseInt(e.target.value, 10) || 400)} style={{ width: '100%', padding: '4px 8px', borderRadius: '6px', border: '1px solid #ccd8d1' }} />
        </div>
        <div>
          <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted, #62757a)', display: 'block' }}>HR (/min):</label>
          <input type="number" min="40" max="160" value={hr} onChange={e => setHr(parseInt(e.target.value, 10) || 70)} style={{ width: '100%', padding: '4px 8px', borderRadius: '6px', border: '1px solid #ccd8d1' }} />
        </div>
        <div>
          <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted, #62757a)', display: 'block' }}>K+ (mmol/l):</label>
          <input type="number" step="0.1" min="2.5" max="6.0" value={potassium || 4.0} onChange={e => setPotassium(parseFloat(e.target.value) || 4.0)} style={{ width: '100%', padding: '4px 8px', borderRadius: '6px', border: '1px solid #ccd8d1' }} />
        </div>
      </div>

      <div style={{
        background: qtc.riskCategory === 'normal' ? '#f0f7f3' : qtc.riskCategory === 'borderline' ? '#fffbf0' : '#fdf2f0',
        padding: '12px', borderRadius: '8px', border: `1px solid ${qtc.riskCategory === 'normal' ? '#c8e5d3' : qtc.riskCategory === 'borderline' ? '#fde8b3' : '#f5c6cb'}`,
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
          <strong style={{ fontSize: '0.88rem', color: '#1c3540' }}>QTcF: {qtc.calculatedQtcMs} ms</strong>
          <span style={{ fontSize: '0.75rem', fontWeight: 600, color: qtc.riskCategory === 'normal' ? '#187765' : '#c0392b' }}>
            ({qtc.riskCategory.toUpperCase()})
          </span>
        </div>
        <p style={{ margin: '0 0 4px', fontSize: '0.8rem', color: '#334e42' }}>{qtc.actionRecommendation}</p>
        {qtc.contributingFactors.length > 0 && (
          <small style={{ color: '#900', fontSize: '0.72rem', display: 'block' }}>
            Czynniki ryzyka: {qtc.contributingFactors.join('; ')}
          </small>
        )}
      </div>
    </div>
  );
}
