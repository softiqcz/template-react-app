export const COOKIE_PREFERENCES_KEY = "softiqPreferences";

const LEGACY_COOKIE_PREFERENCES_KEY = "cookiePreferences";

export type ColorMode = "light" | "dark";

export type CookiePreferences = {
  colorMode: ColorMode;
  hasCookiePreference: boolean;
  isCookiesAllowed: boolean;
  analyticalCookies: boolean;
  technicalCookies: boolean;
};

const DEFAULT_MAX_AGE = 60 * 60 * 24 * 365;

export function createCookiePreferences({
  analyticalCookies,
  colorMode = "light",
  hasCookiePreference = true,
  technicalCookies,
}: {
  analyticalCookies: boolean;
  colorMode?: ColorMode;
  hasCookiePreference?: boolean;
  technicalCookies: boolean;
}): CookiePreferences {
  return {
    colorMode,
    hasCookiePreference,
    isCookiesAllowed: analyticalCookies || technicalCookies,
    analyticalCookies,
    technicalCookies,
  };
}

function getCookieValue(name: string) {
  const cookie = document.cookie
    .split("; ")
    .find((item) => item.startsWith(`${name}=`));

  if (!cookie) {
    return null;
  }

  return decodeURIComponent(cookie.split("=").slice(1).join("="));
}

export function getCookiePreferences(): CookiePreferences | null {
  const value =
    getCookieValue(COOKIE_PREFERENCES_KEY) ??
    getCookieValue(LEGACY_COOKIE_PREFERENCES_KEY);

  if (!value) {
    return null;
  }

  try {
    const parsed = JSON.parse(value) as Partial<CookiePreferences>;

    if (typeof parsed.isCookiesAllowed !== "boolean") {
      return null;
    }

    return createCookiePreferences({
      analyticalCookies:
        typeof parsed.analyticalCookies === "boolean"
          ? parsed.analyticalCookies
          : parsed.isCookiesAllowed,
      technicalCookies:
        typeof parsed.technicalCookies === "boolean"
          ? parsed.technicalCookies
          : parsed.isCookiesAllowed,
      colorMode: parsed.colorMode === "dark" ? "dark" : "light",
      hasCookiePreference:
        typeof parsed.hasCookiePreference === "boolean"
          ? parsed.hasCookiePreference
          : true,
    });
  } catch {
    return null;
  }
}

export function saveCookiePreferences(preferences: CookiePreferences) {
  document.cookie = `${COOKIE_PREFERENCES_KEY}=${encodeURIComponent(
    JSON.stringify(preferences),
  )}; path=/; max-age=${DEFAULT_MAX_AGE}; SameSite=Lax`;
}
