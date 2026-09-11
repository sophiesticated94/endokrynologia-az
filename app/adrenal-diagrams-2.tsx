'use client';

// 5. Hemodynamiczny mechanizm Pheo: ALFA przed BETA!
export function PheoAlphaBetaBlockadeDiagram() {
  return (
    <div className="diagram-container" style={{ margin: '20px 0' }}>
      <svg viewBox="0 0 680 320" style={{ width: '100%', height: 'auto', background: '#f8faf9', borderRadius: '12px' }}>
        <text x="340" y="28" textAnchor="middle" fill="#1b4d3e" fontSize="16" fontWeight="bold">
          Dlaczego w Pheochromocytoma blokada ALFA musi poprzedzać BETA?
        </text>

        {/* BŁĘDNA SEKWENCJA */}
        <rect x="30" y="50" width="300" height="250" rx="10" fill="#fef2f2" stroke="#fca5a5" strokeWidth="2" />
        <text x="180" y="75" textAnchor="middle" fill="#991b1b" fontSize="13" fontWeight="bold">
          ❌ BŁĄD: BETA-BLOKER JAKO PIERWSZY
        </text>

        <rect x="50" y="95" width="260" height="36" rx="6" fill="#ffffff" stroke="#ef4444" />
        <text x="180" y="117" textAnchor="middle" fill="#b91c1c" fontSize="11">
          Zablokowanie receptorów naczyniowych β2
        </text>

        <text x="180" y="150" textAnchor="middle" fill="#7f1d1d" fontSize="10">
          (zniesienie fizjologicznego rozszerzania naczyń)
        </text>

        <rect x="50" y="165" width="260" height="42" rx="6" fill="#fee2e2" stroke="#dc2626" strokeWidth="2" />
        <text x="180" y="183" textAnchor="middle" fill="#991b1b" fontSize="11" fontWeight="bold">
          NIEPRZECIWSTAWIONY SKURCZ α1!
        </text>
        <text x="180" y="198" textAnchor="middle" fill="#b91c1c" fontSize="9">
          (Unopposed alpha-adrenergic stimulation)
        </text>

        <rect x="50" y="220" width="260" height="65" rx="6" fill="#991b1b" />
        <text x="180" y="240" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">
          KATASTROFALNY PRZEŁOM RR!
        </text>
        <text x="180" y="258" textAnchor="middle" fill="#fecaca" fontSize="10">
          RR &gt; 260/150 mmHg, obrzęk płuc,
        </text>
        <text x="180" y="273" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">
          udar krwotoczny mózgu i zgon!
        </text>

        {/* PRAWIDŁOWA SEKWENCJA */}
        <rect x="350" y="50" width="300" height="250" rx="10" fill="#f0fdf4" stroke="#86efac" strokeWidth="2" />
        <text x="500" y="75" textAnchor="middle" fill="#166534" fontSize="13" fontWeight="bold">
          ✔️ PRAWIDŁOWO: ALFA PRZED BETA
        </text>

        <rect x="370" y="95" width="260" height="40" rx="6" fill="#ffffff" stroke="#16a34a" strokeWidth="2" />
        <text x="500" y="112" textAnchor="middle" fill="#15803d" fontSize="11" fontWeight="bold">
          KROK 1: Alfa-bloker (10–14 dni)
        </text>
        <text x="500" y="127" textAnchor="middle" fill="#166534" fontSize="9">
          Doksazosyna lub Fenoksybenzamina
        </text>

        <text x="500" y="152" textAnchor="middle" fill="#14532d" fontSize="10">
          Rozszerzenie naczyń i spadek oporu
        </text>

        <rect x="370" y="165" width="260" height="42" rx="6" fill="#dcfce7" stroke="#22c55e" />
        <text x="500" y="183" textAnchor="middle" fill="#15803d" fontSize="11" fontWeight="bold">
          KROK 2: Beta-bloker (po kilku dniach)
        </text>
        <text x="500" y="198" textAnchor="middle" fill="#166534" fontSize="9">
          Dołączany TYLKO przy tachykardii (&gt;80/min)
        </text>

        <rect x="370" y="220" width="260" height="65" rx="6" fill="#15803d" />
        <text x="500" y="242" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">
          BEZPIECZEŃSTWO OPERACYJNE
        </text>
        <text x="500" y="260" textAnchor="middle" fill="#bbf7d0" fontSize="10">
          Kryteria Roizena spełnione,
        </text>
        <text x="500" y="275" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">
          bezpieczna adrenalektomia laparoskopowa!
        </text>
      </svg>
    </div>
  );
}

