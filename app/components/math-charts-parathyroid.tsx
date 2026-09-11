'use client';
import { useState, useMemo } from 'react';

// ============================================================================
// ============================================================================
// 1. CASR HILL EQUATION INTERACTIVE CURVE (RELATIVE Ca / SET-POINT RATIO)
// ============================================================================
export function CasrHillCurveChart() {
  const [caRatio, setCaRatio] = useState(1.00); // Względny stosunek Ca / Set-point (0.75 do 1.25)
  const [condition, setCondition] = useState<'normal' | 'fhh' | 'cinacalcet' | 'adenoma'>('normal');

  const relativeMax = 100.0;
  const hillCoeff = 3.8; // Wysoka kooperatywność oligomeru receptora CaSR w modelach biofizycznych

  const conditionProfiles = {
    normal: { label: 'Model odniesienia (Set-point = 1,00)', shift: 1.0, minSec: 5, color: '#6d4ba4', desc: 'Fizjologiczny model stromej supresji wydzielania PTH wokół punktu równowagi.' },
    fhh: { label: 'FHH (Przesunięcie w prawo)', shift: 1.15, minSec: 5, color: '#dc2626', desc: 'Inaktywacja CaSR: krzywa przesunięta w prawo — do supresji PTH wymagany jest wyższy poziom Ca²⁺.' },
    cinacalcet: { label: 'Kalcymimetyk (Przesunięcie w lewo)', shift: 0.88, minSec: 5, color: '#16a34a', desc: 'Allosteryczna sensytyzacja CaSR: krzywa przesunięta w lewo — supresja następuje przy niższym Ca²⁺.' },
    adenoma: { label: 'Autonomizacja / Gruczolak', shift: 1.05, minSec: 35, color: '#d97706', desc: 'PHPT / gruczolak: podwyższone dolne plateau (brak pełnej supresji bazowej mimo hiperkalcemii).' },
  };

  const cur = conditionProfiles[condition];

  // Obliczenie względnej sekrecji PTH (% maksimum)
  const relativePth = useMemo(() => {
    const effectiveRatio = caRatio / cur.shift;
    const pth = cur.minSec + (relativeMax - cur.minSec) / (1 + Math.pow(effectiveRatio, hillCoeff));
    return Math.round(pth * 10) / 10;
  }, [caRatio, cur]);

  // Generowanie punktów krzywej SVG dla stosunku Ca: 0.75 do 1.25 (oś Y: 0 - 100%)
  const points = useMemo(() => {
    const pts: { x: number; y: number }[] = [];
    for (let r = 0.75; r <= 1.25; r += 0.01) {
      const effectiveRatio = r / cur.shift;
      const pth = cur.minSec + (relativeMax - cur.minSec) / (1 + Math.pow(effectiveRatio, hillCoeff));
      const px = 45 + ((r - 0.75) / 0.50) * 440;
      const py = 165 - 25 - (pth / 100) * 115;
      pts.push({ x: px, y: py });
    }
    return pts;
  }, [cur]);

  const curvePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ');

  // Punkt pracy
  const markerPx = 45 + ((caRatio - 0.75) / 0.50) * 440;
  const markerPy = 165 - 25 - (relativePth / 100) * 115;

  return (
    <div style={{ background: '#f5f3fa', border: '1px solid #dcd4f0', borderRadius: '12px', padding: '18px', margin: '20px 0' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
        <div>
          <span style={{ fontSize: '11px', fontWeight: 700, color: '#6d4ba4', letterSpacing: '0.05em' }}>
            MODEL BIOFIZYCZNY RECEPTORA CASR (RÓWNANIE HILLA)
          </span>
          <h4 style={{ margin: '2px 0 0', fontSize: '15px', color: '#2b1b4d' }}>
            Względna supresja PTH w funkcji stosunku Ca / Set-point (0–100% maksimum)
          </h4>
        </div>
        <span style={{ fontSize: '12px', fontWeight: 700, background: '#ede6fa', color: '#56338e', padding: '4px 10px', borderRadius: '6px' }}>
          Względna sekrecja PTH = {relativePth}% przy Ca / Set-point = {caRatio.toFixed(2)}
        </span>
      </div>

      {/* Przełączniki stanu klinicznego */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '8px', marginBottom: '14px' }}>
        {(['normal', 'fhh', 'cinacalcet', 'adenoma'] as const).map(id => (
          <button
            key={id}
            type="button"
            onClick={() => setCondition(id)}
            style={{
              padding: '6px 10px',
              borderRadius: '6px',
              border: '1px solid',
              borderColor: condition === id ? conditionProfiles[id].color : '#cbd5e1',
              background: condition === id ? conditionProfiles[id].color : '#fff',
              color: condition === id ? '#fff' : '#475569',
              fontWeight: 600,
              fontSize: '11px',
              cursor: 'pointer',
              textAlign: 'center',
            }}
          >
            {conditionProfiles[id].label}
          </button>
        ))}
      </div>

      {/* Suwak względnego stężenia Ca */}
      <div style={{ background: '#fff', border: '1px solid #dcd4f0', borderRadius: '8px', padding: '10px 14px', marginBottom: '14px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: 600, color: '#2b1b4d' }}>
          <span>Względne stężenie wapnia (Ca / Set-point):</span>
          <strong style={{ color: '#6d4ba4', fontSize: '14px' }}>{caRatio.toFixed(2)} × Set-point</strong>
        </div>
        <input
          type="range"
          min="0.75"
          max="1.25"
          step="0.01"
          value={caRatio}
          onChange={e => setCaRatio(Number(e.target.value))}
          style={{ width: '100%', marginTop: '6px' }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: '#6d4ba4' }}>
          <span>0,75 (Względna hipokalcemia)</span>
          <span>1,00 (Fizjologiczny Set-point)</span>
          <span>1,25 (Względna hiperkalcemia)</span>
        </div>
      </div>

      {/* Wykres funkcyjny sigmoidy Hilla */}
      <div style={{ background: '#fff', border: '1px solid #dcd4f0', borderRadius: '8px', padding: '10px' }}>
        <svg viewBox="0 0 510 170" style={{ width: '100%', display: 'block' }}>
          {/* Poziome linie siatki PTH (0%, 50%, 100%) */}
          {[0, 50, 100].map(val => {
            const y = 165 - 25 - (val / 100) * 115;
            return (
              <g key={val}>
                <line x1="45" y1={y} x2="485" y2={y} stroke="#f1f5f9" strokeDasharray="3 3" />
                <text x="38" y={y + 3} fill="#94a3b8" fontSize="9" textAnchor="end">{val}%</text>
              </g>
            );
          })}

          {/* Pionowa linia set-pointu dla aktualnego profilu */}
          <line
            x1={45 + ((cur.shift - 0.75) / 0.50) * 440}
            y1="15"
            x2={45 + ((cur.shift - 0.75) / 0.50) * 440}
            y2="140"
            stroke={cur.color}
            strokeDasharray="4 4"
            strokeWidth="1.5"
          />
          <text x={45 + ((cur.shift - 0.75) / 0.50) * 440} y="26" fill={cur.color} fontSize="10" fontWeight="700" textAnchor="middle">
            Set-point ({cur.shift.toFixed(2)})
          </text>

          {/* Krzywa sigmoidalna Hilla */}
          <path d={curvePath} fill="none" stroke={cur.color} strokeWidth="2.5" />

          {/* Punkt pracy */}
          <circle cx={markerPx} cy={markerPy} r="5" fill={cur.color} stroke="#fff" strokeWidth="2" />
          <text x={Math.min(460, markerPx + 8)} y={Math.max(25, markerPy - 6)} fill={cur.color} fontSize="10" fontWeight="700">
            Ca: {caRatio.toFixed(2)} ⟶ {relativePth}%
          </text>

          {/* Osie X i Y */}
          <line x1="45" y1="140" x2="485" y2="140" stroke="#475569" strokeWidth="1.5" />
          <line x1="45" y1="15" x2="45" y2="140" stroke="#475569" strokeWidth="1.5" />
          <text x="265" y="160" fill="#475569" fontSize="10" fontWeight="600" textAnchor="middle">Stosunek stężenia Ca do Set-pointu (bezwymiarowy)</text>
          <text x="14" y="80" fill="#475569" fontSize="10" fontWeight="600" transform="rotate(-90 14 80)" textAnchor="middle">Względna sekrecja PTH (% maks.)</text>
        </svg>
      </div>

      <div style={{ marginTop: '12px', fontSize: '12px', color: '#3b0764', lineHeight: '1.45', background: '#fdf4ff', padding: '10px 14px', borderRadius: '6px' }}>
        <strong>Zasada kooperatywności allosterycznej CaSR:</strong> Wysoka stromość krzywej supresji wokół indywidualnego set-pointu (szacowana w badaniach eksperymentalnych na nH ~ 3–4) odpowiada za czułą homeostazę mineralną. Należy jednak pamiętać, że parametry stromości, progi bezwzględne i stopień supresji minimalnej wykazują znaczną zmienność międzyosobniczą i zależą m.in. od masy tkanki przytarczycowej oraz gospodarki witaminą D.
      </div>
    </div>
  );
}

// ============================================================================
// 2. BONE MINERALIZATION KINETICS & QTC BAZETT VS FRIDERICIA
// ============================================================================
export function BoneKineticsEkgChart() {
  const [heartRateBpm, setHeartRateBpm] = useState(95); // 50 do 130/min
  const [measuredQtMs, setMeasuredQtMs] = useState(440); // 320 do 550 ms

  const rrSeconds = 60 / heartRateBpm;
  const qtcBazett = Math.round(measuredQtMs / Math.sqrt(rrSeconds));
  const qtcFridericia = Math.round(measuredQtMs / Math.cbrt(rrSeconds));

  const isTachycardia = heartRateBpm > 85;
  const bazettOverestimated = isTachycardia && qtcBazett - qtcFridericia > 15;

  return (
    <div style={{ background: '#fcfaf8', border: '1px solid #e7d8c9', borderRadius: '12px', padding: '18px', margin: '20px 0' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
        <div>
          <span style={{ fontSize: '11px', fontWeight: 700, color: '#9a3412', letterSpacing: '0.05em' }}>
            BIOFIZYKA ELEKTROKARDIOGRAFICZNA W HIPOKALCEMII
          </span>
          <h4 style={{ margin: '2px 0 0', fontSize: '15px', color: '#431407' }}>
            Korekcja odstępu QT: Wzór Bazetta vs Wzór Fridericia przy tachykardii
          </h4>
        </div>
      </div>

      {/* Suwaki HR i QT */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px', marginBottom: '16px' }}>
        <div style={{ background: '#fff', border: '1px solid #fed7aa', borderRadius: '8px', padding: '10px 14px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: 600, color: '#431407' }}>
            <span>Częstość rytmu serca (HR):</span>
            <strong style={{ color: '#ea580c' }}>{heartRateBpm} /min (RR = {rrSeconds.toFixed(2)} s)</strong>
          </div>
          <input
            type="range"
            min="50"
            max="130"
            step="5"
            value={heartRateBpm}
            onChange={e => setHeartRateBpm(Number(e.target.value))}
            style={{ width: '100%', marginTop: '6px' }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: '#9a3412' }}>
            <span>50/min (bradykardia)</span>
            <span>75/min (norma)</span>
            <span>130/min (tachykardia)</span>
          </div>
        </div>

        <div style={{ background: '#fff', border: '1px solid #fed7aa', borderRadius: '8px', padding: '10px 14px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: 600, color: '#431407' }}>
            <span>Zmierzony odstęp QT w EKG:</span>
            <strong style={{ color: '#ea580c' }}>{measuredQtMs} ms</strong>
          </div>
          <input
            type="range"
            min="320"
            max="520"
            step="10"
            value={measuredQtMs}
            onChange={e => setMeasuredQtMs(Number(e.target.value))}
            style={{ width: '100%', marginTop: '6px' }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: '#9a3412' }}>
            <span>320 ms</span>
            <span>400 ms (fizjologia)</span>
            <span>520 ms (znaczne wydłużenie QT)</span>
          </div>
        </div>
      </div>

      {/* Porównanie wyników obu wzorów */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px', marginBottom: '14px' }}>
        <div style={{ background: '#fff', border: '1px solid #fed7aa', borderRadius: '8px', padding: '14px' }}>
          <div style={{ fontSize: '11px', fontWeight: 700, color: '#9a3412', textTransform: 'uppercase' }}>
            Wzór Bazetta (QTc = QT / √RR)
          </div>
          <div style={{ fontSize: '20px', fontWeight: 700, color: qtcBazett > 460 ? '#dc2626' : '#15803d', marginTop: '4px' }}>
            {qtcBazett} ms
          </div>
          <div style={{ fontSize: '11px', color: '#7c2d12', marginTop: '4px' }}>
            Interpretuj względem rytmu, QRS, leków i elektrolitów
          </div>
        </div>

        <div style={{ background: '#fff', border: '1px solid #fed7aa', borderRadius: '8px', padding: '14px' }}>
          <div style={{ fontSize: '11px', fontWeight: 700, color: '#9a3412', textTransform: 'uppercase' }}>
            Wzór Fridericia (QTc = QT / ∛RR)
          </div>
          <div style={{ fontSize: '20px', fontWeight: 700, color: qtcFridericia > 460 ? '#dc2626' : '#15803d', marginTop: '4px' }}>
            {qtcFridericia} ms
          </div>
          <div style={{ fontSize: '11px', color: '#7c2d12', marginTop: '4px' }}>
            {bazettOverestimated ? `Różnica: Bazett zawyża o ${qtcBazett - qtcFridericia} ms!` : 'Korekcja sześcienna (Fridericia)'}
          </div>
        </div>
      </div>

      <div style={{ fontSize: '12px', color: '#78350f', background: '#fef3c7', padding: '10px 14px', borderRadius: '6px', lineHeight: '1.45' }}>
        <strong>Wskazówka kardiologiczna w tężyczce:</strong> Hipokalcemia z wydłużeniem fazy plateau (faza 2 potencjału czynnościowego kardiomiocytów) często współistnieje z pobudzeniem układu współczulnego i tachykardią (HR &gt; 90/min). <strong>Wzór Bazetta drastycznie przeszacowuje QTc przy tachykardii</strong>, co może prowadzić do fałszywych alarmów. W tachykardii zaleca się stosowanie wzorów o mniejszej podatności na błąd nieliniowości, takich jak wzór Fridericia lub Framingham.
      </div>
    </div>
  );
}
