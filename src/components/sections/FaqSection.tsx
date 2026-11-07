"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus } from "lucide-react";
import { TextEffect } from "@/components/core/text-effect";
import { InView } from "@/components/core/in-view";
import { useAppPreferences } from "@/context/AppPreferencesContext";

/**
 * FAQ section — same formatting as moaven-landing-page-prototype2:
 * sticky editorial column (eyebrow + title + description) beside a
 * numbered divide-y accordion list with a rotating plus toggle.
 * Unified with the approved model's design system & dictionary
 * (lead Q&A + 8 numbered questions = 9 items, same as prototype2).
 */
export function FaqSection() {
  const { theme, t } = useAppPreferences();
  const isDark = theme === "dark";
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqItems = [
    { q: t.faq.leadQuestion, a: t.faq.leadAnswer },
    ...t.faq.items.map((item) => ({ q: item.question, a: item.answer })),
  ];

  return (
    <section id="faq" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
          {/* Sticky Editorial Column */}
          <InView className="lg:sticky lg:top-28 lg:self-start">
            <span
              className={`inline-flex items-center rounded-full border px-3.5 py-1.5 text-xs font-semibold tracking-wide ${
                isDark
                  ? "border-[#947AB6]/30 bg-[#192028]/90 text-[#C4B0DC]"
                  : "border-[#947AB6]/30 bg-white text-[#674E88]"
              }`}
            >
              FAQ
            </span>
            <TextEffect
              per="word"
              as="h2"
              preset="slide"
              className={`mt-5 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl lg:text-5xl ${
                isDark ? "text-[#F5F3FA]" : "text-[#12171D]"
              }`}
            >
              {t.faq.title}
            </TextEffect>
            <p
              className={`mt-4 max-w-sm text-base leading-relaxed sm:text-lg ${
                isDark ? "text-[#B6C0CE]" : "text-[#4D5766]"
              }`}
            >
              {t.faq.desc}
            </p>
          </InView>

          {/* Numbered Accordion List (divide-y formatting from prototype2) */}
          <InView
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.05 },
              },
            }}
            className={isDark ? "divide-y divide-white/[0.08] border-y border-white/[0.08]" : "divide-y divide-[#12171D]/[0.08] border-y border-[#12171D]/[0.08]"}
          >
            {faqItems.map((item, i) => {
              const isOpen = openIndex === i;
              return (
                <motion.div
                  key={i}
                  variants={{
                    hidden: { opacity: 0, y: 12 },
                    visible: { opacity: 1, y: 0 },
                  }}
                >
                  <button
                    type="button"
                    id={`faq-button-${i}`}
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${i}`}
                    className="group flex w-full items-center gap-4 py-5 text-start"
                  >
                    <span
                      className="font-poppins shrink-0 text-xs font-bold text-[#947AB6]/70"
                      dir="ltr"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={`flex-1 text-base font-bold transition-colors sm:text-lg ${
                        isOpen
                          ? "text-[#947AB6]"
                          : isDark
                            ? "text-[#F5F3FA] group-hover:text-[#C4B0DC]"
                            : "text-[#12171D] group-hover:text-[#7A609C]"
                      }`}
                    >
                      {item.q}
                    </span>
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.3 }}
                      className={`grid size-9 shrink-0 place-items-center rounded-xl border transition-colors ${
                        isOpen
                          ? "border-[#947AB6] bg-[#947AB6] text-white"
                          : isDark
                            ? "border-white/15 text-[#9AA6B8]"
                            : "border-[#12171D]/15 text-[#5C6675]"
                      }`}
                    >
                      <Plus className="h-4 w-4" strokeWidth={2} />
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen ? (
                      <motion.div
                        id={`faq-panel-${i}`}
                        role="region"
                        aria-labelledby={`faq-button-${i}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{
                          duration: 0.4,
                          ease: [0.2, 0.8, 0.2, 1],
                        }}
                        className="overflow-hidden"
                      >
                        <p
                          className={`pb-6 ps-10 text-sm leading-relaxed sm:text-base ${
                            isDark ? "text-[#B8C2D0]" : "text-[#4A5565]"
                          }`}
                        >
                          {item.a}
                        </p>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </InView>
        </div>
      </div>
    </section>
  );
}
