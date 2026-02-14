# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a static HTML landing page system for **Open Web Academy (OWA)**, an IT education center in Uzbekistan. The project consists of:
- A main course selector page (`index.html`)
- 8 individual course landing pages, each in its own directory
- All pages optimized for mobile-first (80%+ traffic from mobile)
- Primary purpose: Lead generation via Instagram/Facebook ads

## Project Structure

```
/
├── index.html              # Main course selector page
├── DATA.md                 # Content database (colors, fonts, statistics, social links)
├── PROMPT.md               # Detailed AI prompt for generating landing pages
├── telegram.png            # Shared assets (in root)
├── instagram.png
├── phone.png
├── frontend/               # Course landing pages (8 total)
│   ├── index.html
│   ├── styles.css
│   ├── script.js
│   ├── images/            # Carousel images (1.JPG, 2.JPG, 3.JPG, 4.JPG)
│   └── video/             # Testimonial videos (if applicable)
├── back-end/
├── ui-ux/
├── it-kids/
├── grafik-dizayn/
├── kompyuter-savodxonligi/
├── foundation/
└── mobil-dasturlash/
```

## Tech Stack

**STRICT CONSTRAINT**: Vanilla HTML + CSS + JavaScript ONLY
- NO frameworks, libraries, bundlers, or package managers
- NO build process - files are deployed as-is
- Icons: Inline SVG or image files (../telegram.png, etc.)
- Fonts: Google Fonts (Inter, Alexandria)

## Design System

All brand colors are defined as CSS custom properties in `:root`:

```css
--primary: #FD482D        /* Main CTA color */
--primary-dark: #E03A1F   /* Hover states */
--primary-light: #FFDDD7  /* Badge backgrounds */
--primary-bg: #FFF5F3     /* Light accent sections */
--text: #1A1A2E           /* Primary text */
--text-sub: #6B7280       /* Secondary text */
--text-muted: #9CA3AF     /* Placeholder, labels */
--bg: #FFFFFF             /* Main background */
--bg-light: #F9FAFB       /* Card backgrounds */
--input-bg: #F3F4F6       /* Input fields */
--border: #E5E7EB         /* Borders */
```

**Typography**:
- Inter (400-900): Body text, buttons, inputs, labels
- Alexandria (400, 500): Hero titles and descriptions ONLY

**Visual Constants**:
- Border radius (small): 12px (inputs, buttons)
- Border radius (large): 20px (cards, slider, video)
- Shadow default: `0 4px 24px rgba(0,0,0,.06)`
- Shadow hover: `0 8px 32px rgba(0,0,0,.1)`
- Transition: `.25s ease` for all interactive elements

## Landing Page Architecture

Each course landing page follows this exact structure:

1. **Carousel** - 4 images from `images/` directory, auto-rotate every 4s, touch swipe support
2. **Hero Section** - Two-column layout (desktop):
   - Left: Logo, title, description, lead form (name + phone), Telegram CTA, social links
   - Right: Carousel + Statistics (4 cards: years, students, graduates, courses)
3. **Statistics** - Animated counters that count up on scroll into view
4. **Testimonials** (optional) - Video cards with play/pause functionality
5. **Floating Phone Button** - Fixed bottom-right with bounce animation
6. **Sticky CTA** (mobile) - Appears when form scrolls out of view

## Content Management

**All content is centralized in `DATA.md`**:
- Brand colors (CSS variables)
- Font specifications
- Common statistics (same across all courses)
- Phone number: +998 75 220 01 07
- Social links: Telegram (@owauz, https://t.me/owauz), Instagram (@owa.uz)
- Logo URL: https://owa.uz/owa-logo.png
- Form submission format

**Course-specific content**:
- Course title (e.g., "Frontend", "IT KIDS")
- Course folder name
- Hero description (most use default, IT KIDS has custom)
- Testimonials (Frontend: 3, IT KIDS: 3, others: none)

## Development Workflow

### Working with Existing Pages

1. **Read `DATA.md` first** - contains all shared content and design specs
2. **Check mobile first** - 80%+ traffic is mobile (responsive breakpoints: 768px, 480px, 360px)
3. **Test all interactive features**:
   - Carousel auto-rotate and swipe
   - Form validation (name ≥2 chars, phone 9 digits)
   - Phone formatting: "XX XXX XX XX" pattern
   - Animated statistics on scroll
   - Video play/pause (if testimonials exist)
   - Sticky CTA visibility on mobile

### Creating New Pages

- Reference `PROMPT.md` for complete specification
- Use existing course pages as templates
- Copy structure from `frontend/` or `it-kids/` (they have testimonials)
- Ensure `images/` folder contains 4 carousel images
- Add `video/` folder only if course has testimonials

### Modifying Pages

- **DO NOT** change design system colors/fonts unless updating globally
- **DO NOT** add frameworks or external dependencies
- **DO NOT** use comments in code (code should be self-explanatory)
- **ALWAYS** test on mobile viewport first
- **MAINTAIN** consistent spacing and layout patterns

## Form Submission

Forms log to console (no backend integration yet):
```javascript
{
  fullname: "User Name",
  phone: "+998XXXXXXXXX",  // Formatted as +998 followed by 9 digits
  source: "meta_ads_instagram",
  ts: "ISO timestamp"
}
```

Phone input requirements:
- Only digits accepted (no letters/symbols)
- Format displayed: "XX XXX XX XX" (e.g., "91 123 45 67")
- maxlength: 12 (9 digits + 3 spaces)
- Backspace removes formatting spaces correctly

## Responsive Breakpoints

- Desktop (default): max-width 960px container
- Tablet (1024px): Reduced gaps, smaller fonts
- Mobile (768px): Single column, carousel 320px, 2x2 stats grid, sticky CTA appears
- Small mobile (480px): Further font reduction, carousel 260px
- Very small (360px): Minimal padding, carousel 220px

## JavaScript Architecture

Each landing page has these initialization functions:
- `initCarousel()` - Image slider with auto-rotate, touch swipe, dots navigation
- `initPhone()` - Phone input formatting and validation
- `initForm()` - Form validation, submit handling, loading/success states
- `initCounters()` - Intersection Observer for animated stat counters
- `initFadeIn()` - Staggered fade-in animations on page load
- `initSticky()` - Mobile sticky CTA visibility based on form position
- `initVideos()` - Video play/pause (only if testimonials exist)

All functions use try-catch for isolation - errors in one don't break others.

## Common Pitfalls

- **Input font-size must be ≥16px** on iOS to prevent auto-zoom
- **Touch events** should use `{ passive: true }` except carousel horizontal scroll prevention
- **Carousel swipe** requires `{ passive: false }` on touchmove with preventDefault when |deltaX| > |deltaY|
- **Loading="lazy"** on all carousel images EXCEPT the first one
- **preload="none"** on all videos
- **No gradient backgrounds** - design is flat with solid colors
- **Border color consistency** - use CSS variables, not hardcoded values

## File Organization

- Shared assets (telegram.png, instagram.png, phone.png) in root, referenced as `../image.png`
- Each course is fully self-contained in its directory
- No shared CSS/JS files - each course has its own styles.css and script.js
- Images specific to course go in `{course}/images/`
- Testimonial videos go in `{course}/video/`

## Language

All UI text is in **Uzbek (O'zbek tili)**. Do not translate or change language without explicit instruction.
