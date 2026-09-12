import { q, type DraftLesson } from './course-types.ts';

export const draftPregnancyPart2: DraftLesson[] = [
  {
    id: 'ciaza-cukrzyca-przedciazowa-powiklania',
    title: 'Cukrzyca przedciążowa (PGDM) i powikłania narządowe',
    subtitle: 'Planowanie koncepcji (HbA1c <6.0–6.5%), embriopatia hiperglikemiczna i progresja powikłań naczyniowych',
    group: 'Cukrzyca i metabolizm w ciąży',
    minutes: 19,
    goals: [
      'Wyjaśnisz znaczenie prekoncepcyjnej optymalizacji HbA1c (<6,0–6,5%) w zapobieganiu embriopatii cukrzycowej.',
      'Scharakteryzujesz ryzyko progresji retinopatii i nefropatii cukrzycowej oraz zasady monitorowania płodu.',
    ],
    sections: [
      {
        title: 'Planowanie ciąży i redukcja embriopatii cukrzycowej',
        text: 'W odróżnieniu od cukrzycy ciążowej (która rozwija się w II połowie ciąży po zakończeniu organogenezy), cukrzyca przedciążowa (PGDM – typ 1 lub typ 2 rozpoznany przed ciążą) wiąże się z ekspozycją zarodka na hiperglikemię w krytycznym okresie pierwszych 8 tygodni rozwoju. Ryzyko ciężkich wad wrodzonych (wady serca – transpozycja wielkich pni, ubytek przegrody; wady cewy nerwowej – bezmózgowie, rozszczep kręgosłupa; zespół regresji ogonowej) rośnie wykładniczo wraz z wartością HbA1c w chwili zapłodnienia. Wytyczne ADA zalecają dążenie do HbA1c <6,5% (a idealnie <6,0%) przed rozpoczęciem starań o ciążę oraz suplementację 5 mg/dobę kwasu foliowego.',
      },
      {
        title: 'Wpływ ciąży na przewlekłe powikłania mikronaczyniowe matki',
        text: 'Ciąża wywiera silny wpływ na naczynia matki. Retinopatia cukrzycowa może gwałtownie progresować, zwłaszcza przy zbyt szybkiej normalizacji wieloletniej hiperglikemii w I trymestrze; bezwzględnie wymagane jest badanie dna oka przed ciążą, w I trymestrze i co 4–8 tygodni. Nefropatia cukrzycowa (mikroalbuminuria lub jawny białkomocz) drastycznie zwiększa ryzyko stanu przedrzucawkowego (preeclampsia, nawet do 50%), obumarcia wewnątrzmacicznego i porodu przedwczesnego; w profilaktyce preeklampsji od 12. tygodnia ciąży stosuje się kwas acetylosalicylowy (ASA 150 mg/dobę na noc).',
      },
      {
        title: 'Zmienna dynamika zapotrzebowania na insulinę w trymestrach',
        text: 'Zapotrzebowanie na insulinę w PGDM podlega charakterystycznym wahaniom: 1) W I trymestrze (zwłaszcza 8.–12. tydzień) dochodzi do fizjologicznego spadku zapotrzebowania o 10–20% z powodu wzmożonej utylizacji glukozy przez zarodek, nudności i wymiotów – to okres najwyższego ryzyka ciężkich matczynych hipoglikemii; 2) Od 16.–20. tygodnia zapotrzebowanie gwałtownie rośnie pod wpływem hPL i kortyzolu, osiągając w 32.–36. tygodniu wartości 2–3-krotnie wyższe niż przed ciążą; 3) Nagły spadek zapotrzebowania na insulinę po 36. tygodniu ciąży jest groźnym objawem alarmowym niewydolności łożyska wymagającym pilnego monitorowania biofizycznego płodu (KTG, USG Doppler).',
      },
    ],
    table: {
      headers: ['Okres ciąży w PGDM', 'Trend zapotrzebowania na insulinę', 'Główne zagrożenia matczyno-płodowe'],
      rows: [
        ['Okres prekoncepcyjny i I trymestr', 'Spadek o 10–20% (częste hipoglikemie)', 'Embriopatia cukrzycowa, poronienie, ciężka hipoglikemia matki'],
        ['II i III trymestr (18.–34. tydz.)', 'Masywny wzrost o 100–200%', 'Makrosomia płodu, wielowodzie, stan przedrzucawkowy'],
        ['Koniec III trymestru (>36. tydz.)', 'Fizjologiczna stabilizacja na wysokim poziomie', 'NAGŁY SPADEK zapotrzebowania = alarm niewydolności łożyska!'],
        ['Okres porodu i połogu', 'Błyskawiczny spadek o 50–70% po wydaleniu łożyska', 'Ciężka hipoglikemia poporodowa u matki przy braku redukcji dawek'],
      ],
    },
    advanced:
      'W trakcie porodu u kobiety z PGDM stężenie glukozy we krwi matki musi być ściśle utrzymywane w przedziale 70–110 mg/dl (4,0–6,1 mmol/l) za pomocą precyzyjnego dożylnego wlewu insuliny i 5% glukozy. Każdy epizod hiperglikemii śródporodowej u matki wyzwala masywny wyrzut insuliny u płodu, co po zaciśnięciu pępowiny i odcięciu dopływu glukozy prowadzi w ciągu kilkunastu minut do ciężkiej, zagrażającej drgawkami hipoglikemii noworodka.',
    summary:
      'W PGDM cel przed ciążą to HbA1c <6,5% (prewencja wad wrodzonych!). Zapotrzebowanie na insulinę spada w I trymestrze, podwaja się w II/III trymestrze, a nagły spadek po 36. tyg. zwiastuje niewydolność łożyska.',
    sourceIds: ['ada_pregnancy_2024'],
    questions: [
      q(
        'Jaki jest docelowy poziom HbA1c przed zajściem w ciążę u kobiety z cukrzycą typu 1 lub 2 wg wytycznych ADA?',
        ['HbA1c < 6,5% (lub < 6,0% jeśli możliwe bez ciężkich hipoglikemii)', 'Minimalizuje to ryzyko powstawania ciężkich wad cewy nerwowej i serca w okresie organogenezy.'],
        ['HbA1c < 9,0%', 'Wartość 9% wiąże się z kilkunastoprocentowym ryzykiem ciężkich letalnych wad wrodzonych.'],
        ['HbA1c nie ma znaczenia w I trymestrze', 'Wartość glikemii w I trymestrze ma decydujące znaczenie dla przeżycia zarodka.'],
        'ciaza-pgdm-q1'
      ),
      q(
        'O czym może świadczyć nagły, niewyjaśniony spadek zapotrzebowania na insulinę u ciężarnej z cukrzycą po 36. tygodniu ciąży?',
        ['O ostrej lub podostrej niewydolności krążenia łożyskowego (zagrożenie obumarciem płodu)', 'Wskazuje na spadek produkcji hormonów łożyskowych i wymaga pilnego KTG oraz USG Doppler.'],
        ['O całkowitym wyleczeniu cukrzycy', 'Cukrzyca typu 1 nie ulega samoistnemu wyleczeniu pod koniec ciąży.'],
        ['O rozpoczęciu laktacji', 'Laktacja rozpoczyna się po porodzie, nie przed rozwiązaniem.'],
        'ciaza-pgdm-q2'
      ),
      q(
        'Która wada wrodzona płodu jest najbardziej swoista (patognomoniczna) dla nieleczonej cukrzycy przedciążowej?',
        ['Zespół regresji ogonowej (caudal regression syndrome / agenezja kości krzyżowej)', 'Występuje ponad 200-krotnie częściej u dzieci matek ze skrajnie niewyrównaną cukrzycą niż w populacji ogólnej.'],
        ['Izolowana stulejka', 'Jest wariantem anatomicznym, nie wadą embriopatii hiperglikemicznej.'],
        ['Brak małżowiny usznej', 'Nie ma związku z embriopatią cukrzycową.'],
        'ciaza-pgdm-q3'
      ),
      q(
        'Jaki lek stosuje się rutynowo od 12. tygodnia ciąży u kobiet z cukrzycą przedciążową w profilaktyce stanu przedrzucawkowego?',
        ['Kwas acetylosalicylowy (ASA) w dawce 100–150 mg/dobę na noc', 'Poprawia przepływ maciczno-łożyskowy i redukuje ryzyko preeklampsji o ponad 50%.'],
        ['Heparynę niefrakcjonowaną w dawkach trombolitycznych', 'Nie jest lekiem z wyboru w rutynowej prewencji preeklampsji.'],
        ['Furosemid w stałym wlewie', 'Diuretyki pętlowe zmniejszają objętość osocza i są przeciwwskazane.'],
        'ciaza-pgdm-q4'
      ),
      q(
        'Co dzieje się z zapotrzebowaniem na insulinę u kobiety z cukrzycą typu 1 bezpośrednio po urodzeniu łożyska?',
        ['Gwałtownie spada o 50–70% do wartości sprzed ciąży lub niższych', 'Usunięcie łożyska natychmiast eliminuje źródło hormonów antyinsulinowych (hPL, progesteron).'],
        ['Podwaja się na kolejne 48 godzin', 'Utrzymanie ciążowych dawek wywołałoby głęboką śpiączkę hipoglikemiczną u matki.'],
        ['Pozostaje bez żadnych zmian przez 3 miesiące', 'Zmiana zachodzi w ciągu kilkunastu minut po wydaleniu popłodu.'],
        'ciaza-pgdm-q5'
      ),
    ],
  },
  {
    id: 'ciaza-os-hpa-i-cushing',
    title: 'Oś HPA i zespół Cushinga w ciąży',
    subtitle: 'Fizjologiczny hiperkortyzolizm ciążowy, wzrost CBG i wyzwania diagnostyczne hiperkortyzolemii',
    group: 'Nadnercza w ciąży',
    minutes: 18,
    goals: [
      'Wyjaśnisz mechanizm fizjologicznego hiperkortyzolizmu w ciąży (wzrost CBG przez estrogeny, łożyskowy CRH i ACTH).',
      'Dobierzesz badania diagnostyczne w podejrzeniu zespołu Cushinga u ciężarnej (wolny kortyzol w moczu UFC, ślina o północy) i zrozumiesz nieprzydatność testu z 1 mg deksametazonu.',
    ],
    sections: [
      {
        title: 'Fizjologiczna aktywacja osi HPA w ciąży',
        text: 'W trakcie ciąży dochodzi do głębokiej reorganizacji osi podwzgórze–przysadka–nadnercza (HPA). Estrogeny łożyskowe indukują potężny wzrost wątrobowej syntezy transkortyny (CBG – globuliny wiążącej kortyzol), co podnosi całkowity kortyzol w osoczu 2–3-krotnie. Co istotne, od II trymestru rośnie również stężenie WOLNEGO kortyzolu (wolny kortyzol w dobowej zbiórce moczu UFC może fizjologicznie wzrosnąć 2–3-krotnie ponad górną normę dla kobiet nieciężarnych!). Wynika to z wydzielania przez łożysko aktywnego biologicznie łożyskowego CRH (pCRH), który nie podlega ujemnemu sprzężeniu zwrotnemu przez krążący kortyzol.',
      },
      {
        title: 'Trudności diagnostyczne zespołu Cushinga w ciąży',
        text: 'Zespół Cushinga w ciąży występuje rzadko (hiperkortyzolizm zwykle wywołuje brak owulacji i niepłodność), lecz wiąże się ze skrajnym ryzykiem powikłań: stan przedrzucawkowy u 40%, cukrzyca u 30%, niewydolność serca, poronienie i obumarcie płodu u 25%. Wiele objawów Cushinga (otyłość centralna, zaokrąglenie twarzy, rozstępy skórne, labilność nastroju, nadciśnienie, upośledzona tolerancja glukozy) nakłada się na fizjologiczne objawy zaawansowanej ciąży.',
      },
      {
        title: 'Wybór testów biochemicznych i obrazowanie',
        text: 'Standardowy nocny test supresji z 1 mg deksametazonu jest w ciąży CAŁKOWICIE BEZUŻYTECZNY (daje wyniki fałszywie dodatnie u ponad 50% zdrowych ciężarnych z powodu wysokiego CBG i oporności na deksametazon). Badaniem I rzutu jest wolny kortyzol w dobowej zbiórce moczu (UFC) – wartość przekraczająca 3-krotność normy dla nieciężarnych silnie wspiera Cushinga. Drugim czułym testem jest stężenie wolnego kortyzolu w ślinie o godzinie 23:00 (ocena utraty rytmu dobowego). W badaniach obrazowych bezpieczny jest rezonans magnetyczny (MRI bez gadolinu) lub USG nadnerczy.',
      },
    ],
    table: {
      headers: ['Badanie laboratoryjne', 'Ciąża fizjologiczna', 'Zespół Cushinga w ciąży', 'Komentarz kliniczny'],
      rows: [
        ['Kortyzol całkowity w surowicy', 'Podwyższony 2–3x (wysokie CBG)', 'Skrajnie podwyższony', 'Nieprzydatny do różnicowania'],
        ['Test z 1 mg deksametazonu', 'Brak supresji (fałszywie dodatni)', 'Brak supresji', 'BEZUŻYTECZNY w ciąży!'],
        ['Kortyzol wolny w moczu (UFC)', 'Podwyższony 1–2,5x ponad normę', 'Przekracza 3-krotność normy', 'Podstawowy test przesiewowy'],
        ['Kortyzol w ślinie o północy', 'Zachowany fizjologiczny spadek', 'Znacznie podwyższony (brak rytmu)', 'Czuły i nieinwazyjny marker'],
        ['Stężenie ACTH w osoczu', 'W normie lub miernie podwyższone', 'Zahamowane w gruczolaku nadnercza', 'Różnicowanie ACTH-zależnego i niezależnego'],
      ],
    },
    advanced:
      'W odróżnieniu od populacji ogólnej (gdzie 70% to choroba Cushinga przysadkowa), u kobiet ciężarnych ponad 50% przypadków zespołu Cushinga ma etiologię pierwotną nadnerczową (łagodny gruczolak lub rak kory nadnerczy), a u części pacjentek występuje unikalny zespół Cushinga indukowany ciążą z obecnością ektopowych receptorów LH/hCG na komórkach gruczolaka nadnerczy (hiperkortyzolizm ustępuje samoistnie po porodzie). Leczeniem z wyboru w I/II trymestrze jest laparoskopowa adrenalektomia.',
    summary:
      'W ciąży CBG i wolny kortyzol fizjologicznie rosną (łożyskowy CRH). Test z 1 mg deksametazonu jest bezużyteczny (fałszywie dodatni!). Wybieraj UFC (>3x norma) i kortyzol w ślinie o północy.',
    sourceIds: ['endo_pregnancy_adrenal'],
    questions: [
      q(
        'Dlaczego nocny test supresji z 1 mg deksametazonu nie może być stosowany do diagnostyki zespołu Cushinga w ciąży?',
        ['Daje wyniki fałszywie dodatnie u większości zdrowych ciężarnych z powodu podwyższonego stężenia CBG i łożyskowego CRH', 'Fizjologiczna oporność na deksametazon uniemożliwia wyciągnięcie wiarygodnych wniosków.'],
        ['Deksametazon wywołuje natychmiastowe uszkodzenie słuchu u płodu', 'Pojedyncza mała dawka nie wykazuje ototoksyczności.'],
        ['Ponieważ deksametazon jest niszczony przez enzymy ślinianek', 'Lek przyjmuje się doustnie w tabletkach, nie działa miejscowo w jamie ustnej.'],
        'ciaza-cushing-q1'
      ),
      q(
        'Które badanie jest testem pierwszego rzutu w podejrzeniu zespołu Cushinga u kobiety w ciąży?',
        ['Ocena wolnego kortyzolu w dobowej zbiórce moczu (UFC) oraz kortyzolu w ślinie o godzinie 23:00', 'Wartości UFC przekraczające 3-krotność normy dla nieciężarnych silnie wskazują na patologię.'],
        ['Pojedyncze oznaczenie porannego kortyzolu całkowitego w surowicy', 'Kortyzol całkowity jest fizjologicznie wysoki u każdej ciężarnej z powodu wzrostu CBG.'],
        ['Scyntygrafia nadnerczy z jodem-131', 'Badania radioizotopowe są bezwzględnie zakazane w ciąży.'],
        'ciaza-cushing-q2'
      ),
      q(
        'Który narząd odpowiada za fizjologiczny wzrost stężenia wolnego kortyzolu w II i III trymestrze ciąży?',
        ['Łożysko (poprzez produkcję łożyskowego CRH niepodlegającego sprzężeniu zwrotnemu)', 'Placental CRH stymuluje przysadkę i nadnercza do dodatkowej sekrecji kortykoidów.'],
        ['Nerka płodu', 'Nerki płodu nie wydzielają CRH.'],
        ['Tarczyca matki', 'Tarczyca produkuje tyroksynę, nie hormony osi HPA.'],
        'ciaza-cushing-q3'
      ),
      q(
        'Jaka jest najczęstsza etiologia zespołu Cushinga u kobiet w ciąży (odmiennie niż u nieciężarnych)?',
        ['Gruczolak kory nadnerczy (postać pierwotna, ACTH-niezależna)', 'Stanowi ponad 50% przypadków w ciąży (często z aberracyjną ekspresją receptorów LH/hCG).'],
        ['Rak drobnokomórkowy płuca z ektopowym ACTH', 'Występuje skrajnie rzadko u młodych kobiet w wieku rozrodczym.'],
        ['Jatrogenne uszkodzenie przysadki po aspirynie', 'Aspiryna nie wywołuje gruczolaków przysadki.'],
        'ciaza-cushing-q4'
      ),
      q(
        'Która metoda obrazowania jest bezpieczna i zalecana w diagnostyce gruczolaków przysadki lub nadnerczy w ciąży?',
        ['Rezonans magnetyczny (MRI) bez podania kontrastu gadolinowego', 'Eliminuje ekspozycję na promieniowanie rentgenowskie oraz toksyczność gadolinu dla płodu.'],
        ['Wielorzędowa tomografia komputerowa (CT) z kontrastem jodowym', 'Wiąże się ze znaczną ekspozycją na promieniowanie jonizujące i blokadą tarczycy płodu przez jod.'],
        ['Pozytonowa tomografia emisyjna (PET-CT)', 'Przeciwwskazana ze względu na wysoką dawkę promieniowania radiofarmaceutyku.'],
        'ciaza-cushing-q5'
      ),
    ],
  },
  {
    id: 'ciaza-niewydolnosc-nadnerczy-porod',
    title: 'Niewydolność nadnerczy i poród',
    subtitle: 'Prowadzenie choroby Addisona w ciąży, zapotrzebowanie na fludrokortyzon i protokół stresowy',
    group: 'Nadnercza w ciąży',
    minutes: 18,
    goals: [
      'Dostosujesz dawkowanie hydrokortyzonu i fludrokortyzonu w trakcie ciąży, uwzględniając anty-mineralokortykoidowe działanie progesteronu.',
      'Wdrożysz protokół podawania dawek stresowych hydrokortyzonu podczas porodu siłami natury i cięcia cesarskiego.',
    ],
    sections: [
      {
        title: 'Prowadzenie przewlekłej niewydolności nadnerczy w ciąży',
        text: 'Ciąża u kobiety z pierwotną (choroba Addisona) lub wtórną niewydolnością kory nadnerczy wymaga szczególnej czujności. W I trymestrze nudności i wymioty mogą uniemożliwić wchłanianie doustnych leków, grożąc nagłym przełomem nadnerczowym. Dawka doustnego hydrokortyzonu wynosi zwykle 15–25 mg/dobę w 3 dawkach podzielonych. W II połowie ciąży zapotrzebowanie może wzrosnąć o 20–40% (do 20–30 mg/dobę). W chorobie Addisona dawka fludrokortyzonu (mineralokortykoidu) w III trymestrze często wymaga zwiększenia (nawet o 50–100%), ponieważ wysokie stężenia łożyskowego progesteronu działają jako konkurencyjny antagonista receptora mineralokortykoidowego (MR).',
      },
      {
        title: 'Protokół dawek stresowych hydrokortyzonu w trakcie porodu',
        text: 'Poród jest dla organizmu stresem hemodynamicznym i metabolicznym porównywalnym z ciężkim zabiegiem kardiochirurgicznym. Pozostawienie pacjentki na dawkach doustnych doprowadziłoby do zgonu we wstrząsie hipowolemicznym! Zgodnie z wytycznymi Endocrine Society: 1) W chwili rozpoczęcia aktywnej fazy porodu lub indukcji podaje się 100 mg hydrokortyzonu dożylnie w bolusie; 2) Następnie kontynuuje się wlew ciągły i.v. 200 mg/24h (lub 50 mg co 6 godzin i.v./i.m.); 3) W przypadku cięcia cesarskiego: 100 mg i.v. przed znieczuleniem, następnie 100 mg co 8 godzin przez pierwszą dobę; 4) W połogu dawkę redukuje się o 50% każdego dnia, powracając do dawek doustnych sprzed ciąży w 3.–4. dobie.',
      },
      {
        title: 'Postępowanie z noworodkiem i leki przeciwwskazane',
        text: 'Noworodek matki z chorobą Addisona musi być monitorowany pod kątem hipoglikemii i zaburzeń elektrolitowych. Leki przeciwbólowe o działaniu agonistyczno-antagonistycznym (np. pentazocyna) oraz etomidat w indukcji znieczulenia (silny inhibitor 11-beta-hydroksylazy nadnerczowej) są BEZWZGLĘDNIE PRZECIWWSKAZANE. Kobieta z chorobą Addisona może bezpiecznie karmić piersią – stężenia hydrokortyzonu w dawkach substytucyjnych w mleku kobiecym są minimalne i w pełni bezpieczne dla niemowlęcia.',
      },
    ],
    table: {
      headers: ['Faza opieki okołoporodowej', 'Droga podania i dawka hydrokortyzonu', 'Płynoterapia i elektrolity'],
      rows: [
        ['Ciąża stabilna (I–III trymestr)', 'Doustnie 20–30 mg/d (w 3 dawkach) + fludrokortyzon', 'Normalna dieta, kontrola ciśnienia, Na+ i K+'],
        ['Aktywny poród / cięcie cesarskie', '100 mg i.v. w bolusie + 200 mg/24h we wlewie ciągłym', 'Wlew 0,9% NaCl z 5% glukozą (ochrona przed hipowolemią)'],
        ['1. doba po porodzie', '50 mg i.v./i.m. co 8 godzin (150 mg/dobę)', 'Stopniowe przechodzenie na nawadnianie doustne'],
        ['2. doba po porodzie', '25 mg doustnie/i.v. co 8 godzin (75 mg/dobę)', 'Monitorowanie ciśnienia tętniczego i diurezy'],
        ['3.–4. doba po porodzie', 'Powrót do stałej dawki doustnej sprzed ciąży', 'Wznowienie standardowej dawki fludrokortyzonu'],
      ],
    },
    advanced:
      'W odróżnieniu od hydrokortyzonu i prednizolonu (które są w łożysku w ponad 85–90% inaktywowane do nieaktywnego kortyzonu/prednizonu przez enzym 11-beta-HSD2), fluorowane syntetyczne steroidy (deksametazon, betametazon) NIE PODLEGAJĄ inaktywacji przez 11-beta-HSD2 i swobodnie przenikają do płodu. Dlatego w leczeniu niewydolności nadnerczy u matki stosuje się wyłącznie hydrokortyzon; betametazon zarezerwowany jest ściśle do indukcji dojrzewania płuc płodu w zagrożeniu porodem przedwczesnym.',
    summary:
      'W III trymestrze progesteron blokuje receptory MR (konieczny wzrost dawki fludrokortyzonu!). W chwili porodu podaj 100 mg hydrokortyzonu i.v. i wlew 200 mg/24h. W połogu szybko zredukuj dawkę.',
    sourceIds: ['endo_pregnancy_adrenal'],
    questions: [
      q(
        'Dlaczego w III trymestrze ciąży u pacjentki z chorobą Addisona często konieczne jest zwiększenie dawki fludrokortyzonu?',
        ['Wysokie stężenia łożyskowego progesteronu działają jako konkurencyjny antagonista receptora mineralokortykoidowego', 'Progesteron wypiera fludrokortyzon z receptorów MR w cewkach nerkowych.'],
        ['Fludrokortyzon jest niszczony przez enzymy pokarmowe płodu', 'Lek przyjmuje matka i działa on w jej własnych nerkach.'],
        ['Ponieważ nerki matki w III trymestrze przestają filtrować sód', 'Filtracja kłębuszkowa w ciąży rośnie, co dodatkowo nasila ładunek przesączonego sodu.'],
        'ciaza-addison-q1'
      ),
      q(
        'Jaki jest właściwy protokół podawania hydrokortyzonu w aktywnej fazie porodu u kobiety z niewydolnością nadnerczy?',
        ['100 mg i.v. w bolusie przy rozpoczęciu porodu, a następnie wlew ciągły 200 mg/dobę (lub 50 mg co 6h i.v.)', 'Zabezpiecza to organizm przed zapaścią naczyniową w szczytowym stresie hemodynamicznym.'],
        ['Pozostawienie pacjentki na jej stałej porannej tabletce 10 mg doustnie', 'Doprowadziłoby do śmiertelnego przełomu nadnerczowego w trakcie akcji skurczowej.'],
        ['Całkowite odstawienie hydrokortyzonu na czas znieczulenia', 'Odstawienie leku w stresie jest błędem śmiertelnym.'],
        'ciaza-addison-q2'
      ),
      q(
        'Dlaczego hydrokortyzon jest bezpieczny dla płodu podczas leczenia niewydolności nadnerczy u ciężarnej matki?',
        ['Łożyskowy enzym 11-beta-HSD2 inaktywuje ponad 85–90% matczynego hydrokortyzonu do nieaktywnego kortyzonu', 'Chroni to płód przed nadmierną ekspozycją na glukokortykoidy.'],
        ['Hydrokortyzon odbija się od ściany macicy i nie dociera do łożyska', 'Lek krąży w naczyniach doczesnej, lecz enzym syncytiotrofoblastu stanowi barierę metaboliczną.'],
        ['Płód niszczy hydrokortyzon za pomocą żółci', 'Wątroba płodu nie produkuje żółci inaktywującej leki w krążeniu pępowinowym.'],
        'ciaza-addison-q3'
      ),
      q(
        'Który lek anestetyczny stosowany do indukcji znieczulenia jest bezwzględnie przeciwwskazany u ciężarnej z niewydolnością nadnerczy?',
        ['Etomidat', 'Etomidat silnie i długotrwale blokuje 11-beta-hydroksylazę nadnerczową, wywołując ostry przełom nadnerczowy.'],
        ['Propofol', 'Propofol nie blokuje enzymów steroidogenezy i może być bezpiecznie stosowany.'],
        ['Paracetamol', 'Paracetamol jest lekiem przeciwbólowym z wyboru w ciąży.'],
        'ciaza-addison-q4'
      ),
      q(
        'Kiedy po porodzie należy powrócić do standardowej dawki substytucyjnej hydrokortyzonu sprzed ciąży?',
        ['W 3.–4. dobie połogu, redukując dawkę okołoporodową o połowę każdego dnia', 'Gwałtowny spadek stresu poporodowego pozwala na szybki powrót do dawek fizjologicznych.'],
        ['Dopiero po 6 miesiącach od porodu', 'Tak długie utrzymywanie dawek stresowych wywołałoby jatrogenny zespół Cushinga.'],
        ['Nigdy, dawka okołoporodowa 200 mg musi pozostać do końca życia', 'Dawka 200 mg jest dawką suprafizjologiczną wyłącznie na czas ostrego stresu.'],
        'ciaza-addison-q5'
      ),
    ],
  },
  {
    id: 'ciaza-przysadka-prolactinoma-sheehan',
    title: 'Przysadka w ciąży: prolactinoma i zespół Sheehana',
    subtitle: 'Makrogruczolaki a ciąża, odstawienie agonistów dopaminy, udar przysadki i martwica poporodowa',
    group: 'Przysadka i woda w ciąży',
    minutes: 19,
    goals: [
      'Zaplanujesz postępowanie u kobiety z prolactinoma w ciąży (odstawienie kabergoliny/bromokryptyny vs ryzyko rozrostu makrogruczolaka).',
      'Zrozumiesz patomechanizm martwicy poporodowej przysadki (zespół Sheehana) w przebiegu krwotoku położniczego.',
    ],
    sections: [
      {
        title: 'Fizjologiczny rozrost przysadki a guzy typu prolactinoma',
        text: 'W trakcie ciąży masa przysadki wzrasta o 30–50% (głównie z powodu estrogenozależnego rozrostu komórek laktotropowych, przygotowujących gruczoły piersiowe do laktacji). Stężenie prolaktyny fizjologicznie wzrasta 10-krotnie, osiągając pod koniec III trymestru wartości 150–300 ng/ml. U kobiet z mikroprolactinoma (<10 mm) ryzyko klinicznie istotnego powiększenia guza w ciąży jest znikome (<2–3%); po potwierdzeniu ciąży AGONIŚCI DOPAMINY (kabergolina, bromokryptyna) SĄ NATYCHMIAST ODSTAWIANI. U kobiet z makrogruczolakami (>10 mm) ryzyko rozrostu guza wynosi aż 20–30%; w tych przypadkach wymaga się ścisłego monitorowania pola widzenia co 4–8 tygodni.',
      },
      {
        title: 'Objawy ucisku skrzyżowania wzrokowego i leczenie w ciąży',
        text: 'Wystąpienie u ciężarnej narastających bólów głowy oraz ubytków w polu widzenia (niedowidzenie połowicze dwuskroniowe) świadczy o rozroście makrogruczolaka z uciskiem na chiazmę wzrokową. W takich sytuacjach lekiem z wyboru jest natychmiastowe włączenie BROMOKRYPTYNY (posiada najdłuższy, kilkudziesięcioletni profil bezpieczeństwa w ciąży; kabergolinę stosuje się w razie jej nietolerancji). Jeśli farmakoterapia nie przyniesie szybkiej dekompresji chiazmy wzrokowej w ciągu 1–2 tygodni, konieczna jest transsfenoidalna operacja odbarczająca w trybie pilnym.',
      },
      {
        title: 'Zespół Sheehana – poporodowa martwica niedokrwienna przysadki',
        text: 'Przysadka w ciąży jest narządem silnie przerośniętym, lecz jej unaczynienie wrotne pozostaje podatne na nagłe spadki ciśnienia perfuzyjnego. Zespół Sheehana rozwija się wskutek masywnego krwotoku okołoporodowego z zapaścią hemodynamiczną (wstrząs hipowolemiczny). Niedokrwienie prowadzi do martwicy koagulacyjnej przedniego płata przysadki. Pierwszymi klinicznymi objawami są: całkowity brak laktacji (agalaktia – brak prolaktyny) oraz brak powrotu miesiączkowania po porodzie, a następnie narastające objawy wtórnej niedoczynności tarczycy (zmęczenie, chłód) i kory nadnerczy (hipotonia, hipoglikemia).',
      },
    ],
    table: {
      headers: ['Jednostka chorobowa', 'Częstość w ciąży / Etiologia', 'Główne objawy alarmowe', 'Postępowanie w ciąży'],
      rows: [
        ['Mikroprolactinoma (<10 mm)', 'Częsta, ryzyko rozrostu <3%', 'Rzadko objawowa w ciąży', 'Odstawić agonistów dopaminy zaraz po potwierdzeniu ciąży'],
        ['Makroprolactinoma (≥10 mm)', 'Ryzyko rozrostu w ciąży 20–30%', 'Bóle głowy, ubytki pola widzenia', 'Monitorowanie pola widzenia; w razie rozrostu bromokryptyna'],
        ['Udar przysadki (apopleksja)', 'Nagły krwotok/zawał w guzie', 'Nagły silny ból głowy, oftalmoplegia', 'Wysokie dawki hydrokortyzonu i.v., pilna ocena neurochirurgiczna'],
        ['Zespół Sheehana', 'Martwica po krwotoku poporodowym', 'Agalaktia, brak miesiączki, zapaść', 'Dożywotnia substytucja wielohormonalna (HC, LT4, estrogeny)'],
      ],
    },
    advanced:
      'W trakcie ciąży rutynowe oznaczanie stężenia prolaktyny u pacjentki z prolactinoma jest CAŁKOWICIE BEZCELOWE. Fizjologiczna hiperprolaktynemia ciążowa sprawia, że stężenia PRL rosną u każdej kobiety i nie korelują z rozmiarem guza w przysadce. Podstawą monitorowania w ciąży jest wyłącznie ocena kliniczna (bóle głowy) oraz ilościowe perymetryczne badanie pola widzenia.',
    summary:
      'W mikroprolactinoma odstaw agonistę dopaminy; w makrogruczolaku monitoruj pole widzenia (w razie rozrostu: bromokryptyna!). Zespół Sheehana to martwica po krwotoku porodowym (brak laktacji i miesiączki).',
    sourceIds: ['endo_pregnancy_adrenal'],
    questions: [
      q(
        'Jak należy postąpić ze stosowaniem kabergoliny u pacjentki z mikroprolactinoma (<10 mm) po uzyskaniu dodatniego testu ciążowego?',
        ['Natychmiast odstawić lek i obserwować pacjentkę klinicznie', 'Ryzyko powiększenia mikrogruczolaka wynosi poniżej 2–3%, a płód chroni się przed zbędną ekspozycją na lek.'],
        ['Podwoić dawkę kabergoliny na cały okres ciąży', 'Nie ma uzasadnienia dla profilaktycznej eskalacji leku w ciąży.'],
        ['Wdrożyć natychmiastowe naświetlanie przysadki', 'Radioterapia jest bezwzględnie zakazana w ciąży.'],
        'ciaza-prolactinoma-q1'
      ),
      q(
        'Dlaczego w ciąży nie oznacza się seryjnie stężeń prolaktyny u kobiet z gruczolakiem prolaktynowym?',
        ['Fizjologiczny 10-krotny wzrost prolaktyny pod wpływem estrogenów łożyskowych uniemożliwia ocenę rozrostu guza', 'Stężenie PRL nie koreluje z wielkością gruczolaka w ciąży; decyduje badanie pola widzenia.'],
        ['Prolaktyna w ciąży ulega przemianie w hormon wzrostu', 'Są to odrębne cząsteczki białkowe.'],
        ['Łożysko niszczy prolaktynę w probówce laboratoryjnej', 'Krew pobiera się od matki, nie z łożyska.'],
        'ciaza-prolactinoma-q2'
      ),
      q(
        'Który agonista dopaminy jest lekiem pierwszego rzutu w razie konieczności leczenia objawowego rozrostu makroprolactinoma w ciąży?',
        ['Bromokryptyna', 'Posiada najdłuższy, wieloletni rejestr bezpieczeństwa potwierdzający brak teratogenności.'],
        ['Kabergolina w megadawkach', 'Kabergolina jest skuteczna, lecz bromokryptyna ma bogatszą dokumentację bezpieczeństwa ciążowego.'],
        ['L-DOPA z benserazydem', 'Jest lekiem przeciwparkinsonowskim, nie agonistą do leczenia prolactinoma.'],
        'ciaza-prolactinoma-q3'
      ),
      q(
        'Jaki jest pierwszy i najbardziej charakterystyczny objaw zespołu Sheehana po porodzie powikłanym krwotokiem?',
        ['Całkowity brak laktacji (agalaktia) pomimo stymulacji brodawek', 'Martwica komórek laktotropowych przedniego płata uniemożliwia wydzielanie prolaktyny.'],
        ['Mlekotok z obu piersi', 'Mlekotok wymaga prolaktyny, której w zespole Sheehana brakuje.'],
        ['Gwałtowny wzrost masy ciała o 30 kg w 2. dobie', 'Obrzęki nie są wczesnym objawem martwicy przysadki.'],
        'ciaza-prolactinoma-q4'
      ),
      q(
        'Który hormon przedniego płata przysadki należy zabezpieczyć jako PIERWSZY w zespole Sheehana lub udarze przysadki?',
        ['Kortyzol (poprzez natychmiastowe podanie hydrokortyzonu)', 'Niedobór ACTH i wtórna hipokortyzolemia stanowi bezpośrednie zagrożenie zgonem w hiponatremii i wstrząsie.'],
        ['Hormon wzrostu (rhGH)', 'Substytucja somatotropowa ma charakter odległy i nie decyduje o przeżyciu ostrym.'],
        ['Testosteron', 'Nie ma zastosowania w ostrej resuscytacji położnicy.'],
        'ciaza-prolactinoma-q5'
      ),
    ],
  },
  {
    id: 'ciaza-gospodarka-wapniowa-pthrP',
    title: 'Gospodarka wapniowo-fosforanowa i metabolizm kości w ciąży',
    subtitle: 'Rola łożyskowego PTHrP, 1,25(OH)2D3, tężyczka noworodka i osteoporoza laktacyjna',
    group: 'Przytarczyce i kości',
    minutes: 19,
    goals: [
      'Wyjaśnisz homeostazę wapniową w ciąży i laktacji: transfer 30 g Ca, fizjologiczny spadek PTH i wzrost łożyskowego PTHrP.',
      'Rozpoznasz ryzyko tężyczki noworodka po matczynej hiperkalcemii oraz patogenezę osteoporozy laktacyjnej (PLO).',
    ],
    sections: [
      {
        title: 'Fizjologia transferu wapnia: rola PTHrP i hiperkalciuria ciążowa',
        text: 'W trakcie ciąży matka przekazuje do szkieletu płodu około 30 g wapnia elementarnego (z czego 80% w III trymestrze). Wchłanianie wapnia w jelitach matki podwaja się od wczesnej ciąży pod wpływem 2-krotnego wzrostu stężenia 1,25(OH)2D3 (stymulowanego przez nerkową i łożyskową 1-alfa-hydroksylazę). Stężenie matczynego parathormonu (PTH) fizjologicznie SPADA do dolnych granic normy lub ulega supresji (10–30% normy). Głównym regulatorem staje się peptyd PTH-podobny (PTHrP), syntetyzowany obficie przez łożysko, doczesną i gruczoły piersiowe. PTHrP napędza transfer Ca2+ przez łożysko.',
      },
      {
        title: 'Pierwotna nadczynność przytarczyc (PHPT) a tężyczka noworodka',
        text: 'PHPT w ciąży (najczęściej pojedynczy gruczolak przytarczycy) stwarza poważne zagrożenie. Matczyna hiperkalcemia wywołuje hiperkalcemię u płodu, co prowadzi do trwałego zahamowania rozwoju przytarczyc płodowych. Po porodzie, w wyniku nagłego odcięcia dostaw wapnia od matki, u noworodka rozwija się ciężka, zagrażająca drgawkami hipokalcemia i tężyczka noworodkowa (neonatal tetany). U matki PHPT grozi przełomem hiperkalcemicznym, zapaleniem trzustki i stanem przedrzucawkowym. W opornej postaci postępowaniem z wyboru jest paratyreoidektomia w II trymestrze.',
      },
      {
        title: 'Osteoporoza związana z ciążą i laktacją (PLO)',
        text: 'W okresie karmienia piersią transfer wapnia do mleka wynosi 200–400 mg/dobę. Dochodzi wówczas do fizjologicznego spadku gęstości kości (BMD) matki o 3–7% w ciągu 6 miesięcy pod wpływem gruczołowego PTHrP i hipoestrogenizmu laktacyjnego. W rzadkich przypadkach dochodzi do jawnej patologicznej osteoporozy ciążowo-laktacyjnej (PLO), manifestującej się bolesnymi kompresyjnymi złamaniami trzonów kręgów piersiowo-lędźwiowych. Postępowaniem z wyboru jest natychmiastowe zakończenie karmienia, substytucja wapnia i witaminy D oraz rozważenie bisfosfonianów po zakończeniu laktacji.',
      },
    ],
    table: {
      headers: ['Jednostka chorobowa', 'PTH i PTHrP', 'Wpływ na kościec i transfer Ca', 'Złoty standard postępowania'],
      rows: [
        ['Fizjologiczna ciąża', 'PTH ↓ (lub norma), PTHrP ↑ (łożysko)', 'Wchłanianie Ca x2, transfer 30 g Ca do płodu', 'Dieta 1000–1200 mg Ca/d + witamina D 2000 IU/d'],
        ['PHPT u matki', 'PTH ↑ (gruczolak), Ca ↑, PTHrP bez zmian', 'Hiperkalcemia płodu → atrofia przytarczyc płodowych!', 'Paratyreoidektomia w II trymestrze (przy Ca >11 mg/dl)'],
        ['Osteoporoza laktacyjna (PLO)', 'PTH norma/↓, PTHrP ↑ (gruczoł piersiowy)', 'Resorpcja kości beleczkowej, złamania kręgów', 'Koniec laktacji, Ca + wit. D, bisfosfoniany po laktacji'],
      ],
    },
    advanced:
      'W trakcie laktacji ubytek masy kostnej u matki jest w pełni odwracalny: po odstawieniu dziecka od piersi dochodzi do gwałtownego wzrostu estrogenów, spadku PTHrP i pełnej remineralizacji szkieletu w ciągu 6–12 miesięcy. Złamania w PLO wymagają jednak precyzyjnej diagnostyki wykluczającej szpiczaka i inne wtórne osteoporozy.',
    summary:
      'W ciąży PTH spada, a rośnie łożyskowe PTHrP oraz 1,25(OH)2D3. Matczyna hiperkalcemia wywołuje po porodzie zagrażającą życiu tężyczkę noworodka. W PLO dochodzi do kompresyjnych złamań trzonów kręgów.',
    sourceIds: ['endo_pthrP_calcium'],
    questions: [
      q(
        'Dlaczego u noworodka matki z nieleczoną pierwotną nadczynnością przytarczyc (PHPT) rozwija się po porodzie ciężka tężyczka?',
        ['Przewlekła hiperkalcemia wewnątrzmaciczna tłumi rozwój i czynność przytarczyc płodu', 'Po odcięciu pępowiny noworodek nie ma własnego źródła PTH i gwałtownie rozwija hipokalcemię.'],
        ['Łożysko niszczy cały wapń w krążeniu noworodka', 'Łożysko aktywnie transportuje wapń do płodu, nie niszczy go.'],
        ['Parathormon matki po porodzie blokuje receptory CaSR u noworodka', 'Matczyny PTH nie przenika przez barierę łożyskową.'],
        'ciaza-wapn-q1'
      ),
      q(
        'Który hormon odpowiada za fizjologiczne utrzymanie transferu wapnia przez łożysko przy niskim matczynym PTH?',
        ['Peptyd związany z parathormonem (PTHrP) produkowany przez łożysko i gruczoły piersiowe', 'Działa na receptor PTHR1 w kościach i łożysku, napędzając transport wapnia do płodu.'],
        ['Kalcytonina tarczycowa matki', 'Kalcytonina nie steruje aktywnym transferem łożyskowym wapnia.'],
        ['Aldosteron', 'Aldosteron reguluje transport sodu i potasu, nie wapnia.'],
        'ciaza-wapn-q2'
      ),
      q(
        'Jak zmienia się fizjologicznie stężenie 1,25(OH)2D3 w osoczu ciężarnej?',
        ['Wzrasta 2-krotnie dzięki nerkowej i łożyskowej 1-alfa-hydroksylazie, zwiększając absorpcję jelitową Ca', 'Podwojone stężenie kalcytriolu zapewnia jelitowe wchłanianie wapnia na potrzeby mineralizacji szkieletu płodu.'],
        ['Spada do zera z powodu zablokowania receptorów VDR w nerkach', 'Kalcytriol nie spada, lecz podwaja swoje stężenie.'],
        ['Pozostaje bez jakichkolwiek zmian przez całe 40 tygodni ciąży', 'Gospodarka witaminy D ulega wyraźnej adaptacji trymestralnej.'],
        'ciaza-wapn-q3'
      ),
      q(
        'Gdzie najczęściej dochodzi do niskoenergetycznych złamań w przebiegu osteoporozy ciążowo-laktacyjnej (PLO)?',
        ['W trzonach kręgów piersiowo-lędźwiowych, wywołując ostry ból pleców w III trymestrze lub połogu', 'Kość beleczkowa kręgów jest najbardziej podatna na szybką resorpcję stymulowaną przez PTHrP i hipoestrogenizm.'],
        ['W kościach czaszki', 'Kości sklepienia czaszki nie ulegają złamaniom kompresyjnym w PLO.'],
        ['W kościach stępu', 'Typową lokalizacją PLO są trzony kręgowe.'],
        'ciaza-wapn-q4'
      ),
      q(
        'W którym okresie ciąży najbezpieczniej przeprowadzić elektywną paratyreoidektomię w ciężkiej PHPT?',
        ['W II trymestrze ciąży (zakończona organogeneza, niskie ryzyko porodu przedwczesnego)', 'II trymestr to optymalne okno chirurgiczne w endokrynologii położniczej.'],
        ['W pierwszych 4 tygodniach ciąży', 'W I trymestrze istnieje wysokie ryzyko teratogenezy anestetyków i poronienia.'],
        ['W trakcie akcji porodowej drogami natury', 'Zabiegi operacyjne na szyi nie są wykonywane podczas porodu.'],
        'ciaza-wapn-q5'
      ),
    ],
  },
  {
    id: 'ciaza-nadcisnienie-pheo-preeclampsia',
    title: 'Guz chromochłonny i nadciśnienie endokrynne w ciąży',
    subtitle: 'Phaeochromocytoma, stan przedrzucawkowy, kryza katecholaminowa a zasady bezpiecznego porodu',
    group: 'Nadciśnienie endokrynne',
    minutes: 20,
    goals: [
      'Wdrożysz diagnostykę i przygotowanie farmakologiczne guza chromochłonnego w ciąży (blokada alfa przed beta).',
      'Przeprowadzisz diagnostykę różnicową między PHEO, stanem przedrzucawkowym a nadciśnieniem przewlekłym.',
    ],
    sections: [
      {
        title: 'Guz chromochłonny (phaeochromocytoma) – śmiertelna pułapka w ciąży',
        text: 'Phaeochromocytoma w ciąży występuje rzadko (1:50 000), lecz nierozpoznana przed porodem wiąże się ze śmiertelnością matki i płodu sięgającą 40–50%! Ruchy płodu, skurcze macicy oraz ucisk mechaniczny ciężarnej macicy na nadnercze prowokują paroksyzmalne, niekontrolowane wyrzuty katecholamin (triada: napadowe poty, rozsadzający ból głowy, kołatanie serca ze skrajnym nadciśnieniem tętniczym). Diagnostyka opiera się na wolnych metanefrynach w osoczu i moczu oraz MRI bez kontrastu gadolinowego.',
      },
      {
        title: 'Diagnostyka różnicowa: guz chromochłonny a preeklampsja',
        text: 'PHEO bywa mylnie diagnozowany jako stan przedrzucawkowy (preeklampsja). W preeklampsji nadciśnienie rozwija się po 20. tygodniu ciąży i towarzyszy mu białkomocz, małopłytkowość, zaburzenia enzymów wątrobowych (zespół HELLP) oraz wysoki wskaźnik sFlt-1/PlGF. W guzie chromochłonnym nadciśnienie ma charakter wybitnie napadowy z tachykardią, bladością i potami, bez pierwotnego białkomoczu, a stężenia metanefryn przekraczają 3–4-krotnie normę.',
      },
      {
        title: 'Przygotowanie farmakologiczne i postępowanie położnicze',
        text: 'Standardem leczenia PHEO w ciąży jest natychmiastowe wdrożenie blokady alfa-adrenergicznej (fenoksybenzamina, ewentualnie doksazosyna). Dopiero po pełnym wysyceniu receptorów alfa można dodać ostrożnie kardioselektywny beta-bloker w razie tachykardii. Poród drogami natury jest BEZWZGLĘDNIE PRZECIWWSKAZANY: mechaniczny ucisk skurczowej macicy na guz wyzwala katastrofalną kryzę adrenergiczną. Jedynym bezpiecznym rozwiązaniem jest elektywne cięcie cesarskie w znieczuleniu z ciągłym monitorowaniem hemodynamicznym.',
      },
    ],
    table: {
      headers: ['Jednostka', 'Charakterystyka ciśnienia', 'Biomarkery / Diagnostyka', 'Postępowanie z wyboru'],
      rows: [
        ['Guz chromochłonny (PHEO)', 'Napadowe skoki >200 mmHg, poty, tachykardia', 'Wolne metanefryny w osoczu/moczu ↑↑, MRI j.b.', 'Blokada alfa (fenoksybenzamina) + planowe CC'],
        ['Stan przedrzucawkowy (PE)', 'Utrwalone >140/90 po 20. hbd + białkomocz', 'Białkomocz, sFlt-1/PlGF ↑, kwas moczowy ↑', 'Labetalol / metyldopa, MgSO4, rozwiązanie ciąży'],
        ['Pierwotny hiperaldosteronizm', 'Oporne nadciśnienie, tendencja do hipokaliemii', 'ARR trudny w ocenie (wysoki aldosteron fizjologiczny)', 'Eplerenon / labetalol (spironolakton p-wskazany!)'],
      ],
    },
    advanced:
      'W leczeniu przełomu katecholaminowego w guzie chromochłonnym podanie beta-blokera (np. propranololu) przed uzyskaniem PEŁNEJ blokady receptorów alfa-adrenergicznych jest BŁĘDEM ŚMIERTELNYM. Zablokowanie receptorów beta-2 (odpowiedzialnych za rozkurcz obwodowy) przy nieosłoniętych receptorach alfa-1 wywołuje gwałtowny, niekontrolowany skurcz naczyń oporowych, kryzę nadciśnieniową, obrzęk płuc i zgon matki.',
    summary:
      'PHEO w ciąży wymaga bezwzględnej blokady alfa przed beta oraz planowego cięcia cesarskiego. Poród naturalny grozi zgonem. Inhibitory ACE i ARB są bezwzględnie fetotoksyczne.',
    sourceIds: ['esce_preeclampsia'],
    questions: [
      q(
        'Dlaczego u ciężarnej z guzem chromochłonnym (phaeochromocytoma) poród drogami natury jest bezwzględnie przeciwwskazany?',
        ['Skurcze macicy i parcie wywołują mechaniczny ucisk guza oraz masywny, zagrażający życiu wyrzut katecholamin', 'Śmiertelność matki i płodu w porodzie siłami natury bez rozpoznania sięga 50%.'],
        ['Guz chromochłonny uniemożliwia rozszerzenie szyjki macicy', 'Katecholaminy nie blokują mechanicznie szyjki macicy.'],
        ['Noworodek rodzi się z całkowitym brakiem nadnerczy', 'Wad rozwojowych nadnerczy u dziecka nie obserwuje się.'],
        'ciaza-pheo-q1'
      ),
      q(
        'Od jakiego leku należy bezwzględnie rozpocząć farmakoterapię guza chromochłonnego przed podaniem leków beta-adrenolitycznych?',
        ['Od blokera receptorów alfa-adrenergicznych (np. fenoksybenzaminy)', 'Podanie beta-blokera bez blokady alfa wywołuje izolowany skurcz naczyń i śmiertelny przełom nadciśnieniowy.'],
        ['Od wlewu chlorku potasu i glukonatu wapnia', 'Elektrolity nie blokują receptorów adrenergicznych.'],
        ['Od podania wysokich dawek lewotyroksyny', 'Tyroksyna nasiliłaby tachykardię i obciążenie serca.'],
        'ciaza-pheo-q2'
      ),
      q(
        'Które badanie biochemiczne jest badaniem pierwszego wyboru w podejrzeniu guza chromochłonnego u kobiety w ciąży?',
        ['Oznaczenie wolnych metanefryn w osoczu krwi lub frakcjonowanych metanefryn w moczu', 'Charakteryzują się najwyższą czułością i swoistością diagnostyczną.'],
        ['Dobowa zbiórka moczu na kwas moczowy', 'Kwas moczowy jest markerem preeklampsji, nie guza chromochłonnego.'],
        ['Oznaczenie stężenia chromograniny C', 'Markerem jest chromogranina A, lecz metanefryny mają wyższą swoistość.'],
        'ciaza-pheo-q3'
      ),
      q(
        'Które leki hipotensyjne są bezwzględnie przeciwwskazane w ciąży z powodu ciężkiej fetotoksyczności (małowodzie, hipoplazja płuc, zgon płodu)?',
        ['Inhibitory ACE (ACEI) oraz antagoniści receptora angiotensyny II (sartany / ARB)', 'Leki te blokują układ RAA u płodu, powodując anurię, małowodzie i hipoplazję czaszki oraz płuc.'],
        ['Metyldopa i labetalol', 'Metyldopa i labetalol są lekami pierwszego wyboru w ciąży.'],
        ['Nifedypina o przedłużonym uwalnianiu', 'Dihydropirydynowe blokery kanału wapniowego są lekami bezpiecznymi w ciąży.'],
        'ciaza-pheo-q4'
      ),
      q(
        'Jaki lek hipotensyjny stanowi klasyczny, bezpieczny lek pierwszego rzutu w leczeniu nadciśnienia tętniczego u kobiet w ciąży?',
        ['Metyldopa (agonista receptora alfa-2 ośrodkowego) lub labetalol (alfa/beta-bloker)', 'Leki te posiadają najbogatszy profil bezpieczeństwa potwierdzony wieloletnimi badaniami klinicznymi.'],
        ['Spironolakton w wysokiej dawce', 'Spironolakton wykazuje działanie antyandrogenne i feminizujące na płody męskie.'],
        ['Hydrochlorotiazyd', 'Diuretyki tiazydowe nie są lekami pierwszego rzutu z uwagi na ryzyko hipowolemii łożyskowej.'],
        'ciaza-pheo-q5'
      ),
    ],
  },
];
