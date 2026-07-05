import "./globals.css";
import type { Metadata } from "next";
import { AppProviders } from "@/providers/AppProviders";

export const metadata: Metadata = {
  title: "Makon IS",
  description: "Zabezpečený přehled dat Makon.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="cs">
      <body>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[9999] focus:rounded-lg focus:bg-background focus:p-3 focus:text-foreground"
        >
          Přejít na hlavní obsah
        </a>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
