"use client";

import type { ReactNode } from "react";

import { useAppContext } from "@/context/AppContext";

export function InitialLoadingGate({ children }: { children: ReactNode }) {
  const { isInitialLoading } = useAppContext();

  if (!isInitialLoading) {
    return <>{children}</>;
  }

  return <InitialLoadingScreen />;
}

function InitialLoadingScreen() {
  return (
    <main
      className="initial-loading-screen"
      aria-busy="true"
      aria-live="polite"
    >
      <span className="sr-only">Načítá se aplikace.</span>

      <header className="initial-loading-nav">
        <div className="initial-loading-logo" />
        <div className="initial-loading-nav-lines">
          <div className="initial-loading-line w-24" />
          <div className="initial-loading-line w-16" />
          <div className="initial-loading-line w-20" />
        </div>
      </header>

      <section className="initial-loading-hero" aria-hidden="true">
        <div className="initial-loading-stack">
          <div className="initial-loading-pill" />
          <div className="initial-loading-title">
            <div className="initial-loading-title-line w-full" />
            <div className="initial-loading-title-line w-[72%]" />
          </div>
          <div className="initial-loading-copy">
            <div className="initial-loading-line w-full" />
            <div className="initial-loading-line w-[88%]" />
            <div className="initial-loading-line w-[64%]" />
          </div>
          <div className="initial-loading-actions">
            <div className="initial-loading-action w-32" />
            <div className="initial-loading-action w-28" />
          </div>
        </div>

        <div className="initial-loading-form">
          <div className="initial-loading-line h-4 w-36" />
          <div className="initial-loading-input" />
          <div className="initial-loading-line h-4 w-28" />
          <div className="initial-loading-textarea" />
          <div className="initial-loading-check-row">
            <div className="initial-loading-check" />
            <div className="initial-loading-line w-44" />
          </div>
        </div>
      </section>

      <section className="initial-loading-review" aria-hidden="true">
        <div className="initial-loading-quote-mark">“</div>
        <div className="initial-loading-review-copy">
          <div className="initial-loading-title-line w-full" />
          <div className="initial-loading-title-line w-[82%]" />
          <div className="initial-loading-line mt-8 w-52" />
        </div>
        <div className="initial-loading-pagination">
          <span />
          <span className="is-active" />
          <span />
        </div>
      </section>
    </main>
  );
}
