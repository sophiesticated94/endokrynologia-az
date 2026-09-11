import type { GonadCaseDraft } from './cases-gonads-types.ts';

export const gonadCasesPart2: GonadCaseDraft[] = [
  {
    id: 'case-gonady-hiperandrogenizm-kobiecy',
    title: 'Gwałtowny zarost i obniżenie głosu w 4 miesiące',
    patient: 'Kobieta, 29 lat',
    difficulty: 'Zaawansowany',
    intro: 'Młoda kobieta zgłasza się z powodu gwałtownie postępującego owłosienia na twarzy i klatce piersiowej, obniżenia tembru głosu oraz powiększenia łechtaczki, które rozwinęły się w ciągu 4 miesięcy.',
    steps: [
      {
        prompt: 'W badaniu fizykalnym: łysienie skroniowe typu męskiego, klitoromegalia 3,5 cm, mFG 22 punkty. Co odróżnia ten obraz od typowego PCOS?',
        context: 'Gwałtowny początek, szybka progresja i obecność objawów wirylizacji.',
        options: [
          { text: 'Gwałtowna progresja i cechy wirylizacji (klitoromegalia, mutacja głosu) są alarmem onkologicznym sugerującym guz wirylizujący', explanation: 'W PCOS hiperandrogenizm narasta wolno od okresu pokwitania i niemal nigdy nie powoduje klitoromegalii ani obniżenia barwy głosu.' },
          { text: 'PCOS zawsze rozwija się w ciągu kilku tygodni u kobiet po 50. roku życia', explanation: 'PCOS jest chorobą wieku rozrodczego o przebiegu przewlekłym, nie ostrym onkologicznym.' },
        ],
      },
      {
        prompt: 'Jakie stężenie testosteronu całkowitego w surowicy stanowi krytyczny próg podejrzenia guza androgenozależnego u kobiety?',
        context: 'Pobrano krew rano.',
        options: [
          { text: 'Testosteron całkowity > 150–200 ng/dl (lub DHEA-S > 700–800 ug/dl)', explanation: 'Stężenia przekraczające dwukrotnie górną granicę normy (> 150–200 ng/dl) wymagają bezwzględnej pilnej diagnostyki obrazowej w kierunku guza jajnika lub nadnercza.' },
          { text: 'Testosteron całkowity poniżej 10 ng/dl', explanation: 'To stężenie niskie, wykluczające guz wirylizujący.' },
        ],
      },
      {
        prompt: 'Testosteron wynosi 310 ng/dl, DHEA-S w normie. USG przezpochwowe wykazuje lity, bogato unaczyniony guz prawego jajnika o średnicy 4 cm. Co to za nowotwór?',
        context: 'Nadnercza w tomografii komputerowej bez zmian guzowatych.',
        options: [
          { text: 'Guz ze sznurów płciowych i zrębu jajnika z komórek Sertoliego i Leydiga (arrhenoblastoma / androblastoma)', explanation: 'Arrhenoblastoma to rzadki nowotwór jajnika wydzielający olbrzymie ilości testosteronu, odpowiedzialny za ciężką wirylizację u młodych kobiet.' },
          { text: 'Łagodny potworniak dojrzały zawierający zęby i włosy', explanation: 'Potworniak dojrzały (torbiel skórzasta) nie produkuje testosteronu i nie wywołuje wirylizacji.' },
        ],
      },
      {
        prompt: 'Jakie jest leczenie z wyboru u tej młodej pacjentki pragnącej zachować płodność?',
        context: 'Przeciwległy jajnik i macica są makroskopowo i ultrasonograficznie prawidłowe.',
        options: [
          { text: 'Jednostronne usunięcie przydatków prawych (salpingo-ooforektomia) z badaniem śródoperacyjnym i oceną stagingu', explanation: 'U młodych kobiet z guzem w stopniu IA o niskiej złośliwości jednostronna adneksektomia pozwala na zachowanie przeciwległego jajnika i macicy, prowadząc do szybkiego spadku testosteronu.' },
          { text: 'Podanie samej spironolaktonu w dawce 25 mg bez operacji', explanation: 'Leczenie farmakologiczne guza nowotworowego jest rażącym błędem sztuki lekarskiej.' },
        ],
      },
    ],
  },
  {
    id: 'case-gonady-brak-miesiaczki',
    title: 'Zanik miesiączek u biegaczki długodystansowej',
    patient: 'Kobieta, 22 lata',
    difficulty: 'Podstawowy',
    intro: 'Studentka AWF trenująca biegi maratońskie zgłasza się z powodu braku miesiączki od 9 miesięcy. Wcześniej cykle były regularne.',
    steps: [
      {
        prompt: 'Masa ciała 47 kg, wzrost 168 cm (BMI 16,7 kg/m2). W teście ciążowym hCG ujemne. Jaki mechanizm neuroendokrynny odpowiada za brak miesiączki?',
        context: 'Rygorystyczna dieta niskokaloryczna i codzienne treningi po 15 km.',
        options: [
          { text: 'Czynnościowy brak miesiączki pochodzenia podwzgórzowego (FHA) wynikający z deficytu energii i spadku pulsacji GnRH', explanation: 'Niski poziom leptyny i ujemny bilans energetyczny hamują neurony KNDy i kisspeptynę, co blokuje generator pulsów GnRH w podwzgórzu.' },
          { text: 'Wypadanie płatka zastawki mitralnej', explanation: 'Wada zastawkowa nie powoduje supresji wydzielania gonadotropin podwzgórzowych.' },
        ],
      },
      {
        prompt: 'Wykonano test z progestagenem (medroksyprogesteron 10 mg przez 10 dni). Po odstawieniu nie wystąpiło żadne krwawienie (test ujemny). Co to oznacza?',
        context: 'Błona śluzowa macicy (endometrium) w USG ma grubość 2 mm.',
        options: [
          { text: 'Ciężki niedobór endogennych estrogenów (brak wcześniejszego przygotowania endometrium do złuszczenia)', explanation: 'Ujemny test z progestagenem dowodzi, że stężenie estradiolu jest zbyt niskie, by doprowadzić do proliferacji błony śluzowej macicy.' },
          { text: 'Obecność zaawansowanej ciąży mnogiej', explanation: 'Test ciążowy był ujemny, a endometrium jest skrajnie cienkie i atroficzne.' },
        ],
      },
      {
        prompt: 'FSH 2,4 IU/l, LH 1,1 IU/l, estradiol < 15 pg/ml, TSH i prolaktyna w normie. Gęstość kości: Z-score -2,1. Jakie jest rozpoznanie?',
        context: 'Element tzw. triady sportsmenek (niedobór energii, zaburzenia miesiączkowania, niska gęstość kości).',
        options: [
          { text: 'Czynnościowy hipogonadyzm hipogonadotropowy (FHA) powikłany wczesną osteopenią/osteoporozą', explanation: 'Niskie gonadotropiny przy głęboko obniżonym estradiolu i deficycie energetycznym potwierdzają FHA i zagrożenie złamaniami zmęczeniowymi.' },
          { text: 'Akromegalia o przebiegu bezobjawowym', explanation: 'W akromegalii występuje nadmiar hormonu wzrostu i IGF-1, bez hipoestrogenizmu hipogonadotropowego.' },
        ],
      },
      {
        prompt: 'Jakie jest leczenie pierwszego wyboru u pacjentki z FHA?',
        context: 'Pacjentka dopytuje, czy pigułka antykoncepcyjna przywróci zdrowie kości.',
        options: [
          { text: 'Zwiększenie podaży kalorii, redukcja obciążeń treningowych i współpraca z dietetykiem sportowym (oraz przezskórny estradiol w razie braku poprawy)', explanation: 'Wyrównanie bilansu energetycznego jest jedynym leczeniem przyczynowym. Doustna antykoncepcja maskuje problem krwawieniem z odstawienia i nie odbudowuje kości tak skutecznie jak odzyskanie energii.' },
          { text: 'Zalecenie całkowitego zaprzestania picia wody', explanation: 'Ograniczenie płynów doprowadziłoby do ostrego uszkodzenia nerek i zapaści.' },
        ],
      },
    ],
  },
  {
    id: 'case-gonady-menopauza-mht',
    title: 'Nocne poty i uderzenia gorąca u 34-latki',
    patient: 'Kobieta, 34 lata',
    difficulty: 'Podstawowy',
    intro: 'Młoda kobieta zgłasza się z powodu braku miesiączki od 6 miesięcy oraz wyczerpujących nocnych potów, zaburzeń snu i wahań nastroju.',
    steps: [
      {
        prompt: 'Pacjentka ma 34 lata, w rodzinie matka przestała miesiączkować w wieku 36 lat. Jakie badania hormonalne należy wykonać w pierwszej kolejności?',
        context: 'Ciąża została wykluczona (b-hCG < 1,0 mIU/ml).',
        options: [
          { text: 'FSH oraz estradiol w dwóch niezależnych oznaczeniach w odstępie co najmniej 4–6 tygodni', explanation: 'Kryteria ESHRE dla przedwczesnej niewydolności jajników (POI) wymagają potwierdzenia FSH > 25 IU/l w dwóch pomiarach przed 40. rokiem życia.' },
          { text: 'Jednorazowe oznaczenie glukozy w moczu', explanation: 'Glukoza w moczu nie diagnozuje czynności ani rezerwy jajnikowej.' },
        ],
      },
      {
        prompt: 'FSH wynosi 68 IU/l w pierwszym i 74 IU/l w drugim badaniu, estradiol < 10 pg/ml, AMH < 0,02 ng/ml. Jakie jest rozpoznanie?',
        context: 'Kariotyp prawidłowy żeński 46,XX, premutacja genu FMR1 ujemna.',
        options: [
          { text: 'Przedwczesna niewydolność jajników (POI — Premature Ovarian Insufficiency)', explanation: 'Wiek < 40 lat, wtórny brak miesiączki > 4 miesiące i powtarzalnie podwyższone FSH > 25 IU/l jednoznacznie definiują POI.' },
          { text: 'Ostre zapalenie wyrostka robaczkowego', explanation: 'Brak objawów ostrego brzucha i sepsy; obraz typowy dla wygaśnięcia funkcji gonad.' },
        ],
      },
      {
        prompt: 'Dlaczego ta 34-letnia pacjentka bezwzględnie wymaga leczenia hormonalnego aż do 50.–51. roku życia?',
        context: 'Nawet jeśli pogodziła się z utratą płodności.',
        options: [
          { text: 'Długotrwały brak estrogenów u młodej kobiety drastycznie zwiększa ryzyko przedwczesnej osteoporozy, choroby niedokrwiennej serca i demencji', explanation: 'Substytucja w POI nie jest opcją kosmetyczną, lecz leczeniem ratującym układ krążenia i kościec do średniego wieku naturalnej menopauzy.' },
          { text: 'Hormony podaje się wyłącznie w celu stymulacji wzrostu paznokci', explanation: 'Estrogeny pełnią fundamentalne funkcje metaboliczne i naczyniowe w całym organizmie.' },
        ],
      },
      {
        prompt: 'Jaki schemat terapii hormonalnej jest optymalny u pacjentki z zachowaną macicą?',
        context: 'Brak czynników ryzyka zakrzepowo-zatorowego.',
        options: [
          { text: 'Pełnodawkowa terapia przezskórnym 17-beta-estradiolem (np. 75–100 mcg plaster) w połączeniu z cyklicznym mikronizowanym progesteronem 200 mg', explanation: 'Przezskórny estradiol zapewnia fizjologiczne stężenia u młodej kobiety bez obciążenia wątroby, a progesteron chroni endometrium przed rakiem.' },
          { text: 'Monoterapia samym estradiolem doustnym bez żadnego progestagenu', explanation: 'Stosowanie samych estrogenów przy zachowanej macicy grozi rakiem endometrium.' },
        ],
      },
    ],
  },
  {
    id: 'case-gonady-ivf-art',
    title: 'Wodobrzusze i duszność po punkcji jajników',
    patient: 'Kobieta, 28 lat',
    difficulty: 'Zaawansowany',
    intro: 'Kobieta z fenotypem PCOS po kontrolowanej stymulacji jajników i punkcji 24 oocytów zgłasza się 5 dni po zabiegu z narastającą dusznością i obwodem brzucha.',
    steps: [
      {
        prompt: 'W badaniu: brzuch napięty, bolesny, obwód wzrósł o 12 cm, tętno 110/min, RR 95/60 mmHg, diureza < 20 ml/h. Co podejrzewasz?',
        context: 'Jako trigger dojrzewania oocytów podano hCG w dawce 10 000 j.m. ze świeżym transferem zarodka.',
        options: [
          { text: 'Ciężki zespół hiperstymulacji jajników (OHSS — Ovarian Hyperstimulation Syndrome)', explanation: 'Podanie hCG u pacjentki z dużą liczbą pęcherzyków wyzwala masywną produkcję VEGF przez komórki ziarniste, prowadząc do uogólnionego przesiąkania naczyniowego.' },
          { text: 'Perforacja wrzodu dwunastnicy', explanation: 'Wywiad stymulacji IVF, punkcji oocytów i obustronnie powiększonych jajników jednoznacznie wskazuje na OHSS.' },
        ],
      },
      {
        prompt: 'Morfologia wykazuje: hematokryt (Hct) 51%, leukocytoza 19,5 tys./ul, kreatynina 1,6 mg/dl. Jak zinterpretować te wyniki?',
        context: 'USG: jajniki o wymiarach 13 x 10 cm, płyn w jamie otrzewnej i jamie opłucnowej.',
        options: [
          { text: 'Masywna hemokoncentracja i ucieczka osocza do trzeciej przestrzeni z ostrym przednerkowym uszkodzeniem nerek i ryzykiem zakrzepicy', explanation: 'Hct > 45–50% to sygnał alarmowy krytycznego OHSS oznaczający utratę płynu z łożyska naczyniowego, skrajną lepkość krwi i zagrożenie zatorowością płucną.' },
          { text: 'Prawidłowy stan nawodnienia po udanym transferze', explanation: 'Hematokryt 51% i skąpomocz świadczą o ciężkiej, zagrażającej życiu hipowolemii wewnątrznaczyniowej.' },
        ],
      },
      {
        prompt: 'Jakie jest natychmiastowe postępowanie ratunkowe w warunkach szpitalnych?',
        context: 'Pacjentka wymaga intensywnego nadzoru hemodynamicznego.',
        options: [
          { text: 'Hospitalizacja, wlewy 20% roztworu albuminy, płynoterapia krystaloidowa, profilaktyka przeciwzakrzepowa heparyną drobnocząsteczkową (HDCz) i kabergolina', explanation: 'Albumina odbudowuje ciśnienie onkotyczne, HDCz chroni przed zakrzepicą, a kabergolina blokuje receptory VEGFR-2 hamując ucieczkę osocza.' },
          { text: 'Podanie leków moczopędnych (furosemidu) bez uzupełnienia łożyska naczyniowego', explanation: 'Furosemid u pacjentki z hipowolemią wywołałby natychmiastowy wstrząs hipowolemiczny i zgon.' },
        ],
      },
      {
        prompt: 'Jak należało zapobiec temu powikłaniu na etapie protokołu stymulacji?',
        context: 'Pacjentka miała 24 dojrzałe pęcherzyki i estradiol 4800 pg/ml w dniu triggera.',
        options: [
          { text: 'Zastosowanie agonisty GnRH (zamiast hCG) do triggera owulacji oraz odroczenie transferu i witryfikacja wszystkich zarodków (freeze-all)', explanation: 'Trigger agonistą GnRH i zamrożenie zarodków całkowicie eliminują ekspozycję na hCG, zapobiegając uwalnianiu VEGF i w 100% eliminując ciężki OHSS.' },
          { text: 'Podwojenie dawki hCG do 20 000 j.m. i nakazanie picia wody morskiej', explanation: 'Taki błąd wywołałby zgon pacjentki w mechanizmie wstrząsu i zakrzepicy.' },
        ],
      },
    ],
  },
  {
    id: 'case-gonady-onkoplednosc',
    title: 'Zabezpieczenie płodności przed chemioterapią',
    patient: 'Kobieta, 27 lat',
    difficulty: 'Zaawansowany',
    intro: '27-letnia mężatka z nowo zdiagnozowanym chłoniakiem Hodgkina w stadium IIB została zakwalifikowana do chemioterapii z udziałem leków alkilujących.',
    steps: [
      {
        prompt: 'Lekarz onkolog planuje rozpoczęcie chemioterapii za 2,5 tygodnia. Dlaczego chemioterapia z lekami alkilującymi zagraża płodności?',
        context: 'Leki alkilujące: cyklofosfamid, dakarbazyna.',
        options: [
          { text: 'Leki alkilujące powodują pęknięcia DNA w pęcherzykach pierwotnych jajnika, wyzwalając ich apoptozę i niszcząc nieodnawialną rezerwę komórek', explanation: 'Kobieta rodzi się ze skończoną pulą oocytów; zniszczenie puli rezerwowej prowadzi do trwałej bezpłodności i jatrogennego POI.' },
          { text: 'Leki alkilujące przekształcają komórki jajowe w komórki wątrobowe', explanation: 'Leki przeciwnowotworowe nie wywołują metaplazji oocytów w hepatocyty.' },
        ],
      },
      {
        prompt: 'Pacjentka znajduje się obecnie w 19. dniu cyklu miesiączkowego. Jak zaplanować stymulację owulacji bez odraczania chemioterapii?',
        context: 'Czas do rozpoczęcia leczenia przeciwnowotworowego wynosi 16 dni.',
        options: [
          { text: 'Wdrożenie stymulacji w protokole „random-start” natychmiast, w fazie lutealnej, z użyciem gonadotropin i antagonisty GnRH', explanation: 'Protokół random-start umożliwia rozpoczęcie stymulacji w dowolnym dniu cyklu bez czekania na miesiączkę, pozwalając na pobranie oocytów po 10–12 dniach.' },
          { text: 'Odrzucenie procedury i nakazanie czekania na naturalną owulację za 3 miesiące', explanation: 'Zwłoka z rozpoczęciem chemioterapii chłoniaka zagrażałaby życiu pacjentki.' },
        ],
      },
      {
        prompt: 'Podczas procedury pobrano 14 dojrzałych oocytów (MII). Jaka metoda kriokonserwacji jest współczesnym złotym standardem?',
        context: 'Pacjentka i mąż decydują o zabezpieczeniu materiału.',
        options: [
          { text: 'Ultraszybkie mrożenie (witryfikacja) oocytów lub zarodków zapobiegające tworzeniu kryształków lodu niszczących wrzeciono kariokinetyczne', explanation: 'Witryfikacja osiąga przeżywalność oocytów po rozmrożeniu na poziomie > 90%, przewyższając dawne metody powolnego zamrażania.' },
          { text: 'Trzymanie oocytów w domowej zamrażarce w temperaturze -4 stopni Celsjusza', explanation: 'Komórki rozrodcze wymagają przechowywania w ciekłym azocie w temperaturze -196°C.' },
        ],
      },
      {
        prompt: 'Jakie działanie farmakologiczne można dodatkowo zastosować w trakcie trwania chemioterapii w celu protekcji jajników?',
        context: 'Jako postępowanie uzupełniające obok witryfikacji.',
        options: [
          { text: 'Podawanie depot agonisty GnRH (np. gosereliny) przez cały okres chemioterapii w celu czasowej supresji pęcherzyków jajnikowych', explanation: 'Supresja osi HPG agonistą GnRH zmniejsza przepływ naczyniowy w jajniku i ekspozycję pęcherzyków, obniżając ryzyko trwałego POI o ok. 30–40%.' },
          { text: 'Codzienne podawanie wysokich dawek testosteronu doustnie', explanation: 'Testosteron nie chroni oocytów przed lekami alkilującymi.' },
        ],
      },
    ],
  },
  {
    id: 'case-gonady-trans-feminizujaca',
    title: 'Monitorowanie feminizującej terapii hormonalnej',
    patient: 'Kobieta (transpłciowa), 32 lata',
    difficulty: 'Podstawowy',
    intro: 'Transpłciowa kobieta zgłasza się na wizytę kontrolną po 6 miesiącach od wdrożenia terapii feminizującej (GAHT). Przyjmuje 17-beta-estradiol oraz octan cyproteronu.',
    steps: [
      {
        prompt: 'Jakie są docelowe wartości stężenia testosteronu całkowitego i 17-beta-estradiolu wg wytycznych Endocrine Society i WPATH SOC-8?',
        context: 'Badania pobrane rano przed przyjęciem kolejnej dawki leków.',
        options: [
          { text: 'Testosteron < 50 ng/dl (< 1,7 nmol/l) oraz estradiol 100–200 pg/ml (360–730 pmol/l)', explanation: 'Docelowy poziom testosteronu odpowiada zakresowi referencyjnemu dla kobiet cispłciowych, a estradiol poziomowi wczesnej do środkowej fazy folikularnej.' },
          { text: 'Testosteron 600 ng/dl oraz estradiol < 20 pg/ml', explanation: 'To stężenia typowe dla mężczyzn, uniemożliwiające feminizację.' },
        ],
      },
      {
        prompt: 'Wyniki pacjentki: testosteron 28 ng/dl, estradiol 145 pg/ml, prolaktyna 72 ng/ml (norma < 25 ng/ml). Jak zinterpretować stężenie prolaktyny?',
        context: 'Pacjentka przyjmuje octan cyproteronu (CPA) w dawce 25 mg/dobę. Brak zaburzeń widzenia.',
        options: [
          { text: 'Hiperprolaktynemia polekowa indukowana octanem cyproteronu (CPA) i estrogenami, wymagająca redukcji dawki CPA do 10 mg/dobę', explanation: 'CPA pobudza laktotrofy przysadki. Nowoczesne wytyczne zalecają obniżenie dawki CPA do 10–12,5 mg/d lub zamianę na analog GnRH, aby uniknąć ryzyka oponiaka.' },
          { text: 'Natychmiastowe rozpoznanie złośliwego raka rdzeniastego móżdżku', explanation: 'Wzrost prolaktyny po CPA jest znanym efektem farmakologicznym, nie rakiem móżdżku.' },
        ],
      },
      {
        prompt: 'Pacjentka pyta o zamianę estradiolu na etynyloestradiol, o którym czytała w internecie. Dlaczego jest on bezwzględnie przeciwwskazany?',
        context: 'Etynyloestradiol to syntetyczny estrogen obecny w dawnych doustnych środkach antykoncepcyjnych.',
        options: [
          { text: 'Etynyloestradiol wielokrotnie zwiększa ryzyko żylnej choroby zakrzepowo-zatorowej (VTE) i zawału oraz nie daje się monitorować w testach laboratoryjnych estradiolu', explanation: 'Syntetyczne estrogeny silnie indukują syntezę wątrobowych czynników krzepnięcia, stwarzając nieakceptowalne ryzyko zakrzepicy żył głębokich i zatorowości płucnej.' },
          { text: 'Etynyloestradiol powoduje natychmiastowe zrośnięcie kości czaszki u dorosłych', explanation: 'Kości czaszki u dorosłego są już dawno zrośnięte.' },
        ],
      },
      {
        prompt: 'Gdyby pacjentka paliła tytoń lub miała BMI > 30 kg/m2, jaka droga podania 17-beta-estradiolu jest najbezpieczniejsza?',
        context: 'Ocena ryzyka zakrzepowo-zatorowego.',
        options: [
          { text: 'Droga przezskórna (plaster transdermalny lub żel na skórę)', explanation: 'Przezskórny estradiol omija krążenie wrotne i metabolizm pierwszego przejścia przez wątrobę, nie zwiększając stężenia czynników krzepnięcia ani ryzyka VTE.' },
          { text: 'Iniekcje domięśniowe w dawce dziesięciokrotnie przekraczającej normę', explanation: 'Dawki suprafizjologiczne u palaczki wywołałyby masywną zakrzepicę.' },
        ],
      },
    ],
  },
  {
    id: 'case-gonady-trans-maskulinizujaca',
    title: 'Czerwienienie twarzy i wzrost hematokrytu w terapii testosteronem',
    patient: 'Mężczyzna (transpłciowy), 26 lat',
    difficulty: 'Zaawansowany',
    intro: 'Transpłciowy mężczyzna leczony testosteronem od 14 miesięcy zgłasza się na kontrolę. W badaniach laboratoryjnych stwierdzono izolowane podwyższenie hematokrytu.',
    steps: [
      {
        prompt: 'Hematokryt (Hct) wynosi 54,8%, hemoglobina 18,6 g/dl. Testosteron całkowity w dołku (trough) wynosi 680 ng/dl. Jakie zagrożenie niesie Hct > 54%?',
        context: 'Pacjent przyjmuje testosteron enantan 250 mg co 2 tygodnie domięśniowo.',
        options: [
          { text: 'Krytyczny wzrost lepkości krwi z wysokim ryzykiem udaru mózgu, zatorowości płucnej i incydentów wieńcowych', explanation: 'Erytrocytoza indukowana testosteronem przy Hct > 54% stanowi bezwzględne wskazanie do interwencji terapeutycznej wg wytycznych Endocrine Society.' },
          { text: 'Zwiększone ryzyko nagłego pęknięcia śledziony', explanation: 'Sama erytrocytoza nie powoduje samoistnego pęknięcia śledziony.' },
        ],
      },
      {
        prompt: 'Jaki mechanizm odpowiada za wzrost masy erytrocytarnej pod wpływem testosteronu?',
        context: 'Stężenie ferrytyny w normie.',
        options: [
          { text: 'Stymulacja wydzielania erytropoetyny (EPO) w nerkach oraz bezpośrednie hamowanie hepcydyny, zwiększające biodostępność żelaza', explanation: 'Androgeny modulują transkrypcję EPO i supresują hepcydynę, co u części pacjentów prowadzi do nadmiernej stymulacji szpiku kostnego.' },
          { text: 'Konwersja limfocytów B w erytrocyty w węzłach chłonnych', explanation: 'Erytrocyty powstają wyłącznie w szpiku kostnym z komórek macierzystych hematopoezy.' },
        ],
      },
      {
        prompt: 'Jakie jest natychmiastowe postępowanie u tego pacjenta przy Hct 54,8%?',
        context: 'Brak innych objawów, ciśnienie 140/90 mmHg.',
        options: [
          { text: 'Wykonanie upustu krwi (flebotomia 400–500 ml), wydłużenie odstępów między iniekcjami i rozważenie zmiany na żel transdermalny', explanation: 'Upust krwi szybko zmniejsza lepkość, a zmiana na preparat przezskórny eliminuje wysokie stężenia szczytowe testosteronu odpowiedzialne za wyrzut EPO.' },
          { text: 'Podanie witaminy B12 i kwasu foliowego w iniekcjach', explanation: 'Witaminy krwiotwórcze nasiliłyby niepożądaną erytrocytozę.' },
        ],
      },
      {
        prompt: 'Pacjent zgłasza również nawrót plamień z dróg rodnych mimo braku miesiączki od roku. Co może być przyczyną przy wysokim testosteronie?',
        context: 'Ginekologiczne badanie USG wykazuje pogrubiałe endometrium 7 mm.',
        options: [
          { text: 'Nadmierna obwodowa aromatyzacja testosteronu do estradiolu (CYP19A1), stymulująca rozrost błony śluzowej macicy', explanation: 'Przy wysokich stężeniach testosteronu aromataza w tkance tłuszczowej konwertuje nadmiar androgenów do estradiolu, co może wywołać krwawienia przełomowe.' },
          { text: 'Całkowity brak jakichkolwiek enzymów steroidogenezy w organizmie', explanation: 'Niedobór enzymów uniemożliwiłby syntezę hormonów, a pacjent przyjmuje egzogenny hormon.' },
        ],
      },
    ],
  },
  {
    id: 'case-gonady-dsd',
    title: 'Pierwotny brak miesiączki i guzek w pachwinie',
    patient: 'Kobieta, 17 lat',
    difficulty: 'Zaawansowany',
    intro: '17-letnia dziewczyna zgłasza się z powodu braku pierwszej miesiączki. W wywiadzie w dzieciństwie operowano u niej obustronną przepuklinę pachwinową.',
    steps: [
      {
        prompt: 'W badaniu: wysoki wzrost (176 cm), prawidłowo rozwinięte piersi (Tanner IV/V), brak owłosienia łonowego i pachowego (Tanner I). Co podejrzewasz?',
        context: 'W badaniu ginekologicznym pochwa jest ślepo zakończona o długości 3 cm.',
        options: [
          { text: 'Zespół całkowitej niewrażliwości na androgeny (CAIS — zespół Morrisa, 46,XY DSD)', explanation: 'Prawidłowy rozwój piersi (efekt aromatyzacji testosteronu do estradiolu) przy całkowitym braku owłosienia androgenozależnego i ślepej pochwie to klasyczny obraz CAIS.' },
          { text: 'Wrodzona niedoczynność kory nadnerczy', explanation: 'Brak związku z brakiem owłosienia i ślepą pochwą przy kariotypie 46,XY.' },
        ],
      },
      {
        prompt: 'W USG miednicy mniejszej stwierdzono całkowity brak macicy i jajników. Dlaczego pacjentka z CAIS nie ma macicy?',
        context: 'W kanale pachwinowym uwidoczniono jądra o prawidłowej strukturze.',
        options: [
          { text: 'Jądra płodowe wydzielały prawidłowy hormon antymüllerowski (AMH), który wywołał regresję przewodów Müllera in utero', explanation: 'Komórki Sertolego są w pełni sprawne i produkują AMH, co eliminuje macicę i jajowody. Brak wrażliwości na testosteron z kolei uniemożliwia rozwój przewodów Wolffa.' },
          { text: 'Macica została rozpuszczona przez kwas foliowy przyjmowany przez matkę', explanation: 'Kwas foliowy jest niezbędny do prawidłowego rozwoju cewy nerwowej płodu i nie niszczy narządów.' },
        ],
      },
      {
        prompt: 'Badania laboratoryjne: kariotyp 46,XY, testosteron 24 nmol/l (męski zakres), LH podwyższone (18 IU/l). Jakie jest ostateczne rozpoznanie?',
        context: 'Wykryto mutację inaktywującą w genie receptora androgenowego (AR) na chromosomie X.',
        options: [
          { text: 'Zespół całkowitej niewrażliwości na androgeny (CAIS)', explanation: 'Defekt receptora AR uniemożliwia odpowiedź tkanek na testosteron i DHT, a brak ujemnego sprzężenia na przysadkę skutkuje wysokim LH.' },
          { text: 'Zespół Swyera (czysta dysgenezja gonad)', explanation: 'W zespole Swyera gonady to pasma nieprodukujące AMH, dlatego macica jest obecna, a piersi nie rozwijają się bez hormonów.' },
        ],
      },
      {
        prompt: 'Jakie jest właściwe postępowanie chirurgiczne i hormonalne po zakończeniu okresu pokwitania?',
        context: 'Pacjentka czuje się w 100% kobietą.',
        options: [
          { text: 'Obustronna gonadektomia (usunięcie jąder z powodu ryzyka nowotworzenia) po zakończeniu pokwitania, a następnie substytucja samym estradiolem', explanation: 'Jądra w CAIS pozostawia się do ukończenia spontanicznego pokwitania (dają naturalną feminizację z aromatyzacji), po czym usuwa się je z uwagi na ryzyko nowotworu i wdraża estrogeny.' },
          { text: 'Podanie megadawek testosteronu w celu wymuszenia mutacji głosu', explanation: 'Receptory są całkowicie niewrażliwe na testosteron, więc podanie androgenów nie wywoła żadnego efektu biologicznego.' },
        ],
      },
    ],
  },
];
