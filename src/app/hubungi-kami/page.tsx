import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import ContactClient from "./ContactClient";

export const metadata: Metadata = pageMetadata(
  "Mari Diskusikan Proyek Anda",
  "Hubungi tim ahli kami untuk konsultasi teknis dan penawaran harga.",
);

export default function Page() {
  return <ContactClient />;
}
