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

// 5. Schemat orbitopatii tarczycowej (Graves' Orbitopathy)
export function OrbitopathyEyeDiagram() {
  return (
    <figure className="diagram-container">
      <figcaption className="diagram-caption">
        <strong>Rycina 5.</strong> Patomechanizm orbitopatii w chorobie Gravesa-Basedowa: obrzęk mięśni zagałkowych i zagrożenie nerwu wzrokowego.
      </figcaption>
      <svg viewBox="0 0 660 260" className="medical-svg" role="img" aria-label="Schemat orbitopatii Gravesa">
        <rect x="40" y="20" width="580" height="220" fill="#f8faf9" stroke="#dbe5df" strokeWidth="1.5" rx="8" />

        {/* Stożek oczodołu (ściany kostne) */}
        <polygon points="120,40 460,40 280,220 120,40" fill="#eae8e2" stroke="#bbb4a4" strokeWidth="2" opacity="0.35" />

        {/* Gałka oczna prawidłowa vs wytrzeszcz */}
        <circle cx="430" cy="130" r="55" fill="#fff" stroke="#688478" strokeWidth="2" />
        <circle cx="465" cy="130" r="18" fill="#42788e" />
        <circle cx="470" cy="130" r="8" fill="#1b2a30" />
        <text x="430" y="135" textAnchor="middle" fill="#607d72" fontSize="11">Gałka oczna</text>

        {/* Przerośnięte mięśnie gałkoruchowe (górny i dolny) */}
        {/* Mięsień prosty górny */}
        <path d="M 230 130 Q 320 60 410 85 Q 350 75 230 130" fill="#cb6a55" stroke="#a74a36" strokeWidth="1.5" />
        <text x="320" y="55" fill="#933b28" fontWeight="700" fontSize="11">Pogrubiały mięsień prosty górny</text>

        {/* Mięsień prosty dolny */}
        <path d="M 230 130 Q 320 200 410 175 Q 350 185 230 130" fill="#cb6a55" stroke="#a74a36" strokeWidth="1.5" />
        <text x="320" y="215" fill="#933b28" fontWeight="700" fontSize="11">Pogrubiały mięsień prosty dolny</text>

        {/* Nerw wzrokowy u szczytu oczodołu */}
        <path d="M 120 130 L 230 130" stroke="#caa237" strokeWidth="8" strokeLinecap="round" />
        <text x="140" y="115" fill="#8f701c" fontWeight="700" fontSize="11">Nerw wzrokowy (II)</text>
        <rect x="180" y="110" width="80" height="40" fill="none" stroke="#d63d27" strokeWidth="2" strokeDasharray="3 2" rx="4" />
        <text x="220" y="165" textAnchor="middle" fill="#c03822" fontWeight="700" fontSize="10">Strefa ucisku w szczycie!</text>

        {/* Znak ostrzegawczy */}
        <rect x="495" y="35" width="115" height="60" rx="6" fill="#fef2ee" stroke="#f0aa9b" />
        <text x="552" y="56" textAnchor="middle" fill="#a4331e" fontWeight="700" fontSize="11">ALARM OCZNY</text>
        <text x="552" y="73" textAnchor="middle" fill="#6d2315" fontSize="10">Zaburzenia barw</text>
        <text x="552" y="87" textAnchor="middle" fill="#6d2315" fontSize="10">Spadek ostrości wzroku</text>
      </svg>
    </figure>
  );
}

