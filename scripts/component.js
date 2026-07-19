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

const HOME_PATH = "/";

const NAV_LINKS = [
  { href: HOME_PATH, label: "Home", key: "home" },

  {
    href: "/about/",
    label: "About",
    key: "about",
  },

  {
    href: "/services/",
    label: "Services",
    key: "services",
  },

  {
    href: "/breakdowns/",
    label: "Breakdowns",
    key: "breakdowns",
  },

  {
    href: "/insights/",
    label: "Insights",
    key: "insights",
  },

  {
    href: "/contact/",
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
          <!-- TODO: Replace with Calendly booking link -->
          <a href="https://calendly.com/hello-arkterasystems/strategy-session" class="btn btn-nav" target="_blank">Book a Strategy Session</a>
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
      <!-- TODO: Replace with Calendly booking link -->
      <a href="https://calendly.com/hello-arkterasystems/strategy-session" target="_blank" class="btn btn-primary" style="margin-top:2rem">Book a Strategy Session</a>
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
            <li><a href="${HOME_PATH}">Home</a></li>
            <li><a href="/about/">About</a></li>
            <li><a href="/services/">Services</a></li>
            <li><a href="/breakdowns/">Breakdowns</a></li>
            <li><a href="/insights/">Insights</a></li>
            <li><a href="/contact/">Contact</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <p class="footer-col-title mono">Services</p>
          <ul>
            <li><a href="/get-found/">Visibility Systems</a></li>
            <li><a href="/convert/">Conversion Engineering</a></li>
            <li><a href="/automate/">Lead Flow Automation</a></li>
            <li><a href="/services/">All Services</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <p class="footer-col-title mono">Legal</p>
          <ul>
            <li><a href="/privacy-policy/">Privacy Policy</a></li>
            <li><a href="/terms/">Terms of Service</a></li>
          </ul>
          <div style="margin-top:1.5rem">
            <p class="footer-col-title mono">Contact</p>
            <a href="mailto:hello@arkterasystems.com" class="footer-email">hello@arkterasystems.com</a>

            <div class="footer-social" aria-label="Social media links">
        <a href="https://www.linkedin.com/company/arktera-systems"
           class="footer-social-link"
           aria-label="LinkedIn"
           target="_blank" rel="noopener noreferrer">
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
            <rect x="2" y="9" width="4" height="12"/>
            <circle cx="4" cy="4" r="2"/>
          </svg>
        </a>
        <a href="https://x.com/arkterasystems"
           class="footer-social-link"
           aria-label="X (Twitter)"
           target="_blank" rel="noopener noreferrer">
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.741l7.73-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z"/>
          </svg>
        </a>
        <a href="https://facebook.com/arkterasystems"
           class="footer-social-link"
           aria-label="Facebook"
           target="_blank" rel="noopener noreferrer">
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
          </svg>
        </a>
        <a href="https://instagram.com/arkterasystems"
           class="footer-social-link"
           aria-label="Instagram"
           target="_blank" rel="noopener noreferrer">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" aria-hidden="true">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
            <circle cx="12" cy="12" r="4"/>
            <circle cx="17.5" cy="6.5" r="0.75" fill="currentColor" stroke="none"/>
          </svg>
        </a>
        <a href="https://tiktok.com/@arkterasystems"
           class="footer-social-link"
           aria-label="TikTok"
           target="_blank" rel="noopener noreferrer">
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.28 6.28 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V9.07a8.16 8.16 0 0 0 4.77 1.52V7.15a4.85 4.85 0 0 1-1-.46z"/>
          </svg>
        </a>
      </div>
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

function initTextReveal() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const STEP = 70; // ms added per word
  const MAX_DELAY = 650; // ms cap so long headlines don't drag

  function splitWords(root) {
    let count = 0;

    function walk(node) {
      if (node.nodeType === Node.TEXT_NODE) {
        if (!node.textContent.trim()) return;
        const frag = document.createDocumentFragment();
        node.textContent.split(/(\s+)/).forEach((part) => {
          if (part === "") return;
          if (/^\s+$/.test(part)) {
            frag.appendChild(document.createTextNode(part));
            return;
          }
          const span = document.createElement("span");
          span.className = "text-split-word";
          span.style.transitionDelay = `${Math.min(count * STEP, MAX_DELAY)}ms`;
          span.textContent = part;
          count++;
          frag.appendChild(span);
        });
        node.replaceWith(frag);
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        Array.from(node.childNodes).forEach(walk);
      }
    }

    Array.from(root.childNodes).forEach(walk);
  }

  // Headings that reveal themselves: neutralize their own block
  // fade/slide (via .text-split) so only the words move.
  document
    .querySelectorAll(
      "h1.reveal-up, .hero-headline.reveal-up, .section-headline.reveal-up",
    )
    .forEach((el) => {
      if (el.dataset.textSplit) return;
      el.dataset.textSplit = "1";
      splitWords(el);
      el.classList.add("text-split");
    });

  // Headings nested inside an already-revealing ancestor (e.g. CTA
  // blocks) — just split; the ancestor's .visible toggle drives them.
  document.querySelectorAll(".cta-headline").forEach((el) => {
    if (el.dataset.textSplit) return;
    el.dataset.textSplit = "1";
    splitWords(el);
  });
}

// Replaced the entire INIT func for compactibility =====>
function initReveal() {
  const items = document.querySelectorAll(".reveal-up, .reveal-fade");
  if (!items.length) return;

  // Fallback: if IntersectionObserver isn't reliable, show everything
  if (!("IntersectionObserver" in window)) {
    items.forEach((el) => el.classList.add("visible"));
    return;
  }

  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0, rootMargin: "0px 0px -20px 0px" },
    //            ^^ was 0.08    ^^ was -50px
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
  document
    .querySelectorAll(".service-card, .breakdown-card, .insight-card")
    .forEach((card) => {
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
  const N = 70;

  function resize() {
    W = canvas.width = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }

  function make() {
    return {
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.7 + 0.6,
      vx: (Math.random() - 0.5) * 0.28,
      vy: (Math.random() - 0.5) * 0.18,
      alpha: Math.random() * 0.6 + 0.25,
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
        if (d < 140) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(${rgb},${0.14 * (1 - d / 140)})`;
          ctx.lineWidth = 0.7;
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

function injectScrollTopBtn() {
  const btn = document.createElement("button");
  btn.id = "scrollTopBtn";
  btn.className = "scroll-top-btn";
  btn.setAttribute("aria-label", "Scroll to top");
  btn.setAttribute("type", "button");
  btn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="18 15 12 9 6 15"/></svg>`;
  document.body.appendChild(btn);
  return btn;
}

function initScrollTop() {
  const btn = injectScrollTopBtn();

  window.addEventListener(
    "scroll",
    () => {
      btn.classList.toggle("visible", window.scrollY > 400);
    },
    { passive: true },
  );

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

function initMotionPause() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const selector = [
    ".ambient-float--a",
    ".ambient-float--b",
    ".ambient-float--c",
    ".ambient-float--y",
    ".ambient-float--ys",
    ".ambient-float--yi",
    ".ambient-float--dangle",
    ".ambient-float--dangleB",
    ".orbital-ring--cw",
    ".orbital-ring--ccw",
    ".orbital-ring--slow-cw",
    ".orbital-ring--slow-ccw",
    ".glow-anchor--primary",
    ".glow-anchor--secondary",
    ".fdp--a",
    ".fdp--b",
    ".fdp--c",
    ".fdp--d",
    ".bd-float--a",
    ".bd-float--b",
    ".bd-float--c",
    ".bd-float--d",
    ".metric-panel-status",
    ".outcome-chip-dot",
    ".diag-live-dot",
    ".browser-mockup",
    ".analysis-scan",
    ".mock-scan",
    ".issue-marker--critical",
    ".issue-marker--warning",
    ".issue-marker--info",
    ".issue-badge--critical",
    ".issue-badge--warning",
    ".issue-annotation",
    ".trust-flow-particle",
    ".msg-orbit-core",
    ".msg-orbit-ring--1",
    ".msg-orbit-ring--2",
  ].join(", ");

  const els = document.querySelectorAll(selector);
  if (!els.length) return;

  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        entry.target.style.animationPlayState = entry.isIntersecting
          ? "running"
          : "paused";
      });
    },
    { rootMargin: "150px" },
  );

  els.forEach((el) => obs.observe(el));
}

