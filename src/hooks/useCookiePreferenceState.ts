"use client";

import { useCallback, useEffect, useState } from "react";

import { COLOR_SCHEME_MEDIA_QUERY } from "@/constants/app";
import {
  ColorMode,
  CookiePreferences,
  createCookiePreferences,
  getCookiePreferences,
  saveCookiePreferences,
} from "@/utils/cookiePreferences";

export function useCookiePreferenceState(
  defaultCookiePreferences: CookiePreferences,
) {
  const [isDark, setIsDark] = useState(false);
  const [isCookiesAllowed, setIsCookiesAllowed] = useState(true);
  const [cookiePreferences, setCookiePreferences] = useState(
    defaultCookiePreferences,
  );
  const [hasCookiePreference, setHasCookiePreference] = useState(true);
  const [isCookiePreferenceLoaded, setIsCookiePreferenceLoaded] =
    useState(false);
  const [isCookiePreferenceEditorOpen, setIsCookiePreferenceEditorOpen] =
    useState(false);

  useEffect(() => {
    const preferences = getCookiePreferences();
    const prefersDark = window.matchMedia(COLOR_SCHEME_MEDIA_QUERY).matches;
    const shouldUseDark = preferences?.colorMode
      ? preferences.colorMode === "dark"
      : prefersDark;
    const nextPreferences =
      preferences ??
      createCookiePreferences({
        analyticalCookies: true,
        colorMode: shouldUseDark ? "dark" : "light",
        technicalCookies: true,
      });

    if (!preferences) {
      saveCookiePreferences(nextPreferences);
    }

    setCookiePreferences(nextPreferences);
    setIsCookiesAllowed(nextPreferences.isCookiesAllowed);
    setHasCookiePreference(nextPreferences.hasCookiePreference);

    document.documentElement.classList.toggle("dark", shouldUseDark);
    document.documentElement.dataset.theme = shouldUseDark ? "dark" : "light";
    setIsDark(shouldUseDark);
    setIsCookiePreferenceLoaded(true);
  }, []);

  const toggleTheme = useCallback(() => {
    const next = !isDark;
    const nextColorMode: ColorMode = next ? "dark" : "light";

    document.documentElement.classList.toggle("dark", next);
    document.documentElement.dataset.theme = next ? "dark" : "light";
    setIsDark(next);

    const nextPreferences = {
      ...cookiePreferences,
      colorMode: nextColorMode,
    };

    saveCookiePreferences(nextPreferences);
    setCookiePreferences(nextPreferences);
  }, [cookiePreferences, isDark]);

  const setCookiePreference = useCallback(
    (preferences: CookiePreferences) => {
      const nextPreferences = {
        ...preferences,
        hasCookiePreference: true,
        colorMode: preferences.colorMode ?? (isDark ? "dark" : "light"),
      };

      saveCookiePreferences(nextPreferences);
      setCookiePreferences(nextPreferences);
      setIsCookiesAllowed(nextPreferences.isCookiesAllowed);
      setHasCookiePreference(true);
      setIsCookiePreferenceLoaded(true);
      setIsCookiePreferenceEditorOpen(false);
    },
    [isDark],
  );

  const openCookiePreferences = useCallback(() => {
    setIsCookiePreferenceLoaded(true);
    setIsCookiePreferenceEditorOpen(true);
  }, []);

  return {
    cookiePreferences,
    hasCookiePreference,
    isCookiePreferenceEditorOpen,
    isCookiePreferenceLoaded,
    isCookiesAllowed,
    isDark,
    openCookiePreferences,
    setCookiePreference,
    toggleTheme,
  };
}
