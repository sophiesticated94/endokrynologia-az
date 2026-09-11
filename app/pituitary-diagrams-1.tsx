'use client';

// 1. Anatomia Siodła Tureckiego i Przysadki
export function PituitaryAnatomyDiagram() {
  return (
    <figure className="diagram-container">
      <figcaption className="diagram-caption">
        <strong>Rycina 1.</strong> Anatomia siodła tureckiego, skrzyżowania wzrokowego oraz krążenia wrotnego przysadki.
      </figcaption>
      <svg viewBox="0 0 700 360" className="medical-svg" role="img" aria-label="Anatomia siodła tureckiego i przysadki">
        {/* Tło i kość klinowa (sella turcica) */}
        <path
          d="M 120 180 C 140 280, 460 280, 480 180 L 530 180 L 530 330 L 70 330 L 70 180 Z"
          fill="#f3efe8"
          stroke="#cfc5b4"
          strokeWidth="2.5"
        />
        <text x="300" y="315" textAnchor="middle" fill="#8c7e68" fontSize="13" fontWeight="600">
          Kość klinowa (dno siodła tureckiego — sella turcica)
        </text>

        {/* Podwzgórze (u góry) */}
        <path d="M 200 40 Q 300 30 400 40 Q 330 90 270 90 Z" fill="#eaf4ef" stroke="#7eb598" strokeWidth="2" />
        <text x="300" y="60" textAnchor="middle" fill="#1c4838" fontWeight="700" fontSize="14">
          PODWZGÓRZE
        </text>
        <text x="300" y="78" textAnchor="middle" fill="#426b58" fontSize="11">
          Jądra paraventricularis & supraopticus (AVP, OXT) + statyny/liberyny
        </text>

        {/* Skrzyżowanie wzrokowe (Chiasma opticum) tuż nad siodłem */}
        <rect x="230" y="105" width="140" height="24" rx="12" fill="#fdf3e7" stroke="#dc8b3b" strokeWidth="2" />
        <text x="300" y="121" textAnchor="middle" fill="#9c4e12" fontWeight="700" fontSize="11">
          Skrzyżowanie wzrokowe (Chiasma)
        </text>

        {/* Szypuła przysadki (Infundibulum) */}
        <path d="M 285 90 L 285 160 L 315 160 L 315 90 Z" fill="#dceae2" stroke="#60977e" strokeWidth="1.5" />
        <text x="365" y="145" fill="#2d6e53" fontSize="11" fontWeight="600">
          Szypuła (lejek) & naczynia wrotne
        </text>

        {/* Płat przedni (Adenohypophysis) */}
        <path
          d="M 210 165 C 190 240, 290 260, 305 250 L 305 165 Z"
          fill="#dcedf7"
          stroke="#528bab"
          strokeWidth="2.5"
        />
        <text x="255" y="195" textAnchor="middle" fill="#1b4965" fontWeight="700" fontSize="13">
          Przedni płat
        </text>
        <text x="255" y="215" textAnchor="middle" fill="#3d6c87" fontSize="11">
          (Adenohypophysis)
        </text>
        <text x="255" y="235" textAnchor="middle" fill="#1b4965" fontSize="10" fontWeight="600">
          GH, ACTH, TSH, PRL, LH, FSH
        </text>

        {/* Płat tylny (Neurohypophysis) */}
        <path
          d="M 305 165 L 305 250 C 320 260, 400 240, 385 165 Z"
          fill="#fbf0e8"
          stroke="#c98a58"
          strokeWidth="2.5"
        />
        <text x="345" y="195" textAnchor="middle" fill="#7a4115" fontWeight="700" fontSize="13">
          Tylny płat
        </text>
        <text x="345" y="215" textAnchor="middle" fill="#965c2b" fontSize="11">
          (Neurohypophysis)
        </text>
        <text x="345" y="235" textAnchor="middle" fill="#7a4115" fontSize="10" fontWeight="600">
          Magazyn AVP & OXT
        </text>

        {/* Zatoki jamiste (boczne) */}
        <rect x="70" y="190" width="100" height="75" rx="8" fill="#e8ecf4" stroke="#899dc2" strokeWidth="2" />
        <text x="120" y="215" textAnchor="middle" fill="#2b4370" fontWeight="700" fontSize="11">
          Zatoka jamista L
        </text>
        <text x="120" y="233" textAnchor="middle" fill="#4d618a" fontSize="10">
          N. III, IV, VI, V1, V2
        </text>
        <text x="120" y="249" textAnchor="middle" fill="#4d618a" fontSize="10">
          A. carotis interna
        </text>

        <rect x="430" y="190" width="100" height="75" rx="8" fill="#e8ecf4" stroke="#899dc2" strokeWidth="2" />
        <text x="480" y="215" textAnchor="middle" fill="#2b4370" fontWeight="700" fontSize="11">
          Zatoka jamista P
        </text>
        <text x="480" y="233" textAnchor="middle" fill="#4d618a" fontSize="10">
          N. III, IV, VI, V1, V2
        </text>
        <text x="480" y="249" textAnchor="middle" fill="#4d618a" fontSize="10">
          A. carotis interna
        </text>

        {/* Klawisz orientacyjny */}
        <path d="M 570 60 L 670 60" stroke="#b0bebe" strokeWidth="1.5" />
        <text x="620" y="52" textAnchor="middle" fill="#657b7b" fontSize="11" fontWeight="600">
          KIERUNEK WZROSTU
        </text>
        <text x="620" y="80" textAnchor="middle" fill="#c05621" fontSize="11" fontWeight="600">
          ↑ Nadsiodłowy: ucisk chiasmy
        </text>
        <text x="620" y="100" textAnchor="middle" fill="#315582" fontSize="11" fontWeight="600">
          ↔ Boczny: zatoka jamista (Knosp)
        </text>
        <text x="620" y="120" textAnchor="middle" fill="#586b61" fontSize="11" fontWeight="600">
          ↓ Podsiodłowy: zatoka klinowa
        </text>
      </svg>
    </figure>
  );
}

