import type { ParathyroidCaseDraft } from './cases-parathyroid-types.ts';

export const parathyroidCasesPart1: ParathyroidCaseDraft[] = [
  {
    id: 'case-przytarczyce-fizjologia',
    lessonId: 'przytarczyce-fizjologia',
    title: 'Mrowienie ust po kłótni w pracy',
    patient: 'Katarzyna, 28 lat',
    difficulty: 'Podstawowy',
    intro:
      '28-letnia prawniczka została przywieziona przez zespół ratownictwa medycznego na SOR z powodu nagłego zdrętwienia wokół ust, silnego mrowienia obu dłoni i uczucia „skręcania” palców rąk. Objawy wystąpiły bezpośrednio po gwałtownej, stresującej kłótni w kancelarii, w trakcie której pacjentka bardzo szybko i głęboko oddychała.',
    steps: [
      {
        stage: 'Objawy',
        prompt: 'W badaniu przedmiotowym pacjentka jest pobudzona, tętno 105/min, częstość oddechów 28/min. Obserwujesz symetryczne przywiedzenie kciuków i wyprost palców obu rąk. Co podejrzewasz jako bezpośredni mechanizm tych objawów?',
        options: [
          {
            text: 'Ostrą alkalozę oddechową wywołaną hiperwentylacją, prowadzącą do nagłego spadku wapnia zjonizowanego',
            explanation: 'Prawidłowo! Hiperwentylacja obniża pCO2 i podwyższa pH krwi. Wzrost pH ujemnie jonizuje albuminę, która wychwytuje wolne jony Ca2+, wywołując ostry rzut tężyczki oddechowej.',
          },
          {
            text: 'Ostry udar niedokrwienny pnia mózgu na tle skurczu naczyniowego',
            explanation: 'Objawy tężyczki są symetryczne i obwodowe; brak asymetrii neurologicznej i objawów ogniskowych wyklucza udar mózgu.',
          },
          {
            text: 'Zawał serca ze wstrząsem kardiogennym',
            explanation: 'Brak bólu w klatce piersiowej i cech hipoperfuzji; pacjentka ma typowe objawy obwodowej nadpobudliwości nerwowo-mięśniowej.',
          },
        ],
      },
      {
        stage: 'Badania',
        prompt: 'Wykonano gazometrię krwi tętniczej oraz oznaczono elektrolity. Jakich wyników się spodziewasz?',
        options: [
          {
            text: 'pH 7,55, pCO2 24 mmHg, wapń całkowity 9,4 mg/dl (norma), wapń zjonizowany 0,92 mmol/l (obniżony)',
            explanation: 'Dokładnie tak! Wapń całkowity jest całkowicie prawidłowy, ponieważ pula białkowa nie uległa zmianie. Zmniejszyła się jedynie biologicznie aktywna frakcja zjonizowana.',
          },
          {
            text: 'pH 7,20, pCO2 65 mmHg, wapń całkowity 14,0 mg/dl',
            explanation: 'To kwasica oddechowa i ciężka hiperkalcemia, co stoi w sprzeczności z hiperwentylacją i tężyczką.',
          },
          {
            text: 'Wapń całkowity 5,0 mg/dl przy prawidłowym stężeniu parathormonu',
            explanation: 'Ostra hiperwentylacja nie zmniejsza ilości wapnia całkowitego w ustroju.',
          },
        ],
      },
      {
        stage: 'Rozpoznanie',
        prompt: 'Jakie jest ostateczne rozpoznanie kliniczne u Katarzyny?',
        options: [
          {
            text: 'Tężyczka oddechowa (normokalcemiczna) w przebiegu hiperwentylacji psychogennej',
            explanation: 'Prawidłowe rozpoznanie. U podłoża leży zaburzenie frakcjonowania wapnia wtórne do hipokapnii.',
          },
          {
            text: 'Trwała pozabiegowa niedoczynność przytarczyc',
            explanation: 'Pacjentka nigdy nie przebyła operacji szyi, a jej wapń całkowity i parathormon są w normie.',
          },
          {
            text: 'Rzekoma niedoczynność przytarczyc typu 1a',
            explanation: 'Brak cech dysmorfii AHO oraz prawidłowy wapń całkowity wykluczają zespół Albrighta.',
          },
        ],
      },
      {
        stage: 'Postępowanie',
        prompt: 'Jakie postępowanie doraźne przyniesie natychmiastowe ustąpienie dolegliwości i jest najbezpieczniejsze?',
        options: [
          {
            text: 'Uspokojenie pacjentki, technika spowolnienia oddechu (np. oddychanie do torebki papierowej lub z maską tlenową bez przepływu tlenu)',
            explanation: 'Znakomita decyzja! Zwrotne wdychanie CO2 podnosi pCO2, normalizuje pH krwi i w ciągu kilku minut uwalnia jony Ca2+ z albuminy, znosząc skurcze bez konieczności wlewów wapnia.',
          },
          {
            text: 'Natychmiastowe podanie 5 ampułek chlorku wapnia w szybkim bolusie dożylnym',
            explanation: 'Chlorek wapnia jest silnie drażniący naczynia, a u pacjentki z prawidłowym wapniem całkowitym wlew soli wapnia jest zbędny i potencjalnie arytmogenny.',
          },
          {
            text: 'Podanie dożylne 80 mg furosemidu',
            explanation: 'Furosemid nasiliłby wydalanie wapnia z moczem i mógłby sprowokować rzeczywistą hipokalcemię.',
          },
        ],
      },
    ],
  },
  {
    id: 'case-przytarczyce-diagnostyka',
    lessonId: 'przytarczyce-diagnostyka',
    title: 'Fałszywy alarm na oddziale hepatologii',
    patient: 'Stanisław, 58 lat',
    difficulty: 'Podstawowy',
    intro:
      '58-letni mężczyzna z poalkoholową marskością wątroby i wodobrzuszem został przyjęty na oddział chorób wewnętrznych. W rutynowych badaniach laboratoryjnych stwierdzono stężenie wapnia całkowitego 7,2 mg/dl (norma 8,6–10,2 mg/dl). Lekarz dyżurny przygotował zlecenie na wlewy dożylne glukonianu wapnia z powodu „ciężkiej hipokalcemii”.',
    steps: [
      {
        stage: 'Objawy',
        prompt: 'Przed podaniem leku badasz pacjenta. Stanisław nie zgłasza żadnych dolegliwości, objaw Chvostka i Trousseau są ujemne, a odstęp QTc w EKG wynosi 405 ms (norma). Co sprawdzasz w pierwszej kolejności w wynikach biochemicznych?',
        options: [
          {
            text: 'Stężenie albuminy w surowicy krwi',
            explanation: 'Znakomicie! W marskości wątroby dochodzi do głębokiej hipoalbuminemii. Około 40% wapnia całkowitego krąży związane z albuminą, stąd jej niedobór sztucznie zaniża wynik wapnia całkowitego.',
          },
          {
            text: 'Stężenie enzymów wątrobowych GGTP i ALT',
            explanation: 'Enzymy wątrobowe odzwierciedlają uszkodzenie hepatocytów, ale nie wyjaśniają frakcji wapnia.',
          },
          {
            text: 'Stężenie ferrytyny i żelaza',
            explanation: 'Żelazo nie bierze udziału w bezpośredniej dystrybucji jonów wapnia w osoczu.',
          },
        ],
      },
      {
        stage: 'Badania',
        prompt: 'Stężenie albuminy u pacjenta wynosi 2,0 g/dl (norma 4,0 g/dl). Ile wynosi stężenie wapnia skorygowanego wg wzoru Payne’a?',
        options: [
          {
            text: '8,8 mg/dl (normokalcemia)',
            explanation: 'Dokładnie! Ca_skorygowany = 7,2 + 0,8 * (4,0 - 2,0) = 7,2 + 1,6 = 8,8 mg/dl. Prawdziwe stężenie wapnia mieści się w granicach normy!',
          },
          {
            text: '7,2 mg/dl (brak zmian)',
            explanation: 'Brak uwzględnienia korekty to częsty błąd prowadzący do niepotrzebnych wlewów wapnia.',
          },
          {
            text: '5,6 mg/dl (skrajna hipokalcemia)',
            explanation: 'Odjęcie zamiast dodania korekty jest błędem rachunkowym.',
          },
        ],
      },
      {
        stage: 'Rozpoznanie',
        prompt: 'W celu upewnienia się pobrano krew na badanie gazometryczne z pomiarem wapnia zjonizowanego. Wynik: Ca2+ = 1,22 mmol/l (norma 1,15–1,32 mmol/l). Jakie jest ostateczne rozpoznanie?',
        options: [
          {
            text: 'Prawidłowa gospodarka wapniowa (eukalcemia) z rzekomą hipokalcemią wtórną do hipoalbuminemii',
            explanation: 'Prawidłowe rozpoznanie. Frakcja biologicznie czynna jest w normie, pacjent nie ma hipokalcemii.',
          },
          {
            text: 'Ciężka hipokalcemia utajona wymagająca leczenia kalcytriolem',
            explanation: 'Prawidłowy wapń zjonizowany wyklucza jakąkolwiek hipokalcemię.',
          },
          {
            text: 'Pierwotna nadczynność przytarczyc maskowana wodobrzuszem',
            explanation: 'Brak hiperkalcemii i podwyższonego PTH; gospodarka wapniowa jest prawidłowa.',
          },
        ],
      },
      {
        stage: 'Postępowanie',
        prompt: 'Jakie jest prawidłowe postępowanie terapeutyczne w odniesieniu do gospodarki wapniowej u Stanisława?',
        options: [
          {
            text: 'Wstrzymanie wlewów wapnia; brak wskazań do interwencji farmakologicznej w gospodarce mineralnej',
            explanation: 'Doskonała decyzja kliniczna. Pacjent nie wymaga żadnej suplementacji wapnia; podanie wlewu mogłoby wywołać jatrogenną hiperkalcemię.',
          },
          {
            text: 'Podanie 20 ampułek glukonianu wapnia we wlewie ciągłym',
            explanation: 'Zabieg nieuzasadniony i niebezpieczny przy prawidłowym stężeniu wapnia zjonizowanego.',
          },
          {
            text: 'Wdrożenie leczenia bisfosfonianami dożylnymi',
            explanation: 'Leki antyresorpcyjne stosuje się w hiperkalcemii i osteoporozie, nie ma tu do nich wskazań.',
          },
        ],
      },
    ],
  },
  {
    id: 'case-phpt-pierwotna',
    title: 'Przypadkowy hiperwapń w bilansie 50-latki',
    patient: 'Anna, 54 lata',
    difficulty: 'Podstawowy',
    intro:
      '54-letnia nauczycielka zgłosiła się na rutynowe badania okresowe przed wyjazdem sanatoryjnym. Nie podaje żadnych skarg, czuje się dobrze. W badaniach biochemicznych stwierdzono wapń całkowity 11,2 mg/dl (norma do 10,2 mg/dl), fosforany 2,1 mg/dl (norma 2,5–4,5 mg/dl) oraz iPTH 118 pg/ml (norma 15–65 pg/ml).',
    steps: [
      {
        stage: 'Objawy',
        prompt: 'W wywiadzie pacjentka nie miała napadów kolki nerkowej ani złamań kości. Jaka jest najbardziej prawdopodobna przyczyna tego zestawu wyników?',
        options: [
          {
            text: 'Pojedynczy gruczolak przytarczycy w przebiegu bezobjawowej pierwotnej nadczynności (PHPT)',
            explanation: 'Prawidłowo! Połączenie hiperkalcemii, hipofosfatemii i podwyższonego parathormonu u kobiety po 50. r.ż. w 85% przypadków wynika z pojedynczego łagodnego gruczolaka przytarczycy.',
          },
          {
            text: 'Przerzuty osteolityczne do kości w przebiegu raka piersi',
            explanation: 'W przerzutach nowotworowych stężenie endogennego PTH byłoby całkowicie stłumione (<10 pg/ml).',
          },
          {
            text: 'Przewlekła niewydolność nerek z wtórną nadczynnością przytarczyc',
            explanation: 'W SHPT w nerkach stężenie wapnia jest obniżone, a fosforanów podwyższone.',
          },
        ],
      },
      {
        stage: 'Badania',
        prompt: 'Pacjentka ma eGFR 82 ml/min. Zlecono densytometrię DXA oraz USG jamy brzusznej w celu oceny wskazań operacyjnych wg wytycznych ESE/ASBMR. Wyniki: w USG brak kamicy i nefrokalcynozy; DXA kręgosłupa T-score -1,6, szyjka kości udowej T-score -1,8, dystalna 1/3 kości promieniowej T-score -2,7. Czy Anna kwalifikuje się do paratyreoidktomii?',
        options: [
          {
            text: 'Tak, ze względu na T-score < -2,5 w 1/3 kości promieniowej oraz stężenie wapnia >1,0 mg/dl ponad normę',
            explanation: 'Dokładnie tak! Pacjentka spełnia aż dwa kryteria konsensusu: wapń przekracza normę o 1,0 mg/dl (11,2 vs 10,2), a osteoporoza korowa na przedramieniu (T-score -2,7) stanowi bezwzględne wskazanie do operacji.',
          },
          {
            text: 'Nie, ponieważ nie przebyła jeszcze żadnego złamania kości',
            explanation: 'Kryteria ESE służą prewencji złamań u chorych bezobjawowych — nie czekamy na wystąpienie złamania.',
          },
          {
            text: 'Nie, kryteria spełniają wyłącznie osoby poniżej 50. roku życia',
            explanation: 'Wiek <50 lat to tylko jedno z niezależnych kryteriów; pozostałe kwalifikują pacjentkę niezależnie od wieku.',
          },
        ],
      },
      {
        stage: 'Rozpoznanie',
        prompt: 'Wykonano badanie USG szyi oraz scyntygrafię 99mTc-MIBI SPECT/CT w celu lokalizacji zmiany. Oba badania zgodnie wykazały ognisko autonomii o wymiarach 14 x 9 mm za dolnym biegunem lewego płata tarczycy. Jakie jest rozpoznanie?',
        options: [
          {
            text: 'Pojedynczy gruczolak lewej dolnej przytarczycy kwalifikujący się do celowanej operacji małoinwazyjnej (MIP)',
            explanation: 'Zgodność dwóch metod obrazowych pozwala na bezpieczne wykonanie celowanego, oszczędzającego zabiegu MIP.',
          },
          {
            text: 'Rozlany 4-gruczołowy rozrost przytarczyc w zespole MEN1',
            explanation: 'Zgodny pojedynczy gruczolak w obu badaniach przemawia za zmianą pojedynczą.',
          },
          {
            text: 'Guzek tarczycy wymagający pilnej biopsji aspiracyjnej cienkoigłowej (BACC)',
            explanation: 'Guzki przytarczyc potwierdzone scyntygrafią MIBI nie wymagają rutynowej biopsji z powodu ryzyka pęknięcia torebki i rozsiewu komórek.',
          },
        ],
      },
      {
        stage: 'Postępowanie',
        prompt: 'Pacjentka została zoperowana techniką MIP. W trakcie zabiegu stężenie iPTH przed wycięciem wynosiło 124 pg/ml, a w 10. minucie po usunięciu gruczolaka spadło do 28 pg/ml. Jak interpretujesz ten wynik wg kryteriów z Miami?',
        options: [
          {
            text: 'Spadek o >50% (o 77%) potwierdza radykalność zabiegu i trwałe wyleczenie z PHPT',
            explanation: 'Znakomita interpretacja! Kryterium z Miami zostało w pełni spełnione, operację można zakończyć z pewnością usunięcia źródła hipersekrecji.',
          },
          {
            text: 'Zabieg jest nieradykalny, ponieważ stężenie PTH nie spadło do zera',
            explanation: 'Wartość nie spada do zera, ponieważ pozostałe trzy zdrowe przytarczyce zachowują sprawność.',
          },
          {
            text: 'Należy natychmiast wykonać eksplorację prawej strony szyi',
            explanation: 'Eksploracja drugiej strony szyi byłaby niepotrzebną traumatyzacją tkanek.',
          },
        ],
      },
    ],
  },
  {
    id: 'case-fhh-hiperkalcemia',
    title: 'Uratowany przed skalpelem chirurga',
    patient: 'Michał, 29 lat',
    difficulty: 'Zaawansowany',
    intro:
      '29-letni programista został skierowany na oddział chirurgii endokrynologicznej z rozpoznaniem „pierwotnej nadczynności przytarczyc” celem planowej paratyreoidktomii. W badaniach ambulatoryjnych stwierdzono Ca 10,8 mg/dl (norma do 10,2 mg/dl) oraz iPTH 58 pg/ml (norma 15–65 pg/ml). Pacjent czuje się znakomicie, a w USG szyi nie uwidoczniono powiększonych przytarczyc.',
    steps: [
      {
        stage: 'Objawy',
        prompt: 'Zanim pacjent trafi na salę operacyjną, zbierasz dokładny wywiad. Co z poniższych faktów klinicznych powinno wzbudzić Twoją najwyższą czujność?',
        options: [
          {
            text: 'Informacja, że u 4-letniego syna pacjenta oraz u jego matki również stwierdzono w przeszłości lekko podwyższony wapń we krwi bez żadnych objawów',
            explanation: 'Kluczowa wskazówka! Rodzinne występowanie bezobjawowej hiperkalcemii od wczesnego dzieciństwa przy prawidłowym/nieznacznie podwyższonym PTH silnie sugeruje FHH.',
          },
          {
            text: 'Pacjent pije dwie filiżanki kawy dziennie',
            explanation: 'Kofeina nie wywołuje genetycznych zaburzeń regulacji wapniowej.',
          },
          {
            text: 'Pacjent uprawia amatorsko bieganie długodystansowe',
            explanation: 'Aktywność fizyczna nie jest przyczyną izolowanej hiperkalcemii.',
          },
        ],
      },
      {
        stage: 'Badania',
        prompt: 'Zlecasz dobową zbiórkę moczu na wydalanie wapnia i kreatyniny w celu obliczenia wskaźnika CCCR (FeCa). Wyniki: wapń w DZM = 65 mg/24h (bardzo niski!), wskaźnik CCCR wynosi 0,005. Jak interpretujesz ten wynik?',
        options: [
          {
            text: 'Wskaźnik CCCR < 0,01 jednoznacznie wskazuje na nerkową hipokalciurię charakterystyczną dla FHH',
            explanation: 'Dokładnie tak! Wartość CCCR poniżej 0,01 u ponad 85% pacjentów potwierdza FHH i z wysokim prawdopodobieństwem wyklucza typową PHPT.',
          },
          {
            text: 'Wskaźnik potwierdza złośliwego raka przytarczyc z ucieczką wapnia',
            explanation: 'W raku przytarczyc wydalanie wapnia z moczem jest olbrzymie (CCCR >0,04).',
          },
          {
            text: 'Wynik świadczy o zanieczyszczeniu próbki moczu i należy go zignorować',
            explanation: 'Niska kalciuria to kardynalna cecha biologiczna defektu receptora CaSR.',
          },
        ],
      },
      {
        stage: 'Rozpoznanie',
        prompt: 'Zlecono badanie genetyczne, które potwierdziło obecność heterozygotycznej mutacji inaktywującej w genie CASR. Jakie jest ostateczne rozpoznanie?',
        options: [
          {
            text: 'Łagodna rodzinna hiperkalcemia hipokalciuryczna typu 1 (FHH-1)',
            explanation: 'Potwierdzenie genetyczne definitywnie ustala rozpoznanie i zamyka proces diagnostyczny.',
          },
          {
            text: 'Zamaskowana postać zespołu gruczolakowatości wewnątrzwydzielniczej MEN1',
            explanation: 'W MEN1 występuje klasyczna PHPT z hiperkalciurią i mutacją genu MEN1.',
          },
          {
            text: 'Zatrucie tiazydowymi lekami moczopędnymi',
            explanation: 'Pacjent nie przyjmował żadnych leków, a mutacja CASR wyjaśnia cały obraz.',
          },
        ],
      },
      {
        stage: 'Postępowanie',
        prompt: 'Jaka jest Twoja decyzja dotycząca planowanej paratyreoidktomii?',
        options: [
          {
            text: 'Natychmiastowe odwołanie operacji, uspokojenie pacjenta i poinformowanie o braku konieczności jakiegokolwiek leczenia farmakologicznego',
            explanation: 'Wzorowa postawa lekarska! Paratyreoidktomia w FHH jest nieskuteczna, szkodliwa i stanowi błąd w sztuce medycznej. FHH nie skraca życia i nie wymaga terapii.',
          },
          {
            text: 'Rozszerzenie zabiegu do obustronnej totalnej resekcji 4 przytarczyc',
            explanation: 'Totalna paratyreoidktomia okaleczyłaby młodego chorego, powodując jatrogenną ciężką hipoparatyreozę bez wyleczenia defektu nerkowego.',
          },
          {
            text: 'Wdrożenie dożywotniego leczenia bisfosfonianami',
            explanation: 'Pacjenci z FHH nie tracą masy kostnej, nie ma więc wskazań do leczenia antyresorpcyjnego.',
          },
        ],
      },
    ],
  },
];
