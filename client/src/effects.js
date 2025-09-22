// src/effects.js
export function initEffects({ animateHeroBg = true } = {}) {
  if (typeof window === "undefined") return;

  // Reveal on scroll
  const io = new IntersectionObserver((entries) => {
    entries.forEach(en => {
      if (en.isIntersecting) en.target.classList.add("show");
    });
  }, { threshold: 0.12 });

  document.querySelectorAll(".reveal").forEach(el => io.observe(el));

  // Parallax tilt for hero-card
  const cards = document.querySelectorAll(".hero-card");
  cards.forEach(card => {
    card.addEventListener("mousemove", (e) => {
      const r = card.getBoundingClientRect();
      const cx = r.left + r.width/2;
      const cy = r.top + r.height/2;
      const dx = (e.clientX - cx) / r.width;
      const dy = (e.clientY - cy) / r.height;
      const rx = dy * 6; const ry = dx * -8;
      card.style.transform = `translateY(-6px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.01)`;
    });
    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });

  // hero background animate toggle
  if (animateHeroBg) {
    document.querySelectorAll(".hero-bg").forEach(bg => bg.style.opacity = "1");
  }

  // fab show/hide on scroll
  const fabs = document.querySelectorAll(".fab button");
  const toggleFabs = () => {
    const show = window.scrollY > 180;
    fabs.forEach(b => b.style.transform = show ? "translateY(0)" : "translateY(60px)");
    fabs.forEach(b => b.style.opacity = show ? "1" : "0");
  }
  window.addEventListener("scroll", toggleFabs);
  toggleFabs();
}
