"use client";

import { ChevronDownIcon, Cog6ToothIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

import { ReportBugDialog } from "@/components/layout/dialogs/ReportBugDialog";
import { SettingsControls } from "@/components/layout/settings/SettingsControls";
import { Button } from "@/components/ui/button";
import { useAppContext } from "@/context/AppContext";
import { useLanguage } from "@/context/LanguageContext";
import type { Language } from "@/i18n/translations";

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
              <SettingsControls
                isDark={isDark}
                language={language}
                languageSwitchId={languageSwitchId}
                navbar={navbar}
                switchId={switchId}
                onBugReportOpen={handleBugReportOpen}
                onCookiePreferenceEdit={handleCookiePreferenceEdit}
                onLanguageChange={(value) => setLanguage(value as Language)}
                onThemeToggle={toggleTheme}
              />
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
