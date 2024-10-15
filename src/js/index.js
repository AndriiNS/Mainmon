import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import mobileNav from "./modules/mobile-nav.js";
gsap.registerPlugin(ScrollTrigger);
mobileNav();
//========================================================================================================================================================

const boxes = document.querySelectorAll(".production__box");

boxes.forEach((box) => {
  box.addEventListener("mouseover", () => {
    if (window.innerWidth > 1190) {
      boxes.forEach((b) => {
        if (b !== box) {
          b.classList.add("hidden");
        }
      });
    }
  });

  box.addEventListener("mouseleave", (event) => {
    if (window.innerWidth > 1190) {
      if (!box.contains(event.relatedTarget)) {
        boxes.forEach((b) => {
          b.classList.remove("hidden");
        });
      }
    }
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
});

const prevButton = document.querySelector(".swiper-btn-prev");
const nextButton = document.querySelector(".swiper-btn-next");
const prevButtonHigh = document.querySelector(".highlights-button-prev");
const nextButtonHigh = document.querySelector(".highlights-button-next");

function followCursorHorizontally(button, isNextButton = false) {
  button.addEventListener("mousemove", (event) => {
    const buttonRect = button.getBoundingClientRect();
    let x = event.clientX - buttonRect.left - buttonRect.width / 2;

    if (isNextButton) {
      x = -x;
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
//preloader + header
gsap
  .timeline({
    defaults: { ease: "power2.inOut", duration: 1 },
    onComplete: () => {
      document.body.style.overflow = "auto";
    }
  })
  .fromTo(".preloader img", { width: 0, height: 0, opacity: 0 }, { width: "150px", height: "150px", opacity: 1 })
  .to(".preloader__green", { left: "0%", duration: 3 }, "-=0.5")
  .fromTo(".preloader__text p:first-child", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 }, "-=2.5")
  .fromTo(".preloader__text p:last-child", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 }, "-=1.5")
  .to(".preloader", { opacity: 0, pointerEvents: "none", duration: 0.5, delay: 0.5 })
  .from(".header", { opacity: 0, y: -50, duration: 1, delay: 0 });

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
    .from(".header__content-title", { opacity: 0, y: 50, duration: 1 })
    .from(".header__content-text", { opacity: 0, y: 50, duration: 1 }, "-=0.5")
    .from(".header__content-crown img", { opacity: 0, scale: 0.5, duration: 1 }, "-=0.5");

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

gsap.from(".lifestyle__right-info img", {
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
  x: -250,
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
  x: 250,
  opacity: 0,
  duration: 2,
  ease: "power3.out"
});
