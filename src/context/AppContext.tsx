"use client";

import {
  createContext,
  type ReactNode,
  useContext,
  useMemo,
  useState,
} from "react";

type AppContextType = {
  appName: string;
  setAppName: (appName: string) => void;
  feVersion: string;
};

const defaultContext: AppContextType = {
  appName: "Next.js Tailwind Template",
  setAppName: () => undefined,
  feVersion: "v0.0.1",
};

const AppContext = createContext<AppContextType>(defaultContext);

export function AppProvider({ children }: { children: ReactNode }) {
  const [appName, setAppName] = useState(defaultContext.appName);

  const value = useMemo(
    () => ({
      appName,
      setAppName,
      feVersion: defaultContext.feVersion,
    }),
    [appName],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  return useContext(AppContext);
}
