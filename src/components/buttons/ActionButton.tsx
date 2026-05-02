import * as React from "react";

import { Button, type ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ActionButtonProps = ButtonProps & {
  prompt: string;
  icon?: React.ReactNode;
  isLoading?: boolean;
};

const ActionButton = React.forwardRef<HTMLButtonElement, ActionButtonProps>(
  (
    {
      "aria-label": ariaLabel,
      className,
      disabled,
      icon,
      isLoading = false,
      prompt,
      type = "button",
      ...props
    },
    ref,
  ) => {
    const hasIndicator = isLoading || icon;

    return (
      <Button
        ref={ref}
        type={type}
        className={cn("action-button", className)}
        disabled={disabled || isLoading}
        aria-busy={isLoading}
        aria-label={ariaLabel}
        {...props}
      >
        {hasIndicator ? (
          <span
            className={cn(
              "action-button-icon",
              isLoading && "action-button-icon-loading",
            )}
            aria-hidden="true"
          >
            {isLoading ? (
              <span className="action-button-loader">
                <span />
                <span />
                <span />
              </span>
            ) : (
              icon
            )}
          </span>
        ) : null}
        <span className="action-button-text">{prompt}</span>
      </Button>
    );
  },
);

ActionButton.displayName = "ActionButton";

export { ActionButton };
