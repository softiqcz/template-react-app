"use client";

import Link from "next/link";
import {useAppContext} from "@/context/AppContext";

export function Footer() {
    const {beVersion, currentYear} = useAppContext();
    const FE_VERSION = "v0.0.1"

    return (
        <footer className="border-t bg-background">
            <div
                className="site-container flex flex-col gap-3 py-5 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
                <p className="font-medium">© {currentYear} softIQ | BE {beVersion} | FE {FE_VERSION}
                </p>
                <div className="flex items-center gap-3">
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
