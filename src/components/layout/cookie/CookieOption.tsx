"use client";

import type { ComponentType, SVGProps } from "react";

import { Checkbox } from "@/components/ui/checkbox";

type CookieOptionProps = {
  checked: boolean;
  description: string;
  id: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  onCheckedChange: (checked: boolean) => void;
};

export function CookieOption({
  checked,
  description,
  id,
  icon: Icon,
  onCheckedChange,
}: CookieOptionProps) {
  return (
    <div className="flex gap-3">
      <Checkbox
        id={id}
        checked={checked}
        className="mt-0.5"
        onCheckedChange={(nextChecked) => onCheckedChange(nextChecked === true)}
      />
      <Icon
        aria-hidden="true"
        className="h-5 w-5 shrink-0 text-muted-foreground"
      />
      <label className="ui-card-description" htmlFor={id}>
        {description}
      </label>
    </div>
  );
}
