'use client';

// 5. Objawy tężyczki i EKG
export function HypocalcemiaSignsEkgDiagram() {
  return (
    <div className="diagram-container" style={{ margin: '20px 0' }}>
      <svg viewBox="0 0 680 300" style={{ width: '100%', height: 'auto', background: '#f8faf9', borderRadius: '12px' }}>
        <text x="340" y="25" textAnchor="middle" fill="#1b4d3e" fontSize="15" fontWeight="bold">
          Kliniczne manifestacje tężyczki i zmiany elektrofizjologiczne w EKG
        </text>

        {/* Objaw Trousseau */}
        <rect x="40" y="50" width="180" height="150" rx="8" fill="#eff6ff" stroke="#3b82f6" strokeWidth="2" />
        <text x="130" y="75" textAnchor="middle" fill="#1e40af" fontSize="12" fontWeight="bold">
          Objaw Trousseau
        </text>
        <text x="130" y="95" textAnchor="middle" fill="#1d4ed8" fontSize="10">
          Mankiet RR &gt; skurczowe
        </text>
        <circle cx="130" cy="130" r="22" fill="#dbeafe" stroke="#2563eb" />
        <text x="130" y="135" textAnchor="middle" fill="#1e40af" fontSize="10" fontWeight="bold">
          3 minuty
        </text>
        <text x="130" y="175" textAnchor="middle" fill="#1e3a8a" fontSize="11" fontWeight="bold">
          „Ręka położnika”
        </text>
        <text x="130" y="190" textAnchor="middle" fill="#1d4ed8" fontSize="9">
          Wysoce swoisty (&gt;95%)
        </text>

        {/* Objaw Chvostka */}
        <rect x="250" y="50" width="180" height="150" rx="8" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" />
        <text x="340" y="75" textAnchor="middle" fill="#92400e" fontSize="12" fontWeight="bold">
          Objaw Chvostka
        </text>
        <text x="340" y="95" textAnchor="middle" fill="#b45309" fontSize="10">
          Uderzenie w n. twarzowy
        </text>
        <circle cx="340" cy="130" r="22" fill="#fef3c7" stroke="#d97706" />
        <text x="340" y="135" textAnchor="middle" fill="#78350f" fontSize="10" fontWeight="bold">
          VII nerw
        </text>
        <text x="340" y="175" textAnchor="middle" fill="#78350f" fontSize="11" fontWeight="bold">
          Skurcz kącika ust
        </text>
        <text x="340" y="190" textAnchor="middle" fill="#b45309" fontSize="9">
          Czuły, lecz mniej swoisty
        </text>

        {/* Zapis EKG */}
        <rect x="460" y="50" width="180" height="150" rx="8" fill="#fef2f2" stroke="#ef4444" strokeWidth="2" />
        <text x="550" y="75" textAnchor="middle" fill="#991b1b" fontSize="12" fontWeight="bold">
          Zapis EKG
        </text>
        <text x="550" y="95" textAnchor="middle" fill="#b91c1c" fontSize="10">
          Wydłużenie plateau Ca2+
        </text>
        {/* Prosty wykres EKG QTc */}
        <path d="M 480 135 L 500 135 L 505 115 L 515 150 L 520 135 L 585 135 L 595 125 L 610 135" stroke="#dc2626" strokeWidth="2" fill="none" />
        <text x="550" y="175" textAnchor="middle" fill="#7f1d1d" fontSize="11" fontWeight="bold">
          Wydłużenie ST i QTc
        </text>
        <text x="550" y="190" textAnchor="middle" fill="#991b1b" fontSize="9">
          Ryzyko torsade de pointes!
        </text>

        {/* Pasek podsumowujący */}
        <rect x="40" y="220" width="600" height="60" rx="6" fill="#f1f5f9" stroke="#cbd5e1" />
        <text x="340" y="242" textAnchor="middle" fill="#1e293b" fontSize="11" fontWeight="bold">
          UWAGA: Hipomagnezemia (&lt; 0,5 mmol/l) blokuje wydzielanie PTH i wywołuje oporność na wapń.
        </text>
        <text x="340" y="262" textAnchor="middle" fill="#0f766e" fontSize="11" fontWeight="bold">
          Zawsze najpierw uzupełnij magnez (MgSO4 i.v.), zanim podasz wlewy wapnia!
        </text>
      </svg>
    </div>
  );
}

