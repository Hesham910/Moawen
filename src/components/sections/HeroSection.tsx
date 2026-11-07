"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowDown } from "lucide-react";
import { TextEffect } from "@/components/core/text-effect";
import { StoreButtons } from "@/components/shared/StoreButtons";
import { PhoneMockup } from "@/components/shared/PhoneMockup";
import { HERO_MOCKUP_SCREENS } from "@/config/mockups";
import { useAppPreferences } from "@/context/AppPreferencesContext";

export function HeroSection() {
  const { theme, t } = useAppPreferences();
  const isDark = theme === "dark";
  const heroContainerRef = useRef<HTMLElement>(null);

  // Scroll-over-hero choreography:
  // As the user scrolls down, the upper content smoothly blurs/fades out
  // while the 3 phone frames glide up over it (prototype2 scroll effect).
  const { scrollYProgress } = useScroll({
    target: heroContainerRef,
    offset: ["start start", "end start"],
  });

  const contentOpacity = useTransform(scrollYProgress, [0, 0.42], [1, 0]);
  const contentBlur = useTransform(
    scrollYProgress,
    [0, 0.42],
    ["blur(0px)", "blur(12px)"]
  );
  const contentScale = useTransform(scrollYProgress, [0, 0.42], [1, 0.94]);
  const contentY = useTransform(scrollYProgress, [0, 0.42], [0, -32]);

  const mockupsY = useTransform(scrollYProgress, [0, 0.55], [0, -90]);
  const mockupsScale = useTransform(scrollYProgress, [0, 0.5], [0.97, 1.03]);

  // Central brand aura intensifies as the frames rise — exact prototype2 glow ramp
  const auraOpacity = useTransform(scrollYProgress, [0, 1], [0.35, 0.9]);

  // Exact page background color for bottom-to-middle gradient blending
  const pageBgHex = isDark ? "#12171D" : "#F8F7FC";

  return (
    <section
      id="hero"
      ref={heroContainerRef}
      className="relative w-full pt-8 pb-10 sm:pt-12 lg:min-h-[128vh]"
    >
      {/* Architectural Grid + Noise Backdrop (prototype2) — very light lines */}
      <div aria-hidden="true" className="grid-noise pointer-events-none absolute inset-0 -z-20" />

      {/* Modern Light Glow — soft top-center light beam + faint teal/amber
          auxiliary accents (pure CSS, opacity-only breathing animation) */}
      <div aria-hidden="true" className="hero-light pointer-events-none absolute inset-0 -z-20" />

      {/* Auxiliary Teal Ambient Blob (left) — exact prototype2 hero backdrop */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-1/3 -z-10 h-72 w-72 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, rgb(var(--aux-teal-rgb) / 0.22), transparent)",
        }}
      />

      {/* Auxiliary Amber Ambient Blob (right) — exact prototype2 hero backdrop */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 top-[12%] -z-10 h-64 w-64 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, rgb(var(--aux-amber-rgb) / 0.18), transparent)",
        }}
      />

      {/* Central #947AB6 Radial Aura — prototype2 hero glow (top-[20%], 60vh × 90vw,
          closest-side radial, scroll-driven opacity 0.35 → 0.9) */}
      <motion.div
        aria-hidden="true"
        style={{ opacity: auraOpacity }}
        className="pointer-events-none absolute top-[20%] left-1/2 -z-10 h-[60vh] w-[90vw] -translate-x-1/2 rounded-full blur-3xl"
      >
        <div
          className="h-full w-full rounded-full"
          style={{
            background:
              "radial-gradient(closest-side, rgba(148,122,182,0.35) 0%, rgba(148,122,182,0) 100%)",
          }}
        />
      </motion.div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Sticky Upper Hero Content that blurs & fades smoothly as frames scroll over */}
        <motion.div
          style={{
            opacity: contentOpacity,
            filter: contentBlur,
            scale: contentScale,
            y: contentY,
          }}
          className="lg:sticky lg:top-24 z-10 mx-auto max-w-3xl text-center"
        >
          {/* Architectural Eyebrow Pill */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className={`mb-5 inline-flex items-center gap-2.5 rounded-full border px-4 py-1.5 text-xs font-semibold tracking-wide ${
              isDark
                ? "border-[#947AB6]/35 bg-[#192028]/90 text-[#C4B0DC]"
                : "border-[#947AB6]/30 bg-white text-[#674E88] shadow-xs"
            }`}
          >
            <span className="h-2 w-2 rounded-full bg-[var(--aux-teal)]" />
            <span>{t.hero.eyebrow}</span>
          </motion.div>

          {/* Main Headline with TextEffect */}
          <TextEffect
            per="word"
            as="h1"
            preset="slide"
            immediate
            className={`text-4xl font-extrabold leading-[1.2] tracking-tight sm:text-5xl lg:text-6xl ${
              isDark ? "text-[#F5F3FA]" : "text-[#12171D]"
            }`}
          >
            {t.hero.title}
          </TextEffect>

          {/* Hero Description */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.2 }}
            className={`mx-auto mt-5 max-w-2xl text-base leading-relaxed sm:text-lg ${
              isDark ? "text-[#B8C2D0]" : "text-[#4A5565]"
            }`}
          >
            {t.hero.subtitle}
          </motion.p>

          {/* App Store & Google Play SVG Download Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.32 }}
            className="mt-8"
          >
            <StoreButtons align="center" />
          </motion.div>

          {/* Subtle Scroll Cue */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.75 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="mt-6 hidden items-center justify-center gap-2 text-xs font-medium text-[#947AB6] lg:flex"
          >
            <span>{t.hero.scrollHint}</span>
            <motion.span
              animate={{ y: [0, 4, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            >
              <ArrowDown className="h-3.5 w-3.5" strokeWidth={2} />
            </motion.span>
          </motion.div>
        </motion.div>

        {/* 3-Phone Minimalist Mockup Stage Below Content (Glides up over content on scroll) */}
        <motion.div
          style={{
            y: mockupsY,
            scale: mockupsScale,
          }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-20 mx-auto mt-12 sm:mt-16 lg:mt-24 max-w-5xl"
        >
          {/* Force LTR geometry for symmetric left/center/right 3-frame fan */}
          <div
            dir="ltr"
            className="relative flex items-end justify-center pt-6 pb-2"
          >
            {/* Left Tilted Phone Frame (Behind Center — raised up & pulled closer to the middle frame) */}
            <motion.div
              initial={{ opacity: 0, x: 40, rotate: -18 }}
              animate={{ opacity: 1, x: 0, rotate: -30 }}
              transition={{
                duration: 0.85,
                delay: 0.35,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative z-10 -mr-10 sm:-mr-14 md:-mr-16 mb-10 sm:mb-12 w-[145px] sm:w-[205px] md:w-[235px] origin-bottom-right"
            >
              <PhoneMockup src={HERO_MOCKUP_SCREENS.left} loading="eager" />
            </motion.div>

            {/* Center Vertical Phone Frame (Front & Upright 0deg) — the LCP
                candidate, so it loads eager with fetchpriority=high */}
            <motion.div
              initial={{ opacity: 0, y: 36 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.25,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative z-20 w-[180px] sm:w-[245px] md:w-[275px]"
            >
              <PhoneMockup src={HERO_MOCKUP_SCREENS.center} loading="high" />
            </motion.div>

            {/* Right Tilted Phone Frame (Behind Center — raised up & pulled closer to the middle frame) */}
            <motion.div
              initial={{ opacity: 0, x: -40, rotate: 18 }}
              animate={{ opacity: 1, x: 0, rotate: 30 }}
              transition={{
                duration: 0.85,
                delay: 0.35,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative z-10 -ml-10 sm:-ml-14 md:-ml-16 mb-10 sm:mb-12 w-[145px] sm:w-[205px] md:w-[235px] origin-bottom-left"
            >
              <PhoneMockup src={HERO_MOCKUP_SCREENS.right} loading="eager" />
            </motion.div>

            {/* Bottom-to-Midpoint Gradient Mask merging frames seamlessly with page background —
                refined per user spec: lowered a further 50px (total +100px), height increased
                by 50px (calc(62% + 50px)), and its width now ALWAYS equals the full displayed
                screen width (w-screen centered) on desktop, tablet and mobile alike */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute bottom-0 left-1/2 z-30 h-[calc(62%+50px)] w-screen max-w-none -translate-x-1/2 translate-y-[100px]"
              style={{
                background: `linear-gradient(to top, ${pageBgHex} 12%, ${pageBgHex}F0 42%, ${pageBgHex}80 72%, transparent 100%)`,
              }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
