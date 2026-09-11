'use client';
import { useState, useMemo } from 'react';
import { Sliders, Activity, Sparkles, RefreshCw, AlertCircle } from 'lucide-react';

// ============================================================================
// 1. GOODWIN OSCILLATOR & LIMIT CYCLE INTERACTIVE CHART
// ============================================================================
export function GoodwinLimitCycleChart() {
  const [hillCoeffN, setHillCoeffN] = useState(8); // n od 2 do 12 (próg bifurkacji Hopfa przy n >= 8)

  // Symulacja numeryczna układu 3 równań Goodwina metodą Rungego-Kutty 4. rzędu
  const simulation = useMemo(() => {
    let x = 1.2;
    let y = 0.8;
    let z = 0.6;
    const a1 = 10, k1 = 1, b1 = 1.0;
    const a2 = 1.0, b2 = 1.0;
    const a3 = 1.0, b3 = 1.0;

    const dt = 0.05;
    const steps = 600;
    const timePts: { t: number; x: number; y: number; z: number }[] = [];
    const phasePts: { x: number; z: number }[] = [];

    // Faza rozbiegowa
    for (let i = 0; i < 200; i++) {
      const dx = a1 / (1 + k1 * Math.pow(Math.max(0, z), hillCoeffN)) - b1 * x;
      const dy = a2 * x - b2 * y;
      const dz = a3 * y - b3 * z;
      x += dx * dt;
      y += dy * dt;
      z += dz * dt;
    }

    // Zbieranie trajektorii
    for (let i = 0; i < steps; i++) {
      const dx = a1 / (1 + k1 * Math.pow(Math.max(0, z), hillCoeffN)) - b1 * x;
      const dy = a2 * x - b2 * y;
      const dz = a3 * y - b3 * z;
      x += dx * dt;
      y += dy * dt;
      z += dz * dt;

      if (i % 2 === 0) {
        timePts.push({ t: i * dt, x, y, z });
        phasePts.push({ x, z });
      }
    }

    return { timePts, phasePts };
  }, [hillCoeffN]);

  const isLimitCycle = hillCoeffN >= 8;

  // Przeskalowanie wykresu czasowego (X: 0..500, Y: 0..160)
  const timePath = simulation.timePts.map((p, i) => {
    const px = 35 + (i / simulation.timePts.length) * 450;
    const py = 160 - 20 - (p.x / 10) * 120;
    return `${i === 0 ? 'M' : 'L'} ${px.toFixed(1)} ${Math.max(15, Math.min(150, py)).toFixed(1)}`;
  }).join(' ');

  // Przeskalowanie wykresu fazowego [X, Z]
  const phasePath = simulation.phasePts.map((p, i) => {
    const px = 40 + (p.x / 10) * 180;
    const py = 180 - (p.z / 10) * 140;
    return `${i === 0 ? 'M' : 'L'} ${px.toFixed(1)} ${py.toFixed(1)}`;
  }).join(' ');

  return (
    <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '12px', padding: '18px', margin: '20px 0' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
        <div>
          <span style={{ fontSize: '11px', fontWeight: 700, color: '#1e40af', letterSpacing: '0.05em' }}>
            DYNAMIKA NIELINIOWA PRZYSADKI
          </span>
          <h4 style={{ margin: '2px 0 0', fontSize: '15px', color: '#0f172a' }}>
            Oscylator Goodwina: Samowzbudna pulsacja a współczynnik kooperatywności n
          </h4>
        </div>
        <span
          style={{
            fontSize: '12px',
            fontWeight: 700,
            padding: '4px 10px',
            borderRadius: '6px',
            background: isLimitCycle ? '#dcfce7' : '#fee2e2',
            color: isLimitCycle ? '#166534' : '#991b1b',
          }}
        >
          Umowny model trzech zmiennych
        </span>
      </div>

      {/* Suwak współczynnika n */}
      <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '12px 16px', marginBottom: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: 600, color: '#334155' }}>
          <span>Współczynnik kooperatywności Hilla (n w sprzężeniu ujemnym):</span>
          <strong style={{ color: '#2563eb', fontSize: '15px' }}>n = {hillCoeffN}</strong>
        </div>
        <input
          type="range"
          min="2"
          max="12"
          step="1"
          value={hillCoeffN}
          onChange={e => setHillCoeffN(Number(e.target.value))}
          style={{ width: '100%', marginTop: '6px' }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#64748b' }}>
          <span>n = 2 (tłumienie drgań)</span>
          <span style={{ color: '#e11d48', fontWeight: 600 }}>Stabilność zależy też od pozostałych parametrów</span>
          <span>n = 12 (ostre salwy impulsów)</span>
        </div>
      </div>

      {/* Dwa wykresy SVG: przebieg czasowy i przestrzeń fazowa */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px' }}>
        {/* Przebieg czasowy */}
        <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '10px' }}>
          <div style={{ fontSize: '11px', fontWeight: 700, color: '#475569', marginBottom: '6px', textAlign: 'center' }}>
            Stężenie GnRH X(t) w czasie (Pulsy neurosekrecyjne)
          </div>
          <svg viewBox="0 0 500 170" style={{ width: '100%', display: 'block' }}>
            <line x1="35" y1="140" x2="485" y2="140" stroke="#94a3b8" strokeWidth="1.5" />
            <line x1="35" y1="15" x2="35" y2="140" stroke="#94a3b8" strokeWidth="1.5" />
            <path d={timePath} fill="none" stroke="#2563eb" strokeWidth="2.5" />
            <text x="260" y="160" fill="#64748b" fontSize="10" textAnchor="middle">Czas t (j. umowne)</text>
            <text x="12" y="80" fill="#64748b" fontSize="10" transform="rotate(-90 12 80)" textAnchor="middle">GnRH [X]</text>
          </svg>
        </div>

        {/* Portret fazowy */}
        <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '10px' }}>
          <div style={{ fontSize: '11px', fontWeight: 700, color: '#475569', marginBottom: '6px', textAlign: 'center' }}>
            Przestrzeń fazowa [GnRH vs Steroid obwodowy Z]
          </div>
          <svg viewBox="0 0 250 170" style={{ width: '100%', display: 'block' }}>
            <line x1="30" y1="145" x2="230" y2="145" stroke="#94a3b8" strokeWidth="1.5" />
            <line x1="30" y1="15" x2="30" y2="145" stroke="#94a3b8" strokeWidth="1.5" />
            <path d={phasePath} fill="none" stroke="#7c3aed" strokeWidth="2" />
            <text x="130" y="162" fill="#64748b" fontSize="10" textAnchor="middle">GnRH [X]</text>
            <text x="14" y="80" fill="#64748b" fontSize="10" transform="rotate(-90 14 80)" textAnchor="middle">Steroid [Z]</text>
          </svg>
        </div>
      </div>

      <div style={{ marginTop: '12px', fontSize: '12px', color: '#334155', lineHeight: '1.45', background: '#f1f5f9', padding: '10px 14px', borderRadius: '6px' }}>
        <strong>Założenia:</strong> To schematyczny oscylator Goodwina, nie model kliniczny GnRH. Sam próg n ≥8 nie gwarantuje cyklu granicznego dla dowolnych parametrów. Charakter krzywej nie rozpoznaje niedoboru hormonu ani desensytyzacji receptorów.
      </div>
    </div>
  );
}

