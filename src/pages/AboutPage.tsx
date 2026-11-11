// import { motion, useReducedMotion } from "framer-motion";
// import AboutHero from "@/components/about/AboutHero";
// import AboutStory from "@/components/about/AboutStory";
// import AboutMissionVision from "@/components/about/AboutMissionVision";
// import Owners from "@/components/about/Owners";
// import { PillButton, DotBackground } from "@/components/about/Shared";

// const EASE = [0.76, 0, 0.24, 1] as const;

// export default function AboutPage() {
//   const reduceMotion = useReducedMotion();

//   const reveal = (delay = 0) => ({
//     initial: reduceMotion ? false : { opacity: 0, y: 24 },
//     whileInView: { opacity: 1, y: 0 },
//     viewport: { once: true, margin: "-60px" },
//     transition: { duration: 0.8, delay, ease: EASE },
//   });

//   return (
//     <main className="min-h-screen bg-white">
//       <AboutHero />
//       <AboutStory />
//       <AboutMissionVision />
//       <Owners />

//       {/* CTA: same contained rounded panel as the hero */}
//       <section className="bg-white px-4 pb-16 sm:px-6 lg:px-10 lg:pb-24">
//         <div className="relative mx-auto max-w-[1400px] overflow-hidden rounded-[24px] bg-[#12312B] px-6 py-14 text-white sm:px-12 sm:py-16 lg:rounded-[32px] lg:px-16 lg:py-20">
//           <DotBackground />

//           <motion.div
//             {...reveal(0)}
//             className="relative grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-end lg:gap-16"
//           >
//             <div>
//               <span className="inline-flex items-center gap-2 font-sans text-[11px] font-medium uppercase tracking-[0.16em] text-white/70">
//                 <span className="h-1.5 w-1.5 rounded-full bg-[#E6A100]" />
//                 Get involved
//               </span>
//               <h2 className="mt-4 max-w-[600px] font-heading text-[clamp(2.2rem,4.2vw,3.8rem)] font-normal leading-[1.05] tracking-[-0.025em]">
//                 Ready to join our mission?
//               </h2>
//             </div>

//             <div>
//               <p className="max-w-[460px] font-sans text-sm leading-[1.8] text-white/75">
//                 Whether through a donation, volunteering or a partnership with
//                 your organisation, your support reaches the community directly.
//               </p>
//               <div className="mt-7 flex flex-wrap items-center gap-4">
//                 <PillButton to="/donate" variant="gold">
//                   MAKE A DONATION
//                 </PillButton>
//                 <PillButton to="/contact" variant="green">
//                   BECOME A PARTNER
//                 </PillButton>
//               </div>
//             </div>
//           </motion.div>
//         </div>
//       </section>
//     </main>
//   );
// }


import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
} from "framer-motion";
import AboutHero from "@/components/about/AboutHero";
import AboutStory from "@/components/about/AboutStory";
import AboutMissionVision from "@/components/about/AboutMissionVision";
import Owners from "@/components/about/Owners";
import AnimatedHeading from "@/components/about/AnimatedHeading";
import { PillButton } from "@/components/about/Shared";

const EASE = [0.76, 0, 0.24, 1] as const;

/* Dots confined to the top-right corner, fading out toward the centre */
const DOTS_STYLE = {
  backgroundImage:
    "radial-gradient(rgba(255,255,255,0.28) 1.3px, transparent 1.6px)",
  backgroundSize: "18px 18px",
  WebkitMaskImage:
    "radial-gradient(ellipse 100% 100% at 100% 0%, #000 0%, transparent 70%)",
  maskImage:
    "radial-gradient(ellipse 100% 100% at 100% 0%, #000 0%, transparent 70%)",
} as const;

export default function AboutPage() {
  const reduceMotion = useReducedMotion();

  // Thin gold bar at the top that fills as the page is read
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    mass: 0.3,
  });

  const reveal = (delay = 0) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-60px" },
    transition: { duration: 0.9, delay, ease: EASE },
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

      <AboutHero />
      <AboutStory />
      <AboutMissionVision />
      <Owners />

      {/* CTA: compact panel, dots in the right corner only */}
      <section className="bg-white px-5 pb-16 sm:px-6 lg:px-10 lg:pb-24">
        <motion.div
          {...reveal(0)}
          className="relative mx-auto max-w-[1400px] overflow-hidden rounded-[24px] bg-[#12312B] px-6 py-10 text-white sm:px-10 sm:py-12 lg:rounded-[32px] lg:px-14 lg:py-14"
        >
          <div
            aria-hidden="true"
            style={DOTS_STYLE}
            className="pointer-events-none absolute right-0 top-0 h-full w-full sm:w-3/4 lg:w-1/2"
          />

          <div className="relative grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-16">
            <div>
              <span className="inline-flex items-center gap-2 font-sans text-[11px] font-medium uppercase tracking-[0.16em] text-white/70">
                <span className="h-1.5 w-1.5 rounded-full bg-[#E6A100]" />
                Get involved
              </span>
              <AnimatedHeading
                as="h2"
                className="mt-4 max-w-[560px] font-heading text-[clamp(1.9rem,3.6vw,3rem)] font-semibold leading-[1.06] tracking-[-0.03em]"
              >
                Ready To Join Our Mission?
              </AnimatedHeading>
            </div>

            <div>
              <motion.p
                {...reveal(0.15)}
                className="max-w-[460px] font-sans text-sm leading-[1.8] text-white/75"
              >
                Whether through a donation, volunteering or a partnership with
                your organisation, your support reaches the community directly.
              </motion.p>
              <motion.div
                {...reveal(0.25)}
                className="mt-6 flex flex-wrap items-center gap-3 sm:gap-4"
              >
                <PillButton to="/donate" variant="gold">
                  MAKE A DONATION
                </PillButton>
                <PillButton to="/contact" variant="green">
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