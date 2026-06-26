
# Auxloom — AI Agency Website

A single-page navy-blue minimal site built on the existing TanStack Start template. All sections live on `/` (`src/routes/index.tsx`) with anchor scroll for nav links.

## Design System
- Update `src/styles.css`: dark navy base (`--background` deep navy ~oklch(0.12 0.05 265)), foreground near-white, accent navy-blue glow. Add gradient + glow tokens (`--gradient-hero`, `--shadow-glow`).
- Fonts via `<link>` in `__root.tsx`: **Oswald** (display/condensed for big headlines like the reference) + **Inter** (body). Register `--font-display`, `--font-sans` in `@theme`.
- Default page background is dark navy; intro section is an inverted light card (matching reference image 3).
- Use the uploaded `logo_without_bg.png` as the brand mark (uploaded via lovable-assets CLI, imported as asset JSON).

## Sections (in order on `/`)

### 1. Glass Navbar (fixed, top)
- Pill-shaped, centered, `backdrop-blur-xl`, translucent white border, subtle white/10 background — translated from the provided CSS into Tailwind utilities (not literal CSS).
- Left: Auxloom logo + wordmark.
- Center: Services · Projects · About Us · Blogs (anchor links to sections).
- Right: "Book a Meeting ↗" pill button with hover scale + arrow translate animation.

### 2. Hero
- Full-viewport navy gradient background with **cursor-interactive radial glow** (mousemove updates CSS variables `--mx/--my` driving a `radial-gradient` overlay).
- Center headline: "Discover Innovation" using a new `BlurText` component (Motion-based, ported from the spec the user provided — letters/words blur in).
- Subline: short AI-agency tagline e.g. "Engineering intelligent AI solutions that transform how teams build, ship, and scale."
- "Let's Talk →" pill button with animated arrow + glow hover.

### 3. Modular Grid Collage (static)
- Recreates the asymmetric 4×3 grid from reference image 2 using CSS grid with empty/filled cells.
- Filled cells use navy neon-light imagery generated via `imagegen` (3 unique navy neon light-trail photos, reused across cells). Empty cells are pure dark navy blocks.

### 4. Intro / About
- Light section (white bg, dark text) mirroring reference image 3.
- Big condensed headline split into two color tones (foreground + muted): "We are Auxloom — an AI studio building intelligent systems, **and our mission is to turn ambitious ideas into shipped, scalable AI products.**"
- Centered 4-point star glyph (SVG), short subline, "Learn More" pill.
- Animations: headline reveal via `BlurText`, star fade/scale-in on view.

### 5. Services ("Our Services")
- Layout matches reference image 4: left big "our services" eyebrow + "our services" headline, right-side description.
- 6 expandable rows (S/01 … S/06) listing the 6 services from the brief (lightly cleaned for grammar but keeping intent).
- Hover/click row expands inline to show description + "Book Now" button (Framer Motion height/opacity).
- Right column: looping image carousel (placeholder doodle slots — 3 generated minimal navy line-art tiles cycling via Framer Motion; user will swap later).

### 6. Projects
- Minimal centered block: small eyebrow "PROJECTS", large "Coming Soon" with subtle pulse/blur animation.

### 7. TextPressure — "AUXLOOM"
- New `TextPressure` component ported from spec, using Roboto Flex variable font loaded via `<link>` in `__root.tsx` (no remote `@import` in CSS).
- Full-bleed band with the word **AUXLOOM** reacting to cursor.

### 8. Footer
- Matches reference image 1 (navy rounded CTA card + footer grid).
- Top: rounded navy gradient CTA card — "Let's Collaborate And Create Something Amazing!" + subline + "Let's Talk" pill.
- Bottom: logo + tagline (left), three columns Menu / Services / Social, copyright + Terms / Privacy.

## Technical Details

**New deps**
- `bun add motion` (Motion for React, used by BlurText/TextPressure and section reveals).

**New files**
- `src/components/Navbar.tsx`
- `src/components/Hero.tsx` (with cursor-tracking gradient)
- `src/components/BlurText.tsx` (ported, TS-typed)
- `src/components/ModularGrid.tsx`
- `src/components/Intro.tsx`
- `src/components/Services.tsx` (with `motion` row expand)
- `src/components/Projects.tsx`
- `src/components/TextPressure.tsx` (ported, TS-typed)
- `src/components/Footer.tsx`
- `src/assets/logo.png.asset.json` (via lovable-assets CLI from the uploaded logo)
- `src/assets/grid-1.jpg` … `grid-3.jpg` (generated navy neon light photos)
- `src/assets/service-doodle-1..3.png` (transparent minimal navy hand-doodle placeholders)

**Edits**
- `src/styles.css` — navy palette, gradient/shadow tokens, font tokens, custom utilities for the glass pill and gradient text.
- `src/routes/__root.tsx` — `<link>` tags for Oswald, Inter, Roboto Flex; update default meta title/description to "Auxloom — AI Agency".
- `src/routes/index.tsx` — replace placeholder with composed sections + per-route SEO (title "Auxloom — AI Agency", description, og tags, og:image = hero asset).

**Animations**
- BlurText for hero + intro headline reveal.
- TextPressure for AUXLOOM band.
- Framer Motion: button hover scale + arrow translate, services row expand, star scale-in, "Coming Soon" subtle pulse, image-loop carousel.
- Hero cursor gradient driven by `onMouseMove` updating CSS vars (no per-frame React state).

**Out of scope (for this turn)**
- No backend / Lovable Cloud, no forms (the CTAs are visual; "Book a Meeting" / "Let's Talk" can be wired to `mailto:` placeholders).
- Doodle images are temporary generated placeholders — user will supply final assets later.
- No separate `/services`, `/projects`, `/about`, `/blog` routes yet (nav uses in-page anchors as the user described a single-page brief). I can split into proper routes in a follow-up if desired.
