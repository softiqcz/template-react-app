import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function TablePagination({
  label,
  currentPage,
  pageCount,
  totalRows,
  onPageChange,
}: {
  label: string;
  currentPage: number;
  pageCount: number;
  totalRows: number;
  onPageChange: (page: number) => void;
}) {
  const controls = [
    { label: "První strana", page: 1, icon: ChevronDoubleLeftIcon },
    { label: "Předchozí strana", page: currentPage - 1, icon: ChevronLeftIcon },
    { label: "Další strana", page: currentPage + 1, icon: ChevronRightIcon },
    { label: "Poslední strana", page: pageCount, icon: ChevronDoubleRightIcon },
  ];
  return (
    <nav
      className="flex flex-col gap-5 py-6 sm:flex-row sm:items-center sm:justify-between"
      aria-label={`Stránkování: ${label}`}
    >
      <p className="text-sm tabular-nums text-muted-foreground">
        Strana{" "}
        <span className="font-medium text-foreground">{currentPage}</span> z{" "}
        {pageCount} · {totalRows} záznamů
      </p>
      <div className="flex flex-wrap items-center gap-2">
        {controls.slice(0, 2).map(({ label, page, icon: Icon }) => (
          <Button
            key={label}
            type="button"
            variant="ghost"
            size="icon"
            disabled={currentPage === 1}
            onClick={() => onPageChange(page)}
            aria-label={label}
          >
            <Icon className="size-4" />
          </Button>
        ))}
        <Input
          className="h-10 w-20 text-center tabular-nums"
          type="number"
          min={1}
          max={pageCount}
          value={currentPage}
          onChange={(event) =>
            Number.isFinite(event.currentTarget.valueAsNumber) &&
            onPageChange(event.currentTarget.valueAsNumber)
          }
          aria-label={`Číslo strany, celkem ${pageCount}`}
        />
        {controls.slice(2).map(({ label, page, icon: Icon }) => (
          <Button
            key={label}
            type="button"
            variant="ghost"
            size="icon"
            disabled={currentPage === pageCount}
            onClick={() => onPageChange(page)}
            aria-label={label}
          >
            <Icon className="size-4" />
          </Button>
        ))}
      </div>
    </nav>
  );
}
