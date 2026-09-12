'use client';
import React from 'react';

export function MseMapDiagram() {
  return (
    <div className="diagram-card p-4 bg-slate-50 border border-slate-200 rounded-xl my-4 text-slate-800">
      <div className="flex items-center justify-between mb-3 border-b border-slate-200 pb-2">
        <h4 className="font-semibold text-sm tracking-wide text-indigo-900 uppercase">
          Mapa Badania Stanu Psychicznego (MSE)
        </h4>
        <span className="text-xs bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded font-medium">
          6 Domen Semiotycznych
        </span>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-xs">
        <div className="p-2.5 bg-white rounded-lg border border-slate-200 shadow-sm">
          <div className="font-bold text-slate-900 mb-1">1. Wygląd i zachowanie</div>
          <p className="text-slate-600">Higiena, kontakt wzrokowy, postawa, ubiór, współpraca z badającym.</p>
        </div>
        <div className="p-2.5 bg-white rounded-lg border border-slate-200 shadow-sm">
          <div className="font-bold text-slate-900 mb-1">2. Napęd psychoruchowy</div>
          <p className="text-slate-600">Spowolnienie (stupor) vs pobudzenie, manipulacje, drżenia, akatyzja.</p>
        </div>
        <div className="p-2.5 bg-white rounded-lg border border-slate-200 shadow-sm">
          <div className="font-bold text-slate-900 mb-1">3. Nastrój i afekt</div>
          <p className="text-slate-600">Nastrój (subiektywny, podawany) vs afekt (obiektywny, modulacja, bladość).</p>
        </div>
        <div className="p-2.5 bg-white rounded-lg border border-slate-200 shadow-sm">
          <div className="font-bold text-slate-900 mb-1">4. Tok i treść myślenia</div>
          <p className="text-slate-600">Tok: spowolnienie, gonitwa, rozkojarzenie. Treść: urojenia, myśli natrętne, suicydalne.</p>
        </div>
        <div className="p-2.5 bg-white rounded-lg border border-slate-200 shadow-sm">
          <div className="font-bold text-slate-900 mb-1">5. Spostrzeganie</div>
          <p className="text-slate-600">Omamy (zewnętrzne, sąd realizujący) vs omamy rzekome (przestrzeń wewnętrzna).</p>
        </div>
        <div className="p-2.5 bg-white rounded-lg border border-slate-200 shadow-sm">
          <div className="font-bold text-slate-900 mb-1">6. Krytycyzm i funkcje</div>
          <p className="text-slate-600">Wgląd w chorobę (insight), orientacja allopsychiczna/autopsychiczna.</p>
        </div>
      </div>
    </div>
  );
}

export function MoodTimelineDiagram() {
  return (
    <div className="diagram-card p-4 bg-slate-50 border border-slate-200 rounded-xl my-4 text-slate-800">
      <div className="flex items-center justify-between mb-3 border-b border-slate-200 pb-2">
        <h4 className="font-semibold text-sm tracking-wide text-sky-900 uppercase">
          Oś Czasu Spektrum Afektywnego
        </h4>
        <span className="text-xs bg-sky-100 text-sky-800 px-2 py-0.5 rounded font-medium">
          Kryteria czasowe faz
        </span>
      </div>
      <div className="space-y-2 text-xs">
        <div className="flex items-center gap-2">
          <span className="w-24 font-bold text-rose-600">Mania:</span>
          <div className="flex-1 bg-rose-50 border border-rose-200 p-2 rounded">
            $\ge 7$ dni (lub hospitalizacja). Wyraźna dysfunkcja społeczna, możliwa psychoza.
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-24 font-bold text-amber-600">Hipomania:</span>
          <div className="flex-1 bg-amber-50 border border-amber-200 p-2 rounded">
            $\ge 4$ dni. Wzrost energii bez załamania funkcjonowania i bez cech psychotycznych.
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-24 font-bold text-slate-600">Eutymia:</span>
          <div className="flex-1 bg-slate-100 border border-slate-300 p-2 rounded">
            Stabilny, adaptacyjny nastrój i wyrównany napęd psychoruchowy.
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-24 font-bold text-indigo-600">Depresja:</span>
          <div className="flex-1 bg-indigo-50 border border-indigo-200 p-2 rounded">
            $\ge 14$ dni. Anhedonia / obniżenie nastroju + objawy wegetatywne i poznawcze.
          </div>
        </div>
      </div>
    </div>
  );
}

