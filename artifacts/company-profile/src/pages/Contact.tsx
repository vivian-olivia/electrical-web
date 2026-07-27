import { useLanguage } from "@/i18n/LanguageContext";
import { MapPin, Phone, Mail, Clock, Send, Zap, MessageSquare } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useToast } from "@/hooks/use-toast";

const BG = "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1920&q=80";

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

export default function Contact() {
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const id = language === "id";
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formReveal = useReveal();
  const infoReveal = useReveal();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: id ? "Pesan Terkirim!" : "Message Sent!",
        description: id
          ? "Tim kami akan segera menghubungi Anda dalam 1×24 jam."
          : "Our team will contact you within 1×24 hours.",
      });
      (e.target as HTMLFormElement).reset();
    }, 1500);
  };

  const inputCls = "w-full px-4 py-3 rounded-lg border border-gray-200 bg-white focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 outline-none transition-all text-gray-900 placeholder-gray-400 text-sm";

  return (
    <div className="flex flex-col w-full">

      {/* ══════════ DARK HERO HEADER ══════════ */}
      <section className="relative bg-[#070D1A] pt-36 pb-24 overflow-hidden">
        <div className="absolute inset-0">
          <img src={BG} alt="" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#070D1A]/95 via-[#070D1A]/80 to-[#070D1A]/50" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#070D1A]/50 via-transparent to-[#070D1A]" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
          <div className="inline-flex items-center gap-2 bg-blue-500/15 border border-blue-500/30 text-blue-300 text-xs font-bold tracking-widest uppercase px-4 py-2 rounded-full mb-6">
            <Zap className="h-3.5 w-3.5" fill="currentColor" />
            {id ? "Hubungi Kami" : "Contact Us"}
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-5 max-w-3xl leading-tight">
            {t.contact.heroTitle}
          </h1>
          <p className="text-white/55 text-lg max-w-2xl leading-relaxed">
            {t.contact.heroSubtitle}
          </p>
        </div>
      </section>

      {/* ══════════ MAIN CONTACT SECTION ══════════ */}
      <section className="py-20 md:py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid lg:grid-cols-5 gap-12">

            {/* ─── Contact Form ─── */}
            <div
              ref={formReveal.ref}
              className={`lg:col-span-3 reveal ${formReveal.visible ? "visible" : ""}`}
            >
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 md:p-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{t.contact.formTitle}</h2>
                <p className="text-gray-400 text-sm mb-8">
                  {id ? "Isi formulir di bawah dan tim kami akan merespons dalam 1×24 jam." : "Fill in the form below and our team will respond within 1×24 hours."}
                </p>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">{t.contact.name}</label>
                      <input required type="text" placeholder={id ? "Budi Santoso" : "John Smith"} className={inputCls} />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">{t.contact.company}</label>
                      <input required type="text" placeholder={id ? "PT. Industri Maju" : "PT. Industrial Corp"} className={inputCls} />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">{t.contact.email}</label>
                      <input required type="email" placeholder="email@company.co.id" className={inputCls} />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">{t.contact.phone}</label>
                      <input required type="tel" placeholder="+62 812 xxxx xxxx" className={inputCls} />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">{t.contact.inquiryType}</label>
                    <select required className={inputCls}>
                      <option value="">-- {id ? "Pilih jenis kebutuhan" : "Select inquiry type"} --</option>
                      <option value="epc">{t.contact.inquiryOptions.epc}</option>
                      <option value="procurement">{t.contact.inquiryOptions.procurement}</option>
                      <option value="maintenance">{t.contact.inquiryOptions.maintenance}</option>
                      <option value="consulting">{t.contact.inquiryOptions.consulting}</option>
                      <option value="other">{t.contact.inquiryOptions.other}</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">{t.contact.message}</label>
                    <textarea
                      required
                      rows={5}
                      placeholder={id ? "Ceritakan kebutuhan proyek kelistrikan Anda..." : "Describe your electrical project needs..."}
                      className={inputCls + " resize-none"}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-60 text-white font-semibold py-4 rounded-lg text-sm transition-colors flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>{id ? "Mengirim..." : "Sending..."}</>
                    ) : (
                      <>{t.contact.sendButton} <Send className="w-4 h-4" /></>
                    )}
                  </button>
                </form>
              </div>
            </div>

            {/* ─── Contact Info Sidebar ─── */}
            <div
              ref={infoReveal.ref}
              className={`lg:col-span-2 space-y-6 reveal ${infoReveal.visible ? "visible" : ""}`}
            >
              {/* WhatsApp card */}
              <div className="bg-[#070D1A] rounded-2xl p-8 text-center">
                <div className="w-14 h-14 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center text-green-400 mx-auto mb-4">
                  <MessageSquare className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Fast Response</h3>
                <p className="text-white/50 text-sm mb-6">
                  {id ? "Butuh bantuan segera? Chat langsung via WhatsApp." : "Need urgent help? Chat directly via WhatsApp."}
                </p>
                <a
                  href="https://wa.me/6282124921474"
                  target="_blank"
                  rel="noreferrer"
                  className="block w-full bg-green-500 hover:bg-green-400 text-white font-bold py-3.5 rounded-lg text-sm transition-colors"
                >
                  {t.contact.whatsappCta}
                </a>
              </div>

              {/* Contact details */}
              <div className="bg-white rounded-2xl border border-gray-200 p-8">
                <h3 className="text-lg font-bold text-gray-900 mb-6">{t.contact.officeTitle}</h3>
                <ul className="space-y-5">
                  {[
                    {
                      icon: <MapPin className="h-4 w-4 text-blue-600" />,
                      content: (
                        <p className="text-gray-500 text-sm leading-relaxed">
                          Kawasan Industri MM2100<br />
                          Jl. Jawa Blok H No. 1<br />
                          Cikarang Barat, Bekasi 17530
                        </p>
                      ),
                    },
                    {
                      icon: <Phone className="h-4 w-4 text-blue-600" />,
                      content: <p className="text-gray-500 text-sm">+62 21 898 1234</p>,
                    },
                    {
                      icon: <Mail className="h-4 w-4 text-blue-600" />,
                      content: <p className="text-gray-500 text-sm">inquiry@voltamax.co.id</p>,
                    },
                    {
                      icon: <Clock className="h-4 w-4 text-blue-600" />,
                      content: <p className="text-gray-500 text-sm">{t.contact.hours}</p>,
                    },
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-4">
                      <div className="w-9 h-9 bg-blue-50 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                        {item.icon}
                      </div>
                      {item.content}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Map */}
              <div className="aspect-[4/3] bg-gray-100 rounded-2xl overflow-hidden border border-gray-200">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126906.91428584878!2d106.99479361667232!3d-6.284242699321526!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e699026da68a353%3A0x8673a5af15ff07!2sMM2100%20Industrial%20Town!5e0!3m2!1sen!2sid!4v1700000000000!5m2!1sen!2sid"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Office Location Map"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
