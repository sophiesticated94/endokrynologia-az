'use client';
import type { Dispatch, SetStateAction } from 'react';
import { Activity, AlertTriangle, ShieldCheck, Scale, Flame, HeartPulse, Sparkles, Stethoscope, Pill, Scissors } from 'lucide-react';
import type { ObesitySimulatorInputs, ObesitySimulatorOutputs } from '../lib/obesity-simulator.ts';

export function ObesityHallTab({
  inputs,
  setInputs,
  outputs,
}: {
  inputs: ObesitySimulatorInputs;
  setInputs: Dispatch<SetStateAction<ObesitySimulatorInputs>>;
  outputs: ObesitySimulatorOutputs;
}) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '20px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {/* Antropometria i BMR */}
        <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
            <span style={{ fontSize: '15px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Scale size={18} color="#0284c7" />
              Parametry antropometryczne i wydatek energetyczny
            </span>
            <span style={{ fontSize: '12px', fontWeight: 700, padding: '3px 10px', borderRadius: '6px', background: outputs.bmi >= 35 ? '#fef2f2' : outputs.bmi >= 30 ? '#fffbeb' : '#f0fdf4', color: outputs.bmi >= 35 ? '#b91c1c' : outputs.bmi >= 30 ? '#b45309' : '#15803d', border: '1px solid #cbd5e1' }}>
              BMI: {outputs.bmi} kg/m² ({outputs.bmiClass})
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '12px', marginBottom: '14px' }}>
            <div>
              <label style={{ fontSize: '11px', color: '#475569', fontWeight: 600 }}>Wiek (lata): {inputs.age}</label>
              <input type="range" min="18" max="80" value={inputs.age} onChange={e => setInputs(p => ({ ...p, age: parseInt(e.target.value, 10) }))} style={{ width: '100%' }} />
            </div>
            <div>
              <label style={{ fontSize: '11px', color: '#475569', fontWeight: 600 }}>Wzrost: {inputs.heightCm} cm</label>
              <input type="range" min="145" max="205" value={inputs.heightCm} onChange={e => setInputs(p => ({ ...p, heightCm: parseInt(e.target.value, 10) }))} style={{ width: '100%' }} />
            </div>
            <div>
              <label style={{ fontSize: '11px', color: '#475569', fontWeight: 600 }}>Waga: {inputs.weightKg} kg</label>
              <input type="range" min="50" max="220" value={inputs.weightKg} onChange={e => setInputs(p => ({ ...p, weightKg: parseInt(e.target.value, 10) }))} style={{ width: '100%' }} />
            </div>
            <div>
              <label style={{ fontSize: '11px', color: '#475569', fontWeight: 600 }}>Tkanka tłuszczowa: {inputs.bodyFatPct}%</label>
              <input type="range" min="10" max="60" value={inputs.bodyFatPct} onChange={e => setInputs(p => ({ ...p, bodyFatPct: parseInt(e.target.value, 10) }))} style={{ width: '100%' }} />
            </div>
          </div>

          {/* Płeć i PAL */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '14px', marginBottom: '14px' }}>
            <div>
              <label style={{ fontSize: '11px', color: '#475569', fontWeight: 600, display: 'block', marginBottom: '4px' }}>Płeć biologiczna:</label>
              <div style={{ display: 'flex', gap: '8px' }}>
                {(['M', 'F'] as const).map(s => (
                  <button key={s} type="button" onClick={() => setInputs(p => ({ ...p, sex: s }))} style={{ flex: 1, padding: '6px', fontSize: '12px', borderRadius: '6px', border: '1px solid', borderColor: inputs.sex === s ? '#0284c7' : '#cbd5e1', background: inputs.sex === s ? '#e0f2fe' : '#f8fafc', color: inputs.sex === s ? '#0369a1' : '#334155', fontWeight: inputs.sex === s ? 700 : 500, cursor: 'pointer' }}>
                    {s === 'M' ? 'Mężczyzna' : 'Kobieta'}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label style={{ fontSize: '11px', color: '#475569', fontWeight: 600, display: 'block', marginBottom: '4px' }}>Współczynnik aktywności fizycznej (PAL): {inputs.pal}</label>
              <div style={{ display: 'flex', gap: '6px' }}>
                {[
                  { pal: 1.2, l: '1.2 Siedzący' },
                  { pal: 1.4, l: '1.4 Umiarkowany' },
                  { pal: 1.6, l: '1.6 Aktywny' },
                  { pal: 1.8, l: '1.8 B. aktywny' },
                ].map(item => (
                  <button key={item.pal} type="button" onClick={() => setInputs(p => ({ ...p, pal: item.pal }))} style={{ flex: 1, padding: '6px 2px', fontSize: '10px', borderRadius: '6px', border: '1px solid', borderColor: inputs.pal === item.pal ? '#0284c7' : '#cbd5e1', background: inputs.pal === item.pal ? '#e0f2fe' : '#f8fafc', color: inputs.pal === item.pal ? '#0369a1' : '#334155', fontWeight: inputs.pal === item.pal ? 700 : 500, cursor: 'pointer' }}>
                    {item.l}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Podaż kalorii i deficyt */}
          <div style={{ background: '#f8fafc', borderRadius: '8px', padding: '12px', border: '1px solid #e2e8f0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '4px' }}>
              <span style={{ fontWeight: 600, color: '#334155' }}>Planowana podaż kalorii:</span>
              <span style={{ fontWeight: 800, color: '#0284c7' }}>{inputs.caloricIntake} kcal/dobę</span>
            </div>
            <input type="range" min="1000" max="4000" step="50" value={inputs.caloricIntake} onChange={e => setInputs(p => ({ ...p, caloricIntake: parseInt(e.target.value, 10) }))} style={{ width: '100%' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#64748b', marginTop: '4px' }}>
              <span>Deficyt kaloryczny: <strong>{outputs.dailyDeficitKcal} kcal/d</strong></span>
              <span>Adaptacja metaboliczna (spadek BMR): <strong style={{ color: '#b91c1c' }}>-{outputs.adaptiveThermogenesisKcal} kcal/d</strong></span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Model Halla & Wyniki */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '16px' }}>
          <div style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Flame size={16} color="#ea580c" />
            Nieliniowy model dynamiki masy ciała (Hall)
          </div>
          <div style={{ fontSize: '11px', color: '#475569', marginBottom: '8px' }}>
            Wydatek spoczynkowy BMR: <strong>{outputs.bmrMifflin} kcal</strong> (Mifflin) / <strong>{outputs.bmrKatch} kcal</strong> (Katch)
          </div>
          <div style={{ fontSize: '11px', color: '#475569', marginBottom: '12px' }}>
            Całkowity wydatek TDEE: <strong>{outputs.tdee} kcal/dobę</strong>
          </div>

          <div style={{ background: '#fff', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '10px', marginBottom: '10px' }}>
            <div style={{ fontSize: '11px', color: '#64748b' }}>Prognoza masy ciała (6 miesięcy):</div>
            <div style={{ fontSize: '18px', fontWeight: 800, color: '#0284c7' }}>{outputs.predictedWeight6m} kg</div>
            <div style={{ fontSize: '10px', color: '#94a3b8' }}>Ubytek: -{(inputs.weightKg - outputs.predictedWeight6m).toFixed(1)} kg</div>
          </div>

          <div style={{ background: '#fff', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '10px' }}>
            <div style={{ fontSize: '11px', color: '#64748b' }}>Prognoza masy ciała (12 miesięcy):</div>
            <div style={{ fontSize: '18px', fontWeight: 800, color: '#059669' }}>{outputs.predictedWeight12m} kg</div>
            <div style={{ fontSize: '10px', color: '#94a3b8' }}>Ubytek: -{(inputs.weightKg - outputs.predictedWeight12m).toFixed(1)} kg (%TBWL: {outputs.predictedTbwlPct}%)</div>
          </div>
        </div>

        <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '12px', padding: '14px' }}>
          <div style={{ fontSize: '12px', fontWeight: 700, color: '#1e40af', marginBottom: '4px' }}>EASO 2024 Takeaway:</div>
          <div style={{ fontSize: '11px', color: '#1e3a8a', lineHeight: 1.4 }}>
            Adaptacja metaboliczna (-{outputs.adaptiveThermogenesisKcal} kcal) spłaszcza krzywą utraty wagi. Do utrzymania efektu konieczne jest bezterminowe leczenie i trening oporowy.
          </div>
        </div>
      </div>
    </div>
  );
}

export function ObesityPharmacotherapyTab({
  inputs,
  setInputs,
  outputs,
}: {
  inputs: ObesitySimulatorInputs;
  setInputs: Dispatch<SetStateAction<ObesitySimulatorInputs>>;
  outputs: ObesitySimulatorOutputs;
}) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '20px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {/* Leki przeciwotyłościowe */}
        <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '16px' }}>
          <span style={{ fontSize: '15px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '12px' }}>
            <Pill size={18} color="#4f46e5" />
            Wybór farmakoterapii przeciwotyłościowej
          </span>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '14px' }}>
            {[
              { id: 'none', label: 'Brak leków (tylko dieta)', sub: '0% redukcji' },
              { id: 'liraglutide', label: 'Liraglutyd 3.0 mg (Saxenda)', sub: '~8% ubytku wagi' },
              { id: 'semaglutide', label: 'Semaglutyd 2.4 mg (Wegovy)', sub: '~15% ubytku (SELECT MACE -20%)' },
              { id: 'tirzepatide', label: 'Tirzepatyd 15 mg (Zepbound)', sub: '~21-22,5% (dual GLP-1/GIP)' },
              { id: 'bupropion_naltrexone', label: 'Bupropion + Naltrekson', sub: '~6% ubytku (układ nagrody)' },
              { id: 'orlistat', label: 'Orlistat 120 mg', sub: '~4% (inhibitor lipazy jelitowej)' },
            ].map(d => (
              <button
                key={d.id}
                type="button"
                onClick={() => setInputs(p => ({ ...p, selectedDrug: d.id as any }))}
                style={{
                  textAlign: 'left',
                  padding: '8px 12px',
                  fontSize: '12px',
                  borderRadius: '8px',
                  border: '1px solid',
                  borderColor: inputs.selectedDrug === d.id ? '#4f46e5' : '#cbd5e1',
                  background: inputs.selectedDrug === d.id ? '#eef2ff' : '#f8fafc',
                  color: inputs.selectedDrug === d.id ? '#3730a3' : '#334155',
                  fontWeight: inputs.selectedDrug === d.id ? 700 : 500,
                  cursor: 'pointer',
                }}
              >
                <div>{d.label}</div>
                <div style={{ fontSize: '10px', color: '#64748b' }}>{d.sub}</div>
              </button>
            ))}
          </div>

          {/* Chirurgia bariatryczna */}
          <span style={{ fontSize: '14px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}>
            <Scissors size={16} color="#059669" />
            Procedura chirurgii bariatrycznej i metabolicznej
          </span>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '14px' }}>
            {[
              { id: 'none', label: 'Brak operacji' },
              { id: 'lsg', label: 'Rękawowa resekcja (LSG)' },
              { id: 'rygb', label: 'Bypass żołądkowy (RYGB)' },
              { id: 'oagb', label: 'Bypass z 1 pętlą (OAGB)' },
            ].map(b => (
              <button
                key={b.id}
                type="button"
                onClick={() => setInputs(p => ({ ...p, bariatricProcedure: b.id as any }))}
                style={{
                  flex: 1,
                  padding: '8px 6px',
                  fontSize: '11px',
                  borderRadius: '6px',
                  border: '1px solid',
                  borderColor: inputs.bariatricProcedure === b.id ? '#059669' : '#cbd5e1',
                  background: inputs.bariatricProcedure === b.id ? '#ecfdf5' : '#f8fafc',
                  color: inputs.bariatricProcedure === b.id ? '#065f46' : '#334155',
                  fontWeight: inputs.bariatricProcedure === b.id ? 700 : 500,
                  cursor: 'pointer',
                }}
              >
                {b.label}
              </button>
            ))}
          </div>

          {/* Choroby współistniejące */}
          <div style={{ fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '8px' }}>
            Choroby i powikłania kardiometaboliczne:
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
            {[
              { key: 't2d', label: 'Cukrzyca typu 2 (T2D)' },
              { key: 'htn', label: 'Nadciśnienie tętnicze' },
              { key: 'osas', label: 'Bezdech senny (OSAS)' },
              { key: 'masld', label: 'Stłuszczenie wątroby (MASLD)' },
              { key: 'gerd', label: 'Refluks (GERD / przełyk)' },
              { key: 'dyslipidemia', label: 'Dyslipidemia aterogenna' },
            ].map(c => (
              <label key={c.key} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={(inputs.comorbidities as any)[c.key]}
                  onChange={e => setInputs(p => ({ ...p, comorbidities: { ...p.comorbidities, [c.key]: e.target.checked } }))}
                />
                <span>{c.label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Right Column: Bariatric Qualifier & Remission */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ background: outputs.bariatricCandidate ? '#f0fdf4' : '#f8fafc', border: `1px solid ${outputs.bariatricCandidate ? '#86efac' : '#e2e8f0'}`, borderRadius: '12px', padding: '16px' }}>
          <div style={{ fontSize: '13px', fontWeight: 700, color: outputs.bariatricCandidate ? '#166534' : '#0f172a', marginBottom: '6px' }}>
            Kwalifikacja bariatryczna IFSO 2023:
          </div>
          <div style={{ fontSize: '12px', fontWeight: 600, color: outputs.bariatricCandidate ? '#15803d' : '#64748b' }}>
            {outputs.bariatricCandidate ? 'SPEŁNIA KRYTERIA KWALIFIKACJI' : 'BRAK WSKAZAŃ'}
          </div>
          <div style={{ fontSize: '11px', color: '#475569', marginTop: '4px', lineHeight: 1.4 }}>
            {outputs.bariatricIndicationReason}
          </div>
        </div>

        {inputs.bariatricProcedure !== 'none' && (
          <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '16px' }}>
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>
              Prognozowane wskaźniki bariatryczne:
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px', fontSize: '12px' }}>
              <span>%TBWL (całkowita masa):</span>
              <strong style={{ color: '#059669' }}>{outputs.predictedTbwlPct}%</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '12px' }}>
              <span>%EWL (nadmiar wagi):</span>
              <strong style={{ color: '#0284c7' }}>{outputs.predictedEwlPct}%</strong>
            </div>

            {inputs.comorbidities.t2d && (
              <div style={{ marginTop: '8px', padding: '8px', background: '#ecfdf5', borderRadius: '6px', fontSize: '11px' }}>
                <div>Szansa pełnej remisji cukrzycy: <strong>{outputs.t2dRemissionProbabilityPct}%</strong></div>
                <div style={{ fontSize: '10px', color: '#047857' }}>Kryterium: HbA1c &lt; 6,5% bez leków przez &gt;= 3 mies.</div>
              </div>
            )}

            {outputs.nutritionalDeficiencyRisks.length > 0 && (
              <div style={{ marginTop: '10px' }}>
                <div style={{ fontSize: '11px', fontWeight: 700, color: '#b91c1c', marginBottom: '4px' }}>
                  Wymagana dożywotnia suplementacja:
                </div>
                <ul style={{ fontSize: '10px', color: '#475569', paddingLeft: '16px', margin: 0 }}>
                  {outputs.nutritionalDeficiencyRisks.map((r, i) => (
                    <li key={i}>{r}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export function ObesityLipidScoreTab({
  inputs,
  setInputs,
  outputs,
}: {
  inputs: ObesitySimulatorInputs;
  setInputs: Dispatch<SetStateAction<ObesitySimulatorInputs>>;
  outputs: ObesitySimulatorOutputs;
}) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '20px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {/* Lipidogram i wzory */}
        <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '16px' }}>
          <span style={{ fontSize: '15px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '12px' }}>
            <HeartPulse size={18} color="#e11d48" />
            Lipidogram i kalkulator LDL-C (Friedewald vs Sampson)
          </span>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginBottom: '14px' }}>
            <div>
              <label style={{ fontSize: '11px', color: '#475569', fontWeight: 600 }}>Cholesterol całkowity: {inputs.tcMgDl} mg/dl</label>
              <input type="range" min="120" max="450" value={inputs.tcMgDl} onChange={e => setInputs(p => ({ ...p, tcMgDl: parseInt(e.target.value, 10) }))} style={{ width: '100%' }} />
            </div>
            <div>
              <label style={{ fontSize: '11px', color: '#475569', fontWeight: 600 }}>Cholesterol HDL: {inputs.hdlMgDl} mg/dl</label>
              <input type="range" min="20" max="100" value={inputs.hdlMgDl} onChange={e => setInputs(p => ({ ...p, hdlMgDl: parseInt(e.target.value, 10) }))} style={{ width: '100%' }} />
            </div>
            <div>
              <label style={{ fontSize: '11px', color: '#475569', fontWeight: 600 }}>Triglicerydy: {inputs.tgMgDl} mg/dl</label>
              <input type="range" min="50" max="1500" step="10" value={inputs.tgMgDl} onChange={e => setInputs(p => ({ ...p, tgMgDl: parseInt(e.target.value, 10) }))} style={{ width: '100%' }} />
            </div>
          </div>

          {/* Wyniki porównania wzorów */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '14px' }}>
            <div style={{ background: outputs.friedewaldValid ? '#f8fafc' : '#fef2f2', border: `1px solid ${outputs.friedewaldValid ? '#e2e8f0' : '#fca5a5'}`, borderRadius: '8px', padding: '10px' }}>
              <div style={{ fontSize: '11px', color: '#64748b' }}>Formuła Friedewalda:</div>
              <div style={{ fontSize: '18px', fontWeight: 800, color: outputs.friedewaldValid ? '#0f172a' : '#b91c1c' }}>
                {outputs.ldlFriedewald} mg/dl
              </div>
              <div style={{ fontSize: '10px', color: outputs.friedewaldValid ? '#15803d' : '#b91c1c' }}>
                {outputs.friedewaldValid ? 'Prawidłowa (TG < 400 mg/dl)' : 'NIEPRAWIDŁOWA (TG >= 400 zaniża wynik)'}
              </div>
            </div>

            <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '8px', padding: '10px' }}>
              <div style={{ fontSize: '11px', color: '#64748b' }}>Formuła Sampsona (NIH Eq 2):</div>
              <div style={{ fontSize: '18px', fontWeight: 800, color: '#166534' }}>
                {outputs.ldlSampson} mg/dl
              </div>
              <div style={{ fontSize: '10px', color: '#15803d' }}>
                Dokładna przy TG do 800 mg/dl i niskim LDL
              </div>
            </div>
          </div>

          {/* Schemat statynowy */}
          <div style={{ marginBottom: '12px' }}>
            <label style={{ fontSize: '12px', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '6px' }}>
              Schemat farmakoterapii hipolipemizującej:
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
              {[
                { id: 'none', label: 'Brak leków (0%)' },
                { id: 'moderate', label: 'Statyna umiarkowana (-30%)' },
                { id: 'high', label: 'Statyna intensywna (-50%)' },
                { id: 'high_ezetimibe', label: 'Statyna + Ezetymib (-65%)' },
                { id: 'triple_pcsk9', label: 'Potrójna: Statyna+Eze+PCSK9i (-85%)' },
                { id: 'bempedoic_ezetimibe', label: 'Kwas bempedonowy+Eze (-38%)' },
              ].map(st => (
                <button
                  key={st.id}
                  type="button"
                  onClick={() => setInputs(p => ({ ...p, statinRegimen: st.id as any }))}
                  style={{
                    padding: '6px 8px',
                    fontSize: '11px',
                    borderRadius: '6px',
                    border: '1px solid',
                    borderColor: inputs.statinRegimen === st.id ? '#e11d48' : '#cbd5e1',
                    background: inputs.statinRegimen === st.id ? '#ffe4e6' : '#f8fafc',
                    color: inputs.statinRegimen === st.id ? '#be123c' : '#334155',
                    fontWeight: inputs.statinRegimen === st.id ? 700 : 500,
                    cursor: 'pointer',
                    textAlign: 'left',
                  }}
                >
                  {st.label}
                </button>
              ))}
            </div>
          </div>

          {/* Wskaźnik FIB-4 */}
          <div style={{ background: '#f8fafc', borderRadius: '8px', padding: '12px', border: '1px solid #e2e8f0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <span style={{ fontSize: '12px', fontWeight: 700, color: '#334155' }}>Wskaźnik zwłóknienia wątroby FIB-4:</span>
              <span style={{ fontSize: '13px', fontWeight: 800, color: outputs.fib4RiskCategory === 'Wysokie' ? '#b91c1c' : outputs.fib4RiskCategory === 'Niskie' ? '#15803d' : '#b45309' }}>
                {outputs.fib4Score} ({outputs.fib4RiskCategory})
              </span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', fontSize: '10px' }}>
              <div>AST: {inputs.astU_L} U/l</div>
              <div>ALT: {inputs.altU_L} U/l</div>
              <div>Płytki: {inputs.plt10e9_L} tys./ul</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Cele ESC/EAS & SCORE2 */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '16px' }}>
          <div style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>
            Kategoria ryzyka ESC/EAS & Cele LDL-C:
          </div>
          <div style={{ fontSize: '11px', color: '#64748b' }}>Kategoria ryzyka sercowo-naczyniowego:</div>
          <div style={{ fontSize: '15px', fontWeight: 800, color: '#be123c', marginBottom: '6px' }}>
            {outputs.score2Category} (SCORE2: ~{outputs.score2RiskPct}%)
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '4px' }}>
            <span>Docelowy poziom LDL-C:</span>
            <strong>&lt; {outputs.targetLdl} mg/dl</strong>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '8px' }}>
            <span>Osiągnięty LDL-C na leczeniu:</span>
            <strong style={{ color: outputs.ldlGoalAchieved ? '#059669' : '#b91c1c', fontSize: '14px' }}>
              {outputs.achievedLdl} mg/dl
            </strong>
          </div>

          <div style={{ padding: '8px', borderRadius: '6px', textAlign: 'center', fontWeight: 700, fontSize: '12px', background: outputs.ldlGoalAchieved ? '#ecfdf5' : '#fef2f2', color: outputs.ldlGoalAchieved ? '#065f46' : '#991b1b', border: `1px solid ${outputs.ldlGoalAchieved ? '#a7f3d0' : '#fecaca'}` }}>
            {outputs.ldlGoalAchieved ? 'CEL TERAPEUTYCZNY OSIĄGNIĘTY' : 'CEL NIEOSIĄGNIĘTY — ZWIĘKSZ TERAPIĘ'}
          </div>

          <div style={{ fontSize: '10px', color: '#64748b', marginTop: '8px', lineHeight: 1.4 }}>
            Non-HDL-C: {outputs.nonHdl} mg/dl | Remnant Cholesterol: {outputs.remnantCholesterol} mg/dl
          </div>
        </div>
      </div>
    </div>
  );
}
