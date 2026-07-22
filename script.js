/* ═══════════════════════════════════════════════════════════
   Hannah's First Fruits — small bits of interactivity.
   Everything Hannah needs to edit lives in CONFIG below.
   ═══════════════════════════════════════════════════════════ */

const CONFIG = {
  // Hannah's WhatsApp number in international format, digits only.
  // e.g. Singapore +65 8123 4567  ->  "6581234567"
  // Leave blank ("") to hide WhatsApp buttons and fall back to Instagram.
  whatsapp: "",

  // The message pre-filled when a customer taps "Order on WhatsApp".
  orderMessage:
    "Hi Hannah! I'd like to order from Hannah's First Fruits 🍦\n\n" +
    "• Flavour / size / qty:\n• Preferred collection date:\n• Preferred time slot:\n• Name:",

  instagram: "https://www.instagram.com/hannahsfirstfruits/",
};

/* ---------- wire up WhatsApp / order buttons ---------- */
(function setupOrderLinks() {
  const hasWa = CONFIG.whatsapp.trim().length > 0;

  const waHref = hasWa
    ? `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(CONFIG.orderMessage)}`
    : CONFIG.instagram;

  document.querySelectorAll("#whatsapp-btn, #whatsapp-footer").forEach((el) => {
    el.href = waHref;
    if (!hasWa) el.textContent = el.id === "whatsapp-footer" ? "Message on Instagram" : "Order via Instagram";
  });

  // "Order <flavour>" buttons prefill the flavour when WhatsApp is set.
  document.querySelectorAll(".order-link[data-flavour]").forEach((el) => {
    if (!hasWa) return;
    el.addEventListener("click", (e) => {
      e.preventDefault();
      const msg = CONFIG.orderMessage.replace(
        "• Flavour / size / qty:",
        `• Flavour / size / qty: ${el.dataset.flavour} — `
      );
      window.open(`https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(msg)}`, "_blank");
    });
  });
})();

/* ---------- mobile nav toggle ---------- */
(function setupMobileNav() {
  const toggle = document.querySelector(".nav-toggle");
  const menu = document.getElementById("mobile-nav");
  if (!toggle || !menu) return;

  const close = () => {
    toggle.setAttribute("aria-expanded", "false");
    menu.hidden = true;
  };

  toggle.addEventListener("click", () => {
    const open = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!open));
    menu.hidden = open;
  });

  menu.querySelectorAll("a").forEach((a) => a.addEventListener("click", close));
})();

/* ---------- current year in footer ---------- */
(function () {
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
})();
