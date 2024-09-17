/*****************************/
// Configuración del idioma //
/***************************/

const langButton = document.getElementById('btn-language');
var userLang = navigator.languages ? navigator.languages[0] : (navigator.language || navigator.userLanguage);
let currentLang = userLang.startsWith('es') ? 'es' : 'en';

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
  const sendLink = document.querySelector('.home_about_social_email a');
  sendLink.setAttribute("title",translations.home.mail);
  const copyMail = document.querySelector('.home_about_social_email button');
  copyMail.setAttribute("title",translations.home.copyBtn);

  // Sección Nav
  const navItems = document.querySelectorAll('.nav_list li a');
  document.querySelector(".nav_title").textContent = translations.nav.title_nav;
  navItems[0].childNodes[1].textContent = translations.nav.home;
  navItems[0].setAttribute("title",translations.nav.home);
  navItems[1].childNodes[1].textContent = translations.nav.skills;
  navItems[1].setAttribute("title",translations.nav.skills);
  navItems[2].childNodes[1].textContent = translations.nav.projects;
  navItems[2].setAttribute("title",translations.nav.projects);
  navItems[3].childNodes[1].textContent = translations.nav.career;
  navItems[3].setAttribute("title",translations.nav.career);
  navItems[4].childNodes[1].textContent = translations.nav.contact;
  navItems[4].setAttribute("title",translations.nav.contact);

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
  const cards = document.querySelectorAll('#projects_container_cards .projects_card_info');
  cards.forEach((card, index) => {
    const cardKey = `card_${index + 1}`; 

    card.querySelector('h2').textContent = translations.projects[cardKey].title;
    card.querySelector('p').textContent = translations.projects[cardKey].shortDescription;
    card.querySelector('a').innerHTML = translations.projects.card_btn;

    const modal = document.querySelector(`#modal-card-${index + 1} .modal-card`);
    if (modal) {
        modal.querySelector('h1').textContent = translations.projects[cardKey].title;
        modal.querySelectorAll('.modal-info p')[0].textContent = translations.projects[cardKey].description;
        modal.querySelectorAll('.modal-info p')[1].innerHTML = translations.projects.callaction;
        if(modal.querySelector('.modal-info a')){
            modal.querySelector('.modal-info a').textContent = translations.projects.modal_btn;
        }
    }
  });

  // Sección Trayectoria (Career)
  document.querySelector('.career-path_container .section_title h1').textContent = translations.career.title;
  document.querySelector('h2 i.fa-briefcase').nextSibling.textContent = translations.career.experience;
  const timeline_experience = document.querySelectorAll('#experience-container ol li');
  timeline_experience.forEach((item, index) => {

    const title = item.querySelector('h3');
    const start = item.querySelectorAll('time')[0]; 
    const end = item.querySelectorAll('time')[1]; 
    const description = item.querySelectorAll('p')[1]; 
    
    const experienceKey = `experience_${index + 1}`;
    const experienceData = translations.career[experienceKey];

    if(experienceData){
        start.textContent = experienceData.start;
        end.textContent = experienceData.end;
        title.textContent = experienceData.title;
        description.textContent = experienceData.description;
    }  
  });
  document.querySelector('h2 i.fa-graduation-cap').nextSibling.textContent = translations.career.education;
  const timeline_education = document.querySelectorAll('#education-container ol li');
  timeline_education.forEach((item, index) => {

    const time = item.querySelector('time');
    const level = item.querySelectorAll('p')[0]; 
    const description = item.querySelectorAll('p')[1]; 
    
    const experienceKey = `education_${index + 1}`;
    const experienceData = translations.career[experienceKey];

    if(experienceData){
        time.textContent = experienceData.time;
        level.textContent = experienceData.level;
        description.textContent = experienceData.description;
    }  
  });
  document.querySelector('h2 i.fa-book').nextSibling.textContent = translations.career.otherCourses;
  const timeline_courses = document.querySelectorAll('#courses-container ol li');
  timeline_courses.forEach((item, index) => {

    const time = item.querySelector('time');
    const title = item.querySelector('h3'); 
    const description = item.querySelectorAll('p')[1]; 
    
    const experienceKey = `course_${index + 1}`;
    const experienceData = translations.career[experienceKey];

    if(experienceData){
        time.textContent = experienceData.time;
        title.textContent = experienceData.title;
        description.textContent = experienceData.description;
    }  
  });

  // Sección Contacto
  document.querySelector('.contact_container .section_title h1').textContent = translations.contact.title;
  document.querySelector('.contact_container .section_title p').textContent = translations.contact.description;

  // Formulario
  document.querySelector('input[name="name"]').placeholder = translations.form.namePlaceholder;
  document.querySelector('input[name="email"]').placeholder = translations.form.emailPlaceholder;
  document.querySelector('textarea[name="message"]').placeholder = translations.form.messagePlaceholder;
  document.querySelector('button[type="submit"]').textContent = translations.form.submit;
}

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


