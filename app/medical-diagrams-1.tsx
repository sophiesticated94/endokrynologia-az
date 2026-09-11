'use client';

// 1. Oś Podwzgórze-Przysadka-Tarczyca (HPT)
export function ThyroidAxisDiagram() {
  return (
    <figure className="diagram-container">
      <figcaption className="diagram-caption">
        <strong>Rycina 1.</strong> Schemat osi podwzgórze–przysadka–tarczyca i pętla ujemnego sprzężenia zwrotnego.
      </figcaption>
      <svg viewBox="0 0 680 340" className="medical-svg" role="img" aria-label="Schemat osi HPT">
        <defs>
          <linearGradient id="stimGrad" x1="0" y1="0" x2="0" y2="1">
            <stop stopColor="#187765" />
            <stop offset="1" stopColor="#125c4e" />
          </linearGradient>
          <linearGradient id="inhibGrad" x1="0" y1="0" x2="0" y2="1">
            <stop stopColor="#c05621" />
            <stop offset="1" stopColor="#9c4221" />
          </linearGradient>
        </defs>

        {/* Podwzgórze */}
        <rect x="40" y="30" width="180" height="65" rx="8" fill="#edf4f0" stroke="#a3c7b5" strokeWidth="2" />
        <text x="130" y="58" textAnchor="middle" fill="#1b3d34" fontWeight="700" fontSize="14">PODWZGÓRZE</text>
        <text x="130" y="77" textAnchor="middle" fill="#4d6f64" fontSize="12">Wydziela TRH (+)</text>

        {/* Strzałka TRH -> Przysadka */}
        <path d="M 130 95 L 130 135" fill="none" stroke="#187765" strokeWidth="3" markerEnd="url(#arrowStim)" />
        <text x="145" y="120" fill="#187765" fontWeight="700" fontSize="12">TRH</text>

        {/* Przysadka */}
        <rect x="40" y="140" width="180" height="65" rx="8" fill="#e8f1f5" stroke="#9bb8cb" strokeWidth="2" />
        <text x="130" y="168" textAnchor="middle" fill="#19384a" fontWeight="700" fontSize="14">PRZYSADKA (przedni płat)</text>
        <text x="130" y="187" textAnchor="middle" fill="#506e80" fontSize="12">Wydziela TSH (+)</text>

        {/* Strzałka TSH -> Tarczyca */}
        <path d="M 130 205 L 130 245" fill="none" stroke="#187765" strokeWidth="3" />
        <text x="145" y="230" fill="#187765" fontWeight="700" fontSize="12">TSH</text>

        {/* Tarczyca */}
        <rect x="40" y="250" width="180" height="65" rx="8" fill="#eaf4ef" stroke="#7eb598" strokeWidth="2" />
        <text x="130" y="278" textAnchor="middle" fill="#1c4838" fontWeight="700" fontSize="14">TARCZYCA</text>
        <text x="130" y="297" textAnchor="middle" fill="#4b7060" fontSize="12">Synteza T4 (80%) i T3 (20%)</text>

        {/* Strzałka Tarczyca -> Tkanki obwodowe */}
        <path d="M 220 282 L 340 282" fill="none" stroke="#187765" strokeWidth="3" />
        <polygon points="345,282 335,277 335,287" fill="#187765" />
        <text x="270" y="274" fill="#187765" fontWeight="600" fontSize="12">FT4 / FT3</text>

        {/* Tkanki obwodowe */}
        <rect x="350" y="245" width="280" height="75" rx="8" fill="#fcf9f2" stroke="#dcd2b8" strokeWidth="2" />
        <text x="490" y="270" textAnchor="middle" fill="#564a2f" fontWeight="700" fontSize="14">NARZĄDY I TKANKI DOCELOWE</text>
        <text x="490" y="290" textAnchor="middle" fill="#756747" fontSize="12">Obwodowa konwersja T4 → T3 (dejodynazy DIO1, DIO2)</text>
        <text x="490" y="307" textAnchor="middle" fill="#756747" fontSize="11">Metabolizm, termogeneza, rytm serca, OUN</text>

        {/* Pętla ujemnego sprzężenia zwrotnego (Negative Feedback Loop) */}
        <path d="M 490 245 L 490 62 L 230 62" fill="none" stroke="#c05621" strokeWidth="2.5" strokeDasharray="5 4" />
        <polygon points="225,62 235,57 235,67" fill="#c05621" />
        <circle cx="360" cy="62" r="14" fill="#c05621" />
        <text x="360" y="67" textAnchor="middle" fill="#fff" fontWeight="700" fontSize="16">−</text>

        <path d="M 490 172 L 230 172" fill="none" stroke="#c05621" strokeWidth="2.5" strokeDasharray="5 4" />
        <polygon points="225,172 235,167 235,177" fill="#c05621" />
        <circle cx="360" cy="172" r="14" fill="#c05621" />
        <text x="360" y="177" textAnchor="middle" fill="#fff" fontWeight="700" fontSize="16">−</text>

        <text x="500" y="125" fill="#a84317" fontWeight="600" fontSize="12">Ujemne sprzężenie zwrotne</text>
        <text x="500" y="142" fill="#7a3414" fontSize="11">Wzrost FT4 i FT3 hamuje wydzielanie TRH i TSH</text>
      </svg>
    </figure>
  );
}

