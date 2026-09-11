export type ParathyroidCaseDraft = {
  id: string;
  lessonId?: string;
  title: string;
  patient: string;
  difficulty: 'Podstawowy' | 'Zaawansowany';
  intro: string;
  steps: {
    stage?: string;
    prompt: string;
    context?: string;
    options: { text: string; explanation: string }[];
  }[];
};

export const parathyroidCases: ParathyroidCaseDraft[] = [
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
  {
    id: 'case-shpt-thpt-pchn',
    title: 'Autonomia po latach dializ',
    patient: 'Tadeusz, 61 lat',
    difficulty: 'Zaawansowany',
    intro:
      '61-letni mężczyzna ze schyłkową niewydolnością nerek w przebiegu nefropatii cukrzycowej, od 9 lat leczony powtarzanymi hemodializami, zgłasza nasilające się bóle kości, świąd skóry oraz osłabienie mięśniowe. W ostatnich miesiącach jego stężenie wapnia całkowitego wzrosło do 11,6 mg/dl (hiperkalcemia), fosforany wynoszą 6,8 mg/dl (hiperfosfatemia), a stężenie iPTH sięga 1680 pg/ml.',
    steps: [
      {
        stage: 'Objawy',
        prompt: 'W badaniu fizykalnym stwierdzasz bolesność uciskową piszczeli i żeber. W RTG rąk widoczna jest podokostnowa resorpcja kości paliczków. Co oznacza pojawienie się hiperkalcemii u wieloletniego dializowanego z tak wysokim PTH?',
        options: [
          {
            text: 'Transformację wtórnej nadczynności przytarczyc (SHPT) w autonomiczną nadczynność trzeciorzędową (THPT)',
            explanation: 'Prawidłowo! Wieloletnia stymulacja doprowadziła do rozrostu guzkowego przytarczyc, utraty receptorów CaSR i VDR oraz autonomicznej hipersekrecji PTH niepodatnej na hamowanie hiperkalcemią.',
          },
          {
            text: 'Całkowite wyleczenie niewydolności nerek i powrót funkcji nefronów',
            explanation: 'Hiperkalcemia i hiperfosfatemia są wyrazem ciężkiej dekompensacji metabolicznej, a nie regeneracji nerek.',
          },
          {
            text: 'Ostre zatrucie glinem ze stacji dializ',
            explanation: 'Choroba posteroidowa/postglinowa wiązała się z niskim PTH (adynamiczna choroba kości).',
          },
        ],
      },
      {
        stage: 'Badania',
        prompt: 'Obliczasz iloczyn wapniowo-fosforanowy (Ca x P): 11,6 mg/dl * 6,8 mg/dl = 78,8 mg2/dl2 (norma bezpieczeństwa <55 mg2/dl2). Jakie bezpośrednie zagrożenie naczyniowe niesie tak wysoki iloczyn?',
        options: [
          {
            text: 'Wysokie ryzyko kalcyfilaksji (martwicy naczyń skóry) oraz masywnych zwapnień zastawek serca i tętnic wieńcowych',
            explanation: 'Dokładnie! Przekroczenie iloczynu 55 mg2/dl2 powoduje wytrącanie się kryształów fosforanu wapnia w ścianach naczyń krwionośnych, grożąc zawałem serca i śmiertelną kalcyfilaksją.',
          },
          {
            text: 'Ryzyko nagłego rozpuszczenia kośćca w ciągu 24 godzin',
            explanation: 'Kości ulegają przebudowie (osteitis fibrosa cystica), ale krytycznym zagrożeniem życia jest kalcyfikacja łożyska naczyniowego.',
          },
          {
            text: 'Zanik błony śluzowej żołądka z niedokrwistością Addisona-Biermera',
            explanation: 'Iloczyn Ca x P nie odpowiada za autoimmunologiczne zapalenie błony śluzowej żołądka.',
          },
        ],
      },
      {
        stage: 'Rozpoznanie',
        prompt: 'W USG szyi uwidoczniono powiększenie wszystkich czterech przytarczyc, z dominującym guzkiem o średnicy 22 mm w okolicy prawego dolnego bieguna. Jakie jest rozpoznanie?',
        options: [
          {
            text: 'Trzeciorzędowa nadczynność przytarczyc (THPT) z hiperplazją guzkową w przebiegu zaawansowanego CKD-MBD',
            explanation: 'Prawidłowe rozpoznanie. Występuje pełny obraz autonomizacji: hiperkalcemia + wysokie PTH + rozrost wielogruczołowy u pacjenta dializowanego.',
          },
          {
            text: 'Zwykły pojedynczy sporadyczny gruczolak przytarczyc bez związku z dializami',
            explanation: 'W THPT dochodzi do patologii wszystkich gruczołów w odpowiedzi na wieloletnią mocznicę.',
          },
          {
            text: 'Rak rdzeniasty tarczycy z przerzutami do przytarczyc',
            explanation: 'Obraz jest typowy dla zaburzeń mineralno-kostnych w PChN.',
          },
        ],
      },
      {
        stage: 'Postępowanie',
        prompt: 'Mimo maksymalnych dawek cynakalcetu i niewapniowych leków wiążących fosforany utrzymuje się hiperkalcemia >11,5 mg/dl i ból kości. Jakie jest definitywne postępowanie z wyboru wg wytycznych KDIGO?',
        options: [
          {
            text: 'Kwalifikacja do leczenia operacyjnego: subtotalna paratyreoidktomia (wycięcie 3,5 gruczołu) lub totalna z autotransplantacją',
            explanation: 'Znakomita decyzja! W opornej na farmakoterapię THPT z hiperkalcemią i bólami kostnymi operacja usuwa autonomiczną masę gruczołów, chroniąc naczynia przed zgonem sercowo-naczyniowym.',
          },
          {
            text: 'Zwiększenie dawek doustnego węglanu wapnia do 6 gramów na dobę',
            explanation: 'Dalsza podaż wapnia przy iloczynie Ca x P >78 doprowadziłaby do natychmiastowej śmierci naczyniowej chorego!',
          },
          {
            text: 'Wstrzymanie hemodializ na okres 4 tygodni',
            explanation: 'Przerwanie dializoterapii wywołałoby zgon z powodu mocznicy i hiperkaliemii.',
          },
        ],
      },
    ],
  },
  {
    id: 'case-hiperkalcemia-nowotwory',
    title: 'Złośliwa hiperkalcemia u palacza',
    patient: 'Henryk, 67 lat',
    difficulty: 'Podstawowy',
    intro:
      '67-letni wieloletni palacz tytoniu (50 paczkolat) został skierowany do szpitala przez lekarza POZ z powodu postępującego od 3 tygodni osłabienia, braku apetytu, ubytku masy ciała o 8 kg, uporczywych zaparć i narastającej senności. W badaniach laboratoryjnych stwierdzono stężenie wapnia całkowitego 14,4 mg/dl (ciężka hiperkalcemia), kreatyninę 2,3 mg/dl oraz mocznik 98 mg/dl.',
    steps: [
      {
        stage: 'Objawy',
        prompt: 'Pacjent jest spowolniały psychoruchowo, podsypiający, skóra jest sucha o obniżonym turgorze, język podsuszony, ciśnienie 95/60 mmHg. Które badanie hormonalne pozwoli natychmiast ustalić, czy hiperkalcemia zależy od przytarczyc?',
        options: [
          {
            text: 'Oznaczenie nienaruszonego parathormonu (iPTH)',
            explanation: 'Dokładnie! iPTH jest kluczowym rozdrożem diagnostycznym: stężenie podwyższone oznacza PHPT, natomiast stężenie stłumione (<10 pg/ml) wskazuje na przyczynę pozaprzytarczycową (najczęściej nowotwór).',
          },
          {
            text: 'Oznaczenie stężenia tyreoglobuliny (Tg)',
            explanation: 'Tyreoglobulina jest markerem raka tarczycy i nie różnicuje mechanizmu hiperkalcemii.',
          },
          {
            text: 'Dobowe wydalanie kwasu 5-hydroksyindolooctowego (5-HIAA)',
            explanation: '5-HIAA służy do diagnostyki rakowiaka i zespołu rakowiaka, a nie hiperkalcemii.',
          },
        ],
      },
      {
        stage: 'Badania',
        prompt: 'Wynik iPTH wynosi 3,5 pg/ml (norma 15–65 pg/ml, stłumiony!). W RTG klatki piersiowej uwidoczniono masę guzowatą o średnicy 6 cm we wnęce płuca prawego. Oznaczono stężenie PTHrP — jest wybitnie podwyższone. Jaki nowotwór najczęściej odpowiada za ten obraz?',
        options: [
          {
            text: 'Rak płaskonabłonkowy płuca wydzielający peptyd parathormonopodobny (PTHrP)',
            explanation: 'Prawidłowo! Rak płaskonabłonkowy płuca jest klasycznym guzem wywołującym humoralną hiperkalcemię nowotworową (HHM) poprzez masową sekrecję PTHrP.',
          },
          {
            text: 'Gruczolakorak jelita grubego z przerzutami do kości',
            explanation: 'Gruczolakoraki rzadziej wydzielają PTHrP; u tego palacza guz zlokalizowany jest pierwotnie w płucu.',
          },
          {
            text: 'Szpiczak mnogi z przewagą łańcuchów lekkich',
            explanation: 'Szpiczak powoduje miejscową osteolizę cytokinową, a nie ektopową syntezę PTHrP.',
          },
        ],
      },
      {
        stage: 'Rozpoznanie',
        prompt: 'Jakie jest całościowe rozpoznanie u Henryka?',
        options: [
          {
            text: 'Humoralna hiperkalcemia nowotworowa (HHM) zależna od PTHrP w przebiegu raka płuca powikłana ostrym uszkodzeniem nerek (AKI)',
            explanation: 'Prawidłowe rozpoznanie. Ciężka hiperkalcemia doprowadziła do odwodnienia i przednerkowego uszkodzenia nerek.',
          },
          {
            text: 'Przełom w przebiegu pierwotnej nadczynności przytarczyc z gruczolakiem ektopowym w śródpiersiu',
            explanation: 'Stłumione stężenie iPTH (3,5 pg/ml) całkowicie wyklucza gruczolaka przytarczyc.',
          },
          {
            text: 'Hiperwitaminoza D wywołana nadmierną suplementacją cholekalcyferolu',
            explanation: 'W zatruciu witaminą D podwyższone byłoby 25(OH)D, a nie peptyd PTHrP.',
          },
        ],
      },
      {
        stage: 'Postępowanie',
        prompt: 'Jaki jest PIERWSZY krok terapeutyczny, który musisz wdrożyć natychmiast na sali reanimacyjnej?',
        options: [
          {
            text: 'Forsowny wlew dożylny 0,9% NaCl (3–4 litry w pierwszej dobie) w celu uzupełnienia łożyska naczyniowego i wymuszenia kalciurii',
            explanation: 'Wzorowe postępowanie ratunkowe! Wlew soli fizjologicznej przywraca objętość krwi, perfuzję nerek i wypłukuje wapń. Dopiero w drugiej kolejności podaje się kwas zoledronowy.',
          },
          {
            text: 'Podanie dożylne 120 mg furosemidu bez podawania jakichkolwiek płynów',
            explanation: 'Kardynalny błąd! Odwodniony pacjent z ciśnieniem 95/60 mmHg po podaniu diuretyku wpadłby w nieodwracalny wstrząs hipowolemiczny ze zgonem.',
          },
          {
            text: 'Pilna operacja resekcji płata płuca w trybie ostrym',
            explanation: 'W stanie ciężkiej hiperkalcemii i niewydolności nerek znieczulenie ogólne grozi zatrzymaniem krążenia; najpierw należy wyrównać zaburzenia metaboliczne.',
          },
        ],
      },
    ],
  },
  {
    id: 'case-hipokalcemia-niedoczynnosc',
    lessonId: 'hipokalcemia-niedoczynnosc',
    title: 'Drętwienie dłoni po wycięciu tarczycy',
    patient: 'Monika, 46 lat',
    difficulty: 'Podstawowy',
    intro:
      '46-letnia kobieta w 2. dobie po całkowitym wycięciu tarczycy z powodu wola guzowatego nietoksycznego zgłasza narastające uczucie mrowienia warg i czubka nosa oraz bolesne skurcze palców obu dłoni. W badaniu fizykalnym uderzenie w pień nerwu twarzowego wywołuje gwałtowny skurcz kącika ust (dodatni objaw Chvostka).',
    steps: [
      {
        stage: 'Objawy',
        prompt: 'Co jest najbardziej prawdopodobną przyczyną wystąpienia objawów tężyczkowych w 2. dobie po całkowitym wycięciu tarczycy?',
        options: [
          {
            text: 'Przejściowe lub trwałe niedokrwienie / niezamierzone usunięcie przytarczyc w trakcie tyreoidektomii',
            explanation: 'Prawidłowo! Pooperacyjna hipoparatyreoza jest najczęstszym powikłaniem radykalnej chirurgii tarczycy (dotyczy 10–30% operowanych przejściowo, a 1–3% na stałe).',
          },
          {
            text: 'Porażenie nerwu krtaniowego wstecznego',
            explanation: 'Porażenie nerwu krtaniowego wstecznego objawia się chrypką lub dusznością, a nie tężyczką rąk.',
          },
          {
            text: 'Ostra niedoczynność kory nadnerczy',
            explanation: 'Chirurgia tarczycy nie uszkadza nadnerczy; objawy są typowe dla ostrej hipokalcemii.',
          },
        ],
      },
      {
        stage: 'Badania',
        prompt: 'Pobrano krew na badania pilne: wapń całkowity wynosi 6,8 mg/dl (norma 8,6–10,2), fosforany 5,4 mg/dl (podwyższone), a iPTH wynosi 4,2 pg/ml (norma 15–65). Jaki jest cel leczenia doraźnego?',
        options: [
          {
            text: 'Przerwanie objawów tężyczki poprzez powolny wlew dożylny 10% glukonianu wapnia pod kontrolą EKG',
            explanation: 'Dokładnie tak! Podaje się 1–2 ampułki (10–20 ml) 10% glukonianu wapnia rozcieńczone w 100 ml 5% glukozy powoli w ciągu 10–20 minut, monitorując tętno i rytm serca.',
          },
          {
            text: 'Podanie doustnej witaminy D3 w dawce 1000 j.m. raz w tygodniu',
            explanation: 'Zwykła witamina D działa zbyt wolno (dni/tygodnie) i nie ulegnie aktywacji przy braku PTH.',
          },
          {
            text: 'Podanie dożylne wodorowęglanu sodu 8,4%',
            explanation: 'Alkalizacja krwi pogłębiłaby hipokalcemię zjonizowaną i nasiliła skurcze krtaniowe!',
          },
        ],
      },
      {
        stage: 'Rozpoznanie',
        prompt: 'Jakie jest rozpoznanie u Moniki?',
        options: [
          {
            text: 'Ostra pooperacyjna niedoczynność przytarczyc z objawową hipokalcemią',
            explanation: 'Prawidłowe rozpoznanie. Niski wapń, wysokie fosforany i niski PTH w 48 h po tyreoidektomii definiują ten stan.',
          },
          {
            text: 'Tężyczka psychogenna',
            explanation: 'Potwierdzony niski wapń całkowity i niski PTH wykluczają tło emocjonalne.',
          },
          {
            text: 'Przełom tarczycowy hipometaboliczny',
            explanation: 'Wole było nietoksyczne, a objawy wynikają wyłącznie z niedoboru przytarczyc.',
          },
        ],
      },
      {
        stage: 'Postępowanie',
        prompt: 'Po ustąpieniu objawów ostrych planujesz terapię doustną przed wypisem do domu. Jaki zestaw leków wg wytycznych ESE zapewni skuteczną kontrolę wapnia?',
        options: [
          {
            text: 'Aktywny metabolit witaminy D (alfakalcydol 1–2 µg/d lub kalcytriol 0,5–1 µg/d) w połączeniu z węglanem wapnia 1500–2000 mg Ca/d',
            explanation: 'Znakomita decyzja! Aktywna witamina D omija brak nerkowej hydroksylacji, a węglan wapnia dostarcza substratu. Celem jest utrzymanie Ca w dolnej granicy normy.',
          },
          {
            text: 'Wyłącznie zwykły cholekalcyferol (witamina D3) w dawce 500 j.m./dobę',
            explanation: 'Monoterapia cholekalcyferolem bez PTH nie jest w stanie wygenerować aktywnego kalcytriolu i doprowadzi do nawrotu tężyczki.',
          },
          {
            text: 'Cynakalcet w dawce 30 mg dwa razy na dobę',
            explanation: 'Cynakalcet obniża stężenie wapnia i jest stosowany w nadczynności przytarczyc; podany tutaj wywołałby śmiertelną tężyczkę!',
          },
        ],
      },
    ],
  },
  {
    id: 'case-tezyczka-objawy',
    title: 'Skurcz dłoni i niepokojące EKG',
    patient: 'Barbara, 33 lata',
    difficulty: 'Zaawansowany',
    intro:
      '33-letnia pacjentka z chorobą Leśniowskiego-Crohna i zespołem krótkiego jelita po resekcjach zgłasza bolesne kurcze stóp i dłoni, utrudniające pisanie na klawiaturze. Lekarz POZ napompował mankiet ciśnieniomierza na ramieniu — po 2 minutach ręka pacjentki zgięła się mimowolnie w stawach śródręczno-paliczkowych z przywiedzionym kciukiem („ręka położnika”).',
    steps: [
      {
        stage: 'Objawy',
        prompt: 'Jaki objaw fizykalny został wywołany przez lekarza i jak świadczy on o pobudliwości nerwowej?',
        options: [
          {
            text: 'Dodatni objaw Trousseau, świadczący o wybitnej nadpobudliwości nerwowo-mięśniowej pod wpływem niedokrwienia pnia nerwowego',
            explanation: 'Prawidłowo! Objaw Trousseau jest wysoce swoisty (>95%) dla tężyczki i świadczy o gotowości drgawkowej włókien nerwowych.',
          },
          {
            text: 'Objaw Goldflama świadczący o zapaleniu nerki',
            explanation: 'Objaw Goldflama to bolesność wstrząsania okolicy lędźwiowej.',
          },
          {
            text: 'Objaw Homansa świadczący o zakrzepicy żył głębokich podudzia',
            explanation: 'Objaw Homansa dotyczy bólu łydki przy zgięciu grzbietowym stopy.',
          },
        ],
      },
      {
        stage: 'Badania',
        prompt: 'W EKG stwierdzono wydłużenie odstępu QTc do 510 ms (norma <450 ms). Wyniki badań krwi: wapń całkowity 7,1 mg/dl, wapń zjonizowany 0,88 mmol/l, magnez 0,38 mmol/l (norma 0,75–1,05 mmol/l). Co jest przyczyną oporności na samo leczenie solami wapnia?',
        options: [
          {
            text: 'Głęboka hipomagnezemia, która hamuje uwalnianie PTH z przytarczyc i wywołuje obwodową oporność receptora PTHR1',
            explanation: 'Znakomita wiedza fizjologiczna! Bez wyrównania magnezu w ustroju podawanie samego wapnia nie przyniesie trwałego efektu terapeutycznego.',
          },
          {
            text: 'Podwyższona aktywność transaminaz wątrobowych',
            explanation: 'Enzymy wątrobowe nie wpływają na elektrofizjologię mięśniówki.',
          },
          {
            text: 'Nadmierne gromadzenie żelaza w szpiku kostnym',
            explanation: 'Gospodarka żelazem nie tłumaczy patogenezy tężyczki.',
          },
        ],
      },
      {
        stage: 'Rozpoznanie',
        prompt: 'Jakie jest pełne rozpoznanie u Barbary?',
        options: [
          {
            text: 'Tężyczka jawna z wydłużeniem QTc w przebiegu zespołu złego wchłaniania z ciężką hipokalcemią i hipomagnezemią',
            explanation: 'Prawidłowe rozpoznanie. Utrata powierzchni chłonnej jelita w chorobie Crohna doprowadziła do ucieczki jonów dwuwartościowych.',
          },
          {
            text: 'Wrodzona padaczka miokloniczna',
            explanation: 'Skurcze tężyczkowe w pełni ustępują po wyrównaniu zaburzeń elektrolitowych.',
          },
          {
            text: 'Ostry zespół wieńcowy bez uniesienia odcinka ST (NSTEMI)',
            explanation: 'Wydłużenie QTc wynika z zaburzeń elektrolitowych, a nie martwicy mięśnia sercowego.',
          },
        ],
      },
      {
        stage: 'Postępowanie',
        prompt: 'Jaki schemat postępowania ratunkowego należy wdrożyć w pierwszej kolejności?',
        options: [
          {
            text: 'Równoległy dożylny wlew siarczanu magnezu (MgSO4) oraz glukonianu wapnia pod ciągłym kardiomonitorem',
            explanation: 'Wzorowa decyzja! Jednoczesne uzupełnienie magnezu odblokowuje wydzielanie PTH i umożliwia komórkom mięśniowym powrót do stabilnego potencjału spoczynkowego.',
          },
          {
            text: 'Podanie doustnych tabletek magnezu z tlenkiem magnezu w dawce 50 mg',
            explanation: 'Droga doustna w zespole krótkiego jelita i ostrej tężyczce z wydłużonym QTc jest nieskuteczna i zbyt wolna.',
          },
          {
            text: 'Podanie digoksyny w celu skrócenia odstępu QTc',
            explanation: 'Digoksyna przy hipomagnezemii i hipokalcemii wywołałaby śmiertelne zaburzenia rytmu serca!',
          },
        ],
      },
    ],
  },
  {
    id: 'case-rzekoma-niedoczynnosc',
    title: 'Niska dziewczynka z dołkami zamiast kostek',
    patient: 'Zofia, 12 lat',
    difficulty: 'Zaawansowany',
    intro:
      '12-letnia dziewczynka została skierowana do poradni endokrynologicznej z powodu niskorosłości (<3. centyla), otyłości oraz postępujących trudności szkolnych. W wywiadzie zgłaszano okresowe mrowienie palców dłoni. Matka dziewczynki ma 148 cm wzrostu i zaokrągloną twarz.',
    steps: [
      {
        stage: 'Objawy',
        prompt: 'W badaniu fizykalnym zwracają uwagę okrągła twarz („księżyc w pełni”), niska sylwetka oraz skrócenie IV i V palca obu dłoni — po zaciśnięciu dłoni w pięści w miejscu stawów śródręczno-paliczkowych widoczne są dołki zamiast wyniosłości kostnych (objaw Archibalda). Jaki zespół fenotypowy reprezentują te cechy?',
        options: [
          {
            text: 'Wrodzoną osteodystrofię Albrighta (fenotyp AHO)',
            explanation: 'Prawidłowo! Brachydaktylia IV/V kości śródręcza, otyłość, niskorosłość i okrągła twarz to patognomoniczny zestaw cech fenotypu AHO.',
          },
          {
            text: 'Zespół Turnera (45,X)',
            explanation: 'W zespole Turnera występuje płetwista szyja, koślawość łokci i dysgenezja gonad, ale brak charakterystycznej brachydaktylii Archibalda.',
          },
          {
            text: 'Zespół Downa (trisomia 21)',
            explanation: 'Obraz fenotypowy i wywiad rodzinny nie odpowiadają zespołowi Downa.',
          },
        ],
      },
      {
        stage: 'Badania',
        prompt: 'Wyniki badań biochemicznych krwi: wapń całkowity 7,4 mg/dl (obniżony), fosforany 6,2 mg/dl (podwyższone), iPTH 340 pg/ml (znacznie podwyższony!), TSH 8,6 mIU/l przy prawidłowym FT4. Jak interpretujesz tak wysoki parathormon przy niskim wapniu?',
        options: [
          {
            text: 'Obwodowa oporność receptora cewkowego na PTH (oraz częściowa oporność na TSH) na tle defektu podjednostki Gs-alfa',
            explanation: 'Dokładnie tak! Przytarczyce produkują ogromne ilości PTH, ale z powodu mutacji białka Gs tkanki docelowe w nerkach nie odpowiadają na bodziec.',
          },
          {
            text: 'Współistnienie gruczolaka przytarczyc z gruczolakiem przysadki',
            explanation: 'Gruczolak przytarczyc dawałby hiperkalcemię i hipofosfatemię, a tu mamy hipokalcemię i hiperfosfatemię.',
          },
          {
            text: 'Jatrogenne uszkodzenie tarczycy i przytarczyc',
            explanation: 'Dziecko nigdy nie było operowane; obraz jest uwarunkowany genetycznie.',
          },
        ],
      },
      {
        stage: 'Rozpoznanie',
        prompt: 'Biorąc pod uwagę obecność fenotypu AHO, hipokalcemię z wysokim PTH oraz fakt, że matka pacjentki wykazuje podobne cechy, jakie jest rozpoznanie?',
        options: [
          {
            text: 'Rzekoma niedoczynność przytarczyc typu 1a (PHP-1a) odziedziczona po matce',
            explanation: 'Znakomita diagnoza! Matczyne dziedziczenie mutacji genu GNAS ujawnia pełen zespół oporności wielohormonalnej (PTH + TSH) wraz z fenotypem AHO.',
          },
          {
            text: 'Rzekoma rzekoma niedoczynność przytarczyc (PPHP)',
            explanation: 'W PPHP (dziedziczonej po ojcu) wapń, fosfor i PTH są całkowicie prawidłowe!',
          },
          {
            text: 'Choroba Hashimoto z przypadkową tężyczką',
            explanation: 'Podwyższone TSH w PHP-1a jest wyrazem oporności na TSH, a nie autoimmunologicznego niszczenia tarczycy.',
          },
        ],
      },
      {
        stage: 'Postępowanie',
        prompt: 'Jakie leczenie zaburzeń mineralnych należy wdrożyć u Zofii?',
        options: [
          {
            text: 'Kalcytriol (lub alfakalcydol) doustnie w połączeniu z preparatami wapnia, z celem utrzymania Ca w dolnej granicy normy',
            explanation: 'Wzorowe postępowanie! Aktywna witamina D omija zablokowany receptor nerkowy i umożliwia wchłanianie wapnia w jelicie.',
          },
          {
            text: 'Podawanie teryparatydu (rekombinowanego PTH 1-34) w iniekcjach podskórnych',
            explanation: 'Podawanie PTH jest bezcelowe, ponieważ tkanki pacjentki wykazują oporność na parathormon.',
          },
          {
            text: 'Usunięcie przytarczyc metodą chirurgiczną',
            explanation: 'Wycięcie przytarczyc doprowadziłoby do katastrofalnej, nieodwracalnej hipokalcemii.',
          },
        ],
      },
    ],
  },
  {
    id: 'case-przelom-hiperkalcemiczny',
    title: 'Śpiączka hiperkalcemiczna na OIT',
    patient: 'Wiesława, 72 lata',
    difficulty: 'Zaawansowany',
    intro:
      '72-letnia kobieta została przywieziona na SOR przez rodzinę z powodu narastających od kilku dni zaburzeń świadomości, bełkotliwej mowy, a w dniu dzisiejszym braku kontaktu logicznego i głębokiej senności. Od 2 tygodni skarżyła się na nudności i zaparcia. W badaniach pilnych: wapń całkowity 16,2 mg/dl (wapń zjonizowany 2,2 mmol/l), kreatynina 3,4 mg/dl, sód 152 mmol/l, mocznik 145 mg/dl.',
    steps: [
      {
        stage: 'Objawy',
        prompt: 'Pacjentka leży w stanie śpiączki (Glasgow Coma Scale 8 pkt), ciśnienie tętnicze 80/50 mmHg, tętno 115/min, cechy skrajnego odwodnienia (zapadnięte gałki oczne, suchy język). W EKG odstęp QTc wynosi zaledwie 330 ms z uniesieniem punktu J. Jak kwalifikujesz ten stan kliniczny?',
        options: [
          {
            text: 'Przełom hiperkalcemiczny powikłany wstrząsem hipowolemicznym i śpiączką metaboliczną — stan bezpośredniego zagrożenia życia',
            explanation: 'Prawidłowo! Wapń >14 mg/dl (>3,5 mmol/l) ze skrajną hipowolemią, niewydolnością nerek i zaburzeniami świadomości to klasyczny, śmiertelny przełom hiperkalcemiczny.',
          },
          {
            text: 'Udar krwotoczny mózgu z przypadkową hiperkalcemią',
            explanation: 'Zaburzenia świadomości i śpiączka są bezpośrednim toksycznym następstwem wapnia >16 mg/dl na ośrodkowy układ nerwowy.',
          },
          {
            text: 'Przełom tarczycowy w przebiegu wola guzkowego',
            explanation: 'Objawy wynikają z toksyczności wapniowej i odwodnienia nerkowego, a nie nadmiaru hormonów tarczycy.',
          },
        ],
      },
      {
        stage: 'Badania',
        prompt: 'Deficyt płynowy u pacjentki oszacowano na ponad 5 litrów. Jaka jest PIERWSZA i kluczowa decyzja farmakologiczna w pierwszej godzinie na sali reanimacyjnej?',
        options: [
          {
            text: 'Masywny wlew dożylny 0,9% NaCl (1000 ml w pierwszej godzinie, następnie 200–300 ml/h) pod kontrolą ciśnienia i osłuchiwania płuc',
            explanation: 'Dokładnie tak! Rehydratacja solą fizjologiczną uzupełnia łożysko naczyniowe, wyprowadza ze wstrząsu i natychmiast wymusza nerkowe wydalanie wapnia.',
          },
          {
            text: 'Natychmiastowe podanie 100 mg furosemidu w bolusie bez kroplówki',
            explanation: 'Podanie diuretyku u pacjentki z ciśnieniem 80/50 mmHg doprowadziłoby do natychmiastowego zatrzymania krążenia w mechanizmie wstrząsu hipowolemicznego!',
          },
          {
            text: 'Podanie wlewu glukozy 20% z insuliną',
            explanation: 'Glukoza nie uzupełnia objętości wewnątrznaczyniowej i nie nasila kalciurii sodowej.',
          },
        ],
      },
      {
        stage: 'Rozpoznanie',
        prompt: 'Wynik pobranego przed wlewami iPTH wynosi 840 pg/ml. W pilnym USG szyi uwidoczniono olbrzymi, niejednorodny guz o średnicy 38 mm za prawym płatem tarczycy. Jakie jest rozpoznanie etiologiczne przełomu?',
        options: [
          {
            text: 'Przełom hiperkalcemiczny w przebiegu olbrzymiego gruczolaka lub raka przytarczycy prawej',
            explanation: 'Prawidłowe rozpoznanie. Ekstremalnie wysoki wapń i PTH w setkach pg/ml przy dużej masie guza wskazują na zaawansowaną pierwotną nadczynność przytarczyc.',
          },
          {
            text: 'Złośliwa hiperkalcemia w przebiegu raka drobnokomórkowego płuca',
            explanation: 'W raku drobnokomórkowym PTH byłoby stłumione do zera.',
          },
          {
            text: 'Zatrucie witaminą A',
            explanation: 'Witamina A nie wywołuje wzrostu parathormonu do 840 pg/ml ani guza przytarczycy.',
          },
        ],
      },
      {
        stage: 'Postępowanie',
        prompt: 'Po przetoczeniu 2 litrów 0,9% NaCl ciśnienie wzrosło do 115/70 mmHg, a diureza wynosi 80 ml/h. Jaki zestaw leków obniżających wapń należy wdrożyć w 2. etapie?',
        options: [
          {
            text: 'Kalcytonina łososiowa 4–8 j.m./kg s.c. co 8 h (szybki efekt w 2 h) oraz kwas zoledronowy 4 mg i.v. w powolnym wlewie (trwały efekt po 48 h)',
            explanation: 'Znakomita, perfekcyjna decyzja! Kalcytonina chroni chorą w pierwszych 48 godzinach, zanim kwas zoledronowy osiągnie pełną moc blokowania osteoklastów.',
          },
          {
            text: 'Doustny węglan wapnia w dawce 3 g na dobę',
            explanation: 'Podanie wapnia pacjentce z poziomem 16,2 mg/dl jest błędem śmiertelnym.',
          },
          {
            text: 'Teryparatyd podskórnie raz na dobę',
            explanation: 'Teryparatyd to analog PTH — pogłębiłby katastrofalną hiperkalcemię.',
          },
        ],
      },
    ],
  },
  {
    id: 'case-zespol-glodnych-kosci',
    title: 'Gwałtowny spadek wapnia po udanej operacji',
    patient: 'Janusz, 52 lata',
    difficulty: 'Zaawansowany',
    intro:
      '52-letni rolnik przebył planową operację wycięcia olbrzymiego gruczolaka prawej dolnej przytarczycy (średnica 3,5 cm, masa 4,2 g). Przed zabiegiem stężenie wapnia wynosiło 13,8 mg/dl, iPTH 680 pg/ml, a aktywność fosfatazy zasadowej (ALP) była wybitnie wysoka: 920 IU/l (norma do 120 IU/l). W 3. dobie po zabiegu pacjent zgłasza gwałtowne drżenia mięśni i silne mrowienie twarzy.',
    steps: [
      {
        stage: 'Objawy',
        prompt: 'W badaniu fizykalnym obecny jest wyraźny obustronny objaw Chvostka oraz objaw Trousseau. Pobrano pilne badania biochemiczne: wapń całkowity wynosi zaledwie 6,2 mg/dl, a wapń zjonizowany 0,78 mmol/l. Na jakie inne badanie elektrolitowe natychmiast zwracasz uwagę?',
        options: [
          {
            text: 'Stężenie fosforanów nieorganicznych oraz magnezu w surowicy',
            explanation: 'Prawidłowo! W zespole głodnych kości (HBS) wraz z wapniem gwałtownie spadają fosforany (w przeciwieństwie do niedoczynności przytarczyc, gdzie fosfor rośnie).',
          },
          {
            text: 'Stężenie żelaza w surowicy',
            explanation: 'Żelazo nie bierze udziału w nagłym procesie remineralizacji kości.',
          },
          {
            text: 'Aktywność kinazy kreatynowej CK-MB',
            explanation: 'Parametr kardiologiczny, nie różnicuje zaburzeń metabolicznych kośćca.',
          },
        ],
      },
      {
        stage: 'Badania',
        prompt: 'Wyniki: fosforany wynoszą 1,1 mg/dl (ciężka hipofosfatemia!), magnez 0,42 mmol/l (hipomagnezemia), a stężenie iPTH wynosi 32 pg/ml (prawidłowa czynność pozostałych przytarczyc!). Jaki mechanizm doprowadził do tak głębokiej hipokalcemii?',
        options: [
          {
            text: 'Nagły spadek PTH wyłączył osteolizę, a nadaktywne osteoblasty zachłannie wychwytują z krwi wapń, fosfor i magnez do odbudowy zdemineralizowanego kośćca',
            explanation: 'Znakomita znajomość patofizjologii! To klasyczny zespół głodnych kości (Hungry Bone Syndrome) napędzany przedoperacyjną osteoblastozą (ALP 920 IU/l).',
          },
          {
            text: 'Chirurg przypadkowo wyciął wszystkie cztery przytarczyce i doszło do trwałej hipoparatyreozy',
            explanation: 'Prawidłowe stężenie iPTH (32 pg/ml) oraz niska, a nie wysoka fosfatemia wykluczają jatrogenne wycięcie wszystkich przytarczyc.',
          },
          {
            text: 'Wystąpił ostry krwotok do przestrzeni zaotrzewnowej',
            explanation: 'Krwotok nie tłumaczy izolowanego zespołu hipokalcemii, hipofosfatemii i hipomagnezemii.',
          },
        ],
      },
      {
        stage: 'Rozpoznanie',
        prompt: 'Jakie jest ostateczne rozpoznanie u Janusza?',
        options: [
          {
            text: 'Ostry zespół głodnych kości (Hungry Bone Syndrome — HBS) powikłany tężyczką jawną po paratyreoidktomii',
            explanation: 'Pełne rozpoznanie kliniczne wyjaśniające dramatyczny spadek Ca, P i Mg.',
          },
          {
            text: 'Tężyczka nerwicowa wywołana stresem pooperacyjnym',
            explanation: 'Stężenie wapnia 6,2 mg/dl i fosforu 1,1 mg/dl wykluczają tło emocjonalne.',
          },
          {
            text: 'Ostra martwica cewek nerkowych',
            explanation: 'Mamy do czynienia z zaburzeniem wychwytu minerałów przez kościec.',
          },
        ],
      },
      {
        stage: 'Postępowanie',
        prompt: 'Jaki protokół leczenia należy wdrożyć, aby opanować objawy i umożliwić remineralizację kośćca?',
        options: [
          {
            text: 'Ciągły wlew dożylny 10% glukonianu wapnia z dołączeniem siarczanu magnezu oraz wysokie dawki kalcytriolu (2–4 µg/d) i węglanu wapnia p.o.',
            explanation: 'Dokładnie tak! Nienasycony kościec wymaga potężnej podaży substratów drogą dożylną i doustną przez wiele dni, a nawet tygodni po zabiegu.',
          },
          {
            text: 'Podanie kwasu zoledronowego w celu zahamowania obrotu kostnego',
            explanation: 'Bisfosfonian u pacjenta z wapniem 6,2 mg/dl i głodnymi kośćmi pogłębiłby hipokalcemię i zabił chorego!',
          },
          {
            text: 'Ograniczenie podaży płynów i soli kuchennej',
            explanation: 'Restrykcje nie mają zastosowania w zespole głodnych kości.',
          },
        ],
      },
    ],
  },
  {
    id: 'case-osteoporoza-metabolizm',
    title: 'Złamanie po schyleniu się po gazetę',
    patient: 'Helena, 74 lata',
    difficulty: 'Podstawowy',
    intro:
      '74-letnia emerytka została skierowana do poradni osteoporozy po przebytym przed miesiącem złamaniu kompresyjnym trzonu kręgu L1, do którego doszło podczas schylania się po poranną gazetę. Pacjentka wcześniej nie leczyła się przewlekle, neguje bóle kości przed incydentem.',
    steps: [
      {
        stage: 'Objawy',
        prompt: 'W wywiadzie pacjentka przebyła menopauzę w wieku 49 lat, nigdy nie stosowała HTZ, jej matka przebyła złamanie szyjki kości udowej w wieku 78 lat. Jak klasyfikujesz złamanie trzonu kręgu po tak błahym urazie?',
        options: [
          {
            text: 'Złamanie niskoenergetyczne (patologiczne osteoporotyczne), upoważniające do rozpoznania klinicznej osteoporozy',
            explanation: 'Prawidłowo! Złamanie pod wpływem siły mniejszej lub równej upadkowi z wysokości własnego ciała definiuje złamanie niskoenergetyczne i samoistnie potwierdza osteoporozę.',
          },
          {
            text: 'Złamanie wysokoenergetyczne urazowe',
            explanation: 'Schylenie się po gazetę nie jest urazem wysokoenergetycznym.',
          },
          {
            text: 'Fizjologiczna deformacja kręgosłupa bez znaczenia klinicznego',
            explanation: 'Złamanie kompresyjne kręgu jest poważnym incydentem klinicznym zwiastującym kaskadę kolejnych złamań.',
          },
        ],
      },
      {
        stage: 'Badania',
        prompt: 'Wykonano densytometrię DXA: T-score kręgosłupa L1–L4 wynosi -2,1 SD, a T-score szyjki kości udowej -2,6 SD. Stężenie 25(OH)D wynosi 14 ng/ml (głęboki niedobór). Jaka jest interpretacja całości obrazu?',
        options: [
          {
            text: 'Ciężka zaawansowana osteoporoza powikłana złamaniem z głębokim niedoborem witaminy D',
            explanation: 'Znakomicie! Obecność złamania kręgowego oraz T-score <= -2,5 w biodrze klasyfikuje pacjentkę do grupy bardzo wysokiego ryzyka kolejnych złamań.',
          },
          {
            text: 'Wyłącznie osteopenia, która nie kwalifikuje się do leczenia farmakologicznego',
            explanation: 'Kardynalny błąd: przebyte złamanie kręgowe ma pierwszeństwo przed wynikiem densytometrii.',
          },
          {
            text: 'Prawidłowa masa kostna typowa dla wieku',
            explanation: 'T-score -2,6 w biodrze jednoznacznie potwierdza osteoporozę wg kryteriów WHO.',
          },
        ],
      },
      {
        stage: 'Rozpoznanie',
        prompt: 'W kalkulatorze FRAX bezwzględne 10-letnie ryzyko poważnego złamania osteoporotycznego (MOF) wynosi 28%, a złamania biodra 12%. Jakie jest rozpoznanie?',
        options: [
          {
            text: 'Osteoporoza pomenopauzalna powikłana złamaniem kręgowym o bardzo wysokim ryzyku kolejnych złamań',
            explanation: 'Prawidłowe rozpoznanie. Ryzyko MOF >20% klasyfikuje pacjentkę do natychmiastowej, agresywnej interwencji terapeutycznej.',
          },
          {
            text: 'Zwyrodnienie stawów kręgosłupa (spondyloartroza)',
            explanation: 'Spondyloartroza dotyczy chrząstki stawowej, a nie ubytku macierzy beleczkowej.',
          },
          {
            text: 'Wrodzona łamliwość kości typu 1',
            explanation: 'Choroba genetyczna dzieci ujawniająca się wczesnymi złamaniami i błękitnymi twardówkami.',
          },
        ],
      },
      {
        stage: 'Postępowanie',
        prompt: 'Jaka strategia farmakoterapii jest najbardziej optymalna u tej pacjentki wg wytycznych PTE/IOF?',
        options: [
          {
            text: 'Nasycenie witaminą D3 (4000 j.m./d) + wapń w diecie (1000–1200 mg/d) oraz silne leczenie antyresorpcyjne (kwas zoledronowy 5 mg i.v. raz/rok lub denosumab) bądź anaboliczne (teryparatyd)',
            explanation: 'Wzorowa decyzja! U pacjentki z bardzo wysokim ryzykiem złamań i świeżym złamaniem kręgu konieczna jest potężna ochrona kośćca po wyrównaniu puli witaminy D.',
          },
          {
            text: 'Wyłącznie zalecenie diety bogatej w galaretki z nóżek wieprzowych',
            explanation: 'Kolagen z diety nie odbuduje zmineralizowanej mikroarchitektury kości i nie zapobiegnie kolejnym złamaniom.',
          },
          {
            text: 'Wdrożenie leczenia glikokortykosteroidami doustnymi',
            explanation: 'Sterydy nasilają osteoporozę i doprowadziłyby do dalszej destrukcji kręgosłupa.',
          },
        ],
      },
    ],
  },
];
