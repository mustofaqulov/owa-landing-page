document.addEventListener('DOMContentLoaded', function () {
  try { initCarousel(); } catch (e) { console.error(e); }
  try { initPhone(); } catch (e) { console.error(e); }
  try { initForm(); } catch (e) { console.error(e); }
  try { initCounters(); } catch (e) { console.error(e); }
  try { initSticky(); } catch (e) { console.error(e); }
  try { initVideos(); } catch (e) { console.error(e); }
});

/* ═══════════ INFINITE CAROUSEL ═══════════ */
function initCarousel() {
  var track = document.getElementById('carouselTrack');
  var dotsWrap = document.getElementById('carouselDots');
  if (!track || !dotsWrap) return;

  var origSlides = track.querySelectorAll('.carousel__slide');
  var total = origSlides.length;
  if (total === 0) return;

  // Clone first and last for infinite loop
  var firstClone = origSlides[0].cloneNode(true);
  var lastClone = origSlides[total - 1].cloneNode(true);
  firstClone.classList.add('carousel__slide--clone');
  lastClone.classList.add('carousel__slide--clone');

  track.appendChild(firstClone);
  track.insertBefore(lastClone, origSlides[0]);

  // Now slides = [lastClone, 1, 2, 3, 4, firstClone]
  // Real index 0 = visual position 1
  var cur = 0; // real slide index (0-based among originals)
  var pos = 1; // track position (accounting for prepended clone)
  var isMoving = false;
  var timer = null;
  var sx = 0, sy = 0;

  // Create dots
  for (var d = 0; d < total; d++) {
    var dot = document.createElement('button');
    dot.className = 'carousel__dot' + (d === 0 ? ' carousel__dot--active' : '');
    dot.setAttribute('aria-label', 'Slide ' + (d + 1));
    dotsWrap.appendChild(dot);
  }
  var dots = dotsWrap.children;

  // Set initial position (no animation)
  track.style.transform = 'translateX(-' + pos * 100 + '%)';

  function updateDots() {
    for (var i = 0; i < dots.length; i++) {
      dots[i].classList.toggle('carousel__dot--active', i === cur);
    }
  }

  function goTo(realIndex, animate) {
    if (isMoving) return;

    cur = ((realIndex % total) + total) % total;
    pos = cur + 1; // +1 because of prepended clone

    if (animate !== false) {
      isMoving = true;
      track.classList.add('carousel__track--animated');
    } else {
      track.classList.remove('carousel__track--animated');
    }

    track.style.transform = 'translateX(-' + pos * 100 + '%)';
    updateDots();
  }

  function goNext() {
    if (isMoving) return;
    isMoving = true;
    pos++;
    track.classList.add('carousel__track--animated');
    track.style.transform = 'translateX(-' + pos * 100 + '%)';
    cur = (cur + 1) % total;
    updateDots();
  }

  function goPrev() {
    if (isMoving) return;
    isMoving = true;
    pos--;
    track.classList.add('carousel__track--animated');
    track.style.transform = 'translateX(-' + pos * 100 + '%)';
    cur = ((cur - 1) + total) % total;
    updateDots();
  }

  // On transition end, jump if on clone
  track.addEventListener('transitionend', function () {
    isMoving = false;

    // If on firstClone (past last real slide) -> jump to real first
    if (pos === total + 1) {
      track.classList.remove('carousel__track--animated');
      pos = 1;
      track.style.transform = 'translateX(-' + pos * 100 + '%)';
    }

    // If on lastClone (before first real slide) -> jump to real last
    if (pos === 0) {
      track.classList.remove('carousel__track--animated');
      pos = total;
      track.style.transform = 'translateX(-' + pos * 100 + '%)';
    }
  });

  // Dot clicks
  for (var i = 0; i < dots.length; i++) {
    (function (idx) {
      dots[idx].addEventListener('click', function () {
        goTo(idx);
        startAuto();
      });
    })(i);
  }

  // Auto play
  function startAuto() {
    clearInterval(timer);
    timer = setInterval(goNext, 4000);
  }

  // Touch / Swipe
  track.addEventListener('touchstart', function (e) {
    sx = e.touches[0].clientX;
    sy = e.touches[0].clientY;
    clearInterval(timer);
  }, { passive: true });

  track.addEventListener('touchmove', function (e) {
    if (Math.abs(e.touches[0].clientX - sx) > Math.abs(e.touches[0].clientY - sy)) {
      e.preventDefault();
    }
  }, { passive: false });

  track.addEventListener('touchend', function (e) {
    var diff = sx - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) goNext(); else goPrev();
    }
    startAuto();
  }, { passive: true });

  startAuto();
}

