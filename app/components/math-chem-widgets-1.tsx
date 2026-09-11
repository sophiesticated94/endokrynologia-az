'use client';
import { useState, useMemo } from 'react';
import { Calculator, Atom, Activity, Droplets, Info, AlertTriangle, CheckCircle2 } from 'lucide-react';

// ============================================================================
// 1. SPINA-GT / SPINA-GD THYROID FEEDBACK CALCULATOR
// ============================================================================
export function SpinaThyroidCalculator() {
  const [tsh, setTsh] = useState(2.1);
  const [ft4, setFt4] = useState(15.2);
  const [ft3, setFt3] = useState(4.8);

  // Model matematyczny SPINA (Calculated Secretory Capacity & Sum Activity)
  // SPINA-GT = beta_T * (D_T + TSH) * (1 + K41*TBG + K42*TBPA) * FT4 / (alpha_T * TSH)
  // Uproszczony kliniczny estymator:
  const spinaGt = useMemo(() => {
    if (tsh <= 0.01) return 25.0; // Saturacja w supresji
    const betaT = 1.1e-6;
    const dt = 2.75;
    const alphaT = 0.1;
    const gt = (betaT * (dt + tsh) * ft4) / (alphaT * tsh) * 1e6;
    return Math.round(gt * 10) / 10;
  }, [tsh, ft4]);

  // SPINA-GD = beta_31 * (KM + FT4) * FT3 / (alpha_31 * FT4)
  const spinaGd = useMemo(() => {
    if (ft4 <= 0.5) return 0;
    const beta31 = 8.0e-6;
    const km = 1.0;
    const alpha31 = 0.026;
    const gd = (beta31 * (km + ft4) * ft3) / (alpha31 * ft4) * 1e8;
    return Math.round(gd * 10) / 10;
  }, [ft4, ft3]);

  // Jostel's TSH Index (JTI) = ln(TSH) + 0.1345 * FT4
  const jti = useMemo(() => {
    if (tsh <= 0) return 0;
    return Math.round((Math.log(tsh) + 0.1345 * ft4) * 100) / 100;
  }, [tsh, ft4]);

  const gtStatus = spinaGt < 1.4 ? 'Obniżona (hipoplazja/destrukcja)' : spinaGt > 8.7 ? 'Podwyższona (autonomia/stymulacja)' : 'W normie (1.4 – 8.7 pmol/s)';
  const gdStatus = spinaGd < 20 ? 'Obniżona konwersja obwodowa' : spinaGd > 40 ? 'Nadmierna dejodynacja' : 'W normie (20 – 40 nmol/s)';

  return (
    <div style={{ background: '#f8faf9', border: '1px solid #cce3de', borderRadius: '12px', padding: '18px', margin: '14px 0' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', color: '#166534' }}>
        <Calculator size={20} />
        <h4 style={{ margin: 0, fontSize: '15px' }}>Interaktywny Model Matematyczny: SPINA-GT / SPINA-GD i Wskaźnik Jostela</h4>
      </div>
      <p style={{ fontSize: '12px', color: '#374151', margin: '0 0 14px' }}>
        {'Rozstrzyganie sprzężenia zwrotnego na poziomie parametrów strukturalnych: wydajność tarczycy (SPINA-GT, Ĝ_T) oraz sumaryczna aktywność obwodowych dejodynaz (SPINA-GD, Ĝ_D).'}
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px', marginBottom: '16px' }}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '4px' }}>
            <span>TSH w surowicy</span>
            <strong>{tsh} mIU/l</strong>
          </div>
          <input type="range" min="0.05" max="15.0" step="0.05" value={tsh} onChange={e => setTsh(Number(e.target.value))} style={{ width: '100%' }} />
          <small style={{ fontSize: '10px', color: '#6b7280' }}>Zakres normy: 0.4 – 4.0 mIU/l</small>
        </div>

        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '4px' }}>
            <span>Wolna tyroksyna (FT4)</span>
            <strong>{ft4} pmol/l</strong>
          </div>
          <input type="range" min="4.0" max="35.0" step="0.5" value={ft4} onChange={e => setFt4(Number(e.target.value))} style={{ width: '100%' }} />
          <small style={{ fontSize: '10px', color: '#6b7280' }}>Zakres normy: 12.0 – 22.0 pmol/l</small>
        </div>

        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '4px' }}>
            <span>Wolna trójjodotyronina (FT3)</span>
            <strong>{ft3} pmol/l</strong>
          </div>
          <input type="range" min="1.0" max="12.0" step="0.2" value={ft3} onChange={e => setFt3(Number(e.target.value))} style={{ width: '100%' }} />
          <small style={{ fontSize: '10px', color: '#6b7280' }}>Zakres normy: 3.1 – 6.8 pmol/l</small>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '10px' }}>
        <div style={{ background: '#fff', border: '1px solid #d1fae5', borderRadius: '8px', padding: '12px' }}>
          <div style={{ fontSize: '11px', color: '#065f46', fontWeight: 'bold' }}>Wydolność tarczycy SPINA-GT</div>
          <div style={{ fontSize: '20px', fontWeight: 'bold', color: spinaGt < 1.4 ? '#dc2626' : spinaGt > 8.7 ? '#d97706' : '#16a34a' }}>
            {spinaGt} <span style={{ fontSize: '11px' }}>pmol/s</span>
          </div>
          <div style={{ fontSize: '10px', color: '#4b5563' }}>{gtStatus}</div>
        </div>

        <div style={{ background: '#fff', border: '1px solid #e0e7ff', borderRadius: '8px', padding: '12px' }}>
          <div style={{ fontSize: '11px', color: '#3730a3', fontWeight: 'bold' }}>Aktywność dejodynaz SPINA-GD</div>
          <div style={{ fontSize: '20px', fontWeight: 'bold', color: spinaGd < 20 ? '#dc2626' : spinaGd > 40 ? '#d97706' : '#4338ca' }}>
            {spinaGd} <span style={{ fontSize: '11px' }}>nmol/s</span>
          </div>
          <div style={{ fontSize: '10px', color: '#4b5563' }}>{gdStatus}</div>
        </div>

        <div style={{ background: '#fff', border: '1px solid #fef3c7', borderRadius: '8px', padding: '12px' }}>
          <div style={{ fontSize: '11px', color: '#92400e', fontWeight: 'bold' }}>Wskaźnik Jostela (JTI)</div>
          <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#b45309' }}>
            {jti}
          </div>
          <div style={{ fontSize: '10px', color: '#4b5563' }}>Odzwierciedla przysadkowy set-point TSH</div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// 2. TPO MOLECULAR REACTION MECHANISM & STEREOCHEMISTRY
