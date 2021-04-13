// make page scroll
const pageScroll = (value) => {
  window.scroll({
    top: value,
    behavior: "smooth",
  });
};

//function that randomly changes accent color on click
(changeAccentColor = () => {
  //array of accent colors
  const accentColors = [
    "#FFD700",

    "#c69400",
    "#7d3470",
    "#4c91d1",
    "#c28897",
    "#64b87d",
    " #005b96",
    "#c1c530",
    "#af6150",
    "#56b59a",
    "#680fea",
    "#851e3e",
    "#651e3e",
    "#0e9aa7 ",

    "#54b2a9",
    "#8874a3",
    "#3b7dd8",
    "#4a91f2",
  ];
  let randomAccentColor =
    accentColors[Math.floor(Math.random() * accentColors.length)];
  document.documentElement.style.setProperty(
    "--accent-color",
    randomAccentColor
  );
})();
// scroll animation
let index = 1;
let trigger = false;
let writtenChapters = [];
const showChapters = () => {
  const chapters = Array.from(document.querySelectorAll(".chapter"));
  const triggerBottom = (window.innerHeight / 9) * 6;

  chapters.forEach((chapter) => {
    const chapterTop = chapter.getBoundingClientRect().top;

    if (chapterTop < triggerBottom) {
      chapter.classList.add("show");

      // autoWriteText(chapter);
      //   if (!writtenChapters.includes(chapter.dataset.chapter)) {
      //     index = 1;
      //   } else {
      //     index = 999999999;
      //   }
    } else {
      chapter.classList.remove("show");
    }
    //  disabled for testing puprposes
    listenForMouseEnter();
  });
};

window.addEventListener("scroll", showChapters);
//all chapters
const fluteChapter = document.querySelector(".flute-chapter");
const betChapter = document.querySelector(".bet-chapter");
const presentChapter = document.querySelector(".present-chapter");
const curriculumChapter = document.querySelector(".curriculum-chapter");
const experienceChapter = document.querySelector(".experience-chapter");
const endChapter = document.querySelector(".end-chapter");
const fluteChapterTitle = fluteChapter.querySelector(".chapter-title");
const betChapterTitle = betChapter.querySelector(".chapter-title");
const presentChapterTitle = presentChapter.querySelector(".chapter-title");
const curriculumChapterTitle = curriculumChapter.querySelector(
  ".chapter-title"
);
const experienceChapterTitle = experienceChapter.querySelector(
  ".chapter-title"
);
// const endChapterTitle = endChapter.querySelector(".chapter-title");

// nav bar buttons functionality
const skipToChapter = (value) => {
  // const trigger = chapter.getBoundingClientRect().top;
  pageScroll(value);
  // index = 9999;
  // console.log(chapter, trigger);
};
// chapters paragraphs array
const paragraphsArr = [
  {
    name: "flute",
    paragraph: ` "I used to be a flute player. Even though I wasn't makin' much and I worked from dawn to dusk, I was glad to be working.
        One day I was on my break and I was just hanging out when I heard a bet I couldn't refuse..."`,
  },
  {
    name: "bet",
    paragraph: `"A bet from my very best friend, an IT guy who I was teaching flute on the side...
    - I bet  you the next round I can learn to play the flute faster than you can learn programming
    P.S. He lost! "`,
  },
  {
    name: "present",
    paragraph: ` "Anyway,  I begun my journey in conquering Web Development, each and every day taking small steps to become the greatest front end dev (of my family)"`,
  },
  {
    name: "curriculum",
    paragraph: ` "The JavaScript guru's from the internet called to me so I enrolled in a few courses from CodeCademy, Pluralsight and WantSome. There was also some handsome sensei who helped me along the way but he wishes to remain annonimus"`,
  },
  {
    name: "end",
    paragraph: ` "I used to be a flute player. Even thow I wasn't makin' much and I worked from dawn to dusk, I was glad to be working.
        One day I was on my break and I was just hanging out when I heard a bet I couldn't refuse..."`,
  },
];

