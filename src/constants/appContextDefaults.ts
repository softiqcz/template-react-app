import { APP_NAME, DEFAULT_YEAR } from "@/constants/app";
import {
  CookiePreferences,
  createCookiePreferences,
} from "@/utils/cookiePreferences";
import type { Dispatch, SetStateAction } from "react";

export type SystemMessage = {
  message: string;
  status: "success" | "error";
};

export type AppContextType = {
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

export const DEFAULT_COOKIE_PREFERENCES = createCookiePreferences({
  analyticalCookies: true,
  colorMode: "light",
  technicalCookies: true,
});

export const DEFAULT_APP_CONTEXT: AppContextType = {
  appName: APP_NAME,
  beVersion: "",
  currentYear: DEFAULT_YEAR,
  isDark: false,
  isInitialLoading: true,
  setIsInitialLoading: () => {},
  isCookiesAllowed: true,
  cookiePreferences: DEFAULT_COOKIE_PREFERENCES,
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
