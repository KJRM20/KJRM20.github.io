const toggleBtn = document.getElementById('toggle-theme');
const logoImg = document.getElementById('logo-img');
  const body = document.body;

  if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark-theme');
    toggleBtn.innerHTML =  '<i class="fa-solid fa-moon">';
  } else {
    toggleBtn.innerHTML =  '<i class="fa-solid fa-sun"></i>';
  }

  toggleBtn.addEventListener('click', () => {
    body.classList.toggle('dark-theme');
    const theme = body.classList.contains('dark-theme') ? 'dark' : 'light';
    localStorage.setItem('theme', theme); 
    toggleBtn.innerHTML = theme == "dark" ? '<i class="fa-solid fa-moon">' : '<i class="fa-solid fa-sun"></i>';
    logoImg.src = theme == "dark" ? './assets/logo/Logo-white.png' : './assets/logo/Logo.png';
  });