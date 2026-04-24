# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Personal portfolio site (Ahmad Siddiqui), Vite + React SPA with GSAP-driven animations and Lenis smooth scroll. Ported from a static HTML/CSS/JS version — the original CSS rules and responsive behavior (`.hideme` / `.laptophide`, `@media (max-width: 768px)` and `(max-width: 1166px)`) are preserved verbatim, so the layout and animation timings match the original 1:1.

## Running locally

```
npm install
npm run dev       # Vite dev server on http://localhost:5173
npm run build     # production build to dist/
npm run preview   # preview the production build
```

No test suite, no linter — this is a single-developer portfolio site.

## Architecture

### Routing
React Router SPA. Route → page:
- `/` → `Home` (includes the full-screen preloader)
- `/work` → `Work`
- `/about` → `About`
- `/contact` → `Contact`
- `/projectpage` → `ProjectPage` (case study; forces `body { background: #464c47 }`)
- `/mobilemenu` → `MobileMenu` (full-screen nav; same dark background)

### Provider stack (`src/App.jsx`)
`<SmoothScroll>` → `<PageTransition>` → `<CustomCursor />` → `<Routes>`.

- **SmoothScroll** (`src/components/SmoothScroll.jsx`) instantiates a Lenis instance, hooks its `scroll` event into `ScrollTrigger.update`, and drives `lenis.raf` off the GSAP ticker so scroll-linked animations stay in sync with smooth scroll. Exposes `window.lenis` for anywhere that needs imperative scrolling.
- **PageTransition** (`src/components/PageTransition.jsx`) renders the `#page-exit-transition` overlay and exposes `navigateWithTransition(to)` via `usePageTransition()`. Overlay color is taken from the `PAGE_BG` map (each route → its body background color) so the fade-out blends with the destination page. Same-path navigations run `lenis.scrollTo(0, …)` instead of a route change.
- **TLink** (`src/components/TLink.jsx`) — the only way internal links should route. Wraps `<a href>` and funnels non-external clicks into the transition controller. Always use `TLink` for routes; plain `<a target="_blank">` is fine for external/mailto links.
- **CustomCursor** (`src/components/CustomCursor.jsx`) renders the floating "CLICK ME" circle shown on `.textemail` hover. Uses a `MutationObserver` to re-bind enter/leave on elements that appear after route changes.

### Animations — GSAP + ScrollTrigger
All reveal/parallax logic lives in **`src/hooks/useRevealAnimations.js`**. Pages call `useRevealAnimations(rootRef)` to wire up:

- `.drop-text` / `.drop-text1` — toggle `.in-view` on enter (the CSS `@keyframes drop` runs from there).
- `.text span` and `.spanemail` — toggle `.appear` (the CSS `@keyframes appear` runs the letter cascade).
- `.textemail` — toggle `.in-view` for the underline sweep.
- `.text1` — start the `slideIn` / `slideInw` / `scaleImg` cover animations by setting `style.animation`.
- `.text1 .imganimation` and `.img-container .portimage` — `ScrollTrigger` with `scrub: true` for scroll-linked parallax.

Every page wraps its content in a `ref` that's passed to `useRevealAnimations(rootRef)` so the `gsap.context` scopes cleanup on unmount.

### Special components
- **Preloader** (`src/components/Preloader.jsx`) — reproduces the original `index.html` percent-counter sequence (`[0, 33, 80, 100]`) with the same `slide-up` / `fade-up` classes and timing. Home gates content on it and stores `preloaderSeen = 1` in `sessionStorage` so it doesn't replay on back-navigation.
- **HeadingSlider** (`src/components/HeadingSlider.jsx`) — direct port of `script2.js`. Builds `REPEATS × 3` copies of `["GYM", "MUSIC", "TRAVELLING"]`, snaps the track back to the middle block on `transitionend` for the infinite-loop effect, and emits `onActiveChange(realIdx)` so the About page can cross-fade the paired copy/image.
- **Accordion** (`src/components/Accordion.jsx`) — React state + `scrollHeight`-driven max-height; first item open by default, exclusive toggle.
- **Header** (`src/components/Header.jsx`) — shared nav; pass `current` (`'home' | 'work' | 'about' | 'contact'`) so the underlined link is correct, and `color="white"` on dark pages.
- **Footer** (`src/components/Footer.jsx`) — uses its own `ScrollTrigger.create` to add `.in-view` when it enters the viewport.

### Page state side-effects
Pages that aren't light-themed toggle `document.body` styles in `useEffect` (and restore them in cleanup):
- Contact sets `body` background to black and adds `.contact-page` class (CSS uses it to recolor underline effects).
- ProjectPage and MobileMenu set `body { background: #464c47; color: white }`.

Every page also writes `sessionStorage.setItem("fromPage", …)` on mount — MobileMenu reads this to auto-underline the link for the page you came from.

## Styles

All four stylesheets are imported in `src/main.jsx` in the same order the original HTML pages linked them:

1. `src/styles/css.css` — base + desktop. Also contains the `@font-face` for PP Neue Montreal (URLs rewritten to absolute `/pp-neue-montreal-cufonfonts-webfont/...` so they resolve from `public/`).
2. `src/styles/css2.css` — About-only extras (heading slider + image tab cross-fade).
3. `src/styles/mblcss.css` — mobile (`@media max-width: 768px`).
4. `src/styles/padcss.css` — tablet / small laptop (`@media max-width: 1166px`).

**Do not rename CSS classes** — `.hideme`, `.laptophide`, `.drop-text`, `.drop-text1`, `.text`, `.text1`, `.spanemail`, `.textemail`, `.imganimation*`, `.accordion-*`, `.head-item`, `.foremainmar`, etc. are all load-bearing. JSX uses the same classes and inline styles as the original HTML so the existing rules apply unchanged.

The two CSS build warnings about `*/ h1 {` (lines 211/212 of `mblcss.css` / `padcss.css`) are pre-existing typos in the original source; the `h1` rule never actually applies. Left as-is for fidelity.

## Assets

All images, the favicon, and the PP Neue Montreal font folder live under `public/` and are referenced with root-absolute paths (e.g. `src="/finalmehome.jpg"`). Note: several source images are very large (`gym2.png` ~7 MB, `finalmehome.jpg` ~5.5 MB) — compressing them later is a no-regret perf win but was kept as-is for the initial port.

## Gotchas

- **Preloader skip on SPA nav** — only the Home route runs the preloader, and it uses `sessionStorage.preloaderSeen` to not re-run on back nav. Clearing that key makes it replay.
- **Global `* { padding-left: 20px }` in `css.css`** — this global reset is why almost every element in the original HTML had inline `padding: 0` or `padding-left: 0` overrides. JSX preserves those inline styles; don't remove them assuming they're redundant.
- **Lenis availability** — `window.lenis` is only set after `SmoothScroll` mounts. `PageTransition.navigateWithTransition` falls back to native `window.scrollTo` if Lenis isn't up yet.
- **Route color body reset** — Contact / ProjectPage / MobileMenu mutate `document.body.style.backgroundColor`. Any new dark-themed route must do the same cleanup in its `useEffect` return, or the next page will inherit the dark body.
