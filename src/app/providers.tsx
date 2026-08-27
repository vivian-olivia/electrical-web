"use client";

import type { ReactNode } from "react";
import { LanguageProvider } from "@/i18n/LanguageContext";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <LanguageProvider>
      <TooltipProvider>
        {children}
        <Toaster />
      </TooltipProvider>
    </LanguageProvider>
  );
}
