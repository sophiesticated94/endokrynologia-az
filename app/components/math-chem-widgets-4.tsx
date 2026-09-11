'use client';
import { useState } from 'react';
import { Activity, Scale, Zap, Atom, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';
import { calculateVermeulen } from '../../lib/gonad-simulator';

export function VermeulenFreeTestosteroneCalculator() {
  const [totalT, setTotalT] = useState<number>(15.0); // nmol/L
  const [shbg, setShbg] = useState<number>(30.0); // nmol/L
  const [albumin, setAlbumin] = useState<number>(43.0); // g/L

  const result = calculateVermeulen(totalT, shbg, albumin);
  const isShbgExtreme = shbg < 15 || shbg > 85;

  return (
    <div style={{ background: 'var(--surface-primary, #fff)', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '18px', maxWidth: '780px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
        <Scale size={20} color="#0284c7" />
        <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 800 }}>
          Kalkulator równania Vermeulena (prawo działania mas) vs wskaźnik FAI
        </h3>
      </div>
      <p style={{ fontSize: '12px', color: '#64748b', margin: '0 0 16px 0' }}>
        Rozwiązuje analitycznie kanoniczne równanie kwadratowe Vermeulena a[T_free]² + b[T_free] + c = 0 dla stałych K_s = 1,0×10⁹ M⁻¹ i K_a = 3,6×10⁴ M⁻¹.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '14px', marginBottom: '16px' }}>
        <div>
          <label style={{ fontSize: '12px', display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
            <span>Testosteron całkowity:</span>
            <strong>{totalT} nmol/l</strong>
          </label>
          <input
            type="range"
            min="0.1"
            max="40.0"
            step="0.1"
            value={totalT}
            onChange={e => setTotalT(Number(e.target.value))}
            style={{ width: '100%' }}
          />
        </div>

        <div>
          <label style={{ fontSize: '12px', display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
            <span>SHBG:</span>
            <strong>{shbg} nmol/l</strong>
          </label>
          <input
            type="range"
            min="8.0"
            max="120.0"
            step="1"
            value={shbg}
            onChange={e => setShbg(Number(e.target.value))}
            style={{ width: '100%' }}
          />
        </div>

        <div>
          <label style={{ fontSize: '12px', display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
            <span>Albumina osocza:</span>
            <strong>{albumin} g/l</strong>
          </label>
          <input
            type="range"
            min="25.0"
            max="55.0"
            step="1"
            value={albumin}
            onChange={e => setAlbumin(Number(e.target.value))}
            style={{ width: '100%' }}
          />
        </div>
      </div>

      {isShbgExtreme && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 14px', background: '#fffbeb', border: '1px solid #fde68a', borderRadius: '8px', color: '#92400e', fontSize: '12px', marginBottom: '14px' }}>
          <AlertTriangle size={16} />
          <span>
            <strong>Uwaga:</strong> Skrajne stężenie SHBG ({shbg} nmol/l). Wskaźnik FAI traci wiarygodność! FAI nie jest stężeniem wolnego T. Także cFT jest estymacją zależną od jakości oznaczeń i założeń wiązania.
          </span>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '12px', textAlign: 'center', marginBottom: '14px' }}>
        <div style={{ padding: '12px', background: '#eff6ff', borderRadius: '8px', border: '1px solid #bfdbfe' }}>
          <div style={{ fontSize: '11px', color: '#1e40af', fontWeight: 600 }}>Wolny testosteron (Free T)</div>
          <div style={{ fontSize: '22px', fontWeight: 800, color: '#1d4ed8' }}>{result.freeT_pmol} <span style={{ fontSize: '12px' }}>pmol/l</span></div>
          <div style={{ fontSize: '11px', color: '#3b82f6' }}>{result.freeT_ng_dl} ng/dl ({result.freeT_percent}%)</div>
        </div>
        <div style={{ padding: '12px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
          <div style={{ fontSize: '11px', color: '#475569', fontWeight: 600 }}>Biodostępny T (Bio-T)</div>
          <div style={{ fontSize: '22px', fontWeight: 800, color: '#0f172a' }}>{result.bioavailableT_nmol} <span style={{ fontSize: '12px' }}>nmol/l</span></div>
          <div style={{ fontSize: '11px', color: '#64748b' }}>{result.bioavailableT_percent}% całkowitego</div>
        </div>
        <div style={{ padding: '12px', background: isShbgExtreme ? '#fffbeb' : '#f8fafc', borderRadius: '8px', border: '1px solid', borderColor: isShbgExtreme ? '#fde68a' : '#e2e8f0' }}>
          <div style={{ fontSize: '11px', color: isShbgExtreme ? '#92400e' : '#475569', fontWeight: 600 }}>Wskaźnik FAI</div>
          <div style={{ fontSize: '22px', fontWeight: 800, color: isShbgExtreme ? '#b45309' : '#0f172a' }}>{result.fai}</div>
          <div style={{ fontSize: '11px', color: '#64748b' }}>(100 × T) / SHBG</div>
        </div>
      </div>
    </div>
  );
}

export function GnrhPulseAndHpgOscillator() {
  const [pulseInterval, setPulseInterval] = useState<number>(75); // min (40 - 180)
  const [feedbackDelayTau, setFeedbackDelayTau] = useState<number>(60); // min (20 - 120)
  const [inhibitionKi, setInhibitionKi] = useState<number>(18); // nmol/L sensitivity

  // Generate a 12-hour waveform (720 min)
  const totalMinutes = 720;
  const timeStep = 5;
  const pointsCount = Math.floor(totalMinutes / timeStep);

  const waveform: { t: number; gnrh: number; lh: number; test: number }[] = [];
  let prevTest = 15;

  for (let i = 0; i < pointsCount; i++) {
    const t = i * timeStep;
    // GnRH pulse generation: delta trains triggered every pulseInterval
    const phase = t % pulseInterval;
    const isPulse = phase < 15;
    const pulseStrength = isPulse ? Math.exp(-Math.pow(phase - 5, 2) / 12) : 0.05;

    // Delayed negative feedback
    const delayedTest = waveform[Math.max(0, i - Math.round(feedbackDelayTau / timeStep))]?.test ?? 15;
    const delayedInhibition = 1 / (1 + Math.pow(delayedTest / inhibitionKi, 2.5));
    const gnrh = 0.2 + pulseStrength * 4.5 * delayedInhibition;

    // LH response depends on GnRH pulse frequency (high frequency fawors LH)
    const freqFactor = pulseInterval < 80 ? 1.4 : pulseInterval > 120 ? 0.7 : 1.0;
    const lh = Math.max(0.5, gnrh * 2.2 * freqFactor);

    // Testosterone lags behind LH
    const targetTest = 5 + lh * 2.8;
    prevTest += (targetTest - prevTest) * 0.08;

    waveform.push({ t, gnrh, lh, test: prevTest });
  }

  const svgW = 600;
  const svgH = 180;
  const pad = { top: 15, right: 20, bottom: 25, left: 35 };

  const getX = (m: number) => pad.left + (m / totalMinutes) * (svgW - pad.left - pad.right);
  const getYLh = (val: number) => pad.top + (1 - Math.min(25, val) / 25) * (svgH - pad.top - pad.bottom);
  const getYT = (val: number) => pad.top + (1 - Math.min(35, val) / 35) * (svgH - pad.top - pad.bottom);

  const lhPath = waveform.map((p, idx) => `${idx === 0 ? 'M' : 'L'} ${getX(p.t)} ${getYLh(p.lh)}`).join(' ');
  const tPath = waveform.map((p, idx) => `${idx === 0 ? 'M' : 'L'} ${getX(p.t)} ${getYT(p.test)}`).join(' ');

  return (
    <div style={{ background: 'var(--surface-primary, #fff)', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '18px', maxWidth: '780px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
        <Activity size={20} color="#16a34a" />
        <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 800 }}>
          Ilustracyjny generator pulsów GnRH i opóźnione sprzężenie
        </h3>
      </div>
      <p style={{ fontSize: '12px', color: '#64748b', margin: '0 0 16px 0' }}>
        Umowny model dyskretny: zmień interwał i opóźnienie, obserwuj kształt krzywych. Parametry nie są dopasowane do pacjenta; wykres nie wylicza wyników laboratoryjnych.
      </p>

      {/* SVG Waveform Plot */}
      <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '10px', marginBottom: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontWeight: 600, color: '#475569', marginBottom: '4px' }}>
          <span>Przebieg 12-godzinny (0–720 min)</span>
          <div style={{ display: 'flex', gap: '12px' }}>
            <span style={{ color: '#16a34a' }}>— Sygnał LH (j. umowne)</span>
            <span style={{ color: '#0284c7' }}>— Sygnał T (j. umowne)</span>
          </div>
        </div>

        <svg viewBox={`0 0 ${svgW} ${svgH}`} style={{ width: '100%', height: 'auto', overflow: 'visible' }}>
          {/* Grid lines */}
          <line x1={pad.left} y1={pad.top} x2={pad.left} y2={svgH - pad.bottom} stroke="#cbd5e1" />
          <line x1={pad.left} y1={svgH - pad.bottom} x2={svgW - pad.right} y2={svgH - pad.bottom} stroke="#cbd5e1" />

          {/* Paths */}
          <path d={lhPath} fill="none" stroke="#16a34a" strokeWidth="2" />
          <path d={tPath} fill="none" stroke="#0284c7" strokeWidth="2.5" />

          {/* Time markers */}
          <text x={getX(0)} y={svgH - 8} fontSize="9" textAnchor="middle" fill="#64748b">0h</text>
          <text x={getX(180)} y={svgH - 8} fontSize="9" textAnchor="middle" fill="#64748b">3h</text>
          <text x={getX(360)} y={svgH - 8} fontSize="9" textAnchor="middle" fill="#64748b">6h</text>
          <text x={getX(540)} y={svgH - 8} fontSize="9" textAnchor="middle" fill="#64748b">9h</text>
          <text x={getX(720)} y={svgH - 8} fontSize="9" textAnchor="middle" fill="#64748b">12h</text>
        </svg>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '14px' }}>
        <div>
          <label style={{ fontSize: '12px', display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
            <span>Interwał pulsów GnRH:</span>
            <strong>{pulseInterval} min</strong>
          </label>
          <input
            type="range"
            min="45"
            max="160"
            step="5"
            value={pulseInterval}
            onChange={e => setPulseInterval(Number(e.target.value))}
            style={{ width: '100%' }}
          />
        </div>

        <div>
          <label style={{ fontSize: '12px', display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
            <span>Opóźnienie pętli (τ):</span>
            <strong>{feedbackDelayTau} min</strong>
          </label>
          <input
            type="range"
            min="20"
            max="100"
            step="5"
            value={feedbackDelayTau}
            onChange={e => setFeedbackDelayTau(Number(e.target.value))}
            style={{ width: '100%' }}
          />
        </div>

        <div>
          <label style={{ fontSize: '12px', display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
            <span>Stała hamowania (K_i):</span>
            <strong>{inhibitionKi} j. umownych</strong>
          </label>
          <input
            type="range"
            min="8"
            max="35"
            step="1"
            value={inhibitionKi}
            onChange={e => setInhibitionKi(Number(e.target.value))}
            style={{ width: '100%' }}
          />
        </div>
      </div>
    </div>
  );
}

export function AromataseAndSermMolecularVisualizer() {
  const [selectedReaction, setSelectedReaction] = useState<'aromatase' | '5alpha' | 'serm'>('aromatase');

  return (
    <div style={{ background: 'var(--surface-primary, #fff)', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '18px', maxWidth: '780px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
        <Atom size={20} color="#9333ea" />
        <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 800 }}>
          Wizualizator biochemiczny: Aromataza (CYP19A1), 5α-reduktaza i allosteria SERM
        </h3>
      </div>
      <p style={{ fontSize: '12px', color: '#64748b', margin: '0 0 16px 0' }}>
        Szczegółowy mechanizm eliminacji grupy C19 jako mrówczanu HCOOH, redukcji stereospecyficznej do DHT oraz allosterycznego wypchnięcia helisy 12 (H12) przez SERM.
      </p>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '6px', marginBottom: '16px' }}>
        <button
          type="button"
          onClick={() => setSelectedReaction('aromatase')}
          style={{
            flex: 1,
            padding: '8px',
            borderRadius: '6px',
            fontSize: '12px',
            fontWeight: 700,
            border: '1px solid',
            borderColor: selectedReaction === 'aromatase' ? '#9333ea' : '#e2e8f0',
            background: selectedReaction === 'aromatase' ? '#f3e8ff' : '#fff',
            color: selectedReaction === 'aromatase' ? '#7e22ce' : '#475569',
            cursor: 'pointer',
          }}
        >
          1. Aromataza CYP19A1 (3 etapy utlenienia)
        </button>
        <button
          type="button"
          onClick={() => setSelectedReaction('5alpha')}
          style={{
            flex: 1,
            padding: '8px',
            borderRadius: '6px',
            fontSize: '12px',
            fontWeight: 700,
            border: '1px solid',
            borderColor: selectedReaction === '5alpha' ? '#0284c7' : '#e2e8f0',
            background: selectedReaction === '5alpha' ? '#e0f2fe' : '#fff',
            color: selectedReaction === '5alpha' ? '#0369a1' : '#475569',
            cursor: 'pointer',
          }}
        >
          2. 5α-reduktaza SRD5A2 (Testosteron → DHT)
        </button>
        <button
          type="button"
          onClick={() => setSelectedReaction('serm')}
          style={{
            flex: 1,
            padding: '8px',
            borderRadius: '6px',
            fontSize: '12px',
            fontWeight: 700,
            border: '1px solid',
            borderColor: selectedReaction === 'serm' ? '#db2777' : '#e2e8f0',
            background: selectedReaction === 'serm' ? '#fce7f3' : '#fff',
            color: selectedReaction === 'serm' ? '#be185d' : '#475569',
            cursor: 'pointer',
          }}
        >
          3. Allosteria SERM i helisa 12 (ERα LBD)
        </button>
      </div>

      {/* Content based on selection */}
      {selectedReaction === 'aromatase' && (
        <div style={{ background: '#faf5ff', border: '1px solid #e9d5ff', borderRadius: '10px', padding: '16px' }}>
          <div style={{ fontSize: '13px', fontWeight: 700, color: '#6b21a8', marginBottom: '8px' }}>
            3-etapowa aromatyzacja pierścienia A (CYP19A1 + 3 NADPH + 3 O₂)
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '10px', fontSize: '11px', color: '#3b0764' }}>
            <div style={{ padding: '10px', background: '#fff', borderRadius: '8px', border: '1px solid #d8b4fe' }}>
              <div style={{ fontWeight: 700, marginBottom: '4px' }}>Etap I: Hydroksylacja C19</div>
              <div>Testosteron + O₂ + NADPH → 19-hydroksytestosteron. Utlenienie grupy metylowej przy węglu C10 do alkoholu pierwszorzędowego.</div>
            </div>
            <div style={{ padding: '10px', background: '#fff', borderRadius: '8px', border: '1px solid #d8b4fe' }}>
              <div style={{ fontWeight: 700, marginBottom: '4px' }}>Etap II: Drugie utlenienie</div>
              <div>19-OH-T + O₂ + NADPH → 19-okso- lub 19,19-gem-diol. Przekształcenie w aldehyd lub geminalny diol w kieszeni katalitycznej hemu.</div>
            </div>
            <div style={{ padding: '10px', background: '#fff', borderRadius: '8px', border: '1px solid #d8b4fe' }}>
              <div style={{ fontWeight: 700, marginBottom: '4px' }}>Etap III: Eliminacja i fenol</div>
              <div>Trzecie utlenienie przez żelazo hemu wyzwala odszczepienie C19 jako mrówczan (HCOOH), enolizację i aromatyzację do pierścienia fenolowego 17β-estradiolu!</div>
            </div>
          </div>
        </div>
      )}

      {selectedReaction === '5alpha' && (
        <div style={{ background: '#f0f9ff', border: '1px solid #bae6fd', borderRadius: '10px', padding: '16px' }}>
          <div style={{ fontSize: '13px', fontWeight: 700, color: '#0369a1', marginBottom: '8px' }}>
            Stereospecyficzna redukcja wiązania Δ⁴ przez SRD5A2 (5α-reduktazę)
          </div>
          <div style={{ fontSize: '12px', color: '#0c4a6e', lineHeight: 1.6 }}>
            Enzym przenosi jon wodorkowy H⁻ z kofaktora NADPH na atom węgla C5 testosteronu wyłącznie od strony α (pod płaszczyzną pierścienia). Wymusza to konformację trans pierścieni A i B, tworząc 5α-dihydrotestosteron (DHT). DHT ma 2–5× wyższe powinowactwo do receptora AR i 10× wolniejszą dysocjację niż testosteron. Ponieważ pierścień A staje się w pełni nasycony, DHT <strong>nie może ulec aromatyzacji do estrogenów</strong>.
          </div>
        </div>
      )}

      {selectedReaction === 'serm' && (
        <div style={{ background: '#fdf2f8', border: '1px solid #fbcfe8', borderRadius: '10px', padding: '16px' }}>
          <div style={{ fontSize: '13px', fontWeight: 700, color: '#9d174d', marginBottom: '8px' }}>
            Mechanizm allosteryczny SERM (Tamoksyfen/Raloksyfen) na helisę 12 (H12)
          </div>
          <div style={{ fontSize: '12px', color: '#831843', lineHeight: 1.6 }}>
            Naturalny 17β-estradiol mieści się wewnątrz kieszeni LBD receptora ERα, pozwalając helisie 12 (H12) zamknąć kieszeń w pozycji „wieczka” (lid position) i utworzyć bruzdę wiążącą koaktywatory transkrypcji (p160/SRC-1). Cząsteczka tamoksyfenu posiada wystający, przestrzenny łańcuch boczny dwumetyloaminoetoksylowy, który wywołuje zawadę steryczną. Helisa H12 zostaje odepchnięta do bruzdy koaktywatora, fizycznie blokując transkrypcję genów mitogennych w tkance gruczołu piersiowego.
          </div>
        </div>
      )}
    </div>
  );
}