export function PsychosisDifferentialDiagram() {
  return (
    <div className="diagram-card p-4 bg-slate-50 border border-slate-200 rounded-xl my-4 text-slate-800">
      <div className="flex items-center justify-between mb-3 border-b border-slate-200 pb-2">
        <h4 className="font-semibold text-sm tracking-wide text-purple-900 uppercase">
          Algorytm Różnicowania Zespołów Psychotycznych
        </h4>
        <span className="text-xs bg-purple-100 text-purple-800 px-2 py-0.5 rounded font-medium">
          Oś czasu i relacja do afektu
        </span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
        <div className="p-2.5 bg-white border border-purple-200 rounded-lg">
          <div className="font-bold text-purple-900 mb-1">Schizofrenia (ICD-11 / DSM-5-TR)</div>
          <p className="text-slate-600">Objawy osiowe $\ge 1$ miesiąca; brak dominującego epizodu afektywnego. Objawy ujemne i spadek funkcjonowania.</p>
        </div>
        <div className="p-2.5 bg-white border border-purple-200 rounded-lg">
          <div className="font-bold text-purple-900 mb-1">Zaburzenie schizoafektywne</div>
          <p className="text-slate-600">Jednoczesność psychozy i epizodu afektywnego + co najmniej 2 tygodnie urojeń/omamów pod nieobecność zaburzeń nastroju.</p>
        </div>
        <div className="p-2.5 bg-white border border-purple-200 rounded-lg">
          <div className="font-bold text-purple-900 mb-1">Depresja / Mania z psychozą</div>
          <p className="text-slate-600">Objawy psychotyczne występują wyłącznie w trakcie trwania epizodu nastroju; często syntoniczne z nastrojem.</p>
        </div>
        <div className="p-2.5 bg-white border border-purple-200 rounded-lg">
          <div className="font-bold text-purple-900 mb-1">Psychozy organiczne i substancje</div>
          <p className="text-slate-600">Początek po substancjach lub organiczny (badania toksykologiczne, EEG, MRI, przeciwciała anty-NMDA).</p>
        </div>
      </div>
    </div>
  );
}

export function MonoamineSynapseDiagram() {
  return (
    <div className="diagram-card p-4 bg-slate-50 border border-slate-200 rounded-xl my-4 text-slate-800">
      <div className="flex items-center justify-between mb-3 border-b border-slate-200 pb-2">
        <h4 className="font-semibold text-sm tracking-wide text-emerald-900 uppercase">
          Synapsa Monoaminergiczna (SERT / NET / DAT)
        </h4>
        <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-medium">
          Mechanizm wychwytu i autoregulacji
        </span>
      </div>
      <div className="grid grid-cols-3 gap-2 text-xs text-center">
        <div className="p-2 bg-emerald-50 border border-emerald-200 rounded">
          <div className="font-bold text-emerald-800">SERT</div>
          <p className="text-slate-600 mt-1">Transporter 5-HT. Blokowany przez SSRI/SNRI. Badania PET: próg 80% occupancy.</p>
        </div>
        <div className="p-2 bg-emerald-50 border border-emerald-200 rounded">
          <div className="font-bold text-emerald-800">NET</div>
          <p className="text-slate-600 mt-1">Transporter NA. Blokowany przez SNRI, reboksetynę, TLPD. W korze PFC usuwa też dopaminę.</p>
        </div>
        <div className="p-2 bg-emerald-50 border border-emerald-200 rounded">
          <div className="font-bold text-emerald-800">DAT</div>
          <p className="text-slate-600 mt-1">Transporter DA w prążkowiu. Blokowany przez metylofenidat i bupropion (ok. 20-30% occupancy).</p>
        </div>
      </div>
    </div>
  );
}

