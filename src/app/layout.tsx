import "./globals.css";
import "swiper/css";
import "swiper/css/pagination";
import { CookieBanner } from "@/components/layout/cookie/CookieBanner";
import { Footer } from "@/components/layout/base/Footer";
import { InitialLoadingGate } from "@/components/sections/InitialLoadingGate";
import { Navbar } from "@/components/layout/base/Navbar";
import { SettingsMenuOffcanvas } from "@/components/layout/settings/SettingsMenuOffcanvas";
import { AppProviders } from "@/providers/AppProviders";

export const metadata = {
  title: "Next.js Tailwind Template",
  description: "A clean Next.js and Tailwind CSS starter template.",
  manifest: "/manifest.json",
};

export const viewport = {
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="cs">
      <body>
        <AppProviders>
          <InitialLoadingGate>
            <div className="flex min-h-screen flex-col">
              <Navbar />
              <div className="flex-1">{children}</div>
              <Footer />
              <CookieBanner />
              <SettingsMenuOffcanvas />
            </div>
          </InitialLoadingGate>
        </AppProviders>
      </body>
    </html>
  );
}
