export type Language = "cs" | "en";

export const LANGUAGE_STORAGE_KEY = "softiqLanguage";

export const languages: Array<{
  code: Language;
  flag: string;
  label: string;
  shortLabel: string;
}> = [
  { code: "cs", flag: "🇨🇿", label: "Čeština", shortLabel: "CZ" },
  { code: "en", flag: "🇬🇧", label: "English", shortLabel: "EN" },
];

type TranslationPair = readonly [english: string, czech: string];
type TranslationSource = {
  readonly [key: string]: TranslationPair | TranslationSource;
};

type TranslationTree<T> = T extends TranslationPair
  ? string
  : {
      readonly [Key in keyof T]: TranslationTree<T[Key]>;
    };

const translationPairs = {
  common: {
    close: ["Close", "Zavřít"],
    genericSupportError: [
      "Something went wrong. Please contact support.",
      "Něco se porouchalo, napište nám na podporu",
    ],
    softiq: ["softIQ", "softIQ"],
  },
  cookieBanner: {
    acceptAll: ["Accept all", "Přijmout vše"],
    analytical: [
      "We use analytics cookies to understand traffic, campaigns, and conversions.",
      "Používáme analytické cookies, ať máme přehled o návštěvnosti, kampaních a konverzi.",
    ],
    message: [
      "We use cookies to keep the website working properly.",
      "Pro správné fungování webu používáme cookies.",
    ],
    more: ["More", "Více"],
    reject: ["Reject", "Odmítnout"],
    saveSelection: ["Save selection", "Uložit výběr"],
    technical: [
      "Technical cookies are required for the website to work correctly. They allow us to keep entered data or cart contents so you do not need to enter everything again on your next visit.",
      "Technické cookies jsou nezbytné pro správné fungování webových stránek. Umožňují například ukládání vyplněných údajů nebo obsahu košíku, takže při další návštěvě nemusíte vše zadávat znovu.",
    ],
  },
  home: {
    primaryAction: ["Get started", "Začít"],
    secondaryAction: ["View components", "Zobrazit komponenty"],
    subtitle: [
      "This template is intentionally small: app router, TypeScript, Tailwind CSS, and shadcn-style components.",
      "Tato šablona je záměrně malá: app router, TypeScript, Tailwind CSS a komponenty ve stylu shadcn.",
    ],
    title: [
      "Start clean, then make it yours.",
      "Začněte čistě a upravte si aplikaci podle sebe.",
    ],
    form: {
      description: [
        "A tiny component sample for your next project.",
        "Malá ukázka komponent pro váš další projekt.",
      ],
      nameLabel: ["Project name", "Název projektu"],
      namePlaceholder: ["My next app", "Moje další aplikace"],
      notesLabel: ["Notes", "Poznámky"],
      notesPlaceholder: ["What are you building?", "Co budete stavět?"],
      readyLabel: ["Ready to customize", "Připraveno k úpravám"],
      title: ["Starter Form", "Startovací formulář"],
    },
  },
  navbar: {
    bugReport: ["Report a bug", "Nahlásit chybu"],
    cookies: ["Cookie settings", "Nastavení cookies"],
    language: ["Language", "Jazyk"],
    navItems: {
      components: ["Components", "Komponenty"],
      docs: ["Docs", "Dokumentace"],
      home: ["Home", "Domů"],
    },
    settings: ["Settings", "Nastavení"],
    themeMode: {
      dark: ["Dark mode", "Tmavý režim"],
      light: ["Light mode", "Světlý režim"],
      toggle: ["Toggle dark mode", "Přepnout tmavý režim"],
    },
    toggleMenu: ["Toggle navigation menu", "Přepnout navigační menu"],
  },
  reportBug: {
    cancel: ["Cancel", "Zrušit"],
    close: ["Close bug report", "Zavřít hlášení chyby"],
    description: [
      "Tell us what went wrong. We will review it and fix it so it does not happen again.",
      "Řekněte nám, co se nepovedlo. My se na to podíváme a opravíme, aby se to příště nestalo.",
    ],
    messageLabel: ["Message", "Zpráva"],
    placeholder: ["Your message", "Vaše zpráva"],
    submit: ["Send", "Odeslat"],
    title: ["Report a bug", "Nahlaste nám chybu"],
  },
} as const satisfies TranslationSource;

function resolveTranslations<T extends TranslationSource>(
  source: T,
  language: Language,
): TranslationTree<T> {
  const languageIndex = language === "en" ? 0 : 1;
  const result: Record<string, unknown> = {};

  Object.entries(source).forEach(([key, value]) => {
    result[key] = isTranslationPair(value)
      ? value[languageIndex]
      : resolveTranslations(value, language);
  });

  return result as TranslationTree<T>;
}

function isTranslationPair(
  value: TranslationPair | TranslationSource,
): value is TranslationPair {
  return Array.isArray(value);
}

export const translations = {
  cs: resolveTranslations(translationPairs, "cs"),
  en: resolveTranslations(translationPairs, "en"),
};
