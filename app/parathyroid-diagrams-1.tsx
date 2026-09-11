'use client';

// 1. Oś regulacyjna Ca-P-PTH-Kalcytriol-FGF23
export function CalciumPhosphateAxisDiagram() {
  return (
    <div className="diagram-container" style={{ margin: '20px 0' }}>
      <svg viewBox="0 0 680 340" style={{ width: '100%', height: 'auto', background: '#f8faf9', borderRadius: '12px' }}>
        <text x="340" y="26" textAnchor="middle" fill="#1b4d3e" fontSize="16" fontWeight="bold">
          Zintegrowana oś homeostazy wapniowo-fosforanowej (Ca–P–PTH–Kalcytriol–FGF23)
        </text>

        {/* Przytarczyce */}
        <rect x="250" y="48" width="180" height="52" rx="8" fill="#ecfdf5" stroke="#059669" strokeWidth="2" />
        <text x="340" y="70" textAnchor="middle" fill="#065f46" fontSize="13" fontWeight="bold">
          PRZYTARCZYCE (Sensor CaSR)
        </text>
        <text x="340" y="88" textAnchor="middle" fill="#047857" fontSize="10">
          Spadek Ca2+ ➔ wyrzut PTH
        </text>

        {/* Nerka */}
        <rect x="50" y="150" width="170" height="85" rx="8" fill="#eff6ff" stroke="#3b82f6" strokeWidth="2" />
        <text x="135" y="172" textAnchor="middle" fill="#1e40af" fontSize="13" fontWeight="bold">
          NERKA (Cewki)
        </text>
        <text x="135" y="190" textAnchor="middle" fill="#1d4ed8" fontSize="10">
          ↑ Reabsorpcja Ca w TAL/DCT
        </text>
        <text x="135" y="206" textAnchor="middle" fill="#dc2626" fontSize="10" fontWeight="bold">
          ↓ Wchłanianie P (Fosfaturia!)
        </text>
        <text x="135" y="222" textAnchor="middle" fill="#1d4ed8" fontSize="10">
          ↑ 1alfa-hydroksylaza (CYP27B1)
        </text>

        {/* Kość */}
        <rect x="460" y="150" width="170" height="85" rx="8" fill="#fef2f2" stroke="#ef4444" strokeWidth="2" />
        <text x="545" y="172" textAnchor="middle" fill="#991b1b" fontSize="13" fontWeight="bold">
          KOŚĆ (Osteoblasty / Osteoklasty)
        </text>
        <text x="545" y="190" textAnchor="middle" fill="#b91c1c" fontSize="10">
          RANKL ➔ aktywacja osteoklastów
        </text>
        <text x="545" y="206" textAnchor="middle" fill="#b91c1c" fontSize="10">
          Resorpcja: uwalnianie Ca2+ i P
        </text>
        <text x="545" y="222" textAnchor="middle" fill="#7f1d1d" fontSize="10">
          Wydzielanie FGF23 (osteocyty)
        </text>

        {/* Jelito */}
        <rect x="255" y="245" width="170" height="60" rx="8" fill="#fffbeb" stroke="#f59e0b" strokeWidth="2" />
        <text x="340" y="268" textAnchor="middle" fill="#92400e" fontSize="13" fontWeight="bold">
          JELITO CIENKIE
        </text>
        <text x="340" y="286" textAnchor="middle" fill="#b45309" fontSize="10">
          Aktywny kalcytriol (1,25(OH)2D)
        </text>
        <text x="340" y="300" textAnchor="middle" fill="#b45309" fontSize="10">
          ↑ Wchłanianie Ca2+ i fosforanów
        </text>

        {/* Strzałki */}
        <line x1="280" y1="100" x2="160" y2="150" stroke="#059669" strokeWidth="2" strokeDasharray="4 3" />
        <text x="200" y="125" fill="#047857" fontSize="10" fontWeight="bold">
          PTH (+)
        </text>

        <line x1="400" y1="100" x2="520" y2="150" stroke="#059669" strokeWidth="2" strokeDasharray="4 3" />
        <text x="475" y="125" fill="#047857" fontSize="10" fontWeight="bold">
          PTH (+)
        </text>

        <line x1="135" y1="235" x2="255" y2="275" stroke="#3b82f6" strokeWidth="2" />
        <text x="175" y="265" fill="#1d4ed8" fontSize="10" fontWeight="bold">
          1,25(OH)2D
        </text>

        {/* Sprzężenie zwrotne CaSR */}
        <path d="M 340 245 L 340 100" stroke="#059669" strokeWidth="2" />
        <text x="348" y="130" fill="#047857" fontSize="10" fontWeight="bold">
          Ca2+ hamuje CaSR (-)
        </text>
      </svg>
    </div>
  );
}