export function BdnfTrkbPathwayDiagram() {
  return (
    <div className="diagram-card p-4 bg-slate-50 border border-slate-200 rounded-xl my-4 text-slate-800">
      <div className="flex items-center justify-between mb-3 border-b border-slate-200 pb-2">
        <h4 className="font-semibold text-sm tracking-wide text-amber-900 uppercase">
          Szlak Neuroplastyczności BDNF / TrkB i Kaskada mTOR
        </h4>
        <span className="text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded font-medium">
          Mechanizm szybkiej synaptogenezy
        </span>
      </div>
      <div className="flex flex-col md:flex-row items-stretch gap-2 text-xs">
        <div className="flex-1 p-2 bg-amber-50 border border-amber-200 rounded">
          <div className="font-bold text-amber-900 mb-1">1. Wyzwalacz (Ketamina / SSRI)</div>
          <p className="text-slate-600">Blokada NMDA na interneuronach GABA $\to$ wyrzut glutaminianu na receptory AMPA.</p>
        </div>
        <div className="flex items-center justify-center font-bold text-amber-600">&rarr;</div>
        <div className="flex-1 p-2 bg-amber-50 border border-amber-200 rounded">
          <div className="font-bold text-amber-900 mb-1">2. Wydzielanie BDNF i TrkB</div>
          <p className="text-slate-600">Aktywacja receptora kinazy tyrozynowej B (TrkB) oraz szlaku kinazy Akt i mTORC1.</p>
        </div>
        <div className="flex items-center justify-center font-bold text-amber-600">&rarr;</div>
        <div className="flex-1 p-2 bg-amber-50 border border-amber-200 rounded">
          <div className="font-bold text-amber-900 mb-1">3. Synaptogeneza</div>
          <p className="text-slate-600">Wzrost gęstości kolców dendrytycznych w hipokampie i korze przedczołowej (PFC).</p>
        </div>
      </div>
    </div>
  );
}

export function CstcLoopDiagram() {
  return (
    <div className="diagram-card p-4 bg-slate-50 border border-slate-200 rounded-xl my-4 text-slate-800">
      <div className="flex items-center justify-between mb-3 border-b border-slate-200 pb-2">
        <h4 className="font-semibold text-sm tracking-wide text-indigo-900 uppercase">
          Pętla CSTC w Zaburzeniach Obsesyjno-Kompulsyjnych (OCD)
        </h4>
        <span className="text-xs bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded font-medium">
          Kora – Prążkowie – Wzgórze – Kora
        </span>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs text-center">
        <div className="p-2 bg-white border border-slate-200 rounded">
          <div className="font-bold text-indigo-800">Kora OFC / ACC</div>
          <p className="text-slate-600 mt-1">Nadmierne wykrywanie błędów i zagrożenia (obsesje).</p>
        </div>
        <div className="p-2 bg-white border border-slate-200 rounded">
          <div className="font-bold text-indigo-800">Jądro ogoniaste</div>
          <p className="text-slate-600 mt-1">Utrata hamowania nawyków ruchowych (kompulsje).</p>
        </div>
        <div className="p-2 bg-white border border-slate-200 rounded">
          <div className="font-bold text-indigo-800">Gałka blada</div>
          <p className="text-slate-600 mt-1">Przekaźnik w pętli bezpośredniej i pośredniej.</p>
        </div>
        <div className="p-2 bg-white border border-slate-200 rounded">
          <div className="font-bold text-indigo-800">Wzgórze</div>
          <p className="text-slate-600 mt-1">Zwrotne wzbudzenie kory $\to$ zamknięte koło natręctw.</p>
        </div>
      </div>
    </div>
  );
}

