import { Link, useLocation } from "wouter";
import { useLanguage } from "@/i18n/LanguageContext";
import { Button } from "@/components/ui/button";
import { Menu, X, Zap, Globe } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export function Navbar() {
  const { language, setLanguage } = useLanguage();
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { href: "/", label: language === "id" ? "Beranda" : "Home" },
    { href: "/tentang-kami", label: language === "id" ? "Portofolio" : "Portfolio" },
    { href: "/produk", label: language === "id" ? "Produk" : "Products" },
    { href: "/hubungi-kami", label: language === "id" ? "Hubungi Kami" : "Contact" },
  ];

  const solidBg = mobileOpen;

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        solidBg
          ? "bg-[#070D1A]/95 backdrop-blur-md shadow-lg"
          : isScrolled
          ? "bg-[#070D1A]/50 backdrop-blur-xl border-b border-white/5"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 h-[70px] flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center">
            <Zap className="h-5 w-5 text-white" fill="white" />
          </div>
          <span className="font-bold text-lg text-white tracking-wide">VOLTAMAX</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors relative pb-0.5",
                location === link.href
                  ? "text-white after:absolute after:-bottom-1 after:left-0 after:w-full after:h-0.5 after:bg-blue-500 after:rounded-full"
                  : "text-white/70 hover:text-white"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right side */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={() => setLanguage(language === "id" ? "en" : "id")}
            className="flex items-center gap-1.5 text-sm font-medium text-white/60 hover:text-white transition-colors px-2.5 py-1.5 rounded border border-white/15 hover:border-white/30"
          >
            <Globe className="h-3.5 w-3.5" />
            <span>{language.toUpperCase()}</span>
          </button>
          <Button
            asChild
            className="bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold px-5 py-2 rounded shadow-md"
          >
            <Link href="/hubungi-kami">
              {language === "id" ? "Hubungi Kami" : "Contact Us"}
            </Link>
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "md:hidden bg-[#070D1A]/95 backdrop-blur-md transition-all duration-300 overflow-hidden",
          mobileOpen ? "max-h-96 border-t border-white/10" : "max-h-0"
        )}
      >
        <nav className="flex flex-col px-6 py-4 gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "text-sm font-medium py-3 border-b border-white/10",
                location === link.href ? "text-blue-400" : "text-white/70"
              )}
            >
              {link.label}
            </Link>
          ))}
          <div className="flex items-center justify-between pt-3">
            <button
              onClick={() => setLanguage(language === "id" ? "en" : "id")}
              className="flex items-center gap-1.5 text-sm text-white/60 hover:text-white"
            >
              <Globe className="h-4 w-4" />
              {language === "id" ? "English" : "Bahasa ID"}
            </button>
            <Button asChild size="sm" className="bg-blue-600 text-white">
              <Link href="/hubungi-kami" onClick={() => setMobileOpen(false)}>
                {language === "id" ? "Hubungi Kami" : "Contact Us"}
              </Link>
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}
