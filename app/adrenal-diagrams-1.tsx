'use client';

// 1. Anatomia unaczynienia nadnerczy i asymetria żylna
export function AdrenalAnatomyVascularDiagram() {
  return (
    <div className="diagram-container" style={{ margin: '20px 0' }}>
      <svg viewBox="0 0 680 340" style={{ width: '100%', height: 'auto', background: '#f8faf9', borderRadius: '12px' }}>
        <text x="340" y="28" textAnchor="middle" fill="#1b4d3e" fontSize="16" fontWeight="bold">
          Anatomia unaczynienia nadnerczy: Asymetria spływu żylnego
        </text>

        {/* VCI (Żyła główna dolna) po prawej stronie pacjenta (lewej na rycinie) */}
        <path d="M 270 50 L 270 310" stroke="#3b82f6" strokeWidth="24" strokeLinecap="round" opacity="0.85" />
        <text x="270" y="325" textAnchor="middle" fill="#1e40af" fontSize="11" fontWeight="bold">
          Żyła główna dolna (VCI)
        </text>

        {/* Aorta brzuszna */}
        <path d="M 370 50 L 370 310" stroke="#ef4444" strokeWidth="20" strokeLinecap="round" opacity="0.85" />
        <text x="370" y="325" textAnchor="middle" fill="#991b1b" fontSize="11" fontWeight="bold">
          Aorta brzuszna
        </text>

        {/* Prawe nadnercze (piramidalne) */}
        <polygon points="130,120 175,70 210,120" fill="#f59e0b" stroke="#d97706" strokeWidth="2" opacity="0.9" />
        <text x="170" y="105" textAnchor="middle" fill="#78350f" fontSize="12" fontWeight="bold">
          Prawe nadnercze
        </text>

        {/* Lewe nadnercze (półksiężycowate) */}
        <path d="M 470,80 Q 520,85 540,125 Q 510,140 465,115 Z" fill="#f59e0b" stroke="#d97706" strokeWidth="2" opacity="0.9" />
        <text x="495" y="110" textAnchor="middle" fill="#78350f" fontSize="12" fontWeight="bold">
          Lewe nadnercze
        </text>

        {/* Prawa żyła nadnerczowa (bardzo krótka, wprost do VCI) */}
        <line x1="205" y1="110" x2="258" y2="115" stroke="#2563eb" strokeWidth="6" strokeLinecap="round" />
        <polygon points="255,110 266,115 255,120" fill="#2563eb" />
        <rect x="70" y="145" width="170" height="42" rx="6" fill="#eff6ff" stroke="#93c5fd" strokeWidth="1" />
        <text x="155" y="162" textAnchor="middle" fill="#1e3a8a" fontSize="10" fontWeight="bold">
          Prawa żyła nadnerczowa
        </text>
        <text x="155" y="177" textAnchor="middle" fill="#2563eb" fontSize="9">
          BARDZO KRÓTKA (do VCI!)
        </text>

        {/* Lewa żyła nerkowa i lewa żyła nadnerczowa */}
        <path d="M 282 190 L 520 190" stroke="#3b82f6" strokeWidth="10" opacity="0.8" />
        <text x="450" y="210" textAnchor="middle" fill="#1e40af" fontSize="10">
          Lewa żyła nerkowa
        </text>

        <path d="M 490 120 L 490 185" stroke="#2563eb" strokeWidth="6" strokeLinecap="round" />
        <polygon points="485,180 490,190 495,180" fill="#2563eb" />
        <rect x="475" y="135" width="180" height="42" rx="6" fill="#eff6ff" stroke="#93c5fd" strokeWidth="1" />
        <text x="565" y="152" textAnchor="middle" fill="#1e3a8a" fontSize="10" fontWeight="bold">
          Lewa żyła nadnerczowa
        </text>
        <text x="565" y="167" textAnchor="middle" fill="#2563eb" fontSize="9">
          Długa (uchodzi do ż. nerkowej!)
        </text>

        {/* Tętnice nadnerczowe z aorty */}
        <path d="M 360 90 L 205 90" stroke="#dc2626" strokeWidth="2.5" strokeDasharray="3,3" />
        <path d="M 380 95 L 470 95" stroke="#dc2626" strokeWidth="2.5" strokeDasharray="3,3" />
        <text x="340" y="75" textAnchor="middle" fill="#b91c1c" fontSize="10" fontWeight="bold">
          3 tętnice nadnerczowe (górna, środkowa, dolna)
        </text>

        {/* Alert kliniczny na dole */}
        <rect x="50" y="240" width="580" height="45" rx="8" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1" />
        <text x="340" y="258" textAnchor="middle" fill="#92400e" fontSize="11" fontWeight="bold">
          Znaczenie kliniczne: Asymetria spływu żylnego warunkuje trudności w AVS i ryzyko krwawienia
        </text>
        <text x="340" y="274" textAnchor="middle" fill="#78350f" fontSize="10">
          Kaniulacja prawej żyły w AVS jest trudna technicznie; jej naderwanie podczas operacji grozi uszkodzeniem VCI.
        </text>
      </svg>
    </div>
  );
}

