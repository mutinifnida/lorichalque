(() => {
  const root = document.body;

  const watchOnce = (selector, className) => {
    const el = document.querySelector(selector);
    if (!el) return;

    let hasPlayed = false;

    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];

        // Pre-trigger before the snap lands to avoid flash
        if (entry.isIntersecting && !hasPlayed) {
          root.classList.add(className);
          hasPlayed = true;
        }
      },
      {
        threshold: 0.01,
        rootMargin: "0px 0px -35% 0px"
      }
    );

    io.observe(el);
  };

  watchOnce(".about-s1", "about-s1-active");
  watchOnce(".about-s2", "about-s2-active");
  watchOnce(".about-s3", "about-s3-active");
})();
