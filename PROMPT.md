# OWA Landing Page — Professional AI Prompt

> Ushbu hujjat har bir OWA kursi uchun yuqori sifatli landing page yaratish bo'yicha AI prompt bo'lib,
> uni istalgan AI kodlash vositasiga (Claude, ChatGPT, Cursor, Bolt va h.k.) berish mumkin.

---

## Mundarija

1. [Qanday ishlatish](#qanday-ishlatish)
2. [Asosiy prompt](#-asosiy-prompt)
3. [Kursga qarab moslashtirish](#kursga-qarab-moslashtirish)
4. [Testimonial qo'shish](#testimonial-qoshish)
5. [Bug fix va yaxshilash promptlari](#bug-fix-va-yaxshilash-promptlari)
6. [Prompt engineering qo'llanma](#-ai-dan-professional-dizayn-olish-qollanmasi)

---

## Qanday ishlatish

1. Quyidagi **Asosiy prompt**ni to'liq nusxalab, AI chatga yuboring
2. `{{KURS_NOMI}}` o'rniga kerakli kurs nomini yozing (masalan: `Frontend`)
3. `{{KURS_PAPKA}}` o'rniga kurs papkasini yozing (masalan: `frontend`)
4. Agar kursda testimonial bo'lsa — [Testimonial bo'limi](#testimonial-qoshish)dan nusxalab prompt oxiriga qo'shing
5. AI natijasini `{{KURS_PAPKA}}/` papkasi ichiga `index.html`, `styles.css`, `script.js` qilib saqlang

---

## 📋 Asosiy prompt

````
Sen senior frontend dasturchisan, shuningdek UI dizayn bo'yicha chuqur bilimga egasan.
Menga reklama maqsadida ishlatiladigan landing page yarat.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## MUHIM QOIDALAR — QATTIQ RIOYA QIL
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. Texnologiya: FAQAT vanilla HTML + CSS + JavaScript. Hech qanday framework, library, bundler, package manager ISHLATMA
2. Natija: AYNAN 3 ta fayl — index.html, styles.css, script.js
3. Til: Barcha UI matnlar O'ZBEK tilida
4. Tashqi resurslar: FAQAT Google Fonts (Inter, Alexandria)
5. Ikonlar: Ijtimoiy tarmoq ikonlari uchun IMG tag ishlat (fayl: ../telegram.png, ../instagram.png, ../phone.png). Qolgan barcha ikonlar inline SVG bo'lsin
6. Kod sifati: Semantik HTML5, BEM CSS nomlash (.block__element--modifier), Modern ES6+ JavaScript
7. Kodda izoh (comment) YOZMA — kod o'zi tushunarli bo'lsin

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## LOYIHA KONTEKSTI
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Nima:     O'zbekistondagi "Open Web Academy" (OWA) IT ta'lim markazining kurs reklama sahifasi
Maqsad:   Instagram/Facebook reklamadan kelgan foydalanuvchi ismini va telefon raqamini qoldirishi (lead generation)
Auditoriya: 16-35 yosh, O'zbekiston, 80%+ trafik MOBILDAN keladi
Kalit metrika: Forma to'ldirib yuborish (conversion)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## DIZAYN TIZIMI
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Dizayn stili: Zamonaviy, toza, minimalistik. Katta whitespace, yumshoq soyalar, rounded elementlar. Rangli aksentlar faqat muhim joylarda (CTA button, raqamlar, badge). Matn ierarxiyasi aniq: sarlavha > tavsif > yordamchi matn.

### Ranglar — CSS Custom Properties (:root) sifatida e'lon qil

:root {
  --primary: #FD482D;        /* Asosiy qizil-to'q sariq — button, aksentlar */
  --primary-dark: #E03A1F;   /* Hover holati */
  --primary-light: #FFDDD7;  /* Badge fon, focus ring */
  --primary-bg: #FFF5F3;     /* Och fon aksentli seksiyalar uchun */
  --text: #1A1A2E;           /* Asosiy matn */
  --text-sub: #6B7280;       /* Ikkilamchi matn, tavsiflar */
  --text-muted: #9CA3AF;     /* O'chgan matn, placeholder, label */
  --bg: #FFFFFF;             /* Asosiy oq fon */
  --bg-light: #F9FAFB;       /* Karta, seksiya och fon */
  --input-bg: #F3F4F6;       /* Input fon */
  --border: #E5E7EB;         /* Chegara rangi */
}

### Shriftlar — Google Fonts dan yukla

HTML head'ga qo'y:
<link href="https://fonts.googleapis.com/css2?family=Alexandria:wght@400;500&family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">

| Shrift | Vaznlar | Qo'llanilishi |
|--------|---------|---------------|
| Inter | 400, 500, 600, 700, 800, 900 | Asosiy matn, button, input, label, badge |
| Alexandria | 400, 500 | FAQAT hero title va hero tavsif |

Body: font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif

### Vizual konstantalar

| Element | Qiymat |
|---------|--------|
| Border-radius (kichik) | 12px — input, button |
| Border-radius (katta) | 20px — karta, slider, video |
| Shadow (default) | 0 4px 24px rgba(0,0,0,.06) |
| Shadow (hover) | 0 8px 32px rgba(0,0,0,.1) |
| Transition | .25s ease — barcha interaktiv elementlar |

### Umumiy CSS qoidalari

- * { box-sizing: border-box; margin: 0; padding: 0 }
- body { color: var(--text); overflow-x: hidden; -webkit-font-smoothing: antialiased }
- img { max-width: 100%; display: block }
- Barcha interaktiv elementlarga: cursor: pointer
- Placeholder rangi: var(--text-muted)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## SAHIFA ARXITEKTURASI
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Sahifani AYNAN quyidagi tartibda, yuqoridan pastga yarat:

<body>
  .bg-decor              → Fixed dekorativ SVG fon
  main.container         → max-width: 960px, margin: 0 auto, padding: 0 24px
    section.carousel     → 1. Rasm slider
    section.hero         → 2. Forma + Statistika (2 ustun)
    section.social       → 3. Ijtimoiy tarmoqlar
    section.testimonials → 4. Natijalar (IXTIYORIY)
  .floating-phone        → 5. Floating telefon button
  .sticky-cta            → 6. Mobile sticky CTA

─────────────────────────────────────────
### SECTION 1: RASM SLIDER (Carousel)
─────────────────────────────────────────

HTML:
<section class="carousel">
  <div class="carousel__track">
    <div class="carousel__slide"><img src="images/1.JPG" alt="OWA" loading="eager"></div>
    <div class="carousel__slide"><img src="images/2.JPG" alt="OWA" loading="lazy"></div>
    <div class="carousel__slide"><img src="images/3.JPG" alt="OWA" loading="lazy"></div>
    <div class="carousel__slide"><img src="images/4.JPG" alt="OWA" loading="lazy"></div>
  </div>
  <div class="carousel__dots"></div>
</section>

CSS:
- Container: border-radius: 20px, overflow: hidden, position: relative
- Balandlik: 400px (desktop)
- Track: display: flex, transition: transform 0.5s ease
- Slide: min-width: 100%, height: 100%
- Rasm: width: 100%, height: 100%, object-fit: cover
- Dots konteyneri: absolute, pastdan 16px, gorizontal markazda, display: flex, gap: 8px
- Oddiy dot: 8px x 8px, border-radius: 50%, background: var(--border)
- Aktiv dot: 24px kenglik, border-radius: 4px, background: var(--primary)
- Dot transition: width .3s ease, background .3s ease

JavaScript (initCarousel):
- Har 4 soniyada avtomatik keyingi slide
- Dot bosilganda o'sha slide'ga o'tish + timer reset
- Oxirgi slide'dan keyin birinchisiga (loop)
- Touch/swipe: touchstart da startX saqlash, touchend da deltaX hisoblash
  → 50px dan katta bo'lsa slide almashtirish
  → addEventListener { passive: true }

─────────────────────────────────────────
### SECTION 2: HERO (Forma + Statistika)
─────────────────────────────────────────

Layout:
- CSS Grid: grid-template-columns: 1fr 1fr, gap: 56px, align-items: start
- margin-top: 40px

#### CHAP USTUN — Forma (text-align: center yoki left — sen hal qil, lekin logo va title markazda bo'lsin)

**a) Logo**
- <img src="https://owa.uz/owa-logo.png" alt="OWA" height="72">
- display: block, margin: 0 auto 24px

**b) Sarlavha (h1)** — font-family: 'Alexandria'
- Birinchi qator: "{{KURS_NOMI}}" — font-weight: 700, color: var(--primary)
- Ikkinchi qator: "kursi" — font-weight: 500, color: var(--text)
- Har bir qator alohida <span> bilan, orasida <br>
- Desktop: font-size: 64px
- line-height: 1

**c) Tavsif (p)**
- "Raqamingizni qoldiring va biz barcha savollaringizga javob beramiz."
- font-family: 'Alexandria', font-size: 18px, line-height: 28px, color: var(--text-sub)
- margin-top: 12px

**d) Forma (form)** — margin-top: 24px, display: flex, flex-direction: column, gap: 12px

  **Ism input:**
  <input type="text" class="form__input" placeholder="Ismingiz" required>
  - height: 52px, padding: 0 16px
  - background: var(--input-bg), border: 2px solid transparent, border-radius: 12px
  - font-size: 16px (iOS zoom oldini olish uchun 16px dan kichik QILMA)
  - Focus: border-color: var(--primary), box-shadow: 0 0 0 2px var(--primary-light), background: #fff
  - Xatolik: border-color: var(--primary), pastda 12px font-size xato matni ko'rinadi (color: var(--primary))
  - Validatsiya: kamida 2 ta belgi

  **Telefon input:**
  <div class="form__phone"> — display: flex
    <span class="form__phone-prefix">🇺🇿 +998</span>
    - background: var(--input-bg), padding: 0 12px
    - border-radius: 12px 0 0 12px, border: 2px solid transparent
    - font-weight: 600, display: flex, align-items: center, gap: 6px
    - Prefix va input border o'rtasida yo'q (bir butun ko'rinsin)
    <input type="tel" class="form__input form__input--phone" placeholder="Telefon raqami" maxlength="12">
    - border-radius: 0 12px 12px 0
  </div>
  - Validatsiya: kamida 9 ta raqam (bo'sh joysiz)

  **Yuborish button:**
  <button type="submit" class="form__submit">Yuborish</button>
  - height: 54px, width: 100%
  - background: var(--primary), color: white, font-weight: 600, font-size: 16px
  - border: none, border-radius: 12px
  - Hover: background: var(--primary-dark), transform: translateY(-1px), box-shadow: 0 6px 20px rgba(253,72,45,.3)
  - Active: transform: translateY(0)
  - Loading holati: button ichida CSS spinner (border bilan aylanuvchi doira), matn "Yuborilmoqda...", opacity: 0.7, pointer-events: none

**e) Forma muvaffaqiyat holati**
- Forma o'rniga (forma yo'qoladi) muvaffaqiyat bloki paydo bo'ladi (fade-in animatsiya)
- Yashil checkmark SVG icon (48px)
- Matn: "Rahmat! Arizangiz qabul qilindi. Tez orada siz bilan bog'lanamiz."
- text-align: center, padding: 32px

**f) Forma submit ma'lumotlari**
- console.log bilan quyidagini chop et:
  { fullname: "Ism", phone: "+998XXXXXXXXX", source: "meta_ads_instagram", ts: "ISO vaqt" }
- phone formatida faqat raqamlar bo'lsin (bo'sh joylarsiz), masalan: "+998911234567"

