// import { motion } from "framer-motion";
// import ImpactHero from "@/components/impact/ImpactHero";
// import ImpactStats from "@/components/impact/ImpactStats";
// import ImpactTimeline from "@/components/impact/Impacttimeline";
// import ImpactStories from "@/components/impact/Impactstrories";
// import ImpactGallery from "@/components/impact/Impactgallery";
// import { Label, useReveal } from "@/components/impact/Shared";
// import { PillButton, DotBackground } from "@/components/about/Shared";

// export default function ImpactPage() {
//   const reveal = useReveal();

//   return (
//     <main className="min-h-screen bg-white">
//       <ImpactHero />
//       <ImpactStats />
//       <ImpactTimeline />
//       <ImpactStories />
//       <ImpactGallery />

//       {/* CTA: same rounded green panel as the About page */}
//       <section className="bg-white px-4 pb-16 sm:px-6 lg:px-10 lg:pb-24">
//         <div className="relative mx-auto max-w-[1400px] overflow-hidden rounded-[24px] bg-[#12312B] px-6 py-14 text-white sm:px-12 sm:py-16 lg:rounded-[32px] lg:px-16 lg:py-20">
//           <DotBackground />
//           <motion.div
//             {...reveal(0)}
//             className="relative grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-end lg:gap-16"
//           >
//             <div>
//               <Label light>Be part of it</Label>
//               <h2 className="mt-4 max-w-[600px] font-heading text-[clamp(2.2rem,4.2vw,3.8rem)] font-normal leading-[1.05] tracking-[-0.025em]">
//                 Help us reach the next community
//               </h2>
//             </div>
//             <div>
//               <p className="max-w-[460px] font-sans text-sm leading-[1.8] text-white/75">
//                 Every donation, volunteer hour and partnership goes straight
//                 into the programmes you have just seen.
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

import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import ImpactHero from "@/components/impact/ImpactHero";
import ImpactStats from "@/components/impact/ImpactStats";
import ImpactTimeline from "@/components/impact/Immpacttimeline";
import ImpactStories from "@/components/impact/ImpactStories";
import ImpactGallery from "@/components/impact/Impactgallery";
import { Label, useReveal } from "@/components/impact/Shared";
import AnimatedHeading from "@/components/about/AnimatedHeading";
import { PillButton, DotBackground } from "@/components/about/Shared";

export default function ImpactPage() {
  const reduceMotion = useReducedMotion();
  const reveal = useReveal();

  // Thin gold bar at the top that fills as the page is read (same as About)
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

      <ImpactHero />
      <ImpactTimeline />
      <ImpactStats />
      <ImpactStories />
      <ImpactGallery />

      {/* CTA: same compact green panel as the About page */}
      <section className="bg-white px-4 pb-16 pt-16 sm:px-6 sm:pt-20 lg:px-10 lg:pb-24 lg:pt-24">
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
                Help Us Reach The Next Community
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