/* ═══════════ PHONE ═══════════ */
function initPhone() {
  var el = document.getElementById('phone');
  if (!el) return;

  function fmt(r) {
    if (r.length > 9) r = r.slice(0, 9);
    var o = '';
    if (r.length > 0) o = r.slice(0, 2);
    if (r.length > 2) o += ' ' + r.slice(2, 5);
    if (r.length > 5) o += ' ' + r.slice(5, 7);
    if (r.length > 7) o += ' ' + r.slice(7, 9);
    return o;
  }

  el.addEventListener('input', function () { el.value = fmt(el.value.replace(/\D/g, '')); });

  el.addEventListener('keydown', function (e) {
    if (['Backspace','Delete','ArrowLeft','ArrowRight','Tab','Home','End'].indexOf(e.key) !== -1) return;
    if (e.ctrlKey || e.metaKey) return;
    if (!/^\d$/.test(e.key)) e.preventDefault();
  });

  el.addEventListener('paste', function (e) {
    e.preventDefault();
    var t = (e.clipboardData || window.clipboardData).getData('text').replace(/\D/g, '');
    if (t.startsWith('998')) t = t.slice(3);
    el.value = fmt(t);
    el.dispatchEvent(new Event('input'));
  });
}

/* ═══════════ FORM ═══════════ */
function initForm() {
  var form = document.getElementById('leadForm');
  if (!form) return;

  var name = document.getElementById('fullname');
  var phone = document.getElementById('phone');
  var nErr = document.getElementById('nameErr');
  var pErr = document.getElementById('phoneErr');
  var fields = document.getElementById('formFields');
  var ok = document.getElementById('formOk');
  var btn = document.getElementById('submitBtn');

  function showE(inp, err) { inp.classList.add('inp--error'); err.classList.add('inp-err--show'); }
  function hideE(inp, err) { inp.classList.remove('inp--error'); err.classList.remove('inp-err--show'); }

  name.addEventListener('input', function () { hideE(name, nErr); });
  phone.addEventListener('input', function () { hideE(phone, pErr); });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var v = true;

    if (name.value.trim().length < 2) { showE(name, nErr); v = false; } else hideE(name, nErr);
    var dg = phone.value.replace(/\D/g, '');
    if (dg.length < 9) { showE(phone, pErr); v = false; } else hideE(phone, pErr);
    if (!v) return;

    btn.classList.add('submit-btn--loading');

    console.log('Form submitted:', {
      fullname: name.value.trim(),
      phone: '+998' + dg,
      source: 'meta_ads_instagram',
      ts: new Date().toISOString()
    });

    setTimeout(function () {
      fields.style.display = 'none';
      ok.classList.add('formbox__ok--show');
    }, 1400);
  });
}

/* ═══════════ COUNTERS ═══════════ */
function initCounters() {
  var els = document.querySelectorAll('[data-target]');
  if (!els.length) return;
  var done = false;

  function ease(t) { return 1 - Math.pow(1 - t, 4); }

  function anim(el, target) {
    var s = performance.now();
    (function tick(n) {
      var p = Math.min((n - s) / 1600, 1);
      el.textContent = Math.floor(ease(p) * target);
      if (p < 1) requestAnimationFrame(tick);
    })(s);
  }

  var obs = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (en.isIntersecting && !done) {
        done = true;
        els.forEach(function (el) { anim(el, +el.getAttribute('data-target')); });
        obs.disconnect();
      }
    });
  }, { threshold: 0.3 });

  els.forEach(function (el) { obs.observe(el); });
}

/* ═══════════ STICKY ═══════════ */
function initSticky() {
  var sticky = document.getElementById('sticky');
  var formBox = document.getElementById('formBox');
  var btn = document.getElementById('stickyBtn');
  if (!sticky || !formBox) return;

  var obs = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (window.innerWidth <= 768) {
        sticky.classList.toggle('sticky--show', !en.isIntersecting);
      }
    });
  }, { threshold: 0.05 });

  obs.observe(formBox);

  if (btn) {
    btn.addEventListener('click', function () {
      formBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  }

  window.addEventListener('resize', function () {
    if (window.innerWidth > 768) sticky.classList.remove('sticky--show');
  });
}

/* ═══════════ VIDEOS ═══════════ */
function initVideos() {
  document.querySelectorAll('.vc').forEach(function (card) {
    var v = card.querySelector('video');
    var b = card.querySelector('.vc__play');
    if (!v || !b) return;

    function offOthers() {
      document.querySelectorAll('.vc').forEach(function (c) {
        if (c === card) return;
        var ov = c.querySelector('video');
        var ob = c.querySelector('.vc__play');
        if (ov && !ov.paused) { ov.pause(); if (ob) ob.classList.remove('vc__play--hidden'); }
      });
    }

    function play() { offOthers(); v.play(); b.classList.add('vc__play--hidden'); }
    function pause() { v.pause(); b.classList.remove('vc__play--hidden'); }

    b.addEventListener('click', function () { v.paused ? play() : pause(); });
    v.addEventListener('click', function () { v.paused ? play() : pause(); });
    v.addEventListener('ended', function () { b.classList.remove('vc__play--hidden'); });
  });
}
