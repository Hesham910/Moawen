"use client";

import React from "react";
import { motion, type Variants } from "motion/react";

export type TextEffectPreset = "slide" | "blur" | "fade";

export interface TextEffectProps {
  children: string;
  per?: "word" | "line";
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
  preset?: TextEffectPreset;
  className?: string;
  delay?: number;
  immediate?: boolean;
}

const presetVariants: Record<TextEffectPreset, Variants> = {
  slide: {
    hidden: { opacity: 0, y: 22, filter: "blur(6px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        damping: 24,
        stiffness: 220,
      },
    },
  },
  blur: {
    hidden: { opacity: 0, filter: "blur(10px)" },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
    },
  },
  fade: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.4 },
    },
  },
};

export function TextEffect({
  children,
  per = "word",
  as = "h2",
  preset = "slide",
  className = "",
  delay = 0,
  immediate = false,
}: TextEffectProps) {
  const MotionTag = motion[as];
  const segments =
    per === "line" ? children.split("\n") : children.split(" ");

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.055,
        delayChildren: delay,
      },
    },
  };

  return (
    <MotionTag
      key={children}
      variants={containerVariants}
      initial="hidden"
      {...(immediate
        ? { animate: "visible" }
        : { whileInView: "visible", viewport: { once: true, margin: "0px 0px -60px 0px" } })}
      className={className}
    >
      {segments.map((segment, index) => (
        <motion.span
          key={`${segment}-${index}`}
          variants={presetVariants[preset]}
          className="inline-block"
        >
          {segment}
          {per === "word" && index < segments.length - 1 ? "\u00A0" : ""}
        </motion.span>
      ))}
    </MotionTag>
  );
}
