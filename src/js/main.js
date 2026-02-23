import '../scss/style.scss';
import { initNavigation } from './navigation.js';
import { initAnimations } from './utils.js';

document.addEventListener('DOMContentLoaded', () => {
    console.log('Legal Advise website loaded successfully.');

    // Initialize interactive JS logic
    initNavigation();
    initAnimations();
});
