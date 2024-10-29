import Swiper from "swiper/bundle";

import "swiper/css/bundle";
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

const swiper = new Swiper(".swiper", {
  loop: true,
  slidesPerView: 3,
  navigation: {
    nextEl: ".swiper-btn-next",
    prevEl: ".swiper-btn-prev"
  }
});
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

const buttons = document.querySelectorAll(".plist__cards2-card");

buttons.forEach((button) => {
  button.addEventListener("mousemove", function (e) {
    const rect = button.getBoundingClientRect();
    const startX = e.clientX - rect.left;
    const startY = e.clientY - rect.top;

    button.style.setProperty("--x", `${startX}px`);
    button.style.setProperty("--y", `${startY}px`);

    button.classList.add("hover");
  });

  button.addEventListener("mouseleave", function () {
    button.classList.remove("hover");
  });
});
