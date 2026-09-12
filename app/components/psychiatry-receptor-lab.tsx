'use client';
import { useState } from 'react';
import { Pill, Activity, AlertTriangle, CheckCircle, Info } from 'lucide-react';
import { calculateD2Occupancy, calculateLithiumLevel, evaluateQtcRisk } from '@/lib/psychiatry-pharmacokinetics-engine';

export function PsychiatryReceptorLab({ compact = false }: { compact?: boolean }) {
  const [selectedDrug, setSelectedDrug] = useState<'haloperidol' | 'risperidone' | 'olanzapine' | 'aripiprazole' | 'quetiapine'>('risperidone');
  const [dose, setDose] = useState(4);

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
            Receptor Lab: Saturacja prążkowiowych receptorów D2 (PET)
          </strong>
        </div>
        <span style={{ fontSize: '0.75rem', fontWeight: 700, padding: '3px 8px', borderRadius: '4px', background: '#eaf3ee', color: '#187765' }}>
          OKNO KAPURA 65–80%
        </span>
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
            <option value="risperidone">Risperidon (SGA · ED50 ~1.4 mg)</option>
            <option value="olanzapine">Olanzapina (SGA · ED50 ~7.2 mg)</option>
            <option value="aripiprazole">Aripiprazol (częściowy agonista · ED50 ~3.5 mg)</option>
            <option value="haloperidol">Haloperidol (FGA · ED50 ~1.6 mg)</option>
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
          </div>
        </div>

        <div style={{ background: '#f8faf9', padding: '14px', borderRadius: '8px', border: '1px solid #e2ece6' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.85rem', color: '#556b60' }}>Zajęcie receptorów D2 w PET:</span>
            <strong style={{ fontSize: '1.4rem', color: model.therapeuticZone === 'optimal' ? '#187765' : model.therapeuticZone === 'high_eps_risk' ? '#c0392b' : '#31708f' }}>
              {model.d2OccupancyPercent}%
            </strong>
          </div>

          {/* Wizualizacja paska occupancy */}
          <div style={{ position: 'relative', height: '14px', background: '#e0eae4', borderRadius: '7px', overflow: 'hidden', marginBottom: '8px' }}>
            {/* Strefa optymalna 65-80% */}
            <div style={{ position: 'absolute', left: '65%', width: '15%', height: '100%', background: '#a2d6be', borderLeft: '1px solid #187765', borderRight: '1px solid #187765' }} />
            {/* Wskaźnik */}
            <div style={{
              position: 'absolute',
              left: `${Math.min(98, model.d2OccupancyPercent)}%`,
              top: 0,
              bottom: 0,
              width: '4px',
              background: model.therapeuticZone === 'optimal' ? '#187765' : model.therapeuticZone === 'high_eps_risk' ? '#c0392b' : '#2980b9',
              transform: 'translateX(-50%)',
            }} />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.68rem', color: '#7a8e83', marginBottom: '10px' }}>
            <span>0%</span>
            <span style={{ color: '#187765', fontWeight: 700 }}>65% (Próg skuteczności)</span>
            <span style={{ color: '#c0392b', fontWeight: 700 }}>80% (Próg EPS)</span>
            <span>100%</span>
          </div>

          <p style={{ margin: 0, fontSize: '0.78rem', lineHeight: 1.5, color: '#334d40' }}>
            {model.clinicalNote}
          </p>
        </div>
      </div>
    </div>
  );
}

export function PsychiatryLithiumTdmLab({ compact = false }: { compact?: boolean }) {
  const [doseMg, setDoseMg] = useState(750);
  const [weightKg, setWeightKg] = useState(70);
  const [eGfr, setEGfr] = useState(90);

  const res = calculateLithiumLevel(doseMg, weightKg, eGfr, 40);

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
          <Activity size={18} color="#255b85" />
          <strong style={{ fontSize: '1rem', color: 'var(--text, #1c3540)' }}>
            Kalkulator TDM Litu: Prognoza stężenia w stanie stacjonarnym (Css 12h)
          </strong>
        </div>
        <span style={{ fontSize: '0.75rem', fontWeight: 700, padding: '3px 8px', borderRadius: '4px', background: '#eaf1f7', color: '#255b85' }}>
          AGNP 2026: 0,6–0,8 mmol/l
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: compact ? '1fr' : 'repeat(3, 1fr)', gap: '14px', marginBottom: '14px' }}>
        <div>
          <label style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-muted, #62757a)', display: 'block', marginBottom: '4px' }}>
            Dawka dobowa węglanu litu:
          </label>
          <input
            type="number"
            step="250"
            min="250"
            max="2000"
            value={doseMg}
            onChange={e => setDoseMg(parseInt(e.target.value, 10) || 250)}
            style={{ width: '100%', padding: '6px 10px', borderRadius: '6px', border: '1px solid #ccd8d1' }}
          />
          <small style={{ fontSize: '0.7rem', color: '#7a8e83' }}>{res.dailyDoseMmol} mmol Li+/dobę</small>
        </div>

        <div>
          <label style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-muted, #62757a)', display: 'block', marginBottom: '4px' }}>
            Masa ciała (kg):
          </label>
          <input
            type="number"
            min="40"
            max="140"
            value={weightKg}
            onChange={e => setWeightKg(parseInt(e.target.value, 10) || 70)}
            style={{ width: '100%', padding: '6px 10px', borderRadius: '6px', border: '1px solid #ccd8d1' }}
          />
        </div>

        <div>
          <label style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-muted, #62757a)', display: 'block', marginBottom: '4px' }}>
            Współczynnik eGFR (ml/min):
          </label>
          <input
            type="number"
            min="20"
            max="140"
            value={eGfr}
            onChange={e => setEGfr(parseInt(e.target.value, 10) || 90)}
            style={{ width: '100%', padding: '6px 10px', borderRadius: '6px', border: '1px solid #ccd8d1' }}
          />
        </div>
      </div>

      <div style={{
        background: res.status === 'optimal_maintenance' ? '#f0f7f3' : res.status === 'acute_mania' ? '#f7faf0' : res.status === 'subtherapeutic' ? '#f0f4f8' : '#fdf2f0',
        padding: '14px',
        borderRadius: '8px',
        border: `1px solid ${res.status === 'optimal_maintenance' ? '#c8e5d3' : res.status === 'acute_mania' ? '#d8e5b8' : res.status === 'subtherapeutic' ? '#cbddec' : '#f5c6cb'}`,
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
          <strong style={{ fontSize: '0.9rem', color: '#1c3540' }}>{res.statusLabel}</strong>
          <span style={{ fontSize: '1.2rem', fontWeight: 700, color: res.status === 'optimal_maintenance' ? '#187765' : res.status === 'toxic' || res.status === 'critical' ? '#c0392b' : '#2980b9' }}>
            {res.steadyStateTroughMmolL} mmol/l
          </span>
        </div>
        <p style={{ margin: 0, fontSize: '0.8rem', lineHeight: 1.5, color: '#445b50' }}>
          {res.recommendation}
        </p>
      </div>
    </div>
  );
}

