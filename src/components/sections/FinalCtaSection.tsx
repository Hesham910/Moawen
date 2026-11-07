"use client";

import React from "react";
import { TextEffect } from "@/components/core/text-effect";
import { InView } from "@/components/core/in-view";
import { StoreButtons } from "@/components/shared/StoreButtons";
import { useAppPreferences } from "@/context/AppPreferencesContext";

export function FinalCtaSection() {
  const { theme, t } = useAppPreferences();
  const isDark = theme === "dark";

  return (
    <section id="final-cta" className="relative w-full py-16 sm:py-24">
      {/* Full screen-width container — exactly the width of the viewport,
          same internal formatting as the approved model */}
      <InView>
        <div
          className={`relative w-full overflow-hidden border-x-0 px-6 py-14 text-center sm:px-12 sm:py-20 ${
            isDark
              ? "border-y border-[#947AB6]/40 bg-gradient-to-b from-[#1B222E] via-[#151B24] to-[#12171D]"
              : "border-y border-[#947AB6]/35 bg-gradient-to-b from-[#FFFFFF] via-[#F7F3FC] to-[#EFE8FA] shadow-2xl shadow-[#947AB6]/15"
          }`}
        >
          {/* Central #947AB6 Aura */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-0 left-1/2 h-64 w-[520px] -translate-x-1/2 rounded-full bg-[#947AB6]/25 blur-[110px]"
          />

          <div className="relative mx-auto max-w-3xl">
            <TextEffect
              per="word"
              as="h2"
              preset="slide"
              className={`text-3xl font-extrabold leading-[1.3] tracking-tight sm:text-4xl lg:text-5xl ${
                isDark ? "text-[#F5F3FA]" : "text-[#12171D]"
              }`}
            >
              {t.finalCta.title}
            </TextEffect>

            <p
              className={`mx-auto mt-5 max-w-2xl text-base leading-relaxed sm:text-lg ${
                isDark ? "text-[#B8C2D0]" : "text-[#4A5565]"
              }`}
            >
              {t.finalCta.subtitle}
            </p>

            <div className="mt-9">
              <StoreButtons align="center" />
            </div>
          </div>
        </div>
      </InView>
    </section>
  );
}