#### O'NG USTUN — Statistika

Layout: display: grid, grid-template-columns: 1fr 1fr, gap: 16px

4 ta karta — bir xil komponent:

| data-target | Matn |
|-------------|------|
| 5 | Yillik tajriba |
| 1700 | Faol talabalar |
| 550 | Bitiruvchilar |
| 8 | Faol kurslar |

Har bir karta HTML:
<div class="stat-card">
  <div class="stat-card__number">
    <span class="stat-card__value" data-target="1700">0</span>
    <span class="stat-card__plus">+</span>
  </div>
  <p class="stat-card__label">Faol talabalar</p>
</div>

Karta CSS:
- background: var(--bg), border: 1px solid var(--border)
- border-radius: 20px, padding: 24px 20px
- Hover: box-shadow: 0 8px 32px rgba(0,0,0,.1), transform: translateY(-2px)

Karta ichki CSS:
- stat-card__number: display: flex, align-items: center
- stat-card__value: font-size: 3.2rem, font-weight: 800, color: var(--primary)
- stat-card__plus: font-size: 2rem, font-weight: 600, color: var(--primary)
- stat-card__label: font-size: 1rem, color: var(--text-muted), margin-top: 4px

Raqam animatsiyasi (initCounters):
- IntersectionObserver (threshold: 0.5) bilan kuzat
- Ko'ringanda: 0 dan data-target gacha 1.6s davomida o'sish
- requestAnimationFrame + easeOutQuart: t => 1 - Math.pow(1 - t, 4)
- Faqat 1 marta (observe → unobserve)