export function PsychiatryQtcLab({ compact = false }: { compact?: boolean }) {
  const [rawQt, setRawQt] = useState(410);
  const [hr, setHr] = useState(72);
  const [isFemale, setIsFemale] = useState(true);

  const qtc = evaluateQtcRisk(rawQt, hr, isFemale);

  return (
    <div style={{
      background: '#ffffff',
      border: '1px solid #dce5df',
      borderRadius: '10px',
      padding: compact ? '16px' : '22px',
      margin: '24px 0',
      boxShadow: '0 2px 10px rgba(18, 50, 38, 0.05)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
        <strong style={{ fontSize: '1rem', color: 'var(--text, #1c3540)' }}>
          Kalkulator Kardiologiczny QTc (Korekta Fridericia)
        </strong>
        <span style={{ fontSize: '0.75rem', fontWeight: 700, padding: '3px 8px', borderRadius: '4px', background: '#fdf0ec', color: '#a04020' }}>
          CredibleMeds: TdP Risk
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: compact ? '1fr' : 'repeat(3, 1fr)', gap: '14px', marginBottom: '12px' }}>
        <div>
          <label style={{ fontSize: '0.78rem', fontWeight: 600, display: 'block', marginBottom: '4px' }}>
            Zmierzony odstęp QT (ms):
          </label>
          <input
            type="number"
            min="280"
            max="650"
            value={rawQt}
            onChange={e => setRawQt(parseInt(e.target.value, 10) || 400)}
            style={{ width: '100%', padding: '6px 10px', borderRadius: '6px', border: '1px solid #ccd8d1' }}
          />
        </div>

        <div>
          <label style={{ fontSize: '0.78rem', fontWeight: 600, display: 'block', marginBottom: '4px' }}>
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
          <label style={{ fontSize: '0.78rem', fontWeight: 600, display: 'block', marginBottom: '4px' }}>
            Płeć pacjenta:
          </label>
          <select
            value={isFemale ? 'K' : 'M'}
            onChange={e => setIsFemale(e.target.value === 'K')}
            style={{ width: '100%', padding: '6px 10px', borderRadius: '6px', border: '1px solid #ccd8d1' }}
          >
            <option value="K">Kobieta (norma &lt;460 ms)</option>
            <option value="M">Mężczyzna (norma &lt;450 ms)</option>
          </select>
        </div>
      </div>

      <div style={{
        background: qtc.riskCategory === 'normal' ? '#f0f7f3' : qtc.riskCategory === 'borderline' ? '#fffdf0' : '#fdf2f0',
        padding: '12px',
        borderRadius: '8px',
        border: `1px solid ${qtc.riskCategory === 'normal' ? '#c8e5d3' : qtc.riskCategory === 'borderline' ? '#f0e6b0' : '#f5c6cb'}`,
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>Obliczone QTcF:</span>
          <strong style={{ fontSize: '1.2rem', color: qtc.riskCategory === 'normal' ? '#187765' : qtc.riskCategory === 'borderline' ? '#b8860b' : '#c0392b' }}>
            {qtc.calculatedQtcMs} ms
          </strong>
        </div>
        <p style={{ margin: 0, fontSize: '0.78rem', lineHeight: 1.5, color: '#3d4d44' }}>
          {qtc.recommendation}
        </p>
      </div>
    </div>
  );
}