function shouldShowLoader() {
  try {
    return !sessionStorage.getItem("arktera-loaded");
  } catch (e) {
    return true;
  }
}

function injectLoader() {
  const loader = document.createElement("div");
  loader.className = "loader-screen";
  loader.id = "loaderScreen";
  loader.setAttribute("aria-hidden", "true");
  loader.innerHTML = `
    <div class="loader-inner">
      <svg class="loader-mark" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <polygon class="loader-mark-outer" points="17,4 30,27 4,27" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" fill="none"/>
        <polygon class="loader-mark-inner" points="17,22 23.5,11 10.5,11" stroke="currentColor" stroke-width="1" stroke-linejoin="round" fill="none" opacity="0.55"/>
        <line class="loader-mark-axis" x1="17" y1="4" x2="17" y2="27" stroke="currentColor" stroke-width="1" stroke-linecap="round" opacity="0.4"/>
        <circle class="loader-mark-core" cx="17" cy="17" r="1.8" stroke="currentColor" stroke-width="1" fill="none"/>
      </svg>
      <div class="loader-word">
        <span class="loader-word-main">ARKTERA</span>
        <span class="loader-word-sub">SYSTEMS</span>
      </div>
      <div class="loader-bar"><span class="loader-bar-fill"></span></div>
    </div>`;
  document.body.prepend(loader);

  const MIN_DISPLAY = 1900;
  const start = performance.now();

  function hide() {
    const wait = Math.max(MIN_DISPLAY - (performance.now() - start), 0);
    setTimeout(() => {
      loader.classList.add("loader-hidden");
      try {
        sessionStorage.setItem("arktera-loaded", "1");
      } catch (e) {
        /* private-mode storage may throw; loader just replays next visit */
      }
      setTimeout(() => loader.remove(), 700);
    }, wait);
  }

  if (document.readyState === "complete") {
    hide();
  } else {
    window.addEventListener("load", hide, { once: true });
  }
}

