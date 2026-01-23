/* =========================================================
   GLOBAL JS (shared across pages)
   - Header reactive state (scroll)
   - Mobile drawer menu (open/close)
   ========================================================= */

/* ---------- Header: reactive blur state ---------- */
(() => {
  const header = document.querySelector(".site-header");
  if (!header) return;

  const onScroll = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 8);
  };

  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
})();

/* ---------- Mobile drawer menu ---------- */
(() => {
  const toggleBtn = document.querySelector(".menu-toggle");
  const drawer = document.getElementById("mobileMenu");

  if (!toggleBtn || !drawer) return;

  const openMenu = () => {
    document.body.classList.add("menu-open");
    toggleBtn.setAttribute("aria-expanded", "true");
    toggleBtn.setAttribute("aria-label", "Close menu");
    drawer.setAttribute("aria-hidden", "false");

    // Optional (disabled): lock background scroll when menu is open.
    // document.documentElement.style.overflow = "hidden";
  };

  const closeMenu = () => {
    document.body.classList.remove("menu-open");
    toggleBtn.setAttribute("aria-expanded", "false");
    toggleBtn.setAttribute("aria-label", "Open menu");
    drawer.setAttribute("aria-hidden", "true");

    // Optional (disabled): unlock background scroll.
    // document.documentElement.style.overflow = "";
  };

  /* Toggle button */
  toggleBtn.addEventListener("click", () => {
    const isOpen = document.body.classList.contains("menu-open");
    if (isOpen) closeMenu();
    else openMenu();
  });

  /* Close when clicking the overlay (outside the panel) */
  drawer.addEventListener("click", (e) => {
    if (e.target === drawer) closeMenu();
  });

  /* Close when clicking a nav link */
  drawer.addEventListener("click", (e) => {
    const target = e.target;
    if (target instanceof HTMLAnchorElement) closeMenu();
  });

  /* Close on Escape */
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });

  /* Prevent edge case: if user resizes to desktop while menu is open */
  window.addEventListener("resize", () => {
    if (window.innerWidth >= 768 && document.body.classList.contains("menu-open")) {
      closeMenu();
    }
  });
})();
