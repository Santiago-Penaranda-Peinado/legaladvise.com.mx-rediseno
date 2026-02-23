// =========================================================
// slider.js — Hero split-screen carousel
// Rotates both the right-panel images AND the left-panel content blocks
// =========================================================
export function initSlider() {
    const slideImages = document.querySelectorAll('.hero__slide-image');
    const contentBlocks = document.querySelectorAll('.hero__content');
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
        // Deactivate current
        slideImages[currentSlide].classList.remove('active');
        dots[currentSlide].classList.remove('active');
        if (contentBlocks[currentSlide]) contentBlocks[currentSlide].classList.remove('active');

        currentSlide = (index + totalSlides) % totalSlides;

        // Activate new
        slideImages[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
        if (contentBlocks[currentSlide]) contentBlocks[currentSlide].classList.add('active');

        // Replay text animations
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.classList.remove('hero--animated');
            void hero.offsetWidth; // Force reflow
            hero.classList.add('hero--animated');
        }
    }

    // ── Arrow controls ────────────────────────────────────
    btnNext?.addEventListener('click', () => { goToSlide(currentSlide + 1); resetAutoPlay(); });
    btnPrev?.addEventListener('click', () => { goToSlide(currentSlide - 1); resetAutoPlay(); });

    // ── Autoplay ──────────────────────────────────────────
    function startAutoPlay() {
        autoPlayInterval = setInterval(() => goToSlide(currentSlide + 1), 6500);
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
        const THRESHOLD = 50;

        hero.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        hero.addEventListener('touchend', (e) => {
            const diff = touchStartX - e.changedTouches[0].screenX;
            if (Math.abs(diff) > THRESHOLD) {
                goToSlide(diff > 0 ? currentSlide + 1 : currentSlide - 1);
                resetAutoPlay();
            }
        }, { passive: true });
    }
}