// 6. Krzywa hCG a TSH w I trymestrze ciąży
export function PregnancyThyroidCurve() {
  return (
    <figure className="diagram-container">
      <figcaption className="diagram-caption">
        <strong>Rycina 6.</strong> Fizjologia tarczycy w ciąży: szczyt stężenia hCG w 8–12. tygodniu powoduje przejściowy fizjologiczny spadek TSH.
      </figcaption>
      <svg viewBox="0 0 660 240" className="medical-svg" role="img" aria-label="Wykres hCG vs TSH w ciąży">
        <rect x="50" y="20" width="580" height="180" fill="#ffffff" stroke="#d9e4de" strokeWidth="1" rx="6" />

        {/* Szczyt hCG (fioletowa) */}
        <path
          d="M 50 170 C 130 170, 170 30, 220 30 C 270 30, 340 140, 630 150"
          fill="none"
          stroke="#795290"
          strokeWidth="3.5"
        />
        <text x="235" y="45" fill="#795290" fontWeight="700" fontSize="12">Stężenie hCG (szczyt 8–12 tydz.)</text>

        {/* Lustrzany spadek TSH (turkusowa) */}
        <path
          d="M 50 100 C 130 100, 170 180, 220 180 C 270 180, 340 95, 630 90"
          fill="none"
          stroke="#187765"
          strokeWidth="3"
        />
        <text x="235" y="195" fill="#187765" fontWeight="700" fontSize="12">Fizjologiczny spadek TSH</text>

        {/* Osie trymestrów */}
        <line x1="240" y1="20" x2="240" y2="200" stroke="#e0e8e4" strokeWidth="1" strokeDasharray="3 3" />
        <line x1="440" y1="20" x2="440" y2="200" stroke="#e0e8e4" strokeWidth="1" strokeDasharray="3 3" />

        <text x="140" y="222" textAnchor="middle" fill="#586f64" fontWeight="600" fontSize="11">I Trymestr (0–13 tyg.)</text>
        <text x="340" y="222" textAnchor="middle" fill="#586f64" fontWeight="600" fontSize="11">II Trymestr (14–27 tyg.)</text>
        <text x="535" y="222" textAnchor="middle" fill="#586f64" fontWeight="600" fontSize="11">III Trymestr (28–40 tyg.)</text>
      </svg>
    </figure>
  );
}

// 7. Pochodzenie komórkowe nowotworów tarczycy
export function CancerHistologyDiagram() {
  return (
    <figure className="diagram-container">
      <figcaption className="diagram-caption">
        <strong>Rycina 7.</strong> Pochodzenie histogenetyczne raków tarczycy: komórki pęcherzykowe vs komórki C.
      </figcaption>
      <div className="cancer-histo-grid">
        <div className="cancer-histo-box follicular">
          <div className="histo-tag">KOMÓRKI PĘCHERZYKOWE (95%)</div>
          <h3>Nowotwory z nabłonka pęcherzykowego</h3>
          <ul>
            <li><strong>Rak brodawkowaty (PTC, ~80–85%)</strong> — najczęstszy, powolny wzrost, przerzuty drogą chłonną do węzłów szyi.</li>
            <li><strong>Rak pęcherzykowy (FTC, ~10%)</strong> — rozsiew drogą krwionośną (kości, płuca).</li>
            <li><strong>Rak anaplastyczny (ATC, ~1–2%)</strong> — skrajnie złośliwy, gwałtowny naciek szyi, brak jodotransportera NIS.</li>
          </ul>
          <div className="histo-footer">
            <span>Marker: <strong>Tyreoglobulina (Tg)</strong></span>
            <span>Leczenie uzupełniające: <strong>Radiojod (131-I)</strong> (w PTC/FTC)</span>
          </div>
        </div>

        <div className="cancer-histo-box parafollicular">
          <div className="histo-tag para">KOMÓRKI PRZYPĘCHERZYKOWE C (5%)</div>
          <h3>Rak rdzeniasty tarczycy (MTC)</h3>
          <ul>
            <li>Wywodzi się z neuroendokrynnych komórek C wywodzących się z grzebienia nerwowego.</li>
            <li>W 25% występuje dziedzicznie w zespole <strong>MEN2 (mutacja genu RET)</strong>.</li>
            <li><strong>Nie wychwytuje radiojodu</strong> — radiojod jest całkowicie nieskuteczny!</li>
            <li>Przed operacją tarczycy w MEN2 należy bezwzględnie <strong>wykluczyć guz chromochłonny nadnerczy</strong>.</li>
          </ul>
          <div className="histo-footer">
            <span>Markery: <strong>Kalcytonina + CEA</strong></span>
            <span>Radiojod: <strong>Nieskuteczny</strong></span>
          </div>
        </div>
      </div>
    </figure>
  );
}

