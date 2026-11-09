// components/impact/ImpactStats.tsx
import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView, useReducedMotion } from "framer-motion";
import { DotBackground } from "@/components/about/Shared";
import { Label, useReveal } from "./Shared";
import { STATS } from "./data";

function CountUp({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduceMotion = useReducedMotion();
  const [n, setN] = useState(reduceMotion ? value : 0);

  useEffect(() => {
    if (reduceMotion) {
      setN(value);
      return;
    }
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 1.8,
      ease: "easeOut",
      onUpdate: (v) => setN(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value, reduceMotion]);

  return (
    <span ref={ref} className="tabular-nums">
      {n.toLocaleString("en-US")}
      <span className="text-[#E6A100]">{suffix}</span>
    </span>
  );
}

export default function ImpactStats() {
  const reveal = useReveal();

  return (
    <section
      id="numbers"
      className="bg-white px-4 pb-16 sm:px-6 sm:pb-20 lg:px-10 lg:pb-24"
    >
      <motion.div
        {...reveal(0)}
        className="relative mx-auto max-w-[1400px] overflow-hidden rounded-[24px] bg-[#12312B] px-6 py-10 text-white sm:px-10 sm:py-12 lg:rounded-[32px] lg:px-14 lg:py-14"
      >
        <DotBackground />
        <div className="relative">
          <Label light>Impact by the numbers</Label>

          <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4 lg:gap-x-0 lg:divide-x lg:divide-white/10">
            {STATS.map((stat) => (
              <div key={stat.label} className="lg:px-8 lg:first:pl-0 lg:last:pr-0">
                <dd className="font-heading text-[clamp(2.4rem,4.6vw,4.2rem)] font-normal leading-none tracking-[-0.03em]">
                  <CountUp value={stat.value} suffix={stat.suffix} />
                </dd>
                <dt className="mt-3 font-sans text-sm text-white/70">
                  {stat.label}
                </dt>
              </div>
            ))}
          </dl>
        </div>
      </motion.div>
    </section>
  );
}