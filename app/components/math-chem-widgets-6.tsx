'use client';
import { useState } from 'react';
import { Scale, HeartPulse, Activity, AlertTriangle, ShieldCheck, Flame, Pill, Info } from 'lucide-react';

// 1. Hall Energy Balance & Bariatric Weight Loss Predictor
export function HallEnergyBalanceAndBariatricPredictor() {
  const [weightKg, setWeightKg] = useState<number>(105);
  const [heightCm, setHeightCm] = useState<number>(170);
  const [age, setAge] = useState<number>(42);
  const [sex, setSex] = useState<'M' | 'F'>('F');
  const [deficitKcal, setDeficitKcal] = useState<number>(500);
  const [weeks, setWeeks] = useState<number>(24);
  const [procedure, setProcedure] = useState<'none' | 'lsg' | 'rygb'>('none');

  const bmi = Math.round((weightKg / Math.pow(heightCm / 100, 2)) * 10) / 10;
  const idealWeightKg = Math.round(22.5 * Math.pow(heightCm / 100, 2) * 10) / 10;
  const excessWeightKg = Math.max(0, Math.round((weightKg - idealWeightKg) * 10) / 10);

  // Wishnofsky static: 7700 kcal deficit = 1 kg loss linearly
  const staticLossKg = Math.round(((deficitKcal * 7 * weeks) / 7700) * 10) / 10;
  const staticFinalWeight = Math.max(idealWeightKg * 0.7, Math.round((weightKg - staticLossKg) * 10) / 10);

  // Hall dynamic model: adaptive thermogenesis ~ 25 kcal/day per kg lost + drop in BMR
  const adaptationFactor = 1 - Math.min(0.35, (weeks * 0.012));
  const dynamicLossKg = Math.round(staticLossKg * adaptationFactor * 10) / 10;
  const dynamicFinalWeight = Math.max(idealWeightKg * 0.7, Math.round((weightKg - dynamicLossKg) * 10) / 10);
  const adaptiveDeficitDrop = Math.round(dynamicLossKg * 22); // kcal/day saved by body

  // Bariatric prediction
  const ewlPctExpected = procedure === 'rygb' ? 70 : procedure === 'lsg' ? 60 : 0;
  const bariatricLossKg = Math.round((excessWeightKg * (ewlPctExpected / 100)) * 10) / 10;
  const bariatricFinalWeight = Math.round((weightKg - bariatricLossKg) * 10) / 10;
  const bariatricTbwl = Math.round((bariatricLossKg / weightKg) * 1000) / 10;

  return (
    <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '16px', margin: '16px 0' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
        <Scale size={18} color="#0284c7" />
        <h4 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>
          Dynamiczny Model Bilansu Energetycznego Halla vs Reguła Wishnofsky'ego
        </h4>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px', marginBottom: '14px' }}>
        <div>
          <label style={{ fontSize: '11px', color: '#475569', fontWeight: 600 }}>Masa wyjściowa: {weightKg} kg (BMI {bmi})</label>
          <input type="range" min="60" max="180" value={weightKg} onChange={e => setWeightKg(parseInt(e.target.value, 10))} style={{ width: '100%' }} />
        </div>
        <div>
          <label style={{ fontSize: '11px', color: '#475569', fontWeight: 600 }}>Deficyt kaloryczny: {deficitKcal} kcal/dobę</label>
          <input type="range" min="200" max="1200" step="50" value={deficitKcal} onChange={e => setDeficitKcal(parseInt(e.target.value, 10))} style={{ width: '100%' }} />
        </div>
        <div>
          <label style={{ fontSize: '11px', color: '#475569', fontWeight: 600 }}>Czas trwania diety: {weeks} tyg. (~{Math.round(weeks / 4.3)} mies.)</label>
          <input type="range" min="4" max="72" step="4" value={weeks} onChange={e => setWeeks(parseInt(e.target.value, 10))} style={{ width: '100%' }} />
        </div>
        <div>
          <label style={{ fontSize: '11px', color: '#475569', fontWeight: 600 }}>Procedura bariatryczna:</label>
          <select
            value={procedure}
            onChange={e => setProcedure(e.target.value as any)}
            style={{ width: '100%', padding: '4px 8px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '12px' }}
          >
            <option value="none">Brak (tylko dieta)</option>
            <option value="lsg">Rękawowa resekcja (LSG)</option>
            <option value="rygb">Bypass żołądkowy (RYGB)</option>
          </select>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: procedure === 'none' ? '1fr 1fr' : '1fr 1fr 1fr', gap: '12px', marginBottom: '12px' }}>
        <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '8px', padding: '12px' }}>
          <div style={{ fontSize: '11px', color: '#991b1b', fontWeight: 600 }}>Reguła Wishnofsky'ego (liniowa):</div>
          <div style={{ fontSize: '18px', fontWeight: 800, color: '#b91c1c' }}>-{staticLossKg} kg &rarr; {staticFinalWeight} kg</div>
          <div style={{ fontSize: '10px', color: '#7f1d1d', marginTop: '4px' }}>Nierealistyczna: ignoruje spadek BMR i termogenezę adaptacyjną.</div>
        </div>

        <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '8px', padding: '12px' }}>
          <div style={{ fontSize: '11px', color: '#166534', fontWeight: 600 }}>Model dynamiczny Halla (NIH):</div>
          <div style={{ fontSize: '18px', fontWeight: 800, color: '#15803d' }}>-{dynamicLossKg} kg &rarr; {dynamicFinalWeight} kg</div>
          <div style={{ fontSize: '10px', color: '#14532d', marginTop: '4px' }}>Adaptacja: wydatek spoczynkowy zmalał o ~{adaptiveDeficitDrop} kcal/dobę (plateau).</div>
        </div>

        {procedure !== 'none' && (
          <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '8px', padding: '12px' }}>
            <div style={{ fontSize: '11px', color: '#1e40af', fontWeight: 600 }}>Chirurgia {procedure.toUpperCase()}:</div>
            <div style={{ fontSize: '18px', fontWeight: 800, color: '#1d4ed8' }}>-{bariatricLossKg} kg ({bariatricTbwl}% TBWL)</div>
            <div style={{ fontSize: '10px', color: '#1e3a8a', marginTop: '4px' }}>Osiąga {ewlPctExpected}% %EWL, resetując punkt nastawczy w podwzgórzu.</div>
          </div>
        )}
      </div>

      <div style={{ fontSize: '11px', color: '#64748b', background: '#f8fafc', padding: '8px 12px', borderRadius: '6px' }}>
        <strong>Wniosek kliniczny:</strong> Model Halla tłumaczy tzw. <em>plateau odchudzania</em> po 6–12 miesiącach. Spadek poziomu leptyny i adaptacyjne obniżenie BMR (o ~20–30 kcal/kg utraconej masy) niwelują deficyt, wymagając intensyfikacji farmakoterapii (GLP-1 RA) lub chirurgii.
      </div>
    </div>
  );
}

