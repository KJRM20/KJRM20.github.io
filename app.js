// Control del menú de navegación
document.addEventListener("DOMContentLoaded", function() {
    const navLinks = document.querySelectorAll('.nav_list_option a');
    const sections = document.querySelectorAll('.sections_container > section');

    function removeActiveClass() {
        navLinks.forEach(link => {
            link.parentElement.classList.remove('active');
        });
    }

    function hideAllSections() {
        sections.forEach(section => {
            section.classList.add('hidden');
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault(); 

            const targetSection = document.querySelector(this.getAttribute('href'));

            removeActiveClass();
            this.parentElement.classList.add('active');

            hideAllSections();
            targetSection.classList.remove('hidden'); 
        });
    });
});


// Configuración del idioma
const langButton = document.getElementById('btn-language');
let currentLang = 'es'; // Idioma predeterminado

async function loadTranslations() {
  const response = await fetch('./translations.json');
  return await response.json();
}

function applyTranslations(translations) {
  // Sección Home
  document.querySelector('.home_about_title h1').textContent = translations.home.title;
  document.querySelector('.home_about_title p').textContent = translations.home.description;
  const aboutParagraph = document.querySelector('.home_about_text p');
  aboutParagraph.innerHTML = translations.home.about;

  // Sección Nav (solo cambiamos el texto, manteniendo los íconos)
  const navItems = document.querySelectorAll('.nav_list li a');
  document.querySelector(".nav_title").textContent = translations.nav.title_nav;
  navItems[0].childNodes[1].textContent = translations.nav.home;
  navItems[1].childNodes[1].textContent = translations.nav.skills;
  navItems[2].childNodes[1].textContent = translations.nav.projects;
  navItems[3].childNodes[1].textContent = translations.nav.career;
  navItems[4].childNodes[1].textContent = translations.nav.contact;

  // Sección Habilidades (Skills)
  document.querySelector('.skills_container .section_title h1').textContent = translations.skills.title;
  document.querySelector('.skills_container .section_title p').textContent = translations.skills.subtitle;
  document.querySelector('h2 i.fa-laptop-code').nextSibling.textContent = translations.skills.frontend;
  document.querySelector('h2 i.fa-database').nextSibling.textContent = translations.skills.backend;
  document.querySelector('h2 i.fa-code').nextSibling.textContent = translations.skills.softwareDev;

  // Sección Proyectos
  document.querySelector('.projects_container .section_title h1').textContent = translations.projects.title;
  document.querySelector('.projects_container .section_title p').textContent = translations.projects.selectArea;
  document.querySelector('#area_selector option[value="1"]').textContent = translations.projects.areas.development;
  document.querySelector('#area_selector option[value="2"]').textContent = translations.projects.areas.cgArt;
  document.querySelector('.projects_card_info p').textContent = translations.projects.projectDescription;

  // Sección Trayectoria (Career)
  document.querySelector('.career-path_container .section_title h1').textContent = translations.career.title;
  document.querySelector('h2 i.fa-briefcase').nextSibling.textContent = translations.career.experience;
  document.querySelector('h2 i.fa-graduation-cap').nextSibling.textContent = translations.career.education;
  document.querySelector('h2 i.fa-book').nextSibling.textContent = translations.career.otherCourses;

  // Sección Contacto
  document.querySelector('.contact_container .section_title h1').textContent = translations.contact.title;
  document.querySelector('.contact_container .section_title p').textContent = translations.contact.description;

  // Formulario
  document.querySelector('input[name="name"]').placeholder = translations.form.namePlaceholder;
  document.querySelector('input[name="email"]').placeholder = translations.form.emailPlaceholder;
  document.querySelector('textarea[name="message"]').placeholder = translations.form.messagePlaceholder;
  document.querySelector('button[type="submit"]').textContent = translations.form.submit;
}

// Cambiar el idioma cuando se presiona el botón
langButton.addEventListener('click', async () => {
  currentLang = currentLang === 'es' ? 'en' : 'es';
  langButton.textContent = currentLang.toUpperCase();

  const translations = await loadTranslations();
  applyTranslations(translations[currentLang]);
});

// Cargar las traducciones iniciales al cargar la página
document.addEventListener('DOMContentLoaded', async () => {
  const translations = await loadTranslations();
  applyTranslations(translations[currentLang]);
});


// Menú de navegación
document.addEventListener("DOMContentLoaded", function() {
    const hamburgerIcon = document.getElementById('hamburger-icon');
    const nav = document.querySelector('.nav');
    const navLinks = document.querySelectorAll('.nav_list_option a'); // Obtener todos los enlaces del menú
    const closeModalButton = document.createElement('button'); // Botón de cerrar modal

    // Crear botón de cerrar modal
    closeModalButton.classList.add('close-modal');
    closeModalButton.innerHTML = '<i class="fa-solid fa-times"></i>';
    document.body.appendChild(closeModalButton);
    closeModalButton.style.display = 'none'; // Oculto inicialmente

    // Mostrar el modal (menú) al hacer clic en el icono de hamburguesa
    hamburgerIcon.addEventListener('click', function() {
        nav.classList.add('nav_visible');
        hamburgerIcon.style.display = 'none'; // Ocultar botón de hamburguesa
        closeModalButton.style.display = 'block'; // Mostrar botón de cerrar
    });

    // Función para mostrar el botón de hamburguesa solo en dispositivos móviles
    function showHamburgerIcon() {
        if (window.matchMedia("(max-width: 520px)").matches) {
            hamburgerIcon.style.display = 'block'; // Mostrar botón de hamburguesa solo si está en móvil
        } else {
            hamburgerIcon.style.display = 'none'; // Ocultar el botón en pantallas grandes
        }
    }

    // Cerrar el modal al hacer clic en el botón de cerrar
    closeModalButton.addEventListener('click', function() {
        nav.classList.remove('nav_visible');
        closeModalButton.style.display = 'none'; // Ocultar botón de cerrar
        showHamburgerIcon(); // Verificar si debe mostrar el botón de hamburguesa
    });

    // Cerrar el modal al hacer clic fuera del menú
    window.addEventListener('click', function(event) {
        if (event.target === nav) {
            nav.classList.remove('nav_visible');
            closeModalButton.style.display = 'none'; // Ocultar botón de cerrar
            showHamburgerIcon(); // Verificar si debe mostrar el botón de hamburguesa
        }
    });

    // Cerrar el modal al hacer clic en una opción del menú
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            nav.classList.remove('nav_visible'); // Cerrar el modal
            closeModalButton.style.display = 'none'; // Ocultar botón de cerrar
            showHamburgerIcon(); // Verificar si debe mostrar el botón de hamburguesa
        });
    });

    // Evento de cambio de tamaño de pantalla
    window.addEventListener('resize', function() {
        showHamburgerIcon(); // Verificar si debe mostrar u ocultar el botón de hamburguesa en función del tamaño de la pantalla
    });

    // Inicializar el estado del botón de hamburguesa según el tamaño de la pantalla actual
    showHamburgerIcon();
});


