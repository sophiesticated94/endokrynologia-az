import type { ParathyroidCaseDraft } from './cases-parathyroid-types.ts';

export const parathyroidCasesPart3: ParathyroidCaseDraft[] = [
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
