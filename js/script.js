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
        const theme = savedTheme || (prefersLight ? 'light' : 'dark');
        applyTheme(theme);

        const toggle = document.getElementById('theme-switch');
        if (!toggle) return;

        toggle.checked = theme === 'light';
        toggle.addEventListener('change', () => {
            const next = toggle.checked ? 'light' : 'dark';
            applyTheme(next);
            try {
                localStorage.setItem(THEME_KEY, next);
            } catch (e) { /* sin persistencia, pero el toggle funciona igual */ }
        });
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

    /* ---------- Animaciones de scroll ---------- */
    const initAnimations = () => {
        gsap.registerPlugin(ScrollTrigger);

        // Hero
        if (document.querySelector('.giant-text')) {
            gsap.timeline()
                .from('.giant-text div', {
                    y: 100, opacity: 0, duration: 1.2, stagger: 0.2, ease: 'power4.out'
                })
                .from('.hero-sub', { opacity: 0, y: 20, duration: 0.8 }, '-=0.5');
        }

        // Parallax de imágenes de proyecto
        document.querySelectorAll('.parallax-img-container').forEach((container) => {
            const img = container.querySelector('img');
            if (!img) return;

            gsap.to(img, {
                y: '-20%',
                ease: 'none',
                scrollTrigger: { trigger: container, start: 'top bottom', end: 'bottom top', scrub: true }
            });
        });

        // Marquee infinito
        if (document.querySelector('.marquee-content')) {
            gsap.to('.marquee-content', { xPercent: -50, ease: 'none', duration: 20, repeat: -1 });
        }
    };

    /* ---------- Arranque ---------- */
    document.addEventListener('DOMContentLoaded', () => {
        initTheme();
        initMobileNav();

        // GSAP se carga por CDN: si falla, el sitio tiene que seguir siendo
        // legible en vez de romperse entero.
        if (typeof gsap === 'undefined') return;

        if (finePointer && !reduceMotion) initCursor();
        if (!reduceMotion && typeof ScrollTrigger !== 'undefined') initAnimations();
    });
})();
