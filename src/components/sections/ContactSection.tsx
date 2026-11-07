"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { AlertCircle, CheckCircle2, Mail, Send } from "lucide-react";
import { TextEffect } from "@/components/core/text-effect";
import { InView } from "@/components/core/in-view";
import { useAppPreferences } from "@/context/AppPreferencesContext";
import { trackGAEvent } from "@/lib/analytics";

type Status = "idle" | "sending" | "success" | "error" | "invalid";

/**
 * Contact section — same formatting as moaven-landing-page-prototype2:
 * two-column layout, glass form panel with floating labels, honeypot
 * spam trap and inline status alerts (teal success / amber errors).
 * Unified with the approved model's design system, dictionary and API.
 */
export function ContactSection() {
  const { theme, locale, t } = useAppPreferences();
  const isDark = theme === "dark";
  const [status, setStatus] = useState<Status>("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = {
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      message: String(fd.get("message") ?? ""),
      website: String(fd.get("website") ?? ""),
      locale,
    };

    if (
      payload.name.trim().length < 2 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email) ||
      payload.message.trim().length < 10
    ) {
      setStatus("invalid");
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error("failed");
      setStatus("success");
      trackGAEvent("contact_form_submit", { locale });
      form.reset();
    } catch {
      setStatus("error");
    }
  };

  const fieldClass = `peer w-full rounded-2xl border bg-transparent px-4 pt-6 pb-2 text-sm outline-none transition-all focus:border-[#947AB6] focus:ring-4 focus:ring-[#947AB6]/15 ${
    isDark
      ? "border-white/15 bg-[#12171D]/70 text-[#F5F3FA] placeholder:text-transparent"
      : "border-[#12171D]/15 bg-white/70 text-[#12171D] placeholder:text-transparent"
  }`;

  const labelClass = `pointer-events-none absolute start-4 top-4 text-sm transition-all peer-focus:top-2 peer-focus:text-[11px] peer-focus:text-[#947AB6] peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-[11px] ${
    isDark ? "text-[#8E9BAE]" : "text-[#5C6675]"
  }`;

  return (
    <section id="contact" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          {/* Editorial Column */}
          <InView>
            <span
              className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-semibold tracking-wide ${
                isDark
                  ? "border-[#947AB6]/30 bg-[#192028]/90 text-[#C4B0DC]"
                  : "border-[#947AB6]/30 bg-white text-[#674E88]"
              }`}
            >
              <Mail className="h-3.5 w-3.5 text-[#947AB6]" strokeWidth={1.8} />
              {t.nav.contact}
            </span>
            <TextEffect
              per="word"
              as="h2"
              preset="slide"
              className={`mt-5 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl lg:text-5xl ${
                isDark ? "text-[#F5F3FA]" : "text-[#12171D]"
              }`}
            >
              {t.contact.title}
            </TextEffect>
            <p
              className={`mt-5 max-w-lg text-base leading-relaxed sm:text-lg ${
                isDark ? "text-[#B6C0CE]" : "text-[#4D5766]"
              }`}
            >
              {t.contact.subtitle}
            </p>
            {/* Official contact email — the single official Moawen inbox */}
            <p
              className={`mt-4 text-sm font-medium ${
                isDark ? "text-[#8E9BAE]" : "text-[#5C6675]"
              }`}
            >
              {t.contact.emailCtaLabel}{" "}
              <a
                href="mailto:support@moawen.sa"
                dir="ltr"
                className="inline-block font-semibold text-[#947AB6] underline decoration-[#947AB6]/40 underline-offset-4 transition-colors hover:text-[#7A609C]"
              >
                support@moawen.sa
              </a>
            </p>
          </InView>

          {/* Glass Form Panel */}
          <InView>
            <form
              onSubmit={handleSubmit}
              noValidate
              className="glass relative rounded-[2rem] p-6 sm:p-8"
            >
              {/* Auxiliary teal ambient accent */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -end-10 -top-10 size-40 rounded-full blur-2xl"
                style={{
                  background:
                    "radial-gradient(closest-side, rgb(var(--aux-teal-rgb) / 0.25), transparent)",
                }}
              />

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="relative">
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    placeholder=" "
                    autoComplete="name"
                    required
                    maxLength={80}
                    className={fieldClass}
                  />
                  <label htmlFor="contact-name" className={labelClass}>
                    {t.contact.nameLabel}
                  </label>
                </div>
                <div className="relative">
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    placeholder=" "
                    autoComplete="email"
                    required
                    maxLength={254}
                    dir="ltr"
                    className={`${fieldClass} text-start`}
                  />
                  <label htmlFor="contact-email" className={labelClass}>
                    {t.contact.emailLabel}
                  </label>
                </div>
              </div>

              <div className="relative mt-4">
                <textarea
                  id="contact-message"
                  name="message"
                  rows={5}
                  placeholder=" "
                  required
                  maxLength={5000}
                  className={`${fieldClass} resize-none`}
                />
                <label htmlFor="contact-message" className={labelClass}>
                  {t.contact.messageLabel}
                </label>
              </div>

              {/* Honeypot spam trap */}
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
                aria-hidden="true"
              />

              <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
                <p
                  className={`text-xs ${
                    isDark ? "text-[#8E9BAE]" : "text-[#5C6675]"
                  }`}
                >
                  {t.contact.privacyNote}
                </p>
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#947AB6] px-7 py-3 text-sm font-bold text-white shadow-[0_12px_28px_-6px_rgba(148,122,182,0.55)] transition-all hover:bg-[#8469A8] disabled:opacity-60"
                >
                  {status === "sending" ? t.contact.submittingBtn : t.contact.submitBtn}
                  <motion.span
                    animate={status === "sending" ? { x: [0, 6, 0] } : {}}
                    transition={{ repeat: Infinity, duration: 0.8 }}
                  >
                    <Send className="h-4 w-4 rtl:-scale-x-100" strokeWidth={2} />
                  </motion.span>
                </button>
              </div>

              <AnimatePresence>
                {(status === "success" || status === "error" || status === "invalid") && (
                  <motion.div
                    role="status"
                    initial={{ opacity: 0, y: 8, filter: "blur(6px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: 8, filter: "blur(6px)" }}
                    className="mt-4 flex items-center gap-2 rounded-2xl px-4 py-3 text-sm font-medium"
                    style={
                      status === "success"
                        ? {
                            color: "var(--aux-teal)",
                            backgroundColor: "rgb(var(--aux-teal-rgb) / 0.15)",
                          }
                        : {
                            color: "var(--aux-amber)",
                            backgroundColor: "rgb(var(--aux-amber-rgb) / 0.15)",
                          }
                    }
                  >
                    {status === "success" ? (
                      <CheckCircle2 className="h-4 w-4 shrink-0" />
                    ) : (
                      <AlertCircle className="h-4 w-4 shrink-0" />
                    )}
                    {status === "success"
                      ? t.contact.successShort
                      : status === "error"
                        ? t.contact.errorMsg
                        : t.contact.invalidMsg}
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </InView>
        </div>
      </div>
    </section>
  );
}
