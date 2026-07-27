import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { useLanguage } from "@/i18n/LanguageContext";
import {
  ChevronDown, ChevronLeft, ChevronRight, ArrowRight,
  Zap, Users, ShieldCheck, Clock, Headphones,
  Wrench, Settings, Building2, Activity,
  Award, CheckCircle,
} from "lucide-react";

/* ─── Images ─── */
const HERO_BG = "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1920&q=80";
const ABOUT_IMG = "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80";
const CTA_IMG = "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=1920&q=80";

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

/* ─── Ambient lightning SVG (background decoration) ─── */
function AmbientLightning() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <svg className="absolute w-full h-full" viewBox="0 0 1280 720" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="glow-a" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="5" result="b1"/>
            <feGaussianBlur stdDeviation="10" result="b2"/>
            <feMerge><feMergeNode in="b2"/><feMergeNode in="b1"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          <filter id="glow-a-soft" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="3" result="b"/>
            <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>
        {/* Right-side ambient bolts */}
        <path d="M 900 60 L 850 180 L 875 175 L 800 330 L 825 325 L 740 500"
          stroke="#00D4FF" strokeWidth="2" fill="none" filter="url(#glow-a)" className="bolt-1"/>
        <path d="M 900 60 L 960 170 L 935 168 L 1010 310 L 985 308 L 1060 460"
          stroke="#60B8FF" strokeWidth="1.5" fill="none" filter="url(#glow-a)" className="bolt-2"/>
        <path d="M 900 60 L 970 130 L 950 128 L 1020 210 L 1000 208 L 1080 290"
          stroke="#A0D8FF" strokeWidth="1" fill="none" filter="url(#glow-a-soft)" className="bolt-3"/>
        {/* Origin */}
        <circle cx="900" cy="60" r="6" fill="#00D4FF" filter="url(#glow-a)" className="origin-pulse"/>
        <circle cx="900" cy="60" r="18" fill="#00D4FF" opacity="0.12" filter="url(#glow-a)" className="origin-pulse-outer"/>
        {/* Sparks */}
        <circle cx="740" cy="500" r="4" fill="#00D4FF" filter="url(#glow-a-soft)" className="spark spark-1"/>
        <circle cx="1060" cy="460" r="3" fill="#60B8FF" filter="url(#glow-a-soft)" className="spark spark-2"/>
        <circle cx="1080" cy="290" r="2" fill="#A0D8FF" filter="url(#glow-a-soft)" className="spark spark-3"/>
      </svg>
    </div>
  );
}

/* ─── Brand logos ─── */
function BrandLogo({ name }: { name: string }) {
  const logos: Record<string, JSX.Element> = {
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
    Eaton: (
      <div className="font-bold text-2xl text-[#1A3668] lowercase" style={{ fontFamily: "Arial, sans-serif" }}>
        eaton
      </div>
    ),
  };
  return logos[name] || <span className="font-bold text-gray-700">{name}</span>;
}

const BRANDS = ["ABB", "Schneider", "Siemens", "Hitachi", "Eaton"];