//auto write paragraphs
const autoWriteText = (chapter) => {
  const paragraphHTML = chapter.querySelector("p");
  const chapterBottom = chapter.getBoundingClientRect().bottom;
  paragraphsArr.forEach((paragraph) => {
    if (paragraph.name === paragraphHTML.dataset.chapter) {
      writtenChapters.push(chapter.dataset.chapter);
      chapter.classList.add("done");
      blockBodyEvents();

      paragraphHTML.innerText = paragraph.paragraph.slice(0, index);
      index++;
      if (index > paragraph.paragraph.length) {
        normalBodyEvents();
        return;
      }

      setTimeout(function () {
        autoWriteText(chapter);
      }, 30);
    }
  });
};
//make body have no click events and a grayscale tone
const blockBodyEvents = () => {
  const bodyEl = document.getElementsByTagName("BODY")[0];
  bodyEl.style.overflow = "hidden";
  bodyEl.style.filter = "grayscale(100%)";
  bodyEl.style.transition = "filter 0.7s ease-in";
  bodyEl.style.pointerEvents = "none";
};
const normalBodyEvents = () => {
  const bodyEl = document.getElementsByTagName("BODY")[0];
  bodyEl.style.overflowY = "auto";
  bodyEl.style.filter = "grayscale(0%)";
  bodyEl.style.transition = "filter 0.7s ease-in";
  bodyEl.style.pointerEvents = "auto";
  index = 1;
};

//turn On Auto write Text
/////////////////////////////////
const listenForMouseEnter = () => {
  const chapters = document.querySelectorAll(".chapter");
  chapters.forEach(function (chapter) {
    chapter.addEventListener("mousemove", () => {
      if (!chapter.classList.contains("done")) {
        autoWriteText(chapter);
      }
    });
  });
};
//disabld or testing purposes
listenForMouseEnter();

// progressbar

const setValuesForCircle = () => {
  const circles = document.querySelectorAll("circle");
  const values = document.querySelectorAll("input");
  circles.forEach((circle) => {
    const radius = circle.r.baseVal.value;
    const circumference = radius * 2 * Math.PI;

    circle.style.strokeDasharray = `${circumference} ${circumference}`;
    circle.style.strokeDashoffset = `${circumference}`;

    function setProgress(percent) {
      const offset = circumference - (percent / 100) * circumference;
      circle.style.strokeDashoffset = offset;
    }
    values.forEach((value) => {
      if (circle.dataset.circle === value.dataset.circle) {
        setProgress(value.value);
      }
    });
  });
};
setValuesForCircle();
pageScroll(0);

(function seeCertificates() {
  const certificateBtn = document.querySelector(".fa-file-alt");
  const certificatesContainer = document.querySelector(".diplomas-container");
  const certificates = document.querySelectorAll(".box>img");
  const boxes = document.querySelectorAll(".box");
  const projectsContainer = document.querySelector(".experience-chapter");
  certificateBtn.addEventListener("click", () => {
    certificatesContainer.style.transform = "translateX(0px)";
    setTimeout(() => {
      projectsContainer.style.top = "150rem";
    }, 1000);

    boxes.forEach((box) => {
      box.addEventListener("click", (event) => {
        event.stopPropagation();
        removeCertificateActiveClass();
        box.classList.add("active");
      });
    });
    pageScroll(1300);
  });
})();

const removeCertificateActiveClass = () => {
  const boxes = document.querySelectorAll(".box");

  boxes.forEach((box) => {
    box.classList.remove("active");
  });
};

(function hideCertificates() {
  const certificateContainer = document.querySelector(".diplomas-container");
  const closeCertificationsBtn = certificateContainer.querySelector(
    ".fa-angle-right"
  );
  const projectsContainer = document.querySelector(".experience-chapter");

  closeCertificationsBtn.addEventListener("click", () => {
    certificateContainer.style.transform = "translateX(400%)";
    projectsContainer.style.top = "134rem";

    removeCertificateActiveClass();
  });
})();

