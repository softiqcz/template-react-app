"use client";

import type { ReactNode } from "react";

import { AppProvider } from "@/context/AppContext";
import { SessionProvider } from "@/context/SessionContext";

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <AppProvider>
      <SessionProvider>{children}</SessionProvider>
    </AppProvider>
  );
}
