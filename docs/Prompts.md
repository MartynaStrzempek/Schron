# PROMPT 1 (CODEX)

UWAGI:
- załączniki nie mogły sie załadowac w codexie, wiec zostaly wklejone do tresci
- mockData nie został wklejony, bo jest za dlugi. Codex sam wygenerowal kilka animalsów

// Załącznik opisFunkcjonalny.md zawiera elementy MVP.

// Reszta będzie dopisana później.

// Załączniki zawierają informacje wzięte z plików .md z repo.

Zbuduj aplikację webową w Nuxt 3 (SSR) na podstawie ZAŁĄCZONEGO OPISU FUNKCJONALNEGO, STYLU UI I WYMAGAŃ TECHNICZNYCH.  
Generuj WYŁĄCZNIE kod aplikacji frontendowej (Nuxt 3).  
Nie implementuj backendu, CI/CD, Docker, monitoringu i środowisk.

KONTEKST  
To jest strona internetowa schroniska dla zwierząt.

ŹRÓDŁA PRAWDY (priorytety)
1) ZAŁĄCZONY "opisFunkcjonalny.md"
   - Lista ekranów (screens)
   - Lista feature’ów
   - Podział na część publiczną i panel administracyjny  
   To jest nadrzędne źródło prawdy dla struktury aplikacji, ekranów i funkcjonalności.

2) ZAŁĄCZONY "opisStyluUI.md"
   - Wytyczne wizualne (styl NGO, kolory, typografia)
   - Priorytety UX (adopcja, kontakt)
   - Responsywność i dostępność  
   Użyj go jako jedynego źródła decyzji wizualnych.

3) ZAŁĄCZONE „wymaganiaTechniczne.md”  
   - Stack
   - Konwencje
   - Ograniczenia techniczne
   Użyj tej dokumentacji WYŁĄCZNIE jako kontekstu technicznego.

4) mockData.json  
   - Jedyne źródło danych (brak backendu)

ZASADA OGÓLNA  
Jeśli coś nie jest jednoznacznie określone w opisie tekstowym:
- zaprojektuj to rozsądnie, zgodnie z UX aplikacji NGO,
- NIE dodawaj nowych ekranów ani feature’ów,
- NIE komplikuj logiki.

ROLE / OBSZARY
A) Użytkownik publiczny (bez logowania)  
B) Administrator (panel admina, logowanie)

WYMAGANIA TECHNICZNE (ważne)
- Framework: Nuxt 3, SSR włączone.
- Brak backendu: NIE twórz i NIE używaj API w /server.
- Pomiń: CI/CD, Docker, monitoring, konfiguracje środowiskowe.
- Dane:
  - korzystaj wyłącznie z mock_data.json jako lokalnego źródła danych,
  - dane mogą być importowane bezpośrednio lub przez prostą warstwę dostępu (np. /data lub /repositories),
  - dane do list i stron publicznych ładuj po stronie serwera (SSR), jeśli ma to sens.
- Routing:
  - realizuj ekrany zgodnie z listą ekranów (pages/),
  - czytelna i logiczna struktura tras.
- UI:
  - zaprojektuj layout samodzielnie na podstawie opisu ekranów,
  - zachowaj spójny, jasny styl NGO zgodnie z opisem stylu UI.
- Dostępność:
  - poprawna hierarchia nagłówków,
  - aria dla ikon i CTA,
  - focus states,
  - poprawne labelki formularzy.
- SEO:
  - podstawowe meta (title, description) dla kluczowych stron publicznych.

LOGOWANIE ADMINA (bez backendu)
- Zaimplementuj prosty mechanizm logowania „frontend-only”:
  - strona logowania administratora,
  - po „zalogowaniu” zapisz stan w cookie lub localStorage,
  - middleware (route-guard) chroniący /admin/**.
- Dodaj komentarz w kodzie, że to placeholder do podmiany na prawdziwy backend.
- CRUD w panelu admina:
  - operacje działają lokalnie (pamięć lub localStorage),
  - brak zapisu do pliku JSON.

DANE (mock_data.json)
- Użyj danych z mock_data.json do:
  - widoków publicznych,
  - panelu administracyjnego.
- Jeśli jakiś ekran wymaga danych, których nie ma w mock_data.json:
  - użyj minimalnych fallbacków (placeholder tekst/obraz),
  - NIE zmieniaj struktury ekranów ani feature’ów.

WYNIK KOŃCOWY (co masz wygenerować)
1) Kompletny projekt Nuxt 3 z działającym routingiem i SSR.
2) Strony publiczne zgodne z listą ekranów.
3) Panel admina:
   - /admin/login
   - /admin (dashboard)
   - podstrony wynikające z listy ekranów (zarządzanie zwierzętami, treścią itd.).
4) Komponenty wspólne:
   - header
   - footer
   - nawigacja
   - karty
   - przyciski
5) Layouty:
   - osobny layout dla części publicznej,
   - osobny layout dla panelu admina.
6) Style:
   - globalne + komponentowe,
   - zgodne z opisem stylu UI.
7) Krótki README:
   - jak uruchomić projekt,
   - gdzie są dane (mock_data.json),
   - jak działa placeholder logowania admina.

WYMAGANIA DOT. JAKOŚCI
- Nie generuj zbędnych plików ani boilerplate.
- Nie dodawaj /server.
- Nazewnictwo plików i komponentów czytelne i spójne.
- Na końcu wypisz:
  - listę kluczowych tras (routes),
  - mapę struktury katalogów.

ZADANIE  
Wygeneruj cały kod aplikacji frontendowej (Nuxt 3, SSR) zgodny z powyższym.