// projects
//movement animation

//moving animation
const animateProjectCard = () => {
  const carouselCountainer = document.querySelector(
    ".projects-carousel-container"
  );
  const card = document.querySelector(".project-card");
  const projectsContainer = document.querySelector(
    ".projects-carousel-container"
  );
  projectsContainer.addEventListener("mousemove", (e) => {
    let xAxis =
      (carouselCountainer.getBoundingClientRect().width * 0.9 - e.pageX) / 25;
    let yAxis =
      (carouselCountainer.getBoundingClientRect().height * 3.5 - e.pageY) / 15;

    card.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
  });
  projectsContainer.addEventListener("mouseenter", () => {
    addHoverEffect();
    clickOnCardImages();
  });
  projectsContainer.addEventListener("mouseleave", (e) => {
    removeHoverEffect();
  });
};
// animateProjectCard();

const removeHoverEffect = () => {
  const card = document.querySelector(".project-card");
  const cardHeaderImage = document.querySelector(".card-header img");
  const projectTitle = document.querySelector(".info-title");
  const seeMoreBtn = document.querySelector(".see-more-btn");
  const projectDescription = document.querySelector(".card-info");
  const firstPhoto = document.getElementById("first-image");
  const secondPhoto = document.getElementById("second-image");
  const thirdPhoto = document.getElementById("third-image");
  const fourthPhoto = document.getElementById("fourth-image");
  card.style.transform = "rotateY(0deg) rotateX(0deg)";
  card.style.transition = "all 0.5s ease";
  projectTitle.style.transform = "translateZ(0px)";
  projectDescription.style.transform = "translateZ(0px)";
  seeMoreBtn.style.transform = "translateZ(0px)";
  cardHeaderImage.style.transform = "translateZ(0px)";
  firstPhoto.style.transform = "translateZ(4px) ";
  secondPhoto.style.transform = "translateZ(3px) ";
  thirdPhoto.style.transform = "translateZ(2px) ";
  fourthPhoto.style.transform = "translateZ(1px) ";
};
const addHoverEffect = () => {
  const card = document.querySelector(".project-card");
  const projectTitle = document.querySelector(".info-title");
  const seeMoreBtn = document.querySelector(".see-more-btn");
  const projectDescription = document.querySelector(".card-info");
  const firstPhoto = document.getElementById("first-image");
  const secondPhoto = document.getElementById("second-image");
  const thirdPhoto = document.getElementById("third-image");
  const fourthPhoto = document.getElementById("fourth-image");

  // card.style.transition = "all 0.5s ease";
  // setTimeout(() => {
  card.style.transition = "none";
  // }, 1000);
  projectTitle.style.transform = "translateZ(300px)";
  projectDescription.style.transform = "translateZ(90px)";

  seeMoreBtn.style.transform = "translateZ(90px)";
  firstPhoto.style.transform = "translateZ(200px) ";
  // firstPhoto.style.transform = "rotate(-5deg)";
  secondPhoto.style.transform = "translateZ(150px) ";
  // secondPhoto.style.transform = "rotate(-10deg)";
  thirdPhoto.style.transform = "translateZ(100px) ";
  // thirdPhoto.style.transform = "rotate(-15deg)";

  fourthPhoto.style.transform = "translateZ(50px) ";
  // fourthPhoto.style.transform = "rotate(-20deg)";
};
const clickOnCardImages = () => {
  let trigger = true;

  const allCardImages = document.querySelectorAll(".card-header img");
  allCardImages.forEach((image) => {
    image.addEventListener("mousemove", () => {
      if (trigger === true && !image.classList.contains("fixed")) {
        image.style.transform = "translateZ(1000px)";
        trigger = false;
      }
      setTimeout(() => {
        trigger = true;
      }, 300);
    });
  });
};
//changeProject
const changeProject = (arr) => {
  const card = document.querySelector(".project-card");
  setTimeout(() => {
    insertNextProjects(arr);
  }, 500);

  card.style.animation = "rotation 1s forwards";
};
// event listeners for project card btns
const clickRightBrn = () => {
  const projectsContainer = document.querySelector(".project-container");
  const rightArrowBtn = projectsContainer.querySelector(".fa-angle-right");
  rightArrowBtn.addEventListener("click", () => {
    changeProject(projectsArr);
    // showProjectDetails();
  });
};
const clickLeftBtn = () => {
  const projectsContainer = document.querySelector(".project-container");
  const rightArrowBtn = projectsContainer.querySelector(".fa-angle-left");
  rightArrowBtn.addEventListener("click", () => {
    changeProject(reverseProjectsArr);
    // showProjectDetails();
  });
};

