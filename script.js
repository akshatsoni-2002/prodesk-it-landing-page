(() => {
  "use strict";

  const body = document.body;
  const themeToggle = document.getElementById("theme-toggle");
  const menuToggle = document.getElementById("menu-toggle");
  const navLinks = document.getElementById("nav-links");
  const navAnchors = document.querySelectorAll(".nav-link");
  const contactForm = document.getElementById("contact-form");
  const formStatus = document.getElementById("form-status");
  const currentYear = document.getElementById("current-year");

  // Keep the footer year current.
  if (currentYear) currentYear.textContent = String(new Date().getFullYear());

  // Restore the visitor's preferred theme when available.
  const savedTheme = localStorage.getItem("prodesk-theme");
  if (savedTheme === "dark") body.classList.add("dark-theme");

  function updateThemeButton() {
    if (!themeToggle) return;
    const dark = body.classList.contains("dark-theme");
    themeToggle.setAttribute("aria-label", dark ? "Switch to light mode" : "Switch to dark mode");
    themeToggle.title = dark ? "Switch to light mode" : "Switch to dark mode";
    themeToggle.innerHTML = dark
      ? '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42"></path></svg>'
      : '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.5 14.3A8.5 8.5 0 0 1 9.7 3.5 8.6 8.6 0 1 0 20.5 14.3Z"></path></svg>';
  }

  updateThemeButton();

  themeToggle?.addEventListener("click", () => {
    body.classList.toggle("dark-theme");
    const theme = body.classList.contains("dark-theme") ? "dark" : "light";
    try { localStorage.setItem("prodesk-theme", theme); } catch (_) { /* Theme still works for this page view. */ }
    updateThemeButton();
    console.info("[Prodesk IT] Theme changed:", theme);
  });

  // Mobile navigation menu.
  function closeMenu() {
    if (!menuToggle || !navLinks) return;
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
    navLinks.classList.remove("open");
  }

  menuToggle?.addEventListener("click", () => {
    const willOpen = menuToggle.getAttribute("aria-expanded") !== "true";
    menuToggle.setAttribute("aria-expanded", String(willOpen));
    menuToggle.setAttribute("aria-label", willOpen ? "Close navigation menu" : "Open navigation menu");
    navLinks?.classList.toggle("open", willOpen);
  });

  navLinks?.querySelectorAll("a").forEach(link => link.addEventListener("click", closeMenu));

  document.addEventListener("keydown", event => {
    if (event.key === "Escape") closeMenu();
  });

  // Highlight the current section in the navigation as it enters the viewport.
  const sections = document.querySelectorAll("main section[id]");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        navAnchors.forEach(link => {
          const active = link.getAttribute("href") === `#${entry.target.id}`;
          link.classList.toggle("active", active);
          if (active) link.setAttribute("aria-current", "location");
          else link.removeAttribute("aria-current");
        });
      });
    }, { rootMargin: "-25% 0px -60% 0px", threshold: 0 });
    sections.forEach(section => observer.observe(section));
  }

  // Accessible client-side validation. The demo prepares a mailto draft;
  // it does not pretend to send a message to a server.
  const fields = [
    { id: "contact-name", label: "Your name", validate: value => value.trim().length >= 2, message: "Please enter your name (at least 2 characters)." },
    { id: "contact-email", label: "Email address", validate: value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()), message: "Please enter a valid email address." },
    { id: "contact-service", label: "Service", validate: value => value.trim() !== "", message: "Please choose a service." },
    { id: "contact-message", label: "Project details", validate: value => value.trim().length >= 10, message: "Please enter at least 10 characters about your project." }
  ];

  function showError(field, message) {
    const input = document.getElementById(field.id);
    const error = document.getElementById(`${field.id}-error`);
    input?.setAttribute("aria-invalid", "true");
    if (error) error.textContent = message;
  }

  function clearError(field) {
    const input = document.getElementById(field.id);
    const error = document.getElementById(`${field.id}-error`);
    input?.removeAttribute("aria-invalid");
    if (error) error.textContent = "";
  }

  fields.forEach(field => {
    const input = document.getElementById(field.id);
    input?.addEventListener("input", () => clearError(field));
    input?.addEventListener("change", () => clearError(field));
  });

  contactForm?.addEventListener("submit", event => {
    event.preventDefault();
    let firstInvalid = null;

    fields.forEach(field => {
      const input = document.getElementById(field.id);
      if (!input) return;
      if (!field.validate(input.value)) {
        showError(field, field.message);
        if (!firstInvalid) firstInvalid = input;
      } else {
        clearError(field);
      }
    });

    if (firstInvalid) {
      if (formStatus) formStatus.textContent = "Please check the highlighted fields and try again.";
      firstInvalid.focus();
      return;
    }

    const name = document.getElementById("contact-name").value.trim();
    const email = document.getElementById("contact-email").value.trim();
    const service = document.getElementById("contact-service").value.trim();
    const message = document.getElementById("contact-message").value.trim();

    // Encode values for the email URL. No personal data is stored by this demo.
    const subject = encodeURIComponent(`Prodesk IT enquiry — ${service}`);
    const bodyText = encodeURIComponent(`Hello Prodesk IT,\n\nName: ${name}\nEmail: ${email}\nService: ${service}\n\nProject details:\n${message}`);
    if (formStatus) formStatus.textContent = "Your email draft is ready. If your email app did not open, contact info@prodesk.in directly.";
    console.info("[Prodesk IT] Contact form validated; opening an email draft.");
    window.location.href = `mailto:info@prodesk.in?subject=${subject}&body=${bodyText}`;
  });
})();
