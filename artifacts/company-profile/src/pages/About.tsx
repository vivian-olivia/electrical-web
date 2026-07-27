import { useLanguage } from "@/i18n/LanguageContext";
import { Link } from "wouter";
import { ArrowRight, CheckCircle2, MapPin, Tag, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useEffect, useRef } from "react";

/* ─── Online images — verified 200 from Unsplash ─── */
const IMG = {
  headerBg: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1920&q=80",
  aboutSection: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
  manufacturing: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=800&q=80",
  oilGas: "https://images.unsplash.com/photo-1548438294-1ad5d5f4f063?auto=format&fit=crop&w=800&q=80",
  dataCenterImg: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80",
  mining: "https://images.unsplash.com/photo-1518709766631-a6a7f45921c3?auto=format&fit=crop&w=800&q=80",
};

function useReveal(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
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

const projectsData = [
  {
    id: "20kv-distribution-upgrade",
    title: "20kV Distribution Upgrade",
    industry: "Manufaktur",
    industryEn: "Manufacturing",
    location: "Cikarang Industrial Estate",
    year: "2023",
    voltage: "20kV",
    scope: "EPC",
    descId: "Pembaruan sistem distribusi 20kV untuk pabrik manufaktur otomotif, meningkatkan keandalan dan kapasitas daya pabrik sebesar 40%.",
    descEn: "20kV distribution system upgrade for an automotive manufacturing plant, increasing reliability and power capacity by 40%.",
    image: IMG.manufacturing,
  },
  {
    id: "mv-switchgear-installation",
    title: "Medium Voltage Switchgear Installation",
    industry: "Oil & Gas",
    industryEn: "Oil & Gas",
    location: "Balikpapan",
    year: "2022",
    voltage: "11kV",
    scope: "Testing & Commissioning",
    descId: "Instalasi dan commissioning panel MV untuk fasilitas pengolahan minyak dengan standar keamanan ledakan tinggi.",
    descEn: "Installation and commissioning of MV panels for an oil processing facility with high explosion safety standards.",
    image: IMG.oilGas,
  },
  {
    id: "transformer-replacement",
    title: "Transformer Replacement",
    industry: "Data Center",
    industryEn: "Data Centers",
    location: "Jakarta",
    year: "2023",
    voltage: "20kV/380V",
    scope: "Maintenance & Procurement",
    descId: "Penggantian dua unit transformator tipe kering 2500kVA dengan downtime minimal untuk operasional Data Center.",
    descEn: "Replacement of two 2500kVA dry-type transformer units with minimal downtime for Data Center operations.",
    image: IMG.dataCenterImg,
  },
  {
    id: "mining-substation",
    title: "Mining Substation Construction",
    industry: "Pertambangan",
    industryEn: "Mining",
    location: "Morowali",
    year: "2021",
    voltage: "150kV/20kV",
    scope: "EPC",
    descId: "Pembangunan gardu induk lengkap untuk fasilitas peleburan baru di kawasan industri pertambangan terpadu.",
    descEn: "Complete substation construction for a new smelting facility in an integrated mining industrial estate.",
    image: IMG.mining,
  },
];

export default function About() {
  const { t, language } = useLanguage();
  const id = language === "id";
  const [activeFilter, setActiveFilter] = useState("All");

  const industryList = id
    ? ["All", "Manufaktur", "Oil & Gas", "Data Center", "Pertambangan"]
    : ["All", "Manufacturing", "Oil & Gas", "Data Centers", "Mining"];

  const filteredProjects = projectsData.filter((p) => {
    if (activeFilter === "All") return true;
    const ind = id ? p.industry : p.industryEn;
    return ind === activeFilter;
  });

  const profileReveal = useReveal();
  const vmReveal = useReveal();
  const portfolioReveal = useReveal();

  return (
    <div className="flex flex-col w-full">

      {/* ══════════ DARK HERO HEADER ══════════ */}
      <section className="relative bg-[#070D1A] pt-36 pb-24 overflow-hidden">
        <div className="absolute inset-0">
          <img src={IMG.headerBg} alt="" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#070D1A]/95 via-[#070D1A]/80 to-[#070D1A]/50" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#070D1A]/50 via-transparent to-[#070D1A]" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
          <div className="inline-flex items-center gap-2 bg-blue-500/15 border border-blue-500/30 text-blue-300 text-xs font-bold tracking-widest uppercase px-4 py-2 rounded-full mb-6">
            <Zap className="h-3.5 w-3.5" fill="currentColor" />
            {id ? "Tentang Voltamax" : "About Voltamax"}
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-5 max-w-3xl leading-tight">
            {id ? "Membangun Fondasi Energi yang Andal" : "Building a Reliable Energy Foundation"}
          </h1>
          <p className="text-white/55 text-lg max-w-2xl leading-relaxed">
            {t.about.subtitle}
          </p>
        </div>
      </section>

      {/* ══════════ COMPANY PROFILE ══════════ */}
      <section className="py-20 md:py-28 bg-white">
        <div
          ref={profileReveal.ref}
          className={`max-w-7xl mx-auto px-6 md:px-12 grid lg:grid-cols-2 gap-16 items-center reveal ${profileReveal.visible ? "visible" : ""}`}
        >
          <div className="space-y-6">
            <p className="text-blue-600 text-xs font-bold tracking-widest uppercase">
              {id ? "Profil Perusahaan" : "Company Profile"}
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">{id ? "Siapa Kami" : "Who We Are"}</h2>
            <p className="text-gray-600 leading-relaxed">{t.about.profileText1}</p>
            <p className="text-gray-600 leading-relaxed">{t.about.profileText2}</p>
            <Link
              href="/hubungi-kami"
              className="inline-flex items-center gap-2 text-blue-600 font-semibold text-sm hover:text-blue-700 transition-colors group"
            >
              {id ? "Diskusikan Proyek Anda" : "Discuss Your Project"}
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-5">
            {[
              { value: "20+", label: t.about.stats.years },
              { value: "150+", label: t.about.stats.projects },
              { value: "85+", label: t.about.stats.clients },
              { value: "40+", label: t.about.stats.engineers },
            ].map((s) => (
              <div key={s.label} className="bg-gray-50 border border-gray-100 rounded-xl p-8 hover:border-blue-200 hover:bg-blue-50/30 transition-colors">
                <div className="text-4xl font-bold text-blue-600 mb-2">{s.value}</div>
                <div className="text-sm font-medium text-gray-700">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ VISI & MISI ══════════ */}
      <section className="py-20 md:py-28 bg-[#070D1A]">
        <div
          ref={vmReveal.ref}
          className={`max-w-7xl mx-auto px-6 md:px-12 reveal ${vmReveal.visible ? "visible" : ""}`}
        >
          <div className="text-center mb-14">
            <p className="text-blue-400 text-xs font-bold tracking-widest uppercase mb-3">
              {id ? "Nilai Kami" : "Our Values"}
            </p>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white max-w-2xl mx-auto leading-snug">
              {id ? "Visi & Misi Perusahaan" : "Company Vision & Mission"}
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white/5 border border-white/10 p-10 rounded-xl">
              <div className="w-10 h-10 rounded-full bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 mb-6">
                <Zap className="h-5 w-5" fill="currentColor" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">{t.about.visionTitle}</h3>
              <p className="text-white/55 leading-relaxed">{t.about.visionText}</p>
            </div>
            <div className="bg-white/5 border border-white/10 p-10 rounded-xl">
              <div className="w-10 h-10 rounded-full bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 mb-6">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">{t.about.missionTitle}</h3>
              <ul className="space-y-3">
                {t.about.missionItems.map((item, i) => (
                  <li key={i} className="flex gap-3 text-white/55">
                    <CheckCircle2 className="h-5 w-5 text-blue-400 shrink-0 mt-0.5" />
                    <span className="text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ PORTFOLIO GRID ══════════ */}
      <section className="py-20 md:py-28 bg-white">
        <div
          ref={portfolioReveal.ref}
          className={`max-w-7xl mx-auto px-6 md:px-12 reveal ${portfolioReveal.visible ? "visible" : ""}`}
        >
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-blue-600 text-xs font-bold tracking-widest uppercase mb-3">
              {id ? "Rekam Jejak Kami" : "Our Track Record"}
            </p>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">{t.about.portfolioTitle}</h2>
            <p className="text-gray-500 text-sm leading-relaxed">{t.about.portfolioSubtitle}</p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {industryList.map((ind) => (
              <button
                key={ind}
                onClick={() => setActiveFilter(ind)}
                className={cn(
                  "px-5 py-2 rounded-full text-sm font-medium transition-all",
                  activeFilter === ind
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                )}
              >
                {ind === "All" ? t.about.filterAll : ind}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {filteredProjects.map((project, i) => (
              <Link
                key={project.id}
                href={`/tentang-kami/proyek/${project.id}`}
                className="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl hover:border-blue-200 transition-all duration-300 flex flex-col"
              >
                <div className="aspect-video bg-gray-100 relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
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

    </div>
  );
}
