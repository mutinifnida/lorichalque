(() => {
  const heroScreen = document.querySelector(".services-hero-screen");
  if (!heroScreen) return;

  const root = document.body;
  let hasPlayed = false;

  const io = new IntersectionObserver(
    (entries) => {
      const entry = entries[0];

      // Pre-trigger before snap lands (prevents flash)
      if (entry.isIntersecting && !hasPlayed) {
        root.classList.add("services-s1-active");
        hasPlayed = true;
      }
    },
    {
      threshold: 0.01,
      rootMargin: "0px 0px -35% 0px"
    }
  );

  io.observe(heroScreen);
})();
