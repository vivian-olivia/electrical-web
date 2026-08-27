---
target: src/pages/Home.tsx (Voltamax homepage)
total_score: 22
max_score: 32
na_heuristics: 7,10
p0_count: 2
p1_count: 1
timestamp: 2026-08-26T17-41-18Z
slug: src-pages-home-tsx
---
Method: dual-agent (A: ae81d334416f0ddfe · B: a16385febb897dd9b)

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Submit shows "Sending..."; scroll-reveal + CountUp give feedback; no error state exists in the form |
| 2 | Match System / Real World | 4 | Correct MV-engineering vocabulary (kV/kA/switchgear/RMU) throughout |
| 3 | User Control and Freedom | 3 | Mobile menu has a visible close (X) but no click-outside or Escape-to-close |
| 4 | Consistency and Standards | 2 | Address/email mismatch, client-count mismatch, and confirmed DESIGN.md rule violations |
| 5 | Error Prevention | 2 | Native `required`/`type=email` only; PRODUCT.md declares zod but Contact.tsx uses plain uncontrolled inputs |
| 6 | Recognition Rather Than Recall | 3 | Icon+label pairing is consistent across sections |
| 7 | Flexibility and Efficiency | n/a | Not applicable — first-visit marketing surface, no repeat-user shortcuts expected |
| 8 | Aesthetic and Minimalist Design | 3 | Strong system restraint, dinged by two redundant "why trust us" sections on Home |
| 9 | Error Recovery | 2 | No form-level error UI exists to recover from |
| 10 | Help and Documentation | n/a | Not applicable to a marketing/lead-gen landing page |
| **Total** | | **22/32** | **Acceptable (68.75%)** |

## Design Specificity Verdict

**LLM assessment**: Split verdict. The *token layer* earns "authored, not templated": IBM Plex Mono reserved strictly for numerals, the flat gapless graph-paper services grid, glass-panel instrumentation on dark sections, and a bilingual hero headline that's structurally mirrored line-by-line (not just translated) all show real design intent specific to this product. But the *homepage's content strategy* is generic — it never shows the three real, named case studies (Indocement, Pertamina Cepu, Pusri SG-41) that PRODUCT.md calls the company's actual differentiator. In their place, Home spends two full sections on interchangeable trust icons ("Experienced/Trusted/Safe/Quality," "Professional Team," "Quality & Safety") that could sit on any industrial contractor's site unchanged. Compounding this, Home's own stat band claims "15+ Brand Partners" when only six are ever named anywhere in the codebase — an apparently invented round number sitting next to precise technical claims (24kV, 630A, 16kA) elsewhere on the site, which is exactly the kind of thing a skeptical procurement engineer notices and which taxes trust in the real numbers too.

**Deterministic scan**: 5 findings, exit code 2. Two are genuine off-system hits the LLM review didn't catch: `fontFamily: Arial` used twice in `Home.tsx` (lines 68, 81) to reproduce the SIEMENS and eaton brand wordmarks — undeclared in DESIGN.md's typography, though plausibly an intentional brand-fidelity exception rather than a lapse — plus two type-ramp misses (11px Hitachi subtitle in the same logo block, 10px overlay badge in `ProjectDetail.tsx:257`). One finding (`Contact.tsx:60`, gray text flagged against a blue background) is very likely a false positive: reading the source, `text-gray-700` is the item's resting state and `bg-blue-50`/`text-blue-700` only apply together under a Radix `data-[highlighted]` selector — the rule appears to be pattern-matching both fragments in one class string rather than resolving which state pairs with which.

**Visual overlays**: Not available. No browser automation tool is exposed in this session (no Playwright/Puppeteer/native browser tool), so the live-server injection and **[Human]**-tab overlay step was skipped entirely rather than attempted and failed. Findings above come from static source + CSS analysis and the CLI detector only.

## Overall Impression

