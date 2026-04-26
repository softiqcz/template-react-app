import "./globals.css";
import { CookieBanner } from "@/components/layout/CookieBanner";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { AppProviders } from "@/providers/AppProviders";

export const metadata = {
  title: "Next.js Tailwind Template",
  description: "A clean Next.js and Tailwind CSS starter template.",
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
    <html lang="en">
      <body>
        <AppProviders>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <div className="flex-1">{children}</div>
            <Footer />
            <CookieBanner />
          </div>
        </AppProviders>
      </body>
    </html>
  );
}
