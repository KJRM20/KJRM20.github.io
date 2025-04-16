function renderProjectsCards(translations, selectedArea) {
    if (!selectedArea) {
        console.error("selectedArea está vacío o undefined");
        return;
    }

    const cardsContainer = document.getElementById("project-cards");
    cardsContainer.innerHTML = "";

    const area = translations.PROJECTS.areas[selectedArea];
    const cards = area.cards;

    for (const cardKey in cards) {
        if (/^card_\d+$/.test(cardKey)) {
            const card = cards[cardKey];

            const cardId = `${selectedArea}-${cardKey}`;
            const modalId = `modal-${cardId}`;

            // Labels
            const shortLabels = card.labels?.slice(0, 3) || [];
            const allLabels = card.labels || [];

            const shortLabelsHTML = shortLabels.map(label => `<p class="projects_card_label">${label}</p>`).join("");
            const allLabelsHTML = allLabels.map(label => `<p class="projects_card_label">${label}</p>`).join("");

            let buttonsHTML = '';

            if (card.demo) {
            buttonsHTML += `<a class="btn-rojo" href="${card.demo}" target="_blank">${area.cards.modal_btn}</a>`;
            }

            if (card.repo) {
            buttonsHTML += `<a class="btn-rojo" href="${card.repo}" target="_blank">${area.cards.modal_btn2}</a>`;
            }

            if (card.path) {
            buttonsHTML += `<a class="btn-rojo" href="${card.path}" download>${area.cards.modal_btn3}</a>`;
            }


            const cardHTML = `
          <div id="card-${cardId}" class="projects_card">
            <div class="projects_card_img">
              <img src="assets/projects/${card.image.replace(/\s+/g, '')}.png" loading="lazy" alt="${card.title}">
            </div>
            <div class="projects_card_info">
              <h2>${card.title}</h2>
              <p>${card.shortDescription}</p> 
              <div class="projects_card_labels_container">
                ${shortLabelsHTML}
              </div>
              <a href="#${modalId}">${area.cards.card_btn}</a>
            </div>
          </div>
          <div id="${modalId}" class="modal-card_container">
            <div class="modal-card">
              <a href="#projects_container_cards" title="Close" class="close">X</a>
              <h1>${card.title}</h1>
              <hr>
              <div class="modal-info">
                <p class="modal-card_container_text">${card.description}</p>
                <p class="modal-card_container_text">${area.cards.callaction}</p>
                <div class="projects_card_labels_container">
                  ${allLabelsHTML}
                </div>
                <div class="projects_card_labels_container">
                  ${buttonsHTML}                                    
                </div>
              </div>
            </div>
          </div>
        `;

            cardsContainer.insertAdjacentHTML("beforeend", cardHTML);
        }
    }
}
