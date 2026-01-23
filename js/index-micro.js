(() => {
  const section1 = document.querySelector(".section-1");
  if (!section1) return;

  const root = document.body;
  let hasPlayed = false;

  const io = new IntersectionObserver(
    (entries) => {
      const entry = entries[0];
      const isActive = entry.isIntersecting && entry.intersectionRatio >= 0.65;

      // Play only once per page load (prevents visual "flash" on re-enter)
      if (isActive && !hasPlayed) {
        root.classList.add("home-s1-active");
        hasPlayed = true;
      }
    },
    { threshold: [0.2, 0.65, 0.85] }
  );

  io.observe(section1);
})();
