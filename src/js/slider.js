// slider.js
export function initSlider() {
    const slides = document.querySelectorAll('.hero__slide');
    const btnNext = document.querySelector('.hero__nav--next');
    const btnPrev = document.querySelector('.hero__nav--prev');
    const indicatorsContainer = document.querySelector('.hero__indicators');

    if (slides.length === 0) return;

    let currentSlide = 0;
    const totalSlides = slides.length;
    let autoPlayInterval;

    // Create indicators
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');

        dot.addEventListener('click', () => {
            goToSlide(index);
            resetAutoPlay();
        });

        indicatorsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.dot');

    function updateIndicators() {
        dots.forEach(dot => dot.classList.remove('active'));
        dots[currentSlide].classList.add('active');
    }

    function goToSlide(index) {
        slides[currentSlide].classList.remove('active');
        currentSlide = (index + totalSlides) % totalSlides;
        slides[currentSlide].classList.add('active');
        updateIndicators();
    }

    function nextSlide() {
        goToSlide(currentSlide + 1);
    }

    function prevSlide() {
        goToSlide(currentSlide - 1);
    }

    // Event Listeners
    if (btnNext) {
        btnNext.addEventListener('click', () => {
            nextSlide();
            resetAutoPlay();
        });
    }

    if (btnPrev) {
        btnPrev.addEventListener('click', () => {
            prevSlide();
            resetAutoPlay();
        });
    }

    // Auto Play
    function startAutoPlay() {
        autoPlayInterval = setInterval(nextSlide, 5000); // 5 seconds per slide
    }

    function resetAutoPlay() {
        clearInterval(autoPlayInterval);
        startAutoPlay();
    }

    // Initialize Auto Play
    startAutoPlay();
}
