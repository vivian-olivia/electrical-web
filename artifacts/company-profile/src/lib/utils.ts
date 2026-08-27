import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Prefixes a public-folder asset path with the app's base URL so it resolves correctly when deployed under a subpath. */
export function assetUrl(path: string) {
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`
}

const WHATSAPP_NUMBER = "6287814050607"

/** Builds a wa.me link pre-filled with a message asking about a specific product/project. */
export function whatsappQuoteUrl(itemName: string, language: "id" | "en") {
  const message =
    language === "id"
      ? `Halo, saya tertarik dengan "${itemName}". Bisa tolong berikan penawaran harga?`
      : `Hello, I'm interested in "${itemName}". Could you please provide a price quote?`
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}
