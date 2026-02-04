/* ============================================
   OWA Landing — JS
   ============================================ */


// Phone formatting
function initPhone() {
    document.querySelectorAll('input[type="tel"]').forEach(inp => {
        inp.addEventListener("input", e => {
            let v = e.target.value.replace(/\D/g, "").slice(0, 9);
            let f = "";
            if (v.length > 0) f += v.slice(0, 2);
            if (v.length > 2) f += " " + v.slice(2, 5);
            if (v.length > 5) f += " " + v.slice(5, 7);
            if (v.length > 7) f += " " + v.slice(7, 9);
            e.target.value = f;
        });
    });
}

// Form
function initForm() {
    const form = document.getElementById("heroForm");
    const success = document.getElementById("formSuccess");
    if (!form) return;

    function submit() {
        let ok = true;
        const name = form.querySelector('[name="fullname"]');
        const phone = form.querySelector('[name="phone"]');

        const ng = name.closest(".form__group");
        if (!name.value.trim() || name.value.trim().length < 2) {
            ng.classList.add("form__group--error"); ok = false;
        } else ng.classList.remove("form__group--error");

        const pg = phone.closest(".form__group");
        const digits = phone.value.replace(/\D/g, "");
        if (digits.length < 9) {
            pg.classList.add("form__group--error"); ok = false;
        } else pg.classList.remove("form__group--error");

        if (!ok) return;

        const btn = form.querySelector("button[type=submit]");
        btn.classList.add("form__btn--loading");
        btn.classList.remove("form__btn--pulse");
        btn.disabled = true;

        console.log("Lead:", {
            fullname: name.value.trim(),
            phone: "+998" + digits,
            source: "meta_ads_kompyuter_savodxonligi",
            ts: new Date().toISOString()
        });

        setTimeout(() => {
            form.style.display = "none";
            success.style.display = "block";
            success.style.animation = "fadeIn .4s ease";
            const sticky = document.getElementById("stickyBtn");
            if (sticky) sticky.classList.remove("sticky-btn--show");
        }, 600);
    }

    form.addEventListener("submit", e => { e.preventDefault(); submit(); });

    // Sticky button triggers form submit
    const stickySubmit = document.getElementById("stickySubmit");
    if (stickySubmit) {
        stickySubmit.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
            setTimeout(submit, 400);
        });
    }

    form.querySelectorAll("input, select").forEach(inp => {
        inp.addEventListener("input", () => {
            inp.closest(".form__group")?.classList.remove("form__group--error");
        });
        inp.addEventListener("change", () => {
            inp.closest(".form__group")?.classList.remove("form__group--error");
        });
    });
}

// Counters
function initCounters() {
    const nums = document.querySelectorAll(".stats__num[data-target]");
    let done = false;
    function go() {
        if (done) return;
        const sec = document.getElementById("stats");
        if (!sec || sec.getBoundingClientRect().top > innerHeight * 0.9) return;
        done = true;
        nums.forEach(el => {
            const target = +el.dataset.target;
            const dur = 1600;
            const start = performance.now();
            (function tick(now) {
                const p = Math.min((now - start) / dur, 1);
                const ease = 1 - Math.pow(1 - p, 3);
                el.textContent = Math.round(ease * target).toLocaleString();
                if (p < 1) requestAnimationFrame(tick);
            })(start);
        });
    }
    window.addEventListener("scroll", go, { passive: true });
    go();
}

// Fade-in on load
function initFadeIn() {
    const els = document.querySelectorAll(".anim-fade");
    els.forEach((el, i) => {
        setTimeout(() => el.classList.add("anim-fade--show"), 100 + i * 150);
    });
}

// Sticky mobile button
function initSticky() {
    const sticky = document.getElementById("stickyBtn");
    const formBtn = document.getElementById("submitBtn");
    if (!sticky || !formBtn) return;

    function check() {
        const rect = formBtn.getBoundingClientRect();
        const hidden = rect.bottom < 0 || rect.top > innerHeight;
        sticky.classList.toggle("sticky-btn--show", hidden);
    }
    window.addEventListener("scroll", check, { passive: true });
    check();
}

document.addEventListener("DOMContentLoaded", () => {
    initPhone();
    initForm();
    initCounters();
    initFadeIn();
    initSticky();
});
