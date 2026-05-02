"use client";

import {
  ChartBarIcon,
  ChevronDownIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

import { CookieOption } from "@/components/layout/cookie/CookieOption";
import { Button } from "@/components/ui/button";
import { useAppContext } from "@/context/AppContext";
import { useLanguage } from "@/context/LanguageContext";
import { createCookiePreferences } from "@/utils/cookiePreferences";

export function CookieBanner() {
  const { t } = useLanguage();
  const cookieBanner = t.cookieBanner;
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
                {cookieBanner.message}
              </p>
              <Button
                aria-expanded={isDetailsOpen}
                className="inline-flex items-center gap-1 text-sm font-medium text-foreground shrink-0"
                type="button"
                variant="ghost"
                onClick={() => setIsDetailsOpen((current) => !current)}
              >
                {cookieBanner.more}
                <ChevronDownIcon
                  aria-hidden="true"
                  className={`h-4 w-4 transition-transform ${isDetailsOpen ? "rotate-180" : ""}`}
                />
              </Button>
              <Button type="button" variant="outline" onClick={rejectCookies}>
                {cookieBanner.reject}
              </Button>
              <Button
                type="button"
                onClick={isDetailsOpen ? saveSelectedCookies : acceptAllCookies}
              >
                {isDetailsOpen
                  ? cookieBanner.saveSelection
                  : cookieBanner.acceptAll}
              </Button>
            </div>

            {isDetailsOpen ? (
              <div className="grid gap-3 border-t pt-4 sm:grid-cols-2">
                <CookieOption
                  id="analytical-cookies"
                  checked={selectedCookies.analyticalCookies}
                  description={cookieBanner.analytical}
                  icon={ChartBarIcon}
                  onCheckedChange={(checked) =>
                    setSelectedCookies((current) => ({
                      ...current,
                      analyticalCookies: checked,
                    }))
                  }
                />
                <CookieOption
                  id="technical-cookies"
                  checked={selectedCookies.technicalCookies}
                  description={cookieBanner.technical}
                  icon={Cog6ToothIcon}
                  onCheckedChange={(checked) =>
                    setSelectedCookies((current) => ({
                      ...current,
                      technicalCookies: checked,
                    }))
                  }
                />
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
