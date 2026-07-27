import { useLanguage } from "@/i18n/LanguageContext";
import { ArrowLeft, Check, ChevronRight, Zap } from "lucide-react";
import { Link, useParams } from "wouter";
import { useEffect, useRef, useState } from "react";

const IMG_PROJECT = "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1920&q=80";

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

const projectsData = {
  "20kv-distribution-upgrade": {
    title: "20kV Distribution Upgrade",
    industry: "Manufaktur",
    industryEn: "Manufacturing",
    location: "Cikarang Industrial Estate",
    year: "2023",
    voltage: "20kV",
    scope: "EPC",
    descId: "Pembaruan sistem distribusi 20kV untuk pabrik manufaktur otomotif, meningkatkan keandalan dan kapasitas daya pabrik sebesar 40%.",
    descEn: "20kV distribution system upgrade for an automotive manufacturing plant, increasing plant reliability and power capacity by 40%.",
    challengesId: [
      "Waktu henti operasional pabrik yang sangat terbatas (maksimal 4 jam).",
      "Kondisi panel existing yang sudah usang dan dokumentasi yang minim.",
      "Integrasi dengan sistem SCADA yang ada.",
    ],
    challengesEn: [
      "Extremely limited plant operational downtime (max 4 hours).",
      "Obsolete existing panel conditions and minimal documentation.",
      "Integration with existing SCADA system.",
    ],
    solutionsId: [
      "Pembuatan panel tie-in sementara untuk menjaga suplai listrik area kritis.",
      "Pemetaan ulang jalur kabel secara menyeluruh sebelum eksekusi.",
      "Penggunaan RMU (Ring Main Unit) modular untuk instalasi cepat.",
    ],
    solutionsEn: [
      "Creation of temporary tie-in panels to maintain supply to critical areas.",
      "Comprehensive re-mapping of cable routing before execution.",
      "Use of modular RMU (Ring Main Unit) for rapid installation.",
    ],
    image: IMG_PROJECT,
  },
};

export default function ProjectDetail() {
  const { t, language } = useLanguage();
  const id = language === "id";
  const params = useParams();
  const project = projectsData[params.slug as keyof typeof projectsData] || projectsData["20kv-distribution-upgrade"];
  const contentReveal = useReveal();

  return (
    <div className="flex flex-col w-full">

      {/* ══════════ DARK HERO HEADER ══════════ */}
      <section className="relative bg-[#070D1A] pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <img src={project.image} alt="" className="w-full h-full object-cover opacity-25" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#070D1A]/95 via-[#070D1A]/80 to-[#070D1A]/50" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#070D1A]/50 via-transparent to-[#070D1A]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-white/40 mb-8">
            <Link href="/tentang-kami" className="hover:text-white/70 transition-colors">
              {id ? "Portofolio" : "Portfolio"}
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-white/70 truncate">{project.title}</span>
          </div>

          <div className="inline-flex items-center gap-2 bg-blue-500/15 border border-blue-500/30 text-blue-300 text-xs font-bold tracking-widest uppercase px-4 py-2 rounded-full mb-6">
            <Zap className="h-3.5 w-3.5" fill="currentColor" />
            {id ? project.industry : project.industryEn}
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-5 max-w-3xl leading-tight">
            {project.title}
          </h1>

          <div className="flex flex-wrap gap-3 text-xs">
            <span className="bg-white/10 border border-white/15 text-white/70 px-3 py-1.5 rounded-full flex items-center gap-1">
              📍 {project.location}
            </span>
            <span className="bg-white/10 border border-white/15 text-white/70 px-3 py-1.5 rounded-full flex items-center gap-1">
              📅 {project.year}
            </span>
            <span className="bg-blue-600/40 border border-blue-500/40 text-blue-200 px-3 py-1.5 rounded-full font-semibold">
              {project.voltage}
            </span>
          </div>
        </div>
      </section>

      {/* ══════════ CONTENT ══════════ */}
      <section className="py-16 md:py-24 bg-white">
        <div
          ref={contentReveal.ref}
          className={`max-w-7xl mx-auto px-6 md:px-12 reveal ${contentReveal.visible ? "visible" : ""}`}
        >
          <Link
            href="/tentang-kami"
            className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700 mb-10 group"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            {id ? "Kembali ke Portofolio" : "Back to Portfolio"}
          </Link>

          {/* Project image */}
          <div className="aspect-[21/9] rounded-2xl overflow-hidden mb-16 shadow-lg bg-gray-100">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {/* Main content */}
            <div className="md:col-span-2 space-y-10">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-3 border-b border-gray-100">
                  {id ? "Tinjauan Proyek" : "Project Overview"}
                </h2>
                <p className="text-gray-600 leading-relaxed text-base">
                  {id ? project.descId : project.descEn}
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-bold text-red-600 mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-500" />
                    {id ? "Tantangan" : "Challenges"}
                  </h3>
                  <ul className="space-y-3">
                    {(id ? project.challengesId : project.challengesEn).map((item, i) => (
                      <li key={i} className="flex gap-3 text-gray-500 text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 shrink-0" />
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-blue-600 mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-500" />
                    {id ? "Solusi" : "Solutions"}
                  </h3>
                  <ul className="space-y-3">
                    {(id ? project.solutionsId : project.solutionsEn).map((item, i) => (
                      <li key={i} className="flex gap-3 text-gray-500 text-sm">
                        <Check className="h-4 w-4 text-blue-500 shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-5">
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-8">
                <h3 className="text-base font-bold text-gray-900 mb-6 pb-4 border-b border-gray-200">
                  {id ? "Detail Spesifikasi" : "Specification Details"}
                </h3>
                <div className="space-y-5">
                  {[
                    { label: "Voltage", value: project.voltage },
                    { label: "Scope", value: project.scope },
                    { label: id ? "Tahun" : "Year", value: project.year },
                    { label: id ? "Lokasi" : "Location", value: project.location },
                  ].map((s) => (
                    <div key={s.label} className="flex justify-between items-start">
                      <span className="text-xs text-gray-400 uppercase tracking-wider font-semibold">{s.label}</span>
                      <span className="text-sm font-semibold text-gray-800 text-right max-w-[55%]">{s.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Link
                href="/hubungi-kami"
                className="block w-full text-center bg-blue-600 hover:bg-blue-500 text-white font-semibold py-4 rounded-xl text-sm transition-colors"
              >
                {t.common.requestQuote}
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
