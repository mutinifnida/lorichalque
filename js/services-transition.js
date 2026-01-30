/* =========================================================
   Services — Carousel screen state
   Toggles services-carousel-active based on screen visibility.
   ========================================================= */
(() => {
  const carouselScreen = document.querySelector(".services-carousel-screen");
  if (!carouselScreen) return;

  const root = document.body;

  const observer = new IntersectionObserver(
    ([entry]) => {
      const isActive = entry.intersectionRatio >= 0.6;
      root.classList.toggle("services-carousel-active", isActive);
    },
    { threshold: [0, 0.3, 0.6, 0.85, 1] }
  );

  observer.observe(carouselScreen);
})();
