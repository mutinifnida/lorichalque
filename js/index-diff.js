(() => {
  const section3 = document.querySelector(".section-3");
  if (!section3) return;

  const root = document.body;
  let hasPlayed = false;

  const io = new IntersectionObserver(
    (entries) => {
      const entry = entries[0];

      // Trigger a bit BEFORE section 3 is fully visible
      // so the animation state is applied before the snap lands.
      if (entry.isIntersecting && !hasPlayed) {
        root.classList.add("home-s3-active");
        hasPlayed = true;
      }
    },
    {
      threshold: 0.01,
      rootMargin: "0px 0px -35% 0px" // pre-trigger before fully entering viewport
    }
  );

  io.observe(section3);
})();
