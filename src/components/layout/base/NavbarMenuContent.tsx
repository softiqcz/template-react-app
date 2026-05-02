"use client";

import {
  ArrowTopRightOnSquareIcon,
  LinkIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

import { SettingsMenu } from "@/components/layout/settings/SettingsMenu";
import { Button } from "@/components/ui/button";
import { EXTERNAL_LINKS, NAV_ITEMS } from "@/constants/navigation";
import type { translations } from "@/i18n/translations";
import type { Language } from "@/i18n/translations";

type NavbarTranslations = (typeof translations)[Language]["navbar"];

type MenuContentProps = {
  isMobile: boolean;
  navbar: NavbarTranslations;
  switchId: string;
  onClose: () => void;
};

export function MenuContent({
  isMobile,
  navbar,
  switchId,
  onClose,
}: MenuContentProps) {
  return (
    <>
      <div
        className={
          isMobile ? "flex flex-col gap-1" : "flex flex-row items-center gap-2"
        }
      >
        {NAV_ITEMS.map((item) => (
          <Button
            key={item.href}
            asChild
            className={isMobile ? "navbar-mobile-menu-control gap-2" : "gap-2"}
            size="sm"
            variant="ghost"
          >
            <Link href={item.href} onClick={onClose}>
              <LinkIcon className="size-4 shrink-0" aria-hidden="true" />
              {navbar.navItems[item.labelKey]}
            </Link>
          </Button>
        ))}
      </div>

      <SettingsMenu
        switchId={switchId}
        isMobile={isMobile}
        onAfterAction={onClose}
      />

      {EXTERNAL_LINKS.map((item) => (
        <Button
          key={item.href}
          asChild
          className={isMobile ? "navbar-mobile-menu-control gap-2" : "gap-2"}
          size="sm"
          variant="default"
        >
          <Link href={item.href} rel="noreferrer" target="_blank">
            <ArrowTopRightOnSquareIcon
              className="size-4 shrink-0"
              aria-hidden="true"
            />
            {item.label}
          </Link>
        </Button>
      ))}
    </>
  );
}
