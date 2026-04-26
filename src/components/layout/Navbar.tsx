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
    <header className="site-navbar">
      <nav className="site-container site-navbar-inner" aria-label="Main navigation">
        <Link className="site-navbar-brand" href="/" onClick={closeMenu}>
          {appName}
        </Link>

        <button
          aria-controls="site-navbar-menu"
          aria-expanded={isOpen}
          aria-label="Toggle navigation menu"
          className="site-navbar-toggle"
          type="button"
          onClick={toggleMenu}
        >
          {isOpen ? (
            <XMarkIcon className="h-4 w-4" aria-hidden="true" />
          ) : (
            <Bars3Icon className="h-4 w-4" aria-hidden="true" />
          )}
        </button>

        <div
          id="site-navbar-menu"
          className={isOpen ? "site-navbar-menu is-open" : "site-navbar-menu"}
        >
          <div className="site-navbar-links">
            {navItems.map((item) => (
              <Link
                key={item.href}
                className="site-navbar-link"
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
