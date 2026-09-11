# Endokrynologia A–Z 🩺

> Interaktywna platforma edukacyjna z zakresu endokrynologii dla studentów medycyny i lekarzy. Wersja 1.0 zawiera kompletny, certyfikowany moduł **Tarczycy** z dwoma poziomami zaawansowania, interaktywnym symulatorem fizjologicznym osi HPT, wektorowymi schematami medycznymi, przypadkami klinicznymi, algorytmem powtórek przestrzennych (SRS) oraz synchronizacją postępu przez Supabase.

---

## ✨ Główne funkcje

### 1. Kompletny Moduł Tarczycy (12 lekcji)
- **12 ustrukturyzowanych lekcji**:
  1. *Jak działa tarczyca?* (Fizjologia osi TRH–TSH–T4/T3, synteza, TBG)
  2. *Czytaj wyniki ze zrozumieniem* (Diagnostyka laboratoryjna, pary TSH/FT4, pułapki interferencji)
  3. *Kiedy tarczyca zwalnia* (Niedoczynność pierwotna vs subkliniczna, zasady i interakcje lewotyroksyny)
  4. *Zrozumieć Hashimoto* (Autoimmunizacja, anty-TPO, unikanie niepotrzebnej suplementacji jodem)
  5. *Kiedy hormonów jest za dużo* (Nadczynność vs tyreotoksykoza z destrukcji, beta-blokery)
  6. *Graves-Basedow i oczy* (Autoprzeciwciała TRAb, tiamazol, orbitopatia EUGOGO)
  7. *Zapalenie ma różne oblicza* (Bolesne podostre de Quervaina, wysokie OB/CRP, ciche i ropne)
  8. *Guzek nie znaczy nowotwór* (USG szyi, skala EU-TIRADS, progi biopsji cienkoigłowej BACC ETA 2023)
  9. *Nowotwory tarczycy* (Raki pęcherzykowe, rdzeniasty z komórek C / kalcytonina, anaplastyczny, MEN2)
  10. *Tarczyca w ciąży* (hCG a TSH, wzrost zapotrzebowania na LT4, dobór tyreostatyku PTU)
  11. *Leki, jod i tarczyca* (Amiodaron AIT typ 1 vs typ 2, kontrast jodowy, lit)
  12. *Gdy liczy się czas* (Przełom tarczycowy, śpiączka hipometaboliczna, osłona hydrokortyzonem)
- **Każda lekcja zawiera**: cele dydaktyczne, teorię podzieloną na sekcje, tabelę podsumowującą, **rozszerzenie dla lekarza**, podsumowanie oraz 5 pytań testowych z wyczerpującym omówieniem każdej z odpowiedzi.

### 2. Interaktywny Symulator Osi HPT (`/simulator` oraz Lekcja 2)
- Realistyczny matematyczny model fizjologiczny ujemnego sprzężenia zwrotnego ($\log_{10}\text{TSH} \sim -\text{FT4}$).
- Suwaki parametrów: rezerwa wydzielnicza tarczycy, czynność przysadki, stymulacja przeciwciałami TRAb, substytucja lewotyroksyną (LT4) i blokada tiamazolem.
- Dynamiczne odczyty stężeń **TSH**, **FT4** i **FT3** z automatyczną klasyfikacją fenotypu klinicznego.
- **Modal z legendą i pojęciami**: 3 zakładki (*Suwaki i parametry*, *Hormony i normy*, *Ścieżka poznawcza w kursie* wyjaśniająca progresję pojęć).
- 6 gotowych scenariuszy klinicznych jednym kliknięciem (*Eutyreoza*, *Nieleczone Hashimoto*, *Hashimoto na LT4*, *Graves-Basedow*, *Niedoczynność przysadkowa*, *Przedawkowanie LT4*).