// 2. Kaskada sterydogenezy i bloki enzymatyczne (WPN)
export function AdrenalSteroidogenesisDiagram() {
  return (
    <div className="diagram-container" style={{ margin: '20px 0' }}>
      <svg viewBox="0 0 700 370" style={{ width: '100%', height: 'auto', background: '#f8faf9', borderRadius: '12px' }}>
        <text x="350" y="28" textAnchor="middle" fill="#1b4d3e" fontSize="16" fontWeight="bold">
          Szlaki sterydogenezy kory nadnerczy i blok 21-hydroksylazy (WPN)
        </text>

        {/* Kolumny stref */}
        <rect x="30" y="45" width="200" height="270" rx="8" fill="#eff6ff" stroke="#bfdbfe" strokeWidth="1" />
        <text x="130" y="68" textAnchor="middle" fill="#1e40af" fontSize="12" fontWeight="bold">
          STREFA KŁĘBUSZKOWA (ZG)
        </text>
        <text x="130" y="84" textAnchor="middle" fill="#3b82f6" fontSize="10">
          Szlak Aldosteronu (Mineralo)
        </text>

        <rect x="250" y="45" width="200" height="270" rx="8" fill="#fefce8" stroke="#fef08a" strokeWidth="1" />
        <text x="350" y="68" textAnchor="middle" fill="#854d0e" fontSize="12" fontWeight="bold">
          STREFA PASMOWATA (ZF)
        </text>
        <text x="350" y="84" textAnchor="middle" fill="#ca8a04" fontSize="10">
          Szlak Kortyzolu (Gliko)
        </text>

        <rect x="470" y="45" width="200" height="270" rx="8" fill="#fdf2f8" stroke="#fbcfe8" strokeWidth="1" />
        <text x="570" y="68" textAnchor="middle" fill="#9d174d" fontSize="12" fontWeight="bold">
          STREFA SIATKOWATA (ZR)
        </text>
        <text x="570" y="84" textAnchor="middle" fill="#db2777" fontSize="10">
          Szlak Androgenów (Sex)
        </text>

        {/* Substraty ZF */}
        <rect x="270" y="100" width="160" height="30" rx="6" fill="#ffffff" stroke="#eab308" />
        <text x="350" y="120" textAnchor="middle" fill="#713f12" fontSize="11" fontWeight="bold">
          17-OH-Pregnenolon
        </text>

        <line x1="350" y1="130" x2="350" y2="155" stroke="#ca8a04" strokeWidth="2" />
        <text x="350" y="148" textAnchor="middle" fill="#a16207" fontSize="9">
          3β-HSD
        </text>

        <rect x="270" y="160" width="160" height="34" rx="6" fill="#fed7aa" stroke="#f97316" strokeWidth="2" />
        <text x="350" y="181" textAnchor="middle" fill="#9a3412" fontSize="12" fontWeight="bold">
          17-OH-PROGESTERON
        </text>

        {/* BLOK 21-HYDROKSYLAZY */}
        <line x1="350" y1="194" x2="350" y2="230" stroke="#dc2626" strokeWidth="3" strokeDasharray="4,4" />
        <rect x="300" y="200" width="100" height="20" rx="4" fill="#fee2e2" stroke="#ef4444" />
        <text x="350" y="214" textAnchor="middle" fill="#991b1b" fontSize="10" fontWeight="bold">
          BLOK: 21-OH (95%)
        </text>

        <rect x="270" y="235" width="160" height="30" rx="6" fill="#f3f4f6" stroke="#9ca3af" />
        <text x="350" y="255" textAnchor="middle" fill="#6b7280" fontSize="11">
          11-Deoksykortyzol
        </text>

        <line x1="350" y1="265" x2="350" y2="280" stroke="#9ca3af" strokeWidth="1.5" />
        <text x="350" y="298" textAnchor="middle" fill="#dc2626" fontSize="12" fontWeight="bold">
          KORTYZOL ❌ (Niedobór!)
        </text>

        {/* ZG - Blok aldosteronu */}
        <rect x="50" y="160" width="160" height="30" rx="6" fill="#ffffff" stroke="#3b82f6" />
        <text x="130" y="180" textAnchor="middle" fill="#1e40af" fontSize="11">
          Progesteron
        </text>
        <line x1="130" y1="190" x2="130" y2="225" stroke="#dc2626" strokeWidth="3" strokeDasharray="4,4" />
        <text x="130" y="298" textAnchor="middle" fill="#dc2626" fontSize="12" fontWeight="bold">
          ALDOSTERON ❌ (Utrata soli!)
        </text>

        {/* Ucieczka w szlak androgenowy */}
        <path d="M 430 177 L 485 177" stroke="#db2777" strokeWidth="3" />
        <text x="458" y="168" textAnchor="middle" fill="#be185d" fontSize="9" fontWeight="bold">
          UCIECZKA!
        </text>
        <rect x="490" y="160" width="160" height="32" rx="6" fill="#fce7f3" stroke="#db2777" strokeWidth="2" />
        <text x="570" y="180" textAnchor="middle" fill="#831843" fontSize="11" fontWeight="bold">
          DHEA → Androstendion
        </text>
        <line x1="570" y1="192" x2="570" y2="240" stroke="#db2777" strokeWidth="2" />
        <rect x="490" y="240" width="160" height="34" rx="6" fill="#f472b6" stroke="#db2777" />
        <text x="570" y="261" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">
          TESTOSTERON ⬆️⬆️
        </text>
        <text x="570" y="298" textAnchor="middle" fill="#9d174d" fontSize="11" fontWeight="bold">
          WIRYLIZACJA / HIRSUTYZM
        </text>

        <rect x="30" y="325" width="640" height="35" rx="6" fill="#f0fdf4" stroke="#86efac" />
        <text x="350" y="347" textAnchor="middle" fill="#166534" fontSize="11">
          Leczenie hydrokortyzonem uzupełnia niedobór kortyzolu i hamuje przysadkowe ACTH, wygaszając nadmiar androgenów.
        </text>
      </svg>
    </div>
  );
}

