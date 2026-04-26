"use client";

import {
  createContext,
  type ReactNode,
  useContext,
  useMemo,
  useState,
} from "react";

type SessionContextType = {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
};

const defaultContext: SessionContextType = {
  isLoading: false,
  setIsLoading: () => undefined,
};

const SessionContext = createContext<SessionContextType>(defaultContext);

export function SessionProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(defaultContext.isLoading);

  const value = useMemo(
    () => ({
      isLoading,
      setIsLoading,
    }),
    [isLoading],
  );

  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  );
}

export function useSessionContext() {
  return useContext(SessionContext);
}