// 2. Macierz interpretacji laboratoryjnej (TSH vs FT4)
export function LabMatrixDiagram() {
  return (
    <figure className="diagram-container">
      <figcaption className="diagram-caption">
        <strong>Rycina 2.</strong> Macierz diagnostyczna: korelacja stężeń TSH i FT4 w najczęstszych stanach klinicznych.
      </figcaption>
      <svg viewBox="0 0 660 330" className="medical-svg" role="img" aria-label="Macierz TSH vs FT4">
        {/* Tło i osie */}
        <rect x="80" y="20" width="540" height="260" fill="#fbfcfb" stroke="#d5dfd8" strokeWidth="1.5" rx="6" />

        {/* Zakres normy FT4 (12–22) pionowy pas */}
        <rect x="250" y="20" width="200" height="260" fill="#ebf6ee" opacity="0.65" />
        {/* Zakres normy TSH (0.4–4.0) poziomy pas */}
        <rect x="80" y="105" width="540" height="90" fill="#ebf6ee" opacity="0.65" />

        {/* Strefa Eutyreozy (przecięcie norm) */}
        <rect x="250" y="105" width="200" height="90" fill="#d2ede0" stroke="#71bfa1" strokeWidth="1.5" rx="4" />
        <text x="350" y="145" textAnchor="middle" fill="#186146" fontWeight="700" fontSize="13">EUTYREOZA</text>
        <text x="350" y="165" textAnchor="middle" fill="#2d775c" fontSize="11">Prawidłowa czynność tarczycy</text>

        {/* Jawna niedoczynność (TSH wysokie, FT4 niskie) */}
        <rect x="95" y="35" width="145" height="60" fill="#fbebe7" stroke="#e0a394" strokeWidth="1" rx="4" />
        <text x="167" y="58" textAnchor="middle" fill="#9c3b28" fontWeight="700" fontSize="12">JAWNA NIEDOCZYNNOŚĆ</text>
        <text x="167" y="76" textAnchor="middle" fill="#753225" fontSize="10">np. zaawansowane Hashimoto</text>

        {/* Subkliniczna niedoczynność (TSH wysokie, FT4 w normie) */}
        <rect x="260" y="35" width="180" height="60" fill="#fcf3e8" stroke="#dfbf8e" strokeWidth="1" rx="4" />
        <text x="350" y="58" textAnchor="middle" fill="#8d5b1d" fontWeight="700" fontSize="12">SUBKLINICZNA NIEDOCZYNNOŚĆ</text>
        <text x="350" y="76" textAnchor="middle" fill="#704b1e" fontSize="10">FT4 w normie, potwierdź za 2–3 mies.</text>

        {/* Jawna tyreotoksykoza (TSH niskie, FT4 wysokie) */}
        <rect x="460" y="205" width="150" height="65" fill="#fdf0ed" stroke="#e29b8c" strokeWidth="1" rx="4" />
        <text x="535" y="230" textAnchor="middle" fill="#aa3b24" fontWeight="700" fontSize="12">JAWNA NADCYNNOŚĆ</text>
        <text x="535" y="248" textAnchor="middle" fill="#7a2a1a" fontSize="10">Graves-Basedow, wole guzkowe</text>

        {/* Subkliniczna nadczynność (TSH niskie, FT4 w normie) */}
        <rect x="260" y="205" width="180" height="65" fill="#fcf3e8" stroke="#dfbf8e" strokeWidth="1" rx="4" />
        <text x="350" y="230" textAnchor="middle" fill="#8d5b1d" fontWeight="700" fontSize="12">SUBKLINICZNA NADCYNNOŚĆ</text>
        <text x="350" y="248" textAnchor="middle" fill="#704b1e" fontSize="10">Ryzyko arytmii i osteoporozy</text>

        {/* Niedoczynność wtórna / przysadkowa (FT4 niskie, TSH niskie lub w normie) */}
        <rect x="95" y="115" width="145" height="70" fill="#edf2f8" stroke="#a7bfd9" strokeWidth="1" rx="4" />
        <text x="167" y="138" textAnchor="middle" fill="#2d527a" fontWeight="700" fontSize="11">NIEDOCZYNNOŚĆ WTÓRNA</text>
        <text x="167" y="155" textAnchor="middle" fill="#3c5f87" fontSize="10">Guz przysadki / operacja</text>
        <text x="167" y="172" textAnchor="middle" fill="#5b7899" fontSize="9">TSH „nieadekwatnie prawidłowe”</text>

        {/* Etykiety osi */}
        <text x="40" y="150" textAnchor="middle" transform="rotate(-90 40 150)" fill="#445952" fontWeight="700" fontSize="13">Stężenie TSH (mIU/l) ↑</text>
        <text x="350" y="305" textAnchor="middle" fill="#445952" fontWeight="700" fontSize="13">Stężenie FT4 (pmol/l) →</text>
      </svg>
    </figure>
  );
}

