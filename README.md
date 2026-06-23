# Atelier Lorem

Strona portfolio dla wymyślonego studia architektury. Zrobiłem ją, żeby poćwiczyć animacje
i przejścia między podstronami, dlatego wszystkie treści to lorem ipsum. Jest strona główna,
lista realizacji, kontakt i 404, do tego własny kursor, „magnetyczne” przyciski, płynny scroll
i animowane wejścia tekstu.

Podgląd: https://mafu2k.github.io/portfolio-v1.0.0.1/

## Technologie

React, TypeScript i Vite, routing na React Routerze, style w SCSS. Animacje robi GSAP,
a płynne przewijanie Lenis. Strona respektuje `prefers-reduced-motion`, więc przy wyłączonych
animacjach w systemie efekty się nie odpalają. Treści siedzą w jednym pliku
`src/content/portfolio.ts`.

Deploy na GitHub Pages robi workflow `.github/workflows/deploy.yml` przy każdym pushu na `main`.

## Uruchomienie

```bash
npm install
npm run dev
npm run lint
npm run build
```
