# Playbook migracji modułów do rozszerzonego profilu assessment

## Cel

Ten dokument opisuje docelowy standard oceniania wiedzy w całej aplikacji. Celem nie jest zwiększenie liczby quizów, tylko sprawdzanie każdego istotnego celu edukacyjnego na kilku poziomach: rozpoznanie, zastosowanie i samodzielne rozumowanie/transfer.

Migracja ma rozwijać istniejący `LessonExperienceV2` i `LearningActivity`, a nie budować obok drugi system assessment. Reuse > extend > specialize > new abstraction.

Priorytety:

`correctness > clinical safety > objective coverage > reasoning quality > feedback quality > UX > architecture simplicity > feature count`

## Stan wyjściowy

Repo ma już typy aktywności m.in. `single_choice`, `multi_select`, `ordering`, `matching`, `numeric`, `missing_information`, `trend`, `lab` i `recall`, ale wiele lekcji i fallback generator nadal opiera się głównie na `single_choice`. Migracja ma wykorzystać istniejące typy oraz dodać tylko brakujące prymitywy potrzebne do oceny odpowiedzi generowanych przez użytkownika i reasoning klinicznego.

Nie wolno traktować samej liczby pytań jako miernika jakości. Miernikiem jest pokrycie learning objectives i jakość dowodu, że użytkownik potrafi zastosować wiedzę.

---

## 1. Trzy poziomy assessment dla learning objective

Każdy learning objective powinien być mapowany na jeden lub więcej poziomów:

### Recognition

Sprawdza rozpoznanie faktu, mechanizmu lub wzorca.

Preferowane typy:
- `single_choice`
- `multi_select`
- `matching`
- prosta `classification`

### Application

Sprawdza użycie wiedzy w nowej sytuacji.

Preferowane typy:
- `missing_information`
- `ordering`
- `numeric`
- `trend`
- `lab`
- `evidence_weighting`
- `select_and_justify`
- case-based decision

### Generation / transfer

Sprawdza samodzielne wygenerowanie rozumowania bez podsuniętej poprawnej odpowiedzi.

Preferowane typy:
- `short_answer`
- `clinical_reasoning`
- teach-back / `recall`
- counterfactual z odpowiedzią otwartą
- transfer na nowy przypadek

### Minimalny kontrakt coverage

Dla każdego objective:
- co najmniej 1 aktywność oceniająca,
- objective typu `decision`, `differentiation` lub `safety` musi mieć assessment na poziomie Application,
- kluczowy objective lekcji musi mieć co najmniej 2 różne typy aktywności,
- co najmniej jeden kluczowy objective lekcji powinien mieć Generation/transfer,
- ten sam fakt nie może być liczony jako dwa niezależne dowody mastery tylko dlatego, że został przepisany do dwóch MCQ.

Dla najważniejszych lekcji klinicznych wymagaj Recognition + Application + Generation.

---

## 2. Docelowa taksonomia LearningActivity

Najpierw audytuj aktualny HEAD i zachowaj istniejące typy. Dodaj brakujące typy tylko wtedy, gdy istniejący typ nie potrafi wyrazić zadania.

### Istniejące typy, które należy wykorzystywać szerzej

- `single_choice` — jedna najlepsza odpowiedź,
- `multi_select` — wiele jednocześnie poprawnych elementów,
- `ordering` — kolejność diagnostyki, terapii, mechanizmu lub priorytetów,
- `matching` — lek ↔ mechanizm, objaw ↔ rozpoznanie, parametr ↔ znaczenie,
- `numeric` — obliczenia i interpretacja liczb z tolerancją i jednostką,
- `missing_information` — jaka informacja najbardziej zmieni decyzję,
- `trend` — interpretacja zmian w czasie,
- `lab` — interpretacja zestawu danych laboratoryjnych,
- `recall` — teach-back i odtworzenie z pamięci.

### Typy do dodania

#### `short_answer`

