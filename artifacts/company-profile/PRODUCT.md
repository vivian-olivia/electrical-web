# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary users are industrial procurement and engineering managers at manufacturing, mining, oil & gas, and infrastructure companies in Indonesia, evaluating contractors for medium-voltage (MV) electrical work. They arrive researching a vendor for a specific need — EPC project, equipment procurement, maintenance contract, or technical consulting — and use the site to assess credibility (track record, certifications, brand partnerships) before requesting a quote or contacting the team. The contact form's inquiry types (EPC Project, Product Procurement, Maintenance Service, Technical Consulting, Other) are the real intake categories.

## Product Purpose

Voltamax is a medium-voltage electrical engineering and EPC (Engineering, Procurement, Construction) company. The website exists to establish credibility with industrial buyers and convert them into contact/quote requests. Success is a qualified inquiry (form submission, WhatsApp chat, or call) from a company with a genuine MV electrical need.

## Positioning

20+ years of experience specialized in Medium Voltage electrical systems, offering the full project lifecycle end-to-end (Engineering → EPC/Procurement/Construction → Testing & Commissioning → Maintenance) rather than a single service slice, backed by partnerships with world-leading component brands (ABB, Schneider Electric, Siemens, Hitachi Energy, Eaton, Tesar). No sharper differentiator (certifications, exclusivity, niche vertical) beyond this was confirmed — do not invent one.

## Operating Context

- Bilingual site: Indonesian (default) and English, toggled via `LanguageContext`; all new copy must ship in both.
- Real project case studies with before/after photography exist for: Indocement (public/projects/project-indocement-*), Pertamina Cepu (project-pertamina-cepu-*), and Pusri SG-41 (project-pusri-SG41.jpeg). Treat these as evidence, not placeholders.
- Real office contact details are live in Contact.tsx and Footer.tsx: Kawasan Industri MM2100, Jl. Jawa Blok H No. 1, Cikarang Barat, Bekasi 17530; +62 21 898 1234; info@voltamax.co.id (unified — Contact.tsx previously showed a separate inquiry@voltamax.co.id, now reconciled to the one address); business hours Mon–Fri 08:00–17:00 WIB; embedded Google Maps location.
- Industries served: Manufacturing, Mining, Oil & Gas, Infrastructure, Commercial Buildings, Data Centers.
- Routes are Indonesian-language slugs (`/tentang-kami`, `/produk`, `/hubungi-kami`, `/tentang-kami/proyek/:slug`) — preserve this URL structure.

## Capabilities and Constraints

- Services offered: Engineering, Procurement, Construction (EPC), Testing & Commissioning, Maintenance.
- Product categories: MV switchgear, transformers, LV equipment, accessories — spec'd with real technical ranges (e.g. 12kV/24kV/36kV, up to 3150A).
- Stack: React + Vite + Tailwind + shadcn/ui (Radix) + wouter routing + react-hook-form/zod, i18n via a custom `LanguageContext`/`translations.ts` (not a library like i18next).
- Hero/section imagery currently sources partly from Unsplash stock URLs (hero, about, CTA, product category images) alongside the real project photos in `public/projects/`. This mix is a known state, not yet flagged for replacement.

## Brand Commitments

- Name: **Voltamax**. Wordmark shown as "VOLTAMAX" (uppercase, tracked) in Navbar and Footer.
- Visual identity currently in place: dark navy (`#030810`/`#070D1A`) sections with blue-600/cyan accents for hero/stats/"why choose us", white sections for content-heavy areas, a "blueprint grid" motif, and glass-panel stat cards — this is incumbent visual truth, not yet formalized in a DESIGN.md.
- Brand partner logos (ABB, Schneider Electric, Siemens, Hitachi, Eaton, Tesar) are rendered as coded text/shape approximations, not licensed logo assets — treat as placeholder-quality even though the partnerships themselves are real.

## Evidence on Hand

- Real: office address, phone, email, business hours, Google Maps location, three project case studies with real photography, six named brand/technology partners, service and product-category descriptions (ID/EN).
- Not real / to treat as placeholder: stock Unsplash imagery used for hero/about/CTA/product backgrounds; brand logos are stylized text, not actual logo files. Future work must not fabricate additional testimonials, client names, certifications, pricing, or benchmarks beyond what's listed here.

## Product Principles

1. Every piece of copy and every new page ships in both Indonesian and English — no English-only or Indonesian-only additions.
2. Real evidence (the three project case studies, real contact info, real brand partnerships) is load-bearing content — preserve and feature it; never dilute it with invented case studies or claims.
3. The audience is a B2B technical/procurement buyer evaluating vendor credibility — design and copy should read as engineering-grade and trustworthy over consumer-flashy.
4. The full-lifecycle positioning (Engineering → EPC → Testing & Commissioning → Maintenance) should stay visible as the core narrative thread, not collapse into a single service.
5. Do not invent a sharper competitive differentiator (certifications, exclusivity, niche) — the confirmed positioning is 20+ years of MV specialization plus brand partnerships, nothing more specific.

## Accessibility & Inclusion

No product-specific accessibility requirement was established beyond standard web accessibility practice.
