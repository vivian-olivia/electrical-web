import { useLanguage } from "@/i18n/LanguageContext";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";

const WHATSAPP_NUMBER = "6287814050607";

export function FloatingWhatsApp() {
  const { language } = useLanguage();
  const id = language === "id";

  const message = id
    ? "Halo, saya ingin bertanya mengenai layanan kelistrikan Anda."
    : "Hello, I'd like to ask about your electrical services.";

  return (
    <a
      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat via WhatsApp"
      className="fixed z-50 flex h-14 w-14 md:h-16 md:w-16 items-center justify-center rounded-full bg-green-500 text-white shadow-lg shadow-green-500/30 transition-transform hover:scale-105 hover:bg-green-400"
      style={{
        bottom: "calc(env(safe-area-inset-bottom) + 1.5rem)",
        right: "calc(env(safe-area-inset-right) + 1.5rem)",
      }}
    >
      <WhatsAppIcon className="h-9 w-9" />
    </a>
  );
}
