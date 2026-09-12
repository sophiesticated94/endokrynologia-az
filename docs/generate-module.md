# MODULE GENERATION PLAYBOOK

Pracujesz w istniejącym repozytorium edukacji medycznej.

Twoim zadaniem jest projektowanie i implementowanie NOWYCH MODUŁÓW kursu w sposób spójny z istniejącą architekturą, UX, modelem evidence i standardem jakości.

Nie traktuj nowego modułu jako osobnej mini-aplikacji.
Najpierw zrozum istniejący system, potem rozszerz go najmniejszą sensowną zmianą.

==================================================
0. ZASADA NADRZĘDNA
==================================================

Nowy moduł powinien wyglądać, działać i zachowywać się tak, jakby od początku był częścią tego samego produktu.

Priorytety, w tej kolejności:

1. poprawność merytoryczna
2. bezpieczeństwo kliniczne
3. jakość procesu uczenia
4. spójność UX
5. prostota architektury
6. możliwość testowania
7. łatwość dalszego rozszerzania
8. ilość funkcji

Nigdy nie optymalizuj pod:
- liczbę lekcji,
- liczbę widgetów,
- liczbę plików,
- liczbę "feature'ów",
- efektowność commit message.

Nie twórz funkcji tylko dlatego, że można.

==================================================
1. ZANIM NAPISZESZ KOD
==================================================

Najpierw wykonaj audit aktualnego HEAD.

Sprawdź:

- istniejące CourseBundle
- LessonExperienceV2
- lesson renderer
- learning widgets
- inlineEnhancements
- diagram registry
- evidence registry
- presets / workbench
- cases
- longitudinal state
- source metadata
- tests
- limity plików
- conventions IDs
- routing / deep links

Znajdź najbardziej podobny istniejący moduł.

Nie zaczynaj od projektowania abstrakcji.

Najpierw odpowiedz sobie:

"Który istniejący mechanizm mogę rozszerzyć zamiast tworzyć nowy?"

==================================================
2. DECYZJE ARCHITEKTONICZNE
==================================================

Stosuj tę kolejność decyzji:

A. REUSE
Jeżeli istniejący mechanizm odpowiada problemowi:
użyj go.

B. EXTEND
Jeżeli potrzeba niewielkiej różnicy:
rozszerz typ / registry / helper.

C. SPECIALIZE
Jeżeli domena naprawdę wymaga innego zachowania:
dodaj domain-specific implementation pod wspólnym interfejsem.

D. NEW ABSTRACTION
Twórz dopiero wtedy, gdy:
- problem występuje wielokrotnie,
- semantyka jest stabilna,
- istniejące rozwiązanie powodowałoby realne sprzężenie lub duplikację.

Nie abstrahuj po pierwszym przypadku.

Nowy framework nie jest sukcesem.
Brak potrzeby nowego frameworka jest zwykle lepszym wynikiem.

==================================================
3. SINGLE SOURCE OF TRUTH
==================================================

Każda informacja powinna mieć jedno canonical miejsce.

Dotyczy szczególnie:

- lessonId
- moduleId
- diagramId
- widgetId
- presetId
- caseId
- patient/threadId
- evidenceId
- sourceId
- drug metadata
- diagnostic criteria
- quantitative model parameters

Nie twórz równoległych:

registry + if(lessonId)
registry + switch
source metadata + copied DOI
drug database + local drug constants

Renderer ma konsumować dane z registry, nie odtwarzać logikę ręcznie.

==================================================
4. STRUKTURA NOWEGO MODUŁU
==================================================

Preferuj semantyczny podział plików.

Przykład:

lib/<domain>/
  index.ts
  types.ts
  registry.ts
  validation.ts

  experiences/
    <topic-a>.ts
    <topic-b>.ts

  enhancements/
    <topic-a>.ts
    <topic-b>.ts

  presets/
    <topic-a>.ts

  evidence/
    sources.ts
    claims.ts
    models.ts

  cases/
    ...

Nie dziel plików arbitralnie na:

module-1.ts
module-2.ts
module-2b.ts

jeżeli granica domenowa może być czytelniejsza.

Cel:
<500 linii/pliku.

Jeżeli plik zbliża się do 300–400 linii i zawiera kilka różnych odpowiedzialności:
podziel go semantycznie.

==================================================
5. COURSE ASSEMBLER MA BYĆ CIENKI
==================================================

Plik typu:

course-<domain>.ts

powinien:

