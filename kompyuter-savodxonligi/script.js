document.addEventListener('DOMContentLoaded', () => {
  initPhone();
  initForm();
  initCarousel();
  initCounters();
  initFadeIn();
  initSticky();
  initVideos();
});

/* ========== PHONE FORMATTING ========== */
function initPhone() {
  const phoneInput = document.getElementById('phone');
  if (!phoneInput) return;

  phoneInput.addEventListener('input', (e) => {
    let val = e.target.value.replace(/\D/g, '');
    if (val.length > 9) val = val.slice(0, 9);

    let formatted = '';
    if (val.length > 0) formatted = val.slice(0, 2);
    if (val.length > 2) formatted += ' ' + val.slice(2, 5);
    if (val.length > 5) formatted += ' ' + val.slice(5, 7);
    if (val.length > 7) formatted += ' ' + val.slice(7, 9);

    e.target.value = formatted;
  });

  phoneInput.addEventListener('keydown', (e) => {
    if (!/[\d\b]/.test(e.key) && !['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'].includes(e.key) && !e.ctrlKey && !e.metaKey) {
      e.preventDefault();
    }
  });
}

/* ========== FORM VALIDATION & SUBMIT ========== */
function initForm() {
  const form = document.getElementById('leadForm');
  if (!form) return;

  const nameInput = document.getElementById('fullname');
  const phoneInput = document.getElementById('phone');
  const nameError = document.getElementById('nameError');
  const phoneError = document.getElementById('phoneError');
  const formFields = document.getElementById('formFields');
  const formSuccess = document.getElementById('formSuccess');
  const submitBtn = form.querySelector('.form__btn');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;

    // Name validation
    if (nameInput.value.trim().length < 2) {
      nameInput.classList.add('form__input--error');
      nameError.classList.add('form__error--visible');
      valid = false;
    } else {
      nameInput.classList.remove('form__input--error');
      nameError.classList.remove('form__error--visible');
    }

    // Phone validation
    const digits = phoneInput.value.replace(/\D/g, '');
    if (digits.length < 9) {
      phoneInput.classList.add('form__input--error');
      phoneError.classList.add('form__error--visible');
      valid = false;
    } else {
      phoneInput.classList.remove('form__input--error');
      phoneError.classList.remove('form__error--visible');
    }

    if (!valid) return;

    // Disable button
    submitBtn.disabled = true;
    submitBtn.textContent = 'Yuborilmoqda...';

    const data = {
      fullname: nameInput.value.trim(),
      phone: '+998' + digits,
      source: 'meta_ads_instagram',
      ts: new Date().toISOString()
    };

    console.log('Form submitted:', data);

    // Show success
    setTimeout(() => {
      formFields.style.display = 'none';
      formSuccess.classList.add('form__success--visible');
    }, 600);
  });

  // Clear errors on input
  nameInput.addEventListener('input', () => {
    nameInput.classList.remove('form__input--error');
    nameError.classList.remove('form__error--visible');
  });

  phoneInput.addEventListener('input', () => {
    phoneInput.classList.remove('form__input--error');
    phoneError.classList.remove('form__error--visible');
  });
}

/* ========== CAROUSEL ========== */
function initCarousel() {
  const track = document.querySelector('.carousel__track');
  const dots = document.querySelectorAll('.carousel__dot');
  if (!track || dots.length === 0) return;

  const slides = track.querySelectorAll('.carousel__slide');
  let current = 0;
  let autoTimer;
  let startX = 0;
  let isDragging = false;

  function goTo(index) {
    current = (index + slides.length) % slides.length;
    track.style.transform = `translateX(-${current * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle('carousel__dot--active', i === current));
  }

  function startAuto() {
    stopAuto();
    autoTimer = setInterval(() => goTo(current + 1), 4000);
  }

  function stopAuto() {
    clearInterval(autoTimer);
  }

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      goTo(i);
      startAuto();
    });
  });

  // Touch support
  track.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    isDragging = true;
    stopAuto();
  }, { passive: true });

  track.addEventListener('touchend', (e) => {
    if (!isDragging) return;
    const diff = startX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      goTo(diff > 0 ? current + 1 : current - 1);
    }
    isDragging = false;
    startAuto();
  }, { passive: true });

  goTo(0);
  startAuto();
}

/* ========== ANIMATED COUNTERS ========== */
function initCounters() {
  const cards = document.querySelectorAll('.stat-card');
  if (cards.length === 0) return;

  let animated = false;

  function animateValue(el, target, duration) {
    const start = performance.now();
    function update(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4); // easeOutQuart
      el.textContent = Math.floor(eased * target);
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        cards.forEach(card => {
          const valueEl = card.querySelector('.stat-card__value');
          const target = parseInt(valueEl.dataset.target, 10);
          animateValue(valueEl, target, 1600);
        });
        observer.disconnect();
      }
    });
  }, { threshold: 0.3 });

  cards.forEach(card => observer.observe(card));
}

/* ========== FADE-IN ANIMATION ========== */
function initFadeIn() {
  const els = document.querySelectorAll('.fade-in');
  if (els.length === 0) return;

  els.forEach((el, i) => {
    setTimeout(() => {
      el.classList.add('fade-in--visible');
    }, i * 100);
  });
}

/* ========== STICKY MOBILE BUTTON ========== */
function initSticky() {
  const stickyBar = document.querySelector('.sticky-bar');
  const form = document.getElementById('leadForm');
  const stickyBtn = document.querySelector('.sticky-bar__btn');
  if (!stickyBar || !form) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (window.innerWidth <= 768) {
        stickyBar.classList.toggle('sticky-bar--visible', !entry.isIntersecting);
      }
    });
  }, { threshold: 0.1 });

  observer.observe(form);

  if (stickyBtn) {
    stickyBtn.addEventListener('click', () => {
      form.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  }

  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      stickyBar.classList.remove('sticky-bar--visible');
    }
  });
}

/* ========== VIDEO PLAY/PAUSE ========== */
function initVideos() {
  const cards = document.querySelectorAll('.tcard');
  if (cards.length === 0) return;

  cards.forEach(card => {
    const video = card.querySelector('.tcard__video');
    const playBtn = card.querySelector('.tcard__play');
    const overlay = card.querySelector('.tcard__overlay');
    if (!video || !playBtn) return;

    playBtn.addEventListener('click', () => {
      if (video.paused) {
        // Pause all other videos
        document.querySelectorAll('.tcard__video').forEach(v => {
          if (v !== video && !v.paused) {
            v.pause();
            v.closest('.tcard').querySelector('.tcard__play').classList.remove('tcard__play--hidden');
            const ov = v.closest('.tcard').querySelector('.tcard__overlay');
            if (ov) ov.classList.remove('tcard__overlay--hidden');
          }
        });
        video.play();
        playBtn.classList.add('tcard__play--hidden');
        if (overlay) overlay.classList.add('tcard__overlay--hidden');
      } else {
        video.pause();
        playBtn.classList.remove('tcard__play--hidden');
        if (overlay) overlay.classList.remove('tcard__overlay--hidden');
      }
    });

    video.addEventListener('click', () => {
      if (!video.paused) {
        video.pause();
        playBtn.classList.remove('tcard__play--hidden');
        if (overlay) overlay.classList.remove('tcard__overlay--hidden');
      }
    });

    video.addEventListener('ended', () => {
      playBtn.classList.remove('tcard__play--hidden');
      if (overlay) overlay.classList.remove('tcard__overlay--hidden');
    });
  });
}
