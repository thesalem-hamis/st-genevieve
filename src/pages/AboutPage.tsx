import { motion, useReducedMotion } from "framer-motion";
import AboutHero from "@/components/about/AboutHero";
import AboutStory from "@/components/about/AboutStory";
import AboutMissionVision from "@/components/about/AboutMissionVision";
import Owners from "@/components/about/Owners";
import { PillButton, DotBackground } from "@/components/about/Shared";

const EASE = [0.76, 0, 0.24, 1] as const;

export default function AboutPage() {
  const reduceMotion = useReducedMotion();

  const reveal = (delay = 0) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-60px" },
    transition: { duration: 0.8, delay, ease: EASE },
  });

  return (
    <main className="min-h-screen bg-white">
      <AboutHero />
      <AboutStory />
      <AboutMissionVision />
      <Owners />

      {/* CTA: same contained rounded panel as the hero */}
      <section className="bg-white px-4 pb-16 sm:px-6 lg:px-10 lg:pb-24">
        <div className="relative mx-auto max-w-[1400px] overflow-hidden rounded-[24px] bg-[#12312B] px-6 py-14 text-white sm:px-12 sm:py-16 lg:rounded-[32px] lg:px-16 lg:py-20">
          <DotBackground />

          <motion.div
            {...reveal(0)}
            className="relative grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-end lg:gap-16"
          >
            <div>
              <span className="inline-flex items-center gap-2 font-sans text-[11px] font-medium uppercase tracking-[0.16em] text-white/70">
                <span className="h-1.5 w-1.5 rounded-full bg-[#E6A100]" />
                Get involved
              </span>
              <h2 className="mt-4 max-w-[600px] font-heading text-[clamp(2.2rem,4.2vw,3.8rem)] font-normal leading-[1.05] tracking-[-0.025em]">
                Ready to join our mission?
              </h2>
            </div>

            <div>
              <p className="max-w-[460px] font-sans text-sm leading-[1.8] text-white/75">
                Whether through a donation, volunteering or a partnership with
                your organisation, your support reaches the community directly.
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