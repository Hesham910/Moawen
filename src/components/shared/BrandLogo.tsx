"use client";

import React from "react";
import { BRAND_ASSETS } from "@/config/mockups";
import { useAppPreferences } from "@/context/AppPreferencesContext";

export function BrandLogo({ className = "h-10 w-auto" }: { className?: string }) {
  const { theme, locale } = useAppPreferences();
  const src = theme === "dark" ? BRAND_ASSETS.logoDark : BRAND_ASSETS.logoLight;

  return (
    <img
      src={src}
      alt={locale === "ar" ? "شعار معاون" : "Moawen Logo"}
      className={`select-none object-contain transition-opacity duration-200 ${className}`}
    />
  );
}
