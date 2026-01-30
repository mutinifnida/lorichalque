/* =========================================================
   About — Microinteractions (play once per section)
   Triggers entrance animations when sections become active.
   ========================================================= */
(() => {
  const root = document.body;

  const watchOnce = (selector, className) => {
    const section = document.querySelector(selector);
    if (!section) return;

    let played = false;

    const observer = new IntersectionObserver(
      ([entry]) => {
        /*
          Pre-trigger before the snap lands to avoid flash
          and ensure the animation state is applied in advance.
        */
        if (entry.isIntersecting && !played) {
          root.classList.add(className);
          played = true;
        }
      },
      {
        threshold: 0.01,
        rootMargin: "0px 0px -35% 0px"
      }
    );

    observer.observe(section);
  };

  watchOnce(".about-s1", "about-s1-active");
  watchOnce(".about-s2", "about-s2-active");
  watchOnce(".about-s3", "about-s3-active");
})();