- importować lessons
- importować questions
- importować flashcards
- importować cases
- składać CourseBundle

Nie powinien zawierać:
- setek linii definicji
- renderer logic
- evidence metadata
- simulator logic

==================================================
6. RECIPE DLA KAŻDEJ LEKCJI
==================================================

Każda nowa lekcja ma być aktywnym doświadczeniem, nie artykułem z quizem na końcu.

Minimalny rytm:

CLINICAL / CONCEPTUAL HOOK
→ krótki problem przed teorią

DIAGNOSTIC QUESTION
→ co użytkownik już rozumie?

SHORT EXPLANATION

PREDICT
→ przewidź wynik / mechanizm / decyzję

INLINE INTERACTION
→ diagram / widget / micro-case / timeline / workbench

FEEDBACK

MECHANISM / CLINICAL INTERPRETATION

CHECKPOINT

WHAT WOULD CHANGE YOUR MIND?

SECOND ACTIVITY
→ inny typ rozumowania niż pierwsza

TEACH-BACK

EXIT TICKET
→ transfer wiedzy do nowego scenariusza

==================================================
7. MINIMALNY STANDARD LESSONEXPERIENCEV2
==================================================

Każda lekcja powinna mieć:

- jasno zdefiniowane mastery objectives
- clinical/conceptual hook
- diagnostic activity
- minimum 2 aktywne checkpointy
- minimum 2 różne typy aktywności
- przynajmniej jeden element wymagający decyzji przed pokazaniem odpowiedzi
- `what would change your mind?`
- teach-back
- exit ticket
- sourceIds
- opcjonalny inline enhancement tam, gdzie faktycznie pomaga

Nie dodawaj widgetu tylko dlatego, że "lekcja powinna mieć widget".

Jeżeli tekst + case lepiej uczą konceptu:
użyj tekstu + case.

==================================================
8. INLINE ENHANCEMENTS
==================================================

Dane lekcji nie mogą importować React components.

Lesson data deklaruje:

id
kind
placement
presetId?
evidenceId?

Renderer rozwiązuje komponent przez registry.

Dozwolone konceptualnie:

- diagram
- interactive-widget
- micro-case
- evidence-panel
- workbench-deeplink

Placement powinien wynikać z pedagogiki.

Najczęściej:

krótka teoria
→ predict
→ widget
→ feedback
→ dalsze wyjaśnienie

Nie wrzucaj wszystkich widgetów na koniec lekcji jak dział "multimedia".

==================================================
9. JAK PODEJMOWAĆ DECYZJĘ: WIDGET CZY NIE?
==================================================

Dodaj widget tylko jeżeli pomaga użytkownikowi:

- manipulować parametrem
- porównać scenariusze
- zobaczyć trend
- ćwiczyć klasyfikację
- wykrywać zależności
- testować counterfactual
- rozumieć model przestrzenny / czasowy
- przejść przez decision rule

Nie twórz widgetu, jeśli jest tylko:

tekst
+
przycisk
+
ładna ramka.

==================================================
10. DIAGRAMY
==================================================

Diagram powinien pokazywać relację, której trudno nauczyć samym tekstem.

Dobre zastosowania:

- pathways
- timelines
- feedback loops
- differential trees
- receptor networks
- PK trajectories
- anatomical relationships
- diagnostic decision flow

Diagram nie powinien być infografiką pełną tekstu.

Jedno diagramId:
→ jeden registry entry
→ jeden renderer.

Nie mapuj diagramów przez `if (lessonId === ...)`.

==================================================
11. EVIDENCE FIRST
==================================================

Każdy istotny claim kliniczny musi mieć właściwy poziom evidence.

Rozróżniaj:

ESTABLISHED CLINICAL

SUPPORTED MECHANISTIC MODEL

ASSOCIATION

EXPERIMENTAL

UNCERTAIN

Nie przedstawiaj:
association jako causal mechanism.

Nie przedstawiaj:
mechanistic hypothesis jako clinical fact.

Nie przedstawiaj:
guideline threshold jako biological law.

==================================================
12. QUANTITATIVE CLAIMS
==================================================

Każda ważna liczba musi wiedzieć, skąd pochodzi.

Każdy quantitative claim powinien mieć:

evidenceId
origin
sourceId
population
method
applicability
limitations

Rozróżniaj:

MEASURED
DERIVED
MODELLED
EXTRAPOLATED
GUIDELINE THRESHOLD

Przykład:

QT measured
→ MEASURED

