'use client';
import { useState, useMemo } from 'react';
import { AlertOctagon, CheckCircle2, Sparkles } from 'lucide-react';

export function GonadConsoleIvf() {
  const [protocol, setProtocol] = useState<'antagonist' | 'long_agonist'>('antagonist');
  const [follicleCount, setFollicleCount] = useState<number>(22); // liczba pęcherzyków >11 mm
  const [estradiolPeak, setEstradiolPeak] = useState<number>(4200); // pg/ml
  const [amhLevel, setAmhLevel] = useState<number>(4.8); // ng/ml
  const [triggerChoice, setTriggerChoice] = useState<'hcg' | 'gnrh_agonist'>('gnrh_agonist');
  const [triggerDose, setTriggerDose] = useState<number>(0.2);
  const [freezeAll, setFreezeAll] = useState<boolean>(true);
  const [cabergolineUsed, setCabergolineUsed] = useState<boolean>(true);
  const [cabergolineDose, setCabergolineDose] = useState<number>(0.5);
  const [cabergolineDays, setCabergolineDays] = useState<number>(8);

  // Ocena ryzyka OHSS
  const riskAssessment = useMemo(() => {
    let score = 0;
    const reasons: string[] = [];

    if (follicleCount >= 18) {
      score += 2;
      reasons.push(`Wysoka liczba pęcherzyków (${follicleCount} ≥ 18) świadczy o hiperodpowiedzi jajników.`);
    }
    if (estradiolPeak >= 3500) {
      score += 2;
      reasons.push(`Szczytowy estradiol ${estradiolPeak} pg/ml (≥3500 pg/ml) wskazuje na masywną aktywność ziarnistą.`);
    }
    if (amhLevel >= 3.4) {
      score += 1;
      reasons.push(`AMH ${amhLevel} ng/ml (≥3,4 ng/ml) to potwierdzony fenotyp PCO / wysoka rezerwa.`);
    }

    const baselineRisk = score >= 3 ? 'high' : score >= 1 ? 'moderate' : 'low';

    // Wpływ postępowania ochronnego
    let residualRisk = baselineRisk;
    const interventions: string[] = [];

    if (triggerChoice === 'gnrh_agonist') {
      if (protocol === 'antagonist') {
        interventions.push(`Trigger agonistą GnRH (${triggerDose.toLocaleString('pl-PL')} mg w tym scenariuszu): krótki wyrzut LH ogranicza ekspozycję lutealną; nie wyklucza wczesnego OHSS.`);
        if (residualRisk === 'high') residualRisk = 'moderate';
        if (residualRisk === 'moderate') residualRisk = 'low';
      } else {
        interventions.push('UWAGA BŁĄD PROTOKOŁU: Trigger agonistą GnRH jest niemożliwy w długim protokole z agonistą (receptory GnRHR są zdesensytyzowane!).');
      }
    } else {
      interventions.push(`Trigger hCG (${Math.round(triggerDose)} IU w tym scenariuszu): dłuższa aktywność luteotropowa zwiększa znaczenie oceny ryzyka OHSS.`);
    }

    if (freezeAll) {
      interventions.push('Strategia freeze-all ogranicza ryzyko późnego OHSS związanego z endogennym hCG ciąży, ale nie usuwa ryzyka wczesnego OHSS.');
      if (residualRisk === 'high') residualRisk = 'low';
    } else if (baselineRisk === 'high') {
      interventions.push('Świeży transfer przy wysokiej odpowiedzi wymaga uwzględnienia późnego OHSS, jeśli dojdzie do ciąży.');
    }

    if (cabergolineUsed) {
      interventions.push(`Kabergolina ${cabergolineDose.toLocaleString('pl-PL')} mg/d przez ${cabergolineDays} dni: działanie dopaminergiczne może ograniczać przepuszczalność związaną ze szlakiem VEGF; nie zastępuje monitorowania.`);
    }

    return { baselineRisk, residualRisk, reasons, interventions };
  }, [protocol, follicleCount, estradiolPeak, amhLevel, triggerChoice, triggerDose, freezeAll, cabergolineUsed, cabergolineDose, cabergolineDays]);

  return (
    <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '18px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
        <Sparkles size={20} color="#8b5cf6" />
        <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 800 }}>
          Stymulacja Ovarialna (IVF/ART) i Predykcja Zespołu Hiperstymulacji (OHSS)
        </h3>
      </div>
      <p style={{ fontSize: '12px', color: '#64748b', margin: '0 0 16px' }}>
        Zespół hiperstymulacji jajników (OHSS) wynika z masywnego uwalniania naczyniowo-śródbłonkowego czynnika wzrostu (VEGF) pod wpływem hCG. Przetestuj wpływ protokołu, wyboru triggera i strategii prewencji.
      </p>

      {/* PARAMETRY STYMULACJI */}
      <div style={{ background: '#f5f3ff', border: '1px solid #ddd6fe', borderRadius: '10px', padding: '14px', marginBottom: '16px' }}>
        <div style={{ fontSize: '12px', fontWeight: 700, color: '#6d28d9', marginBottom: '10px' }}>
          1. Profil odpowiedzi pacjentki i parametry w dniu triggera
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: '12px', marginBottom: '12px' }}>
          <div>
            <label style={{ fontSize: '11px', display: 'flex', justifyContent: 'space-between', marginBottom: '3px' }}>
              <span>Pęcherzyki &gt;11 mm w USG:</span>
              <strong>{follicleCount}</strong>
            </label>
            <input
              type="range"
              min="4"
              max="35"
              step="1"
              value={follicleCount}
              onChange={e => setFollicleCount(Number(e.target.value))}
              style={{ width: '100%' }}
            />
            <span style={{ fontSize: '10px', color: follicleCount >= 18 ? '#dc2626' : '#64748b' }}>
              {follicleCount >= 18 ? '≥18 pęcherzyków — marker wysokiej odpowiedzi' : '<18 pęcherzyków; oceniaj łącznie z pozostałymi danymi'}
            </span>
          </div>

          <div>
            <label style={{ fontSize: '11px', display: 'flex', justifyContent: 'space-between', marginBottom: '3px' }}>
              <span>Szczytowy estradiol (E2):</span>
              <strong>{estradiolPeak} pg/ml</strong>
            </label>
            <input
              type="range"
              min="800"
              max="8000"
              step="200"
              value={estradiolPeak}
              onChange={e => setEstradiolPeak(Number(e.target.value))}
              style={{ width: '100%' }}
            />
            <span style={{ fontSize: '10px', color: estradiolPeak >= 3500 ? '#dc2626' : '#64748b' }}>
              {estradiolPeak >= 3500 ? '≥3500 pg/ml — jeden z markerów wysokiej odpowiedzi' : '<3500 pg/ml; pojedynczy próg nie rozpoznaje OHSS'}
            </span>
          </div>

          <div>
            <label style={{ fontSize: '11px', display: 'flex', justifyContent: 'space-between', marginBottom: '3px' }}>
              <span>Wyjściowe AMH:</span>
              <strong>{amhLevel} ng/ml</strong>
            </label>
            <input
              type="range"
              min="0.5"
              max="12.0"
              step="0.5"
              value={amhLevel}
              onChange={e => setAmhLevel(Number(e.target.value))}
              style={{ width: '100%' }}
            />
            <span style={{ fontSize: '10px', color: amhLevel >= 3.4 ? '#d97706' : '#64748b' }}>
              {amhLevel >= 3.4 ? 'Wysokie AMH — zwiększone ryzyko nadmiernej odpowiedzi' : 'Niższe AMH; wynik zależy od metody i wieku'}
            </span>
          </div>
        </div>
      </div>

      {/* PROTOKÓŁ I PREWENCJA */}
      <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '14px', marginBottom: '16px' }}>
        <div style={{ fontSize: '12px', fontWeight: 700, color: '#0f172a', marginBottom: '10px' }}>
          2. Decyzje kliniczne: protokół stymulacji i prewencja OHSS
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', marginBottom: '12px' }}>
          <div>
            <label style={{ fontSize: '11px', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '4px' }}>
              Protokół stymulacji:
            </label>
            <select
              value={protocol}
              onChange={e => setProtocol(e.target.value as typeof protocol)}
              style={{ width: '100%', padding: '6px', fontSize: '11px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
            >
              <option value="antagonist">Protokół z antagonistą GnRH (standard ESHRE)</option>
              <option value="long_agonist">Długi protokół z agonistą GnRH (klasyczny)</option>
            </select>
          </div>

          <div>
            <label style={{ fontSize: '11px', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '4px' }}>
              Trigger dojrzewania oocytów:
            </label>
            <select
              value={triggerChoice}
              onChange={e => { const next=e.target.value as 'hcg'|'gnrh_agonist'; setTriggerChoice(next); setTriggerDose(next==='hcg'?5000:0.2); }}
              style={{ width: '100%', padding: '6px', fontSize: '11px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
            >
              <option value="gnrh_agonist">Agonista GnRH (np. triptorelina 0,2 mg) — protekcja</option>
              <option value="hcg">Choriogonadotropina hCG (5000–10000 IU) — standard</option>
            </select>
          </div>
          <div>
            <label style={{ fontSize: '11px', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '4px' }}>
              Dawka triggera ({triggerChoice === 'hcg' ? 'IU' : 'mg'}):
            </label>
            <input type="number" min={triggerChoice === 'hcg' ? 1000 : 0.05} max={triggerChoice === 'hcg' ? 15000 : 1} step={triggerChoice === 'hcg' ? 250 : 0.05} value={triggerDose} onChange={e => setTriggerDose(Number(e.target.value))} style={{ width: '100%', padding: '6px', fontSize: '11px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
          </div>
        </div>

        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <label style={{ fontSize: '11px', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
            <input type="checkbox" checked={freezeAll} onChange={e => setFreezeAll(e.target.checked)} />
            <strong style={{ color: freezeAll ? '#166534' : '#334155' }}>Strategia Freeze-All (zamrożenie wszystkich zarodków)</strong>
          </label>
          <label style={{ fontSize: '11px', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
            <input type="checkbox" checked={cabergolineUsed} onChange={e => setCabergolineUsed(e.target.checked)} />
            <span style={{ color: '#334155' }}>Kabergolina — dodaj do scenariusza</span>
          </label>
        </div>
        {cabergolineUsed && <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,minmax(130px,200px))', gap: '8px', marginTop: '10px' }}>
          <label style={{ fontSize: '11px', color: '#334155' }}>Dawka dobowa (mg)<input type="number" min="0.125" max="1" step="0.125" value={cabergolineDose} onChange={e=>setCabergolineDose(Number(e.target.value))} style={{display:'block',width:'100%',marginTop:'4px',padding:'6px',border:'1px solid #cbd5e1',borderRadius:'6px'}}/></label>
          <label style={{ fontSize: '11px', color: '#334155' }}>Czas (dni)<input type="number" min="1" max="14" value={cabergolineDays} onChange={e=>setCabergolineDays(Number(e.target.value))} style={{display:'block',width:'100%',marginTop:'4px',padding:'6px',border:'1px solid #cbd5e1',borderRadius:'6px'}}/></label>
        </div>}
      </div>

      {/* WERDYKT I INTERWENCJE */}
      <div style={{ padding: '14px', borderRadius: '10px', background: riskAssessment.residualRisk === 'high' ? '#fef2f2' : riskAssessment.residualRisk === 'moderate' ? '#fffbeb' : '#f0fdf4', border: '1px solid', borderColor: riskAssessment.residualRisk === 'high' ? '#fecaca' : riskAssessment.residualRisk === 'moderate' ? '#fde68a' : '#bbf7d0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          {riskAssessment.residualRisk === 'high' ? (
            <AlertOctagon size={20} color="#dc2626" />
          ) : (
            <CheckCircle2 size={20} color="#16a34a" />
          )}
          <span style={{ fontSize: '13px', fontWeight: 800, color: riskAssessment.residualRisk === 'high' ? '#991b1b' : riskAssessment.residualRisk === 'moderate' ? '#92400e' : '#166534' }}>
            Ryzyko końcowe OHSS po zastosowanych interwencjach:{' '}
            {riskAssessment.residualRisk === 'high' ? 'WYSOKIE (ZAGROŻENIE KLINICZNE)' : riskAssessment.residualRisk === 'moderate' ? 'UMIARKOWANE' : 'NISKIE / ZMINIMALIZOWANE'}
          </span>
        </div>

        <div style={{ fontSize: '11px', color: '#1e293b', lineHeight: 1.5 }}>
          <div style={{ fontWeight: 600, marginBottom: '4px' }}>Wnioski kliniczne:</div>
          <ul style={{ margin: 0, paddingLeft: '18px' }}>
            {riskAssessment.interventions.map((item, idx) => (
              <li key={idx} style={{ marginBottom: '2px' }}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
