'use client';

// 4. Algorytm Diagnostyczny Zespołu Cushinga
export function CushingDiagnosticPathway() {
  return (
    <figure className="diagram-container">
      <figcaption className="diagram-caption">
        <strong>Rycina 4.</strong> Kaskada diagnostyczna podejrzenia hiperkortyzolemii i różnicowania choroby Cushinga.
      </figcaption>
      <svg viewBox="0 0 700 340" className="medical-svg" role="img" aria-label="Algorytm diagnostyczny zespołu Cushinga">
        {/* Krok 1: Przesiew */}
        <rect x="20" y="20" width="200" height="75" rx="8" fill="#edf4f0" stroke="#7eb598" strokeWidth="2" />
        <text x="120" y="45" textAnchor="middle" fill="#1b4535" fontWeight="700" fontSize="13">
          1. TESTY PRZESIEWOWE
        </text>
        <text x="120" y="65" textAnchor="middle" fill="#3f6655" fontSize="11">
          • 1 mg DEX nocny (kortyzol &gt;1,8)
        </text>
        <text x="120" y="80" textAnchor="middle" fill="#3f6655" fontSize="11">
          • UFC (24h mocz) lub ślina o 23:00
        </text>

        {/* Strzałka w prawo */}
        <path d="M 220 57 L 260 57" stroke="#187765" strokeWidth="2.5" />
        <polygon points="265,57 255,52 255,62" fill="#187765" />

        {/* Krok 2: Oznaczenie ACTH */}
        <rect x="270" y="20" width="190" height="75" rx="8" fill="#eef3f7" stroke="#7ea3c4" strokeWidth="2" />
        <text x="365" y="45" textAnchor="middle" fill="#1d3d59" fontWeight="700" fontSize="13">
          2. POMIAR ACTH (8:00)
        </text>
        <text x="365" y="65" textAnchor="middle" fill="#42637f" fontSize="11">
          Rozróżnienie formy
        </text>
        <text x="365" y="80" textAnchor="middle" fill="#42637f" fontSize="11">
          zależnej vs niezależnej
        </text>

        {/* Gałąź ACTH < 5 (niezależna) */}
        <path d="M 365 95 L 365 150 L 290 150" stroke="#c05621" strokeWidth="2" />
        <polygon points="285,150 295,145 295,155" fill="#c05621" />
        <rect x="130" y="125" width="150" height="50" rx="6" fill="#fcf3ed" stroke="#d69372" strokeWidth="1.5" />
        <text x="205" y="145" textAnchor="middle" fill="#8a3c17" fontWeight="700" fontSize="11">ACTH &lt; 5 pg/ml</text>
        <text x="205" y="162" textAnchor="middle" fill="#8a3c17" fontSize="10">Guz kory nadnercza (TK)</text>

        {/* Gałąź ACTH >= 15-20 (zależna) */}
        <path d="M 460 57 L 500 57" stroke="#187765" strokeWidth="2.5" />
        <polygon points="505,57 495,52 495,62" fill="#187765" />

        {/* Krok 3: Różnicowanie przysadka vs ektopia */}
        <rect x="510" y="20" width="170" height="75" rx="8" fill="#fdf8ed" stroke="#d5b46b" strokeWidth="2" />
        <text x="595" y="45" textAnchor="middle" fill="#694d12" fontWeight="700" fontSize="12">
          ACTH &gt; 15–20 pg/ml
        </text>
        <text x="595" y="65" textAnchor="middle" fill="#876826" fontSize="11">
          Zespół ACTH-zależny
        </text>
        <text x="595" y="80" textAnchor="middle" fill="#876826" fontSize="10">
          MRI przysadki / test CRH
        </text>

        {/* Podsumowanie dolne */}
        <rect x="250" y="210" width="430" height="105" rx="8" fill="#fff" stroke="#90a89c" strokeWidth="1.5" />
        <text x="465" y="235" textAnchor="middle" fill="#187765" fontWeight="700" fontSize="13">
          CHOROBA CUSHINGA (90% mikrogruczolak przysadki)
        </text>
        <text x="465" y="255" textAnchor="middle" fill="#4d6f5c" fontSize="11">
          • Wzrost ACTH i kortyzolu w teście z CRH
        </text>
        <text x="465" y="272" textAnchor="middle" fill="#4d6f5c" fontSize="11">
          • W razie wątpliwości lub guzka &lt;6 mm: BIPSS (cewnikowanie zatok skalistych dolnych)
        </text>
        <text x="465" y="295" textAnchor="middle" fill="#187765" fontWeight="600" fontSize="11">
          Leczenie z wyboru: Selektywna resekcja przezklinowa (TSS)
        </text>
      </svg>
    </figure>
  );
}

