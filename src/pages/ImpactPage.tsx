// pages/ImpactPage.tsx
import { motion } from "framer-motion";
import ImpactHero from "@/components/impact/ImpactHero";
import ImpactStats from "@/components/impact/ImpactStats";
import ImpactTimeline from "@/components/impact/Impacttimeline";
import ImpactStories from "@/components/impact/Impactstrories";
import ImpactGallery from "@/components/impact/Impactgallery";
import { Label, useReveal } from "@/components/impact/Shared";
import { PillButton, DotBackground } from "@/components/about/Shared";

export default function ImpactPage() {
  const reveal = useReveal();

  return (
    <main className="min-h-screen bg-white">
      <ImpactHero />
      <ImpactStats />
      <ImpactTimeline />
      <ImpactStories />
      <ImpactGallery />

      {/* CTA: same rounded green panel as the About page */}
      <section className="bg-white px-4 pb-16 sm:px-6 lg:px-10 lg:pb-24">
        <div className="relative mx-auto max-w-[1400px] overflow-hidden rounded-[24px] bg-[#12312B] px-6 py-14 text-white sm:px-12 sm:py-16 lg:rounded-[32px] lg:px-16 lg:py-20">
          <DotBackground />
          <motion.div
            {...reveal(0)}
            className="relative grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-end lg:gap-16"
          >
            <div>
              <Label light>Be part of it</Label>
              <h2 className="mt-4 max-w-[600px] font-heading text-[clamp(2.2rem,4.2vw,3.8rem)] font-normal leading-[1.05] tracking-[-0.025em]">
                Help us reach the next community
              </h2>
            </div>
            <div>
              <p className="max-w-[460px] font-sans text-sm leading-[1.8] text-white/75">
                Every donation, volunteer hour and partnership goes straight
                into the programmes you have just seen.
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-4">
                <PillButton to="/donate" variant="gold">
                  MAKE A DONATION
                </PillButton>
                <PillButton to="/contact" variant="green">
                  BECOME A PARTNER
                </PillButton>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}