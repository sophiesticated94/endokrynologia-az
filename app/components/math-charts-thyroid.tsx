'use client';
import { useState, useMemo } from 'react';
import { Sliders, Activity, Sparkles, ArrowRight, ShieldAlert, CheckCircle2 } from 'lucide-react';

// ============================================================================
// 1. T4 TWO-COMPARTMENT & STEADY-STATE PHARMACOKINETICS CHART
// ============================================================================
export function T4TwoCompartmentChart() {
  const [halfLifeDays, setHalfLifeDays] = useState(7); // 3 (nadczynność) do 10 (niedoczynność)
  const [dailyDoseMcg, setDailyDoseMcg] = useState(100); // 50 do 200 µg

  // Parametry modelu farmakokinetycznego:
  // Vd ≈ 12 L, F ≈ 0.75 (biodostępność)
  const vd = 12.0;
  const bioavailability = 0.75;
  const ke = Math.log(2) / halfLifeDays; // stała eliminacji na dobę
  const css = (bioavailability * dailyDoseMcg) / (vd * ke * 1.0) / 10; // umowne pmol/L
  const roundedCss = Math.round(css * 10) / 10;
  const timeTo95PctDays = Math.round(4.3 * halfLifeDays);

  // Punkty wykresu dla 56 dni (8 tygodni)
  const points = useMemo(() => {
    const pts: { x: number; y: number; c: number }[] = [];
    const totalDays = 56;
    const width = 500;
    const height = 220;
    const maxConc = 30; // skala Y: 0 do 30 pmol/L

    for (let day = 0; day <= totalDays; day += 0.5) {
      const conc = css * (1 - Math.exp(-ke * day));
      const px = 45 + (day / totalDays) * (width - 60);
      const py = height - 25 - (Math.min(conc, maxConc) / maxConc) * (height - 50);
      pts.push({ x: px, y: py, c: conc });
    }
    return pts;
  }, [css, ke]);

  const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ');

  return (
    <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '12px', padding: '18px', margin: '20px 0' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
        <div>
          <span style={{ fontSize: '11px', fontWeight: 700, color: '#0369a1', letterSpacing: '0.05em' }}>
            INTERAKTYWNY WYKRES FUNKCYJNY KINETYKI T4
          </span>
          <h4 style={{ margin: '2px 0 0', fontSize: '15px', color: '#0f172a' }}>
            Krzywa kumulacji lewotyroksyny do stanu stacjonarnego $C(t) = C_ss(1 - e^{'{ -k_e t }'})$
          </h4>
        </div>
        <span style={{ fontSize: '12px', fontWeight: 600, background: '#e0f2fe', color: '#0369a1', padding: '4px 10px', borderRadius: '6px' }}>
          t1/2 = {halfLifeDays} dni | Css = {roundedCss} pmol/l
        </span>
      </div>

      {/* Suwaki sterujące modelem */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px', marginBottom: '16px' }}>
        <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '10px 14px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: 600, color: '#334155' }}>
            <span>Okres półtrwania (t1/2):</span>
            <strong style={{ color: '#0284c7' }}>{halfLifeDays} dni</strong>
          </div>
          <input
            type="range"
            min="3"
            max="11"
            step="1"
            value={halfLifeDays}
            onChange={e => setHalfLifeDays(Number(e.target.value))}
            style={{ width: '100%', marginTop: '6px' }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: '#64748b' }}>
            <span>3d (Nadczynność)</span>
            <span>7d (Eutyreoza)</span>
            <span>10d (Niedoczynność)</span>
          </div>
        </div>

        <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '10px 14px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: 600, color: '#334155' }}>
            <span>Dawka dobowa (D):</span>
            <strong style={{ color: '#0284c7' }}>{dailyDoseMcg} µg/d</strong>
          </div>
          <input
            type="range"
            min="25"
            max="200"
            step="25"
            value={dailyDoseMcg}
            onChange={e => setDailyDoseMcg(Number(e.target.value))}
            style={{ width: '100%', marginTop: '6px' }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: '#64748b' }}>
            <span>25 µg</span>
            <span>100 µg</span>
            <span>200 µg</span>
          </div>
        </div>
      </div>

      {/* Wykres SVG */}
      <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '10px', overflowX: 'auto' }}>
        <svg viewBox="0 0 520 230" style={{ width: '100%', minWidth: '450px', display: 'block' }}>
          {/* Zakres referencyjny FT4 (12-22 pmol/L) */}
          <rect x="45" y={220 - 25 - (22 / 30) * 170} width="440" height={(10 / 30) * 170} fill="#dcfce7" opacity="0.6" />
          <text x="475" y={220 - 25 - (17 / 30) * 170} fill="#15803d" fontSize="10" fontWeight="600" textAnchor="end">
            Okno eutyreozy (12–22 pmol/L)
          </text>

          {/* Poziome linie siatki */}
          {[0, 10, 20, 30].map(val => {
            const y = 220 - 25 - (val / 30) * 170;
            return (
              <g key={val}>
                <line x1="45" y1={y} x2="485" y2={y} stroke="#e2e8f0" strokeDasharray="3 3" />
                <text x="38" y={y + 3} fill="#64748b" fontSize="10" textAnchor="end">{val}</text>
              </g>
            );
          })}

          {/* Pionowe linie siatki (tygodnie 1 do 8) */}
          {[1, 2, 3, 4, 5, 6, 7, 8].map(w => {
            const x = 45 + ((w * 7) / 56) * 440;
            return (
              <g key={w}>
                <line x1={x} y1="20" x2={x} y2="195" stroke="#f1f5f9" />
                <text x={x} y="210" fill="#64748b" fontSize="10" textAnchor="middle">{w} tyg</text>
              </g>
            );
          })}

          {/* Asymptota Css */}
          {css <= 30 && (
            <g>
              <line
                x1="45"
                y1={220 - 25 - (css / 30) * 170}
                x2="485"
                y2={220 - 25 - (css / 30) * 170}
                stroke="#0284c7"
                strokeDasharray="4 4"
                strokeWidth="1.5"
              />
              <text x="480" y={220 - 25 - (css / 30) * 170 - 4} fill="#0284c7" fontSize="10" fontWeight="700" textAnchor="end">
                Css = {roundedCss} pmol/L
              </text>
            </g>
          )}

          {/* Znacznik osiągnięcia 95% Css */}
          <line
            x1={45 + (timeTo95PctDays / 56) * 440}
            y1="20"
            x2={45 + (timeTo95PctDays / 56) * 440}
            y2="195"
            stroke="#e11d48"
            strokeWidth="1.5"
            strokeDasharray="2 2"
          />
          <text x={45 + (timeTo95PctDays / 56) * 440} y="32" fill="#e11d48" fontSize="9" fontWeight="700" textAnchor="middle">
            ~95% Css ({timeTo95PctDays} dni)
          </text>

          {/* Krzywa funkcyjna */}
          <path d={pathD} fill="none" stroke="#0369a1" strokeWidth="2.5" strokeLinecap="round" />

          {/* Osie X i Y */}
          <line x1="45" y1="195" x2="485" y2="195" stroke="#475569" strokeWidth="1.5" />
          <line x1="45" y1="20" x2="45" y2="195" stroke="#475569" strokeWidth="1.5" />
          <text x="265" y="226" fill="#334155" fontSize="11" fontWeight="600" textAnchor="middle">Czas substytucji LT4 (dni)</text>
          <text x="18" y="110" fill="#334155" fontSize="11" fontWeight="600" transform="rotate(-90 18 110)" textAnchor="middle">FT4 (pmol/L)</text>
        </svg>
      </div>

      <div style={{ marginTop: '12px', fontSize: '12px', color: '#475569', lineHeight: '1.45', background: '#f1f5f9', padding: '8px 12px', borderRadius: '6px' }}>
        <strong>Wniosek kliniczny:</strong> Przy t1/2 = {halfLifeDays} dni pełen stan stacjonarny (4–5 × t1/2) osiągany jest po <strong>{timeTo95PctDays} dniach ({Math.round(timeTo95PctDays / 7)} tyg.)</strong>. Dlatego kontrolę laboratoryjną TSH wykonuje się optymalnie po 6–8 tygodniach, a zbyt wczesne pobranie krwi (np. po 2 tyg.) zafałszuje obraz rzeczywistego stężenia stacjonarnego.
      </div>
    </div>
  );
}