### 3. Wektorowe schematy medyczne (SVG)
- Schemat anatomiczny osi HPT ze sprzężeniem zwrotnym.
- 2D matryca diagnostyczna TSH vs FT4.
- Trójfazowa krzywa zapalenia de Quervaina z korelacją OB/CRP i jodochwytności.
- Przewodnik ultrasonograficzny EU-TIRADS 1–5 z progami BACC.
- Przekrój strzałkowy oczodołu w orbitopatii tarczycowej.
- Krzywa hormonalna w ciąży (hCG vs TSH w trymestrach).
- Drzewo histopatologiczne nowotworów tarczycy.
- Kolorowe wskaźniki zakresów referencyjnych dla badań laboratoryjnych w przypadkach klinicznych.

### 4. Inteligentne przypisy i Słowniczek medyczny (`/glossary`)
- Automatyczne wykrywanie pojęć w tekście (`<GlossaryText>`) z interaktywnymi popoverami definiującymi normę i znaczenie kliniczne.
- Searchable słowniczek pojęć z filtrowaniem wg kategorii (*Hormony*, *Diagnostyka*, *Choroby*, *Leki*, *Anatomia*).

### 5. Przypadki kliniczne, fiszki i egzamin
- **12 czterostopniowych przypadków klinicznych**: Objawy $\to$ Badania (z graficznymi wynikami lab) $\to$ Rozpoznanie $\to$ Postępowanie.
- **Bank 60 fiszek** z algorytmem powtórek przestrzennych (interwały 1, 3, 7, 14 i 30 dni).
- **Egzamin końcowy** losujący 30 unikalnych pytań z puli 60 pytań.
- **Dwa poziomy zaawansowania**: Student medycyny oraz Lekarz / specjalizacja.

### 6. Architektura danych i synchronizacja
- Pełna praca w trybie gościa offline (bez konieczności logowania).
- Opcjonalna chmurowa synchronizacja konta przez Supabase.
- Bezpieczny model zdarzeniowy (append-only Event Sourcing) z Row Level Security (RLS).
- Bezpieczny endpoint konfiguracyjny chroniący przed ujawnieniem klucza `service_role`.

---

## 🚀 Uruchomienie lokalne

### Wymagania
- Node.js `>=20.0.0` (zalecane `>=22.x`)
- npm

### Instalacja i start
```bash
# Sklonuj repozytorium
git clone https://github.com/sophiesticated94/endokrynologia-az.git
cd endokrynologia-az

# Zainstaluj zależności
npm install

# Uruchom serwer deweloperski
npm run dev
```

Aplikacja uruchomi się domyślnie pod adresem **`http://localhost:5173/`**.

---

## 🧪 Testy i weryfikacja

Wszystkie moduły domeny, algorytm SRS, grading, projekcja zdarzeń oraz model fizjologiczny osi HPT są pokryte testami:

```bash
# Uruchomienie testów jednostkowych
node --test tests/learning.test.mjs

# Weryfikacja statycznego typowania TypeScript
node node_modules/typescript/bin/tsc --noEmit
```

---

## ☁️ Konfiguracja z Supabase (opcjonalnie)

Aplikacja domyślnie działa lokalnie w trybie gościa. Aby włączyć rejestrację użytkowników i synchronizację postępu między urządzeniami:

1. Załóż darmowy projekt na [supabase.com](https://supabase.com/).
2. Wklej i wykonaj migrację SQL z pliku [`supabase/migrations/202609110001_learning.sql`](supabase/migrations/202609110001_learning.sql) w panelu Supabase SQL Editor.
3. W sekcji **Authentication -> URL Configuration** dodaj adres URL aplikacji do *Redirect URLs*.
4. Utwórz plik `.env` w katalogu głównym projektu na podstawie [`.env.example`](.env.example):
   ```env
   SUPABASE_URL=https://twoj-projekt.supabase.co
   SUPABASE_ANON_KEY=twoj-publiczny-klucz-anon
   ```
5. Zrestartuj aplikację.

---

## 📄 Licencja

Projekt o charakterze edukacyjnym stworzony z myślą o studentach medycyny, rezydentach i lekarzach.
Treści oparte są na aktualnych wytycznych naukowych (ETA, PTE, EUGOGO, Endotext).
