import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

//========================================================================================================================================================

const boxes = document.querySelectorAll(".production__box");
const btnBack = document.querySelectorAll(".production__box-btn");

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (window.innerWidth > 1190) {
      const btn = box.querySelector(".production__box-btn");
      const name = box.querySelector(".production__box-name");
      const info = box.querySelector(".production__box-info");
      const boxesContainer = document.querySelector(".production__content");
      const img = box.querySelector(".production__box-img img");

      if (btn) btn.classList.add("active");
      if (name) name.classList.add("active");
      if (info) info.classList.add("active");

      if (img && !img.classList.contains("scaled")) {
        const currentHeight = img.offsetHeight;
        const currentWidth = img.offsetWidth;
        const newWidth = currentWidth * 1.67;

        img.style.width = `${newWidth}px`;
        img.style.height = `${currentHeight}px`;
        boxesContainer.style.height = `${img.offsetHeight}px`;

        img.classList.add("active", "scaled");
      }

      boxes.forEach((b) => {
        if (b !== box) {
          b.classList.add("hidden");
        }
      });
    }
  });
});

btnBack.forEach((btn) => {
  btn.addEventListener("click", (event) => {
    event.stopPropagation();

    boxes.forEach((box) => {
      const boxBtn = box.querySelector(".production__box-btn");
      const name = box.querySelector(".production__box-name");
      const info = box.querySelector(".production__box-info");
      const img = box.querySelector(".production__box-img img");

      if (boxBtn) boxBtn.classList.remove("active");
      if (name) name.classList.remove("active");
      if (info) info.classList.remove("active");

      if (img) {
        img.style.height = "";
        img.style.width = "";
        img.classList.remove("active", "scaled");
      }

      box.classList.remove("hidden");
    });
  });
});
//========================================================================================================================================================

import Swiper from "swiper/bundle";

import "swiper/css/bundle";

const swiper = new Swiper(".swiper", {
  loop: true,
  slidesPerView: 3,
  navigation: {
    nextEl: ".swiper-btn-next",
    prevEl: ".swiper-btn-prev"
  }
});
document.addEventListener("DOMContentLoaded", () => {
  const highlightsSwiper = new Swiper(".highlights__swiper", {
    effect: "coverflow",
    centeredSlides: true,
    initialSlide: 2,
    speed: 600,
    slidesPerView: "auto",
    grabCursor: true,
    coverflowEffect: {
      rotate: 0,
      stretch: 10,
      depth: 150,
      modifier: 1
    },
    on: {
      click(e) {
        highlightsSwiper.slideTo(this.clickedIndex);
      },
      init: function (highlightsSwiper) {
        const dragElement = document.querySelector(".swiper-scrollbar-drag");
        if (dragElement) {
          dragElement.style.width = "60px";
        }
      },
      setTranslate: function (highlightsSwiper) {
        const dragElement = document.querySelector(".swiper-scrollbar-drag");
        if (dragElement) {
          const scrollbarWidth = highlightsSwiper.scrollbar.el.offsetWidth;
          const dragWidth = dragElement.offsetWidth;

          const maxTranslate = scrollbarWidth - dragWidth;
          const progress = highlightsSwiper.progress;

          const translateX = maxTranslate * progress;

          dragElement.style.transform = `translateX(${translateX}px)`;
        }
      }
    },
    navigation: {
      nextEl: ".highlights-button-next",
      prevEl: ".highlights-button-prev"
    },
    pagination: {
      el: ".swiper-pagination",
      type: "bullets",
      clickable: true,
      renderBullet: function (index, className) {
        return '<span class="' + className + '">' + (index + 1) + "</span>";
      }
    },
    scrollbar: {
      el: ".swiper-scrollbar"
    }
  });
  window.addEventListener("resize", () => {
    highlightsSwiper.update();
  });
});

const prevButton = document.querySelector(".swiper-btn-prev");
const nextButton = document.querySelector(".swiper-btn-next");
const prevButtonHigh = document.querySelector(".highlights-button-prev");
const nextButtonHigh = document.querySelector(".highlights-button-next");

