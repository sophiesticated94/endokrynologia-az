'use client';
import type { Dispatch, SetStateAction } from 'react';
import { Activity, AlertTriangle, ShieldCheck, Zap, HeartPulse, Sparkles, Dna, Gauge, Pill } from 'lucide-react';
import type { NenSimulatorState, CalculatedNenMetrics } from '../lib/nen-simulator.ts';

export function NenStagingTab({
  state,
  setState,
  metrics,
}: {
  state: NenSimulatorState;
  setState: Dispatch<SetStateAction<NenSimulatorState>>;
  metrics: CalculatedNenMetrics;
}) {
  const { whoGrade, isPoorlyDifferentiated, prrtEligible, prrtEligibilityReason } = metrics;

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '20px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
            <span style={{ fontSize: '15px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Gauge size={18} color="#0284c7" />
              Klasyfikacja histopatologiczna WHO 2022/2024
            </span>
            <span style={{ fontSize: '12px', fontWeight: 700, padding: '3px 10px', borderRadius: '6px', background: isPoorlyDifferentiated ? '#fef2f2' : '#f0fdf4', color: isPoorlyDifferentiated ? '#b91c1c' : '#15803d', border: `1px solid ${isPoorlyDifferentiated ? '#fecaca' : '#bbf7d0'}` }}>
              {whoGrade}
            </span>
          </div>

          <div style={{ marginBottom: '14px' }}>
            <label style={{ fontSize: '12px', color: '#475569', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
              Punkt wyjścia (narząd pierwotny):
            </label>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {[
                { id: 'midgut', label: 'Jelito kręte (midgut)' },
                { id: 'pancreas', label: 'Trzustka (pNET)' },
                { id: 'lung', label: 'Oskrzele / Płuco' },
                { id: 'stomach', label: 'Żołądek' },
                { id: 'appendix', label: 'Wyrostek robaczkowy' },
              ].map(s => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setState(prev => ({ ...prev, primarySite: s.id as any }))}
                  style={{ padding: '6px 12px', fontSize: '12px', borderRadius: '6px', border: '1px solid', borderColor: state.primarySite === s.id ? '#0284c7' : '#cbd5e1', background: state.primarySite === s.id ? '#e0f2fe' : '#f8fafc', color: state.primarySite === s.id ? '#0369a1' : '#334155', fontWeight: state.primarySite === s.id ? 700 : 500, cursor: 'pointer' }}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '14px' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '4px' }}>
                <span style={{ fontWeight: 600, color: '#334155' }}>Indeks Ki-67 (%):</span>
                <span style={{ fontWeight: 800, color: '#0284c7' }}>{state.ki67Percent}%</span>
              </div>
              <input type="range" min="0.5" max="95" step="0.5" value={state.ki67Percent} onChange={e => setState(prev => ({ ...prev, ki67Percent: parseFloat(e.target.value) }))} style={{ width: '100%' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: '#94a3b8' }}>
                <span>&lt;3% (G1)</span><span>3–20% (G2)</span><span>&gt;20% (G3)</span>
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '4px' }}>
                <span style={{ fontWeight: 600, color: '#334155' }}>Liczba mitoz (/2 mm²):</span>
                <span style={{ fontWeight: 800, color: '#0284c7' }}>{state.mitoticCount}</span>
              </div>
              <input type="range" min="0" max="60" step="1" value={state.mitoticCount} onChange={e => setState(prev => ({ ...prev, mitoticCount: parseInt(e.target.value, 10) }))} style={{ width: '100%' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: '#94a3b8' }}>
                <span>&lt;2 (G1)</span><span>2–20 (G2)</span><span>&gt;20 (G3)</span>
              </div>
            </div>
          </div>

          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '12px', color: '#1e293b' }}>
            <input type="checkbox" checked={state.hasNecrosis} onChange={e => setState(prev => ({ ...prev, hasNecrosis: e.target.checked }))} />
            <span style={{ fontWeight: 600 }}>Obecna martwica skrzepowa w badaniu histopatologicznym (definiuje NEC)</span>
          </label>
        </div>

        <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '16px' }}>
          <span style={{ fontSize: '14px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}>
            <Sparkles size={16} color="#7c3aed" />
            Obrazowanie molekularne: Wychwyt SSTR vs 18F-FDG PET
          </span>

          <div style={{ marginBottom: '12px' }}>
            <div style={{ fontSize: '12px', color: '#475569', marginBottom: '6px', fontWeight: 600 }}>
              Stopień wychwytu w skali Krenninga (68Ga-DOTATATE / SRS):
            </div>
            <div style={{ display: 'flex', gap: '6px' }}>
              {[
                { score: 0, label: '0: Brak' },
                { score: 1, label: '1: < Wątroba' },
                { score: 2, label: '2: = Wątroba' },
                { score: 3, label: '3: > Wątroba' },
                { score: 4, label: '4: > Śledziona' },
              ].map(k => (
                <button
                  key={k.score}
                  type="button"
                  onClick={() => setState(prev => ({ ...prev, sstrKrenning: k.score as any }))}
                  style={{ flex: 1, padding: '8px 4px', fontSize: '11px', borderRadius: '6px', border: '1px solid', borderColor: state.sstrKrenning === k.score ? '#7c3aed' : '#cbd5e1', background: state.sstrKrenning === k.score ? '#f3e8ff' : '#f8fafc', color: state.sstrKrenning === k.score ? '#6b21a8' : '#334155', fontWeight: state.sstrKrenning === k.score ? 700 : 500, cursor: 'pointer' }}
                >
                  {k.label}
                </button>
              ))}
            </div>
          </div>

          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '12px', color: '#1e293b' }}>
            <input type="checkbox" checked={state.fdgUptake} onChange={e => setState(prev => ({ ...prev, fdgUptake: e.target.checked }))} />
            <span style={{ fontWeight: 600 }}>Dodatni wychwyt glikolityczny w 18F-FDG PET (odróżnicowanie / klon agresywny)</span>
          </label>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '16px' }}>
          <div style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a', marginBottom: '10px' }}>
            Ocena kwalifikacji do PRRT (177Lu)
          </div>
          <div style={{ padding: '10px', borderRadius: '8px', background: prrtEligible ? '#ecfdf5' : '#fff1f2', border: `1px solid ${prrtEligible ? '#a7f3d0' : '#fecdd3'}`, marginBottom: '10px' }}>
            <div style={{ fontWeight: 700, fontSize: '13px', color: prrtEligible ? '#065f46' : '#9f1239' }}>
              {prrtEligible ? 'KWALIFIKUJE SIĘ DO PRRT' : 'BRAK KWALIFIKACJI'}
            </div>
            <div style={{ fontSize: '11px', color: '#475569', marginTop: '4px' }}>
              {prrtEligibilityReason}
            </div>
          </div>

          <div style={{ fontSize: '11px', color: '#64748b' }}>
            <strong>Biomarkery krążące:</strong>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px' }}>
              <span>CgA: {state.cgaValue} ng/ml</span>
              <span style={{ color: state.cgaValue > 100 ? '#b91c1c' : '#15803d', fontWeight: 600 }}>
                {state.cgaValue > 100 ? 'Podwyższona' : 'W normie'}
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px' }}>
              <span>5-HIAA: {state.hiaa5Value} mg/24h</span>
              <span style={{ color: state.hiaa5Value > 8 ? '#b91c1c' : '#15803d', fontWeight: 600 }}>
                {state.hiaa5Value > 8 ? 'Wysokie' : 'W normie'}
              </span>
            </div>
          </div>
        </div>

        <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '12px', padding: '14px' }}>
          <div style={{ fontSize: '12px', fontWeight: 700, color: '#1e40af', marginBottom: '4px' }}>
            Rekomendacja kliniczna ENETS/WHO:
          </div>
          <div style={{ fontSize: '11px', color: '#1e3a8a', lineHeight: 1.5 }}>
            {metrics.clinicalRecommendation}
          </div>
        </div>
      </div>
    </div>
  );
}

