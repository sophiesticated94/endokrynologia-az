'use client';
import { useState, useMemo } from 'react';
import { Activity, Flame, ShieldAlert, Sparkles, HeartPulse, Sliders, CheckCircle2 } from 'lucide-react';

// ============================================================================
// 1. ADRENAL ENZYME KINETICS (CYP21A2 MICHAELIS-MENTEN & 17-OHP SHUNT)
// ============================================================================
export function AdrenalEnzymeKinetics() {
  const [cyp21ActivityPct, setCyp21ActivityPct] = useState(1.5); // 1.5% - postać klasyczna prosta
  const [acthDrive, setActhDrive] = useState(5.0); // 1 - 10 stymulacja ACTH

  // Kinetyka enzymatyczna: Vmax proporcjonalna do aktywności enzymu
  const km = 2.0; // uM
  const baseVmax = 100.0;
  const effectiveVmax = (baseVmax * cyp21ActivityPct) / 100;

  // Nagromadzenie substratu 17-OHP w uM
  const substrate17Ohp = useMemo(() => {
    const raw = (acthDrive * 15) / (cyp21ActivityPct + 0.5);
    return Math.round(raw * 10) / 10;
  }, [acthDrive, cyp21ActivityPct]);

  // Bocznikowanie do androgenów (17-OHP -> Androstendion -> Testosteron)
  const androgenFlux = useMemo(() => {
    const hill = Math.pow(substrate17Ohp, 2) / (Math.pow(10, 2) + Math.pow(substrate17Ohp, 2));
    return Math.round(hill * 100);
  }, [substrate17Ohp]);

  const clinicalForm =
    cyp21ActivityPct < 1.0
      ? 'Klasyczna z utratą soli (brak aldosteronu, hiponatremia, hiperkaliemia)'
      : cyp21ActivityPct <= 5.0
      ? 'Klasyczna bez utraty soli (wirylizacja, zarośnięcie szpar, przedwczesne dojrzewanie)'
      : cyp21ActivityPct <= 50.0
      ? 'Nieklasyczna (NC-CAH, hirsutyzm, zaburzenia miesiączkowania u nastolatek)'
      : 'Prawidłowa czynność 21-hydroksylazy (Fizjologia)';

  return (
    <div style={{ background: '#fdf8f6', border: '1px solid #fed7aa', borderRadius: '12px', padding: '18px', margin: '14px 0' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: '#c2410c' }}>
        <Activity size={20} />
        <h4 style={{ margin: 0, fontSize: '15px' }}>Kinetyka Enzymatyczna 21-Hydroksylazy i Bocznik Androgenowy WPN</h4>
      </div>
      <p style={{ fontSize: '12px', color: '#374151', margin: '0 0 14px' }}>
        {'Równanie Michaelisa-Menten: V = (V_max · [S]) / (K_m + [S]). Spadek aktywności CYP21A2 prowadzi do drastycznej kumulacji 17-OHP i ucieczki w syntezę androgenów.'}
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px', marginBottom: '14px' }}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '4px' }}>
            <span>Aktywność resztkowa CYP21A2</span>
            <strong>{cyp21ActivityPct}%</strong>
          </div>
          <input type="range" min="0" max="100" step="0.5" value={cyp21ActivityPct} onChange={e => setCyp21ActivityPct(Number(e.target.value))} style={{ width: '100%' }} />
          <small style={{ fontSize: '10px', color: '#6b7280' }}>&lt;1%: utrata soli | 1–5%: prosta | 20–50%: nieklasyczna</small>
        </div>

        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '4px' }}>
            <span>Napęd osi ACTH (sprzężenie zwrotne)</span>
            <strong>{acthDrive}x</strong>
          </div>
          <input type="range" min="1.0" max="10.0" step="0.5" value={acthDrive} onChange={e => setActhDrive(Number(e.target.value))} style={{ width: '100%' }} />
          <small style={{ fontSize: '10px', color: '#6b7280' }}>Brak kortyzolu = odhamowanie ACTH i hiperplazja</small>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '10px', marginBottom: '14px' }}>
        <div style={{ background: '#fff', border: '1px solid #fed7aa', borderRadius: '8px', padding: '12px' }}>
          <div style={{ fontSize: '11px', color: '#9a3412', fontWeight: 'bold' }}>Stężenie 17-OHP w surowicy</div>
          <div style={{ fontSize: '20px', fontWeight: 'bold', color: substrate17Ohp > 30 ? '#dc2626' : '#16a34a' }}>
            {substrate17Ohp} <span style={{ fontSize: '11px' }}>ng/ml</span>
          </div>
          <div style={{ fontSize: '10px', color: '#475569' }}>Próg diagnostyczny testu z Synacthenem: &gt;10 ng/ml</div>
        </div>

        <div style={{ background: '#fff', border: '1px solid #fee2e2', borderRadius: '8px', padding: '12px' }}>
          <div style={{ fontSize: '11px', color: '#991b1b', fontWeight: 'bold' }}>Bocznikowanie do Androgenów</div>
          <div style={{ fontSize: '20px', fontWeight: 'bold', color: androgenFlux > 60 ? '#dc2626' : '#d97706' }}>
            {androgenFlux}% <span style={{ fontSize: '11px' }}>maks. przepływu</span>
          </div>
          <div style={{ fontSize: '10px', color: '#475569' }}>Nadmiar DHEA-S, androstendionu i testosteronu</div>
        </div>
      </div>

      <div style={{ background: '#fff7ed', border: '1px solid #ffedd5', borderRadius: '8px', padding: '10px 14px', fontSize: '12px', color: '#9a3412' }}>
        <strong>Fenotyp kliniczny:</strong> {clinicalForm}
      </div>
    </div>
  );
}

