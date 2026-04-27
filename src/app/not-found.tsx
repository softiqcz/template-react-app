"use client";

import {
  ArrowLeftIcon,
  HomeIcon,
  LinkSlashIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";

export default function NotFound() {
  const { t } = useLanguage();
  const pathname = usePathname();
  const notFound = t.notFound;

  return (
    <main className="ui-full-page">
      <section>
          <Badge variant="secondary" className="gap-1.5">
            <LinkSlashIcon className="size-3" aria-hidden="true" />
            {notFound.eyebrow}
          </Badge>

        <h1 className="ui-title">
          {notFound.title}
        </h1>
        <p className="ui-subtitle">{notFound.description}</p>

        <div
          className="ui-below-subtitle-action"
        >
          <Button asChild className="gap-2">
            <Link href="/">
              <HomeIcon className="size-4" aria-hidden="true" />
              {notFound.home}
            </Link>
          </Button>
          <Button
            type="button"
            variant="outline"
            className="gap-2"
            onClick={() => window.history.back()}
          >
            <ArrowLeftIcon className="size-4" aria-hidden="true" />
            {notFound.back}
          </Button>
        </div>
      </section>

      <section aria-label="404">
        <div className="text-9xl">
          <span>4</span>
          <span className="text-primary">0</span>
          <span>4</span>
        </div>

        <div className="mt-8 inline-flex items-center gap-2 border-l-2 border-primary pl-4 text-sm font-medium text-foreground/70">
          <LinkSlashIcon className="size-4" aria-hidden="true" />
          <span>{pathname}</span>
        </div>
      </section>
    </main>
  );
}
