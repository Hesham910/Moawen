"use client";

import React, { useRef } from "react";
import { motion, useInView, type Variants, type UseInViewOptions } from "motion/react";

export interface InViewProps {
  children: React.ReactNode;
  variants?: Variants;
  viewOptions?: UseInViewOptions;
  className?: string;
}

const defaultVariants: Variants = {
  hidden: { opacity: 0, y: 20, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.08,
    },
  },
};

export function InView({
  children,
  variants = defaultVariants,
  viewOptions = { once: true, margin: "0px 0px -80px 0px" },
  className = "",
}: InViewProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, viewOptions);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
}