Krótka odpowiedź 1–4 zdania oceniana według rubric, nie literalnego podobieństwa do `modelAnswer`.

Minimalny model:

```ts
{
  type: 'short_answer',
  modelAnswer: string,
  rubric: {
    requiredConcepts: string[],
    optionalConcepts?: string[],
    contradictions?: string[],
    minRequired: number
  }
}
```

#### `select_and_justify`

Użytkownik wybiera decyzję/rozpoznanie/postępowanie, a następnie musi je uzasadnić. Poprawny klik bez poprawnego uzasadnienia nie daje pełnego wyniku.

```ts
{
  type: 'select_and_justify',
  options: string[],
  answer: number | number[],
  rationaleRubric: {
    requiredConcepts: string[],
    contradictions?: string[]
  }
}
```

#### `clinical_reasoning`

Otwarta odpowiedź dla przypadku klinicznego. Powinna oceniać kilka osobnych wymiarów, np. hipotezę główną, alternatywy, dane rozstrzygające, safety i plan kolejnego kroku.

```ts
{
  type: 'clinical_reasoning',
  modelAnswer: string,
  rubric: {
    dimensions: [
      {
        id: string,
        label: string,
        requiredConcepts: string[]
      }
    ],
    criticalErrors?: string[]
  }
}
```

#### `evidence_weighting`

Użytkownik ocenia, które dane wspierają, osłabiają albo nie rozstrzygają danej hipotezy. Typ szczególnie ważny dla różnicowania klinicznego.

Model powinien przechowywać jawne oczekiwane klasyfikacje evidence, a nie arbitralny score zaszyty w UI.

### Counterfactual

Nie musi być osobnym typem. Preferuj `short_answer`, `select_and_justify` albo `clinical_reasoning` z `reasoning: 'decision' | 'differentiation'` i promptem typu „co zmieniłoby decyzję, gdyby…”. Nie mnoż prymitywów bez potrzeby.

---

## 3. Odpowiedzi otwarte: rubric jest source of truth

Nigdy nie oceniaj odpowiedzi otwartej tylko przez porównanie tekstu z `modelAnswer`.

Rubric powinna definiować:
- pojęcia wymagane,
- pojęcia opcjonalne,
- krytyczne sprzeczności/błędy,
- minimalne pokrycie potrzebne do wyniku `correct`,
- osobne dimensions dla dłuższego clinical reasoning.

Docelowe stany oceny:

- `correct`
- `partially_correct`
- `needs_revision`
- `ungraded` — jeśli automatyczna ocena nie jest dostępna lub nie jest wiarygodna

Feedback powinien pokazywać:
- co użytkownik uchwycił,
- czego zabrakło,
- czy wystąpił krytyczny błąd,
- modelowy tok rozumowania dopiero po zatwierdzeniu odpowiedzi.

Jeśli repo ma lub później dostanie evaluator LLM, LLM może mapować odpowiedź na autorską rubricę. Rubrica pozostaje canonical authoring source; model nie może wymyślać nowych kryteriów ani zmieniać źródłowej odpowiedzi. Jeśli nie ma bezpiecznego evaluator runtime, zachowaj tryb `ungraded` + self-review względem rubriki zamiast udawać precyzyjny automatyczny scoring.

---

## 4. Scoring zamkniętych typów

Scoring ma być deterministyczny i zależny od typu.

- `single_choice`: correct / incorrect.
- `multi_select`: exact match = correct; częściowy zestaw bez krytycznego distractora może być partial; wybór odpowiedzi jawnie niebezpiecznej może wymuszać `needs_revision`.
- `ordering`: oceniaj poprawność kolejności; nie sprowadzaj każdego częściowego błędu do zera, jeśli renderer obsługuje partial credit.
- `matching`: wynik per para + wynik zagregowany.
- `numeric`: tolerancja + jednostka; jeśli jednostka ma znaczenie kliniczne, błędna jednostka nie może przechodzić jako pełna poprawność.
- `select_and_justify`: pełny wynik wymaga poprawnej decyzji i wystarczającego rationale.
- `evidence_weighting`: wynik z jawnej klasyfikacji evidence.

