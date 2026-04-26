import {createContext, ReactNode, useContext, useEffect, useMemo, useState} from "react";
import {getVersionFromBe} from "@/utils";

const defaultContext = {
  beVersion: "",
  CURRENT_YEAR: 2026,
  isDark: false,
  toggleTheme: () => {},
};

type AppContextType = typeof defaultContext;

export function useAppContext() {
  return useContext(AppContext);
}

const AppContext = createContext<AppContextType>(defaultContext);

export function AppProvider({ children }: { children: ReactNode }) {
  const [isDark, setIsDark] = useState(false);
  const [beVersion, setBeVersion] = useState(defaultContext.beVersion);
  const CURRENT_YEAR = new Date().getFullYear();
  useEffect(() => {
    const storedTheme = window.localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const shouldUseDark = storedTheme ? storedTheme === "dark" : prefersDark;
    document.documentElement.classList.toggle("dark", shouldUseDark);
    setIsDark(shouldUseDark);
  }, []);

  function toggleTheme() {
    const next = !isDark;
    document.documentElement.classList.toggle("dark", next);
    window.localStorage.setItem("theme", next ? "dark" : "light");
    setIsDark(next);
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
            beVersion, isDark, toggleTheme, CURRENT_YEAR
          }}
      >
        {children}
      </AppContext.Provider>
  );
};