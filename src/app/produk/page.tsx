import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import ProductsClient from "./ProductsClient";

export const metadata: Metadata = pageMetadata(
  "Produk Kami",
  "Infrastruktur kelas dunia membutuhkan peralatan kelas dunia.",
);

export default function Page() {
  return <ProductsClient />;
}
