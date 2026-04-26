import { toast } from "sonner";

const baseURL = "http://svemar03.local:5000/api/v2";
// const baseURL = "http://localhost:8080/api/v2";

// 1) Generic request function types
type Method = "GET" | "POST" | "PUT" | "DELETE";

interface RequestOptions {
    path: string;
    method: Method;
    data?: Record<string, any>;
    params?: Record<string, any>;
    token?: string;
    useToast?: boolean;
    loadingMessage?: string;
}

const DEFAULT_ERROR_MESSAGE = "Něco se pokazilo";

export const dismissToastLater = (toastId: string | number) => {
    setTimeout(() => toast.dismiss(toastId), 3000);
};

const buildURL = (path: string, params?: Record<string, any>) => {
    const url = new URL(`${baseURL}${path}`);
    if (params) {
        Object.entries(params).forEach(([key, value]) =>
            url.searchParams.append(key, String(value))
        );
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

const showResponseToast = (
    status: number,
    data: any,
    toastId?: string | number,
    fallbackErrorMessage = DEFAULT_ERROR_MESSAGE
) => {
    const message = data?.message;
    if (status >= 200 && status < 300) {
        toast.success(message || "Hotovo");
    } else {
        toast.error(message || fallbackErrorMessage);
    }
    if (toastId !== undefined) dismissToastLater(toastId);
};

const showThrownErrorToast = (
    error: any,
    toastId?: string | number,
    fallbackErrorMessage = DEFAULT_ERROR_MESSAGE
) => {
    toast.error(error?.message || fallbackErrorMessage);
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
    } catch (error: any) {
        console.error(`API ${method} ${path} failed:`, error);
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
    } catch (error: any) {
        console.error(`API ${method} ${path} failed:`, error);
        if (useToast) showThrownErrorToast(error, toastId);
        throw error;
    }
};

// 4) Specific API endpoints
export const getVersionFromBe = () =>
    apiRequestNoAuth({ path: "/public/version", method: "GET", useToast:true, loadingMessage:"Načítá se aplikace..." });

export const postFeatureProposal = (payload: Record<string, any>) =>
    apiRequestNoAuth({
        path: "/user/utils/support/request",
        method: "POST",
        data: payload,
        useToast: true,
        loadingMessage: "Odesílá se zpráva na podporu...",
    });