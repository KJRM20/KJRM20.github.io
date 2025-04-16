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