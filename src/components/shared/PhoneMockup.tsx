"use client";

import React from "react";
import { useAppPreferences } from "@/context/AppPreferencesContext";

interface PhoneMockupProps {
  src: string;
  alt?: string;
  className?: string;
  isGrayscale?: boolean;
  hideFrameBorder?: boolean;
  /**
   * Loading strategy:
   * - "high": above-the-fold LCP image → eager + fetchpriority=high
   * - "eager": above-the-fold but secondary → eager
   * - "lazy" (default): below-the-fold / off-track slider images
   */
  loading?: "high" | "eager" | "lazy";
}

/**
 * Ultra-minimal, refined smartphone mockup frame.
 * - Zero titles or captions rendered on/around screens per user specification.
 * - Hovering any screen reveals a delicate thin border with uniform 4-sided offset.
 */
export function PhoneMockup({
  src,
  alt = "",
  className = "",
  isGrayscale = false,
  hideFrameBorder = false,
  loading = "lazy",
}: PhoneMockupProps) {
  const { theme } = useAppPreferences();
  const isDark = theme === "dark";

  return (
    <div
      data-cursor="interactive"
      className={`group relative select-none ${className}`}
    >
      {/* Thin 4-sided offset border on hover */}
      <div
        aria-hidden="true"
        className="pointer-events-none -inset-[9px] absolute rounded-[40px] border-[1.25px] border-[#947AB6]/85 opacity-0 scale-[0.985] shadow-[0_0_28px_rgba(148,122,182,0.28)] transition-all duration-300 ease-out group-hover:opacity-100 group-hover:scale-100"
      />

      {/* Minimalist Phone Frame */}
      <div
        className={`relative overflow-hidden rounded-[32px] p-[6px] transition-all duration-500 ${
          hideFrameBorder
            ? "bg-transparent"
            : isDark
              ? "bg-[#1A212B] ring-1 ring-white/12 shadow-[0_24px_60px_-15px_rgba(0,0,0,0.75)]"
              : "bg-[#1E2530] ring-1 ring-[#12171D]/15 shadow-[0_24px_60px_-15px_rgba(18,23,29,0.25)]"
        }`}
      >
        {/* Minimalist Top Speaker / Sensor Pill */}
        {!hideFrameBorder ? (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-[12px] left-1/2 z-20 h-[4px] w-12 -translate-x-1/2 rounded-full bg-white/20"
          />
        ) : null}

        {/* Screen Viewport (No captions/titles) */}
        <div className="relative aspect-[390/844] w-full overflow-hidden rounded-[26px] bg-[#141A21]">
          <img
            src={src}
            alt={alt}
            width={390}
            height={844}
            loading={loading === "lazy" ? "lazy" : "eager"}
            fetchPriority={loading === "high" ? "high" : undefined}
            className={`h-full w-full object-cover transition-all duration-700 ease-out ${
              isGrayscale
                ? "grayscale contrast-90 opacity-60 scale-[0.97]"
                : "grayscale-0 opacity-100 scale-100"
            }`}
          />
        </div>
      </div>
    </div>
  );
}