// 6. Algorytm TK Incydentaloma i Washout wg ESE 2023
export function IncidentalomaCtWashoutDiagram() {
  return (
    <div className="diagram-container" style={{ margin: '20px 0' }}>
      <svg viewBox="0 0 680 340" style={{ width: '100%', height: 'auto', background: '#f8faf9', borderRadius: '12px' }}>
        <text x="340" y="28" textAnchor="middle" fill="#1b4d3e" fontSize="16" fontWeight="bold">
          Algorytm radiologiczny oceny Incydentaloma w TK (Wytyczne ESE 2023)
        </text>

        <rect x="230" y="50" width="220" height="42" rx="8" fill="#eff6ff" stroke="#3b82f6" strokeWidth="2" />
        <text x="340" y="70" textAnchor="middle" fill="#1e40af" fontSize="12" fontWeight="bold">
          TK bez kontrastu (Natywna)
        </text>
        <text x="340" y="84" textAnchor="middle" fill="#1d4ed8" fontSize="10">
          Pomiar gęstości w jednostkach Hounsfielda
        </text>

        {/* Gałąź Lewa: <=10 HU */}
        <line x1="280" y1="92" x2="160" y2="135" stroke="#10b981" strokeWidth="2.5" />
        <rect x="40" y="135" width="240" height="85" rx="8" fill="#ecfdf5" stroke="#10b981" strokeWidth="2" />
        <text x="160" y="156" textAnchor="middle" fill="#065f46" fontSize="12" fontWeight="bold">
          Gęstość natywna &lt;= 10 HU
        </text>
        <text x="160" y="174" textAnchor="middle" fill="#047857" fontSize="10">
          Łagodny gruczolak bogaty w lipidy
        </text>
        <text x="160" y="192" textAnchor="middle" fill="#059669" fontSize="11" fontWeight="bold">
          ✔️ BRAK DALSZYCH BADAŃ TK!
        </text>
        <text x="160" y="208" textAnchor="middle" fill="#047857" fontSize="9">
          (Tylko przesiew hormonalny: 1 mg DEX)
        </text>

        {/* Gałąź Prawa: >10 HU */}
        <line x1="400" y1="92" x2="520" y2="135" stroke="#f59e0b" strokeWidth="2.5" />
        <rect x="400" y="135" width="240" height="75" rx="8" fill="#fffbeb" stroke="#f59e0b" strokeWidth="2" />
        <text x="520" y="156" textAnchor="middle" fill="#92400e" fontSize="12" fontWeight="bold">
          Gęstość natywna &gt; 10 HU
        </text>
        <text x="520" y="174" textAnchor="middle" fill="#78350f" fontSize="10">
          Zmiana uboga w lipidy (lipid-poor)
        </text>
        <text x="520" y="195" textAnchor="middle" fill="#b45309" fontSize="11" fontWeight="bold">
          👉 TK z wymywaniem (Washout 15 min)
        </text>

        {/* Rozgałęzienie Washoutu */}
        <line x1="460" y1="210" x2="380" y2="245" stroke="#10b981" strokeWidth="2" />
        <line x1="580" y1="210" x2="580" y2="245" stroke="#ef4444" strokeWidth="2" />

        <rect x="260" y="245" width="220" height="75" rx="8" fill="#f0fdf4" stroke="#86efac" strokeWidth="1.5" />
        <text x="370" y="265" textAnchor="middle" fill="#15803d" fontSize="11" fontWeight="bold">
          APW &gt;= 60% lub RPW &gt;= 40%
        </text>
        <text x="370" y="282" textAnchor="middle" fill="#166534" fontSize="10">
          Szybkie wypłukiwanie kontrastu
        </text>
        <text x="370" y="302" textAnchor="middle" fill="#15803d" fontSize="11" fontWeight="bold">
          Gruczolak ubogi w lipidy (łagodny)
        </text>

        <rect x="500" y="245" width="165" height="75" rx="8" fill="#fef2f2" stroke="#f87171" strokeWidth="1.5" />
        <text x="582" y="265" textAnchor="middle" fill="#991b1b" fontSize="11" fontWeight="bold">
          APW &lt; 60% (Słaby)
        </text>
        <text x="582" y="282" textAnchor="middle" fill="#b91c1c" fontSize="10">
          Opóźnione wymywanie
        </text>
        <text x="582" y="302" textAnchor="middle" fill="#dc2626" fontSize="11" fontWeight="bold">
          ⚠️ Rak ACC / Przerzut!
        </text>
      </svg>
    </div>
  );
}

