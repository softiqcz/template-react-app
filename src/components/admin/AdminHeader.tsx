import {
  ArrowPathIcon,
  ArrowRightStartOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

function formatElapsedTime(date: Date, now: number) {
  const elapsedMinutes = Math.max(
    0,
    Math.floor((now - date.getTime()) / 60_000),
  );

  if (elapsedMinutes < 1) return "právě teď";
  if (elapsedMinutes < 60) {
    const unit = elapsedMinutes === 1 ? "minutou" : "minutami";
    return `před ${elapsedMinutes} ${unit}`;
  }

  const elapsedHours = Math.floor(elapsedMinutes / 60);
  const unit = elapsedHours === 1 ? "hodinou" : "hodinami";
  return `před ${elapsedHours} ${unit}`;
}

export function AdminHeader({
  email,
  onLogout,
}: {
  email: string;
  onLogout: () => void;
}) {
  return (
    <header className="px-6 py-6 lg:px-12">
      <div className="mx-auto flex max-w-[96rem] items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.1em] text-primary">
            Makon IS
          </p>
          <p className="mt-1 text-sm text-muted-foreground">{email}</p>
        </div>
        <Button variant="ghost" onClick={onLogout}>
          <ArrowRightStartOnRectangleIcon className="mr-2 size-5" />
          Odhlásit
        </Button>
      </div>
    </header>
  );
}

export function DashboardIntro({
  lastFetchedAt,
  loading,
  onReload,
  description = "Kompletní obsah databáze dostupný pouze roli ADMIN.",
}: {
  lastFetchedAt: Date | null;
  loading: boolean;
  onReload: () => void;
  description?: string;
}) {
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    if (!lastFetchedAt) return;
    setNow(Date.now());
    const interval = window.setInterval(() => setNow(Date.now()), 60_000);
    return () => window.clearInterval(interval);
  }, [lastFetchedAt]);

  return (
    <div className="neo-raised flex flex-col justify-between gap-8 p-6 md:flex-row md:items-end lg:p-8">
      <div>
        <h1 className="text-[clamp(1.75rem,3vw,1.75rem)] font-medium leading-none tracking-tight">
          Datový přehled
        </h1>
        <p className="mt-3 text-muted-foreground">{description}</p>
      </div>
      <div className="flex flex-col items-start gap-2 md:items-end">
        <Button variant="ghost" disabled={loading} onClick={onReload}>
          <ArrowPathIcon
            className={`mr-2 size-5 ${loading ? "animate-spin" : ""}`}
          />
          Obnovit data
        </Button>
        {lastFetchedAt && (
          <p
            className="text-sm text-muted-foreground"
            title={lastFetchedAt.toLocaleString("cs-CZ")}
          >
            Naposledy načteno {formatElapsedTime(lastFetchedAt, now)}
          </p>
        )}
      </div>
    </div>
  );
}
