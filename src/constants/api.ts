// export const API_BASE_URL = "http://localhost:8080/api/v2";
export const API_BASE_URL = "http://svemar04.local:5003/api/v2";

export const API_ENDPOINTS = {
  AUTH_LOGIN: "/public/auth/login",
  AUTH_VERIFY: "/public/auth/verify",
  ADMIN_AGENTS_GET: "/admin/data/agents/get",
  ADMIN_AGENT_UPDATE: "/admin/data/agents/update",
  ADMIN_AGENT_ASSIGNMENT: "/admin/data/agents/assigned-to",
  ADMIN_AGENT_ASSIGNMENT_BULK: "/admin/data/agents/assigned-to/bulk",
  ADMIN_SUBJECTS_GET: "/admin/data/subjects/get",
  ADMIN_ALL_DATA: "/admin/data/all/get",
  ADMIN_UTILS: "/admin/data/utils/get",
  ADMIN_USERS_GET: "/admin/users/get",
  ADMIN_USERS_GET_ONE: "/admin/users/single",
  ADMIN_USERS_CREATE: "/admin/users/create",
  ADMIN_USERS_UPDATE: "/admin/users/update",
  ADMIN_USERS_CHANGE_PASSWORD: "/admin/users/change-password",
  ADMIN_USERS_DELETE: "/admin/users/delete",
  USER_ASSIGNED_AGENTS_GET: "/user/data/agents/get",
  USER_AGENT_UPDATE: "/user/data/agents/update",
  CONTACT: "/public/contact",
  SUPPORT_REQUEST: "/user/utils/support/request",
  VERSION: "/public/version",
} as const;

export const DEFAULT_ERROR_MESSAGE = "Něco se pokazilo";
export const DEFAULT_SUCCESS_MESSAGE = "Hotovo";
export const TOAST_DISMISS_DELAY_MS = 3000;
export const API_LOADING_MESSAGES = {
  CONTACT: "Odesílá se zpráva...",
  SUPPORT_REQUEST: "Odesílá se zpráva na podporu...",
  VERSION: "Načítá se aplikace...",
} as const;
