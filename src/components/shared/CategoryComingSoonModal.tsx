"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/core/dialog";
import { useAppPreferences } from "@/context/AppPreferencesContext";
import { Smartphone, Sparkles } from "lucide-react";

/**
 * Service-category popup — STRICTLY INFORMATIONAL (adopted from the approved
 * prototype's modal slot and wired into the unified design system).
 * Opens when a service-category card is clicked and explains that the Moawen
 * apps are coming soon. It collects NO information: no inputs, no waitlist,
 * no subscriptions of any kind.
 */
export function CategoryComingSoonModal() {
  const { t, categoryModalOpen, setCategoryModalOpen } = useAppPreferences();

  return (
    <Dialog open={categoryModalOpen} onOpenChange={setCategoryModalOpen}>
      <DialogContent className="max-w-md border border-[#947AB6]/30 bg-[#161D26] p-7 text-white shadow-[0_20px_50px_rgba(0,0,0,0.6)] backdrop-blur-xl sm:p-8">
        <DialogClose className="absolute top-5 end-5 border-white/10 text-zinc-400 hover:text-white" />

        {/* Ambient background glows inside modal (aux colors) */}
        <div className="pointer-events-none absolute -top-16 -right-16 size-48 rounded-full bg-[#947AB6]/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 -left-16 size-48 rounded-full bg-[var(--aux-teal)]/10 blur-3xl" />

        <div>
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#947AB6]/30 bg-[#947AB6]/10 px-3.5 py-1.5 text-xs font-semibold text-[#A892C8]">
            <Sparkles className="size-3.5 text-[var(--aux-amber)]" />
            {t.categoryModal.badge}
          </div>

          <DialogHeader className="text-start">
            <DialogTitle className="text-2xl font-extrabold text-white sm:text-3xl">
              {t.categoryModal.title}
            </DialogTitle>
            <DialogDescription className="mt-2 text-sm leading-relaxed text-zinc-300 sm:text-base">
              {t.categoryModal.description}
            </DialogDescription>
          </DialogHeader>

          {/* Store availability — informational labels only, never links */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-[#1D2632] px-4 py-2.5 text-sm font-bold text-white">
              <Smartphone className="size-4 text-[#947AB6]" />
              <span className="font-poppins" dir="ltr">
                App Store
              </span>
            </span>
            <span className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-[#1D2632] px-4 py-2.5 text-sm font-bold text-white">
              <Smartphone className="size-4 text-[#947AB6]" />
              <span className="font-poppins" dir="ltr">
                Google Play
              </span>
            </span>
          </div>
          
        </div>
      </DialogContent>
    </Dialog>
  );
}
