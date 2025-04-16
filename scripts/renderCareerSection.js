function renderCareerSection(translations) {
    const careerData = translations.CAREER;
    const experiences = Object.entries(careerData.experiences || {}).filter(([key]) => key.startsWith("experience_"));
    const educations = Object.entries(careerData).filter(([key]) => key.startsWith("education_"));
    const courses = Object.entries(careerData).filter(([key]) => key.startsWith("course_"));
  
    // Experiencia Laboral
    const experienceItems = experiences.map(([_, exp]) => {
        const dateRanges = [];
        let index = 0;
        while (true) {
          const startKey = index === 0 ? 'start' : `start_${index + 1}`;
          const endKey = index === 0 ? 'end' : `end_${index + 1}`;
          if (!exp[startKey] && !exp[endKey]) break;
      
          const startVal = exp[startKey] || '';
          const endVal = exp[endKey] || 'Actualidad';
          dateRanges.push(`<time datetime="${startVal}">${startVal}</time> - <time datetime="${endVal}">${endVal}</time>`);
          index++;
        }
      return `
        <li class="item_time_line">
          <div>
            <div class="decorativeCircleList"></div>
            ${dateRanges.join(' | ')}
            <h3>${exp.title}</h3>
            <p class="item_institute">${exp.enterprise}</p>
            <p class="item_description">${exp.description}</p>
          </div>
        </li>
      `;
    }).join("");
  
    document.getElementById("experience-container").innerHTML = `
      <h2><i class="fa-solid fa-briefcase"></i> ${careerData.experiences.title}</h2>
      <hr>
      <ol class="time_line">${experienceItems}</ol>
    `;
  
    const educationItems = educations.map(([_, edu], index) => {
      return `
        <li id="edu-item-${index + 1}" class="item_time_line">
          <div>
            <div class="decorativeCircleList"></div>
            <time datetime="${edu.time}">${edu.time}</time>
            <h3>${edu.institute}</h3>
            <p class="item_institute">${edu.level}</p>
            <p class="item_description">${edu.description}</p>
          </div>
        </li>
      `;
    }).join("");
  
    document.getElementById("education-container").innerHTML = `
      <h2><i class="fa-solid fa-graduation-cap"></i> ${careerData.education}</h2>
      <hr>
      <ol class="time_line">${educationItems}</ol>
    `;
  
    const courseItems = courses.map(([_, course], index) => {
      return `
        <li id="courses-item-${index + 1}" class="item_time_line">
          <div>
            <div class="decorativeCircleList"></div>
            <time datetime="${course.time}">${course.time}</time>
            <h3>${course.title}</h3>
            <p class="item_institute">${course.institute}</p>
            <p class="item_description">${course.description}</p>
          </div>
        </li>
      `;
    }).join("");
  
    document.getElementById("courses-container").innerHTML = `
      <h2><i class="fa-solid fa-book"></i> ${careerData.otherCourses}</h2>
      <hr>
      <ol class="time_line">${courseItems}</ol>
    `;
  }
  