/* ═══════════════════════════════════════ HOME ═══════════════════════════════════════ */
export default function Home() {
  const { language } = useLanguage();
  const id = language === "id";

  /* Brand carousel */
  const [brandIdx, setBrandIdx] = useState(0);
  const visibleCount = 4;
  const maxIdx = BRANDS.length - visibleCount;

  /* Reveal refs */
  const aboutReveal = useReveal();
  const statsReveal = useReveal();
  const servicesReveal = useReveal();
  const whyReveal = useReveal();
  const brandsReveal = useReveal();
  const ctaReveal = useReveal();

  return (
    <div className="flex flex-col w-full">

      {/* ══════════ HERO ══════════ */}
      <section className="relative min-h-screen flex items-center bg-[#030810] overflow-hidden">
        {/* Electric background image */}
        <div className="absolute inset-0">
          <img
            src={HERO_BG}
            alt=""
            className="w-full h-full object-cover object-center opacity-35"
          />
          {/* Directional overlays to darken without killing the electric glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#030810]/95 via-[#030810]/70 to-[#030810]/30" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#030810]/60 via-transparent to-[#030810]/75" />
        </div>

        {/* Ambient electric glow orbs */}
        <div className="absolute top-1/3 right-1/4 w-96 h-96 rounded-full bg-blue-600/8 blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/3 right-1/5 w-64 h-64 rounded-full bg-cyan-400/8 blur-3xl pointer-events-none" />

        {/* SVG lightning bolts (right side) */}
        <AmbientLightning />

        {/* Text content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 pt-28 pb-20 lg:max-w-[60%]">
          {/* Tag */}
          <div className="inline-flex items-center gap-2 bg-blue-500/15 border border-blue-500/30 text-blue-300 text-xs font-bold tracking-widest uppercase px-4 py-2 rounded-full mb-8 hero-fade-in">
            <Zap className="h-3.5 w-3.5" fill="currentColor" />
            {id ? "Medium Voltage Specialist" : "Medium Voltage Specialist"}
          </div>

          {/* Headline — arc animation between Tegangan and Menengah */}
          <h1 className="font-bold text-white leading-[1.1] mb-8 hero-fade-in-delay">
            <span className="block text-3xl md:text-5xl lg:text-6xl text-white/80 mb-1">
              {id ? "Solusi Kelistrikan" : "Reliable Electrical"}
            </span>

            {/* "Tegangan" line */}
            <span className="relative block text-5xl md:text-7xl lg:text-8xl text-blue-400 pb-3">
              {id ? "Tegangan" : "Medium"}
              {/* Arc SVG: draws from end of this line toward "Menengah" below */}
              <span
                className="absolute bottom-0 left-0 right-0 overflow-visible pointer-events-none"
                style={{ height: "18px" }}
              >
                <svg
                  viewBox="0 0 500 18"
                  preserveAspectRatio="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-full"
                >
                  <defs>
                    <filter id="arc-glow-hero" x="-20%" y="-100%" width="140%" height="300%">
                      <feGaussianBlur stdDeviation="2.5" result="blur"/>
                      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
                    </filter>
                  </defs>
                  {/* Primary arc */}
                  <path
                    d="M0,9 L45,3 L80,15 L120,2 L165,13 L205,3 L250,14 L290,2 L335,13 L375,3 L420,14 L465,4 L500,9"
                    stroke="#00D4FF" strokeWidth="2.5" fill="none"
                    filter="url(#arc-glow-hero)"
                    className="arc-hero-draw"
                  />
                  {/* Secondary faint arc */}
                  <path
                    d="M0,9 L45,3 L80,15 L120,2 L165,13 L205,3 L250,14 L290,2 L335,13 L375,3 L420,14 L465,4 L500,9"
                    stroke="#7ECFFF" strokeWidth="1" fill="none" opacity="0.5"
                    filter="url(#arc-glow-hero)"
                    style={{ animationDelay: "0.08s" }}
                    className="arc-hero-draw"
                  />
                </svg>
              </span>
            </span>

            {/* "Menengah" line — connected by the arc above */}
            <span className="block text-5xl md:text-7xl lg:text-8xl text-blue-400 mt-3">
              {id ? "Menengah" : "Voltage"}
            </span>

            <span className="block text-2xl md:text-4xl lg:text-5xl text-white/80 mt-2">
              {id ? "yang Andal untuk Industri" : "Solutions for Industry"}
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-white/55 text-base md:text-lg leading-relaxed mb-10 max-w-xl hero-fade-in-delay-2">
            {id
              ? "Engineering, EPC, Testing & Commissioning, dan Maintenance untuk sistem kelistrikan tegangan menengah di berbagai sektor industri."
              : "Engineering, EPC, Testing & Commissioning, and Maintenance for medium voltage electrical systems across industrial sectors."}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 mb-16 hero-fade-in-delay-2">
            <Link
              href="/tentang-kami"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-8 py-4 rounded text-sm transition-colors shadow-lg shadow-blue-900/30"
            >
              {id ? "Lihat Portofolio" : "View Portfolio"}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/hubungi-kami"
              className="inline-flex items-center gap-2 border border-white/25 text-white font-semibold px-8 py-4 rounded text-sm hover:bg-white/8 transition-colors"
            >
              {id ? "Hubungi Kami" : "Contact Us"}
            </Link>
          </div>

          {/* Scroll cue */}
          <div className="flex items-center gap-2 text-white/35 text-xs hero-fade-in-delay-3">
            <ChevronDown className="h-4 w-4 animate-bounce" />
            <span>{id ? "Scroll untuk menjelajahi" : "Scroll to explore"}</span>
          </div>
        </div>
      </section>

      {/* ══════════ TENTANG KAMI ══════════ */}
      <section className="bg-white py-20 md:py-28">
        <div
          ref={aboutReveal.ref}
          className={`max-w-7xl mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-12 md:gap-20 items-center reveal ${aboutReveal.visible ? "visible" : ""}`}
        >
          <div className="relative">
            <div className="aspect-[4/3] rounded-lg overflow-hidden shadow-xl">
              <img
                src={ABOUT_IMG}
                alt="Electrical panel"
                className="w-full h-full object-cover"
                onError={(e) => { (e.target as HTMLImageElement).src = "/generated_images/project-substation.jpg"; }}
              />
            </div>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 border-4 border-blue-500 rounded-lg -z-10" />
          </div>

          <div>
            <p className="text-blue-600 text-xs font-bold tracking-widest uppercase mb-4">
              {id ? "Tentang Kami" : "About Us"}
            </p>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-snug mb-8">
              {id ? "Mitra Tepat untuk Proyek Kelistrikan Industri Anda" : "The Right Partner for Your Industrial Electrical Projects"}
            </h2>
            <div className="flex flex-wrap gap-6 mb-8">
              {[
                { icon: <Award className="h-5 w-5 text-blue-600" />, label: id ? "Berpengalaman" : "Experienced" },
                { icon: <ShieldCheck className="h-5 w-5 text-blue-600" />, label: id ? "Terpercaya" : "Trusted" },
                { icon: <CheckCircle className="h-5 w-5 text-blue-600" />, label: id ? "Aman" : "Safe" },
                { icon: <Zap className="h-5 w-5 text-blue-600" />, label: id ? "Berkualitas" : "Quality" },
              ].map((f) => (
                <div key={f.label} className="flex flex-col items-center gap-1.5">
                  <div className="w-12 h-12 rounded-full border-2 border-blue-100 bg-blue-50 flex items-center justify-center">
                    {f.icon}
                  </div>
                  <span className="text-xs font-semibold text-gray-700">{f.label}</span>
                </div>
              ))}
            </div>
            <p className="text-gray-600 leading-relaxed mb-8">
              {id
                ? "Kami berkomitmen memberikan solusi kelistrikan yang aman, andal, dan efisien untuk mendukung kelancaran operasional bisnis Anda. Dengan pengalaman lebih dari 20 tahun di bidang Medium Voltage."
                : "We are committed to providing safe, reliable, and efficient electrical solutions. With over 20 years of experience in Medium Voltage engineering across Indonesian industries."}
            </p>
            <Link
              href="/tentang-kami"
              className="inline-flex items-center gap-2 text-blue-600 font-semibold text-sm hover:text-blue-700 transition-colors group"
            >
              {id ? "Pelajari Portofolio Kami" : "Explore Our Portfolio"}
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════ STATS ══════════ */}
      <section className="bg-[#070D1A] py-14 border-y border-white/5">
        <div
          ref={statsReveal.ref}
          className={`max-w-7xl mx-auto px-6 md:px-12 reveal ${statsReveal.visible ? "visible" : ""}`}
        >
          <div className="grid grid-cols-2 md:grid-cols-4">
            {[
              { value: 150, suffix: "+", label: id ? "Proyek Selesai" : "Projects Done" },
              { value: 30, suffix: "+", label: id ? "Klien Industri" : "Industry Clients" },
              { value: 20, suffix: "+", label: id ? "Tahun Pengalaman" : "Years Experience" },
              { value: 15, suffix: "+", label: id ? "Brand Partner" : "Brand Partners" },
            ].map((s, i) => (
              <div
                key={s.label}
                className={`flex flex-col items-center py-10 ${i < 3 ? "md:border-r md:border-white/10" : ""} ${i === 0 ? "border-r border-white/10" : ""}`}
              >
                <span className="text-4xl md:text-5xl font-bold text-white mb-2 tabular-nums">
                  <CountUp to={s.value} suffix={s.suffix} />
                </span>
                <span className="text-white/45 text-sm font-medium">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ LAYANAN KAMI ══════════ */}
      <section className="bg-white py-20 md:py-28">
        <div
          ref={servicesReveal.ref}
          className={`max-w-7xl mx-auto px-6 md:px-12 reveal ${servicesReveal.visible ? "visible" : ""}`}
        >
          <div className="mb-14">
            <p className="text-blue-600 text-xs font-bold tracking-widest uppercase mb-3">
              {id ? "Layanan Kami" : "Our Services"}
            </p>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 max-w-2xl leading-snug">
              {id ? "Solusi Terintegrasi untuk Kebutuhan Kelistrikan Anda" : "Integrated Solutions for Your Electrical Needs"}
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
                className={`border border-gray-200 rounded-lg p-7 hover:border-blue-300 hover:shadow-md transition-all group reveal ${servicesReveal.visible ? "visible" : ""}`}
              >
                <div className="w-12 h-12 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 mb-5 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  {svc.icon}
                </div>
                <h3 className="font-bold text-gray-900 mb-3 whitespace-pre-line leading-snug">{svc.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{svc.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ WHY CHOOSE US ══════════ */}
      <section className="bg-[#070D1A] py-20 md:py-28 relative overflow-hidden">
        <div className="absolute inset-0 opacity-8 pointer-events-none">
          <img src={HERO_BG} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-[#070D1A]/90" />
        </div>
        <div
          ref={whyReveal.ref}
          className={`relative z-10 max-w-7xl mx-auto px-6 md:px-12 reveal ${whyReveal.visible ? "visible" : ""}`}
        >
          <div className="mb-14 text-center">
            <p className="text-blue-400 text-xs font-bold tracking-widest uppercase mb-3">
              {id ? "Mengapa Memilih Kami" : "Why Choose Us"}
            </p>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white max-w-2xl mx-auto leading-snug">
              {id ? "Komitmen Kami untuk Memberikan yang Terbaik" : "Our Commitment to Delivering the Best"}
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {[
              { icon: <Users className="h-5 w-5" />, title: id ? "Tim Profesional" : "Professional Team", desc: id ? "Tenaga ahli bersertifikat di bidang kelistrikan industri." : "Certified experts in industrial electrical engineering." },
              { icon: <Zap className="h-5 w-5" />, title: id ? "Spesialis Tegangan Menengah" : "MV Specialists", desc: id ? "Fokus pada sistem Tegangan Menengah yang andal dan aman." : "Focused on reliable and safe Medium Voltage systems." },
              { icon: <ShieldCheck className="h-5 w-5" />, title: id ? "Kualitas & Keselamatan" : "Quality & Safety", desc: id ? "Mengutamakan keselamatan dan keandalan sistem." : "Prioritizing system safety and reliability." },
              { icon: <Clock className="h-5 w-5" />, title: id ? "Dukungan Tepat Waktu" : "On-Time Support", desc: id ? "Komitmen menyelesaikan proyek sesuai jadwal." : "Committed to delivering projects on schedule." },
              { icon: <Headphones className="h-5 w-5" />, title: id ? "Layanan Purna Jual" : "After-Sales Service", desc: id ? "Dukungan teknis setelah proyek selesai." : "Technical support after project completion." },
            ].map((item, i) => (
              <div
                key={i}
                style={{ transitionDelay: `${i * 70}ms` }}
                className={`flex flex-col items-center text-center p-6 rounded-lg border border-white/10 bg-white/5 hover:bg-white/8 transition-colors reveal ${whyReveal.visible ? "visible" : ""}`}
              >
                <div className="w-12 h-12 rounded-full bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 mb-4">
                  {item.icon}
                </div>
                <h3 className="font-bold text-white text-sm mb-2">{item.title}</h3>
                <p className="text-white/45 text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ BRAND PARTNERS ══════════ */}
      <section className="bg-white py-20 md:py-28">
        <div
          ref={brandsReveal.ref}
          className={`max-w-7xl mx-auto px-6 md:px-12 reveal ${brandsReveal.visible ? "visible" : ""}`}
        >
          <div className="text-center mb-14">
            <p className="text-blue-600 text-xs font-bold tracking-widest uppercase mb-3">
              {id ? "Brand Partner Kami" : "Our Brand Partners"}
            </p>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">
              {id ? "Bekerja Sama dengan Merek Terkemuka Dunia" : "Partnering with World-Leading Brands"}
            </h2>
          </div>

          {/* Carousel */}
          <div className="relative flex items-center gap-3">
            <button
              onClick={() => setBrandIdx((i) => Math.max(0, i - 1))}
              disabled={brandIdx === 0}
              className="shrink-0 w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-gray-700 hover:border-gray-400 disabled:opacity-30 transition-all"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <div className="flex-1 overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${brandIdx * (100 / visibleCount)}%)` }}
              >
                {BRANDS.map((b) => (
                  <div key={b} className="flex-none w-1/4 px-3">
                    <div className="border border-gray-200 rounded-lg py-8 px-6 flex items-center justify-center min-h-[100px] hover:border-blue-300 hover:shadow-sm transition-all">
                      <BrandLogo name={b} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => setBrandIdx((i) => Math.min(maxIdx, i + 1))}
              disabled={brandIdx >= maxIdx}
              className="shrink-0 w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-gray-700 hover:border-gray-400 disabled:opacity-30 transition-all"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-7">
            {Array.from({ length: maxIdx + 1 }).map((_, i) => (
              <button
                key={i}
                onClick={() => setBrandIdx(i)}
                className={`h-2 rounded-full transition-all duration-300 ${brandIdx === i ? "w-6 bg-blue-600" : "w-2 bg-gray-300"}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ CTA ══════════ */}
      <section className="relative bg-[#070D1A] py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0">
          <img src={CTA_IMG} alt="" className="w-full h-full object-cover object-center opacity-20" />
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
