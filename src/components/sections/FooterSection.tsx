"use client";

import React from "react";
import Link from "next/link";
import { BrandLogo } from "@/components/shared/BrandLogo";
import { SOCIAL_LINKS } from "@/config/mockups";
import { useAppPreferences } from "@/context/AppPreferencesContext";

/**
 * Footer — same formatting as moaven-landing-page-prototype2:
 * brand column with tagline + isometric social icons, explore / help /
 * download columns, bottom rights row and the giant bottom watermark.
 * Unified with the approved model's design system & dictionary.
 * The watermark word switches from "معاون" to "Moawen" in English.
 */
export function FooterSection({ isSubpage = false }: { isSubpage?: boolean }) {
  const { theme, locale, t, openComingSoon } = useAppPreferences();
  const isDark = theme === "dark";
  const prefix = isSubpage ? "/" : "";

  const exploreLinks = [
    { label: t.nav.home, href: `${prefix}#hero` },
    { label: t.nav.howItWorks, href: `${prefix}#how-it-works` },
    { label: t.nav.forClients, href: `${prefix}#audience` },
    { label: t.nav.forFreelancers, href: `${prefix}#freelancer` },
    { label: t.nav.faq, href: `${prefix}#faq` },
  ];

  const columnTitle = `text-xs font-semibold uppercase tracking-[0.2em] ${
    isDark ? "text-[#8E9BAE]" : "text-[#5C6675]"
  }`;

  return (
    <footer
      className={`relative mt-10 overflow-hidden border-t transition-colors ${
        isDark
          ? "border-white/[0.07] bg-[#0E1217] text-[#F5F3FA]"
          : "border-[#12171D]/[0.08] bg-[#F2EFF8] text-[#12171D]"
      }`}
    >
      {/* Bottom radial brand glow (prototype2) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-72"
        style={{
          background:
            "radial-gradient(60% 80% at 50% 100%, rgba(148,122,182,0.18), transparent)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          {/* Brand Column */}
          <div>
            <Link href="/" className="inline-flex items-center gap-3">
              <BrandLogo className="h-10 w-auto" />
            </Link>
            <p
              className={`mt-5 max-w-sm text-sm leading-relaxed ${
                isDark ? "text-[#A7B2C2]" : "text-[#4E5866]"
              }`}
            >
              {t.footer.tagline}
            </p>
            <p className={`mt-8 ${columnTitle}`}>{t.footer.followTitle}</p>
            <div className="mt-5 inline-block">
              <ul className="iso-social-list flex flex-wrap items-center gap-4">
                {/* Instagram */}
                <li className="iso-pro relative">
                  <span className="iso-ring" />
                  <span className="iso-ring" />
                  <span className="iso-ring" />
                  <a
                    href={SOCIAL_LINKS.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="iso-link"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="iso-svg"
                    >
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                    </svg>
                  </a>
                  <div className="iso-text font-poppins">Instagram</div>
                </li>

                {/* X (Twitter) */}
                <li className="iso-pro relative">
                  <span className="iso-ring" />
                  <span className="iso-ring" />
                  <span className="iso-ring" />
                  <a
                    href={SOCIAL_LINKS.x}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="X"
                    className="iso-link"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="iso-svg"
                    >
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </a>
                  <div className="iso-text font-poppins">X</div>
                </li>

                {/* TikTok */}
                <li className="iso-pro relative">
                  <span className="iso-ring" />
                  <span className="iso-ring" />
                  <span className="iso-ring" />
                  <a
                    href={SOCIAL_LINKS.tiktok}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="TikTok"
                    className="iso-link"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="iso-svg"
                    >
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                    </svg>
                  </a>
                  <div className="iso-text font-poppins">TikTok</div>
                </li>
              </ul>
            </div>
          </div>

          {/* Explore Links */}
          <nav aria-label={t.footer.exploreTitle}>
            <p className={columnTitle}>{t.footer.exploreTitle}</p>
            <ul className="mt-5 space-y-3 text-sm">
              {exploreLinks.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className={`transition-colors hover:text-[#947AB6] ${
                      isDark ? "text-[#A7B2C2]" : "text-[#4E5866]"
                    }`}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Help & Legal Links */}
          <nav aria-label={t.footer.helpTitle}>
            <p className={columnTitle}>{t.footer.helpTitle}</p>
            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <a
                  href={`${prefix}#contact`}
                  className={`transition-colors hover:text-[#947AB6] ${
                    isDark ? "text-[#A7B2C2]" : "text-[#4E5866]"
                  }`}
                >
                  {t.nav.contact}
                </a>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className={`transition-colors hover:text-[#947AB6] ${
                    isDark ? "text-[#A7B2C2]" : "text-[#4E5866]"
                  }`}
                >
                  {t.whyMoawen.privacyBtn}
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className={`transition-colors hover:text-[#947AB6] ${
                    isDark ? "text-[#A7B2C2]" : "text-[#4E5866]"
                  }`}
                >
                  {t.whyMoawen.termsBtn}
                </Link>
              </li>
            </ul>
          </nav>

          {/* Download App Links */}
          <div>
            <p className={columnTitle}>{t.footer.downloadTitle}</p>
            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <button
                  type="button"
                  onClick={() => openComingSoon("ios")}
                  className={`font-poppins font-medium transition-colors hover:text-[#947AB6] ${
                    isDark ? "text-[#A7B2C2]" : "text-[#4E5866]"
                  }`}
                >
                  App Store
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => openComingSoon("android")}
                  className={`font-poppins font-medium transition-colors hover:text-[#947AB6] ${
                    isDark ? "text-[#A7B2C2]" : "text-[#4E5866]"
                  }`}
                >
                  Google Play
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Rights Row */}
        <div
          className={`mt-14 flex flex-col items-center justify-between gap-4 border-t pt-6 text-xs sm:flex-row ${
            isDark
              ? "border-white/[0.07] text-[#8E9BAE]"
              : "border-[#12171D]/[0.08] text-[#5C6675]"
          }`}
        >
          <p>{t.footer.copyright}</p>
          <p className="font-poppins" dir="ltr">
            moawen.sa
          </p>
        </div>
      </div>

      {/* Giant Bottom Watermark — "معاون" in Arabic, "Moawen" in English */}
      <div aria-hidden="true" className="pointer-events-none select-none overflow-hidden">
        <p
          className={`translate-y-[30%] text-center text-[22vw] font-extrabold leading-none ${
            isDark ? "text-[#F5F3FA]/[0.035]" : "text-[#12171D]/[0.035]"
          }`}
        >
          {locale === "ar" ? "معاون" : "Moawen"}
        </p>
      </div>
    </footer>
  );
}
