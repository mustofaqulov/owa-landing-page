# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static landing page for Open Web Academy (OWA), an IT education platform in Uzbekistan. Built with vanilla HTML, CSS, and JavaScript — no frameworks, no build tools, no package manager.

## Running the Project

Open `index.html` in a browser or serve via any static HTTP server. There is no build step, linting, or test suite.

## Architecture

Three files in root: `index.html`, `styles.css`, `script.js`.

### Page Sections
- **Carousel** — Auto-rotating course cards (Frontend, Backend, Mobile, Design) with touch/swipe support
- **Hero** — Two-column layout: left has logo, headline, lead-capture form, language switcher; right has animated stat counters
- **Floating phone button** — Fixed-position CTA with hover popup
- **Sticky mobile button** — Appears when the form scrolls out of view on mobile

### JavaScript (`script.js`)
All logic runs after `DOMContentLoaded` via feature-specific init functions:
- `initLang()` — Language switching (uz/ru/en), persisted in localStorage key `owa_lang`
- `initPhone()` — Phone input formatting (strips non-digits, formats as "90 123 45 67")
- `initForm()` — Validation (name ≥2 chars, phone ≥9 digits) and submission (currently logs to console)
- `initCarousel()` — Auto-play carousel with touch gesture handling
- `initCounters()` — Scroll-triggered animated number counters using requestAnimationFrame
- `initFadeIn()` — Staggered fade-in on page load
- `initSticky()` — Mobile sticky button visibility based on scroll position

The `T` object holds all UI strings keyed by language code. Elements use `data-i18n` and `data-i18n-placeholder` attributes for translation binding.

### CSS (`styles.css`)
- CSS variables on `:root` for theming (colors, spacing, shadows, transitions)
- BEM naming: `.carousel__track`, `.hero__left`, `.form__btn--pulse`
- State modifiers: `--active`, `--error`, `--loading`, `--show`
- Breakpoints: 1024px, 768px, 480px, 360px (mobile-first)
- Safe area inset support for notched devices

### External Dependencies
- Google Fonts: "Inter" (weights 400–900)
- OWA logo loaded from `https://owa.uz/owa-logo.png`

## Conventions

- Use `data-*` attributes for JS hooks rather than CSS classes
- Passive event listeners for scroll/touch events
- Form submission payload includes `fullname`, `phone`, `lang`, `source` ("meta_ads_instagram"), and `ts` (ISO timestamp)
- No backend integration yet — form logs to console