function followCursorHorizontally(button, isNextButton = false) {
  button.addEventListener("mousemove", (event) => {
    const buttonRect = button.getBoundingClientRect();
    const pseudoElementWidth = 40;
    let x = event.clientX - buttonRect.left - buttonRect.width / 2 + pseudoElementWidth / 2;

    if (isNextButton) {
      x = -x;
    } else {
      x -= pseudoElementWidth / 2 + pseudoElementWidth / 2;
    }

    button.style.setProperty("--x", `${x}px`);
  });

  button.addEventListener("mouseleave", () => {
    button.style.setProperty("--x", "50%");
  });
}

followCursorHorizontally(prevButton);
followCursorHorizontally(nextButton, true);
followCursorHorizontally(prevButtonHigh);
followCursorHorizontally(nextButtonHigh, true);
//========================================================================================================================================================
document.addEventListener("DOMContentLoaded", () => {
  const dropdownTrigger = document.querySelector(".dropdown-trigger");
  const dropdownContainer = document.querySelector(".dropdown-container");
  const selectedItem = document.querySelector(".selected-item");

  dropdownTrigger.addEventListener("click", () => {
    const isExpanded = dropdownTrigger.getAttribute("aria-expanded") === "true";
    dropdownTrigger.setAttribute("aria-expanded", !isExpanded);
    dropdownContainer.style.display = isExpanded ? "none" : "flex";
  });

  const dropdownItems = document.querySelectorAll(".conversation__dropdown-item");
  dropdownItems.forEach((item) => {
    item.addEventListener("click", () => {
      selectedItem.textContent = item.textContent;
      dropdownTrigger.setAttribute("aria-expanded", "false");
      dropdownContainer.style.display = "none";
    });
  });
});
//========================================================================================================================================================

//========================================================================================================================================================
//header section

gsap.delayedCall(4, () => {
  gsap
    .timeline({
      scrollTrigger: {
        trigger: ".header__content",
        start: "top 60%",
        toggleActions: "play none none none"
      }
    })
    .from(".header__content-title", { opacity: 0, clipPath: "inset(0 100% 0 0)", duration: 4, ease: "power3.out" })
    .from(".header__content-text", { opacity: 0, clipPath: "inset(0 100% 0 0)", duration: 2, ease: "power3.out" }, "<")
    .from(".header__content-crown img", { opacity: 0, clipPath: "inset(0 100% 0 0)", duration: 2, ease: "power3.out" }, "<");

  gsap
    .timeline({
      scrollTrigger: {
        trigger: ".pick__items",
        start: "top 80%",
        toggleActions: "play none none none"
      }
    })
    .from(".pick__item-box", {
      opacity: 0,
      y: 50,
      duration: 0.5,
      stagger: 0.3
    });

  gsap.from(".pick__search-btn", {
    scrollTrigger: {
      trigger: ".pick__search-btn",
      start: "top 80%",
      toggleActions: "play none none none"
    },
    opacity: 0,
    scale: 0.8,
    duration: 1
  });
});

//========================================================================================================================================================
//lifestyle
gsap.from(".lifestyle__title.main-title", {
  scrollTrigger: {
    trigger: ".lifestyle__content",
    start: "top 80%",
    toggleActions: "play none none reverse"
  },
  y: 50,
  opacity: 0,
  duration: 1.2,
  ease: "power3.out"
});

gsap.from(".left-text__title", {
  scrollTrigger: {
    trigger: ".lifestyle__left",
    start: "top 75%",
    toggleActions: "play none none reverse"
  },
  x: -50,
  opacity: 0,
  duration: 1.2,
  delay: 0.3,
  ease: "power3.out"
});

gsap.from(".left-text__text", {
  scrollTrigger: {
    trigger: ".lifestyle__left",
    start: "top 75%",
    toggleActions: "play none none reverse"
  },
  x: -50,
  opacity: 0,
  duration: 1.2,
  delay: 0.6,
  ease: "power3.out"
});