The visual system is more disciplined than most landing pages this size — one accent hue, a real dark/light rhythm, restraint everywhere. But the page doesn't yet trust its own strongest asset: real, named, technically-specific project evidence sits one click away on the About page while Home fills the fold with the same generic trust language every competitor uses. And the system's own written rules (DESIGN.md) are already being contradicted in the implementation — the "One Blue Rule" has two exceptions nobody documented, and the Contact page's most important card violates the "Earned-Shadow Rule" by name. The single biggest opportunity: put a real case study above the fold, or immediately below the hero, before spending any more space on badges that say "Trusted" and "Safe" without showing why.

## What's Working

1. **The bilingual hero headline is structurally mirrored, not translated-on-top** — `Tegangan`/`Menengah` and `Medium`/`Voltage` occupy the same two display-scale lines in both languages (`Home.tsx:139-144`), proving the type system was actually designed to hold both languages rather than retrofitted.
2. **The Contact page's WhatsApp card answers "what happens after I submit" before the user asks** — an explicit 1×24-hour response commitment sits right at the highest-stakes moment of the funnel (`Contact.tsx:211-228`). This is targeted UX, not decoration.
3. **Products.tsx's empty state is properly built** (icon, message, one-click filter reset, `Products.tsx:248-261`) — in sharp contrast to Contact.tsx, which has zero form-level error handling despite PRODUCT.md declaring a zod-validated stack.

## Priority Issues

**[P0] Footer and Contact page disagree on the company's own address and email**
- Why it matters: `Footer.tsx:90` ("Jl. Industri Raya No. 10, Bekasi, Jawa Barat", `info@voltamax.co.id`) contradicts `Contact.tsx:240-254` ("Kawasan Industri MM2100... Cikarang Barat, Bekasi 17530", `inquiry@voltamax.co.id`) — visible on every single page, to the exact procurement/legal audience most likely to cross-check it before a contract. PRODUCT.md names the MM2100 address as verified ground truth.
- Fix: Sync Footer.tsx to the Contact.tsx/PRODUCT.md address and email.
- Suggested command: `/impeccable harden`

**[P0] The company's only non-generic evidence never appears on the homepage**
- Why it matters: PRODUCT.md calls the three real case studies (Indocement, Pertamina Cepu, Pusri SG-41) "load-bearing... never dilute it," but a homepage visitor must know to click a nav link labeled "Portfolio" (which actually routes to `/tentang-kami`, "about us") to find them. A skeptical technical buyer typically decides credibility before scrolling that far.
- Fix: Feature at least one named, specific project with a real photo directly on Home — ideally replacing one of the two redundant generic-trust sections ("Tentang Kami" teaser or "Why Choose Us").
- Suggested command: `/impeccable layout`

**[P1] The implementation already contradicts DESIGN.md's own named rules**
- Why it matters: "The One Blue Rule" ("no status color... never a second hue") is broken twice — green for the WhatsApp CTA (`Contact.tsx:213-224`) and red for "Challenges" (`ProjectDetail.tsx:219-226`). "The Earned-Shadow Rule" ("a card never has a shadow at rest") is broken by the Contact form card itself (`Contact.tsx:141`, `shadow-sm` at rest) — the panel DESIGN.md explicitly names. The detector independently caught two more off-system hits the design review missed: undeclared Arial font-family used twice for brand-logo wordmark fidelity (`Home.tsx:68,81`) and two type-ramp misses at 11px/10px. None of this is catastrophic individually, but a system that contradicts its own documentation within one implementation pass will drift further without intervention.
- Fix: For the color/shadow violations, either restyle with the navy/white/opacity scale the rule demands, or formally amend DESIGN.md with a stated exception (status-color and photo-shadow carve-outs are legitimate design decisions — undocumented ones aren't). For the brand-logo font findings, add an explicit "third-party wordmark reproduction" exception to DESIGN.md's typography section rather than leaving it as silent drift.
- Suggested command: `/impeccable polish`

**[P2] Two unexplained data inconsistencies compound the trust problem above**
- Why it matters: Home claims "30+ Industry Clients" (`Home.tsx:239`) while About claims "85+" for the same metric (`About.tsx:135`); Home's stat band also claims "15+ Brand Partners" against only 6 ever named in the codebase (and the Home carousel itself shows only 5 of those 6 — Tesar is present on `Products.tsx` but missing from `Home.tsx`'s `BRANDS` array). These sit alongside the P0 evidence gap: a site under-featuring its real proof while overstating its round numbers is a compounding, not isolated, credibility issue.
- Fix: Reconcile the client-count stat to one verified number across pages; either substantiate "15+" or reduce it to the true count; add Tesar to Home's carousel for parity with Products.tsx.
- Suggested command: `/impeccable clarify`

