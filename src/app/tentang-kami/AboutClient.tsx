"use client";

import { useLanguage } from "@/i18n/LanguageContext";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MapPin, Tag } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useEffect, useRef } from "react";
import { projectsData } from "@/data/projects";

/* ─── Online images — verified 200 from Unsplash ─── */
const IMG = {
  headerBg: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1920&q=80",
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

export default function AboutClient() {
  const { t, language } = useLanguage();
  const id = language === "id";
  const [activeFilter, setActiveFilter] = useState("All");

  const industryList = id
    ? ["All", "Semen", "Migas", "Pupuk & Petrokimia"]
    : ["All", "Cement", "Oil & Gas", "Fertilizer & Petrochemical"];

  const filteredProjects = projectsData.filter((p) => {
    if (activeFilter === "All") return true;
    const ind = id ? p.industry : p.industryEn;
    return ind === activeFilter;
  });

  const statsReveal = useReveal();
  const portfolioReveal = useReveal();

  return (
    <div className="flex flex-col w-full">

      {/* ══════════ DARK HERO HEADER ══════════ */}
      <section className="relative bg-[#070D1A] pt-36 pb-24 overflow-hidden">
        <div className="absolute inset-0">
          <Image src={IMG.headerBg} alt="" fill className="object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#070D1A]/95 via-[#070D1A]/80 to-[#070D1A]/50" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#070D1A]/50 via-transparent to-[#070D1A]" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-5 max-w-3xl leading-tight">
            {id ? "Membangun Fondasi Energi yang Andal" : "Building a Reliable Energy Foundation"}
          </h1>
          <p className="text-white/55 text-lg max-w-2xl leading-relaxed">
            {t.about.subtitle}
          </p>
        </div>
      </section>

      {/* ══════════ TRACK RECORD ══════════ */}
      <section className="py-14 md:py-20 bg-white">
        <div
          ref={statsReveal.ref}
          className={`max-w-7xl mx-auto px-6 md:px-12 reveal ${statsReveal.visible ? "visible" : ""}`}
        >
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              {id ? "Rekam Jejak Kami" : "Our Track Record"}
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed">
              {id
                ? "Dua dekade pengalaman menangani proyek kelistrikan tegangan menengah di berbagai sektor industri."
                : "Two decades of experience delivering medium voltage electrical projects across industrial sectors."}
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 max-w-4xl mx-auto">
            {[
              { value: "20+", label: t.about.stats.years },
              { value: "150+", label: t.about.stats.projects },
              { value: "85+", label: t.about.stats.clients },
              { value: "40+", label: t.about.stats.engineers },
            ].map((s) => (
              <div key={s.label} className="bg-gray-50 border border-gray-100 rounded-xl p-8 text-center hover:border-blue-200 hover:bg-blue-50/30 transition-colors">
                <div className="text-4xl font-bold text-blue-600 mb-2">{s.value}</div>
                <div className="text-sm font-medium text-gray-700">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ PORTFOLIO GRID ══════════ */}
      <section className="py-14 md:py-20 bg-gray-50">
        <div
          ref={portfolioReveal.ref}
          className={`max-w-7xl mx-auto px-6 md:px-12 reveal ${portfolioReveal.visible ? "visible" : ""}`}
        >
          <div className="text-center max-w-2xl mx-auto mb-12">
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

      {/* ══════════ BOTTOM CTA ══════════ */}
      <section className="bg-[#070D1A] py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            {id ? "Siap Memulai Proyek Anda?" : "Ready to Start Your Project?"}
          </h2>
          <p className="text-white/50 mb-8 max-w-xl mx-auto">
            {id
              ? "Diskusikan kebutuhan kelistrikan tegangan menengah Anda dengan tim engineer kami."
              : "Discuss your medium voltage electrical needs with our engineering team."}
          </p>
          <Link
            href="/hubungi-kami"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-8 py-4 rounded text-sm transition-colors"
          >
            {id ? "Konsultasi Gratis" : "Free Consultation"}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

    </div>
  );
}
