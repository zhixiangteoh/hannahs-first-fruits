/* Hannah's First Fruits — mobile nav, footer year, live "tubs left" counter. */

/* ─────────────────────────────────────────────────────────────
   TUBS-LEFT COUNTER

   The number comes from `source` below. Two ways to run it:

   1) Simple (default): edit stock.json in this repo — change "left"
      and commit. The site updates itself a minute later. No code touched.

   2) Live, no redeploy: point `source` at a Google Sheet cell (or any
      URL that returns the number). Then you just edit the sheet and the
      site reflects it within ~a minute — nothing to commit.
      Google Sheet setup: put "left" in cell A1 and "total" in B1,
      File → Share → Publish to web, then use:
      source: "https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID/gviz/tq?tqx=out:csv&range=A1:B1"

   If the source can't be reached, it falls back to the numbers below.
   ───────────────────────────────────────────────────────────── */
const STOCK = {
  source: "stock.json",
  fallbackLeft: 10,
  fallbackTotal: 15,
  instagram: "https://www.instagram.com/hannahsfirstfruits/",
};

(async function tubsLeftCounter() {
  const el = document.getElementById("stock");
  const textEl = document.getElementById("stock-text");
  if (!el || !textEl) return;

  let left = STOCK.fallbackLeft;
  let total = STOCK.fallbackTotal;

  try {
    const url = STOCK.source + (STOCK.source.includes("?") ? "&" : "?") + "cb=" + Date.now();
    const res = await fetch(url, { cache: "no-store" });
    if (res.ok) {
      const raw = (await res.text()).trim();
      let json = null;
      try { json = JSON.parse(raw); } catch (_) { /* not JSON */ }
      if (json && typeof json === "object") {
        if (json.left != null) left = Number(json.left);
        if (json.total != null) total = Number(json.total);
      } else {
        const nums = raw.match(/-?\d+(\.\d+)?/g); // CSV / plain text
        if (nums && nums.length) {
          left = Number(nums[0]);
          if (nums.length > 1) total = Number(nums[1]);
        }
      }
    }
  } catch (_) { /* keep fallback numbers */ }

  if (!isFinite(left)) left = STOCK.fallbackLeft;
  if (!isFinite(total) || total <= 0) total = STOCK.fallbackTotal;
  left = Math.max(0, Math.min(left, total));

  el.classList.remove("is-low", "is-out");
  if (left <= 0) {
    el.classList.add("is-out");
    textEl.innerHTML =
      'Sold out this week — <a href="' + STOCK.instagram + '" target="_blank" rel="noopener">DM for the next batch</a>';
  } else {
    if (left <= 3) el.classList.add("is-low");
    textEl.innerHTML = "<strong>" + left + "</strong> of " + total + " tubs left this week";
  }
})();

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
