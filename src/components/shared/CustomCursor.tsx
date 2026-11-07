"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { useAppPreferences } from "@/context/AppPreferencesContext";
import { useSyncExternalStore } from "react";

const INTERACTIVE_SELECTOR =
  'a, button, [role="button"], input, textarea, select, label[for], [data-cursor="interactive"]';

/**
 * External store for cursor eligibility (fine pointer + motion allowed).
 * useSyncExternalStore keeps SSR output (disabled) and client state in sync
 * without setState-in-effect cascades.
 */
function subscribeToMediaQueries(onChange: () => void) {
  const fine = window.matchMedia("(pointer: fine)");
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
  fine.addEventListener("change", onChange);
  reduced.addEventListener("change", onChange);
  return () => {
    fine.removeEventListener("change", onChange);
    reduced.removeEventListener("change", onChange);
  };
}

function getCursorEligibility(): boolean {
  return (
    window.matchMedia("(pointer: fine)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

function getServerCursorEligibility(): boolean {
  return false;
}

export function CustomCursor() {
  const { theme } = useAppPreferences();
  const [visible, setVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const enabled = useSyncExternalStore(
    subscribeToMediaQueries,
    getCursorEligibility,
    getServerCursorEligibility
  );

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Outer outlined circle follows with silky spring lag
  const outerX = useSpring(mouseX, { damping: 26, stiffness: 260, mass: 0.45 });
  const outerY = useSpring(mouseY, { damping: 26, stiffness: 260, mass: 0.45 });

  // Inner solid dot follows tightly with crisp responsiveness
  const innerX = useSpring(mouseX, { damping: 38, stiffness: 520, mass: 0.2 });
  const innerY = useSpring(mouseY, { damping: 38, stiffness: 520, mass: 0.2 });

  // Flag used by globals.css to hide the native cursor ONLY while the
  // decorative cursor is actually active.
  useEffect(() => {
    if (!enabled) return;
    document.documentElement.classList.add("has-custom-cursor");
    return () => document.documentElement.classList.remove("has-custom-cursor");
  }, [enabled]);

  useEffect(() => {
    if (!enabled) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setVisible(true);
    };

    const handleMouseLeave = () => {
      setVisible(false);
    };

    const handleMouseEnter = () => {
      setVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && target.closest(INTERACTIVE_SELECTOR)) {
        setIsHovering(true);
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const related = e.relatedTarget as HTMLElement | null;
      if (target && target.closest(INTERACTIVE_SELECTOR)) {
        if (!related || !related.closest(INTERACTIVE_SELECTOR)) {
          setIsHovering(false);
        }
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseover", handleMouseOver, { passive: true });
    document.addEventListener("mouseout", handleMouseOut, { passive: true });

    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, [enabled, mouseX, mouseY]);

  if (!enabled) return null;

  const idleOuterBorder =
    theme === "dark" ? "rgba(244, 242, 248, 0.36)" : "rgba(18, 23, 29, 0.32)";
  const idleInnerFill =
    theme === "dark" ? "rgba(244, 242, 248, 0.72)" : "rgba(18, 23, 29, 0.68)";

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden"
    >
      {/* Larger Outlined Circle */}
      <motion.div
        style={{
          x: outerX,
          y: outerY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          opacity: visible ? 1 : 0,
          scale: isHovering ? 1.22 : 1,
          borderColor: isHovering ? "#947AB6" : idleOuterBorder,
          backgroundColor: isHovering
            ? "rgba(148, 122, 182, 0.12)"
            : "rgba(148, 122, 182, 0)",
          boxShadow: isHovering
            ? "0 0 22px rgba(148, 122, 182, 0.32)"
            : "0 0 0px rgba(148, 122, 182, 0)",
        }}
        transition={{
          duration: 0.24,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="fixed top-0 left-0 h-9 w-9 rounded-full border-[1.5px]"
      />

      {/* Smaller Inner Solid Circle */}
      <motion.div
        style={{
          x: innerX,
          y: innerY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          opacity: visible ? 1 : 0,
          scale: isHovering ? 1.9 : 1,
          backgroundColor: isHovering ? "#947AB6" : idleInnerFill,
        }}
        transition={{
          duration: 0.22,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="fixed top-0 left-0 h-2 w-2 rounded-full"
      />
    </div>
  );
}
