'use client';
import { useState, useId } from 'react';
import {
  Activity,
  AlertTriangle,
  RotateCcw,
  BookOpen,
  Info,
  Layers,
  HeartPulse,
  Scan,
  Flame,
} from 'lucide-react';
import {
  calculateAdrenalState,
  defaultAdrenalState,
  adrenalPresets,
  type AdrenalState,
  type AdrenalSimulationMode,
} from '@/lib/adrenal-simulator';
import { AdrenalSimulatorControls } from './adrenal-simulator-controls';
import { AdrenalSimulatorModal } from './adrenal-simulator-modal';

export function AdrenalSimulator({ compact = false, embedded = false }: { compact?: boolean; embedded?: boolean }) {
  const [state, setState] = useState<AdrenalState>(defaultAdrenalState);
  const [showLegend, setShowLegend] = useState(false);
  const titleId = useId();

  const output = calculateAdrenalState(state);

  const resetToDefault = () => setState(defaultAdrenalState);

  const applyPreset = (presetId: string) => {
    const found = adrenalPresets.find(p => p.id === presetId);
    if (found) {
      setState(found.state);
    }
  };

  return (
    <div
      className={`simulator-card ${compact ? 'compact' : ''}`}
      style={{
        border: '1px solid #c7dcd0',
        borderRadius: '16px',
        padding: compact ? '20px' : '28px',
        background: '#ffffff',
        boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
        marginTop: '24px',
        marginBottom: '32px',
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
          gap: '12px',
          marginBottom: '20px',
        }}
      >
        <div>
          <span
            style={{
              fontSize: '11px',
              letterSpacing: '0.08em',
              fontWeight: 700,
              color: '#0f766e',
              display: 'block',
              marginBottom: '4px',
            }}
          >
            INTERAKTYWNY MODEL FIZJOPATOLOGICZNY
          </span>
          <h2 style={{ fontSize: compact ? '20px' : '24px', margin: 0, color: '#0f172a' }}>
            Kliniczna Konsola Nadnerczowa
          </h2>
          <p style={{ color: '#475569', fontSize: '13px', margin: '4px 0 0' }}>
            Steroidogeneza, zespół Conna, pheochromocytoma, washout TK i resuscytacja w przełomie.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <button
            type="button"
            className="secondary"
            onClick={() => setShowLegend(true)}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '6px 12px', fontSize: '13px' }}
          >
            <Info size={15} /> Legenda i zasady
          </button>
          <button
            type="button"
            className="secondary"
            onClick={resetToDefault}
            title="Resetuj do stanu fizjologicznego"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '6px 12px', fontSize: '13px' }}
          >
            <RotateCcw size={15} /> Reset
          </button>
        </div>
      </div>

      {/* Mode Switcher Tabs */}
      <div
        style={{
          display: 'flex',
          gap: '8px',
          overflowX: 'auto',
          paddingBottom: '12px',
          marginBottom: '16px',
          borderBottom: '1px solid #f1f5f9',
        }}
      >
        {[
          { id: 'steroidogenesis', label: '1. Oś HPA i Steroidogeneza', icon: Layers },
          { id: 'aldosterone_raa', label: '2. Układ RAA i Zespół Conna', icon: Activity },
          { id: 'pheochromocytoma', label: '3. Pheochromocytoma i Hemodynamika', icon: HeartPulse },
          { id: 'incidentaloma_ct', label: '4. Kalkulator TK Incydentaloma', icon: Scan },
          { id: 'crisis_resuscitation', label: '5. Resuscytacja w Przełomie', icon: Flame },
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = state.mode === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setState(prev => ({ ...prev, mode: tab.id as AdrenalSimulationMode }))}
              style={{
                padding: '8px 14px',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: isActive ? 600 : 500,
                background: isActive ? '#0f766e' : '#f8fafc',
                color: isActive ? '#ffffff' : '#334155',
                border: `1px solid ${isActive ? '#0f766e' : '#e2e8f0'}`,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
              }}
            >
              <Icon size={16} /> {tab.label}
            </button>
          );
        })}
      </div>

      {/* Presets Bar */}
      <div style={{ marginBottom: '20px', background: '#f8fafc', padding: '12px 16px', borderRadius: '10px' }}>
        <div style={{ fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '8px' }}>
          SZYBKIE SCENARIUSZE KLINICZNE:
        </div>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {adrenalPresets.map(preset => (
            <button
              key={preset.id}
              type="button"
              onClick={() => applyPreset(preset.id)}
              style={{
                fontSize: '12px',
                padding: '5px 11px',
                borderRadius: '6px',
                border: '1px solid #cbd5e1',
                background: '#ffffff',
                color: '#1e293b',
                cursor: 'pointer',
              }}
              title={preset.description}
            >
              {preset.title}
            </button>
          ))}
        </div>
      </div>

      {/* Alert Warning Box */}
      {output.hemodynamicWarning && (
        <div
          style={{
            background: '#fee2e2',
            border: '2px solid #ef4444',
            borderRadius: '10px',
            padding: '14px 18px',
            marginBottom: '20px',
            color: '#991b1b',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <AlertTriangle size={28} style={{ flexShrink: 0 }} />
          <div>
            <strong style={{ fontSize: '14px', display: 'block' }}>OSTRZEŻENIE HEMODYNAMICZNE:</strong>
            <span style={{ fontSize: '13px' }}>{output.hemodynamicWarning}</span>
          </div>
        </div>
      )}

      {/* Main Grid: Controls Left, Live Hormones & Hemodynamics Right */}
      <div style={{ display: 'grid', gridTemplateColumns: compact ? '1fr' : '1.1fr 0.9fr', gap: '24px' }}>
        {/* Controls Column */}
        <AdrenalSimulatorControls state={state} setState={setState} />

        {/* Results / Live Values Column */}
        <div style={{ background: '#f8fafc', padding: '18px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#475569' }}>PARAMETRY BIOLOGICZNE:</span>
            <span
              style={{
                fontSize: '11px',
                fontWeight: 700,
                padding: '3px 8px',
                borderRadius: '4px',
                background: output.alertType === 'danger' ? '#fee2e2' : output.alertType === 'warning' ? '#fef3c7' : '#dcfce7',
                color: output.alertType === 'danger' ? '#991b1b' : output.alertType === 'warning' ? '#92400e' : '#166534',
              }}
            >
              {output.status}
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '16px' }}>
            <div style={{ background: '#ffffff', padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: '11px', color: '#64748b' }}>Kortyzol w surowicy</div>
              <div style={{ fontSize: '18px', fontWeight: 700, color: output.cortisol < 3 ? '#dc2626' : '#0f172a' }}>
                {output.cortisol} <small style={{ fontSize: '11px', fontWeight: 400 }}>µg/dl</small>
              </div>
              <small style={{ fontSize: '10px', color: '#94a3b8' }}>Norma: 10–20 µg/dl</small>
            </div>

            <div style={{ background: '#ffffff', padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: '11px', color: '#64748b' }}>Aldosteron / Renina (ARR)</div>
              <div style={{ fontSize: '18px', fontWeight: 700, color: output.arr > 30 ? '#dc2626' : '#0f172a' }}>
                {output.arr} <small style={{ fontSize: '11px', fontWeight: 400 }}>({output.aldosterone} ng/dl)</small>
              </div>
              <small style={{ fontSize: '10px', color: '#94a3b8' }}>Norma ARR &lt; 20–30</small>
            </div>

            <div style={{ background: '#ffffff', padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: '11px', color: '#64748b' }}>Sód / Potas (Na+ / K+)</div>
              <div style={{ fontSize: '17px', fontWeight: 700, color: output.serumPotassium > 5.1 ? '#dc2626' : output.serumPotassium < 3.5 ? '#b45309' : '#0f172a' }}>
                {output.serumSodium} / {output.serumPotassium} <small style={{ fontSize: '10px' }}>mmol/l</small>
              </div>
              <small style={{ fontSize: '10px', color: '#94a3b8' }}>Norma: 135–145 / 3,5–5,1</small>
            </div>

            <div style={{ background: '#ffffff', padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: '11px', color: '#64748b' }}>Ciśnienie tętnicze / Tętno</div>
              <div style={{ fontSize: '17px', fontWeight: 700, color: output.systolicBp > 160 ? '#dc2626' : output.systolicBp < 90 ? '#dc2626' : '#0f172a' }}>
                {output.systolicBp}/{output.diastolicBp} <small style={{ fontSize: '11px' }}>({output.heartRate}/min)</small>
              </div>
              <small style={{ fontSize: '10px', color: '#94a3b8' }}>Norma: 120/80 mmHg</small>
            </div>

            <div style={{ background: '#ffffff', padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: '11px', color: '#64748b' }}>17-OH-Progesteron (17-OHP)</div>
              <div style={{ fontSize: '17px', fontWeight: 700, color: output.ohp17 > 10 ? '#dc2626' : '#0f172a' }}>
                {output.ohp17} <small style={{ fontSize: '11px', fontWeight: 400 }}>ng/ml</small>
              </div>
              <small style={{ fontSize: '10px', color: '#94a3b8' }}>Norma: &lt;2 ng/ml (WPN &gt;10)</small>
            </div>

            <div style={{ background: '#ffffff', padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: '11px', color: '#64748b' }}>Normetanefryna w osoczu</div>
              <div style={{ fontSize: '17px', fontWeight: 700, color: output.normetanephrine > 180 ? '#dc2626' : '#0f172a' }}>
                {output.normetanephrine} <small style={{ fontSize: '11px', fontWeight: 400 }}>pg/ml</small>
              </div>
              <small style={{ fontSize: '10px', color: '#94a3b8' }}>Norma: &lt;120 pg/ml</small>
            </div>
          </div>

          {/* Wyniki TK Washout (jeśli tryb incidentaloma) */}
          {state.mode === 'incidentaloma_ct' && (
            <div style={{ background: '#ffffff', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', marginBottom: '14px' }}>
              <div style={{ fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                WYNIK KALKULATORA WASHOUTU TK:
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '4px' }}>
                <span>Bezwzględny washout (APW):</span>
                <strong style={{ color: output.ctApwPercent >= 60 ? '#059669' : '#dc2626' }}>
                  {output.ctApwPercent}% (odcięcie &gt;=60%)
                </strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                <span>Względny washout (RPW):</span>
                <strong style={{ color: output.ctRpwPercent >= 40 ? '#059669' : '#dc2626' }}>
                  {output.ctRpwPercent}% (odcięcie &gt;=40%)
                </strong>
              </div>
            </div>
          )}

          {/* Wyniki AVS (jeśli tryb Conn) */}
          {state.mode === 'aldosterone_raa' && (
            <div style={{ background: '#ffffff', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', marginBottom: '14px' }}>
              <div style={{ fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                WYNIK CEWNIKOWANIA ŻYŁ NADNERCZOWYCH (AVS):
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                <span>Gradient lateralizacji (strona dominująca):</span>
                <strong style={{ color: output.avsDominantGradient > 4 ? '#059669' : '#b45309' }}>
                  {output.avsDominantGradient} : 1 ({output.avsDominantGradient > 4 ? 'Lateralizacja obecna!' : 'Brak lateralizacji'})
                </strong>
              </div>
            </div>
          )}

          {/* Rekomendacje kliniczne */}
          <div>
            <div style={{ fontSize: '11px', fontWeight: 700, color: '#64748b', marginBottom: '6px' }}>
              ZALECENIA POSTĘPOWANIA KLINICZNEGO:
            </div>
            <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '12px', color: '#334155' }}>
              {output.clinicalRecommendations.map((rec, i) => (
                <li key={i} style={{ marginBottom: '4px' }}>
                  {rec}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Modal z Legendą */}
      {showLegend && <AdrenalSimulatorModal titleId={titleId} onClose={() => setShowLegend(false)} />}
    </div>
  );
}
