"use client";

import { useEffect, useRef, useState, type ReactElement } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/i18n/LanguageContext";
import {
  ArrowRight,
  Wrench, Settings, Building2, Activity,
  MapPin, Tag,
  Factory, Mountain, Fuel, Building, Server,
  Shield, Zap, Users,
} from "lucide-react";
import { projectsData } from "@/data/projects";

/* ─── Images ─── */
const HERO_BG = "/hero.jpg";
const CTA_IMG = "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=1920&q=80";

/* Positionally matched to the four hero feature bullets below */
const HERO_FEATURE_ICONS = [Shield, Settings, Zap, Users];

/* Two of the three real, named case studies — spanning different industries as a homepage teaser. Full portfolio lives on /tentang-kami. */
const FEATURED_PROJECTS = projectsData.slice(0, 2);

/* ─── Scroll-reveal ─── */
function useReveal<T extends HTMLElement = HTMLDivElement>(threshold = 0.12) {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

/* ─── Count-up ─── */
function CountUp({ to, suffix = "+" }: { to: number; suffix?: string }) {
  const [n, setN] = useState(0);
  const { ref, visible } = useReveal<HTMLSpanElement>(0.5);
  useEffect(() => {
    if (!visible) return;
    let cur = 0;
    const step = to / 60;
    const id = setInterval(() => {
      cur += step;
      if (cur >= to) { setN(to); clearInterval(id); } else setN(Math.floor(cur));
    }, 16);
    return () => clearInterval(id);
  }, [visible, to]);
  return <span ref={ref}>{n}{suffix}</span>;
}

/* ─── Brand logos ─── Eaton is intentionally excluded (see BRANDS below): its real navy hex is unreadable on the dark Proof section. */
function BrandLogo({ name }: { name: string }) {
  const logos: Record<string, ReactElement> = {
    ABB: (
      <div className="font-black text-3xl text-[#CC0000] tracking-tighter" style={{ fontFamily: "'Arial Black', sans-serif" }}>
        ABB
      </div>
    ),
    Schneider: (
      <div className="flex items-center gap-2.5">
        <div className="w-2.5 h-10 bg-[#3DCD58] rounded-sm shrink-0" />
        <div>
          <div className="font-bold text-sm text-[#3DCD58] leading-tight">Schneider</div>
          <div className="text-xs text-gray-500 font-medium">Electric</div>
        </div>
      </div>
    ),
    Siemens: (
      <div className="font-bold text-xl tracking-[0.15em] text-[#009999]" style={{ fontFamily: "Arial, sans-serif" }}>
        SIEMENS
      </div>
    ),
    Hitachi: (
      <div>
        <div className="font-black text-lg text-[#E2211C] leading-tight" style={{ fontFamily: "'Arial Black', sans-serif" }}>
          HITACHI
        </div>
        <div className="text-[11px] text-gray-500 font-semibold tracking-widest uppercase">Energy</div>
      </div>
    ),
  };
  return logos[name] || <span className="font-bold text-gray-700">{name}</span>;
}

/* Eaton dropped — its brand navy (#1A3668) is unreadable against the dark Proof section background. */
const BRANDS = ["ABB", "Schneider", "Siemens", "Hitachi"];

/* Icons matched positionally to t.home.industries — Manufacturing, Mining, Oil & Gas, Infrastructure, Commercial Buildings, Data Centers */
const INDUSTRY_ICONS = [Factory, Mountain, Fuel, Building2, Building, Server];

/* ═══════════════════════════════════════ HOME ═══════════════════════════════════════ */
export default function HomeClient() {
  const { t, language } = useLanguage();
  const id = language === "id";

  /* Reveal refs */
  const industriesReveal = useReveal();
  const servicesReveal = useReveal();
  const proofReveal = useReveal();
  const partnersReveal = useReveal();
  const projectsReveal = useReveal();
  const ctaReveal = useReveal();

  return (
    <div className="flex flex-col w-full">

      {/* ══════════ HERO (kept in the dark register so section colors alternate cleanly) ══════════ */}
      <section className="relative min-h-screen flex flex-col bg-[#030810] overflow-hidden">
        {/* Switchgear photo — its own baked-in gradient fades to dark on the left.
            On mobile the crop is narrow, so we shift it right to keep the switchgear
            (not just the engineer) in frame, and darken it further behind the stacked text. */}
        <div className="absolute inset-0">
          <Image
            src={HERO_BG}
            alt=""
            fill
            priority
            className="object-cover object-[70%_center] md:object-right"
          />
          <div className="absolute inset-0 bg-[#030810]/45 md:bg-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#030810]/70 via-[#030810]/35 to-[#030810]/95 md:from-[#030810]/50 md:via-transparent md:to-[#030810]/85" />
        </div>

        {/* Static blueprint grid (subtle — the photo already carries most of the darkness) */}
        <div className="absolute inset-0 blueprint-grid pointer-events-none opacity-60" />

        {/* Content */}
        <div className="relative z-10 flex-1 flex flex-col justify-center w-full max-w-7xl mx-auto px-6 md:px-12 pt-28 pb-14">
          <div className="lg:max-w-[56%]">
            {/* Eyebrow */}
            <span className="block text-blue-400 text-sm font-bold tracking-[0.2em] uppercase mb-4 hero-fade-in">
              {id ? "Solusi Tegangan Menengah" : "Medium Voltage Solutions"}
            </span>
            <div className="w-10 h-0.5 bg-blue-500 mb-6 hero-fade-in" />

            {/* Headline */}
            <h1 className="font-extrabold leading-[1.12] mb-8 hero-fade-in">
              <span className="block text-4xl md:text-5xl lg:text-6xl text-white">
                {id ? "Solusi Kelistrikan" : "Reliable Electrical"}
              </span>
              <span className="block text-4xl md:text-5xl lg:text-6xl text-blue-500">
                {id ? "Tegangan Menengah" : "Medium Voltage"}
              </span>
              <span className="block text-4xl md:text-5xl lg:text-6xl text-white">
                {id ? "untuk Industri" : "Solutions for Industry"}
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-white/55 text-base md:text-lg leading-relaxed mb-8 max-w-xl hero-fade-in-delay-2">
              {id
                ? "Engineering, EPC, Testing & Commissioning, dan Maintenance untuk sistem kelistrikan tegangan menengah."
                : "Engineering, EPC, Testing & Commissioning, and Maintenance for medium voltage electrical systems."}
            </p>

            <div className="w-10 h-0.5 bg-blue-500 mb-8 hero-fade-in-delay-2" />

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 hero-fade-in-delay-2">
              <Link
                href="/tentang-kami"
                className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-8 py-4 rounded text-sm transition-colors shadow-lg shadow-blue-900/30"
              >
                {id ? "Lihat Portofolio" : "View Portfolio"}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/produk"
                className="inline-flex items-center justify-center gap-2 border border-white/25 text-white font-semibold px-8 py-4 rounded text-sm hover:bg-white/8 transition-colors"
              >
                {id ? "Jelajahi Produk" : "Explore Products"}
              </Link>
            </div>
          </div>

          {/* Feature strip */}
          <div className="mt-16 md:mt-20 pt-8 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-8 md:divide-x md:divide-white/10 hero-fade-in-delay-2">
            {[
              {
                title: id ? "Andal & Aman" : "Reliable & Safe",
                desc: id ? "Peralatan berkualitas tinggi dan standar keselamatan ketat" : "High quality equipment and strict safety standards",
              },
              {
                title: id ? "Solusi End-to-End" : "End-to-End Solutions",
                desc: id ? "Dari engineering hingga commissioning & maintenance" : "From engineering to commissioning & maintenance",
              },
              {
                title: id ? "Dibangun untuk Performa" : "Built for Performance",
                desc: id ? "Sistem yang dioptimalkan untuk keandalan maksimal" : "Optimized systems for maximum reliability",
              },
              {
                title: id ? "Tim Berpengalaman" : "Experienced Team",
                desc: id ? "Engineer terampil dengan keahlian industri" : "Skilled engineers with industrial expertise",
              },
            ].map((feature, i) => {
              const Icon = HERO_FEATURE_ICONS[i];
              return (
                <div key={feature.title} className="flex items-start gap-3 md:px-6 first:md:pl-0">
                  <Icon className="h-6 w-6 text-blue-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-white font-semibold text-sm mb-1">{feature.title}</div>
                    <div className="text-white/45 text-xs leading-relaxed">{feature.desc}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════ INDUSTRIES WE SERVE ══════════ */}
      <section className="bg-gray-50 py-20 md:py-28">
        <div
          ref={industriesReveal.ref}
          className={`max-w-7xl mx-auto px-6 md:px-12 reveal ${industriesReveal.visible ? "visible" : ""}`}
        >
          <div className="mb-14">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 max-w-2xl leading-snug mb-4">
              {t.home.industriesTitle}
            </h2>
            <p className="text-gray-500 text-base max-w-2xl leading-relaxed">
              {t.home.industriesSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {t.home.industries.map((label, i) => {
              const Icon = INDUSTRY_ICONS[i];
              return (
                <div
                  key={label}
                  style={{ transitionDelay: `${i * 60}ms` }}
                  className={`bg-white border border-gray-200 rounded-xl p-6 flex flex-col items-center text-center gap-4 hover:border-blue-200 hover:shadow-lg transition-all reveal ${industriesReveal.visible ? "visible" : ""}`}
                >
                  <div className="w-12 h-12 bg-blue-50 border border-blue-100 rounded-full flex items-center justify-center text-blue-600">
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className="text-gray-800 text-sm font-semibold leading-snug">{label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════ LAYANAN KAMI ══════════ */}
      <section className="bg-[#070D1A] py-20 md:py-28 border-y border-white/5">
        <div
          ref={servicesReveal.ref}
          className={`max-w-7xl mx-auto px-6 md:px-12 reveal ${servicesReveal.visible ? "visible" : ""}`}
        >
          <div className="mb-14">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white max-w-2xl leading-snug">
              {id ? "Solusi Terintegrasi untuk Kebutuhan Kelistrikan Anda" : "Integrated Solutions for Your Electrical Needs"}
            </h2>
          </div>

          <div className="relative">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 border border-white/10">
            {[
              {
                icon: <Settings className="h-6 w-6" />,
                title: "Engineering",
                desc: id
                  ? "Perencanaan sistem kelistrikan mulai dari desain dan perhitungan teknis hingga gambar konstruksi."
                  : "Electrical system planning from design and technical calculations to construction drawings.",
              },
              {
                icon: <Building2 className="h-6 w-6" />,
                title: "EPC",
                desc: id
                  ? "Konstruksi proyek kelistrikan industri secara end-to-end dengan manajemen ketat."
                  : "End-to-end construction of industrial electrical projects with strict management.",
              },
              {
                icon: <Activity className="h-6 w-6" />,
                title: "Testing &\nCommissioning",
                desc: id
                  ? "Pengujian dan inspeksi untuk memastikan sistem beroperasi secara aman dan andal."
                  : "Testing and inspection to ensure systems operate safely and reliably.",
              },
              {
                icon: <Wrench className="h-6 w-6" />,
                title: "Maintenance",
                desc: id
                  ? "Perawatan preventif dan korektif untuk memastikan keandalan sistem jangka panjang."
                  : "Preventive and corrective maintenance for long-term system reliability.",
              },
            ].map((svc, i) => (
              <div
                key={i}
                style={{ transitionDelay: `${i * 80}ms` }}
                className={`bg-[#070D1A] p-7 hover:bg-blue-500/10 transition-colors group reveal ${servicesReveal.visible ? "visible" : ""}`}
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="w-11 h-11 bg-blue-500/10 border border-blue-400/20 flex items-center justify-center text-blue-400 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-colors">
                    {svc.icon}
                  </div>
                  <span className="font-mono text-xs text-white/20 group-hover:text-blue-300 transition-colors">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <h3 className="font-bold text-white mb-3 whitespace-pre-line leading-snug">{svc.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{svc.desc}</p>
              </div>
            ))}
          </div>

          {/* Lifecycle connector: reads the four tiles as one flow (Engineering → EPC → T&C → Maintenance), not four unrelated cards */}
          <div className="hidden lg:block pointer-events-none absolute inset-x-0 top-[38px]" aria-hidden="true">
            {[25, 50, 75].map((pct) => (
              <ArrowRight
                key={pct}
                className="absolute h-3.5 w-3.5 text-blue-500/40 -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${pct}%` }}
              />
            ))}
          </div>
          </div>
        </div>
      </section>

      {/* ══════════ PROOF (stats) ══════════ */}
      <section className="bg-white py-14 md:py-20">
        <div
          ref={proofReveal.ref}
          className={`max-w-7xl mx-auto px-6 md:px-12 reveal ${proofReveal.visible ? "visible" : ""}`}
        >
          <div className="mb-14">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 max-w-2xl leading-snug mb-4">
              {id ? "Rekam Jejak yang Terbukti" : "A Proven Track Record"}
            </h2>
            <p className="text-gray-500 text-base max-w-2xl leading-relaxed">
              {id
                ? "Dua dekade di lapangan, terukur dari proyek yang telah selesai dan sistem yang masih beroperasi andal hingga kini."
                : "Two decades in the field, measured in projects delivered and systems still running reliably today."}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { value: 150, suffix: "+", label: id ? "Proyek Selesai" : "Projects Done" },
              { value: 30, suffix: "+", label: id ? "Klien Industri" : "Industry Clients" },
              { value: 20, suffix: "+", label: id ? "Tahun Pengalaman" : "Years Experience" },
              { value: 15, suffix: "+", label: id ? "Brand Partner" : "Brand Partners" },
            ].map((s) => (
              <div key={s.label} className="glass-panel-light flex flex-col items-center py-10 px-4">
                <span className="text-4xl md:text-5xl font-mono font-semibold text-blue-600 mb-2 tabular-nums">
                  <CountUp to={s.value} suffix={s.suffix} />
                </span>
                <span className="text-gray-500 text-sm font-medium">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ TECHNOLOGY PARTNERS ══════════ */}
      <section className="bg-[#070D1A] py-20 md:py-28 border-y border-white/5">
        <div
          ref={partnersReveal.ref}
          className={`max-w-7xl mx-auto px-6 md:px-12 reveal ${partnersReveal.visible ? "visible" : ""}`}
        >
          <div className="mb-14">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white max-w-2xl leading-snug mb-4">
              {t.home.partnersTitle}
            </h2>
            <p className="text-white/55 text-base max-w-2xl leading-relaxed">
              {t.home.partnersSubtitle}
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-16 gap-y-10 bg-white border border-white/10 rounded-xl py-14 px-8">
            {BRANDS.map((b) => (
              <div key={b} className="scale-125 opacity-90 hover:opacity-100 transition-opacity">
                <BrandLogo name={b} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ FEATURED PROJECTS (real evidence, now with earned context) ══════════ */}
      <section className="bg-white py-20 md:py-28">
        <div
          ref={projectsReveal.ref}
          className={`max-w-7xl mx-auto px-6 md:px-12 reveal ${projectsReveal.visible ? "visible" : ""}`}
        >
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
            <div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 max-w-2xl leading-snug mb-4">
                {t.home.featuredProjectsTitle}
              </h2>
              <p className="text-gray-500 text-sm max-w-xl leading-relaxed">
                {t.home.featuredProjectsSubtitle}
              </p>
            </div>
            <Link
              href="/tentang-kami"
              className="shrink-0 inline-flex items-center gap-2 text-blue-600 font-semibold text-sm hover:text-blue-700 transition-colors group"
            >
              {t.home.viewAllProjects}
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {FEATURED_PROJECTS.map((project) => (
              <Link
                key={project.id}
                href={`/tentang-kami/proyek/${project.id}`}
                className="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl hover:border-blue-200 transition-all duration-300 flex flex-col"
              >
                <div className="aspect-video bg-gray-100 relative overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <div className="absolute top-4 left-4 bg-blue-600/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    {id ? project.industry : project.industryEn}
                  </div>
                </div>
                <div className="p-8 flex-1 flex flex-col">
                  <div className="flex items-center gap-4 text-xs text-gray-400 mb-3">
                    <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {project.location}</span>
                    <span className="flex items-center gap-1"><Tag className="w-3.5 h-3.5" /> {project.year}</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">{project.title}</h3>
                  <p className="text-gray-500 text-sm mb-5 line-clamp-2 leading-relaxed">
                    {id ? project.descId : project.descEn}
                  </p>
                  <div className="mt-auto grid grid-cols-2 gap-4 border-t border-gray-100 pt-4">
                    <div>
                      <div className="text-xs text-gray-400 uppercase tracking-wider mb-1">Voltage</div>
                      <div className="text-sm font-semibold text-gray-800">{project.voltage}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-400 uppercase tracking-wider mb-1">Scope</div>
                      <div className="text-sm font-semibold text-gray-800">{project.scope}</div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ CTA ══════════ */}
      <section className="relative bg-[#070D1A] py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0">
          <Image src={CTA_IMG} alt="" fill className="object-cover object-center opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#070D1A]/95 via-[#070D1A]/80 to-[#070D1A]/60" />
        </div>
        <div
          ref={ctaReveal.ref}
          className={`relative z-10 max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-8 reveal ${ctaReveal.visible ? "visible" : ""}`}
        >
          <div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4">
              {id ? "Siap Mendukung Proyek Kelistrikan Anda" : "Ready to Support Your Electrical Project"}
            </h2>
            <p className="text-white/55 max-w-xl">
              {id
                ? "Hubungi kami sekarang untuk konsultasi dan solusi terbaik bagi kebutuhan industri Anda."
                : "Contact us now for consultation and the best solutions for your industrial needs."}
            </p>
          </div>
          <Link
            href="/hubungi-kami"
            className="shrink-0 inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-8 py-4 rounded text-sm transition-colors shadow-lg shadow-blue-900/30"
          >
            {id ? "Hubungi Kami Sekarang" : "Contact Us Now"}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

    </div>
  );
}
