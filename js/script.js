document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger);

    // 1. CURSOR PERSONALIZADO Y MAGNÉTICO
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorCircle = document.querySelector('.cursor-circle');
    const magneticLinks = document.querySelectorAll('.magnetic-link');

    document.addEventListener('mousemove', (e) => {
        // Dot sigue instantáneamente
        gsap.to(cursorDot, { x: e.clientX, y: e.clientY, duration: 0 });
        // Círculo sigue con delay (efecto fluido)
        gsap.to(cursorCircle, { x: e.clientX - 20, y: e.clientY - 20, duration: 0.15 });
    });

    // Efecto Magnético en enlaces
    magneticLinks.forEach(link => {
        link.addEventListener('mousemove', (e) => {
            const rect = link.getBoundingClientRect();
            // Calculamos la distancia del mouse al centro del elemento
            const x = e.clientX - (rect.left + rect.width / 2);
            const y = e.clientY - (rect.top + rect.height / 2);

            // Movemos el elemento ligeramente hacia el mouse
            gsap.to(link, { x: x * 0.3, y: y * 0.3, duration: 0.3 });
            // Hacemos el cursor más grande
            gsap.to(cursorCircle, { scale: 1.5, borderColor: 'transparent', background: 'rgba(255,255,255,0.1)', duration: 0.3 });
        });

        link.addEventListener('mouseleave', () => {
            gsap.to(link, { x: 0, y: 0, duration: 0.3 }); // Reset posición
            gsap.to(cursorCircle, { scale: 1, borderColor: 'var(--text)', background: 'transparent', duration: 0.3 });
        });
    });

    // 2. HERO ANIMATION (Reveal)
    const tl = gsap.timeline();
    tl.from('.giant-text div', {
        y: 100,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: 'power4.out'
    })
    .from('.hero-sub', { opacity: 0, y: 20, duration: 0.8 }, '-=0.5');

    // 3. PARALLAX IMAGES
    // Movemos la imagen dentro de su contenedor al hacer scroll
    document.querySelectorAll('.parallax-img-container').forEach(container => {
        const img = container.querySelector('img');
        
        gsap.to(img, {
            y: '-20%', // La imagen sube mientras el usuario baja
            ease: 'none',
            scrollTrigger: {
                trigger: container,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true
            }
        });
    });

    // 4. MARQUEE INFINITO
    gsap.to('.marquee-content', {
        xPercent: -50,
        ease: 'none',
        duration: 20,
        repeat: -1
    });

    // 5. Theme Toggle
    const toggle = document.getElementById('theme-switch');
    toggle.addEventListener('change', () => {
        document.body.classList.toggle('light-mode');
    });
});



    