gsap.from(".lefestyle__left-img img", {
  scrollTrigger: {
    trigger: ".lifestyle__left",
    start: "top 70%",
    toggleActions: "play none none reverse"
  },
  scale: 0.8,
  opacity: 0,
  duration: 1.5,
  delay: 0.3,
  ease: "power3.out",
  stagger: 0.2
});

gsap.from(".lifestyle__right-img-box > img", {
  scrollTrigger: {
    trigger: ".lifestyle__right",
    start: "top 70%",
    toggleActions: "play none none reverse"
  },
  scale: 0.9,
  opacity: 0,
  duration: 1.5,
  delay: 0.3,
  ease: "power3.out"
});

gsap.from(".right-info__box p", {
  scrollTrigger: {
    trigger: ".lifestyle__right",
    start: "top 70%",
    toggleActions: "play none none reverse"
  },
  y: 50,
  opacity: 0,
  duration: 1.2,
  delay: 0.5,
  ease: "power3.out"
});
//========================================================================================================================================================
//collection
gsap.from(".collection__top-title", {
  scrollTrigger: {
    trigger: ".collection__content",
    start: "top 80%",
    toggleActions: "play none none reverse"
  },
  y: 50,
  opacity: 0,
  duration: 1.2,
  ease: "power3.out"
});

gsap.from(".top-box__text", {
  scrollTrigger: {
    trigger: ".collection__content",
    start: "top 75%",
    toggleActions: "play none none reverse"
  },
  y: 50,
  opacity: 0,
  duration: 1.2,
  delay: 0.3,
  ease: "power3.out"
});

gsap.from(".collection__bottom-item", {
  scrollTrigger: {
    trigger: ".collection__bottom-list",
    start: "top 75%",
    toggleActions: "play none none reverse"
  },
  y: 50,
  opacity: 0,
  duration: 1.2,
  stagger: 0.2,
  ease: "power3.out"
});

//========================================================================================================================================================
//inspirayion

gsap.from(".inspiration__left-title", {
  scrollTrigger: {
    trigger: ".inspiration__content",
    start: "top 70%",
    toggleActions: "play none none reverse"
  },
  y: 50,
  opacity: 1,
  duration: 1.2,
  ease: "power3.out"
});

gsap.from(".inspiration__left-text", {
  scrollTrigger: {
    trigger: ".inspiration__left",
    start: "top 80%",
    toggleActions: "play none none reverse"
  },
  x: -50,
  opacity: 0,
  duration: 1.2,
  delay: 0.3,
  ease: "power3.out"
});

gsap.from(".inspiration__left-box img", {
  scrollTrigger: {
    trigger: ".inspiration__left",
    start: "top 75%",
    toggleActions: "play none none reverse"
  },
  scale: 0.8,
  opacity: 0,
  duration: 1.5,
  delay: 0.3,
  ease: "power3.out"
});

gsap.from(".inspiration-more", {
  scrollTrigger: {
    trigger: ".inspiration__left",
    start: "top 75%",
    toggleActions: "play none none reverse"
  },
  y: 30,
  opacity: 0,
  duration: 1.2,
  delay: 0.6,
  ease: "power3.out"
});

gsap.from(".lifestyle__title.inspiration-title", {
  scrollTrigger: {
    trigger: ".inspiration__right",
    start: "top 75%",
    toggleActions: "play none none reverse"
  },
  y: 50,
  opacity: 0,
  duration: 1.2,
  ease: "power3.out"
});

gsap.from(".inspiration__right-images img", {
  scrollTrigger: {
    trigger: ".inspiration__right-images",
    start: "top 70%",
    toggleActions: "play none none reverse"
  },
  scale: 0.8,
  opacity: 0,
  duration: 1.5,
  ease: "power3.out",
  stagger: 0.2
});
//========================================================================================================================================================
//break
gsap.from(".break__info", {
  scrollTrigger: {
    trigger: ".break__content",
    start: "top 50%",
    toggleActions: "play none none reverse"
  },
  y: 20,
  opacity: 0,
  duration: 1,
  ease: "power3.out"
});

