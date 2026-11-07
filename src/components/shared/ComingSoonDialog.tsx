"use client";

import React from "react";
import { motion, type Variants, type Transition } from "motion/react";
import { Smartphone, Sparkles } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/core/dialog";
import { BrandLogo } from "@/components/shared/BrandLogo";
import { useAppPreferences } from "@/context/AppPreferencesContext";

const modalVariants: Variants = {
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
    y: "40%",
    opacity: 0,
  },
};

const modalTransition: Transition = {
  type: "spring",
  bounce: 0,
  duration: 0.4,
};

/* Store badges are INFORMATIONAL LABELS ONLY — the apps are not released yet,
   so these are deliberately not links and never pretend to be download
   buttons. */
function StoreChip({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-xl border border-[#947AB6]/30 bg-[#947AB6]/10 px-4 py-2 text-sm font-bold text-[#C4B0DC]">
      <Smartphone className="h-4 w-4 text-[#947AB6]" strokeWidth={1.8} />
      <span className="font-poppins" dir="ltr">
        {label}
      </span>
    </span>
  );
}

/**
 * App-launch announcement — STRICTLY INFORMATIONAL.
 * It tells visitors that the Moawen customer & service-provider apps are
 * coming soon to Google Play and the Apple App Store. It collects NO data:
 * no inputs, no waitlist, no newsletter, no tracking of personal details.
 */
export function ComingSoonDialog() {
  const {
    theme,
    t,
    comingSoonOpen,
    setComingSoonOpen,
  } = useAppPreferences();

  const isDark = theme === "dark";

  const handleOpenChange = (open: boolean) => {
    setComingSoonOpen(open);
  };

  return (
    <Dialog
      open={comingSoonOpen}
      onOpenChange={handleOpenChange}
      variants={modalVariants}
      transition={modalTransition}
    >
      <DialogContent
        className={`max-w-lg overflow-hidden border p-6 sm:p-8 ${
          isDark
            ? "border-[#947AB6]/35 bg-[#161C24] text-[#F5F3FA]"
            : "border-[#947AB6]/30 bg-[#FFFFFF] text-[#12171D]"
        }`}
      >
        {/* Top ambient #947AB6 glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 inset-x-0 mx-auto h-48 w-72 rounded-full bg-[#947AB6]/25 blur-3xl"
        />

        <div className="relative flex flex-col">
          {/* Brand row — logo at the start side, close “X” pinned to the END
              side (LEFT in Arabic / RIGHT in English), vertically centered on
              the logo line (preserved brand spec). */}
          <div className="mb-5 flex items-center justify-between">
            <BrandLogo className="h-8 w-auto" />
            <DialogClose
              ariaLabel={t.comingSoonModal.closeBtn}
              className="relative shrink-0"
            />
          </div>

          {/* Animated Launch Beacon Badge */}
          <div className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-[#947AB6]/40 bg-[#947AB6]/15 px-3.5 py-1.5 text-xs font-semibold text-[#947AB6]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#947AB6] opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#947AB6]" />
            </span>
            <span>{t.comingSoonModal.badge}</span>
          </div>

          <DialogHeader>
            <DialogTitle
              className={isDark ? "text-[#F5F3FA]" : "text-[#12171D]"}
            >
              {t.comingSoonModal.title}
            </DialogTitle>
            <DialogDescription
              className={isDark ? "text-[#B6C0CE]" : "text-[#4E5866]"}
            >
              {t.comingSoonModal.description}
            </DialogDescription>
          </DialogHeader>

          {/* Store availability — labels only, no links (apps not launched) */}
          <div className="mt-5">
            <p
              className={`mb-2.5 text-xs font-semibold ${
                isDark ? "text-[#8E9BAE]" : "text-[#5C6675]"
              }`}
            >
              {t.comingSoonModal.storeHint}
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <StoreChip label="Google Play" />
              <StoreChip label="App Store" />
            </div>
          </div>

        </div>
      </DialogContent>
    </Dialog>
  );
}
