document.body.classList.add("js-ready");

const root = document.documentElement;
const themeButton = document.getElementById("theme-toggle");
const menuButton = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

function setTheme(theme) {
  root.dataset.theme = theme;
  const light = theme === "light";
  themeButton.setAttribute("aria-label", light ? "Switch to dark theme" : "Switch to light theme");
  themeButton.setAttribute("title", light ? "Switch to dark theme" : "Switch to light theme");
  themeButton.querySelector(".theme-icon").textContent = light ? "☾" : "☼";
  const themeColor = document.querySelector('meta[name="theme-color"]');
  if (themeColor) themeColor.setAttribute("content", light ? "#f5f6f1" : "#0b0e12");
}

const savedTheme = localStorage.getItem("portfolio-theme");
if (savedTheme === "light" || savedTheme === "dark") setTheme(savedTheme);
else setTheme("dark");

themeButton.addEventListener("click", () => {
  const nextTheme = root.dataset.theme === "dark" ? "light" : "dark";
  setTheme(nextTheme);
  localStorage.setItem("portfolio-theme", nextTheme);
});

function closeMenu() {
  navLinks.classList.remove("open");
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "Open navigation");
}
menuButton.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
  menuButton.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
});
navLinks.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeMenu();
});

const year = document.getElementById("current-year");
if (year) year.textContent = new Date().getFullYear();

const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

const sections = document.querySelectorAll("main section[id]");
if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const activeId = entry.target.id;
      navLinks.querySelectorAll("a[href^='#']").forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === "#" + activeId);
      });
    });
  }, { rootMargin: "-35% 0px -55% 0px" });
  sections.forEach((section) => sectionObserver.observe(section));
}