// 5. Macierz gospodarki wodnej (DI vs SIADH)
export function WaterBalanceMatrix() {
  return (
    <figure className="diagram-container">
      <figcaption className="diagram-caption">
        <strong>Rycina 5.</strong> Różnicowanie zaburzeń gospodarki wodnej i wazopresyny (AVP).
      </figcaption>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Parametr</th>
              <th>Moczówka centralna</th>
              <th>Moczówka nerkowa</th>
              <th>Polidypsja psychogenna</th>
              <th>Zespół SIADH</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Sód w surowicy (Na+)</strong></td>
              <td>Podwyższony / g. granica (&gt;144)</td>
              <td>Podwyższony / g. granica</td>
              <td>Niski-prawidłowy (&lt;137)</td>
              <td><strong>Głęboka hiponatremia (&lt;130)</strong></td>
            </tr>
            <tr>
              <td><strong>Osmolalność osocza</strong></td>
              <td>&gt;295–300 mOsm/kg</td>
              <td>&gt;295–300 mOsm/kg</td>
              <td>&lt;280 mOsm/kg</td>
              <td><strong>&lt;275 mOsm/kg (hipoosmolalność)</strong></td>
            </tr>
            <tr>
              <td><strong>Osmolalność moczu</strong></td>
              <td>&lt;300 mOsm/kg (rozcieńczony)</td>
              <td>&lt;300 mOsm/kg (rozcieńczony)</td>
              <td>&lt;200 mOsm/kg</td>
              <td><strong>&gt;100–300 mOsm/kg (nieadekwatna)</strong></td>
            </tr>
            <tr>
              <td><strong>Reakcja na dDAVP</strong></td>
              <td><strong>Wzrost osmolalności &gt;50%</strong></td>
              <td>Brak reakcji (&lt;50%)</td>
              <td>Mocz zagęszcza się bez leku</td>
              <td>Przeciwwskazana!</td>
            </tr>
            <tr>
              <td><strong>Podstawa leczenia</strong></td>
              <td>Desmopresyna (dDAVP)</td>
              <td>Tiazydy, dieta niskosodowa</td>
              <td>Ograniczenie picia płynów</td>
              <td><strong>Restrykcja płynów (max 8–10 mmol/24h!)</strong></td>
            </tr>
          </tbody>
        </table>
      </div>
    </figure>
  );
}

// 6. Zespół Sheehana
export function SheehanSyndromeDiagram() {
  return (
    <figure className="diagram-container">
      <figcaption className="diagram-caption">
        <strong>Rycina 6.</strong> Patofizjologia zespołu Sheehana (poporodowej martwicy niedokrwiennej przysadki).
      </figcaption>
      <svg viewBox="0 0 680 200" className="medical-svg" role="img" aria-label="Patofizjologia zespołu Sheehana">
        {/* Krok 1 */}
        <rect x="20" y="40" width="180" height="90" rx="8" fill="#fcf6ed" stroke="#deb887" strokeWidth="2" />
        <text x="110" y="65" textAnchor="middle" fill="#694a18" fontWeight="700" fontSize="12">
          1. CIĄŻA
        </text>
        <text x="110" y="85" textAnchor="middle" fill="#856127" fontSize="11">
          Fizjologiczny rozrost laktotrofów
        </text>
        <text x="110" y="103" textAnchor="middle" fill="#856127" fontSize="11">
          Objętość przysadki +100%
        </text>
        <text x="110" y="120" textAnchor="middle" fill="#856127" fontSize="10">
          Wysokie zapotrzebowanie na O2
        </text>

        {/* Strzałka */}
        <path d="M 200 85 L 240 85" stroke="#c05621" strokeWidth="2.5" />
        <polygon points="245,85 235,80 235,90" fill="#c05621" />

        {/* Krok 2 */}
        <rect x="250" y="40" width="180" height="90" rx="8" fill="#fbebe6" stroke="#d96b43" strokeWidth="2" />
        <text x="340" y="65" textAnchor="middle" fill="#852912" fontWeight="700" fontSize="12">
          2. KRWOTOK PORODOWY
        </text>
        <text x="340" y="85" textAnchor="middle" fill="#a84328" fontSize="11">
          Wstrząs hipowolemiczny
        </text>
        <text x="340" y="103" textAnchor="middle" fill="#a84328" fontSize="11">
          Gwałtowny spadek perfuzji
        </text>
        <text x="340" y="120" textAnchor="middle" fill="#a84328" fontSize="10">
          Skurcz tętnic przysadkowych
        </text>

        {/* Strzałka */}
        <path d="M 430 85 L 470 85" stroke="#c05621" strokeWidth="2.5" />
        <polygon points="475,85 465,80 465,90" fill="#c05621" />

        {/* Krok 3 */}
        <rect x="480" y="40" width="180" height="90" rx="8" fill="#edf2f6" stroke="#7998b3" strokeWidth="2" />
        <text x="570" y="65" textAnchor="middle" fill="#1e3e57" fontWeight="700" fontSize="12">
          3. PUSTE SIODŁO
        </text>
        <text x="570" y="85" textAnchor="middle" fill="#3c5f7d" fontSize="11">
          Martwica niedokrwienna
        </text>
        <text x="570" y="103" textAnchor="middle" fill="#3c5f7d" fontSize="11">
          Agalakcja (brak nawału)
        </text>
        <text x="570" y="120" textAnchor="middle" fill="#3c5f7d" fontSize="10">
          Panhipopituitaryzm (Sheehan)
        </text>

        {/* Ostrzeżenie na dole */}
        <text x="340" y="175" textAnchor="middle" fill="#c05621" fontWeight="700" fontSize="12">
          Zasada ratunkowa: Zawsze podaj hydrokortyzon PRZED lewotyroksyną!
        </text>
      </svg>
    </figure>
  );
}
