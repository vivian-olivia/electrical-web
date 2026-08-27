"use client";

import { useLanguage } from "@/i18n/LanguageContext";
import Image from "next/image";
import { MapPin, Phone, Mail, Clock, Send, ChevronDown, Check } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import * as SelectPrimitive from "@radix-ui/react-select";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";

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

function InquirySelect({
  value,
  onChange,
  options,
  placeholder,
  name,
}: {
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
  placeholder: string;
  name: string;
}) {
  return (
    <SelectPrimitive.Root value={value} onValueChange={onChange} name={name} required>
      <SelectPrimitive.Trigger
        className="group flex w-full items-center justify-between rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition-all data-[placeholder]:text-gray-400 hover:border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 data-[state=open]:border-blue-500 data-[state=open]:ring-2 data-[state=open]:ring-blue-500/30"
      >
        <SelectPrimitive.Value placeholder={placeholder} />
        <SelectPrimitive.Icon asChild>
          <ChevronDown className="h-4 w-4 text-gray-400 transition-transform duration-200 group-data-[state=open]:rotate-180 group-data-[state=open]:text-blue-600" />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>

      <SelectPrimitive.Portal>
        <SelectPrimitive.Content
          position="popper"
          sideOffset={8}
          className="z-50 w-[var(--radix-select-trigger-width)] overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl shadow-black/10 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"
        >
          <SelectPrimitive.Viewport className="p-1.5">
            {options.map((opt) => (
              <SelectPrimitive.Item
                key={opt.value}
                value={opt.value}
                className="relative flex cursor-pointer select-none items-center justify-between rounded-lg py-2.5 pl-3.5 pr-3 text-sm text-gray-700 outline-none transition-colors data-[highlighted]:bg-blue-50 data-[highlighted]:text-blue-700 data-[state=checked]:font-semibold data-[state=checked]:text-blue-600"
              >
                <SelectPrimitive.ItemText>{opt.label}</SelectPrimitive.ItemText>
                <SelectPrimitive.ItemIndicator>
                  <Check className="h-4 w-4 text-blue-600" />
                </SelectPrimitive.ItemIndicator>
              </SelectPrimitive.Item>
            ))}
          </SelectPrimitive.Viewport>
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  );
}

