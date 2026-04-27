"use client";

import {
  ChartBarIcon,
  ChevronDownIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useAppContext } from "@/context/AppContext";
import { useLanguage } from "@/context/LanguageContext";
import { createCookiePreferences } from "@/utils/cookiePreferences";

export function CookieBanner() {
  const { t } = useLanguage();
  const copy = t.cookieBanner;
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [selectedCookies, setSelectedCookies] = useState({
    analyticalCookies: true,
    technicalCookies: true,
  });
  const {
    cookiePreferences,
    hasCookiePreference,
    isCookiePreferenceEditorOpen,
    isCookiePreferenceLoaded,
    setCookiePreference,
  } = useAppContext();

  useEffect(() => {
    setSelectedCookies({
      analyticalCookies: cookiePreferences.analyticalCookies,
      technicalCookies: cookiePreferences.technicalCookies,
    });
  }, [cookiePreferences]);

  useEffect(() => {
    if (isCookiePreferenceEditorOpen) {
      setIsDetailsOpen(false);
    }
  }, [isCookiePreferenceEditorOpen]);

  if (
    !isCookiePreferenceLoaded ||
    (hasCookiePreference && !isCookiePreferenceEditorOpen)
  ) {
    return null;
  }

  function saveSelectedCookies() {
    setCookiePreference(createCookiePreferences(selectedCookies));
  }

  function rejectCookies() {
    setCookiePreference(
      createCookiePreferences({
        analyticalCookies: false,
        technicalCookies: false,
      }),
    );
  }

  function acceptAllCookies() {
    setCookiePreference(
      createCookiePreferences({
        analyticalCookies: true,
        technicalCookies: true,
      }),
    );
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 p-4">
      <div className="site-container px-0">
        <div className="ui-card">
          <div className="ui-card-content flex flex-col gap-4 pt-6">
            <div className="flex flex-wrap items-center gap-3">
              <p className="ui-card-description flex-1 min-w-0">
                {copy.message}
              </p>
              <Button
                aria-expanded={isDetailsOpen}
                className="inline-flex items-center gap-1 text-sm font-medium text-foreground shrink-0"
                type="button"
                variant="ghost"
                onClick={() => setIsDetailsOpen((current) => !current)}
              >
                {copy.more}
                <ChevronDownIcon
                  aria-hidden="true"
                  className={`h-4 w-4 transition-transform ${isDetailsOpen ? "rotate-180" : ""}`}
                />
              </Button>
              <Button type="button" variant="outline" onClick={rejectCookies}>
                {copy.reject}
              </Button>
              <Button
                type="button"
                onClick={isDetailsOpen ? saveSelectedCookies : acceptAllCookies}
              >
                {isDetailsOpen ? copy.saveSelection : copy.acceptAll}
              </Button>
            </div>

            {isDetailsOpen ? (
              <div className="grid gap-3 border-t pt-4 sm:grid-cols-2">
                <div className="flex gap-3">
                  <Checkbox
                    id="analytical-cookies"
                    checked={selectedCookies.analyticalCookies}
                    className="mt-0.5"
                    onCheckedChange={(checked) =>
                      setSelectedCookies((current) => ({
                        ...current,
                        analyticalCookies: checked === true,
                      }))
                    }
                  />
                  <ChartBarIcon
                    aria-hidden="true"
                    className="h-5 w-5 shrink-0 text-muted-foreground"
                  />
                  <label
                    className="ui-card-description"
                    htmlFor="analytical-cookies"
                  >
                    {copy.analytical}
                  </label>
                </div>
                <div className="flex gap-3">
                  <Checkbox
                    id="technical-cookies"
                    checked={selectedCookies.technicalCookies}
                    className="mt-0.5"
                    onCheckedChange={(checked) =>
                      setSelectedCookies((current) => ({
                        ...current,
                        technicalCookies: checked === true,
                      }))
                    }
                  />
                  <Cog6ToothIcon
                    aria-hidden="true"
                    className="h-5 w-5 shrink-0 text-muted-foreground"
                  />
                  <label
                    className="ui-card-description"
                    htmlFor="technical-cookies"
                  >
                    {copy.technical}
                  </label>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