// 7. Protokół ratunkowy ostrego przełomu nadnerczowego
export function AdrenalCrisisEmergencyProtocol() {
  return (
    <div className="diagram-container" style={{ margin: '20px 0' }}>
      <svg viewBox="0 0 680 320" style={{ width: '100%', height: 'auto', background: '#f8faf9', borderRadius: '12px' }}>
        <text x="340" y="28" textAnchor="middle" fill="#1b4d3e" fontSize="16" fontWeight="bold">
          Protokół postępowania ratunkowego w ostrym przełomie nadnerczowym
        </text>

        <rect x="50" y="50" width="580" height="50" rx="8" fill="#fee2e2" stroke="#ef4444" strokeWidth="2" />
        <text x="340" y="72" textAnchor="middle" fill="#991b1b" fontSize="13" fontWeight="bold">
          PODEJRZENIE PRZEŁOMU (Wstrząs oporny na płyny + bóle brzucha + hiponatremia/hiperkaliemia)
        </text>
        <text x="340" y="88" textAnchor="middle" fill="#b91c1c" fontSize="10">
          ŻELAZNA ZASADA: Rozpocznij leczenie natychmiast — nie czekaj na wyniki badań laboratoryjnych!
        </text>

        {/* 3 Filary Resuscytacji */}
        <rect x="50" y="115" width="180" height="130" rx="8" fill="#fef2f2" stroke="#dc2626" strokeWidth="2" />
        <text x="140" y="138" textAnchor="middle" fill="#991b1b" fontSize="12" fontWeight="bold">
          1. HYDROKORTYZON
        </text>
        <text x="140" y="160" textAnchor="middle" fill="#7f1d1d" fontSize="11" fontWeight="bold">
          100 mg i.v. STAT!
        </text>
        <text x="140" y="178" textAnchor="middle" fill="#b91c1c" fontSize="10">
          w bolusie dożylnym
        </text>
        <line x1="70" y1="188" x2="210" y2="188" stroke="#fca5a5" />
        <text x="140" y="208" textAnchor="middle" fill="#991b1b" fontSize="10" fontWeight="bold">
          Następnie 200 mg / 24h
        </text>
        <text x="140" y="224" textAnchor="middle" fill="#7f1d1d" fontSize="9">
          wlew ciągły lub 50 mg co 6h
        </text>

        <rect x="250" y="115" width="180" height="130" rx="8" fill="#eff6ff" stroke="#3b82f6" strokeWidth="2" />
        <text x="340" y="138" textAnchor="middle" fill="#1e40af" fontSize="12" fontWeight="bold">
          2. PŁYNOTERAPIA
        </text>
        <text x="340" y="160" textAnchor="middle" fill="#1e3a8a" fontSize="11" fontWeight="bold">
          1000 ml 0,9% NaCl
        </text>
        <text x="340" y="178" textAnchor="middle" fill="#2563eb" fontSize="10">
          w ciągu 1. godziny!
        </text>
        <line x1="270" y1="188" x2="410" y2="188" stroke="#bfdbfe" />
        <text x="340" y="208" textAnchor="middle" fill="#1e40af" fontSize="10" fontWeight="bold">
          Łącznie 3–4 litry
        </text>
        <text x="340" y="224" textAnchor="middle" fill="#1d4ed8" fontSize="9">
          soli w pierwszej dobie
        </text>

        <rect x="450" y="115" width="180" height="130" rx="8" fill="#fefce8" stroke="#eab308" strokeWidth="2" />
        <text x="540" y="138" textAnchor="middle" fill="#854d0e" fontSize="12" fontWeight="bold">
          3. GLIKEMIA
        </text>
        <text x="540" y="160" textAnchor="middle" fill="#713f12" fontSize="11" fontWeight="bold">
          Wlewy 5%–10% Glukozy
        </text>
        <text x="540" y="178" textAnchor="middle" fill="#a16207" fontSize="10">
          ochrona przed hipoglikemią
        </text>
        <line x1="470" y1="188" x2="610" y2="188" stroke="#fde047" />
        <text x="540" y="208" textAnchor="middle" fill="#854d0e" fontSize="10" fontWeight="bold">
          Fludrokortyzon ZBĘDNY!
        </text>
        <text x="540" y="224" textAnchor="middle" fill="#713f12" fontSize="9">
          Duża dawka HC nasyca rec. MR
        </text>

        {/* Pasek na dole */}
        <rect x="50" y="260" width="580" height="42" rx="6" fill="#f0fdf4" stroke="#86efac" />
        <text x="340" y="278" textAnchor="middle" fill="#166534" fontSize="11" fontWeight="bold">
          Po ustabilizowaniu stanu: poszukiwanie i leczenie czynnika wyzwalającego
        </text>
        <text x="340" y="293" textAnchor="middle" fill="#14532d" fontSize="10">
          (posocznica, zakażenie układu moczowego, zawał, zapalenie płuc, błąd w dawkowaniu sterydu)
        </text>
      </svg>
    </div>
  );
}