// 2. Frakcje wapnia w osoczu i wzór Payne'a
export function AlbuminCalciumCorrectionDiagram() {
  return (
    <div className="diagram-container" style={{ margin: '20px 0' }}>
      <svg viewBox="0 0 680 270" style={{ width: '100%', height: 'auto', background: '#fbfcfc', borderRadius: '12px' }}>
        <text x="340" y="25" textAnchor="middle" fill="#1f2937" fontSize="15" fontWeight="bold">
          Frakcje wapnia w osoczu i algorytm korekty o stężenie albuminy
        </text>

        {/* Trzy frakcje */}
        <rect x="50" y="55" width="180" height="85" rx="8" fill="#dbeafe" stroke="#3b82f6" strokeWidth="2" />
        <text x="140" y="80" textAnchor="middle" fill="#1e40af" fontSize="13" fontWeight="bold">
          Wapń zjonizowany (Ca2+)
        </text>
        <text x="140" y="100" textAnchor="middle" fill="#1e3a8a" fontSize="18" fontWeight="bold">
          ~50%
        </text>
        <text x="140" y="122" textAnchor="middle" fill="#1d4ed8" fontSize="10">
          Frakcja aktywna biologicznie
        </text>

        <rect x="250" y="55" width="180" height="85" rx="8" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" />
        <text x="340" y="80" textAnchor="middle" fill="#92400e" fontSize="13" fontWeight="bold">
          Związany z albuminą
        </text>
        <text x="340" y="100" textAnchor="middle" fill="#78350f" fontSize="18" fontWeight="bold">
          ~40%
        </text>
        <text x="340" y="122" textAnchor="middle" fill="#b45309" fontSize="10">
          Zależny od pH i stężenia białka
        </text>

        <rect x="450" y="55" width="180" height="85" rx="8" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="2" />
        <text x="540" y="80" textAnchor="middle" fill="#334155" fontSize="13" fontWeight="bold">
          Kompleksy anionowe
        </text>
        <text x="540" y="100" textAnchor="middle" fill="#1e293b" fontSize="18" fontWeight="bold">
          ~10%
        </text>
        <text x="540" y="122" textAnchor="middle" fill="#475569" fontSize="10">
          Cytryniany, fosforany, HCO3-
        </text>

        {/* Ramka wzoru Payne'a */}
        <rect x="50" y="160" width="580" height="85" rx="8" fill="#ecfdf5" stroke="#10b981" strokeWidth="2" />
        <text x="340" y="185" textAnchor="middle" fill="#065f46" fontSize="13" fontWeight="bold">
          Wzór Payne’a w stanach hipoalbuminemii (&lt; 4,0 g/dl):
        </text>
        <text x="340" y="210" textAnchor="middle" fill="#047857" fontSize="14" fontWeight="bold">
          Ca_skorygowany (mg/dl) = Ca_zmierzony (mg/dl) + 0,8 * [ 4,0 - Albumina (g/dl) ]
        </text>
        <text x="340" y="232" textAnchor="middle" fill="#065f46" fontSize="11">
          Chroni przed fałszywym rozpoznaniem hipokalcemii u chorych z marskością wątroby lub zespołem nerczycowym!
        </text>
      </svg>
    </div>
  );
}

