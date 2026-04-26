"use client";

import {
  Bars3Icon,
  BugAntIcon,
  ChevronDownIcon,
  Cog6ToothIcon,
  MoonIcon,
  SlashIcon,
  SunIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useAppContext } from "@/context/AppContext";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Components", href: "#components" },
  { label: "Docs", href: "#docs" },
];

export function Navbar() {
  const { appName, isDark, openCookiePreferences, toggleTheme } =
    useAppContext();
  const [isOpen, setIsOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

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
    setIsSettingsOpen(false);
  };

  function handleCookiePreferenceEdit() {
    openCookiePreferences();
    closeMenu();
  }

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
            <Link
              key={item.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              href={item.href}
              onClick={closeMenu}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <Button asChild className={isMobile ? "w-full" : undefined} size="sm">
          <a href="https://softiq.cz" rel="noreferrer" target="_blank">
            softIQ
          </a>
        </Button>

        <div className="relative">
          <Button
            aria-expanded={isSettingsOpen}
            className={isMobile ? "w-full gap-2" : "gap-2"}
            size="sm"
            type="button"
            variant="ghost"
            onClick={() => setIsSettingsOpen((current) => !current)}
          >
            <Cog6ToothIcon className="h-4 w-4" aria-hidden="true" />
            Nastavení
            <ChevronDownIcon
              className={`h-4 w-4 transition-transform ${
                isSettingsOpen ? "rotate-180" : ""
              }`}
              aria-hidden="true"
            />
          </Button>

          {isSettingsOpen ? (
            <div className="ui-card mt-2 w-full md:absolute md:right-0 md:w-72">
              <div className="ui-card-content flex flex-col gap-2 pt-6">
                <label
                  className="ui-button ui-button-ghost grid w-full cursor-pointer grid-cols-[1rem_1fr_auto] items-center gap-3 px-3 py-2 text-left"
                  htmlFor={switchId}
                >
                  <span
                    aria-hidden="true"
                    className="relative h-4 w-4 text-muted-foreground"
                  >
                    <SunIcon className="absolute left-0 top-0 h-3 w-3" />
                    <MoonIcon className="absolute bottom-0 right-0 h-3 w-3" />
                    <SlashIcon className="absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2" />
                  </span>
                  <span className="text-sm font-medium text-foreground">
                    {isDark ? "Tmavý" : "Světlý"} režim
                  </span>
                  <span className="relative flex items-center">
                    <Switch
                      id={switchId}
                      aria-label="Přepnout tmavý režim"
                      checked={isDark}
                      onCheckedChange={toggleTheme}
                    />
                    <span className="pointer-events-none absolute left-0 flex h-full w-full items-center px-[3px]">
                      {isDark ? (
                        <span className="ml-auto">
                          <MoonIcon
                            className="h-3.5 w-3.5 text-primary-foreground"
                            aria-hidden="true"
                          />
                        </span>
                      ) : (
                        <SunIcon
                          className="h-3.5 w-3.5 text-primary-foreground"
                          aria-hidden="true"
                        />
                      )}
                    </span>
                  </span>
                </label>

                <Button
                  className="w-full justify-start gap-2"
                  type="button"
                  variant="ghost"
                  onClick={handleCookiePreferenceEdit}
                >
                  <Cog6ToothIcon className="h-4 w-4" aria-hidden="true" />
                  Nastavení cookies
                </Button>

                <Button
                  className="w-full justify-start gap-2"
                  type="button"
                  variant="ghost"
                >
                  <BugAntIcon className="h-4 w-4" aria-hidden="true" />
                  Report a bug
                </Button>
              </div>
            </div>
          ) : null}
        </div>
      </>
    );
  }

  return (
    <header
      className={
        isOpen
          ? "fixed inset-0 z-50 flex flex-col overflow-hidden bg-background"
          : "sticky top-0 z-50 bg-background/95 backdrop-blur"
      }
    >
      <div className="border-b">
        <nav
          className="site-container flex items-center gap-3 py-4"
          aria-label="Main navigation"
        >
          <Link
            className="min-w-0 flex-1 whitespace-normal break-words text-base font-semibold leading-tight text-foreground underline-offset-4 hover:underline md:text-lg"
            href="/"
            onClick={closeMenu}
          >
            {appName}
          </Link>

          <div className="hidden items-center gap-3 md:flex">
            {renderMenuContent("navbar-theme-switch-desktop", false)}
          </div>

          <Button
            aria-controls="site-navbar-mobile-menu"
            aria-expanded={isOpen}
            aria-label="Toggle navigation menu"
            className="ml-auto shrink-0 md:hidden"
            size="icon"
            variant="outline"
            type="button"
            onClick={toggleMenu}
          >
            {isOpen ? (
              <XMarkIcon className="h-4 w-4" aria-hidden="true" />
            ) : (
              <Bars3Icon className="h-4 w-4" aria-hidden="true" />
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
  );
}
