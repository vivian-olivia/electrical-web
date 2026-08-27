import { useLanguage } from "@/i18n/LanguageContext";
import { ArrowLeft, ArrowRight, Check, ChevronRight, MapPin, CalendarDays } from "lucide-react";
import { Link, useParams } from "wouter";
import { useEffect, useRef, useState } from "react";
import { assetUrl, whatsappQuoteUrl } from "@/lib/utils";

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
  "indocement-switchgear-retrofit": {
    title: "Indocement Switchgear Retrofit",
    industry: "Semen",
    industryEn: "Cement",
    location: "Citeureup, Bogor",
    year: "2023",
    voltage: "6.3kV",
    scope: "Retrofit & Modernization",
    descId: "Retrofit menyeluruh panel switchgear tegangan menengah di pabrik PT Indocement, menggantikan unit lama yang sudah berumur puluhan tahun tanpa mengganggu jadwal produksi semen.",
    descEn: "Full retrofit of medium voltage switchgear panels at PT Indocement's plant, replacing decades-old units without disrupting the cement production schedule.",
    challengesId: [
      "Panel eksisting berusia lebih dari 25 tahun dengan risiko kegagalan yang terus meningkat.",
      "Area kerja berada di tengah lini produksi aktif dengan ruang gerak sangat terbatas.",
      "Jadwal shutdown pabrik yang ketat untuk meminimalkan kehilangan produksi semen.",
    ],
    challengesEn: [
      "Existing panels over 25 years old with an increasing risk of failure.",
      "Work area located within an active production line with very limited clearance.",
      "Tight plant shutdown schedule to minimize cement production loss.",
    ],
    solutionsId: [
      "Penggantian panel dilakukan bertahap per section untuk menjaga kontinuitas suplai.",
      "Perencanaan sequence kerja terperinci bersama tim K3 dan operasional pabrik.",
      "Pengujian fungsi dan proteksi menyeluruh sebelum energizing setiap panel baru.",
    ],
    solutionsEn: [
      "Panel replacement carried out in stages per section to maintain supply continuity.",
      "Detailed work sequence planning coordinated with plant safety and operations teams.",
      "Full functional and protection testing before energizing each new panel.",
    ],
    image: assetUrl("/projects/project-indocement-after-1.jpeg"),
    gallery: [
      { src: assetUrl("/projects/project-indocement-before-1.jpeg"), label: "Before" },
      { src: assetUrl("/projects/project-indocement-before-2.jpeg"), label: "Before" },
      { src: assetUrl("/projects/project-indocement-after-1.jpeg"), label: "After" },
      { src: assetUrl("/projects/project-indocement-after-2.jpeg"), label: "After" },
      { src: assetUrl("/projects/project-indocement-after-3.jpeg"), label: "After" },
      { src: assetUrl("/projects/project-indocement-after-4.jpeg"), label: "After" },
    ],
  },
  "pertamina-cepu-switchgear-commissioning": {
    title: "Pertamina Cepu Switchgear Testing & Commissioning",
    industry: "Migas",
    industryEn: "Oil & Gas",
    location: "Cepu, Bojonegoro",
    year: "2024",
    voltage: "24kV",
    scope: "Testing & Commissioning",
    descId: "Pengujian dan commissioning panel switchgear 24kV, 630A, 16kA untuk fasilitas produksi migas Pertamina di Blok Cepu, mencakup pengujian proteksi dan partial discharge.",
    descEn: "Testing and commissioning of a 24kV, 630A, 16kA switchgear panel for Pertamina's oil & gas production facility in Blok Cepu, including protection and partial discharge testing.",
    challengesId: [
      "Fasilitas beroperasi di area terpencil dengan akses logistik yang terbatas.",
      "Standar keselamatan migas yang ketat untuk setiap pekerjaan bertegangan.",
      "Diperlukan hasil pengujian yang presisi untuk sertifikasi laik operasi.",
    ],
    challengesEn: [
      "Facility operates in a remote area with limited logistics access.",
      "Strict oil & gas safety standards for all live-voltage work.",
      "Precise test results required for operational readiness certification.",
    ],
    solutionsId: [
      "Mobilisasi unit pengujian portable termasuk partial discharge test set.",
      "Koordinasi ketat dengan tim HSE lapangan mengikuti prosedur permit to work.",
      "Dokumentasi hasil pengujian lengkap sebagai dasar sertifikasi commissioning.",
    ],
    solutionsEn: [
      "Mobilization of portable test equipment, including a partial discharge test set.",
      "Close coordination with the on-site HSE team following permit-to-work procedures.",
      "Complete test result documentation as the basis for commissioning certification.",
    ],
    image: assetUrl("/projects/project-pertamina-cepu-1.jpeg"),
    gallery: [
      { src: assetUrl("/projects/project-pertamina-cepu-1.jpeg"), label: "Testing" },
      { src: assetUrl("/projects/project-pertamina-cepu-2.jpeg"), label: "Testing" },
    ],
  },
  "pusri-sg41-unigear-panel": {
    title: "Pusri SG41 Unigear Panel Installation",
    industry: "Pupuk & Petrokimia",
    industryEn: "Fertilizer & Petrochemical",
    location: "Palembang",
    year: "2024",
    voltage: "13.8kV",
    scope: "Supply & Installation",
    descId: "Pengadaan dan instalasi 7 panel switchgear ABB Unigear 13.8kV, 40kA, 2000A untuk pabrik SG41 milik PT Pupuk Sriwidjaja (Pusri) Palembang.",
    descEn: "Supply and installation of 7 ABB Unigear switchgear panels rated 13.8kV, 40kA, 2000A for the SG41 plant of PT Pupuk Sriwidjaja (Pusri) in Palembang.",
    challengesId: [
      "Kapasitas hubung singkat 40kA menuntut spesifikasi panel dan instalasi kelas tinggi.",
      "Koordinasi pengiriman 7 unit panel besar ke lokasi pabrik pupuk yang padat aktivitas.",
      "Interkoneksi dengan sistem kelistrikan eksisting pabrik SG41 tanpa gangguan produksi.",
    ],
    challengesEn: [
      "A 40kA short-circuit rating demanded high-grade panel specification and installation.",
      "Coordinating delivery of 7 large panel units to a busy fertilizer plant site.",
      "Interconnection with SG41's existing electrical system without disrupting production.",
    ],
    solutionsId: [
      "Kolaborasi dengan ABB untuk memastikan kesesuaian spesifikasi Unigear 13.8kV, 40kA, 2000A.",
      "Perencanaan logistik dan sequence instalasi panel per unit secara rinci.",
      "Pengujian commissioning menyeluruh sebelum panel dinyatakan siap operasi.",
    ],
    solutionsEn: [
      "Collaboration with ABB to ensure Unigear 13.8kV, 40kA, 2000A specification compliance.",
      "Detailed logistics and per-unit panel installation sequence planning.",
      "Comprehensive commissioning tests before the panels were declared ready for operation.",
    ],
    image: assetUrl("/projects/project-pusri-SG41.jpeg"),
  },
};