// 3. Algorytm CCCR: PHPT vs FHH
export function PhptVsFhhAlgorithmDiagram() {
  return (
    <div className="diagram-container" style={{ margin: '20px 0' }}>
      <svg viewBox="0 0 680 320" style={{ width: '100%', height: 'auto', background: '#f8faf9', borderRadius: '12px' }}>
        <text x="340" y="25" textAnchor="middle" fill="#1b4d3e" fontSize="15" fontWeight="bold">
          Algorytm różnicowania hiperkalcemii z nieobniżonym PTH (PHPT vs FHH)
        </text>

        {/* Wierzchołek */}
        <rect x="200" y="48" width="280" height="42" rx="6" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" />
        <text x="340" y="74" textAnchor="middle" fill="#92400e" fontSize="12" fontWeight="bold">
          Hiperkalcemia + PTH w normie lub podwyższone
        </text>

        <line x1="340" y1="90" x2="340" y2="120" stroke="#059669" strokeWidth="2" />

        {/* Obliczenie CCCR */}
        <rect x="180" y="120" width="320" height="38" rx="6" fill="#ecfdf5" stroke="#059669" strokeWidth="2" />
        <text x="340" y="144" textAnchor="middle" fill="#065f46" fontSize="12" fontWeight="bold">
          Wylicz wskaźnik CCCR (FeCa) w dobowej zbiórce moczu
        </text>

        {/* Rozgałęzienie */}
        <line x1="250" y1="158" x2="120" y2="195" stroke="#dc2626" strokeWidth="2" />
        <line x1="430" y1="158" x2="560" y2="195" stroke="#16a34a" strokeWidth="2" />
        <line x1="340" y1="158" x2="340" y2="195" stroke="#d97706" strokeWidth="2" />

        {/* FHH */}
        <rect x="20" y="195" width="200" height="105" rx="8" fill="#fef2f2" stroke="#ef4444" strokeWidth="2" />
        <text x="120" y="220" textAnchor="middle" fill="#991b1b" fontSize="13" fontWeight="bold">
          CCCR &lt; 0,01
        </text>
        <text x="120" y="240" textAnchor="middle" fill="#b91c1c" fontSize="11" fontWeight="bold">
          Podejrzenie FHH
        </text>
        <text x="120" y="260" textAnchor="middle" fill="#7f1d1d" fontSize="9">
          Wywiad rodzinny + gen CASR
        </text>
        <text x="120" y="282" textAnchor="middle" fill="#dc2626" fontSize="10" fontWeight="bold">
          ZAKAZ PARATYREOIDKTOMII!
        </text>

        {/* Szara strefa */}
        <rect x="240" y="195" width="200" height="105" rx="8" fill="#fffbeb" stroke="#f59e0b" strokeWidth="2" />
        <text x="340" y="220" textAnchor="middle" fill="#92400e" fontSize="13" fontWeight="bold">
          CCCR: 0,01 – 0,02
        </text>
        <text x="340" y="240" textAnchor="middle" fill="#b45309" fontSize="11" fontWeight="bold">
          Strefa niejednoznaczna
        </text>
        <text x="340" y="260" textAnchor="middle" fill="#78350f" fontSize="9">
          Wyrównaj witaminę D (&gt;30 ng/ml)
        </text>
        <text x="340" y="280" textAnchor="middle" fill="#92400e" fontSize="9">
          Powtórz DZM lub test CASR
        </text>

        {/* PHPT */}
        <rect x="460" y="195" width="200" height="105" rx="8" fill="#f0fdf4" stroke="#16a34a" strokeWidth="2" />
        <text x="560" y="220" textAnchor="middle" fill="#166534" fontSize="13" fontWeight="bold">
          CCCR &gt; 0,02
        </text>
        <text x="560" y="240" textAnchor="middle" fill="#15803d" fontSize="11" fontWeight="bold">
          Rozpoznanie PHPT
        </text>
        <text x="560" y="260" textAnchor="middle" fill="#14532d" fontSize="9">
          Kwalifikacja do operacji (ESE)
        </text>
        <text x="560" y="282" textAnchor="middle" fill="#16a34a" fontSize="10" fontWeight="bold">
          Lokalizacja: USG + MIBI (MIP)
        </text>
      </svg>
    </div>
  );
}

