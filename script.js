// make page scroll
const pageScroll = (value) => {
  window.scroll({
    top: value,
    behavior: "smooth",
  });
};
//make nav bar change at smallscreen sizes
(showNavLinks = () => {
  const navBtn = document.querySelector(".fa-bars");
  const navLinks = document.querySelector(".navbar-links");
  const bodyEl = document.getElementsByTagName("BODY")[0];

  navBtn.addEventListener("click", (event) => {
    event.stopPropagation();
    if (!navLinks.classList.contains("active")) {
      navLinks.classList.add("active");
    } else {
      navLinks.classList.remove("active");
    }
  });
  bodyEl.addEventListener("click", () => {
    navLinks.classList.remove("active");
  });
})();
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
    } else {
      chapter.classList.remove("show");
    }

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
// bolean value that decides if page can scroll chapter into view
let scrollable = true;
// nav bar buttons functionality
const skipToChapter = (value) => {
  pageScroll(value);
  scrollable = false;
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
];

//auto write paragraphs
const autoWriteText = (chapter) => {
  const paragraphHTML = chapter.querySelector("p");
  paragraphsArr.forEach((paragraph) => {
    if (paragraph.name === paragraphHTML.dataset.chapter) {
      // make page auto scroll
      if (scrollable === true) {
        setTimeout(() => {
          paragraphHTML.scrollIntoView({ behavior: "smooth" }, 200);
        }, 400);
      }
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
  const navbar = document.querySelector(".nav-container");

  bodyEl.style.overflow = "hidden";
  bodyEl.style.filter = "grayscale(1)";
  bodyEl.style.transition = "filter 0.7s ease-in";
  bodyEl.style.pointerEvents = "none";
  navbar.style.display = "none";
};
const normalBodyEvents = () => {
  const bodyEl = document.getElementsByTagName("BODY")[0];
  const navbar = document.querySelector(".nav-container");
  bodyEl.style.overflowY = "auto";
  bodyEl.style.filter = "none";

  navbar.style.display = "flex";

  bodyEl.style.transition = "filter 0.7s ease-in";
  bodyEl.style.pointerEvents = "auto";
  index = 1;
};

//turn On Auto write Text
/////////////////////////////////
// const listenForMouseEnter = () => {
//   const chapters = document.querySelectorAll(".chapter");
//   const bottomTrigger = (window.innerHeight / 6) * 5;

//   chapters.forEach(function (chapter) {
//     let inViewChapter;
//     chapter.addEventListener("mouseenter", () => {
//       // //////////////////////////////////////////////////////////////////////////////////////////////////

//       /////////////////////////
//       if (
//         chapter.classList.contains("show") &&
//         !chapter.classList.contains("done")
//       ) {
//         inViewChapter = chapter;
//       }
//       const chapterBottom = inViewChapter.getBoundingClientRect().bottom;

//       if (chapterBottom < bottomTrigger) {
//         autoWriteText(chapter);
//       }
//     });
//   });
// };
//!this works
const listenForMouseEnter = () => {
  const chapters = document.querySelectorAll(".chapter");
  chapters.forEach(function (chapter) {
    chapter.addEventListener("mouseenter", () => {
      if (!chapter.classList.contains("done")) {
        autoWriteText(chapter);
      }
    });
  });
};

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

  card.style.transition = "all 0.5s ease";
  setTimeout(() => {
    card.style.transition = "none";
  }, 1000);
  projectTitle.style.transform = "translateZ(300px)";
  projectDescription.style.transform = "translateZ(90px)";

  seeMoreBtn.style.transform = "translateZ(90px)";
  firstPhoto.style.transform = "translateZ(200px) rotate(-5deg) ";

  secondPhoto.style.transform = "translateZ(150px) rotate(-10deg) ";

  thirdPhoto.style.transform = "translateZ(100px) rotate(-15deg) ";

  fourthPhoto.style.transform = "translateZ(50px)  rotate(-20deg)";
};
const clickOnCardImages = () => {
  let trigger = true;

  const allCardImages = document.querySelectorAll(".card-header img");
  allCardImages.forEach((image) => {
    image.addEventListener("mouseover", () => {
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
const changeProject = () => {
  setTimeout(() => {
    insertNextProjects();
  }, 500);
};

// event listeners for project card btns
const clickRightBrn = () => {
  const card = document.querySelector(".project-card");

  const projectsContainer = document.querySelector(".project-container");
  const rightArrowBtn = projectsContainer.querySelector(".fa-angle-right");
  rightArrowBtn.addEventListener("click", () => {
    counter++;
    if (counter >= projectsArr.length) {
      counter = 0;
    }
    changeProject();
    card.style.animation = "rotationRight 1s forwards";
  });
};
const clickLeftBtn = () => {
  const card = document.querySelector(".project-card");

  const projectsContainer = document.querySelector(".project-container");
  const leftArrowBtn = projectsContainer.querySelector(".fa-angle-left");
  leftArrowBtn.addEventListener("click", () => {
    counter--;
    if (counter < 0) {
      counter = projectsArr.length - 1;
    }
    changeProject();
    // showProjectDetails();
    card.style.animation = "rotationLeft 1s forwards";
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
          "When I started working on this website I had no idea what I wanted to do. Or rather, I had to many ideas and didn't know which one to choose. After a brainstorming session a arrived at the conclusion that this website should reflect my personality and the visual effects, text, little jokes, even the Mafia:The city of lost heaven reference (Kudos to you  if you got it ), all reflect my personality.",
        paragraph1:
          " The pictures above reflect what I think are the best aesthetic choices I made on this website  but not the hardest things to do.In other words, those are the thing I flex with to my mom.",
        subtitle1: "Challenges",
        subtitleParagraph:
          "Oh... the auto-typing effect. I wanted to implement this in a project for a while but it was like it wasn't making sense form a logical perspective. But here, i embraced the storytelling  way of presenting my message and i think the auto-typing effect   fits right in.",
        subtitle2: "How i Overcome them",
        subtitleParagraph2:
          "After trying to set up a trigger point  for the function that types the text to run, and failing  miserably, I started thinking about mouse event listeners for each card. At the time of writing this, I probably switched between mousemoove, mouseenter and mouseover more than 10 times... Probably in a few years I will laugh at the problems i encountered now but for 4 months of experience, i think is pretty good.  ",

        bestFeatures: [
          "Modern design that fully translates  my personality ",
          "Accent color that dynamically changes on every click ",
          "Beautiful 3d animation  on hover for the project cards in  the experience chapter",
          "auto typing effect with screen freeze and  black and white transition for added  nostalgia effect and emphasising the storytelling mood ",
          "The amazing parallax effect that even now, then i know how its done, makes me go 'wow'",
          "working contact form",
        ],
        moreProjectImages: [
          `./resources/project-photos/Portofolio-project/quote.jpg`,
          `./resources/project-photos/Portofolio-project/certifications.jpg`,
          `./resources/project-photos/Portofolio-project/form.jpg`,
          `./resources/project-photos/Portofolio-project/level.jpg`,
          `./resources/project-photos/Portofolio-project/project.jpg`,
        ],
      },
    ],
  },

  {
    name: "Quiz game",
    paragraphCard:
      "This is for the HR people who probably don't have the time to look at my very complex Musicare project and it's a  reason why they should. ",
    picture1: `./resources/project-photos/quiz-project/quiz-questions.jpg`,
    picture2: `./resources/project-photos/quiz-project/quiz-rules.jpg`,
    picture3: `./resources/project-photos/quiz-project/quiz-wrong-answer.jpg`,
    picture4: `./resources/project-photos/quiz-project/quiz-results.jpg `,

    seeMoreContainer: [
      {
        title: "Quiz game",
        projectDescriptionParagraph:
          "As i said before. The quiz game is parte of a bigger project called Musicare, and it serves as a chance for a discount if the player wins. Below I will explain some of the functionality i implemented and why.",
        paragraph1: "",
        subtitle1: "Challenges",
        subtitleParagraph:
          "Searching through the array of answers was awful. I felt like having a correct answer somewhere in the array of objects and checking each answer against it seemed like to much ram power with no real result ",
        subtitle2: "How I filtered the answers",

        subtitleParagraph2:
          "Well. pretty simple actually. I gave the correct answer a correct key with a value of either correct or false, and filter that way. Now, thinking back, the false answer didn't have to have a correct propriety but .. yeah. that was my way of thinking  after like 3months of experience. You can check out the game  <a href='https://www.musicare.ml' target='_blank' class ='link'>here</a> by pressing on the Musicare hero text. And... the code is on Github under the musicare project  ",

        bestFeatures: [
          "The questions show up in a random order ",
          "There is a time limit on every question and after it passes, the buttons become unclickable.",
          "The game shows you the correct answer if you get it wrong",
          "There is a counter that keeps track of every right answer ",
          "Confetti  if you get  at least 9/10 answers right",
        ],
        moreProjectImages: [
          `./resources/project-photos/quiz-project/quiz-rules.jpg`,
          `./resources/project-photos/quiz-project/quiz-questions.jpg`,

          `./resources/project-photos/quiz-project/quiz-wrong-answer.jpg`,
          `./resources/project-photos/quiz-project/quiz-results.jpg `,
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
          "I started this project in order to make the transition,  from being a full time flute player to a ambitious programmer, smoother. And also I thought it was an unique,  long-awaited and needed idea-implementation  for my country. The website it's made entirely by me,   with Html, Css and Javascript. No Wordpress, no React, nada.  You can check it out <a href='https://www.musicare.ml' target='_blank' class ='link'>here</a>. ",
        paragraph1:
          "  Ok. In the pictures above you can see some of the highlights from the website , but not all of them. As i said, this project is a fully functional website with lots of features that i will brag about down bellow",
        subtitle1: "Challenges",
        subtitleParagraph: `The thing is .. On such a big project there  are bound to be things that  drive you crazy each commit. And please keep in mind that, at the time i had like 0h of  real experience . So, with that in mind, here is a list with things that MADE ME A BETTER PROGRAMMER in an attempt to fixing them:  
        <ul>
        <li>- the split landing page</li>
        <li>- the slides you see above</li>
        <li>- the  secret quiz for discounts</li>
        <li>- the freakin' filter for instruments</li>
        <li>- the contact/checkout forms because i didn't know any backend back then</li>
        <li>- making things as dry as possible</li>
        </ul>`,

        subtitle2: "How i fixed stuff",
        subtitleParagraph2: ` First I want to say that,  after 4 months, when i finally finished the project, i fell in love with the programing way of thinking about problems.
          <h6>About fixes, the biggest problem was the filter for instruments because it's so complex. And after figuring out how to filter the instruments, I lost all the functionality when a instrument card was clicked. So I ended up repainting the whole instruments grid and calling the functions i needed for functionality inside the repaint function.</h6>
          <h6>The quiz was also pretty difficult to implement but  the way i structured my code  with all the questions and answers is pretty API-like. So, now i can flex about being able to filter thing from an API.</h6>
          <h6>The split landing page that implies that there is a different version of that website under each page, was pretty simple to do. I made two functions that painted on the screen only the things i needed for that specific website and called them through HTML.
          About the dry part.. there is always more work .
          </h6>
           `,
        bestFeatures: [
          "Modern but elegant design",
          "Split landing page",
          "Dynamic accent color for the different versions of teh website",
          "Complex instrument filter that filters alphabetically,  by name, by type, by price and by discount",
          "Secret quiz game for adding discount",
          "beautiful animations for the intro, news section, hovering over stuff and probably much more. ",
          "unique logo, fully made by me in Photoshop",
          "working contact and checkout form",
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
let projectFeaturesArr;
let moreProjectImages;

//functions that recreates best project features each time is called
// best features
const insertBestProjectFeatures = () => {
  const projectFeatureList = document.createElement("ul");
  projectFeatureList.classList.add("best-features");
  projectFeatureList.innerHTML = "";
  for (let i = 0; i < projectFeaturesArr.length; i++) {
    const listItem = `<li>- ${projectFeaturesArr[i]}</li>`;
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
// /////////////
// insert images into slideshow
const insertImagesInSlideshow = () => {
  const projectDetailsContainer = document.querySelector(
    ".project-details-container"
  );
  const imageSlideshowContainerHTML = document.createElement("div");
  imageSlideshowContainerHTML.classList.add("slideshow-container");

  moreProjectImages.forEach((image) => {
    const imageSlideshowHTML = ` <div class="mySlides fade">
    <img src="${image}" style="width:100%">
  </div>`;
    imageSlideshowContainerHTML.insertAdjacentHTML(
      "beforeend",
      imageSlideshowHTML
    );
  });

  projectDetailsContainer.appendChild(imageSlideshowContainerHTML);

  var slideIndex = 0;
  showSlides();

  function showSlides() {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) {
      slideIndex = 1;
    }
    slides[slideIndex - 1].style.display = "block";
    setTimeout(showSlides, 4500);
  }
};
//CLICK O IMAGE
const clickOnProjectDetailsImage = (imagesGrid) => {
  const images = imagesGrid.querySelectorAll(".project-details-picture");
  images.forEach((image) => {
    image.addEventListener("click", () => {
      const slideshow = (document.querySelector(
        ".slideshow-container"
      ).style.display = "block");
      imagesGrid.style.visibility = "hidden";
    });
  });
};
////////////////////////////////

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
    let subtitleParagraph2 = element.subtitleParagraph2;
    let subtitle1 = element.subtitle1;
    let subtitle2 = element.subtitle2;
    let projectImages;
    projectFeaturesArr = [...element.bestFeatures];
    moreProjectImages = [...element.moreProjectImages];

    //insertHtml
    const projectDetailsHTML = `
    <i class="fas fa-angle-left"></i>
        <h1 class="project-title ">${title}</h1>
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

    clickOnProjectDetailsImage(imagesGrid);
    // projectDetailsContainer.appendChild(projectImages);projectIrefrt
    const closeBtn = projectDetailsContainer.querySelector(".fa-angle-left ");
    hideProjectDetails(closeBtn);
  });
  insertImagesInSlideshow();
};

///////////////
let counter = 0;
// increments
const plusIncrement = counter + 1;
const minusIncrement = counter - 1;

// function that recreates project  html every time is called
const insertNextProjects = () => {
  const projectsContainer = document.querySelector(
    ".projects-carousel-container"
  );

  let project = projectsArr[counter];
  let name = project.name;
  let paragraphCard = project.paragraphCard;
  let picture1 = project.picture1;
  let picture2 = project.picture2;
  let picture3 = project.picture3;
  let picture4 = project.picture4;

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

  projectsContainer.innerHTML = newProjectHTML;
  insertProjectDetails(project);

  // counter++;
  let seeMoreBtn = document.querySelector(".see-more-btn");
  animateProjectCard();
  clickRightBrn();
  clickLeftBtn();
  showProjectDetails(seeMoreBtn);

  return seeMoreBtn;
};
insertNextProjects();

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
// click on submit btn
const submitBtn = document.querySelector(".submit-btn");
const form = document.querySelectorAll(".form");
form.forEach((form) => {
  let isValid = false;
  submitBtn.addEventListener("click", () => {
    isValid = form.checkValidity();
    if (isValid === true) {
      setTimeout(() => {
        pageScroll(3800);
      }, 2000);
    }
  });
});
