# Schronisko Nadzieja (Nuxt 3)

Frontendowa aplikacja SSR dla schroniska zwierząt. Dane pochodzą wyłącznie z lokalnego `mock_data.json`.

## Uruchomienie projektu

```bash
npm install
npm run dev
```

## Uruchamianie projektu w trybie prod
Potrzebne dla raportu lighthouse

```bash
npm run build
npx nuxi preview
```

## Dane

Dane znajdują się w pliku `data/mock_data.json` i są ładowane bezpośrednio przez warstwę repozytoriów (`repositories/`).

## Logowanie administratora

Logowanie jest **frontend-only**. Po poprawnym logowaniu ustawiany jest cookie `admin_auth`, a dostęp do `/admin/**` chroni middleware.
W kodzie znajduje się komentarz, że to placeholder do podmiany na prawdziwy backend.

## Kluczowe trasy (routes)

- `/` – strona główna
- `/animals` – lista zwierząt
- `/animals/:id` – karta zwierzęcia
- `/contact` – kontakt
- `/admin/login` – logowanie admina
- `/admin` – dashboard
- `/admin/animals` – zarządzanie zwierzętami
- `/admin/animals/new` – dodawanie zwierzęcia
- `/admin/animals/:id/edit` – edycja zwierzęcia

## Mapa struktury katalogów

```
assets/
  scss/
components/
  admin/
  cards/
  common/
  forms/
  layout/
  modals/
  ui/
data/
layouts/
middleware/
pages/
  admin/
  animals/
repositories/
store/
types/
```
