'use client';
import { useState, useMemo } from 'react';
import {
  RefreshCw,
  AlertCircle,
  CheckCircle2,
  TrendingUp,
  Droplet,
  Flame,
  ShieldAlert,
} from 'lucide-react';
import {
  type DiabetesState,
  defaultDiabetesState,
  diabetesPresets,
  calculateDiabetesState,
} from '../lib/diabetes-simulator';
import {
  DiabetesCgmTab,
  DiabetesPumpTab,
  DiabetesAcuteTab,
} from './diabetes-simulator-tabs';

export function DiabetesSimulator({ embedded = false }: { embedded?: boolean } = {}) {
  const [state, setState] = useState<DiabetesState>(defaultDiabetesState);
  const [activeTab, setActiveTab] = useState<'cgm' | 'pump' | 'acute'>('cgm');
  const [activePresetId, setActivePresetId] = useState<string>('healthy');

  const metrics = useMemo(() => calculateDiabetesState(state), [state]);

  const loadPreset = (id: string) => {
    const p = diabetesPresets.find(pr => pr.id === id);
    if (!p) return;
    setState(p.state);
    setActivePresetId(id);
  };

  const reset = () => {
    setState(defaultDiabetesState);
    setActivePresetId('healthy');
  };

  return (
    <div className="simulator-container" style={{ maxWidth: '1080px', margin: '0 auto', padding: '16px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <div>
          <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#0284c7', fontWeight: 700 }}>
            SYMULATOR FIZJOLOGICZNY MODUŁU 05
          </span>
          <h2 style={{ fontSize: '22px', fontWeight: 800, margin: '4px 0', color: 'var(--text-primary, #0f172a)' }}>
            Homeostaza glukozy, CGM i resuscytacja metaboliczna
          </h2>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary, #475569)', margin: 0 }}>
            Testuj kinetykę komórek beta, insulinooporność, wskaźniki CGM, algorytmy pompowe i protokoły DKA/HHS.
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
            borderRadius: '8px',
            border: '1px solid #cbd5e1',
            background: 'var(--surface-primary, #fff)',
            fontSize: '13px',
            cursor: 'pointer',
          }}
        >
          <RefreshCw size={14} /> Domyślny
        </button>
      </div>

      {/* Presets bar */}
      <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '10px', marginBottom: '16px' }}>
        {diabetesPresets.map(preset => (
          <button
            key={preset.id}
            type="button"
            onClick={() => loadPreset(preset.id)}
            style={{
              padding: '8px 12px',
              borderRadius: '8px',
              border: activePresetId === preset.id ? '2px solid #0284c7' : '1px solid #e2e8f0',
              background: activePresetId === preset.id ? '#f0f9ff' : 'var(--surface-primary, #fff)',
              whiteSpace: 'nowrap',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              gap: '2px',
            }}
          >
            <span style={{ fontSize: '12px', fontWeight: 700, color: activePresetId === preset.id ? '#0369a1' : 'inherit' }}>
              {preset.name}
            </span>
            <span style={{ fontSize: '10px', padding: '1px 6px', borderRadius: '4px', background: '#e0f2fe', color: '#0369a1' }}>
              {preset.badge}
            </span>
          </button>
        ))}
      </div>

      {/* Status banner */}
      <div
        style={{
          padding: '12px 16px',
          borderRadius: '10px',
          marginBottom: '16px',
          background:
            metrics.alertType === 'danger'
              ? '#fef2f2'
              : metrics.alertType === 'warning'
              ? '#fffbeb'
              : '#f0fdf4',
          border:
            metrics.alertType === 'danger'
              ? '1px solid #fecaca'
              : metrics.alertType === 'warning'
              ? '1px solid #fde68a'
              : '1px solid #bbf7d0',
          display: 'flex',
          alignItems: 'flex-start',
          gap: '12px',
        }}
      >
        {metrics.alertType === 'danger' ? (
          <AlertCircle size={20} color="#dc2626" style={{ flexShrink: 0, marginTop: '2px' }} />
        ) : metrics.alertType === 'warning' ? (
          <ShieldAlert size={20} color="#d97706" style={{ flexShrink: 0, marginTop: '2px' }} />
        ) : (
          <CheckCircle2 size={20} color="#16a34a" style={{ flexShrink: 0, marginTop: '2px' }} />
        )}
        <div>
          <strong style={{ fontSize: '14px', color: metrics.alertType === 'danger' ? '#991b1b' : metrics.alertType === 'warning' ? '#92400e' : '#166534' }}>
            {metrics.status}
          </strong>
          <ul style={{ margin: '6px 0 0 16px', padding: 0, fontSize: '12px', color: 'var(--text-secondary, #475569)' }}>
            {metrics.recommendations.map((rec, i) => (
              <li key={i}>{rec}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Tabs navigation */}
      <div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid #e2e8f0', marginBottom: '16px' }}>
        <button
          type="button"
          onClick={() => setActiveTab('cgm')}
          style={{
            padding: '10px 18px',
            border: 'none',
            borderBottom: activeTab === 'cgm' ? '3px solid #0284c7' : '3px solid transparent',
            background: 'none',
            fontWeight: 700,
            fontSize: '13px',
            color: activeTab === 'cgm' ? '#0284c7' : '#64748b',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          <TrendingUp size={16} /> 1. Homeostaza i krzywa CGM
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('pump')}
          style={{
            padding: '10px 18px',
            border: 'none',
            borderBottom: activeTab === 'pump' ? '3px solid #0284c7' : '3px solid transparent',
            background: 'none',
            fontWeight: 700,
            fontSize: '13px',
            color: activeTab === 'pump' ? '#0284c7' : '#64748b',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          <Droplet size={16} /> 2. Pompa, ISF i ICR
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('acute')}
          style={{
            padding: '10px 18px',
            border: 'none',
            borderBottom: activeTab === 'acute' ? '3px solid #0284c7' : '3px solid transparent',
            background: 'none',
            fontWeight: 700,
            fontSize: '13px',
            color: activeTab === 'acute' ? '#0284c7' : '#64748b',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          <Flame size={16} /> 3. Stany nagłe (DKA / HHS)
        </button>
      </div>

      {/* Render active tab */}
      {activeTab === 'cgm' && <DiabetesCgmTab state={state} setState={setState} metrics={metrics} />}
      {activeTab === 'pump' && <DiabetesPumpTab state={state} setState={setState} metrics={metrics} />}
      {activeTab === 'acute' && <DiabetesAcuteTab state={state} setState={setState} metrics={metrics} />}
    </div>
  );
}
