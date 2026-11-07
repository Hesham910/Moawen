"use client";

import React from "react";
import { motion } from "motion/react";
import { ArrowUpRight, Terminal } from "lucide-react";
import { TextEffect } from "@/components/core/text-effect";
import { InView } from "@/components/core/in-view";
import { useAppPreferences } from "@/context/AppPreferencesContext";

/**
 * Sketch container: unified dark drawing board used by every card.
 * Square corners (user spec — no rounded corners on sketch frames),
 * uniform height, and the content stretches to fill it so the bottom
 * padding always equals the top padding exactly.
 */
function SketchBoard({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-6 flex h-44 items-stretch justify-center overflow-hidden border border-white/5 bg-[#11171E] p-3">
      {children}
    </div>
  );
}

/* Cursor-tracking glow tint rotation — 5 auxiliary colors + brand (~30% usage) */
const CELL_GLOW_VARS = [
  "var(--aux-teal-rgb)",
  "var(--aux-amber-rgb)",
  "var(--aux-blue-rgb)",
  "var(--aux-rose-rgb)",
  "var(--aux-green-rgb)",
  "148 122 182",
];

/* Dashed separator borders per grid position (1col / 2col / 3col responsive).
   Logical `border-s` keeps the lines correct in both RTL & LTR. */
const CELL_BORDERS: string[] = [
  "",
  "border-t border-dashed md:border-t-0 md:border-s",
  "border-t border-dashed lg:border-t-0 lg:border-s",
  "border-t border-dashed md:border-s",
  "border-t border-dashed lg:border-s",
  "border-t border-dashed md:border-s",
];

/**
 * Framer-inspired "+" marker pinned to a cell's start-top corner —
 * it lands exactly on the crossing of the dashed vertical & horizontal lines.
 */
function PlusMark({
  className,
  bgColor,
}: {
  className: string;
  bgColor: string;
}) {
  return (
    <span
      aria-hidden="true"
      className={`absolute top-0 start-0 z-10 flex h-7 w-7 -translate-y-1/2 translate-x-1/2 items-center justify-center ltr:-translate-x-1/2 ${className}`}
    >
      <svg viewBox="0 0 28 28" className="h-7 w-7" fill="none" aria-hidden="true">
        <circle cx="14" cy="14" r="9" fill={bgColor} />
        <path
          d="M14 9.5v9M9.5 14h9"
          stroke="#947AB6"
          strokeWidth="1.75"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}

/* Physical corners of the unified container — direction-agnostic, since the
   grid is symmetric. Rendered OUTSIDE the clipped box so they are never cut. */
const CORNER_PLUS_CLASSES = [
  "left-0 top-0 -translate-x-1/2 -translate-y-1/2",
  "right-0 top-0 translate-x-1/2 -translate-y-1/2",
  "bottom-0 left-0 -translate-x-1/2 translate-y-1/2",
  "bottom-0 right-0 translate-x-1/2 translate-y-1/2",
] as const;

/**
 * Framer-style "+" mark sitting EXACTLY on one of the container's four
 * (now sharp, right-angled) corners — the filled disc masks the border
 * corner beneath it, and the brand-colored plus crowns the intersection.
 */
function CornerPlus({ className, bgColor }: { className: string; bgColor: string }) {
  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none absolute z-20 flex h-7 w-7 items-center justify-center ${className}`}
    >
      <svg viewBox="0 0 28 28" className="h-7 w-7" fill="none" aria-hidden="true">
        <circle cx="14" cy="14" r="9" fill={bgColor} />
        <path
          d="M14 9.5v9M9.5 14h9"
          stroke="#947AB6"
          strokeWidth="1.75"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}

/**
 * Hand-crafted continuous motion sketches (from moaven-landing-page-prototype (1)),
 * recolored with the 5 auxiliary colors of the unified design system.
 * Marketing & Business sketches upgraded with richer, more expressive scenes.
 */
function CategorySketch({
  categoryId,
  isDark,
}: {
  categoryId: string;
  isDark: boolean;
}) {
  const strokeMuted = isDark ? "rgba(196,176,220,0.22)" : "rgba(122,96,156,0.2)";
  const surfaceFill = isDark ? "#12171D" : "#F6F3FB";

  switch (categoryId) {
    case "design":
      // Bezier waves + Pen tool + color swatches (prototype (1)) — aux-colored swatches
      return (
        <SketchBoard>
          <svg className="h-full w-full" viewBox="0 0 160 160" fill="none" aria-hidden="true">
            <motion.path
              d="M20 120 C 50 40, 110 140, 140 60"
              stroke="#947AB6"
              strokeWidth="3.5"
              strokeLinecap="round"
              animate={{
                d: [
                  "M20 120 C 50 40, 110 140, 140 60",
                  "M20 100 C 60 140, 100 30, 140 80",
                  "M20 120 C 50 40, 110 140, 140 60",
                ],
              }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />
            <circle cx="20" cy="120" r="5" fill="#FFFFFF" stroke="#947AB6" strokeWidth="2" />
            <circle cx="140" cy="60" r="5" fill="#FFFFFF" stroke="#947AB6" strokeWidth="2" />

            {/* Pen Tool pointer with gentle bobbing motion */}
            <motion.g
              animate={{ x: [0, 8, -4, 0], y: [0, -10, 6, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <path d="M70 70 L95 45 L105 55 L80 80 Z" fill="#A892C8" stroke="#FFFFFF" strokeWidth="1.5" />
              <path d="M70 70 L65 85 L80 80 Z" fill="#947AB6" />
              <circle cx="73" cy="77" r="1.5" fill="#FFFFFF" />
            </motion.g>

            {/* Swatches — brand + auxiliary colors */}
            <rect x="24" y="24" width="16" height="16" rx="4" fill="#947AB6" />
            <rect x="46" y="24" width="16" height="16" rx="4" fill="var(--aux-amber)" />
            <rect x="68" y="24" width="16" height="16" rx="4" fill="var(--aux-teal)" />
          </svg>
        </SketchBoard>
      );

    case "tech":
      // Terminal with looping multi-line CSS typing animation (Uiverse — drewsephski, adapted):
      // types the Freelancer component line by line, holds, erases bottom-up, retypes.
      return (
        <SketchBoard>
          <div className="term h-full w-full">
            <div className="term-head">
              <div className="term-dots">
                <span style={{ backgroundColor: "var(--aux-rose)" }} />
                <span style={{ backgroundColor: "var(--aux-amber)" }} />
                <span style={{ backgroundColor: "var(--aux-green)" }} />
              </div>
              <p className="term-title">
                <Terminal className="h-3 w-3" style={{ color: "var(--aux-blue)" }} />
                Freelancer.tsx
              </p>
            </div>
            <div className="term-body">
              <div className="term-lines">
                <div className="term-line">
                  <code
                    className="term-typed term-typed-1"
                    data-cmd={'<Freelancer status="ready">'}
                  />
                  <code className="term-caret term-caret-1" />
                </div>
                <div className="term-line">
                  <code
                    className="term-typed term-typed-2"
                    data-cmd="const code = build();"
                  />
                  <code className="term-caret term-caret-2" />
                </div>
                <div className="term-line">
                  <code
                    className="term-typed term-typed-3"
                    data-cmd="</Freelancer>"
                  />
                  <code className="term-caret term-caret-3" />
                </div>
              </div>
            </div>
          </div>
        </SketchBoard>
      );

    case "academic":
      // Manuscript + animated chart bars — the three bars now wear three
      // auxiliary colors of the design system (user spec)
      return (
        <SketchBoard>
          <svg
            viewBox="0 0 220 120"
            className="h-full w-full"
            aria-hidden="true"
            preserveAspectRatio="xMidYMid meet"
          >
            {/* Square-cornered surface frame (no rounded corners per spec) */}
            <rect
              x="10"
              y="14"
              width="200"
              height="92"
              rx="0"
              fill={surfaceFill}
              stroke={strokeMuted}
              strokeWidth="1.2"
            />
            {/* Manuscript lines */}
            <line x1="34" y1="40" x2="112" y2="40" stroke={strokeMuted} strokeWidth="3" strokeLinecap="round" />
            <line x1="34" y1="56" x2="96" y2="56" stroke={strokeMuted} strokeWidth="3" strokeLinecap="round" />
            <line x1="34" y1="72" x2="108" y2="72" stroke={strokeMuted} strokeWidth="3" strokeLinecap="round" />
            {/* Animated Chart Bars — 3 auxiliary colors */}
            {[
              { x: 132, h1: 24, h2: 44, color: "var(--aux-teal)" },
              { x: 150, h1: 42, h2: 26, color: "var(--aux-amber)" },
              { x: 168, h1: 30, h2: 50, color: "var(--aux-blue)" },
            ].map((bar, idx) => (
              <motion.rect
                key={idx}
                x={bar.x}
                width="10"
                rx="0"
                fill={bar.color}
                animate={{
                  height: [bar.h1, bar.h2, bar.h1],
                  y: [86 - bar.h1, 86 - bar.h2, 86 - bar.h1],
                }}
                transition={{
                  duration: 3.2,
                  delay: idx * 0.35,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}
            {/* Scanning Magnifier Ring */}
            <motion.g
              animate={{ x: [0, 26, 0], y: [0, -8, 0] }}
              transition={{ duration: 4.4, repeat: Infinity, ease: "easeInOut" }}
            >
              <circle cx="76" cy="56" r="18" fill="#947AB6" fillOpacity="0.12" stroke="#947AB6" strokeWidth="2" />
              <line x1="89" y1="69" x2="99" y2="79" stroke="#C4B0DC" strokeWidth="2.5" strokeLinecap="round" />
            </motion.g>
          </svg>
        </SketchBoard>
      );

    case "marketing":
      // Richer expressive scene: megaphone broadcasting + pulsing sound waves,
      // rising engagement bubbles (heart / comment / plus) and an animated
      // area growth chart with amber trendline
      return (
        <SketchBoard>
          <svg className="h-full w-full" viewBox="0 0 220 150" fill="none" aria-hidden="true">
            <defs>
              <linearGradient id="mktArea" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#947AB6" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#947AB6" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Baseline */}
            <line x1="92" y1="128" x2="204" y2="128" stroke="rgba(148,122,182,0.35)" strokeWidth="1.5" strokeLinecap="round" />

            {/* Area growth chart */}
            <path d="M96 120 L128 98 L152 106 L188 60 L196 60 L196 128 L96 128 Z" fill="url(#mktArea)" />
            <motion.path
              d="M96 120 L128 98 L152 106 L188 60"
              stroke="var(--aux-amber)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: [0, 1, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", times: [0, 0.7, 1] }}
            />
            <motion.circle
              cx="188"
              cy="60"
              r="4"
              fill="var(--aux-amber)"
              animate={{ scale: [1, 1.55, 1], opacity: [1, 0.65, 1] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              style={{ transformOrigin: "188px 60px" }}
            />

            {/* Megaphone with gentle broadcast wiggle */}
            <motion.g
              animate={{ rotate: [-2.5, 2.5, -2.5] }}
              transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
              style={{ transformOrigin: "36px 98px" }}
            >
              <path d="M24 90 L52 76 L52 114 L24 102 Z" fill="#947AB6" />
              <rect x="14" y="88" width="10" height="16" rx="3" fill="#A892C8" />
              <path d="M52 76 L62 70 L62 120 L52 114 Z" fill="#C4B0DC" fillOpacity="0.9" />
              <rect x="30" y="116" width="11" height="13" rx="3" fill="#947AB6" transform="rotate(14 35.5 122.5)" />
            </motion.g>

            {/* Pulsing sound waves */}
            {[
              { d: "M70 88 A 13 13 0 0 1 70 106", delay: 0 },
              { d: "M78 82 A 21 21 0 0 1 78 112", delay: 0.3 },
              { d: "M86 76 A 29 29 0 0 1 86 118", delay: 0.6 },
            ].map((wave, i) => (
              <motion.path
                key={i}
                d={wave.d}
                stroke="var(--aux-teal)"
                strokeWidth="2.5"
                strokeLinecap="round"
                animate={{ opacity: [0.12, 0.9, 0.12] }}
                transition={{ duration: 1.9, repeat: Infinity, delay: wave.delay, ease: "easeInOut" }}
              />
            ))}

            {/* Rising engagement bubbles */}
            <motion.g
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <circle cx="206" cy="30" r="10" fill="var(--aux-rose)" fillOpacity="0.92" />
              <path
                d="M206 34.6 c-3.6 -2.5 -5.6 -4.7 -5.6 -6.9 a3 3 0 0 1 5.6 -1.5 a3 3 0 0 1 5.6 1.5 c0 2.2 -2 4.4 -5.6 6.9 Z"
                fill="#FFFFFF"
              />
            </motion.g>
            <motion.g
              animate={{ y: [0, 7, 0] }}
              transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            >
              <circle cx="112" cy="30" r="9.5" fill="var(--aux-blue)" fillOpacity="0.92" />
              <path d="M107 26.5 h10 v6.5 h-5.5 l-3.2 3 v-3 h-1.3 Z" fill="#FFFFFF" />
            </motion.g>
            <motion.g
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            >
              <circle cx="64" cy="26" r="9.5" fill="var(--aux-teal)" fillOpacity="0.92" />
              <path d="M59.5 26 h9 M64 21.5 v9" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" />
            </motion.g>
          </svg>
        </SketchBoard>
      );

    case "business":
      // Richer expressive scene: briefcase with blinking clasp, rotating gear,
      // checklist document with self-drawing checks and rising coins
      return (
        <SketchBoard>
          <svg className="h-full w-full" viewBox="0 0 220 150" fill="none" aria-hidden="true">
            {/* Rotating gear (top-right) */}
            <motion.g
              animate={{ rotate: 360 }}
              transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
              style={{ transformOrigin: "182px 36px" }}
            >
              <g stroke="var(--aux-blue)" strokeWidth="2.5" strokeLinecap="round">
                <line x1="182" y1="14" x2="182" y2="21" />
                <line x1="182" y1="51" x2="182" y2="58" />
                <line x1="160" y1="36" x2="167" y2="36" />
                <line x1="197" y1="36" x2="204" y2="36" />
                <line x1="166.5" y1="20.5" x2="171.5" y2="25.5" />
                <line x1="192.5" y1="46.5" x2="197.5" y2="51.5" />
                <line x1="197.5" y1="20.5" x2="192.5" y2="25.5" />
                <line x1="171.5" y1="46.5" x2="166.5" y2="51.5" />
              </g>
              <circle cx="182" cy="36" r="13" stroke="var(--aux-blue)" strokeWidth="2.5" fill="rgb(var(--aux-blue-rgb) / 0.12)" />
              <circle cx="182" cy="36" r="4.5" fill="var(--aux-blue)" />
            </motion.g>

            {/* Briefcase */}
            <g>
              <path
                d="M74 60 v-7 a8 8 0 0 1 8 -8 h10 a8 8 0 0 1 8 8 v7"
                stroke="#A892C8"
                strokeWidth="5"
                strokeLinecap="round"
                fill="none"
              />
              <rect x="44" y="60" width="86" height="58" rx="8" fill="#947AB6" />
              <rect x="40" y="80" width="94" height="11" rx="3" fill="#C4B0DC" />
              <motion.rect
                x="78"
                y="82.5"
                width="18"
                height="6"
                rx="2"
                fill="#FFFFFF"
                animate={{ opacity: [1, 0.35, 1] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
              />
            </g>

            {/* Checklist document with self-drawing checks */}
            <g>
              <rect x="136" y="62" width="54" height="68" rx="4" fill={surfaceFill} stroke={strokeMuted} strokeWidth="1.2" />
              <line x1="145" y1="76" x2="181" y2="76" stroke={strokeMuted} strokeWidth="2.5" strokeLinecap="round" />
              <line x1="145" y1="88" x2="170" y2="88" stroke={strokeMuted} strokeWidth="2.5" strokeLinecap="round" />
              <motion.path
                d="M145 104 l5 5 l10 -10"
                stroke="var(--aux-green)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                animate={{ pathLength: [0, 1, 1, 0] }}
                transition={{ duration: 2.8, repeat: Infinity, times: [0, 0.35, 0.8, 1], ease: "easeInOut" }}
              />
              <motion.path
                d="M145 120 l5 5 l10 -10"
                stroke="var(--aux-teal)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                animate={{ pathLength: [0, 1, 1, 0] }}
                transition={{ duration: 2.8, delay: 0.5, repeat: Infinity, times: [0, 0.35, 0.8, 1], ease: "easeInOut" }}
              />
            </g>

            {/* Rising coins (bottom-left) */}
            <motion.g
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
            >
              <ellipse cx="26" cy="126" rx="13" ry="5" fill="var(--aux-amber)" />
              <rect x="13" y="118" width="26" height="8" fill="var(--aux-amber)" />
              <ellipse cx="26" cy="118" rx="13" ry="5" fill="#EDBE83" />
              <ellipse cx="26" cy="118" rx="13" ry="5" fill="none" stroke="#FFFFFF" strokeOpacity="0.35" strokeWidth="1" />
            </motion.g>
          </svg>
        </SketchBoard>
      );

    default:
      // "Other fields" — same rotating constellation family (prototype (1)),
      // satellites recolored across the auxiliary palette for visual variety
      return (
        <SketchBoard>
          <svg className="h-full w-full" viewBox="0 0 160 160" fill="none" aria-hidden="true">
            <circle cx="80" cy="80" r="16" fill="#947AB6" fillOpacity="0.2" stroke="#947AB6" strokeWidth="2" />
            <circle cx="80" cy="80" r="6" fill="#947AB6" />
            <motion.g
              animate={{ rotate: -360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              style={{ transformOrigin: "80px 80px" }}
            >
              <circle cx="80" cy="80" r="48" stroke="#947AB6" strokeOpacity="0.25" strokeDasharray="4 4" strokeWidth="1.5" />
              <circle cx="128" cy="80" r="7" fill="var(--aux-teal)" />
              <circle cx="32" cy="80" r="7" fill="var(--aux-green)" />
              <circle cx="80" cy="32" r="5" fill="#C4B0DC" />
              <circle cx="80" cy="128" r="6" fill="var(--aux-amber)" />
            </motion.g>
          </svg>
        </SketchBoard>
      );
  }
}

export function CategoriesBentoSection() {
  const { theme, t, openCategoryModal } = useAppPreferences();
  const isDark = theme === "dark";

  /* Exact page background color — used by the corner "+" discs to visually
     open up each sharp corner of the unified container */
  const pageBgHex = isDark ? "#12171D" : "#F8F7FC";

  /* Cursor-tracking spotlight: updates CSS vars directly (no re-render) */
  const handleSpotlight = React.useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  }, []);

  const cardBg = isDark ? "#161D26" : "#FFFFFF";

  return (
    <section id="categories" className="relative py-20 sm:py-28">
      {/* Ambient Background Accent */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 -z-10 h-[440px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-15 blur-[130px]"
        style={{
          background:
            "radial-gradient(circle, rgba(148,122,182,0.5) 0%, transparent 70%)",
        }}
      />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <TextEffect
            per="word"
            as="h2"
            preset="slide"
            className={`text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl ${
              isDark ? "text-[#F5F3FA]" : "text-[#12171D]"
            }`}
          >
            {t.categories.title}
          </TextEffect>
          <p
            className={`mx-auto mt-4 max-w-2xl text-base leading-relaxed sm:text-lg ${
              isDark ? "text-[#B6C0CE]" : "text-[#4D5766]"
            }`}
          >
            {t.categories.subtitle}
          </p>
        </div>

        {/* ONE unified card — Framer-inspired: the 6 fields live inside a single
            surface separated by dashed horizontal & vertical lines, with "+"
            markers on every crossing. Square-cornered sketch frames, smooth
            cursor-tracking glow hover per cell. */}
        <InView
          viewOptions={{ once: true, margin: "0px 0px -80px 0px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.09 },
            },
          }}
          className="mt-12"
        >
          {/* Wrapper holds the four corner "+" marks OUTSIDE the clipped box,
              so they are never cut by the container's overflow-hidden */}
          <div className="relative">
            {/* Four sharp (right-angled) corners, each crowned with a "+" mark
                (user spec: no rounded corners on the 6-card container) */}
            {CORNER_PLUS_CLASSES.map((pos) => (
              <CornerPlus key={pos} className={pos} bgColor={pageBgHex} />
            ))}

            <div
              className={`overflow-hidden border shadow-xl ${
                isDark
                  ? "border-white/10 bg-[#161D26]"
                  : "border-slate-200 bg-white"
              }`}
            >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {t.categories.items.map((cat, idx) => (
                <motion.div
                  key={cat.id}
                  data-cursor="interactive"
                  onMouseMove={handleSpotlight}
                  onClick={() => openCategoryModal(`category_${cat.id}`)}
                  variants={{
                    hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
                    visible: {
                      opacity: 1,
                      y: 0,
                      filter: "blur(0px)",
                      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
                    },
                  }}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      openCategoryModal(`category_${cat.id}`);
                    }
                  }}
                  aria-label={cat.title}
                  style={{ "--glow-rgb": CELL_GLOW_VARS[idx] } as React.CSSProperties}
                  className={`group relative flex cursor-pointer flex-col border-[#947AB6]/30 p-6 transition-colors duration-300 outline-none focus-visible:bg-[#947AB6]/[0.06] focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#947AB6] hover:bg-[#947AB6]/[0.04] sm:p-7 lg:p-8 ${CELL_BORDERS[idx]}`}
                >
                  {/* Cursor-tracking glow spotlight (aux color rotation, smooth) */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100"
                    style={{
                      background:
                        "radial-gradient(300px circle at var(--mx, 50%) var(--my, 50%), rgb(var(--glow-rgb) / 0.15), transparent 72%)",
                    }}
                  />

                  {/* Framer-style "+" markers on dashed-line crossings */}
                  {idx === 4 || idx === 5 ? (
                    <PlusMark className="hidden lg:flex" bgColor={cardBg} />
                  ) : null}
                  {idx === 3 || idx === 5 ? (
                    <PlusMark className="hidden md:flex lg:hidden" bgColor={cardBg} />
                  ) : null}

                  {/* Corner arrow (inline-end — matches prototype (1) RTL placement, safe in LTR) */}
                  <div className="absolute end-6 top-6 text-zinc-500 transition-colors group-hover:text-[#947AB6] sm:end-7 lg:group-hover:text-[#A892C8]">
                    <ArrowUpRight className="size-5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 rtl:rotate-[-90deg]" />
                  </div>

                  {/* flex-1 keeps the sketch board pinned to the card's bottom
                      edge, so the three frames in every row share EXACTLY the
                      same bottom alignment regardless of title wrapping
                      (user spec) */}
                  <div className="relative flex-1 text-start">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#A892C8]">
                      {cat.label}
                    </span>
                    <h3
                      className={`mt-2 text-2xl font-bold transition-colors group-hover:text-[#A892C8] ${
                        isDark ? "text-white" : "text-slate-900"
                      }`}
                    >
                      {cat.title}
                    </h3>
                    {/* Reserved 3-line space keeps every card on the same alignment */}
                    <p
                      className={`mt-2 min-h-[68px] text-sm leading-relaxed ${
                        isDark ? "text-zinc-300" : "text-zinc-600"
                      }`}
                    >
                      {cat.description}
                    </p>
                  </div>

                  {/* Unified square-cornered sketch board (Programming-card format) */}
                  <CategorySketch categoryId={cat.id} isDark={isDark} />
                </motion.div>
              ))}
            </div>
          </div>
          </div>
        </InView>
      </div>
    </section>
  );
}
