/* ============================================================
   Arktera Systems — script.js
   Handles: custom cursor, nav scroll, theme toggle,
            hero canvas, reveal-on-scroll, counter animation,
            mobile menu, panel bar init, parallax
   ============================================================ */

"use strict";

/* ── UTILITIES ── */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
const lerp = (a, b, t) => a + (b - a) * t;

/* ── THEME TOGGLE ── */
(function initTheme() {
  const btn = $("#themeToggle");
  const root = document.documentElement;
  const stored = localStorage.getItem("lumen-theme") || "dark";
  root.setAttribute("data-theme", stored);

  btn.addEventListener("click", () => {
    const current = root.getAttribute("data-theme");
    const next = current === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    localStorage.setItem("lumen-theme", next);
  });
})();

/* ── CUSTOM CURSOR ── */
(function initCursor() {
  const cursor = $("#cursor");
  const follower = $("#cursorFollower");
  if (!cursor || !follower) return;

  let mx = -100,
    my = -100,
    fx = -100,
    fy = -100;

  document.addEventListener("mousemove", (e) => {
    mx = e.clientX;
    my = e.clientY;
    cursor.style.left = mx + "px";
    cursor.style.top = my + "px";
  });

  function animateFollower() {
    fx = lerp(fx, mx, 0.1);
    fy = lerp(fy, my, 0.1);
    follower.style.left = fx + "px";
    follower.style.top = fy + "px";
    requestAnimationFrame(animateFollower);
  }
  animateFollower();

  const hoverables = $$(
    "a, button, .service-card, .breakdown-card, .insight-card, .problem-card",
  );
  hoverables.forEach((el) => {
    el.addEventListener("mouseenter", () => {
      cursor.classList.add("hovering");
      follower.classList.add("hovering");
    });
    el.addEventListener("mouseleave", () => {
      cursor.classList.remove("hovering");
      follower.classList.remove("hovering");
    });
  });
})();

/* ── NAV SCROLL BEHAVIOR ── */
(function initNav() {
  const nav = $("#nav");
  let lastY = 0;

  window.addEventListener(
    "scroll",
    () => {
      const y = window.scrollY;
      if (y > 60) {
        nav.classList.add("scrolled");
      } else {
        nav.classList.remove("scrolled");
      }
      lastY = y;
    },
    { passive: true },
  );

  // Smooth close on link click
  $$(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      const menu = $("#mobileMenu");
      const burger = $("#navHamburger");
      if (menu && menu.classList.contains("open")) {
        menu.classList.remove("open");
        burger.classList.remove("open");
        document.body.style.overflow = "";
      }
    });
  });
})();

/* ── MOBILE MENU ── */
(function initMobileMenu() {
  const burger = $("#navHamburger");
  const menu = $("#mobileMenu");
  if (!burger || !menu) return;

  burger.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("open");
    burger.classList.toggle("open", isOpen);
    document.body.style.overflow = isOpen ? "hidden" : "";
  });
})();

