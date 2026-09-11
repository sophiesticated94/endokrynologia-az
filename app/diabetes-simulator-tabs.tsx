'use client';
import type { Dispatch, SetStateAction } from 'react';
import { Sliders } from 'lucide-react';
import type { DiabetesState, DiabetesMetrics } from '../lib/diabetes-simulator';

export function DiabetesCgmTab({
  state,
  setState,
  metrics,
}: {
  state: DiabetesState;
  setState: Dispatch<SetStateAction<DiabetesState>>;
  metrics: DiabetesMetrics;
}) {
  const svgWidth = 600;
  const svgHeight = 220;
  const padding = { top: 20, right: 30, bottom: 30, left: 45 };

  const minG = 0;
  const maxG = 400;

  const getX = (t: number) => padding.left + (t / 240) * (svgWidth - padding.left - padding.right);
  const getY = (g: number) =>
    padding.top + (1 - Math.min(maxG, Math.max(minG, g)) / maxG) * (svgHeight - padding.top - padding.bottom);

  const pointsString = metrics.glucoseCurve
    .map(p => `${getX(p.time)},${getY(p.glucose)}`)
    .join(' ');

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '20px' }}>
      {/* Left: SVG Chart & Metrics */}
      <div style={{ background: 'var(--surface-primary, #fff)', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
          <span style={{ fontSize: '13px', fontWeight: 700 }}>Profil glikemii (0–240 minut po posiłku)</span>
          <span style={{ fontSize: '12px', color: '#64748b' }}>Pik: {metrics.peakGlucose} mg/dl</span>
        </div>

        <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} style={{ width: '100%', height: 'auto', overflow: 'visible' }}>
          <rect
            x={padding.left}
            y={getY(180)}
            width={svgWidth - padding.left - padding.right}
            height={getY(70) - getY(180)}
            fill="#f0fdf4"
            opacity={0.8}
          />
          <line x1={padding.left} y1={getY(180)} x2={svgWidth - padding.right} y2={getY(180)} stroke="#86efac" strokeDasharray="4 4" />
          <line x1={padding.left} y1={getY(70)} x2={svgWidth - padding.right} y2={getY(70)} stroke="#fca5a5" strokeDasharray="4 4" />
          <line x1={padding.left} y1={svgHeight - padding.bottom} x2={svgWidth - padding.right} y2={svgHeight - padding.bottom} stroke="#cbd5e1" />
          <line x1={padding.left} y1={padding.top} x2={padding.left} y2={svgHeight - padding.bottom} stroke="#cbd5e1" />

          <text x={padding.left - 8} y={getY(70) + 4} fontSize="10" textAnchor="end" fill="#dc2626">70</text>
          <text x={padding.left - 8} y={getY(180) + 4} fontSize="10" textAnchor="end" fill="#16a34a">180</text>
          <text x={padding.left - 8} y={getY(300) + 4} fontSize="10" textAnchor="end" fill="#64748b">300</text>

          <text x={getX(0)} y={svgHeight - 12} fontSize="10" textAnchor="middle" fill="#64748b">0m</text>
          <text x={getX(60)} y={svgHeight - 12} fontSize="10" textAnchor="middle" fill="#64748b">60m</text>
          <text x={getX(120)} y={svgHeight - 12} fontSize="10" textAnchor="middle" fill="#64748b">120m</text>
          <text x={getX(180)} y={svgHeight - 12} fontSize="10" textAnchor="middle" fill="#64748b">180m</text>
          <text x={getX(240)} y={svgHeight - 12} fontSize="10" textAnchor="middle" fill="#64748b">240m</text>

          <polyline fill="none" stroke="#0284c7" strokeWidth="3" points={pointsString} />
        </svg>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', marginTop: '16px' }}>
          <div style={{ padding: '8px', background: '#f8fafc', borderRadius: '8px', textAlign: 'center' }}>
            <span style={{ fontSize: '11px', color: '#64748b' }}>TIR (70–180)</span>
            <div style={{ fontSize: '18px', fontWeight: 800, color: metrics.tir >= 70 ? '#16a34a' : '#d97706' }}>{metrics.tir}%</div>
            <small style={{ fontSize: '10px', color: '#94a3b8' }}>Cel: &gt;70%</small>
          </div>
          <div style={{ padding: '8px', background: '#f8fafc', borderRadius: '8px', textAlign: 'center' }}>
            <span style={{ fontSize: '11px', color: '#64748b' }}>TBR (&lt;70)</span>
            <div style={{ fontSize: '18px', fontWeight: 800, color: metrics.tbr <= 4 ? '#16a34a' : '#dc2626' }}>{metrics.tbr}%</div>
            <small style={{ fontSize: '10px', color: '#94a3b8' }}>Cel: &lt;4%</small>
          </div>
          <div style={{ padding: '8px', background: '#f8fafc', borderRadius: '8px', textAlign: 'center' }}>
            <span style={{ fontSize: '11px', color: '#64748b' }}>Zmienność CV</span>
            <div style={{ fontSize: '18px', fontWeight: 800, color: metrics.cv <= 36 ? '#16a34a' : '#d97706' }}>{metrics.cv}%</div>
            <small style={{ fontSize: '10px', color: '#94a3b8' }}>Cel: &le;36%</small>
          </div>
          <div style={{ padding: '8px', background: '#f8fafc', borderRadius: '8px', textAlign: 'center' }}>
            <span style={{ fontSize: '11px', color: '#64748b' }}>GMI (~HbA1c)</span>
            <div style={{ fontSize: '18px', fontWeight: 800, color: '#0284c7' }}>{metrics.gmi}%</div>
            <small style={{ fontSize: '10px', color: '#94a3b8' }}>Szacowany</small>
          </div>
        </div>
      </div>

      {/* Right: Controls */}
      <div style={{ background: 'var(--surface-primary, #fff)', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '16px' }}>
        <h4 style={{ margin: '0 0 12px 0', fontSize: '13px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Sliders size={15} /> Parametry homeostazy
        </h4>

        <div style={{ marginBottom: '14px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '4px' }}>
            <span>Czynność komórek beta:</span>
            <strong>{state.betaCellFunction}%</strong>
          </div>
          <input
            type="range"
            min="0"
            max="150"
            step="5"
            value={state.betaCellFunction}
            onChange={e => setState({ ...state, betaCellFunction: Number(e.target.value) })}
            style={{ width: '100%' }}
          />
        </div>

        <div style={{ marginBottom: '14px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '4px' }}>
            <span>Insulinooporność:</span>
            <strong>{state.insulinResistance.toFixed(1)}x</strong>
          </div>
          <input
            type="range"
            min="1.0"
            max="4.5"
            step="0.1"
            value={state.insulinResistance}
            onChange={e => setState({ ...state, insulinResistance: Number(e.target.value) })}
            style={{ width: '100%' }}
          />
        </div>

        <div style={{ marginBottom: '14px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '4px' }}>
            <span>Węglowodany w posiłku:</span>
            <strong>{state.mealCarbs} g</strong>
          </div>
          <input
            type="range"
            min="0"
            max="120"
            step="5"
            value={state.mealCarbs}
            onChange={e => setState({ ...state, mealCarbs: Number(e.target.value) })}
            style={{ width: '100%' }}
          />
        </div>

        <div style={{ marginBottom: '14px' }}>
          <div style={{ fontSize: '12px', marginBottom: '4px' }}>Indeks glikemiczny (IG):</div>
          <div style={{ display: 'flex', gap: '6px' }}>
            {(['low', 'medium', 'high'] as const).map(ig => (
              <button
                key={ig}
                type="button"
                onClick={() => setState({ ...state, mealGlycemicIndex: ig })}
                style={{
                  flex: 1,
                  padding: '5px',
                  fontSize: '11px',
                  borderRadius: '6px',
                  border: state.mealGlycemicIndex === ig ? '2px solid #0284c7' : '1px solid #cbd5e1',
                  background: state.mealGlycemicIndex === ig ? '#f0f9ff' : '#f8fafc',
                  cursor: 'pointer',
                }}
              >
                {ig === 'low' ? 'Niski' : ig === 'medium' ? 'Średni' : 'Wysoki'}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label style={{ fontSize: '11px', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={state.sglt2Inhibitor}
              onChange={e => setState({ ...state, sglt2Inhibitor: e.target.checked })}
            />
            Inhibitor SGLT2 (Flozyna)
          </label>
          <label style={{ fontSize: '11px', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={state.glp1Agonist}
              onChange={e => setState({ ...state, glp1Agonist: e.target.checked })}
            />
            Agonista receptora GLP-1
          </label>
        </div>
      </div>
    </div>
  );
}

export function DiabetesPumpTab({
  state,
  setState,
  metrics,
}: {
  state: DiabetesState;
  setState: Dispatch<SetStateAction<DiabetesState>>;
  metrics: DiabetesMetrics;
}) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
      <div style={{ background: 'var(--surface-primary, #fff)', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '16px' }}>
        <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: 700 }}>
          Kalkulator bazy i bolusów posiłkowych
        </h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div>
            <label style={{ fontSize: '12px' }}>Przepływ bazy (j./h):</label>
            <input
              type="range"
              min="0"
              max="2.5"
              step="0.05"
              value={state.basalRate}
              onChange={e => setState({ ...state, basalRate: Number(e.target.value) })}
              style={{ width: '100%' }}
            />
            <span style={{ fontSize: '12px', fontWeight: 700 }}>{state.basalRate.toFixed(2)} j./h</span>
          </div>
          <div>
            <label style={{ fontSize: '12px' }}>Podany bolus posiłkowy (j.):</label>
            <input
              type="range"
              min="0"
              max="18"
              step="0.5"
              value={state.insulinBolus}
              onChange={e => setState({ ...state, insulinBolus: Number(e.target.value) })}
              style={{ width: '100%' }}
            />
            <span style={{ fontSize: '12px', fontWeight: 700 }}>{state.insulinBolus} j.</span>
          </div>
        </div>

        <div style={{ marginTop: '20px', padding: '12px', background: '#f8fafc', borderRadius: '8px' }}>
          <div style={{ fontSize: '12px', color: '#64748b' }}>Rekomendacja algorytmu AID:</div>
          <div style={{ fontSize: '16px', fontWeight: 800, color: '#0284c7', margin: '4px 0' }}>
            Sugerowany bolus posiłkowy: {metrics.pumpMetrics.suggestedBolus} j.
          </div>
          <small style={{ fontSize: '11px', color: '#64748b' }}>
            W tym bolus na {state.mealCarbs} g węglowodanów + ewentualna korekta hiperglikemii.
          </small>
        </div>
      </div>

      <div style={{ background: 'var(--surface-primary, #fff)', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '16px' }}>
        <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: 700 }}>
          Wyliczone parametry intensywnej terapii
        </h4>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          <div style={{ padding: '10px', background: '#f1f5f9', borderRadius: '8px' }}>
            <span style={{ fontSize: '11px', color: '#64748b' }}>Szacowane TDD</span>
            <div style={{ fontSize: '18px', fontWeight: 800 }}>{metrics.pumpMetrics.tdd} j./dobę</div>
          </div>
          <div style={{ padding: '10px', background: '#f1f5f9', borderRadius: '8px' }}>
            <span style={{ fontSize: '11px', color: '#64748b' }}>ISF (Reguła 1800)</span>
            <div style={{ fontSize: '18px', fontWeight: 800 }}>{metrics.pumpMetrics.isf} mg/dl/j.</div>
          </div>
          <div style={{ padding: '10px', background: '#f1f5f9', borderRadius: '8px' }}>
            <span style={{ fontSize: '11px', color: '#64748b' }}>ICR (Reguła 500)</span>
            <div style={{ fontSize: '18px', fontWeight: 800 }}>{metrics.pumpMetrics.icr} g/j.</div>
          </div>
          <div style={{ padding: '10px', background: '#f1f5f9', borderRadius: '8px' }}>
            <span style={{ fontSize: '11px', color: '#64748b' }}>IOB (Aktywna insulina)</span>
            <div style={{ fontSize: '18px', fontWeight: 800 }}>{metrics.pumpMetrics.iob} j.</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function DiabetesAcuteTab({
  state,
  setState,
  metrics,
}: {
  state: DiabetesState;
  setState: Dispatch<SetStateAction<DiabetesState>>;
  metrics: DiabetesMetrics;
}) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
      <div style={{ background: 'var(--surface-primary, #fff)', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '16px' }}>
        <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: 700 }}>
          Kalkulator kwasowo-zasadowy i elektrolitowy
        </h4>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          <div style={{ padding: '10px', background: metrics.dkaMetrics.ph < 7.3 ? '#fef2f2' : '#f8fafc', borderRadius: '8px' }}>
            <span style={{ fontSize: '11px', color: '#64748b' }}>pH krwi</span>
            <div style={{ fontSize: '20px', fontWeight: 800, color: metrics.dkaMetrics.ph < 7.3 ? '#dc2626' : 'inherit' }}>
              {metrics.dkaMetrics.ph}
            </div>
            <small style={{ fontSize: '10px', color: '#94a3b8' }}>Norma: 7,35–7,45</small>
          </div>
          <div style={{ padding: '10px', background: metrics.dkaMetrics.hco3 < 18 ? '#fef2f2' : '#f8fafc', borderRadius: '8px' }}>
            <span style={{ fontSize: '11px', color: '#64748b' }}>HCO3- wodorowęglany</span>
            <div style={{ fontSize: '20px', fontWeight: 800, color: metrics.dkaMetrics.hco3 < 18 ? '#dc2626' : 'inherit' }}>
              {metrics.dkaMetrics.hco3} mmol/l
            </div>
            <small style={{ fontSize: '10px', color: '#94a3b8' }}>Norma: 22–26</small>
          </div>
          <div style={{ padding: '10px', background: metrics.dkaMetrics.anionGap > 12 ? '#fef2f2' : '#f8fafc', borderRadius: '8px' }}>
            <span style={{ fontSize: '11px', color: '#64748b' }}>Luka anionowa (AG)</span>
            <div style={{ fontSize: '20px', fontWeight: 800, color: metrics.dkaMetrics.anionGap > 12 ? '#dc2626' : 'inherit' }}>
              {metrics.dkaMetrics.anionGap} mmol/l
            </div>
            <small style={{ fontSize: '10px', color: '#94a3b8' }}>Norma: 8–12</small>
          </div>
          <div style={{ padding: '10px', background: metrics.dkaMetrics.betaHydroxybutyrate >= 3.0 ? '#fef2f2' : '#f8fafc', borderRadius: '8px' }}>
            <span style={{ fontSize: '11px', color: '#64748b' }}>Beta-hydroksymaślan</span>
            <div style={{ fontSize: '20px', fontWeight: 800, color: metrics.dkaMetrics.betaHydroxybutyrate >= 3.0 ? '#dc2626' : 'inherit' }}>
              {metrics.dkaMetrics.betaHydroxybutyrate} mmol/l
            </div>
            <small style={{ fontSize: '10px', color: '#94a3b8' }}>DKA: &ge;3,0</small>
          </div>
        </div>

        <div style={{ marginTop: '14px' }}>
          <label style={{ fontSize: '12px', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={state.dkaTrigger}
              onChange={e => setState({ ...state, dkaTrigger: e.target.checked })}
            />
            <strong>Wyzwalacz kwasicy (infekcja / pominięta insulina / ostry stres)</strong>
          </label>
        </div>
      </div>

      <div style={{ background: 'var(--surface-primary, #fff)', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '16px' }}>
        <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: 700 }}>
          Osmolalność i deficyt płynowy
        </h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{ padding: '10px', background: '#f8fafc', borderRadius: '8px' }}>
            <span style={{ fontSize: '11px', color: '#64748b' }}>Osmolalność efektywna (2*Na + G/18)</span>
            <div style={{ fontSize: '20px', fontWeight: 800, color: metrics.dkaMetrics.effectiveOsmolality > 320 ? '#dc2626' : '#0284c7' }}>
              {metrics.dkaMetrics.effectiveOsmolality} mOsm/kg H2O
            </div>
            <small style={{ fontSize: '10px', color: '#64748b' }}>Kryterium HHS: &gt; 320 mOsm/kg</small>
          </div>
          <div style={{ padding: '10px', background: '#f8fafc', borderRadius: '8px' }}>
            <span style={{ fontSize: '11px', color: '#64748b' }}>Skorygowany sód (reguła Katza)</span>
            <div style={{ fontSize: '20px', fontWeight: 800 }}>
              {metrics.dkaMetrics.correctedSodium} mmol/l
            </div>
            <small style={{ fontSize: '10px', color: '#64748b' }}>Korekta na hiperglikemię: Na + 0,016*(G-100)</small>
          </div>
          <div style={{ padding: '10px', background: '#f8fafc', borderRadius: '8px' }}>
            <span style={{ fontSize: '11px', color: '#64748b' }}>Szacowany deficyt płynowy</span>
            <div style={{ fontSize: '20px', fontWeight: 800, color: '#d97706' }}>
              ~{metrics.dkaMetrics.fluidDeficitLiters} litrów
            </div>
            <small style={{ fontSize: '10px', color: '#64748b' }}>Wymaga powolnej rehydratacji krystaloidami</small>
          </div>
        </div>
      </div>
    </div>
  );
}
