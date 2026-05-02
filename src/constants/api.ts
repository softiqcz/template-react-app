export const API_BASE_URL = "http://svemar03.local:5000/api/v2";
export const DEFAULT_ERROR_MESSAGE = "Něco se pokazilo";
export const DEFAULT_SUCCESS_MESSAGE = "Hotovo";
export const TOAST_DISMISS_DELAY_MS = 3000;

export const API_ENDPOINTS = {
  CONTACT: "/public/contact",
  SUPPORT_REQUEST: "/user/utils/support/request",
  VERSION: "/public/version",
} as const;

export const API_LOADING_MESSAGES = {
  CONTACT: "Odesílá se zpráva z konktaktního formuláře...",
  SUPPORT_REQUEST: "Odesílá se zpráva na podporu...",
  VERSION: "Načítá se aplikace...",
} as const;