function initMiuiCompat() {
  // 1. Force nav to never exceed viewport width on MIUI
  //    body overflow-x:hidden doesn't clip fixed elements on older Chrome.
  //    Setting width on the nav element directly guarantees it.
  const nav = document.getElementById("nav");
  if (nav) {
    nav.style.maxWidth = "100vw";
    nav.style.overflowX = "hidden";
  }

  // 2. On very narrow viewports (Note 9 Pro ~392px CSS width),
  //    detect if nav content is overflowing and apply tight class.
  function checkNavFit() {
    const inner = document.querySelector(".nav-inner");
    if (!inner) return;
    if (inner.scrollWidth > inner.clientWidth) {
      inner.classList.add("nav-inner--tight");
    } else {
      inner.classList.remove("nav-inner--tight");
    }
  }
  checkNavFit();
  window.addEventListener("resize", checkNavFit, { passive: true });

  // 3. Detect MIUI Browser / older Chrome and disable expensive
  //    canvas animations that cause jank (particle canvas, star canvas).
  //    Check by user-agent and Chrome version.
  const ua = navigator.userAgent;
  const chromeMatch = ua.match(/Chrome\/(\d+)/);
  const chromeVersion = chromeMatch ? parseInt(chromeMatch[1], 10) : 999;
  const isMiui = ua.includes("XiaoMi") || ua.includes("MiuiBrowser");
  const isOldChrome = chromeVersion < 95;

  if (isMiui || isOldChrome) {
    // Kill canvas-based animations — they're GPU-intensive and
    // break silently on MIUI 12 with battery optimization active.
    const canvases = document.querySelectorAll("canvas[id]");
    canvases.forEach((c) => {
      c.style.display = "none";
    });

    // Mark body so CSS can scope additional fallbacks if needed
    document.body.setAttribute("data-compat", "reduced");
  }

  // 4. scroll-behavior: smooth is set on html in CSS.
  //    On MIUI Browser this sometimes causes blank flashes during
  //    navigation. Override to auto if MIUI detected.
  if (isMiui) {
    document.documentElement.style.scrollBehavior = "auto";
  }
}

/* ── MAIN INIT ── */
function initComponents(activePage = "") {
  // First-visit brand splash (skipped on repeat nav within the session,
  // and entirely under prefers-reduced-motion)
  if (
    shouldShowLoader() &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    injectLoader();
  }

  // Inject structure
  injectNav(activePage);
  injectFooter();

  // Init behaviours (deferred until DOM is ready)
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", run);
  } else {
    run();
  }

  function run() {
    initMiuiCompat();
    initTheme();
    initCursor();
    initNav();
    initTextReveal();
    initReveal();
    initCounters();
    initBarFills();
    initSmoothScroll();
    initFAQ();
    initCardTilt();
    initHeroCanvas();
    initHeroParallax();
    initScrollTop();
    initMotionPause();
  }
}

// Auto-init via data attribute
document.addEventListener("DOMContentLoaded", () => {
  const page = document.body.getAttribute("data-page") || "";
  initComponents(page);
});
