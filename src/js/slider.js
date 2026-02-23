// =========================================================
// slider.js — New hero split-screen carousel
// Operates on hero__slide-image elements (right panel)
// + dot indicators + swipe support
// =========================================================
export function initSlider() {
    const slideImages = document.querySelectorAll('.hero__slide-image');
    const btnNext = document.querySelector('.hero__nav--next');
    const btnPrev = document.querySelector('.hero__nav--prev');
    const indicatorsContainer = document.getElementById('heroIndicators');

    if (slideImages.length === 0) return;

    let currentSlide = 0;
    const totalSlides = slideImages.length;
    let autoPlayInterval;

    // ── Create dot indicators ─────────────────────────────
    slideImages.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => { goToSlide(index); resetAutoPlay(); });
        indicatorsContainer.appendChild(dot);
    });

    const dots = indicatorsContainer.querySelectorAll('.dot');

    // ── Core: go to slide ─────────────────────────────────
    function goToSlide(index) {
        // Remove active from current slide image
        slideImages[currentSlide].classList.remove('active');
        dots[currentSlide].classList.remove('active');

        currentSlide = (index + totalSlides) % totalSlides;

        // Apply active to new slide image (Ken Burns restarts via CSS animation)
        slideImages[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');

        // Replay text animation
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.classList.remove('hero--animated');
            // Force reflow to restart animation
            void hero.offsetWidth;
            hero.classList.add('hero--animated');
        }
    }

    // ── Arrow controls ────────────────────────────────────
    if (btnNext) {
        btnNext.addEventListener('click', () => {
            goToSlide(currentSlide + 1);
            resetAutoPlay();
        });
    }

    if (btnPrev) {
        btnPrev.addEventListener('click', () => {
            goToSlide(currentSlide - 1);
            resetAutoPlay();
        });
    }

    // ── Autoplay ──────────────────────────────────────────
    function startAutoPlay() {
        autoPlayInterval = setInterval(() => goToSlide(currentSlide + 1), 6000);
    }

    function resetAutoPlay() {
        clearInterval(autoPlayInterval);
        startAutoPlay();
    }

    startAutoPlay();

    // ── Touch / swipe support ─────────────────────────────
    const hero = document.querySelector('.hero');
    if (hero) {
        let touchStartX = 0;
        let touchEndX = 0;
        const SWIPE_THRESHOLD = 50;

        hero.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        hero.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            const diff = touchStartX - touchEndX;

            if (Math.abs(diff) > SWIPE_THRESHOLD) {
                if (diff > 0) {
                    goToSlide(currentSlide + 1); // swipe left → next
                } else {
                    goToSlide(currentSlide - 1); // swipe right → prev
                }
                resetAutoPlay();
            }
        }, { passive: true });
    }
}
