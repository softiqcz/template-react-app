export const COOKIE_PREFERENCES_KEY = "softiqPreferences";

const LEGACY_COOKIE_PREFERENCES_KEY = "cookiePreferences";

export type ColorMode = "light" | "dark";

export type CookiePreferences = {
  colorMode?: ColorMode;
  hasCookiePreference: boolean;
  isCookiesAllowed: boolean;
  analyticalCookies: boolean;
  technicalCookies: boolean;
};

export function createCookiePreferences({
  analyticalCookies,
  hasCookiePreference = true,
  colorMode,
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

function getStoredValue(name: string) {
  const value = window.localStorage.getItem(name);

  if (value) {
    return value;
  }

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
    getStoredValue(COOKIE_PREFERENCES_KEY) ??
    getStoredValue(LEGACY_COOKIE_PREFERENCES_KEY);

  if (!value) {
    return null;
  }

  try {
    const parsed = JSON.parse(value) as Partial<CookiePreferences>;

    if (typeof parsed.isCookiesAllowed !== "boolean") {
      return null;
    }

    const technicalCookies =
      typeof parsed.technicalCookies === "boolean"
        ? parsed.technicalCookies
        : parsed.isCookiesAllowed;

    const preferences = createCookiePreferences({
      analyticalCookies:
        typeof parsed.analyticalCookies === "boolean"
          ? parsed.analyticalCookies
          : parsed.isCookiesAllowed,
      technicalCookies,
      colorMode:
        parsed.colorMode === "dark"
          ? "dark"
          : parsed.colorMode === "light"
            ? "light"
            : undefined,
      hasCookiePreference:
        typeof parsed.hasCookiePreference === "boolean"
          ? parsed.hasCookiePreference
          : true,
    });

    window.localStorage.setItem(
      COOKIE_PREFERENCES_KEY,
      JSON.stringify(preferences),
    );

    if (getStoredValue(LEGACY_COOKIE_PREFERENCES_KEY)) {
      document.cookie = `${LEGACY_COOKIE_PREFERENCES_KEY}=; path=/; max-age=0; SameSite=Lax`;
    }

    return preferences;
  } catch {
    return null;
  }
}

export function saveCookiePreferences(preferences: CookiePreferences) {
  window.localStorage.setItem(
    COOKIE_PREFERENCES_KEY,
    JSON.stringify(preferences),
  );
}
