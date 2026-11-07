"use client";

import React, { createContext, useContext, useEffect, useId, useRef } from "react";
import { AnimatePresence, motion, type Variants, type Transition } from "motion/react";
import { X } from "lucide-react";

interface DialogContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  variants?: Variants;
  transition?: Transition;
  titleId: string;
  descriptionId: string;
}

const DialogContext = createContext<DialogContextValue | null>(null);

function useDialog() {
  const ctx = useContext(DialogContext);
  if (!ctx) throw new Error("Dialog components must be used inside <Dialog>");
  return ctx;
}

export interface DialogProps {
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  variants?: Variants;
  transition?: Transition;
}

const defaultVariants: Variants = {
  initial: {
    scale: 0.9,
    filter: "blur(10px)",
    y: "100%",
    opacity: 0,
  },
  animate: {
    scale: 1,
    filter: "blur(0px)",
    y: 0,
    opacity: 1,
  },
  exit: {
    scale: 0.92,
    filter: "blur(8px)",
    y: "35%",
    opacity: 0,
  },
};

const defaultTransition: Transition = {
  type: "spring",
  bounce: 0,
  duration: 0.4,
}

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

export function Dialog({
  children,
  open: controlledOpen,
  onOpenChange,
  variants = defaultVariants,
  transition = defaultTransition,
}: DialogProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(false);
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : uncontrolledOpen;
  const titleId = useId();
  const descriptionId = useId();

  const setOpen = (next: boolean) => {
    if (!isControlled) setUncontrolledOpen(next);
    onOpenChange?.(next);
  };

  // Escape-to-close (single listener, only while open).
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return (
    <DialogContext.Provider
      value={{ open, setOpen, variants, transition, titleId, descriptionId }}
    >
      {children}
    </DialogContext.Provider>
  );
}

/**
 * Accessible dialog surface:
 * - locks background scrolling while open,
 * - moves focus into the dialog on open and restores it on close,
 * - traps Tab/Shift+Tab inside the dialog (WCAG 2.2 focus not obscured / 2.1.2 no keyboard trap escape via Esc),
 * - wires aria-modal, aria-labelledby and aria-describedby automatically.
 */
export function DialogContent({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { open, setOpen, variants, transition, titleId, descriptionId } = useDialog();
  const panelRef = useRef<HTMLDivElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  // Scroll lock + focus management.
  useEffect(() => {
    if (!open) return;
    const { body, documentElement } = document;
    const prevOverflow = body.style.overflow;
    const prevPaddingEnd = body.style.paddingInlineEnd;
    const scrollbarWidth = window.innerWidth - documentElement.clientWidth;
    body.style.overflow = "hidden";
    if (scrollbarWidth > 0) body.style.paddingInlineEnd = `${scrollbarWidth}px`;

    previouslyFocused.current = document.activeElement as HTMLElement | null;

    // Initial focus: close button first, otherwise the panel itself.
    const focusTarget =
      panelRef.current?.querySelector<HTMLElement>("[data-dialog-autofocus]") ??
      panelRef.current;
    focusTarget?.focus({ preventScroll: true });

    return () => {
      body.style.overflow = prevOverflow;
      body.style.paddingInlineEnd = prevPaddingEnd;
      previouslyFocused.current?.focus?.({ preventScroll: true });
    };
  }, [open]);

  // Focus trap.
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key !== "Tab" || !panelRef.current) return;
    const focusables = Array.from(
      panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
    ).filter((el) => el.offsetParent !== null || el === document.activeElement);
    if (focusables.length === 0) {
      e.preventDefault();
      return;
    }
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    const active = document.activeElement as HTMLElement | null;
    if (e.shiftKey) {
      if (active === first || !panelRef.current.contains(active)) {
        e.preventDefault();
        last.focus();
      }
    } else if (active === last || !panelRef.current.contains(active)) {
      e.preventDefault();
      first.focus();
    }
  };

  return (
    <AnimatePresence>
      {open ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          aria-describedby={descriptionId}
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 bg-[#0B0E13]/75 backdrop-blur-md"
          />

          {/* Modal Panel */}
          <motion.div
            ref={panelRef}
            tabIndex={-1}
            onKeyDown={onKeyDown}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={variants}
            transition={transition}
            onClick={(e) => e.stopPropagation()}
            className={`relative z-10 w-full rounded-3xl shadow-2xl outline-none ${className}`}
          >
            {children}
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
  );
}

export function DialogHeader({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={`flex flex-col space-y-2 ${className}`}>{children}</div>;
}

export function DialogTitle({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { titleId } = useDialog();
  return (
    <h2
      id={titleId}
      className={`text-xl sm:text-2xl font-bold tracking-tight ${className}`}
    >
      {children}
    </h2>
  );
}

export function DialogDescription({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { descriptionId } = useDialog();
  return (
    <p
      id={descriptionId}
      className={`text-sm sm:text-base leading-relaxed ${className}`}
    >
      {children}
    </p>
  );
}

export function DialogClose({
  className = "",
  ariaLabel = "Close dialog",
}: {
  className?: string;
  ariaLabel?: string;
}) {
  const { setOpen } = useDialog();
  return (
    <button
      type="button"
      onClick={() => setOpen(false)}
      aria-label={ariaLabel}
      data-dialog-autofocus
      className={`inline-flex h-9 w-9 items-center justify-center rounded-xl border border-current/15 opacity-75 transition-all hover:opacity-100 hover:border-[#947AB6] hover:text-[#947AB6] ${className}`}
    >
      <X className="h-4 w-4" strokeWidth={2} />
    </button>
  );
}
