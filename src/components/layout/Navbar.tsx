"use client";

import {
  Bars3Icon,
  BugAntIcon,
  ChevronDownIcon,
  Cog6ToothIcon,
  MoonIcon,
  SunIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useAppContext } from "@/context/AppContext";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Components", href: "#components" },
  { label: "Docs", href: "#docs" },
];

export function Navbar() {
  const {
    appName,
    isDark,
    openCookiePreferences,
    toggleTheme,
  } = useAppContext();
  const [isOpen, setIsOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((current) => !current);
  const closeMenu = () => {
    setIsOpen(false);
    setIsSettingsOpen(false);
  };

  function handleCookiePreferenceEdit() {
    openCookiePreferences();
    closeMenu();
  }

  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur">
      <nav
        className="site-container flex flex-wrap items-center justify-between gap-3 py-4"
        aria-label="Main navigation"
      >
        <Link
          className="max-w-[calc(100%-3rem)] truncate text-sm font-semibold text-foreground underline-offset-4 hover:underline"
          href="/"
          onClick={closeMenu}
        >
          {appName}
        </Link>

        <Button
          aria-controls="site-navbar-menu"
          aria-expanded={isOpen}
          aria-label="Toggle navigation menu"
          className="md:hidden"
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

        <div
          id="site-navbar-menu"
          className={
            isOpen
              ? "flex w-full flex-col gap-3 border-t pt-4 md:w-auto md:flex-row md:items-center md:border-t-0 md:pt-0"
              : "hidden w-full flex-col gap-3 border-t pt-4 md:flex md:w-auto md:flex-row md:items-center md:border-t-0 md:pt-0"
          }
        >
          <div className="flex flex-col gap-1 md:flex-row md:items-center md:gap-2">
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

          <Button asChild size="sm">
            <a href="https://softiq.cz" rel="noreferrer" target="_blank">
              softIQ
            </a>
          </Button>

          <div className="relative">
            <Button
              aria-expanded={isSettingsOpen}
              className="w-full gap-2 md:w-auto"
              size="sm"
              type="button"
              variant="outline"
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
                <div className="ui-card-content flex flex-col gap-3 pt-6">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2 text-sm font-medium">
                      {isDark ? (
                        <MoonIcon className="h-4 w-4" aria-hidden="true" />
                      ) : (
                        <SunIcon className="h-4 w-4" aria-hidden="true" />
                      )}
                      Tmavý režim
                    </div>
                    <Switch
                      aria-label="Přepnout tmavý režim"
                      checked={isDark}
                      onCheckedChange={toggleTheme}
                    />
                  </div>

                  <Button
                    className="justify-start gap-2"
                    type="button"
                    variant="ghost"
                    onClick={handleCookiePreferenceEdit}
                  >
                    <Cog6ToothIcon className="h-4 w-4" aria-hidden="true" />
                    Nastavení cookies
                  </Button>

                  <Button
                    className="justify-start gap-2"
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
        </div>
      </nav>
    </header>
  );
}
