"use client";

import React from "react";
import { useAppPreferences } from "@/context/AppPreferencesContext";

/**
 * Client island that only owns the theme-dependent page surface (background
 * & text colors). Lets `app/page.tsx` stay a Server Component while the
 * interactive sections remain client components.
 */
export function ThemeSurface({ children }: { children: React.ReactNode }) {
  const { theme } = useAppPreferences();
  const isDark = theme === "dark";

  return (
    <div
      className={`min-h-screen overflow-x-clip transition-colors duration-300 ${
        isDark ? "bg-[#12171D] text-[#F5F3FA]" : "bg-[#F8F7FC] text-[#12171D]"
      }`}
    >
      {children}
    </div>
  );
}
