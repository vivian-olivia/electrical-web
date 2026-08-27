---
name: Voltamax
description: Medium-voltage electrical engineering & EPC company site — engineering-grade confidence for industrial buyers
colors:
  circuit-blue: "#2563EB"
  circuit-blue-hover: "#3B82F6"
  substation-navy-deep: "#030810"
  substation-navy: "#070D1A"
  substation-navy-footer: "#040A14"
  ambient-cyan: "#22D3EE"
  surface-white: "#FFFFFF"
  neutral-50: "#F9FAFB"
  neutral-100: "#F3F4F6"
  neutral-200: "#E5E7EB"
  neutral-500: "#6B7280"
  neutral-600: "#4B5563"
  neutral-900: "#111827"
  whatsapp-green: "#16A34A"
  challenge-red: "#DC2626"
typography:
  display:
    fontFamily: "'Plus Jakarta Sans', sans-serif"
    fontSize: "3rem"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "'Plus Jakarta Sans', sans-serif"
    fontSize: "1.5rem"
    fontWeight: 700
    lineHeight: 1.3
  title:
    fontFamily: "'Plus Jakarta Sans', sans-serif"
    fontSize: "1rem"
    fontWeight: 700
    lineHeight: 1.3
  body:
    fontFamily: "Inter, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Inter, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 600
    letterSpacing: "0.08em"
  numeral:
    fontFamily: "'IBM Plex Mono', ui-monospace, monospace"
    fontSize: "2.5rem"
    fontWeight: 600
rounded:
  sm: "4px"
  md: "8px"
  lg: "12px"
  xl: "16px"
  full: "9999px"
spacing:
  xs: "16px"
  sm: "24px"
  md: "48px"
  lg: "80px"
  xl: "112px"
components:
  button-primary:
    backgroundColor: "{colors.circuit-blue}"
    textColor: "{colors.surface-white}"
    rounded: "{rounded.sm}"
    padding: "16px 32px"
  button-primary-hover:
    backgroundColor: "{colors.circuit-blue-hover}"
  card-content:
    backgroundColor: "{colors.surface-white}"
    textColor: "{colors.neutral-900}"
    rounded: "{rounded.lg}"
  card-panel:
    backgroundColor: "{colors.surface-white}"
    textColor: "{colors.neutral-900}"
    rounded: "{rounded.xl}"
---

# Design System: Voltamax

## Overview

**Creative North Star: "The Substation at Night"**

Voltamax's site reads like walking into a live medium-voltage substation after dark: deep navy control-room darkness, a faint blue schematic grid underfoot, and precise glowing blue instrumentation picking out what matters. It is engineering-grade and confident — the visual voice of a contractor who has run this equipment for 20+ years and doesn't need to shout about it. Nothing decorative competes with the one accent color; density and restraint communicate competence to a procurement audience evaluating vendor credibility, not consumer taste.

The system alternates two registers, never blends them: **navy control-room sections** (hero, stats, "why choose us", CTA, nav, footer) carry the atmosphere — blueprint-grid texture, glass-panel instrumentation, glowing blue accents on near-black. **White content sections** (about, services, brand partners, portfolio, product specs) carry the substance — plain, bordered, legible, where the actual technical claims live. The rhythm of dark→light→dark down the page is the structural device that makes the site feel authored rather than templated.

**Key Characteristics:**
- One accent hue only: Circuit Blue, at full saturation on dark backgrounds, muted to borders/hover on white ones.
- Blueprint-grid texture is reserved for dark, hero-weight moments — it is a signature, not wallpaper.
- Flat and bordered at rest everywhere; shadow and glow are earned by hover or by being an instrument reading (glass-panel), never decorative-by-default.
- Bilingual copy (ID/EN) at every text node — the type system must hold both without breaking rhythm.

## Colors

A near-monochrome navy-and-white system carries exactly one saturated hue. Confidence comes from restraint, not variety.

