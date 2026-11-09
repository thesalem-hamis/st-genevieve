// components/impact/ImpactHero.tsx
import { motion, useReducedMotion } from "framer-motion";
import { PillButton } from "@/components/about/Shared";
import { EASE, Label } from "./Shared";

export default function ImpactHero() {
  const reduceMotion = useReducedMotion();
  const reveal = (delay = 0) => ({
    initial: reduceMotion ? (false as const) : { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, delay, ease: EASE },
  });

  return (
    <section className="bg-white px-4 pb-16 pt-24 sm:px-6 sm:pb-20 sm:pt-28 lg:px-10 lg:pb-24">
      <div className="relative mx-auto flex min-h-[400px] max-w-[1400px] flex-col justify-end overflow-hidden rounded-[24px] bg-[#12312B] text-white sm:min-h-[430px] lg:min-h-[470px] lg:rounded-[32px]">
        <img
          src="https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=2000&q=85"
          alt="Volunteers and families at a St. Genevieve Foundation programme"
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        {/* Flat brand tint, same treatment as the About hero */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[#12312B]/75 mix-blend-multiply"
        />

        <div className="relative px-5 pb-8 pt-28 sm:px-10 sm:pb-10 lg:px-14 lg:pb-12">
          <motion.div {...reveal(0)}>
            <Label light>Our impact</Label>
            <h1 className="mt-5 max-w-[860px] font-heading text-[clamp(2rem,4.2vw,3.8rem)] font-normal leading-[1.04] tracking-[-0.03em]">
              Our footprint: real stories, measurable change
            </h1>
            <p className="mt-5 max-w-[520px] font-sans text-sm leading-[1.75] text-white/80 sm:text-[15px]">
              What our programmes have achieved since 2023, in numbers and in
              the words of the people we serve.
            </p>
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