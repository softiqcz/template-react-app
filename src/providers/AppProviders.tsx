"use client";
import type { ReactNode } from "react";
import { SessionProvider } from "@/context/SessionContext";
import { Toaster } from "@/components/ui/sonner";

export function AppProviders({ children }: { children: ReactNode }) {
  return <SessionProvider>{children}<Toaster closeButton position="top-center" /></SessionProvider>;
}