QTcF
→ DERIVED

PET dose→occupancy model
→ MODELLED

model poza study range
→ EXTRAPOLATED

threshold z guideline
→ GUIDELINE THRESHOLD

==================================================
13. NIGDY NIE UDAWAJ PRECYZJI
==================================================

Nie generuj liczby tylko dlatego, że można ją policzyć.

Zakazane bez walidowanego modelu:

- patient concentration z dawki
- probability diagnozy
- probability suicide
- probability response
- dokładne occupancy konkretnego pacjenta
- "risk = 72%"
- pseudo biomarker scores

Jeżeli model jest edukacyjny:
powiedz, że jest edukacyjny.

Jeżeli pokazuje kierunek:
pokazuj kierunek.

Nie zamieniaj:

LOWER / NEUTRAL / HIGHER

w:

1.31× / 1.72× / 2.24×

bez podstawy.

==================================================
14. MODELE MATEMATYCZNE
==================================================

Każdy model powinien mieć model card:

- name
- purpose
- equation
- parameter source
- population
- calibration
- validation range
- assumptions
- known failure modes
- out-of-range behavior
- patient-specific prediction: YES / NO

Jeżeli NO:
UI musi to jasno komunikować.

==================================================
15. WORKBENCH / SIMULATOR
==================================================

Workbench ma służyć eksperymentowaniu.

Lekcja:
→ deep link
→ właściwa zakładka
→ właściwy preset
→ gotowy scenariusz

Nie:

lesson
→ "open simulator"
→ pusty formularz

Preset powinien hydratuje:
- relevant patient state
- drug(s)
- labs
- scenario parameters
- timeline
- evidence context

==================================================
16. CASES
==================================================

Przypadki nie mają być quizami przebranymi za pacjenta.

Dobry case:

- progresywnie ujawnia dane
- pozwala popełnić rozsądny błąd
- wymaga interpretacji niepełnych danych
- wymaga wskazania brakującej informacji
- zawiera realistyczne distractory
- zmienia decyzję po nowych danych

Możliwe stage types:

presentation
history
MSE/exam
collateral
missing-information
lab
imaging
timeline
differential
safety
treatment
follow-up
counterfactual

Nie wymuszaj jednej liczby etapów.

==================================================
17. DISTRACTORS
==================================================

Błędna odpowiedź ma być atrakcyjna dla osoby, która:

- zna część materiału
- myli priorytety
- zamyka różnicowanie za wcześnie
- ignoruje timing
- nadinterpretuje test
- wybiera opcję prawidłową w innej sytuacji

Nie używaj absurdalnych odpowiedzi.

Doctor-level distractor powinien wyglądać rozsądnie przez pierwsze 2–3 sekundy.

==================================================
18. COUNTERFACTUAL
==================================================

Dobry moduł powinien uczyć:

"co zmieniłoby decyzję?"

Counterfactual zmienia jeden fakt:

np.
- wiek
- czas trwania
- pregnancy
- renal function
- exposure
- smoking
- laboratory value
- medication
- collateral history
- symptom outside episode

Output nie powinien być:

"diagnosis probability 82%"

tylko:

- evidence supporting
- evidence against
- missing information
- next discriminating question/test
- management implication

==================================================
19. LONGITUDINAL PATIENTS
==================================================

Jeżeli domena korzysta na ciągłości:
użyj istniejących recurring patients.

Nie zamieniaj każdego case w nowego fikcyjnego człowieka.

Patient state powinien być canonical.

Case:
→ snapshot/event

Counterfactual:
→ immutable branch

Nie mutuj canonical timeline.

==================================================
20. DIAGNOSTIC CRITERIA
==================================================

Nigdy nie mieszaj klasyfikacji.

Jeżeli DSM i ICD się różnią:
pokaż różnicę.

Nie twórz hybrydowego:
"DSM/ICD criteria"

jeżeli faktycznie nie są identyczne.

Diagnostic rule metadata powinno mieć jedno canonical źródło.

==================================================
21. NEGATIVE TEST LOGIC
==================================================

Ujemny wynik badania:

NIE:
"potwierdza pierwotną chorobę"

tylko:
"zmniejsza prawdopodobieństwo określonej alternatywy"

Pierwotne rozpoznanie musi wynikać z dodatnich kryteriów klinicznych i całego kontekstu.

==================================================
22. SOURCE STRATEGY
==================================================

Preferowana hierarchia źródeł:

