"use client";

import { FileQuestion } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import Link from "next/link";

export default function NotFound() {
  const { t } = useLanguage();
  return (
    <div className="min-h-[70vh] w-full flex items-center justify-center bg-background">
      <div className="text-center">
        <FileQuestion className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
        <h1 className="text-2xl font-display font-bold text-foreground">
          404 - Halaman Tidak Ditemukan
        </h1>
        <p className="mt-2 text-muted-foreground">
          Maaf, halaman yang Anda cari tidak tersedia.
        </p>
        <div className="mt-6">
          <Link href="/" className="text-primary hover:underline font-medium">
            Kembali ke Beranda
          </Link>
        </div>
      </div>
    </div>
  );
}
