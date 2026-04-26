import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import {getVersionFromBe} from "@/utils";
import {
  ColorMode,
  CookiePreferences,
  createCookiePreferences,
  getCookiePreferences,
  saveCookiePreferences,
} from "@/utils/cookiePreferences";

type AppContextType = {
  appName: string;
  beVersion: string;
  currentYear: number;
  isDark: boolean;
  isCookiesAllowed: boolean;
  cookiePreferences: CookiePreferences;
  hasCookiePreference: boolean;
  isCookiePreferenceLoaded: boolean;
  isCookiePreferenceEditorOpen: boolean;
  openCookiePreferences: () => void;
  setCookiePreference: (preferences: CookiePreferences) => void;
  toggleTheme: () => void;
};

const defaultCookiePreferences = createCookiePreferences({
  analyticalCookies: false,
  colorMode: "light",
  hasCookiePreference: false,
  technicalCookies: false,
});

const defaultContext: AppContextType = {
  appName: "Template React App",
  beVersion: "",
  currentYear: 2026,
  isDark: false,
  isCookiesAllowed: false,
  cookiePreferences: defaultCookiePreferences,
  hasCookiePreference: false,
  isCookiePreferenceLoaded: false,
  isCookiePreferenceEditorOpen: false,
  openCookiePreferences: () => {},
  setCookiePreference: () => {},
  toggleTheme: () => {},
};

export function useAppContext() {
  return useContext(AppContext);
}

const AppContext = createContext<AppContextType>(defaultContext);

export function AppProvider({ children }: { children: ReactNode }) {
  const [isDark, setIsDark] = useState(false);
  const [beVersion, setBeVersion] = useState(defaultContext.beVersion);
  const [isCookiesAllowed, setIsCookiesAllowed] = useState(
    defaultContext.isCookiesAllowed,
  );
  const [cookiePreferences, setCookiePreferences] = useState(
    defaultContext.cookiePreferences,
  );
  const [hasCookiePreference, setHasCookiePreference] = useState(
    defaultContext.hasCookiePreference,
  );
  const [isCookiePreferenceLoaded, setIsCookiePreferenceLoaded] = useState(
    defaultContext.isCookiePreferenceLoaded,
  );
  const [isCookiePreferenceEditorOpen, setIsCookiePreferenceEditorOpen] =
    useState(defaultContext.isCookiePreferenceEditorOpen);
  const CURRENT_YEAR = new Date().getFullYear();

  useEffect(() => {
    const preferences = getCookiePreferences();
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const colorMode = preferences?.colorMode ?? (prefersDark ? "dark" : "light");
    const shouldUseDark = colorMode === "dark";

    if (preferences) {
      setCookiePreferences(preferences);
      setIsCookiesAllowed(preferences.isCookiesAllowed);
      setHasCookiePreference(preferences.hasCookiePreference);
    }

    document.documentElement.classList.toggle("dark", shouldUseDark);
    setIsDark(shouldUseDark);
    setIsCookiePreferenceLoaded(true);
  }, []);

  function toggleTheme() {
    const next = !isDark;
    const nextColorMode: ColorMode = next ? "dark" : "light";
    const nextPreferences = {
      ...cookiePreferences,
      colorMode: nextColorMode,
    };

    document.documentElement.classList.toggle("dark", next);
    saveCookiePreferences(nextPreferences);
    setCookiePreferences(nextPreferences);
    setIsDark(next);
  }

  function setCookiePreference(preferences: CookiePreferences) {
    const nextPreferences = {
      ...preferences,
      colorMode: cookiePreferences.colorMode,
      hasCookiePreference: true,
    };

    saveCookiePreferences(nextPreferences);
    setCookiePreferences(nextPreferences);
    setIsCookiesAllowed(nextPreferences.isCookiesAllowed);
    setHasCookiePreference(true);
    setIsCookiePreferenceLoaded(true);
    setIsCookiePreferenceEditorOpen(false);
  }

  function openCookiePreferences() {
    setIsCookiePreferenceLoaded(true);
    setIsCookiePreferenceEditorOpen(true);
  }

  useEffect(() => {
    (async () => {
      try {
        const response = await getVersionFromBe();
        setBeVersion(response.data.data.version);
      } catch {
        setBeVersion("unknown");
      }
    })();
  }, []);

  return (
      <AppContext.Provider
          value={{
            appName: defaultContext.appName,
            beVersion,
            isDark,
            isCookiesAllowed,
            cookiePreferences,
            hasCookiePreference,
            isCookiePreferenceLoaded,
            isCookiePreferenceEditorOpen,
            openCookiePreferences,
            setCookiePreference,
            toggleTheme,
            currentYear: CURRENT_YEAR,
          }}
      >
        {children}
      </AppContext.Provider>
  );
};
