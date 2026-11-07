"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  Scale,
  Calendar,
  FileText,
  CheckCircle2,
} from "lucide-react";
import { Navbar } from "@/components/sections/Navbar";
import { FooterSection } from "@/components/sections/FooterSection";
import { ComingSoonDialog } from "@/components/shared/ComingSoonDialog";
import { TextEffect } from "@/components/core/text-effect";
import { useAppPreferences } from "@/context/AppPreferencesContext";
import { trackGAEvent } from "@/lib/analytics";
import type { LegalDocumentData } from "@/db/seed";

export function LegalDocumentView({ doc }: { doc: LegalDocumentData }) {
  const { theme, locale, dir } = useAppPreferences();
  const isDark = theme === "dark";
  const BackArrow = dir === "rtl" ? ArrowRight : ArrowLeft;

  useEffect(() => {
    trackGAEvent("legal_doc_view", { slug: doc.slug, locale });
  }, [doc.slug, locale]);

  const title = locale === "ar" ? doc.titleAr : doc.titleEn;
  const subtitle = locale === "ar" ? doc.subtitleAr : doc.subtitleEn;
  const formattedDate = new Date(doc.updatedAt).toLocaleDateString(
    locale === "ar" ? "ar-SA" : "en-US",
    { year: "numeric", month: "long", day: "numeric" }
  );

  const otherSlug = doc.slug === "privacy" ? "terms" : "privacy";
  const otherLabel =
    doc.slug === "privacy"
      ? locale === "ar"
        ? "الشروط والأحكام"
        : "Terms & Conditions"
      : locale === "ar"
        ? "سياسة الخصوصية"
        : "Privacy Policy";

  return (
    <div
      className={`min-h-screen overflow-x-clip transition-colors duration-300 ${
        isDark ? "bg-[#12171D] text-[#F5F3FA]" : "bg-[#F8F7FC] text-[#12171D]"
      }`}
    >
      <Navbar isSubpage />

      <main className="relative py-12 sm:py-20">
        {/* Ambient #947AB6 Top Aura */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-0 left-1/2 -z-10 h-72 w-[620px] -translate-x-1/2 rounded-full bg-[#947AB6]/20 blur-[120px]"
        />

        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          {/* Top Breadcrumb & Switch Legal Doc Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Link
              href="/"
              className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-xs sm:text-sm font-bold transition-colors hover:border-[#947AB6] hover:text-[#947AB6] ${
                isDark
                  ? "border-[#27313E] bg-[#161D26] text-[#DCE2EC]"
                  : "border-[#DDD5EA] bg-white text-[#12171D]"
              }`}
            >
              <BackArrow className="h-4 w-4" strokeWidth={2} />
              <span>
                {locale === "ar" ? "العودة إلى الرئيسية" : "Back to Home"}
              </span>
            </Link>

            <Link
              href={`/${otherSlug}`}
              className="inline-flex items-center gap-2 rounded-xl border border-[#947AB6]/40 bg-[#947AB6]/12 px-4 py-2 text-xs sm:text-sm font-bold text-[#947AB6] transition-colors hover:bg-[#947AB6] hover:text-white"
            >
              {doc.slug === "privacy" ? (
                <Scale className="h-4 w-4" strokeWidth={1.9} />
              ) : (
                <ShieldCheck className="h-4 w-4" strokeWidth={1.9} />
              )}
              <span>{otherLabel}</span>
            </Link>
          </div>

          {/* Document Header Card */}
          <div
            className={`mt-8 rounded-3xl border p-6 sm:p-10 ${
              isDark
                ? "border-[#947AB6]/30 bg-gradient-to-br from-[#18202B] to-[#131820]"
                : "border-[#947AB6]/25 bg-gradient-to-br from-[#FFFFFF] to-[#F4EFFB] shadow-xl shadow-[#947AB6]/10"
            }`}
          >
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#947AB6]/18 px-3.5 py-1 text-xs font-bold text-[#947AB6]">
                <FileText className="h-3.5 w-3.5" strokeWidth={2} />
                <span>
                  {locale === "ar"
                    ? `الإصدار ${doc.version}`
                    : `Version ${doc.version}`}
                </span>
              </span>

              <span
                className={`inline-flex items-center gap-1.5 text-xs font-medium ${
                  isDark ? "text-[#9AA6B8]" : "text-[#5C6675]"
                }`}
              >
                <Calendar className="h-3.5 w-3.5 text-[#947AB6]" />
                <span>
                  {locale === "ar"
                    ? `آخر تحديث: ${formattedDate}`
                    : `Last updated: ${formattedDate}`}
                </span>
              </span>
            </div>

            <TextEffect
              per="word"
              as="h1"
              preset="slide"
              immediate
              className={`mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl ${
                isDark ? "text-[#F5F3FA]" : "text-[#12171D]"
              }`}
            >
              {title}
            </TextEffect>

            <p
              className={`mt-4 max-w-3xl text-base leading-relaxed sm:text-lg ${
                isDark ? "text-[#B8C2D0]" : "text-[#4A5565]"
              }`}
            >
              {subtitle}
            </p>
          </div>

          {/* Quick Section Jump Pills */}
          <div className="mt-8 flex flex-wrap gap-2">
            {doc.sections.map((sec) => {
              const heading = locale === "ar" ? sec.headingAr : sec.headingEn;
              return (
                <a
                  key={sec.id}
                  href={`#${sec.id}`}
                  className={`rounded-xl border px-3.5 py-2 text-xs font-semibold transition-colors hover:border-[#947AB6] hover:text-[#947AB6] ${
                    isDark
                      ? "border-[#252F3C] bg-[#161D26] text-[#B8C2D0]"
                      : "border-[#E1D8EE] bg-white text-[#4A5565]"
                  }`}
                >
                  {heading}
                </a>
              );
            })}
          </div>

          {/* Legal Sections List */}
          <div className="mt-8 space-y-5">
            {doc.sections.map((sec, idx) => {
              const heading = locale === "ar" ? sec.headingAr : sec.headingEn;
              const body = locale === "ar" ? sec.bodyAr : sec.bodyEn;
              const points = locale === "ar" ? sec.pointsAr : sec.pointsEn;

              return (
                <motion.article
                  key={sec.id}
                  id={sec.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.04 }}
                  className={`scroll-mt-28 rounded-3xl border p-6 sm:p-8 ${
                    isDark
                      ? "border-[#252F3C] bg-[#161D26]/90"
                      : "border-[#E2DAEE] bg-white shadow-xs"
                  }`}
                >
                  <h2
                    className={`text-xl font-extrabold sm:text-2xl ${
                      isDark ? "text-[#F5F3FA]" : "text-[#12171D]"
                    }`}
                  >
                    {heading}
                  </h2>

                  <p
                    className={`mt-3 text-sm leading-relaxed sm:text-base ${
                      isDark ? "text-[#B8C2D0]" : "text-[#4A5565]"
                    }`}
                  >
                    {body}
                  </p>

                  {points && points.length > 0 ? (
                    <ul className="mt-4 space-y-2.5">
                      {points.map((pt, pIdx) => (
                        <li
                          key={pIdx}
                          className={`flex items-start gap-3 text-sm leading-relaxed sm:text-base ${
                            isDark ? "text-[#D5CCE3]" : "text-[#2E3744]"
                          }`}
                        >
                          <CheckCircle2
                            className="mt-1 h-4 w-4 shrink-0 text-[#947AB6]"
                            strokeWidth={2}
                          />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </motion.article>
              );
            })}
          </div>
        </div>
      </main>

      <FooterSection isSubpage />
      <ComingSoonDialog />
    </div>
  );
}