Nie używaj jednego globalnego algorytmu scoringu dla wszystkich activity types.

---

## 5. Przebieg dobrej lekcji po migracji

Nie stosuj mechanicznie identycznej liczby aktywności w każdej lekcji. Docelowy wzorzec dla ważnej lekcji klinicznej:

1. diagnostic / prediction przed teorią,
2. pierwszy krótki blok treści,
3. checkpoint Recognition,
4. kolejny blok,
5. checkpoint Application,
6. przypadek / workbench / dane ujawniane etapami,
7. decyzja `select_and_justify` albo `missing_information`,
8. counterfactual,
9. `short_answer` lub `clinical_reasoning`,
10. teach-back,
11. exit transfer na nowym przypadku.

Typowo daje to 5–8 aktywnych sprawdzeń rozłożonych w lekcji, ale coverage objectives jest ważniejsze od liczby.

Nie dodawaj 8 pytań na końcu lekcji tylko po to, aby spełnić licznik.

---

## 6. Assessment bank i ponowne testowanie

Rozszerz istniejący `LessonExperienceV2` wstecznie kompatybilnie o opcjonalny bank zadań, jeśli aktualny HEAD nie ma równoważnej struktury:

```ts
assessmentBank?: LearningActivity[]
```

Bank służy do:
- lesson mastery,
- module mastery,
- cumulative review,
- SRS/retrieval practice.

Nie duplikuj pytań z `activities` bez zmiany kontekstu. Ten sam objective powinien mieć warianty transferowe.

Każdy element banku musi mieć:
- stabilne `id`,
- `objectiveIds`,
- `difficulty`,
- `reasoning`,
- `sourceIds`,
- `claimIds` dla decision-critical claims, jeśli moduł korzysta z claim-level evidence,
- poziom assessment: `recognition | application | generation` albo równoważny jawny metadata field.

### Lesson mastery

Po lekcji losuj krótki mixed test pokrywający wszystkie objectives, ale nie powtarzaj wyłącznie pytań właśnie widzianych w treści.

### Module mastery

Buduj test z objective coverage, nie prostego losowania globalnego. Każdy istotny temat modułu ma być reprezentowany. Preferuj nowe przypadki łączące kilka lekcji.

### Cumulative review

Powtórki mają testować ten sam objective w nowym kontekście. Mastery nie może wynikać wyłącznie z memorowania jednego itemu.

---

## 7. Mastery per objective

Zachowaj istniejącą filozofię, że ukończenie lekcji != mastery.

Docelowo objective powinien przechowywać evidence history. Mastery wymaga co najmniej dwóch niezależnych dowodów, najlepiej:
- różnych activity types,
- co najmniej jednego Application/Generation dla objectives klinicznych,
- rozdzielenia w czasie dla długotrwałego mastery.

Nie licz jako dwa dowody:
- tego samego pytania ponowionego natychmiast,
- dwóch MCQ różniących się wyłącznie kolejnością odpowiedzi,
- teach-back, który użytkownik tylko skopiował po pokazaniu modelAnswer.

Błąd z wysoką pewnością powinien mieć większy priorytet powtórki niż przypadkowa pomyłka przy niskiej pewności, jeśli aktualny practice/SRS model już przechowuje confidence.

---

## 8. Profile assessment według ObjectiveKind

Domyślny profil:

### `mechanism`
- matching / ordering,
- short answer „dlaczego?”,
- transfer mechanizmu do nowego przypadku.

### `interpretation`
- multi-select,
- lab/trend/numeric,
- short answer z interpretacją.

### `differentiation`
- evidence weighting,
- missing information,
- competing clinical case,
- clinical reasoning.

### `decision`
- select and justify,
- ordering priorytetów,
- counterfactual,
- transfer case.

