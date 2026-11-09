import { motion, useReducedMotion } from "framer-motion";
import { PillButton } from "./Shared";

const EASE = [0.76, 0, 0.24, 1] as const;

export default function AboutHero() {
  const reduceMotion = useReducedMotion();

  const reveal = (delay = 0) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, delay, ease: EASE },
  });

  return (
    <section className="bg-white px-4 pb-16 pt-24 sm:px-6 sm:pb-20 sm:pt-28 lg:px-10 lg:pb-24">
      {/* Contained rounded panel: photo, flat brand tint, content anchored bottom */}
      <div className="relative mx-auto flex min-h-[400px] max-w-[1400px] flex-col justify-end overflow-hidden rounded-[24px] bg-[#12312B] text-white sm:min-h-[430px] lg:min-h-[470px] lg:rounded-[32px]">
        <img
          src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=2000&q=85"
          alt="St. Genevieve Foundation team at a community outreach session"
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        {/* Flat brand tint (multiply) gives the duotone look without a gradient */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[#12312B]/75 mix-blend-multiply"
        />

        <div className="relative px-5 pb-8 pt-28 sm:px-10 sm:pb-10 lg:px-14 lg:pb-12">
          <motion.div {...reveal(0)}>
            <span className="inline-flex items-center gap-2 font-sans text-[11px] font-medium uppercase tracking-[0.16em] text-white/80">
              <span className="h-1.5 w-1.5 rounded-full bg-[#E6A100]" />
              About us
            </span>

            <h1 className="mt-5 max-w-[860px] font-heading text-[clamp(2rem,4.2vw,3.8rem)] font-normal leading-[1.04] tracking-[-0.03em]">
              A maternal and child welfare foundation serving communities across
              Nigeria
            </h1>
          </motion.div>

          <motion.div {...reveal(0.15)} className="mt-8">
            <PillButton to="/donate" variant="gold">
              MAKE A DONATION
            </PillButton>
          </motion.div>
        </div>
      </div>
    </section>
  );
}