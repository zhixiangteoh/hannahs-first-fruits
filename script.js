/* Hannah's First Fruits — mobile nav, footer year, tubs-left counter. */

/* ─────────────────────────────────────────────────────────────
   TUBS-LEFT COUNTER  (reads from a Google Sheet — no redeploy)

   To update the number each week you just edit a cell in the sheet.

   ONE-TIME SETUP:
     1. Make a NEW Google Sheet (keep it separate from any private data —
        it will be publicly readable). Put the number left in cell A1 and
        the weekly total in B1  (e.g.  A1 = 10 , B1 = 15).
     2. File → Share → Publish to web → pick that sheet →
        "Comma-separated values (.csv)" → Publish. Copy the link.
     3. Paste that link into `sheetCsvUrl` below.

   After that: edit A1 in the sheet (phone app is fine) and the site shows
   the new number within a few minutes. If the sheet can't be read, the
   fallback numbers below are shown so the banner never breaks.
   ───────────────────────────────────────────────────────────── */
const STOCK = {
  sheetCsvUrl: "",          // ← paste your published Google Sheet CSV link here
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

  if (STOCK.sheetCsvUrl) {
    try {
      const url = STOCK.sheetCsvUrl + (STOCK.sheetCsvUrl.includes("?") ? "&" : "?") + "cb=" + Date.now();
      const res = await fetch(url, { cache: "no-store" });
      if (res.ok) {
        const nums = (await res.text()).match(/-?\d+(\.\d+)?/g); // first two numbers = left, total
        if (nums && nums.length) {
          left = Number(nums[0]);
          if (nums.length > 1) total = Number(nums[1]);
        }
      }
    } catch (_) { /* keep fallback numbers */ }
  }

  if (!isFinite(left)) left = STOCK.fallbackLeft;
  if (!isFinite(total) || total <= 0) total = STOCK.fallbackTotal;
  left = Math.max(0, Math.min(left, total));

  el.classList.remove("is-low", "is-out");
  if (left <= 0) {
    el.classList.add("is-out");
    textEl.innerHTML =
      'Sold out this week — <a href="' + STOCK.instagram + '" target="_blank" rel="noopener">DM for the next batch</a>';
  } else if (left <= 3) {
    el.classList.add("is-low");
    textEl.innerHTML = "Only <strong>" + left + "</strong> tub" + (left === 1 ? "" : "s") + " left this week";
  } else {
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
