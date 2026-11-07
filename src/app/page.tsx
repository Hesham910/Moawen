import { Navbar } from "@/components/sections/Navbar";
import { HeroSection } from "@/components/sections/HeroSection";
import { AudienceSection } from "@/components/sections/AudienceSection";
import { TwoWaysStackingSection } from "@/components/sections/TwoWaysStackingSection";
import { CategoriesBentoSection } from "@/components/sections/CategoriesBentoSection";
import { WhyMoawenSection } from "@/components/sections/WhyMoawenSection";
import { ProductExperienceSection } from "@/components/sections/ProductExperienceSection";
import { FreelancerSection } from "@/components/sections/FreelancerSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { FinalCtaSection } from "@/components/sections/FinalCtaSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { FooterSection } from "@/components/sections/FooterSection";
import { ComingSoonDialog } from "@/components/shared/ComingSoonDialog";
import { CategoryComingSoonModal } from "@/components/shared/CategoryComingSoonModal";
import { ThemeSurface } from "@/components/shared/ThemeSurface";

export default function HomePage() {
  return (
    <ThemeSurface>
      {/* 01 — NAVBAR */}
      <Navbar />

      <main id="main-content">
        {/* 02 — HERO */}
        <HeroSection />

        {/* 03 — AUDIENCE */}
        <AudienceSection />

        {/* 04 — TWO WAYS & HOW IT WORKS (Stacking Cards on Scroll) */}
        <TwoWaysStackingSection />

        {/* 05 — SERVICE CATEGORIES (Bento Grid + Hand-Crafted Continuous Motion Sketches) */}
        <CategoriesBentoSection />

        {/* 06 — WHY MOAWEN & TRUST (25-Zone 3D Tilt + Sibling Focus Glow) */}
        <WhyMoawenSection />

        {/* 07 — PRODUCT EXPERIENCE (10-Screen Horizontal Auto-Slider with Stationary Center Frame) */}
        <ProductExperienceSection />

        {/* 08 — FREELANCER */}
        <FreelancerSection />

        {/* 09 — FAQ */}
        <FaqSection />

        {/* 11 — FINAL CTA */}
        <FinalCtaSection />

        {/* 12 — CONTACT */}
        <ContactSection />
      </main>

      {/* 13 — FOOTER */}
      <FooterSection />

      {/* App Store & Google Play Coming Soon Modal (informational only) */}
      <ComingSoonDialog />

      {/* Service Category Cards Info Modal (informational only) */}
      <CategoryComingSoonModal />
    </ThemeSurface>
  );
}
