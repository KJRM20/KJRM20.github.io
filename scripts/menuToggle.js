document.addEventListener("DOMContentLoaded", function() {
    const hamburgerIcon = document.getElementById('hamburger-icon');
    const nav = document.querySelector('.nav');
    const navLinks = document.querySelectorAll('.nav_list_option a'); 
    const closeModalButton = document.createElement('button'); 

    closeModalButton.classList.add('close-modal');
    closeModalButton.innerHTML = '<i class="fa-solid fa-times"></i>';
    nav.appendChild(closeModalButton);
    closeModalButton.style.display = 'none';

    hamburgerIcon.addEventListener('click', function() {
        nav.classList.add('nav_visible');
        hamburgerIcon.style.display = 'none';
        closeModalButton.style.display = 'block';
    });

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

    closeModalButton.addEventListener('click', function() {
        nav.classList.remove('nav_visible');
        showButtonsIcons();
    });

    window.addEventListener('click', function(event) {
        if (event.target === nav) {
            nav.classList.remove('nav_visible');
            showButtonsIcons();
        }
    });

    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            nav.classList.remove('nav_visible'); 
            showButtonsIcons(); 
        });
    });

    window.addEventListener('resize', function() {
        showButtonsIcons();
    });
    
    showButtonsIcons();
});