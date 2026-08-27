import type { Metadata } from "next";

export const SITE_NAME = "Voltamax";

export function pageMetadata(title: string, description: string): Metadata {
  const fullTitle = `${title} | ${SITE_NAME}`;
  return {
    title: fullTitle,
    description,
    openGraph: { title: fullTitle, description, type: "website" },
    twitter: { card: "summary_large_image", title: fullTitle, description },
  };
}