// 6. Protokół przełomu hiperkalcemicznego
export function HypercalcemicCrisisProtocolDiagram() {
  return (
    <div className="diagram-container" style={{ margin: '20px 0' }}>
      <svg viewBox="0 0 680 300" style={{ width: '100%', height: 'auto', background: '#fbfcfc', borderRadius: '12px' }}>
        <text x="340" y="26" textAnchor="middle" fill="#991b1b" fontSize="15" fontWeight="bold">
          Protokół postępowania w przełomie hiperkalcemicznym (Wapń &gt; 14 mg/dl / &gt; 3,5 mmol/l)
        </text>

        {/* Etap 1 */}
        <rect x="40" y="55" width="180" height="150" rx="8" fill="#dbeafe" stroke="#2563eb" strokeWidth="2" />
        <text x="130" y="80" textAnchor="middle" fill="#1e40af" fontSize="12" fontWeight="bold">
          KROK 1: Rehydratacja
        </text>
        <text x="130" y="105" textAnchor="middle" fill="#1d4ed8" fontSize="11" fontWeight="bold">
          0,9% NaCl i.v.
        </text>
        <text x="130" y="125" textAnchor="middle" fill="#1e3a8a" fontSize="10">
          2000–4000 ml / 24h
        </text>
        <text x="130" y="145" textAnchor="middle" fill="#1e3a8a" fontSize="10">
          Wymusza kalciurię sodową
        </text>
        <rect x="50" y="165" width="160" height="26" rx="4" fill="#fee2e2" stroke="#ef4444" />
        <text x="130" y="182" textAnchor="middle" fill="#991b1b" fontSize="9" fontWeight="bold">
          Furosemid TYLKO po nawodnieniu!
        </text>

        {/* Etap 2 */}
        <rect x="250" y="55" width="180" height="150" rx="8" fill="#fef3c7" stroke="#d97706" strokeWidth="2" />
        <text x="340" y="80" textAnchor="middle" fill="#92400e" fontSize="12" fontWeight="bold">
          KROK 2: Pomost
        </text>
        <text x="340" y="105" textAnchor="middle" fill="#b45309" fontSize="11" fontWeight="bold">
          Kalcytonina s.c./i.m.
        </text>
        <text x="340" y="125" textAnchor="middle" fill="#78350f" fontSize="10">
          4–8 j.m./kg co 6–12h
        </text>
        <text x="340" y="145" textAnchor="middle" fill="#78350f" fontSize="10">
          Działa po 2–4 godzinach
        </text>
        <rect x="260" y="165" width="160" height="26" rx="4" fill="#fef3c7" stroke="#f59e0b" />
        <text x="340" y="182" textAnchor="middle" fill="#92400e" fontSize="9">
          Tachyfilaksja po 48h!
        </text>

        {/* Etap 3 */}
        <rect x="460" y="55" width="180" height="150" rx="8" fill="#ecfdf5" stroke="#059669" strokeWidth="2" />
        <text x="550" y="80" textAnchor="middle" fill="#065f46" fontSize="12" fontWeight="bold">
          KROK 3: Antyresorpcja
        </text>
        <text x="550" y="105" textAnchor="middle" fill="#047857" fontSize="11" fontWeight="bold">
          Kwas zoledronowy 4 mg
        </text>
        <text x="550" y="125" textAnchor="middle" fill="#065f46" fontSize="10">
          Wlew i.v. w 15–30 minut
        </text>
        <text x="550" y="145" textAnchor="middle" fill="#065f46" fontSize="10">
          Działa silnie po 48–72h
        </text>
        <rect x="470" y="165" width="160" height="26" rx="4" fill="#f0fdf4" stroke="#10b981" />
        <text x="550" y="182" textAnchor="middle" fill="#047857" fontSize="9">
          Efekt trwa 2–4 tygodnie
        </text>

        {/* Stopka */}
        <rect x="40" y="220" width="600" height="55" rx="6" fill="#f1f5f9" stroke="#cbd5e1" />
        <text x="340" y="242" textAnchor="middle" fill="#334155" fontSize="10" fontWeight="bold">
          Niewydolność nerek (eGFR &lt; 30): Zoledronian przeciwwskazany ➔ podaj Denosumab (120 mg s.c.).
        </text>
        <text x="340" y="260" textAnchor="middle" fill="#dc2626" fontSize="10" fontWeight="bold">
          Przełom z bezmoczem lub obrzękiem płuc ➔ Natychmiastowa hemodializa z płynem bezwapniowym!
        </text>
      </svg>
    </div>
  );
}

