import type { Language } from "@/i18n/translations";

export type Review = {
  author: string;
  text: Record<Language, string>;
};

export const REVIEW_AUTOPLAY_DELAY_MS = 4500;
export const REVIEW_RATING = 5;
export const REVIEWS_URL = "https://www.firmy.cz/";

export const REVIEW_ITEMS: Review[] = [
  {
    author: "Anna",
    text: {
      cs: "Nasazení bylo rychlé, přehledné a bez zbytečných komplikací. Tým si šablonu dokázal upravit během jednoho odpoledne.",
      en: "The setup was fast, clear, and free of unnecessary friction. Our team adapted the template in a single afternoon.",
    },
  },
  {
    author: "Martin",
    text: {
      cs: "Oceňujeme čistou strukturu a rozumné výchozí komponenty. Projekt působí připraveně pro skutečnou produkční práci.",
      en: "We appreciate the clean structure and sensible default components. The project feels ready for real production work.",
    },
  },
  {
    author: "Lucie",
    text: {
      cs: "Uživatelské rozhraní je jednoduché, rychlé a dobře čitelné. Přesně takový základ jsme pro interní aplikaci potřebovali.",
      en: "The interface is simple, fast, and easy to scan. It was exactly the kind of foundation we needed for an internal app.",
    },
  },
  {
    author: "Petr",
    text: {
      cs: "Design drží profesionální tón a zároveň nezdržuje vývoj. Výborný start pro SaaS prototyp i menší firemní portál.",
      en: "The design keeps a professional tone without slowing development. A strong start for a SaaS prototype or company portal.",
    },
  },
  {
    author: "Eva",
    text: {
      cs: "Komponenty mají dobrý rytmus, fungují na mobilu a není potřeba je celé přepisovat. To se u šablon nestává často.",
      en: "The components have good rhythm, work on mobile, and do not need to be rewritten from scratch. That is rare in templates.",
    },
  },
  {
    author: "Tomáš",
    text: {
      cs: "Kód je přímočarý a snadno se čte. Nový vývojář v týmu se v projektu zorientoval během prvního dne.",
      en: "The code is straightforward and easy to read. A new developer on our team found their way around on day one.",
    },
  },
  {
    author: "Nikola",
    text: {
      cs: "Stránka působí důvěryhodně a moderně. Oceňujeme, že vizuál není přeplácaný a obsah má dost prostoru.",
      en: "The page feels trustworthy and modern. We value that the visuals are not overdone and the content has room to breathe.",
    },
  },
  {
    author: "Daniel",
    text: {
      cs: "Dostali jsme pevný technický základ, který jde dobře rozšiřovat. Přechod od prototypu k aplikaci byl plynulý.",
      en: "We got a solid technical base that scales well. Moving from prototype to application was smooth.",
    },
  },
];
