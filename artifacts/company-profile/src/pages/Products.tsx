import { useLanguage } from "@/i18n/LanguageContext";
import { Link } from "wouter";
import { ArrowRight, Search, SearchX, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { cn, whatsappQuoteUrl } from "@/lib/utils";

/* ─── Verified Unsplash images ─── */
const IMG = {
  headerBg: "https://images.unsplash.com/photo-1560472355-536de3962603?auto=format&fit=crop&w=1920&q=80",
  switchgear: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80",
  transformer: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=800&q=80",
  rmu: "https://images.unsplash.com/photo-1548438294-1ad5d5f4f063?auto=format&fit=crop&w=800&q=80",
  mcc: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
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

/* ─── Inline SVG brand logos ─── */
function BrandLogo({ name }: { name: string }) {
  const logos: Record<string, JSX.Element> = {
    ABB: <span className="font-black text-xl text-[#CC0000]" style={{ fontFamily: "'Arial Black', sans-serif" }}>ABB</span>,
    "Schneider Electric": (
      <div className="flex items-center gap-1.5">
        <div className="w-1.5 h-6 bg-[#3DCD58] rounded-sm" />
        <div className="text-xs font-bold text-[#3DCD58] leading-tight">Schneider<br /><span className="font-normal text-gray-500">Electric</span></div>
      </div>
    ),
    Siemens: <span className="font-bold text-base tracking-wider text-[#009999]">SIEMENS</span>,
    Eaton: <span className="font-bold text-lg text-[#1A3668] lowercase">eaton</span>,
    Tesar: <span className="font-bold text-base text-gray-700">TESAR</span>,
  };
  return logos[name] || <span className="text-sm font-semibold text-gray-600">{name}</span>;
}

export default function Products() {
  const { t, language } = useLanguage();
  const id = language === "id";

  const products = [
    {
      id: "mv-switchgear",
      name: "Medium Voltage Switchgear",
      categoryKey: "mv" as const,
      category: t.product.categories.mv,
      image: IMG.switchgear,
      descId: "Panel distribusi tegangan menengah untuk memutus, mengontrol, dan melindungi sirkuit listrik dan peralatan. Tersedia dalam konfigurasi Air Insulated dan Gas Insulated.",
      descEn: "Medium voltage distribution panels for breaking, controlling, and protecting electrical circuits and equipment. Available in Air Insulated and Gas Insulated configurations.",
      specs: ["12kV / 24kV / 36kV", "Up to 3150A", "Air / Gas Insulated"],
      brands: ["ABB", "Schneider Electric", "Siemens"],
    },
    {
      id: "transformer-dry",
      name: "Dry Type Transformer",
      categoryKey: "transformer" as const,
      category: t.product.categories.transformer,
      image: IMG.transformer,
      descId: "Transformator tipe kering resin cor untuk aplikasi indoor, ideal untuk gedung komersial dan industri yang mengutamakan keselamatan dari risiko kebakaran.",
      descEn: "Cast resin dry-type transformers for indoor applications, ideal for commercial and industrial buildings prioritizing fire safety.",
      specs: ["Up to 36kV", "100kVA – 5000kVA", "Class F / H Insulation"],
      brands: ["ABB", "Schneider Electric", "Tesar"],
    },
    {
      id: "rmu",
      name: "Ring Main Unit (RMU)",
      categoryKey: "mv" as const,
      category: t.product.categories.mv,
      image: IMG.rmu,
      descId: "Unit utama ring tertutup dan terinsulasi gas kompak untuk sistem distribusi sekunder. Compact, reliable, dan mudah dipasang di berbagai kondisi.",
      descEn: "Compact gas-insulated closed ring main unit for secondary distribution systems. Compact, reliable, and easy to install in various conditions.",
      specs: ["12kV / 24kV", "Up to 630A", "SF6 / Air Insulated"],
      brands: ["ABB", "Schneider Electric"],
    },
    {
      id: "lv-mcc",
      name: "Low Voltage MCC Panel",
      categoryKey: "lv" as const,
      category: t.product.categories.lv,
      image: IMG.mcc,
      descId: "Motor Control Center untuk sentralisasi sistem kendali motor-motor listrik industri, meningkatkan efisiensi operasional dan kemudahan pemeliharaan.",
      descEn: "Motor Control Center for centralizing industrial electric motor control systems, improving operational efficiency and ease of maintenance.",
      specs: ["Up to 1000V", "Fixed / Withdrawable", "Form 4b"],
      brands: ["Siemens", "Schneider Electric"],
    },
  ];

  const headerReveal = useReveal();
  const brandsReveal = useReveal();
  const productsReveal = useReveal();

  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const categoryList = useMemo(() => {
    const seen = new Set<string>();
    const list: { key: string; label: string }[] = [{ key: "all", label: t.product.filterAll }];
    products.forEach((p) => {
      if (!seen.has(p.categoryKey)) {
        seen.add(p.categoryKey);
        list.push({ key: p.categoryKey, label: p.category });
      }
    });
    return list;
  }, [language]);

  const filteredProducts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return products.filter((p) => {
      if (activeCategory !== "all" && p.categoryKey !== activeCategory) return false;
      if (!query) return true;
      const haystack = [
        p.name,
        p.descId,
        p.descEn,
        p.category,
        ...p.specs,
        ...p.brands,
      ].join(" ").toLowerCase();
      return haystack.includes(query);
    });
  }, [searchQuery, activeCategory, language]);

  const hasActiveFilters = searchQuery.trim() !== "" || activeCategory !== "all";
  const resetFilters = () => {
    setSearchQuery("");
    setActiveCategory("all");
  };

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
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-5 max-w-3xl leading-tight">
            {t.product.title}
          </h1>
          <p className="text-white/55 text-lg max-w-2xl leading-relaxed">
            {t.product.subtitle}
          </p>
        </div>
      </section>

      {/* ══════════ BRAND INTRO ══════════ */}
      <section className="bg-white py-16 border-b border-gray-100">
        <div
          ref={brandsReveal.ref}
          className={`max-w-7xl mx-auto px-6 md:px-12 reveal ${brandsReveal.visible ? "visible" : ""}`}
        >
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">{t.product.brandsMessage}</h2>
              <p className="text-gray-500 text-sm leading-relaxed">
                {id
                  ? "Kami adalah mitra resmi dan distributor terpercaya untuk merek-merek global terkemuka di bidang kelistrikan industri."
                  : "We are official partners and trusted distributors for leading global brands in industrial electrical engineering."}
              </p>
            </div>
            <div className="lg:w-1/2 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 gap-4">
              {["ABB", "Schneider Electric", "Siemens", "Eaton"].map((b) => (
                <div key={b} className="border border-gray-200 rounded-lg p-5 flex items-center justify-center min-h-[80px] hover:border-blue-300 hover:shadow-sm transition-all">
                  <BrandLogo name={b} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ PRODUCT GRID ══════════ */}
      <section className="py-14 md:py-20 bg-gray-50">
        <div
          ref={productsReveal.ref}
          className={`max-w-7xl mx-auto px-6 md:px-12 reveal ${productsReveal.visible ? "visible" : ""}`}
        >
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">
              {id ? "Produk Unggulan Kami" : "Our Featured Products"}
            </h2>
          </div>

          {/* Search + Filters */}
          <div className="mb-12 space-y-5">
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.product.searchPlaceholder}
                className="w-full pl-11 pr-12 py-3.5 rounded-full border border-gray-200 bg-white text-sm text-gray-900 placeholder-gray-400 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  aria-label={id ? "Hapus pencarian" : "Clear search"}
                  className="absolute right-1 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            <div className="flex flex-wrap justify-center gap-2">
              {categoryList.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => setActiveCategory(cat.key)}
                  className={cn(
                    "px-5 py-2 rounded-full text-sm font-medium transition-all",
                    activeCategory === cat.key
                      ? "bg-blue-600 text-white shadow-md"
                      : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-100"
                  )}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="flex flex-col items-center text-center py-20 px-6 bg-white border border-gray-200 rounded-xl">
              <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 mb-5">
                <SearchX className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{t.product.noResultsTitle}</h3>
              <p className="text-gray-500 text-sm max-w-sm mb-6">{t.product.noResultsText}</p>
              <button
                onClick={resetFilters}
                className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
              >
                {t.product.resetFilters}
              </button>
            </div>
          ) : (
          <div className="grid md:grid-cols-2 gap-8">
            {filteredProducts.map((product, i) => (
              <div
                key={product.id}
                style={{ transitionDelay: `${i * 80}ms` }}
                className={`group bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl hover:border-blue-200 transition-all duration-300 flex flex-col reveal ${productsReveal.visible ? "visible" : ""}`}
              >
                {/* Image */}
                <div className="aspect-[16/9] bg-gray-100 relative overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <span className="bg-blue-600/90 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                      {product.category}
                    </span>
                  </div>
                </div>

                <div className="p-8 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-3">
                    {id ? product.descId : product.descEn}
                  </p>

                  <div className="mt-auto grid grid-cols-2 gap-6 mb-6 border-t border-gray-100 pt-5">
                    <div>
                      <h4 className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-2">
                        {t.product.highlightsTitle}
                      </h4>
                      <ul className="space-y-1">
                        {product.specs.map((spec, j) => (
                          <li key={j} className="text-xs text-gray-600 flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                            {spec}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-2">
                        {t.product.availableBrandsTitle}
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {product.brands.map((b) => (
                          <span key={b} className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full">{b}</span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <a
                    href={whatsappQuoteUrl(product.name, language)}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full flex items-center justify-center gap-2 border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-semibold py-3 rounded text-sm transition-all"
                  >
                    {t.common.requestQuote}
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
          )}
        </div>
      </section>

      {/* ══════════ BOTTOM CTA ══════════ */}
      <section className="bg-[#070D1A] py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            {id ? "Butuh Spesifikasi Khusus?" : "Need Custom Specifications?"}
          </h2>
          <p className="text-white/50 mb-8 max-w-xl mx-auto">
            {id
              ? "Tim engineer kami siap membantu sizing, kalkulasi, dan seleksi produk yang tepat untuk proyek Anda."
              : "Our engineering team is ready to help with sizing, calculations, and proper product selection for your project."}
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
