import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import {getVersionFromBe, postFeatureProposal} from "@/utils";
import {
  ColorMode,
  CookiePreferences,
  createCookiePreferences,
  getCookiePreferences,
  saveCookiePreferences,
} from "@/utils/cookiePreferences";

type SystemMessage = {
  message: string;
  status: "success" | "error";
};

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
  systemMessage: SystemMessage;
  setSystemMessage: (message: SystemMessage) => void;
  reportBug: () => void;
};

const defaultCookiePreferences = createCookiePreferences({
  analyticalCookies: false,
  colorMode: "light",
  hasCookiePreference: false,
  technicalCookies: false,
});

const defaultContext: AppContextType = {
  appName: "Softiq React App",
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
  systemMessage: { message: "", status: "success" },
  setSystemMessage:() => {},
  reportBug: () => {},
};

export function useAppContext() {
  return useContext(AppContext);
}

const AppContext = createContext<AppContextType>(defaultContext);

export function AppProvider({ children }: { children: ReactNode }) {
  const [isDark, setIsDark] = useState(false);
  const [beVersion, setBeVersion] = useState(defaultContext.beVersion);
  const [systemMessage, setSystemMessage] = useState(defaultContext.systemMessage);
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
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const preferences = getCookiePreferences();
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const shouldUseDark = preferences?.colorMode
      ? preferences.colorMode === "dark"
      : prefersDark;

    if (preferences) {
      setCookiePreferences(preferences);
      setIsCookiesAllowed(preferences.isCookiesAllowed);
      setHasCookiePreference(preferences.hasCookiePreference);
    }

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
    (async () => {
      try {
        const response = await getVersionFromBe();
        setBeVersion(response.data.data.version);
      } catch {
        setBeVersion("unknown");
      }
    })();
  }, []);

  async function reportBug() {
  const payload = {"data": {"message": "get message from input"}}
    try {
  const response = await postFeatureProposal(payload);
      setSystemMessage({ message: response.data.data.message, status: "success" });
  } catch {
      setSystemMessage({ message: "Něco se porouchalo, napište nám na podporu", status: "error" });
  }
}
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
            currentYear,
            systemMessage,
            setSystemMessage,
            reportBug
          }}
      >
        {children}
      </AppContext.Provider>
  );
};