export default function ContactClient() {
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const id = language === "id";
  const [inquiryType, setInquiryType] = useState("");

  const formReveal = useReveal();
  const infoReveal = useReveal();

  const inquiryOptions = [
    { value: "epc", label: t.contact.inquiryOptions.epc },
    { value: "procurement", label: t.contact.inquiryOptions.procurement },
    { value: "maintenance", label: t.contact.inquiryOptions.maintenance },
    { value: "consulting", label: t.contact.inquiryOptions.consulting },
    { value: "other", label: t.contact.inquiryOptions.other },
  ];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = data.get("name") as string;
    const company = data.get("company") as string;
    const email = data.get("email") as string;
    const phone = data.get("phone") as string;
    const projectMessage = data.get("message") as string;
    const inquiryLabel = inquiryOptions.find((o) => o.value === inquiryType)?.label ?? "";

    const waMessage = id
      ? `Halo, saya ${name} dari ${company}.\n\nEmail: ${email}\nTelepon: ${phone}\nJenis Kebutuhan: ${inquiryLabel}\n\nPesan:\n${projectMessage}`
      : `Hello, I'm ${name} from ${company}.\n\nEmail: ${email}\nPhone: ${phone}\nInquiry Type: ${inquiryLabel}\n\nMessage:\n${projectMessage}`;

    window.open(`https://wa.me/6287814050607?text=${encodeURIComponent(waMessage)}`, "_blank", "noopener,noreferrer");

    toast({
      title: id ? "Membuka WhatsApp..." : "Opening WhatsApp...",
      description: id
        ? "Lanjutkan kirim pesan Anda di WhatsApp."
        : "Continue sending your message on WhatsApp.",
    });

    form.reset();
    setInquiryType("");
  };

  const inputCls = "w-full px-4 py-3 rounded-lg border border-gray-200 bg-white focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 outline-none transition-all text-gray-900 placeholder-gray-400 text-sm";

  return (
    <div className="flex flex-col w-full">

      {/* ══════════ DARK HERO HEADER ══════════ */}
      <section className="relative bg-[#070D1A] pt-36 pb-24 overflow-hidden">
        <div className="absolute inset-0">
          <Image src={BG} alt="" fill className="object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#070D1A]/95 via-[#070D1A]/80 to-[#070D1A]/50" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#070D1A]/50 via-transparent to-[#070D1A]" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-5 max-w-3xl leading-tight">
            {t.contact.heroTitle}
          </h1>
          <p className="text-white/55 text-lg max-w-2xl leading-relaxed">
            {t.contact.heroSubtitle}
          </p>
        </div>
      </section>

      {/* ══════════ MAIN CONTACT SECTION ══════════ */}
      <section className="py-14 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid lg:grid-cols-5 gap-12">

            {/* ─── Contact Info Sidebar ─── */}
            <div
              ref={infoReveal.ref}
              className={`lg:col-span-2 flex flex-col gap-6 lg:h-full reveal ${infoReveal.visible ? "visible" : ""}`}
            >
              {/* Contact details */}
              <div className="bg-white rounded-2xl border border-gray-200 p-8">
                <h3 className="text-lg font-bold text-gray-900 mb-6">{t.contact.officeTitle}</h3>
                <ul className="space-y-5">
                  {[
                    {
                      icon: <MapPin className="h-4 w-4 text-blue-600" />,
                      align: "items-start" as const,
                      content: (
                        <a
                          href="https://www.google.com/maps/search/?api=1&query=Kawasan+Industri+MM2100+Jl.+Jawa+Blok+H+No.+1+Cikarang+Barat+Bekasi+17530"
                          target="_blank"
                          rel="noreferrer"
                          className="text-gray-500 text-sm leading-relaxed hover:text-blue-600 transition-colors"
                        >
                          Kawasan Industri MM2100<br />
                          Jl. Jawa Blok H No. 1<br />
                          Cikarang Barat, Bekasi 17530
                        </a>
                      ),
                    },
                    {
                      icon: <Phone className="h-4 w-4 text-blue-600" />,
                      align: "items-center" as const,
                      content: (
                        <a href="tel:+622218981234" className="text-gray-500 text-sm hover:text-blue-600 transition-colors">
                          +62 21 898 1234
                        </a>
                      ),
                    },
                    {
                      icon: <WhatsAppIcon className="h-4 w-4 text-blue-600" />,
                      align: "items-center" as const,
                      content: (
                        <a
                          href="https://wa.me/6287814050607"
                          target="_blank"
                          rel="noreferrer"
                          className="text-gray-500 text-sm hover:text-blue-600 transition-colors"
                        >
                          +62 878 1405 0607 <span className="text-gray-400">({t.contact.whatsappCta})</span>
                        </a>
                      ),
                    },
                    {
                      icon: <Mail className="h-4 w-4 text-blue-600" />,
                      align: "items-center" as const,
                      content: (
                        <a href="mailto:info@voltamax.co.id" className="text-gray-500 text-sm hover:text-blue-600 transition-colors">
                          info@voltamax.co.id
                        </a>
                      ),
                    },
                    {
                      icon: <Clock className="h-4 w-4 text-blue-600" />,
                      align: "items-center" as const,
                      content: <p className="text-gray-500 text-sm">{t.contact.hours}</p>,
                    },
                  ].map((item, i) => (
                    <li key={i} className={`flex ${item.align} gap-4`}>
                      <div
                        className={`w-9 h-9 bg-blue-50 rounded-full flex items-center justify-center shrink-0 ${
                          item.align === "items-start" ? "mt-0.5" : ""
                        }`}
                      >
                        {item.icon}
                      </div>
                      {item.content}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Map */}
              <div className="aspect-[4/3] lg:aspect-auto lg:flex-1 lg:min-h-[220px] bg-gray-100 rounded-2xl overflow-hidden border border-gray-200">
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

            {/* ─── Contact Form ─── */}
            <div
              ref={formReveal.ref}
              className={`lg:col-span-3 reveal ${formReveal.visible ? "visible" : ""}`}
            >
              <div className="bg-white rounded-2xl border border-gray-200 hover:shadow-xl transition-shadow duration-300 p-8 md:p-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{t.contact.formTitle}</h2>
                <p className="text-gray-400 text-sm mb-8">
                  {id ? "Isi formulir di bawah, pesan Anda akan dikirim langsung via WhatsApp." : "Fill in the form below and your message will be sent directly via WhatsApp."}
                </p>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">{t.contact.name}</label>
                      <input required name="name" type="text" placeholder={id ? "Budi Santoso" : "John Smith"} className={inputCls} />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">{t.contact.company}</label>
                      <input required name="company" type="text" placeholder={id ? "PT. Industri Maju" : "PT. Industrial Corp"} className={inputCls} />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">{t.contact.email}</label>
                      <input required name="email" type="email" placeholder="email@company.co.id" className={inputCls} />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">{t.contact.phone}</label>
                      <input required name="phone" type="tel" placeholder="+62 812 xxxx xxxx" className={inputCls} />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">{t.contact.inquiryType}</label>
                    <InquirySelect
                      name="inquiryType"
                      value={inquiryType}
                      onChange={setInquiryType}
                      options={inquiryOptions}
                      placeholder={id ? "Pilih jenis kebutuhan" : "Select inquiry type"}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">{t.contact.message}</label>
                    <textarea
                      required
                      name="message"
                      rows={5}
                      placeholder={id ? "Ceritakan kebutuhan proyek kelistrikan Anda..." : "Describe your electrical project needs..."}
                      className={inputCls + " resize-none"}
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-4 rounded-lg text-sm transition-colors flex items-center justify-center gap-2"
                  >
                    {t.contact.sendButton} <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
