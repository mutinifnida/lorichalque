(() => {
  const section2 = document.querySelector(".section-2");
  if (!section2) return;

  const root = document.body;
  let hasPlayed = false;

  const io = new IntersectionObserver(
    (entries) => {
      const entry = entries[0];
      const isActive = entry.isIntersecting && entry.intersectionRatio >= 0.65;

      // Play only once per page load
      if (isActive && !hasPlayed) {
        root.classList.add("home-s2-active");
        hasPlayed = true;
      }
    },
    { threshold: [0.2, 0.65, 0.85] }
  );

  io.observe(section2);
})();

(() => {
  const milestones = document.querySelectorAll(".section-2 .milestone");
  if (!milestones.length) return;

  milestones.forEach((card) => {
    // Accessibility without changing HTML structure
    card.setAttribute("role", "button");
    card.setAttribute("tabindex", "0");

    const toggle = () => {
      card.classList.toggle("is-open");
    };

    card.addEventListener("click", toggle);

    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggle();
      }
    });
  });
})();
