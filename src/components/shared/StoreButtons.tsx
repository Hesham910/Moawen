"use client";

import React from "react";
import { motion } from "motion/react";
import { useAppPreferences } from "@/context/AppPreferencesContext";

interface StoreButtonsProps {
  className?: string;
  align?: "center" | "start";
}

export function StoreButtons({
  className = "",
  align = "center",
}: StoreButtonsProps) {
  const { theme, locale, openComingSoon } = useAppPreferences();
  const isDark = theme === "dark";

  const badgeSurface = isDark
    ? "bg-[#192028]/90 text-[#F5F3FA] border-[#2C3542] hover:border-[#947AB6] hover:bg-[#1E2630]"
    : "bg-[#FFFFFF] text-[#12171D] border-[#D8D0E5] shadow-sm hover:border-[#947AB6] hover:bg-[#F7F4FC]";

  const subTextColor = isDark ? "text-[#A7B2C2]" : "text-[#5C6675]";

  return (
    <div
      className={`flex flex-wrap items-center gap-3.5 sm:gap-4 ${
        align === "center" ? "justify-center" : "justify-start"
      } ${className}`}
    >
      {/* App Store SVG Button */}
      <motion.button
        type="button"
        onClick={() => openComingSoon("ios")}
        whileHover={{ y: -2.5, scale: 1.015 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 360, damping: 24 }}
        aria-label={
          locale === "ar"
            ? "تطبيق معاون قريبًا على App Store"
            : "Moawen is coming soon to the App Store"
        }
        className={`group relative inline-flex items-center gap-3 rounded-2xl border px-5 py-3 transition-all duration-300 hover:shadow-[0_12px_30px_-8px_rgba(148,122,182,0.42)] ${badgeSurface}`}
      >
        <svg
          viewBox="0 0 24 28"
          className="h-7 w-6 shrink-0 fill-current transition-colors duration-300 group-hover:text-[#947AB6]"
          aria-hidden="true"
        >
          <path d="M19.66 14.84c-.03-3.17 2.59-4.7 2.71-4.77-1.48-2.16-3.78-2.46-4.59-2.49-1.93-.2-3.8 1.15-4.79 1.15-.99 0-2.51-1.13-4.14-1.1-2.12.03-4.09 1.24-5.18 3.14-2.22 3.85-.57 9.54 1.58 12.66 1.06 1.53 2.32 3.24 3.97 3.18 1.6-.06 2.21-1.03 4.14-1.03 1.93 0 2.49 1.03 4.16.99 1.72-.03 2.81-1.55 3.86-3.09 1.22-1.78 1.72-3.51 1.75-3.6-.04-.02-3.44-1.32-3.47-4.94zM16.52 5.56c.88-1.07 1.48-2.55 1.31-4.04-1.27.05-2.82.85-3.73 1.91-.81.94-1.53 2.45-1.34 3.9 1.42.11 2.88-.7 3.76-1.77z" />
        </svg>
        <div className="flex flex-col text-start leading-tight" dir="ltr">
          <span
            className={`text-[10px] font-medium tracking-wide ${subTextColor}`}
          >
            Download on the
          </span>
          <span className="font-poppins text-base font-semibold tracking-tight">
            App Store
          </span>
        </div>
      </motion.button>

      {/* Google Play SVG Button */}
      <motion.button
        type="button"
        onClick={() => openComingSoon("android")}
        whileHover={{ y: -2.5, scale: 1.015 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 360, damping: 24 }}
        aria-label={
          locale === "ar"
            ? "تطبيق معاون قريبًا على Google Play"
            : "Moawen is coming soon to Google Play"
        }
        className={`group relative inline-flex items-center gap-3 rounded-2xl border px-5 py-3 transition-all duration-300 hover:shadow-[0_12px_30px_-8px_rgba(148,122,182,0.42)] ${badgeSurface}`}
      >
        <svg
          viewBox="0 0 24 26"
          className="h-7 w-6 shrink-0 transition-transform duration-300 group-hover:scale-105"
          aria-hidden="true"
        >
          <path
            d="M1.5 1.4C1.18 1.74 1 2.27 1 2.95v20.1c0 .68.18 1.21.5 1.55l.08.08L12.9 13.36v-.26L1.58 1.32l-.08.08z"
            fill={isDark ? "#C4B0DC" : "#947AB6"}
          />
          <path
            d="M16.67 17.13L12.9 13.36v-.26l3.77-3.77.09.05 4.46 2.54c1.27.72 1.27 1.9 0 2.62l-4.46 2.54-.09.05z"
            fill="#947AB6"
          />
          <path
            d="M16.76 17.08L12.9 13.23 1.5 24.6c.42.45 1.12.5 1.91.05l13.35-7.57z"
            fill={isDark ? "#7A609C" : "#674E88"}
          />
          <path
            d="M16.76 9.38L3.41 1.81C2.62 1.36 1.92 1.41 1.5 1.86L12.9 13.23l3.86-3.85z"
            fill={isDark ? "#E6DDF2" : "#B8A3D1"}
          />
        </svg>
        <div className="flex flex-col text-start leading-tight" dir="ltr">
          <span
            className={`text-[10px] font-medium uppercase tracking-wider ${subTextColor}`}
          >
            GET IT ON
          </span>
          <span className="font-poppins text-base font-semibold tracking-tight">
            Google Play
          </span>
        </div>
      </motion.button>
    </div>
  );
}