// array of projects
const projectsArr = [
  {
    name: "Portofolio Website",
    paragraphCard:
      "There is no surprise that my personal portofolio si done by .. well ..me. I included this here because I stumbled upon some interesting problems along the way and  the way I managed to fix the is... at least interesting.",
    picture1: `./resources/project-photos/Portofolio-project/quote.jpg`,
    picture2: `./resources/project-photos/Portofolio-project/level.jpg `,
    picture3: `./resources/project-photos/Portofolio-project/certifications.jpg`,
    picture4: `./resources/project-photos/Portofolio-project/project.jpg`,
    seeMoreContainer: [
      {
        title: "Personal Portofolio",
        projectDescriptionParagraph:
          "ipsum dolor sit amet consectetur adipisicing elit. Fugiat sequi ipsum, magnam natus qui officia unde est possimus modi vel nobis voluptatum ab quis eius excepturi rerum exercitationem. Eos, ipsaipsum dolor sit amet consectetur adipisicing elit. Fugiat sequi ipsum, magnam natus qui officia unde est possimus modi vel nobis voluptatum ab quis eius excepturi rerum exercitationem. Eos, ipsa",
        paragraph1:
          " ipsum dolor sit amet consectetur adipisicing elit. Fugiat sequi ipsum, magnam natus qui officia unde est possimus modi vel nobis voluptatum ab quis eius excepturi rerum exercitationem. Eos, ipsa?",
        subtitle1: "Chalanges",
        subtitleParagraph:
          " ipsum dolor sit amet consectetur adipisicing elit. Fugiat sequi ipsum, magnam natus qui officia unde est possimus modi vel nobis voluptatum ab quis eius excepturi rerum exercitationem. Eos, ipsa?",
        subtitle2: "How i Overcome them",
        subtitleParagraph2:
          " ipsum dolor sit amet consectetur adipisicing elit. Fugiat sequi ipsum, magnam natus qui officia unde est possimus modi vel nobis voluptatum ab quis eius excepturi rerum exercitationem. Eos, ipsa?",

        bestFeatures: [
          "=Modern but elegant design",
          "==Dinamic accent color for the different sites that you choose",
          "===Split landing page",
          "====Working instrument filter",
          "=====Secret quizz game for discounts",
        ],
        moreProjectImages: [
          `./resources/project-photos/musicare-project-image-slider.jpg`,
          `./resources/project-photos/musicare-project-grid-photo.jpg`,
          `./resources/project-photos/musicare-project-hero-photo.jpg`,
          `./resources/project-photos/checkout-form.jpg`,
        ],
      },
    ],
  },
  {
    name: "Musicare",
    paragraphCard:
      "My first ever project. And kind of an ambitious one. Done in 2 mouths and 0  experience to begin with, im managed to make a real life scenario website, all the features you normally see, and some bonus ones",
    picture1: `./resources/project-photos/Musicare-project/panels.jpg`,
    picture2: `./resources/project-photos/Musicare-project/landing.jpg `,
    picture3: `./resources/project-photos/Musicare-project/about.jpg`,
    picture4: `./resources/project-photos/Musicare-project/grid.jpg`,
    seeMoreContainer: [
      {
        title: "Musicare",
        projectDescriptionParagraph:
          "ipsum dolor sit amet consectetur adipisicing elit. Fugiat sequi ipsum, magnam natus qui officia unde est possimus modi vel nobis voluptatum ab quis eius excepturi rerum exercitationem. Eos, ipsaipsum dolor sit amet consectetur adipisicing elit. Fugiat sequi ipsum, magnam natus qui officia unde est possimus modi vel nobis voluptatum ab quis eius excepturi rerum exercitationem. Eos, ipsa",
        paragraph1:
          " ipsum dolor sit amet consectetur adipisicing elit. Fugiat sequi ipsum, magnam natus qui officia unde est possimus modi vel nobis voluptatum ab quis eius excepturi rerum exercitationem. Eos, ipsa?",
        subtitle1: "chalanges",
        subtitleParagraph:
          " ipsum dolor sit amet consectetur adipisicing elit. Fugiat sequi ipsum, magnam natus qui officia unde est possimus modi vel nobis voluptatum ab quis eius excepturi rerum exercitationem. Eos, ipsa?",
        subtitle2: "How i Ovecome them",
        subtitleParagraph2:
          " ipsum dolor sit amet consectetur adipisicing elit. Fugiat sequi ipsum, magnam natus qui officia unde est possimus modi vel nobis voluptatum ab quis eius excepturi rerum exercitationem. Eos, ipsa?",
        bestFeatures: [
          "Most interesting features",
          "Modern but elegant design",
          "Dinamic accent color for the different sites that you choose",
          "Split landing page",
          "Working instrument filter",
          "Secret quizz game for discounts",
        ],
        moreProjectImages: [
          "./resources/project-photos/musicare-project-image-slider.jpg",
          "./resources/project-photos/musicare-project-grid-photo.jpg",
          "./resources/project-photos/musicare-project-hero-photo.jpg",
          "./resources/project-photos/checkout-form.jpg",
        ],
      },
    ],
  },
];
const reverseProjectsArr = projectsArr.reverse();
let projectIndex = 0;
const projectNames = [];
let projectFeaturesArr;
let moreProjectImages;

