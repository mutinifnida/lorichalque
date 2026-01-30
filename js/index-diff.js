/* =========================================================
   Home — Section 3 (Differentiator)
   Entrance animation (play once)
   ========================================================= */
(() => {
  const section = document.querySelector(".section-3");
  if (!section) return;

  const root = document.body;
  let played = false;

  const observer = new IntersectionObserver(
    ([entry]) => {
      /*
        Trigger slightly before the section fully snaps into view,
        ensuring the animation state is applied in advance.
      */
      if (entry.isIntersecting && !played) {
        root.classList.add("home-s3-active");
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
