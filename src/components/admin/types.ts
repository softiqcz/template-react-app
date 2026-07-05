export type Row = Record<string, unknown>;
export type DataSet = "agents" | "subjects";
export type View = DataSet | "statistics" | "management";
export type AdminData = Record<DataSet, Row[]>;
export type OriginStat = {
  origin: string;
  count: number;
  lastScrapedAt: Date | null;
};
export type SortState = {
  dataSet: DataSet;
  column: string;
  direction: "ascending" | "descending";
};

export const labels: Record<View, string> = {
  agents: "Agenti",
  subjects: "Subjekty",
  statistics: "Statistiky",
  management: "Správa uživatelů",
};
export const views: View[] = ["agents", "subjects", "statistics", "management"];
export const ROWS_PER_PAGE = 20;

export const AGENT_COLUMNS = [
  "id",
  "name",
  "email",
  "phone",
  "adress",
  "role",
  "origin",
  "note",
  "prk",
  "when_to_call",
  "information",
  "next_step",
  "source",
  "region_city",
  "assigned_to",
  "is_reported",
  "created_dt",
  "updated_dt",
] as const;

export const USER_EDITABLE_AGENT_COLUMNS = [
  "prk",
  "whentocall",
  "information",
  "nextstep",
  "regioncity",
] as const;
