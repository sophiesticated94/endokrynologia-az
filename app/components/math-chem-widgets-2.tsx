'use client';
import { useState, useMemo } from 'react';
import { Sparkles, HeartPulse, Sliders } from 'lucide-react';

// ============================================================================
// 1. 21-HYDROXYLASE PATHWAY EXPLORER (CYP21A2 SHUNT & CLINICAL 17-OHP BENCH)
// ============================================================================
export { AdrenalEnzymeKinetics } from './adrenal-pathway-explorer';


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
// ============================================================================
// 3. CASR RELATIVE HILL SIGMOIDAL SUPPRESSION CURVE
// ============================================================================
export function CasrSigmoidalCurve() {
  const [caRatio, setCaRatio] = useState(1.00); // Ca / Set-point (0.75 do 1.25)
  const [casrMode, setCasrMode] = useState<'normal' | 'fhh' | 'cinacalcet' | 'adenoma'>('normal');

  // Względna sekrecja PTH w % wartości maksymalnej (0–100%)
  const relativeMax = 100;
  const relativeMin = casrMode === 'adenoma' ? 35 : 5;
  const nH = 3.8; // Współczynnik Hilla (wysoka kooperatywność oligomeru CaSR)
  const shift = casrMode === 'fhh' ? 1.15 : casrMode === 'cinacalcet' ? 0.88 : casrMode === 'adenoma' ? 1.05 : 1.00;

  // Obliczenie względnej sekrecji PTH (% maksimum)
  const relativePthPct = useMemo(() => {
    const effectiveRatio = caRatio / shift;
    const ratio = Math.pow(effectiveRatio, nH);
    const pth = relativeMin + (relativeMax - relativeMin) / (1 + ratio);
    return Math.round(pth * 10) / 10;
  }, [caRatio, shift, relativeMin, relativeMax, nH]);

  // Generowanie punktów krzywej Hilla (0–100%)
  const curvePoints = useMemo(() => {
    const pts: { r: number; pth: number }[] = [];
    for (let r = 0.75; r <= 1.25; r += 0.01) {
      const effectiveRatio = r / shift;
      const ratio = Math.pow(effectiveRatio, nH);
      const val = relativeMin + (relativeMax - relativeMin) / (1 + ratio);
      pts.push({ r: Math.round(r * 100) / 100, pth: Math.round(val * 10) / 10 });
    }
    return pts;
  }, [shift, relativeMin, relativeMax, nH]);

  const modeDescriptions = {
    normal: 'Fizjologiczny model odniesienia: stroma supresja sekrecji PTH wokół set-pointu (1,00).',
    fhh: 'Mutacja inaktywująca CaSR / FHH: przesunięcie krzywej w prawo (oporność na wapń zjonizowany, obniżona czułość receptora).',
    cinacalcet: 'Kalcymimetyk (cynakalcet): allosteryczna sensytyzacja receptora, przesunięcie krzywej w lewo (supresja przy niższym Ca).',
    adenoma: 'Rozrost przytarczyc / gruczolak PHPT: zaburzenie supresji minimalnej (podwyższona niesupresyjna sekrecja bazowa, autonomizacja).',
  };

  return (
    <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '12px', padding: '18px', margin: '14px 0' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: '#1e293b' }}>
        <Sliders size={20} color="#059669" />
        <h4 style={{ margin: 0, fontSize: '15px' }}>Biofizyczny Model Supresji PTH przez CaSR (Względna Krzywa Hilla)</h4>
      </div>
      <p style={{ fontSize: '12px', color: '#475569', margin: '0 0 14px' }}>
        Krzywa ilustruje względną dynamikę supresji wydzielania PTH (0–100% maksimum) w funkcji stosunku Ca / Set-point. Indywidualny set-point i stężenia bezwzględne PTH różnią się w zależności od pacjenta, masy tkanki przytarczycowej i zaopatrzenia w witaminę D. Wartości przesunięć (np. shift 1,15 w FHH, 0,88 dla cynakalcetu czy minimalna sekrecja 35% w gruczolaku) to arbitralne parametry dydaktyczne wizualizacji kierunku zmian, a nie uniwersalne stałe biologiczne.
      </p>

      <div style={{ display: 'flex', gap: '6px', marginBottom: '14px', flexWrap: 'wrap' }}>
        <button type="button" className={casrMode === 'normal' ? 'primary' : 'secondary'} onClick={() => setCasrMode('normal')} style={{ fontSize: '11px', padding: '5px 10px' }}>
          Model odniesienia
        </button>
        <button type="button" className={casrMode === 'fhh' ? 'primary' : 'secondary'} onClick={() => setCasrMode('fhh')} style={{ fontSize: '11px', padding: '5px 10px' }}>
          Przesunięcie w prawo (FHH)
        </button>
        <button type="button" className={casrMode === 'cinacalcet' ? 'primary' : 'secondary'} onClick={() => setCasrMode('cinacalcet')} style={{ fontSize: '11px', padding: '5px 10px' }}>
          Przesunięcie w lewo (Kalcymimetyk)
        </button>
        <button type="button" className={casrMode === 'adenoma' ? 'primary' : 'secondary'} onClick={() => setCasrMode('adenoma')} style={{ fontSize: '11px', padding: '5px 10px' }}>
          Autonomizacja / Gruczolak
        </button>
      </div>

      <div style={{ marginBottom: '14px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '4px' }}>
          <span>Względne stężenie wapnia (Ca / Set-point)</span>
          <strong>{caRatio.toFixed(2)} × Set-point</strong>
        </div>
        <input type="range" min="0.75" max="1.25" step="0.01" value={caRatio} onChange={e => setCaRatio(Number(e.target.value))} style={{ width: '100%' }} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '10px', marginBottom: '14px' }}>
        <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '10px' }}>
          <small style={{ fontSize: '11px', color: '#64748b' }}>Względna sekrecja PTH</small>
          <div style={{ fontSize: '20px', fontWeight: 'bold', color: relativePthPct > 60 ? '#dc2626' : relativePthPct < 20 ? '#2563eb' : '#059669' }}>
            {relativePthPct}% <span style={{ fontSize: '11px', fontWeight: 400 }}>maksimum</span>
          </div>
        </div>

        <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '10px' }}>
          <small style={{ fontSize: '11px', color: '#64748b' }}>Względny Set-point profilu</small>
          <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#0f172a' }}>
            {shift.toFixed(2)} <span style={{ fontSize: '11px', fontWeight: 400 }}>× ref</span>
          </div>
        </div>
      </div>

      {/* SVG Wykres Sigmoidy */}
      <svg viewBox="0 0 540 140" style={{ width: '100%', height: 'auto', background: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
        <line x1="40" y1="115" x2="510" y2="115" stroke="#94a3b8" strokeWidth="1.5" />
        <line x1="40" y1="15" x2="40" y2="115" stroke="#94a3b8" strokeWidth="1.5" />
        <text x="270" y="132" textAnchor="middle" fontSize="10" fill="#64748b">Względne stężenie Ca (Ca / Set-point) ⟶</text>
        <text x="35" y="20" textAnchor="end" fontSize="9" fill="#64748b">100%</text>
        <text x="35" y="115" textAnchor="end" fontSize="9" fill="#64748b">0%</text>

        {/* Krzywa Hilla */}
        <path
          d={curvePoints.reduce((acc, p, i) => {
            const x = 40 + ((p.r - 0.75) / 0.50) * 470;
            const y = 115 - (p.pth / 100) * 95;
            return `${acc} ${i === 0 ? 'M' : 'L'} ${x} ${y}`;
          }, '')}
          fill="none"
          stroke="#059669"
          strokeWidth="2.5"
        />

        {/* Aktualny punkt pacjenta */}
        <circle cx={40 + ((caRatio - 0.75) / 0.50) * 470} cy={115 - (relativePthPct / 100) * 95} r="6" fill="#dc2626" stroke="#fff" strokeWidth="2" />
      </svg>

      <div style={{ marginTop: '10px', fontSize: '11px', color: '#475569', background: '#f1f5f9', padding: '8px 12px', borderRadius: '6px' }}>
        <strong>Kontekst kliniczny:</strong> {modeDescriptions[casrMode]}
      </div>
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

  const isBazettProlonged = qtcBazett > 460;
  const isFridericiaProlonged = qtcFridericia > 450;
  const isSevereProlongation = qtcBazett > 500 || qtcFridericia > 500;

  return (
    <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '12px', padding: '18px', margin: '14px 0' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: '#991b1b' }}>
        <HeartPulse size={20} />
        <h4 style={{ margin: 0, fontSize: '15px' }}>Obrót kostny a elektrofizjologia serca · Matematyka QTc</h4>
      </div>
      <p style={{ fontSize: '12px', color: '#374151', margin: '0 0 14px' }}>
        Formuły korygujące odstęp QT: Bazetta QTc = QT / √(RR) oraz Fridericia QTc = QT / ∛(RR). Hipokalcemia wydłuża fazę plateau (faza 2) potencjału czynnościowego i odstęp ST/QT. Może zwiększać ryzyko komorowych zaburzeń rytmu, natomiast Torsade de Pointes (TdP) stanowi rzadkie powikłanie izolowanej hipokalcemii (w przeciwieństwie do hipokaliemii lub hipomagnezemii).
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
          <small style={{ fontSize: '10px', color: '#6b7280' }}>Od początku załamka Q do końca załamka T</small>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '10px', marginBottom: '12px' }}>
        <div style={{ background: '#fff', border: '1px solid #fee2e2', borderRadius: '8px', padding: '12px' }}>
          <div style={{ fontSize: '11px', color: '#991b1b', fontWeight: 'bold' }}>QTc wg Bazetta</div>
          <div style={{ fontSize: '20px', fontWeight: 'bold', color: isSevereProlongation ? '#dc2626' : isBazettProlonged ? '#d97706' : '#0f172a' }}>
            {qtcBazett} <span style={{ fontSize: '12px' }}>ms</span>
          </div>
          <div style={{ fontSize: '10px', color: '#4b5563' }}>
            Norma: ♂ ≤450 ms, ♀ ≤460 ms (przeszacowuje przy tachykardii)
          </div>
        </div>

        <div style={{ background: '#fff', border: '1px solid #fee2e2', borderRadius: '8px', padding: '12px' }}>
          <div style={{ fontSize: '11px', color: '#991b1b', fontWeight: 'bold' }}>QTc wg Fridericia</div>
          <div style={{ fontSize: '20px', fontWeight: 'bold', color: isSevereProlongation ? '#dc2626' : isFridericiaProlonged ? '#d97706' : '#0f172a' }}>
            {qtcFridericia} <span style={{ fontSize: '12px' }}>ms</span>
          </div>
          <div style={{ fontSize: '10px', color: '#4b5563' }}>
            Norma: ≤450 ms (bardziej stabilna korekcja przy tachykardii)
          </div>
        </div>

        <div style={{ background: '#fff', border: '1px solid #fee2e2', borderRadius: '8px', padding: '12px' }}>
          <div style={{ fontSize: '11px', color: '#991b1b', fontWeight: 'bold' }}>Zespół Głodnych Kości (HBS)</div>
          <div style={{ fontSize: '13px', fontWeight: 'bold', color: preopAlp > 250 ? '#b45309' : '#0f172a' }}>
            {preopAlp > 300 ? 'Podwyższone ryzyko obrotu kostnego' : 'ALP w normie — nie wskazuje na przyspieszony obrót, ale sama ALP nie pozwala wykluczyć ryzyka HBS'}
          </div>
          <div style={{ fontSize: '10px', color: '#4b5563' }}>
            Ocena wieloczynnikowa: przedop. PTH, Ca, masa gruczolaka, osteitis fibrosa cystica, wiek i ALP
          </div>
        </div>
      </div>

      <div style={{ fontSize: '11px', color: '#7f1d1d', background: '#fff1f2', border: '1px solid #fecdd3', borderRadius: '6px', padding: '8px 12px' }}>
        <strong>Wskazówka interpretacyjna:</strong> QTc &gt; 500 ms wiąże się ze znacznym wzrostem ryzyka arytmii komorowych. Zawsze interpretuj QTc w kontekście szerokości zespołu QRS (przy LBBB lub stymulacji komór wzory korygujące tracą zastosowanie) oraz stężeń potasu i magnezu.
      </div>
    </div>
  );
}
