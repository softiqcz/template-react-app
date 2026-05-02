"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";

import {
  BACKEND_VERSION_FALLBACK,
  INITIAL_LOADING_TIMEOUT_MS,
} from "@/constants/app";
import { getVersionFromBe } from "@/utils";

type BackendVersionState = {
  beVersion: string;
  isInitialLoading: boolean;
  setIsInitialLoading: Dispatch<SetStateAction<boolean>>;
};

export function useBackendVersion(initialVersion = ""): BackendVersionState {
  const [beVersion, setBeVersion] = useState(initialVersion);
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  useEffect(() =>  {
    let isMounted = true;
    const loadingTimeout = window.setTimeout(() => {
      if (!isMounted) {
        return;
      }

      setBeVersion((version) => version || BACKEND_VERSION_FALLBACK);
      setIsInitialLoading(false);
    }, INITIAL_LOADING_TIMEOUT_MS);

    (async () => {
      try {
        const response = await getVersionFromBe();
        if (!isMounted) {
          return;
        }

        setBeVersion(response.data.data.version);
      } catch {
        if (!isMounted) {
          return;
        }

        setBeVersion(BACKEND_VERSION_FALLBACK);
      } finally {
        if (isMounted) {
          window.clearTimeout(loadingTimeout);
          setIsInitialLoading(false);
        }
      }
    })();

    return () => {
      isMounted = false;
      window.clearTimeout(loadingTimeout);
    };
  }, []);

  useEffect(() => {
    function handlePageShow(event: PageTransitionEvent) {
      if (event.persisted) {
        setIsInitialLoading(false);
      }
    }

    window.addEventListener("pageshow", handlePageShow);

    return () => {
      window.removeEventListener("pageshow", handlePageShow);
    };
  }, []);

  return { beVersion, isInitialLoading, setIsInitialLoading };
}