export default function ProjectDetail() {
  const { t, language } = useLanguage();
  const id = language === "id";
  const params = useParams();
  const project = projectsData[params.slug as keyof typeof projectsData] || projectsData["indocement-switchgear-retrofit"];
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

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-5 max-w-3xl leading-tight">
            {project.title}
          </h1>

          <div className="flex flex-wrap gap-3 text-xs">
            <span className="bg-white/[0.04] border border-white/15 text-white/70 px-3 py-1.5">
              {id ? project.industry : project.industryEn}
            </span>
            <span className="bg-white/[0.04] border border-white/15 text-white/70 px-3 py-1.5 flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5" /> {project.location}
            </span>
            <span className="bg-white/[0.04] border border-white/15 text-white/70 px-3 py-1.5 flex items-center gap-1.5">
              <CalendarDays className="h-3.5 w-3.5" /> {project.year}
            </span>
            <span className="bg-blue-600/30 border border-blue-500/40 text-blue-200 px-3 py-1.5 font-mono font-semibold">
              {project.voltage}
            </span>
          </div>
        </div>
      </section>

      {/* ══════════ CONTENT ══════════ */}
      <section className="py-14 md:py-20 bg-white">
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

              {"gallery" in project && project.gallery && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-3 border-b border-gray-100">
                    {id ? "Galeri Proyek" : "Project Gallery"}
                  </h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {project.gallery.map((g, i) => (
                      <div key={i} className="relative aspect-video rounded-lg overflow-hidden bg-gray-100">
                        <img src={g.src} alt={`${project.title} ${g.label}`} className="w-full h-full object-cover" loading="lazy" />
                        <span className="absolute top-2 left-2 bg-black/60 text-white text-xs font-semibold uppercase tracking-wider px-2 py-1 rounded">
                          {g.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
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

              <a
                href={whatsappQuoteUrl(project.title, language)}
                target="_blank"
                rel="noreferrer"
                className="block w-full text-center bg-blue-600 hover:bg-blue-500 text-white font-semibold py-4 rounded-xl text-sm transition-colors"
              >
                {t.common.requestQuote}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ BOTTOM CTA ══════════ */}
      <section className="bg-[#070D1A] py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            {id ? "Punya Proyek Serupa?" : "Have a Similar Project?"}
          </h2>
          <p className="text-white/50 mb-8 max-w-xl mx-auto">
            {id
              ? "Tim engineer kami siap membantu merencanakan dan mengeksekusi kebutuhan kelistrikan proyek Anda."
              : "Our engineering team is ready to help plan and execute your project's electrical needs."}
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
