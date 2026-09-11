'use client';
import { useState, useMemo } from 'react';
import { Sliders, Activity, Heart, ShieldAlert, Sparkles, CheckCircle2 } from 'lucide-react';

// ============================================================================
// 1. CASR HILL EQUATION INTERACTIVE CURVE
// ============================================================================
export function CasrHillCurveChart() {
  const [ionizedCaMmol, setIonizedCaMmol] = useState(1.22); // Zakres: 0.8 do 1.7 mmol/L
  const [condition, setCondition] = useState<'normal' | 'fhh' | 'cinacalcet'>('normal');

  const pthMax = 120.0;
  const pthMin = 5.0;
  const hillCoeff = 3.8; // Wysoka kooperatywność receptora CaSR

  const ec50Map = {
    normal: 1.21,
    fhh: 1.38, // Przesunięcie w prawo (oporność CaSR)
    cinacalcet: 1.12, // Przesunięcie w lewo (sensytyzacja allosteryczna)
  };

  const ec50 = ec50Map[condition];

  // Obliczenie PTH wg równania Hilla
  const currentPth = useMemo(() => {
    const ratio = ionizedCaMmol / ec50;
    const pth = pthMin + (pthMax - pthMin) / (1 + Math.pow(ratio, hillCoeff));
    return Math.round(pth * 10) / 10;
  }, [ionizedCaMmol, ec50]);

  // Generowanie punktów krzywej SVG dla Ca: 0.8 do 1.7 mmol/L
  const points = useMemo(() => {
    const pts: { x: number; y: number }[] = [];
    for (let ca = 0.8; ca <= 1.7; ca += 0.02) {
      const ratio = ca / ec50;
      const pth = pthMin + (pthMax - pthMin) / (1 + Math.pow(ratio, hillCoeff));
      const px = 45 + ((ca - 0.8) / 0.9) * 440;
      const py = 165 - 25 - (pth / 130) * 120;
      pts.push({ x: px, y: py });
    }
    return pts;
  }, [ec50]);

  const curvePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ');

  // Punkt pracy pacjenta
  const patientPx = 45 + ((ionizedCaMmol - 0.8) / 0.9) * 440;
  const patientPy = 165 - 25 - (currentPth / 130) * 120;

  return (
    <div style={{ background: '#f5f3fa', border: '1px solid #dcd4f0', borderRadius: '12px', padding: '18px', margin: '20px 0' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
        <div>
          <span style={{ fontSize: '11px', fontWeight: 700, color: '#6d4ba4', letterSpacing: '0.05em' }}>
            MODEL BIOFIZYCZNY RECEPTORA CASR (RÓWNANIE HILLA)
          </span>
          <h4 style={{ margin: '2px 0 0', fontSize: '15px', color: '#2b1b4d' }}>
            Sigmoidalna krzywa supresji PTH przez wapń zjonizowany (nH = 3,8)
          </h4>
        </div>
        <span style={{ fontSize: '12px', fontWeight: 700, background: '#ede6fa', color: '#56338e', padding: '4px 10px', borderRadius: '6px' }}>
          PTH = {currentPth} pg/ml przy Ca2+ = {ionizedCaMmol.toFixed(2)} mmol/l
        </span>
      </div>

      {/* Przełączniki stanu klinicznego */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '8px', marginBottom: '14px' }}>
        {[
          { id: 'normal', label: 'Fizjologia (EC50 = 1,21)', color: '#6d4ba4' },
          { id: 'fhh', label: 'FHH (Przesunięcie w prawo EC50 = 1,38)', color: '#dc2626' },
          { id: 'cinacalcet', label: 'Cynakalcet (Przesunięcie w lewo EC50 = 1,12)', color: '#16a34a' },
        ].map(item => (
          <button
            key={item.id}
            type="button"
            onClick={() => setCondition(item.id as any)}
            style={{
              padding: '6px 10px',
              borderRadius: '6px',
              border: '1px solid',
              borderColor: condition === item.id ? item.color : '#cbd5e1',
              background: condition === item.id ? item.color : '#fff',
              color: condition === item.id ? '#fff' : '#475569',
              fontWeight: 600,
              fontSize: '11px',
              cursor: 'pointer',
              textAlign: 'center',
            }}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Suwak stężenia Ca2+ */}
      <div style={{ background: '#fff', border: '1px solid #dcd4f0', borderRadius: '8px', padding: '10px 14px', marginBottom: '14px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: 600, color: '#2b1b4d' }}>
          <span>Wapń zjonizowany w surowicy [Ca2+]:</span>
          <strong style={{ color: '#6d4ba4', fontSize: '14px' }}>{ionizedCaMmol.toFixed(2)} mmol/L</strong>
        </div>
        <input
          type="range"
          min="0.80"
          max="1.70"
          step="0.02"
          value={ionizedCaMmol}
          onChange={e => setIonizedCaMmol(Number(e.target.value))}
          style={{ width: '100%', marginTop: '6px' }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: '#6d4ba4' }}>
          <span>0,80 (Ciężka hipokalcemia)</span>
          <span>1,15–1,32 (Normokalcemia)</span>
          <span>1,70 (Kryza hiperkalcemiczna)</span>
        </div>
      </div>

      {/* Wykres funkcyjny sigmoidy Hilla */}
      <div style={{ background: '#fff', border: '1px solid #dcd4f0', borderRadius: '8px', padding: '10px' }}>
        <svg viewBox="0 0 510 170" style={{ width: '100%', display: 'block' }}>
          {/* Zakres normy wapnia zjonizowanego (1.15 - 1.32 mmol/L) */}
          <rect
            x={45 + ((1.15 - 0.8) / 0.9) * 440}
            y="15"
            width={((1.32 - 1.15) / 0.9) * 440}
            height="125"
            fill="#ede6fa"
            opacity="0.6"
          />

          {/* Poziome linie siatki PTH */}
          {[15, 65, 120].map(val => {
            const y = 165 - 25 - (val / 130) * 120;
            return (
              <g key={val}>
                <line x1="45" y1={y} x2="485" y2={y} stroke="#f1f5f9" strokeDasharray="3 3" />
                <text x="38" y={y + 3} fill="#94a3b8" fontSize="9" textAnchor="end">{val}</text>
              </g>
            );
          })}

          {/* Pionowa linia set-pointu EC50 */}
          <line
            x1={45 + ((ec50 - 0.8) / 0.9) * 440}
            y1="15"
            x2={45 + ((ec50 - 0.8) / 0.9) * 440}
            y2="140"
            stroke="#9333ea"
            strokeDasharray="4 4"
            strokeWidth="1.5"
          />
          <text x={45 + ((ec50 - 0.8) / 0.9) * 440} y="26" fill="#9333ea" fontSize="10" fontWeight="700" textAnchor="middle">
            Set-point (EC50 = {ec50})
          </text>

          {/* Krzywa sigmoidalna Hilla */}
          <path d={curvePath} fill="none" stroke="#6d4ba4" strokeWidth="2.5" />

          {/* Punkt pacjenta */}
          <circle cx={patientPx} cy={patientPy} r="5" fill="#7c3aed" stroke="#fff" strokeWidth="2" />
          <text x={Math.min(460, patientPx + 8)} y={Math.max(25, patientPy - 6)} fill="#5b21b6" fontSize="10" fontWeight="700">
            Ca2+: {ionizedCaMmol.toFixed(2)} ⟶ PTH: {currentPth}
          </text>

          {/* Osie X i Y */}
          <line x1="45" y1="140" x2="485" y2="140" stroke="#475569" strokeWidth="1.5" />
          <line x1="45" y1="15" x2="45" y2="140" stroke="#475569" strokeWidth="1.5" />
          <text x="265" y="160" fill="#475569" fontSize="10" fontWeight="600" textAnchor="middle">Wapń zjonizowany [Ca2+] (mmol/L)</text>
          <text x="14" y="80" fill="#475569" fontSize="10" fontWeight="600" transform="rotate(-90 14 80)" textAnchor="middle">PTH (pg/ml)</text>
        </svg>
      </div>

      <div style={{ marginTop: '12px', fontSize: '12px', color: '#3b0764', lineHeight: '1.45', background: '#fdf4ff', padding: '10px 14px', borderRadius: '6px' }}>
        <strong>Znaczenie współczynnika Hilla nH = 3,8:</strong> Bardzo wysoka kooperatywność allosteryczna sprawia, że krzywa jest niezwykle stroma w fizjologicznym oknie stężeń (1,15–1,30 mmol/L). Wahanie stężenia wapnia zaledwie o <strong>0,05 mmol/L</strong> skutkuje aż <strong>400-procentową zmianą tempa wydzielania PTH</strong>, co czyni z przytarczyc precyzyjny termostat homeostazy mineralnej.
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
            <span>520 ms (ciężka hipokalcemia)</span>
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
            {qtcBazett > 460 ? '⚠️ Ryzyko Torsade de Pointes' : 'W normie'}
          </div>
        </div>

        <div style={{ background: '#fff', border: '1px solid #fed7aa', borderRadius: '8px', padding: '14px' }}>
          <div style={{ fontSize: '11px', fontWeight: 700, color: '#9a3412', textTransform: 'uppercase' }}>
            Wzór Fridericia (QTc = QT / ∛RR) — ZALECANY
          </div>
          <div style={{ fontSize: '20px', fontWeight: 700, color: qtcFridericia > 460 ? '#dc2626' : '#15803d', marginTop: '4px' }}>
            {qtcFridericia} ms
          </div>
          <div style={{ fontSize: '11px', color: '#7c2d12', marginTop: '4px' }}>
            {bazettOverestimated ? `Różnica: Bazett zawyża o ${qtcBazett - qtcFridericia} ms!` : 'Dokładna korekcja'}
          </div>
        </div>
      </div>

      <div style={{ fontSize: '12px', color: '#78350f', background: '#fef3c7', padding: '10px 14px', borderRadius: '6px', lineHeight: '1.45' }}>
        <strong>Wskazówka kardiologiczna w tężyczce:</strong> Hipokalcemia z wydłużeniem fazy plateau (faza 2 potencjału czynnościowego kardiomiocytów) często współistnieje z pobudzeniem układu współczulnego i tachykardią (HR &gt; 90/min). <strong>Wzór Bazetta drastycznie przeszacowuje QTc przy tachykardii</strong>, co może prowadzić do fałszywych alarmów. Polskie Towarzystwo Kardiologiczne i wytyczne ESE zalecają stosowanie wzoru Fridericia (z pierwiastkiem trzeciego stopnia).
      </div>
    </div>
  );
}