// 2. Skrzyżowanie wzrokowe i niedowidzenie połowicze dwuskroniowe
export function ChiasmFieldDiagram() {
  return (
    <figure className="diagram-container">
      <figcaption className="diagram-caption">
        <strong>Rycina 2.</strong> Mechanizm niedowidzenia połowiczego dwuskroniowego: ucisk guza na skrzyżowane włókna nosowe siatkówki.
      </figcaption>
      <svg viewBox="0 0 680 320" className="medical-svg" role="img" aria-label="Skrzyżowanie wzrokowe i hemianopsia dwuskroniowa">
        {/* Gałki oczne (u góry) */}
        {/* Oko lewe */}
        <circle cx="210" cy="50" r="32" fill="#fff" stroke="#507261" strokeWidth="2" />
        <path d="M 178 50 A 32 32 0 0 1 210 18 L 210 50 Z" fill="#e3edf7" opacity="0.7" />
        <text x="210" y="55" textAnchor="middle" fontSize="12" fontWeight="700" fill="#2d4538">
          Oko Lewe
        </text>
        {/* Oko prawe */}
        <circle cx="470" cy="50" r="32" fill="#fff" stroke="#507261" strokeWidth="2" />
        <path d="M 502 50 A 32 32 0 0 0 470 18 L 470 50 Z" fill="#e3edf7" opacity="0.7" />
        <text x="470" y="55" textAnchor="middle" fontSize="12" fontWeight="700" fill="#2d4538">
          Oko Prawe
        </text>

        {/* Nerwy wzrokowe biegnące do skrzyżowania */}
        {/* Nieskrzyżowane włókna skroniowe (boczne, widzą nosowe pole) */}
        <path d="M 185 65 C 185 130, 260 170, 260 210" fill="none" stroke="#3273a8" strokeWidth="3" />
        <path d="M 495 65 C 495 130, 420 170, 420 210" fill="none" stroke="#3273a8" strokeWidth="3" />

        {/* Skrzyżowane włókna nosowe (widzą pole skroniowe!) */}
        <path d="M 235 65 C 235 120, 410 145, 410 210" fill="none" stroke="#d9534f" strokeWidth="3.5" strokeDasharray="6 3" />
        <path d="M 445 65 C 445 120, 270 145, 270 210" fill="none" stroke="#d9534f" strokeWidth="3.5" strokeDasharray="6 3" />

        {/* Guz uciskający skrzyżowanie od dołu */}
        <circle cx="340" cy="140" r="30" fill="#fbebe6" stroke="#c94a29" strokeWidth="2.5" />
        <text x="340" y="137" textAnchor="middle" fill="#962d14" fontWeight="800" fontSize="11">
          GUZ
        </text>
        <text x="340" y="152" textAnchor="middle" fill="#962d14" fontSize="10" fontWeight="600">
          (makrogruczolak)
        </text>

        {/* Strzałki ucisku */}
        <path d="M 340 110 L 340 92" stroke="#c94a29" strokeWidth="3" />
        <polygon points="340,88 335,97 345,97" fill="#c94a29" />

        {/* Perymetria - Pole widzenia (wynik badania) */}
        {/* Lewe pole widzenia */}
        <g transform="translate(60, 180)">
          <circle cx="50" cy="50" r="40" fill="#eef3f0" stroke="#7e9e8b" strokeWidth="2" />
          {/* Ubytek w polu skroniowym (lewa połowa lewego oka) */}
          <path d="M 50 10 A 40 40 0 0 0 50 90 Z" fill="#2d3748" opacity="0.85" />
          <text x="50" y="110" textAnchor="middle" fontSize="11" fontWeight="700" fill="#395244">
            Pole oka lewego
          </text>
          <text x="25" y="55" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="700">
            MROCZEK
          </text>
        </g>

        {/* Prawe pole widzenia */}
        <g transform="translate(500, 180)">
          <circle cx="50" cy="50" r="40" fill="#eef3f0" stroke="#7e9e8b" strokeWidth="2" />
          {/* Ubytek w polu skroniowym (prawa połowa prawego oka) */}
          <path d="M 50 10 A 40 40 0 0 1 50 90 Z" fill="#2d3748" opacity="0.85" />
          <text x="50" y="110" textAnchor="middle" fontSize="11" fontWeight="700" fill="#395244">
            Pole oka prawego
          </text>
          <text x="75" y="55" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="700">
            MROCZEK
          </text>
        </g>

        {/* Etykieta podsumowująca */}
        <rect x="200" y="240" width="280" height="55" rx="8" fill="#f8faf9" stroke="#b9cec2" strokeWidth="1.5" />
        <text x="340" y="262" textAnchor="middle" fill="#187765" fontWeight="700" fontSize="13">
          Hemianopsia bitemporalis
        </text>
        <text x="340" y="280" textAnchor="middle" fill="#4d6f5c" fontSize="11">
          Niedowidzenie połowicze dwuskroniowe
        </text>
      </svg>
    </figure>
  );
}

