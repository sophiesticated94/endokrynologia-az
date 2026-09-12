'use client';
import { useState } from 'react';
import { Pill, Activity, AlertTriangle, CheckCircle, Info, Heart, ShieldAlert } from 'lucide-react';
import {
  calculateD2Occupancy,
  interpretMeasuredLithiumTdm,
  evaluateLithiumPkSensitivity,
  evaluateQtcRisk,
} from '@/lib/psychiatry-pharmacokinetics-engine';

export function PsychiatryReceptorLab({ compact = false }: { compact?: boolean }) {
  const [selectedDrug, setSelectedDrug] = useState<'haloperidol' | 'risperidone' | 'olanzapine' | 'aripiprazole' | 'quetiapine'>('risperidone');
  const [dose, setDose] = useState(4);
  const [showEvidence, setShowEvidence] = useState(false);

  const model = calculateD2Occupancy(selectedDrug, dose);

  return (
    <div className={`receptor-lab-widget ${compact ? 'compact' : ''}`} style={{
      background: '#ffffff',
      border: '1px solid #dce5df',
      borderRadius: '10px',
      padding: compact ? '16px' : '22px',
      margin: '24px 0',
      boxShadow: '0 2px 10px rgba(18, 50, 38, 0.05)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px', flexWrap: 'wrap', gap: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Pill size={18} color="var(--accent, #187765)" />
          <strong style={{ fontSize: '1rem', color: 'var(--text, #1c3540)' }}>
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
          <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted, #62757a)', marginBottom: '6px' }}>
            Wybierz lek przeciwpsychotyczny:
          </label>
          <select
            value={selectedDrug}
            onChange={e => {
              const val = e.target.value as typeof selectedDrug;
              setSelectedDrug(val);
              if (val === 'haloperidol') setDose(3);
              else if (val === 'risperidone') setDose(4);
              else if (val === 'olanzapine') setDose(15);
              else if (val === 'aripiprazole') setDose(15);
              else if (val === 'quetiapine') setDose(400);
            }}
            style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #ccd8d1', fontSize: '0.9rem' }}
          >
            <option value="risperidone">Risperidon (SGA · czysty antagonista · ED50 ~1.4 mg)</option>
            <option value="olanzapine">Olanzapina (SGA · czysty antagonista · ED50 ~7.2 mg)</option>
            <option value="aripiprazole">Aripiprazol (częściowy agonista ~30% · ED50 ~3.5 mg)</option>
            <option value="haloperidol">Haloperidol (FGA · czysty antagonista · ED50 ~1.6 mg)</option>
            <option value="quetiapine">Kwetiapina (szybka dysocjacja · ED50 ~180 mg)</option>
          </select>

          <div style={{ marginTop: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '4px' }}>
              <span>Dobowa dawka doustna:</span>
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

        <div style={{ background: '#f8faf9', padding: '14px', borderRadius: '8px', border: '1px solid #e2ece6' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.85rem', color: '#556b60' }}>Szacowane occupancy D2 w PET:</span>
            <strong style={{ fontSize: '1.4rem', color: model.heuristicZone === 'within_kapur_heuristic' ? '#187765' : model.heuristicZone === 'above_heuristic' ? '#c0392b' : '#31708f' }}>
              ~{model.d2OccupancyPercent}%
            </strong>
          </div>

          <div style={{ position: 'relative', height: '14px', background: '#e0eae4', borderRadius: '7px', overflow: 'hidden', marginBottom: '8px' }}>
            <div style={{ position: 'absolute', left: '65%', width: '15%', height: '100%', background: '#a2d6be', borderLeft: '1px solid #187765', borderRight: '1px solid #187765' }} title="Historyczna heurystyka Kapura 65–80% dla antagonistów" />
            <div style={{
              position: 'absolute',
              left: `${Math.min(98, model.d2OccupancyPercent)}%`,
              top: 0,
              bottom: 0,
              width: '4px',
              background: model.heuristicZone === 'within_kapur_heuristic' ? '#187765' : model.heuristicZone === 'above_heuristic' ? '#c0392b' : '#2980b9',
              transform: 'translateX(-50%)',
            }} />
          </div>

          <p style={{ margin: '0 0 6px', fontSize: '0.82rem', color: '#2b4438', lineHeight: 1.5 }}>
            {model.clinicalInterpretation}
          </p>
          <small style={{ fontSize: '0.72rem', color: '#688275', display: 'block', fontStyle: 'italic' }}>
            {model.limitationNote}
          </small>
        </div>
      </div>

      {showEvidence && (
        <div style={{ marginTop: '14px', padding: '12px', background: '#f0f5f3', borderRadius: '6px', fontSize: '0.78rem', color: '#334e42' }}>
          <strong>Źródło i ograniczenia badania PET:</strong> {model.evidenceSource}.
          <br />
          Zajęcie receptorów D2 wyznaczane jest w prążkowiu przy użyciu liganda [11C]raklopryd. Okno 65–80% jest regułą historyczną dla czystych antagonistów; nie stanowi uniwersalnego biologicznego wyznacznika dla wszystkich leków i pacjentów.
        </div>
      )}
    </div>
  );
}

export function PsychiatryLithiumTdmLab({ compact = false }: { compact?: boolean }) {
  const [mode, setMode] = useState<'measured' | 'pk_trend'>('measured');
  
  // Measured TDM state
  const [measuredConc, setMeasuredConc] = useState(0.72);
  const [hoursPostDose, setHoursPostDose] = useState(12);
  const [daysOnDose, setDaysOnDose] = useState(7);
  const [indication, setIndication] = useState<'maintenance' | 'acute_mania'>('maintenance');
  const [hasThiazide, setHasThiazide] = useState(false);
  const [hasNsaid, setHasNsaid] = useState(false);
  const [dehydration, setDehydration] = useState(false);

  // PK trend state
  const [eGfr, setEGfr] = useState(90);
  const [volumeStatus, setVolumeStatus] = useState<'euvolemia' | 'mild_dehydration' | 'severe_dehydration'>('euvolemia');

  const measuredInterp = interpretMeasuredLithiumTdm({
    measuredConcentrationMmolL: measuredConc,
    hoursSinceLastDose: hoursPostDose,
    daysOnCurrentRegimen: daysOnDose,
    indication,
    interactingMedications: [
      ...(hasThiazide ? ['thiazide' as const] : []),
      ...(hasNsaid ? ['nsaid' as const] : []),
    ],
    hydrationLoss: dehydration,
  });

  const pkTrend = evaluateLithiumPkSensitivity({
    eGfr,
    volumeStatus,
    interactingDrugs: [
      ...(hasThiazide ? ['thiazide' as const] : []),
      ...(hasNsaid ? ['nsaid' as const] : []),
    ],
  });

  return (
    <div style={{
      background: '#ffffff',
      border: '1px solid #dce5df',
      borderRadius: '10px',
      padding: compact ? '16px' : '22px',
      margin: '24px 0',
      boxShadow: '0 2px 10px rgba(18, 50, 38, 0.05)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px', flexWrap: 'wrap', gap: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Activity size={18} color="#255b85" />
          <strong style={{ fontSize: '1rem', color: 'var(--text, #1c3540)' }}>
            Lithium TDM Lab (AGNP 2026 Consensus)
          </strong>
        </div>
        <div style={{ display: 'flex', gap: '6px' }}>
          <button
            type="button"
            onClick={() => setMode('measured')}
            style={{
              padding: '4px 10px',
              fontSize: '0.78rem',
              borderRadius: '4px',
              border: '1px solid #255b85',
              background: mode === 'measured' ? '#255b85' : '#fff',
              color: mode === 'measured' ? '#fff' : '#255b85',
              cursor: 'pointer',
              fontWeight: 600,
            }}
          >
            Interpretacja próbki TDM
          </button>
          <button
            type="button"
            onClick={() => setMode('pk_trend')}
            style={{
              padding: '4px 10px',
              fontSize: '0.78rem',
              borderRadius: '4px',
              border: '1px solid #255b85',
              background: mode === 'pk_trend' ? '#255b85' : '#fff',
              color: mode === 'pk_trend' ? '#fff' : '#255b85',
              cursor: 'pointer',
              fontWeight: 600,
            }}
          >
            Model wrażliwości PK
          </button>
        </div>
      </div>

      {mode === 'measured' ? (
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: compact ? '1fr' : 'repeat(3, 1fr)', gap: '12px', marginBottom: '14px' }}>
            <div>
              <label style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-muted, #62757a)', display: 'block', marginBottom: '4px' }}>
                Zmierzone stężenie litu:
              </label>
              <input
                type="number"
                step="0.05"
                min="0.1"
                max="3.5"
                value={measuredConc}
                onChange={e => setMeasuredConc(parseFloat(e.target.value) || 0.1)}
                style={{ width: '100%', padding: '6px 10px', borderRadius: '6px', border: '1px solid #ccd8d1' }}
              />
              <small style={{ fontSize: '0.7rem', color: '#7a8e83' }}>mmol/l w surowicy</small>
            </div>

            <div>
              <label style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-muted, #62757a)', display: 'block', marginBottom: '4px' }}>
                Czas od dawki (godziny):
              </label>
              <input
                type="number"
                min="2"
                max="36"
                value={hoursPostDose}
                onChange={e => setHoursPostDose(parseInt(e.target.value, 10) || 12)}
                style={{ width: '100%', padding: '6px 10px', borderRadius: '6px', border: '1px solid #ccd8d1' }}
              />
              <small style={{ fontSize: '0.7rem', color: '#7a8e83' }}>Złoty standard: 12 h (±30 min)</small>
            </div>

            <div>
              <label style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-muted, #62757a)', display: 'block', marginBottom: '4px' }}>
                Dni na stałej dawce:
              </label>
              <input
                type="number"
                min="1"
                max="60"
                value={daysOnDose}
                onChange={e => setDaysOnDose(parseInt(e.target.value, 10) || 7)}
                style={{ width: '100%', padding: '6px 10px', borderRadius: '6px', border: '1px solid #ccd8d1' }}
              />
              <small style={{ fontSize: '0.7rem', color: '#7a8e83' }}>Stan stacjonarny: min. 5 dni</small>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '14px', fontSize: '0.8rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <input type="checkbox" checked={hasThiazide} onChange={e => setHasThiazide(e.target.checked)} />
              Tiazyd (HCTZ / indapamid)
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <input type="checkbox" checked={hasNsaid} onChange={e => setHasNsaid(e.target.checked)} />
              NLPZ (ibuprofen / ketoprofen)
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <input type="checkbox" checked={dehydration} onChange={e => setDehydration(e.target.checked)} />
              Odwodnienie / wymioty / gorączka
            </label>
          </div>

          <div style={{
            background: measuredInterp.therapeuticZone === 'optimal' ? '#f0f7f3' : measuredInterp.therapeuticZone === 'subtherapeutic' ? '#f0f4f8' : '#fdf2f0',
            padding: '14px',
            borderRadius: '8px',
            border: `1px solid ${measuredInterp.therapeuticZone === 'optimal' ? '#c8e5d3' : measuredInterp.therapeuticZone === 'subtherapeutic' ? '#cbddec' : '#f5c6cb'}`,
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <strong style={{ fontSize: '0.92rem', color: '#1c3540' }}>{measuredInterp.therapeuticZoneLabel}</strong>
              <span style={{ fontSize: '1.25rem', fontWeight: 700, color: measuredInterp.therapeuticZone === 'optimal' ? '#187765' : '#c0392b' }}>
                {measuredInterp.measuredConcentration} mmol/l
              </span>
            </div>

            <p style={{ margin: '0 0 6px', fontSize: '0.82rem', color: '#324a3e', lineHeight: 1.5 }}>
              <strong>Status próbki:</strong> {measuredInterp.sampleStatusRationale}
            </p>

            {measuredInterp.clinicalObservations.length > 0 && (
              <ul style={{ margin: '6px 0', paddingLeft: '18px', fontSize: '0.78rem', color: '#4d3b38' }}>
                {measuredInterp.clinicalObservations.map((obs, idx) => (
                  <li key={idx}>{obs}</li>
                ))}
              </ul>
            )}

            {measuredInterp.safetyAlert && (
              <div style={{ marginTop: '8px', padding: '8px', background: '#fadbd8', borderRadius: '4px', fontSize: '0.78rem', color: '#922b21', fontWeight: 600 }}>
                {measuredInterp.safetyAlert}
              </div>
            )}
          </div>
        </div>
      ) : (
        <div>
          <p style={{ fontSize: '0.82rem', color: '#556b60', marginBottom: '12px' }}>
            Edukacyjny model ilustrujący kierunek zmiany ekspozycji litu w odpowiedzi na czynniki hemodynamiczne i nefrologiczne (nie służy do predykcji stężenia).
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: compact ? '1fr' : '1fr 1fr', gap: '14px', marginBottom: '12px' }}>
            <div>
              <label style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-muted, #62757a)', display: 'block', marginBottom: '4px' }}>
                eGFR pacjenta: {eGfr} ml/min
              </label>
              <input type="range" min="15" max="120" step="5" value={eGfr} onChange={e => setEGfr(parseInt(e.target.value, 10))} style={{ width: '100%' }} />
            </div>
            <div>
              <label style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-muted, #62757a)', display: 'block', marginBottom: '4px' }}>
                Stan nawodnienia:
              </label>
              <select value={volumeStatus} onChange={e => setVolumeStatus(e.target.value as any)} style={{ width: '100%', padding: '6px' }}>
                <option value="euvolemia">Prawidłowe nawodnienie (Ewolemia)</option>
                <option value="mild_dehydration">Niewielkie odwodnienie</option>
                <option value="severe_dehydration">Ciężkie odwodnienie / gorączka / biegunka</option>
              </select>
            </div>
          </div>
          <div style={{ background: '#f8faf9', padding: '12px', borderRadius: '6px', border: '1px solid #ccd8d1' }}>
            <strong>Kierunek ekspozycji:</strong> {pkTrend.trendDescription}
            <br />
            <small style={{ color: '#882222', fontSize: '0.72rem', fontWeight: 600, marginTop: '4px', display: 'block' }}>
              {pkTrend.disclaimer}
            </small>
          </div>
        </div>
      )}
    </div>
  );
}

export function PsychiatryQtcLab({ compact = false }: { compact?: boolean }) {
  const [rawQt, setRawQt] = useState(410);
  const [hr, setHr] = useState(72);
  const [isFemale, setIsFemale] = useState(true);
  const [potassium, setPotassium] = useState<number | undefined>(4.1);

  const qtc = evaluateQtcRisk({
    rawQtMs: rawQt,
    heartRateBpm: hr,
    isFemale,
    potassiumMmolL: potassium,
  });

  return (
    <div style={{
      background: '#ffffff',
      border: '1px solid #dce5df',
      borderRadius: '10px',
      padding: compact ? '16px' : '22px',
      margin: '24px 0',
      boxShadow: '0 2px 10px rgba(18, 50, 38, 0.05)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px', flexWrap: 'wrap', gap: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Heart size={18} color="#c0392b" />
          <strong style={{ fontSize: '1rem', color: 'var(--text, #1c3540)' }}>
            Kalkulator QTcF i ocena kontekstu kardiometabolicznego
          </strong>
        </div>
        <span style={{ fontSize: '0.75rem', fontWeight: 700, padding: '3px 8px', borderRadius: '4px', background: '#fdedec', color: '#c0392b' }}>
          Fridericia: QT / RR^(1/3)
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: compact ? '1fr' : 'repeat(3, 1fr)', gap: '14px', marginBottom: '14px' }}>
        <div>
          <label style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-muted, #62757a)', display: 'block', marginBottom: '4px' }}>
            Zmierzony surowy odstęp QT (ms):
          </label>
          <input
            type="number"
            min="250"
            max="650"
            value={rawQt}
            onChange={e => setRawQt(parseInt(e.target.value, 10) || 400)}
            style={{ width: '100%', padding: '6px 10px', borderRadius: '6px', border: '1px solid #ccd8d1' }}
          />
        </div>

        <div>
          <label style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-muted, #62757a)', display: 'block', marginBottom: '4px' }}>
            Częstość rytmu serca (HR/min):
          </label>
          <input
            type="number"
            min="40"
            max="160"
            value={hr}
            onChange={e => setHr(parseInt(e.target.value, 10) || 70)}
            style={{ width: '100%', padding: '6px 10px', borderRadius: '6px', border: '1px solid #ccd8d1' }}
          />
        </div>

        <div>
          <label style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-muted, #62757a)', display: 'block', marginBottom: '4px' }}>
            Stężenie potasu K+ (mmol/l):
          </label>
          <input
            type="number"
            step="0.1"
            min="2.5"
            max="6.0"
            value={potassium || 4.0}
            onChange={e => setPotassium(parseFloat(e.target.value) || 4.0)}
            style={{ width: '100%', padding: '6px 10px', borderRadius: '6px', border: '1px solid #ccd8d1' }}
          />
        </div>
      </div>

      <div style={{
        background: qtc.riskCategory === 'normal' ? '#f0f7f3' : qtc.riskCategory === 'borderline' ? '#fffbf0' : '#fdf2f0',
        padding: '14px',
        borderRadius: '8px',
        border: `1px solid ${qtc.riskCategory === 'normal' ? '#c8e5d3' : qtc.riskCategory === 'borderline' ? '#fde8b3' : '#f5c6cb'}`,
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
          <div>
            <strong style={{ fontSize: '0.9rem', color: '#1c3540' }}>
              Skorygowany QTcF: {qtc.calculatedQtcMs} ms
            </strong>
            <span style={{ marginLeft: '10px', fontSize: '0.75rem', fontWeight: 600, color: qtc.riskCategory === 'normal' ? '#187765' : '#c0392b' }}>
              ({qtc.riskCategory.toUpperCase()})
            </span>
          </div>
        </div>
        <p style={{ margin: '0 0 6px', fontSize: '0.82rem', color: '#334e42', lineHeight: 1.5 }}>
          {qtc.actionRecommendation}
        </p>
        {qtc.riskFactorsIdentified.length > 0 && (
          <small style={{ color: '#900', fontSize: '0.75rem', display: 'block' }}>
            Czynniki ryzyka: {qtc.riskFactorsIdentified.join('; ')}
          </small>
        )}
      </div>
    </div>
  );
}
