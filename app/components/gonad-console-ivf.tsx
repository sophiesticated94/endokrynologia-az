'use client';
import { useState, useMemo } from 'react';
import { AlertOctagon, CheckCircle2, ShieldAlert, Sparkles } from 'lucide-react';

export function GonadConsoleIvf() {
  const [protocol, setProtocol] = useState<'antagonist' | 'long_agonist'>('antagonist');
  const [follicleCount, setFollicleCount] = useState<number>(22); // liczba pęcherzyków >11 mm
  const [estradiolPeak, setEstradiolPeak] = useState<number>(4200); // pg/ml
  const [amhLevel, setAmhLevel] = useState<number>(4.8); // ng/ml
  const [triggerChoice, setTriggerChoice] = useState<'hcg' | 'gnrh_agonist'>('gnrh_agonist');
  const [freezeAll, setFreezeAll] = useState<boolean>(true);
  const [cabergolineUsed, setCabergolineUsed] = useState<boolean>(true);

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
        interventions.push('Trigger agonistą GnRH (np. triptorelina 0,2 mg): krótki wyrzut LH z szybką luteolizą niemal do zera znosi wczesny OHSS!');
        if (residualRisk === 'high') residualRisk = 'moderate';
        if (residualRisk === 'moderate') residualRisk = 'low';
      } else {
        interventions.push('UWAGA BŁĄD PROTOKOŁU: Trigger agonistą GnRH jest niemożliwy w długim protokole z agonistą (receptory GnRHR są zdesensytyzowane!).');
      }
    } else {
      interventions.push('Trigger hCG (5000–10000 IU): długi t1/2 stymuluje ciałka żółte do ciągłego wydzielania VEGF (wysokie ryzyko naczyniowe!).');
    }

    if (freezeAll) {
      interventions.push('Strategia Freeze-All (odroczenie transferu zarodków): całkowicie zapobiega późnemu OHSS wywoływanemu przez ciążowe hCG!');
      if (residualRisk === 'high') residualRisk = 'low';
    } else if (baselineRisk === 'high') {
      interventions.push('Świeży transfer zarodka przy wysokim ryzyku stwarza zagrożenie zagrażającego życiu późnego OHSS w razie ciąży mnogiej.');
    }

    if (cabergolineUsed) {
      interventions.push('Kabergolina 0,5 mg/d: agonista receptora dopaminergicznego D2 blokuje fosforylację VEGFR-2 i zmniejsza przesięki.');
    }

    return { baselineRisk, residualRisk, reasons, interventions };
  }, [protocol, follicleCount, estradiolPeak, amhLevel, triggerChoice, freezeAll, cabergolineUsed]);

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
              {follicleCount >= 18 ? '≥18 pęcherzyków (hiperodpowiedź)' : 'Prawidłowa kohorta (<18)'}
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
              {estradiolPeak >= 3500 ? '≥3500 pg/ml (krytyczne ryzyko)' : '<3500 pg/ml'}
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
              {amhLevel >= 3.4 ? 'Wysokie AMH (fenotyp PCOM)' : 'Norma rezerwy'}
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
              onChange={e => setProtocol(e.target.value as any)}
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
              onChange={e => setTriggerChoice(e.target.value as any)}
              style={{ width: '100%', padding: '6px', fontSize: '11px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
            >
              <option value="gnrh_agonist">Agonista GnRH (np. triptorelina 0,2 mg) — protekcja</option>
              <option value="hcg">Choriogonadotropina hCG (5000–10000 IU) — standard</option>
            </select>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <label style={{ fontSize: '11px', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
            <input type="checkbox" checked={freezeAll} onChange={e => setFreezeAll(e.target.checked)} />
            <strong style={{ color: freezeAll ? '#166534' : '#334155' }}>Strategia Freeze-All (zamrożenie wszystkich zarodków)</strong>
          </label>
          <label style={{ fontSize: '11px', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
            <input type="checkbox" checked={cabergolineUsed} onChange={e => setCabergolineUsed(e.target.checked)} />
            <span style={{ color: '#334155' }}>Kabergolina 0,5 mg/d przez 8 dni po punkcji (blokada VEGFR-2)</span>
          </label>
        </div>
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
