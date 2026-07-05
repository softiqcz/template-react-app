import { CircleStackIcon } from "@heroicons/react/24/outline";
import type { OriginStat } from "./types";
import { formatDate } from "./utils";

export function StatisticsView({
  stats,
  latestDate,
  syncingCharacter,
}: {
  stats: OriginStat[];
  latestDate: Date | null;
  syncingCharacter: string | null;
}) {
  return (
    <div className="space-y-8">
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        <Metric label="Počet scrapovaných firem" value={stats.length} />
        <Metric
          label="Záznamů"
          value={stats.reduce((sum, stat) => sum + stat.count, 0)}
        />
        <Metric
          label="Naposledy nalezen nový agent"
          value={formatDate(latestDate)}
        />
        <Metric label="Currently syncing" value={syncingCharacter ?? "—"} />
      </div>
      {stats.length === 0 ? (
        <div className="neo-inset flex min-h-64 flex-col items-center justify-center p-8 text-center text-muted-foreground">
          <CircleStackIcon className="mb-4 size-10" />
          <p>V datech nebyl nalezen sloupec origin ani datum vytvoření.</p>
        </div>
      ) : (
        <div className="neo-table relative left-1/2 w-[calc(100vw-2rem)] -translate-x-1/2 sm:w-[calc(100vw-3rem)] lg:w-[calc(100vw-4rem)]">
          <table className="w-full min-w-[40rem] text-left text-sm">
            <thead>
              <tr>
                {["Firma", "Počet záznamů", "Naposledy nalezen nový agent"].map(
                  (label) => (
                    <th
                      key={label}
                      className="whitespace-nowrap px-6 py-3 font-medium text-muted-foreground"
                    >
                      {label}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody>
              {stats.map((stat) => (
                <tr
                  key={stat.origin}
                  className="odd:bg-background even:bg-foreground/[0.04]"
                >
                  <th
                    scope="row"
                    className="whitespace-nowrap px-6 py-4 font-medium text-foreground"
                  >
                    {stat.origin}
                  </th>
                  <td className="whitespace-nowrap px-6 py-4 tabular-nums text-muted-foreground">
                    {stat.count}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-muted-foreground">
                    {formatDate(stat.lastScrapedAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
function Metric({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="neo-raised p-6">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="mt-3 text-3xl font-medium tabular-nums text-foreground">
        {value}
      </p>
    </div>
  );
}
