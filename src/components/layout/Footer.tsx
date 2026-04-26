"use client";

import {MoonIcon, SunIcon} from "@heroicons/react/24/outline";
import Link from "next/link";
import {Switch} from "@/components/ui/switch";
import {useAppContext} from "@/context/AppContext";

export function Footer() {
    const {beVersion, isDark, toggleTheme, CURRENT_YEAR} = useAppContext();
         const FE_VERSION = "v0.0.1"

    return (
        <footer className="border-t bg-background">
            <div
                className="site-container flex flex-col gap-3 py-5 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
                <p className="font-medium">© {CURRENT_YEAR} softIQ | BE {beVersion} | FE {FE_VERSION} |
                </p>
                <div className="flex items-center gap-3">
                    <div className="relative flex items-center">
                        <Switch
                            aria-label="Toggle dark mode"
                            checked={isDark}
                            onCheckedChange={toggleTheme}
                        />
                        <span className="pointer-events-none absolute left-0 flex h-full w-full items-center px-[3px]">
    {isDark ? (
        <span className="ml-auto">
        <MoonIcon className="h-3.5 w-3.5 text-primary-foreground" aria-hidden="true"/>
      </span>
    ) : (
        <SunIcon className="h-3.5 w-3.5 text-primary-foreground" aria-hidden="true"/>
    )}
  </span>
                    </div>
                    <Link
                        className="font-semibold text-foreground underline-offset-4 hover:underline"
                        href="https://softiq.cz"
                        rel="noreferrer"
                        target="_blank"
                    >
                        softIQ
                    </Link>
                </div>
            </div>
        </footer>
    );
}