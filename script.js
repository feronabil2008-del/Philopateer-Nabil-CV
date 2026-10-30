(() => {
  const root = document.documentElement;

  const setTheme = (theme) => {
    if (!theme) return;
    root.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  };

  const storedTheme = localStorage.getItem("theme");
  const systemPrefersLight =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: light)").matches;

  if (storedTheme === "light" || storedTheme === "dark") {
    setTheme(storedTheme);
  } else {
    setTheme(systemPrefersLight ? "light" : "dark");
  }

  const themeToggle = document.getElementById("themeToggle");
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const current = root.getAttribute("data-theme") || "dark";
      setTheme(current === "dark" ? "light" : "dark");
    });
  }

  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const triggers = Array.from(document.querySelectorAll("[data-acc-trigger]"));
  const panels = Array.from(document.querySelectorAll("[data-acc-panel]"));

  const closeAll = () => {
    triggers.forEach((t) => {
      t.setAttribute("aria-expanded", "false");
      const icon = t.querySelector(".acc-icon");
      if (icon) icon.textContent = "+";
    });
    panels.forEach((p) => {
      p.hidden = true;
    });
  };

  triggers.forEach((trigger) => {
    trigger.addEventListener("click", () => {
      const target = trigger.getAttribute("data-target");
      if (!target) return;

      const panel = document.querySelector(target);
      if (!panel) return;

      const isOpen = trigger.getAttribute("aria-expanded") === "true";

      closeAll();

      if (!isOpen) {
        trigger.setAttribute("aria-expanded", "true");
        panel.hidden = false;
        const icon = trigger.querySelector(".acc-icon");
        if (icon) icon.textContent = "−";
      }
    });
  });

  const scrollLinks = Array.from(document.querySelectorAll("[data-scroll]"));
  scrollLinks.forEach((a) => {
    a.addEventListener("click", (e) => {
      const href = a.getAttribute("href");
      if (!href || !href.startsWith("#")) return;

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
})();