export function FearCircuitDiagram() {
  return (
    <div className="diagram-card p-4 bg-slate-50 border border-slate-200 rounded-xl my-4 text-slate-800">
      <div className="flex items-center justify-between mb-3 border-b border-slate-200 pb-2">
        <h4 className="font-semibold text-sm tracking-wide text-rose-900 uppercase">
          Neuroanatomia Lęku i Traumy (Obwód Migdałowaty)
        </h4>
        <span className="text-xs bg-rose-100 text-rose-800 px-2 py-0.5 rounded font-medium">
          Amygdala vs Kora Przedczołowa
        </span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs">
        <div className="p-2 bg-rose-50 border border-rose-200 rounded">
          <div className="font-bold text-rose-900">Ciało migdałowate (Amygdala)</div>
          <p className="text-slate-600 mt-1">Generuje reakcję walki/ucieczki, aktywuje oś HPA i pień mózgu (tachykardia, poty).</p>
        </div>
        <div className="p-2 bg-slate-100 border border-slate-300 rounded">
          <div className="font-bold text-slate-800">Brzuszno-przyśrodkowa PFC</div>
          <p className="text-slate-600 mt-1">Hamuje aktywność ciała migdałowatego (wygaszanie lęku). W PTSD jej funkcja jest obniżona.</p>
        </div>
        <div className="p-2 bg-slate-100 border border-slate-300 rounded">
          <div className="font-bold text-slate-800">Hipokamp</div>
          <p className="text-slate-600 mt-1">Nadaje kontekst czasowo-przestrzenny wspomnieniom lękowym (oddziela „wtedy” od „teraz”).</p>
        </div>
      </div>
    </div>
  );
}

export function D2PathwaysDiagram() {
  return (
    <div className="diagram-card p-4 bg-slate-50 border border-slate-200 rounded-xl my-4 text-slate-800">
      <div className="flex items-center justify-between mb-3 border-b border-slate-200 pb-2">
        <h4 className="font-semibold text-sm tracking-wide text-blue-900 uppercase">
          Cztery Szlaki Dopaminergiczne w Schizofrenii i Farmakoterapii
        </h4>
        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded font-medium">
          D2 Okno Kapura (65–80%)
        </span>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
        <div className="p-2 bg-blue-50 border border-blue-200 rounded">
          <div className="font-bold text-blue-900">Mezolimbiczny</div>
          <p className="text-slate-600 mt-1">Nadmiar DA $\to$ objawy wytwórcze. Blokada D2 $\ge 65\%$ daje efekt przeciwpsychotyczny.</p>
        </div>
        <div className="p-2 bg-blue-50 border border-blue-200 rounded">
          <div className="font-bold text-blue-900">Mezokortykalny</div>
          <p className="text-slate-600 mt-1">Niedobór DA $\to$ objawy ujemne i poznawcze. Blokada D2 może je nasilać.</p>
        </div>
        <div className="p-2 bg-blue-50 border border-blue-200 rounded">
          <div className="font-bold text-blue-900">Nigrostriatalny</div>
          <p className="text-slate-600 mt-1">Układ pozapiramidowy. Occupancy D2 &gt; 78-80% wywołuje objawy EPS i parkinsonizm.</p>
        </div>
        <div className="p-2 bg-blue-50 border border-blue-200 rounded">
          <div className="font-bold text-blue-900">Guzkowo-lejkowy</div>
          <p className="text-slate-600 mt-1">Dopamina hamuje prolaktynę. Blokada D2 &gt; 72% prowadzi do hiperprolaktynemii.</p>
        </div>
      </div>
    </div>
  );
}

