# Arktera Systems — Premium Agency Website

## Implementation Notes & Asset Reference

---

### Project Structure

```
lumen-strategy/
├── index.html      — Full multi-section landing page
├── style.css       — Complete design system + all styles
├── script.js       — All interactions, animations, canvas
└── README.md       — This file
```

---

### Fonts Used

All fonts are loaded via Google Fonts CDN (no download required):

| Font               | Weights                   | Usage                         |
| ------------------ | ------------------------- | ----------------------------- |
| Space Grotesk      | 300, 400, 500, 600, 700   | Primary UI font, headings     |
| IBM Plex Mono      | 300, 400, 500             | Labels, tags, code-style text |
| Cormorant Garamond | 300, 400, italic variants | Italic headline accents       |

**Google Fonts URL:**

```
https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=IBM+Plex+Mono:wght@300;400;500&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&display=swap
```

---

### Images & SVGs

**No external image assets are used.** All visuals are generated with:

- Inline SVG icons and logo
- CSS gradients and glow effects
- HTML Canvas (hero particle field)
- CSS-only visual components (insight charts, audit panels, process timeline)

This means **zero image requests** — maximum performance.

---

### Logo

Custom SVG wordmark built inline:

- **Mark:** Custom "L" + angular bracket forming an "LS" ligature with a focal point dot
- **Wordmark:** "LUMEN" in Space Grotesk 600 + "STRATEGY" in IBM Plex Mono 300
- Fully scalable, adapts to dark/light themes via `currentColor`

---

### Color System

#### Dark Mode

| Variable         | Value                | Usage                     |
| ---------------- | -------------------- | ------------------------- |
| `--bg-primary`   | `hsl(199, 69%, 5%)`  | Main background           |
| `--bg-secondary` | `hsl(209, 44%, 9%)`  | Section backgrounds       |
| `--accent`       | `hsl(185, 80%, 55%)` | Cyan primary accent       |
| `--green`        | `hsl(158, 64%, 52%)` | Success, positive metrics |
| `--amber`        | `hsl(38, 90%, 60%)`  | Warnings, attention       |
| `--red`          | `hsl(0, 72%, 60%)`   | Critical alerts           |

#### Light Mode

Independently crafted — not an inversion. Editorial and clean with warm-cool contrast.

---

### Features Implemented

- [x] Custom cursor with magnetic hover states
- [x] Dark/light theme toggle (persisted to localStorage)
- [x] Glassmorphic floating audit panels (hero)
- [x] Animated particle canvas (hero background)
- [x] Animated counter (visibility score)
- [x] Progressive bar animation (panel bar)
- [x] Scroll-reveal system (IntersectionObserver)
- [x] Nav scroll spy (active link tracking)
- [x] Hero mouse parallax (glow elements)
- [x] 3D tilt on service cards (mousemove)
- [x] Pulsing process timeline nodes
- [x] Floating panel ambient animations
- [x] Mobile responsive + hamburger menu
- [x] Smooth anchor scroll
- [x] Reduced motion media query support

---

### Performance Notes

- **No external JS libraries** (pure vanilla)
- **No image assets** (all CSS/SVG/Canvas)
- **Single Google Fonts request** with `display=swap`
- **IntersectionObserver** for lazy reveal (no scroll jank)
- **RequestAnimationFrame** for all animations
- **CSS transitions** preferred over JS where possible
- Target Lighthouse score: 95+ Performance

---

### Browser Support

| Browser              | Support              |
| -------------------- | -------------------- |
| Chrome 90+           | Full                 |
| Firefox 88+          | Full                 |
| Safari 14+           | Full                 |
| Edge 90+             | Full                 |
| Mobile Chrome/Safari | Full (cursor hidden) |

---

### Customization Guide

**To change accent color:** Update `--accent` in both `:root[data-theme="dark"]` and `[data-theme="light"]` blocks in `style.css`.

**To add sections:** Follow the pattern of existing sections — add `id` attribute, add nav link, add `reveal-up` classes to elements.

**To update copy:** All copy is in `index.html` — no content is generated via JavaScript.

**To connect a form:** Replace `mailto:` hrefs on CTA buttons with your form endpoint or booking tool URL (Calendly, Typeform, etc.)

---

### Recommended Integrations

- **Booking:** Calendly embed or TidyCal on `#contact` CTA
- **Analytics:** Google Tag Manager (single script in `<head>`)
- **CRM:** Connect form to GoHighLevel, HubSpot, or ActiveCampaign via webhook
- **Chat:** Crisp or Intercom widget (add before `</body>`)

---

_Built for Arktera Systems. All design systems proprietary._