//functions that recreates best project features each time is called
// best features
const insertBestProjectFeatures = () => {
  const projectFeatureList = document.createElement("ul");
  projectFeatureList.classList.add("best-features");
  projectFeatureList.innerHTML = "";
  for (let i = 0; i < projectFeaturesArr.length; i++) {
    const listItem = `<li>${projectFeaturesArr[i]}</li>`;
    projectFeatureList.insertAdjacentHTML("beforeend", listItem);
  }
  return projectFeatureList;
};
const insertMoreProjectImages = (imageElGrid) => {
  imageElGrid.innerHTML = "";
  for (let i = 0; i < moreProjectImages.length; i++) {
    const image = `<img
    class="project-details-picture"
    src='${moreProjectImages[i]}' alt=""
  />`;

    imageElGrid.insertAdjacentHTML("beforeend", image);
  }
  return imageElGrid;
};
const insertProjectDetails = (project) => {
  const projectDetailsContainer = document.querySelector(
    ".project-details-container"
  );
  const projectDetailsPictureContainer = document.querySelector(
    ".project-details-picture-grid"
  );

  project.seeMoreContainer.forEach((element) => {
    //variables of project description object
    let title = element.title;
    let projectDescription = element.projectDescriptionParagraph;
    let paragraph1 = element.paragraph1;
    let subtitleParagraph = element.subtitleParagraph;
    let subtitleParagraph2 = element.subtitleParagraph;
    let subtitle1 = element.subtitle1;
    let subtitle2 = element.subtitle2;
    let projectImages;
    projectFeaturesArr = [...element.bestFeatures];
    moreProjectImages = [...element.moreProjectImages];

    //insertHtml
    const projectDetailsHTML = `
    <i class="fas fa-angle-left"></i>
        <h1 class="project-title">${title}</h1>
        <p class="description project-description">
          ${projectDescription}
        </p>
        <div class="project-details-pictures-gird">
          ${projectImages}
        </div>
        <div class="description paragraph1">
          ${paragraph1}
        </div>
        <h5 class="project-subtitle chalanges">${subtitle1}</h5>
        <p class="description paragraph2">
          ${subtitleParagraph}
        </p>
        <h5 class="project-subtitle overcome">${subtitle2}</h5>
        <p class="description paragraph3">
          ${subtitleParagraph2}
        </p>
        <h5 class="project-subtitle features">Most interesting features</h5>
     
      `;
    projectDetailsContainer.innerHTML = projectDetailsHTML;

    const imagesGrid = document.querySelector(".project-details-pictures-gird");
    const projectFeatureList = insertBestProjectFeatures();
    projectImages = insertMoreProjectImages(imagesGrid);
    projectDetailsContainer.appendChild(projectFeatureList);
    // projectDetailsContainer.appendChild(projectImages);
    const closeBtn = projectDetailsContainer.querySelector(".fa-angle-left ");
    hideProjectDetails(closeBtn);
  });
};