// 8. Skala Weissa i histopatologia raka kory nadnerczy ACC
export function AdrenocorticalCarcinomaWeissDiagram() {
  return (
    <div className="diagram-container" style={{ margin: '20px 0' }}>
      <svg viewBox="0 0 680 340" style={{ width: '100%', height: 'auto', background: '#f8faf9', borderRadius: '12px' }}>
        <text x="340" y="28" textAnchor="middle" fill="#1b4d3e" fontSize="16" fontWeight="bold">
          Kryteria histopatologiczne skali Weissa w diagnostyce raka kory nadnerczy (ACC)
        </text>

        <rect x="40" y="48" width="600" height="42" rx="8" fill="#fef2f2" stroke="#f87171" strokeWidth="1.5" />
        <text x="340" y="68" textAnchor="middle" fill="#991b1b" fontSize="12" fontWeight="bold">
          ZŁOTY STANDARD: Ocena 9 cech mikroskopowych w badaniu patomorfologicznym
        </text>
        <text x="340" y="82" textAnchor="middle" fill="#b91c1c" fontSize="10">
          Obecność co najmniej 3 kryteriów (&gt;= 3 z 9) definiuje nowotwór złośliwy (ACC)!
        </text>

        {/* Grupa 1: Jądra i mitozy */}
        <rect x="40" y="105" width="190" height="150" rx="8" fill="#eff6ff" stroke="#bfdbfe" />
        <text x="135" y="125" textAnchor="middle" fill="#1e40af" fontSize="11" fontWeight="bold">
          AKTYWNOŚĆ PODZIAŁOWA
        </text>
        <text x="55" y="150" fill="#1e3a8a" fontSize="10">• Indeks mitotyczny &gt;5 / 50 HPF</text>
        <text x="55" y="175" fill="#1e3a8a" fontSize="10">• Atypowe figury podziału</text>
        <text x="55" y="200" fill="#1e3a8a" fontSize="10">• Wysoki atypizm jąder</text>
        <text x="55" y="225" fill="#1e3a8a" fontSize="10">• Indeks Ki-67 (&gt;10% = wysokie ryzyko)</text>

        {/* Grupa 2: Architektura */}
        <rect x="245" y="105" width="190" height="150" rx="8" fill="#fefce8" stroke="#fde047" />
        <text x="340" y="125" textAnchor="middle" fill="#854d0e" fontSize="11" fontWeight="bold">
          ARCHITEKTURA I STRUKTURA
        </text>
        <text x="260" y="150" fill="#713f12" fontSize="10">• Obecność martwicy tkankowej</text>
        <text x="260" y="175" fill="#713f12" fontSize="10">• &lt;25% komórek jasnych</text>
        <text x="260" y="195" fill="#713f12" fontSize="9">(dominacja kwasochłonnych)</text>
        <text x="260" y="220" fill="#713f12" fontSize="10">• Rozlane zaburzenie utkania</text>

        {/* Grupa 3: Inwazyjność */}
        <rect x="450" y="105" width="190" height="150" rx="8" fill="#fdf2f8" stroke="#fbcfe8" />
        <text x="545" y="125" textAnchor="middle" fill="#9d174d" fontSize="11" fontWeight="bold">
          CECHY INWAZJI NACZYŃ
        </text>
        <text x="465" y="150" fill="#831843" fontSize="10">• Inwazja naczyń żylnych</text>
        <text x="465" y="175" fill="#831843" fontSize="10">• Inwazja naczyń zatokowych</text>
        <text x="465" y="200" fill="#831843" fontSize="10">• Naciekanie torebki narządu</text>
        <text x="465" y="225" fill="#831843" fontSize="10">• Przerzuty do węzłów/odległe</text>

        {/* Pasek postępowania */}
        <rect x="40" y="270" width="600" height="50" rx="8" fill="#1b4d3e" />
        <text x="340" y="292" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">
          POSTĘPOWANIE: Radykalna otwarta resekcja R0 + Adjuwantowa terapia Mitotanem
        </text>
        <text x="340" y="308" textAnchor="middle" fill="#a7f3d0" fontSize="10">
          Wysokie dawki hydrokortyzonu (40–60 mg/d) z powodu indukcji CYP3A4 przez mitotan.
        </text>
      </svg>
    </div>
  );
}