export function NenGeneticsTab({
  state,
  setState,
  metrics,
}: {
  state: NenSimulatorState;
  setState: Dispatch<SetStateAction<NenSimulatorState>>;
  metrics: CalculatedNenMetrics;
}) {
  const { retRiskCategory, recommendedThyroidectomyAge, surgeryPriorityAlert } = metrics;

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '20px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '16px' }}>
          <span style={{ fontSize: '15px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '12px' }}>
            <Dna size={18} color="#059669" />
            Zespoły uwarunkowane genetycznie (MEN & RET)
          </span>

          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
            {(['Sporadyczny', 'MEN1', 'MEN2A', 'MEN2B', 'MEN4', 'VHL', 'NF1'] as const).map(syn => (
              <button
                key={syn}
                type="button"
                onClick={() => {
                  setState(prev => ({
                    ...prev,
                    selectedGenetics: syn,
                    retCodon: syn === 'MEN2B' ? 'M918T' : syn === 'MEN2A' ? 'C634' : 'none',
                    hasPhpt: syn === 'MEN1' || syn === 'MEN4' || syn === 'MEN2A',
                    hasPheo: syn === 'MEN2A' || syn === 'MEN2B' || syn === 'VHL',
                    hasPituitary: syn === 'MEN1' || syn === 'MEN4',
                    hasPnet: syn === 'MEN1' || syn === 'VHL',
                  }));
                }}
                style={{ padding: '8px 12px', fontSize: '12px', borderRadius: '6px', border: '1px solid', borderColor: state.selectedGenetics === syn ? '#059669' : '#cbd5e1', background: state.selectedGenetics === syn ? '#ecfdf5' : '#f8fafc', color: state.selectedGenetics === syn ? '#065f46' : '#334155', fontWeight: state.selectedGenetics === syn ? 700 : 500, cursor: 'pointer' }}
              >
                {syn}
              </button>
            ))}
          </div>

          {(state.selectedGenetics === 'MEN2A' || state.selectedGenetics === 'MEN2B') && (
            <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '8px', padding: '12px', marginBottom: '14px' }}>
              <div style={{ fontSize: '12px', fontWeight: 700, color: '#166534', marginBottom: '8px' }}>
                Mutacja kodonu protoonkogenu RET (Kategorie ATA):
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                {[
                  { codon: 'M918T', label: 'M918T (ATA Highest / HST)' },
                  { codon: 'C634', label: 'C634 (ATA High / H)' },
                  { codon: 'C618', label: 'C618 (ATA Moderate / MOD)' },
                  { codon: 'C609', label: 'C609 (ATA Moderate / MOD)' },
                ].map(c => (
                  <button
                    key={c.codon}
                    type="button"
                    onClick={() => setState(prev => ({ ...prev, retCodon: c.codon as any }))}
                    style={{ flex: 1, padding: '6px 4px', fontSize: '11px', borderRadius: '6px', border: '1px solid', borderColor: state.retCodon === c.codon ? '#166534' : '#86efac', background: state.retCodon === c.codon ? '#bbf7d0' : '#fff', color: '#14532d', fontWeight: state.retCodon === c.codon ? 700 : 500, cursor: 'pointer' }}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div style={{ fontSize: '12px', fontWeight: 600, color: '#334155', marginBottom: '8px' }}>
            Obecne manifestacje narządowe:
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            {[
              { key: 'hasPheo', label: 'Guz chromochłonny (Pheo)' },
              { key: 'hasPhpt', label: 'Nadczynność przytarczyc (PHPT)' },
              { key: 'hasPituitary', label: 'Gruczolak przysadki' },
              { key: 'hasPnet', label: 'Guz trzustki (pNET) / dwunastnicy' },
            ].map(m => (
              <label key={m.key} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', cursor: 'pointer' }}>
                <input type="checkbox" checked={(state as any)[m.key]} onChange={e => setState(prev => ({ ...prev, [m.key]: e.target.checked }))} />
                <span>{m.label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {surgeryPriorityAlert && (
          <div style={{ background: '#fef2f2', border: '1px solid #f87171', borderRadius: '12px', padding: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#b91c1c', fontWeight: 700, fontSize: '13px' }}>
              <AlertTriangle size={18} />
              ALARM CHIRURGICZNY
            </div>
            <div style={{ fontSize: '12px', color: '#991b1b', marginTop: '6px', lineHeight: 1.4 }}>
              {surgeryPriorityAlert}
            </div>
          </div>
        )}

        <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '16px' }}>
          <div style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>
            Decyzja ATA: Profilaktyczna tyroidectomia
          </div>
          <div style={{ fontSize: '11px', color: '#64748b' }}>Kategoria ryzyka RET:</div>
          <div style={{ fontSize: '15px', fontWeight: 800, color: '#0369a1', marginBottom: '8px' }}>
            {retRiskCategory}
          </div>
          <div style={{ fontSize: '11px', color: '#64748b' }}>Zalecany wiek operacji:</div>
          <div style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a', lineHeight: 1.4 }}>
            {recommendedThyroidectomyAge}
          </div>
        </div>
      </div>
    </div>
  );
}

export function NenTherapyTab({
  state,
  setState,
  metrics,
}: {
  state: NenSimulatorState;
  setState: Dispatch<SetStateAction<NenSimulatorState>>;
  metrics: CalculatedNenMetrics;
}) {
  const { cumulativeKidneyDoseGy, kidneyToleranceLimitGy, kidneyRisk, carcinoidCrisisRisk, captemResponseRatePercent } = metrics;

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '20px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '16px' }}>
          <span style={{ fontSize: '15px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '12px' }}>
            <Activity size={18} color="#d97706" />
            Dozymetria nerkowa PRRT (177Lu-DOTATATE)
          </span>

          <div style={{ marginBottom: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '4px' }}>
              <span style={{ fontWeight: 600, color: '#334155' }}>Skumulowana dawka na nerki:</span>
              <span style={{ fontWeight: 800, color: kidneyRisk === 'Przekroczony limit' ? '#dc2626' : '#d97706' }}>
                {cumulativeKidneyDoseGy} Gy / limit {kidneyToleranceLimitGy} Gy
              </span>
            </div>
            <div style={{ height: '16px', background: '#e2e8f0', borderRadius: '8px', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${Math.min(100, (cumulativeKidneyDoseGy / kidneyToleranceLimitGy) * 100)}%`, background: kidneyRisk === 'Przekroczony limit' ? '#dc2626' : kidneyRisk === 'Wysokie' ? '#f59e0b' : '#10b981', transition: 'width 0.3s ease' }} />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '14px' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '4px' }}>
                <span style={{ fontWeight: 600, color: '#334155' }}>Ukończone cykle PRRT:</span>
                <span style={{ fontWeight: 800, color: '#0284c7' }}>{state.prrtCyclesCompleted} / 6</span>
              </div>
              <input type="range" min="0" max="6" step="1" value={state.prrtCyclesCompleted} onChange={e => setState(prev => ({ ...prev, prrtCyclesCompleted: parseInt(e.target.value, 10) }))} style={{ width: '100%' }} />
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '4px' }}>
                <span style={{ fontWeight: 600, color: '#334155' }}>Wyjściowy eGFR (ml/min):</span>
                <span style={{ fontWeight: 800, color: '#0284c7' }}>{state.baselineGfr}</span>
              </div>
              <input type="range" min="20" max="120" step="1" value={state.baselineGfr} onChange={e => setState(prev => ({ ...prev, baselineGfr: parseInt(e.target.value, 10) }))} style={{ width: '100%' }} />
            </div>
          </div>

          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '12px', color: '#1e293b' }}>
            <input type="checkbox" checked={state.aminoAcidProtection} onChange={e => setState(prev => ({ ...prev, aminoAcidProtection: e.target.checked }))} />
            <span style={{ fontWeight: 600 }}>Wlew ochronny aminokwasów zasadowych (L-lizyna + L-arginina) — podnosi limit do 28 Gy</span>
          </label>
        </div>

        <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '16px' }}>
          <span style={{ fontSize: '14px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}>
            <HeartPulse size={16} color="#dc2626" />
            Profilaktyka przełomu rakowiaka (Carcinoid Crisis)
          </span>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '12px' }}>
              <input type="checkbox" checked={state.plannedSurgery} onChange={e => setState(prev => ({ ...prev, plannedSurgery: e.target.checked }))} />
              <span>Planowany zabieg chirurgiczny / biopsja / znieczulenie ogólne</span>
            </label>

            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '12px' }}>
              <input type="checkbox" checked={state.octreotidePremedication} onChange={e => setState(prev => ({ ...prev, octreotidePremedication: e.target.checked }))} />
              <span style={{ fontWeight: 600, color: state.octreotidePremedication ? '#166534' : '#dc2626' }}>
                Wdrożony ciągły wlew dożylny oktreotydu (50–100 µg/h) min. 2h przed zabiegiem
              </span>
            </label>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '16px' }}>
          <div style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>
            Zagrożenie przełomem rakowiaka:
          </div>
          <div style={{ padding: '8px', borderRadius: '6px', fontWeight: 700, fontSize: '13px', textAlign: 'center', background: carcinoidCrisisRisk === 'Krytyczne' ? '#fee2e2' : carcinoidCrisisRisk === 'Umiarkowane' ? '#fef3c7' : '#dcfce7', color: carcinoidCrisisRisk === 'Krytyczne' ? '#b91c1c' : carcinoidCrisisRisk === 'Umiarkowane' ? '#b45309' : '#15803d' }}>
            {carcinoidCrisisRisk.toUpperCase()}
          </div>
        </div>

        <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '16px' }}>
          <div style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Pill size={16} color="#4f46e5" />
            Schemat CAPTEM (NANETS/NCCN)
          </div>
          <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', cursor: 'pointer', marginBottom: '8px' }}>
            <input type="checkbox" checked={state.mgmtDeficient} onChange={e => setState(prev => ({ ...prev, mgmtDeficient: e.target.checked }))} />
            <span>Niedobór enzymu naprawczego MGMT w IHC</span>
          </label>
          <div style={{ fontSize: '11px', color: '#64748b' }}>Przewidywany odsetek odpowiedzi (ORR):</div>
          <div style={{ fontSize: '20px', fontWeight: 800, color: '#4f46e5' }}>
            {captemResponseRatePercent}%
          </div>
          <div style={{ fontSize: '10px', color: '#64748b', marginTop: '2px' }}>
            {state.mgmtDeficient ? 'Wyczerpanie MGMT potęguje uszkodzenie DNA przez temozolomid' : 'Zachowany enzym MGMT obniża skuteczność alkilacji'}
          </div>
        </div>
      </div>
    </div>
  );
}

export { NenTherapyTab as NenPrrtTab };

