"use client";

import {
  BugAntIcon,
  Cog6ToothIcon,
  FlagIcon,
  MoonIcon,
  SunIcon,
} from "@heroicons/react/24/outline";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import type { translations } from "@/i18n/translations";
import { languages, type Language } from "@/i18n/translations";

type NavbarTranslations = (typeof translations)[Language]["navbar"];

type SettingsControlsProps = {
  isDark: boolean;
  language: Language;
  languageSwitchId: string;
  navbar: NavbarTranslations;
  switchId: string;
  onBugReportOpen: () => void;
  onCookiePreferenceEdit: () => void;
  onLanguageChange: (language: Language) => void;
  onThemeToggle: () => void;
};

export function SettingsControls({
  isDark,
  language,
  languageSwitchId,
  navbar,
  switchId,
  onBugReportOpen,
  onCookiePreferenceEdit,
  onLanguageChange,
  onThemeToggle,
}: SettingsControlsProps) {
  return (
    <>
      <label
        className="ui-button ui-button-ghost navbar-settings-menu-row cursor-pointer"
        htmlFor={switchId}
      >
        {isDark ? (
          <SunIcon className="navbar-settings-icon" aria-hidden="true" />
        ) : (
          <MoonIcon className="navbar-settings-icon" aria-hidden="true" />
        )}
        <span className="navbar-settings-text text-foreground">
          {isDark ? navbar.themeMode.dark : navbar.themeMode.light}
        </span>
        <span className="relative flex items-center justify-self-end">
          <Switch
            id={switchId}
            aria-label={navbar.themeMode.toggle}
            checked={isDark}
            onCheckedChange={onThemeToggle}
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
        <Select value={language} onValueChange={onLanguageChange}>
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
                  <span className="text-[10px] leading-none" aria-hidden="true">
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
        onClick={onCookiePreferenceEdit}
      >
        <Cog6ToothIcon className="navbar-settings-icon" aria-hidden="true" />
        <span className="navbar-settings-text">{navbar.cookies}</span>
      </Button>

      <Button
        className="navbar-settings-menu-row"
        type="button"
        variant="ghost"
        onClick={onBugReportOpen}
      >
        <BugAntIcon className="navbar-settings-icon" aria-hidden="true" />
        <span className="navbar-settings-text">{navbar.bugReport}</span>
      </Button>
    </>
  );
}
