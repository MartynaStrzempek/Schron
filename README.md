# Schronisko Przyjaciele Zwierząt (Nuxt 3)

Frontendowa aplikacja Nuxt 3 (SSR) dla schroniska. Projekt korzysta z lokalnych danych w `data/mock_data.json` i Naive UI.

## Uruchomienie projektu

```bash
npm install
npm run dev
```

Aplikacja będzie dostępna pod adresem `http://localhost:3000`.

## Dane (mock_data.json)

Dane źródłowe znajdują się w `data/mock_data.json` i są wykorzystywane przez warstwę repozytoriów w `repositories/`.

## Logowanie administratora (placeholder)

Panel admina działa wyłącznie frontendowo. Po zalogowaniu zapisywany jest cookie `admin_session`.
W kodzie dodano komentarz, że logowanie to placeholder do podmiany na backend.

## Kluczowe trasy

- `/` – strona główna
- `/animals` – lista zwierząt
- `/animals/:id` – karta zwierzęcia
- `/contact` – kontakt
- `/admin/login` – logowanie administratora
- `/admin` – dashboard
- `/admin/animals` – lista zwierząt w panelu
- `/admin/animals/new` – dodaj zwierzę
- `/admin/animals/:id` – edytuj zwierzę

## Struktura katalogów

```
assets/
  scss/
components/
  admin/
  cards/
  common/
  forms/
  layout/
composables/
data/
layouts/
middleware/
pages/
repositories/
stores/
types/
public/
```
