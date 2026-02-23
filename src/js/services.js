// =========================================================
// services.js — Service drawer: data + open/close logic
// Triggered by clicking any .image-card[data-service]
// =========================================================

const SERVICES = {
    mercantil: {
        title: 'Litigio Mercantil y Civil',
        subtitle: 'Recuperación de Cartera Vencida, Judicial o Extrajudicial',
        intro: 'Ofrecemos el servicio legal para la recuperación de cartera vencida judicial de contratos mercantiles y civiles, arrendamientos, créditos y fideicomisos.',
        body: `
            <p>Para la recuperación de los créditos antes mencionados se patrocinan juicios del orden civil, como el ordinario civil, ejecutivo civil y especial hipotecario; asimismo, juicios del orden mercantil, tales como el ordinario, ejecutivo, especial mercantil, prenda sin transmisión de posesión, oral mercantil y ejecución de fideicomisos en garantía y fianzas.</p>
            <p>Igualmente patrocinamos providencias precautorias y medios preparatorios a juicio ejecutivo mercantil.</p>
            <p>Así mismo, llevamos a cabo interpelaciones y requerimientos ante fedatario público, previo a un juicio, con el fin de lograr de manera ágil y eficaz una negociación con el deudor.</p>
        `,
        items: []
    },
    administrativo: {
        title: 'Litigio Administrativo',
        subtitle: 'Litigio en Derecho Administrativo',
        intro: 'Asesoramos el cumplimiento de las obligaciones que las diversas leyes de carácter administrativo (federales, locales o municipales) imponen a los particulares, así como su defensa en contra de cualquier acto de las autoridades administrativas que vulneren o restrinjan sus derechos.',
        body: '',
        items: [
            'Concesiones, autorizaciones, licencias y permisos mercantiles.',
            'Contratos con entidades gubernamentales y organismos descentralizados y desconcentrados.',
            'Licitaciones, invitaciones y adjudicaciones directas, tanto federales como estatales.',
            'Inconformidades en procedimientos de adjudicaciones y obras públicas, fallos y licitaciones.',
            'Procedimientos administrativos ante la autoridad, ya sea en forma de juicio o contra actos de carácter administrativo.',
            'Juicios de nulidad ante tribunales administrativos estatales, en materia de leyes estatales y municipales.',
            'Juicios de Amparo contra leyes.',
            'Visitas de verificación, requerimientos de información y sanciones.'
        ]
    },
    amparo: {
        title: 'Litigio Constitucional y Amparo',
        subtitle: 'Litigio Constitucional y Juicio de Amparo',
        intro: 'El Control Constitucional es el fundamento para que los estados democráticos puedan establecer en forma equilibrada mecanismos para resolver controversias entre los diversos órganos de poder; lo cual incluye que las facultades de creación de la norma, por parte del Poder Legislativo, se encuentren dentro de los lineamientos constitucionales.',
        body: '',
        items: [
            'Juicios de amparos en todas las materias: civil, mercantil, administrativo y fiscal.',
            'Acciones de inconstitucionalidad.',
            'Controversias constitucionales.'
        ]
    },
    fiscal: {
        title: 'Materia Fiscal',
        subtitle: 'Planeación, Litigio e Interacción en Materia Fiscal',
        intro: 'Dentro de los modelos, planes o esquemas de negocios, debe existir el apego a las diversas disposiciones fiscales y hacendarias nacionales sin que esto afecte la competitividad y eficiencia; por ello nuestra firma legal busca en todo momento que nuestros clientes cumplan con sus obligaciones tributarias de manera puntual, pero maximizando la eficiencia fiscal que permita el marco normativo.',
        body: '',
        items: [
            'Promoción y seguimiento de medios de defensa ante actos de autoridad, contra determinación y cobro de créditos fiscales.',
            'Gestoría de trámites y servicios respecto de obligaciones a cargo del contribuyente.',
            'Atención y desahogo a requerimientos formulados por la autoridad hacendaria (cualquier acto de auditoría, recaudación y aduanas).',
            'Asesoría para una cordial y eficaz relación fisco-contribuyente.'
        ]
    },
    corporativo: {
        title: 'Asesoría Corporativa',
        subtitle: 'Asesoría en Materia de Derecho Corporativo',
        intro: 'Dentro de este rubro, la firma ofrece una amplia gama de servicios enfocados en las necesidades de cada cliente y en las actividades propias de su objeto social.',
        body: `<p>En coordinación con todas las áreas del despacho, preparamos y negociamos toda clase de contratos para coinversión o establecimiento de la sociedad o su reestructura. Además de mantener los libros y registros corporativos al día, nos aseguramos de que nuestros clientes cumplan con todas sus obligaciones societarias.</p>`,
        items: [
            'Elaboración de contratos (civiles, mercantiles, fideicomisos, bursatilizaciones, factoraje financiero).',
            'Convenios de reconocimiento de adeudo con garantía prendaria y contratos de prenda sin transmisión de posesión.',
            'Constitución, disolución y liquidación de sociedades y asociaciones.',
            'Transformaciones, escisiones y fusiones.',
            'Planeación de inversiones a través de sociedades controladoras.',
            'Reestructuras corporativas y Gobierno Corporativo.',
            'Planeación y negociación de coinversiones y contratos entre accionistas.',
            'Inversión Extranjera, Financiero y Bancario.',
            'Régimen Inmobiliario.'
        ]
    },
    callcenter: {
        title: 'Servicios de Call Center',
        subtitle: 'Cobranza Extrajudicial Masiva',
        intro: 'Gestionamos de manera eficiente y profesional la cobranza extrajudicial masiva a través de nuestra división especializada en servicios de Call Center.',
        body: `
            <p>Sabemos que la liquidez es fundamental para el éxito de cualquier compañía, y que casi todas ellas, en algún momento, presentan dificultades en la recuperación de adeudos. Nuestro equipo especializado maximiza la recuperación generando relaciones comerciales duraderas.</p>
            <p>Para mayor información sobre este servicio, visita nuestra página especializada:</p>
            <a href="https://www.la-cc.com.mx" target="_blank" rel="noopener" class="service-drawer__ext-link">
                www.la-cc.com.mx
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
            </a>
        `,
        items: []
    }
};

