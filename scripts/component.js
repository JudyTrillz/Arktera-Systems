/**
 * ARKTERA SYSTEMS — Shared Component System
 * Injects nav, mobile menu, cursor, and footer into every page.
 * Call initComponents() once per page. Pass activePage string to highlight nav.
 */

const LOGO_SVG = `
<svg class="logo-svg" viewBox="0 0 148 38" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <!--
    ARKTERA SYSTEMS — Proprietary Mark
    Symbol concept: a structural node lattice — three vertices connected
    by precise struts forming a stable triangular frame with a central
    axis. Communicates: systems, architecture, connection, infrastructure.
    Thin-line, geometric, monochrome, scalable.
  -->

  <!-- Outer structural frame — equilateral triangle, apex up -->
  <polygon
    points="17,4 30,27 4,27"
    stroke="currentColor" stroke-width="1.5"
    stroke-linejoin="round" fill="none"/>

  <!-- Inner precision frame — smaller concentric triangle, apex down -->
  <polygon
    points="17,22 23.5,11 10.5,11"
    stroke="currentColor" stroke-width="1"
    stroke-linejoin="round" fill="none" opacity="0.55"/>

  <!-- Central axis — vertical spine from apex to base midpoint -->
  <line x1="17" y1="4" x2="17" y2="27"
    stroke="currentColor" stroke-width="1"
    stroke-linecap="round" opacity="0.4"/>

  <!-- Node vertices — three structural connection points -->
  <circle cx="17" cy="4"  r="2"   fill="currentColor" class="logo-dot"/>
  <circle cx="4"  cy="27" r="1.4" fill="currentColor" opacity="0.65"/>
  <circle cx="30" cy="27" r="1.4" fill="currentColor" opacity="0.65"/>

  <!-- Central node — system core -->
  <circle cx="17" cy="17" r="1.8" fill="none"
    stroke="currentColor" stroke-width="1" opacity="0.7"/>
  <circle cx="17" cy="17" r="0.7" fill="currentColor"/>

  <!-- Wordmark -->
  <text x="40" y="21"
    font-family="Space Grotesk, sans-serif"
    font-size="13" font-weight="600"
    letter-spacing="0.1em"
    fill="currentColor">ARKTERA</text>
  <text x="40" y="32"
    font-family="IBM Plex Mono, monospace"
    font-size="6.5" font-weight="300"
    letter-spacing="0.28em"
    fill="currentColor" opacity="0.55">SYSTEMS</text>
</svg>`;

