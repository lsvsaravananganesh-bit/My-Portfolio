const root = document.documentElement;
const themeButton = document.getElementById("theme-toggle");
const menuButton = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

function applyTheme(theme) {
  root.dataset.theme = theme;
  const isDark = theme === "dark";
  themeButton.textContent = isDark ? "☼" : "◐";
  themeButton.setAttribute("aria-label", isDark ? "Switch to light theme" : "Switch to dark theme");
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute("content", isDark ? "#191a18" : "#f3f0e8");
}
const storedTheme = localStorage.getItem("portfolio-theme");
applyTheme(storedTheme === "dark" ? "dark" : "light");
themeButton.addEventListener("click", () => {
  const next = root.dataset.theme === "dark" ? "light" : "dark";
  applyTheme(next);
  localStorage.setItem("portfolio-theme", next);
});

function closeMenu() {
  navLinks.classList.remove("open");
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "Open navigation");
}
menuButton.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(open));
  menuButton.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
});
navLinks.querySelectorAll("a").forEach(link => link.addEventListener("click", closeMenu));
document.addEventListener("keydown", event => { if (event.key === "Escape") closeMenu(); });

const year = document.getElementById("current-year");
if (year) year.textContent = new Date().getFullYear();

const revealTargets = document.querySelectorAll(".section-label,.profile-grid,.project,.capabilities article,.education-item,.milestone,.contact-section h2,.contact-intro,.contact-links");
if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const observer = new IntersectionObserver((entries, instance) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        instance.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealTargets.forEach(element => {
    element.classList.add("reveal");
    observer.observe(element);
  });
} else {
  revealTargets.forEach(element => element.classList.add("is-visible"));
}
