"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { Sun, Moon, Globe, Menu, X, Download } from "lucide-react";
import { BrandLogo } from "@/components/shared/BrandLogo";
import { useAppPreferences } from "@/context/AppPreferencesContext";

export function Navbar({ isSubpage = false }: { isSubpage?: boolean }) {
  const {
    locale,
    theme,
    t,
    toggleLocale,
    toggleTheme,
    openComingSoon,
  } = useAppPreferences();

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const isDark = theme === "dark";

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Escape closes the mobile drawer and returns focus to the toggle.
  useEffect(() => {
    if (!mobileOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mobileOpen]);

  const prefix = isSubpage ? "/" : "";

  const navItems = [
    { label: t.nav.home, href: `${prefix}#hero` },
    { label: t.nav.howItWorks, href: `${prefix}#how-it-works` },
    { label: t.nav.forClients, href: `${prefix}#audience` },
    { label: t.nav.forFreelancers, href: `${prefix}#freelancer` },
    { label: t.nav.faq, href: `${prefix}#faq` },
    { label: t.nav.contact, href: `${prefix}#contact` },
  ];

  const handleNavClick = () => {
    setMobileOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300">
      <div
        className={`mx-auto transition-all duration-300 ${
          scrolled
            ? "max-w-7xl px-4 pt-3 sm:px-6 lg:px-8"
            : "max-w-full px-4 pt-0 sm:px-6 lg:px-10"
        }`}
      >
        <nav
          aria-label={t.a11y.primaryNav}
          className={`flex items-center justify-between transition-all duration-300 ${
            scrolled
              ? `rounded-2xl border px-4 py-2.5 backdrop-blur-xl shadow-lg ${
                  isDark
                    ? "border-[#947AB6]/25 bg-[#12171D]/88 text-[#F5F3FA] shadow-black/40"
                    : "border-[#947AB6]/20 bg-[#FFFFFF]/90 text-[#12171D] shadow-[#947AB6]/10"
                }`
              : `border-b px-2 py-4 backdrop-blur-md ${
                  isDark
                    ? "border-white/[0.06] bg-[#12171D]/70 text-[#F5F3FA]"
                    : "border-[#12171D]/[0.06] bg-[#F8F7FC]/80 text-[#12171D]"
                }`
          }`}
        >
          {/* Brand Logo */}
          <Link
            href="/"
            className="flex shrink-0 items-center gap-2.5 focus:outline-none"
          >
            <BrandLogo className="h-9 w-auto sm:h-10" />
          </Link>

          {/* Desktop Navigation Links */}
          <ul className="hidden items-center gap-1 lg:flex xl:gap-2">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className={`rounded-xl px-3 py-2 text-sm font-medium transition-colors duration-200 hover:text-[#947AB6] ${
                    isDark
                      ? "text-[#D3DCE6] hover:bg-white/[0.04]"
                      : "text-[#35404E] hover:bg-[#947AB6]/[0.08]"
                  }`}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Right/End Utility Controls & CTA */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Language Switcher */}
            <button
              type="button"
              onClick={toggleLocale}
              aria-label={
                locale === "ar" ? "Switch to English" : "التبديل إلى العربية"
              }
              className={`inline-flex h-9 items-center gap-1.5 rounded-xl border px-3 text-xs font-bold transition-all hover:border-[#947AB6] hover:text-[#947AB6] ${
                isDark
                  ? "border-white/10 bg-[#192028] text-[#E6DDF2]"
                  : "border-[#12171D]/10 bg-white text-[#12171D]"
              }`}
            >
              <Globe className="h-3.5 w-3.5 text-[#947AB6]" strokeWidth={1.8} />
              <span className="font-poppins">{t.nav.langToggle}</span>
            </button>

            {/* Theme Switcher (Dark <-> Light) */}
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={
                isDark ? t.nav.themeToLight : t.nav.themeToDark
              }
              title={isDark ? t.nav.themeToLight : t.nav.themeToDark}
              className={`inline-flex h-9 w-9 items-center justify-center rounded-xl border transition-all hover:border-[#947AB6] hover:text-[#947AB6] ${
                isDark
                  ? "border-white/10 bg-[#192028] text-[#E6DDF2]"
                  : "border-[#12171D]/10 bg-white text-[#12171D]"
              }`}
            >
              {isDark ? (
                <Sun className="h-4 w-4 text-[#C4B0DC]" strokeWidth={1.8} />
              ) : (
                <Moon className="h-4 w-4 text-[#7A609C]" strokeWidth={1.8} />
              )}
            </button>

            {/* Primary Download CTA */}
            <motion.button
              type="button"
              onClick={() => openComingSoon("ios")}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="hidden sm:inline-flex h-9 items-center gap-2 rounded-xl bg-[#947AB6] px-4 text-xs sm:text-sm font-bold text-white shadow-[0_6px_20px_-4px_rgba(148,122,182,0.5)] transition-all hover:bg-[#8469A8]"
            >
              <Download className="h-3.5 w-3.5" strokeWidth={2} />
              <span>{t.nav.downloadApp}</span>
            </motion.button>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-label={mobileOpen ? t.a11y.closeMenu : t.a11y.openMenu}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              className={`inline-flex h-9 w-9 items-center justify-center rounded-xl border lg:hidden ${
                isDark
                  ? "border-white/10 bg-[#192028] text-[#F5F3FA]"
                  : "border-[#12171D]/10 bg-white text-[#12171D]"
              }`}
            >
              {mobileOpen ? (
                <X className="h-4 w-4" strokeWidth={2} />
              ) : (
                <Menu className="h-4 w-4" strokeWidth={2} />
              )}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen ? (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -12, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -12, filter: "blur(6px)" }}
            transition={{ duration: 0.25 }}
            className="mx-4 mt-2 lg:hidden"
          >
            <div
              className={`rounded-2xl border p-4 shadow-2xl backdrop-blur-xl ${
                isDark
                  ? "border-[#947AB6]/30 bg-[#161C24]/95 text-[#F5F3FA]"
                  : "border-[#947AB6]/25 bg-white/95 text-[#12171D]"
              }`}
            >
              <ul className="flex flex-col gap-1">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      onClick={handleNavClick}
                      className={`block rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors hover:text-[#947AB6] ${
                        isDark
                          ? "hover:bg-white/[0.04]"
                          : "hover:bg-[#947AB6]/[0.08]"
                      }`}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
              <div className="mt-3 pt-3 border-t border-current/10">
                <button
                  type="button"
                  onClick={() => {
                    setMobileOpen(false);
                    openComingSoon("ios");
                  }}
                  className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#947AB6] px-4 text-sm font-bold text-white shadow-md"
                >
                  <Download className="h-4 w-4" strokeWidth={2} />
                  <span>{t.nav.downloadApp}</span>
                </button>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
