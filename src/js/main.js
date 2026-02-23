import '../scss/style.scss';
import { initNavigation } from './navigation.js';
import { initAnimations, initCounters } from './utils.js';
import { initSlider } from './slider.js';

// ── Preloader ─────────────────────────────────────────────
// Se muestra desde que el HTML existe; se elimina al disparar
// window.load (todas las imágenes y fuentes cargadas).
// Mínimo 300ms para evitar flash en conexiones ultra-rápidas.
function initPreloader() {
    const preloader = document.getElementById('preloader');
    if (!preloader) return;

    const MINIMUM_MS = 300;
    const startTime = performance.now();

    function dismiss() {
        const elapsed = performance.now() - startTime;
        const remaining = Math.max(0, MINIMUM_MS - elapsed);

        setTimeout(() => {
            preloader.classList.add('preloader--hidden');

            // Eliminar del DOM tras el fade-out (0.5s) para no bloquear clicks
            preloader.addEventListener('transitionend', () => {
                preloader.remove();
            }, { once: true });
        }, remaining);
    }

    if (document.readyState === 'complete') {
        dismiss(); // ya cargó antes de que este script corriera
    } else {
        window.addEventListener('load', dismiss, { once: true });
    }
}

function init() {
    initPreloader(); // primero, antes que cualquier otra cosa
    initNavigation();
    initAnimations();
    initCounters();
    initSlider();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