// ============================================================================
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
export function PituitaryPulseDynamics() {
  const [pulseFrequency, setPulseFrequency] = useState(12); // impulsów na dobę
  const [pulseAmplitude, setPulseAmplitude] = useState(6.0); // ng/ml
  const [halfLifeMin, setHalfLifeMin] = useState(25); // t1/2 w minutach
  const [clinicalMode, setClinicalMode] = useState<'normal' | 'kallmann' | 'adenoma'>('normal');

  // Obliczenie profilu stężenia w czasie 24h (1440 min)
  const curvePoints = useMemo(() => {
    const points: { timeH: number; conc: number }[] = [];
    const intervalMin = clinicalMode === 'kallmann' ? 9999 : 1440 / pulseFrequency;
    const basal = clinicalMode === 'adenoma' ? 8.0 : 0.8;
    const lambda = Math.log(2) / halfLifeMin;

    for (let t = 0; t <= 24; t += 0.25) {
      const tMin = t * 60;
      let totalPulsatile = 0;

      if (clinicalMode !== 'kallmann') {
        const totalPulses = Math.floor(1440 / intervalMin);
        for (let p = 0; p <= totalPulses; p++) {
          const pulseTime = p * intervalMin;
          if (tMin >= pulseTime) {
            const dt = tMin - pulseTime;
            // Kształt pulsu Gaussa + zanik wykładniczy
            const amp = clinicalMode === 'adenoma' ? pulseAmplitude * 0.4 : pulseAmplitude;
            totalPulsatile += amp * Math.exp(-lambda * dt);
          }
        }
      }
      points.push({ timeH: t, conc: Math.round((basal + totalPulsatile) * 100) / 100 });
    }
    return points;
  }, [pulseFrequency, pulseAmplitude, halfLifeMin, clinicalMode]);

  const maxConc = Math.max(...curvePoints.map(p => p.conc), 10);

  return (
    <div style={{ background: '#f0fdfa', border: '1px solid #99f6e4', borderRadius: '12px', padding: '18px', margin: '14px 0' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: '#0f766e' }}>
        <Activity size={20} />
        <h4 style={{ margin: 0, fontSize: '15px' }}>Dynamika Pulsacyjna Przysadki: Całka Splotu i Rytm Dobowy</h4>
      </div>
      <p style={{ fontSize: '12px', color: '#374151', margin: '0 0 14px' }}>
        {'Model dekonwolucyjny wyrzutów neurohormonalnych: C(t) = ∫ S(τ) e^(-λ(t-τ)) dτ. Różnicowanie fizjologicznej pulsacji od autonomii guza i braku generatora GnRH.'}
      </p>

      {/* Wybór scenariusza */}
      <div style={{ display: 'flex', gap: '6px', marginBottom: '14px' }}>
        <button
          type="button"
          className={clinicalMode === 'normal' ? 'primary' : 'secondary'}
          onClick={() => setClinicalMode('normal')}
          style={{ fontSize: '11px', padding: '5px 10px' }}
        >
          Fizjologia (Pulsacja LH/GH)
        </button>
        <button
          type="button"
          className={clinicalMode === 'kallmann' ? 'primary' : 'secondary'}
          onClick={() => setClinicalMode('kallmann')}
          style={{ fontSize: '11px', padding: '5px 10px' }}
        >
          Zespół Kallmanna (Aerozja generatora GnRH)
        </button>
        <button
          type="button"
          className={clinicalMode === 'adenoma' ? 'primary' : 'secondary'}
          onClick={() => setClinicalMode('adenoma')}
          style={{ fontSize: '11px', padding: '5px 10px' }}
        >
          Gruczolak autonomiczny (Utrata rytmu)
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px', marginBottom: '14px' }}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '4px' }}>
            <span>Częstość pulsów</span>
            <strong>{pulseFrequency} / dobę</strong>
          </div>
          <input type="range" min="4" max="24" step="1" value={pulseFrequency} onChange={e => setPulseFrequency(Number(e.target.value))} style={{ width: '100%' }} disabled={clinicalMode === 'kallmann'} />
        </div>

        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '4px' }}>
            <span>Amplituda wyrzutu</span>
            <strong>{pulseAmplitude} ng/ml</strong>
          </div>
          <input type="range" min="1.0" max="15.0" step="0.5" value={pulseAmplitude} onChange={e => setPulseAmplitude(Number(e.target.value))} style={{ width: '100%' }} disabled={clinicalMode === 'kallmann'} />
        </div>

        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '4px' }}>
            <span>Czas półtrwania t1/2</span>
            <strong>{halfLifeMin} min</strong>
          </div>
          <input type="range" min="10" max="60" step="5" value={halfLifeMin} onChange={e => setHalfLifeMin(Number(e.target.value))} style={{ width: '100%' }} />
        </div>
      </div>

      {/* SVG Krzywa stężenia w czasie */}
      <svg viewBox="0 0 600 160" style={{ width: '100%', height: 'auto', background: '#fff', borderRadius: '8px', border: '1px solid #ccfbf1' }}>
        {/* Siatka */}
        <line x1="40" y1="130" x2="570" y2="130" stroke="#94a3b8" strokeWidth="1.5" />
        <line x1="40" y1="20" x2="40" y2="130" stroke="#94a3b8" strokeWidth="1.5" />

        {/* Etykiety osi X (godziny) */}
        {[0, 4, 8, 12, 16, 20, 24].map(h => (
          <text key={h} x={40 + (h / 24) * 520} y="145" textAnchor="middle" fontSize="10" fill="#64748b">{h}h</text>
        ))}

        {/* Ścieżka stężenia */}
        <path
          d={curvePoints.reduce((acc, p, i) => {
            const x = 40 + (p.timeH / 24) * 520;
            const y = 130 - (p.conc / maxConc) * 105;
            return `${acc} ${i === 0 ? 'M' : 'L'} ${x} ${y}`;
          }, '')}
          fill="none"
          stroke="#0d9488"
          strokeWidth="2.5"
        />
      </svg>
    </div>
  );
}