1. aktualne guideline / consensus
2. official diagnostic criteria
3. systematic review / meta-analysis
4. high-quality RCT / cohort
5. landmark mechanistic study
6. narrative review wyłącznie jako background

Nie buduj istotnej rekomendacji klinicznej na przypadkowym review, jeśli istnieje guideline.

==================================================
23. SOURCE METADATA
==================================================

Canonical source registry przechowuje:

- title
- year
- authors
- journal/book
- DOI
- URL
- source type

Claim referencjonuje sourceId.

Nie kopiuj DOI w pięciu miejscach.

==================================================
24. CLAIM-LEVEL EVIDENCE
==================================================

Lesson-level bibliography nie wystarcza dla:

- progów
- procentów
- zakresów
- model parameters
- diagnostic performance
- risk thresholds

Takie wartości dostają evidenceId bezpośrednio.

==================================================
25. CONTENT LANGUAGE
==================================================

Przeszukuj treść pod kątem:

- zawsze
- nigdy
- dowodzi
- potwierdza
- wyklucza
- jednoznacznie
- patognomoniczny
- gwarantuje
- złoty standard
- bezwzględnie

Każde użycie musi być uzasadnione.

Preferuj:
- wspiera
- zwiększa prawdopodobieństwo
- jest związane z
- sugeruje
- przemawia za
- obserwowano
- model zakłada

ale nie rozwadniaj języka tam, gdzie kryterium rzeczywiście jest jednoznaczne.

==================================================
26. UX
==================================================

Użytkownik powinien wiedzieć:

- czego się uczy
- dlaczego wykonuje aktywność
- co było błędne
- co zmieniłoby decyzję
- skąd pochodzi liczba
- czy wynik jest measured czy modelled
- co zrobić dalej

Nie pokazuj użytkownikowi pięciu równorzędnych CTA.

Na końcu sekcji powinien istnieć naturalny kolejny krok.

==================================================
27. MOBILE / ACCESSIBILITY
==================================================

Każdy nowy widget:

- działa na mobile
- nie wymaga hover
- ma accessible labels
- obsługuje keyboard
- nie polega wyłącznie na kolorze
- nie ma poziomego scrolla bez potrzeby
- modal/bottom sheet ma focus management

==================================================
28. TEST STRATEGY
==================================================

Testuj invarianty i zachowanie.

Nie testuj:
"array.length === 4"

jeśli 4 nie ma znaczenia domenowego.

Testuj:

- wszystkie IDs istnieją
- registry references resolve
- zero orphan mappings
- zero stale IDs
- enhancement has renderer
- preset hydrates expected fields
- classification rules use correct source
- evidence IDs resolve
- model origin is correct
- out-of-range handling
- safety rules
- no pseudo patient prediction
- no regressions existing courses

==================================================
29. CONTENT SAFETY TESTS
==================================================

Dodaj lightweight content audit.

Flaguj potencjalnie niebezpieczne frazy:

- diagnosis probability
- suicide risk %
- universal therapeutic threshold
- fake patient concentration
- "negative test confirms"
- universal antidote
- patognomonic claims
- modelled value labelled measured

Regex nie zastępuje review.
Ma wskazywać miejsca wymagające review.

==================================================
30. JAK PODEJMOWAĆ DECYZJĘ O NOWEJ FUNKCJI
==================================================

Przed dodaniem feature odpowiedz:

1. Jaki konkretny problem edukacyjny rozwiązuje?
2. Czy istniejący komponent już go rozwiązuje?
3. Czy można go rozwiązać prostszą aktywnością?
4. Czy funkcja wymaga realnego stanu/interakcji?
5. Czy mamy evidence potrzebne do przedstawienia wyniku?
6. Czy wynik może zostać błędnie odebrany jako clinical decision support?
7. Jak to przetestujemy?
8. Jak zachowa się na mobile?
9. Czy będzie używane w więcej niż jednej lekcji?
10. Czy maintenance cost jest uzasadniony?

Jeżeli odpowiedzi są słabe:
nie dodawaj feature.

==================================================
31. JAK PODEJMOWAĆ DECYZJĘ O NOWEJ ABSTRAKCJI
==================================================

Nowa abstrakcja jest uzasadniona, gdy:

- istnieją >=3 realne podobne przypadki
- duplikacja jest semantyczna, nie tylko syntaktyczna
- API można jasno nazwać
- odpowiedzialność jest stabilna
- testy stają się prostsze
- zależności maleją