// 8. Wizualny wskaźnik laboratoryjny dla przypadków klinicznych
export type LabResultProps = {
  name: string;
  value: number;
  unit: string;
  min: number;
  max: number;
  scaleMin: number;
  scaleMax: number;
};

export function LabResultsGauge({ tests }: { tests: LabResultProps[] }) {
  return (
    <div className="lab-results-panel">
      <div className="lab-results-title">
        <span>Wyniki badań laboratoryjnych pacjenta</span>
        <small>Pasek referencyjny i ocena odchylenia</small>
      </div>

      <div className="lab-gauges-list">
        {tests.map(t => {
          const isLow = t.value < t.min;
          const isHigh = t.value > t.max;
          const isNormal = !isLow && !isHigh;

          // Oblicz pozycję wskaźnika w %
          const clamped = Math.max(t.scaleMin, Math.min(t.scaleMax, t.value));
          const pct = ((clamped - t.scaleMin) / (t.scaleMax - t.scaleMin)) * 100;
          const normStart = ((t.min - t.scaleMin) / (t.scaleMax - t.scaleMin)) * 100;
          const normWidth = ((t.max - t.min) / (t.scaleMax - t.scaleMin)) * 100;

          return (
            <div key={t.name} className="lab-gauge-row">
              <div className="lab-gauge-header">
                <strong>{t.name}</strong>
                <span className={`lab-gauge-badge ${isLow ? 'low' : isHigh ? 'high' : 'normal'}`}>
                  {t.value} {t.unit} ({isLow ? 'PONIŻEJ NORMY' : isHigh ? 'POWYŻEJ NORMY' : 'W NORMIE'})
                </span>
              </div>

              <div className="lab-track-wrap">
                <div className="lab-track">
                  {/* Zakres normy */}
                  <div
                    className="lab-norm-zone"
                    style={{ left: `${normStart}%`, width: `${normWidth}%` }}
                    title={`Norma: ${t.min}–${t.max} ${t.unit}`}
                  />
                  {/* Wskaźnik pacjenta */}
                  <div
                    className={`lab-pointer ${isLow ? 'low' : isHigh ? 'high' : 'normal'}`}
                    style={{ left: `${pct}%` }}
                  />
                </div>
                <div className="lab-track-labels">
                  <span>{t.scaleMin}</span>
                  <span style={{ left: `${normStart}%` }}>{t.min}</span>
                  <span style={{ left: `${normStart + normWidth}%` }}>{t.max}</span>
                  <span>{t.scaleMax}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export const caseLabs: Record<string, LabResultProps[]> = {
  'case-fizjologia': [
    { name: 'TSH', value: 1.8, unit: 'mIU/l', min: 0.4, max: 4.0, scaleMin: 0, scaleMax: 10 },
    { name: 'FT4', value: 16.0, unit: 'pmol/l', min: 12.0, max: 22.0, scaleMin: 5, scaleMax: 35 },
    { name: 'Całkowite T4', value: 185.0, unit: 'nmol/l', min: 60.0, max: 150.0, scaleMin: 40, scaleMax: 220 },
  ],
  'case-diagnostyka': [
    { name: 'TSH', value: 1.1, unit: 'mIU/l', min: 0.4, max: 4.0, scaleMin: 0, scaleMax: 10 },
    { name: 'FT4', value: 7.0, unit: 'pmol/l', min: 12.0, max: 22.0, scaleMin: 0, scaleMax: 30 },
  ],
  'case-niedoczynnosc': [
    { name: 'TSH', value: 24.0, unit: 'mIU/l', min: 0.4, max: 4.0, scaleMin: 0, scaleMax: 40 },
    { name: 'FT4', value: 6.0, unit: 'pmol/l', min: 12.0, max: 22.0, scaleMin: 0, scaleMax: 30 },
    { name: 'anty-TPO', value: 450.0, unit: 'IU/ml', min: 0.0, max: 34.0, scaleMin: 0, scaleMax: 600 },
  ],
  'case-hashimoto': [
    { name: 'TSH', value: 2.2, unit: 'mIU/l', min: 0.4, max: 4.0, scaleMin: 0, scaleMax: 10 },
    { name: 'FT4', value: 17.0, unit: 'pmol/l', min: 12.0, max: 22.0, scaleMin: 5, scaleMax: 30 },
    { name: 'anty-TPO', value: 380.0, unit: 'IU/ml', min: 0.0, max: 34.0, scaleMin: 0, scaleMax: 500 },
  ],
  'case-nadczynnosc': [
    { name: 'TSH', value: 0.01, unit: 'mIU/l', min: 0.4, max: 4.0, scaleMin: 0, scaleMax: 10 },
    { name: 'FT4', value: 29.0, unit: 'pmol/l', min: 12.0, max: 22.0, scaleMin: 5, scaleMax: 45 },
    { name: 'TRAb', value: 0.8, unit: 'IU/l', min: 0.0, max: 1.75, scaleMin: 0, scaleMax: 10 },
  ],
  'case-graves': [
    { name: 'TSH', value: 0.01, unit: 'mIU/l', min: 0.4, max: 4.0, scaleMin: 0, scaleMax: 10 },
    { name: 'FT4', value: 36.0, unit: 'pmol/l', min: 12.0, max: 22.0, scaleMin: 5, scaleMax: 50 },
    { name: 'TRAb', value: 9.4, unit: 'IU/l', min: 0.0, max: 1.75, scaleMin: 0, scaleMax: 15 },
  ],
  'case-zapalenia': [
    { name: 'TSH', value: 0.03, unit: 'mIU/l', min: 0.4, max: 4.0, scaleMin: 0, scaleMax: 10 },
    { name: 'FT4', value: 27.0, unit: 'pmol/l', min: 12.0, max: 22.0, scaleMin: 5, scaleMax: 40 },
    { name: 'CRP', value: 48.0, unit: 'mg/l', min: 0.0, max: 5.0, scaleMin: 0, scaleMax: 80 },
  ],
  'case-guzki': [
    { name: 'TSH', value: 1.6, unit: 'mIU/l', min: 0.4, max: 4.0, scaleMin: 0, scaleMax: 10 },
    { name: 'FT4', value: 15.5, unit: 'pmol/l', min: 12.0, max: 22.0, scaleMin: 5, scaleMax: 30 },
  ],
  'case-nowotwory': [
    { name: 'Kalcytonina', value: 145.0, unit: 'pg/ml', min: 0.0, max: 10.0, scaleMin: 0, scaleMax: 200 },
    { name: 'TSH', value: 1.9, unit: 'mIU/l', min: 0.4, max: 4.0, scaleMin: 0, scaleMax: 10 },
  ],
  'case-ciaza': [
    { name: 'TSH', value: 4.8, unit: 'mIU/l', min: 0.1, max: 2.5, scaleMin: 0, scaleMax: 10 },
    { name: 'FT4', value: 10.2, unit: 'pmol/l', min: 12.0, max: 22.0, scaleMin: 5, scaleMax: 30 },
  ],
  'case-leki': [
    { name: 'TSH', value: 0.01, unit: 'mIU/l', min: 0.4, max: 4.0, scaleMin: 0, scaleMax: 10 },
    { name: 'FT4', value: 42.0, unit: 'pmol/l', min: 12.0, max: 22.0, scaleMin: 5, scaleMax: 55 },
    { name: 'FT3', value: 8.0, unit: 'pmol/l', min: 3.1, max: 6.8, scaleMin: 1, scaleMax: 12 },
  ],
  'case-stany-nagle': [
    { name: 'TSH', value: 0.01, unit: 'mIU/l', min: 0.4, max: 4.0, scaleMin: 0, scaleMax: 10 },
    { name: 'FT4', value: 46.0, unit: 'pmol/l', min: 12.0, max: 22.0, scaleMin: 5, scaleMax: 60 },
    { name: 'Tętno', value: 154.0, unit: '/min', min: 60.0, max: 90.0, scaleMin: 40, scaleMax: 180 },
    { name: 'Temperatura', value: 39.5, unit: '°C', min: 36.6, max: 37.2, scaleMin: 35, scaleMax: 41 },
  ]
};
