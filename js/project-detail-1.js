document.addEventListener('DOMContentLoaded', function() {
    // Obtener ID del proyecto de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const projectId = urlParams.get('id');
    
    // Datos de los proyectos (deberías mover esto a un archivo JSON separado)
    const projectsData = {
        "project-1": {
            title: "Modern E-commerce Platform",
            category: "Web Design & Development",
            description: "Desarrollo de una plataforma de e-commerce completa con carrito de compras, pasarela de pagos y panel de administración. Implementé soluciones personalizadas para manejar alto tráfico durante temporadas de rebajas.",
            technologies: ["React", "Node.js", "MongoDB", "Stripe"],
            images: [
                "assets/images/project-1-1.jpg",
                "assets/images/project-1-2.jpg",
                "assets/images/project-1-3.jpg"
            ],
            link: "https://ejemplo.com"
        },
        "project-2": {
            title: "Sistema de control de accesos",
            category: "Asociación del Fútbol Argentino",
            description: "Sistema para gestión de accesos en estadios con identificación por QR y control en tiempo real. Integración con bases de datos existentes y generación de reportes automáticos.",
            technologies: ["Python", "Django", "PostgreSQL", "QR Generation"],
            images: [
                "assets/images/project-2-1.jpg",
                "assets/images/project-2-2.jpg"
            ],
            link: "https://ejemplo2.com"
        }
    };
    
    // Cargar datos del proyecto
    const project = projectsData[projectId] || projectsData['project-1'];
    
    // Actualizar el DOM con los datos del proyecto
    document.title = `${project.title} | Maximo Hidalgo`;
    document.querySelector('.project-title').textContent = project.title;
    document.querySelector('.project-category').textContent = project.category;
    document.querySelector('.project-description').innerHTML = `<p>${project.description}</p>`;
    document.querySelector('.project-link').href = project.link;
    
    // Cargar tecnologías
    const techContainer = document.querySelector('.tech-tags');
    techContainer.innerHTML = project.technologies.map(tech => 
        `<span>${tech}</span>`
    ).join('');
    
    // Cargar imágenes
    const gallery = document.querySelector('.project-gallery');
    gallery.innerHTML = project.images.map((img, index) => 
        `<img src="${img}" alt="${project.title} ${index + 1}" loading="${index > 0 ? 'lazy' : 'eager'}">`
    ).join('');
    
    // Animación de entrada
    gsap.from('.project-detail > *', {
        opacity: 0,
        y: 20,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        delay: 0.3
    });
});