// ============================================================================
// 2. STEROIDOGENESIS P450 VISUALIZER & STERANE STEREOCHEMISTRY
// ============================================================================
export function SteroidogenesisP450Visualizer() {
  const [selectedHormone, setSelectedHormone] = useState<'cholesterol' | 'pregnenolone' | 'progesterone' | '17ohp' | 'cortisol' | 'aldosterone' | 'dhea'>('cortisol');

  const hormoneDetails = {
    cholesterol: {
      name: 'Cholesterol (C27)',
      path: 'Prekursor steroidogenezy, transportowany przez białko StAR do wnętrza mitochondrium.',
      modifications: 'Rdzeń cyklopentanoperhydrofenantrenu z 8-węglowym łańcuchem bocznym przy C-17.',
      enzyme: 'CYP11A1 (P450scc) odcina łańcuch boczny ⟶ Pregnenolon.',
    },
    pregnenolone: {
      name: 'Pregnenolon (C21)',
      path: 'Pierwszy biologiczny steroid po odcięciu łańcucha cholesterolowego.',
      modifications: 'Grupa 3β-hydroksylowa i wiązanie podwójne delta-5 (w pierścieniu B).',
      enzyme: '3β-HSD konwertuje do progesteronu, lub CYP17A1 hydroksyluje do 17-OH-pregnenolonu.',
    },
    progesterone: {
      name: 'Progesteron (C21)',
      path: 'Główny steroid szlaku mineralokortykoidowego (warstwa kłębkowata).',
      modifications: 'Ketogrupa przy C-3, sprzężone wiązanie delta-4 (pierścień A).',
      enzyme: 'CYP21A2 hydroksyluje pozycję C-21 ⟶ 11-deoksykortykosteron (DOC).',
    },
    '17ohp': {
      name: '17α-Hydroksyprogesteron (C21)',
      path: 'Kluczowy prekursor glukokortykoidów w warstwie pasmowatej.',
      modifications: 'Stereospecyficzna grupa alfa-OH przy węglu C-17 (kierunek pod płaszczyznę pierścienia D).',
      enzyme: 'Marker WPN: CYP21A2 przekształca 17-OHP w 11-deoksykortyzol.',
    },
    cortisol: {
      name: 'Kortyzol (C21, Hydrokortyzon)',
      path: 'Główny ludzki glukokortykoid (warstwa pasmowata kory nadnerczy).',
      modifications: 'Trzy grupy hydroksylowe: 11β-OH (mitochondrium), 17α-OH, 21-OH.',
      enzyme: 'CYP11B1 katalizuje końcową 11β-hydroksylację w mitochondrium.',
    },
    aldosterone: {
      name: 'Aldosteron (C21)',
      path: 'Główny mineralokortykoid (warstwa kłębkowata — brak 17α-hydroksylazy!).',
      modifications: 'Unikalna grupa aldehydowa przy węglu C-18 tworząca hemiacetal z 11β-OH.',
      enzyme: 'Syntaza aldosteronu (CYP11B2) przeprowadza 3 etapy utleniania przy C-18.',
    },
    dhea: {
      name: 'DHEA (C19, Dehydroepiandrosteron)',
      path: 'Główny prekursor androgenowy (warstwa siatkowata kory nadnerczy).',
      modifications: 'Odcina grupę 2-węglową przy C-17 (aktywność 17,20-liazy CYP17A1).',
      enzyme: 'CYP17A1 (17,20-liaza) wspomagana przez cytochrom b5.',
    },
  };

  const cur = hormoneDetails[selectedHormone];

  return (
    <div style={{ background: '#fdfcfb', border: '1px solid #cbd5e1', borderRadius: '12px', padding: '18px', margin: '14px 0' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: '#334155' }}>
        <Sparkles size={20} color="#0284c7" />
        <h4 style={{ margin: 0, fontSize: '15px' }}>Stereochemia Jądra Steranu i Cykl Katalityczny Cytochromów P450</h4>
      </div>

      <div style={{ display: 'flex', gap: '6px', marginBottom: '14px', flexWrap: 'wrap' }}>
        {(Object.keys(hormoneDetails) as (keyof typeof hormoneDetails)[]).map(k => (
          <button
            key={k}
            type="button"
            className={selectedHormone === k ? 'primary' : 'secondary'}
            onClick={() => setSelectedHormone(k)}
            style={{ fontSize: '11px', padding: '5px 10px' }}
          >
            {hormoneDetails[k].name.split(' ')[0]}
          </button>
        ))}
      </div>

      <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '14px', marginBottom: '12px' }}>
        <strong style={{ fontSize: '14px', color: '#0f172a' }}>{cur.name}</strong>
        <p style={{ fontSize: '12px', color: '#475569', margin: '4px 0 8px' }}>{cur.path}</p>
        <div style={{ fontSize: '11px', color: '#0284c7', marginBottom: '4px' }}>
          <strong>Stereochemia i modyfikacje:</strong> {cur.modifications}
        </div>
        <div style={{ fontSize: '11px', color: '#16a34a' }}>
          <strong>Kluczowy enzym P450:</strong> {cur.enzyme}
        </div>
      </div>

      {/* SVG Sterane Skeleton */}
      <svg viewBox="0 0 540 120" style={{ width: '100%', height: 'auto', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
        {/* Pierścień A */}
        <polygon points="50,70 80,45 110,70 110,105 80,115 50,105" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2" />
        <text x="80" y="85" textAnchor="middle" fontWeight="bold" fill="#0369a1" fontSize="12">A (C3)</text>

        {/* Pierścień B */}
        <polygon points="110,70 140,45 170,70 170,105 140,115 110,105" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2" />
        <text x="140" y="85" textAnchor="middle" fontWeight="bold" fill="#0369a1" fontSize="12">B</text>

        {/* Pierścień C */}
        <polygon points="170,70 200,45 230,70 230,105 200,115 170,105" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2" />
        <text x="200" y="85" textAnchor="middle" fontWeight="bold" fill="#0369a1" fontSize="12">C (C11β)</text>

        {/* Pierścień D (pięcioczłonowy) */}
        <polygon points="230,70 260,50 280,80 260,105 230,105" fill="#fef3c7" stroke="#d97706" strokeWidth="2" />
        <text x="250" y="82" textAnchor="middle" fontWeight="bold" fill="#b45309" fontSize="12">D (C17)</text>

        {/* Łańcuch boczny C20-C21 */}
        <path d="M 260 50 L 290 25 L 320 25" stroke="#dc2626" strokeWidth="2.5" />
        <text x="325" y="28" fill="#dc2626" fontWeight="bold" fontSize="11">C21-OH (CYP21A2)</text>

        {/* Etykieta pozycji katalitycznych */}
        <text x="440" y="65" textAnchor="middle" fontSize="11" fill="#475569">
          Cykl P450: Fe³⁺ ⟶ Fe²⁺ ⟶ Fe²⁺-O₂ ⟶ [Fe⁴⁺=O]
        </text>
      </svg>
    </div>
  );
}

