import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import HomeClient from "./HomeClient";

export const metadata: Metadata = pageMetadata(
  "Solusi Kelistrikan Tegangan Menengah yang Andal untuk Industri",
  "Menyediakan layanan Engineering, Procurement, Construction (EPC), Testing & Commissioning, dan Maintenance untuk berbagai kebutuhan infrastruktur kelistrikan industri.",
);

export default function Page() {
  return <HomeClient />;
}
