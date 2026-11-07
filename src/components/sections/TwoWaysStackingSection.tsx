"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import {
  Compass,
  FileSearch,
  ShoppingBag,
  FilePlus2,
  GitCompareArrows,
  UserCheck,
} from "lucide-react";
import { TextEffect } from "@/components/core/text-effect";
import { InView } from "@/components/core/in-view";
import { useAppPreferences } from "@/context/AppPreferencesContext";

interface StackCardItem {
  id: string;
  trackIndex: 1 | 2;
  trackBadge: string;
  stepNum: string;
  stepTitle: string;
  stepDesc: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
}

const TILT_ZONES = Array.from({ length: 25 }, (_, i) => `tr-${i + 1}`);

/**
 * Single scrolling step card.
 * Keeps the scroll-down stacking effect and adopts the same 25-Zone 3D Tilt
 * + Sibling Focus Glow hover behavior as the "لأن إنجاز العمل لا يجب أن يكون معقدًا" cards.
 * The old icon background box is removed — icon & number are subtly ghosted
 * in a modern, professional way (oversized gradient watermark number).
 */
function StackingCard({
  item,
  index,
  total,
  progress,
  isDark,
}: {
  item: StackCardItem;
  index: number;
  total: number;
  progress: MotionValue<number>;
  isDark: boolean;
}) {
  const targetScale = 1 - (total - index) * 0.025;
  const startRange = index / total;
  const scale = useTransform(progress, [startRange, 1], [1, targetScale]);

  const Icon = item.icon;

  return (
    <div
      id={`stack-card-${index}`}
      style={{
        top: `calc(96px + ${index * 18}px)`,
      }}
      className="sticky mb-6 sm:mb-8"
    >
      <motion.div style={{ scale }} className="why-tilt-container relative">
        <div className="why-tilt-canvas">
          {/* 25 Invisible Hover Zones for Pure Smooth 3D Tilt */}
          {TILT_ZONES.map((zoneClass) => (
            <div key={zoneClass} className={`why-tilt-tracker ${zoneClass}`} />
          ))}

          {/* 3D Tilting Card Surface */}
          <div
            className={`why-tilt-card relative overflow-hidden rounded-3xl border p-6 sm:p-8 lg:p-10 transition-colors duration-300 ${
              isDark
                ? "border-[#947AB6]/35 bg-[#171E27] shadow-[0_24px_60px_-15px_rgba(0,0,0,0.72)]"
                : "border-[#947AB6]/30 bg-[#FFFFFF] shadow-[0_20px_50px_-12px_rgba(148,122,182,0.18)]"
            }`}
          >
            {/* Top subtle accent line */}
            <div
              aria-hidden="true"
              className="absolute top-0 inset-x-0 h-[2px]"
              style={{
                background:
                  "linear-gradient(90deg, transparent, #947AB6, transparent)",
              }}
            />

            {/* Oversized ghost step number — modern watermark treatment */}
            <span
              aria-hidden="true"
              className="font-poppins pointer-events-none absolute -bottom-5 end-4 select-none text-[5.5rem] sm:text-[7rem] font-extrabold leading-none tracking-tighter text-transparent bg-clip-text"
              style={{
                backgroundImage: isDark
                  ? "linear-gradient(to bottom, rgba(148,122,182,0.32), rgba(148,122,182,0.02))"
                  : "linear-gradient(to bottom, rgba(148,122,182,0.4), rgba(148,122,182,0.03))",
              }}
            >
              {item.stepNum}
            </span>

            <div className="relative">
              {/* Badge + bare icon row (icon background box removed, icon subtly ghosted) */}
              <div className="flex items-center justify-between gap-4">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#947AB6]/18 px-3 py-1 text-xs font-bold text-[#947AB6]">
                  {item.trackBadge}
                </span>
                <Icon
                  className="h-7 w-7 text-[#947AB6] opacity-70"
                  strokeWidth={1.6}
                />
              </div>

              <h3
                className={`mt-4 max-w-xl text-xl font-extrabold sm:text-2xl lg:text-3xl ${
                  isDark ? "text-[#F5F3FA]" : "text-[#12171D]"
                }`}
              >
                {item.stepTitle}
              </h3>

              <p
                className={`mt-2.5 max-w-2xl text-base leading-relaxed sm:text-lg ${
                  isDark ? "text-[#C0CAD8]" : "text-[#475261]"
                }`}
              >
                {item.stepDesc}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/**
 * One full track (path): centered tag + title + description header,
 * followed by its own scroll-driven stacking deck of 3 step cards.
 */
function TrackBlock({
  trackIndex,
  badge,
  title,
  lead,
  steps,
  icons,
  isDark,
}: {
  trackIndex: 1 | 2;
  badge: string;
  title: string;
  lead: string;
  steps: Array<{ num: string; title: string; desc: string }>;
  icons: Array<React.ComponentType<{ className?: string; strokeWidth?: number }>>;
  isDark: boolean;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  const cards: StackCardItem[] = steps.map((step, i) => ({
    id: `t${trackIndex}-${step.num}`,
    trackIndex,
    trackBadge: badge,
    stepNum: step.num,
    stepTitle: step.title,
    stepDesc: step.desc,
    icon: icons[i],
  }));

  return (
    <div className="mt-12">
      {/* Centered Track Header: tag above, title below — description line removed,
          cards pulled closer to the titles */}
      <InView className="mx-auto max-w-3xl text-center">
        <span className="inline-flex items-center gap-2 rounded-full bg-[#947AB6]/15 px-3.5 py-1 text-xs font-bold text-[#947AB6]">
          {badge}
        </span>
        <h3
          className={`mt-4 text-2xl font-extrabold tracking-tight sm:text-3xl lg:text-4xl ${
            isDark ? "text-[#F5F3FA]" : "text-[#12171D]"
          }`}
        >
          {title} <span className="text-[#947AB6]">{lead}</span>
        </h3>
      </InView>

      {/* Scroll-Driven Stacking Cards Deck (same scroll-down effect) */}
      <div ref={trackRef} className="relative mt-7 pb-6">
        {cards.map((item, idx) => (
          <StackingCard
            key={item.id}
            item={item}
            index={idx}
            total={cards.length}
            progress={scrollYProgress}
            isDark={isDark}
          />
        ))}
      </div>
    </div>
  );
}

export function TwoWaysStackingSection() {
  const { theme, t } = useAppPreferences();
  const isDark = theme === "dark";

  const track1Icons = [Compass, FileSearch, ShoppingBag];
  const track2Icons = [FilePlus2, GitCompareArrows, UserCheck];

  return (
    <section id="how-it-works" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <TextEffect
            per="word"
            as="h2"
            preset="slide"
            className={`text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl ${
              isDark ? "text-[#F5F3FA]" : "text-[#12171D]"
            }`}
          >
            {t.twoWays.title}
          </TextEffect>

          <p
            className={`mx-auto mt-4 max-w-2xl text-base leading-relaxed sm:text-lg ${
              isDark ? "text-[#B6C0CE]" : "text-[#4D5766]"
            }`}
          >
            {t.twoWays.subtitle}
          </p>
        </div>

        {/* Track 1 — separated path with its own centered header & stacking deck */}
        <TrackBlock
          trackIndex={1}
          badge={t.twoWays.track1Badge}
          title={t.twoWays.track1Title}
          lead={t.twoWays.track1Lead}
          steps={t.twoWays.track1Steps}
          icons={track1Icons}
          isDark={isDark}
        />

        {/* Track 2 — separated path with its own centered header & stacking deck */}
        <TrackBlock
          trackIndex={2}
          badge={t.twoWays.track2Badge}
          title={t.twoWays.track2Title}
          lead={t.twoWays.track2Lead}
          steps={t.twoWays.track2Steps}
          icons={track2Icons}
          isDark={isDark}
        />
      </div>
    </section>
  );
}
