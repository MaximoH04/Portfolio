document.addEventListener('DOMContentLoaded', function() {

    window.addEventListener("load", function () {
            const loader = document.getElementById("loader");
            loader.classList.add("fade-out");

            // Opcional: eliminar el loader del DOM después de desvanecerse
            setTimeout(() => {
                loader.style.display = "none";
            }, 500); // tiempo en ms que coincide con el transition
        });
        
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');
    
    if (menuToggle && nav) {
        menuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            nav.classList.toggle('active');
            document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
        });
        
        // Cerrar menú al hacer clic en un enlace
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function() {
                menuToggle.classList.remove('active');
                nav.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // Cursor personalizado
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    const hoverElements = document.querySelectorAll('[data-cursor-hover]');
    const cursorTextElements = document.querySelectorAll('[data-cursor-text]');

    const isTouchDevice = () => {
    return (('ontouchstart' in window) ||
        (navigator.maxTouchPoints > 0) ||
        (navigator.msMaxTouchPoints > 0));
    };

        if (isTouchDevice()) {
        const cursor = document.querySelector('.cursor');
        const cursorFollower = document.querySelector('.cursor-follower');
        
        if (cursor) cursor.style.display = 'none';
        if (cursorFollower) cursorFollower.style.display = 'none';
        
        // Eliminar eventos hover para móviles
        document.querySelectorAll('[data-cursor-hover]').forEach(el => {
            el.style.cursor = 'pointer'; // Restaurar cursor normal
        });
    }

    if (cursor && cursorFollower) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            
            gsap.to(cursorFollower, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.6,
                ease: 'power2.out'
            });
        });
        
        // Efectos hover
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.classList.add('active');
                cursorFollower.classList.add('active');
            });
            
            el.addEventListener('mouseleave', () => {
                cursor.classList.remove('active');
                cursorFollower.classList.remove('active');
            });
        });
        
        // Efectos con texto
        cursorTextElements.forEach(el => {
            const text = el.getAttribute('data-cursor-text');
            
            el.addEventListener('mouseenter', () => {
                cursorFollower.innerHTML = `<span>${text}</span>`;
                cursorFollower.classList.add('text-active');
                cursorFollower.style.width = 'auto';
                cursorFollower.style.height = 'auto';
                cursorFollower.style.padding = '10px 20px';
                cursorFollower.style.borderRadius = '50px';
            });
            
            el.addEventListener('mouseleave', () => {
                cursorFollower.innerHTML = '';
                cursorFollower.classList.remove('text-active');
                cursorFollower.style.width = '40px';
                cursorFollower.style.height = '40px';
                cursorFollower.style.padding = '0';
                cursorFollower.style.borderRadius = '50%';
            });
        });
    }
    
    // Header scroll effect
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    

    
    // Función opcional para actualizar el cursor
    function updateCursorColor(color) {
        document.documentElement.style.setProperty('--cursor-color', color);
        document.documentElement.style.setProperty('--cursor-follower-border', color);
    }
    
    // Función opcional para animaciones específicas
    function updateAnimationsForTheme(theme) {
        // Configura animaciones según el tema
        // Ejemplo:
        const elements = document.querySelectorAll('[data-theme-animation]');
        elements.forEach(el => {
            if (theme === 'dark') {
                // Configuración para modo oscuro
                gsap.to(el, { /* parámetros de animación */ });
            } else {
                // Configuración para modo claro
                gsap.to(el, { /* parámetros de animación */ });
            }
        });
    }

    const themeSwitch = document.getElementById('switch');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

    // Establecer el modo por defecto según preferencia del sistema
    if (prefersDark) {
        document.body.classList.add('dark-mode');
    }

    themeSwitch.addEventListener('change', () => {
        document.body.classList.toggle('dark-mode');
    });

    const urlParams = new URLSearchParams(window.location.search);
    const enviado = urlParams.get('enviado');
    const popup = document.getElementById('form-popup');

    if (enviado === '1' && popup) {
        popup.classList.add('show');
        setTimeout(() => popup.classList.remove('show'), 4000);
}

});

    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Cerrar menú móvil si está abierto
                if (nav.classList.contains('active')) {
                    menuToggle.classList.remove('active');
                    nav.classList.remove('active');
                    document.body.style.overflow = '';
                }
            }
        });
    });
    
    // Back to top button
    const backToTop = document.querySelector('.back-to-top');
    
    if (backToTop) {
        backToTop.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Actualizar año en el footer
    const yearElement = document.querySelector('.current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }



    
