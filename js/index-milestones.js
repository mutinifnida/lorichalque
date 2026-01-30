/* =========================================================
   Home — Section 2 (Milestones)
   - Entrance animation (play once)
   - Click / keyboard toggle for extra text
   ========================================================= */

/* Entrance animation (play once) */
(() => {
  const section = document.querySelector(".section-2");
  if (!section) return;

  const root = document.body;
  let played = false;

  const observer = new IntersectionObserver(
    ([entry]) => {
      const isActive = entry.isIntersecting && entry.intersectionRatio >= 0.65;

      if (isActive && !played) {
        root.classList.add("home-s2-active");
        played = true;
      }
    },
    { threshold: [0.2, 0.65, 0.85] }
  );

  observer.observe(section);
})();

/* Milestone cards: toggle text (mouse + keyboard) */
(() => {
  const cards = document.querySelectorAll(".section-2 .milestone");
  if (!cards.length) return;

  cards.forEach((card) => {
    /* Accessibility without changing HTML structure */
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
