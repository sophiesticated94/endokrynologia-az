'use client';
import { ThyroidWorkbench, WaterWorkbench, MechanismWorkbench } from './physiology-workbench';
import { useState, useMemo } from 'react';
import { Calculator, Atom, Activity, Droplets, Info, AlertTriangle, CheckCircle2 } from 'lucide-react';

// ============================================================================
// 1. SPINA-GT / SPINA-GD THYROID FEEDBACK CALCULATOR
// ============================================================================
export function SpinaThyroidCalculator() { return <ThyroidWorkbench/>; }

export function TpoMolecularMechanism() {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  const stepsData = {
    1: {
      title: 'Krok 1: Aktywacja hemu TPO przez nadtlenek wodoru',
      desc: 'Żelazo hemowe na III stopniu utlenienia Fe(III) ulega 2-elektronowemu utlenieniu przez H2O2 generowany przez DUOX2. Powstaje wysoce reaktywny kationorodnik ferrylo-okso [Fe(IV)=O]+• (tzw. Compound I).',
      formula: 'TPO-Fe(III) + H2O2 ⟶ [TPO-Fe(IV)=O]+• (Compound I) + H2O',
      badge: 'Hem protoporfirynowy IX',
    },
    2: {
      title: 'Krok 2: Utlenienie anionu jodkowego (I-) do postaci elektrofilowej',
      desc: 'Compound I utlenia jon jodkowy I-, redukując się do Compound II lub z powrotem do Fe(III). Generowany jest elektrofilowy kation jodanowy (I+) lub rodnik jodu (I•), zdolny do ataku na pierścień aromatyczny tyrozyny.',
      formula: '[TPO-Fe(IV)=O]+• + I- ⟶ TPO-Fe(III) + [IO]- / I•',
      badge: 'Utlenienie 2-elektronowe',
    },
    3: {
      title: 'Krok 3: Organifikacja — podstawienie elektrofilowe na tyreoglobulinie (Tg)',
      desc: 'Jodowanie w pozycjach orto do grupy fenolowej reszt tyrozynowych: powstaje monojodotyrozyna (MIT, w pozycji C-3) oraz dijodotyrozyna (DIT, w pozycjach C-3 i C-5).',
      formula: 'Tg-Tyr + I+ ⟶ Tg-MIT + H+ ; Tg-MIT + I+ ⟶ Tg-DIT + H+',
      badge: 'Substytucja elektrofilowa',
    },
    4: {
      title: 'Krok 4: Sprzęganie rodnikowe i stereochemia eteru difenylowego (120°)',
      desc: 'Utlenione reszty DIT i MIT tworzą rodniki fenoksylowe. Dochodzi do addycji rodnikowej z eliminacją łańcucha bocznego alaniny (jako dehydroalanina). Wiązanie eterowe C-O-C wymusza prostopadłe ułożenie pierścieni aromatycznych pod kątem ~120°.',
      formula: 'DIT• + DIT• ⟶ Tyroksyna (T4) + Tg-dehydroalanina',
      badge: 'Kąt dwuścienny ~120°',
    },
  };

  const cur = stepsData[step];

  return (
    <div style={{ background: '#fdfcfb', border: '1px solid #fed7aa', borderRadius: '12px', padding: '18px', margin: '14px 0' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: '#c2410c' }}>
        <Atom size={20} />
        <h4 style={{ margin: 0, fontSize: '15px' }}>Mechanizm Molekularny TPO i Stereochemia Sprzęgania Fenoli</h4>
      </div>

      {/* Pasek wyboru kroków */}
      <div style={{ display: 'flex', gap: '6px', marginBottom: '14px', flexWrap: 'wrap' }}>
        {([1, 2, 3, 4] as const).map(s => (
          <button
            key={s}
            type="button"
            className={step === s ? 'primary' : 'secondary'}
            onClick={() => setStep(s)}
            style={{ fontSize: '12px', padding: '6px 12px' }}
          >
            Etap {s}
          </button>
        ))}
      </div>

      <div style={{ background: '#ffffff', border: '1px solid #ffedd5', borderRadius: '8px', padding: '14px', marginBottom: '12px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
          <strong style={{ fontSize: '13px', color: '#9a3412' }}>{cur.title}</strong>
          <span style={{ fontSize: '11px', background: '#ffedd5', color: '#c2410c', padding: '2px 8px', borderRadius: '6px', fontWeight: 'bold' }}>
            {cur.badge}
          </span>
        </div>
        <p style={{ fontSize: '12px', color: '#4b5563', margin: '0 0 8px' }}>{cur.desc}</p>
        <div style={{ background: '#f8fafc', padding: '8px 12px', borderRadius: '6px', fontFamily: 'monospace', fontSize: '12px', color: '#0f172a' }}>
          {cur.formula}
        </div>
      </div>

      {/* Wizualizacja wektorowa SVG mechanizmu */}
      <svg viewBox="0 0 600 130" style={{ width: '100%', height: 'auto', background: '#fff', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
        {step === 1 && (
          <g>
            <rect x="40" y="35" width="130" height="60" rx="8" fill="#fee2e2" stroke="#ef4444" strokeWidth="2" />
            <text x="105" y="62" textAnchor="middle" fontWeight="bold" fill="#991b1b" fontSize="12">TPO [Fe³⁺]</text>
            <text x="105" y="80" textAnchor="middle" fill="#7f1d1d" fontSize="10">Stan spoczynkowy</text>
            <path d="M 180 65 L 250 65" stroke="#ea580c" strokeWidth="2.5" markerEnd="url(#arrow)" />
            <text x="215" y="55" textAnchor="middle" fill="#ea580c" fontSize="11" fontWeight="bold">+ H₂O₂ (DUOX2)</text>
            <rect x="260" y="35" width="200" height="60" rx="8" fill="#ffedd5" stroke="#f97316" strokeWidth="2" />
            <text x="360" y="62" textAnchor="middle" fontWeight="bold" fill="#9a3412" fontSize="12">[Fe⁴⁺=O]⁺• (Compound I)</text>
            <text x="360" y="80" textAnchor="middle" fill="#7c2d12" fontSize="10">Kationorodnik ferrylu</text>
          </g>
        )}
        {step === 2 && (
          <g>
            <circle cx="90" cy="65" r="30" fill="#fef3c7" stroke="#d97706" strokeWidth="2" />
            <text x="90" y="70" textAnchor="middle" fontWeight="bold" fill="#92400e" fontSize="14">I⁻ (NIS)</text>
            <path d="M 130 65 L 220 65" stroke="#d97706" strokeWidth="2.5" />
            <text x="175" y="55" textAnchor="middle" fill="#b45309" fontSize="11" fontWeight="bold">Utlenienie przez Cpd I</text>
            <rect x="230" y="35" width="180" height="60" rx="8" fill="#eff6ff" stroke="#3b8266" strokeWidth="2" />
            <text x="320" y="62" textAnchor="middle" fontWeight="bold" fill="#166534" fontSize="12">Jod elektrofilowy [I⁺] / I•</text>
            <text x="320" y="80" textAnchor="middle" fill="#14532d" fontSize="10">Zdolny do organifikacji</text>
          </g>
        )}
        {step === 3 && (
          <g>
            <rect x="30" y="30" width="160" height="70" rx="6" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.5" />
            <text x="110" y="55" textAnchor="middle" fontWeight="bold" fill="#166534" fontSize="12">Reszta Tyrozyny</text>
            <text x="110" y="75" textAnchor="middle" fill="#15803d" fontSize="10">Łańcuch tyreoglobuliny</text>
            <path d="M 200 65 L 260 65" stroke="#16a34a" strokeWidth="2" />
            <text x="230" y="55" textAnchor="middle" fill="#15803d" fontSize="11">+ I⁺</text>
            <rect x="270" y="30" width="140" height="70" rx="6" fill="#fef2f2" stroke="#dc2626" strokeWidth="1.5" />
            <text x="340" y="55" textAnchor="middle" fontWeight="bold" fill="#991b1b" fontSize="12">Tg-MIT (3-jodotyrozyna)</text>
            <text x="340" y="75" textAnchor="middle" fill="#7f1d1d" fontSize="10">+ Dalsza addycja ⟶ DIT</text>
          </g>
        )}
        {step === 4 && (
          <g>
            <rect x="20" y="25" width="170" height="80" rx="6" fill="#f8fafc" stroke="#64748b" strokeWidth="1.5" />
            <text x="105" y="50" textAnchor="middle" fontWeight="bold" fill="#0f172a" fontSize="11">Pierścień wewnętrzny</text>
            <text x="105" y="70" textAnchor="middle" fill="#475569" fontSize="10">DIT (pozycje 3,5)</text>
            <path d="M 195 65 L 260 45" stroke="#ea580c" strokeWidth="3" />
            <text x="230" y="35" textAnchor="middle" fill="#ea580c" fontSize="11" fontWeight="bold">~120° (O-mostek)</text>
            <rect x="260" y="25" width="180" height="80" rx="6" fill="#fff7ed" stroke="#f97316" strokeWidth="2" />
            <text x="350" y="50" textAnchor="middle" fontWeight="bold" fill="#9a3412" fontSize="11">Pierścień zewnętrzny (fenol)</text>
            <text x="350" y="70" textAnchor="middle" fill="#c2410c" fontSize="10">Wypchnięcie pod kątem 120°</text>
          </g>
        )}
      </svg>
    </div>
  );
}

// ============================================================================
// 3. PITUITARY PULSE DYNAMICS (GOODWIN OSCILLATOR & CONVOLUTION INTEGRAL)
// ============================================================================
export function PituitaryPulseDynamics() { return <MechanismWorkbench system="pituitary"/>; }

export function EdelmanWaterBalanceCalculator() { return <WaterWorkbench/>; }
