// Animaciones con GSAP
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);
    
    // Animación del hero
    const heroTimeline = gsap.timeline();
    heroTimeline
        .from('.title-line:first-child', {
            duration: 1.2,
            y: 100,
            opacity: 0,
            ease: 'power3.out',
            delay: 0.2
        })
        .from('.title-line:last-child', {
            duration: 1.2,
            y: 100,
            opacity: 0,
            ease: 'power3.out'
        }, '-=0.8')
        .from('.hero-subtitle', {
            duration: 1,
            y: 50,
            opacity: 0,
            ease: 'power2.out'
        }, '-=0.6')
        .from('.scroll-indicator', {
            duration: 0.8,
            opacity: 0,
            ease: 'power2.out'
        }, '-=0.4');
    
    // Animación de los proyectos
    gsap.utils.toArray('.project-card').forEach((card, index) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            delay: index * 0.1,
            ease: 'power2.out'
        });
    });
    
    // Animación de la sección about
    gsap.from('.about-grid', {
        scrollTrigger: {
            trigger: '.about',
            start: 'top 70%',
            toggleActions: 'play none none none'
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power2.out'
    });
    
    // Animación de las skills
    gsap.from('.skills-list li', {
        scrollTrigger: {
            trigger: '.skills',
            start: 'top 80%',
            toggleActions: 'play none none none'
        },
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out'
    });
    
    // Animación del contacto
    gsap.from('.contact-content > *', {
        scrollTrigger: {
            trigger: '.contact',
            start: 'top 70%',
            toggleActions: 'play none none none'
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power2.out'
    });
});


gsap.utils.toArray('.timeline-item').forEach((item, index) => {
    gsap.from(item, {
        scrollTrigger: {
            trigger: '.experience',
            start: 'top 70%',
            toggleActions: 'play none none none'
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        delay: index * 0.15,
        ease: 'power2.out'
    });
});

// Animación de las tarjetas de educación
gsap.utils.toArray('.education-card').forEach((card, index) => {
    gsap.from(card, {
        scrollTrigger: {
            trigger: '.education',
            start: 'top 70%',
            toggleActions: 'play none none none'
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        delay: index * 0.2,
        ease: 'power2.out'
    });
});

// Animación de las certificaciones
gsap.utils.toArray('.certification-card').forEach((card, index) => {
    gsap.from(card, {
        scrollTrigger: {
            trigger: '.certifications',
            start: 'top 70%',
            toggleActions: 'play none none none'
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        delay: index * 0.1,
        ease: 'power2.out'
    });
});

