// =========================================================
// utils.js — Scroll animations + Counter animations
// =========================================================

// ── Scroll reveal (IntersectionObserver) ─────────────────
export function initAnimations() {
    const animatables = document.querySelectorAll('.pre-animate');
    if (animatables.length === 0) return;

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.12 }
    );

    animatables.forEach(el => observer.observe(el));
}

// ── Number Counter animation ──────────────────────────────
export function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    if (counters.length === 0) return;

    const easingFn = (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t; // ease in-out quad

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.5 }
    );

    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(el) {
    const target = parseInt(el.dataset.target, 10);
    const duration = 1800; // ms
    const start = performance.now();

    function update(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const value = Math.floor(progress * target);

        el.textContent = value.toLocaleString('es-MX');

        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            el.textContent = target.toLocaleString('es-MX');
        }
    }

    requestAnimationFrame(update);
}