// Resolve base path dynamically based on current page depth
const _depth = (window.location.pathname.match(/\//g) || []).length - 1;
const _base = _depth >= 2 ? "../" : "/";
const HOME_PATH = _base;
const PAGE_PATH = _base + "pages/";

const NAV_LINKS = [
  { href: HOME_PATH, label: "Home", key: "home" },

  {
    href: PAGE_PATH + "about.html",
    label: "About",
    key: "about",
  },

  {
    href: PAGE_PATH + "services.html",
    label: "Services",
    key: "services",
  },

  {
    href: PAGE_PATH + "breakdowns.html",
    label: "Breakdowns",
    key: "breakdowns",
  },

  {
    href: PAGE_PATH + "insights.html",
    label: "Insights",
    key: "insights",
  },

  {
    href: PAGE_PATH + "contact.html",
    label: "Contact",
    key: "contact",
  },
];

function buildNavLinks(activePage) {
  return NAV_LINKS.map((link) => {
    const isActive = link.key === activePage;
    return `<li role="none">
      <a href="${link.href}" class="nav-link${isActive ? " nav-link--active" : ""}"
         role="menuitem" ${isActive ? 'aria-current="page"' : ""}>${link.label}</a>
    </li>`;
  }).join("");
}

function buildMobileLinks(activePage) {
  return NAV_LINKS.map((link) => {
    const isActive = link.key === activePage;
    return `<li>
      <a href="${link.href}" class="nav-link${isActive ? " nav-link--active" : ""}"
         ${isActive ? 'aria-current="page"' : ""}>${link.label}</a>
    </li>`;
  }).join("");
}

function injectNav(activePage) {
  const nav = document.createElement("header");
  nav.id = "siteHeader";
  nav.innerHTML = `
    <div class="cursor" id="cursor" aria-hidden="true"></div>
    <div class="cursor-follower" id="cursorFollower" aria-hidden="true"></div>

    <nav class="nav" id="nav" role="navigation" aria-label="Main navigation">
      <div class="nav-inner">
        <a href="${HOME_PATH}" class="nav-logo" aria-label="Arktera Systems — Home">
          ${LOGO_SVG}
        </a>
        <ul class="nav-links" id="navLinks" role="menubar" aria-label="Site navigation">
          ${buildNavLinks(activePage)}
        </ul>
        <div class="nav-actions">
          <button class="theme-toggle" id="themeToggle" aria-label="Toggle colour theme" type="button">
            <span class="theme-icon dark-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
            </span>
            <span class="theme-icon light-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
            </span>
          </button>
          <a href="${PAGE_PATH}contact.html" class="btn btn-nav">Book a Strategy Session</a>
          <button class="nav-hamburger" id="navHamburger"
                  aria-label="Open navigation menu"
                  aria-expanded="false"
                  aria-controls="mobileMenu"
                  type="button">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </button>
        </div>
      </div>
    </nav>

    <div class="mobile-menu" id="mobileMenu" role="dialog" aria-modal="true" aria-label="Navigation menu" hidden>
      <nav aria-label="Mobile navigation">
        <ul>${buildMobileLinks(activePage)}</ul>
      </nav>
      <a href="${PAGE_PATH}contact.html" class="btn btn-primary" style="margin-top:2rem">Book a Strategy Session</a>
    </div>`;

  document.body.prepend(nav);
}

function injectFooter() {
  const footer = document.createElement("footer");
  footer.className = "footer";
  footer.setAttribute("role", "contentinfo");
  footer.innerHTML = `
    <div class="footer-inner">
      <div class="footer-logo">
        <a href="${HOME_PATH}" aria-label="Arktera Systems — Home">${LOGO_SVG}</a>
        <p class="footer-tagline">Infrastructure Systems for Service Businesses</p>
        <p class="footer-desc">We help service businesses improve visibility, strengthen conversion performance, and build more reliable lead generation systems.</p>
      </div>
      <nav class="footer-links" aria-label="Footer navigation">
        <div class="footer-col">
          <p class="footer-col-title mono">Pages</p>
          <ul>
            <li><a href="${PAGE_PATH}index.html">Home</a></li>
            <li><a href="${PAGE_PATH}about.html">About</a></li>
            <li><a href="${PAGE_PATH}services.html">Services</a></li>
            <li><a href="${PAGE_PATH}breakdowns.html">Breakdowns</a></li>
            <li><a href="${PAGE_PATH}insights.html">Insights</a></li>
            <li><a href="${PAGE_PATH}contact.html">Contact</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <p class="footer-col-title mono">Services</p>
          <ul>
            <li><a href="${PAGE_PATH}get-found.html">Visibility Systems</a></li>
            <li><a href="${PAGE_PATH}convert.html">Conversion Engineering</a></li>
            <li><a href="${PAGE_PATH}automate.html">Lead Flow Automation</a></li>
            <li><a href="${PAGE_PATH}services.html">All Services</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <p class="footer-col-title mono">Legal</p>
          <ul>
            <li><a href="${PAGE_PATH}privacy-policy.html">Privacy Policy</a></li>
            <li><a href="${PAGE_PATH}terms.html">Terms of Service</a></li>
          </ul>
          <div style="margin-top:1.5rem">
            <p class="footer-col-title mono">Contact</p>
            <a href="mailto:hello@arkterasystems.com" class="footer-email">hello@arkterasystems.com</a>
          </div>
        </div>
      </nav>
    </div>
    <div class="footer-bottom">
      <p class="mono small">© <span id="footerYear"></span> Arktera Systems. All rights reserved.</p>
      <p class="mono small footer-system-label">Visibility &amp; Conversion Infrastructure</p>
    </div>`;
  document.body.appendChild(footer);
  const yearEl = document.getElementById("footerYear");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}

/* ── SHARED JS BEHAVIOURS ── */
function initTheme() {
  const root = document.documentElement;
  const stored = localStorage.getItem("arktera-theme") || "dark";
  root.setAttribute("data-theme", stored);

  document.addEventListener("click", (e) => {
    if (!e.target.closest("#themeToggle")) return;
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    localStorage.setItem("arktera-theme", next);
  });
}

function initCursor() {
  const cursor = document.getElementById("cursor");
  const follower = document.getElementById("cursorFollower");
  if (!cursor || !follower) return;

  let mx = -200,
    my = -200,
    fx = -200,
    fy = -200;
  const lerp = (a, b, t) => a + (b - a) * t;

  document.addEventListener(
    "mousemove",
    (e) => {
      mx = e.clientX;
      my = e.clientY;
      cursor.style.left = mx + "px";
      cursor.style.top = my + "px";
    },
    { passive: true },
  );

  (function tick() {
    fx = lerp(fx, mx, 0.1);
    fy = lerp(fy, my, 0.1);
    follower.style.left = fx + "px";
    follower.style.top = fy + "px";
    requestAnimationFrame(tick);
  })();

  const targets =
    'a, button, [role="button"], .service-card, .breakdown-card, .insight-card, .problem-card, .faq-item';
  document.addEventListener("mouseover", (e) => {
    if (e.target.closest(targets)) {
      cursor.classList.add("hovering");
      follower.classList.add("hovering");
    }
  });
  document.addEventListener("mouseout", (e) => {
    if (e.target.closest(targets)) {
      cursor.classList.remove("hovering");
      follower.classList.remove("hovering");
    }
  });
}

function initNav() {
  const nav = document.getElementById("nav");
  const burger = document.getElementById("navHamburger");
  const menu = document.getElementById("mobileMenu");

  if (nav) {
    window.addEventListener(
      "scroll",
      () => {
        nav.classList.toggle("scrolled", window.scrollY > 60);
      },
      { passive: true },
    );
  }

  if (burger && menu) {
    burger.addEventListener("click", () => {
      const isOpen = burger.getAttribute("aria-expanded") === "true";

      if (isOpen) {
        // CLOSE
        menu.classList.remove("open");
        menu.setAttribute("hidden", "");
        burger.setAttribute("aria-expanded", "false");
        burger.setAttribute("aria-label", "Open navigation menu");
        burger.classList.remove("open");
        document.body.style.overflow = "";
      } else {
        // OPEN
        menu.removeAttribute("hidden");

        // Force reflow so transition works
        requestAnimationFrame(() => {
          menu.classList.add("open");
        });

        burger.setAttribute("aria-expanded", "true");
        burger.setAttribute("aria-label", "Close navigation menu");
        burger.classList.add("open");
        document.body.style.overflow = "hidden";
      }
    });

    // Close on link click
    menu.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", () => {
        menu.classList.remove("open");

        setTimeout(() => {
          menu.setAttribute("hidden", "");
        }, 400);

        burger.setAttribute("aria-expanded", "false");
        burger.classList.remove("open");
        document.body.style.overflow = "";
      });
    });

    // Escape key close
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && burger.getAttribute("aria-expanded") === "true") {
        menu.classList.remove("open");

        setTimeout(() => {
          menu.setAttribute("hidden", "");
        }, 400);

        burger.setAttribute("aria-expanded", "false");
        burger.classList.remove("open");
        document.body.style.overflow = "";
        burger.focus();
      }
    });
  }
}

