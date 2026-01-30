/* =========================================================
   GLOBAL JS
   Shared behavior across pages
   - Header reactive state (scroll)
   - Mobile drawer menu (open / close)
   ========================================================= */

/* =========================================================
   Header — reactive state on scroll
   ========================================================= */
(() => {
  const header = document.querySelector(".site-header");
  if (!header) return;

  const onScroll = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 8);
  };

  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
})();

/* =========================================================
   Mobile drawer menu
   ========================================================= */
(() => {
  const toggleBtn = document.querySelector(".menu-toggle");
  const drawer = document.getElementById("mobileMenu");

  if (!toggleBtn || !drawer) return;

  const openMenu = () => {
    document.body.classList.add("menu-open");
    toggleBtn.setAttribute("aria-expanded", "true");
    toggleBtn.setAttribute("aria-label", "Close menu");
    drawer.setAttribute("aria-hidden", "false");
  };

  const closeMenu = () => {
    document.body.classList.remove("menu-open");
    toggleBtn.setAttribute("aria-expanded", "false");
    toggleBtn.setAttribute("aria-label", "Open menu");
    drawer.setAttribute("aria-hidden", "true");
  };

  /* Toggle via button */
  toggleBtn.addEventListener("click", () => {
    const isOpen = document.body.classList.contains("menu-open");
    isOpen ? closeMenu() : openMenu();
  });

  /* Close when clicking outside the drawer panel */
  drawer.addEventListener("click", (e) => {
    if (e.target === drawer) closeMenu();
  });

  /* Close when clicking a navigation link */
  drawer.addEventListener("click", (e) => {
    if (e.target instanceof HTMLAnchorElement) {
      closeMenu();
    }
  });

  /* Close on Escape key */
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });

  /* Safety: close menu if viewport switches to desktop */
  window.addEventListener("resize", () => {
    if (window.innerWidth >= 768 && document.body.classList.contains("menu-open")) {
      closeMenu();
    }
  });
})();
