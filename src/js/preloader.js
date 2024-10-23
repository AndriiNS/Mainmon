import { gsap } from "gsap";
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
const anotherPagesBtn = document.querySelector(".another-pages");
const anotherPagesBlock = document.querySelector(".another-pages__wrapper");

anotherPagesBtn.addEventListener("click", () => {
  anotherPagesBlock.classList.toggle("active");
});
