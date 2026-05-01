"use client";

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

import { getVersionFromBe, postFeatureProposal } from "@/utils";
import {
  ColorMode,
  CookiePreferences,
  createCookiePreferences,
  getCookiePreferences,
  saveCookiePreferences,
} from "@/utils/cookiePreferences";
import { useLanguage } from "@/context/LanguageContext";

type SystemMessage = {
  message: string;
  status: "success" | "error";
};

type AppContextType = {
  appName: string;
  beVersion: string;
  currentYear: number;
  isDark: boolean;
  isInitialLoading: boolean;
  setIsInitialLoading: Dispatch<SetStateAction<boolean>>;
  isCookiesAllowed: boolean;
  cookiePreferences: CookiePreferences;
  hasCookiePreference: boolean;
  isCookiePreferenceLoaded: boolean;
  isCookiePreferenceEditorOpen: boolean;
  openCookiePreferences: () => void;
  setCookiePreference: (preferences: CookiePreferences) => void;
  toggleTheme: () => void;
  systemMessage: SystemMessage;
  setSystemMessage: (message: SystemMessage) => void;
  reportBug: (message: string) => Promise<void>;
};

const defaultCookiePreferences = createCookiePreferences({
  analyticalCookies: true,
  colorMode: "light",
  technicalCookies: true,
});
const INITIAL_LOADING_TIMEOUT_MS = 5000;

const defaultContext: AppContextType = {
  appName: "Softiq React App",
  beVersion: "",
  currentYear: 2026,
  isDark: false,
  isInitialLoading: true,
  setIsInitialLoading: () => {},
  isCookiesAllowed: true,
  cookiePreferences: defaultCookiePreferences,
  hasCookiePreference: true,
  isCookiePreferenceLoaded: false,
  isCookiePreferenceEditorOpen: false,
  openCookiePreferences: () => {},
  setCookiePreference: () => {},
  toggleTheme: () => {},
  systemMessage: { message: "", status: "success" },
  setSystemMessage: () => {},
  reportBug: async () => {},
};

export function useAppContext() {
  return useContext(AppContext);
}

const AppContext = createContext<AppContextType>(defaultContext);

export function AppProvider({ children }: { children: ReactNode }) {
  const { t } = useLanguage();
  const [isDark, setIsDark] = useState(false);
  const [beVersion, setBeVersion] = useState(defaultContext.beVersion);
  const [systemMessage, setSystemMessage] = useState(
    defaultContext.systemMessage,
  );
  const [isCookiesAllowed, setIsCookiesAllowed] = useState(
    defaultContext.isCookiesAllowed,
  );
  const [isInitialLoading, setIsInitialLoading] = useState(
    defaultContext.isInitialLoading,
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
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const preferences = getCookiePreferences();
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
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

  function toggleTheme() {
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
  }

  function setCookiePreference(preferences: CookiePreferences) {
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
  }

  function openCookiePreferences() {
    setIsCookiePreferenceLoaded(true);
    setIsCookiePreferenceEditorOpen(true);
  }

  useEffect(() => {
    let isMounted = true;
    const loadingTimeout = window.setTimeout(() => {
      if (!isMounted) {
        return;
      }

      setBeVersion((version) => version || "unknown");
      setIsInitialLoading(false);
    }, INITIAL_LOADING_TIMEOUT_MS);

    (async () => {
      try {
        const response = await getVersionFromBe();
        if (!isMounted) {
          return;
        }

        setBeVersion(response.data.data.version);
      } catch {
        if (!isMounted) {
          return;
        }

        setBeVersion("unknown");
      } finally {
        if (isMounted) {
          window.clearTimeout(loadingTimeout);
          setIsInitialLoading(false);
        }
      }
    })();

    return () => {
      isMounted = false;
      window.clearTimeout(loadingTimeout);
    };
  }, []);

  useEffect(() => {
    function handlePageShow(event: PageTransitionEvent) {
      if (event.persisted) {
        setIsInitialLoading(false);
      }
    }

    window.addEventListener("pageshow", handlePageShow);

    return () => {
      window.removeEventListener("pageshow", handlePageShow);
    };
  }, []);

  async function reportBug(message: string) {
    const payload = { data: { message } };

    try {
      const response = await postFeatureProposal(payload);
      setSystemMessage({
        message: response.data.data.message,
        status: "success",
      });
    } catch {
      setSystemMessage({
        message: t.common.genericSupportError,
        status: "error",
      });
    }
  }

  return (
    <AppContext.Provider
      value={{
        appName: defaultContext.appName,
        beVersion,
        isDark,
        isInitialLoading,
        setIsInitialLoading,
        isCookiesAllowed,
        cookiePreferences,
        hasCookiePreference,
        isCookiePreferenceLoaded,
        isCookiePreferenceEditorOpen,
        openCookiePreferences,
        setCookiePreference,
        toggleTheme,
        currentYear,
        systemMessage,
        setSystemMessage,
        reportBug,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