// 2. Lipid Risk Friedewald vs Sampson & Escalation Optimizer
export function LipidRiskFriedewaldSampsonOptimizer() {
  const [tc, setTc] = useState<number>(240);
  const [hdl, setHdl] = useState<number>(45);
  const [tg, setTg] = useState<number>(320);
  const [riskTier, setRiskTier] = useState<'moderate' | 'high' | 'very_high'>('very_high');
  const [regimen, setRegimen] = useState<string>('high');

  // Friedewald: LDL = TC - HDL - TG/5
  const ldlFriedewald = Math.max(0, Math.round(tc - hdl - tg / 5));
  const friedewaldValid = tg < 400;

  // Sampson (NIH Eq 2): LDL = TC/1.34 - HDL/1.25 - 1.05 + 0.17*TG - (TG*TG)/...
  const ldlSampson = Math.max(0, Math.round(
    tc / 1.34 - hdl / 1.25 - 1.05 + 0.17 * tg - 0.00015 * Math.pow(tg, 2)
  ));

  const baselineLdl = friedewaldValid ? ldlFriedewald : ldlSampson;

  const reductions: Record<string, { label: string; pct: number }> = {
    none: { label: 'Brak leczenia', pct: 0 },
    moderate: { label: 'Statyna umiarkowana (Atorwa 20 / Rosuwa 10)', pct: 30 },
    high: { label: 'Statyna wysoka dawka (Atorwa 80 / Rosuwa 40)', pct: 50 },
    high_eze: { label: 'Statyna intensywna + Ezetymib 10 mg', pct: 65 },
    triple: { label: 'Potrójna: Statyna + Ezetymib + PCSK9i / Inklisiran', pct: 85 },
    bempedoic_eze: { label: 'Kwas bempedonowy 180 mg + Ezetymib 10 mg', pct: 38 },
  };

  const currentRed = reductions[regimen] || reductions.none;
  const achievedLdl = Math.round(baselineLdl * (1 - currentRed.pct / 100));

  const targetLdl = riskTier === 'very_high' ? 55 : riskTier === 'high' ? 70 : 100;
  const isGoalAchieved = achievedLdl < targetLdl;

  return (
    <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '16px', margin: '16px 0' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
        <HeartPulse size={18} color="#e11d48" />
        <h4 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>
          Kalkulator Porównawczy LDL-C (Friedewald vs Sampson) i Optymalizator Terapii ESC/EAS
        </h4>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '12px', marginBottom: '14px' }}>
        <div>
          <label style={{ fontSize: '11px', color: '#475569', fontWeight: 600 }}>Cholesterol całk. (TC): {tc} mg/dl</label>
          <input type="range" min="130" max="450" value={tc} onChange={e => setTc(parseInt(e.target.value, 10))} style={{ width: '100%' }} />
        </div>
        <div>
          <label style={{ fontSize: '11px', color: '#475569', fontWeight: 600 }}>HDL: {hdl} mg/dl</label>
          <input type="range" min="20" max="90" value={hdl} onChange={e => setHdl(parseInt(e.target.value, 10))} style={{ width: '100%' }} />
        </div>
        <div>
          <label style={{ fontSize: '11px', color: '#475569', fontWeight: 600 }}>Triglicerydy (TG): {tg} mg/dl</label>
          <input type="range" min="60" max="900" step="10" value={tg} onChange={e => setTg(parseInt(e.target.value, 10))} style={{ width: '100%' }} />
        </div>
        <div>
          <label style={{ fontSize: '11px', color: '#475569', fontWeight: 600 }}>Kategoria ryzyka ESC:</label>
          <select
            value={riskTier}
            onChange={e => setRiskTier(e.target.value as any)}
            style={{ width: '100%', padding: '4px 8px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '12px' }}
          >
            <option value="moderate">Umiarkowane (cel &lt; 100 mg/dl)</option>
            <option value="high">Duże (cel &lt; 70 mg/dl)</option>
            <option value="very_high">Bardzo duże / OZW (cel &lt; 55 mg/dl)</option>
          </select>
        </div>
      </div>

      {/* Comparison Friedewald vs Sampson */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '14px' }}>
        <div style={{ background: friedewaldValid ? '#f8fafc' : '#fef2f2', border: `1px solid ${friedewaldValid ? '#e2e8f0' : '#fca5a5'}`, padding: '10px', borderRadius: '8px' }}>
          <div style={{ fontSize: '11px', color: '#64748b' }}>Wzór Friedewalda (TC - HDL - TG/5):</div>
          <div style={{ fontSize: '18px', fontWeight: 800, color: friedewaldValid ? '#0f172a' : '#b91c1c' }}>
            {ldlFriedewald} mg/dl
          </div>
          <div style={{ fontSize: '10px', color: friedewaldValid ? '#15803d' : '#b91c1c' }}>
            {friedewaldValid ? 'Prawidłowy zakres (TG < 400 mg/dl)' : 'BŁĄD: TG >= 400 zafałszowuje wynik (zaniża LDL)!'}
          </div>
        </div>

        <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', padding: '10px', borderRadius: '8px' }}>
          <div style={{ fontSize: '11px', color: '#166534' }}>Wzór Sampsona (NIH Eq 2):</div>
          <div style={{ fontSize: '18px', fontWeight: 800, color: '#15803d' }}>
            {ldlSampson} mg/dl
          </div>
          <div style={{ fontSize: '10px', color: '#166534' }}>
            Rekomendowany wg wytycznych 2023 przy hipertriglicerydemii (do TG 800 mg/dl).
          </div>
        </div>
      </div>

      {/* Escalation Regimens */}
      <div style={{ marginBottom: '12px' }}>
        <label style={{ fontSize: '11px', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '6px' }}>
          Wybierz schemat eskalacji leczenia hipolipemizującego:
        </label>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '6px' }}>
          {Object.entries(reductions).map(([key, item]) => (
            <button
              key={key}
              type="button"
              onClick={() => setRegimen(key)}
              style={{
                padding: '6px 10px',
                fontSize: '11px',
                borderRadius: '6px',
                textAlign: 'left',
                border: '1px solid',
                borderColor: regimen === key ? '#e11d48' : '#cbd5e1',
                background: regimen === key ? '#ffe4e6' : '#f8fafc',
                color: regimen === key ? '#be123c' : '#334155',
                fontWeight: regimen === key ? 700 : 500,
                cursor: 'pointer',
              }}
            >
              <div>{item.label}</div>
              <div style={{ fontSize: '10px', opacity: 0.8 }}>Redukcja: -{item.pct}%</div>
            </button>
          ))}
        </div>
      </div>

      {/* Goal Check Banner */}
      <div style={{ background: isGoalAchieved ? '#ecfdf5' : '#fff1f2', border: `1px solid ${isGoalAchieved ? '#a7f3d0' : '#fecdd3'}`, borderRadius: '8px', padding: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontSize: '12px', fontWeight: 700, color: isGoalAchieved ? '#065f46' : '#9f1239' }}>
            {isGoalAchieved ? 'CEL ESC OSIĄGNIĘTY' : 'CEL NIEOSIĄGNIĘTY — WYMAGANA ESKALACJA'}
          </div>
          <div style={{ fontSize: '11px', color: isGoalAchieved ? '#047857' : '#be123c' }}>
            Wyjściowy LDL: {baselineLdl} mg/dl &rarr; Na leczeniu (-{currentRed.pct}%): <strong>{achievedLdl} mg/dl</strong> (Cel: &lt; {targetLdl} mg/dl)
          </div>
        </div>
        <div style={{ fontSize: '20px', fontWeight: 900, color: isGoalAchieved ? '#059669' : '#e11d48' }}>
          {achievedLdl} <span style={{ fontSize: '12px', fontWeight: 500 }}>mg/dl</span>
        </div>
      </div>
    </div>
  );
}

