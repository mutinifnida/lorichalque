/* =========================================================
   Contact — Form submit (Netlify Forms)
   - Submits without page reload
   - Shows success / error message inline
   ========================================================= */
(() => {
  const form = document.querySelector('form.contact-form[name="contact"]');
  if (!form) return;

  const statusEl = form.querySelector(".contact-status");
  const submitBtn = form.querySelector('button[type="submit"]');

  const setStatus = (msg, type) => {
    if (!statusEl) return;
    statusEl.textContent = msg;
    statusEl.classList.remove("is-success", "is-error");
    if (type) statusEl.classList.add(type);
  };

  const encode = (formEl) => new URLSearchParams(new FormData(formEl)).toString();

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.style.opacity = "0.85";
    }

    setStatus("Sending…", null);

    try {
      const body = encode(form);

      const res = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body
      });

      if (!res.ok) throw new Error("Network response was not ok.");

      setStatus("Message sent. We’ll get back to you soon.", "is-success");
      form.reset();
    } catch (err) {
      setStatus("Something went wrong. Please try again or email us directly.", "is-error");
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.style.opacity = "";
      }
    }
  });
})();
