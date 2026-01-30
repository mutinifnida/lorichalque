/* =========================================================
   Home — Header theme by section
   Applies header color variables based on the active snap section.
   ========================================================= */
(() => {
  const sections = Array.from(document.querySelectorAll(".snap-section"));
  if (!sections.length) return;

  const root = document.body;

  /* Last applied section theme (used to restore after menu closes) */
  let lastTheme = {
    brand: null,
    nav: null,
    navHover: null,
    navBg: null
  };

  const setVars = ({ brand, nav, navHover, navBg }) => {
    if (brand) root.style.setProperty("--brand-color", brand);
    if (nav) root.style.setProperty("--nav-color", nav);
    if (navHover) root.style.setProperty("--nav-hover-color", navHover);
    if (navBg) root.style.setProperty("--nav-hover-bg", navBg);
  };

  const readTheme = (el) => ({
    brand: el.dataset.brand || null,
    nav: el.dataset.nav || null,
    navHover: el.dataset.navHover || null,
    navBg: el.dataset.navBg || null
  });

  const applySectionTheme = (el) => {
    lastTheme = readTheme(el);

    /* If the mobile drawer is open, keep the forced menu theme */
    if (root.classList.contains("menu-open")) return;

    setVars(lastTheme);
  };

  const applyMenuTheme = () => {
    root.style.setProperty("--brand-color", "#e3e3e3");
    root.style.setProperty("--nav-color", "#e3e3e3");
    root.style.setProperty("--nav-hover-color", "#e3e3e3");
  };

  /* Initial state: first section */
  applySectionTheme(sections[0]);

  /* Observe visible section */
  const observer = new IntersectionObserver(
    (entries) => {
      const active = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (active?.target) applySectionTheme(active.target);
    },
    { threshold: [0.55, 0.7, 0.85] }
  );

  sections.forEach((section) => observer.observe(section));

  /* React to menu open / close */
  const mutation = new MutationObserver(() => {
    const menuOpen = root.classList.contains("menu-open");
    menuOpen ? applyMenuTheme() : setVars(lastTheme);
  });

  mutation.observe(root, {
    attributes: true,
    attributeFilter: ["class"]
  });
})();