### Primary
- **Circuit Blue** (`#2563EB`): The system's only accent. Primary CTA fills, active nav-link underline, link text, icon accents, form focus rings, section step-numbers on hover.
- **Circuit Blue Hover** (`#3B82F6`): The lighter hover/pressed state for every Circuit Blue surface, and the color used for "why choose us" icon glyphs on dark backgrounds.

### Neutral
- **Substation Navy Deep** (`#030810`): Hero section background — the darkest surface in the system, used exactly once per page.
- **Substation Navy** (`#070D1A`): Standard dark-section background (stats band, "why choose us", CTA band) and the site header's scrolled/solid state.
- **Substation Navy Footer** (`#040A14`): The footer's near-black — one step darker than standard dark sections, marking it as the page's floor.
- **Surface White** (`#FFFFFF`): Every content section's background — about, services, portfolio, product specs, contact form.
- **Neutral 200** (`#E5E7EB`): The default border color on every white-section card, input, and divider at rest.
- **Neutral 500 / 600** (`#6B7280` / `#4B5563`): Body copy on white sections.
- **Neutral 900** (`#111827`): Headings on white sections.
- **White at reduced opacity** (`white/80`, `white/55`, `white/45`, `white/30`): body copy, subtitles, and secondary labels on dark sections, stepped down by importance rather than switching hue.

### Named Rules
**The One Blue Rule.** Circuit Blue is the only saturated hue anywhere in the system for anything the brand controls — no status color, no secondary brand color, no chart palette. The three narrow, named exceptions below are the complete list; do not add a fourth without updating this file first.

**The Ambient-Cyan Exception.** A near-invisible cyan-400 (`#22D3EE`) glow (`blur-3xl`, ~8% opacity) appears behind the hero and "why choose us" sections purely as atmosphere. It never appears as text, an icon, or a bordered surface — it's lighting, not a palette color.

**The WhatsApp-Green Exception.** The site-wide floating WhatsApp chat button uses WhatsApp's own brand green (`#16A34A`) instead of Circuit Blue — an external platform's identity, not a Voltamax status color, and the one touchpoint where instant "that's WhatsApp" recognition matters most (a persistent corner affordance competing with the rest of the page for attention). Scope is strict and deliberately narrow: every other WhatsApp-adjacent element — the WhatsApp row in the Contact page's office-info list, the "Request Quote" CTAs on product and project pages — stays Circuit Blue like the rest of its surface, so the exception doesn't spread into a second color system.

**The Challenge/Solution Exception.** The project-detail page's two-column "Challenges" (`#DC2626` red) vs. "Solutions" (Circuit Blue) comparison is the one place a second hue carries real product meaning: a self-contained, single-use scanning aid, not a status-color system. It does not license red or any other hue anywhere else.

## Typography

**Display Font:** Plus Jakarta Sans (with sans-serif fallback)
**Body Font:** Inter (with sans-serif fallback)
**Label/Mono Font:** IBM Plex Mono (with ui-monospace fallback)

**Character:** A geometric, slightly rounded display face carries confidence and weight on headlines; a plain, highly legible Inter carries the actual technical claims in body copy; IBM Plex Mono is reserved strictly for numerals, so a stat count or a step index reads as instrumentation, not prose.

### Hierarchy
- **Display** (700, `text-5xl` → `text-8xl` responsive / 3rem base, 1.1 line-height): Hero headline only, one per page, stacked across multiple `<span>` lines with the top line at reduced weight-of-emphasis (`text-white/80`) and the key phrase in Circuit Blue.
- **Headline** (700, `text-2xl` → `text-4xl` responsive / 1.5rem base, 1.3 line-height, `leading-snug`): Every section title ("Our Services", "Why Choose Us", etc.) — always left- or center-aligned, never longer than ~2 lines.
- **Title** (700, ~1rem, 1.3 line-height): Card and component titles (service names, stat labels, contact section headers).
- **Body** (400, 0.875–0.9375rem, 1.6 line-height / `leading-relaxed`): Paragraph copy, ~55–65ch max width on hero/about copy blocks.
- **Numeral** (600, `font-mono`, `tabular-nums`): Stat counters (CountUp) and service step indices ("01", "02"...) — the one place monospace appears.
- **Label** (600, 0.75rem, `0.08em` tracking, often uppercase): Badges, eyebrow tags, category pills.

