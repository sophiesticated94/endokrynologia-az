'use client';
import { useState } from 'react';
import { Activity, Flame, Sliders, ArrowRight, Zap, CheckCircle2 } from 'lucide-react';

export function BergmanMinimalModelCalculator() {
  const [si, setSi] = useState<number>(5.0); // Insulin Sensitivity Index (10^-4 min^-1 / (uU/ml))
  const [sg, setSg] = useState<number>(0.02); // Glucose Effectiveness (min^-1)
  const [tdd, setTdd] = useState<number>(40); // Total Daily Dose (units)
  const [glucose, setGlucose] = useState<number>(180); // mg/dl
  const [fastingInsulin, setFastingInsulin] = useState<number>(12); // uU/ml

  // HOMA-IR = (G * I) / 405 (dla G w mg/dl)
  const homaIr = Number(((glucose * fastingInsulin) / 405).toFixed(2));
  // HOMA-B = (20 * I) / (G/18 - 3.5) %
  const gMmol = glucose / 18;
  const homaB = gMmol > 3.5 ? Math.round((20 * fastingInsulin) / (gMmol - 3.5)) : 0;

  // Reguły 1800 i 500
  const isf = Math.round(1800 / tdd);
  const icr = Math.round(500 / tdd);
  const targetG = 100;
  const correctionBolus = Number((Math.max(0, (glucose - targetG) / isf)).toFixed(1));

  return (
    <div style={{ background: 'var(--surface-primary, #fff)', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '18px', maxWidth: '780px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
        <Activity size={20} color="#0284c7" />
        <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 800 }}>
          Interaktywny kalkulator Minimal Model Bergmana, HOMA i reguł ISF/ICR
        </h3>
      </div>
      <p style={{ fontSize: '12px', color: '#64748b', margin: '0 0 16px 0' }}>
        Modeluje równania różniczkowe kinetyki Bergmana dG/dt = -(S_G + X)G + S_G G_b oraz reguły pompowe intensywnej insulinoterapii.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
        <div>
          <label style={{ fontSize: '12px', display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
            <span>Wrażliwość na insulinę ($S_I \times 10^{-4}$):</span>
            <strong>{si.toFixed(1)}</strong>
          </label>
          <input
            type="range"
            min="0.5"
            max="12.0"
            step="0.5"
            value={si}
            onChange={e => setSi(Number(e.target.value))}
            style={{ width: '100%' }}
          />
          <small style={{ fontSize: '10px', color: '#64748b' }}>Zdrowy: 5,0–8,0; Oporność T2D: &lt; 2,5</small>
        </div>

        <div>
          <label style={{ fontSize: '12px', display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
            <span>Dobowa dawka insuliny (TDD):</span>
            <strong>{tdd} j./dobę</strong>
          </label>
          <input
            type="range"
            min="15"
            max="100"
            step="1"
            value={tdd}
            onChange={e => setTdd(Number(e.target.value))}
            style={{ width: '100%' }}
          />
          <small style={{ fontSize: '10px', color: '#64748b' }}>Do obliczenia współczynników ISF i ICR</small>
        </div>

        <div>
          <label style={{ fontSize: '12px', display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
            <span>Glikemia aktualna ($G_0$):</span>
            <strong>{glucose} mg/dl</strong>
          </label>
          <input
            type="range"
            min="70"
            max="350"
            step="5"
            value={glucose}
            onChange={e => setGlucose(Number(e.target.value))}
            style={{ width: '100%' }}
          />
        </div>

        <div>
          <label style={{ fontSize: '12px', display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
            <span>Insulinemia na czczo ($I_0$):</span>
            <strong>{fastingInsulin} $\mu$U/ml</strong>
          </label>
          <input
            type="range"
            min="2"
            max="60"
            step="1"
            value={fastingInsulin}
            onChange={e => setFastingInsulin(Number(e.target.value))}
            style={{ width: '100%' }}
          />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', background: '#f8fafc', padding: '12px', borderRadius: '10px' }}>
        <div style={{ textAlign: 'center' }}>
          <span style={{ fontSize: '11px', color: '#64748b' }}>HOMA-IR</span>
          <div style={{ fontSize: '18px', fontWeight: 800, color: homaIr > 2.5 ? '#d97706' : '#16a34a' }}>
            {homaIr}
          </div>
          <small style={{ fontSize: '10px', color: '#94a3b8' }}>Norma &lt; 2,5</small>
        </div>

        <div style={{ textAlign: 'center' }}>
          <span style={{ fontSize: '11px', color: '#64748b' }}>ISF (Reguła 1800)</span>
          <div style={{ fontSize: '18px', fontWeight: 800, color: '#0284c7' }}>
            {isf} mg/dl/j.
          </div>
          <small style={{ fontSize: '10px', color: '#94a3b8' }}>1800 / TDD</small>
        </div>

        <div style={{ textAlign: 'center' }}>
          <span style={{ fontSize: '11px', color: '#64748b' }}>ICR (Reguła 500)</span>
          <div style={{ fontSize: '18px', fontWeight: 800, color: '#0284c7' }}>
            {icr} g/j.
          </div>
          <small style={{ fontSize: '10px', color: '#94a3b8' }}>500 / TDD</small>
        </div>

        <div style={{ textAlign: 'center' }}>
          <span style={{ fontSize: '11px', color: '#64748b' }}>Bolus korekty</span>
          <div style={{ fontSize: '18px', fontWeight: 800, color: correctionBolus > 0 ? '#dc2626' : '#16a34a' }}>
            {correctionBolus} j.
          </div>
          <small style={{ fontSize: '10px', color: '#94a3b8' }}>Cel 100 mg/dl</small>
        </div>
      </div>
    </div>
  );
}

export function InsulinReceptorAndKetogenesisVisualizer() {
  const [activeMode, setActiveMode] = useState<'insulin' | 'ketones'>('insulin');
  const [currentStep, setCurrentStep] = useState<number>(0);

  const insulinSteps = [
    {
      title: '1. Związanie insuliny i autofosforylacja INSR',
      desc: 'Insulina wiąże się z podjednostką alfa receptora, wywołując autofosforylację reszt tyrozyny (Tyr1158/62/63) w domenie kinazy podjednostki beta.',
      enzymes: 'Receptor insulinowy (kinaza Tyr)',
    },
    {
      title: '2. Rekrutacja IRS-1 i aktywacja PI3K',
      desc: 'Ufosforylowany na tyrozynie IRS-1 wiąże podjednostkę p85 kinazy PI3K, która przekształca błonowy PIP2 w drugi przekaźnik PIP3.',
      enzymes: 'IRS-1 -> PI3K (p85/p110) -> PIP3',
    },
    {
      title: '3. Kaskada kinazy Akt/PKB i fosforylacja AS160',
      desc: 'PIP3 rekrutuje PDK1 i Akt. Uruchomiona kinaza Akt fosforyluje białko AS160 (Rab-GAP), wyłączając hamowanie białek Rab.',
      enzymes: 'PDK1 -> Akt (Thr308/Ser473) -> AS160',
    },
    {
      title: '4. Fuzja pęcherzyków i translokacja GLUT4',
      desc: 'Aktywne białka Rab (Rab8A/Rab10) kierują pęcherzyki GSV do błony komórkowej. Następuje fuzja i masowy napływ glukozy do miocytu.',
      enzymes: 'GSV -> Fuzja z błoną -> Napływ Glukozy przez GLUT4',
    },
  ];

  const ketoneSteps = [
    {
      title: '1. Niedobór insuliny i lipoliza w adipocytach',
      desc: 'Brak insuliny odhamowuje lipazę HSL. Wolne kwasy tłuszczowe (FFA) zalewają wątrobę i wchodzą w beta-oksydację, tworząc nadmiar Acetylo-CoA.',
      enzymes: 'Lipaza HSL -> FFA -> beta-oksydacja -> Acetylo-CoA',
    },
    {
      title: '2. Kondensacja tiolazowa i synteza HMG-CoA',
      desc: 'Mitochondrialna tiolaza kondensuje 2 cząsteczki Acetylo-CoA w Acetoacetylo-CoA. Syntaza HMGCS2 dołącza trzeci Acetylo-CoA, tworząc HMG-CoA.',
      enzymes: 'Tiolaza -> HMGCS2 (mitochondrialna syntaza HMG-CoA)',
    },
    {
      title: '3. Rozszczepienie do wolnego acetooctanu',
      desc: 'Liaza HMG-CoA odszczepia Acetylo-CoA, uwalniając pierwszy wolny kwas ketonowy — acetooctan.',
      enzymes: 'Liaza HMG-CoA -> Wolny Acetooctan',
    },
    {
      title: '4. Redukcja do beta-hydroksymaślanu i kwasica HAGMA',
      desc: 'Wysoki potencjał NADH redukuje acetooctan do beta-hydroksymaślanu (stanowiącego >85% ketonów). Luka anionowa AG wzrasta > 20–30 mmol/L.',
      enzymes: 'Dehydrogenaza beta-hydroksymaślanowa -> Ketonemia + HAGMA',
    },
  ];

  const steps = activeMode === 'insulin' ? insulinSteps : ketoneSteps;

  return (
    <div style={{ background: 'var(--surface-primary, #fff)', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '18px', maxWidth: '780px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {activeMode === 'insulin' ? <Zap size={20} color="#0284c7" /> : <Flame size={20} color="#dc2626" />}
          <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 800 }}>
            {activeMode === 'insulin' ? 'Szlak transdukcji sygnału receptora insulinowego do GLUT4' : 'Mitochondrialny szlak ketogenezy w kwasicy ketonowej'}
          </h3>
        </div>
        <div style={{ display: 'flex', gap: '6px' }}>
          <button
            type="button"
            onClick={() => { setActiveMode('insulin'); setCurrentStep(0); }}
            style={{
              padding: '6px 10px',
              borderRadius: '6px',
              border: activeMode === 'insulin' ? '2px solid #0284c7' : '1px solid #cbd5e1',
              background: activeMode === 'insulin' ? '#f0f9ff' : '#fff',
              fontSize: '11px',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            Szlak GLUT4
          </button>
          <button
            type="button"
            onClick={() => { setActiveMode('ketones'); setCurrentStep(0); }}
            style={{
              padding: '6px 10px',
              borderRadius: '6px',
              border: activeMode === 'ketones' ? '2px solid #dc2626' : '1px solid #cbd5e1',
              background: activeMode === 'ketones' ? '#fef2f2' : '#fff',
              fontSize: '11px',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            Ketogeneza DKA
          </button>
        </div>
      </div>

      {/* Stepper bar */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '6px', marginBottom: '16px' }}>
        {steps.map((s, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setCurrentStep(i)}
            style={{
              padding: '8px 6px',
              borderRadius: '6px',
              border: currentStep === i ? (activeMode === 'insulin' ? '2px solid #0284c7' : '2px solid #dc2626') : '1px solid #e2e8f0',
              background: currentStep === i ? (activeMode === 'insulin' ? '#f0f9ff' : '#fef2f2') : '#f8fafc',
              textAlign: 'center',
              fontSize: '11px',
              fontWeight: currentStep === i ? 800 : 500,
              cursor: 'pointer',
            }}
          >
            Etap {i + 1}
          </button>
        ))}
      </div>

      {/* Current Step Card */}
      <div style={{ padding: '16px', borderRadius: '10px', background: activeMode === 'insulin' ? '#f0f9ff' : '#fef2f2', border: activeMode === 'insulin' ? '1px solid #bae6fd' : '1px solid #fecaca' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <strong style={{ fontSize: '14px', color: activeMode === 'insulin' ? '#0369a1' : '#991b1b' }}>
            {steps[currentStep].title}
          </strong>
          <span style={{ fontSize: '11px', padding: '2px 8px', borderRadius: '4px', background: '#fff', fontWeight: 600 }}>
            {steps[currentStep].enzymes}
          </span>
        </div>
        <p style={{ fontSize: '13px', lineHeight: '1.6', color: 'var(--text-secondary, #334155)', margin: '0 0 12px 0' }}>
          {steps[currentStep].desc}
        </p>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
          {currentStep > 0 && (
            <button
              type="button"
              onClick={() => setCurrentStep(currentStep - 1)}
              style={{ padding: '6px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', background: '#fff', fontSize: '12px', cursor: 'pointer' }}
            >
              Wstecz
            </button>
          )}
          {currentStep < steps.length - 1 ? (
            <button
              type="button"
              onClick={() => setCurrentStep(currentStep + 1)}
              style={{ padding: '6px 14px', borderRadius: '6px', border: 'none', background: activeMode === 'insulin' ? '#0284c7' : '#dc2626', color: '#fff', fontSize: '12px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
            >
              Kolejny etap <ArrowRight size={14} />
            </button>
          ) : (
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#16a34a', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <CheckCircle2 size={16} /> Cykl ukończony
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