─────────────────────────────────────────
### SECTION 3: IJTIMOIY TARMOQLAR
─────────────────────────────────────────

HTML:
<section class="social">
  <div class="social__links">
    <a href="https://t.me/owa_uz" target="_blank" class="social__link">
      <img src="../telegram.png" alt="Telegram" width="20" height="20">
      <span>@owauz</span>
    </a>
    <a href="https://www.instagram.com/owa.uz/" target="_blank" class="social__link">
      <img src="../instagram.png" alt="Instagram" width="20" height="20">
      <span>@owa.uz</span>
    </a>
  </div>
  <a href="https://t.me/owacademy2" target="_blank" class="social__cta">
    <img src="../telegram.png" alt="" width="18" height="18">
    Telegramdan bog'lanish
  </a>
</section>

CSS:
- social: margin-top: 24px
- social__links: display: flex, justify-content: center, gap: 24px, margin-bottom: 16px
- social__link: display: flex, align-items: center, gap: 8px, color: var(--text-sub), font-size: 14px, text-decoration: none
  - Hover: color: var(--primary)
- social__cta: display: flex, align-items: center, justify-content: center, gap: 8px
  - width: 100%, height: 48px
  - border: 1.5px solid var(--primary), color: var(--primary), background: transparent
  - border-radius: 8px, font-weight: 600, text-decoration: none
  - Hover: background: var(--primary), color: white