export function SerotoninVsNmsDiagram() {
  return (
    <div className="diagram-card p-4 bg-slate-50 border border-slate-200 rounded-xl my-4 text-slate-800">
      <div className="flex items-center justify-between mb-3 border-b border-slate-200 pb-2">
        <h4 className="font-semibold text-sm tracking-wide text-red-900 uppercase">
          Różnicowanie Ostrych Stanów Toksycznych: Hunter vs NMS
        </h4>
        <span className="text-xs bg-red-100 text-red-800 px-2 py-0.5 rounded font-medium">
          Kluczowe znaki fizykalne
        </span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
        <div className="p-2.5 bg-red-50 border border-red-200 rounded-lg">
          <div className="font-bold text-red-900 mb-1">Zespół serotoninowy (Kryteria Huntera)</div>
          <ul className="list-disc list-inside text-slate-700 space-y-1">
            <li><strong>Odruchy:</strong> Hiperrefleksja, klonus spontaniczny lub oczny.</li>
            <li><strong>Napięcie:</strong> Drżenia mięśniowe, sztywność (zwłaszcza kończyn dolnych).</li>
            <li><strong>Autonomiczne:</strong> Mydriasis (szerokie źrenice), poty, borborygmy.</li>
            <li><strong>Początek:</strong> Gwałtowny (godziny od podania leku).</li>
          </ul>
        </div>
        <div className="p-2.5 bg-slate-100 border border-slate-300 rounded-lg">
          <div className="font-bold text-slate-900 mb-1">Złośliwy Zespół Neuroleptyczny (NMS)</div>
          <ul className="list-disc list-inside text-slate-700 space-y-1">
            <li><strong>Odruchy:</strong> Hiporefleksja lub osłabienie odruchów (brak klonusu!).</li>
            <li><strong>Napięcie:</strong> Uogólniona sztywność typu „ołowianej rury” (lead-pipe).</li>
            <li><strong>Autonomiczne:</strong> Bladość, tachykardia, labilne ciśnienie, skrajny wzrost CK.</li>
            <li><strong>Początek:</strong> Podostry (dni do tygodni po neuroleptyku).</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export function CypNetworkDiagram() {
  return (
    <div className="diagram-card p-4 bg-slate-50 border border-slate-200 rounded-xl my-4 text-slate-800">
      <div className="flex items-center justify-between mb-3 border-b border-slate-200 pb-2">
        <h4 className="font-semibold text-sm tracking-wide text-violet-900 uppercase">
          Główne Izoenzymy Cytochromu P450 w Psychofarmakologii
        </h4>
        <span className="text-xs bg-violet-100 text-violet-800 px-2 py-0.5 rounded font-medium">
          Interakcje i farmakogenetyka
        </span>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
        <div className="p-2 bg-violet-50 border border-violet-200 rounded">
          <div className="font-bold text-violet-900">CYP2D6</div>
          <p className="text-slate-600 mt-1">Substraty: TLPD, risperidon, aripiprazol, atomoksetyna. Silne inhibitory: fluoksetyna, paroksetyna.</p>
        </div>
        <div className="p-2 bg-violet-50 border border-violet-200 rounded">
          <div className="font-bold text-violet-900">CYP1A2</div>
          <p className="text-slate-600 mt-1">Substraty: klozapina, olanzapina. Induktor: dym tytoniowy (WWA). Inhibitor: fluwoksamina.</p>
        </div>
        <div className="p-2 bg-violet-50 border border-violet-200 rounded">
          <div className="font-bold text-violet-900">CYP3A4</div>
          <p className="text-slate-600 mt-1">Metabolizuje większość psychotropów. Induktor: karbamazepina. Inhibitory: ketokonazol, sok grejpfrutowy.</p>
        </div>
        <div className="p-2 bg-violet-50 border border-violet-200 rounded">
          <div className="font-bold text-violet-900">CYP2C19</div>
          <p className="text-slate-600 mt-1">Substraty: citalopram, escitalopram, diazepam. Fenotyp PM wymaga redukcji dawki SSRI o 50%.</p>
        </div>
      </div>
    </div>
  );
}
