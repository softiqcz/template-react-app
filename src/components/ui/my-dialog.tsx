"use client";

import { XMarkIcon } from "@heroicons/react/24/outline";
import { Slot } from "@radix-ui/react-slot";
import * as React from "react";

import { Button, type ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type MyDialogContextValue = {
  onOpenChange: (isOpen: boolean) => void;
};

const MyDialogContext = React.createContext<MyDialogContextValue | null>(null);

type MyDialogProps = React.ComponentProps<"div"> & {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  closeOnBackdropClick?: boolean;
};

function MyDialog({
  children,
  className,
  closeOnBackdropClick = true,
  isOpen,
  onClick,
  onKeyDown,
  onOpenChange,
  ...props
}: MyDialogProps) {
  const overlayRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!isOpen) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const frame = window.requestAnimationFrame(() => {
      if (overlayRef.current?.contains(document.activeElement)) return;

      const focusable = overlayRef.current?.querySelector<HTMLElement>(
        'button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [href], [tabindex]:not([tabindex="-1"])',
      );
      focusable?.focus();
    });

    return () => {
      window.cancelAnimationFrame(frame);
      previouslyFocused?.focus();
    };
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  function handleBackdropClick(event: React.MouseEvent<HTMLDivElement>) {
    onClick?.(event);

    if (!event.defaultPrevented && closeOnBackdropClick) {
      onOpenChange(false);
    }
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    onKeyDown?.(event);
    if (event.defaultPrevented) return;

    if (event.key === "Escape") {
      event.preventDefault();
      onOpenChange(false);
      return;
    }

    if (event.key !== "Tab") return;

    const focusable = Array.from(
      overlayRef.current?.querySelectorAll<HTMLElement>(
        'button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [href], [tabindex]:not([tabindex="-1"])',
      ) ?? [],
    );
    if (focusable.length === 0) {
      event.preventDefault();
      return;
    }

    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  return (
    <MyDialogContext.Provider value={{ onOpenChange }}>
      <div
        ref={overlayRef}
        className={cn("ui-dialog-overlay", className)}
        onClick={handleBackdropClick}
        onKeyDown={handleKeyDown}
        {...props}
      >
        {children}
      </div>
    </MyDialogContext.Provider>
  );
}

const MyDialogContainer = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, onClick, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("ui-dialog-container", className)}
    onClick={(event) => {
      onClick?.(event);
      event.stopPropagation();
    }}
    {...props}
  />
));
MyDialogContainer.displayName = "MyDialogContainer";

type MyDialogSurfaceProps = React.ComponentProps<"div"> & {
  asChild?: boolean;
};

const MyDialogSurface = React.forwardRef<HTMLDivElement, MyDialogSurfaceProps>(
  ({ asChild = false, className, ...props }, ref) => {
    const Comp = asChild ? Slot : "div";

    return (
      <Comp
        ref={ref}
        className={cn("ui-card ui-dialog-surface", className)}
        {...props}
      />
    );
  },
);
MyDialogSurface.displayName = "MyDialogSurface";

const MyDialogContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("ui-card-content ui-dialog-content", className)}
    {...props}
  />
));
MyDialogContent.displayName = "MyDialogContent";

const MyDialogHeader = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("ui-dialog-header", className)} {...props} />
));
MyDialogHeader.displayName = "MyDialogHeader";

const MyDialogHeaderText = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("ui-dialog-header-text", className)}
    {...props}
  />
));
MyDialogHeaderText.displayName = "MyDialogHeaderText";

const MyDialogTitle = React.forwardRef<
  HTMLHeadingElement,
  React.ComponentProps<"h2">
>(({ className, ...props }, ref) => (
  <h2
    ref={ref}
    className={cn("ui-card-title ui-dialog-title", className)}
    {...props}
  />
));
MyDialogTitle.displayName = "MyDialogTitle";

const MyDialogDescription = React.forwardRef<
  HTMLParagraphElement,
  React.ComponentProps<"p">
>(({ className, ...props }, ref) => (
  <p ref={ref} className={cn("ui-card-description", className)} {...props} />
));
MyDialogDescription.displayName = "MyDialogDescription";

const MyDialogFooter = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("ui-card-footer ui-dialog-footer", className)}
    {...props}
  />
));
MyDialogFooter.displayName = "MyDialogFooter";

const MyDialogCloseButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className, onClick, ...props }, ref) => {
    const context = React.useContext(MyDialogContext);

    return (
      <Button
        ref={ref}
        aria-label="Close dialog"
        className={cn("ui-dialog-close", className)}
        size="icon"
        type="button"
        variant="ghost"
        onClick={(event) => {
          onClick?.(event);

          if (!event.defaultPrevented) {
            context?.onOpenChange(false);
          }
        }}
        {...props}
      >
        {children ?? <XMarkIcon className="size-4" aria-hidden="true" />}
      </Button>
    );
  },
);
MyDialogCloseButton.displayName = "MyDialogCloseButton";

export {
  MyDialog,
  MyDialogCloseButton,
  MyDialogContainer,
  MyDialogContent,
  MyDialogDescription,
  MyDialogFooter,
  MyDialogHeader,
  MyDialogHeaderText,
  MyDialogSurface,
  MyDialogTitle,
};
