'use client';
import { AccumulationChart } from './accumulation-chart';
import { useState, useMemo } from 'react';
import { Sliders, Activity, Sparkles, ArrowRight, ShieldAlert, CheckCircle2 } from 'lucide-react';

// ============================================================================
// 1. T4 TWO-COMPARTMENT & STEADY-STATE PHARMACOKINETICS CHART
// ============================================================================
export function T4TwoCompartmentChart(){return <AccumulationChart/>;}

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
