/* =========================================================
   Services — Microinteractions (play once)
   Triggers hero entrance animation when the hero screen becomes active.
   ========================================================= */
(() => {
  const section = document.querySelector(".services-hero-screen");
  if (!section) return;

  const root = document.body;
  let played = false;

  const observer = new IntersectionObserver(
    ([entry]) => {
      /*
        Pre-trigger before the snap lands to prevent flash
        and ensure the animation state is applied in advance.
      */
      if (entry.isIntersecting && !played) {
        root.classList.add("services-s1-active");
        played = true;
      }
    },
    {
      threshold: 0.01,
      rootMargin: "0px 0px -35% 0px"
    }
  );

  observer.observe(section);
})();
