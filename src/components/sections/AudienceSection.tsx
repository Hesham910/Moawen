"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Briefcase,
  Sparkles,
  ArrowLeft,
  ArrowRight,
  Layers,
  ShieldCheck,
  MessageSquare,
} from "lucide-react";
import { TextEffect } from "@/components/core/text-effect";
import { InView } from "@/components/core/in-view";
import { useAppPreferences } from "@/context/AppPreferencesContext";
import { trackGAEvent } from "@/lib/analytics";

type PersonaKey = "client" | "freelancer";

/* Auxiliary accent rotation for the three workflow step cards (~30% usage) */
const STEP_ACCENTS = [
  { text: "var(--aux-teal)", bg: "rgb(var(--aux-teal-rgb) / 0.14)" },
  { text: "var(--aux-amber)", bg: "rgb(var(--aux-amber-rgb) / 0.14)" },
  { text: "var(--aux-blue)", bg: "rgb(var(--aux-blue-rgb) / 0.14)" },
];

export function AudienceSection() {
  const { theme, locale, dir, t, openComingSoon } = useAppPreferences();
  // Default active state MUST be "client" ("أريد إنجاز شيء")
  const [activePersona, setActivePersona] = useState<PersonaKey>("client");
  const isDark = theme === "dark";

  const handleSelectPersona = (key: PersonaKey) => {
    setActivePersona(key);
    trackGAEvent("audience_switch", { persona: key, locale });
  };

  const current =
    activePersona === "client" ? t.audience.client : t.audience.freelancer;
  const ArrowIcon = dir === "rtl" ? ArrowLeft : ArrowRight;

  const workflowNodes = [
    {
      icon: Layers,
      step: "01",
      titleAr:
        activePersona === "client"
          ? "تحديد الخدمة أو طرح الطلب"
          : "إعداد ملفك وعرض خدماتك",
      titleEn:
        activePersona === "client"
          ? "Select service or post brief"
          : "Build profile & list packages",
    },
    {
      icon: MessageSquare,
      step: "02",
      titleAr:
        activePersona === "client"
          ? "مقارنة العروض والتنسيق المباشر"
          : "تقديم العروض والتواصل الفوري",
      titleEn:
        activePersona === "client"
          ? "Compare offers & chat directly"
          : "Submit proposals & align scope",
    },
    {
      icon: ShieldCheck,
      step: "03",
      titleAr:
        activePersona === "client"
          ? "استلام العمل واعتماد الدفع الآمن"
          : "تسليم الإنجاز وتحصيل المستحقات",
      titleEn:
        activePersona === "client"
          ? "Approve delivery & release escrow"
          : "Deliver work & receive payout",
    },
  ];

  return (
    <section
      id="audience"
      className="relative py-16 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <TextEffect
            per="word"
            as="h2"
            preset="slide"
            className={`text-2xl font-extrabold tracking-tight sm:text-4xl ${
              isDark ? "text-[#F5F3FA]" : "text-[#12171D]"
            }`}
          >
            {t.audience.sectionTitle}
          </TextEffect>
        </div>

        {/* Creative Kinetic Persona Switcher (Not side-by-side cards — switches between the two personas) */}
        <InView className="mt-10">
          <div className="flex justify-center">
            <div
              role="tablist"
              aria-label={t.audience.sectionTitle}
              className={`relative inline-flex w-full max-w-xl items-center rounded-2xl border p-1.5 backdrop-blur-md ${
                isDark
                  ? "border-[#2A3441] bg-[#171E26]"
                  : "border-[#DDD5EA] bg-[#EFEBF7]"
              }`}
            >
              {(["client", "freelancer"] as PersonaKey[]).map((key) => {
                const isActive = activePersona === key;
                const label =
                  key === "client"
                    ? t.audience.clientTab
                    : t.audience.freelancerTab;
                const Icon = key === "client" ? Briefcase : Sparkles;

                return (
                  <button
                    key={key}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => handleSelectPersona(key)}
                    className={`relative z-10 flex flex-1 items-center justify-center gap-2.5 rounded-xl p-4 text-sm sm:text-base font-bold transition-colors duration-200 ${
                      isActive
                        ? "text-white"
                        : isDark
                          ? "text-[#9AA5B4] hover:text-[#F5F3FA]"
                          : "text-[#535E6E] hover:text-[#12171D]"
                    }`}
                  >
                    {isActive ? (
                      <motion.span
                        layoutId="audience-active-pill"
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 30,
                        }}
                        className="absolute inset-0 -z-10 rounded-xl bg-[#947AB6] shadow-[0_8px_24px_-6px_rgba(148,122,182,0.65)]"
                      />
                    ) : null}
                    <Icon className="h-4 w-4 shrink-0" strokeWidth={2} />
                    <span>{label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Single Active Persona Stage with Smooth Crossfade & Scale Transition */}
          <div className="mt-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activePersona}
                initial={{
                  opacity: 0,
                  y: 18,
                  scale: 0.98,
                  filter: "blur(8px)",
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  filter: "blur(0px)",
                }}
                exit={{
                  opacity: 0,
                  y: -14,
                  scale: 0.98,
                  filter: "blur(8px)",
                }}
                transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                className={`relative overflow-hidden rounded-3xl border p-6 sm:p-10 lg:p-12 ${
                  isDark
                    ? "border-[#947AB6]/30 bg-gradient-to-br from-[#181F28] via-[#151B23] to-[#12171D]"
                    : "border-[#947AB6]/25 bg-gradient-to-br from-[#FFFFFF] via-[#FAF8FD] to-[#F3EFFA] shadow-xl shadow-[#947AB6]/8"
                }`}
              >
                {/* Decorative Ambient Glow */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none -top-24 -end-24 absolute h-72 w-72 rounded-full bg-[#947AB6]/18 blur-3xl"
                />

                <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center">
                  {/* Text & Action Column — start side (right in RTL) */}
                  <div className="min-w-0 flex-1">
                    <span className="inline-flex items-center gap-2 rounded-full border border-[#947AB6]/35 bg-[#947AB6]/12 px-3.5 py-1 text-xs font-semibold text-[#947AB6]">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#947AB6]" />
                      {current.badge}
                    </span>

                    <h3
                      className={`mt-4 text-2xl font-extrabold leading-snug sm:text-3xl ${
                        isDark ? "text-[#F5F3FA]" : "text-[#12171D]"
                      }`}
                    >
                      {current.question}
                    </h3>

                    <p
                      className={`mt-3 max-w-2xl text-base leading-relaxed sm:text-lg ${
                        isDark ? "text-[#B6C0CE]" : "text-[#4D5766]"
                      }`}
                    >
                      {current.description}
                    </p>

                    <div className="mt-8 flex flex-wrap items-center gap-4">
                      {activePersona === "client" ? (
                        <motion.a
                          href="#how-it-works"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="btn-bubbles inline-flex h-12 items-center gap-2.5 rounded-2xl bg-[#947AB6] px-7 text-sm sm:text-base font-bold text-white shadow-[0_12px_28px_-6px_rgba(148,122,182,0.55)] transition-all hover:bg-[#8469A8]"
                        >
                          <span>{current.cta}</span>
                          <ArrowIcon className="h-4 w-4" strokeWidth={2.2} />
                        </motion.a>
                      ) : (
                        <motion.button
                          type="button"
                          onClick={() => openComingSoon("freelancer")}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="inline-flex h-12 items-center gap-2.5 rounded-2xl bg-[#947AB6] px-7 text-sm sm:text-base font-bold text-white shadow-[0_12px_28px_-6px_rgba(148,122,182,0.55)] transition-all hover:bg-[#8469A8]"
                        >
                          <span>{current.cta}</span>
                          <ArrowIcon className="h-4 w-4" strokeWidth={2.2} />
                        </motion.button>
                      )}
                    </div>
                  </div>

                  {/* Three Workflow Step Cards — stacked vertically on the END side (left in RTL),
                      free-standing (outer counter removed) with 4-Zone 3D Tilt Hover Effect
                      (Uiverse — dylanharriscameron).
                      Rhythm per user spec: the gap between the three cards is EXACTLY 12px
                      (gap-3), and each card's top/bottom padding equals its left/right
                      padding (uniform p-4, no artificial min-height) so the vertical and
                      horizontal padding are pixel-identical. On hover the card floats
                      ABOVE its neighbors (.tilt3d:hover z-index boost — free effect). */}
                  <div className="flex w-full flex-col gap-3 lg:w-[320px] lg:shrink-0 lg:py-8">
                    {workflowNodes.map((node, i) => {
                      const NodeIcon = node.icon;
                      const accent = STEP_ACCENTS[i % STEP_ACCENTS.length];
                      return (
                        <div key={node.step} className="tilt3d">
                          {/* 4 invisible hover zones driving the 3D tilt (pure CSS) */}
                          <span className="tilt3d-zone" aria-hidden="true" />
                          <span className="tilt3d-zone" aria-hidden="true" />
                          <span className="tilt3d-zone" aria-hidden="true" />
                          <span className="tilt3d-zone" aria-hidden="true" />

                          <div
                            data-cursor="interactive"
                            className={`tilt3d-card flex items-center gap-4 rounded-2xl border p-4 transition-colors ${
                              isDark
                                ? "border-white/[0.07] bg-[#182029]"
                                : "border-[#12171D]/[0.07] bg-[#FAF8FD]"
                            }`}
                          >
                            <div
                              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
                              style={{
                                color: accent.text,
                                backgroundColor: accent.bg,
                              }}
                            >
                              <NodeIcon className="h-5 w-5" strokeWidth={1.8} />
                            </div>
                            <div className="flex-1">
                              <span
                                className="font-poppins text-[11px] font-bold tracking-wider"
                                style={{ color: accent.text }}
                              >
                                STEP {node.step}
                              </span>
                              <p
                                className={`text-sm font-bold leading-snug ${
                                  isDark ? "text-[#F5F3FA]" : "text-[#12171D]"
                                }`}
                              >
                                {locale === "ar" ? node.titleAr : node.titleEn}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </InView>
      </div>
    </section>
  );
}
