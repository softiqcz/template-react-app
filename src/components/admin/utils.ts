import type { AdminData, OriginStat, Row } from "./types";

export const collator = new Intl.Collator("cs", {
  numeric: true,
  sensitivity: "base",
});
const columnLabels: Record<string, string> = {
  id: "ID",
  adress: "Adresa",
  address: "Adresa",
  createddt: "Vytvořeno",
  email: "E-mail",
  isreported: "Nahlášeno",
  name: "Jméno",
  note: "Poznámka",
  origin: "Zdroj",
  phone: "Telefon",
  prk: "PRK",
  whentocall: "Kdy volat",
  information: "Informace",
  nextstep: "Další postup",
  source: "Zdroj",
  regioncity: "Kraj/Město",
  updateddt: "Aktualizováno",
  exportovanodocdfp: "Expo…",
  role: "Role",
  assignedto: "Přiřazeno",
};

export function formatValue(value: unknown) {
  if (value == null) return "";
  return typeof value === "object" ? JSON.stringify(value) : String(value);
}
export function normalizedKey(value: string) {
  return value.toLocaleLowerCase("en").replace(/[^a-z0-9]/g, "");
}
export function agentUpdateField(column: string) {
  const fields: Record<string, string> = {
    whentocall: "whenToCall",
    nextstep: "nextStep",
    regioncity: "regionCity",
    assignedto: "assignedTo",
    isreported: "isReported",
    createddt: "createdDt",
    updateddt: "updatedDt",
  };
  const key = normalizedKey(column);
  return fields[key] ?? key;
}
export function formatColumnLabel(column: string) {
  return columnLabels[normalizedKey(column)] ?? column;
}
export function formatTableValue(column: string, value: unknown) {
  const key = normalizedKey(column);
  if (
    (key === "createddt" || key === "updateddt") &&
    typeof value === "string"
  ) {
    const match = value.match(/^(\d{4})-(\d{2})-(\d{2})/);
    if (match) return `${Number(match[3])}.${Number(match[2])}.${match[1]}`;
  }
  return formatValue(value);
}
function findColumn(row: Row, candidates: string[]) {
  const keys = new Set(candidates.map(normalizedKey));
  return Object.keys(row).find((key) => keys.has(normalizedKey(key)));
}
function parseDate(value: unknown) {
  if (typeof value !== "string" && typeof value !== "number") return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}
export function formatDate(value: Date | null) {
  if (!value) return "—";
  const today = new Date();
  const valueDay = Date.UTC(
    value.getFullYear(),
    value.getMonth(),
    value.getDate(),
  );
  const todayDay = Date.UTC(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
  );
  const daysAgo = Math.round((todayDay - valueDay) / 86_400_000);
  if (daysAgo === 0) return "Dnes";
  if (daysAgo === 1) return "Včera";
  return `${value.getDate()}.${value.getMonth() + 1}.${value.getFullYear()}`;
}
export function buildOriginStats(data: AdminData) {
  const stats = new Map<string, OriginStat>();
  [...data.agents, ...data.subjects].forEach((row) => {
    const originColumn = findColumn(row, [
      "origin",
      "source",
      "sourceOrigin",
      "domain",
      "website",
    ]);
    if (!originColumn) return;
    const origin = formatValue(row[originColumn]).trim();
    if (!origin) return;
    const dateColumn = findColumn(row, [
      "created_dt",
      "createdAt",
      "createdDate",
    ]);
    const foundAt = dateColumn ? parseDate(row[dateColumn]) : null;
    const current = stats.get(origin);
    stats.set(origin, {
      origin,
      count: (current?.count ?? 0) + 1,
      lastScrapedAt:
        foundAt && (!current?.lastScrapedAt || foundAt > current.lastScrapedAt)
          ? foundAt
          : (current?.lastScrapedAt ?? null),
    });
  });
  return Array.from(stats.values()).sort((a, b) =>
    collator.compare(a.origin, b.origin),
  );
}
