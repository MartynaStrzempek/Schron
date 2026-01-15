# Używana biblioteka
**Naive UI**

https://www.naiveui.com/en-US/light/components
  
---

# Typ layoutu

Użyj layoutu typu HYBRID:

CZĘŚĆ PUBLICZNA:
- Klasyczny layout strony publicznej (bez sidebaru):
  - header z logo i nawigacją
  - główny content w układzie kolumn/sekcji
  - footer z danymi kontaktowymi i formalnymi
- Layout nastawiony na SEO i czytelność treści.
- Priorytet UX: adopcja i kontakt (widoczne CTA).
- Na mobile:
  - nawigacja jako hamburger menu
  - sticky CTA („Zadzwoń”, „Adoptuj”).

CZĘŚĆ ADMINISTRACYJNA:
- Layout typu dashboard:
  - stały sidebar po lewej (nawigacja między modułami)
  - topbar z tytułem widoku i akcjami
  - główny content jako scrollowalna sekcja
- Sidebar zwija się do drawer na mobile.
- Layout zoptymalizowany pod CRUD i pracę z danymi.

WSPÓLNE:
- Spójna typografia i kolory w obu częściach.
- Czytelne stany UI (loading / empty / error).
- Responsywność mobile / tablet / desktop.

UI:
- Użyj Naive UI jako biblioteki komponentów.
- Styl jasny, przyjazny (NGO), bez wizualnego przeładowania.
- UX zaprojektuj samodzielnie zgodnie z powyższymi zasadami.

---

# Stany UI

Dodaj kompletne stany UI w całej aplikacji.

1) Loading states
- Dla list i dashboardu użyj skeletonów (np. skeleton tabeli/listy i kart).
- Dla przycisków akcji (Submit/Save/Delete) pokaż stan "loading" i zablokuj kliknięcia (disabled).
- Unikaj przesuwania layoutu (no layout shift) — elementy mają zachować wysokość.
- Jeśli ładowanie trwa dłużej (np. >800ms), pokaż delikatny tekst "Ładowanie..." pod skeletonem.

2) Empty states
- Jeśli lista zwierząt/adopcji/wizyt jest pusta: pokaż przyjazny empty state
  * tytuł (np. "Brak zwierząt w bazie")
  * krótki opis co user może zrobić
  * CTA button (np. "Dodaj zwierzę" / "Utwórz zgłoszenie")
- Dla pustych filtrów/szukania: pokaż "Brak wyników" + przycisk "Wyczyść filtry".

3) Error states
- Jeśli API zwróci błąd: pokaż error banner/toast + sekcję error state w widoku:
  * czytelny komunikat (bez technicznych stacków)
  * przycisk "Spróbuj ponownie" (retry, ponów zapytanie)
- Rozróżnij:
  * 404 (nie znaleziono) → osobny ekran/sekcja "Nie znaleziono"
  * 401/403 → "Brak uprawnień" + link do logowania/zmiany konta
  * offline/network → "Brak połączenia" + retry

4) Form validation (UX + a11y)
- Waliduj pola po blur i przy submit.
- Pokaż inline błędy pod polami (z ikoną i krótkim tekstem).
- Ustaw atrybuty a11y: aria-invalid, aria-describedby dla komunikatu błędu.
- Zablokuj submit jeśli formularz niepoprawny i pokaż podsumowanie błędów na górze formularza po submit.
- Dla pól wymaganych dodaj jasne oznaczenie (np. gwiazdka i "wymagane").

5) Responsywność
- Mobile-first:
  * Sidebar na desktop, ale na mobile sidebar ma się zwijać do drawer/hamburger menu.
  * Tabele/listy mają działać na mobile (np. list view zamiast szerokiej tabeli).
  * Formularze: 1 kolumna na mobile, 2 kolumny dopiero na >= md.
- Zapewnij czytelne focus states dla klawiatury i nawigację tabem w całej aplikacji.

Zaimplementuj te stany konsekwentnie w:
- Dashboard (karty statystyk + ostatnie wpisy)
- Listy (np. Zwierzęta, Adopcje, Wizyty)
- Widok detalu + edycja
- Formularze dodawania/edycji

---

# Styl UI

- Jasny, przyjazny styl charakterystyczny dla organizacji NGO.
- Emocjonalny, ale profesjonalny wygląd – budujący zaufanie.
- Duży nacisk na zdjęcia zwierząt (hero, karty, galerie).
- Czytelna, nowoczesna typografia (łatwa do czytania na mobile).
- Dużo whitespace – brak wizualnego przeładowania.
- Karty (cards) jako główny wzorzec prezentacji treści.
- Zaokrąglone narożniki, subtelne cienie, delikatne animacje (hover, focus).

## Kolory
- Jasne tło (biały / bardzo jasny szary).
- Kolor główny: ciepły, pozytywny (np. zielony lub niebieski).
- Kolor akcentowy dla CTA (np. „Adoptuj”, „Kontakt”).
- Kolory komunikatów:
  - sukces – zielony
  - ostrzeżenie – żółty
  - błąd – czerwony

## Typografia
- Jeden główny font sans-serif (np. Inter / system font).
- Wyraźna hierarchia nagłówków (H1–H3).
- Duże, czytelne przyciski i linki (szczególnie na mobile).

## Priorytety UX
- Najważniejsze akcje:
  - adopcja
  - kontakt telefoniczny
- Widoczne CTA na kluczowych ekranach.
- Sticky CTA na mobile („Zadzwoń”, „Adoptuj”).
- Minimalna liczba kliknięć do:
  - karty zwierzęcia
  - ankiety adopcyjnej
  - kontaktu

## Dostępność (a11y)
- Kontrast zgodny z WCAG.
- Widoczne focus states.
- Możliwość obsługi klawiaturą.
- Czytelne komunikaty błędów i walidacji.

## Responsywność
- Mobile-first.
- Grid i karty dostosowujące się do szerokości ekranu.
- Sidebar (admin) jako drawer na mobile.

---

# Ekrany i ficzery
  
   W dokumentacji biznesowej opisowo. Mockupów nie ma.