// 4. Progresja PChN: od wtórnej do trzeciorzędowej HPT
export function SecondaryTertiaryHptDiagram() {
  return (
    <div className="diagram-container" style={{ margin: '20px 0' }}>
      <svg viewBox="0 0 680 290" style={{ width: '100%', height: 'auto', background: '#fbfcfc', borderRadius: '12px' }}>
        <text x="340" y="26" textAnchor="middle" fill="#1e293b" fontSize="15" fontWeight="bold">
          Ewolucja zaburzeń przytarczyc w PChN: od wtórnej (SHPT) do trzeciorzędowej (THPT)
        </text>

        {/* Panel Lewy: SHPT */}
        <rect x="40" y="55" width="280" height="210" rx="10" fill="#eff6ff" stroke="#3b82f6" strokeWidth="2" />
        <text x="180" y="80" textAnchor="middle" fill="#1e40af" fontSize="13" fontWeight="bold">
          WTÓRNA (SHPT) — Reaktywna
        </text>
        <text x="180" y="105" textAnchor="middle" fill="#1d4ed8" fontSize="11">
          Spadek eGFR ➔ Retencja fosforanów (↑ P)
        </text>
        <text x="180" y="125" textAnchor="middle" fill="#1d4ed8" fontSize="11">
          Niedobór kalcytriolu ➔ Spadek wapnia (↓ Ca)
        </text>
        <text x="180" y="150" textAnchor="middle" fill="#2563eb" fontSize="11" fontWeight="bold">
          Odpowiedź: Rozlana hiperplazja przytarczyc
        </text>
        <rect x="60" y="170" width="240" height="30" rx="5" fill="#ffffff" stroke="#93c5fd" />
        <text x="180" y="190" textAnchor="middle" fill="#1e40af" fontSize="11" fontWeight="bold">
          Wapń ↓ lub norma · Fosfor ↑ · PTH ↑↑
        </text>
        <text x="180" y="235" textAnchor="middle" fill="#1e3a8a" fontSize="10">
          Leczenie: Leki wiążące P + parikalcytol + cinakalcet
        </text>

        {/* Strzałka transformacji */}
        <line x1="330" y1="160" x2="355" y2="160" stroke="#f59e0b" strokeWidth="3" />
        <text x="345" y="145" textAnchor="middle" fill="#d97706" fontSize="9" fontWeight="bold">
          Lata dializ
        </text>

        {/* Panel Prawy: THPT */}
        <rect x="360" y="55" width="280" height="210" rx="10" fill="#fef2f2" stroke="#ef4444" strokeWidth="2" />
        <text x="500" y="80" textAnchor="middle" fill="#991b1b" fontSize="13" fontWeight="bold">
          TRZECIORZĘDOWA (THPT) — Autonomiczna
        </text>
        <text x="500" y="105" textAnchor="middle" fill="#b91c1c" fontSize="11">
          Monoklonalny rozrost guzkowy gruczołów
        </text>
        <text x="500" y="125" textAnchor="middle" fill="#b91c1c" fontSize="11">
          Masywna utrata receptorów CaSR i VDR
        </text>
        <text x="500" y="150" textAnchor="middle" fill="#dc2626" fontSize="11" fontWeight="bold">
          Brak ujemnego sprzężenia ➔ Autonomia!
        </text>
        <rect x="380" y="170" width="240" height="30" rx="5" fill="#ffffff" stroke="#fca5a5" />
        <text x="500" y="190" textAnchor="middle" fill="#991b1b" fontSize="11" fontWeight="bold">
          Wapń ↑ (Hiperkalcemia!) · PTH &gt; 1000 pg/ml
        </text>
        <text x="500" y="235" textAnchor="middle" fill="#7f1d1d" fontSize="10">
          Leczenie: Subtotalna paratyreoidktomia
        </text>
      </svg>
    </div>
  );
}
