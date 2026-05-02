"use client";

import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { MenuContent } from "@/components/layout/base/NavbarMenuContent";
import { Button } from "@/components/ui/button";
import { LOGO_SOURCE } from "@/constants/navigation";
import { useAppContext } from "@/context/AppContext";
import { useLanguage } from "@/context/LanguageContext";

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
              {LOGO_SOURCE ? (
                <Image
                  src={LOGO_SOURCE}
                  alt=""
                  width={90}
                  height={32}
                  className="h-8 w-auto max-w-28 shrink-0 object-contain rounded-md"
                  aria-hidden="true"
                />
              ) : null}
              <span className="min-w-0 whitespace-normal break-words text-base font-medium leading-tight md:text-lg">
                {appName}
              </span>
            </Link>

            <div className="hidden items-center gap-3 md:flex">
              <MenuContent
                switchId="navbar-theme-switch-desktop"
                isMobile={false}
                navbar={navbar}
                onClose={closeMenu}
              />
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
            <MenuContent
              switchId="navbar-theme-switch-mobile"
              isMobile
              navbar={navbar}
              onClose={closeMenu}
            />
          </div>
        ) : null}
      </header>
    </>
  );
}
