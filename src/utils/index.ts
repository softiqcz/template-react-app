import { toast } from "sonner";

import {
  API_BASE_URL,
  API_ENDPOINTS,
  API_LOADING_MESSAGES,
  DEFAULT_ERROR_MESSAGE,
  DEFAULT_SUCCESS_MESSAGE,
  TOAST_DISMISS_DELAY_MS,
} from "@/constants/api";

// 1) Generic request function types
type Method = "GET" | "POST" | "PUT" | "DELETE";

interface RequestOptions {
  path: string;
  method: Method;
  data?: Record<string, unknown>;
  params?: Record<string, string | number | boolean>;
  token?: string;
  useToast?: boolean;
  loadingMessage?: string;
}

export const dismissToastLater = (toastId: string | number) => {
  setTimeout(() => toast.dismiss(toastId), TOAST_DISMISS_DELAY_MS);
};

const buildURL = (path: string, params?: RequestOptions["params"]) => {
  const url = new URL(`${API_BASE_URL}${path}`);
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) url.searchParams.append(key, String(value));
    });
  }
  return url.toString();
};

const parseResponse = async (res: Response) => {
  const text = await res.text();
  try {
    return { status: res.status, data: JSON.parse(text) };
  } catch {
    return { status: res.status, data: { message: text } };
  }
};

const getResponseMessage = (data: unknown) =>
  typeof data === "object" &&
  data !== null &&
  "message" in data &&
  typeof data.message === "string"
    ? data.message
    : undefined;

const getErrorMessage = (error: unknown) =>
  error instanceof Error ? error.message : undefined;

const showResponseToast = (
  status: number,
  data: unknown,
  toastId?: string | number,
  fallbackErrorMessage = DEFAULT_ERROR_MESSAGE,
) => {
  const message = getResponseMessage(data);
  if (status >= 200 && status < 300) {
    toast.success(message || DEFAULT_SUCCESS_MESSAGE);
  } else {
    toast.error(message || fallbackErrorMessage);
  }
  if (toastId !== undefined) dismissToastLater(toastId);
};

const showThrownErrorToast = (
  error: unknown,
  toastId?: string | number,
  fallbackErrorMessage = DEFAULT_ERROR_MESSAGE,
) => {
  toast.error(getErrorMessage(error) || fallbackErrorMessage);
  if (toastId !== undefined) dismissToastLater(toastId);
};

// 2) Unauthenticated request
export const apiRequestNoAuth = async ({
  path,
  method,
  data,
  params,
  useToast = false,
  loadingMessage,
}: RequestOptions) => {
  const toastId = useToast ? toast.loading(loadingMessage) : undefined;

  try {
    const res = await fetch(buildURL(path, params), {
      method,
      headers: { "Content-Type": "application/json" },
      body: data ? JSON.stringify(data) : undefined,
    });

    const { status, data: resData } = await parseResponse(res);
    if (useToast) showResponseToast(status, resData, toastId);
    return { status, data: resData };
  } catch (error: unknown) {
    if (useToast) showThrownErrorToast(error, toastId);
    throw error;
  }
};

// 3) Authenticated request with Bearer token
export const apiRequest = async ({
  path,
  method,
  data,
  params,
  token,
  useToast = false,
  loadingMessage,
}: RequestOptions) => {
  const toastId = useToast ? toast.loading(loadingMessage) : undefined;

  try {
    const res = await fetch(buildURL(path, params), {
      method,
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: data ? JSON.stringify(data) : undefined,
    });

    const { status, data: resData } = await parseResponse(res);
    if (useToast) showResponseToast(status, resData, toastId);
    return { status, data: resData };
  } catch (error: unknown) {
    if (useToast) showThrownErrorToast(error, toastId);
    throw error;
  }
};

// 4) Specific API endpoints
export const getVersionFromBe = () =>
  apiRequestNoAuth({
    path: API_ENDPOINTS.VERSION,
    method: "GET",
    useToast: true,
    loadingMessage: API_LOADING_MESSAGES.VERSION,
  });

export const postContactMessage = (
  payload: NonNullable<RequestOptions["data"]>,
) =>
  apiRequestNoAuth({
    path: API_ENDPOINTS.CONTACT,
    method: "POST",
    data: payload,
    useToast: true,
    loadingMessage: API_LOADING_MESSAGES.CONTACT,
  });

export const postFeatureProposal = (
  payload: NonNullable<RequestOptions["data"]>,
) =>
  apiRequestNoAuth({
    path: API_ENDPOINTS.SUPPORT_REQUEST,
    method: "POST",
    data: payload,
    useToast: true,
    loadingMessage: API_LOADING_MESSAGES.SUPPORT_REQUEST,
  });
