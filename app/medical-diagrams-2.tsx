'use client';

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
