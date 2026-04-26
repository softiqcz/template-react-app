"use client";

import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { useAppContext } from "@/context/AppContext";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Components", href: "#components" },
  { label: "Docs", href: "#docs" },
];

export function Navbar() {
  const { appName } = useAppContext();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((current) => !current);
  const closeMenu = () => setIsOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur">
      <nav
        className="site-container flex flex-wrap items-center justify-between gap-3 py-4"
        aria-label="Main navigation"
      >
        <Link
          className="max-w-[calc(100%-3rem)] truncate text-sm font-semibold text-foreground underline-offset-4 hover:underline"
          href="/"
          onClick={closeMenu}
        >
          {appName}
        </Link>

        <Button
          aria-controls="site-navbar-menu"
          aria-expanded={isOpen}
          aria-label="Toggle navigation menu"
          className="md:hidden"
          size="icon"
          variant="outline"
          type="button"
          onClick={toggleMenu}
        >
          {isOpen ? (
            <XMarkIcon className="h-4 w-4" aria-hidden="true" />
          ) : (
            <Bars3Icon className="h-4 w-4" aria-hidden="true" />
          )}
        </Button>

        <div
          id="site-navbar-menu"
          className={
            isOpen
              ? "flex w-full flex-col gap-3 border-t pt-4 md:w-auto md:flex-row md:items-center md:border-t-0 md:pt-0"
              : "hidden w-full flex-col gap-3 border-t pt-4 md:flex md:w-auto md:flex-row md:items-center md:border-t-0 md:pt-0"
          }
        >
          <div className="flex flex-col gap-1 md:flex-row md:items-center md:gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                href={item.href}
                onClick={closeMenu}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <Button asChild size="sm">
            <a href="https://softiq.cz" rel="noreferrer" target="_blank">
              softIQ
            </a>
          </Button>
        </div>
      </nav>
    </header>
  );
}
