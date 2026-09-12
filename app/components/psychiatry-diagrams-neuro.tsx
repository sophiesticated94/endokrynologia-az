'use client';
import React from 'react';

export function DeliriumTimelineDiagram() {
  return (
    <div className="diagram-card p-4 bg-slate-50 border border-slate-200 rounded-xl my-4 text-slate-800">
      <div className="flex items-center justify-between mb-3 border-b border-slate-200 pb-2">
        <h4 className="font-semibold text-sm tracking-wide text-amber-900 uppercase">
          Oś Czasu i Dobowa Fluktuacja w Majaczeniu (Delirium Timeline)
        </h4>
        <span className="text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded font-medium">
          Dynamika: Godziny – Dni
        </span>
      </div>
      <div className="space-y-2 text-xs">
        <div className="p-2.5 bg-white rounded-lg border border-slate-200 shadow-sm">
          <div className="font-bold text-slate-900 mb-1">08:00 – Rano (Faza Hipoaktywna / Uspokojenie)</div>
          <p className="text-slate-600">Pacjent podsypiający, spowolniały psychoruchowo, apatyczny. Personel dzienny często nie zauważa patologii („pacjent grzeczny, odsypia operację”).</p>
        </div>
        <div className="p-2.5 bg-white rounded-lg border border-slate-200 shadow-sm">
          <div className="font-bold text-slate-900 mb-1">14:00 – Popołudnie (Okres Względnej Jasności / Lucid Interval)</div>
          <p className="text-slate-600">Krótkotrwała poprawa kontaktu, pacjent potrafi odpowiedzieć na proste pytania, lecz uwaga łatwo ulega rozproszeniu przy próbie odliczania wstecz.</p>
        </div>
        <div className="p-2.5 bg-amber-50 rounded-lg border border-amber-300 shadow-sm">
          <div className="font-bold text-amber-950 mb-1">20:00 – Zmierzch / Noc (Zjawisko Sundowning — Faza Hiperaktywna)</div>
          <p className="text-amber-900 font-medium">Gwałtowne załamanie orientacji po zmroku, lęk, omamy wzrokowe (cienie, robaki, obcy ludzie w sali), pobudzenie ruchowe, wyrywanie kaniul i próby ucieczki.</p>
        </div>
      </div>
      <div className="mt-3 text-[11px] text-slate-500 italic">
        Klucz semiotyczny: fluktuacja dobowego poziomu czuwania i uwagi jest kardynalnym wyznacznikiem odróżniającym majaczenie od stabilnego otępienia.
      </div>
    </div>
  );
}