// 3. Krzywa supresji GH w teście OGTT (Akromegalia)
export function OgttGrowthHormoneCurve() {
  return (
    <figure className="diagram-container">
      <figcaption className="diagram-caption">
        <strong>Rycina 3.</strong> Doustny test tolerancji glukozy (OGTT 75 g) w diagnostyce akromegalii: prawidłowa supresja vs brak hamowania.
      </figcaption>
      <svg viewBox="0 0 680 280" className="medical-svg" role="img" aria-label="Wykres testu OGTT z oceną hormonu wzrostu">
        {/* Osie wykresu */}
        <line x1="80" y1="210" x2="620" y2="210" stroke="#9bb3a8" strokeWidth="2" />
        <line x1="80" y1="30" x2="80" y2="210" stroke="#9bb3a8" strokeWidth="2" />

        {/* Etykiety osi X (czas w minutach) */}
        <text x="80" y="230" textAnchor="middle" fontSize="12" fill="#5b7367">0&apos;</text>
        <text x="215" y="230" textAnchor="middle" fontSize="12" fill="#5b7367">30&apos;</text>
        <text x="350" y="230" textAnchor="middle" fontSize="12" fill="#5b7367">60&apos;</text>
        <text x="485" y="230" textAnchor="middle" fontSize="12" fill="#5b7367">90&apos;</text>
        <text x="610" y="230" textAnchor="middle" fontSize="12" fill="#5b7367">120&apos;</text>
        <text x="350" y="255" textAnchor="middle" fontSize="12" fontWeight="700" fill="#2d4538">
          Czas po obciążeniu 75 g glukozy (minuty)
        </text>

        {/* Etykiety osi Y (GH w ug/l) */}
        <text x="70" y="215" textAnchor="end" fontSize="11" fill="#5b7367">0</text>
        <text x="70" y="175" textAnchor="end" fontSize="11" fill="#187765" fontWeight="700">1,0</text>
        <text x="70" y="125" textAnchor="end" fontSize="11" fill="#5b7367">5,0</text>
        <text x="70" y="65" textAnchor="end" fontSize="11" fill="#5b7367">10,0</text>
        <text x="25" y="120" textAnchor="middle" fontSize="12" fontWeight="700" fill="#2d4538" transform="rotate(-90 25 120)">
          GH (µg/l)
        </text>

        {/* Linia odcięcia normy 1.0 ug/l */}
        <line x1="80" y1="175" x2="620" y2="175" stroke="#187765" strokeWidth="1.5" strokeDasharray="5 3" />
        <text x="590" y="168" textAnchor="end" fill="#187765" fontSize="11" fontWeight="700">
          Próg odcięcia supresji: &lt;1,0 µg/l (lub &lt;0,4 µg/l)
        </text>

        {/* Krzywa zdrowa (zielona) */}
        <path d="M 80 160 Q 200 200, 350 204 T 610 205" fill="none" stroke="#187765" strokeWidth="3.5" />
        <circle cx="80" cy="160" r="5" fill="#187765" />
        <circle cx="215" cy="195" r="5" fill="#187765" />
        <circle cx="350" cy="204" r="5" fill="#187765" />
        <circle cx="485" cy="205" r="5" fill="#187765" />
        <circle cx="610" cy="205" r="5" fill="#187765" />
        <text x="460" y="195" fill="#187765" fontSize="12" fontWeight="700">
          Osoba zdrowa (pełna supresja GH)
        </text>

        {/* Krzywa akromegalii (czerwona) */}
        <path d="M 80 70 Q 215 80, 350 85 T 610 95" fill="none" stroke="#c05621" strokeWidth="3.5" />
        <circle cx="80" cy="70" r="5" fill="#c05621" />
        <circle cx="215" cy="80" r="5" fill="#c05621" />
        <circle cx="350" cy="85" r="5" fill="#c05621" />
        <circle cx="485" cy="90" r="5" fill="#c05621" />
        <circle cx="610" cy="95" r="5" fill="#c05621" />
        <text x="350" y="70" textAnchor="middle" fill="#c05621" fontSize="12" fontWeight="700">
          Akromegalia (brak supresji autonomicznego GH)
        </text>
      </svg>
    </figure>
  );
}
