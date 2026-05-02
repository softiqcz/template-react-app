"use client";

import Link from "next/link";

import { SettingsMenu } from "@/components/layout/settings/SettingsMenu";
import { SoftiqLogoLink } from "@/components/layout/base/SoftiqLogoLink";
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
    <footer className="group/footer border-t bg-background">
      <div className="px-6 py-10 text-sm text-muted-foreground lg:px-10">
        <div className="grid gap-10 md:grid-cols-4 md:items-start">
          <div aria-hidden="true" className="hidden md:block" />

          <section className="space-y-3">
            <p className="text-xs font-medium uppercase tracking-wide text-primary">
              Kontakt & info
            </p>
            <dl className="grid gap-2.5">
              <div className="border-l pl-3 border-primary">
                {contactDetails.map((detail) => (
                  <div key={detail.label}>
                    <dt className="text-xs font-medium uppercase tracking-wide text-foreground/70">
                      {detail.label}
                    </dt>
                    <dd className="text-sm leading-6 text-foreground">
                      {detail.value}
                    </dd>
                  </div>
                ))}
              </div>
            </dl>
          </section>

          <section className="flex flex-col gap-5 md:items-end md:text-right">
            <p className="text-xs font-medium uppercase tracking-wide text-primary">
              Dokumenty
            </p>
            <nav aria-label="Footer navigation" className="flex flex-col gap-3">
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
          </section>

          <section className="flex flex-col items-start gap-4 md:items-end md:text-right">
            <SettingsMenu switchId="footer-theme-switch" menuPosition="top" />
            <SoftiqLogoLink
              beVersion={beVersion}
              currentYear={currentYear}
              feVersion={FE_VERSION}
            />
          </section>
        </div>
      </div>
    </footer>
  );
}