// 3. Melanodermia w chorobie Addisona vs blady Addison
export function AddisonVsSecondaryPigmentationDiagram() {
  return (
    <div className="diagram-container" style={{ margin: '20px 0' }}>
      <svg viewBox="0 0 680 320" style={{ width: '100%', height: 'auto', background: '#f8faf9', borderRadius: '12px' }}>
        <text x="340" y="28" textAnchor="middle" fill="#1b4d3e" fontSize="16" fontWeight="bold">
          Patofizjologia melanodermii: Addison pierwotny vs wtórny („blady Addison”)
        </text>

        {/* Panel Lewy: Pierwotny (Addison) */}
        <rect x="30" y="45" width="300" height="255" rx="10" fill="#fffbeb" stroke="#fde68a" strokeWidth="2" />
        <text x="180" y="72" textAnchor="middle" fill="#92400e" fontSize="13" fontWeight="bold">
          PIERWOTNY (Choroba Addisona)
        </text>

        <rect x="60" y="90" width="240" height="32" rx="6" fill="#fee2e2" stroke="#ef4444" />
        <text x="180" y="110" textAnchor="middle" fill="#991b1b" fontSize="11" fontWeight="bold">
          Zniszczenie kory → Kortyzol ⬇️⬇️
        </text>

        <line x1="180" y1="122" x2="180" y2="148" stroke="#dc2626" strokeWidth="2" />
        <text x="180" y="140" textAnchor="middle" fill="#b91c1c" fontSize="9">
          Brak ujemnego sprzężenia!
        </text>

        <rect x="60" y="150" width="240" height="36" rx="6" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" />
        <text x="180" y="172" textAnchor="middle" fill="#b45309" fontSize="12" fontWeight="bold">
          Wyrzut ACTH i POMC ⬆️⬆️ (&gt;200–1000 pg/ml)
        </text>

        <line x1="180" y1="186" x2="180" y2="215" stroke="#d97706" strokeWidth="2" />
        <circle cx="180" cy="235" r="22" fill="#78350f" />
        <text x="180" y="239" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">
          MC1R
        </text>
        <text x="180" y="275" textAnchor="middle" fill="#78350f" fontSize="12" fontWeight="bold">
          MELANODERMIA (ciemna skóra)
        </text>
        <text x="180" y="290" textAnchor="middle" fill="#92400e" fontSize="9">
          Zgięcia dłoni, błony śluzowe, blizny
        </text>

        {/* Panel Prawy: Wtórny (Przysadkowy / Steroidowy) */}
        <rect x="350" y="45" width="300" height="255" rx="10" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" />
        <text x="500" y="72" textAnchor="middle" fill="#334155" fontSize="13" fontWeight="bold">
          WTÓRNY (Przysadka / Steroidy)
        </text>

        <rect x="380" y="90" width="240" height="32" rx="6" fill="#e2e8f0" stroke="#94a3b8" />
        <text x="500" y="110" textAnchor="middle" fill="#475569" fontSize="11" fontWeight="bold">
          Uszkodzenie przysadki / Egzogenne sterydy
        </text>

        <line x1="500" y1="122" x2="500" y2="148" stroke="#64748b" strokeWidth="2" />

        <rect x="380" y="150" width="240" height="36" rx="6" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="2" />
        <text x="500" y="172" textAnchor="middle" fill="#475569" fontSize="12" fontWeight="bold">
          Stężenie ACTH i POMC ⬇️⬇️ (&lt;5–10 pg/ml)
        </text>

        <line x1="500" y1="186" x2="500" y2="215" stroke="#94a3b8" strokeWidth="2" />
        <circle cx="500" cy="235" r="22" fill="#e2e8f0" stroke="#94a3b8" />
        <text x="500" y="239" textAnchor="middle" fill="#64748b" fontSize="10">
          MC1R
        </text>
        <text x="500" y="275" textAnchor="middle" fill="#1e293b" fontSize="12" fontWeight="bold">
          BRAK PRZEBARWIEŃ („Blady Addison”)
        </text>
        <text x="500" y="290" textAnchor="middle" fill="#475569" fontSize="9">
          Alabastrowo blada powłoka skórna
        </text>
      </svg>
    </div>
  );
}

