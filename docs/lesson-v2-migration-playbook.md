# Playbook migracji lekcji v2

## Stan docelowy

Każda lekcja v2 prowadzi przez: diagnozę wstępną, krótkie bloki treści, dwa checkpointy, pracownię, odtworzenie z pamięci i exit ticket. Ukończenie oznacza przejście materiału; opanowanie celu wymaga dwóch poprawnych dowodów z różnych aktywności, rozdzielonych co najmniej 24 godzinami.

Tarczyca i Cukrzyca są falą referencyjną. Renderer obsługuje równolegle v1 i v2, więc nie wolno przepisywać całego kursu jednym mechanicznym skryptem ani usuwać starych zdarzeń.

## Kolejność fal

| Fala | Moduły | Lekcje | Główne ryzyko redakcyjne | Widgety referencyjne |
|---|---|---:|---|---|
| 1 | Nadnercza + Gonady/GAHT | 42 | testy dynamiczne, ciąża, płodność, stany nagłe, dawkowanie | mapa osi, panel wyników, oś czasu |
| 2 | Przysadka + Przytarczyce | 32 | wyniki nieadekwatne, gospodarka wodna, wapń, decyzje okołooperacyjne | panel wyników, ścieżka decyzji |
| 3 | NEN/MEN + Otyłość/Lipidy | 40 | grading i staging, genetyka, leczenie celowane, progi ryzyka | ścieżka decyzji, trendy |

## Procedura pojedynczej lekcji

1. **Inwentaryzacja:** zapisz istniejące ID, źródła, cele, pytania, przypadek, diagram i widget. Oznacz twierdzenia zawierające próg, dawkę, częstość, przeciwwskazanie lub bezwzględne sformułowanie.
2. **Przegląd bezpieczeństwa:** sprawdź najnowsze wytyczne pierwotne oraz źródło mechanistyczne. Nie ustawiaj statusu `clinician-reviewed` bez rzeczywistej recenzji klinicysty. Źródło przypisz do konkretnego bloku i aktywności.
3. **Cele:** utwórz 2–4 mierzalne cele z kategorii `mechanism`, `interpretation`, `differentiation`, `decision`, `safety`. Cel musi dać się sprawdzić zadaniem.
4. **Redakcja:** podziel treść na 3–5 bloków. Oddziel typowy wzorzec, wyjątek, czynnik zakłócający i granicę zastosowania. Usuń nieuzasadnione słowa „zawsze”, „pewne”, „wyłącznie” oraz pozorną precyzję.
5. **Aktywności:** dodaj diagnozę bez wyniku, dwa checkpointy, teach-back i dwa elementy exit ticketu. Co najmniej jedno zadanie ma badać mechanizm, a jedno zastosowanie lub bezpieczeństwo.
6. **Widget:** przypisz jeden wspólny widget. Nowy widget domenowy jest uzasadniony tylko wtedy, gdy mapa osi, panel wyników, trend lub ścieżka decyzji nie oddają zadania.
7. **ID i zgodność:** zachowaj ID pytania wyłącznie przy niezmienionym sensie. Zmienione pytanie otrzymuje nowe ID; stare pozostaje w snapshotach. Uzupełnij mapę pytanie–cel.
8. **Akceptacja:** uruchom walidację treści, testy, TypeScript i build. Przejdź lekcję jako Student i Lekarz, popełnij błąd z wysoką pewnością, napraw go w Notatniku błędów i sprawdź zapis po ponowieniu.

## Bramka jakości fali

- Każda lekcja spełnia kompletny kontrakt v2 i ma co najmniej jeden widget.
- Każdy cel ma co najmniej dwa niezależne zadania w całym przepływie lekcja–quiz–przypadek–powtórka.
- Żadna aktywność nie ujawnia odpowiedzi przed decyzją użytkownika.
- Kalkulatory nie wyznaczają indywidualnej dawki, leczenia ani rozpoznania.
- Progi i jednostki mają źródło oraz jawny zakres stosowalności.
- Widoki działają przy 390 px, powiększeniu tekstu 200% i obsłudze klawiaturą.
- Stare zdarzenia odtwarzają wcześniejsze ukończenia, wyniki i terminy SRS bez zmian.

Po spełnieniu bramki ustaw `experienceVersion: 2`, podbij `CONTENT_VERSION` i publikuj jedną falę. Nie łącz migracji treści z kasowaniem danych ani zmianą stabilnych identyfikatorów.
