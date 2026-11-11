import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
} from "framer-motion";
import ProjectHero from "@/components/programs/ProgramHero";
// import ProjectFeature from "@/components/programs/ProgramFeature";
import ProgramsList from "@/components/programs/ProgramLists";
import PartnersMarquee from "@/components/programs/PartnersMarquee";
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

export default function ProgramsPage() {
  const reduceMotion = useReducedMotion();

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

      <ProjectHero />
      {/* <ProjectFeature /> */}
      <ProgramsList />
      <PartnersMarquee />

      {/* CTA */}
      <section className="bg-white px-5 py-16 sm:px-6 lg:px-10 lg:py-24">
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
                Support our work
              </span>
              <AnimatedHeading
                as="h2"
                className="mt-4 max-w-[560px] font-heading text-[clamp(1.9rem,3.6vw,3rem)] font-semibold leading-[1.06] tracking-[-0.03em]"
              >
                Help Us Reach More Families
              </AnimatedHeading>
            </div>

            <div>
              <motion.p
                {...reveal(0.15)}
                className="max-w-[460px] font-sans text-sm leading-[1.8] text-white/75"
              >
                Give, volunteer or partner with us. Your support goes straight
                into the programmes above.
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