"use client";

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

import {
  DEFAULT_APP_CONTEXT,
  type AppContextType,
} from "@/constants/appContextDefaults";
import { useLanguage } from "@/context/LanguageContext";
import { useBackendVersion } from "@/hooks/useBackendVersion";
import { useCookiePreferenceState } from "@/hooks/useCookiePreferenceState";
import { postFeatureProposal } from "@/utils";

export function useAppContext() {
  return useContext(AppContext);
}

const AppContext = createContext<AppContextType>(DEFAULT_APP_CONTEXT);

export function AppProvider({ children }: { children: ReactNode }) {
  const { t } = useLanguage();
  const { beVersion, isInitialLoading, setIsInitialLoading } =
    useBackendVersion(DEFAULT_APP_CONTEXT.beVersion);
  const {
    cookiePreferences,
    hasCookiePreference,
    isCookiePreferenceEditorOpen,
    isCookiePreferenceLoaded,
    isCookiesAllowed,
    isDark,
    openCookiePreferences,
    setCookiePreference,
    toggleTheme,
  } = useCookiePreferenceState(DEFAULT_APP_CONTEXT.cookiePreferences);
  const [systemMessage, setSystemMessage] = useState(
    DEFAULT_APP_CONTEXT.systemMessage,
  );
  const currentYear = useMemo(() => new Date().getFullYear(), []);

  const reportBug = useCallback(
    async (message: string) => {
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
    },
    [t.common.genericSupportError],
  );

  const contextValue = useMemo(
    () => ({
      appName: DEFAULT_APP_CONTEXT.appName,
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
    }),
    [
      beVersion,
      cookiePreferences,
      currentYear,
      hasCookiePreference,
      isCookiePreferenceEditorOpen,
      isCookiePreferenceLoaded,
      isCookiesAllowed,
      isDark,
      isInitialLoading,
      openCookiePreferences,
      reportBug,
      setIsInitialLoading,
      setCookiePreference,
      systemMessage,
      toggleTheme,
    ],
  );

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
}