// ============================================================================
// 2. GLYCOPROTEIN HORMONE DIMER AND NONAPEPTIDE SCHEME
// ============================================================================
export function GlycoproteinDimerScheme() {
  const [selectedHormone, setSelectedHormone] = useState<'hCG' | 'LH' | 'TSH' | 'FSH'>('hCG');

  const hormoneData = {
    hCG: {
      betaLength: '145 aminokwasów',
      tail: 'Przedłużony C-końcowy peptyd CTP (31 aa) z 4 łańcuchami O-glikanów',
      halfLife: '24–36 godzin',
      role: 'Utrzymanie ciałka żółtego i ciąży; odporny na klirens nerkowy/wątrobowy',
      sialylation: 'Bardzo wysoka (ok. 20 reszt kwasu sjalowego)',
    },
    LH: {
      betaLength: '121 aminokwasów',
      tail: 'Brak CTP, obecność końcowej galaktozaminy siarczanowej',
      halfLife: '20–30 minut',
      role: 'Szybkie, ostre wyrzuty wywołujące owulację i szczyt testosteronu',
      sialylation: 'Niska (szybki wychwyt przez receptor wątrobowy GalNAc-4-SO4)',
    },
    TSH: {
      betaLength: '118 aminokwasów',
      tail: 'Swoista podjednostka beta-TSH wiążąca receptor TSH-R',
      halfLife: '50–60 minut',
      role: 'Ciągła stymulacja tyreocytów do wychwytu jodu i syntezy T4',
      sialylation: 'Umiarkowana',
    },
    FSH: {
      betaLength: '118 aminokwasów',
      tail: 'Dwa łańcuchy N-glikanów na podjednostce beta',
      halfLife: '2–4 godziny',
      role: 'Wzrost pęcherzyków jajnikowych i spermatogeneza',
      sialylation: 'Wysoka',
    },
  };

  const current = hormoneData[selectedHormone];

  return (
    <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '12px', padding: '18px', margin: '20px 0' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
        <div>
          <span style={{ fontSize: '11px', fontWeight: 700, color: '#0369a1', letterSpacing: '0.05em' }}>
            BIOCHEMIA I STEREOCHEMIA GLIKOPROTEIN
          </span>
          <h4 style={{ margin: '2px 0 0', fontSize: '15px', color: '#0f172a' }}>
            Wspólna podjednostka alfa (CGA) a zróżnicowanie podjednostek beta
          </h4>
        </div>
        <div style={{ display: 'flex', gap: '6px' }}>
          {(['hCG', 'LH', 'TSH', 'FSH'] as const).map(h => (
            <button
              key={h}
              type="button"
              onClick={() => setSelectedHormone(h)}
              style={{
                padding: '4px 10px',
                borderRadius: '6px',
                border: '1px solid',
                borderColor: selectedHormone === h ? '#0284c7' : '#cbd5e1',
                background: selectedHormone === h ? '#0284c7' : '#fff',
                color: selectedHormone === h ? '#fff' : '#334155',
                fontWeight: 600,
                fontSize: '12px',
                cursor: 'pointer',
              }}
            >
              {h}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '14px', marginBottom: '14px' }}>
        {/* Schemat cząsteczki */}
        <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '14px' }}>
          <div style={{ fontSize: '11px', fontWeight: 700, color: '#64748b', marginBottom: '8px' }}>
            STRUKTURA HETERODIMERU {selectedHormone}
          </div>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            {/* Łańcuch alfa */}
            <div style={{ flex: 1, background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '8px', padding: '10px', textAlign: 'center' }}>
              <div style={{ fontSize: '11px', fontWeight: 700, color: '#1d4ed8' }}>ŁAŃCUCH ALFA (CGA)</div>
              <div style={{ fontSize: '13px', fontWeight: 600, color: '#1e3a8a', marginTop: '4px' }}>92 aminokwasy</div>
              <div style={{ fontSize: '11px', color: '#3b82f6', marginTop: '2px' }}>100% identyczny we wszystkich 4 hormonach</div>
            </div>

            <span style={{ fontSize: '16px', fontWeight: 700, color: '#64748b' }}>+</span>

            {/* Łańcuch beta */}
            <div style={{ flex: 1, background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '8px', padding: '10px', textAlign: 'center' }}>
              <div style={{ fontSize: '11px', fontWeight: 700, color: '#b91c1c' }}>ŁAŃCUCH BETA ({selectedHormone}β)</div>
              <div style={{ fontSize: '13px', fontWeight: 600, color: '#7f1d1d', marginTop: '4px' }}>{current.betaLength}</div>
              <div style={{ fontSize: '11px', color: '#ef4444', marginTop: '2px' }}>Decyduje o swoistości receptorowej</div>
            </div>
          </div>

          <div style={{ marginTop: '12px', fontSize: '12px', color: '#475569' }}>
            <strong>Ogon C-końcowy i glikozylacja: </strong> {current.tail}
          </div>
        </div>

        {/* Właściwości farmakokinetyczne */}
        <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '14px' }}>
          <div style={{ fontSize: '11px', fontWeight: 700, color: '#64748b', marginBottom: '8px' }}>
            KONSEKWENCJE BIOLOGICZNE
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px' }}>
            <div>
              <span style={{ color: '#64748b' }}>Okres półtrwania (t1/2): </span>
              <strong style={{ color: '#0f172a' }}>{current.halfLife}</strong>
            </div>
            <div>
              <span style={{ color: '#64748b' }}>Stopień sialilacji (kwas sjalowy): </span>
              <strong style={{ color: '#0369a1' }}>{current.sialylation}</strong>
            </div>
            <div style={{ marginTop: '4px', fontSize: '12px', color: '#334155', lineHeight: '1.4' }}>
              <strong>Rola fizjologiczna: </strong> {current.role}
            </div>
          </div>
        </div>
      </div>

      <div style={{ fontSize: '12px', color: '#334155', background: '#f1f5f9', padding: '10px 14px', borderRadius: '6px', lineHeight: '1.45' }}>
        <strong>Zagadka z egzaminu klinicznego:</strong> Dlaczego w 1. trymestrze ciąży dochodzi do fizjologicznego spadku stężenia TSH? Syncytiotrofoblast produkuje ogromne ilości hCG (&gt;100 000 mIU/ml). Z powodu <strong>identycznej podjednostki alfa</strong> i wysokiej homologii podjednostek beta, megastężenia hCG wykazują słabą, ale zauważalną krzyżową aktywność wobec receptora TSH-R, stymulując produkcję FT4 i hamując przysadkowe wydzielanie TSH w mechanizmie ujemnego sprzężenia.
      </div>
    </div>
  );
}
