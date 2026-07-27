import { Link } from "wouter";
import { useLanguage } from "@/i18n/LanguageContext";
import { Zap, Phone, Mail, MapPin } from "lucide-react";

export function Footer() {
  const { language } = useLanguage();
  const id = language === "id";

  return (
    <footer className="bg-[#040A14] text-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">

          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-5">
              <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                <Zap className="h-5 w-5 text-white" fill="white" />
              </div>
              <span className="font-bold text-lg text-white tracking-wide">VOLTAMAX</span>
            </Link>
            <p className="text-white/45 text-sm leading-relaxed mb-6">
              {id
                ? "Penyedia solusi kelistrikan tegangan menengah yang andal dan berkualitas untuk berbagai sektor industri."
                : "Reliable and quality medium voltage electrical solutions provider for various industrial sectors."}
            </p>
            {/* Social icons (decorative) */}
            <div className="flex gap-3">
              {["in", "ig", "fb"].map((s) => (
                <div key={s} className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/40 text-xs hover:border-blue-500 hover:text-blue-400 cursor-pointer transition-colors">
                  {s === "in" ? "in" : s === "ig" ? "◎" : "f"}
                </div>
              ))}
            </div>
          </div>

          {/* Navigasi */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-5 tracking-wide">
              {id ? "Navigasi" : "Navigation"}
            </h3>
            <ul className="space-y-3">
              {[
                { href: "/", label: id ? "Beranda" : "Home" },
                { href: "/tentang-kami", label: id ? "Portofolio" : "Portfolio" },
                { href: "/produk", label: id ? "Produk" : "Products" },
                { href: "/hubungi-kami", label: id ? "Hubungi Kami" : "Contact" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-white/45 hover:text-white text-sm transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Layanan Kami */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-5 tracking-wide">
              {id ? "Layanan Kami" : "Our Services"}
            </h3>
            <ul className="space-y-3">
              {["Engineering", "EPC", "Testing & Commissioning", "Maintenance"].map((s) => (
                <li key={s}>
                  <Link href="/tentang-kami" className="text-white/45 hover:text-white text-sm transition-colors">
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Kontak Kami */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-5 tracking-wide">
              {id ? "Kontak Kami" : "Contact Us"}
            </h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-white/45 text-sm">
                <Phone className="h-4 w-4 text-blue-500 shrink-0" />
                <span>+62 21 898 1234</span>
              </li>
              <li className="flex items-center gap-3 text-white/45 text-sm">
                <Mail className="h-4 w-4 text-blue-500 shrink-0" />
                <span>info@voltamax.co.id</span>
              </li>
              <li className="flex items-start gap-3 text-white/45 text-sm">
                <MapPin className="h-4 w-4 text-blue-500 shrink-0 mt-0.5" />
                <span>Jl. Industri Raya No. 10, Bekasi, Jawa Barat</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider + copyright */}
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-white/30 text-xs">
            © {new Date().getFullYear()} Voltamax. {id ? "Hak Cipta Dilindungi." : "All rights reserved."}
          </p>
          <div className="flex gap-4 text-white/30 text-xs">
            <span className="hover:text-white/60 cursor-pointer transition-colors">Privacy</span>
            <span>·</span>
            <span className="hover:text-white/60 cursor-pointer transition-colors">{id ? "Ketentuan" : "Terms"}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
