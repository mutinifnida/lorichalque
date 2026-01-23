(() => {
  const sections = Array.from(document.querySelectorAll(".snap-section"));
  if (!sections.length) return;

  const root = document.body;

  // Stores the last "section theme" so we can restore after menu closes
  let lastTheme = {
    brand: null,
    nav: null,
    navHover: null,
    navBg: null
  };

  const setVars = (theme) => {
    if (theme.brand) root.style.setProperty("--brand-color", theme.brand);
    if (theme.nav) root.style.setProperty("--nav-color", theme.nav);
    if (theme.navHover) root.style.setProperty("--nav-hover-color", theme.navHover);
    if (theme.navBg) root.style.setProperty("--nav-hover-bg", theme.navBg);
  };

  const readThemeFrom = (el) => ({
    brand: el.dataset.brand || null,
    nav: el.dataset.nav || null,
    navHover: el.dataset.navHover || null,
    navBg: el.dataset.navBg || null
  });

  const applySectionTheme = (el) => {
    lastTheme = readThemeFrom(el);
    // If the menu is open, keep the forced theme
    if (root.classList.contains("menu-open")) return;
    setVars(lastTheme);
  };

  const applyMenuOpenTheme = () => {
    // Force a visible theme for the dark drawer
    root.style.setProperty("--brand-color", "#e3e3e3");
    root.style.setProperty("--nav-color", "#e3e3e3");
    root.style.setProperty("--nav-hover-color", "#e3e3e3");
  };

  // Initial apply (first section)
  applySectionTheme(sections[0]);

  const io = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (visible?.target) applySectionTheme(visible.target);
    },
    { threshold: [0.55, 0.7, 0.85] }
  );

  sections.forEach((s) => io.observe(s));

  // Observe body class changes (menu-open toggles)
  const mo = new MutationObserver(() => {
    const isOpen = root.classList.contains("menu-open");
    if (isOpen) applyMenuOpenTheme();
    else setVars(lastTheme);
  });

  mo.observe(root, { attributes: true, attributeFilter: ["class"] });
})();
