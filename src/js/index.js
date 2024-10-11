import mobileNav from "./modules/mobile-nav.js";
mobileNav();
//========================================================================================================================================================

const boxes = document.querySelectorAll(".production__box");

boxes.forEach((box) => {
  box.addEventListener("mouseover", () => {
    boxes.forEach((b) => {
      if (b !== box) {
        b.classList.add("hidden");
      }
    });
  });

  box.addEventListener("mouseleave", (event) => {
    if (!box.contains(event.relatedTarget)) {
      boxes.forEach((b) => {
        b.classList.remove("hidden");
      });
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
//svg hover
function animateSvg(targetWidth, targetHeight, targetViewBox, targetPath) {
  const svg = document.getElementById("animatedSvg");
  const path = document.getElementById("animatedPath");

  const currentWidth = parseFloat(svg.getAttribute("width"));
  const currentHeight = parseFloat(svg.getAttribute("height"));

  const widthDiff = targetWidth - currentWidth;
  const heightDiff = targetHeight - currentHeight;

  const steps = 30;
  let step = 0;

  function stepAnimation() {
    if (step < steps) {
      const newWidth = currentWidth + widthDiff * (step / steps);
      const newHeight = currentHeight + heightDiff * (step / steps);

      svg.setAttribute("width", newWidth);
      svg.setAttribute("height", newHeight);
      svg.setAttribute("viewBox", targetViewBox);

      step++;
      requestAnimationFrame(stepAnimation);
    } else {
      svg.setAttribute("width", targetWidth);
      svg.setAttribute("height", targetHeight);
      svg.setAttribute("viewBox", targetViewBox);
      path.setAttribute("d", targetPath);
    }
  }

  stepAnimation();
}

document.querySelector(".top-box__more").addEventListener("mouseenter", function () {
  animateSvg("71", "19", "0 0 71 19", "M0 9.5H70M70 9.5C66.8407 5.92105 66.8407 5.88513 62.5283 1M70 9.5C66.5445 13.4145 66.5762 13.4145 62.5283 18");
});

document.querySelector(".top-box__more").addEventListener("mouseleave", function () {
  animateSvg(
    "131",
    "19",
    "0 0 131 19",
    "M0 9.5H130M130 9.5C126.841 5.92105 126.841 5.88513 122.528 1M130 9.5C126.544 13.4145 126.576 13.4145 122.528 18"
  );
});
