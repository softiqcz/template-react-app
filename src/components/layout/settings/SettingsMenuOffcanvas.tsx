"use client";

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

import { ReportBugDialog } from "@/components/layout/dialogs/ReportBugDialog";
import { SettingsOffcanvasPanel } from "@/components/layout/settings/SettingsOffcanvasPanel";
import { Button } from "@/components/ui/button";
import { useAppContext } from "@/context/AppContext";
import { useLanguage } from "@/context/LanguageContext";
import type { Language } from "@/i18n/translations";

export function SettingsMenuOffcanvas() {
  const { beVersion, currentYear, isDark, openCookiePreferences, toggleTheme } =
    useAppContext();
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
            <ChevronRightIcon
              className="size-3.5 shrink-0"
              aria-hidden="true"
            />
          ) : (
            <ChevronLeftIcon className="size-3.5 shrink-0" aria-hidden="true" />
          )}
        </Button>

        <SettingsOffcanvasPanel
          beVersion={beVersion}
          closeLabel={t.common.close}
          currentYear={currentYear}
          isDark={isDark}
          isOpen={isSettingsOpen}
          language={language}
          navbar={navbar}
          onBugReportOpen={handleBugReportOpen}
          onClose={() => setIsSettingsOpen(false)}
          onCookiePreferenceEdit={handleCookiePreferenceEdit}
          onLanguageChange={(value) => setLanguage(value as Language)}
          onThemeToggle={toggleTheme}
        />
      </aside>

      <ReportBugDialog
        isOpen={isBugReportOpen}
        onOpenChange={setIsBugReportOpen}
      />
    </>
  );
}