### Named Rules
**The Mono-for-Numbers-Only Rule.** IBM Plex Mono never sets prose — only literal numerals (stat counts, step indices). Using it for a label or heading breaks the "instrumentation reading" it's meant to evoke.

**The Brand-Wordmark Exception.** The coded brand-partner logos (SIEMENS, eaton, and Hitachi's "Energy" subtitle) reproduce each partner's real logotype using their own typeface (Arial/Arial Black) and, where the source logo uses one, an off-ramp size like 11px — because a third-party wordmark set in Plus Jakarta Sans or normalized to the label scale would misrepresent that partner's actual mark. This exception is scoped strictly to logo reproduction; no other UI text may use Arial or step off the type ramp on this basis.

## Layout

Container is `max-w-7xl` (1280px) centered, with horizontal gutter `px-6` on mobile expanding to `px-12` at `md`. Section rhythm is generous and consistent: large content sections run `py-20` mobile / `py-28` desktop (80px/112px); the compact stats band runs `py-14` (56px). Grids step from 1 column on mobile to 2 (about), 4 (stats, services), or 5 (why-choose-us) columns at `md`/`lg`, never introducing an intermediate 3-column layout. The header is fixed and transparent over the hero, gaining a blurred-navy background (`bg-[#070D1A]/50 backdrop-blur-xl`) once the page scrolls past 60px.

## Elevation & Depth

Hybrid, split cleanly by section register. **White sections are flat at rest** — cards carry a `Neutral 200` border and no shadow; hovering swaps the border to a light blue tint and raises a shadow (`hover:shadow-xl`), so depth is a response to interaction, not a resting state. **Dark sections use glass-panel instrumentation** instead of drop shadows: a translucent white-to-transparent gradient fill, `blur(20px)` backdrop-filter, a hairline `white/12` border, and an inset top highlight plus a soft ambient shadow — read as an illuminated panel rather than a card floating on a surface. Large CTA buttons carry one exception: a colored ambient shadow (`shadow-blue-900/30`) that ties the shadow hue to the brand accent rather than generic black.

### Shadow Vocabulary
- **Hover-earned** (`shadow-xl` / `shadow-sm`, appears only on `:hover`): white-section cards.
- **Glass instrumentation** (`inset 0 1px 0 rgba(255,255,255,.14), 0 8px 30px rgba(3,8,16,.35)`): dark-section stat/feature panels, always-on.
- **Colored CTA shadow** (`shadow-lg shadow-blue-900/30`): primary CTA buttons only.

### Named Rules
**The Earned-Shadow Rule.** A card on a white section never has a shadow at rest. Shadow is what happens when the user's attention lands on it.

## Shapes

Radius is used directly from Tailwind's scale rather than a single custom token, and the choice of step is meaningful: **full** (pill) for icon badges, avatar-style frames, dots, and language/nav toggles; **lg/12px** for content cards (portfolio tiles, product cards); **xl/16px** for the heavier panels on the Contact page (form card, map, office-info card, CTA block); **md/8px** for dropdowns, selects, and inputs; **sm/4px** for buttons. One deliberate exception: the Home page's four-tile services grid is **flat with zero radius**, laid out as a hairline-gapped `border` grid (`bg-gray-200` gutter behind white tiles) — a graph-paper, schematic feel that stands in contrast to the rounded cards used everywhere else, and is a signature moment rather than an inconsistency to fix.

## Components

### Buttons
- **Shape:** `rounded` (4px), never pill except the language toggle.
- **Primary:** Circuit Blue fill, white text, bold, generous padding (`px-8 py-4` for hero/CTA scale, `px-5 h-9` for nav scale); large instances carry the colored ambient shadow.
- **Hover:** fill shifts to Circuit Blue Hover; icon-suffixed links (e.g. "View Portfolio →") translate the arrow `translate-x-1` on hover instead of moving the whole button.
- **Secondary/Outline (on dark backgrounds only):** `border-white/25`, white text, `hover:bg-white/8` — no fill, no shadow.

### Cards
- **Corner Style:** 12px (content cards) or 16px (Contact-page panels) — see Shapes.
- **Background:** white, always; dark-section equivalents use glass-panel instead of a card.
- **Shadow Strategy:** none at rest, `hover:shadow-xl` — see Elevation & Depth.
- **Border:** `Neutral 200` at rest, shifts to a light Circuit Blue tint on hover.
- **Internal Padding:** `p-7` to `p-8` depending on card density.

### Inputs / Fields
- **Style:** `rounded-lg` (8px), `Neutral 200` border, white background.
- **Focus:** border shifts to Circuit Blue, plus a `ring-2 ring-blue-500/30` glow — the one place a focus ring is authored directly rather than through the shadcn `--ring` token.

### Navigation
- **Style:** Fixed header, transparent over the hero, `Substation Navy`/50 + blur once scrolled, fully solid when the mobile menu is open. Active route gets white text plus a Circuit Blue underline bar (`after:` pseudo-element); inactive routes are `white/70` shifting to full white on hover. Mobile menu drops as a solid navy panel with divider-separated links.

### Blueprint Grid & Glass Panel (signature)
The `blueprint-grid` utility — a faint blue (`rgba(120,170,255,.07)`) 48px grid, top/bottom-masked to fade — is the system's most recognizable mark, laid behind the hero and "why choose us" dark sections only. `glass-panel` is its companion surface: the frosted instrumentation card used for stat counters and the "why choose us" tiles. Together they're what makes "The Substation at Night" legible as a specific place rather than a generic dark theme; they should not be reused for content that isn't meant to feel like reading an instrument.

## Do's and Don'ts

### Do:
- **Do** keep Circuit Blue (`#2563EB`, hover `#3B82F6`) as the system's only accent hue — see The One Blue Rule.
- **Do** alternate white content sections with Substation Navy sections as the primary structural rhythm between page sections.
- **Do** reserve the blueprint-grid texture for dark, hero-weight sections; it loses its signature status if it appears everywhere.
- **Do** let shadow be a hover response on white sections and use glass-panel for elevation on dark sections — see The Earned-Shadow Rule.
- **Do** pair Plus Jakarta Sans (display/headline) with Inter (body), and keep IBM Plex Mono strictly for numerals — see The Mono-for-Numbers-Only Rule.
- **Do** write every new string in both Indonesian and English, matching the existing `translations.ts` structure (carried from PRODUCT.md — a durable constraint, not a style choice).
- **Do** use WhatsApp green only on the site-wide floating chat button, and red only on the project-detail Challenges/Solutions pairing — see The WhatsApp-Green Exception and The Challenge/Solution Exception. Every other WhatsApp-adjacent element (the Contact page's WhatsApp row, "Request Quote" CTAs) stays Circuit Blue.

### Don't:
- **Don't** treat the shadcn `--primary` CSS token (`hsl(210 100% 40%)` ≈ `#0066CC` light / `#0080FF` dark, declared in `index.css`) as the brand accent — no page actually renders it; every visible blue on the site is the hardcoded Circuit Blue. The token is currently orphaned; don't add new UI that relies on it without first reconciling the two.
- **Don't** add a drop shadow to a white-section card at rest — shadow must be earned by hover, never default.
- **Don't** introduce a fourth saturated hue, or extend green/red beyond their two named exceptions, anywhere in the system — differentiate with the navy/white/opacity scale instead.
- **Don't** round the Home page's services tile grid to match other cards — its flat, gapless, bordered treatment is a deliberate signature, not an oversight.
- **Don't** invent client names, testimonials, certifications, or benchmarks beyond the three real case studies and six named brand partners already on record in PRODUCT.md.
