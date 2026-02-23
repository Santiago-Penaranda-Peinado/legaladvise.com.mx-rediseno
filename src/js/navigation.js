// =========================================================
// navigation.js — Header scroll + mobile menu + active links
// =========================================================
export function initNavigation() {
    const header = document.getElementById('main-header');
    const menuToggle = document.querySelector('.menu-toggle');
    const navList = document.querySelector('.nav__list');
    const navLinks = document.querySelectorAll('.nav__link');

    if (!header) return;

    // ── Sticky / scrolled header ──────────────────────────
    const handleScroll = () => {
        header.classList.toggle('scrolled', window.scrollY > 60);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Run on load

    // ── Mobile menu toggle ────────────────────────────────
    if (menuToggle && navList) {
        menuToggle.addEventListener('click', () => {
            const isOpen = menuToggle.classList.toggle('active');
            navList.classList.toggle('active', isOpen);
            menuToggle.setAttribute('aria-expanded', isOpen.toString());
            // Prevent body scroll when menu is open
            document.body.style.overflow = isOpen ? 'hidden' : '';
        });
    }

    // ── Close menu on nav link click + smooth scroll ──────
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');

            // Close mobile menu regardless of link type
            menuToggle?.classList.remove('active');
            navList?.classList.remove('active');
            menuToggle?.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';

            // External links (not starting with #) — let the browser handle them normally
            if (!href || !href.startsWith('#')) return;

            // Internal anchor: smooth scroll
            e.preventDefault();
            const targetSection = document.querySelector(href);
            if (targetSection) {
                const headerHeight = header.offsetHeight;
                const offsetPosition =
                    targetSection.getBoundingClientRect().top +
                    window.pageYOffset - headerHeight;

                window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
            }
        });
    });

    // ── Active nav link on scroll (IntersectionObserver) ──
    const sections = document.querySelectorAll('section[id], div[id]');

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const activeId = entry.target.id;
                    navLinks.forEach(link => {
                        const href = link.getAttribute('href');
                        link.classList.toggle('active', href === `#${activeId}`);
                    });
                }
            });
        },
        {
            rootMargin: '-30% 0px -60% 0px',
            threshold: 0
        }
    );

    sections.forEach(section => observer.observe(section));
}
