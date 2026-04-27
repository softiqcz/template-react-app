"use client";

import Link from "next/link";

import { SettingsMenu } from "@/components/layout/SettingsMenu";
import { useAppContext } from "@/context/AppContext";

const footerLinks = [
  { href: "/obchodni-podminky", label: "Obchodní podmínky", external: false },
  {
    href: "/zpracovani-osobnich-udaju",
    label: "Zpracování osobních údajů",
    external: false,
  },
] as const;

const contactDetails = [
  { label: "Email", value: "info@softiq.cz" },
  { label: "Podnikající subjekt", value: "Ing. Martin Švejda" },
  { label: "IČ", value: "21086231" },
  { label: "Sídlo", value: "Janského 559/13, 779 00, Olomouc – Povel" },
] as const;

export function Footer() {
  const { beVersion, currentYear } = useAppContext();
  const FE_VERSION = "v0.0.1";

  return (
    <footer className="relative border-t bg-background">
      <div className="site-container py-10 text-sm text-muted-foreground">
        <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_minmax(16rem,auto)] md:items-start">
          <section className="max-w-2xl space-y-3">
            <p className="text-xs font-medium uppercase tracking-wide text-primary">
              Kontakt & info
            </p>
            <dl className="grid gap-2.5">
              {contactDetails.map((detail) => (
                <div key={detail.label} className="space-y-0.5 border-l pl-3">
                  <dt className="text-xs font-medium uppercase tracking-wide text-foreground/70">
                    {detail.label}
                  </dt>
                  <dd className="text-sm leading-6 text-foreground">
                    {detail.value}
                  </dd>
                </div>
              ))}
            </dl>
          </section>

          <section className="flex flex-col gap-5 md:items-end md:pt-9">
            <p className="text-xs font-medium uppercase tracking-wide text-primary">
              Dokumenty
            </p>
            <nav
              aria-label="Footer navigation"
              className="flex flex-col gap-3 md:items-end"
            >
              {footerLinks.map((link) => (
                <Link
                  key={link.href}
                  className="font-medium text-foreground underline-offset-4 transition-all hover:text-primary hover:underline"
                  href={link.href}
                  rel={link.external ? "noreferrer" : undefined}
                  target={link.external ? "_blank" : undefined}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="space-y-1 border-t pt-4 text-xs font-medium md:text-right">
              <p>
                © {currentYear}{" "}
                <Link
                  className="text-foreground underline-offset-4 transition-all hover:text-primary hover:underline"
                  href="https://softiq.cz"
                  rel="noreferrer"
                  target="_blank"
                >
                  softIQ
                </Link>
              </p>
              <p>
                BE {beVersion} | FE {FE_VERSION}
              </p>
            </div>
          </section>
        </div>
      </div>
      <div className="absolute top-3 right-3">
        <SettingsMenu switchId="footer-theme-switch" menuPosition="top" />
      </div>
    </footer>
  );
}
