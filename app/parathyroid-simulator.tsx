'use client';
import { useState, useId } from 'react';
import {
  Activity,
  AlertTriangle,
  RotateCcw,
  BookOpen,
  X,
  Info,
  Layers,
  HeartPulse,
  Flame,
  ShieldAlert,
  Sparkles,
  Zap,
} from 'lucide-react';
import {
  calculateParathyroidState,
  defaultParathyroidState,
  parathyroidPresets,
  type ParathyroidState,
  type ParathyroidSimulationMode,
} from '@/lib/parathyroid-simulator';
import { ParathyroidSimulatorControls } from './parathyroid-simulator-controls';
import { ParathyroidSimulatorModal } from './parathyroid-simulator-modal';

export function ParathyroidSimulator({ compact = false, embedded = false }: { compact?: boolean; embedded?: boolean }) {
  const [state, setState] = useState<ParathyroidState>(defaultParathyroidState);
  const [showLegend, setShowLegend] = useState(false);
  const titleId = useId();

  const output = calculateParathyroidState(state);

  const resetToDefault = () => setState(defaultParathyroidState);

  const applyPreset = (presetId: string) => {
    const found = parathyroidPresets.find(p => p.id === presetId);
    if (found) {
      setState(found.state);
    }
  };

  return (
    <section
      className={`simulator-card ${compact ? 'simulator-compact' : ''} ${embedded ? 'simulator-embedded' : ''}`}
      aria-labelledby={titleId}
      style={{
        border: '1px solid #cce3de',
        background: '#ffffff',
        borderRadius: '16px',
        padding: embedded ? '20px' : '28px',
        boxShadow: '0 4px 20px rgba(0, 70, 50, 0.05)',
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px', marginBottom: '20px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span style={{ background: '#e6f4ea', color: '#137333', padding: '3px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: 'bold' }}>
              MODUŁ 04 · KONSOLA PRZYTARCZYCOWA
            </span>
            <span style={{ fontSize: '12px', color: '#5f6368' }}>Homeostaza Ca–P, CCCR, EKG i stany nagłe</span>
          </div>
          <h2 id={titleId} style={{ margin: 0, fontSize: '20px', color: '#1e293b' }}>
            Kliniczna Konsola Przytarczyc i Gospodarki Wapniowo-Fosforanowej
          </h2>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            type="button"
            className="secondary"
            onClick={() => setShowLegend(true)}
            style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', padding: '6px 12px' }}
          >
            <BookOpen size={15} /> Legenda i normy
          </button>
          <button
            type="button"
            className="secondary"
            onClick={resetToDefault}
            style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', padding: '6px 12px' }}
          >
            <RotateCcw size={15} /> Resetuj
          </button>
        </div>
      </div>

      {/* Tryby symulacji */}
      <div className="filter-bar" style={{ marginBottom: '20px' }}>
        {[
          { id: 'axis_homeostasis', label: '1. Oś Ca–P–PTH–CaSR', icon: Activity },
          { id: 'phpt_fhh_calculator', label: '2. Kalkulator CCCR (PHPT vs FHH)', icon: Layers },
          { id: 'tetany_ekg', label: '3. Tężyczka i EKG (QTc)', icon: HeartPulse },
          { id: 'hypercalcemic_crisis', label: '4. Przełom hiperkalcemiczny', icon: Flame },
          { id: 'hungry_bone', label: '5. Zespół głodnych kości (HBS)', icon: Zap },
        ].map(item => {
          const Icon = item.icon;
          const isActive = state.mode === item.id;
          return (
            <button
              key={item.id}
              type="button"
              className={isActive ? 'active' : ''}
              onClick={() => setState(prev => ({ ...prev, mode: item.id as ParathyroidSimulationMode }))}
              style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px' }}
            >
              <Icon size={15} /> {item.label}
            </button>
          );
        })}
      </div>

      {/* Szybkie presety kliniczne */}
      <div style={{ marginBottom: '24px', background: '#f8faf9', padding: '12px 16px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
        <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#475569', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Sparkles size={14} color="#059669" /> SCENARIUSZE KLINICZNE (PRESETY):
        </div>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {parathyroidPresets.map(preset => (
            <button
              key={preset.id}
              type="button"
              className="text-button"
              onClick={() => applyPreset(preset.id)}
              style={{
                fontSize: '12px',
                padding: '4px 10px',
                background: '#ffffff',
                border: '1px solid #cbd5e1',
                borderRadius: '6px',
                color: '#1e293b',
              }}
            >
              {preset.title}
            </button>
          ))}
        </div>
      </div>

      {/* Główna siatka: Suwaki i Wskaźniki */}
      <div style={{ display: 'grid', gridTemplateColumns: compact ? '1fr' : 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
        {/* Kolumna Sterowania */}
        <ParathyroidSimulatorControls state={state} setState={setState} />

        {/* Kolumna Wyników i Wskaźników */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {/* Kafelki Główne */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: '11px', color: '#64748b' }}>Wapń całkowity (skoryg.)</div>
              <div style={{ fontSize: '20px', fontWeight: 'bold', color: output.correctedCalciumMgDl > 10.2 ? '#b91c1c' : output.correctedCalciumMgDl < 8.6 ? '#d97706' : '#15803d' }}>
                {output.correctedCalciumMgDl} <span style={{ fontSize: '12px' }}>mg/dl</span>
              </div>
              <div style={{ fontSize: '10px', color: '#94a3b8' }}>
                Norma: 8,6–10,2 mg/dl
              </div>
            </div>

            <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: '11px', color: '#64748b' }}>Wapń zjonizowany (Ca2+)</div>
              <div style={{ fontSize: '20px', fontWeight: 'bold', color: output.ionizedCalciumMmol > 1.32 ? '#b91c1c' : output.ionizedCalciumMmol < 1.15 ? '#d97706' : '#15803d' }}>
                {output.ionizedCalciumMmol} <span style={{ fontSize: '12px' }}>mmol/l</span>
              </div>
              <div style={{ fontSize: '10px', color: '#94a3b8' }}>
                Norma: 1,15–1,32 mmol/l
              </div>
            </div>

            <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: '11px', color: '#64748b' }}>Parathormon (iPTH)</div>
              <div style={{ fontSize: '20px', fontWeight: 'bold', color: output.intactPthPgMl > 65 ? '#b91c1c' : output.intactPthPgMl < 15 ? '#2563eb' : '#15803d' }}>
                {output.intactPthPgMl} <span style={{ fontSize: '12px' }}>pg/ml</span>
              </div>
              <div style={{ fontSize: '10px', color: '#94a3b8' }}>
                Norma: 15–65 pg/ml
              </div>
            </div>

            <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: '11px', color: '#64748b' }}>Fosforany nieorganiczne</div>
              <div style={{ fontSize: '20px', fontWeight: 'bold', color: output.serumPhosphateMgDl < 2.5 ? '#2563eb' : output.serumPhosphateMgDl > 4.5 ? '#b91c1c' : '#15803d' }}>
                {output.serumPhosphateMgDl} <span style={{ fontSize: '12px' }}>mg/dl</span>
              </div>
              <div style={{ fontSize: '10px', color: '#94a3b8' }}>
                Norma: 2,5–4,5 mg/dl
              </div>
            </div>
          </div>

          {/* Dodatkowe Wskaźniki zależne od trybu */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div style={{ background: '#f8fafc', padding: '10px 12px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: '11px', color: '#64748b' }}>Wskaźnik CCCR (FeCa)</div>
              <div style={{ fontSize: '16px', fontWeight: 'bold', color: output.cccrRatio < 0.01 ? '#dc2626' : output.cccrRatio > 0.02 ? '#16a34a' : '#d97706' }}>
                {output.cccrRatio}
              </div>
              <div style={{ fontSize: '10px', color: output.cccrRatio < 0.01 ? '#b91c1c' : '#64748b' }}>
                {output.cccrRatio < 0.01 ? 'FHH (<0,01)' : output.cccrRatio > 0.02 ? 'PHPT (>0,02)' : 'Strefa szara'}
              </div>
            </div>

            <div style={{ background: '#f8fafc', padding: '10px 12px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: '11px', color: '#64748b' }}>Odstęp QTc w EKG</div>
              <div style={{ fontSize: '16px', fontWeight: 'bold', color: output.qtcIntervalMs > 460 ? '#dc2626' : output.qtcIntervalMs < 360 ? '#b91c1c' : '#15803d' }}>
                {output.qtcIntervalMs} ms
              </div>
              <div style={{ fontSize: '10px', color: output.qtcIntervalMs > 460 ? '#dc2626' : '#64748b' }}>
                {output.qtcIntervalMs > 460 ? 'Wydłużony (Torsade!)' : output.qtcIntervalMs < 360 ? 'Skrócony (HiperCa)' : 'Prawidłowy'}
              </div>
            </div>
          </div>

          {/* Status i Rekomendacje */}
          <div
            style={{
              padding: '14px',
              borderRadius: '10px',
              border: `1px solid ${output.alertType === 'danger' ? '#fca5a5' : output.alertType === 'warning' ? '#fcd34d' : '#86efac'}`,
              background: output.alertType === 'danger' ? '#fef2f2' : output.alertType === 'warning' ? '#fffbeb' : '#f0fdf4',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              {output.alertType === 'danger' ? (
                <ShieldAlert size={18} color="#dc2626" />
              ) : output.alertType === 'warning' ? (
                <AlertTriangle size={18} color="#d97706" />
              ) : (
                <Activity size={18} color="#16a34a" />
              )}
              <strong style={{ fontSize: '13px', color: output.alertType === 'danger' ? '#991b1b' : output.alertType === 'warning' ? '#92400e' : '#166534' }}>
                {output.status}
              </strong>
            </div>

            {output.clinicalRecommendations.length > 0 && (
              <ul style={{ margin: '8px 0 0 0', paddingLeft: '18px', fontSize: '12px', color: '#334155' }}>
                {output.clinicalRecommendations.map((rec, i) => (
                  <li key={i} style={{ marginBottom: '3px' }}>
                    {rec}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      {/* Modal Legendy */}
      {showLegend && <ParathyroidSimulatorModal titleId={titleId} onClose={() => setShowLegend(false)} />}
    </section>
  );
}
