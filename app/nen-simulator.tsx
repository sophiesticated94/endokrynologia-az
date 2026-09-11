'use client';
import { useState, useMemo } from 'react';
import { RefreshCw, AlertTriangle, ShieldAlert, Sparkles, Gauge, Dna, Activity } from 'lucide-react';
import {
  type NenSimulatorState,
  initialNenState,
  calculateNenState,
  NEN_PRESETS,
} from '../lib/nen-simulator.ts';
import { NenStagingTab, NenGeneticsTab, NenPrrtTab } from './nen-simulator-tabs.tsx';

export function NenSimulator({ embedded = false }: { embedded?: boolean } = {}) {
  const [state, setState] = useState<NenSimulatorState>(initialNenState);
  const [activePresetId, setActivePresetId] = useState<string>('midgut_net_g1_stable');

  const metrics = useMemo(() => calculateNenState(state), [state]);

  const loadPreset = (id: string) => {
    const p = NEN_PRESETS.find(item => item.id === id);
    if (!p) return;
    setState(s => ({
      ...s,
      ...p.state,
    }));
    setActivePresetId(id);
  };

  const reset = () => {
    setState(initialNenState);
    setActivePresetId('midgut_net_g1_stable');
  };

  return (
    <div className="simulator-container" style={{ maxWidth: '1080px', margin: '0 auto', padding: embedded ? '0' : '16px' }}>
      {/* Header */}
      {!embedded && (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#0284c7', fontWeight: 700 }}>
              KONSOLA KLINICZNA MODUŁU 07
            </span>
            <h2 style={{ fontSize: '22px', fontWeight: 800, margin: '4px 0', color: 'var(--text-primary, #0f172a)' }}>
              Nowotwory Neuroendokrynne i Zespoły MEN
            </h2>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary, #475569)', margin: 0 }}>
              Grading WHO 2022/2024, skala Krenninga 68Ga-DOTATATE, algorytmy chirurgiczne MEN1/MEN2 oraz dozymetria PRRT i CAPTEM.
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
          {NEN_PRESETS.map(p => (
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
              {p.name}
            </button>
          ))}
        </div>
      </div>

      {/* Tab bar */}
      <div style={{ display: 'flex', gap: '8px', borderBottom: '2px solid #e2e8f0', marginBottom: '16px' }}>
        {[
          { id: 'staging', label: '1. Grading WHO & SSTR/Krenning', icon: Gauge },
          { id: 'genetics', label: '2. Drzewo Decyzyjne MEN & RET', icon: Dna },
          { id: 'prrt', label: '3. Dozymetria PRRT & CAPTEM', icon: Activity },
        ].map(t => {
          const Icon = t.icon;
          const isActive = state.activeTab === t.id;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => setState(prev => ({ ...prev, activeTab: t.id as any }))}
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
        {state.activeTab === 'staging' && (
          <NenStagingTab state={state} setState={setState} metrics={metrics} />
        )}
        {state.activeTab === 'genetics' && (
          <NenGeneticsTab state={state} setState={setState} metrics={metrics} />
        )}
        {state.activeTab === 'prrt' && (
          <NenPrrtTab state={state} setState={setState} metrics={metrics} />
        )}
      </div>

      {/* Safety Alerts */}
      {metrics.safetyAlerts.length > 0 && (
        <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '12px', padding: '16px', marginTop: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#b91c1c', fontWeight: 700, fontSize: '13px', marginBottom: '8px' }}>
            <ShieldAlert size={18} />
            Alerty bezpieczeństwa onkologicznego i metabolicznego:
          </div>
          <ul style={{ margin: 0, paddingLeft: '20px', color: '#991b1b', fontSize: '12px', lineHeight: 1.5 }}>
            {metrics.safetyAlerts.map((alert, idx) => (
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
