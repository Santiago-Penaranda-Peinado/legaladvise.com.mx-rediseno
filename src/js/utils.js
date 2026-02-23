// utils.js
export function initAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    // Add elements to observe
    const animatableElements = document.querySelectorAll('.split-layout__image, .split-layout__content, .timeline-card, .image-card, .quote-block, .section-title, .office-location');

    animatableElements.forEach(el => {
        el.classList.add('pre-animate');
        observer.observe(el);
    });
}