─────────────────────────────────────────
### SECTION 4: TESTIMONIALLAR (IXTIYORIY)
─────────────────────────────────────────

⚠️ Bu sectionni FAQAT prompt oxirida testimonial ma'lumotlari berilgan bo'lsa qo'sh.
   Agar berilmagan bo'lsa — butunlay TASHLAB KET, bo'sh section ham qo'yma.

Sarlavha: "Bitiruvchilarimiz natijalari" — text-align: center, font-weight: 700, font-size: 1.5rem
padding-top: 64px

Layout: display: grid, grid-template-columns: repeat(3, 1fr), gap: 20px
(Agar 1 ta testimonial bo'lsa — grid ishlatma, faqat max-width: 320px, margin: 0 auto)

Har bir karta HTML:
<div class="testimonial-card">
  <div class="testimonial-card__video">
    <video src="video/Ozodbek.mp4" preload="none" playsinline></video>
    <button class="testimonial-card__play" aria-label="Video o'ynatish">
      <!-- Play triangle SVG icon, 50px, oq -->
    </button>
  </div>
  <div class="testimonial-card__info">
    <span class="testimonial-card__badge">Frontend</span>
    <h3 class="testimonial-card__name">Ozodbek</h3>
    <p class="testimonial-card__result">O'z ish joyi, kuchli portfolio va oylik daromadga ega</p>
  </div>
</div>

Video container CSS:
- aspect-ratio: 9 / 12, background: #000, border-radius: 20px 20px 0 0, overflow: hidden, position: relative
- video: width: 100%, height: 100%, object-fit: cover
- Play button: position: absolute, top: 50%, left: 50%, transform: translate(-50%,-50%)
  - 56px, border-radius: 50%, background: rgba(0,0,0,.5), backdrop-filter: blur(4px)
  - border: none, color: white

Info CSS:
- padding: 16px
- Badge: display: inline-block, background: var(--primary-bg), color: var(--primary), padding: 4px 12px, border-radius: 20px, font-size: 12px, font-weight: 600
- Name: font-weight: 700, font-size: 1rem, margin-top: 8px
- Result: font-size: 0.85rem, color: var(--text-sub), margin-top: 4px, line-height: 1.4

Video JavaScript (initVideos):
- Play button bosilganda: video.play(), play button display: none
- Video ustiga bosilganda: agar o'ynayotgan bo'lsa pause + play button ko'rsat, aks holda play
- Bir vaqtda faqat 1 ta video o'ynasin (boshqalari auto-pause)
- video 'ended' eventida: play button qayta ko'rsat

─────────────────────────────────────────
### ELEMENT 5: FLOATING TELEFON BUTTON
─────────────────────────────────────────

HTML:
<a href="tel:+998752200107" class="floating-phone">
  <img src="../phone.png" alt="Telefon" width="24" height="24" style="filter: brightness(0) invert(1)">
  <span class="floating-phone__tooltip">+998 75 220 01 07</span>
</a>

CSS:
- position: fixed, bottom: 24px, right: 24px, z-index: 100
- width: 56px, height: 56px, border-radius: 50%
- background: var(--primary), display: flex, align-items: center, justify-content: center
- box-shadow: 0 4px 16px rgba(253,72,45,.4)
- text-decoration: none
- animation: bounce 3s ease-in-out infinite

@keyframes bounce {
  0%, 100% { transform: translateY(0) }
  15% { transform: translateY(-8px) }
  30% { transform: translateY(0) }
}

Tooltip:
- position: absolute, right: calc(100% + 12px), top: 50%, transform: translateY(-50%)
- background: var(--text), color: white, padding: 8px 16px, border-radius: 8px
- white-space: nowrap, font-size: 14px, font-weight: 500
- opacity: 0, pointer-events: none, transition: opacity .2s
- .floating-phone:hover .floating-phone__tooltip → opacity: 1

─────────────────────────────────────────
### ELEMENT 6: STICKY MOBILE CTA
─────────────────────────────────────────

HTML:
<div class="sticky-cta">
  <button class="sticky-cta__button">Yuborish</button>
</div>

CSS:
- DISPLAY: NONE (default — faqat 768px dan kichik ekranda ko'rinsin)
- @media (max-width: 768px):
  - position: fixed, bottom: 0, left: 0, right: 0, z-index: 99
  - background: rgba(255,255,255,.9), backdrop-filter: blur(12px), -webkit-backdrop-filter: blur(12px)
  - padding: 12px 16px calc(12px + env(safe-area-inset-bottom))
  - border-top: 1px solid var(--border)
  - Button: primary rang, full width, height: 48px, border-radius: 12px, font-weight: 600

JavaScript (initSticky):
- IntersectionObserver bilan forma sectionni kuzat
- Forma ko'rinmay qolganda: sticky-cta ga .sticky-cta--visible class qo'sh
- Forma ko'rinayotganda: class olib tashla
- .sticky-cta--visible: display → block (transform + opacity animatsiya bilan)
- Button bosilganda: forma ga smooth scroll → form.scrollIntoView({ behavior: 'smooth' })
- 768px dan kichik ekranda: body ga padding-bottom: 72px qo'sh
- Floating phone button: bottom: 88px (sticky ustida turishi uchun)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## ANIMATSIYALAR
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. Sahifa fade-in (initFadeIn):
   - Har bir section ga .fade-in class: opacity: 0, transform: translateY(20px)
   - DOMContentLoaded da staggered qilib .fade-in--visible qo'sh (har biri 100ms kechikish)
   - .fade-in--visible: opacity: 1, transform: translateY(0), transition: .6s ease

2. Stat raqamlar: yuqorida tavsiflangan (initCounters)

3. Carousel: transform 0.5s ease

4. Floating button: bounce 3s infinite

5. Hover effektlar:
   - Button: translateY(-1px) + shadow
   - Stat karta: translateY(-2px) + shadow
   - Link: color o'zgarishi

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## BG DEKOR
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Body ichida birinchi element:
<div class="bg-decor" aria-hidden="true">
  <!-- 2-3 ta gradient circle SVG: primary-light va primary-bg ranglarida, blur filter -->
</div>

CSS:
- position: fixed, bottom: -100px, left: -100px
- width: 400px, height: 400px, opacity: 0.7
- pointer-events: none, z-index: 0
- @media (max-width: 480px): display: none

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## RESPONSIVE DIZAYN
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

### Desktop (default)
- Container: max-width: 960px, padding: 0 24px
- Hero: 2 ustun grid, gap: 56px
- Carousel: 400px
- Title: 64px

### @media (max-width: 1024px)
- Hero: 2 ustun, gap: 40px
- Title: 1.9rem
- Stat raqamlar: 2.2rem

### @media (max-width: 768px)
- Hero: 1 ustun (forma tepada, stats pastda)
- Title: 36px
- Carousel: 320px
- Stats: 2x2, gap: 8px
- Testimonials: 1 ustun
- Sticky button ko'rinsin
- body: padding-bottom: 72px
- Floating phone: bottom: 88px

### @media (max-width: 480px)
- html: font-size: 15px
- Carousel: 260px
- Title: 1.55rem
- Input height: 48px
- Stats gap: 6px
- BG decor: display: none

### @media (max-width: 360px)
- Container padding: 0 12px
- Title: 1.35rem
- Carousel: 220px

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## JAVASCRIPT ARXITEKTURASI
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

document.addEventListener('DOMContentLoaded', () => {
  initCarousel();   // Rasm slider + touch + autoplay
  initPhone();      // Telefon formatlash (faqat raqam, "XX XXX XX XX")
  initForm();       // Validatsiya + submit + loading + success
  initCounters();   // Scroll triggered animated counters
  initFadeIn();     // Sahifa elementlari fade-in
  initSticky();     // Mobile sticky CTA button
  initVideos();     // Video play/pause (faqat testimonial bo'lsa)
});

Qoidalar:
- Har bir init funksiya mustaqil ishlaydi (birida xato bo'lsa boshqalariga ta'sir qilmasin — try-catch)
- Touch eventlar: { passive: true }
- Telefon formatlash: faqat raqam qabul qilsin, harflar va boshqa belgilar filtrlash. "XX XXX XX XX" format (masalan: "91 123 45 67"). Backspace to'g'ri ishlashi kerak.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## HTML HEAD
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

<!DOCTYPE html>
<html lang="uz">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Open Web Academy — {{KURS_NOMI}} kursi. Professional IT ta'lim.">
  <title>{{KURS_NOMI}} kursi — Open Web Academy</title>
  <link rel="icon" href="https://owa.uz/owa-logo.png">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Alexandria:wght@400;500&family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="styles.css">
</head>

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## QILMA RO'YXATI (ANTI-PATTERNS)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

- Gradient background QILMA (faqat solid ranglar)
- Parallax, 3D, glassmorphism — KERAK EMAS
- Placeholder matn (Lorem ipsum) QILMA — barcha matnlar haqiqiy
- Keraksiz seksiya qo'shma (FAQ, pricing, features — KERAK EMAS)
- Har joyga shadow qo'yma (faqat hover holatda)
- Input font-size 16px dan kichik QILMA (iOS auto-zoom oldini olish)
- Framework yoki library ISHLATMA
- Kodda comment YOZMA

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## KURS MA'LUMOTLARI
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Kurs nomi: {{KURS_NOMI}}
Kurs papkasi: {{KURS_PAPKA}}
````

---

## Kursga qarab moslashtirish

Yuqoridagi promptda faqat 2 ta o'zgaruvchini almashtiring:

| Kurs | `{{KURS_NOMI}}` | `{{KURS_PAPKA}}` | Testimonial |
|------|------------------|-------------------|-------------|
| Frontend | Frontend | frontend | Bor (3 ta) |
| Back-end | Back-end | back-end | Yo'q |
| UI/UX | UI/UX | ui-ux | Yo'q |
| IT KIDS | IT KIDS | it-kids | Bor (3 ta) |
| Grafik Dizayn | Grafik Dizayn | grafik-dizayn | Yo'q |
| Kompyuter Savodxonligi | Kompyuter Savodxonligi | kompyuter-savodxonligi | Yo'q |
| Foundation | Foundation | foundation | Yo'q |
| Mobil dasturlash | Mobil dasturlash | mobil-dasturlash | Yo'q |

---

## Testimonial qo'shish

Agar kursda testimonial bo'lsa, **asosiy prompt oxiriga** quyidagilardan keragini qo'shing:

### Frontend kursi uchun (3 ta)

```
## TESTIMONIALLAR

Bu kursda testimonial bor. "Bitiruvchilarimiz natijalari" sectionini qo'sh.

1. Ism: "Ozodbek" | Badge: "Frontend" | Video: video/Ozodbek.mp4
   Natija: "O'z ish joyi, kuchli portfolio va oylik daromadga ega"

2. Ism: "Feruza" | Badge: "Frontend" | Video: video/Feruza.mp4
   Natija: "Kursni tugatib, professional frontend dasturchi bo'ldi"

3. Ism: "Abdumalik" | Badge: "Frontend" | Video: video/Abdumalik.mp4
   Natija: "IT sohasida yangi karera boshladi"
```

### IT KIDS kursi uchun (3 ta)

```
## TESTIMONIALLAR

Bu kursda testimonial bor. "Bitiruvchilarimiz natijalari" sectionini qo'sh.

1. Ism: "1 minutda robot" | Badge: "Robototexnika" | Video: video/1minutda robot.mp4
   Natija: "Bolalar darsda robot yig'ishni o'rganmoqda"

2. Ism: "Bitiruvchilarimiz" | Badge: "IT Kids" | Video: video/Bitiruvchilar.mp4
   Natija: "Kursni muvaffaqiyatli tugatgan talabalar"

3. Ism: "Shirintoy" | Badge: "IT Kids" | Video: video/Shirintoy-qiz.mp4
   Natija: "Kichkina dasturchi — kursda nimalar o'rganayotganini aytib beradi"
```

---

## Bug fix va yaxshilash promptlari

Asosiy sahifa tayyor bo'lgandan keyin, zarur bo'lsa quyidagi promptlarni **alohida-alohida** yuboring:

### 1. Telefon input to'g'rilash

```
Telefon inputda muammo bor. To'g'irla:
1. Faqat raqam kiritilsin — harflar va boshqa belgilar QABUL QILINMASIN
2. Formatlash: "XX XXX XX XX" (masalan: "91 123 45 67")
3. Backspace to'g'ri ishlashi kerak — formatlovchi bo'sh joylarni ham o'chirsin
4. Paste qilinganda ham faqat raqamlarni olsin
5. maxlength input uchun 12 bo'lsin (9 raqam + 3 bo'sh joy)
```

### 2. Forma loading + success holati

```
Forma yuborilayotganda quyidagicha ishlat:
1. Submit button ichida CSS spinner ko'rsat (border bilan aylanuvchi 18px doira, 2px oq border, border-top transparent)
2. Button matni: "Yuborilmoqda..."
3. Button disabled + opacity: 0.7
4. 1.5s setTimeout keyin muvaffaqiyat ko'rsat
5. Muvaffaqiyat: forma yo'qolsin, o'rniga yashil checkmark SVG (48px) + matn
6. Animatsiya: fade-in 0.4s
```

### 3. Carousel swipe to'g'rilash

```
Mobileda carousel swipe qilganda sahifa ham yuqoriga-pastga harakatlanib ketayapti.
touchmove eventda: agar |deltaX| > |deltaY| bo'lsa, e.preventDefault() chaqir.
Bu event uchun { passive: false } ishlat. Boshqa touch eventlar uchun { passive: true } qolsin.
```

### 4. Performance optimizatsiya

```
Sahifa tezligini oshir:
1. Slider rasmlariga loading="lazy" qo'sh (birinchisidan TASHQARI)
2. Video'larga preload="none" qo'y
3. <link rel="preconnect"> Google Fonts uchun (allaqachon bo'lishi kerak)
4. @media (prefers-reduced-motion: reduce) da barcha animatsiyalarni o'chir
5. will-change: transform faqat carousel track va floating button ga qo'y
```

### 5. Accessibility yaxshilash

```
Accessibility yaxshila:
1. Forma inputlarga aria-label qo'sh
2. Carousel dotlarga aria-label="Slide 1" qo'sh
3. Video play buttonlarga aria-label="Video o'ynatish" qo'sh
4. Forma xato xabarlariga role="alert" va aria-live="polite" qo'sh
5. Color contrast ratio kamida 4.5:1 bo'lishi kerak
6. Focus ko'rinadigan bo'lsin (outline yoki box-shadow)
```

---

## Pro maslahatlar

| # | Maslahat |
|---|---------|
| 1 | **Bitta kursdan boshlang.** Frontend yoki IT KIDS bilan boshlang (testimonial bor, to'liq natijani ko'rasiz) |
| 2 | **Avval MOBILE ko'ring.** Trafik 80%+ mobildan — avval mobileda tekshiring |
| 3 | **Katta o'zgarishlarni bo'ling.** Bitta promptda 1 muammo yoki 1 feature so'rang |
| 4 | **Har safar tekshiring.** Har bir AI javobdan keyin brauzerda oching |
| 5 | **Chat sessiyasini saqlang.** AI oldingi kodingizni kontekstda ushlab turadi |
| 6 | **Aniq bo'ling.** "Chiroyli qil" emas, "border-radius: 20px, shadow: ..., hover: ..." deng |

---

# 📖 AI dan professional dizayn olish qo'llanmasi

## Muammo

AI mantiqiy kodni yaxshi yozadi, lekin UI/dizayn qismi ko'pincha oddiy, "Bootstrap default" ko'rinishda chiqadi. Buning sababi — AI ga faqat "chiroyli qil" desangiz, u eng oddiy va xavfsiz yo'lni tanlaydi.

## Yechim: Dizaynni so'z bilan "chizish"

AI ko'rish qobiliyatiga ega emas — u faqat so'zlarni tushunadi. Qanchalik aniq tasvirlasangiz, shunchalik yaxshi natija.

---

### QOIDA 1: Rang tizimini to'liq bering

**Yomon:**
```
Qizil rangda qil
```

**Yaxshi:**
```
Ranglar:
- Primary: #FD482D (buttonlar, aksentlar)
- Primary dark: #E03A1F (hover holati)
- Primary light: #FFDDD7 (badge fon)
- Text: #1A1A2E (asosiy matn)
- Text muted: #9CA3AF (yordamchi matn)
- Background: #F9FAFB (karta fonlari)
- Border: #E5E7EB
CSS :root variable sifatida e'lon qil.
```

> Nima uchun: Bitta "qizil" desangiz hamma joyga bir xil qizil qo'yadi. To'liq palitra bersangiz — har elementga mos rang tushadi.

---

### QOIDA 2: Shrift ierarxiyasini aniq ko'rsating

**Yomon:**
```
Chiroyli font ishlat
```

**Yaxshi:**
```
Shriftlar (Google Fonts):
- Sarlavha: "Alexandria", weight 700, 64px desktop / 36px mobile
- Tavsif: "Alexandria", weight 400, 18px, line-height: 28px
- Asosiy matn: "Inter", weight 400-700

Rang ierarxiyasi:
- Sarlavha: #1A1A2E, font-weight 700
- Ikkilamchi: #6B7280
- Yordamchi: #9CA3AF
```

> Nima uchun: Professional saytlarning siri — shrift weight va rang orqali vizual ierarxiya. Aniq ko'rsatmasangiz, hamma narsa bir xil chiqadi.

---

### QOIDA 3: Spacing ni pikselda bering

**Yomon:**
```
Elementlar orasini och
```

**Yaxshi:**
```
Spacing:
- Section oralari: 64px
- Karta padding: 24px 20px
- Karta gap: 16px (desktop), 8px (mobile)
- Input height: 52px, button height: 54px
- Input → button gap: 12px
- Logo → sarlavha gap: 24px
```

> Nima uchun: Spacing — professional va havaskor dizaynning eng katta farqi.

---

### QOIDA 4: Border-radius, shadow, transition — aniq yozing

**Yomon:**
```
Burchaklarni yumaloqlat
```

**Yaxshi:**
```
Border-radius: 12px (input, button), 20px (karta, slider), 50px (badge)
Shadow (hover): 0 8px 32px rgba(0,0,0,.1)
Button shadow: 0 6px 20px rgba(253,72,45,.3)
Transition: .25s ease — barcha interaktiv elementlar
```

> Nima uchun: Bu kichik detallar "premium" his beradi. AI o'zi tanlaganda tartibsiz chiqadi.

---

### QOIDA 5: Hover va interaktiv holatlarni tasvirlang

**Yomon:**
```
Button bosganda o'zgarsin
```

**Yaxshi:**
```
Button hover: fon #FD482D → #E03A1F, translateY(-1px), shadow qo'shilsin
Karta hover: translateY(-3px), border: var(--primary-light), shadow
Input focus: border: var(--primary), box-shadow: 0 0 0 2px var(--primary-light), bg: white
```

> Nima uchun: Micro-interactions saytni "tirik" qiladi. Ko'rsatmasangiz faqat cursor: pointer bo'ladi.

---

### QOIDA 6: Animatsiyalarni batafsil tasvirlang

**Yomon:**
```
Animatsiya qo'sh
```

**Yaxshi:**
```
1. Sahifa fade-in: har section pastdan 20px, opacity 0→1, 0.6s ease, staggered 100ms
2. Raqamlar: scroll triggered, 0→target, 1.6s, easeOutQuart
3. Floating button: bounce 3s infinite, -8px
4. Carousel: transform 0.5s ease
```

---

### QOIDA 7: Layout ni grid/flex bilan aniq ko'rsating

**Yomon:**
```
2 ta ustun qil
```

**Yaxshi:**
```
Hero: CSS Grid, grid-template-columns: 1fr 1fr, gap: 56px, align-items: start
Stats: 2x2 grid, gap: 16px
768px da: 1 ustun, forma order:1, stats order:2
```

---

### QOIDA 8: Referens va stil tavsifi bering

```
Dizayn stili: Zamonaviy, toza, minimalistik. Apple.com va Stripe.com orasidagi.
Katta whitespace, yumshoq soyalar, rounded elementlar.
Rangli aksentlar faqat muhim joylarda.
```

---

### QOIDA 9: "QILMA" ro'yxatini bering

```
QILMA:
- Gradient background QILMA
- Parallax, 3D, glassmorphism EMAS
- Lorem ipsum EMAS — haqiqiy matn
- Keraksiz seksiya qo'shma (FAQ, pricing)
- Har joyga shadow qo'yma
```

---

### QOIDA 10: Real content bering

**Yomon:**
```
Statistika seksiyasi qo'sh
```

**Yaxshi:**
```
4 ta karta, 2x2 grid:
| 5+ | Yillik tajriba |
| 1700+ | Faol talabalar |
| 550+ | Bitiruvchilar |
| 8+ | Faol kurslar |
```

> Nima uchun: Haqiqiy kontent bersangiz proportional dizayn chiqadi.

---

## Xulosa: Professional natija formulasi

```
PROFESSIONAL PROMPT = Rol + Maqsad + Texnologiya cheklov
  + Ranglar (to'liq palitra, CSS variables)
  + Shriftlar (family, weight, size — har element uchun)
  + Spacing (pikselda)
  + Visual constants (radius, shadow, transition)
  + Layout (grid/flex, breakpoints bilan)
  + Holatlar (hover, focus, active, loading, success, error)
  + Animatsiyalar (type, duration, easing, trigger)
  + QILMA ro'yxati
  + Haqiqiy kontent
```

**Qisqa qilib:** AI ga "chiroyli qil" emas, **"QANDAY chiroyli"** ekanligini BATAFSIL aytish kerak.