///////////////
// function that recreates project  html every time is called
const insertNextProjects = (arr) => {
  const projectsContainer = document.querySelector(
    ".projects-carousel-container"
  );
  const currentProjectName = projectNames[projectIndex];

  arr.forEach((project) => {
    let name = project.name;
    let paragraphCard = project.paragraphCard;
    let picture1 = project.picture1;
    let picture2 = project.picture2;
    let picture3 = project.picture3;
    let picture4 = project.picture4;
    if (!projectNames.includes(name)) {
      projectNames.push(name);
    }
    const newProjectHTML = ` '
    
    <div class="project-container">
             
    <div class="project-card">
      <i class="fas fa-angle-left"></i>
  <i class="fas fa-angle-right"></i>
      <div class="card-header">
        <div class="under-image"></div>
        <img  id ="first-image"src=""${picture1}">
        <img id ="second-image" src="${picture2}">
        <img id ="third-image" src="${picture3}">
        <img  class= "fixed"id ="fourth-image" src="${picture4}">
      </div>
      <div class="card-info">
        <h1 class="info-title"> ${name}</h1>
        <p>${paragraphCard}</p>
      </div>
      <div class="project-details">
      <button class="see-more-btn">See more</button>
      </div>
    </div>
  </div>`;
    if (currentProjectName !== name) {
      projectsContainer.innerHTML = newProjectHTML;
      insertProjectDetails(project);
    }
    if (projectIndex >= arr.length) {
      projectIndex = 0;
    }
  });
  let seeMoreBtn = document.querySelector(".see-more-btn");
  animateProjectCard();
  clickRightBrn();
  clickLeftBtn();
  showProjectDetails(seeMoreBtn);

  projectIndex++;
  return seeMoreBtn;
};
insertNextProjects(projectsArr);

// details abot projects
function showProjectDetails(seeMoreBtn) {
  // let seeMoreBtn = insertNextProjects(projectsArr);

  let projectDetailsContainer = document.querySelector(
    ".project-details-container"
  );
  let experienceChapterContainer = document.querySelector(
    ".experience-chapter"
  );
  const linksContainer = document.querySelector(".links-container");

  seeMoreBtn.addEventListener("click", () => {
    projectDetailsContainer.style.transform = "translateX(0px)";
    pageScroll(2000);
    linksContainer.style.display = "none";
  });
}
// showProjectDetails();

function hideProjectDetails(closeBtn) {
  const projectDetailsContainer = document.querySelector(
    ".project-details-container"
  );
  closeBtn.addEventListener("click", () => {
    projectDetailsContainer.style.transform = "translateX(-400%)";
  });
}
