import { type DraftLesson, q } from './course-types.ts';

export const draftPsychiatryPart2: DraftLesson[] = [
  {
    id: 'substancje-i-secondary-causes',
    moduleId: 'psych-afektywne',
    title: 'Substancje psychoaktywne i maski somatopsychiatryczne',
    subtitle: 'Zatrucia, zespoły abstynencyjne, toksykologia i zaburzenia wywołane substancjami',
    group: 'Zaburzenia organiczne i substancje',
    minutes: 18,
    goals: [
      'Zróżnicujesz pierwotne zaburzenia psychotyczne i afektywne od wywołanych substancjami psychoaktywnymi.',
      'Rozpoznasz zagrażające życiu zespoły odstawienne (alkoholowy zespół majaczeniowy, opioidy, BZD).',
      'Wdrożysz protokół badań przesiewowych (WHO ASSIST, toksykologia moczu) i detoksykacji.'
    ],
    sections: [
      {
        title: 'Diagnostyka toksykologiczna i maski substancyjne',
        text: 'Nadużywanie substancji psychoaktywnych może imitować niemal każdy stan psychiatryczny: intoksykacja stymulantami (kokaina, amfetamina, syntetyczne katynony) wywołuje paranoiczne psychozy i manię; kanabinoidy wyzwalają derealizację i zaostrzenia psychotyczne; z kolei odstawienie alkoholu lub benzodiazepin prowadzi do lęku napadowego i majaczenia (delirium tremens). Toksykologia moczu i stężenie alkoholu w wydychanym powietrzu są obligatoryjne przy każdej ostrej hospitalizacji.'
      },
      {
        title: 'Alkoholowy zespół majaczeniowy (Delirium Tremens - DT)',
        text: 'Delirium tremens rozwija się typowo w 48–72 godziny po nagłym zaprzestaniu lub ograniczeniu picia u osoby uzależnionej. Cechuje się przymgleniem świadomości, dezorientacją allopsychiczną, iluzjami i omamami wzrokowymi (np. mikropsje, zooopsje), drżeniem grubofalistym, zlewającymi potami, tachykardią i gorączką. Śmiertelność w nieleczonym DT sięga 5–15% wskutek zapaści sercowo-naczyniowej lub hipertermii.'
      },
      {
        title: 'Zasady leczenia stanów odstawiennych: protokół CIWA-Ar',
        text: 'W alkoholowym zespole abstynencyjnym (AWA) złotym standardem są długodziałające benzodiazepiny (diazepam, chlordiazepoksyd) dawkowane wg skali nasilenia objawów CIWA-Ar. U pacjentów z niewydolnością wątroby stosuje się leki nielorazepamowane lub lorazepam/oksazepam (metabolizowane drogą glukuronidacji bez udziału CYP450). Obowiązkowa jest wysoka podaż tiaminy (wit. B1 i.v./i.m.) przed glukozą w celu prewencji zespołu Wernickego-Korsakowa.'
      }
    ],
    table: {
      headers: ['Substancja', 'Obraz intoksykacji ostrej', 'Obraz zespołu odstawiennego', 'Leczenie farmakologiczne'],
      rows: [
        ['Alkohol etylowy', 'Odhamowanie, ataksja, bełkotliwa mowa, śpiączka', 'Drżenie, poty, tachykardia, napady drgawkowe, majaczenie', 'Diazepam / lorazepam, witamina B1 (tiamina)'],
        ['Opioidy', 'Miosis (szpilkowate źrenice), depresja oddechowa, sedacja', 'Mydriasis (rozszerzone źrenice), łzawienie, piloerekcja, biegunka', 'Nalokson (odtrutka), buprenorfina / metadon'],
        ['Stymulanty (amfetamina)', 'Mydriasis, pobudzenie, tachykardia, paranoja, hipertermia', 'Ciężka dysforia, hipersomnia, anhedonia, ryzyko suicydalne', 'Leki przeciwpsychotyczne II gen., benzodiazepiny objawowo']
      ]
    },
    advanced:
      'W przypadku podejrzenia encefalopatii Wernickego (triada: ataksja, splątanie, oftalmoplegia/oczopląs) podanie dożylne glukozy przed tiaminą zużywa resztkowe zapasy pirofosforanu tiaminy w komórkach i może wywołać nieodwracalne uszkodzenie ciał suteczkowatych i wzgórza (zespół Korsakowa). Tiaminę należy zawsze podać PRZED roztworami węglowodanów.',
    summary:
      'Substancje psychoaktywne maskują i indukują psychozy oraz afektywne dekompensacje. Ostre zespoły odstawienne wymagają BZD wg CIWA-Ar i wczesnej profilaktyki encefalopatii tiaminą przed wlewem glukozy.',
    sourceIds: ['who-assist', 'icd11-cddr', 'ptp-standardy'],
    questions: [
      q(
        'Dlaczego u pacjenta z podejrzeniem alkoholowego zespołu abstynencyjnego i hipoglikemii tiaminę należy podać PRZED roztworem glukozy?',
        ['Podanie glukozy bez tiaminy gwałtownie zużywa zapasy witaminy B1 i może wywołać nieodwracalną encefalopatię Wernickego', 'Tiamina jest niezbędnym koenzymem dehydrogenazy pirogronianowej w cyklu Krebsa komórek nerwowych.'],
        ['Glukoza powoduje natychmiastową neutralizację chemiczną cząsteczki tiaminy we krwi', 'Glukoza nie wchodzi w bezpośrednią reakcję chemiczną niszczącą tiaminę.'],
        ['Tiamina w połączeniu z glukozą wywołuje ciężki obrzęk płuc', 'Nie ma takiego mechanizmu patofizjologicznego.'],
        'psych-subst-q1'
      ),
      q(
        'Które benzodiazepiny są lekami z wyboru w alkoholowym zespole odstawiennym u pacjenta z zaawansowaną marskością wątroby?',
        ['Lorazepam lub oksazepam (sprzęgane przez glukuronidację z pominięciem enzymów mikrosomalnych CYP450)', 'Leki te nie ulegają utlenianiu wątrobowemu i nie kumulują się niebezpiecznie w niewydolności wątroby.'],
        ['Diazepam w maksymalnych dawkach dobowych', 'Diazepam ulega oksydacji przez CYP i ma bardzo długi czas półtrwania metabolitów, grożąc śpiączką wątrobową.'],
        ['Klonazepam w połączeniu z midazolamem doustnym', 'Nie są to leki rekomendowane w dysfunkcji hepatocytów.'],
        'psych-subst-q2'
      ),
      q(
        'Jaki objaw w badaniu fizykalnym jednoznacznie odróżnia ostre przedawkowanie opioidów od intoksykacji kokainą?',
        ['Wąskie, szpilkowate źrenice (miosis) i spowolnienie oddechów w opioidach vs rozszerzone źrenice (mydriasis) i tachykardia w kokainie', 'Wąskie źrenice i depresja oddechowa to patognomoniczne cechy zatrucia receptorowych agonistów opioidowych.'],
        ['Podwyższenie temperatury ciała powyżej 42 stopni wyłącznie w opioidach', 'Hipertermia jest typowa dla stymulantów i zespołu serotoninowego, nie dla czystych opioidów.'],
        ['Występowanie drżenia zamiarowego w kokainie', 'Drżenie zamiarowe wskazuje na uszkodzenie móżdżku.'],
        'psych-subst-q3'
      ),
      q(
        'W jakim przedziale czasowym po zaprzestaniu picia alkoholu rozwija się typowo pełnoobjawowe majaczenie drżenne (Delirium Tremens)?',
        ['48 do 72 godzin od ostatniej dawki alkoholu', 'DT rozwija się w 2–3 dobie po przerwaniu ciągu, wyprzedzane przez niepowikłane objawy abstynencyjne.'],
        ['W ciągu pierwszych 15 minut od ostatniego kieliszka', 'W ciągu 15 minut stężenie alkoholu rośnie, a nie spada.'],
        ['Dopiero po 6 miesiącach całkowitej abstynencji', 'Po 6 miesiącach ryzyko ostrego delirium tremens nie występuje.'],
        'psych-subst-q4'
      ),
      q(
        'Która skala kliniczna jest międzynarodowym standardem do monitorowania nasilenia alkoholowego zespołu abstynencyjnego i dawkowania BZD?',
        ['Skala CIWA-Ar (Clinical Institute Withdrawal Assessment for Alcohol)', 'Punktacja CIWA-Ar warunkuje dawkę doraźną benzodiazepiny w protokole objawowym (symptom-triggered).'],
        ['Skala PANSS dla schizofrenii', 'PANSS służy do oceny objawów wytwórczych i ubytkowych schizofrenii.'],
        ['Skala Glasgow Coma Scale w urazach głowy', 'GCS ocenia poziom przytomności, nie specyficzne objawy abstynencyjne.'],
        'psych-subst-q5'
      )
    ]
  },
  {
    id: 'skale-kliniczne-w-psychiatrii',
    moduleId: 'psych-afektywne',
    title: 'Psychometryczne skale kliniczne: HAM-D, MADRS, YMRS i PANSS',
    subtitle: 'Narzędzia oceny nasilenia objawów, progi remisji i monitorowanie leczenia',
    group: 'Diagnostyka i semiotyka psychiatryczna',
    minutes: 18,
    goals: [
      'Zastosujesz skale oceny depresji (HAM-D, MADRS, PHQ-9) oraz manii (YMRS).',
      'Zrozumiesz strukturę i progi punktowe skali PANSS w badaniach schizofrenii.',
      'Zdefiniujesz kryteria odpowiedzi terapeutycznej (spadek >= 50%) i remisji klinicznej w EBM.'
    ],
    sections: [
      {
        title: 'Skale depresji: HAM-D, MADRS i samoopisowe PHQ-9',
        text: 'W ocenie nasilenia depresji złotym standardem badań klinicznych są skale wypełniane przez lekarza: 17-punktowa skala Hamiltona (HAM-D-17) oraz skala Montgomery-Åsberg (MADRS). MADRS wykazuje wyższą czułość na wczesne zmiany farmakoterapeutyczne i skupia się na objawach psychicznych, podczas gdy HAM-D silnie punktuje objawy somatyczne i bezsenność. W opiece ambulatoryjnej standardem przesiewowym jest 9-pytaniowy kwestionariusz pacjenta PHQ-9.'
      },
      {
        title: 'Skala YMRS w manii oraz PANSS w schizofrenii',
        text: 'Skala YMRS (Young Mania Rating Scale, 11 pozycji) służy do kwantyfikacji nasilenia hipomanii i manii (próg remisji <= 12 pkt). Z kolei skala PANSS (Positive and Negative Syndrome Scale, 30 pozycji w podskalach: pozytywnej, negatywnej i ogólnej psychopatologii) pozwala ocenić dynamikę objawów wytwórczych schizofrenii i skuteczność leków przeciwpsychotycznych.'
      },
      {
        title: 'Kryteria EBM: odpowiedź (response) a remisja (remission)',
        text: 'W medycynie opartej na faktach (EBM) "odpowiedź na leczenie" definiuje się jako redukcję całkowitej punktacji w skali klinicznej (np. MADRS, HAM-D, PANSS) o co najmniej 50% w stosunku do wartości wyjściowej. "Remisja" oznacza spadek poniżej ściśle określonego progu bezwzględnego (dla MADRS typowo <= 10 pkt, dla HAM-D <= 7 pkt), co odpowiada powrotowi do prawidłowego funkcjonowania.'
      }
    ],
    table: {
      headers: ['Skala', 'Obszar kliniczny', 'Liczba pozycji / Wypełniający', 'Próg remisji klinicznej'],
      rows: [
        ['HAM-D 17', 'Depresja ogólna i somatyczna', '17 pozycji / Lekarz', '<= 7 punktów'],
        ['MADRS', 'Depresja (wysoka czułość na leki)', '10 pozycji / Lekarz', '<= 10 punktów'],
        ['YMRS', 'Mania i hipomania', '11 pozycji / Lekarz', '<= 12 punktów'],
        ['PHQ-9', 'Przesiew depresji w POZ', '9 pozycji / Pacjent (samoocena)', '< 5 punktów (brak depresji)'],
        ['PANSS', 'Schizofrenia (pozytywne/negatywne)', '30 pozycji / Doświadczony badacz', '<= 3 punkty w każdej z kluczowych pozycji']
      ]
    },
    advanced:
      'W skali HAM-D aż 6 z 17 punktów dotyczy bezsenności i objawów żołądkowo-jelitowych. Leki silnie sedatywne (np. mirtazapina, mianseryna) mogą dawać fałszywie szybki spadek w HAM-D wynikający wyłącznie z poprawy snu, podczas gdy MADRS precyzyjniej wychwytuje poprawę nastroju i popędu.',
    summary:
      'Skale kliniczne obiektywizują przebieg leczenia. Odpowiedź terapeutyczna to redukcja objawów o >= 50%, a remisja to osiągnięcie wyniku w granicach normy (HAM-D <= 7, MADRS <= 10, YMRS <= 12).',
    sourceIds: ['canmat-mdd-2023', 'canmat-isbd-bipolar', 'wfsbp-schizophrenia'],
    questions: [
      q(
        'Jak w medycynie opartej na faktach (EBM) definiuje się odpowiedź na leczenie przeciwdepresyjne (response)?',
        ['Spadek całkowitej punktacji w standaryzowanej skali (np. MADRS lub HAM-D) o co najmniej 50% względem stanu wyjściowego', 'Jest to uniwersalny standard oceny skuteczności we wszystkich badaniach rejestracyjnych.'],
        ['Ustąpienie dokładnie każdego z 17 objawów w skali Hamiltona w ciągu 48 godzin', 'Taki stan to natychmiastowa całkowita remisja, niespotykana w praktyce.'],
        ['Subiektywne poczucie pacjenta bez konieczności wypełniania skali', 'EBM wymaga obiektywizacji kwantytatywnej za pomocą zwalidowanego narzędzia.'],
        'psych-skale-q1'
      ),
      q(
        'Jaki jest referencyjny punkt odcięcia oznaczający pełną remisję objawów w skali MADRS?',
        ['Wynik 10 punktów lub mniej', 'Punktacja MADRS <= 10 odpowiada stanowi eutymii bez istotnych klinicznie objawów resztkowych.'],
        ['Wynik 0 punktów bezwzględnie', 'W skali dopuszcza się minimalne punkty za fizjologiczne wahania snu czy apetytu.'],
        ['Wynik powyżej 35 punktów', 'Wynik > 35 punktów świadczy o ciężkim, zagrażającym epizodzie depresyjnym.'],
        'psych-skale-q2'
      ),
      q(
        'Czym różni się skala MADRS od klasycznej skali HAM-D-17 pod względem profilu pytań?',
        ['MADRS koncentruje się na objawach psychicznych i jest bardziej czuła na zmiany farmakoterapeutyczne, podczas gdy HAM-D mocno uwzględnia objawy somatyczne i sen', 'Dzięki temu MADRS jest mniej podatna na fałszywe zawyżanie wyników przez leki sedatywne.'],
        ['MADRS jest skalą przeznaczoną wyłącznie dla dzieci poniżej 5. roku życia', 'MADRS stosuje się powszechnie u osób dorosłych.'],
        ['W skali MADRS oceniane są wyłącznie objawy wytwórcze schizofrenii', 'MADRS to skala depresji, a nie psychozy.'],
        'psych-skale-q3'
      ),
      q(
        'Do oceny jakiego zaburzenia służy skala YMRS (Young Mania Rating Scale)?',
        ['Nasilenia manii i stanów hipomaniakalnych w przebiegu ChAD', 'YMRS ocenia 11 objawów, w tym drażliwość, wielomówność, popęd seksualny i wielkościowość.'],
        ['Głębokości otępienia w chorobie Alzheimera', 'Do oceny otępienia służy skala MMSE lub MoCA.'],
        ['Stopnia uzależnienia od nikotyny', 'Do nikotynizmu służy test Fagerströma.'],
        'psych-skale-q4'
      ),
      q(
        'Z ilu pozycji i podskal składa się skala PANSS stosowana powszechnie w badaniach schizofrenii?',
        ['30 pozycji podzielonych na 3 podskale: pozytywną, negatywną i ogólnej psychopatologii', 'Każda pozycja oceniana jest od 1 (brak) do 7 (skrajnie nasilony).'],
        ['5 pytań tak/nie ocenianych przez pielęgniarkę', 'PANSS jest rozbudowanym narzędziem klinicznym wymagającym szkolenia certyfikacyjnego.'],
        ['100 pytań wypełnianych wyłącznie przez rodzinę pacjenta', 'Skalę wypełnia doświadczony klinicysta na podstawie wywiadu i obserwacji.'],
        'psych-skale-q5'
      )
    ]
  },
  {
    id: 'ocena-ryzyka-samobojczego-agresji',
    moduleId: 'psych-afektywne',
    title: 'Ocena ryzyka samobójczego (C-SSRS) i postępowanie w ostrym pobudzeniu',
    subtitle: 'Identyfikacja czynników ryzyka, deeskalacja i bezpieczeństwo pacjenta',
    group: 'Stany nagłe i bezpieczeństwo',
    minutes: 18,
    goals: [
      'Przeprowadzisz ustrukturyzowaną ocenę intencji samobójczych za pomocą skali C-SSRS.',
      'Zróżnicujesz pasywne myśli rezygnacyjne od aktywnego zamiaru z planem i dostępem do środków.',
      'Zastosujesz zasady deeskalacji słownej oraz bezpieczną farmakoterapię ostrego pobudzenia.'
    ],
    sections: [
      {
        title: 'Skala C-SSRS i gradacja myśli samobójczych',
        text: 'Columbia-Suicide Severity Rating Scale (C-SSRS) jest złotym standardem oceny ryzyka suicydalnego. Rozróżnia 5 poziomów: 1) Pasywne życzenie śmierci ("chciałbym zasnąć i nie obudzić się"), 2) Aktywne nieswoiste myśli samobójcze, 3) Aktywne myśli z metodą (bez planu), 4) Myśli z intencją bez konkretnego planu, 5) Myśli samobójcze z konkretnym planem i zamiarem. Poziomy 4 i 5 oznaczają bezpośrednie zagrożenie życia i bezwzględne wskazanie do natychmiastowej hospitalizacji.'
      },
      {
        title: 'Statyczne i modyfikowalne czynniki ryzyka',
        text: 'Najsilniejszym pojedynczym czynnikiem ryzyka dokonanego samobójstwa jest wcześniejsza próba samobójcza w wywiadzie. Czynniki statyczne obejmują: płeć męską, starszy wiek, samotność, obciążenie genetyczne. Czynniki modyfikowalne (cel natychmiastowej interwencji) to: ciężka bezsenność, pobudzenie psychoruchowe, anhedonia, ból somatyczny, dostęp do broni/leków oraz brak oparcia społecznego.'
      },
      {
        title: 'Postępowanie w ostrym pobudzeniu: deeskalacja i farmakologia',
        text: 'W ostrym pobudzeniu i agresji pierwszym krokiem jest deeskalacja werbalna (spokojny ton, zachowanie dystansu fizycznego, otwarta przestrzeń). W przypadku nieskuteczności lekiem I wyboru jest szybko działający atypowy neuroleptyk i/lub benzodiazepina (np. olanzapina i.m./p.o. lub lorazepam i.m./p.o.). Nigdy nie należy łączyć olanzapiny i.m. z benzodiazepiną i.m. w odstępie mniejszym niż 2 godziny z uwagi na ryzyko zapaści oddechowo-krążeniowej.'
      }
    ],
    table: {
      headers: ['Poziom C-SSRS', 'Charakterystyka myśli', 'Przykładowa wypowiedź', 'Konieczne działanie'],
      rows: [
        ['Poziom 1', 'Pasywne życzenie śmierci', '"Chciałbym zasnąć i się nie obudzić"', 'Ocena wsparcia, optymalizacja leczenia, plan bezpieczeństwa'],
        ['Poziom 2–3', 'Aktywne myśli z niespecyficzną metodą', '"Myślę o przedawkowaniu, ale nie wiem czym"', 'Ścisły nadzór, usunięcie leków, wizyta za 24-48h lub szpital'],
        ['Poziom 4–5', 'Konkretny plan, zamiar, dostęp do środków', '"Kupiłem sznur / mam leki, zrobię to dzisiaj"', 'Natychmiastowa hospitalizacja psychiatryczna (tryb pilny)']
      ]
    },
    advanced:
      'Dwoma lekami o udowodnionym w randomizowanych badaniach klinicznych niezależnym działaniu antysuicydalnym (obniżającym śmiertelność z przyczyn samobójczych) są lit (w chorobie afektywnej dwubiegunowej i depresji jednobiegunowej) oraz klozapina (w schizofrenii i zaburzeniach schizoafektywnych).',
    summary:
      'Skala C-SSRS pozwala obiektywnie sklasyfikować ryzyko samobójcze. W ostrym pobudzeniu kluczowa jest deeskalacja werbalna; farmakoterapia wymaga ostrożności przed łączeniem olanzapiny i.m. z benzodiazepinami.',
    sourceIds: ['cssrs-scale', 'ptp-standardy', 'maudsley15'],
    questions: [
      q(
        'Które dwa leki posiadają najwyższy poziom dowodów naukowych na specyficzne, bezpośrednie działanie antysuicydalne?',
        ['Lit oraz klozapina', 'Oba leki redukują wskaźnik dokonanych samobójstw niezależnie od innych leków.'],
        ['Hydroksyzyna oraz piracetam', 'Leki te nie wykazują żadnego wpływu na redukcję śmiertelności samobójczej.'],
        ['Haloperydol w zastrzykach depot i propranolol', 'Neuroleptyki typowe nie posiadają rejestracji w prewencji suicydalnej.'],
        'psych-suic-q1'
      ),
      q(
        'Dlaczego jednoczesne podanie olanzapiny w iniekcji domięśniowej (i.m.) z benzodiazepiną i.m. jest bezwzględnie przeciwwskazane?',
        ['Grozi zapaścią naczyniową, ciężką hipotensją i śmiertelną depresją ośrodka oddechowego', 'Wymagany jest co najmniej 2-godzinny odstęp między iniekcjami domięśniowymi tych dwóch leków.'],
        ['Powoduje natychmiastowe uszkodzenie trzustki z martwicą krwotoczną', 'Mieszanina nie wywołuje ostrego martwiczego zapalenia trzustki.'],
        ['Olanzapina powoduje natychmiastowe wytrącenie kryształów benzodiazepiny w mięśniu', 'Chodzi o synergizm farmakodynamiczny depresji krążeniowo-oddechowej w OUN.'],
        'psych-suic-q2'
      ),
      q(
        'Jaki pojedynczy czynnik w wywiadzie pacjenta jest najsilniejszym statystycznym predyktorem dokonanego samobójstwa w przyszłości?',
        ['Przebyta próba samobójcza w przeszłości', 'Osoby po próbie samobójczej mają 30–40-krotnie wyższe ryzyko zgonu w wyniku kolejnej próby niż populacja ogólna.'],
        ['Przebyta ospa wietrzna w wieku przedszkolnym', 'Przebyte infekcje wirusowe wieku dziecięcego nie korelują z ryzykiem samobójczym.'],
        ['Posiadanie prawa jazdy kategorii B', 'Nie ma żadnego związku ze wskaźnikami suicydalnymi.'],
        'psych-suic-q3'
      ),
      q(
        'Pacjent w C-SSRS odpowiada: "Mam przygotowane tabletki w szufladzie i zamierzam je połknąć dziś wieczorem, gdy rodzina zaśnie". Jaki to poziom C-SSRS i jakie jest postępowanie?',
        ['Poziom 5 (konkretny plan i zamiar) – stan bezpośredniego zagrożenia życia wymagający natychmiastowej hospitalizacji', 'Wymaga stałego nadzoru personelu i zabezpieczenia pacjenta przed opuszczeniem gabinetu.'],
        ['Poziom 1 – wystarczy zalecenie ciepłej herbaty i kontroli za miesiąc', 'Jest to rażący błąd w sztuce lekarskiej bagatelizujący śmiertelne zagrożenie.'],
        ['Poziom 2 – zalecenie wykonania badania EEG w trybie ambulatoryjnym', 'EEG nie ma zastosowania w natychmiastowym zabezpieczeniu pacjenta suicydalnego.'],
        'psych-suic-q4'
      ),
      q(
        'Jaka jest podstawowa zasada deeskalacji werbalnej w kontakcie z pacjentem silnie pobudzonym i agresywnym?',
        ['Zachowanie bezpiecznego dystansu, spokojny i pewny ton głosu oraz pozostawienie otwartej drogi ewakuacji', 'Zapewnia to bezpieczeństwo zarówno lekarza, jak i pacjenta, zapobiegając poczuciu osaczenia.'],
        ['Podchodzenie na odległość kilku centymetrów i głośne krzyczenie na pacjenta', 'Prowokuje natychmiastowy atak fizyczny ze strony pobudzonego pacjenta.'],
        ['Natychmiastowe zamknięcie drzwi na klucz i zgaszenie światła w gabinecie', 'Zwiększa paranoję i lęk u pacjenta, dramatycznie potęgując agresję.'],
        'psych-suic-q5'
      )
    ]
  },
  {
    id: 'diagnostyka-roznicowa-algorytmy',
    moduleId: 'psych-afektywne',
    title: 'Algorytmy diagnostyki różnicowej: imitacje somatyczne i neurologiczne',
    subtitle: 'Niedoczynność tarczycy, hiperkortyzolemia, zapalenia mózgu i neuroinfekcje',
    group: 'Diagnostyka i semiotyka psychiatryczna',
    minutes: 18,
    goals: [
      'Wykluczysz najczęstsze somatyczne imitacje depresji, lęku, manii i psychozy.',
      'Rozpoznasz autoimmunologiczne zapalenie mózgu (np. anty-NMDAR) jako przyczynę ostrej psychozy.',
      'Wdrożysz ustrukturyzowany panel badań laboratoryjnych i neuroobrazowych w pierwszym epizodzie.'
    ],
    sections: [
      {
        title: 'Endokrynne maski zaburzeń psychicznych',
        text: 'Zaburzenia osi hormonalnych bezpośrednio modulują neuroprzekaźnictwo. Ciężka niedoczynność tarczycy manifestuje się lekooporną depresją, apatią, a w skrajnych przypadkach majaczeniem ("myxedema madness"). Nadczynność tarczycy oraz guz chromochłonny (pheochromocytoma) imitują lęk napadowy i pobudzenie. Z kolei zespół Cushinga wywołuje depresję z labilnością emocjonalną, a choroba Addisona – zespół asteniczno-depresyjny z hipotensją.'
      },
      {
        title: 'Neurologiczne maski i autoimmunologiczne zapalenie mózgu',
        text: 'Nowo powstała psychoza u osoby młodej bez wywiadu psychiatrycznego wymaga wykluczenia autoimmunologicznego zapalenia mózgu z przeciwciałami przeciw receptorom NMDA (anty-NMDAR). Choroba zaczyna się od objawów grypopodobnych, po których następuje gwałtowna psychoza, dyskinezy ustno-twarzowe, niestabilność wegetatywna, katatonia i napady padaczkowe. U młodych kobiet w 50% przypadków wiąże się z potworniakiem jajnika.'
      },
      {
        title: 'Minimalny panel diagnostyczny w pierwszym epizodzie (FEP)',
        text: 'U każdego pacjenta z pierwszym epizodem psychotycznym (First Episode Psychosis - FEP) lub afektywnym konieczne są: morfologia, elektrolity (Na, K, Ca), mocznik, kreatynina, próby wątrobowe, TSH, fT4, witamina B12, kwas foliowy, glukoza, CRP, badanie ogólne moczu, toksykologia moczu oraz neuroobrazowanie mózgu (MRI lub CT) w celu wykluczenia guzów i krwiaków.'
      }
    ],
    table: {
      headers: ['Schorzenie somatyczne', 'Manifestacja psychiatryczna', 'Kluczowe badania laboratoryjne', 'Cechy odróżniające od schorzenia pierwotnego'],
      rows: [
        ['Niedoczynność tarczycy', 'Depresja, spowolnienie, osłabienie pamięci', 'TSH podwyższone, wolne T4 obniżone', 'Zimna sucha skóra, obrzęki podudzi, zaparcia, oporne na SSRI'],
        ['Guz chromochłonny', 'Napady paniki, lęk napadowy, pobudzenie', 'Metanefryny w moczu dobowym / osoczu', 'Ciężkie skoki ciśnienia tętniczego, bladość twarzy, poty'],
        ['Autoimmunologiczne ZM (anty-NMDAR)', 'Psychoza, katatonia, zaburzenia mowy', 'Przeciwciała anty-NMDAR w PMR/surowicy, MRI mózgu', 'Dyskinezy orofacjalne, napady drgawkowe, niestabilność krążenia'],
        ['Guz płata czołowego', 'Zmiana osobowości, odhamowanie lub apatia', 'Rezonans magnetyczny (MRI) głowy z kontrastem', 'Objawy ogniskowe, odruchy deliberacyjne, ból głowy']
      ]
    },
    advanced:
      'Gwałtowne wystąpienie objawów psychotycznych u pacjenta po 40.–50. roku życia bez wcześniejszego wywiadu psychiatrycznego jest silnym sygnałem ostrzegawczym ("red flag") i niemal zawsze wskazuje na tło organiczne (udar, guz OUN, neuroinfekcja, proces neurozwyrodnieniowy).',
    summary:
      'Diagnostyka różnicowa w pierwszym epizodzie wymaga wykluczenia tła organicznego. Panel badań laboratoryjnych, toksykologia i neuroobrazowanie chronią przed przeoczeniem guzów OUN, dysfunkcji tarczycy czy zapalenia anty-NMDAR.',
    sourceIds: ['icd11-cddr', 'ptp-standardy', 'wfsbp-schizophrenia'],
    questions: [
      q(
        'Młoda kobieta (22 lata) bez wywiadu psychiatrycznego rozwija ostrą psychozę z omamami, po czym dołączają dyskinezy ustno-twarzowe i niestabilność ciśnienia. Jakie schorzenie należy pilnie wykluczyć?',
        ['Autoimmunologiczne zapalenie mózgu z przeciwciałami przeciw receptorom NMDA (anty-NMDAR)', 'Typowo towarzyszy mu potworniak jajnika i wymaga natychmiastowej immunoterapii oraz onkologicznego USG miednicy mniejszej.'],
        ['Typową schizofrenię paranoidalną bez konieczności dalszych badań', 'Schizofrenia nie wywołuje ostrych dyskinez orofacjalnych i niestabilności wegetatywnej u osoby nieleczonej neuroleptykami.'],
        ['Prostą reakcję adaptacyjną na stres', 'Obraz kliniczny wskazuje na ciężkie, zagrażające życiu zapalenie mózgu.'],
        'psych-diff-q1'
      ),
      q(
        'Które badanie laboratoryjne jest obligatoryjne przed rozpoznaniem lekoopornej depresji u pacjenta ze spowolnieniem psychoruchowym i suchą skórą?',
        ['Stężenie TSH oraz wolnych hormonów tarczycy (fT3, fT4)', 'Ciężka niedoczynność tarczycy może doskonale imitować lekooporną depresję lub otępienie.'],
        ['Stężenie amylazy w ślinie', 'Amylaza ślinowa nie ma znaczenia w diagnostyce różnicowej depresji.'],
        ['Test troponinowy co 2 godziny przez dobę', 'Troponiny oceniają martwicę mięśnia sercowego w zawale serca.'],
        'psych-diff-q2'
      ),
      q(
        'Który parametr kliniczny stanowi tzw. czerwoną flagę (red flag) silnie sugerującą organiczne podłoże psychozy?',
        ['Pojawienie się pierwszego w życiu epizodu psychotycznego po 45.–50. roku życia', 'Pierwotna schizofrenia rozwija się typowo w wieku 18–30 lat; późny początek sugeruje guzy, udary lub otępienie.'],
        ['Wystąpienie objawów w wieku 20 lat po przewlekłym stresie', 'Jest to typowy wiek zachorowania na schizofrenię.'],
        ['Obecność urojeń ksobnych i odsłonięcia', 'Urojenia te są typowe dla schizofrenii.'],
        'psych-diff-q3'
      ),
      q(
        'Guz chromochłonny nadnerczy (pheochromocytoma) najczęściej błędnie diagnozowany jest w gabinecie psychiatrycznym jako:',
        ['Zaburzenie lękowe z napadami paniki (Panic Disorder)', 'Rzuty wydzielania katecholamin powodują nagły lęk, palpitacje, bladość i skoki ciśnienia tętniczego.'],
        ['Choroba Alzheimera o wczesnym początku', 'Guz chromochłonny nie wywołuje pierwotnego deficytu pamięci autobiograficznej.'],
        ['Jadłowstręt psychiczny (anorexia nervosa)', 'Brak zaburzenia obrazu własnego ciała wyklucza jadłowstręt.'],
        'psych-diff-q4'
      ),
      q(
        'Co wchodzi w skład minimalnego standardu laboratoryjnego pierwszego epizodu psychotycznego (FEP)?',
        ['Morfologia, elektrolity, TSH, próby wątrobowe, nerkowe, glukoza, witamina B12, toksykologia moczu i badanie neuroobrazowe (MRI/CT)', 'Pakiet ten pozwala wykluczyć metaboliczne, toksyczne i anatomiczne przyczyny psychozy.'],
        ['Wyłącznie badanie grupy krwi i Rh', 'Grupa krwi nie wnosi żadnych informacji o etiologii psychozy.'],
        ['Pobranie wycinka ze skóry przedramienia', 'Biopsja skóry nie ma zastosowania w diagnostyce pierwszego epizodu psychozy.'],
        'psych-diff-q5'
      )
    ]
  },
  {
    id: 'przypadki-integracyjne-diagnostyka',
    moduleId: 'psych-afektywne',
    title: 'Kompleksowa diagnostyka psychiatryczna: przypadki integracyjne',
    subtitle: 'Wielowymiarowa synteza MSE, osi ICD-11, badań somatycznych i planu leczenia',
    group: 'Diagnostyka i semiotyka psychiatryczna',
    minutes: 20,
    goals: [
      'Zintegrujesz dane z MSE, wywiadu rozwojowego, skal i badań laboratoryjnych w spójną diagnozę.',
      'Sformułujesz wieloaspektowy plan postępowania diagnostyczno-terapeutycznego.',
      'Zabezpieczysz pacjenta w sytuacjach niejednoznacznych klinicznie i stanach nagłych.'
    ],
    sections: [
      {
        title: 'Integracja wielowymiarowa w ujęciu biopsychospołecznym',
        text: 'Nowoczesna diagnoza psychiatryczna nie ogranicza się do nadania kodu ICD-11. Wymaga syntezy czterech filarów: 1) Osiowej symptomatologii i jej dynamiki czasowej, 2) Biologicznego tła somatycznego (badania krwi, neuroobrazowanie, toksykologia), 3) Przedchorobowej struktury osobowości i stylu radzenia sobie ze stresem, 4) Kontekstu psychospołecznego, traum i zasobów oparcia.'
      },
      {
        title: 'Analiza przypadku: pacjent z objawami mieszanymi i bezsennością',
        text: 'Pacjent 42-letni zgłasza się z powodu ciężkiej bezsenności, gonitwy myśli i lęku. W wywiadzie rodzinnym: samobójstwo wujka. W badaniu fizykalnym: tachykardia 105/min, drżenie rąk. Standardowy odruch włączenia leku przeciwdepresyjnego (SSRI) bez weryfikacji wywiadu hipomaniakalnego grozi wyzwoleniem ostrego stanu manii lub nasileniem ryzyka samobójczego. Precyzyjne MSE ujawnia wzmożony napęd psychoruchowy pod maską skarg na lęk – diagnoza: epizod mieszany w przebiegu ChAD.'
      },
      {
        title: 'Formułowanie planu terapeutycznego i kontraktu bezpieczeństwa',
        text: 'Plan postępowania musi uwzględniać: doraźną stabilizację i prewencję suicydalną (zabezpieczenie środków farmakologicznych przez rodzinę), optymalny dobór farmakoterapii celowanej przyczynowo, psychoedukację pacjenta i bliskich oraz zaplanowanie kontroli w ściśle zdefiniowanym interwale (np. 48–72h w stanach niestabilnych).'
      }
    ],
    table: {
      headers: ['Etap diagnozy', 'Narzędzia kliniczne', 'Kluczowe pytania decyzyjne', 'Efekt końcowy'],
      rows: [
        ['1. Wykluczenie somatyczne', 'Lab, toksykologia, EKG, MRI', 'Czy objawy wynikają z toksyn, tarczycy lub guza OUN?', 'Czyste pole organiczne'],
        ['2. Semiotyka i MSE', 'Badanie bezpośrednie, skale (C-SSRS, MADRS, YMRS)', 'Czy to depresja jednobiegunowa, ChAD czy psychoza?', 'Ustalenie zespołu osiowego'],
        ['3. Kontekst rozwojowy', 'Wywiad rodzinny, osobowość, styl więzi', 'Czy współistnieje trauma, ADHD lub cechy borderline?', 'Profil cech osobowości'],
        ['4. Plan terapeutyczny', 'Farmakoterapia, psychoterapia, sieć wsparcia', 'Gdzie leczyć (ambulatorium vs szpital) i jaki lek I rzutu?', 'Bezpieczny kontrakt leczenia']
      ]
    },
    advanced:
      'Zasada "primum non nocere" w diagnostyce psychiatrycznej nakazuje, by w przypadku jakichkolwiek wątpliwości między nawracającą depresją (MDD) a chorobą afektywną dwubiegunową (ChAD) NIE włączać monoterapii lekiem przeciwdepresyjnym. Bezpieczniejszą opcją jest rozpoczęcie od leku stabilizującego nastrój (np. kwetiapina, lamotrygina).',
    summary:
      'Kompleksowa diagnoza łączy MSE, badania somatyczne, wywiad rozwojowy i ocenę ryzyka suicydalnego. W wątpliwościach afektywnych unika się monoterapii antydepresantem, zabezpieczając pacjenta normotymicznie.',
    sourceIds: ['icd11-cddr', 'canmat-isbd-bipolar', 'ptp-standardy'],
    questions: [
      q(
        'Dlaczego u pacjenta z ciężkim przygnębieniem, bezsennością i przyspieszonym tokiem myśli wdrożenie monoterapii SSRI niesie wysokie ryzyko?',
        ['Może sprowokować przejście w pełnoobjawową manię lub stan mieszany ze skrajnym ryzykiem samobójczym', 'Pobudzenie napędu przy dysforii ułatwia podjęcie impulsywnej próby samobójczej.'],
        ['Powoduje natychmiastowe zniszczenie receptorów dopaminowych w korze wzrokowej', 'SSRI nie niszczą receptorów dopaminowych.'],
        ['Jest bezwzględnie zakazane przez prawo farmaceutyczne pod karą więzienia', 'Jest to błąd kliniczny, nie przestępstwo karne.'],
        'psych-integ-q1'
      ),
      q(
        'Jakie postępowanie jest najbezpieczniejsze u pacjenta z nietypowym obrazem afektywnym, gdy nie można wykluczyć ChAD?',
        ['Rozpoczęcie od leku o profilu stabilizującym nastrój (np. kwetiapina lub lurasidon) zamiast czystego antydepresantu', 'Leki te posiadają udowodnioną skuteczność w depresji dwubiegunowej bez ryzyka indukcji manii.'],
        ['Podanie maksymalnej dawki wenlafaksyny z klomipraminą', 'Silne leki o profilu noradrenergicznym najłatwiej indukują zmianę fazy w manię.'],
        ['Odesłanie pacjenta bez leczenia na okres 12 miesięcy', 'Pozostawienie pacjenta bez opieki stwarza bezpośrednie zagrożenie zdrowia i życia.'],
        'psych-integ-q2'
      ),
      q(
        'Który element badania MSE ma kluczowe znaczenie przy różnicowaniu omamów rzekomych (pseudohalucynacji) od omamów prawdziwych?',
        ['Lokalizacja źródła doznań (przestrzeń wewnętrzna vs obiektywna przestrzeń zewnętrzna)', 'Pseudohalucynacje lokalizowane są wewnątrz głowy i brak im cech doznania zmysłowego w przestrzeni zewnętrznej.'],
        ['Godzina występowania objawu w ciągu doby', 'Pora dnia nie definiuje fenomenu pseudohalucynacji.'],
        ['Stopień zażółcenia twardówek', 'Żółtaczka świadczy o chorobie wątroby, nie różnicuje omamów.'],
        'psych-integ-q3'
      ),
      q(
        'Co oznacza pojęcie "kontraktu bezpieczeństwa" w ambulatoryjnej opiece psychiatrycznej?',
        ['Uzgodnienie z pacjentem i rodziną planu postępowania i kontaktu w razie nagłego nasilenia myśli suicydalnych', 'Plan obejmuje usunięcie niebezpiecznych przedmiotów, telefony zaufania i kontakt z izbą przyjęć.'],
        ['Notarialne zrzeczenie się odpowiedzialności przez pacjenta na piśmie', 'Kontrakt nie jest umową prawno-majątkową, lecz narzędziem relacyjnym.'],
        ['Bezwzględne zamknięcie pacjenta w izolatce domowej przez bliskich', 'Izolacja mechaniczna nie ma zastosowania w opiece domowej.'],
        'psych-integ-q4'
      ),
      q(
        'Dlaczego u osób w wieku podeszłym z nagłym pogorszeniem funkcjonowania poznawczego zawsze należy wykonać badanie ogólne moczu?',
        ['Infekcja układu moczowego (ZUM) jest u seniorów najczęstszą somatyczną przyczyną ostrego zespołu majaczeniowego (delirium)', 'Często przebiega bez gorączki i dyzurii, manifestując się wyłącznie zaburzeniami świadomości i pobudzeniem.'],
        ['Bakterie w moczu produkują dopaminę przenikającą przez barierę krew-mózg', 'Bakterie z moczu nie produkują dopaminy penetrującej do OUN.'],
        ['Badanie moczu zastępuje badanie rezonansu magnetycznego głowy', 'Badanie moczu nie ocenia struktury mózgowia.'],
        'psych-integ-q5'
      )
    ]
  }
];