// ============================================================================
// 3. CASR 4-PARAMETER HILL SIGMOIDAL CURVE & SETPOINT CALCULATOR
// ============================================================================
export function CasrSigmoidalCurve() {
  const [ionizedCa, setIonizedCa] = useState(1.22); // mmol/l
  const [casrMode, setCasrMode] = useState<'normal' | 'fhh' | 'cinacalcet' | 'adenoma'>('normal');

  // Parametry równania Hilla dla CaSR
  // PTH = PTH_min + (PTH_max - PTH_min) / (1 + (Ca / EC50)^nH)
  const pthMax = casrMode === 'adenoma' ? 180 : 100;
  const pthMin = casrMode === 'adenoma' ? 45 : 8;
  const nH = 3.8; // Wysoka kooperatywność receptora CaSR
  const ec50 = casrMode === 'fhh' ? 1.38 : casrMode === 'cinacalcet' ? 1.12 : 1.21; // mmol/l

  // Obliczenie aktualnego PTH
  const currentPth = useMemo(() => {
    const ratio = Math.pow(ionizedCa / ec50, nH);
    const pth = pthMin + (pthMax - pthMin) / (1 + ratio);
    return Math.round(pth * 10) / 10;
  }, [ionizedCa, ec50, pthMin, pthMax, nH]);

  // Generowanie punktów krzywej Hilla
  const curvePoints = useMemo(() => {
    const pts: { ca: number; pth: number }[] = [];
    for (let c = 0.8; c <= 1.7; c += 0.02) {
      const ratio = Math.pow(c / ec50, nH);
      const val = pthMin + (pthMax - pthMin) / (1 + ratio);
      pts.push({ ca: Math.round(c * 100) / 100, pth: Math.round(val * 10) / 10 });
    }
    return pts;
  }, [ec50, pthMin, pthMax, nH]);

  return (
    <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '12px', padding: '18px', margin: '14px 0' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: '#1e293b' }}>
        <Sliders size={20} color="#059669" />
        <h4 style={{ margin: 0, fontSize: '15px' }}>Sigmoida Hilla Receptora CaSR i Wskaźnik Set-Point Supresji PTH</h4>
      </div>
      <p style={{ fontSize: '12px', color: '#475569', margin: '0 0 14px' }}>
        {'Model 4-parametrowy z kooperatywnością n_H ≈ 3.8: PTH = PTH_min + (PTH_max - PTH_min) / (1 + ([Ca²⁺]/EC_50)^n_H). Przesunięcie w prawo w FHH vs w lewo po kalcymimetyku (cynakalcet).'}
      </p>

      <div style={{ display: 'flex', gap: '6px', marginBottom: '14px', flexWrap: 'wrap' }}>
        <button type="button" className={casrMode === 'normal' ? 'primary' : 'secondary'} onClick={() => setCasrMode('normal')} style={{ fontSize: '11px', padding: '5px 10px' }}>
          Norma (EC50 = 1.21)
        </button>
        <button type="button" className={casrMode === 'fhh' ? 'primary' : 'secondary'} onClick={() => setCasrMode('fhh')} style={{ fontSize: '11px', padding: '5px 10px' }}>
          Mutacja FHH (Prawo-skręt, EC50 = 1.38)
        </button>
        <button type="button" className={casrMode === 'cinacalcet' ? 'primary' : 'secondary'} onClick={() => setCasrMode('cinacalcet')} style={{ fontSize: '11px', padding: '5px 10px' }}>
          Kalcymimetyk (Lewo-skręt, EC50 = 1.12)
        </button>
        <button type="button" className={casrMode === 'adenoma' ? 'primary' : 'secondary'} onClick={() => setCasrMode('adenoma')} style={{ fontSize: '11px', padding: '5px 10px' }}>
          Gruczolak PHPT (Utrata supresji)
        </button>
      </div>

      <div style={{ marginBottom: '14px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '4px' }}>
          <span>Wapń zjonizowany w surowicy (Ca²⁺)</span>
          <strong>{ionizedCa} mmol/l (Norma: 1.15 – 1.32)</strong>
        </div>
        <input type="range" min="0.85" max="1.65" step="0.01" value={ionizedCa} onChange={e => setIonizedCa(Number(e.target.value))} style={{ width: '100%' }} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '14px' }}>
        <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '10px' }}>
          <small style={{ fontSize: '11px', color: '#64748b' }}>Wyliczone stężenie PTH</small>
          <div style={{ fontSize: '20px', fontWeight: 'bold', color: currentPth > 65 ? '#dc2626' : currentPth < 15 ? '#2563eb' : '#16a34a' }}>
            {currentPth} <span style={{ fontSize: '11px' }}>pg/ml</span>
          </div>
        </div>

        <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '10px' }}>
          <small style={{ fontSize: '11px', color: '#64748b' }}>Wartość Set-Point (EC50)</small>
          <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#0f172a' }}>
            {ec50} <span style={{ fontSize: '11px' }}>mmol/l</span>
          </div>
        </div>
      </div>

      {/* SVG Wykres Sigmoidy */}
      <svg viewBox="0 0 540 140" style={{ width: '100%', height: 'auto', background: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
        <line x1="40" y1="115" x2="510" y2="115" stroke="#94a3b8" strokeWidth="1.5" />
        <line x1="40" y1="15" x2="40" y2="115" stroke="#94a3b8" strokeWidth="1.5" />
        <text x="270" y="132" textAnchor="middle" fontSize="10" fill="#64748b">Wapń zjonizowany Ca²⁺ (mmol/l) ⟶</text>

        {/* Krzywa Hilla */}
        <path
          d={curvePoints.reduce((acc, p, i) => {
            const x = 40 + ((p.ca - 0.8) / 0.9) * 470;
            const y = 115 - (p.pth / 200) * 95;
            return `${acc} ${i === 0 ? 'M' : 'L'} ${x} ${y}`;
          }, '')}
          fill="none"
          stroke="#059669"
          strokeWidth="2.5"
        />

        {/* Aktualny punkt pacjenta */}
        <circle cx={40 + ((ionizedCa - 0.8) / 0.9) * 470} cy={115 - (currentPth / 200) * 95} r="6" fill="#dc2626" stroke="#fff" strokeWidth="2" />
      </svg>
    </div>
  );
}