// 3. Incretin Cascade & MASLD Fibrosis FIB-4 Stratifier
export function IncretinCascadeAndMasldFibrosisViewer() {
  const [incretinType, setIncretinType] = useState<'glp1' | 'dual' | 'tri'>('dual');
  const [age, setAge] = useState<number>(54);
  const [ast, setAst] = useState<number>(62);
  const [alt, setAlt] = useState<number>(58);
  const [plt, setPlt] = useState<number>(180);

  // FIB-4 = (Age * AST) / (PLT * sqrt(ALT))
  const fib4 = Math.round(((age * ast) / (plt * Math.sqrt(alt))) * 100) / 100;
  const fib4Risk = fib4 < 1.3 ? 'Niskie (F0-F1)' : fib4 <= 2.67 ? 'Pośrednie / Szara strefa' : 'Wysokie (F3-F4)';
  const fib4Color = fib4 < 1.3 ? '#15803d' : fib4 <= 2.67 ? '#b45309' : '#b91c1c';

  const incretinData = {
    glp1: {
      name: 'Monoagonista GLP-1R (Semaglutyd 2.4 mg / Liraglutyd 3.0 mg)',
      affinity: 'Selektywne wiązanie z GLP-1R w podwzgórzu (neurony POMC/CART) i pniu mózgu (AP/NTS).',
      metabolism: 'Opóźnienie opróżniania żołądka, silna sytość, redukcja MACE o 20% (SELECT). Ubytek masy: ~15%.',
      liver: 'Pośrednia redukcja stłuszczenia wątroby poprzez ubytek masy ciała i spadek insulinooporności.',
    },
    dual: {
      name: 'Podwójny agonista GLP-1R / GIPR (Tirzepatyd 15 mg)',
      affinity: 'Zrównoważona aktywacja GLP-1R oraz wysokie powinowactwo do receptora GIP w tkance tłuszczowej.',
      metabolism: 'Poprawa wrażliwości tkanki tłuszczowej na insulinę, wyższy przepływ krwi w tkance tłuszczowej, ubytek masy: do ~22.5% (SURMOUNT).',
      liver: 'Silniejsza redukcja lipogenezy de novo (DNL) w hepatocytach, istotny spadek transaminaz.',
    },
    tri: {
      name: 'Potrójny agonista GLP-1R / GIPR / GCGR (Retatrutyd)',
      affinity: 'Jednoczesna stymulacja GLP-1R, GIPR oraz receptora glukagonowego (GCGR) w wątrobie.',
      metabolism: 'Stymulacja GCGR bezpośrednio zwiększa spoczynkowy wydatek energetyczny i utlenianie kwasów tłuszczowych. Ubytek masy: >24%.',
      liver: 'Bezprecedensowa redukcja tłuszczu wewnątrzhepatocytowego (>80% normalizacji MASLD w fazie 2).',
    },
  };

  const selectedIncretin = incretinData[incretinType];

  return (
    <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '16px', margin: '16px 0' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
        <Activity size={18} color="#4f46e5" />
        <h4 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>
          Kaskada Inkretymimetyków i Stratyfikacja Zwłóknienia MASLD/MASH (FIB-4)
        </h4>
      </div>

      {/* Selector of Incretin Class */}
      <div style={{ marginBottom: '14px' }}>
        <label style={{ fontSize: '11px', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '6px' }}>
          Wybór klasy leku inkretynowego (ewolucja mechanizmu):
        </label>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
          {[
            { id: 'glp1', label: '1. Monoagonista GLP-1R' },
            { id: 'dual', label: '2. Podwójny GLP-1 / GIP' },
            { id: 'tri', label: '3. Potrójny GLP-1/GIP/GCG' },
          ].map(b => (
            <button
              key={b.id}
              type="button"
              onClick={() => setIncretinType(b.id as any)}
              style={{
                padding: '8px 10px',
                fontSize: '11px',
                borderRadius: '6px',
                border: '1px solid',
                borderColor: incretinType === b.id ? '#4f46e5' : '#cbd5e1',
                background: incretinType === b.id ? '#eef2ff' : '#f8fafc',
                color: incretinType === b.id ? '#3730a3' : '#334155',
                fontWeight: incretinType === b.id ? 700 : 500,
                cursor: 'pointer',
              }}
            >
              {b.label}
            </button>
          ))}
        </div>
      </div>

      {/* Incretin Details Card */}
      <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '12px', marginBottom: '16px' }}>
        <div style={{ fontSize: '13px', fontWeight: 700, color: '#1e1b4b', marginBottom: '4px' }}>
          {selectedIncretin.name}
        </div>
        <div style={{ fontSize: '11px', color: '#475569', marginBottom: '4px' }}>
          <strong>Receptory:</strong> {selectedIncretin.affinity}
        </div>
        <div style={{ fontSize: '11px', color: '#475569', marginBottom: '4px' }}>
          <strong>Metabolizm i masa:</strong> {selectedIncretin.metabolism}
        </div>
        <div style={{ fontSize: '11px', color: '#15803d' }}>
          <strong>Wpływ na wątrobę (MASLD):</strong> {selectedIncretin.liver}
        </div>
      </div>

      {/* FIB-4 Calculator */}
      <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '12px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <span style={{ fontSize: '12px', fontWeight: 700, color: '#0f172a' }}>
            Kalkulator Zwłóknienia Wątroby FIB-4 (AASLD/EASL 2024):
          </span>
          <span style={{ fontSize: '14px', fontWeight: 800, color: fib4Color }}>
            FIB-4: {fib4} ({fib4Risk})
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '10px', marginBottom: '10px' }}>
          <div>
            <label style={{ fontSize: '10px', color: '#64748b' }}>Wiek: {age} lat</label>
            <input type="range" min="20" max="85" value={age} onChange={e => setAge(parseInt(e.target.value, 10))} style={{ width: '100%' }} />
          </div>
          <div>
            <label style={{ fontSize: '10px', color: '#64748b' }}>AST: {ast} U/l</label>
            <input type="range" min="15" max="250" value={ast} onChange={e => setAst(parseInt(e.target.value, 10))} style={{ width: '100%' }} />
          </div>
          <div>
            <label style={{ fontSize: '10px', color: '#64748b' }}>ALT: {alt} U/l</label>
            <input type="range" min="15" max="250" value={alt} onChange={e => setAlt(parseInt(e.target.value, 10))} style={{ width: '100%' }} />
          </div>
          <div>
            <label style={{ fontSize: '10px', color: '#64748b' }}>Płytki (PLT): {plt} tys./µl</label>
            <input type="range" min="60" max="450" value={plt} onChange={e => setPlt(parseInt(e.target.value, 10))} style={{ width: '100%' }} />
          </div>
        </div>

        <div style={{ fontSize: '11px', padding: '8px 10px', borderRadius: '6px', background: fib4 < 1.3 ? '#f0fdf4' : fib4 <= 2.67 ? '#fffbeb' : '#fef2f2', color: fib4 < 1.3 ? '#166534' : fib4 <= 2.67 ? '#92400e' : '#991b1b', border: `1px solid ${fib4 < 1.3 ? '#bbf7d0' : fib4 <= 2.67 ? '#fde68a' : '#fecaca'}` }}>
          {fib4 < 1.3 && 'Niskie ryzyko zaawansowanego zwłóknienia (NPV > 90%). Kontrola FIB-4 za 2-3 lata w POZ, optymalizacja diety i masy.'}
          {fib4 >= 1.3 && fib4 <= 2.67 && 'Pośrednie ryzyko (szara strefa). Wskazane badanie drugiego rzutu: elastografia VCTE (FibroScan) lub test ELF przed kwalifikacją specjalistyczną.'}
          {fib4 > 2.67 && 'Wysokie ryzyko zaawansowanego włóknienia (F3-F4) / marskości! Pilne skierowanie do poradni hepatologicznej, rozważenie farmakoterapii (agoniści GLP-1, rezmetirom) lub chirurgii bariatrycznej.'}
        </div>
      </div>
    </div>
  );
}
