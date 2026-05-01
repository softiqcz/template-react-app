"use client";

import Image from "next/image";
import Link from "next/link";

import {cn} from "@/lib/utils";

type SoftiqLogoLinkProps = {
    beVersion: string;
    className?: string;
    currentYear: number;
    feVersion: string;
    logoClassName?: string;
    logoRevealClassName?: string;
};

export function SoftiqLogoLink({
    beVersion,
    className,
    currentYear,
    feVersion,
    logoClassName,
    logoRevealClassName,
}: SoftiqLogoLinkProps) {
    return (
        <div
            className={cn(
                "flex flex-col items-center gap-2 text-center text-xs font-medium",
                className,
            )}
        >
            <Link
                aria-label={`© ${currentYear} softIQ`}
                className="group/softiq inline-flex flex-col items-center gap-2 text-center text-foreground transition-all duration-[600ms] hover:text-primary"
                href="https://softiq.cz"
                rel="noreferrer"
                target="_blank"
            >
                <span>© {currentYear} softIQ</span>
                <span
                    className={cn(
                        "relative block aspect-[426/139] w-28 overflow-hidden",
                        logoClassName,
                    )}
                >
                    <span
                        className={cn(
                            "absolute left-1/2 top-0 block aspect-[426/139] w-14 -translate-x-1/2 overflow-hidden transition-all duration-[600ms] group-hover/canvas:w-28 group-hover/footer:w-28 group-hover/softiq:w-28",
                            logoRevealClassName,
                        )}
                    >
                        <Image
                            alt=""
                            aria-hidden="true"
                            className="object-contain object-center grayscale transition-all duration-[600ms] group-hover/canvas:opacity-0 group-hover/footer:opacity-0 group-hover/softiq:opacity-0"
                            fill
                            sizes="7rem"
                            src="/images/logos/softiq-small.svg"
                        />
                        <Image
                            alt="softIQ"
                            className="object-contain object-center opacity-0 transition-all duration-[600ms] [clip-path:inset(0_100%_0_0)] group-hover/canvas:opacity-100 group-hover/canvas:[clip-path:inset(0_0_0_0)] group-hover/footer:opacity-100 group-hover/footer:[clip-path:inset(0_0_0_0)] group-hover/softiq:opacity-100 group-hover/softiq:[clip-path:inset(0_0_0_0)]"
                            fill
                            sizes="7rem"
                            src="/images/logos/softiq.svg"
                        />
                    </span>
                </span>
            </Link>
            <p>BE {beVersion} | FE {feVersion}</p>
        </div>
    );
}
