// components/impact/ImpactTimeline.tsx
import { useState } from "react";
import { motion } from "framer-motion";
import { SectionHeader, EASE, useReveal } from "./Shared";
import { MILESTONES } from "./data";

export default function ImpactTimeline() {
  const [active, setActive] = useState(MILESTONES.length - 1);
  const reveal = useReveal();
  const current = MILESTONES[active];
  const progress = ((active + 1) / MILESTONES.length) * 100;

  return (
    <section className="bg-white px-4 pb-16 text-[#12312B] sm:px-6 sm:pb-20 lg:px-10 lg:pb-24">
      <div className="mx-auto max-w-[1400px]">
        <SectionHeader
          label="Milestones"
          title="Year by year since the beginning"
          text="Select a year to see what the Foundation achieved in it."
        />

        <motion.div {...reveal(0.1)} className="mt-8 lg:mt-10">
          {/* Year rail with a progress line */}
          <div role="tablist" aria-label="Years" className="flex gap-6 sm:gap-10">
            {MILESTONES.map((m, i) => (
              <button
                key={m.year}
                role="tab"
                type="button"
                aria-selected={i === active}
                onClick={() => setActive(i)}
                className={`pb-4 font-heading text-[clamp(1.6rem,3.4vw,2.8rem)] leading-none tracking-[-0.02em] transition-opacity duration-500 motion-reduce:transition-none ${
                  i === active ? "opacity-100" : "opacity-35 hover:opacity-70"
                }`}
              >
                {m.year}
              </button>
            ))}
          </div>
          <div className="relative h-px w-full bg-[#12312B]/15">
            <motion.div
              className="absolute left-0 top-[-1px] h-[3px] rounded-full bg-[#E6A100]"
              initial={false}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.7, ease: EASE }}
            />
          </div>

          {/* Selected year */}
          <motion.div
            key={current.year}
            role="tabpanel"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: EASE }}
            className="mt-6 grid gap-6 rounded-[24px] bg-[#E8F0EC] p-7 sm:p-8 md:grid-cols-[1fr_1.1fr] md:gap-12 lg:rounded-[28px] lg:p-10"
          >
            <h3 className="font-heading text-[clamp(1.6rem,2.8vw,2.4rem)] font-normal leading-[1.12] tracking-[-0.02em]">
              {current.title}
            </h3>
            <div>
              <p className="max-w-[460px] font-sans text-sm leading-[1.75] text-[#12312B]/80 sm:text-[15px]">
                {current.text}
              </p>
              {current.figure && (
                <p className="mt-6 flex items-baseline gap-3 border-t border-[#12312B]/15 pt-5">
                  <span className="font-heading text-3xl tracking-tight">
                    {current.figure.value}
                  </span>
                  <span className="font-sans text-sm text-[#12312B]/70">
                    {current.figure.label}
                  </span>
                </p>
              )}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}