export function DeliriumDementiaMatrixDiagram() {
  return (
    <div className="diagram-card p-4 bg-slate-50 border border-slate-200 rounded-xl my-4 text-slate-800">
      <div className="flex items-center justify-between mb-3 border-b border-slate-200 pb-2">
        <h4 className="font-semibold text-sm tracking-wide text-indigo-900 uppercase">
          Matryca Różnicowa: Delirium vs Otępienie vs Depresja
        </h4>
        <span className="text-xs bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded font-medium">
          8 Wymiarów Semiotycznych
        </span>
      </div>
      <div className="overflow-x-auto text-xs">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-slate-200 text-slate-700 text-left">
              <th className="p-2 border border-slate-300">Wymiar</th>
              <th className="p-2 border border-slate-300 bg-amber-100 text-amber-950">Majaczenie (Delirium)</th>
              <th className="p-2 border border-slate-300 bg-blue-100 text-blue-950">Otępienie (Dementia)</th>
              <th className="p-2 border border-slate-300 bg-emerald-100 text-emerald-950">Depresja wieku podeszłego</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-2 border border-slate-300 font-semibold">Początek</td>
              <td className="p-2 border border-slate-300">Nagły (godziny/dni)</td>
              <td className="p-2 border border-slate-300">Podstępny (miesiące/lata)</td>
              <td className="p-2 border border-slate-300">Tygodnie / miesiące</td>
            </tr>
            <tr>
              <td className="p-2 border border-slate-300 font-semibold">Przebieg</td>
              <td className="p-2 border border-slate-300">Znacznie falujący (doba)</td>
              <td className="p-2 border border-slate-300">Postępujący, stabilny</td>
              <td className="p-2 border border-slate-300">Poranne pogorszenie</td>
            </tr>
            <tr>
              <td className="p-2 border border-slate-300 font-semibold">Uwaga</td>
              <td className="p-2 border border-slate-300">Głęboko rozbita (inattention)</td>
              <td className="p-2 border border-slate-300">Względnie zachowana na początku</td>
              <td className="p-2 border border-slate-300">Spowolniona, lecz zachowana</td>
            </tr>
            <tr>
              <td className="p-2 border border-slate-300 font-semibold">Czujność (Arousal)</td>
              <td className="p-2 border border-slate-300">Zaburzona (senność / pobudzenie)</td>
              <td className="p-2 border border-slate-300">Prawidłowa we wczesnej fazie</td>
              <td className="p-2 border border-slate-300">Prawidłowa</td>
            </tr>
            <tr>
              <td className="p-2 border border-slate-300 font-semibold">Omamy</td>
              <td className="p-2 border border-slate-300">Częste wzrokowe / iluzje</td>
              <td className="p-2 border border-slate-300">Rzadkie we wczesnym stadium</td>
              <td className="p-2 border border-slate-300">Rzadkie (jedynie syntymiczne)</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function NeurocognitiveDifferentialDiagram() {
  return (
    <div className="diagram-card p-4 bg-slate-50 border border-slate-200 rounded-xl my-4 text-slate-800">
      <div className="flex items-center justify-between mb-3 border-b border-slate-200 pb-2">
        <h4 className="font-semibold text-sm tracking-wide text-cyan-900 uppercase">
          Mapa Wzorców Neurokognitywnych: AD vs VaD vs DLB vs FTD
        </h4>
        <span className="text-xs bg-cyan-100 text-cyan-800 px-2 py-0.5 rounded font-medium">
          Fenotypy Osiowe
        </span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
        <div className="p-2.5 bg-white rounded-lg border border-slate-200 shadow-sm">
          <div className="font-bold text-sky-800 mb-1">Choroba Alzheimera (AD)</div>
          <p className="text-slate-600">Podstępny początek, wczesny ubytek odraczania pamięci epizodycznej, późniejsza afazja, apraksja i agnozja. MTA w MRI.</p>
        </div>
        <div className="p-2.5 bg-white rounded-lg border border-slate-200 shadow-sm">
          <div className="font-bold text-indigo-800 mb-1">Otępienie naczyniowe (VaD / CSVD)</div>
          <p className="text-slate-600">Zwolnienie psychoruchowe, wczesna dysfunkcja wykonawcza, zaburzenia chodu, parcia naglące na mocz. Zmiany naczyniowe Fazekas.</p>
        </div>
        <div className="p-2.5 bg-white rounded-lg border border-slate-200 shadow-sm">
          <div className="font-bold text-amber-800 mb-1">Otępienie z ciałami Lewy’ego (DLB)</div>
          <p className="text-slate-600">Fluktuacje uwagi, uformowane omamy wzrokowe, zaburzenia snu REM (RBD), spontaniczny parkinsonizm, nadwrażliwość na leki D2.</p>
        </div>
        <div className="p-2.5 bg-white rounded-lg border border-slate-200 shadow-sm">
          <div className="font-bold text-purple-800 mb-1">Wariant behawioralny FTD (bvFTD)</div>
          <p className="text-slate-600">Odhamowanie, zanik empatii, hiperororalność, apatia po 55 r.ż. przy zachowanej pamięci w MMSE. Atrofia czołowo-skroniowa.</p>
        </div>
      </div>
    </div>
  );
}

export function HippocampalNetworkDiagram() {
  return (
    <div className="diagram-card p-4 bg-slate-50 border border-slate-200 rounded-xl my-4 text-slate-800">
      <div className="flex items-center justify-between mb-3 border-b border-slate-200 pb-2">
        <h4 className="font-semibold text-sm tracking-wide text-rose-900 uppercase">
          Model Progresji Sieciowej w Chorobie Alzheimera
        </h4>
        <span className="text-xs bg-rose-100 text-rose-800 px-2 py-0.5 rounded font-medium">
          SUPPORTED DISEASE MODEL
        </span>
      </div>
      <div className="space-y-2 text-xs">
        <div className="flex items-center gap-2">
          <span className="w-28 font-bold text-slate-700">Etap 1 (MCI):</span>
          <div className="flex-1 bg-white border border-slate-200 p-2 rounded">
            <strong>Kora śródwęchowa i hipokamp</strong> — ubytek kodowania pamięci świeżej, trudności w odtwarzaniu nazwisk i spotkań.
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-28 font-bold text-slate-700">Etap 2 (Łagodne AD):</span>
          <div className="flex-1 bg-white border border-slate-200 p-2 rounded">
            <strong>Kora skroniowa i ciemieniowa</strong> — anomia, błędy przestrzenne, trudności w zarządzaniu budżetem i lekami (IADL).
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-28 font-bold text-slate-700">Etap 3 (Zaawansowane):</span>
          <div className="flex-1 bg-white border border-slate-200 p-2 rounded">
            <strong>Uogólniona atrofia korowa</strong> — apraksja ubierania, utrata rozpoznawania bliskich, mutyzm, utrata podstawowych czynności (ADL).
          </div>
        </div>
      </div>
      <div className="mt-2 text-[11px] text-slate-500">
        Uwaga epistemiczna: Model ilustruje typową progresję neuropatologiczną Braaka; nie zastępuje indywidualnej oceny klinicznej u pacjentów z fenotypami atypowymi (PCA, lvPPA).
      </div>
    </div>
  );
}

export function DlbPathwayDiagram() {
  return (
    <div className="diagram-card p-4 bg-slate-50 border border-slate-200 rounded-xl my-4 text-slate-800">
      <div className="flex items-center justify-between mb-3 border-b border-slate-200 pb-2">
        <h4 className="font-semibold text-sm tracking-wide text-emerald-900 uppercase">
          Kaskada Objawowa Otępienia z Ciałami Lewy’ego (DLB)
        </h4>
        <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-medium">
          Kryteria McKeith 2017
        </span>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
        <div className="p-2 bg-emerald-50 border border-emerald-200 rounded text-center">
          <div className="font-bold text-emerald-900 mb-1">1. RBD (Sen REM)</div>
          <p className="text-emerald-800 text-[11px]">Odgrywanie snów, krzyki w nocy dekady przed otępieniem.</p>
        </div>
        <div className="p-2 bg-emerald-50 border border-emerald-200 rounded text-center">
          <div className="font-bold text-emerald-900 mb-1">2. Wahania uwagi</div>
          <p className="text-emerald-800 text-[11px]">Epizody zagapienia i senności na przemian z jasnością.</p>
        </div>
        <div className="p-2 bg-emerald-50 border border-emerald-200 rounded text-center">
          <div className="font-bold text-emerald-900 mb-1">3. Omamy wzrokowe</div>
          <p className="text-emerald-800 text-[11px]">Uformowane postacie ludzi i zwierząt w pokoju.</p>
        </div>
        <div className="p-2 bg-rose-50 border border-rose-300 rounded text-center">
          <div className="font-bold text-rose-950 mb-1">4. Nadwrażliwość D2</div>
          <p className="text-rose-900 text-[11px]">Ciężkie zaostrzenie po neuroleptykach (haloperidol!).</p>
        </div>
      </div>
    </div>
  );
}

export function AnticholinergicBurdenDiagram() {
  return (
    <div className="diagram-card p-4 bg-slate-50 border border-slate-200 rounded-xl my-4 text-slate-800">
      <div className="flex items-center justify-between mb-3 border-b border-slate-200 pb-2">
        <h4 className="font-semibold text-sm tracking-wide text-rose-900 uppercase">
          Obciążenie Antycholinergiczne (ACB) i Narządowe Skutki Kliniczne
        </h4>
        <span className="text-xs bg-rose-100 text-rose-800 px-2 py-0.5 rounded font-medium">
          6 Domen Zagrożenia
        </span>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs">
        <div className="p-2 bg-white border border-slate-200 rounded shadow-sm">
          <div className="font-bold text-slate-900 mb-1">OUN: Pamięć i Uwaga</div>
          <p className="text-slate-600">Blokada M1 w hipokampie: spadek koncentracji, imitacja lub zaostrzenie otępienia.</p>
        </div>
        <div className="p-2 bg-white border border-slate-200 rounded shadow-sm">
          <div className="font-bold text-slate-900 mb-1">OUN: Majaczenie (Delirium)</div>
          <p className="text-slate-600">Załamanie rezerwy cholinergicznej wyzwalające ostre epizody splątania.</p>
        </div>
        <div className="p-2 bg-white border border-slate-200 rounded shadow-sm">
          <div className="font-bold text-slate-900 mb-1">Pęcherz moczowy</div>
          <p className="text-slate-600">Rozkurcz mięśnia wypieracza: zaleganie moczu, anuria i wtórne infekcje ZUM.</p>
        </div>
        <div className="p-2 bg-white border border-slate-200 rounded shadow-sm">
          <div className="font-bold text-slate-900 mb-1">Przewód pokarmowy</div>
          <p className="text-slate-600">Spadek perystaltyki: uporczywe zaparcia, zaklinowanie stolca (fecaloma).</p>
        </div>
        <div className="p-2 bg-white border border-slate-200 rounded shadow-sm">
          <div className="font-bold text-slate-900 mb-1">Układ wzrokowy</div>
          <p className="text-slate-600">Porażenie akomodacji (mydriasis), zamazane widzenie i suchość spojówek.</p>
        </div>
        <div className="p-2 bg-white border border-slate-200 rounded shadow-sm">
          <div className="font-bold text-rose-800 mb-1">Upadki i Urazy</div>
          <p className="text-slate-600">Sedacja dzienna + zaburzenia widzenia = wielokrotny wzrost ryzyka złamań biodra.</p>
        </div>
      </div>
    </div>
  );
}
