"use client";

import type { ReactNode } from "react";

import { AppProvider } from "@/context/AppContext";
import { LanguageProvider } from "@/context/LanguageContext";
import { SessionProvider } from "@/context/SessionContext";
import { Toaster } from "sonner";

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <LanguageProvider>
      <AppProvider>
        <SessionProvider>{children}</SessionProvider>
        <Toaster position="top-center" />
      </AppProvider>
    </LanguageProvider>
  );
}