### `safety`
- multi-select red flags,
- prioritization/ordering,
- select and justify,
- clinical reasoning z critical errors.

To są defaults, nie sztywna tabela. Autor może odstąpić, jeśli lepszy typ rzeczywiście bada objective.

---

## 9. Migracja pojedynczej lekcji

1. Odczytaj aktualny lesson + experience + źródła/claims + preset/workbench.
2. Zachowaj stabilne ID, chyba że sens istniejącego pytania naprawdę się zmienia.
3. Zmapuj wszystkie learning objectives.
4. Zrób coverage matrix: objective × Recognition/Application/Generation.
5. Zidentyfikuj luki, zwłaszcza cele testowane wyłącznie przez MCQ.
6. Przepisz słabe distractory na realne konkurencyjne odpowiedzi kliniczne.
7. Dodaj multi-select/matching/ordering/numeric tam, gdzie naturalne.
8. Dodaj co najmniej jedno zadanie wymagające uzasadnienia lub odpowiedzi otwartej dla kluczowych objectives.
9. Dodaj transfer item z nowym kontekstem do `assessmentBank`.
10. Zweryfikuj sourceIds/claimIds.
11. Sprawdź renderer, zapis odpowiedzi, repeat, mastery i SRS.
12. Uruchom testy i przejdź lekcję klawiaturą/mobile.

Nie generuj mechanicznie identycznych activity types dla wszystkich lekcji.

---

## 10. Migracja całego modułu

Przed edycją wygeneruj audit:
- liczba lessons,
- liczba objectives,
- coverage per objective,
- rozkład activity types,
- liczba objectives bez Application,
- liczba objectives bez Generation,
- liczba lekcji z samymi single-choice,
- liczba itemów bez sourceIds/claimIds,
- liczba duplicate/near-duplicate prompts.

Następnie migruj moduł lekcja po lekcji.

Na końcu wygeneruj ten sam raport po migracji i pokaż różnicę before/after.

### Bramka modułu

Moduł jest gotowy, jeśli:
- 100% objectives ma assessment coverage,
- 100% `decision` / `differentiation` / `safety` objectives ma Application,
- wszystkie kluczowe lessons mają Generation/transfer,
- żadna kluczowa lesson nie opiera się tylko na `single_choice`,
- każdy lesson mastery test pokrywa wszystkie objectives lekcji,
- module mastery potrafi pobrać item dla każdego istotnego tematu,
- open-answer rubrics mają required concepts i critical errors tam, gdzie błąd może być niebezpieczny,
- wszystkie sourceIds/claimIds rozwiązują się,
- wszystkie typy aktywności przechodzą runtime schema validation,
- odpowiedzi są zapisywane i możliwe do ponowienia,
- accessibility/mobile nie pogorszyły się.

---

## 11. Infrastruktura i backwards compatibility

Pierwsza fala migracji ma dostarczyć wspólną infrastrukturę potrzebną wszystkim modułom:
- rozszerzenie `LearningActivity`,
- runtime/Zod schemas bez ręcznego driftu enumów,
- renderer nowych typów,
- scoring per activity type,
- answer serialization,
- assessment result model,
- objective coverage utilities,
- assessment bank selection,
- testy renderer/domain invariants.

Późniejsze fale mają przede wszystkim authorować content. Nie kopiuj rendererów ani evaluatorów per moduł.

Zachowaj odczyt istniejących `LessonExperienceV2`. Jeśli rozszerzenie jest addytywne, preferuj optional fields zamiast masowego wprowadzania nowego `experienceVersion` tylko dla samego version bump.

Nie usuwaj historii practice/SRS i nie zmieniaj stabilnych activity IDs bez powodu.

---

## 12. Testy wymagane dla systemu assessment

