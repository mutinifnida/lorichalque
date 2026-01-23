/* =========================================================
   Services (V0.1) — Screen state detection
   - Adds/removes body.services-carousel-active based on screen 2 visibility.
   - Used to trigger rail expansion, dots/arrows visibility and interactions.
   ========================================================= */

(() => {
  const carouselScreen = document.querySelector(".services-carousel-screen");
  if (!carouselScreen) return;

  const root = document.body;

  const io = new IntersectionObserver(
    (entries) => {
      const entry = entries[0];
      const isActive = entry.intersectionRatio >= 0.6;
      root.classList.toggle("services-carousel-active", isActive);
    },
    { threshold: [0, 0.3, 0.6, 0.85, 1] }
  );

  io.observe(carouselScreen);
})();