gsap.from(".break__content img", {
  scrollTrigger: {
    trigger: ".break__content",
    start: "top 50%",
    toggleActions: "play none none reverse"
  },
  scale: 0,
  opacity: 0,
  duration: 1.2,
  ease: "back.out(1.7)"
});

gsap.from(".break__title-top", {
  scrollTrigger: {
    trigger: ".break__content",
    start: "top 50%",
    toggleActions: "play none none reverse"
  },
  x: -50,
  opacity: 0,
  duration: 1,
  ease: "power3.out"
});

gsap.from(".break__title-bottom", {
  scrollTrigger: {
    trigger: ".break__content",
    start: "top 50%",
    toggleActions: "play none none reverse"
  },
  x: 50,
  opacity: 0,
  duration: 1,
  ease: "power3.out"
});
//========================================================================================================================================================
//expirience
gsap.from(".experience__title", {
  scrollTrigger: {
    trigger: ".experience",
    start: "top 60%",
    toggleActions: "play none none reverse"
  },
  y: -150,
  opacity: 0,
  duration: 3,
  ease: "power3.out"
});

gsap.from(".experience__subtitle", {
  scrollTrigger: {
    trigger: ".experience",
    start: "top 60%",
    toggleActions: "play none none reverse"
  },
  y: -150,
  opacity: 0,
  duration: 2,
  ease: "power3.out"
});
//========================================================================================================================================================
//conversation

gsap.from(".conversation__input-box input", {
  scrollTrigger: {
    trigger: ".conversation__input-box",
    start: "top 70%",
    once: true
  },
  opacity: 0,
  clipPath: "inset(0 100% 0 0)",
  duration: 3,
  ease: "power3.out"
});
gsap.from(".conversation__agreement", {
  scrollTrigger: {
    trigger: ".conversation__agreement",
    start: "top 80%",
    once: true
  },
  opacity: 0,
  clipPath: "inset(0 100% 0 0)",
  duration: 3,
  ease: "power3.out"
});
gsap.from(".conversation_choise-box", {
  scrollTrigger: {
    trigger: ".conversation_choise-box",
    start: "top 80%",
    once: true
  },
  opacity: 0,
  clipPath: "inset(0 100% 0 0)",
  duration: 3,
  ease: "power3.out"
});
gsap.from(".conversation__title", {
  scrollTrigger: {
    trigger: ".conversation__title",
    start: "top 80%",
    toggleActions: "play none none reverse"
  },
  opacity: 0,
  clipPath: "inset(0 100% 0 0)",
  duration: 4,
  ease: "power3.out"
});
//========================================================================================================================================================
//buy

gsap.from(".buy__title", {
  scrollTrigger: {
    trigger: ".buy__title",
    start: "top 80%",
    toggleActions: "play none none reverse"
  },
  opacity: 0,
  clipPath: "inset(0 100% 0 0)",
  duration: 4,
  ease: "power3.out"
});
gsap.from(".buy__text", {
  scrollTrigger: {
    trigger: ".buy__text",
    start: "top 80%",
    toggleActions: "play none none reverse"
  },
  opacity: 0,
  clipPath: "inset(0 100% 0 0)",
  duration: 4,
  ease: "power3.out"
});
gsap.from(".buy__owner", {
  scrollTrigger: {
    trigger: ".buy__owner",
    start: "top 80%",
    toggleActions: "play none none reverse"
  },
  opacity: 0,
  clipPath: "inset(0 100% 0 0)",
  duration: 4,
  ease: "power3.out"
});
gsap.from(".buy__role", {
  scrollTrigger: {
    trigger: ".buy__role",
    start: "top 80%",
    toggleActions: "play none none reverse"
  },
  opacity: 0,
  clipPath: "inset(0 100% 0 0)",
  duration: 4,
  ease: "power3.out"
});
// gsap.from(".buy__box", {
//   scrollTrigger: {
//     trigger: ".buy__box",
//     start: "top 80%",
//     toggleActions: "play none none reverse"
//   },
//   opacity: 0,
//   clipPath: "inset(0 100% 0 0)",
//   duration: 4,
//   ease: "power3.out"
// });
