# Endokrynologia A–Z

Polskojęzyczna aplikacja edukacyjna React / TypeScript (Sites, vinext) dla studentów i lekarzy. Supabase obsługuje konta i synchronizację; bez konfiguracji dostępny jest jawny tryb gościa.

## Program

146 lekcji w 8 modułach: tarczyca, przysadka, nadnercza, przytarczyce, cukrzyca, gonady, NEN/MEN oraz otyłość i lipidy. Bank zawiera 730 pytań, 778 fiszek i 112 etapowych przypadków, w tym dwa przekrojowe przypadki wielowizytowe. Treści nie przeszły recenzji klinicznej; datę i zakres sprawdzenia wskazano przy opracowanych lekcjach.

Tarczyca i Cukrzyca korzystają z doświadczenia lekcji v2: diagnozy wstępnej, checkpointów, aktywnego odtwarzania, pracowni, exit ticketu, opanowania celów i Notatnika błędów. [Playbook migracji](docs/lesson-v2-migration-playbook.md) opisuje przejście pozostałych 114 lekcji.

Ścieżka GAHT obejmuje 8 lekcji, 40 pytań, 80 fiszek (w tym 40 pojęciowych) i 4 przypadki. Atlas porównuje hormony oraz sprzężenia z gonadami i bez nich: aromataza, DHT, inhibina, progesteron, receptory i leki GnRH. Model jest jakościowy.

Pracownie wszystkich modułów łączą interpretację mechanizmów z obliczeniami na jawnych danych: LDL, FIB-4, CCCR, washout TK, DKA/HHS, HOMA, gospodarka wodna, wiązanie testosteronu i dozymetria. Nie wyliczają indywidualnych dawek ani ryzyka leczenia. [Raport zmian i ograniczeń](docs/widget-review-2026-09-11.md) dokumentuje zastąpione modele.

## Nauka i zapis

- Dwa poziomy nauki, quizy z omówieniem, przypadki, egzamin, historia wyników i opanowanie celów lekcji.
- Egzamin losuje 30 unikalnych pytań z równomiernym udziałem tematów; wyjaśnienia dopiero po zakończeniu.
- Powtórki po 1, 3, 7, 14 i 30 dniach; błąd przywraca pierwszy etap.
- Wersjonowane treści i stabilne ID. Wyniki zachowują snapshot pytań; aktualizacja nie kasuje historii.
- Idempotentne zdarzenia, widoczne błędy zapisu i ponawianie. RLS w migracjach ogranicza dane do właściciela.
- Tryb gościa przechowuje postęp w pamięci bieżącej sesji. Odświeżenie go usuwa.

## 🚀 Uruchomienie lokalne

### Wymagania
- Node.js `>=22.13.0`
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

Testy sprawdzają strukturę treści, ID, SRS, ocenianie, projekcję zdarzeń, atlas i obliczenia. Nie zastępują recenzji klinicznej ani testu dwóch rzeczywistych kont:

```bash
# Uruchomienie testów jednostkowych
npm test

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
