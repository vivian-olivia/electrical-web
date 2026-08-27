import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import AboutClient from "./AboutClient";

export const metadata: Metadata = pageMetadata(
  "Tentang Kami",
  "Membangun fondasi energi yang andal untuk menggerakkan industri Indonesia.",
);

export default function Page() {
  return <AboutClient />;
}
