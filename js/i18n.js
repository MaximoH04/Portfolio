/* ===============================================================
   Traducción ES / EN

   Cómo funciona
   - El castellano vive en el HTML y es la versión por defecto. Si el
     JS no carga, el sitio se ve completo en castellano.
   - Este archivo guarda sólo el inglés. Al arrancar, cada elemento
     marcado cachea su contenido original, así que volver a castellano
     es restaurar el cache y no hace falta duplicar los textos.
   - El idioma se recuerda en localStorage y queda en la URL como
     ?lang=en, para que un enlace compartido abra en el mismo idioma.

   Cómo marcar contenido en el HTML
     data-i18n="clave"          traduce el contenido del elemento
     data-i18n-alt="clave"      traduce el alt de una imagen
     data-i18n-label="clave"    traduce el aria-label
     data-i18n-content="clave"  traduce el content de un <meta>
   =============================================================== */

(() => {
    'use strict';

    const CLAVE = 'mh-lang';
    const IDIOMAS = ['es', 'en'];

    const EN = {
        /* ---------- Navegación y pie, comunes a todas las páginas ---------- */
        'nav.proyectos': 'Work',
        'nav.experiencia': 'Experience',
        'nav.servicios': 'Services',
        'nav.formacion': 'Education &amp; skills',
        'nav.sobre': 'About',
        'nav.contacto': 'Contact',
        'nav.aria': 'Main navigation',
        'nav.aria.movil': 'Mobile navigation',
        'nav.abrir': 'Open menu',
        'nav.cerrar': 'Close menu',
        'skip': 'Skip to content',
        'tema.claro': 'Light mode',
        'tema.oscuro': 'Dark mode',
        'idioma.aria': 'Cambiar idioma a español',

        /* ---------- Portada: hero ---------- */
        'hero.sub': 'Web developer based in Buenos Aires. I build websites and custom systems: I sit down with the client to understand the need, propose a solution and then build it.',
        'hero.scroll': 'Scroll',
        'meta.title': 'Maximo Hidalgo | Web developer and custom systems',
        'meta.desc': 'Freelance web developer in Buenos Aires. I build websites, landing pages and custom systems for businesses: I map out the need, propose a solution and develop it.',

        /* ---------- Portada: proyectos ---------- */
        'work.titulo': 'Work',
        'work.badge': 'Featured project',
        'afa.cliente': 'Asociación del Fútbol Argentino (AFA)',
        'afa.titulo': 'DNI Access<br>Control',
        'afa.desc': 'A system that logs people entering the AFA offices by reading the PDF417 barcode on their ID card, with a history per visitor and export to Excel. I ran it on my own from end to end: requirements gathering at the client’s offices, functional analysis, proposal and development.',
        'afa.img.alt': 'Interface illustration: an ID document with a PDF417 barcode being scanned, next to a panel listing entries and exits',
        'altoque.meta': 'Mobile app',
        'altoque.badge': 'On hold',
        'altoque.desc': 'An app that connects clients with verified workers across different trades: general services, professional services and tool and equipment rental. It has identity verification, built-in chat, an SOS mode for emergencies and a ratings system.',
        'altoque.img.alt': 'Al Toque! home page, with the headline «Servicios al toque de un botón» and the app mockup on a phone',
        'btn.vercaso': 'View case',
        'work.mas': 'These two are the ones that best show how I work. There are more client sites, including portfolios, landing pages and company sites, on the projects page.',
        'work.vertodos': 'See all projects',

        /* ---------- Portada: experiencia ---------- */
        'exp.titulo': 'Experience',
        'exp.cormos.fecha': 'March 2026 to present',
        'exp.cormos.rol': 'Customer Success Analyst',
        'exp.cormos.org': 'Grupo Cormos · Healthcare software',
        'exp.cormos.desc': 'I work on client retention: I understand how they use the service, negotiate renewals and put together the reports used to follow each account.',
        'exp.nimat.fecha': 'January to June 2025 · Remote',
        'exp.nimat.rol': 'Administrative Assistant and Developer',
        'exp.nimat.desc': 'I designed and built the company website, and the access control system for the Asociación del Fútbol Argentino (AFA). Alongside that, client support, technical support and the monthly budget tracking.',
        'exp.free.fecha': 'Present',
        'exp.free.rol': 'Web developer and IT support',
        'exp.free.org': 'Freelance',
        'exp.free.desc': 'Websites for clients, from the first conversation to delivery. Also PC repair and software installation.',

        /* ---------- Portada: servicios ---------- */
        'serv.titulo': 'Services',
        'serv.intro': 'If you run a business and you are not sure what you need, that is fine: we start by talking about the problem and I propose how to solve it. No jargon.',
        'serv.1.tit': 'Websites and landing pages',
        'serv.1.desc': 'Your business online: a site that explains what you do, looks right on a phone and makes it easy for a client to get in touch.',
        'serv.2.tit': 'Custom systems',
        'serv.2.desc': 'For when what you need does not come ready made. For example: access control, internal records, spreadsheets that are filled in by hand today, or exporting data to Excel.',
        'serv.3.tit': 'Maintenance and IT support',
        'serv.3.desc': 'To keep what you already have running: changes and updates to your site, PC repair and software installation.',
        'serv.cta': 'Got something in mind?',
        'serv.cta.btn': 'Tell me about your project',

        /* ---------- Portada: formación y skills ---------- */
        'form.titulo': 'Education &amp; skills',
        'form.sub': 'Education',
        'form.davinci.fecha': 'August 2026 to present',
        'form.davinci.tit': 'Systems Analyst',
        'form.uade.fecha': '2023 to 2026',
        'form.uade.tit': 'BSc in Information Technology Management',
        'form.uade.nota': 'I studied through 2026 and continued my training as a Systems Analyst at Da Vinci.',
        'form.sec.fecha': '2017 to 2022',
        'form.sec.tit': 'High school diploma in Social Sciences',
        'form.sec.org': 'Colegio Secundario El Encuentro',
        'form.ingles.fecha': 'English · B2',
        'skills.sub': 'Skills',
        'skills.tecnicas': 'Technical',
        'skills.herramientas': 'Tools',
        'skills.blandas': 'Soft skills',
        'skills.gestion': 'Project management',
        'skills.comunicacion': 'Client communication',
        'skills.equipo': 'Teamwork',
        'skills.detalle': 'Attention to detail',
        'cert.sub': 'Certifications',
        'cert.ads.display': 'Google Ads Display',
        'cert.ads.search': 'Google Ads Search',
        'cert.pm': 'Foundations of Project Management',
        'cert.ap': 'Argentina Programa',
        'cert.ver': 'View credential',

        /* ---------- Portada: sobre mí ---------- */
        'about.titulo': 'About',
        'about.foto.alt': 'Portrait of Maximo Hidalgo',
        'about.p1': 'I am Maximo. I live in Buenos Aires, I study <span class="highlight">Systems Analysis</span> and I work as a web developer, with a focus on <span class="highlight">project management</span>.',
        'about.p2': 'What I am best at is not one particular technology: it is taking a project from end to end. I sit down with you to understand what you actually need, propose a solution and then build it. If something is not worth doing, I say so; if there is a simpler route, I say that too.',
        'about.p3': 'I try to explain everything in plain language. I think a client should understand what they are paying for and why, without having to take my word for it.',
        'about.p4': 'Away from the keyboard I am a musician: I sing, play guitar and write songs.',
        'about.cv': 'Download<br>CV',

        /* ---------- Portada: contacto ---------- */
        'contacto.eyebrow': '06 · Contact',
        'contacto.titulo': 'Let’s talk',
        'contacto.intro': 'Tell me what you need and I will come back with a concrete proposal. If it is easier for you, write to me on WhatsApp.',
        'contacto.copy': '© 2026 Maximo Hidalgo · Buenos Aires, Argentina',

        /* ---------- Página de proyectos ---------- */
        'proy.meta.title': 'Work | Maximo Hidalgo',
        'proy.meta.desc': 'All of Maximo Hidalgo’s projects: client websites, apps and custom systems for businesses. Buenos Aires, Argentina.',
        'proy.eyebrow': 'Work',
        'proy.titulo': 'Projects',
        'proy.lead': 'Client websites, apps and custom systems for businesses. The ones with a case page show how the work was done, not just the result.',
        'proy.filtros.aria': 'Filter projects by type',
        'proy.filtro.todos': 'All',
        'proy.filtro.web': 'Websites',
        'proy.filtro.apps': 'Apps',
        'proy.filtro.sistemas': 'Custom systems',
        'proy.vacio': 'No projects of that type yet.',
        'proy.cta.tit': 'Want one like this for your business?',
        'proy.cta.desc': 'Tell me what you need and I will come back with a concrete proposal.',
        'proy.cta.btn': 'Let’s talk',
        'card.afa.meta': 'Custom system · 2025',
        'card.afa.tit': 'DNI Access Control',
        'card.afa.desc': 'Logs people entering the offices by reading the PDF417 barcode on their ID card, with a history per visitor and export to Excel.',
        'card.eco.meta': 'Cultural site',
        'card.eco.desc': 'Bilingual site for an arts project about the impact of hydrocarbons on local territories. Background video, open calls and a carousel of productions.',
        'card.eco.alt': 'Proyecto ECO ECO home page, with a background video of a rhea in a landscape dotted with oil towers',
        'card.agus.meta': 'Professional portfolio',
        'card.agus.desc': 'Bilingual portfolio for a certified translator and medical interpreter, with a language switcher, dark mode and sections for services and background.',
        'card.agus.alt': 'Home page of Agustina Hidalgo’s portfolio, translator and medical interpreter',
        'card.altoque.desc': 'An app that connects clients with verified workers: general services, professional services and equipment rental.',
        'card.altoque.alt': 'Al Toque! home page, with the app mockup on a phone',
        'card.tomix.meta': 'Studio site',
        'card.tomix.desc': 'Site for a web development studio: services, a projects section and consultation booking.',
        'card.tomix.alt': 'Tomix Visuals home page, with the headline «Soluciones web rápidas para tu negocio»',
        'card.vp.meta': 'Company site',
        'card.vp.desc': 'Site for a company that produces corporate events, corporate gifts and artist management.',
        'card.vp.alt': 'VP Group home page, with the headline «Transformando eventos en experiencias inolvidables»',
        'card.bw.meta': 'Landing page',
        'card.bw.desc': 'English-language landing page for a Chicago clinic, with a countdown on the offer and a single goal: book the appointment.',
        'card.bw.alt': 'Better Weigh home page, a medical check-up and weight loss clinic in Chicago',
        'card.versitio': 'Visit site',

        /* ---------- Caso: AFA ---------- */
        'caso.volver': 'Back to projects',
        'caso.afa.meta.title': 'DNI Access Control for the AFA | Maximo Hidalgo',
        'caso.afa.meta.desc': 'Case study: an access control system built for the AFA (Asociación del Fútbol Argentino) that logs entry to the offices by reading the PDF417 barcode on an ID card. Requirements gathering, functional analysis and development in Python, end to end.',
        'caso.afa.escudo.alt': 'Crest of the Asociación del Fútbol Argentino',
        'caso.afa.fecha': 'April to June 2025',
        'caso.afa.titulo': 'DNI Access<br>Control',
        'caso.afa.lead': 'A system to log people entering the offices of the <strong>Asociación del Fútbol Argentino</strong> by scanning their ID card, with all the data in one place.',
        'ficha.cliente': 'Client',
        'ficha.periodo': 'Period',
        'ficha.rol': 'My role',
        'ficha.equipo': 'Team',
        'ficha.tipo': 'Type',
        'ficha.stack': 'Stack',
        'ficha.estado': 'Status',
        'caso.afa.cliente': 'Asociación del Fútbol Argentino (AFA)<br><span class="caso-ficha-nota">Through Nimat Solutions</span>',
        'caso.afa.rol.dd': 'Requirements gathering, functional analysis and development',
        'caso.afa.equipo.dd': 'Solo project, end to end',
        'caso.afa.figcaption': 'Interface illustration. No real screenshots or client data are shown, for confidentiality.',
        'caso.afa.h1': '01 The need',
        'caso.afa.n1.p1': 'Entry to the AFA offices was logged by hand. That slowed down every person going through reception and left the data scattered, with no practical way to look it up afterwards.',
        'caso.afa.n1.p2': 'The ask was specific: <strong>speed up entry by scanning the ID card</strong> and <strong>centralise the records</strong> in a single system that could be queried.',
        'caso.afa.h2': '02 My role',
        'caso.afa.n2.p1': 'I ran the project on my own, end to end. I was not handed a closed set of requirements: I had to build them.',
        'caso.afa.paso1': '<strong>Requirements gathering.</strong> On-site meetings at the AFA offices to understand how the entry process actually worked, and what each person involved needed.',
        'caso.afa.paso2': '<strong>Functional analysis.</strong> Turning those conversations into concrete features, defining the scope and setting priorities.',
        'caso.afa.paso3': '<strong>Proposal.</strong> Presenting the solution to the client and adjusting it with their feedback before writing any code.',
        'caso.afa.paso4': '<strong>Development.</strong> Building the whole system in Python, including reading the PDF417 barcode on the document.',
        'caso.afa.foto1.alt': 'Reception at the AFA offices, where the requirements meetings took place',
        'caso.afa.foto1.cap': 'The offices where I mapped out the entry process.',
        'caso.afa.foto2.alt': 'Maximo Hidalgo working on the system, with code on screen',
        'caso.afa.foto2.cap': 'During development.',
        'caso.afa.h3': '03 What the system does',
        'caso.afa.f1': 'Automatic scanning of the PDF417 barcode on the ID card, with no manual data entry.',
        'caso.afa.f2': 'Entry and exit logging with date and time.',
        'caso.afa.f3': 'Visit history per person.',
        'caso.afa.f4': 'Display of the ID card photo at the moment of entry.',
        'caso.afa.f5': 'Photo capture for first-time visitors.',
        'caso.afa.f6': 'Export of the records to Excel.',
        'caso.afa.h4': '04 Stack',
        'caso.afa.tag.analisis': 'Functional analysis',
        'caso.afa.h5': '05 Outcome and takeaways',
        'caso.afa.destacado': 'The system was built and working. The client decided not to roll it out.',
        'caso.afa.n5.p1': 'That it never reached production does not take away from what it left behind. It was the first time I took on <strong>an institutional project from scratch</strong>, with nobody handing me the requirements pre-chewed.',
        'caso.afa.n5.p2': 'What helped me most was <strong>dealing with the client directly</strong>: sitting in their offices, watching how they worked and asking the right questions. That is where I learned that the hard part is not writing the code, it is <strong>turning a need described in words into a concrete solution</strong>. It is still how I work today.',
        'caso.siguiente': 'Next case →',
        'caso.anterior': '← Previous case',
        'caso.todos': 'All projects →',

        /* ---------- Caso: Al Toque! ---------- */
        'caso.alt.meta.title': 'Al Toque! | Maximo Hidalgo',
        'caso.alt.meta.desc': 'Case study: a mobile app that connects clients with verified workers. Built with React Native and Expo, with identity verification, built-in chat and an SOS mode.',
        'caso.alt.eyebrow': 'Mobile app',
        'caso.alt.lead': 'An app that connects clients with verified workers, so that finding someone you can trust does not depend on asking around.',
        'caso.alt.rol.dd': 'App development',
        'caso.alt.stack.dd': 'React Native and Expo',
        'caso.alt.estado.dd': 'On hold',
        'caso.alt.figcaption': 'The project website, live at altoqueapp.com.ar',
        'caso.alt.h1': '01 What it is',
        'caso.alt.n1.p1': 'Al Toque! connects someone who needs a job done with verified workers across different trades. The app covers three categories:',
        'caso.alt.cat1': '<strong>General services.</strong> Plumbing, electrical work and heating and cooling.',
        'caso.alt.cat2': '<strong>Professional services.</strong> Legal and accounting advice.',
        'caso.alt.cat3': '<strong>Rentals.</strong> Tools, equipment and event supplies.',
        'caso.alt.n1.p2': 'The idea is that the client finds the right person without relying on scattered recommendations, and that the worker gets clients near their area without paying commission.',
        'caso.alt.h2': '02 My role',
        'caso.alt.n2.p1': 'I built the app with <strong>React Native and Expo</strong>, which keeps a single codebase for Android and iOS.',
        'caso.alt.h3': '03 What the app does',
        'caso.alt.f1': 'Identity verification for professionals, with license and background checks.',
        'caso.alt.f2': 'Built-in chat between client and worker.',
        'caso.alt.f3': 'SOS mode for emergencies, which makes a worker visible outside their usual hours.',
        'caso.alt.f4': 'Ratings and reputation system.',
        'caso.alt.f5': 'History of completed jobs.',
        'caso.alt.fig2.alt': 'Section of the website explaining the features for clients and for workers',
        'caso.alt.fig2.cap': 'The app is built for two audiences: the person looking for the service and the person offering it.',
        'caso.alt.h4': '04 Stack',
        'caso.alt.h5': '05 Status',
        'caso.alt.destacado': 'The project is on hold, but you can see how it turned out on its website.',
        'caso.alt.n5.p1': 'It was my first mobile build and the first one I approached as a product, with two kinds of user who need different things from the same app.',
        'caso.alt.verweb': 'Visit the website'
    };

    /* ---------- Motor ---------- */

    // dataset no acepta guiones: "aria-label" tiene que pasar a "AriaLabel"
    const aClave = (attr) => attr
        .replace(/-([a-z])/g, (_, c) => c.toUpperCase())
        .replace(/^./, (c) => c.toUpperCase());

    const cachear = (el, attr) => {
        const key = 'cache' + (attr ? aClave(attr) : 'Html');
        if (el.dataset[key] === undefined) {
            el.dataset[key] = attr ? (el.getAttribute(attr) || '') : el.innerHTML;
        }
        return el.dataset[key];
    };

    const aplicar = (lang) => {
        const en = lang === 'en';

        document.querySelectorAll('[data-i18n]').forEach((el) => {
            const original = cachear(el);
            const t = EN[el.dataset.i18n];
            el.innerHTML = en && t !== undefined ? t : original;
        });

        [['data-i18n-alt', 'alt'], ['data-i18n-label', 'aria-label'], ['data-i18n-content', 'content']]
            .forEach(([marca, attr]) => {
                document.querySelectorAll('[' + marca + ']').forEach((el) => {
                    const original = cachear(el, attr);
                    const t = EN[el.getAttribute(marca)];
                    el.setAttribute(attr, en && t !== undefined ? t : original);
                });
            });

        document.documentElement.lang = lang;

        // El botón ofrece siempre el otro idioma
        const btn = document.getElementById('lang-toggle');
        if (btn) {
            btn.setAttribute('aria-label', en ? 'Switch language to Spanish' : 'Switch language to English');
            btn.querySelectorAll('[data-lang]').forEach((s) => {
                s.classList.toggle('is-active', s.dataset.lang === lang);
            });
        }

        // La URL refleja el idioma, así un enlace compartido abre igual
        try {
            const url = new URL(window.location.href);
            if (en) url.searchParams.set('lang', 'en');
            else url.searchParams.delete('lang');
            window.history.replaceState({}, '', url);
        } catch (e) { /* file:// u otros contextos sin history */ }

        document.dispatchEvent(new CustomEvent('idiomacambiado', { detail: { lang } }));
    };

    const leerInicial = () => {
        try {
            const url = new URL(window.location.href).searchParams.get('lang');
            if (IDIOMAS.includes(url)) return url;
        } catch (e) { /* seguimos */ }
        try {
            const guardado = localStorage.getItem(CLAVE);
            if (IDIOMAS.includes(guardado)) return guardado;
        } catch (e) { /* seguimos */ }
        // Sólo pasamos a inglés si el navegador no está en español
        return (navigator.language || 'es').toLowerCase().startsWith('es') ? 'es' : 'en';
    };

    let actual = leerInicial();

    const init = () => {
        aplicar(actual);

        const btn = document.getElementById('lang-toggle');
        if (!btn) return;

        btn.addEventListener('click', () => {
            actual = actual === 'es' ? 'en' : 'es';
            aplicar(actual);
            try { localStorage.setItem(CLAVE, actual); } catch (e) { /* sin persistencia */ }
        });
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
