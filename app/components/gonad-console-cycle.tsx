'use client';
import { useState } from 'react';
import { Calendar, HelpCircle } from 'lucide-react';

export function GonadConsoleCycle() {
  const [cycleDay, setCycleDay] = useState<number>(13); // dzień cyklu (1 - 28)
  const [diffCondition, setDiffCondition] = useState<'fha' | 'poi' | 'pcos'>('pcos');

  // Obliczenia parametrów fizjologicznych dla danego dnia
  const getCycleState = (day: number) => {
    let phase = '';
    let e2 = 40; // pg/ml
    let p4 = 0.5; // ng/ml
    let lh = 5; // mIU/ml
    let fsh = 6; // mIU/ml
    let feedback = '';
    let endometrium = 4; // mm

    if (day <= 5) {
      phase = 'Wczesna faza folikularna (menstruacja i rekrutacja)';
      e2 = 30 + day * 4;
      p4 = 0.4;
      lh = 4;
      fsh = 7.5 - day * 0.3;
      feedback = 'Ujemne sprzężenie: niski E2 pozwala na przejściowy wzrost FSH, co rekrutuje pęcherzyki antralne.';
      endometrium = 3 + day * 0.4;
    } else if (day <= 11) {
      phase = 'Średnia faza folikularna (selekcja pęcherzyka Graafa)';
      const t = (day - 5) / 6;
      e2 = 50 + t * 140; // rośnie do ~190
      p4 = 0.6;
      lh = 5 + t * 4;
      fsh = 6 - t * 2.5; // spadek FSH przez rosnący E2 i inhibinę B
      feedback = 'Ujemne sprzężenie: rosnący E2 z pęcherzyka dominującego obniża FSH, doprowadzając do atrezji pozostałych pęcherzyków.';
      endometrium = 5 + t * 4;
    } else if (day <= 14) {
      phase = 'Faza okołoowulacyjna (przełączenie sprzężenia zwrotnego)';
      const t = (day - 11) / 3;
      e2 = 220 + (1 - Math.abs(day - 13)) * 80; // piki >200-300 pg/ml
      p4 = 0.8 + t * 0.8;
      lh = day === 14 ? 55 : day === 13 ? 75 : 30; // LH surge
      fsh = day === 14 ? 14 : day === 13 ? 18 : 9;
      feedback = 'DODATNIE SPRZĘŻENIE ZWROTNE: E2 >200 pg/ml przez >36–48h odwraca sprzężenie i wyzwala wyrzut LH/FSH (LH surge) niezbędny do pęknięcia pęcherzyka!';
      endometrium = 9 + t * 2;
    } else if (day <= 22) {
      phase = 'Środkowa faza lutealna (szczyt funkcji ciałka żółtego)';
      const t = (day - 14) / 8;
      e2 = 120 + Math.sin(t * Math.PI) * 60;
      p4 = 4 + Math.sin(t * Math.PI) * 14; // piki P4 12-18 ng/ml
      lh = 2.5;
      fsh = 2.0;
      feedback = 'Silne ujemne sprzężenie: wysoki progesteron i estradiol całkowicie blokują wydzielanie LH i FSH, zapobiegając nowej owulacji.';
      endometrium = 11 + t * 3;
    } else {
      phase = 'Późna faza lutealna (luteoliza i przygotowanie do złuszczenia)';
      const t = (day - 22) / 6;
      e2 = 120 - t * 80;
      p4 = 14 - t * 13;
      lh = 3.5;
      fsh = 3.5 + t * 2.5;
      feedback = 'Zniesienie ujemnego sprzężenia: inwolucja ciałka żółtego powoduje gwałtowny spadek P4 i E2, co wywoła krwawienie i odblokuje FSH.';
      endometrium = 13 - t * 2;
    }

    return { phase, e2: Math.round(e2), p4: Math.round(p4 * 10) / 10, lh: Math.round(lh), fsh: Math.round(fsh * 10) / 10, feedback, endometrium: Math.round(endometrium * 10) / 10 };
  };

  const current = getCycleState(cycleDay);

  // SVG wykres cyklu
  const svgW = 560;
  const svgH = 140;
  const pad = { top: 15, right: 15, bottom: 25, left: 35 };

  const getX = (d: number) => pad.left + ((d - 1) / 27) * (svgW - pad.left - pad.right);
  const getYE2 = (val: number) => pad.top + (1 - Math.min(320, val) / 320) * (svgH - pad.top - pad.bottom);
  const getYLH = (val: number) => pad.top + (1 - Math.min(80, val) / 80) * (svgH - pad.top - pad.bottom);

  const e2Points: { x: number; y: number }[] = [];
  const lhPoints: { x: number; y: number }[] = [];
  for (let d = 1; d <= 28; d += 0.5) {
    const s = getCycleState(d);
    e2Points.push({ x: getX(d), y: getYE2(s.e2) });
    lhPoints.push({ x: getX(d), y: getYLH(s.lh) });
  }

  const e2Path = e2Points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ');
  const lhPath = lhPoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ');

  return (
    <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '18px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
        <Calendar size={20} color="#db2777" />
        <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 800 }}>
          Dynamika Cyklu Menstruacyjnego, Sprzężenia Zwrotne i Diagnostyka Braku Miesiączki
        </h3>
      </div>
      <p style={{ fontSize: '12px', color: '#64748b', margin: '0 0 16px' }}>
        Cykl jajnikowy opiera się na sekwencji sprzężeń ujemnych oraz unikalnym zjawisku przełączenia w sprzężenie dodatnie. Przesuwaj suwak dnia cyklu, aby obserwować stężenia hormonów i dynamikę endometrium.
      </p>

      {/* SEKCJA 1: INTERAKTYWNY CYKL */}
      <div style={{ background: '#fdf2f8', border: '1px solid #fbcfe8', borderRadius: '10px', padding: '14px', marginBottom: '18px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <div style={{ fontSize: '13px', fontWeight: 700, color: '#9d174d' }}>
            Dzień cyklu: <strong>Dzień {cycleDay}</strong> (faza 28-dniowa)
          </div>
          <span style={{ fontSize: '11px', fontWeight: 600, color: cycleDay >= 12 && cycleDay <= 14 ? '#be185d' : '#831843' }}>
            {current.phase}
          </span>
        </div>

        <input
          type="range"
          min="1"
          max="28"
          step="1"
          value={cycleDay}
          onChange={e => setCycleDay(Number(e.target.value))}
          style={{ width: '100%', marginBottom: '12px' }}
        />

        {/* Wykres SVG E2 i LH */}
        <div style={{ background: '#fff', border: '1px solid #fbcfe8', borderRadius: '8px', padding: '8px', marginBottom: '12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', fontWeight: 600, marginBottom: '4px' }}>
            <span style={{ color: '#db2777' }}>— Estradiol E2 (pg/ml)</span>
            <span style={{ color: '#9333ea' }}>— Lutropina LH (mIU/ml)</span>
            <span style={{ color: '#64748b' }}>Kursor: Dzień {cycleDay}</span>
          </div>

          <svg viewBox={`0 0 ${svgW} ${svgH}`} style={{ width: '100%', height: 'auto', overflow: 'visible' }}>
            <line x1={pad.left} y1={svgH - pad.bottom} x2={svgW - pad.right} y2={svgH - pad.bottom} stroke="#e2e8f0" strokeWidth="1.5" />
            <path d={e2Path} fill="none" stroke="#db2777" strokeWidth="2.5" />
            <path d={lhPath} fill="none" stroke="#9333ea" strokeWidth="2" strokeDasharray={cycleDay >= 12 && cycleDay <= 14 ? undefined : '3,3'} />

            {/* Linia progu dodatniego sprzężenia E2 > 200 pg/ml */}
            <line x1={pad.left} y1={getYE2(200)} x2={svgW - pad.right} y2={getYE2(200)} stroke="#f43f5e" strokeWidth="1" strokeDasharray="4,4" />
            <text x={svgW - pad.right - 2} y={getYE2(200) - 3} fontSize="8" fill="#e11d48" textAnchor="end">Próg dodatniego sprzężenia (200 pg/ml)</text>

            {/* Wskaźnik bieżącego dnia */}
            <line x1={getX(cycleDay)} y1={pad.top} x2={getX(cycleDay)} y2={svgH - pad.bottom} stroke="#0f172a" strokeWidth="1.5" />
            <circle cx={getX(cycleDay)} cy={getYE2(current.e2)} r="4" fill="#db2777" />
            <circle cx={getX(cycleDay)} cy={getYLH(current.lh)} r="4" fill="#9333ea" />

            {/* Oznaczenia osi X */}
            <text x={getX(1)} y={svgH - 8} fontSize="9" textAnchor="middle" fill="#64748b">D1</text>
            <text x={getX(7)} y={svgH - 8} fontSize="9" textAnchor="middle" fill="#64748b">D7</text>
            <text x={getX(14)} y={svgH - 8} fontSize="9" textAnchor="middle" fill="#be185d" fontWeight="700">D14 (Owulacja)</text>
            <text x={getX(21)} y={svgH - 8} fontSize="9" textAnchor="middle" fill="#64748b">D21</text>
            <text x={getX(28)} y={svgH - 8} fontSize="9" textAnchor="middle" fill="#64748b">D28</text>
          </svg>
        </div>

        {/* Panel parametrów bieżącego dnia */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))', gap: '8px', textAlign: 'center', marginBottom: '10px' }}>
          <div style={{ background: '#fff', padding: '8px', borderRadius: '6px', border: '1px solid #fbcfe8' }}>
            <div style={{ fontSize: '10px', color: '#db2777', fontWeight: 600 }}>Estradiol (E2)</div>
            <div style={{ fontSize: '16px', fontWeight: 800, color: '#9d174d' }}>{current.e2} <span style={{ fontSize: '10px' }}>pg/ml</span></div>
          </div>
          <div style={{ background: '#fff', padding: '8px', borderRadius: '6px', border: '1px solid #fbcfe8' }}>
            <div style={{ fontSize: '10px', color: '#7c3aed', fontWeight: 600 }}>Progesteron (P4)</div>
            <div style={{ fontSize: '16px', fontWeight: 800, color: '#5b21b6' }}>{current.p4} <span style={{ fontSize: '10px' }}>ng/ml</span></div>
          </div>
          <div style={{ background: '#fff', padding: '8px', borderRadius: '6px', border: '1px solid #fbcfe8' }}>
            <div style={{ fontSize: '10px', color: '#9333ea', fontWeight: 600 }}>Lutropina (LH)</div>
            <div style={{ fontSize: '16px', fontWeight: 800, color: '#6b21a8' }}>{current.lh} <span style={{ fontSize: '10px' }}>mIU/ml</span></div>
          </div>
          <div style={{ background: '#fff', padding: '8px', borderRadius: '6px', border: '1px solid #fbcfe8' }}>
            <div style={{ fontSize: '10px', color: '#2563eb', fontWeight: 600 }}>Folitropina (FSH)</div>
            <div style={{ fontSize: '16px', fontWeight: 800, color: '#1d4ed8' }}>{current.fsh} <span style={{ fontSize: '10px' }}>mIU/ml</span></div>
          </div>
          <div style={{ background: '#fff', padding: '8px', borderRadius: '6px', border: '1px solid #fbcfe8' }}>
            <div style={{ fontSize: '10px', color: '#059669', fontWeight: 600 }}>Endometrium</div>
            <div style={{ fontSize: '16px', fontWeight: 800, color: '#047857' }}>{current.endometrium} <span style={{ fontSize: '10px' }}>mm</span></div>
          </div>
        </div>

        <div style={{ padding: '8px 10px', background: cycleDay >= 12 && cycleDay <= 14 ? '#ffe4e6' : '#fff', border: '1px solid', borderColor: cycleDay >= 12 && cycleDay <= 14 ? '#f43f5e' : '#fbcfe8', borderRadius: '6px', fontSize: '11px', color: '#831843' }}>
          <strong>Stan sprzężenia:</strong> {current.feedback}
        </div>
      </div>

      {/* SEKCJA 2: RÓŻNICOWANIE WTÓRNEGO BRAKU MIESIĄCZKI */}
      <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}>
          <HelpCircle size={18} color="#db2777" />
          <h4 style={{ margin: 0, fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>
            Diagnostyka różnicowa wtórnego braku miesiączki (FHA vs POI vs PCOS)
          </h4>
        </div>

        <div style={{ display: 'flex', gap: '8px', marginBottom: '12px', flexWrap: 'wrap' }}>
          <button
            type="button"
            className={diffCondition === 'pcos' ? 'primary' : 'secondary'}
            onClick={() => setDiffCondition('pcos')}
            style={{ fontSize: '11px', padding: '6px 10px' }}
          >
            PCOS (Wytyczne Rotterdam 2023)
          </button>
          <button
            type="button"
            className={diffCondition === 'fha' ? 'primary' : 'secondary'}
            onClick={() => setDiffCondition('fha')}
            style={{ fontSize: '11px', padding: '6px 10px' }}
          >
            FHA (Czynnościowy brak podwzgórzowy)
          </button>
          <button
            type="button"
            className={diffCondition === 'poi' ? 'primary' : 'secondary'}
            onClick={() => setDiffCondition('poi')}
            style={{ fontSize: '11px', padding: '6px 10px' }}
          >
            POI (Przedwczesna niewydolność jajników)
          </button>
        </div>

        <div style={{ padding: '12px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '11px', lineHeight: 1.5, color: '#1e293b' }}>
          {diffCondition === 'pcos' && (
            <div>
              <strong style={{ color: '#0f172a' }}>Zespół Policystycznych Jajników (PCOS wg konsensusu 2023):</strong>
              <ul style={{ margin: '4px 0 8px', paddingLeft: '18px' }}>
                <li><strong>Kryteria (≥2 z 3):</strong> 1) Zaburzenia owulacji (oligo/amenorrhea), 2) Hiperandrogenizm kliniczny (hirsutyzm, trądzik) lub biochemiczny (podwyższony wolny T), 3) Obraz PCOM w USG (≥20 pęcherzyków w jajniku o objętości ≥10 ml) LUB <strong>podwyższone AMH</strong> (jako biomarker PCOM u dorosłych).</li>
                <li><strong>Profil hormonalny:</strong> LH często podwyższone względem FSH (stosunek LH/FSH &gt;2), podwyższony testosteron/androstenedion, obniżone SHBG (związane z insulinoopornością), estradiol w normie (brak lutealnego P4).</li>
                <li><strong>Leczenie I rzutu w indukcji owulacji:</strong> <strong>Letrozol</strong> (inhibitor aromatazy; wyższa skuteczność i wskaźnik żywych urodzeń niż klomifen).</li>
              </ul>
            </div>
          )}

          {diffCondition === 'fha' && (
            <div>
              <strong style={{ color: '#0f172a' }}>Czynnościowy brak miesiączki pochodzenia podwzgórzowego (FHA):</strong>
              <ul style={{ margin: '4px 0 8px', paddingLeft: '18px' }}>
                <li><strong>Etiologia:</strong> Deficyt dostępności energii (zespół RED-S, niska masa ciała, zaburzenia odżywiania), intensywny wysiłek fizyczny, przewlekły stres psychiczny.</li>
                <li><strong>Profil hormonalny:</strong> Zaburzenie pulsacyjnego wydzielania GnRH $\to$ niskie lub nieadekwatnie prawidłowe LH i FSH (LH często &lt;2 mIU/ml), skrajnie niski estradiol (hipoestrogenizm, cienkie endometrium), ujemna próba progestagenowa.</li>
                <li><strong>Zagrożenia i postępowanie:</strong> Przyspieszona osteoporoza i złamania niskoenergetyczne. Podstawą leczenia jest wyrównanie bilansu energetycznego i psychoterapia; doustna antykoncepcja (COCP) NIE przywraca gęstości kości!</li>
              </ul>
            </div>
          )}

          {diffCondition === 'poi' && (
            <div>
              <strong style={{ color: '#0f172a' }}>Przedwczesna niewydolność jajników (POI wg ESHRE):</strong>
              <ul style={{ margin: '4px 0 8px', paddingLeft: '18px' }}>
                <li><strong>Kryteria rozpoznania:</strong> Wiek &lt;40 lat, wtórny brak miesiączki przez co najmniej 4 miesiące ORAZ <strong>FSH &gt;25 IU/l</strong> w dwóch oznaczeniach w odstępie co najmniej 4–6 tygodni.</li>
                <li><strong>Profil hormonalny:</strong> Hipergonadotropowy hipogonadyzm (wysokie FSH &gt;25–40 IU/l, wysokie LH), niski estradiol (&lt;20–30 pg/ml), niewykrywalne lub skrajnie niskie stężenie AMH (&lt;0,1–0,2 ng/ml).</li>
                <li><strong>Postępowanie:</strong> Hormonalna terapia zastępcza (MHT) jest bezwzględnie wskazana aż do średniego wieku naturalnej menopauzy (~51 lat) w celu ochrony układu krążenia, kości i funkcji poznawczych.</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