function initReveal() {
  const items = document.querySelectorAll(".reveal-up, .reveal-fade");
  if (!items.length) return;

  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08, rootMargin: "0px 0px -50px 0px" },
  );

  items.forEach((el) => obs.observe(el));
}

function initCounters() {
  const counters = document.querySelectorAll("[data-count]");
  if (!counters.length) return;

  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseInt(el.getAttribute("data-count"), 10);
        const duration = 1600;
        const start = performance.now();
        const update = (now) => {
          const p = Math.min((now - start) / duration, 1);
          el.textContent = Math.round((1 - Math.pow(1 - p, 3)) * target);
          if (p < 1) requestAnimationFrame(update);
        };
        requestAnimationFrame(update);
        obs.unobserve(el);
      });
    },
    { threshold: 0.5 },
  );

  counters.forEach((el) => obs.observe(el));
}

function initBarFills() {
  const fills = document.querySelectorAll(".panel-bar-fill");
  if (!fills.length) return;
  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const fill = e.target;
        const w = fill.getAttribute("data-width") || fill.style.width;
        fill.setAttribute("data-width", w);
        fill.style.width = "0";
        setTimeout(() => {
          fill.style.width = w;
        }, 120);
        obs.unobserve(fill);
      });
    },
    { threshold: 0.5 },
  );
  fills.forEach((el) => {
    el.setAttribute("data-width", el.style.width);
    obs.observe(el);
  });
}

function initSmoothScroll() {
  document.addEventListener("click", (e) => {
    const link = e.target.closest('a[href^="#"]');
    if (!link) return;
    const id = link.getAttribute("href").slice(1);
    const target = document.getElementById(id);
    if (target) {
      e.preventDefault();
      window.scrollTo({
        top: target.getBoundingClientRect().top + window.scrollY - 88,
        behavior: "smooth",
      });
    }
  });
}