// 4. Oś RAA, wskaźnik ARR i algorytm AVS w zespole Conna
export function RaaAxisAndConnPathway() {
  return (
    <div className="diagram-container" style={{ margin: '20px 0' }}>
      <svg viewBox="0 0 680 330" style={{ width: '100%', height: 'auto', background: '#f8faf9', borderRadius: '12px' }}>
        <text x="340" y="28" textAnchor="middle" fill="#1b4d3e" fontSize="16" fontWeight="bold">
          Algorytm diagnostyczny pierwotnego hiperaldosteronizmu (PA / Zespół Conna)
        </text>

        {/* Krok 1: Wskazania i ARR */}
        <rect x="30" y="55" width="180" height="70" rx="8" fill="#eff6ff" stroke="#3b82f6" strokeWidth="2" />
        <text x="120" y="76" textAnchor="middle" fill="#1e40af" fontSize="11" fontWeight="bold">
          KROK 1: PRZESIEW
        </text>
        <text x="120" y="93" textAnchor="middle" fill="#1e3a8a" fontSize="10">
          Oporne NT / Hipokaliemia
        </text>
        <text x="120" y="110" textAnchor="middle" fill="#2563eb" fontSize="11" fontWeight="bold">
          Wskaźnik ARR &gt; 20–30
        </text>

        <line x1="210" y1="90" x2="255" y2="90" stroke="#3b82f6" strokeWidth="2" />

        {/* Krok 2: Test konfirmacji */}
        <rect x="260" y="55" width="180" height="70" rx="8" fill="#fefce8" stroke="#eab308" strokeWidth="2" />
        <text x="350" y="76" textAnchor="middle" fill="#854d0e" fontSize="11" fontWeight="bold">
          KROK 2: POTWIERDZENIE
        </text>
        <text x="350" y="93" textAnchor="middle" fill="#713f12" fontSize="10">
          Obciążenie 0,9% NaCl (2 L/4h)
        </text>
        <text x="350" y="110" textAnchor="middle" fill="#a16207" fontSize="11" fontWeight="bold">
          Brak supresji aldo &gt;10 ng/dl
        </text>

        <line x1="440" y1="90" x2="485" y2="90" stroke="#eab308" strokeWidth="2" />

        {/* Krok 3: Obrazowanie TK */}
        <rect x="490" y="55" width="160" height="70" rx="8" fill="#f3f4f6" stroke="#9ca3af" strokeWidth="2" />
        <text x="570" y="76" textAnchor="middle" fill="#374151" fontSize="11" fontWeight="bold">
          KROK 3: TK NADNERCZY
        </text>
        <text x="570" y="93" textAnchor="middle" fill="#4b5563" fontSize="10">
          Ocena morfologii
        </text>
        <text x="570" y="110" textAnchor="middle" fill="#dc2626" fontSize="10" fontWeight="bold">
          Często myląca w 40%!
        </text>

        <line x1="570" y1="125" x2="570" y2="165" stroke="#9ca3af" strokeWidth="2" />

        {/* Krok 4: AVS Złoty standard */}
        <rect x="200" y="165" width="380" height="50" rx="8" fill="#fdf2f8" stroke="#ec4899" strokeWidth="2" />
        <text x="390" y="186" textAnchor="middle" fill="#9d174d" fontSize="12" fontWeight="bold">
          KROK 4: CEWNIKOWANIE ŻYŁ NADNERCZOWYCH (AVS)
        </text>
        <text x="390" y="202" textAnchor="middle" fill="#be185d" fontSize="10">
          Złoty standard różnicowania postaci jednostronnej od obustronnej
        </text>

        {/* Rozgałęzienie AVS */}
        <path d="M 290 215 L 200 250" stroke="#ec4899" strokeWidth="2" />
        <path d="M 490 215 L 560 250" stroke="#ec4899" strokeWidth="2" />

        {/* Wynik Lewy: APA */}
        <rect x="70" y="250" width="250" height="60" rx="8" fill="#ecfdf5" stroke="#10b981" strokeWidth="2" />
        <text x="195" y="270" textAnchor="middle" fill="#065f46" fontSize="11" fontWeight="bold">
          LATERALIZACJA: Gradient &gt; 4:1
        </text>
        <text x="195" y="286" textAnchor="middle" fill="#047857" fontSize="10">
          Gruczolak aldosteronowy (APA / Conn)
        </text>
        <text x="195" y="300" textAnchor="middle" fill="#059669" fontSize="11" fontWeight="bold">
          👉 Laparoskopowa adrenalektomia
        </text>

        {/* Wynik Prawy: BAH */}
        <rect x="420" y="250" width="230" height="60" rx="8" fill="#eff6ff" stroke="#3b82f6" strokeWidth="2" />
        <text x="535" y="270" textAnchor="middle" fill="#1e40af" fontSize="11" fontWeight="bold">
          BRAK LATERALIZACJI: Wskaźnik &lt; 2:1
        </text>
        <text x="535" y="286" textAnchor="middle" fill="#1e3a8a" fontSize="10">
          Obustronny przerost kory (BAH)
        </text>
        <text x="535" y="300" textAnchor="middle" fill="#2563eb" fontSize="11" fontWeight="bold">
          👉 Spironolakton / Eplerenon
        </text>
      </svg>
    </div>
  );
}
