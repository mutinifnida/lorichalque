/* =========================================================
   Home — Section 1 microinteraction (play once)
   Triggers hero entrance animation when section becomes active.
   ========================================================= */
(() => {
  const section = document.querySelector(".section-1");
  if (!section) return;

  const root = document.body;
  let played = false;

  const observer = new IntersectionObserver(
    ([entry]) => {
      const isActive = entry.isIntersecting && entry.intersectionRatio >= 0.65;

      if (isActive && !played) {
        root.classList.add("home-s1-active");
        played = true;
      }
    },
    { threshold: [0.2, 0.65, 0.85] }
  );

  observer.observe(section);
})();
