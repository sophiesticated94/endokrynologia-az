'use client';
import { useState, useMemo } from 'react';
import { RefreshCw, AlertTriangle, CheckCircle2, Sliders, ShieldAlert, Sparkles } from 'lucide-react';
import {
  type GonadSimulatorState,
  initialGonadState,
  calculateGonadState,
  GONAD_PRESETS,
} from '../lib/gonad-simulator';
import { GonadHpgTab, GonadTherapyTab, GonadIvfTab } from './gonad-simulator-tabs';

export function GonadSimulator({ embedded = false }: { embedded?: boolean } = {}) {
  const [state, setState] = useState<GonadSimulatorState>(initialGonadState);
  const [activePresetId, setActivePresetId] = useState<string>('eugonadal_male');

  const results = useMemo(() => calculateGonadState(state), [state]);

  const loadPreset = (id: string) => {
    const p = GONAD_PRESETS.find(item => item.id === id);
    if (!p) return;
    setState(s => ({
      ...s,
      ...p.state,
    }));
    setActivePresetId(id);
  };

  const reset = () => {
    setState(initialGonadState);
    setActivePresetId('eugonadal_male');
  };

  return (
    <div className="simulator-container" style={{ maxWidth: '1080px', margin: '0 auto', padding: embedded ? '0' : '16px' }}>
      {/* Header */}
      {!embedded && (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#0284c7', fontWeight: 700 }}>
              KONSOLA KLINICZNA MODUŁU 06
            </span>
            <h2 style={{ fontSize: '22px', fontWeight: 800, margin: '4px 0', color: 'var(--text-primary, #0f172a)' }}>
              Gonady, Andrologia i Medycyna Rozrodu
            </h2>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary, #475569)', margin: 0 }}>
              Symuluj sprzężenia osi HPG, równanie Vermeulena dla wolnego testosteronu, protokoły TRT/GAHT oraz predykcję OHSS.
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
            }}
          >
            <RefreshCw size={14} />
            Resetuj
          </button>
        </div>
      )}

      {/* Presets Chips */}
      <div style={{ marginBottom: '16px', display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center' }}>
        <span style={{ fontSize: '12px', fontWeight: 700, color: '#64748b', marginRight: '4px' }}>Wzorce kliniczne:</span>
        {GONAD_PRESETS.map(pr => {
          const isSelected = activePresetId === pr.id;
          return (
            <button
              key={pr.id}
              type="button"
              onClick={() => loadPreset(pr.id)}
              style={{
                padding: '5px 10px',
                borderRadius: '6px',
                fontSize: '11px',
                fontWeight: 600,
                border: '1px solid',
                borderColor: isSelected ? '#0284c7' : '#e2e8f0',
                background: isSelected ? '#0284c7' : '#fff',
                color: isSelected ? '#fff' : '#334155',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
              }}
              title={pr.description}
            >
              <span style={{ fontSize: '9px', opacity: 0.8, textTransform: 'uppercase' }}>[{pr.badge}]</span>
              {pr.name}
            </button>
          );
        })}
      </div>

      {/* Tab Navigation */}
      <div style={{ display: 'flex', gap: '4px', borderBottom: '1px solid #e2e8f0', marginBottom: '16px' }}>
        <button
          type="button"
          onClick={() => setState(s => ({ ...s, activeTab: 'hpg' }))}
          style={{
            padding: '8px 16px',
            fontSize: '13px',
            fontWeight: 700,
            background: 'none',
            border: 'none',
            borderBottom: '2px solid',
            borderColor: state.activeTab === 'hpg' ? '#0284c7' : 'transparent',
            color: state.activeTab === 'hpg' ? '#0284c7' : '#64748b',
            cursor: 'pointer',
          }}
        >
          1. Oś HPG i Równanie Vermeulena
        </button>
        <button
          type="button"
          onClick={() => setState(s => ({ ...s, activeTab: 'therapy' }))}
          style={{
            padding: '8px 16px',
            fontSize: '13px',
            fontWeight: 700,
            background: 'none',
            border: 'none',
            borderBottom: '2px solid',
            borderColor: state.activeTab === 'therapy' ? '#0284c7' : 'transparent',
            color: state.activeTab === 'therapy' ? '#0284c7' : '#64748b',
            cursor: 'pointer',
          }}
        >
          2. Hormonoterapia (TRT, Doping AAS, GAHT)
        </button>
        <button
          type="button"
          onClick={() => setState(s => ({ ...s, activeTab: 'ivf' }))}
          style={{
            padding: '8px 16px',
            fontSize: '13px',
            fontWeight: 700,
            background: 'none',
            border: 'none',
            borderBottom: '2px solid',
            borderColor: state.activeTab === 'ivf' ? '#0284c7' : 'transparent',
            color: state.activeTab === 'ivf' ? '#0284c7' : '#64748b',
            cursor: 'pointer',
          }}
        >
          3. Stymulacja IVF i Predykcja OHSS
        </button>
      </div>

      {/* Safety Alerts Banner */}
      {results.safetyAlerts.length > 0 && (
        <div style={{ marginBottom: '16px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {results.safetyAlerts.map((alert, idx) => (
            <div
              key={idx}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 14px',
                background: '#fef2f2',
                border: '1px solid #fca5a5',
                borderRadius: '8px',
                color: '#991b1b',
                fontSize: '12px',
                fontWeight: 600,
              }}
            >
              <AlertTriangle size={16} />
              {alert}
            </div>
          ))}
        </div>
      )}

      {/* Tab Contents */}
      {state.activeTab === 'hpg' && (
        <GonadHpgTab state={state} setState={setState} results={results} />
      )}
      {state.activeTab === 'therapy' && (
        <GonadTherapyTab state={state} setState={setState} results={results} />
      )}
      {state.activeTab === 'ivf' && (
        <GonadIvfTab state={state} setState={setState} results={results} />
      )}

      {/* Clinical Takeaway */}
      <div
        style={{
          marginTop: '20px',
          padding: '14px 16px',
          background: '#f0f9ff',
          border: '1px solid #bae6fd',
          borderRadius: '10px',
          display: 'flex',
          alignItems: 'flex-start',
          gap: '12px',
        }}
      >
        <CheckCircle2 size={18} color="#0284c7" style={{ marginTop: '2px', flexShrink: 0 }} />
        <div>
          <div style={{ fontSize: '13px', fontWeight: 700, color: '#0369a1', marginBottom: '2px' }}>
            Interpretacja kliniczna konsylium endokrynologicznego
          </div>
          <div style={{ fontSize: '12px', color: '#0c4a6e', lineHeight: 1.5 }}>
            {results.clinicalComment}
          </div>
        </div>
      </div>
    </div>
  );
}