// 3. Trójfazowy przebieg zapalenia podostrego de Quervaina
export function ThyroiditisCurveDiagram() {
  return (
    <figure className="diagram-container">
      <figcaption className="diagram-caption">
        <strong>Rycina 3.</strong> Trójfazowy przebieg podostrego destrukcyjnego zapalenia tarczycy de Quervaina.
      </figcaption>
      <svg viewBox="0 0 680 260" className="medical-svg" role="img" aria-label="Wykres faz zapalenia de Quervaina">
        {/* Tło i linie siatki */}
        <rect x="60" y="20" width="580" height="190" fill="#ffffff" stroke="#e0e7e3" strokeWidth="1" rx="6" />
        <line x1="60" y1="115" x2="640" y2="115" stroke="#cfdbd4" strokeDasharray="4 3" strokeWidth="1.5" />
        <text x="645" y="119" fill="#75887e" fontSize="10">Eutyreoza (norma)</text>

        {/* Podział na fazy pionowymi liniami */}
        <line x1="220" y1="20" x2="220" y2="210" stroke="#e3ece7" strokeWidth="1" strokeDasharray="2 2" />
        <line x1="420" y1="20" x2="420" y2="210" stroke="#e3ece7" strokeWidth="1" strokeDasharray="2 2" />

        {/* Etykiety faz */}
        <rect x="75" y="28" width="130" height="24" rx="4" fill="#fae8e3" />
        <text x="140" y="44" textAnchor="middle" fill="#9e3a24" fontWeight="700" fontSize="11">1. Faza tyreotoksykozy</text>

        <rect x="245" y="28" width="150" height="24" rx="4" fill="#edf1f9" />
        <text x="320" y="44" textAnchor="middle" fill="#2d527a" fontWeight="700" fontSize="11">2. Faza hipotyreozy</text>

        <rect x="450" y="28" width="160" height="24" rx="4" fill="#e7f4ed" />
        <text x="530" y="44" textAnchor="middle" fill="#216c4e" fontWeight="700" fontSize="11">3. Faza rekonwalescencji</text>

        {/* Krzywa FT4 (czerwona/pomarańczowa) */}
        <path
          d="M 60 115 C 100 35, 160 30, 220 115 C 280 185, 360 185, 420 135 C 480 115, 560 115, 640 115"
          fill="none"
          stroke="#c75030"
          strokeWidth="3.5"
        />
        <text x="120" y="70" fill="#c75030" fontWeight="700" fontSize="12">FT4 (uwalnianie)</text>

        {/* Krzywa TSH (turkusowa/zielona) */}
        <path
          d="M 60 115 C 100 190, 160 195, 220 160 C 280 40, 360 45, 420 95 C 480 115, 560 115, 640 115"
          fill="none"
          stroke="#187765"
          strokeWidth="3"
          strokeDasharray="6 3"
        />
        <text x="320" y="85" fill="#187765" fontWeight="700" fontSize="12">TSH (odpowiedź)</text>

        {/* Oś czasu */}
        <text x="140" y="235" textAnchor="middle" fill="#586f64" fontSize="11">0 – 6 tygodni</text>
        <text x="320" y="235" textAnchor="middle" fill="#586f64" fontSize="11">6 – 12 tygodni</text>
        <text x="530" y="235" textAnchor="middle" fill="#586f64" fontSize="11">3 – 6 miesięcy</text>
      </svg>
    </figure>
  );
}

