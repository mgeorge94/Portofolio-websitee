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
      // } else {
      //   chapter.classList.remove("show");
      // }
    }

    // listenForMouseEnter();
  });
};

window.addEventListener("scroll", showChapters);
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
        normalBodyEvens();
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
const normalBodyEvens = () => {
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

const seeCertificates = () => {
  const certificateBtn = document.querySelector(".fa-file-alt");
  const certificatesContainer = document.querySelector(".diplomas-container");
  const certificates = document.querySelectorAll(".box>img");
  const boxes = document.querySelectorAll(".box");

  certificateBtn.addEventListener("click", () => {
    certificatesContainer.style.display = "grid";

    boxes.forEach((box) => {
      box.addEventListener("click", (event) => {
        event.stopPropagation();
        removeCertificateActiveClass();
        box.classList.add("active");
        pageScroll(1800);
      });
    });
  });
};
seeCertificates();

const removeCertificateActiveClass = () => {
  const boxes = document.querySelectorAll(".box");

  boxes.forEach((box) => {
    box.classList.remove("active");
  });
};

const hideCertificates = () => {
  const certificateContainer = document.querySelector(".diplomas-container");

  certificateContainer.addEventListener("click", () => {
    certificateContainer.style.display = "none";
    removeCertificateActiveClass();
  });
};
hideCertificates();
// projects
//movement animation
const carouselCountainer = document.querySelector(
  ".projects-carousel-container"
);
const card = document.querySelector(".project-card");
const projectContainer = document.querySelector(".project-container");

//moving animation animation
projectContainer.addEventListener("mousemove", (e) => {
  let xAxis =
    (carouselCountainer.getBoundingClientRect().width * 1.2 - e.pageX) / 15;
  let yAxis =
    (carouselCountainer.getBoundingClientRect().height * 3.5 - e.pageY) / 15;

  card.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
});
projectContainer.addEventListener("mouseenter", () => {
  addHoverEffect();
  clickOnCardImages();
});
projectContainer.addEventListener("mouseleave", (e) => {
  removeHoverEffect();
});
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
  projectTitle.style.transform = "translateZ(90px)";
  projectDescription.style.transform = "translateZ(90px)";
  seeMoreBtn.style.transform = "translateZ(90px)";
  firstPhoto.style.transform = "translateZ(100px) ";
  secondPhoto.style.transform = "translateZ(70px) ";
  thirdPhoto.style.transform = "translateZ(50px) ";
  fourthPhoto.style.transform = "translateZ(49px) ";
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
