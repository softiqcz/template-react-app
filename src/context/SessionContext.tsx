"use client";
import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { toast } from "sonner";
import { API_BASE_URL, API_ENDPOINTS } from "@/constants/api";

export type AuthUser = { email: string; role: string; token: string };
type SessionValue = {
  user: AuthUser | null;
  isAuthLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
};
const SessionContext = createContext<SessionValue | null>(null);

export function SessionProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(false);
  const login = useCallback(async (email: string, password: string) => {
    setIsAuthLoading(true);
    try {
      const response = await fetch(
        `${API_BASE_URL}${API_ENDPOINTS.AUTH_LOGIN}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        },
      );
      const payload = await response.json();
      const authenticatedUser = payload.data as AuthUser | undefined;
      const nextUser = authenticatedUser
        ? {
            ...authenticatedUser,
            email,
            role: authenticatedUser.role.replace(/^ROLE_/, ""),
          }
        : undefined;
      if (
        !response.ok ||
        !nextUser?.token ||
        !["ADMIN", "USER"].includes(nextUser.role)
      ) {
        toast.error("Neplatné přihlašovací údaje.");
        return false;
      }

      const verifyResponse = await fetch(
        `${API_BASE_URL}${API_ENDPOINTS.AUTH_VERIFY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: nextUser.email,
            token: nextUser.token,
          }),
        },
      );
      const verifyPayload = await verifyResponse.json().catch(() => null);
      const verifiedToken = verifyPayload?.data?.token;
      if (!verifyResponse.ok || typeof verifiedToken !== "string") {
        toast.error("Platnost přihlášení se nepodařilo ověřit.");
        return false;
      }

      const verifiedUser = { ...nextUser, token: verifiedToken };
      const cookieResponse = await fetch("/session/login", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: verifiedUser.email,
          token: verifiedUser.token,
        }),
      });
      if (!cookieResponse.ok) throw new Error();
      setUser(verifiedUser);
      return true;
    } catch {
      toast.error("Přihlášení se nepodařilo.");
      return false;
    } finally {
      setIsAuthLoading(false);
    }
  }, []);
  const logout = useCallback(async () => {
    await fetch("/session/logout", { method: "POST" });
    setUser(null);
    window.location.assign("/");
  }, []);
  const value = useMemo(
    () => ({ user, isAuthLoading, login, logout }),
    [user, isAuthLoading, login, logout],
  );
  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  );
}

export function useSession() {
  const value = useContext(SessionContext);
  if (!value) throw new Error("useSession must be used inside SessionProvider");
  return value;
}
