'use client';
import { useState } from 'react';
import { Activity, ShieldCheck, AlertTriangle, Zap, Dna, Gauge, Sparkles, Scale } from 'lucide-react';

export function PrrtDosimetryCalculator() {
  const [cycles, setCycles] = useState<number>(4);
  const [activityPerCycleGbq, setActivityPerCycleGbq] = useState<number>(7.4);
  const [gfr, setGfr] = useState<number>(80);
  const [hasAminoAcids, setHasAminoAcids] = useState<boolean>(true);

  // Dosimetry calculation based on MIRD scheme
  // With AA: ~0.62 Gy/GBq for normal GFR. Without AA: ~0.88 Gy/GBq.
  const gfrPenalty = gfr < 60 ? 1 + (60 - gfr) * 0.015 : 1.0;
  const doseFactor = hasAminoAcids ? 0.62 : 0.88;
  const kidneyDoseGy = Math.round(cycles * activityPerCycleGbq * doseFactor * gfrPenalty * 10) / 10;
  const marrowDoseGy = Math.round(cycles * activityPerCycleGbq * 0.05 * 10) / 10;

  const kidneyLimit = hasAminoAcids ? 28 : 23;
  const isOverKidneyLimit = kidneyDoseGy > kidneyLimit;
  const isOverMarrowLimit = marrowDoseGy > 2.0;

  return (
    <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '16px', margin: '16px 0' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
        <Activity size={18} color="#0284c7" />
        <h4 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>
          Kalkulator Dozymetrii PRRT i Dawki Pochłoniętej przez Narządy Krytyczne
        </h4>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px', marginBottom: '14px' }}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '4px' }}>
            <span style={{ color: '#475569' }}>Liczba planowanych cykli:</span>
            <span style={{ fontWeight: 800, color: '#0284c7' }}>{cycles}</span>
          </div>
          <input
            type="range"
            min="1"
            max="6"
            step="1"
            value={cycles}
            onChange={e => setCycles(parseInt(e.target.value, 10))}
            style={{ width: '100%' }}
          />
        </div>

        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '4px' }}>
            <span style={{ color: '#475569' }}>Aktywność na cykl (GBq):</span>
            <span style={{ fontWeight: 800, color: '#0284c7' }}>{activityPerCycleGbq} GBq</span>
          </div>
          <input
            type="range"
            min="3.7"
            max="7.4"
            step="0.1"
            value={activityPerCycleGbq}
            onChange={e => setActivityPerCycleGbq(parseFloat(e.target.value))}
            style={{ width: '100%' }}
          />
        </div>

        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '4px' }}>
            <span style={{ color: '#475569' }}>Wyjściowy eGFR (ml/min):</span>
            <span style={{ fontWeight: 800, color: '#0284c7' }}>{gfr}</span>
          </div>
          <input
            type="range"
            min="30"
            max="120"
            step="1"
            value={gfr}
            onChange={e => setGfr(parseInt(e.target.value, 10))}
            style={{ width: '100%' }}
          />
        </div>
      </div>

      <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '12px', marginBottom: '14px' }}>
        <input
          type="checkbox"
          checked={hasAminoAcids}
          onChange={e => setHasAminoAcids(e.target.checked)}
        />
        <span style={{ fontWeight: 600 }}>Wlew ochronny lizyny i argininy (redukuje reabsorpcję cewkową i podnosi limit do 28 Gy)</span>
      </label>

      {/* Results bars */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
        <div style={{ padding: '12px', background: isOverKidneyLimit ? '#fef2f2' : '#f0fdf4', borderRadius: '8px', border: `1px solid ${isOverKidneyLimit ? '#fecaca' : '#bbf7d0'}` }}>
          <div style={{ fontSize: '11px', color: '#64748b' }}>Dawka pochłonięta przez nerki:</div>
          <div style={{ fontSize: '20px', fontWeight: 800, color: isOverKidneyLimit ? '#b91c1c' : '#15803d' }}>
            {kidneyDoseGy} Gy <span style={{ fontSize: '12px', fontWeight: 500 }}>(limit: {kidneyLimit} Gy)</span>
          </div>
          <div style={{ fontSize: '11px', color: isOverKidneyLimit ? '#b91c1c' : '#166534', marginTop: '4px' }}>
            {isOverKidneyLimit ? 'PRZEKROCZENIE LIMITU NERKOWEGO!' : 'Dawka bezpieczna radiologicznie'}
          </div>
        </div>

        <div style={{ padding: '12px', background: isOverMarrowLimit ? '#fef2f2' : '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
          <div style={{ fontSize: '11px', color: '#64748b' }}>Dawka na szpik kostny:</div>
          <div style={{ fontSize: '20px', fontWeight: 800, color: isOverMarrowLimit ? '#b91c1c' : '#0f172a' }}>
            {marrowDoseGy} Gy <span style={{ fontSize: '12px', fontWeight: 500 }}>(limit: 2,0 Gy)</span>
          </div>
          <div style={{ fontSize: '11px', color: '#64748b', marginTop: '4px' }}>
            {isOverMarrowLimit ? 'Ryzyko mielosupresji / wtórnego MDS' : 'Szpik kostny w normie dozymetrycznej'}
          </div>
        </div>
      </div>
    </div>
  );
}

export function Ki67TumorKineticsModel() {
  const [d1, setD1] = useState<number>(20); // initial diameter in mm
  const [d2, setD2] = useState<number>(25); // follow-up diameter in mm
  const [days, setDays] = useState<number>(180); // interval in days
  const [ki67, setKi67] = useState<number>(8); // %

  // Volume: V = (4/3)*pi*r^3 -> ratio V2/V1 = (d2/d1)^3
  const volumeRatio = Math.pow(d2 / d1, 3);
  const percentDiameterChange = Math.round(((d2 - d1) / d1) * 100);

  // Doubling time DT = days * ln(2) / ln(V2/V1)
  let doublingTimeDays = 0;
  if (d2 > d1) {
    doublingTimeDays = Math.round((days * Math.LN2) / Math.log(volumeRatio));
  } else {
    doublingTimeDays = 9999;
  }

  // RECIST 1.1 classification
  let recist = 'Stabilizacja choroby (SD)';
  if (percentDiameterChange >= 20 && (d2 - d1) >= 5) {
    recist = 'Progresja choroby (PD) wg RECIST 1.1';
  } else if (percentDiameterChange <= -30) {
    recist = 'Częściowa odpowiedź (PR) wg RECIST 1.1';
  }

  // Expected WHO Grade
  const expectedGrade = ki67 < 3 ? 'NET G1' : ki67 <= 20 ? 'NET G2' : 'NET G3 / NEC';

  return (
    <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '16px', margin: '16px 0' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
        <Gauge size={18} color="#7c3aed" />
        <h4 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>
          Model Kinetyki Proliferacji Ki-67 i Czasu Podwojenia Guza (Doubling Time)
        </h4>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px', marginBottom: '14px' }}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '4px' }}>
            <span>Średnica wyjściowa (d1):</span>
            <strong>{d1} mm</strong>
          </div>
          <input
            type="range"
            min="5"
            max="80"
            step="1"
            value={d1}
            onChange={e => setD1(parseInt(e.target.value, 10))}
            style={{ width: '100%' }}
          />
        </div>

        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '4px' }}>
            <span>Średnica kontrolna (d2):</span>
            <strong>{d2} mm</strong>
          </div>
          <input
            type="range"
            min="5"
            max="100"
            step="1"
            value={d2}
            onChange={e => setD2(parseInt(e.target.value, 10))}
            style={{ width: '100%' }}
          />
        </div>

        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '4px' }}>
            <span>Odstęp czasowy:</span>
            <strong>{days} dni</strong>
          </div>
          <input
            type="range"
            min="30"
            max="720"
            step="30"
            value={days}
            onChange={e => setDays(parseInt(e.target.value, 10))}
            style={{ width: '100%' }}
          />
        </div>

        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '4px' }}>
            <span>Indeks Ki-67 w bioptacie:</span>
            <strong>{ki67}%</strong>
          </div>
          <input
            type="range"
            min="1"
            max="80"
            step="1"
            value={ki67}
            onChange={e => setKi67(parseInt(e.target.value, 10))}
            style={{ width: '100%' }}
          />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', textAlign: 'center' }}>
        <div style={{ padding: '10px', background: '#f5f3ff', borderRadius: '8px', border: '1px solid #ddd6fe' }}>
          <div style={{ fontSize: '11px', color: '#6d28d9' }}>Czas podwojenia objętości (DT):</div>
          <div style={{ fontSize: '18px', fontWeight: 800, color: '#5b21b6' }}>
            {doublingTimeDays > 5000 ? 'Brak wzrostu' : `${doublingTimeDays} dni`}
          </div>
          <div style={{ fontSize: '10px', color: '#7c3aed' }}>
            {doublingTimeDays < 90 ? 'Gwałtowna progresja' : doublingTimeDays < 365 ? 'Umiarkowane tempo' : 'Powolny wzrost'}
          </div>
        </div>

        <div style={{ padding: '10px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
          <div style={{ fontSize: '11px', color: '#475569' }}>Zmiana średnicy tarczowej:</div>
          <div style={{ fontSize: '18px', fontWeight: 800, color: percentDiameterChange >= 20 ? '#b91c1c' : percentDiameterChange <= -30 ? '#15803d' : '#0f172a' }}>
            {percentDiameterChange > 0 ? `+${percentDiameterChange}%` : `${percentDiameterChange}%`}
          </div>
          <div style={{ fontSize: '10px', color: '#64748b' }}>{recist}</div>
        </div>

        <div style={{ padding: '10px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
          <div style={{ fontSize: '11px', color: '#475569' }}>Stopień WHO z Ki-67:</div>
          <div style={{ fontSize: '18px', fontWeight: 800, color: '#0284c7' }}>
            {expectedGrade}
          </div>
          <div style={{ fontSize: '10px', color: '#64748b' }}>Ki-67: {ki67}%</div>
        </div>
      </div>
    </div>
  );
}

export function SerotoninShuntAndSstrVisualizer() {
  const [shuntPercent, setShuntPercent] = useState<number>(65);

  // Tryptophan partitioning
  // Normal: 99% to Niacin, 1% to Serotonin.
  // In Carcinoid: shuntPercent goes to Serotonin.
  const niacinPercent = Math.max(1, 100 - shuntPercent);
  const urine5HiaaMg = Math.round(5 + shuntPercent * 1.8);
  const flushingAttacksPerDay = Math.round(shuntPercent / 12);
  const pelagraRisk = shuntPercent > 60 ? 'Wysokie (wskazana suplementacja witaminy B3)' : 'Niskie';

  return (
    <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '16px', margin: '16px 0' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
        <Dna size={18} color="#059669" />
        <h4 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>
          Bocznikowanie Tryptofanu (Pelagra vs Zespół Rakowiaka) & Profil SSTR
        </h4>
      </div>

      <div style={{ marginBottom: '14px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '4px' }}>
          <span style={{ color: '#475569' }}>Przechwycenie puli L-tryptofanu przez guz rakowiaka (%):</span>
          <span style={{ fontWeight: 800, color: '#059669' }}>{shuntPercent}%</span>
        </div>
        <input
          type="range"
          min="5"
          max="95"
          step="5"
          value={shuntPercent}
          onChange={e => setShuntPercent(parseInt(e.target.value, 10))}
          style={{ width: '100%' }}
        />
      </div>

      {/* Shunt visual bar */}
      <div style={{ marginBottom: '14px' }}>
        <div style={{ height: '22px', borderRadius: '6px', overflow: 'hidden', display: 'flex', background: '#e2e8f0', marginBottom: '6px' }}>
          <div
            style={{ width: `${shuntPercent}%`, background: '#059669', color: '#fff', fontSize: '11px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            title="Szlak serotoniny i 5-HIAA"
          >
            Serotonina / 5-HIAA ({shuntPercent}%)
          </div>
          <div
            style={{ width: `${niacinPercent}%`, background: '#f59e0b', color: '#fff', fontSize: '11px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            title="Szlak kwasu nikotynowego (niacyny)"
          >
            Niacyna ({niacinPercent}%)
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', textAlign: 'center', marginBottom: '16px' }}>
        <div style={{ padding: '10px', background: '#ecfdf5', borderRadius: '8px', border: '1px solid #a7f3d0' }}>
          <div style={{ fontSize: '11px', color: '#065f46' }}>Dobowe 5-HIAA w moczu:</div>
          <div style={{ fontSize: '18px', fontWeight: 800, color: '#047857' }}>{urine5HiaaMg} mg/24h</div>
          <div style={{ fontSize: '10px', color: '#059669' }}>Norma &lt; 8 mg/24h</div>
        </div>

        <div style={{ padding: '10px', background: '#fef3c7', borderRadius: '8px', border: '1px solid #fde68a' }}>
          <div style={{ fontSize: '11px', color: '#92400e' }}>Napady flushingu:</div>
          <div style={{ fontSize: '18px', fontWeight: 800, color: '#b45309' }}>~{flushingAttacksPerDay} / dobę</div>
          <div style={{ fontSize: '10px', color: '#d97706' }}>Naczynioruchowy rumień twarzy</div>
        </div>

        <div style={{ padding: '10px', background: shuntPercent > 60 ? '#fef2f2' : '#f8fafc', borderRadius: '8px', border: `1px solid ${shuntPercent > 60 ? '#fecaca' : '#e2e8f0'}` }}>
          <div style={{ fontSize: '11px', color: '#475569' }}>Ryzyko pelagry (awitaminozy B3):</div>
          <div style={{ fontSize: '13px', fontWeight: 700, color: shuntPercent > 60 ? '#b91c1c' : '#15803d', marginTop: '4px' }}>
            {pelagraRisk}
          </div>
        </div>
      </div>

      {/* SSTR Receptor affinity table */}
      <div style={{ fontSize: '12px', fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>
        Powinowactwo analogów somatostatyny do podtypów SSTR (IC50 w nM):
      </div>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', fontSize: '11px', borderCollapse: 'collapse', textAlign: 'center' }}>
          <thead>
            <tr style={{ background: '#f1f5f9', borderBottom: '1px solid #cbd5e1' }}>
              <th style={{ padding: '6px', textAlign: 'left' }}>Lek</th>
              <th style={{ padding: '6px' }}>SSTR1</th>
              <th style={{ padding: '6px' }}>SSTR2</th>
              <th style={{ padding: '6px' }}>SSTR3</th>
              <th style={{ padding: '6px' }}>SSTR4</th>
              <th style={{ padding: '6px' }}>SSTR5</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
              <td style={{ padding: '6px', textAlign: 'left', fontWeight: 600 }}>Oktreotyd</td>
              <td>&gt;1000</td>
              <td style={{ background: '#dbeafe', fontWeight: 700, color: '#1d4ed8' }}>0,4 (silne)</td>
              <td>40</td>
              <td>&gt;1000</td>
              <td>6,0</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
              <td style={{ padding: '6px', textAlign: 'left', fontWeight: 600 }}>Lanreotyd</td>
              <td>180</td>
              <td style={{ background: '#dbeafe', fontWeight: 700, color: '#1d4ed8' }}>0,5 (silne)</td>
              <td>14</td>
              <td>&gt;1000</td>
              <td>5,7</td>
            </tr>
            <tr>
              <td style={{ padding: '6px', textAlign: 'left', fontWeight: 600 }}>Pasyreotyd</td>
              <td style={{ background: '#f3e8ff' }}>9,3</td>
              <td style={{ background: '#dbeafe', fontWeight: 700 }}>1,0</td>
              <td style={{ background: '#f3e8ff' }}>1,5</td>
              <td>&gt;100</td>
              <td style={{ background: '#fce7f3', fontWeight: 700, color: '#be185d' }}>0,16 (b. silne)</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