// 7. Zespół głodnych kości (Hungry Bone Syndrome)
export function HungryBoneSyndromeDiagram() {
  return (
    <div className="diagram-container" style={{ margin: '20px 0' }}>
      <svg viewBox="0 0 680 280" style={{ width: '100%', height: 'auto', background: '#f8faf9', borderRadius: '12px' }}>
        <text x="340" y="25" textAnchor="middle" fill="#1b4d3e" fontSize="15" fontWeight="bold">
          Patogeneza zespołu głodnych kości (Hungry Bone Syndrome — HBS)
        </text>

        <rect x="50" y="50" width="180" height="90" rx="8" fill="#fef2f2" stroke="#ef4444" strokeWidth="2" />
        <text x="140" y="75" textAnchor="middle" fill="#991b1b" fontSize="12" fontWeight="bold">
          Przed operacją
        </text>
        <text x="140" y="95" textAnchor="middle" fill="#b91c1c" fontSize="10">
          PTH &gt;&gt; 500 pg/ml
        </text>
        <text x="140" y="110" textAnchor="middle" fill="#b91c1c" fontSize="10">
          Masywna osteoliza
        </text>
        <text x="140" y="125" textAnchor="middle" fill="#7f1d1d" fontSize="10" fontWeight="bold">
          ALP &gt; 500–1000 IU/l (ryzyko!)
        </text>

        <line x1="240" y1="95" x2="270" y2="95" stroke="#d97706" strokeWidth="3" />

        <rect x="280" y="50" width="180" height="90" rx="8" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" />
        <text x="370" y="75" textAnchor="middle" fill="#92400e" fontSize="12" fontWeight="bold">
          Paratyreoidktomia
        </text>
        <text x="370" y="95" textAnchor="middle" fill="#b45309" fontSize="10">
          PTH spada w 10 minut!
        </text>
        <text x="370" y="110" textAnchor="middle" fill="#78350f" fontSize="10">
          Koniec kościogubienia
        </text>
        <text x="370" y="125" textAnchor="middle" fill="#92400e" fontSize="10" fontWeight="bold">
          Osteoblasty nadal aktywne
        </text>

        <line x1="470" y1="95" x2="500" y2="95" stroke="#059669" strokeWidth="3" />

        <rect x="510" y="50" width="140" height="90" rx="8" fill="#ecfdf5" stroke="#059669" strokeWidth="2" />
        <text x="580" y="75" textAnchor="middle" fill="#065f46" fontSize="12" fontWeight="bold">
          „Głód minerałów”
        </text>
        <text x="580" y="95" textAnchor="middle" fill="#047857" fontSize="10">
          Masowy wychwyt:
        </text>
        <text x="580" y="112" textAnchor="middle" fill="#047857" fontSize="10" fontWeight="bold">
          Wapń ↓↓ (&lt;6 mg/dl)
        </text>
        <text x="580" y="128" textAnchor="middle" fill="#065f46" fontSize="10">
          Fosfor ↓↓ i Magnez ↓↓
        </text>

        {/* Panel różnicujący HBS od hipoparatyreozy */}
        <rect x="50" y="165" width="600" height="95" rx="8" fill="#ffffff" stroke="#cbd5e1" strokeWidth="2" />
        <text x="350" y="190" textAnchor="middle" fill="#1e293b" fontSize="12" fontWeight="bold">
          Różnicowanie HBS z trwałą pooperacyjną niedoczynnością przytarczyc:
        </text>
        <text x="200" y="215" textAnchor="middle" fill="#059669" fontSize="11" fontWeight="bold">
          Zespół głodnych kości (HBS):
        </text>
        <text x="200" y="235" textAnchor="middle" fill="#047857" fontSize="10">
          Wapń ↓↓ ORAZ Fosforany ↓↓ (hipofosfatemia)
        </text>
        <text x="490" y="215" textAnchor="middle" fill="#dc2626" fontSize="11" fontWeight="bold">
          Niedoczynność przytarczyc:
        </text>
        <text x="490" y="235" textAnchor="middle" fill="#b91c1c" fontSize="10">
          Wapń ↓↓ ALE Fosforany ↑↑ (brak fosfaturii nerkowej!)
        </text>
      </svg>
    </div>
  );
}

