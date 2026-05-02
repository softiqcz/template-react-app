"use client";

import { XMarkIcon } from "@heroicons/react/24/outline";

import {
  FE_VERSION,
  SETTINGS_OFFCANVAS_LANGUAGE_SWITCH_ID,
  SETTINGS_OFFCANVAS_SWITCH_ID,
} from "@/constants/settings";
import { SettingsControls } from "@/components/layout/settings/SettingsControls";
import { SoftiqLogoLink } from "@/components/layout/base/SoftiqLogoLink";
import { Button } from "@/components/ui/button";
import type { translations } from "@/i18n/translations";
import type { Language } from "@/i18n/translations";

type NavbarTranslations = (typeof translations)[Language]["navbar"];

type SettingsOffcanvasPanelProps = {
  beVersion: string;
  closeLabel: string;
  currentYear: number;
  isDark: boolean;
  isOpen: boolean;
  language: Language;
  navbar: NavbarTranslations;
  onBugReportOpen: () => void;
  onClose: () => void;
  onCookiePreferenceEdit: () => void;
  onLanguageChange: (language: Language) => void;
  onThemeToggle: () => void;
};

export function SettingsOffcanvasPanel({
  beVersion,
  closeLabel,
  currentYear,
  isDark,
  isOpen,
  language,
  navbar,
  onBugReportOpen,
  onClose,
  onCookiePreferenceEdit,
  onLanguageChange,
  onThemeToggle,
}: SettingsOffcanvasPanelProps) {
  return (
    <div
      aria-hidden={!isOpen}
      aria-modal={isOpen}
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
            aria-label={closeLabel}
            className="shrink-0"
            size="icon"
            type="button"
            variant="ghost"
            onClick={onClose}
          >
            <XMarkIcon className="size-4" aria-hidden="true" />
          </Button>
        </div>

        <div className="px-6 flex flex-col gap-2">
          <SettingsControls
            isDark={isDark}
            language={language}
            languageSwitchId={SETTINGS_OFFCANVAS_LANGUAGE_SWITCH_ID}
            navbar={navbar}
            switchId={SETTINGS_OFFCANVAS_SWITCH_ID}
            onBugReportOpen={onBugReportOpen}
            onCookiePreferenceEdit={onCookiePreferenceEdit}
            onLanguageChange={onLanguageChange}
            onThemeToggle={onThemeToggle}
          />
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
  );
}
