"use client";

import React, { useEffect, useState, useCallback } from "react";
import { motion } from "motion/react";
import {
  MessageSquare,
  FileCheck,
  ShieldCheck,
  Radar,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { TextEffect } from "@/components/core/text-effect";
import { InView } from "@/components/core/in-view";
import { PhoneMockup } from "@/components/shared/PhoneMockup";
import { StoreButtons } from "@/components/shared/StoreButtons";
import { PRODUCT_EXPERIENCE_SCREENS } from "@/config/mockups";
import { useAppPreferences } from "@/context/AppPreferencesContext";

const PILLAR_ICONS = [MessageSquare, FileCheck, ShieldCheck, Radar];

/* Auxiliary accent rotation for pillar icon backgrounds (~30% usage) */
const PILLAR_ACCENTS = [
  { text: "var(--aux-teal)", bg: "rgb(var(--aux-teal-rgb) / 0.14)" },
  { text: "var(--aux-amber)", bg: "rgb(var(--aux-amber-rgb) / 0.14)" },
  { text: "var(--aux-blue)", bg: "rgb(var(--aux-blue-rgb) / 0.14)" },
  { text: "var(--aux-rose)", bg: "rgb(var(--aux-rose-rgb) / 0.14)" },
];

export function ProductExperienceSection() {
  const { theme, t } = useAppPreferences();
  const isDark = theme === "dark";

  const screens = PRODUCT_EXPERIENCE_SCREENS; // 10 screens
  const totalScreens = screens.length; // 10
  // 3x circular buffer so infinite looping is 100% seamless
  const extendedScreens = [...screens, ...screens, ...screens];

  // Start at index 10 (first item of middle copy)
  const [activeIndex, setActiveIndex] = useState(totalScreens);
  const [instantJump, setInstantJump] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [autoPlayAllowed, setAutoPlayAllowed] = useState(true);

  useEffect(() => {
    const checkViewport = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkViewport();
    window.addEventListener("resize", checkViewport);
    return () => window.removeEventListener("resize", checkViewport);
  }, []);

  // Auto-advance must respect prefers-reduced-motion and pause while the tab
  // is hidden (no wasted work, no battery drain).
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setAutoPlayAllowed(!media.matches && document.visibilityState === "visible");
    update();
    media.addEventListener("change", update);
    document.addEventListener("visibilitychange", update);
    return () => {
      media.removeEventListener("change", update);
      document.removeEventListener("visibilitychange", update);
    };
  }, []);

  const cardWidth = isMobile ? 184 : 228;
  // Tighter spacing between the screens in the slider (user spec:
  // "تقريب المسافة بين الاسكرينات") — 32→16px desktop, 20→12px mobile.
  const gap = isMobile ? 12 : 16;
  const step = cardWidth + gap;

  const advanceNext = useCallback(() => {
    setInstantJump(false);
    setActiveIndex((prev) => prev + 1);
  }, []);

  const advancePrev = useCallback(() => {
    setInstantJump(false);
    setActiveIndex((prev) => prev - 1);
  }, []);

  // Auto-advance every 5 seconds (5000ms), only when allowed
  useEffect(() => {
    if (!autoPlayAllowed) return;
    const timer = setInterval(() => {
      advanceNext();
    }, 5000);
    return () => clearInterval(timer);
  }, [advanceNext, activeIndex, autoPlayAllowed]);

  // Seamless circular loop reset when crossing boundary of middle copy
  useEffect(() => {
    if (activeIndex >= totalScreens * 2) {
      const timeout = setTimeout(() => {
        setInstantJump(true);
        setActiveIndex(activeIndex - totalScreens);
      }, 880);
      return () => clearTimeout(timeout);
    }
    if (activeIndex < totalScreens) {
      const timeout = setTimeout(() => {
        setInstantJump(true);
        setActiveIndex(activeIndex + totalScreens);
      }, 880);
      return () => clearTimeout(timeout);
    }
  }, [activeIndex, totalScreens]);

  const normalizedIndex =
    ((activeIndex % totalScreens) + totalScreens) % totalScreens;

  const pageBgHex = isDark ? "#12171D" : "#F8F7FC";

  return (
    <section id="product-experience" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <TextEffect
            per="word"
            as="h2"
            preset="slide"
            className={`text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl ${
              isDark ? "text-[#F5F3FA]" : "text-[#12171D]"
            }`}
          >
            {t.productExperience.title}
          </TextEffect>
          <p
            className={`mx-auto mt-4 max-w-2xl text-base leading-relaxed sm:text-lg ${
              isDark ? "text-[#B6C0CE]" : "text-[#4D5766]"
            }`}
          >
            {t.productExperience.summary}
          </p>
        </div>

        {/* 4 Experience Pillars — EXACTLY 2 rows with 2 cards per row (user spec),
            reduced height, one-line description, and a perfectly SQUARE icon box
            whose height matches the title+description block beside it */}
        <InView className="mx-auto mt-12 grid w-full max-w-5xl grid-cols-1 gap-4 sm:grid-cols-2">
          {t.productExperience.pillars.map((pillar, idx) => {
            const Icon = PILLAR_ICONS[idx % PILLAR_ICONS.length];
            const accent = PILLAR_ACCENTS[idx % PILLAR_ACCENTS.length];
            return (
              <div
                key={pillar.id}
                className={`rounded-2xl border px-5 py-4 transition-colors hover:border-[#947AB6]/50 ${
                  isDark
                    ? "border-[#252F3C] bg-[#161D26]/80"
                    : "border-[#E3DCF0] bg-white shadow-xs"
                }`}
              >
                <div className="flex items-stretch gap-4">
                  {/* PERFECT SQUARE icon box — fixed size-14 (56×56) so width
                      always equals height with the icon dead-center (user spec:
                      "مربعة تماما... وليست كشكل بيضاوي"). A fixed size is
                      deterministic across browsers, unlike aspect-ratio which
                      collapsed next to self-stretch. */}
                  <div
                    className="flex size-14 shrink-0 items-center justify-center rounded-xl self-center"
                    style={{ color: accent.text, backgroundColor: accent.bg }}
                  >
                    <Icon className="h-6 w-6" strokeWidth={1.8} />
                  </div>
                  <div className="flex min-w-0 flex-col justify-center">
                    <h3
                      className={`text-base font-extrabold ${
                        isDark ? "text-[#F5F3FA]" : "text-[#12171D]"
                      }`}
                    >
                      {pillar.title}
                    </h3>
                    {/* One-line description only */}
                    <p
                      className={`mt-1 truncate text-sm leading-relaxed ${
                        isDark ? "text-[#B0BCCB]" : "text-[#525D6D]"
                      }`}
                    >
                      {pillar.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </InView>
      </div>

      {/* 10-Screen Horizontal Auto-Slider with Stationary Center Phone Frame */}
      <div className="relative mt-14 w-full overflow-hidden py-8">
        {/* Ambient #947AB6 Center Glow behind Stationary Phone Frame */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 left-1/2 -z-10 h-[380px] w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-35 blur-[95px]"
          style={{
            background:
              "radial-gradient(circle, rgba(148,122,182,0.75) 0%, transparent 72%)",
          }}
        />

        {/* Force LTR geometry for deterministic horizontal slider track */}
        <div dir="ltr" className="relative mx-auto w-full">
          {/* Frame + Track share ONE relative wrapper, so the stationary frame is
              centered exactly on the screens (no longer offset downward by the
              controls below) — the frame sits higher and contains the screen fully */}
          <div className="relative">
            {/* Stationary Center Phone Frame Overlay — sized EXACTLY like the
                screenshot inside (same width & height, no extra bottom space) */}
            <div
              data-cursor="interactive"
              style={{
                width: `${cardWidth - 12}px`,
              }}
              className="group pointer-events-auto absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2"
            >
              {/* Delicate 4-sided offset hover border around the center screen */}
              <div
                aria-hidden="true"
                className="pointer-events-none -inset-[10px] absolute rounded-[36px] border-[1.25px] border-[#947AB6]/90 opacity-0 scale-[0.985] shadow-[0_0_32px_rgba(148,122,182,0.35)] transition-all duration-300 ease-out group-hover:opacity-100 group-hover:scale-100"
              />

              {/* Screen-precise outline (matches PhoneMockup screen: rounded-[26px], aspect 390/844) */}
              <div
                className={`relative aspect-[390/844] w-full rounded-[26px] pointer-events-none ${
                  isDark
                    ? "ring-[2.5px] ring-[#947AB6]/75 shadow-[0_28px_70px_-15px_rgba(0,0,0,0.85),0_0_35px_rgba(148,122,182,0.22)]"
                    : "ring-[2.5px] ring-[#947AB6] shadow-[0_28px_70px_-15px_rgba(18,23,29,0.28),0_0_35px_rgba(148,122,182,0.2)]"
                }`
              }
              />
            </div>

            {/* Horizontal Sliding Track of 10 Circular Screens (No captions/titles!) */}
            <div
              className="relative w-full overflow-hidden py-4"
              role="group"
              aria-roledescription="carousel"
              aria-label={t.a11y.carouselLabel}
            >
              <motion.div
                className="relative left-1/2 flex items-center"
                style={{ gap: `${gap}px` }}
                animate={{
                  x: -(activeIndex * step + cardWidth / 2),
                }}
                transition={
                  instantJump
                    ? { duration: 0 }
                    : { duration: 0.85, ease: [0.22, 1, 0.36, 1] }
                }
              >
                {extendedScreens.map((screenSrc, idx) => {
                  const isCentered = idx === activeIndex;
                  // Distance-based depth: the farther a screen sits from the frame
                  // the smaller it gets; entering the frame restores natural size
                  const rawDist = Math.abs(idx - activeIndex);
                  const circularDist = Math.min(
                    rawDist,
                    extendedScreens.length - rawDist
                  );
                  const depthScale =
                    circularDist === 0
                      ? 1
                      : Math.max(0.6, 1 - circularDist * 0.12);
                  return (
                    <div
                      key={`slide-${idx}`}
                      style={{ width: `${cardWidth}px` }}
                      onClick={() => {
                        setInstantJump(false);
                        setActiveIndex(idx);
                      }}
                      className="shrink-0 cursor-pointer"
                    >
                      <motion.div
                        animate={{ scale: depthScale }}
                        transition={
                          instantJump
                            ? { duration: 0 }
                            : { duration: 0.85, ease: [0.22, 1, 0.36, 1] }
                        }
                        className="will-change-transform"
                      >
                        <PhoneMockup
                          src={screenSrc}
                          isGrayscale={!isCentered}
                          hideFrameBorder
                        />
                      </motion.div>
                    </div>
                  );
                })}
              </motion.div>

              {/* Left & Right Soft Edge Fade Masks matching page background */}
              <div
                aria-hidden="true"
                className="pointer-events-none inset-y-0 left-0 z-10 w-16 sm:w-32 md:w-48 absolute"
                style={{
                  background: `linear-gradient(to right, ${pageBgHex} 0%, transparent 100%)`,
                }}
              />
              <div
                aria-hidden="true"
                className="pointer-events-none inset-y-0 right-0 z-10 w-16 sm:w-32 md:w-48 absolute"
                style={{
                  background: `linear-gradient(to left, ${pageBgHex} 0%, transparent 100%)`,
                }}
              />
            </div>
          </div>

          {/* Minimalist Slider Controls & 5s Progress Indicator (No Screen Titles) */}
          <div className="mt-4 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={advancePrev}
              aria-label={t.a11y.previousScreen}
              className={`inline-flex h-9 w-9 items-center justify-center rounded-xl border transition-all hover:border-[#947AB6] hover:text-[#947AB6] ${
                isDark
                  ? "border-white/10 bg-[#18202A] text-[#C4B0DC]"
                  : "border-[#12171D]/10 bg-white text-[#674E88]"
              }`}
            >
              <ChevronLeft className="h-4 w-4" strokeWidth={2} />
            </button>

            <div className="flex items-center gap-1.5">
              {screens.map((_, dotIdx) => {
                const active = dotIdx === normalizedIndex;
                return (
                  <button
                    key={dotIdx}
                    type="button"
                    aria-label={`${t.a11y.screenNumber} ${dotIdx + 1}`}
                    aria-current={active ? "true" : undefined}
                    onClick={() => {
                      setInstantJump(false);
                      setActiveIndex(totalScreens + dotIdx);
                    }}
                    className={`h-2 rounded-[4px] transition-all duration-300 ${
                      active
                        ? "w-7 bg-[#947AB6]"
                        : isDark
                          ? "w-2 bg-white/20 hover:bg-white/40"
                          : "w-2 bg-[#12171D]/20 hover:bg-[#12171D]/40"
                    }`}
                  />
                );
              })}
            </div>

            <button
              type="button"
              onClick={advanceNext}
              aria-label={t.a11y.nextScreen}
              className={`inline-flex h-9 w-9 items-center justify-center rounded-xl border transition-all hover:border-[#947AB6] hover:text-[#947AB6] ${
                isDark
                  ? "border-white/10 bg-[#18202A] text-[#C4B0DC]"
                  : "border-[#12171D]/10 bg-white text-[#674E88]"
              }`}
            >
              <ChevronRight className="h-4 w-4" strokeWidth={2} />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom CTA: "استكشف التطبيق الآن" + App Store & Google Play SVG Buttons */}
      <div className="mx-auto mt-10 max-w-3xl px-4 text-center">
        <p
          className={`text-lg font-extrabold sm:text-xl ${
            isDark ? "text-[#F5F3FA]" : "text-[#12171D]"
          }`}
        >
          {t.productExperience.exploreCta}
        </p>
        <div className="mt-5">
          <StoreButtons align="center" />
        </div>
      </div>
    </section>
  );
}
