"use client";

import React from "react";
import Link from "next/link";
import {
  MessageSquareMore,
  FileCheck2,
  CreditCard,
  Clock,
  Star,
  LockKeyhole,
  CalendarCheck2,
  Headphones,
  ShieldCheck,
  Scale,
} from "lucide-react";
import { TextEffect } from "@/components/core/text-effect";
import { InView } from "@/components/core/in-view";
import { useAppPreferences } from "@/context/AppPreferencesContext";

const CARD_ICONS = [
  MessageSquareMore,
  FileCheck2,
  CreditCard,
  Clock,
  Star,
  LockKeyhole,
  CalendarCheck2,
  Headphones,
];

const TILT_ZONES = Array.from({ length: 25 }, (_, i) => `tr-${i + 1}`);

/* Auxiliary accent rotation for card index numbers & accent bars (~30% usage) */
const CARD_ACCENTS = [
  "var(--aux-teal)",
  "var(--aux-amber)",
  "var(--aux-blue)",
  "var(--aux-rose)",
  "var(--aux-green)",
];

export function WhyMoawenSection() {
  const { theme, t } = useAppPreferences();
  const isDark = theme === "dark";

  return (
    <section id="why-moawen" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Heading — widened + tuned type scale so the Arabic title
            sits on ONE single line in desktop mode (user spec) */}
        <div className="mx-auto max-w-5xl text-center">
          <TextEffect
            per="word"
            as="h2"
            preset="slide"
            className={`text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-[44px] xl:text-5xl ${
              isDark ? "text-[#F5F3FA]" : "text-[#12171D]"
            }`}
          >
            {t.whyMoawen.title}
          </TextEffect>

          <p
            className={`mx-auto mt-4 max-w-2xl text-base leading-relaxed sm:text-lg ${
              isDark ? "text-[#B6C0CE]" : "text-[#4D5766]"
            }`}
          >
            {t.whyMoawen.subtitle}
          </p>
        </div>

        {/* 8 Cards with 25-Zone 3D Perspective Tilt + Sibling Focus Glow/Blur */}
        <InView className="mt-14">
          <div className="why-cards-grid grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {t.whyMoawen.cards.map((card, idx) => {
              const Icon = CARD_ICONS[idx % CARD_ICONS.length];
              return (
                <div
                  key={card.id}
                  data-cursor="interactive"
                  className="why-tilt-container relative min-h-[250px] sm:min-h-[268px]"
                >
                  <div className="why-tilt-canvas">
                    {/* 25 Invisible Hover Zones for Pure Smooth 3D Tilt */}
                    {TILT_ZONES.map((zoneClass) => (
                      <div
                        key={zoneClass}
                        className={`why-tilt-tracker ${zoneClass}`}
                      />
                    ))}

                    {/* 3D Tilting Card Surface */}
                    <div
                      className={`why-tilt-card flex flex-col justify-between rounded-3xl border p-6 transition-all duration-300 ${
                        isDark
                          ? "border-[#27313E] bg-gradient-to-br from-[#18202A] via-[#151C24] to-[#12171D]"
                          : "border-[#E1D8EE] bg-gradient-to-br from-[#FFFFFF] via-[#FAF8FD] to-[#F3EEFA] shadow-md shadow-[#947AB6]/10"
                      }`}
                    >
                      <div>
                        <div className="mb-5 flex items-center justify-between">
                          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#947AB6]/35 bg-[#947AB6]/15 text-[#947AB6]">
                            <Icon className="h-6 w-6" strokeWidth={1.8} />
                          </div>
                          <span
                            className="font-poppins text-xs font-bold opacity-70"
                            style={{ color: CARD_ACCENTS[idx % CARD_ACCENTS.length] }}
                          >
                            0{idx + 1}
                          </span>
                        </div>

                        <h3
                          className={`text-lg font-extrabold leading-snug ${
                            isDark ? "text-[#F5F3FA]" : "text-[#12171D]"
                          }`}
                        >
                          {card.title}
                        </h3>

                        <p
                          className={`mt-2.5 text-sm leading-relaxed ${
                            isDark ? "text-[#B4BFCE]" : "text-[#4E5866]"
                          }`}
                        >
                          {card.description}
                        </p>
                      </div>

                      {/* Bottom subtle accent bar — auxiliary color rotation */}
                      <div
                        className="mt-5 h-[2px] w-10 rounded-full opacity-60 transition-all duration-300 why-tilt-bar"
                        style={{ backgroundColor: CARD_ACCENTS[idx % CARD_ACCENTS.length] }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </InView>

        {/* Legal Links Row: Privacy Policy & Terms & Conditions */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/privacy"
            className={`btn-bubbles inline-flex items-center gap-2.5 rounded-2xl border px-6 py-3.5 text-sm font-bold transition-all duration-200 hover:-translate-y-0.5 hover:border-[#947AB6] hover:text-[#947AB6] ${
              isDark
                ? "border-[#2B3644] bg-[#171E27] text-[#E6DDF2]"
                : "border-[#D8CFE6] bg-white text-[#12171D] shadow-xs"
            }`}
          >
            <ShieldCheck className="h-4 w-4 text-[#947AB6]" strokeWidth={2} />
            <span>{t.whyMoawen.privacyBtn}</span>
          </Link>

          <Link
            href="/terms"
            className={`btn-bubbles inline-flex items-center gap-2.5 rounded-2xl border px-6 py-3.5 text-sm font-bold transition-all duration-200 hover:-translate-y-0.5 hover:border-[#947AB6] hover:text-[#947AB6] ${
              isDark
                ? "border-[#2B3644] bg-[#171E27] text-[#E6DDF2]"
                : "border-[#D8CFE6] bg-white text-[#12171D] shadow-xs"
            }`}
          >
            <Scale className="h-4 w-4 text-[#947AB6]" strokeWidth={2} />
            <span>{t.whyMoawen.termsBtn}</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
