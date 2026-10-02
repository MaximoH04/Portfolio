/* ===============================================================
   Portfolio — Máximo Hidalgo
   Animaciones e interacciones (GSAP + ScrollTrigger)

   Dos condiciones gobiernan todo lo de acá:
   - reduceMotion: el usuario pidió movimiento reducido en el SO.
     No montamos ninguna animación; el contenido queda visible y quieto.
   - finePointer: hay un mouse real. El cursor custom y el efecto
     magnético no tienen sentido en touch.
   =============================================================== */

(() => {
    'use strict';

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    /* ---------- Tema claro / oscuro ---------- */
    // Se aplica antes del DOMContentLoaded para evitar un flash del tema
    // anterior, y se recuerda entre visitas.
    const THEME_KEY = 'mh-theme';

    const applyTheme = (theme) => {
        document.body.classList.toggle('light-mode', theme === 'light');
    };

    let savedTheme = null;
    try {
        savedTheme = localStorage.getItem(THEME_KEY);
    } catch (e) {
        // localStorage puede fallar en modo privado: seguimos con el default.
    }

    const initTheme = () => {
        const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
        let theme = savedTheme || (prefersLight ? 'light' : 'dark');
        applyTheme(theme);

        const toggle = document.getElementById('theme-toggle');
        if (!toggle) return;

        const label = toggle.querySelector('.visually-hidden');

        // role="switch": aria-checked indica si el modo claro está puesto.
        // El nombre accesible dice a qué modo lleva el botón.
        const sync = () => {
            const light = theme === 'light';
            toggle.setAttribute('aria-checked', String(light));
            if (label) label.textContent = light ? 'Modo claro' : 'Modo oscuro';
        };
        sync();

        toggle.addEventListener('click', () => {
            theme = theme === 'light' ? 'dark' : 'light';
            applyTheme(theme);
            sync();
            try {
                localStorage.setItem(THEME_KEY, theme);
            } catch (e) { /* sin persistencia, pero el toggle funciona igual */ }
        });
    };

    /* ---------- Navbar: estado al scrollear + sección activa ---------- */
    const initNavbar = () => {
        const header = document.querySelector('.top-header');
        if (!header) return;

        // Estado compacto apenas se despega del tope.
        const marcarScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 40);
        marcarScroll();
        window.addEventListener('scroll', marcarScroll, { passive: true });

        // Resaltado de la sección visible. Sólo tiene sentido en la portada,
        // donde los enlaces del nav son anclas de esta misma página.
        const enlaces = [...document.querySelectorAll('.desktop-nav a[href^="#"]')];
        if (!enlaces.length || !('IntersectionObserver' in window)) return;

        const porId = new Map();
        const secciones = [];
        enlaces.forEach((a) => {
            const sec = document.querySelector(a.getAttribute('href'));
            if (sec) { porId.set(sec.id, a); secciones.push(sec); }
        });

        const visibles = new Set();
        const obs = new IntersectionObserver((entradas) => {
            entradas.forEach((e) => {
                if (e.isIntersecting) visibles.add(e.target.id);
                else visibles.delete(e.target.id);
            });

            // Si hay varias en pantalla, gana la que está más arriba.
            const activa = secciones.find((s) => visibles.has(s.id));
            enlaces.forEach((a) => a.classList.remove('is-active'));
            if (activa && porId.has(activa.id)) porId.get(activa.id).classList.add('is-active');
        }, { rootMargin: '-45% 0px -45% 0px' });

        secciones.forEach((s) => obs.observe(s));
    };

    /* ---------- Menú móvil ---------- */
    const initMobileNav = () => {
        const toggle = document.querySelector('.nav-toggle');
        const nav = document.getElementById('mobile-nav');
        if (!toggle || !nav) return;

        const label = toggle.querySelector('.visually-hidden');

        const setOpen = (open) => {
            nav.hidden = !open;
            toggle.setAttribute('aria-expanded', String(open));
            document.body.classList.toggle('nav-open', open);
            if (label) label.textContent = open ? 'Cerrar menú' : 'Abrir menú';
        };

        toggle.addEventListener('click', () => {
            setOpen(toggle.getAttribute('aria-expanded') !== 'true');
        });

        // Al elegir una sección cerramos el panel, si no tapa el destino.
        nav.querySelectorAll('a').forEach((link) => {
            link.addEventListener('click', () => setOpen(false));
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !nav.hidden) {
                setOpen(false);
                toggle.focus();
            }
        });
    };

    /* ---------- Filtros de la página de proyectos ---------- */
    const initFiltros = () => {
        const grid = document.getElementById('proyectos-grid');
        const botones = document.querySelectorAll('.filtro');
        if (!grid || !botones.length) return;

        const cards = Array.from(grid.querySelectorAll('.proyecto-card'));
        const vacio = document.getElementById('proyectos-vacio');

        // Los contadores salen del DOM, así que sumar un proyecto no obliga
        // a tocar los números a mano.
        document.querySelectorAll('[data-contador]').forEach((el) => {
            const tipo = el.dataset.contador;
            el.textContent = tipo === 'todos'
                ? cards.length
                : cards.filter((c) => c.dataset.tipo === tipo).length;
        });

        const aplicar = (tipo) => {
            let visibles = 0;
            cards.forEach((card) => {
                const mostrar = tipo === 'todos' || card.dataset.tipo === tipo;
                card.hidden = !mostrar;
                if (mostrar) visibles++;
            });

            botones.forEach((b) => {
                const activo = b.dataset.filtro === tipo;
                b.classList.toggle('is-active', activo);
                b.setAttribute('aria-pressed', String(activo));
            });

            if (vacio) vacio.hidden = visibles > 0;
        };

        botones.forEach((b) => b.addEventListener('click', () => aplicar(b.dataset.filtro)));
    };

    /* ---------- Cursor custom + efecto magnético ---------- */
    const initCursor = () => {
        const cursorDot = document.querySelector('.cursor-dot');
        const cursorCircle = document.querySelector('.cursor-circle');
        if (!cursorDot || !cursorCircle) return;

        document.addEventListener('mousemove', (e) => {
            gsap.set(cursorDot, { x: e.clientX, y: e.clientY });
            gsap.to(cursorCircle, { x: e.clientX - 20, y: e.clientY - 20, duration: 0.15 });
        });

        document.querySelectorAll('.magnetic-link').forEach((link) => {
            link.addEventListener('mousemove', (e) => {
                const rect = link.getBoundingClientRect();
                const x = e.clientX - (rect.left + rect.width / 2);
                const y = e.clientY - (rect.top + rect.height / 2);

                gsap.to(link, { x: x * 0.3, y: y * 0.3, duration: 0.3 });
                gsap.to(cursorCircle, {
                    scale: 1.5, borderColor: 'transparent',
                    background: 'rgba(255,255,255,0.1)', duration: 0.3
                });
            });

            link.addEventListener('mouseleave', () => {
                gsap.to(link, { x: 0, y: 0, duration: 0.3 });
                gsap.to(cursorCircle, {
                    scale: 1, borderColor: 'var(--text)',
                    background: 'transparent', duration: 0.3
                });
            });
        });
    };

    /* ---------- Animaciones de scroll ----------
       Todo usa gsap.from() a propósito: el estado final es el que está en
       el HTML/CSS, así que si el CDN de GSAP no carga el contenido se ve
       igual, sólo que sin animación. */
    const initAnimations = () => {
        gsap.registerPlugin(ScrollTrigger);

        const alEntrar = (trigger, extra = {}) => ({
            scrollTrigger: { trigger, start: 'top 85%', once: true, ...extra }
        });

        /* --- Hero: cada línea sube desde su máscara --- */
        const hero = document.querySelector('.giant-text');
        if (hero) {
            gsap.timeline({ defaults: { ease: 'power4.out' } })
                .from('.giant-text .linea > span', { yPercent: 115, duration: 1.1, stagger: 0.12 })
                .from('.hero-sub p', { opacity: 0, y: 24, duration: 0.8 }, '-=0.55')
                .from('.scroll-indicator', { opacity: 0, duration: 0.6 }, '-=0.4')
                .from('.top-header > *', { opacity: 0, y: -14, duration: 0.6, stagger: 0.08 }, '-=0.9');

            // El hero se desvanece y sube un poco mientras se va de pantalla.
            // Va sobre los elementos y no sobre .container-fluid: cualquier
            // transform ahí lo convierte en bloque contenedor y .hero-sub,
            // que es absolute, se despega del fondo de la sección.
            gsap.to('.giant-text, .hero-sub', {
                yPercent: -12, opacity: 0.25, ease: 'none',
                scrollTrigger: { trigger: '.hero-cinematic', start: 'top top', end: 'bottom top', scrub: true }
            });
        }

        /* --- Títulos de sección: índice y título entran escalonados --- */
        gsap.utils.toArray('.section-title').forEach((t) => {
            gsap.from(t.children, {
                y: 36, opacity: 0, duration: 0.9, stagger: 0.12, ease: 'power3.out',
                ...alEntrar(t)
            });
        });

        /* --- Bloques de contenido --- */
        const grupos = [
            ['.project-info > *', 0.07],
            ['.servicio', 0.1],
            ['.timeline-item', 0.12],
            ['.formacion > li', 0.07],
            ['.certs-list > li', 0.07],
            ['.skills-group', 0.1],
            ['.proyecto-card', 0.08],
            ['.caso-bloque > *', 0.08],
            ['.caso-ficha > div', 0.08],
            ['.caso-fotos figure', 0.12],
            ['.work-mas > *', 0.1],
            ['.servicios-cta > *', 0.1],
            ['.pagina-header > *', 0.1],
            ['.filtros > *', 0.06]
        ];

        grupos.forEach(([selector, stagger]) => {
            // Agrupamos por contenedor para que el escalonado sea por bloque
            // y no una sola cascada larguísima de toda la página.
            const items = gsap.utils.toArray(selector);
            if (!items.length) return;

            const porPadre = new Map();
            items.forEach((el) => {
                const p = el.parentElement;
                if (!porPadre.has(p)) porPadre.set(p, []);
                porPadre.get(p).push(el);
            });

            porPadre.forEach((hijos, padre) => {
                gsap.from(hijos, {
                    y: 28, opacity: 0, duration: 0.8, stagger, ease: 'power3.out',
                    ...alEntrar(padre, { start: 'top 88%' })
                });
            });
        });

        /* --- Imágenes de proyecto: se descubren de abajo hacia arriba --- */
        gsap.utils.toArray('.parallax-img-container, .caso-figura, .about-foto').forEach((cont) => {
            gsap.from(cont, {
                clipPath: 'inset(100% 0% 0% 0%)',
                duration: 1.2, ease: 'power3.inOut',
                ...alEntrar(cont, { start: 'top 88%' })
            });
        });

        /* --- Parallax dentro de la imagen ---
           El margen lo da el scale(1.12) del CSS: nos movemos dentro de
           ese 12% sin descubrir el fondo. */
        document.querySelectorAll('.parallax-img-container').forEach((container) => {
            const img = container.querySelector('img');
            if (!img) return;

            gsap.fromTo(img,
                { yPercent: -5 },
                {
                    yPercent: 5, ease: 'none',
                    scrollTrigger: { trigger: container, start: 'top bottom', end: 'bottom top', scrub: true }
                }
            );
        });

        /* --- La línea del timeline se dibuja al scrollear --- */
        const timeline = document.querySelector('.timeline');
        if (timeline) {
            gsap.from(timeline, {
                '--linea': '0%',
                ease: 'none',
                scrollTrigger: { trigger: timeline, start: 'top 75%', end: 'bottom 75%', scrub: 0.6 }
            });
        }

        /* --- Marquee infinito --- */
        if (document.querySelector('.marquee-content')) {
            gsap.to('.marquee-content', { xPercent: -50, ease: 'none', duration: 24, repeat: -1 });
        }

        /* --- Barra de progreso de lectura en la navbar --- */
        const barra = document.querySelector('.scroll-progress');
        if (barra) {
            gsap.to(barra, {
                scaleX: 1, ease: 'none', transformOrigin: 'left center',
                scrollTrigger: { start: 0, end: 'max', scrub: 0.3 }
            });
        }

        // Las imágenes diferidas cambian el alto de la página al cargar
        window.addEventListener('load', () => ScrollTrigger.refresh());
    };

    /* ---------- Arranque ---------- */
    document.addEventListener('DOMContentLoaded', () => {
        initTheme();
        initNavbar();
        initMobileNav();
        initFiltros();

        // GSAP se carga por CDN: si falla, el sitio tiene que seguir siendo
        // legible en vez de romperse entero.
        if (typeof gsap === 'undefined') return;

        if (finePointer && !reduceMotion) initCursor();
        if (!reduceMotion && typeof ScrollTrigger !== 'undefined') initAnimations();
    });
})();