**[P2] Accessibility gaps: icon-only controls, sub-AA text, and a non-responsive brand carousel**
- Why it matters: the mobile menu toggle and brand-carousel prev/next buttons render icon-only with no `aria-label` (and the menu toggle has no `aria-expanded`/`aria-controls`) — a straightforward WCAG 4.1.2 gap, not a judgment call. Footer legal text at `white/30` on `#040A14` computes to ≈2.3:1, well under the 4.5:1 AA bar; stat/body labels at `white/45` land at ≈4.3:1, just under it. Separately, the brand carousel hardcodes `w-1/4` per tile with no responsive variant, cramming four ~85px-wide logos onto a 375px viewport — wasting the one section that's otherwise real evidence (named brand partners) on the mobile audience most likely to bounce from it.
- Fix: Add `aria-label`/`aria-expanded` to icon-only controls; raise footer legal text to at least `white/55`; make `visibleCount` responsive (1–2 on mobile, 4 on desktop).
- Suggested command: `/impeccable adapt`

## Persona Red Flags

**Jordan (confused first-timer)**: Scrolls the entire homepage and never encounters a real client name — just "150+ Projects," "30+ Clients," generic checkmarks. To find proof Voltamax has done anything relevant to their own industry, Jordan has to guess that the nav's "Portfolio" link — which actually points at `/tentang-kami`, literally "about us" — is where that lives. That's a beat of hesitation exactly when momentum matters most.

**Riley (stress-tester)**: Every Home section starts at `opacity: 0` and only becomes visible once a `useEffect`-mounted `IntersectionObserver` fires (`Home.tsx:20-29`, `.reveal` class in `index.css`). If JS throws anywhere before that observer attaches, the affected section stays permanently invisible — no CSS-only or `<noscript>` fallback exists. Riley would also flag `min-h-screen` (100vh, not `100dvh`) on the hero, which triggers the classic mobile-Safari address-bar resize jump.

**Casey (distracted mobile user)**: Hits the brand carousel with four logos crammed into ~85px cells (see P2 above), and gets no confirmation on tap whether the unlabeled hamburger icon registered as "open menu" — no `aria-label`, no visibly distinct focus ring standard across the page's buttons.

## Minor Observations

- `not-found.tsx` is Indonesian-only with no language toggle and doesn't use the site's Navbar or dark-hero convention at all — the one page in the app that breaks both PRODUCT.md's bilingual principle and DESIGN.md's visual system, reading as an unstyled leftover.
- The "Ambient-Cyan Exception" DESIGN.md documents for hero + "why choose us" sections is only actually present in the hero (`Home.tsx:129`) — the pairing isn't consistently implemented.
- The WhatsApp number in `Contact.tsx:221` (`+6282124921474`) differs from the office phone listed everywhere else (`+62 21 898 1234`) — plausible as a real separate mobile line, but unverified against PRODUCT.md's confirmed evidence list.
- Detector-flagged `Contact.tsx:60` (`gray-on-color`) is very likely a false positive — the two class fragments it matched belong to different Radix Select item states (resting vs. `data-[highlighted]`), not a simultaneous pairing.

## Questions to Consider

1. If the three real case studies are the company's only non-generic asset, why does the homepage spend two full sections on interchangeable trust badges instead of leading with one of them?
2. DESIGN.md's "One Blue Rule" states no exceptions — is WhatsApp-green and Challenges-red an approved carve-out nobody wrote down, or has the system already started drifting from its own documentation after a single implementation pass?
3. The nav's "Portfolio" link routes to `/tentang-kami` ("about us") — was that a deliberate merge of About + Portfolio into one page, or did Portfolio never get a page of its own?
