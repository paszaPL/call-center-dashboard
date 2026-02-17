# Call Center Dashboard

Panel do zarządzania zgłoszeniami w centrum obsługi klienta, zbudowany w Vue 3 z wykorzystaniem Vite.

## Live Demo

[https://call-center-dashboard-rho.vercel.app/](https://call-center-dashboard-rho.vercel.app/)

## Funkcjonalności

- **Lista zgłoszeń** — widok tabelaryczny (desktop) i kartowy (mobile)
- **Szczegóły zgłoszenia** — podgląd pełnych informacji z możliwością zmiany statusu
- **Filtrowanie** — po statusie (Nowe, W trakcie, Zamknięte) z licznikami
- **Tryb ciemny / jasny** — przełączanie motywu z zapisem w localStorage
- **Responsywność** — pełna obsługa urządzeń mobilnych i desktopowych
- **Oznaczenia priorytetów** — wizualne badge'e (Wysoki, Średni, Niski)
- **Oznaczenia statusów** — kolorowe wskaźniki stanu zgłoszenia

## Tech stack

- [Vue 3](https://vuejs.org/) — Composition API
- [Vite](https://vitejs.dev/) — build tool
- [Pinia](https://pinia.vuejs.org/) — state management
- [Vue Router](https://router.vuejs.org/) — routing
- [SCSS](https://sass-lang.com/) — stylowanie z systemem zmiennych i motywów

## Struktura projektu

```
src/
├── components/
│   ├── LoadingSpinner.vue
│   ├── PriorityBadge.vue
│   ├── StatusBadge.vue
│   ├── TicketFilters.vue
│   └── icons/
├── views/
│   ├── TicketList.vue
│   └── TicketDetail.vue
├── stores/
│   └── tickets.js
├── router/
│   └── index.js
├── assets/
│   └── style/
│       ├── _variables.scss
│       └── main.scss
├── App.vue
└── main.js
```

## Uruchomienie

```bash
# Instalacja zależności
npm install

# Serwer deweloperski
npm run dev

# Build produkcyjny
npm run build

# Podgląd buildu
npm run preview
```

## Wymagania

- Node.js >= 20.19.0

## Licencja

MIT
