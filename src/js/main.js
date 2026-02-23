import '../scss/style.scss';
import { initNavigation } from './navigation.js';
import { initAnimations } from './utils.js';
import { initSlider } from './slider.js';

function init() {
    console.log('Legal Advise website loaded successfully.');
    // Initialize interactive JS logic
    initNavigation();
    initAnimations();
    initSlider();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