function initFAQ() {
  document.querySelectorAll(".faq-item").forEach((item) => {
    const btn = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");
    if (!btn || !answer) return;

    btn.addEventListener("click", () => {
      const isOpen = item.classList.contains("open");
      // Close all
      document.querySelectorAll(".faq-item.open").forEach((openItem) => {
        openItem.classList.remove("open");
        openItem.querySelector(".faq-question").setAttribute("aria-expanded", "false");
        const a = openItem.querySelector(".faq-answer");
        a.style.maxHeight = "0";
        a.setAttribute("hidden", "");
      });
      if (!isOpen) {
        item.classList.add("open");
        btn.setAttribute("aria-expanded", "true");
        answer.removeAttribute("hidden");
        answer.style.maxHeight = answer.scrollHeight + "px";
      }
    });
  });
}

function initCardTilt() {
  if (window.matchMedia("(pointer: coarse)").matches) return;
  document.querySelectorAll(".service-card, .breakdown-card").forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const r = card.getBoundingClientRect();
      const rx = ((e.clientY - r.top - r.height / 2) / r.height) * -5;
      const ry = ((e.clientX - r.left - r.width / 2) / r.width) * 5;
      card.style.transform = `translateY(-6px) rotateX(${rx}deg) rotateY(${ry}deg)`;
      card.style.transition = "box-shadow .15s, border-color .15s";
    });
    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
      card.style.transition = "all .4s ease";
    });
  });
}

function initHeroCanvas() {
  const canvas = document.getElementById("heroCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  let W,
    H,
    particles = [];
  const N = 55;

  function resize() {
    W = canvas.width = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }

  function make() {
    return {
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.4 + 0.3,
      vx: (Math.random() - 0.5) * 0.28,
      vy: (Math.random() - 0.5) * 0.18,
      alpha: Math.random() * 0.5 + 0.1,
      phase: Math.random() * Math.PI * 2,
      spd: Math.random() * 0.012 + 0.005,
    };
  }

  function getAccentRGB() {
    return document.documentElement.getAttribute("data-theme") === "light"
      ? "0,110,125"
      : "45,195,205";
  }

  let frame = 0;
  function draw() {
    ctx.clearRect(0, 0, W, H);
    frame++;
    const rgb = getAccentRGB();

    particles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0) p.x = W;
      if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = H;
      if (p.y > H) p.y = 0;
      const a = p.alpha * (0.55 + 0.45 * Math.sin(frame * p.spd + p.phase));
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${rgb},${a})`;
      ctx.fill();
    });

    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < 115) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(${rgb},${0.07 * (1 - d / 115)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(draw);
  }

  resize();
  particles = Array.from({ length: N }, make);
  draw();
  new ResizeObserver(() => {
    resize();
    particles = Array.from({ length: N }, make);
  }).observe(canvas.parentElement);
}

function initHeroParallax() {
  const hero = document.querySelector(".hero");
  const glows = document.querySelectorAll(".hero-glow");
  if (!hero || !glows.length) return;
  if (window.matchMedia("(pointer: coarse)").matches) return;

  let tx = 0,
    ty = 0,
    cx = 0,
    cy = 0;
  const lerp = (a, b, t) => a + (b - a) * t;

  hero.addEventListener(
    "mousemove",
    (e) => {
      const r = hero.getBoundingClientRect();
      tx = (e.clientX - r.left - r.width / 2) / r.width;
      ty = (e.clientY - r.top - r.height / 2) / r.height;
    },
    { passive: true },
  );

  (function tick() {
    cx = lerp(cx, tx, 0.04);
    cy = lerp(cy, ty, 0.04);
    glows.forEach((g, i) => {
      const f = (i + 1) * 16;
      g.style.transform = `translate(${cx * f}px, ${cy * f}px)`;
    });
    requestAnimationFrame(tick);
  })();
}

/* ── MAIN INIT ── */
function initComponents(activePage = "") {
  // Inject structure
  // injectNav(activePage);
  injectFooter();

  // Init behaviours (deferred until DOM is ready)
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", run);
  } else {
    run();
  }

  function run() {
    initTheme();
    initCursor();
    initNav();
    initReveal();
    initCounters();
    initBarFills();
    initSmoothScroll();
    initFAQ();
    initCardTilt();
    initHeroCanvas();
    initHeroParallax();
  }
}

// Auto-init via data attribute
document.addEventListener("DOMContentLoaded", () => {
  const page = document.body.getAttribute("data-page") || "";
  initComponents(page);
});
