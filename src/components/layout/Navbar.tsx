"use client";

import {
  ArrowTopRightOnSquareIcon,
  Bars3Icon,
  BugAntIcon,
  ChevronDownIcon,
  Cog6ToothIcon, FlagIcon,
  LinkIcon,
  MoonIcon,
  SunIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { ReportBugDialog } from "@/components/layout/ReportBugDialog";
import { Switch } from "@/components/ui/switch";
import { useAppContext } from "@/context/AppContext";
import { useLanguage } from "@/context/LanguageContext";
import { languages } from "@/i18n/translations";

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

const logoSource = "/images/logos/logo.png";

export function Navbar() {
  const { appName, isDark, openCookiePreferences, toggleTheme } =
    useAppContext();
  const { language, setLanguage, t } = useLanguage();
  const copy = t.navbar;
  const [isOpen, setIsOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isBugReportOpen, setIsBugReportOpen] = useState(false);

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

  function handleBugReportOpen() {
    setIsBugReportOpen(true);
    setIsSettingsOpen(false);
    setIsOpen(false);
  }

  function renderMenuContent(switchId: string, isMobile: boolean) {
    const languageSwitchId = `${switchId}-language`;
    const currentLanguage = languages.find((item) => item.code === language);

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
                <LinkIcon
                  className={"size-4 shrink-0"}
                  aria-hidden="true"
                />
                {copy.navItems[item.labelKey]}
              </Link>
            </Button>
          ))}
        </div>

        <div
          className={
            isMobile ? "relative navbar-mobile-menu-control" : "relative"
          }
        >
          <Button
            aria-expanded={isSettingsOpen}
            className={isMobile ? "w-full gap-2" : "gap-2"}
            size="sm"
            type="button"
            variant="ghost"
            onClick={() => setIsSettingsOpen((current) => !current)}
          >
            <Cog6ToothIcon
              className={"size-4 shrink-0"}
              aria-hidden="true"
            />
            {copy.settings}
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
                  className="ui-button ui-button-ghost navbar-settings-menu-row cursor-pointer"
                  htmlFor={switchId}
                >
                  {isDark ? (
                    <SunIcon
                      className="navbar-settings-icon"
                      aria-hidden="true"
                    />
                  ) : (
                    <MoonIcon
                      className="navbar-settings-icon"
                      aria-hidden="true"
                    />
                  )}
                  <span className="navbar-settings-text text-foreground">
                    {isDark ? copy.themeMode.dark : copy.themeMode.light}
                  </span>
                  <span className="relative flex items-center justify-self-end">
                    <Switch
                      id={switchId}
                      aria-label={copy.themeMode.toggle}
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

                <label
                  className="ui-button ui-button-ghost navbar-settings-menu-row cursor-pointer"
                  htmlFor={languageSwitchId}
                >
                 <FlagIcon className="size-4" />
                  <span className="navbar-settings-text text-foreground">
                    {copy.language}: {currentLanguage?.shortLabel}
                  </span>
                  <span className="relative flex items-center justify-self-end">
                    <Switch
                      id={languageSwitchId}
                      aria-label={copy.language}
                      checked={language === "en"}
                      onCheckedChange={(checked) =>
                        setLanguage(checked ? "en" : "cs")
                      }
                    />
                    <span className="pointer-events-none absolute left-0 flex h-full w-full items-center px-[3px]">
                      {language === "en" ? (
                        <span className="ml-auto text-[10px] leading-none">
                          🇬🇧
                        </span>
                      ) : (
                        <span className="text-[10px] leading-none">🇨🇿</span>
                      )}
                    </span>
                  </span>
                </label>

                <Button
                  className="navbar-settings-menu-row"
                  type="button"
                  variant="ghost"
                  onClick={handleCookiePreferenceEdit}
                >
                  <Cog6ToothIcon
                    className="navbar-settings-icon"
                    aria-hidden="true"
                  />
                  <span className="navbar-settings-text">{copy.cookies}</span>
                </Button>

                <Button
                  className="navbar-settings-menu-row"
                  type="button"
                  variant="ghost"
                  onClick={handleBugReportOpen}
                >
                  <BugAntIcon
                    className="navbar-settings-icon"
                    aria-hidden="true"
                  />
                  <span className="navbar-settings-text">{copy.bugReport}</span>
                </Button>
              </div>
            </div>
          ) : null}
        </div>

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
        <div className="border-b">
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
              aria-label={copy.toggleMenu}
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

      <ReportBugDialog
        isOpen={isBugReportOpen}
        onOpenChange={setIsBugReportOpen}
      />
    </>
  );
}
