# Co tworzymy?

**Aplikacja internetowa dla schroniska w Młodolinie.**

Projekt obejmuje stworzenie nowoczesnej strony internetowej dla użytkowników oraz intuicyjnego panelu administracyjnego umożliwiającego zarządzanie treściami i funkcjonalnościami serwisu.

# Featury

## 1. Elementy globalne

### 1.1 Banner CMP (cookies)
- Banner CMP dotyczący **wyłącznie cookies analitycznych (GA4)**.
- GA4 uruchamiane wyłącznie po wyrażeniu zgody przez użytkownika.
- Cookies techniczne (logowanie administratora) **nie podlegają CMP**.

### 1.2 Polityka prywatności
- Link „Polityka prywatności” widoczny w stopce.
- Dokument zawiera:
  - informacje o cookies analitycznych (GA4),
  - informacje o cookies technicznych wykorzystywanych w panelu administracyjnym.

### 1.3 Header
- Logo – kliknięcie przenosi na stronę główną.
- Nawigacja główna:
  - dokumenty
  - aktualności
  - lista zwierząt
  - adopcje
  - o nas
  - wolontariat
  - chcę pomóc
  - kontakt (z mapą)

---

## 2. Strona główna

- Sekcja hero:
  - szerokie zdjęcie (pies/kot),
  - widoczne dane do wsparcia (KRS / numer konta).
- Sekcja „Zwierzęta do adopcji”:
  - wybrane psy i koty (np. najdłużej przebywające w schronisku),
  - oznaczenia specjalne (np. „Pilne”).
- Sekcja „Szczęśliwe adopcje”:
  - krótkie historie,
  - zdjęcia po adopcji.
- Priorytetowe CTA:
  - „Adoptuj”
  - „Zostań wolontariuszem”
  - „Wesprzyj schronisko”

---

## 3. Lista zwierząt

### 3.1 Wyświetlanie
- Karty zwierząt zawierające:
  - zdjęcie,
  - imię,
  - podstawowe informacje,
  - status adopcyjny:
    - do adopcji
    - w trakcie adopcji
    - po adopcji
  - oznaczenia specjalne („Pilne”, „Dom tymczasowy”).

### 3.2 Filtry
- gmina
- wiek
- płeć
- wielkość
- pies / kot
- liczba lat w schronisku
- wyszukiwarka po imieniu

### 3.3 Stany brzegowe
- Brak wyników – czytelny komunikat.
- Brak zdjęcia – placeholder.
- Zwierzę niedostępne do adopcji – wyraźna informacja.

---

## 4. Strona zwierzęcia

- Galeria zdjęć.
- Imię.
- Opis.
- Status adopcyjny.
- Informacja od kiedy zwierzę przebywa w schronisku.
- Numer telefonu kontaktowego.
- Link do ankiety adopcyjnej.
- Przycisk „Udostępnij”:
  - Facebook
  - WhatsApp
  - kopiowanie linku

---

## 5. Adopcje

- Strona informacyjna:
  - opis procesu adopcji,
  - wymagania,
  - kroki adopcyjne.
- Link do ankiety adopcyjnej:
  - link do ankiety google (istnieje)

---

## 6. Chcę pomóc

- Sekcja z zakładkami:
  - wsparcie finansowe,
  - karma i dary rzeczowe,
  - wolontariat,
  - transport,
  - 1,5% podatku.
- Dane do przelewu widoczne i łatwe do skopiowania.

---

## 7. Kontakt

- Dane kontaktowe:
  - adres,
  - telefon,
  - e-mail.
- Mapa lokalizacji schroniska.

---

## 8. Stopka

- Nazwa schroniska.
- Adres.
- Telefon, e-mail.
- Godziny pracy biura.
- Numer konta bankowego.
- Nazwa banku.
- KRS, NIP, REGON.
- Linki do mediów społecznościowych.
- Informacja copyright.

---

## 9. Panel administracyjny

### 9.1 Logowanie administratora
- Logowanie zabezpieczone hasłem.
- Sesja oparta o cookies techniczne.
- Dostęp wyłącznie dla administratorów.

### 9.2 Zarządzanie zwierzętami (CRUD)
Administrator może:
- dodawać nowe zwierzęta,
- edytować dane zwierząt,
- usuwać zwierzęta,
- zmieniać status adopcyjny,
- oznaczać zwierzęta jako „Pilne”,
- dodawać / usuwać zdjęcia.

### 9.3 Zarządzanie treścią strony
Administrator może edytować:
- treści stron statycznych (O nas, Adopcje, Wolontariat, Chcę pomóc),
- dane kontaktowe,
- dane formalne (KRS, numer konta, godziny pracy),
- sekcję „Szczęśliwe adopcje”.

---

## 10. Wymagania ogólne

- Projekt **mobile-first**.
- Duże, czytelne CTA.
- Sticky CTA na mobile (np. „Zadzwoń / Adoptuj”).
- Podstawowa dostępność (A11y):
  - kontrast kolorów,
  - teksty alternatywne dla zdjęć,
  - odpowiedni rozmiar elementów klikalnych.
- Brak kont użytkowników publicznych.
- Brak komentarzy i funkcji społecznościowych wymagających moderacji.

---

# Lista ekranów i feature’ów

## 🧭 Lista ekranów (Screens)

### 🌍 Publiczne

#### 1. Strona główna (Home)
- Sekcja hero
- Wyróżnione zwierzęta
- CTA: „Adoptuj”, „Zobacz zwierzęta”, „Kontakt”

