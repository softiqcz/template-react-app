"use client";

import {
  BugAntIcon,
  ChevronDownIcon,
  Cog6ToothIcon,
  FlagIcon,
  MoonIcon,
  SunIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";

import { ReportBugDialog } from "@/components/layout/ReportBugDialog";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useAppContext } from "@/context/AppContext";
import { useLanguage } from "@/context/LanguageContext";
import { languages } from "@/i18n/translations";

type SettingsMenuProps = {
  switchId: string;
  isMobile?: boolean;
  menuPosition?: "bottom" | "top";
  onAfterAction?: () => void;
};

export function SettingsMenu({
  switchId,
  isMobile = false,
  menuPosition = "bottom",
  onAfterAction,
}: SettingsMenuProps) {
  const { isDark, openCookiePreferences, toggleTheme } = useAppContext();
  const { language, setLanguage, t } = useLanguage();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isBugReportOpen, setIsBugReportOpen] = useState(false);
  const navbar = t.navbar;
  const languageSwitchId = `${switchId}-language`;
  const currentLanguage = languages.find((item) => item.code === language);
  const menuPlacementClass =
    menuPosition === "top"
      ? "mb-2 md:absolute md:bottom-full md:right-0"
      : "mt-2 md:absolute md:right-0";

  function handleCookiePreferenceEdit() {
    openCookiePreferences();
    setIsSettingsOpen(false);
    onAfterAction?.();
  }

  function handleBugReportOpen() {
    setIsBugReportOpen(true);
    setIsSettingsOpen(false);
    onAfterAction?.();
  }

  return (
    <>
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
          <Cog6ToothIcon className="size-4 shrink-0" aria-hidden="true" />
          {menuPosition === "bottom" && navbar.settings}

          <ChevronDownIcon
            className={`size-4 transition-transform ${
              isSettingsOpen ? "rotate-180" : ""
            }`}
            aria-hidden="true"
          />
        </Button>

        {isSettingsOpen ? (
          <div className={`ui-card z-50 w-full md:w-72 ${menuPlacementClass}`}>
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

              <label
                className="ui-button ui-button-ghost navbar-settings-menu-row cursor-pointer"
                htmlFor={languageSwitchId}
              >
                <FlagIcon className="navbar-settings-icon" aria-hidden="true" />
                <span className="navbar-settings-text text-foreground">
                  {navbar.language}: {currentLanguage?.shortLabel}
                </span>
                <span className="relative flex items-center justify-self-end">
                  <Switch
                    id={languageSwitchId}
                    aria-label={navbar.language}
                    checked={language === "en"}
                    onCheckedChange={(checked) =>
                      setLanguage(checked ? "en" : "cs")
                    }
                  />
                  <span className="pointer-events-none absolute left-0 flex h-full w-full items-center px-[3px]">
                    {language === "en" ? (
                      <span
                        className="ml-auto text-[10px] leading-none"
                        style={{ filter: "grayscale(1)" }}
                      >
                        🇬🇧
                      </span>
                    ) : (
                      <span
                        className="text-[10px] leading-none"
                        style={{ filter: "grayscale(1)" }}
                      >
                        🇨🇿
                      </span>
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
          </div>
        ) : null}
      </div>

      <ReportBugDialog
        isOpen={isBugReportOpen}
        onOpenChange={setIsBugReportOpen}
      />
    </>
  );
}