// ============================================================================
// 2. SELENOCYSTEINE DEIODINASE CATALYTIC MECHANISM SCHEME
// ============================================================================
export function DeiodinaseCatalyticCycle() {
  const [step, setStep] = useState(1);

  const stepDetails = [
    {
      title: 'Etap 1: Wiązanie substratu T4 w centrum aktywnym',
      mechanism: 'Reszta selenocysteiny (Sec, U) posiada grupę selenolanową (-Se^-) o pKa = 5,2 (zjonizowana w pH 7,4).',
      formula: 'Enzym-[Se^-] + Tyroksyna (T4) ⟶ Kompleks Enzym-Substrat [E-Se^- · T4]',
      badge: 'Jonizacja Sec w pH fizjologicznym',
    },
    {
      title: 'Etap 2: Atak nukleofilowy i odszczepienie jodu 5\'',
      mechanism: 'Selenolan atakuje atom jodu w pozycji 5\' pierścienia zewnętrznego, odrywając jon jodkowy i tworząc aktywną T3.',
      formula: '[E-Se^- · T4] ⟶ E-[Se-I] (monojodoselenek) + 3,5,3\'-Trójjodotyronina (T3)',
      badge: 'Konwersja prohormonu T4 do aktywnego T3',
    },
    {
      title: 'Etap 3: Redukcja tiolowa i regeneracja enzymu',
      mechanism: 'Zredukowany glutation (GSH) lub tioredoksyna rozrywa wiązanie Se-I, uwalniając jod i regenerując aktywny selenolan.',
      formula: 'E-[Se-I] + 2 R-SH (tioredoksyna) ⟶ E-[Se^-] + I^- + R-S-S-R + 2 H^+',
      badge: 'Zależność od reduktorów komórkowych',
    },
  ];

  const current = stepDetails[step - 1];

  return (
    <div style={{ background: '#fcfaf8', border: '1px solid #e7d8c9', borderRadius: '12px', padding: '18px', margin: '20px 0' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
        <div>
          <span style={{ fontSize: '11px', fontWeight: 700, color: '#9a3412', letterSpacing: '0.05em' }}>
            CHEMIA ENZYMÓW SELENOWYCH
          </span>
          <h4 style={{ margin: '2px 0 0', fontSize: '15px', color: '#431407' }}>
            Cykl katalityczny dejodynaz (DIO1/DIO2): Centrum selenocysteiny (Sec, U)
          </h4>
        </div>
        <div style={{ display: 'flex', gap: '6px' }}>
          {[1, 2, 3].map(s => (
            <button
              key={s}
              type="button"
              onClick={() => setStep(s)}
              style={{
                padding: '4px 10px',
                borderRadius: '6px',
                border: '1px solid',
                borderColor: step === s ? '#c2410c' : '#fed7aa',
                background: step === s ? '#c2410c' : '#fff',
                color: step === s ? '#fff' : '#7c2d12',
                fontWeight: 600,
                fontSize: '12px',
                cursor: 'pointer',
              }}
            >
              Krok {s}
            </button>
          ))}
        </div>
      </div>

      <div style={{ background: '#fff', border: '1px solid #fed7aa', borderRadius: '8px', padding: '14px', marginBottom: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
          <span style={{ fontSize: '12px', fontWeight: 700, color: '#c2410c', background: '#ffedd5', padding: '2px 8px', borderRadius: '4px' }}>
            {current.badge}
          </span>
          <strong style={{ fontSize: '14px', color: '#431407' }}>{current.title}</strong>
        </div>
        <p style={{ margin: '4px 0 10px', fontSize: '13px', color: '#7c2d12', lineHeight: '1.45' }}>
          {current.mechanism}
        </p>

        <div style={{ fontFamily: 'monospace', fontSize: '13px', background: '#fff7ed', border: '1px solid #ffedd5', padding: '8px 12px', borderRadius: '6px', color: '#9a3412', fontWeight: 600 }}>
          {current.formula}
        </div>
      </div>

      <div style={{ fontSize: '12px', color: '#78350f', background: '#fef3c7', padding: '8px 12px', borderRadius: '6px', lineHeight: '1.4' }}>
        <strong>Dlaczego selen, a nie siarka?</strong> Selenocysteina (Sec) ma pKa = 5,2, dzięki czemu w fizjologicznym pH 7,4 niemal 100% enzymu występuje w reaktywnej formie anionu selenolanowego (-Se^-). Zwykła cysteina (pKa = 8,3) w pH 7,4 jest w 90% sprotonowana i niezdolna do tak szybkiego nukleofilowego ataku na atom jodu.
      </div>
    </div>
  );
}