#### 2. Lista zwierząt
- Lista / grid zwierząt
- Filtry:
  - gmina
  - wiek
  - płeć
  - wielkość
  - typ: pies / kot
  - liczba lat w schronisku
- Wyszukiwanie po imieniu
- Paginacja lub infinite scroll
- Empty state (brak wyników)

#### 3. Karta zwierzęcia (Animal details)
- Galeria zdjęć
- Imię
- Opis
- Wiek / płeć / wielkość
- Data przyjęcia / czas w schronisku
- Status adopcyjny:
  - do adopcji
  - w trakcie
  - po adopcji
- Numer telefonu (click-to-call)
- Link do ankiety adopcyjnej
- Udostępnianie:
  - Facebook
  - WhatsApp
  - kopiowanie linku

#### 4. Adopcje
- Opis procesu adopcji
- Wymagania
- Link do ankiety adopcyjnej

#### 5. O nas
- Informacje o schronisku
- Misja i cele

#### 6. Wolontariat
- Informacje dla wolontariuszy
- CTA (kontakt / formularz)

#### 7. Chcę pomóc
- Formy pomocy:
  - darowizny
  - pomoc rzeczowa
  - wolontariat
- Dane do przelewów

#### 8. Dokumenty
- Lista dokumentów do pobrania

#### 9. Aktualności
- Lista aktualności
- Widok pojedynczego wpisu

#### 10. Kontakt
- Dane kontaktowe
- Formularz kontaktowy
- Mapa

---

### 🔐 Administracyjne (Dashboard)

#### 11. Logowanie administratora
- Formularz logowania
- Obsługa błędów
- Cookies techniczne

#### 12. Admin Dashboard
- Karty KPI:
  - liczba zwierząt
  - adopcje
  - pilne przypadki
- Ostatnio dodane zwierzęta

#### 13. Zarządzanie zwierzętami
- Lista zwierząt
- Filtry i wyszukiwanie
- Akcje:
  - edycja
  - usuwanie
  - oznaczenie „Pilne”

#### 14. Dodaj / edytuj zwierzę
- Formularz danych
- Upload i zarządzanie zdjęciami
- Status adopcyjny
- Walidacje formularzy

#### 15. Zarządzanie treścią (CMS)
- Edycja stron informacyjnych
- Edycja danych kontaktowych
- Edycja danych formalnych:
  - KRS
  - konto bankowe
  - godziny pracy
- Sekcja „Szczęśliwe adopcje”

---

## ⚙️ Lista feature’ów (Features)

### 🌍 Publiczne

#### Przeglądanie i wyszukiwanie
- Przeglądanie listy zwierząt
- Filtrowanie po wielu kryteriach
- Wyszukiwanie po imieniu
- Obsługa pustych wyników

#### Karta zwierzęcia
- Galeria zdjęć
- Status adopcyjny
- Informacja o czasie w schronisku
- Udostępnianie w mediach społecznościowych
- Click-to-call

#### Treści informacyjne
- Dynamiczne strony CMS
- Aktualności
- Dokumenty do pobrania

#### Kontakt
- Formularz kontaktowy
- Mapa
- Dane kontaktowe

#### Cookies i prywatność
- CMP dla cookies analitycznych
- Google Analytics 4 aktywne tylko po wyrażeniu zgody
- Cookies techniczne używane wyłącznie do logowania administratora

---

### 🔐 Administracyjne

#### Autoryzacja
- Logowanie administratora
- Sesja oparta o cookies techniczne

#### Zarządzanie zwierzętami
- CRUD zwierząt
- Zarządzanie zdjęciami
- Status adopcyjny
- Oznaczenie „Pilne”

#### CMS
- Edycja treści stron
- Edycja danych kontaktowych
- Edycja danych formalnych
- Zarządzanie sekcją „Szczęśliwe adopcje”

---

### 🌐 Globalne

- Header z logo i nawigacją
- Footer z danymi formalnymi i kontaktowymi
- Sticky CTA na mobile („Zadzwoń / Adoptuj”)
- Responsywność (mobile / tablet / desktop)
- Dostępność (a11y)
- Stany UI:
  - loading
  - empty
  - error

---

# Zakres implementacji

## Zrealizowane w MVP

### Publiczne
- Strona główna z sekcją hero i wyróżnionymi zwierzętami
- Lista zwierząt z podstawowym filtrowaniem i wyszukiwaniem
- Karta zwierzęcia (galeria, opis, status adopcyjny, kontakt)
- Strona kontaktowa (dane, formularz, mapa)
- Sticky CTA na mobile („Zadzwoń / Adoptuj”)

### Administracyjne
- Logowanie administratora (frontend-only, cookies techniczne)
- Panel admina (dashboard)
- Zarządzanie zwierzętami:
  - dodawanie, edycja, usuwanie
  - zarządzanie zdjęciami
  - status adopcyjny
  - oznaczenie „Pilne”

### Globalne
- Layout typu hybrid (public + admin)
- Responsywność (mobile / tablet / desktop)
- Podstawowa dostępność (a11y)
- Stany UI: loading / empty / error

## Po MVP (backlog)

### Publiczne
- Strony informacyjne (O nas, Adopcje, Wolontariat, Chcę pomóc)
- Aktualności
- Dokumenty do pobrania
- Rozszerzone filtry zwierząt
- Udostępnianie w mediach społecznościowych

### Administracyjne
- CMS treści stron
- Sekcja „Szczęśliwe adopcje”
- Zarządzanie aktualnościami
- Rozbudowane role i uprawnienia

### Techniczne
- Backend i API
- Prawdziwa autoryzacja i role użytkowników
- CMP i integracja Google Analytics 4