// 4. Wizualny przewodnik USG guzków wg skali EU-TIRADS
export function EuTiradsVisualGuide() {
  const tiers = [
    { tier: 'EU-TIRADS 2', label: 'Łagodne', risk: '<1%', bacc: 'Brak wskazań', color: '#3b8266', desc: 'Czysto płynowe torbiele, zmiany gąbczaste.' },
    { tier: 'EU-TIRADS 3', label: 'Niskie ryzyko', risk: '2–4%', bacc: '>20 mm', color: '#558b6e', desc: 'Owalne, izo-/hiperechogeniczne, gładkie granice.' },
    { tier: 'EU-TIRADS 4', label: 'Pośrednie', risk: '6–17%', bacc: '>15 mm', color: '#b88a44', desc: 'Umiarkowanie hipoechogeniczne, owalne.' },
    { tier: 'EU-TIRADS 5', label: 'Wysokie ryzyko', risk: '26–87%', bacc: '>10 mm', color: '#c24b38', desc: 'Wyższa niż szersza, mikrozwapnienia, nierówne granice.' },
  ];

  return (
    <figure className="diagram-container">
      <figcaption className="diagram-caption">
        <strong>Rycina 4.</strong> Klasyfikacja ultrasonograficzna guzków tarczycy EU-TIRADS i kryteria kwalifikacji do BACC (ETA 2023).
      </figcaption>
      <div className="eutirads-grid">
        {tiers.map(t => (
          <div key={t.tier} className="eutirads-card" style={{ borderTop: `4px solid ${t.color}` }}>
            <div className="eutirads-header">
              <strong>{t.tier}</strong>
              <span className="eutirads-pill" style={{ background: `${t.color}18`, color: t.color }}>{t.label}</span>
            </div>
            <p className="eutirads-desc">{t.desc}</p>
            <div className="eutirads-stats">
              <div>
                <small>Ryzyko złośliwości</small>
                <strong>{t.risk}</strong>
              </div>
              <div>
                <small>Próg BACC</small>
                <strong style={{ color: t.color }}>{t.bacc}</strong>
              </div>
            </div>
          </div>
        ))}
      </div>
    </figure>
  );
}
