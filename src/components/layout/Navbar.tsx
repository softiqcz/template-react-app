"use client";

import {
  ArrowTopRightOnSquareIcon,
  Bars3Icon,
  LinkIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { SettingsMenu } from "@/components/layout/SettingsMenu";
import { Button } from "@/components/ui/button";
import { useAppContext } from "@/context/AppContext";
import { useLanguage } from "@/context/LanguageContext";

const navItems = [
  { labelKey: "home", href: "/" },
  { labelKey: "components", href: "#components" },
  { labelKey: "docs", href: "#docs" },
] as const;

const externalLinks = [
  {
    href: "https://softiq.cz",
    label: "softIQ",
  },
];

const logoSource = "/images/logos/softiq.svg"; //do not forget to change it in manifest.json

export function Navbar() {
  const { appName } = useAppContext();
  const { t } = useLanguage();
  const navbar = t.navbar;
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  const toggleMenu = () => setIsOpen((current) => !current);
  const closeMenu = () => {
    setIsOpen(false);
  };

  function renderMenuContent(switchId: string, isMobile: boolean) {
    return (
      <>
        <div
          className={
            isMobile
              ? "flex flex-col gap-1"
              : "flex flex-row items-center gap-2"
          }
        >
          {navItems.map((item) => (
            <Button
              key={item.href}
              asChild
              className={
                isMobile ? "navbar-mobile-menu-control gap-2" : "gap-2"
              }
              size="sm"
              variant="ghost"
            >
              <Link href={item.href} onClick={closeMenu}>
                <LinkIcon className={"size-4 shrink-0"} aria-hidden="true" />
                {navbar.navItems[item.labelKey]}
              </Link>
            </Button>
          ))}
        </div>

        <SettingsMenu
          switchId={switchId}
          isMobile={isMobile}
          onAfterAction={closeMenu}
        />

        {externalLinks.map((item) => (
          <Button
            key={item.href}
            asChild
            className={isMobile ? "navbar-mobile-menu-control gap-2" : "gap-2"}
            size="sm"
            variant="default"
          >
            <Link href={item.href} rel="noreferrer" target="_blank">
              <ArrowTopRightOnSquareIcon
                className={"size-4 shrink-0"}
                aria-hidden="true"
              />
              {item.label}
            </Link>
          </Button>
        ))}
      </>
    );
  }

  return (
    <>
      <header
        className={
          isOpen
            ? "fixed inset-0 z-50 flex flex-col overflow-hidden bg-background"
            : "sticky top-0 z-50 bg-background/95 backdrop-blur"
        }
      >
        <div className="border-b border-primary">
          <nav
            className="site-container flex items-center gap-3 py-4"
            aria-label="Main navigation"
          >
            <Link
              className="flex min-w-0 flex-1 items-center gap-3 text-foreground "
              href="/"
              onClick={closeMenu}
            >
              {logoSource ? (
                <Image
                  src={logoSource}
                  alt=""
                  width={90}
                  height={32}
                  className="h-8 w-auto max-w-28 shrink-0 object-contain rounded-md"
                  aria-hidden="true"
                />
              ) : null}
              <span className="min-w-0 whitespace-normal break-words text-base font-semibold leading-tight md:text-lg">
                {appName}
              </span>
            </Link>

            <div className="hidden items-center gap-3 md:flex">
              {renderMenuContent("navbar-theme-switch-desktop", false)}
            </div>

            <Button
              aria-controls="site-navbar-mobile-menu"
              aria-expanded={isOpen}
              aria-label={navbar.toggleMenu}
              className="ml-auto shrink-0 md:hidden"
              size="icon"
              variant="outline"
              type="button"
              onClick={toggleMenu}
            >
              {isOpen ? (
                <XMarkIcon className="size-4" aria-hidden="true" />
              ) : (
                <Bars3Icon className="size-4" aria-hidden="true" />
              )}
            </Button>
          </nav>
        </div>

        {isOpen ? (
          <div
            id="site-navbar-mobile-menu"
            className="site-container flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto py-4 md:hidden"
          >
            {renderMenuContent("navbar-theme-switch-mobile", true)}
          </div>
        ) : null}
      </header>
    </>
  );
}