// 8. Osteoporoza, krzywa T-score i opcje terapeutyczne
export function OsteoporosisTScoreBmdDiagram() {
  return (
    <div className="diagram-container" style={{ margin: '20px 0' }}>
      <svg viewBox="0 0 680 290" style={{ width: '100%', height: 'auto', background: '#fbfcfc', borderRadius: '12px' }}>
        <text x="340" y="25" textAnchor="middle" fill="#1e293b" fontSize="15" fontWeight="bold">
          Kryteria densytometryczne DXA (WHO) i podział farmakoterapii osteoporozy
        </text>

        {/* Pasek T-score */}
        <rect x="60" y="55" width="180" height="40" rx="4" fill="#dcfce7" stroke="#16a34a" />
        <text x="150" y="80" textAnchor="middle" fill="#15803d" fontSize="11" fontWeight="bold">
          NORMA: T-score &gt;= -1,0 SD
        </text>

        <rect x="250" y="55" width="180" height="40" rx="4" fill="#fef3c7" stroke="#f59e0b" />
        <text x="340" y="80" textAnchor="middle" fill="#b45309" fontSize="11" fontWeight="bold">
          OSTEOPENIA: -1,1 do -2,4 SD
        </text>

        <rect x="440" y="55" width="180" height="40" rx="4" fill="#fee2e2" stroke="#ef4444" />
        <text x="530" y="80" textAnchor="middle" fill="#b91c1c" fontSize="11" fontWeight="bold">
          OSTEOPOROZA: &lt;= -2,5 SD
        </text>

        {/* Dwie strategie leczenia */}
        <rect x="60" y="120" width="275" height="145" rx="8" fill="#eff6ff" stroke="#3b82f6" strokeWidth="2" />
        <text x="197" y="145" textAnchor="middle" fill="#1e40af" fontSize="13" fontWeight="bold">
          LEKI ANTYRESORPCYJNE
        </text>
        <text x="197" y="165" textAnchor="middle" fill="#1d4ed8" fontSize="10">
          Hamują niszczenie kości przez osteoklasty
        </text>
        <text x="197" y="190" textAnchor="middle" fill="#1e3a8a" fontSize="11" fontWeight="bold">
          1. Bisfosfoniany doustne (Alendronian 70 mg/tydz.)
        </text>
        <text x="197" y="210" textAnchor="middle" fill="#1e3a8a" fontSize="11" fontWeight="bold">
          2. Kwas zoledronowy (5 mg i.v. 1x w roku)
        </text>
        <text x="197" y="230" textAnchor="middle" fill="#1e3a8a" fontSize="11" fontWeight="bold">
          3. Denosumab (anty-RANKL 60 mg s.c. co 6 mies.)
        </text>
        <text x="197" y="250" textAnchor="middle" fill="#2563eb" fontSize="9">
          Uwaga: Nagłe odstawienie denosumabu grozi złamaniami!
        </text>

        <rect x="345" y="120" width="275" height="145" rx="8" fill="#ecfdf5" stroke="#10b981" strokeWidth="2" />
        <text x="482" y="145" textAnchor="middle" fill="#065f46" fontSize="13" fontWeight="bold">
          LEKI ANABOLICZNE (Kościotwórcze)
        </text>
        <text x="482" y="165" textAnchor="middle" fill="#047857" fontSize="10">
          Pobudzają osteoblasty do budowy nowej kości
        </text>
        <text x="482" y="190" textAnchor="middle" fill="#064e3b" fontSize="11" fontWeight="bold">
          1. Teryparatyd (rhPTH 1-34, 20 µg/d s.c.)
        </text>
        <text x="482" y="210" textAnchor="middle" fill="#064e3b" fontSize="11" fontWeight="bold">
          2. Romosozumab (przeciwciało anty-sklerostynie)
        </text>
        <text x="482" y="235" textAnchor="middle" fill="#047857" fontSize="10">
          Wskazane w bardzo wysokim ryzyku złamań
        </text>
        <text x="482" y="250" textAnchor="middle" fill="#059669" fontSize="9">
          Maksymalny czas terapii teryparatydem: 24 miesiące
        </text>
      </svg>
    </div>
  );
}
