'use client';
import { useState, useMemo } from 'react';
import { RefreshCw, ShieldAlert, Scale, Pill, HeartPulse } from 'lucide-react';
import {
  type ObesitySimulatorInputs,
  calculateObesityState,
  defaultObesityInputs,
  obesityPresets,
} from '../lib/obesity-simulator.ts';
import {
  ObesityHallTab,
  ObesityPharmacotherapyTab,
  ObesityLipidScoreTab,
} from './obesity-simulator-tabs.tsx';

export function ObesitySimulator({ embedded = false }: { embedded?: boolean } = {}) {
  const [state, setState] = useState<ObesitySimulatorInputs>(defaultObesityInputs);
  const [activeTab, setActiveTab] = useState<'hall' | 'pharma' | 'lipid'>('hall');
  const [activePresetId, setActivePresetId] = useState<string>('glp1-qualification');

  const outputs = useMemo(() => calculateObesityState(state), [state]);

  const loadPreset = (id: string) => {
    const p = obesityPresets.find(item => item.id === id);
    if (!p) return;
    setState(p.data);
    setActivePresetId(id);
  };

  const reset = () => {
    setState(defaultObesityInputs);
    setActivePresetId('glp1-qualification');
  };

  return (
    <div className="simulator-container" style={{ maxWidth: '1080px', margin: '0 auto', padding: embedded ? '0' : '16px' }}>
      {/* Header */}
      {!embedded && (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#0284c7', fontWeight: 700 }}>
              KONSOLA KLINICZNA MODUŁU 08
            </span>
            <h2 style={{ fontSize: '22px', fontWeight: 800, margin: '4px 0', color: 'var(--text-primary, #0f172a)' }}>
              Otyłość, Chirurgia Bariatryczna i Dyslipidemie
            </h2>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary, #475569)', margin: 0 }}>
              Modele wydatku energetycznego Halla, algorytmy kwalifikacji bariatrycznej IFSO 2023, farmakoterapia GLP-1/GIP oraz cele lipidowe ESC/EAS.
            </p>
          </div>
          <button
            type="button"
            onClick={reset}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 14px',
              background: '#f1f5f9',
              border: '1px solid #cbd5e1',
              borderRadius: '8px',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer',
              color: '#334155',
            }}
          >
            <RefreshCw size={14} />
            Resetuj konsolę
          </button>
        </div>
      )}

      {/* Preset pills */}
      <div style={{ marginBottom: '16px' }}>
        <div style={{ fontSize: '12px', fontWeight: 600, color: '#64748b', marginBottom: '8px' }}>
          Gotowe profile kliniczne i scenariusze:
        </div>
        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
          {obesityPresets.map(p => (
            <button
              key={p.id}
              type="button"
              onClick={() => loadPreset(p.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 12px',
                borderRadius: '20px',
                fontSize: '12px',
                whiteSpace: 'nowrap',
                cursor: 'pointer',
                border: '1px solid',
                borderColor: activePresetId === p.id ? '#0284c7' : '#cbd5e1',
                background: activePresetId === p.id ? '#e0f2fe' : '#fff',
                color: activePresetId === p.id ? '#0369a1' : '#475569',
                fontWeight: activePresetId === p.id ? 700 : 500,
              }}
            >
              {p.badge && (
                <span
                  style={{
                    fontSize: '10px',
                    fontWeight: 700,
                    padding: '2px 6px',
                    borderRadius: '10px',
                    background: activePresetId === p.id ? '#0284c7' : '#f1f5f9',
                    color: activePresetId === p.id ? '#fff' : '#64748b',
                  }}
                >
                  {p.badge}
                </span>
              )}
              {p.name}
            </button>
          ))}
        </div>
      </div>

      {/* Tab bar */}
      <div style={{ display: 'flex', gap: '8px', borderBottom: '2px solid #e2e8f0', marginBottom: '16px' }}>
        {[
          { id: 'hall' as const, label: '1. Model Halla, BMR & Termogeneza', icon: Scale },
          { id: 'pharma' as const, label: '2. Farmakoterapia & Chirurgia IFSO', icon: Pill },
          { id: 'lipid' as const, label: '3. Lipidogram, Wzory & Ryzyko ESC', icon: HeartPulse },
        ].map(t => {
          const Icon = t.icon;
          const isActive = activeTab === t.id;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => setActiveTab(t.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 16px',
                fontSize: '13px',
                fontWeight: isActive ? 700 : 500,
                color: isActive ? '#0284c7' : '#64748b',
                borderBottom: isActive ? '3px solid #0284c7' : '3px solid transparent',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                marginBottom: '-2px',
              }}
            >
              <Icon size={16} />
              {t.label}
            </button>
          );
        })}
      </div>

      {/* Tab content */}
      <div style={{ marginBottom: '20px' }}>
        {activeTab === 'hall' && (
          <ObesityHallTab inputs={state} setInputs={setState} outputs={outputs} />
        )}
        {activeTab === 'pharma' && (
          <ObesityPharmacotherapyTab inputs={state} setInputs={setState} outputs={outputs} />
        )}
        {activeTab === 'lipid' && (
          <ObesityLipidScoreTab inputs={state} setInputs={setState} outputs={outputs} />
        )}
      </div>

      {/* Safety Alerts */}
      {outputs.alerts.length > 0 && (
        <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '12px', padding: '16px', marginTop: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#b91c1c', fontWeight: 700, fontSize: '13px', marginBottom: '8px' }}>
            <ShieldAlert size={18} />
            Alerty kliniczne i bezpieczeństwa metabolicznego:
          </div>
          <ul style={{ margin: 0, paddingLeft: '20px', color: '#991b1b', fontSize: '12px', lineHeight: 1.5 }}>
            {outputs.alerts.map((alert, idx) => (
              <li key={idx} style={{ marginBottom: '4px' }}>
                {alert}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
