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
  const settingsRowClass =
    "grid w-full grid-cols-[1rem_1fr] items-center justify-start gap-2 px-3";
  const themeRowClass =
    "grid w-full grid-cols-[1rem_1fr_auto] items-center justify-start gap-2 px-3";
  const settingsIconClass = "size-4 justify-self-center";

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
            <Button
              key={item.href}
              asChild
              className={isMobile ? "w-full justify-start" : undefined}
              size="sm"
              variant="ghost"
            >
              <Link href={item.href} onClick={closeMenu}>
                {item.label}
              </Link>
            </Button>
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
            <Cog6ToothIcon className="size-4" aria-hidden="true" />
            Nastavení
            <ChevronDownIcon
              className={`size-4 transition-transform ${
                isSettingsOpen ? "rotate-180" : ""
              }`}
              aria-hidden="true"
            />
          </Button>

          {isSettingsOpen ? (
            <div className="ui-card mt-2 w-full md:absolute md:right-0 md:w-72">
              <div className="ui-card-content flex flex-col gap-2 pt-6">
                <label
                  className={`${themeRowClass} ui-button ui-button-ghost cursor-pointer py-2 text-left`}
                  htmlFor={switchId}
                >
                  {isDark ? (
                    <SunIcon className={settingsIconClass} aria-hidden="true" />
                  ) : (
                    <MoonIcon className={settingsIconClass} aria-hidden="true" />
                  )}
                  <span className="text-sm font-medium text-foreground">
                    {isDark ? "Tmavý" : "Světlý"} režim
                  </span>
                  <span className="relative flex items-center justify-self-end">
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
                            className="size-4 text-primary-foreground"
                            aria-hidden="true"
                          />
                        </span>
                      ) : (
                        <SunIcon
                          className="size-4 text-primary-foreground"
                          aria-hidden="true"
                        />
                      )}
                    </span>
                  </span>
                </label>

                <Button
                  className={settingsRowClass}
                  type="button"
                  variant="ghost"
                  onClick={handleCookiePreferenceEdit}
                >
                  <Cog6ToothIcon
                    className={settingsIconClass}
                    aria-hidden="true"
                  />
                  <span className="justify-self-start">Nastavení cookies</span>
                </Button>

                <Button
                  className={settingsRowClass}
                  type="button"
                  variant="ghost"
                >
                  <BugAntIcon
                    className={settingsIconClass}
                    aria-hidden="true"
                  />
                  <span className="justify-self-start">Report a bug</span>
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
  );
}
