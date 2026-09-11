'use client';
import { MechanismWorkbench } from './physiology-workbench';
import { useState, useMemo } from 'react';
import { Sliders, Activity, ShieldAlert, CheckCircle2, TrendingUp } from 'lucide-react';

// ============================================================================
// 1. MICHAELIS-MENTEN NORMALIZED KINETICS CHART (DIMENSIONLESS [S]/Km & v/Vmax)
// ============================================================================
export function MichaelisMentenLineweaverChart() {
  const [selectedAlpha, setSelectedAlpha] = useState<'100' | '30' | '3' | '0.5'>('30');
  const [ratioSOverKm, setRatioSOverKm] = useState(2.0); // Bezwymiarowy stosunek [S]/Km

  const profiles: Record<'100' | '30' | '3' | '0.5', { label: string; alpha: number; color: string; desc: string }> = {
    '100': { label: '100% aktywności (Model WT)', alpha: 1.0, color: '#16a34a', desc: 'Referencyjna kinetyka nasycenia (Vmax = 100% WT).' },
    '30': { label: '30% aktywności modelowej', alpha: 0.3, color: '#ca8a04', desc: 'Zredukowana pojemność katalityczna (asymptota 30% WT).' },
    '3': { label: '3% aktywności modelowej', alpha: 0.03, color: '#ea580c', desc: 'Bardzo niska pojemność katalityczna (asymptota 3% WT).' },
    '0.5': { label: '0,5% aktywności modelowej', alpha: 0.005, color: '#dc2626', desc: 'Śladowa pojemność katalityczna (asymptota 0,5% WT).' },
  };

  const current = profiles[selectedAlpha];
  // v / Vmax,wt = alpha * (s / (1 + s))
  const normVelocity = current.alpha * (ratioSOverKm / (1 + ratioSOverKm));
  const normPct = Math.round(normVelocity * 1000) / 10;

  // Generowanie krzywych dla s od 0 do 10
  const maxS = 10;
  const generatePath = (alpha: number) => {
    const pts: { x: number; y: number }[] = [];
    for (let s = 0; s <= maxS; s += 0.2) {
      const v = alpha * (s / (1 + s));
      const px = 45 + (s / maxS) * 435;
      const py = 160 - 20 - (v / 1.0) * 120;
      pts.push({ x: px, y: py });
    }
    return pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ');
  };

  const activePath = generatePath(current.alpha);
  const wtPath = generatePath(1.0);

  const markerX = 45 + (ratioSOverKm / maxS) * 435;
  const markerY = 160 - 20 - (normVelocity / 1.0) * 120;

  return (
    <div style={{ background: '#fffaf5', border: '1px solid #fed7aa', borderRadius: '12px', padding: '18px', margin: '20px 0' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
        <div>
          <span style={{ fontSize: '11px', fontWeight: 700, color: '#c2410c', letterSpacing: '0.05em' }}>
            ZCYFRYZOWANY MODEL KINETYKI ENZYMATYCZNEJ (BEZWYMIAROWY)
          </span>
          <h4 style={{ margin: '2px 0 0', fontSize: '15px', color: '#431407' }}>
            Względna szybkość enzymatyczna v / Vmax w funkcji nasycenia [S] / Km
          </h4>
        </div>
        <span style={{ fontSize: '12px', fontWeight: 700, background: '#ffedd5', color: '#9a3412', padding: '4px 10px', borderRadius: '6px' }}>
          v / Vmax(WT) = {normPct}%
        </span>
      </div>

      {/* Wybór modelowej aktywności katalitycznej */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))', gap: '8px', marginBottom: '14px' }}>
        {(['100', '30', '3', '0.5'] as const).map(key => (
          <button
            key={key}
            type="button"
            onClick={() => setSelectedAlpha(key)}
            style={{
              padding: '6px 8px',
              borderRadius: '6px',
              border: '1px solid',
              borderColor: selectedAlpha === key ? profiles[key].color : '#e2e8f0',
              background: selectedAlpha === key ? profiles[key].color : '#fff',
              color: selectedAlpha === key ? '#fff' : '#475569',
              fontWeight: 600,
              fontSize: '11px',
              cursor: 'pointer',
              textAlign: 'center',
            }}
          >
            {profiles[key].label}
          </button>
        ))}
      </div>

      {/* Suwak bezwymiarowego stosunku [S]/Km */}
      <div style={{ background: '#fff', border: '1px solid #ffedd5', borderRadius: '8px', padding: '10px 14px', marginBottom: '14px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: 600, color: '#431407' }}>
          <span>Względne nasycenie substratem [S] / Km:</span>
          <strong style={{ color: '#c2410c' }}>{ratioSOverKm.toFixed(1)} × Km</strong>
        </div>
        <input
          type="range"
          min="0.1"
          max="10"
          step="0.1"
          value={ratioSOverKm}
          onChange={e => setRatioSOverKm(Number(e.target.value))}
          style={{ width: '100%', marginTop: '6px' }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: '#9a3412' }}>
          <span>0.1 (daleko poniżej Km)</span>
          <span>1.0 ([S] = Km ⟶ 50% nasycenia)</span>
          <span>10.0 (stan zbliżony do asymptoty Vmax)</span>
        </div>
      </div>

      {/* Wykres funkcyjny Michaelisa-Menten SVG */}
      <div style={{ background: '#fff', border: '1px solid #fed7aa', borderRadius: '8px', padding: '10px' }}>
        <svg viewBox="0 0 500 170" style={{ width: '100%', display: 'block' }}>
          {/* Siatka pozioma */}
          {[0, 25, 50, 75, 100].map(val => {
            const y = 160 - 20 - (val / 100) * 120;
            return (
              <g key={val}>
                <line x1="45" y1={y} x2="480" y2={y} stroke="#f1f5f9" strokeDasharray="3 3" />
                <text x="37" y={y + 3} fill="#94a3b8" fontSize="9" textAnchor="end">{val}%</text>
              </g>
            );
          })}

          {/* Krzywa odniesienia WT (100%) w tle */}
          {selectedAlpha !== '100' && (
            <path d={wtPath} fill="none" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="3 3" />
          )}

          {/* Asymptota Vmax dla wybranego profilu */}
          <line
            x1="45"
            y1={160 - 20 - current.alpha * 120}
            x2="480"
            y2={160 - 20 - current.alpha * 120}
            stroke={current.color}
            strokeDasharray="4 4"
            strokeWidth="1.2"
          />

          {/* Aktywna krzywa funkcyjna */}
          <path d={activePath} fill="none" stroke={current.color} strokeWidth="2.5" />

          {/* Punkt modelowy */}
          <circle cx={markerX} cy={markerY} r="4.5" fill={current.color} stroke="#fff" strokeWidth="2" />
          <text x={Math.min(460, markerX + 8)} y={Math.max(25, markerY - 6)} fill={current.color} fontSize="10" fontWeight="700">
            [S]/Km = {ratioSOverKm.toFixed(1)} ⟶ v = {normPct}%
          </text>

          {/* Osie X i Y */}
          <line x1="45" y1="140" x2="480" y2="140" stroke="#475569" strokeWidth="1.5" />
          <line x1="45" y1="20" x2="45" y2="140" stroke="#475569" strokeWidth="1.5" />
          <text x="265" y="160" fill="#475569" fontSize="10" fontWeight="600" textAnchor="middle">Względne stężenie substratu [S] / Km (bezwymiarowe)</text>
          <text x="14" y="80" fill="#475569" fontSize="10" fontWeight="600" transform="rotate(-90 14 80)" textAnchor="middle">Szybkość v / Vmax,WT (%)</text>
        </svg>
      </div>

      <div style={{ marginTop: '12px', fontSize: '12px', color: '#7c2d12', lineHeight: '1.45', background: '#fff7ed', padding: '10px 14px', borderRadius: '6px' }}>
        <strong>Bezwymiarowy model Michaelisa–Mentena:</strong> Równanie {'v/Vmax = α · ([S]/Km) / (1 + [S]/Km)'} ilustruje teoretyczną zależność przepływu enzymatycznego od nasycenia substratem przy danej względnej pojemności katalitycznej α. W organizmie stężenia metabolitów wynikają ze złożonego sprzężenia zwrotnego osi ACTH-nadnercza, a nie z izolowanej kinetyki in vitro.
      </div>
    </div>
  );
}

// ============================================================================
// 2. PHEO HEMODYNAMICS & NON-COMPETITIVE ALPHA-BLOCKADE CHART
// ============================================================================
export function ArrHemodynamicsChart(){return <MechanismWorkbench system="adrenal"/>;}