/***********************************/
// Control del menú de navegación //
/*********************************/

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


/**************************************/
// Adaptación del Menú de navegación //
/************************************/

document.addEventListener("DOMContentLoaded", function() {
    const hamburgerIcon = document.getElementById('hamburger-icon');
    const nav = document.querySelector('.nav');
    const navLinks = document.querySelectorAll('.nav_list_option a'); 
    const closeModalButton = document.createElement('button'); 

    // Crear botón de cerrar modal
    closeModalButton.classList.add('close-modal');
    closeModalButton.innerHTML = '<i class="fa-solid fa-times"></i>';
    nav.appendChild(closeModalButton);
    closeModalButton.style.display = 'none';

    // Mostrar el menú al hacer clic en el icono de hamburguesa
    hamburgerIcon.addEventListener('click', function() {
        nav.classList.add('nav_visible');
        hamburgerIcon.style.display = 'none';
        closeModalButton.style.display = 'block';
    });

    // Función para mostrar el botón de hamburguesa solo en dispositivos móviles
    function showButtonsIcons() {
        if (window.matchMedia("(max-width: 520px)").matches && !nav.classList.contains('nav_visible')) {
            hamburgerIcon.style.display = 'block';
        } else {
            hamburgerIcon.style.display = 'none';
            closeModalButton.style.display = 'block';
        }
        if(!window.matchMedia("(max-width: 520px)").matches){
            closeModalButton.style.display = 'none';
        }
    }

    // Cerrar el menú al hacer clic en el botón de cerrar
    closeModalButton.addEventListener('click', function() {
        nav.classList.remove('nav_visible');
        showButtonsIcons();
    });

    // Cerrar el menú al hacer clic fuera 
    window.addEventListener('click', function(event) {
        if (event.target === nav) {
            nav.classList.remove('nav_visible');
            showButtonsIcons();
        }
    });

    // Cerrar el modal al hacer clic en una opción del menú
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            nav.classList.remove('nav_visible'); 
            showButtonsIcons(); 
        });
    });

    // Evento de cambio de tamaño de pantalla
    window.addEventListener('resize', function() {
        showButtonsIcons();
    });
    
    showButtonsIcons();
});


/*************************/
//Inicio - Copiar email //
/***********************/

function copyEmail(){
    var textarea = document.getElementById('email-text');
    textarea.select();
    textarea.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(textarea.value).then(function() {
        let mensaje = document.getElementById('popup');
        if(langButton.textContent == "ES"){
            mensaje.querySelector('p').innerHTML = "El correo ha sido copiado al portapapeles.";
        }else{
            mensaje.querySelector('p').innerHTML = "The e-mail has been copied to the clipboard.";
        }
        mensaje.classList.remove('hidden');
        setTimeout(()=>{
            mensaje.classList.add('hidden');
        },2500)
    }).catch(function(error) {
        console.error("Error al copiar el texto: ", error);
    });
}


/************************************/
//Proyectos - Visibilidad por área //
/**********************************/
const selectElement = document.getElementById('area_selector');
const div1 = document.getElementById('projects_development');
const div2 = document.getElementById('projects_design');

selectElement.addEventListener('change', (event) => {
  const value = event.target.value; 

  if (value === '1') {
    div1.classList.remove('hidden');
    div2.classList.add('hidden');
  } else {
    div1.classList.add('hidden');
    div2.classList.remove('hidden');
  }
});


/*************************/
//Contacto - formulario //
/***********************/

const form = document.querySelector('#form-contact')
    form.addEventListener('submit', handleSubmit)

async function handleSubmit(event){
    event.preventDefault()
    const _form = new FormData(this)
    console.log(_form.get('name'))
    const response = await fetch(this.action,{
        method: this.method,
        body: _form,
        headers:{
            'Accept': 'application/json'
        }
    })

    if(response.ok){
        this.reset()
        let mensaje = document.getElementById('popup');
        if(langButton.textContent == "ES"){
            mensaje.querySelector('p').innerHTML = "Gracias por ponerte en contacto conmigo, ¡te escribiré pronto!";
        }else{
            mensaje.querySelector('p').innerHTML = "Thanks you for contacted me, I will write you soon!";
        }
        mensaje.classList.remove('hidden');
        setTimeout(()=>{
            mensaje.classList.add('hidden');
        },2500)
    }
}

