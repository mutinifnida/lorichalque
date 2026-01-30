/* =========================================================
   Contact — Microinteraction (play once)
   Triggers entrance animation when the contact screen becomes active.
   ========================================================= */
(() => {
  const screen = document.querySelector(".contact-screen");
  if (!screen) return;

  const root = document.body;
  let played = false;

  const observer = new IntersectionObserver(
    ([entry]) => {
      /*
        Pre-trigger before the snap lands to prevent flash
        and ensure the animation state is applied in advance.
      */
      if (entry.isIntersecting && !played) {
        root.classList.add("contact-s1-active");
        played = true;
      }
    },
    {
      threshold: 0.01,
      rootMargin: "0px 0px -35% 0px"
    }
  );

  observer.observe(screen);
})();