Minimum infrastrukturalne:
- schema parse dla każdego activity type,
- roundtrip serialize/deserialize answer,
- deterministic scoring dla zamkniętych typów,
- partial scoring dla multi-select/matching/ordering jeśli wspierany,
- numeric tolerance + unit,
- open rubric states,
- select-and-justify wymaga rationale,
- objective coverage validator,
- brak mastery z dwóch kopii tego samego itemu,
- assessmentBank selector respektuje objective/level/difficulty,
- brak ujawnienia odpowiedzi przed submit,
- repeat activity zachowuje typ odpowiedzi,
- stare activity types nadal działają.

Minimum per moduł:
- wszystkie lessons mają experiences,
- wszystkie objectives mają coverage,
- brak orphan activity objectiveIds,
- brak unresolved sourceIds/claimIds,
- wymagany mix typów w kluczowych lessons,
- module mastery coverage dla każdego lesson/topic,
- content publishing/DB parity po zmianach contentu.

---

## 13. UX

Każda aktywność musi jasno komunikować sposób odpowiedzi.

- multi-select: „zaznacz wszystkie prawidłowe”,
- ordering: drag/drop + alternatywa klawiaturowa,
- matching: pełna obsługa klawiatury i mobilna,
- short answer: textarea z sensownym limitem/guide, ale bez zdradzania required concepts,
- select-and-justify: najpierw decyzja, potem rationale,
- clinical reasoning: podział na sekcje, jeśli rubric ma kilka dimensions,
- numeric: jednostka widoczna i dostępna dla screen readera.

Feedback pokazuj po submit. Nie zdradzaj modelAnswer ani checklisty required concepts przed decyzją użytkownika.

---

## 14. Kolejność rollout dla aktualnych 14 modułów

Aktualny kurs ma 14 modułów, więc migracja przebiega w 7 falach po 2 moduły:

| Fala | Moduły |
|---|---|
| 1 | `tarczyca` + `przysadka` |
| 2 | `nadnercza` + `przytarczyce` |
| 3 | `cukrzyca` + `gonady` |
| 4 | `nen` + `otylosc` |
| 5 | `pediatria` + `ciaza` |
| 6 | `psych-afektywne` + `psych-farmakologia` |
| 7 | `psych-organiczne` + `psych-trauma-dysocjacja` |

Fala 1 implementuje brakującą wspólną infrastrukturę. Każda następna fala ma ją reuse'ować i może rozszerzyć wyłącznie wtedy, gdy istnieje udokumentowana luka, której nie da się wyrazić obecnym profilem.

---

## 15. Verification / publishing

Po każdej fali uruchom faktycznie dostępne w HEAD:
- targeted unit tests,
- assessment/content schema tests,
- integration tests,
- typecheck,
- lint,
- production build,
- content manifest validation,
- `content:plan` dla zmienionych content-src modules,
- `content:stage`,
- explicit `content:publish`,
- `content:verify`.

Dla legacy modules, które nie są jeszcze w `content-src`, nie wymyślaj fikcyjnego publish flow. Użyj aktualnej ścieżki repo i odnotuj różnicę. Jeśli migracja assessment naturalnie wymaga przeniesienia experience do `content-src`, rób to tylko zgodnie z istniejącym authoring playbookiem i bez tworzenia drugiego source of truth.

Nigdy nie pisz „passed”, jeśli komenda nie została wykonana.

---

## 16. Raport po każdej fali

Podaj:
- moduły i liczbę zmigrowanych lessons,
- before/after activity type distribution,
- objective coverage before/after,
- liczbę nowych `multi_select`, `ordering`, `matching`, `numeric`, `short_answer`, `select_and_justify`, `clinical_reasoning`, `evidence_weighting`,
- liczbę transfer items w assessment bank,
- zmiany infrastrukturalne,
- nowe testy,
- komendy faktycznie wykonane i ich wynik,
- pozostałe lessons/objectives wymagające ręcznej recenzji.

Nie optymalizuj raportu pod liczbę nowych pytań. Najważniejszy wynik to: czy użytkownik jest zmuszony rozpoznać, zastosować i samodzielnie wyjaśnić materiał.