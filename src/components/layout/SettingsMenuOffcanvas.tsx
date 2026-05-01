"use client";

import {
  BugAntIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  Cog6ToothIcon,
  FlagIcon,
  MoonIcon,
  SunIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

import { ReportBugDialog } from "@/components/layout/ReportBugDialog";
import { SoftiqLogoLink } from "@/components/layout/SoftiqLogoLink";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useAppContext } from "@/context/AppContext";
import { useLanguage } from "@/context/LanguageContext";
import { languages, type Language } from "@/i18n/translations";

const switchId = "settings-offcanvas-theme-switch";
const languageSwitchId = "settings-offcanvas-language";
const FE_VERSION = "v0.0.1";

export function SettingsMenuOffcanvas() {
  const { beVersion, currentYear, isDark, openCookiePreferences, toggleTheme } = useAppContext();
  const { language, setLanguage, t } = useLanguage();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isBugReportOpen, setIsBugReportOpen] = useState(false);
  const navbar = t.navbar;

  useEffect(() => {
    if (!isSettingsOpen) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsSettingsOpen(false);
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isSettingsOpen]);

  function handleCookiePreferenceEdit() {
    openCookiePreferences();
    setIsSettingsOpen(false);
  }

  function handleBugReportOpen() {
    setIsBugReportOpen(true);
    setIsSettingsOpen(false);
  }

  return (
    <>
      {isSettingsOpen ? (
        <button
          aria-label={t.common.close}
          className="fixed inset-0 z-[55] cursor-default bg-background/30 backdrop-blur-[1px]"
          type="button"
          onClick={() => setIsSettingsOpen(false)}
        />
      ) : null}

      <aside
        aria-label={navbar.settings}
        className={`group/canvas fixed inset-y-0 right-0 z-[60] h-dvh w-[min(calc(100vw-1rem),24rem)] transition-all duration-[600ms]  ease-out ${
          isSettingsOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <Button
          aria-controls="settings-offcanvas-panel"
          aria-expanded={isSettingsOpen}
          aria-label={navbar.settings}
          className="absolute bottom-[20%] left-0 h-auto -translate-x-full flex-col gap-1 rounded-l-md rounded-r-none border-r-0 px-2 py-2 transition-all duration-[600ms]"
          type="button"
          variant="outline"
          onClick={() => setIsSettingsOpen((current) => !current)}
        >
          <Cog6ToothIcon className="size-4 shrink-0" aria-hidden="true" />
          {isSettingsOpen ? (
            <ChevronRightIcon className="size-3.5 shrink-0" aria-hidden="true" />
          ) : (
            <ChevronLeftIcon className="size-3.5 shrink-0" aria-hidden="true" />
          )}
        </Button>

        <div
          aria-hidden={!isSettingsOpen}
          aria-modal={isSettingsOpen}
          className="ui-card h-full overflow-y-auto rounded-none border-y-0 border-r-0"
          id="settings-offcanvas-panel"
          role="dialog"
        >
          <div className="flex min-h-full flex-col gap-7  pt-4">
            <div className="flex items-center justify-between gap-4 border-b border-primary px-6 pb-3">
              <div className="min-w-0">
                <p className="text-sm font-medium uppercase tracking-wide text-primary">
                  {navbar.settings}
                </p>
              </div>
              <Button
                aria-label={t.common.close}
                className="shrink-0"
                size="icon"
                type="button"
                variant="ghost"
                onClick={() => setIsSettingsOpen(false)}
              >
                <XMarkIcon className="size-4" aria-hidden="true" />
              </Button>
            </div>

            <div className="px-6 flex flex-col gap-2">
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
                  {isDark ? navbar.themeMode.dark : navbar.themeMode.light}
                </span>
                <span className="relative flex items-center justify-self-end">
                  <Switch
                    id={switchId}
                    aria-label={navbar.themeMode.toggle}
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

              <div className="ui-button ui-button-ghost navbar-settings-menu-row">
                <FlagIcon className="navbar-settings-icon" aria-hidden="true" />
                <label
                  className="navbar-settings-text text-foreground"
                  htmlFor={languageSwitchId}
                >
                  {navbar.language}
                </label>
                <Select
                  value={language}
                  onValueChange={(value) => setLanguage(value as Language)}
                >
                  <SelectTrigger
                    id={languageSwitchId}
                    aria-label={navbar.language}
                    className="justify-self-end"
                  >
                    <SelectValue placeholder={navbar.language} />
                  </SelectTrigger>
                  <SelectContent align="end">
                    {languages.map((item) => (
                      <SelectItem key={item.code} value={item.code}>
                        <span className="flex items-center gap-2">
                          <span
                            className="text-[10px] leading-none"
                            aria-hidden="true"
                          >
                            {item.flag}
                          </span>
                          {item.label}
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

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
                <span className="navbar-settings-text">{navbar.cookies}</span>
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
                <span className="navbar-settings-text">{navbar.bugReport}</span>
              </Button>
            </div>

            <div className="mt-auto flex justify-center border-t pt-6">
              <SoftiqLogoLink
                beVersion={beVersion}
                currentYear={currentYear}
                feVersion={FE_VERSION}
                logoRevealClassName="duration-1000"
              />
            </div>
          </div>
        </div>
      </aside>

      <ReportBugDialog
        isOpen={isBugReportOpen}
        onOpenChange={setIsBugReportOpen}
      />
    </>
  );
}
