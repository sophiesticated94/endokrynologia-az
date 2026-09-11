import { pituitaryGlossary } from './glossary-pituitary.ts';

export type GlossaryCategory = 'hormony' | 'diagnostyka' | 'choroby' | 'leki' | 'anatomia';

export type GlossaryItem = {
  id: string;
  term: string;
  aliases?: string[];
  category: GlossaryCategory;
  definition: string;
  normalRange?: string;
  clinicalSignificance: string;
};

const thyroidGlossary: GlossaryItem[] = [
  {
    id: 'tsh',
    term: 'TSH',
    aliases: ['tyreotropina'],
    category: 'hormony',
    definition: 'Hormon tyreotropowy wydzielany przez przedni płat przysadki mózgowej pod wpływem TRH.',
    normalRange: '0,4–4,0 mIU/l (zależnie od laboratorium i trymestru ciąży)',
    clinicalSignificance: 'Najczulszy pojedynczy wskaźnik sprawności pierwotnej czynności tarczycy w układzie ujemnego sprzężenia zwrotnego. Nieadekwatnie prawidłowe przy niskim FT4 sugeruje niedoczynność wtórną (przysadkową).'
  },
  {
    id: 'trh',
    term: 'TRH',
    aliases: ['tyreoliberyna'],
    category: 'hormony',
    definition: 'Neurohormon podwzgórzowy stymulujący komórki tyreotropowe przysadki do uwalniania TSH.',
    clinicalSignificance: 'Pierwsze, najwyższe piętro osi podwzgórze–przysadka–tarczyca. Jego wydzielanie jest hamowane przez wysokie stężenia wolnych hormonów tarczycy.'
  },
  {
    id: 'ft4',
    term: 'FT4',
    aliases: ['wolna tyroksyna'],
    category: 'hormony',
    definition: 'Frakcja wolna (niezwiązana z białkami) tyroksyny, stanowiąca około 0,02% całkowitej puli T4.',
    normalRange: '12–22 pmol/l (około 0,8–1,8 ng/dl)',
    clinicalSignificance: 'Główny obwodowy parametr oceniający rzeczywistą dostępność hormonu tarczycy dla tkanek. Nie zależy od stężenia białek transportowych (TBG).'
  },
  {
    id: 'ft3',
    term: 'FT3',
    aliases: ['wolna trójjodotyronina'],
    category: 'hormony',
    definition: 'Biologicznie najbardziej aktywny hormon tarczycy w postaci niezwiązanej z białkami.',
    normalRange: '3,1–6,8 pmol/l',
    clinicalSignificance: 'Niezbędny do wykrycia izolowanej T3-tyreotoksykozy przy niskim TSH i prawidłowym FT4. W 80% powstaje na obwodzie przez dejodynację T4.'
  },
  {
    id: 'tbg',
    term: 'TBG',
    aliases: ['globulina wiążąca tyroksynę'],
    category: 'hormony',
    definition: 'Główne osoczowe białko transportowe wiążące ponad 70% krążącej tyroksyny i trójjodotyroniny.',
    clinicalSignificance: 'Wzrost TBG (np. pod wpływem estrogenów w ciąży lub antykoncepcji) podwyższa stężenie całkowitego T4, podczas gdy FT4 i TSH pozostają w normie.'
  },
  {
    id: 'tpo',
    term: 'TPO',
    aliases: ['tyreoperoksydaza'],
    category: 'anatomia',
    definition: 'Kluczowy enzym komórek pęcherzykowych tarczycy zlokalizowany na szczytowej błonie komórkowej.',
    clinicalSignificance: 'Katalizuje utlenianie jodków, organifikację jodu (przyłączanie do tyreoglobuliny) oraz sprzęganie jodotyrozyn w cząsteczki T3 i T4.'
  },
  {
    id: 'anty-tpo',
    term: 'anty-TPO',
    aliases: ['przeciwciała przeciw tyreoperoksydazie'],
    category: 'diagnostyka',
    definition: 'Autoprzeciwciała skierowane przeciwko tyreoperoksydazie tarczycowej.',
    clinicalSignificance: 'Najczulszy marker autoimmunizacyjnej choroby tarczycy (obecne u >90% chorych na Hashimoto). Mogą występować u osób w eutyreozie i nie służą do dawkowania lewotyroksyny.'
  },
  {
    id: 'trab',
    term: 'TRAb',
    aliases: ['przeciwciała przeciw receptorowi TSH'],
    category: 'diagnostyka',
    definition: 'Autoprzeciwciała wiążące się z receptorem TSH na komórkach pęcherzykowych tarczycy.',
    clinicalSignificance: 'W większości mają charakter stymulujący, wywołując niekontrolowaną nadprodukcję hormonów w chorobie Gravesa-Basedowa. Przechodzą przez łożysko, niosąc ryzyko tyreotoksykozy płodowej.'
  },
  {
    id: 'tyreoglobulina',
    term: 'Tyreoglobulina',
    aliases: ['Tg'],
    category: 'diagnostyka',
    definition: 'Glikoproteina produkowana wyłącznie przez komórki pęcherzykowe tarczycy, stanowiąca macierz syntezy hormonów.',
    clinicalSignificance: 'Marker wznowy lub przetrwałej choroby po radykalnym leczeniu raka zróżnicowanego tarczycy. Zawsze oznaczana łącznie z przeciwciałami anty-Tg (interferencja).'
  },
  {
    id: 'dejodynazy',
    term: 'Dejodynazy',
    category: 'fizjologia' as GlossaryCategory,
    definition: 'Enzymy selenozależne (DIO1, DIO2, DIO3) odszczepiające atomy jodu z cząsteczek jodotyronin.',
    clinicalSignificance: 'Odpowiadają za obwodową konwersję prohormonu T4 do aktywnego T3 (DIO1, DIO2) oraz za unieczynnianie do rT3 (DIO3). Regulują tkankową dostępność hormonów niezależnie od TSH.'
  },
  {
    id: 'eu-tirads',
    term: 'EU-TIRADS',
    category: 'diagnostyka',
    definition: 'Europejski system ultrasonograficznej stratyfikacji ryzyka złośliwości guzków tarczycy (kategorie 1 do 5).',
    clinicalSignificance: 'EU-TIRADS 5 (wysokie ryzyko: hipoechogeniczność, mikrozwapnienia, nierówne granice, kształt wyższy niż szerszy) kwalifikuje do BACC przy wymiarze >10 mm; EU-TIRADS 4 przy >15 mm; EU-TIRADS 3 przy >20 mm.'
  },
  {
    id: 'bethesda',
    term: 'Bethesda',
    aliases: ['klasyfikacja Bethesda'],
    category: 'diagnostyka',
    definition: 'Sześciostopniowy system klasyfikacji cytologicznej rozmazów z biopsji aspiracyjnej cienkoigłowej (BACC) tarczycy.',
    clinicalSignificance: 'Kategoria I: niediagnostyczna; II: łagodna; III: zmiana pęcherzykowa o nieokreślonym znaczeniu (AUS/FLUS); IV: podejrzenie nowotworu pęcherzykowego; V: podejrzenie złośliwości; VI: nowotwór złośliwy.'
  },
  {
    id: 'bacc',
    term: 'BACC',
    aliases: ['biopsja cienkoigłowa'],
    category: 'diagnostyka',
    definition: 'Biopsja aspiracyjna cienkoigłowa celowana pod kontrolą USG.',
    clinicalSignificance: 'Podstawowe badanie kwalifikujące guzek tarczycy do obserwacji lub leczenia chirurgicznego.'
  },
  {
    id: 'quervain',
    term: 'Zapalenie de Quervaina',
    aliases: ['podostre zapalenie tarczycy'],
    category: 'choroby',
    definition: 'Bolesne, podostre zapalenie tarczycy, często występujące kilka tygodni po wirusowej infekcji dróg oddechowych.',
    clinicalSignificance: 'Objawia się silnym bólem szyi promieniującym do żuchwy, bardzo wysokim OB/CRP, niską jodochwytnością i wielofazowością (tyreotoksykoza $\to$ hipotyreoza $\to$ eutyreoza). Nie wymaga tyreostatyków.'
  },
  {
    id: 'ait',
    term: 'AIT',
    aliases: ['tyreotoksykoza indukowana amiodaronem'],
    category: 'choroby',
    definition: 'Zaburzenie czynności tarczycy wywołane przewlekłym stosowaniem leku antyarytmicznego amiodaronu.',
    clinicalSignificance: 'Typ 1: nadprodukcja hormonów na podłożu wola guzkowego/utajonego Gravesa (leczenie: tiamazol). Typ 2: destrukcyjne zapalenie tarczycy w gruczole uprzednio zdrowym (leczenie: glikokortykosteroidy).'
  },
  {
    id: 'orbitopatia',
    term: 'Orbitopatia tarczycowa',
    aliases: ['GO', 'orbitopatia Gravesa'],
    category: 'choroby',
    definition: 'Autoimmunizacyjne zapalenie tkanek miękkich oczodołu związane z aktywacją receptora TSH i IGF-1R.',
    clinicalSignificance: 'Prowadzi do obrzęku mięśni gałkoruchowych i tkanki tłuszczowej, wytrzeszczu, podwójnego widzenia, a w ciężkich przypadkach do ucisku nerwu wzrokowego i utraty wzroku. Palenie tytoniu drastycznie pogarsza rokowanie.'
  },
  {
    id: 'men2',
    term: 'MEN2',
    aliases: ['zespół mnogiej gruczolakowatości wewnątrzwydzielniczej typu 2'],
    category: 'choroby',
    definition: 'Genetycznie uwarunkowany zespół wywołany mutacją protoonkogenu RET, dziedziczony autosomalnie dominująco.',
    clinicalSignificance: 'Stowarzyszony ze 100% ryzykiem rozwoju raka rdzeniastego tarczycy oraz guzem chromochłonnym nadnerczy (pheochromocytoma). Przed operacją tarczycy w MEN2 należy bezwzględnie wykluczyć pheochromocytoma.'
  },
  {
    id: 'kalcytonina',
    term: 'Kalcytonina',
    category: 'diagnostyka',
    definition: 'Hormon peptydowy wytwarzany przez komórki przypęcherzykowe (komórki C) tarczycy.',
    clinicalSignificance: 'Wysoce swoisty marker raka rdzeniastego tarczycy (MTC) oraz monitorowania radykalności jego leczenia chirurgicznego.'
  },
  {
    id: 'tiamazol',
    term: 'Tiamazol',
    aliases: ['metimazol'],
    category: 'leki',
    definition: 'Lek przeciwtarczycowy (tyreostatyk) z grupy pochodnych tionamidu.',
    clinicalSignificance: 'Hamuje aktywność peroksydazy tarczycowej (TPO), blokując syntezę nowych hormonów. Rzadkim, zagrażającym życiu powikłaniem jest agranulocytoza (objawy alarmowe: gorączka, ból gardła).'
  },
  {
    id: 'ptu',
    term: 'Propylotiouracyl',
    aliases: ['PTU'],
    category: 'leki',
    definition: 'Tyreostatyk hamujący syntezę hormonów oraz obwodową konwersję T4 do T3.',
    clinicalSignificance: 'Lek z wyboru w I trymestrze ciąży (mniejsza teratogenność niż tiamazol) oraz w przełomie tarczycowym (dodatkowy blok dejodynazy obwodowej).'
  },
  {
    id: 'lt4',
    term: 'Lewotyroksyna',
    aliases: ['LT4', 'L-tyroksyna'],
    category: 'leki',
    definition: 'Syntetyczny analog endogennej tyroksyny (T4) stosowany w doustnej terapii substytucyjnej.',
    clinicalSignificance: 'Lek pierwszego rzutu w niedoczynności tarczycy. Należy przyjmować na czczo z wodą, zachowując 30–60 min odstępu przed śniadaniem oraz 4 godz. przed preparatami żelaza lub wapnia.'
  },
  {
    id: 'radiojod',
    term: 'Radiojod',
    aliases: ['131-I', 'izotop jodu 131'],
    category: 'leki',
    definition: 'Izotop jodu emitujący promieniowanie beta (destrukcja tkanki) i gamma (diagnostyka).',
    clinicalSignificance: 'Stosowany w radykalnym leczeniu choroby Gravesa-Basedowa, wola toksycznego oraz uzupełniająco w raku zróżnicowanym tarczycy. Bezwzględnie przeciwwskazany w ciąży i okresie karmienia.'
  },
  {
    id: 'agranulocytoza',
    term: 'Agranulocytoza',
    category: 'choroby',
    definition: 'Ciężkie, polekowe załamanie liczby neutrofilów (<500/µl) we krwi obwodowej.',
    clinicalSignificance: 'Groźne działanie niepożądane tyreostatyków (tiamazolu i PTU). Każdy pacjent otrzymujący tyreostatyk musi wiedzieć, że wystąpienie gorączki lub bólu gardła wymaga natychmiastowego przerwania leku i pilnej morfologii.'
  },
  {
    id: 'scyntygrafia',
    term: 'Scyntygrafia tarczycy',
    category: 'diagnostyka',
    definition: 'Badanie radioizotopowe (z użyciem 99mTc lub 131I) oceniające rozkład wychwytu znacznika w gruczole.',
    clinicalSignificance: 'Kluczowe badanie różnicujące guzek autonomiczny („gorący”) od niefunkcjonującego („zimnego”) oraz potwierdzające niską jodochwytność w fazie destrukcyjnego zapalenia tarczycy.'
  }
];

export const glossary: GlossaryItem[] = [
  ...thyroidGlossary,
  ...pituitaryGlossary,
];

export const glossaryMap = new Map<string, GlossaryItem>();
glossary.forEach(item => {
  glossaryMap.set(item.term.toLowerCase(), item);
  glossaryMap.set(item.id.toLowerCase(), item);
  item.aliases?.forEach(alias => {
    glossaryMap.set(alias.toLowerCase(), item);
  });
});
