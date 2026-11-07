"use client";

import React from "react";
import { motion } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Palette,
  Code2,
  PenTool,
  Megaphone,
  Languages,
  BarChart3,
  Clapperboard,
  Lightbulb,
} from "lucide-react";
import { TextEffect } from "@/components/core/text-effect";
import { InView } from "@/components/core/in-view";
import { useAppPreferences } from "@/context/AppPreferencesContext";

const ROLE_ICONS = [
  Palette,
  Code2,
  PenTool,
  Megaphone,
  Languages,
  BarChart3,
  Clapperboard,
  Lightbulb,
];

/* Auxiliary accent rotation for the role ticker icon chips (~30% usage) */
const ROLE_ACCENTS = [
  { text: "var(--aux-teal)", bg: "rgb(var(--aux-teal-rgb) / 0.14)" },
  { text: "var(--aux-amber)", bg: "rgb(var(--aux-amber-rgb) / 0.14)" },
  { text: "var(--aux-blue)", bg: "rgb(var(--aux-blue-rgb) / 0.14)" },
  { text: "var(--aux-rose)", bg: "rgb(var(--aux-rose-rgb) / 0.14)" },
  { text: "var(--aux-green)", bg: "rgb(var(--aux-green-rgb) / 0.14)" },
];

/**
 * "وسّع فرصك مع معاون" section — adopted exactly from
 * moaven-landing-page-prototype2 (badge, headline, sub, description,
 * CTA + micro note, decorative rings, vertical role ticker) and unified
 * with the approved model's design system (brand #947AB6, dictionary,
 * rounded-2xl buttons, Coming-Soon dialog trigger).
 */
export function FreelancerSection() {
  const { theme, locale, dir, t, openComingSoon } = useAppPreferences();
  const isDark = theme === "dark";
  const ArrowIcon = dir === "rtl" ? ArrowLeft : ArrowRight;
  const roles = [...t.freelancer.roles, ...t.freelancer.roles];

  return (
    <section id="freelancer" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <InView>
          <div
            style={{
              backgroundImage: isDark
                ? "linear-gradient(to bottom right, rgb(148 122 182 / 0.20), #171E26 55%, rgb(var(--aux-teal-rgb) / 0.10))"
                : "linear-gradient(to bottom right, rgb(148 122 182 / 0.16), #FFFFFF 55%, rgb(var(--aux-teal-rgb) / 0.10))",
            }}
            className="relative overflow-hidden rounded-[2.5rem] border border-[#947AB6]/30 p-8 sm:p-12 lg:p-16"
          >
            {/* Decorative concentric rings (prototype2) */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -end-32 -top-32 size-[28rem] rounded-full border border-[#947AB6]/20"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -end-20 -top-20 size-80 rounded-full border border-[#947AB6]/25"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -end-8 -top-8 size-56 rounded-full border border-[#947AB6]/30"
            />

            <div className="relative grid items-center gap-10 lg:grid-cols-[1.2fr_.8fr]">
              {/* Main Copy & CTA Column */}
              <div>
                <span
                  className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-semibold tracking-wide ${
                    isDark
                      ? "border-[#947AB6]/35 bg-[#192028]/90 text-[#C4B0DC]"
                      : "border-[#947AB6]/30 bg-white text-[#674E88]"
                  }`}
                >
                  <BadgeCheck
                    className="h-3.5 w-3.5 text-[#947AB6]"
                    strokeWidth={2}
                  />
                  <span>{t.freelancer.badge}</span>
                </span>

                <TextEffect
                  per="word"
                  as="h2"
                  preset="slide"
                  className={`mt-5 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl lg:text-5xl ${
                    isDark ? "text-[#F5F3FA]" : "text-[#12171D]"
                  }`}
                >
                  {t.freelancer.title}
                </TextEffect>

                <p className="mt-4 text-lg font-bold text-[#947AB6] sm:text-xl">
                  {t.freelancer.subtitle}
                </p>

                <p
                  className={`mt-4 max-w-xl text-base leading-relaxed sm:text-lg ${
                    isDark ? "text-[#B8C2D0]" : "text-[#4A5565]"
                  }`}
                >
                  {t.freelancer.description}
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <button
                    type="button"
                    onClick={() => openComingSoon("freelancer")}
                    className="inline-flex h-13 items-center gap-3 rounded-2xl bg-[#947AB6] px-8 text-base font-bold text-white shadow-[0_14px_32px_-6px_rgba(148,122,182,0.6)] transition-all hover:bg-[#8469A8]"
                  >
                    <span>{t.freelancer.cta}</span>
                    <ArrowIcon className="h-4 w-4" strokeWidth={2.2} />
                  </button>

                  <span
                    className={`text-xs sm:text-sm font-medium ${
                      isDark ? "text-[#9AA6B8]" : "text-[#5C6675]"
                    }`}
                  >
                    {t.freelancer.microNote}
                  </span>
                </div>
              </div>

              {/* Vertical Role Ticker (prototype2) */}
              <div
                className={`relative h-72 overflow-hidden rounded-[2rem] border ${
                  isDark ? "border-white/10 bg-[#12171D]/40" : "border-[#E1D8EE] bg-white/40"
                }`}
                style={{
                  maskImage:
                    "linear-gradient(to bottom, transparent, #000 20%, #000 80%, transparent)",
                  WebkitMaskImage:
                    "linear-gradient(to bottom, transparent, #000 20%, #000 80%, transparent)",
                }}
              >
                <motion.ul
                  animate={{ y: ["0%", "-50%"] }}
                  transition={{ repeat: Infinity, duration: 18, ease: "linear" }}
                  className="space-y-3 p-4"
                >
                  {roles.map((role, i) => {
                    const Icon = ROLE_ICONS[i % ROLE_ICONS.length];
                    const accent = ROLE_ACCENTS[i % ROLE_ACCENTS.length];
                    return (
                      <li
                        key={i}
                        className={`flex items-center gap-3 rounded-2xl border px-4 py-3 ${
                          isDark
                            ? "border-white/[0.07] bg-[#18202A]/80"
                            : "border-[#E5DFEE] bg-white/90"
                        }`}
                      >
                        <span
                          className="grid size-9 shrink-0 place-items-center rounded-xl"
                          style={{ color: accent.text, backgroundColor: accent.bg }}
                        >
                          <Icon className="h-4 w-4" strokeWidth={1.8} />
                        </span>
                        <span
                          className={`text-sm font-semibold ${
                            isDark ? "text-[#F5F3FA]" : "text-[#12171D]"
                          }`}
                        >
                          {role}
                        </span>
                        <span
                          className="ms-auto size-2 shrink-0 rounded-full"
                          style={{ backgroundColor: "var(--aux-teal)" }}
                        />
                      </li>
                    );
                  })}
                </motion.ul>
              </div>
            </div>
          </div>
        </InView>
      </div>
    </section>
  );
}
