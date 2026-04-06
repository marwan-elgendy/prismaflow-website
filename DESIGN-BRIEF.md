# PrismaFlow Design Brief — Complete Redesign

## Brand Identity
- **Name:** PrismaFlow
- **Tagline:** "Shaping The Desire"
- **Industry:** Neuromarketing agency (psychology-based marketing)
- **Market:** EN + MENA (bilingual EN/AR, RTL support required)
- **Metaphor:** A prism refracts ordinary light into a mesmerizing spectrum — we do the same to your marketing

## Design Philosophy
**MINIMAL. EDITORIAL. PREMIUM.**

NOT: SaaS landing page, tech startup, "dark mode everything with neon glow"
YES: High-end agency, editorial magazine feel, typography-driven, confident whitespace

Think: Apple.com meets Pentagram.com meets a luxury magazine layout.

## Color System (Light + Dark)

### Light Mode (DEFAULT)
```
--bg:          #FAFAF8    /* warm off-white, not sterile */
--surface:     #FFFFFF
--surface-alt: #F2F0ED    /* subtle warm gray for alternating sections */
--text:        #1A1A1A    /* near-black */
--text-muted:  #6B6B6B    /* secondary text */
--text-dim:    #999999    /* captions, labels */
--border:      #E5E3DF    /* warm border */
--accent:      #0A0A0A    /* black as primary accent — bold, confident */
--accent-hover:#333333
--prism:       #00A3CC    /* muted teal-cyan, NOT bright neon cyan */
--prism-glow:  rgba(0,163,204,0.08)
```

### Dark Mode
```
--bg:          #0C0C0E
--surface:     #141416
--surface-alt: #1A1A1E
--text:        #F0F0EC
--text-muted:  #8A8A8A
--text-dim:    #5A5A5A
--border:      #2A2A2E
--accent:      #F0F0EC    /* white as accent in dark */
--accent-hover:#CCCCCC
--prism:       #00C8FF    /* slightly brighter in dark for contrast */
--prism-glow:  rgba(0,200,255,0.1)
```

## Typography
- **Headings:** Space Grotesk (already installed) — Bold/Black weights only
- **Body:** Space Grotesk Light/Regular — clean, geometric
- **Arabic:** Cairo (already installed)
- **Scale:** Large. Hero h1 should be 5rem-8rem. Generous line-height.
- **Letter spacing:** Tight on headlines (-0.02em to -0.04em)

## Animation Strategy
**Subtlety > Spectacle.** Every animation must earn its place.

### Use from Aceternity UI / Magic UI (install as copy-paste components):
1. **Text Reveal** — Words/characters animate in on scroll (not the whole block fading)
2. **Smooth scroll-linked parallax** — Sections have depth
3. **Magnetic cursor** on desktop — CTAs subtly pull toward cursor
4. **Number counters** — Stats animate up when in view
5. **Card tilt on hover** — Subtle 3D perspective shift on service cards

### Kill:
- Generic fadeUp on EVERYTHING
- Cyan text-shadow glow effect
- The NeuralBackground canvas (it's a performance hog and looks generic)
- Stagger animations that make content invisible until JS loads

### Rules:
- All content must be visible immediately (no initial opacity:0 that depends on JS)
- Use CSS `@starting-style` or immediate-render with enhance-on-scroll
- Mobile: reduce animations to simple fades, no parallax
- Use `prefers-reduced-motion` media query

## Page Structure

### Navbar
- Clean, minimal. Logo left, links center, theme toggle + CTA right.
- Glass blur on scroll (both themes)
- Mobile: clean hamburger → full-screen overlay with staggered link reveal
- Theme toggle: sun/moon icon, smooth transition
- Active link: simple underline, not a glowing dot

### Footer
- 3-column minimal. No neural network SVG decoration.
- Brand + tagline | Quick links | Newsletter
- Clean border-top, no decorative elements

### Home Page
1. **Hero** — Full viewport. Giant typography headline. NO background effects/orbs.
   - Headline with subtle word-by-word reveal
   - One CTA button (black/filled) + one ghost CTA
   - Small scroll indicator
   
2. **Problem** — "The Diagnosis" section
   - Left-aligned text, editorial layout
   - Pain points as a clean 3-column grid (icon + text, no strikethrough gimmick)
   
3. **Process** — "The Roadmap" 
   - Horizontal numbered steps with a connecting line
   - Numbers large, muted. Description clean.
   - On scroll, line draws and steps reveal
   
4. **Services** — "The Arsenal"
   - Large cards with hover expand (not click accordion)
   - Minimal: number + title + one-line description
   - Expand on hover to show full details
   
5. **Social Proof** — Testimonial cards
   - Clean cards, no avatar circles with initials
   - Quote marks, name, company. Simple.
   
6. **CTA** — Final call to action
   - Full-width, high contrast section
   - Big headline + button

### About Page
- Editorial layout: big headline, story text, philosophy quote
- Full-width quote section with dramatic typography
- No PrismDecoration SVG (remove)

### Services Page
- Hero with headline
- 3 service deep-dives (not accordion — full visible layout)
- CTA at bottom

### Apply Page
- Clean form with proper validation
- Left: copy (why we're selective). Right: form.
- No emoji icons

### Blog
- Grid of cards. Clean. Image + title + date + read time.
- Individual post: editorial, magazine-style layout

## Technical Requirements
1. `next-themes` for dark/light mode (NO flash on load)
2. Tailwind CSS v4 (already using) — use CSS custom properties for theme
3. `motion/react` (the new name for framer-motion) — already in package.json as framer-motion
4. Copy-paste components from Aceternity UI as needed (don't install the package — just copy the component code)
5. Preserve all Sanity CMS integration (queries, client)
6. Preserve all i18n (next-intl) with EN/AR
7. All existing routes must work: /, /about, /services, /blog, /blog/[slug], /apply, /landing
8. Keep SEO schemas (JSON-LD)
9. RTL support for Arabic

## What to Delete
- `src/components/effects/NeuralBackground.tsx` and `NeuralBackgroundClient.tsx`
- `src/components/effects/PrismDecoration.tsx`
- `src/components/effects/GlowText.tsx` (replace with clean styled spans)
- All `clipPath: polygon(...)` section styling (looks cheap)
- The giant "PRISMAFLOW" watermark in footer

## File Structure Target
```
src/
  components/
    ui/           ← Button, Badge, SectionLabel, ThemeToggle, TextReveal
    layout/       ← Navbar, Footer
    sections/     ← Hero, Problem, Process, Services, Testimonials, CTA
    forms/        ← ApplicationForm, LeadCaptureForm
    blog/         ← BlogCard, BlogGrid
  app/
    globals.css   ← Theme variables, base styles
    [locale]/     ← All pages (unchanged routes)
```