// ============================================================================
// 4. BONE MINERALIZATION KINETICS & QTc FORMULAS (BAZETT / FRIDERICIA)
// ============================================================================
export function BoneMineralizationKinetics() {
  const [preopAlp, setPreopAlp] = useState(480); // IU/L
  const [heartRateBpm, setHeartRateBpm] = useState(75); // /min
  const [measuredQtMs, setMeasuredQtMs] = useState(410); // ms

  // QTc wg Bazetta: QTc = QT / sqrt(RR)
  // QTc wg Fridericia: QTc = QT / cbrt(RR)
  const rrSec = 60 / heartRateBpm;
  const qtcBazett = Math.round(measuredQtMs / Math.sqrt(rrSec));
  const qtcFridericia = Math.round(measuredQtMs / Math.cbrt(rrSec));

  // Zespół głodnych kości (HBS) - stała tempa zaniku k proporcjonalna do ALP
  const hungryBoneK = (preopAlp / 100) * 0.12;
  const hungryBoneRisk = preopAlp > 500 ? 'Krytyczne (Gwałtowna hipokalcemia i hipofosfatemia)' : preopAlp > 250 ? 'Podwyższone' : 'Niskie';

  return (
    <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '12px', padding: '18px', margin: '14px 0' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: '#991b1b' }}>
        <HeartPulse size={20} />
        <h4 style={{ margin: 0, fontSize: '15px' }}>Kinetyka Mineralizacji Kości (HBS) i Matematyka Odstępu QTc</h4>
      </div>
      <p style={{ fontSize: '12px', color: '#374151', margin: '0 0 14px' }}>
        {'Formuły korygujące odstęp QT: Bazetta QTc = QT / √(RR) oraz Fridericia QTc = QT / ∛(RR). W hipokalcemii wydłużenie fazy plateau potencjału czynnościowego predysponuje do Torsade de Pointes.'}
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '12px', marginBottom: '14px' }}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '4px' }}>
            <span>Fosfataza ALP (przedoperacyjna)</span>
            <strong>{preopAlp} IU/L</strong>
          </div>
          <input type="range" min="60" max="1200" step="20" value={preopAlp} onChange={e => setPreopAlp(Number(e.target.value))} style={{ width: '100%' }} />
          <small style={{ fontSize: '10px', color: '#6b7280' }}>Norma: 35 – 105 IU/L</small>
        </div>

        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '4px' }}>
            <span>Częstość rytmu serca (HR)</span>
            <strong>{heartRateBpm} /min</strong>
          </div>
          <input type="range" min="45" max="140" step="5" value={heartRateBpm} onChange={e => setHeartRateBpm(Number(e.target.value))} style={{ width: '100%' }} />
          <small style={{ fontSize: '10px', color: '#6b7280' }}>RR = {Math.round(rrSec * 100) / 100} s</small>
        </div>

        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '4px' }}>
            <span>Zmierzony odstęp QT</span>
            <strong>{measuredQtMs} ms</strong>
          </div>
          <input type="range" min="300" max="550" step="5" value={measuredQtMs} onChange={e => setMeasuredQtMs(Number(e.target.value))} style={{ width: '100%' }} />
          <small style={{ fontSize: '10px', color: '#6b7280' }}>Od początku Q do końca T</small>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '10px' }}>
        <div style={{ background: '#fff', border: '1px solid #fee2e2', borderRadius: '8px', padding: '12px' }}>
          <div style={{ fontSize: '11px', color: '#991b1b', fontWeight: 'bold' }}>QTc wg Bazetta</div>
          <div style={{ fontSize: '20px', fontWeight: 'bold', color: qtcBazett > 460 ? '#dc2626' : '#16a34a' }}>
            {qtcBazett} <span style={{ fontSize: '12px' }}>ms</span>
          </div>
          <div style={{ fontSize: '10px', color: '#4b5563' }}>{qtcBazett > 460 ? '⚠️ Ryzyko TdP!' : 'W normie (&lt;450 ms)'}</div>
        </div>

        <div style={{ background: '#fff', border: '1px solid #fee2e2', borderRadius: '8px', padding: '12px' }}>
          <div style={{ fontSize: '11px', color: '#991b1b', fontWeight: 'bold' }}>QTc wg Fridericia</div>
          <div style={{ fontSize: '20px', fontWeight: 'bold', color: qtcFridericia > 450 ? '#dc2626' : '#16a34a' }}>
            {qtcFridericia} <span style={{ fontSize: '12px' }}>ms</span>
          </div>
          <div style={{ fontSize: '10px', color: '#4b5563' }}>Dokładniejszy przy tachykardii</div>
        </div>

        <div style={{ background: '#fff', border: '1px solid #fee2e2', borderRadius: '8px', padding: '12px' }}>
          <div style={{ fontSize: '11px', color: '#991b1b', fontWeight: 'bold' }}>Ryzyko Hungry Bone (HBS)</div>
          <div style={{ fontSize: '15px', fontWeight: 'bold', color: preopAlp > 250 ? '#dc2626' : '#16a34a' }}>
            {hungryBoneRisk}
          </div>
          <div style={{ fontSize: '10px', color: '#4b5563' }}>Wymóg profilaktyki Ca + Kalcytriol</div>
        </div>
      </div>
    </div>
  );
}
