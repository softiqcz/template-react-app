import type { AdminData, View } from "./types";
import { labels, views } from "./types";

export function DashboardTabs({
  active,
  data,
  originCount,
  onChange,
}: {
  active: View;
  data: AdminData;
  originCount: number;
  onChange: (view: View) => void;
}) {
  return (
    <nav className="mt-8 flex flex-wrap gap-3" aria-label="Datové sady">
      {views.map((view) => (
        <button
          type="button"
          key={view}
          onClick={() => onChange(view)}
          aria-pressed={active === view}
          className={`neo-tab ${active === view ? "neo-tab-active" : ""}`}
        >
          {labels[view]}{" "}
          {view !== "management" && (
            <span className="ml-2 tabular-nums">
              {view === "statistics" ? originCount : data[view].length}
            </span>
          )}
        </button>
      ))}
    </nav>
  );
}
