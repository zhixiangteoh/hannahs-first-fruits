/* Hannah's First Fruits — mobile nav + footer year. */

/* mobile nav toggle */
(function () {
  const toggle = document.querySelector(".nav-toggle");
  const menu = document.getElementById("mobile-nav");
  if (!toggle || !menu) return;
  const close = () => { toggle.setAttribute("aria-expanded", "false"); menu.hidden = true; };
  toggle.addEventListener("click", () => {
    const open = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!open));
    menu.hidden = open;
  });
  menu.querySelectorAll("a").forEach((a) => a.addEventListener("click", close));
})();

/* current year */
(function () {
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
})();
