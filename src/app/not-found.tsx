"use client";

import {
  ArrowLeftIcon,
  HomeIcon,  LinkSlashIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";

export default function NotFound() {
  const { t } = useLanguage();
  const pathname = usePathname();
  const notFound = t.notFound;

  return (
    <main className="flex min-h-[calc(100vh-142px)] items-center overflow-hidden bg-background py-16">
      <section
        className="site-container grid w-full items-center gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(20rem,1fr)]"
        aria-labelledby="not-found-title"
      >
        <div className="max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-[0.24em] text-primary">
            {notFound.eyebrow}
          </p>
          <h1 id="not-found-title" className="ui-title">
            {notFound.title}
          </h1>
          <p className="ui-subtitle">{notFound.description}</p>

          <div
            className="mt-8 flex flex-wrap gap-3 animate-[not-found-enter_700ms_160ms_ease_both]"
            aria-label={notFound.actionsLabel}
          >
            <Button asChild className="gap-2">
              <Link href="/">
                <HomeIcon className="size-4" aria-hidden="true" />
                {notFound.home}
              </Link>
            </Button>
            <Button
              type="button"
              variant="ghost"
              className="gap-2"
              onClick={() => window.history.back()}
            >
              <ArrowLeftIcon className="size-4" aria-hidden="true" />
              {notFound.back}
            </Button>
          </div>
        </div>

        <div>
          <div className="text-9xl">
            <span>4</span>
            <span className="text-primary">0</span>
            <span>4</span>
          </div>
          <div className="not-found-route">
            <LinkSlashIcon className="size-4" />
            <span>{pathname}</span>
          </div>

        </div>
      </section>
    </main>
  );
}
