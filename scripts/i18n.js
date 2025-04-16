const langButton = document.getElementById('btn-language');
let currentLang = getBrowserLanguage();

function getBrowserLanguage() {
  const lang = navigator.language || navigator.userLanguage;
  return lang.startsWith('es') ? 'es' : 'en';
}

function getNestedTranslation(obj, key) {
  return key.split('.').reduce((acc, part) => acc && acc[part], obj);
}

function formatText(text) {
  return text.replace(/__(.*?)__/g, '<strong>$1</strong>');
}

async function loadLanguage(lang) {
  try {
    const response = await fetch(`data/translations/${lang}.json`);
    const translations = await response.json();

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const value = getNestedTranslation(translations, key);
      if (value) {
        el.innerHTML = formatText(value);
      }
    });

    const attrMap = {
      'data-i18n-placeholder': 'placeholder',
      'data-i18n-alt': 'alt',
      'data-i18n-title': 'title'
    };

    Object.entries(attrMap).forEach(([dataAttr, htmlAttr]) => {
      document.querySelectorAll(`[${dataAttr}]`).forEach(el => {
        const key = el.getAttribute(dataAttr);
        const value = getNestedTranslation(translations, key);
        if (value) {
          el.setAttribute(htmlAttr, value);
        }
      });
    });

    if (langButton) {
      langButton.textContent = lang === 'es' ? 'ES' : 'EN';
    }

    renderAreaSelector(translations);
    renderProjectsCards(translations);
    renderCareerSection(translations);

  } catch (err) {
    console.error('Error loading language:', err);
  }
}

langButton?.addEventListener('click', () => {
  currentLang = currentLang === 'es' ? 'en' : 'es';
  loadLanguage(currentLang);
});

loadLanguage(currentLang);