/* ── HERO CANVAS (particle field) ── */
(function initHeroCanvas() {
  const canvas = $("#heroCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  let W,
    H,
    particles = [],
    animId;
  const NUM = 60;

  function resize() {
    W = canvas.width = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }

  function createParticles() {
    particles = Array.from({ length: NUM }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.5 + 0.3,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.2,
      alpha: Math.random() * 0.5 + 0.1,
      phase: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.01 + 0.005,
    }));
  }

  function getAccentColor() {
    const theme = document.documentElement.getAttribute("data-theme");
    return theme === "light" ? "0, 120, 130" : "50, 200, 210";
  }

  let frame = 0;
  function draw() {
    ctx.clearRect(0, 0, W, H);
    frame++;

    const rgb = getAccentColor();

    particles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0) p.x = W;
      if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = H;
      if (p.y > H) p.y = 0;

      const alpha = p.alpha * (0.6 + 0.4 * Math.sin(frame * p.speed + p.phase));
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${rgb}, ${alpha})`;
      ctx.fill();
    });

    // Draw connections
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(${rgb}, ${0.08 * (1 - dist / 120)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }

    animId = requestAnimationFrame(draw);
  }

  function init() {
    resize();
    createParticles();
    if (animId) cancelAnimationFrame(animId);
    draw();
  }

  const ro = new ResizeObserver(() => {
    resize();
    createParticles();
  });
  ro.observe(canvas.parentElement);

  window.addEventListener("load", init);
})();

/* ── COUNTER ANIMATION ── */
function animateCounter(el) {
  const target = parseInt(el.getAttribute("data-count"), 10);
  const duration = 1800;
  const start = performance.now();

  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(eased * target);
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

/* ── REVEAL ON SCROLL (IntersectionObserver) ── */
(function initReveal() {
  const items = $$(".reveal-up");
  const barFills = $$(".panel-bar-fill");
  const counters = $$("[data-count]");

  const revealObs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -60px 0px" },
  );

  items.forEach((el) => revealObs.observe(el));

  // Bar fills (hero panels)
  const barObs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const fill = entry.target;
          const width = fill.style.width;
          fill.style.width = "0";
          setTimeout(() => {
            fill.style.width = width;
          }, 100);
          barObs.unobserve(fill);
        }
      });
    },
    { threshold: 0.5 },
  );
  barFills.forEach((el) => barObs.observe(el));

  // Counters
  const counterObs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 },
  );
  counters.forEach((el) => counterObs.observe(el));
})();

/* ── ACTIVE NAV LINK (scroll spy) ── */
(function initScrollSpy() {
  const sections = $$("section[id], div[id]");
  const navLinks = $$(".nav-link");

  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navLinks.forEach((link) => link.classList.remove("active"));
          const active = navLinks.find(
            (link) => link.getAttribute("href") === "#" + entry.target.id,
          );
          if (active) active.classList.add("active");
        }
      });
    },
    { threshold: 0.4 },
  );

  sections.forEach((s) => obs.observe(s));
})();

/* ── HERO PARALLAX (subtle, on mouse) ── */
(function initParallax() {
  const hero = $(".hero");
  const glows = $$(".hero-glow");
  if (!hero) return;

  let targetX = 0,
    targetY = 0,
    currentX = 0,
    currentY = 0;

  hero.addEventListener("mousemove", (e) => {
    const rect = hero.getBoundingClientRect();
    targetX = (e.clientX - rect.left - rect.width / 2) / rect.width;
    targetY = (e.clientY - rect.top - rect.height / 2) / rect.height;
  });

  function animateParallax() {
    currentX = lerp(currentX, targetX, 0.04);
    currentY = lerp(currentY, targetY, 0.04);

    glows.forEach((glow, i) => {
      const factor = (i + 1) * 18;
      glow.style.transform = `translate(${currentX * factor}px, ${currentY * factor}px)`;
    });

    requestAnimationFrame(animateParallax);
  }
  animateParallax();
})();

/* ── SMOOTH ANCHOR SCROLL ── */
document.addEventListener("click", (e) => {
  const link = e.target.closest('a[href^="#"]');
  if (!link) return;
  const id = link.getAttribute("href").slice(1);
  const target = document.getElementById(id);
  if (target) {
    e.preventDefault();
    const offset = 80;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: "smooth" });
  }
});

/* ── SERVICE CARD 3D TILT (subtle) ── */
(function initTilt() {
  const cards = $$(".service-card");

  cards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const rx = ((e.clientY - cy) / rect.height) * -6;
      const ry = ((e.clientX - cx) / rect.width) * 6;
      card.style.transform = `translateY(-6px) rotateX(${rx}deg) rotateY(${ry}deg)`;
      card.style.transition = "box-shadow 0.15s, border-color 0.15s";
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
      card.style.transition = "all 0.35s ease";
    });
  });
})();

/* ── INSIGHT CARD HOVER LIFT ── */
(function initInsightHover() {
  $$(".insight-card").forEach((card) => {
    card.addEventListener("mouseenter", () => {
      card.querySelector(
        ".insight-chart svg polyline, .insight-chart svg rect, .insight-chart svg circle",
      );
    });
  });
})();

/* ── ACTIVE NAV LINK STYLE (inject CSS) ── */
(function addActiveStyle() {
  const style = document.createElement("style");
  style.textContent = `.nav-link.active { color: var(--accent) !important; }`;
  document.head.appendChild(style);
})();

/* ── INIT COMPLETE ── */
console.log(
  "%cArktera Systems",
  "font-family:monospace;font-size:18px;font-weight:bold;color:#32C8D2;",
);
console.log(
  "%cRevenue Systems for Service Businesses",
  "font-family:monospace;font-size:11px;color:#6b9aa8;",
);