// ── Build drawer HTML ─────────────────────────────────────
function buildDrawerContent(service) {
    const data = SERVICES[service];
    if (!data) return;

    document.getElementById('drawerTitle').textContent = data.title;
    document.getElementById('drawerSubtitle').textContent = data.subtitle;
    document.getElementById('drawerIntro').textContent = data.intro;

    const bodyEl = document.getElementById('drawerBody');
    bodyEl.innerHTML = data.body || '';

    const listEl = document.getElementById('drawerList');
    if (data.items.length > 0) {
        listEl.innerHTML = data.items
            .map(item => `<li>${item}</li>`)
            .join('');
        listEl.style.display = '';
    } else {
        listEl.innerHTML = '';
        listEl.style.display = 'none';
    }
}

// ── Open / Close ──────────────────────────────────────────
function openDrawer(service) {
    buildDrawerContent(service);
    const drawer = document.getElementById('serviceDrawer');
    const backdrop = document.getElementById('drawerBackdrop');
    drawer.classList.add('open');
    backdrop.classList.add('open');
    document.body.style.overflow = 'hidden';

    // Focus trap: focus the close button
    drawer.querySelector('.service-drawer__close').focus();
}

function closeDrawer() {
    const drawer = document.getElementById('serviceDrawer');
    const backdrop = document.getElementById('drawerBackdrop');
    drawer.classList.remove('open');
    backdrop.classList.remove('open');
    document.body.style.overflow = '';
}

// ── Init ──────────────────────────────────────────────────
export function initServiceDrawer() {
    // Cards → open drawer on click
    document.querySelectorAll('.image-card[data-service]').forEach(card => {
        // Replace the existing CTA button behavior
        const btn = card.querySelector('.btn-service-detail');
        if (btn) {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                openDrawer(card.dataset.service);
            });
        }
        // Also allow clicking the whole card
        card.addEventListener('click', (e) => {
            if (!e.target.closest('a[href="#contacto"]')) {
                openDrawer(card.dataset.service);
            }
        });
    });

    // Close button
    document.getElementById('drawerClose')?.addEventListener('click', closeDrawer);

    // Backdrop click
    document.getElementById('drawerBackdrop')?.addEventListener('click', closeDrawer);

    // ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeDrawer();
    });
}
