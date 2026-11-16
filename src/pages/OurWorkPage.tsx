import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
} from "framer-motion";

// Projects (programs) sections
import ProgramHero from "@/components/programs/ProgramHero";
import ProgramsList from "@/components/programs/ProgramLists";
import PartnersMarquee from "@/components/programs/PartnersMarquee";

// Impact sections
import ImpactStats from "@/components/impact/ImpactStats";
import ImpactTimeline from "@/components/impact/Immpacttimeline";
import ImpactStories from "@/components/impact/ImpactStories";
import ImpactGallery from "@/components/impact/Impactgallery";
import { Label, useReveal } from "@/components/impact/Shared";

import AnimatedHeading from "@/components/about/AnimatedHeading";
import { PillButton, DotBackground } from "@/components/about/Shared";

export default function OurWorkPage() {
  const reduceMotion = useReducedMotion();
  const reveal = useReveal();

  // Thin gold bar at the top that fills as the page is read
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    mass: 0.3,
  });

  return (
    <main className="min-h-screen bg-white">
      {!reduceMotion && (
        <motion.div
          aria-hidden="true"
          style={{ scaleX }}
          className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-[#E6A100]"
        />
      )}

      {/* What we do */}
      <ProgramHero />
      <ProgramsList />

      {/* The proof */}
      <ImpactStats />
      <ImpactTimeline />
      <ImpactStories />
      <ImpactGallery />

      {/* Partners */}
      <PartnersMarquee />

      {/* Single CTA for the whole page */}
      <section className="bg-white px-4 pb-16 pt-4 sm:px-6 lg:px-10 lg:pb-24">
        <motion.div
          {...reveal(0)}
          className="relative mx-auto max-w-[1400px] overflow-hidden rounded-[24px] bg-[#12312B] px-6 py-10 text-white sm:px-10 sm:py-12 lg:rounded-[32px] lg:px-14 lg:py-14"
        >
          <DotBackground />

          <div className="relative grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-16">
            <div>
              <Label light>Be part of it</Label>
              <AnimatedHeading
                as="h2"
                className="mt-4 max-w-[560px] font-sans text-[clamp(1.9rem,3.6vw,3rem)] font-semibold leading-[1.06] tracking-[-0.03em]"
              >
                Help Us Reach More Families
              </AnimatedHeading>
            </div>

            <div>
              <motion.p
                {...reveal(0.15)}
                className="max-w-[460px] font-sans text-sm leading-[1.8] text-white/75"
              >
                Every donation, volunteer hour and partnership goes straight
                into the programmes you have just seen.
              </motion.p>

              <motion.div
                {...reveal(0.25)}
                className="mt-6 flex flex-wrap items-center gap-3 sm:gap-4"
              >
                <PillButton to="/donate" variant="gold">
                  MAKE A DONATION
                </PillButton>
                <PillButton to="/volunteer" variant="green">
                  BECOME A PARTNER
                </PillButton>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </section>
    </main>
  );
}