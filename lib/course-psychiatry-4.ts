import { type DraftLesson, q } from './course-types.ts';

export const draftPsychiatryPart4: DraftLesson[] = [
  {
    id: 'monitorowanie-stezen-tdm',
    moduleId: 'psych-farmakologia',
    title: 'Monitorowanie stężeń leków we krwi (TDM) w psychiatrii wg AGNP 2026',
    subtitle: 'Kategorie rekomendacji, okna terapeutyczne, stężenie minimalne Cmin i interpretacja',
    group: 'Precyzyjna psychofarmakologia i metabolizm',
    minutes: 18,
    goals: [
      'Zastosujesz wytyczne AGNP 2026 i zidentyfikujesz leki z poziomem rekomendacji 1 (bezwzględnie zalecany TDM).',
      'Prawidłowo zaplanujesz pobranie krwi w stanie stacjonarnym w punkcie stężenia minimalnego (Cmin, trough level).',
      'Zinterpretujesz stężenia poza zakresem terapeutycznym w kontekście braku compliance i polimorfizmów CYP.'
    ],
    sections: [
      {
        title: 'Kategorie rekomendacji TDM według konsensusu AGNP 2026',
        text: 'Grupa Robocza ds. Neuropsychofarmakologii i Farmakopsychiatrii (AGNP) klasyfikuje leki psychotropowe pod kątem zasadności TDM na 4 poziomy: Poziom 1 (silnie zalecany – lit, klozapina, nortryptylina, haloperydol); Poziom 2 (zalecany – większość SGA, escitalopram, wenlafaksyna); Poziom 3 (przydatny w specyficznych problemach); Poziom 4 (potencjalnie przydatny). W poziomie 1 stężenie w osoczu bezpośrednio koreluje z przeżywalnością i kontrolą choroby.'
      },
      {
        title: 'Złote zasady pobierania próbek: stan stacjonarny i Cmin',
        text: 'Badanie TDM jest diagnostycznie wiarygodne wyłącznie wtedy, gdy spełnione są dwa warunki: 1) Osiągnięto stan stacjonarny (steady state), czyli po upływie co najmniej 4–5 okresów biologicznego półtrwania (t1/2) leku w stałej dawce; 2) Próbkę pobiera się w punkcie stężenia korytowego (trough concentration, Cmin) – dokładnie przed kolejną dawką, typowo 12 godzin (lub 24h w dawkowaniu 1x/d) po wieczornej dawce, na czczo.'
      },
      {
        title: 'Wnioskowanie kliniczne i współczynnik C/D',
        text: 'Interpretacja wyniku opiera się na tzw. współczynniku stężenia do dawki (Concentration-to-Dose ratio, C/D). Jeśli pacjent przyjmuje maksymalną dawkę sertraliny (200 mg), a stężenie w surowicy wynosi zero lub jest skrajnie niskie, wskazuje to na nieprzestrzeganie zaleceń (non-compliance) lub skrajnie szybki metabolizm (ultrarapid metabolizer). Z kolei stężenie toksyczne przy małej dawce nakazuje podejrzewać fenotyp wolnego metabolizatora (poor metabolizer).'
      }
    ],
    table: {
      headers: ['Lek psychotropowy', 'Poziom AGNP 2026', 'Zakres terapeutyczny stężenia', 'Krytyczne stężenie toksyczne'],
      rows: [
        ['Węglan litu', 'Poziom 1 (silnie zalecany)', '0,6 – 0,8 mmol/l (podtrzymanie)', '> 1,2 mmol/l (ostra neurotoksyczność)'],
        ['Klozapina', 'Poziom 1 (silnie zalecany)', '350 – 600 ng/ml', '> 1000 ng/ml (ryzyko drgawek)'],
        ['Nortryptylina', 'Poziom 1 (silnie zalecany)', '50 – 150 ng/ml (okno terapeutyczne)', '> 200 ng/ml (kardiotoksyczność)'],
        ['Wenlafaksyna (z metabolitem)', 'Poziom 2 (zalecany)', '100 – 400 ng/ml (suma z O-desmetylowenlafaksyną)', '> 800 ng/ml (skoki ciśnienia, arytmie)'],
        ['Olanzapina', 'Poziom 2 (zalecany)', '20 – 80 ng/ml', '> 100 ng/ml (sedacja, zespół metaboliczny)']
      ]
    },
    advanced:
      'W przypadku klozapiny stężenie poniżej 350 ng/ml rzadko zapewnia kontrolę lekoopornych objawów wytwórczych, natomiast przekroczenie 600 ng/ml znacząco zwiększa ryzyko powikłań, a stężenie > 1000 ng/ml dramatycznie obniża próg drgawkowy, wymagając profilaktycznego wdrożenia leku przeciwpadaczkowego (np. walproinianu) i redukcji dawki klozapiny.',
    summary:
      'TDM w psychiatrii (AGNP Poziom 1) chroni przed toksycznością litu, klozapiny i TLPD. Krew pobiera się w stanie stacjonarnym w punkcie Cmin (12h po dawce). Wskaźnik C/D obiektywizuje compliance i genetykę CYP.',
    sourceIds: ['agnp-tdm-2026', 'clozapine-consensus', 'maudsley15'],
    questions: [
      q(
        'Kiedy zgodnie ze standardem AGNP 2026 należy pobrać próbkę krwi do badania TDM po wieczornej dawce leku?',
        ['Rano na czczo, dokładnie 12 godzin po ostatniej dawce wieczornej (punkt stężenia korytowego Cmin), przed zażyciem kolejnej porannej dawki', 'Pozwala to na porównanie wyniku z referencyjnymi tabelami stężeń stacjonarnych.'],
        ['W dowolnej chwili w ciągu dnia, najlepiej 30 minut po posiłku obiadowym', 'Pobranie po posiłku w fazie wchłaniania (Cmax) daje niemiarodajny, fałszywie zawyżony wynik.'],
        ['Wyłącznie w trakcie trwania ostrego napadu padaczkowego', 'Pobranie podczas drgawek nie jest standardem planowego TDM.'],
        'psych-tdm-q1'
      ),
      q(
        'Dla których leków psychotropowych wytyczne AGNP 2026 przypisują najwyższy Poziom 1 rekomendacji TDM (bezwzględnie zalecany)?',
        ['Lit, klozapina, haloperydol, nortryptylina', 'Dla tych leków istnieje wąskie okno terapeutyczne i ścisła korelacja między stężeniem we krwi a skutecznością i toksycznością.'],
        ['Hydroksyzyna, piracetam, melatonina', 'Substancje te nie wymagają rutynowego TDM i mają niski poziom rekomendacji (Poziom 4).'],
        ['Placebo i witamina C', 'Nie podlegają procedurze monitorowania stężenia terapeutycznego.'],
        'psych-tdm-q2'
      ),
      q(
        'Jakie minimalne stężenie klozapiny w surowicy krwi uznaje się za próg skuteczności klinicznej w schizofrenii lekoopornej?',
        ['350 ng/ml', 'Poniżej 350 ng/ml odsetek odpowiedzi terapeutycznej jest istotnie niższy.'],
        ['10 ng/ml', '10 ng/ml jest stężeniem subterapeutycznym.'],
        ['5000 ng/ml', 'Stężenie 5000 ng/ml wywołałoby śmiertelne drgawki lub zapaść krążeniową.'],
        'psych-tdm-q3'
      ),
      q(
        'Co oznacza sytuacja, gdy pacjent przyjmujący formalnie 20 mg escitalopramu od 3 miesięcy ma stężenie leku we krwi równe 0 ng/ml w badaniu TDM?',
        ['Całkowity brak adherencji terapeutycznej (pacjent nie przyjmuje przepisanego leku)', 'Jest to najczęstsza przyczyna "lekooporności" w praktyce ambulatoryjnej.'],
        ['Wszystkie cząsteczki leku natychmiast wyparowały przez skórę czoła', 'Zjawisko parowania leków przez skórę nie występuje.'],
        ['Escitalopram nie rozpuszcza się w ludzkiej krwi', 'Escitalopram ulega normalnemu wchłanianiu i dystrybucji osoczowej.'],
        'psych-tdm-q4'
      ),
      q(
        'Dlaczego badanie TDM jest bezcelowe, jeśli lek w nowej dawce został włączony zaledwie 24 godziny temu (przy t1/2 wynoszącym 30 godzin)?',
        ['Ponieważ lek nie osiągnął jeszcze stanu stacjonarnego (potrzeba 4–5 okresów półtrwania, czyli ok. 5–6 dni)', 'Pomiar przed stanem stacjonarnym odzwierciedla jedynie stężenie wstępne i uniemożliwia ocenę dawki docelowej.'],
        ['Ponieważ krew w pierwszej dobie niszczy odczynniki laboratoryjne', 'Odczynniki nie ulegają zniszczeniu.'],
        ['Lek w pierwszej dobie nie posiada masy cząsteczkowej', 'Masa cząsteczkowa leku jest stała.'],
        'psych-tdm-q5'
      )
    ]
  },
  {
    id: 'farmakogenetyka-cyp-pgx',
    moduleId: 'psych-farmakologia',
    title: 'Farmakogenetyka w psychiatrii: fenotypy CYP2D6 i CYP2C19 wg CPIC',
    subtitle: 'Polimorfizmy cytochromów P450, fenokonwersja i dobór dawki wg wytycznych CPIC',
    group: 'Precyzyjna psychofarmakologia i metabolizm',
    minutes: 18,
    goals: [
      'Zinterpretujesz 4 fenotypy metaboliczne CYP (PM, IM, NM, UM) wg wytycznych CPIC.',
      'Dostosujesz dawkowanie SSRI i TLPD u pacjentów z fenotypem wolnego (PM) i ultratymczasowego (UM) metabolizatora.',
      'Zrozumiesz zjawisko fenokonwersji (np. silny inhibitor 2D6 przekształca pacjenta NM w funkcjonalnego PM).'
    ],
    sections: [
      {
        title: 'Polimorfizmy enzymatyczne cytochromu P450 (CYP450)',
        text: 'Większość psychotropów jest metabolizowana w wątrobie przez enzymy mikrosomalne cytochromu P450, głównie izoenzymy CYP2D6, CYP2C19, CYP3A4 i CYP1A2. Geny kodujące CYP2D6 i CYP2C19 wykazują skrajny polimorfizm genetyczny w populacji. Konsorcjum CPIC (Clinical Pharmacogenetics Implementation Consortium) definiuje 4 fenotypy: wolny metabolizator (Poor Metabolizer - PM), pośredni (Intermediate - IM), prawidłowy (Normal - NM) oraz ultraszybki (Ultrarapid Metabolizer - UM).'
      },
      {
        title: 'Rekomendacje CPIC dla CYP2D6 i CYP2C19',
        text: 'Dla CYP2C19: pacjenci o fenotypie ultrarapid (UM) metabolizują escitalopram, citalopram i sertralinę tak szybko, że osiągają subterapeutyczne stężenia – CPIC zaleca wybór alternatywnego leku (np. paroksetyna, wenlafaksyna). Z kolei u pacjentów z fenotypem PM stężenie leku gwałtownie rośnie, co rodzi ryzyko wydłużenia QTc i zespołu serotoninowego – zaleca się redukcję dawki o 50%.'
      },
      {
        title: 'Fenokonwersja: pułapka interakcji lekowych',
        text: 'Genotyp nie zawsze odpowiada rzeczywistemu fenotypowi pacjenta. Fenokonwersja to zjawisko, w którym pacjent o prawidłowym genotypie CYP2D6 (NM) pod wpływem silnego inhibitora enzymatycznego (np. fluoksetyny, paroksetyny czy bupropionu) staje się funkcjonalnym wolnym metabolizatorem (PM). Dołączenie innego leku metabolizowanego przez CYP2D6 (np. arypiprazolu, risperidonu, tramadolu) może wywołać ciężką toksyczność.'
      }
    ],
    table: {
      headers: ['Enzym / Genotyp', 'Wpływ na psychotropy', 'Konsekwencja kliniczna', 'Rekomendacja CPIC'],
      rows: [
        ['CYP2C19 - Wolny metabolizator (PM)', 'Spowolniony rozkład escitalopramu, sertraliny', 'Wysokie stężenia we krwi, ryzyko wydłużenia QTc', 'Zmniejsz dawkę o 50% lub zmień lek'],
        ['CYP2C19 - Ultraszybki metabolizator (UM)', 'Błyskawiczna eliminacja escitalopramu, citalopramu', 'Brak stężenia terapeutycznego, rzekoma lekooporność', 'Zmień na lek niezależny od 2C19 (np. wenlafaksyna)'],
        ['CYP2D6 - Wolny metabolizator (PM)', 'Kumulacja rysperydonu, aripiprazolu, nortryptyliny', 'Nasilone objawy pozapiramidowe i kardiotoksyczność', 'Zmniejsz dawkę o 50–70%'],
        ['CYP1A2 - Indukcja przez dym tytoniowy', 'Dym papierosowy indukuje CYP1A2', 'Spadek stężenia klozapiny i olanzapiny o 40–50%', 'U palaczy konieczne wyższe dawki; po rzuceniu grozi toksyczność']
      ]
    },
    advanced:
      'Kluczowa interakcja klozapiny z dymem tytoniowym: to nie nikotyna, lecz wielopierścieniowe węglowodory aromatyczne zawarte w dymie tytoniowym silnie indukują enzym CYP1A2. Pacjent unieruchomiony w szpitalu z zakazem palenia doświadcza gwałtownego wygaśnięcia indukcji CYP1A2, co może podwoić stężenie klozapiny we krwi i doprowadzić do śpiączki i drgawek bez żadnej zmiany dawki leku w tabletkach.',
    summary:
      'Polimorfizmy CYP2D6 i CYP2C19 decydują o stężeniu leków w OUN. Rekomendacje CPIC nakazują redukcję dawek u PM i zmianę leków u UM. Węglowodory dymu tytoniowego indukują CYP1A2, regulując stężenie klozapiny i olanzapiny.',
    sourceIds: ['cpic-cyp2d6-2c19', 'agnp-tdm-2026', 'clozapine-consensus'],
    questions: [
      q(
        'Jakie zalecenie terapeutyczne formułuje CPIC dla pacjenta z fenotypem wolnego metabolizatora CYP2C19 (Poor Metabolizer) kwalifikowanego do leczenia escitalopramem?',
        ['Zredukowanie standardowej dawki leku o 50% z uwagi na ryzyko kumulacji stężenia i wydłużenia odstępu QTc', 'Spowolniony metabolizm u osób PM prowadzi do 2–3-krotnie wyższych stężeń osoczowych przy typowych dawkach.'],
        ['Podwojenie dawki początkowej do 40 mg/d od pierwszego dnia', 'Doprowadziłoby to do ciężkich powikłań kardiologicznych i zespołu serotoninowego.'],
        ['Całkowite odstawienie wody pitnej na czas kuracji', 'Nie ma żadnego uzasadnienia medycznego.'],
        'psych-pgx-q1'
      ),
      q(
        'Na czym polega zjawisko fenokonwersji enzymatycznej w farmakoterapii psychiatrycznej?',
        ['Na przekształceniu funkcjonalnym pacjenta o genotypie prawidłowym (NM) w wolnego metabolizatora (PM) pod wpływem silnego inhibitora lekowego', 'Np. dodanie paroksetyny (silny inhibitor 2D6) blokuje enzym, symulując mutację genetyczną typu PM.'],
        ['Na mutacji jądrowego DNA pod wpływem fal radiowych', 'DNA jądrowe pacjenta nie ulega zmianie pod wpływem fal radiowych.'],
        ['Na natychmiastowej zamianie płci pod wpływem psychotropów', 'Psychotropy nie zmieniają genetycznej płci pacjenta.'],
        'psych-pgx-q2'
      ),
      q(
        'Co dzieje się ze stężeniem klozapiny we krwi u nałogowego palacza papierosów, który nagle zaprzestaje palenia po przyjęciu na oddział zamknięty?',
        ['Stężenie klozapiny w surowicy gwałtownie wzrasta (nawet o 50–100%), grożąc toksycznością i napadami drgawkowymi', 'Brak węglowodorów aromatycznych z dymu znosi indukcję enzymu CYP1A2, spowalniając klirens klozapiny.'],
        ['Stężenie klozapiny spada natychmiastowo do zera', 'Klirens leku ulega zmniejszeniu, a stężenie rośnie, a nie spada.'],
        ['Klozapina przekształca się w witaminę B12', 'Jest to biologicznie niemożliwe.'],
        'psych-pgx-q3'
      ),
      q(
        'Dlaczego u pacjenta o fenotypie ultraszybkiego metabolizatora CYP2C19 (Ultrarapid Metabolizer) standardowe dawki sertraliny są nieskuteczne?',
        ['Lek jest eliminowany z organizmu zbyt szybko, przez co stężenie we krwi nie osiąga progu terapeutycznego (~80% wysycenia SERT)', 'Klinicznie imituje to stan lekooporności, podczas gdy przyczyną jest genetyczny hipermetabolizm.'],
        ['Lek odkłada się w postaci kamieni w pęcherzyku żółciowym', 'Sertralina nie krystalizuje w pęcherzyku żółciowym.'],
        ['Sertralina ulega natychmiastowej polimeryzacji w tkance tłuszczowej', 'Nie ma takiego procesu biochemicznego.'],
        'psych-pgx-q4'
      ),
      q(
        'Które dwa leki przeciwdepresyjne z grupy SSRI są najsilniejszymi znanymi inhibitorami izoenzymu CYP2D6?',
        ['Paroksetyna oraz fluoksetyna', 'Stosowanie ich z lekami metabolizowanymi przez CYP2D6 (np. metoprolol, rysperydon) wymaga szczególnej ostrożności.'],
        ['Escitalopram i citalopram', 'Citalopram i escitalopram mają minimalny, klinicznie nieistotny wpływ na CYP2D6.'],
        ['Wortioksetyna i milnacypran', 'Leki te nie są silnymi inhibitorami CYP2D6.'],
        'psych-pgx-q5'
      )
    ]
  },
  {
    id: 'zamiana-lekow-switching-cross-tapering',
    moduleId: 'psych-farmakologia',
    title: 'Strategie zamiany leków: cross-tapering i zespół FINISH',
    subtitle: 'Przełączanie antydepresantów i neuroleptyków, okresy wypłukiwania (washout) i odstawienie',
    group: 'Precyzyjna psychofarmakologia i metabolizm',
    minutes: 18,
    goals: [
      'Wdrożysz odpowiednią strategię zamiany leku: bezpośrednią (direct), nakładkową (cross-tapering) lub z wypłukiwaniem (washout).',
      'Zdiagnozujesz objawy zespołu dyskontynuacji leków przeciwdepresyjnych wg akronimu FINISH.',
      'Zapobiegniesz zagrażającym interakcjom przy zamianie SSRI na inhibitory MAO (protokół 2- lub 5-tygodniowy).'
    ],
    sections: [
      {
        title: 'Strategie zamiany leków psychotropowych wg wytycznych BAP',
        text: 'British Association for Psychopharmacology (BAP) wyróżnia 3 podstawowe metody: 1) Zamiana bezpośrednia (direct switch) – odstawienie leku A i rozpoczęcie leku B następnego dnia (dopuszczalne w ramach tej samej klasy o zbliżonym profilu, np. citalopram -> sertralina); 2) Zamiana krzyżowa (cross-tapering) – stopniowa redukcja leku A przy jednoczesnym powolnym dołączaniu leku B (metoda preferowana w większości sytuacji klinicznych); 3) Zamiana z przerwą (washout) – konieczna przy przejściu na lub z inhibitorów MAO.'
      },
      {
        title: 'Zespół dyskontynuacji: akronim FINISH',
        text: 'Nagłe odstawienie leków serotoninergicznych (zwłaszcza o krótkim t1/2, np. paroksetyny, wenlafaksyny) wywołuje zespół dyskontynuacji opisany akronimem FINISH: Flu-like symptoms (objawy grypopodobne), Insomnia (bezsenność), Nausea (nudności), Imbalance (zawroty głowy, ataksja), Sensory disturbances (parestezje, wyładowania prądowe w głowie tzw. "brain zaps"), Hyperarousal (lęk, pobudzenie). Objawy te nie są nawrotem choroby i ustępują po ponownym podaniu dawki leku.'
      },
      {
        title: 'Zasady bezpieczeństwa i przejście na iMAO',
        text: 'Najbardziej krytyczną procedurą jest przejście z leku serotoninergicznego na inhibitor MAO: wymaga bezwzględnego zachowania okresu wypłukiwania trwającego minimum 2 tygodnie (dla paroksetyny, sertraliny, wenlafaksyny) oraz aż 5 tygodni dla fluoksetyny z uwagi na długi czas eliminacji norfluoksetyny. Złamanie tej zasady grozi śmiertelnym zespołem serotoninowym.'
      }
    ],
    table: {
      headers: ['Sytuacja kliniczna', 'Rekomendowana strategia', 'Czas trwania procesu', 'Główne ryzyko do monitorowania'],
      rows: [
        ['SSRI -> inny SSRI', 'Zamiana bezpośrednia lub szybki cross-tapering', '1–7 dni', 'Przejściowe nudności, lęk'],
        ['SSRI -> SNRI (np. wenlafaksyna)', 'Krzyżowe odstawianie (cross-tapering)', '2–4 tygodnie', 'Zespół odstawienny FINISH'],
        ['Dowolny SSRI -> iMAO (np. tranylcypromina)', 'Odstawienie + bezwzględny washout (przerwa)', '2 tygodnie (5 tyg. po fluoksetynie!)', 'Śmiertelny zespół serotoninowy'],
        ['Neuroleptyk A -> Neuroleptyk B', 'Powolny cross-tapering', '2–4 tygodnie', 'Zaostrzenie objawów psychotycznych z odbicia']
      ]
    },
    advanced:
      'Przy odstawianiu leków silnie cholinolitycznych (np. klozapiny, olanzapiny, paroksetyny) nagłe przerwanie wyzwala tzw. cholinergiczny zespół z odbicia (cholinergic rebound): nudności, biegunkę, zlewną potliwość, niepokój i bezsenność. Można temu zapobiec stosując powolną redukcję dawki lub krótkotrwałe podanie leku antycholinergicznego (np. hydroksyzyny lub biperydenu).',
    summary:
      'Cross-tapering jest złotym standardem bezpiecznej rotacji leków. Nagłe odstawienie SSRI wywołuje zespół FINISH. Zamiana na iMAO wymaga 2–5 tygodni ścisłego washout w celu uniknięcia toksyczności serotoninowej.',
    sourceIds: ['bap-switching', 'maudsley15', 'horowitz-tapering'],
    questions: [
      q(
        'Ile tygodni musi wynosić okres wypłukiwania (washout) po odstawieniu fluoksetyny przed bezpiecznym włączeniem inhibitora MAO?',
        ['Co najmniej 5 tygodni', 'Wynika to z bardzo długiego okresu biologicznego półtrwania aktywnego metabolitu fluoksetyny – norfluoksetyny (t1/2 do 14 dni).'],
        ['Dokładnie 24 godziny', 'Po 24 godzinach stężenie fluoksetyny i norfluoksetyny jest maksymalne, co wywoła śmiertelny zespół serotoninowy.'],
        ['Wypłukiwanie nie jest konieczne, leki podaje się razem', 'Jednoczesne podanie SSRI z iMAO jest kardynalnym, śmiertelnym błędem medycznym.'],
        'psych-switch-q1'
      ),
      q(
        'Co oznacza akronim FINISH opisujący zespół dyskontynuacji leków przeciwdepresyjnych?',
        ['Flu-like symptoms, Insomnia, Nausea, Imbalance, Sensory disturbances (brain zaps), Hyperarousal', 'Jest to ustrukturyzowany wzorzec objawów odstawiennych po gwałtownym przerwaniu SSRI/SNRI.'],
        ['Gorączka, Utrata wzroku, Złamania kości, Głuchota', 'Zespół dyskontynuacji nie wywołuje utraty wzroku ani złamań kości.'],
        ['Objawy zawału serca z uniesieniem odcinka ST', 'FINISH dotyczy zespołu odstawiennego w OUN, nie zawału STEMI.'],
        'psych-switch-q2'
      ),
      q(
        'Które dwa leki przeciwdepresyjne niosą najwyższe ryzyko ciężkiego zespołu odstawiennego po nagłym pominięciu dawki z uwagi na krótki t1/2?',
        ['Paroksetyna oraz wenlafaksyna', 'Krótki okres półtrwania powoduje gwałtowny spadek stężenia i nagłe odhamowanie receptorów.'],
        ['Fluoksetyna oraz norfluoksetyna', 'Fluoksetyna dzięki długiemu t1/2 "sama się taperuje" i rzadko daje objawy nagłego odstawienia.'],
        ['Woda destylowana i glikol', 'Substancje te nie są lekami przeciwdepresyjnymi.'],
        'psych-switch-q3'
      ),
      q(
        'Na czym polega technika zamiany leków typu cross-tapering?',
        ['Na stopniowym zmniejszaniu dawki leku dotychczasowego przy jednoczesnym powolnym zwiększaniu dawki nowego leku', 'Zapobiega to zarówno zaostrzeniu choroby podstawowej, jak i objawom odstawiennym.'],
        ['Na natychmiastowym podwojeniu dawek obu leków przez 6 miesięcy', 'Postępowanie takie wywołałoby natychmiastową ciężką toksyczność wielolekową.'],
        ['Na podawaniu leku pierwszego wyłącznie w dni parzyste, a drugiego w nieparzyste w pełnych dawkach', 'Taki schemat powoduje chaos farmakokinetyczny i wahania stężeń.'],
        'psych-switch-q4'
      ),
      q(
        'Jakie powikłanie z odbicia (rebound) grozi pacjentowi po nagłym odstawieniu klozapiny lub olanzapiny w dużej dawce?',
        ['Ostre objawy cholinergiczne z odbicia (nudności, zlewna potliwość, biegunka, ciężki niepokój i bezsenność)', 'Wynika to z nagłego odblokowania przewlekle hamowanych receptorów muskarynowych M1-M4.'],
        ['Natychmiastowe wypadnięcie kości ramiennej', 'Odstawienie leków nie wywołuje zwichnięć stawowych.'],
        ['Wzrost stężenia sodu powyżej 200 mmol/l', 'Nie ma bezpośredniego związku z hipernatremią.'],
        'psych-switch-q5'
      )
    ]
  },
  {
    id: 'racjonalna-polipragmazja-i-augmentacja',
    moduleId: 'psych-farmakologia',
    title: 'Racjonalna polipragmazja i strategie augmentacji',
    subtitle: 'Lit, atypowe leki przeciwpsychotyczne, hormony tarczycy i kombinacje mechanizmów',
    group: 'Precyzyjna psychofarmakologia i metabolizm',
    minutes: 18,
    goals: [
      'Zastosujesz strategie augmentacji lekoopornej depresji (TRD) o najwyższym stopniu dowodów (lit, aripiprazol, kwetiapina).',
      'Zróżnicujesz racjonalną polipragmazję synergistyczną od bezkrytycznej politerapii antagonistycznej.',
      'Scharakteryzujesz augmentację trójjodotyroniną (T3) oraz kombinacje wielomechanizmowe (np. Kalifornia Rocket Fuel).'
    ],
    sections: [
      {
        title: 'Kiedy augmentować, a kiedy zmieniać lek?',
        text: 'W depresji lekoopornej (TRD – brak remisji po co najmniej dwóch kolejnych prawidłowych kuracjach przeciwdepresyjnych) klinicysta ma do wyboru: zamianę leku na inną klasę lub augmentację (dołączenie leku niebędącego klasycznym antydepresantem). Jeśli przy aktualnym leku występuje częściowa odpowiedź kliniczna (poprawa rzędu 25–49%), augmentacja jest strategią preferowaną w stosunku do zamiany, gdyż zachowuje dotychczas uzyskane korzyści.'
      },
      {
        title: 'Strategie augmentacji o najwyższym poziomie dowodów (Level 1)',
        text: 'Zgodnie z wytycznymi CANMAT i WFSBP złotym standardem augmentacji są: 1) Węglan litu (stężenie docelowe 0,4–0,8 mmol/l – silny efekt przeciwdepresyjny i antysuicydalny); 2) Atypowe leki przeciwpsychotyczne w małych dawkach: aripiprazol (2–5 mg/d), kwetiapina (150–300 mg/d) lub brekspiprazol. Zapewniają one synergizm receptorowy poprzez modulację układów dopaminergicznego i glutaminergicznego.'
      },
      {
        title: 'Kombinacje synergistyczne i pułapki polipragmazji',
        text: 'Przykładem racjonalnej synergii jest tzw. California Rocket Fuel (połączenie wenlafaksyny z mirtazapiną): jednoczesne zablokowanie SERT, NET oraz odhamowanie wyrzutu monoamin przez blokadę autoreceptorów alfa-2 adrenergicznych. Z kolei nieracjonalna polipragmazja polega na łączeniu dwóch leków o tym samym mechanizmie (np. dwóch SSRI) lub o wzajemnie znoszącym się działaniu (np. agonista dopaminowy + silny bloker D2).'
      }
    ],
    table: {
      headers: ['Strategia augmentacji', 'Poziom dowodów EBM', 'Sugerowana dawka / Cel', 'Mechanizm synergizmu'],
      rows: [
        ['Węglan litu', 'Poziom 1 (Najwyższy)', 'Stężenie w surowicy 0,4–0,8 mmol/l', 'Hamowanie GSK-3beta, stymulacja syntezy 5-HT i BDNF'],
        ['Aripiprazol', 'Poziom 1', '2–5 mg/d (mała dawka)', 'Częściowy agonizm D2/D3, agonizm 5-HT1A'],
        ['Kwetiapina XR', 'Poziom 1', '150–300 mg/d', 'Aktywny metabolit norkwetiapina blokuje NET i 5-HT2A'],
        ['Trójjodotyronina (T3)', 'Poziom 2', '25–50 ug/d', 'Zwiększenie wrażliwości receptorów monoaminowych w korze'],
        ['Wenlafaksyna + Mirtazapina', 'Poziom 2', 'Pełne dawki terapeutyczne obu leków', 'Wielopoziomowa stymulacja 5-HT i NA ("California Rocket Fuel")']
      ]
    },
    advanced:
      'Augmentacja litem w lekoopornej depresji wykazuje szybki czas latencji: poprawa kliniczna u responderów pojawia się często już w ciągu 7–14 dni od osiągnięcia stężenia we krwi > 0,4–0,6 mmol/l. Jeśli po 4 tygodniach w optymalnym stężeniu brak poprawy, lit należy bezpiecznie odstawić.',
    summary:
      'Augmentacja jest preferowana przy częściowej odpowiedzi na lek I rzutu. Poziom 1 dowodów posiadają lit oraz aripiprazol i kwetiapina. Racjonalna polipragmazja opiera się na komplementarnych mechanizmach molekularnych.',
    sourceIds: ['canmat-mdd-2023', 'wfsbp-schizophrenia', 'maudsley15'],
    questions: [
      q(
        'Jaka strategia leczenia jest najbardziej wskazana u pacjenta z ciężką depresją, który po 6 tygodniach optymalnej dawki sertraliny uzyskał 35% poprawy (częściowa odpowiedź)?',
        ['Augmentacja dotychczasowej terapii litem lub atypowym lekiem przeciwpsychotycznym (aripiprazol / kwetiapina)', 'Pozwala to na wykorzystanie dotychczasowej częściowej odpowiedzi bez ryzyka załamania stanu po odstawieniu leku bazowego.'],
        ['Natychmiastowe odstawienie sertraliny z dnia na dzień i brak leczenia przez 6 miesięcy', 'Wywoła to ciężki nawrót depresji i zespół odstawienny.'],
        ['Włączenie drugiego leku z grupy SSRI w maksymalnej dawce', 'Łączenie dwóch SSRI to nieracjonalna polipragmazja zwiększająca ryzyko działań niepożądanych bez korzyści terapeutycznej.'],
        'psych-aug-q1'
      ),
      q(
        'Jakie stężenie litu w surowicy krwi jest wystarczające w strategii augmentacji leku przeciwdepresyjnego w lekoopornej depresji jednobiegunowej?',
        ['0,4 do 0,8 mmol/l', 'W augmentacji depresji skuteczne są nieco niższe stężenia niż w ostrej manii dwubiegunowej.'],
        ['Powyżej 2,5 mmol/l', 'Jest to stężenie wysoce toksyczne, zagrażające zgonem.'],
        ['Dokładnie 0,01 mmol/l', 'Jest to stężenie subterapeutyczne, niemające wpływu na GSK-3beta.'],
        'psych-aug-q2'
      ),
      q(
        'Na czym polega mechanizm synergizmu w kombinacji zwanej potocznie "California Rocket Fuel"?',
        ['Połączenie wenlafaksyny (hamowanie SERT i NET) z mirtazapiną (odhamowanie uwalniania monoamin przez blokadę alfa-2)', 'Daje to masywny, synergistyczny wzrost transmisji serotoninowej i noradrenergicznej w korze mózgu.'],
        ['Połączenie morfiny z fencyklidyną', 'Nie jest to schemat psychiatryczny, lecz kombinacja toksyczna.'],
        ['Połączenie pięciu różnych neuroleptyków I generacji', 'Jest to rażący błąd polipragmazji prowadzący do ciężkich dyskinez i NMS.'],
        'psych-aug-q3'
      ),
      q(
        'W jakiej dawce dobowej stosuje się aripiprazol jako lek augmentujący w depresji lekoopornej?',
        ['W małych dawkach: 2 do 5 mg/d (maksymalnie 10 mg/d)', 'W małej dawce aripiprazol działa głównie proserotoninergicznie i prokognitywnie, nie wywołując sedacji.'],
        ['W dawkach 60 do 90 mg/d', 'Jest to dawka toksyczna przekraczająca rejestrację.'],
        ['0,001 mg raz w miesiącu', 'Dawka ta nie wykazuje mierzalnego occupancy receptorowego.'],
        'psych-aug-q4'
      ),
      q(
        'Który hormon obwodowy w dawkach 25–50 ug/d posiada status Level 2 dowodów naukowych w augmentacji lekoopornej depresji?',
        ['Trójjodotyronina (T3 - liotyronina)', 'T3 uwrażliwia receptory serotoninowe w OUN i stymuluje metabolizm neuronalny.'],
        ['Parathormon (PTH)', 'PTH nie jest stosowany w leczeniu depresji.'],
        ['Wazopresyna we wlewie ciągłym', 'Wazopresyna nie ma zastosowania przeciwdepresyjnego.'],
        'psych-aug-q5'
      )
    ]
  },
  {
    id: 'profilaktyka-dzialan-niepozadanych',
    moduleId: 'psych-farmakologia',
    title: 'Profilaktyka i monitorowanie powikłań farmakoterapii',
    subtitle: 'Nadzór laboratoryjny, metaboliczny, kardiologiczny i hematologiczny w praktyce',
    group: 'Precyzyjna psychofarmakologia i metabolizm',
    minutes: 18,
    goals: [
      'Stworzysz całościowy harmonogram badań kontrolnych dla pacjenta leczonego psychotropowo.',
      'Rozpoznasz wczesne sygnały powikłań narządowych (leukopenia, spadek eGFR, hepatotoksyczność).',
      'Wdrożysz postępowanie korygujące przy dyslipidemii, hiperprolaktynemii i przyroście wagi.'
    ],
    sections: [
      {
        title: 'Harmonogram badań laboratoryjnych w psychofarmakologii',
        text: 'Wdrażanie leków psychotropowych wymaga ustrukturyzowanego planu badań wyjściowych i kontrolnych: 1) Badania wstępne: morfologia, elektrolity (Na, K, Ca), kreatynina/eGFR, mocznik, AST, ALT, GGTP, lipidogram, glukoza/HbA1c, TSH, EKG, masa ciała, BMI i obwód pasa; 2) Kontrola po 1–3 miesiącach: glukoza, masa ciała, lipidy, EKG, próby wątrobowe; 3) Monitorowanie roczne: pełny bilans metaboliczny i narządowy.'
      },
      {
        title: 'Specyficzny nadzór dla leków podwyższonego ryzyka',
        text: 'Lit wymaga kontroli stężenia we krwi (początkowo co 1–2 tyg., stabilnie co 3 mies.), kreatyniny/eGFR i TSH co 6 miesięcy. Klozapina wymaga bezwzględnej kontroli morfologii (ANC) co tydzień przez 18 tygodni, następnie co 4 tygodnie. Kwas walproinowy wymaga monitorowania prób wątrobowych, płytek krwi i stężenia we krwi, a u kobiet – wykluczenia ciąży (test beta-hCG przed każdą receptą).'
      },
      {
        title: 'Interwencje w powikłaniach metabolicznych i prolaktynowych',
        text: 'W przypadku przyrostu masy ciała > 5% lub dysglikemii wywołanej przez SGA zaleca się dołączenie metforminy (udowodniona skuteczność w prewencji cukrzycy i tycia na olanzapinie/klozapinie) lub zamianę leku na obojętny metabolicznie (aripiprazol, lurasidon). W objawowej hiperprolaktynemii po rysperydonie skuteczną metodą jest dołączenie małej dawki aripiprazolu (2,5–5 mg/d), który jako częściowy agonista obniża poziom prolaktyny.'
      }
    ],
    table: {
      headers: ['Lek psychotropowy', 'Badania wyjściowe obligatoryjne', 'Częstość kontroli TDM / Lab', 'Kryteria alarmowe'],
      rows: [
        ['Klozapina', 'Morfologia z rozmazem (ANC), glukoza, EKG, echo', 'Morfologia co tydzień przez 18 tyg., potem co 4 tyg.', 'ANC < 1500/ul (przerwij), troponiny w zapaleniu mięśnia sercowego'],
        ['Węglan litu', 'Kreatynina/eGFR, mocznik, TSH, sód, potas, EKG', 'TDM co 1–2 tyg. do steady-state, potem co 3 mies.; eGFR/TSH co 6 mies.', 'Lit > 1,2 mmol/l, spadek eGFR < 45 ml/min, moczówka prosta'],
        ['Kwas walproinowy', 'Morfologia (PLT), ALT, AST, test ciążowy', 'ALT/AST/PLT po miesiącu i co 6 mies.', 'Płytki < 100 tys., 3-krotny wzrost aminotransferaz'],
        ['Olanzapina / Kwetiapina', 'Masa ciała, obwód pasa, glukoza na czczo, lipidogram', 'Waga co miesiąc, glukoza i lipidy po 3 mies., potem co roku', 'Przyrost wagi > 5%, cukrzyca de novo, hipertrójglicerydemia']
      ]
    },
    advanced:
      'W przypadku klozapiny w pierwszych 4 tygodniach terapii istnieje ryzyko ostrego zapalenia mięśnia sercowego (myocarditis, śmiertelność do 10–20%). Objawy to niewyjaśniona tachykardia spoczynkowa > 100/min, duszność, ból w klatce piersiowej, stan podgorączkowy i eozynofilia. Wymaga to natychmiastowego oznaczenia troponin sercowych i CRP oraz odstawienia klozapiny.',
    summary:
      'Ustrukturyzowany nadzór laboratoryjny chroni pacjenta przed powikłaniami. Morfologia dla klozapiny, nerki/tarczyca dla litu, a w powikłaniach metabolicznych SGA lekiem z wyboru jest wczesne wdrożenie metforminy.',
    sourceIds: ['clozapine-consensus', 'maudsley15', 'agnp-tdm-2026'],
    questions: [
      q(
        'Jaki lek przeciwcukrzycowy posiada najwyższy poziom dowodów naukowych w prewencji i leczeniu przyrostu masy ciała oraz insulinooporności indukowanej olanzapiną lub klozapiną?',
        ['Metformina', 'Wczesne dołączenie metforminy skutecznie hamuje tycie i normalizuje glikemię u pacjentów leczonych SGA.'],
        ['Insulina w dawkach uderzeniowych u każdego pacjenta', 'Insulina u osób bez cukrzycy wywołałaby zagrażającą życiu hipoglikemię.'],
        ['Sulfonylomocznik I generacji', 'Sulfonylomoczniki nasilają tycie i wywołują hipoglikemie.'],
        'psych-prof-q1'
      ),
      q(
        'Jak często należy kontrolować bezwzględną liczbę neutrofilów (ANC) u pacjenta rozpoczynającego terapię klozapiną przez pierwsze 18 tygodni?',
        ['Dokładnie raz w tygodniu', 'Jest to rygorystyczny wymóg rejestracyjny mający na celu wykrycie agranulocytozy we wczesnym stadium.'],
        ['Raz na 5 lat', 'Po 5 latach pacjent z agranulocytozą mógłby umrzeć z powodu sepsy.'],
        ['Trzy razy dziennie przez 10 lat', 'Jest to nierealne i niepotrzebne obciążenie pacjenta.'],
        'psych-prof-q2'
      ),
      q(
        'Młody mężczyzna leczony klozapiną od 3 tygodni zgłasza stałą tachykardię spoczynkową 115/min, duszność wysiłkową i stan podgorączkowy 37,8°C. Jakie powikłanie należy natychmiast wykluczyć?',
        ['Polekowe zapalenie mięśnia sercowego (clozapine-induced myocarditis)', 'Wymaga pilnego oznaczenia stężenia troponiny sercowej, CRP oraz wykonania echokardiografii i odstawienia klozapiny.'],
        ['Zwykłe przeziębienie niewymagające żadnej uwagi', 'Bagatelizowanie tych objawów na klozapinie grozi zgonem w mechanizmie ostrej niewydolności serca.'],
        ['Złamanie żeber podczas snu', 'Objawy te nie wskazują na uraz klatki piersiowej.'],
        'psych-prof-q3'
      ),
      q(
        'W jaki sposób można skutecznie obniżyć objawową hiperprolaktynemię u pacjentki leczonej rysperydonem bez konieczności odstawiania leczenia przeciwpsychotycznego?',
        ['Poprzez dołączenie małej dawki aripiprazolu (2,5–5 mg/d)', 'Aripiprazol jako częściowy agonista D2 pobudza laktotrofy przysadki w stopniu wystarczającym do zahamowania wydzielania prolaktyny.'],
        ['Poprzez potrojenie dawki rysperydonu', 'Zwiększenie dawki rysperydonu jeszcze bardziej podwyższy prolaktynę.'],
        ['Podając dożylnie chlorek potasu', 'Nie ma żadnego wpływu na prolaktynę.'],
        'psych-prof-q4'
      ),
      q(
        'Jakie badanie endokrynologiczne należy powtarzać co 6–12 miesięcy u każdego pacjenta przewlekle leczonego węglanem litu?',
        ['Stężenie hormonu tyreotropowego (TSH) we krwi', 'Lit hamuje uwalnianie hormonów tarczycy i może prowadzić do niedoczynności tarczycy u nawet 20% pacjentów.'],
        ['Dobową zbiórkę moczu na obecność testosteronu', 'Testosteron nie jest parametrem monitorowania nefrotoksyczności ani tyreotoksyczności litu.'],
        ['Biopsję szyszynki pod kontrolą USG', 'Szyszynka nie podlega biopsji w monitorowaniu litu.'],
        'psych-prof-q5'
      )
    ]
  }
];
