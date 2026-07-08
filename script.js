const header = document.querySelector("[data-header]");
const mobileStickyCta = document.querySelector(".mobile-sticky-cta");

const updateHeader = () => {
  if (header) {
    header.classList.toggle("is-scrolled", window.scrollY > 24);
  }

  if (mobileStickyCta) {
    mobileStickyCta.classList.toggle("is-visible", window.scrollY > 520);
  }
};

window.addEventListener("scroll", updateHeader, { passive: true });
updateHeader();

document.querySelectorAll("[data-accordion-group]").forEach((group) => {
  const triggers = group.querySelectorAll(".accordion-trigger");

  triggers.forEach((trigger) => {
    trigger.addEventListener("click", () => {
      const panelId = trigger.getAttribute("aria-controls");
      const panel = panelId ? document.getElementById(panelId) : null;
      const isOpen = trigger.getAttribute("aria-expanded") === "true";

      triggers.forEach((otherTrigger) => {
        const otherPanelId = otherTrigger.getAttribute("aria-controls");
        const otherPanel = otherPanelId ? document.getElementById(otherPanelId) : null;
        otherTrigger.setAttribute("aria-expanded", "false");
        if (otherPanel) otherPanel.hidden = true;
      });

      trigger.setAttribute("aria-expanded", String(!isOpen));
      if (panel) panel.hidden = isOpen;
    });
  });
});

const countdownHours = document.querySelector("[data-countdown-hours]");
const countdownMinutes = document.querySelector("[data-countdown-minutes]");
const countdownSeconds = document.querySelector("[data-countdown-seconds]");

const padTime = (value) => String(value).padStart(2, "0");

const updateCountdown = () => {
  if (!countdownHours || !countdownMinutes || !countdownSeconds) return;

  const now = new Date();
  const midnight = new Date(now);
  midnight.setHours(24, 0, 0, 0);

  const diff = Math.max(0, midnight - now);
  const totalSeconds = Math.floor(diff / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  countdownHours.textContent = padTime(hours);
  countdownMinutes.textContent = padTime(minutes);
  countdownSeconds.textContent = padTime(seconds);
};

updateCountdown();
setInterval(updateCountdown, 1000);

if (window.lucide) {
  window.lucide.createIcons({
    attrs: {
      "stroke-width": 2,
      "aria-hidden": "true"
    }
  });
}
