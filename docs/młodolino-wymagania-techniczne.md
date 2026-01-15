# Cel dokumentu

Dokument definiuje kluczowe decyzje techniczne dotyczące implementacji frontendu, backendu, środowisk, procesu build/deploy oraz konteneryzacji aplikacji. Celem jest zapewnienie spójności technologicznej, przewidywalności developmentu oraz łatwej skalowalności w przyszłości.

# Frontend

### Stack technologiczny
- **Język**

  Typescript

- **Framework** 

  Nuxt 3

- **Store** 

  Pinia *@pinia/nuxt* (rekomendowany dla Nuxt 3)


### UI, stylowanie i dostępność
- **Metoda stylowania** 

  czysty SCSS

- **Biblioteka UI**

  Naive UI
  
- **Nazewnictwo klass**
  
  BEM
  
- **Responsywność**

  - mobile-first (mockup first for mobile, CSS styles first for mobile)

  - breakpoints
    
  ```js
   base mobile (0 - 767px)
   @media (min-width: 768px) { /* tablet+ */ }
   @media (min-width: 1024px) { /* desktop+ */ }
   ```
   - wartości pikseli zapisać w globalnym pliku ze zmiennymi i wykorzystywac te zmienne w kazdym .scss/.css

- **Accessibility**

  WCAG AA

### Architektura aplikacji
- **Mode**

  SSR + SPA
  
  *config: ssr: true*
  
- **Repo**

  - frontend i backend w jednym repo
  - backend w folderze */server*

- **Struktura katalogu *components***
```js
components/
  ├─ ui/
  ├─ layout/
  ├─ forms/
  ├─ cards/
  ├─ modals/
  ├─ common/  
  └─ admin/
```

- **Konwencja nazewnicza** 

  PascalCase

- **Komunikacja z API** 

  useFetch (natywna metoda w Nuxt 3)
  
- **Warstwa API**

  izolowana w folderze api/, podzial plików na moduły i osobno dir /types
  
 - **PWA (Progressive Web App)**

 - **Obsługa błędów**

   W przypadku wystąpienia błędu użytkownik otrzymuje czytelny komunikat, a aplikacja nie przerywa działania ani nie ujawnia szczegółów technicznych. Bezpieczne dane można wyświetlić dla developera w konsoli.

 - **Globalne pliki ze zmiennymi**
   
   - kolory
   - breakpoints
   - typografia
   - spacing
   - radius
   - obramowania
   - cienie
   - animacje / transition
   - z-index

- **light/dark modes**

### Jakość kodu i Developer Experience (DX)

- **Formatowanie i linting**
  
  Prettier, ESLint (konfiguracja, ruleset).

- **Husky / lint-staged**
  
  Lint i testy przed commitem

### Testowanie

- **Unit testy**

   Jest

- **E2E**

  Puppeteer – krytyczne ścieżki (login, addAnimal, itp.).

- **Strategia**

  Testujemy kluczowe ścieżki użytkownika (nawigacja, formularze, główne akcje), walidację danych oraz obsługę błędów i   stanów brzegowych.
  Nie testujemy szczegółów implementacyjnych, stylów CSS ani każdej drobnej interakcji — zakładamy poprawne działanie frameworków i bibliotek zewnętrznych.

### Performance
- **Ładowanie zasobów**
  - lazy loading
  - lazy loading list (infinite scroll)
  - optymalizacja obrazów (WebP, AVIF).

- **Narzędzia monitorujące**
  - Lighthouse CI w pipeline.
  - Core Web Vitals (np. przez Web-Vitals)

- **Cache**
  - Browser cache dla statycznych assetów.

### Środowiska i konfiguracja

- **Środowiska**
  - local
  - development (auto-deploy z PR)
  - staging
  - production

- **Zmienne środowiskowe**
  - Pliki .env

### CI/CD

- **Pipeline (GitHub Actions)**
  - Lint + TypeScript check
  - Testy unit + e2e
  - Build produkcyjny
  - Deploy do środowiska docelowego

- **Automatyzacja**
  - Deploy do development na commit do develop
  - Deploy do staging na commit do stage
  - Deploy do production po merge na main

### Docker i konteneryzacja

- **Cel**
  - Standaryzacja środowiska.
  - Łatwy deploy i skalowanie.
  - Spójność lokalnie i w produkcji.

- **Multi-stage Dockerfile**
  - Etapy:
    Build (Node.js Alpine)
    Instalacja zależności oraz build aplikacji Nuxt (nuxi build), generujący output .output/ zawierający serwer SSR oraz    backendowe endpointy z katalogu server/.

    Run (Node.js Alpine)
    Uruchomienie serwera Nuxt (Nitro) z outputu .output/server/, np.:
    node .output/server/index.mjs.

    Uwaga: Obraz nie zawiera osobnego reverse proxy (np. Nginx). Funkcje proxy realizowane są przez platformę hostingową.

- **Struktura obrazu**
  - Do obrazu runtime kopiowany jest katalog .output/ wygenerowany przez Nuxt.
  - W szczególności:

    .output/server/ – serwer SSR oraz endpointy API z server/

    .output/public/ – statyczne assety aplikacji (np. /_nuxt/*)

  - Aplikacja działa jako serwer Node.js obsługujący zarówno frontend (SSR/SPA), jak i backend (API).

- **Reverse proxy i optymalizacje (platforma hostingowa)**
  - Funkcje reverse proxy (terminacja TLS/HTTPS, routing requestów, kompresja, CDN, podstawowe cache) są zapewniane przez platformę hostingową Vercel.
  - Aplikacja Nuxt nie zawiera własnej warstwy proxy.
  - Routing do endpointów /api/* oraz renderowanie SSR są obsługiwane bezpośrednio przez serwer Nuxt (Nitro).
  - Cache statycznych assetów oraz kompresja realizowane są na poziomie platformy.

### Deployment
- **Hosting**
  Vercel (darmowy plan)

### Monitoring i analityka

- **Monitoring błędów**

  Sentry (frontend-only)

- **Analityka użytkowania**

  GA4

```js
Jak dodać GA4 poprawnie (ważne)
✅ Najlepsza praktyka
ładuj asynchronicznie
po zgodzie użytkownika (banner po wejsciu na stronę)

W Nuxt:
przez @nuxtjs/google-analytics
albo przez GTM (też async)
```

- **Uptime monitoring** 

  UptimeRobot

### Bezpieczeństwo

- **Przechowywanie tokenów**

  HTTP-only secure cookies.

- **Dependencies**
  
  Alerty GitHub Dependabot - Dependabot alerts (Settings → Security)

### Ryzyka i ograniczenia

### Mocki

- **mocki DB**

  Mockarro
  
- **mocki testy**

  Faker.js

# Backend
