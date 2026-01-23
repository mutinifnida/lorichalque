/* =========================================================
   Services (V0.1) — Carousel controller
   - Prev/Next arrows (data-rail-prev / data-rail-next)
   - Dots (data-rail-dots)
   - Swipe/drag on the rail (pointer events)
   - Transition: OUT slides in swipe direction + fades (CSS classes)
   ========================================================= */

(() => {
  const titleEl = document.getElementById("railTitle");
  const textEl = document.getElementById("railText");
  const prevBtn = document.querySelector("[data-rail-prev]");
  const nextBtn = document.querySelector("[data-rail-next]");
  const dotsWrap = document.querySelector("[data-rail-dots]");
  const grid = document.querySelector(".rail-grid");

  if (!titleEl || !textEl || !prevBtn || !nextBtn || !dotsWrap || !grid) return;

  const ANIM_MS = 220; // must match CSS transition timing

  const items = [
    {
      title: "Business Strategy",
      text: "We support organizations in defining clear, scalable strategic direction aligned with real business conditions. Our work ranges from diagnosis to prioritization and execution of strategic decisions."
    },
    {
      title: "Advisory",
      text: "We provide advisory services with direct involvement alongside leadership teams and decision-makers. Our approach is close, responsible and confidential, supporting critical decisions in moments of transformation, growth or expansion."
    },
    {
      title: "Insights",
      text: "We transform complex data, information and scenarios into clear, actionable strategic insights. Our work connects deep analysis and practical decision-making, enabling organizations to move from understanding to action."
    },
    {
      title: "Market Analysis",
      text: "We conduct data-driven market analysis to support decisions with greater confidence and strategic clarity. Our work evaluates market scenarios, trends, competitive dynamics and growth opportunities. By combining quantitative analysis with strategic interpretation, we help organizations understand their position, assess risks and identify paths for expansion."
    },
    {
      title: "Business Intelligence",
      text: "We develop business intelligence solutions focused on clarity, efficiency and scalability. Our work supports KPI structuring and strategic data interpretation to drive performance and results."
    }
  ];

  let index = 0;

  const canInteract = () => document.body.classList.contains("services-carousel-active");

  const clearAnim = () => {
    grid.classList.remove("is-fading", "is-out-left", "is-out-right");
  };

  const renderDots = () => {
    dotsWrap.innerHTML = "";
    items.forEach((_, i) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "rail-dot" + (i === index ? " is-active" : "");
      b.addEventListener("click", () => setIndex(i));
      dotsWrap.appendChild(b);
    });
  };

  const syncDots = () => {
    Array.from(dotsWrap.children).forEach((el, di) => {
      el.classList.toggle("is-active", di === index);
    });
  };

  const setIndex = (i, direction = "next") => {
    index = (i + items.length) % items.length;

    const outClass = direction === "next" ? "is-out-left" : "is-out-right";

    // OUT (slide + fade)
    clearAnim();
    grid.classList.add(outClass);

    window.setTimeout(() => {
      // Swap copy
      titleEl.textContent = items[index].title;
      textEl.textContent = items[index].text;

      // Update dots
      syncDots();

      // IN: return to normal state (no slide-in)
      grid.classList.remove(outClass);
    }, ANIM_MS);
  };

  /* Controls */
  prevBtn.addEventListener("click", () => setIndex(index - 1, "prev"));
  nextBtn.addEventListener("click", () => setIndex(index + 1, "next"));

  /* Init */
  renderDots();
  setIndex(0);

  /* =========================================================
     Swipe / Drag (Pointer Events)
     - Dragging is enabled only when carousel screen is active.
     - Ignore pointerdown on controls to preserve clicks on desktop.
     ========================================================= */
  const railInner = document.querySelector(".services-rail-inner");
  if (!railInner) return;

  let startX = 0;
  let startY = 0;
  let deltaX = 0;
  let isPointerDown = false;
  let isHorizontalIntent = false;

  const SWIPE_TRIGGER = 60; // px needed to change slide
  const INTENT_TRIGGER = 10; // px needed to decide horizontal vs vertical

  const onDown = (e) => {
    if (!canInteract()) return;

    // Do not start drag-capture on arrow buttons or dots (keeps click working).
    if (e.target.closest("[data-rail-prev], [data-rail-next], .rail-dot, [data-rail-dots]")) {
      return;
    }

    isPointerDown = true;
    isHorizontalIntent = false;
    deltaX = 0;

    startX = e.clientX;
    startY = e.clientY;

    document.body.classList.add("is-dragging");
    railInner.setPointerCapture?.(e.pointerId);
  };

  const onMove = (e) => {
    if (!isPointerDown || !canInteract()) return;

    const dx = e.clientX - startX;
    const dy = e.clientY - startY;

    // Decide intent once (horizontal vs vertical).
    if (!isHorizontalIntent) {
      if (Math.abs(dx) > INTENT_TRIGGER && Math.abs(dx) > Math.abs(dy) + 4) {
        isHorizontalIntent = true;
      } else if (Math.abs(dy) > INTENT_TRIGGER && Math.abs(dy) > Math.abs(dx) + 4) {
        return; // vertical scroll intent
      }
    }

    if (!isHorizontalIntent) return;

    e.preventDefault();
    deltaX = dx;

    // Subtle drag feedback (keeps it light)
    grid.style.transform = `translateX(${dx * 0.08}px)`;
  };

  const onUp = () => {
    if (!isPointerDown) return;

    document.body.classList.remove("is-dragging");
    isPointerDown = false;

    // Reset drag feedback
    grid.style.transform = "";

    if (!canInteract()) return;

    if (Math.abs(deltaX) >= SWIPE_TRIGGER) {
      if (deltaX < 0) setIndex(index + 1, "next");
      else setIndex(index - 1, "prev");
    }

    deltaX = 0;
    isHorizontalIntent = false;
  };

  railInner.addEventListener("pointerdown", onDown, { passive: false });
  railInner.addEventListener("pointermove", onMove, { passive: false });
  railInner.addEventListener("pointerup", onUp, { passive: true });
  railInner.addEventListener("pointercancel", onUp, { passive: true });
  railInner.addEventListener("lostpointercapture", onUp, { passive: true });
})();