// ============================================================================
// 4. EDELMAN EQUATION & FREE WATER CLEARANCE CALCULATOR
// ============================================================================
export function EdelmanWaterBalanceCalculator() {
  const [bodyWeight, setBodyWeight] = useState(70);
  const [serumSodium, setSerumSodium] = useState(126); // Hiponatremia
  const [urineOsm, setUrineOsm] = useState(450); // mOsm/kg
  const [urineVolumeL, setUrineVolumeL] = useState(1.5); // L/dobę

  // Edelman: TBW = 0.6 * weight (dla mężczyzny) lub 0.5 * weight (kobiety)
  const tbw = bodyWeight * 0.55;
  const plasmaOsm = serumSodium * 2 + 10; // Estymowana osmolalność osocza

  // Klirens wolnej wody C_H2O = V * (1 - U_osm / P_osm)
  const freeWaterClearance = useMemo(() => {
    if (plasmaOsm <= 0) return 0;
    const c = urineVolumeL * (1 - urineOsm / plasmaOsm);
    return Math.round(c * 100) / 100;
  }, [urineVolumeL, urineOsm, plasmaOsm]);

  // Obliczenie deficytu sodu w hiponatremii: Deficyt Na = TBW * (140 - [Na]_aktualne)
  const sodiumDeficitMmol = useMemo(() => {
    if (serumSodium >= 140) return 0;
    return Math.round(tbw * (140 - serumSodium));
  }, [tbw, serumSodium]);

  const alertLimit = freeWaterClearance < 0 ? 'Retencja wolnej wody (charakterystyczna dla SIADH!)' : 'Utrata wolnej wody (np. moczówka prosta / diureza osmotyczna)';

  return (
    <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '12px', padding: '18px', margin: '14px 0' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: '#15803d' }}>
        <Droplets size={20} />
        <h4 style={{ margin: 0, fontSize: '15px' }}>Równanie Edelmana i Klirens Wolnej Wody (C_H2O)</h4>
      </div>
      <p style={{ fontSize: '12px', color: '#374151', margin: '0 0 14px' }}>
        {'Model relacji stężenia sodu do wymiennego sodu, potasu i całkowitej wody ustrojowej: [Na⁺] = (Na_e + K_e) / TBW oraz klirens wolnej wody C_H2O = V · (1 - U_osm / P_osm).'}
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px', marginBottom: '14px' }}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '4px' }}>
            <span>Masa ciała pacjenta</span>
            <strong>{bodyWeight} kg</strong>
          </div>
          <input type="range" min="45" max="120" step="1" value={bodyWeight} onChange={e => setBodyWeight(Number(e.target.value))} style={{ width: '100%' }} />
        </div>

        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '4px' }}>
            <span>Aktualna natremia [Na⁺]</span>
            <strong>{serumSodium} mmol/l</strong>
          </div>
          <input type="range" min="110" max="160" step="1" value={serumSodium} onChange={e => setSerumSodium(Number(e.target.value))} style={{ width: '100%' }} />
        </div>

        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '4px' }}>
            <span>Osmolalność moczu (U_osm)</span>
            <strong>{urineOsm} mOsm/kg</strong>
          </div>
          <input type="range" min="50" max="1000" step="25" value={urineOsm} onChange={e => setUrineOsm(Number(e.target.value))} style={{ width: '100%' }} />
        </div>

        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '4px' }}>
            <span>Dobowa diureza (V)</span>
            <strong>{urineVolumeL} L / dobę</strong>
          </div>
          <input type="range" min="0.5" max="8.0" step="0.5" value={urineVolumeL} onChange={e => setUrineVolumeL(Number(e.target.value))} style={{ width: '100%' }} />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px', marginBottom: '12px' }}>
        <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '12px' }}>
          <div style={{ fontSize: '11px', color: '#64748b' }}>Klirens wolnej wody (C_H2O)</div>
          <div style={{ fontSize: '20px', fontWeight: 'bold', color: freeWaterClearance < 0 ? '#dc2626' : '#16a34a' }}>
            {freeWaterClearance} <span style={{ fontSize: '12px' }}>L / dobę</span>
          </div>
          <div style={{ fontSize: '10px', color: '#475569' }}>{alertLimit}</div>
        </div>

        <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '12px' }}>
          <div style={{ fontSize: '11px', color: '#64748b' }}>Całkowity deficyt sodu (dla 140 mmol/l)</div>
          <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#b45309' }}>
            {sodiumDeficitMmol} <span style={{ fontSize: '12px' }}>mmol Na⁺</span>
          </div>
          <div style={{ fontSize: '10px', color: '#475569' }}>TBW = {Math.round(tbw * 10) / 10} L (55% m.c.)</div>
        </div>
      </div>

      <div style={{ background: '#fef2f2', border: '1px solid #fca5a5', borderRadius: '8px', padding: '10px 14px', fontSize: '12px', color: '#991b1b', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <AlertTriangle size={18} style={{ flexShrink: 0 }} />
        <span>
          <strong>Zasada bezpieczeństwa korygowania hiponatremii:</strong> Maksymalne dozwolone tempo wzrostu natremii to <strong>8–10 mmol/l w ciągu pierwszych 24 godzin</strong> (oraz &lt;18 mmol/l w 48 h), aby uniknąć zespołu mielinolizy mostu (CPM / ODS).
        </span>
      </div>
    </div>
  );
}
