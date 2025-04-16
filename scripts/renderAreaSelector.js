function renderAreaSelector(translations) {
    const selector = document.getElementById("area-selector");
    selector.innerHTML = "";
  
    const areas = translations.PROJECTS.areas;
  
    for (const areaKey in areas) {
      const option = document.createElement("option");
      option.value = areaKey;
      option.setAttribute("data-i18n", `PROJECTS.areas.${areaKey}.title`);
      if(areaKey.includes("frontend")){
        option.selected = true;
      }
      selector.appendChild(option);
    }
  
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const value = getNestedTranslation(translations, key);
      if (value) {
        el.innerHTML = formatText(value);
      }
    });
  
    selector.addEventListener("change", () => {
      renderProjectsCards(translations, selector.value);
    });
  
    selector.value = Object.keys(areas)[0];
    renderProjectsCards(translations, selector.value);
  }