Nie twórz abstrakcji tylko dlatego, że dwa pliki mają podobne 8 linii.

==================================================
32. JAK PODEJMOWAĆ DECYZJĘ O LICZBIE LEKCJI
==================================================

Nie zaczynaj od liczby.

Najpierw zdefiniuj:

- competencies
- concepts
- decisions
- common errors
- safety-critical knowledge

Lekcja powinna mieć jeden spójny mental model / clinical decision problem.

Jeżeli lekcja wymaga 45 minut i siedmiu mental models:
podziel.

Jeżeli dwie lekcje mają prawie identyczny objective:
połącz.

==================================================
33. JAK PODEJMOWAĆ DECYZJĘ O GŁĘBOKOŚCI
==================================================

Używaj progressive disclosure:

MUST KNOW
→ podstawowy model i decyzja

CLINICAL REASONING
→ zastosowanie i różnicowanie

MECHANISM
→ dlaczego

DEEP DIVE
→ szczegóły specjalistyczne

EVIDENCE & CONTROVERSY
→ ograniczenia, badania, niepewność

Nie wrzucaj wszystkiego do podstawowego tekstu.

==================================================
34. DEFINITION OF DONE DLA NOWEGO MODUŁU
==================================================

Moduł jest gotowy dopiero, gdy:

ARCHITEKTURA
- integruje się z istniejącym CourseBundle
- nie tworzy równoległego frameworka
- ma jeden canonical registry
- nie ma stale/orphan IDs
- pliki pozostają rozsądnej wielkości

LEKCJE
- wszystkie mają LessonExperienceV2
- aktywny hook
- minimum 2 checkpoints
- różne typy aktywności
- teach-back
- exit ticket
- what-would-change-your-mind

CONTENT
- wszystkie claims zostały przejrzane
- systemy klasyfikacyjne nie są mieszane
- negative tests nie potwierdzają automatycznie diagnozy
- mechanistic models są oznaczone jako models
- brak pseudo-precyzji

EVIDENCE
- ważne liczby mają claim-level provenance
- source metadata są canonical
- measured/modelled/derived/extrapolated są rozróżnione

CASES
- distractory są realistyczne
- case wymaga reasoning, nie recall
- counterfactual zmienia decyzję
- brak sztywnych sztucznych struktur

UX
- inline elements są tam, gdzie uczą konceptu
- deep links otwierają gotowy context
- mobile/accessibility działa

TESTY
- typecheck
- module tests
- full regression
- production build

==================================================
35. WORKFLOW IMPLEMENTACJI
==================================================

Dla nowego modułu pracuj fazami:

PHASE 0 — AUDIT
Zrozum aktualny HEAD i najbliższy istniejący wzorzec.

PHASE 1 — DOMAIN MAP
Zdefiniuj competencies, lesson boundaries, cases, evidence requirements.

PHASE 2 — SOURCE MAP
Przypisz canonical sources do kluczowych tematów.

PHASE 3 — DATA MODEL
Dodaj tylko niezbędne types/registry/data.

PHASE 4 — 2–3 REFERENCE LESSONS
Zbuduj kilka reprezentatywnych lekcji do docelowej jakości.

Nie migruj całego modułu przed sprawdzeniem wzorca.

PHASE 5 — REFERENCE CASE + WORKBENCH
Zweryfikuj reasoning i interakcje.

PHASE 6 — SCALE
Dopiero wtedy wdrażaj pozostałe lekcje.

PHASE 7 — CONTENT AUDIT
Pełny przegląd merytoryczny.

PHASE 8 — REGRESSION
Tests + typecheck + build + existing courses.

==================================================
36. JEŻELI MASZ WĄTPLIWOŚĆ
==================================================

Nie zgaduj.

Jeżeli brakuje:
- źródła
- parametrów modelu
- kryterium
- dowodu dla liczby

zrób:

UNAVAILABLE / UNKNOWN / NEEDS SOURCE

zamiast wymyślać wartość.

W edukacji medycznej jawna luka w danych jest lepsza niż elegancka fikcja.

==================================================
37. RAPORT KOŃCOWY
==================================================

Po stworzeniu modułu podaj:

1. architecture changes
2. lessons created/modified
3. cases
4. widgets / diagrams
5. new evidence claims
6. models and their limitations
7. source metadata
8. tests added
9. typecheck/test/build results
10. known limitations / manual review required

Nie pisz tylko:
"implemented successfully".

Pokaż co faktycznie zostało wykonane i czego celowo nie zrobiono.