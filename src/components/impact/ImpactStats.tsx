// import { useEffect, useRef, useState } from "react";
// import { animate, motion, useInView, useReducedMotion } from "framer-motion";
// import { DotBackground } from "@/components/about/Shared";
// import { Label, useReveal } from "./Shared";
// import { STATS } from "./data";

// function CountUp({ value, suffix }: { value: number; suffix: string }) {
//   const ref = useRef<HTMLSpanElement>(null);
//   const inView = useInView(ref, { once: true, margin: "-40px" });
//   const reduceMotion = useReducedMotion();
//   const [n, setN] = useState(reduceMotion ? value : 0);

//   useEffect(() => {
//     if (reduceMotion) {
//       setN(value);
//       return;
//     }
//     if (!inView) return;
//     const controls = animate(0, value, {
//       duration: 1.8,
//       ease: "easeOut",
//       onUpdate: (v) => setN(Math.round(v)),
//     });
//     return () => controls.stop();
//   }, [inView, value, reduceMotion]);

//   return (
//     <span ref={ref} className="tabular-nums">
//       {n.toLocaleString("en-US")}
//       <span className="text-[#E6A100]">{suffix}</span>
//     </span>
//   );
// }

// export default function ImpactStats() {
//   const reveal = useReveal();

//   return (
//     <section
//       id="numbers"
//       className="bg-white px-4 pb-16 sm:px-6 sm:pb-20 lg:px-10 lg:pb-24"
//     >
//       <motion.div
//         {...reveal(0)}
//         className="relative mx-auto max-w-[1400px] overflow-hidden rounded-[24px] bg-[#12312B] px-6 py-10 text-white sm:px-10 sm:py-12 lg:rounded-[32px] lg:px-14 lg:py-14"
//       >
//         <DotBackground />
//         <div className="relative">
//           <Label light>Impact by the numbers</Label>

//           <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4 lg:gap-x-0 lg:divide-x lg:divide-white/10">
//             {STATS.map((stat) => (
//               <div key={stat.label} className="lg:px-8 lg:first:pl-0 lg:last:pr-0">
//                 <dd className="font-heading text-[clamp(2.4rem,4.6vw,4.2rem)] font-normal leading-none tracking-[-0.03em]">
//                   <CountUp value={stat.value} suffix={stat.suffix} />
//                 </dd>
//                 <dt className="mt-3 font-sans text-sm text-white/70">
//                   {stat.label}
//                 </dt>
//               </div>
//             ))}
//           </dl>
//         </div>
//       </motion.div>
//     </section>
//   );
// }

import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView, useReducedMotion } from "framer-motion";
import { SectionHeader, useReveal } from "./Shared";
import { STATS } from "./data";

const TONES = [
  {
    bg: "bg-[#E8F0EC]/80 hover:bg-[#E8F0EC]",
    border: "border-[#12312B]/10",
    text: "text-[#12312B]",
    label: "text-[#12312B]/70",
    accent: "bg-[#12312B]",
  },
  {
    bg: "bg-[#FBF1D4]/80 hover:bg-[#FBF1D4]",
    border: "border-[#12312B]/10",
    text: "text-[#12312B]",
    label: "text-[#12312B]/70",
    accent: "bg-[#E6A100]",
  },
  {
    bg: "bg-[#F8E8E3]/80 hover:bg-[#F8E8E3]",
    border: "border-[#12312B]/10",
    text: "text-[#12312B]",
    label: "text-[#12312B]/70",
    accent: "bg-[#D96B43]",
  },
  {
    bg: "bg-[#12312B] hover:bg-[#163B34]",
    border: "border-white/10",
    text: "text-white",
    label: "text-white/70",
    accent: "bg-[#E6A100]",
  },
] as const;

function CountUp({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const reduceMotion = useReducedMotion();
  const [n, setN] = useState(reduceMotion ? value : 0);

  useEffect(() => {
    if (reduceMotion) {
      setN(value);
      return;
    }

    if (!inView) return;

    const controls = animate(0, value, {
      duration: 2.2,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setN(Math.round(v)),
    });

    return () => controls.stop();
  }, [inView, value, reduceMotion]);

  return (
    <span ref={ref} className="font-sans tabular-nums tracking-tighter">
      {n.toLocaleString("en-US")}
      <span className="ml-0.5 font-sans text-[#E6A100]">{suffix}</span>
    </span>
  );
}

export default function ImpactStats() {
  const reveal = useReveal();

  return (
    <section
      id="numbers"
      className="scroll-mt-24 bg-white px-4 pb-16 font-sans text-[#12312B] sm:px-6 sm:pb-20 lg:px-10 lg:pb-24"
    >
      <div className="mx-auto max-w-[1400px]">
        <SectionHeader
          label="By the numbers"
          title="What The Work Adds Up To"
          text="Figures recorded since the Foundation began in 2023."
        />

        <motion.dl
          {...reveal(0.1)}
          className="mt-10 grid grid-cols-1 divide-y divide-[#12312B]/10 overflow-hidden rounded-[24px] border border-[#12312B]/10 shadow-sm sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:mt-14 lg:grid-cols-4 lg:rounded-[32px]"
        >
          {STATS.map((stat, i) => {
            const tone = TONES[i % TONES.length];

            return (
              <motion.div
                key={stat.label}
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className={`group relative flex min-h-[200px] flex-col justify-between p-7 font-sans transition-colors duration-300 sm:min-h-[250px] sm:p-9 lg:min-h-[320px] lg:p-10 ${tone.bg} ${tone.text}`}
              >
                {/* Accent indicator bar */}
                <div className="flex items-center justify-between">
                  <dt className={`max-w-[180px] font-sans text-xs font-semibold uppercase tracking-wider ${tone.label}`}>
                    {stat.label}
                  </dt>

                  <span
                    className={`h-2 w-2 rounded-full opacity-60 transition-transform duration-300 group-hover:scale-150 ${tone.accent}`}
                  />
                </div>

                {/* Animated counter figure */}
                <dd className="mt-8 font-sans text-[clamp(2.6rem,4.8vw,4.5rem)] font-bold leading-none tracking-[-0.04em]">
                  <CountUp value={stat.value} suffix={stat.suffix} />
                </dd>
              </motion.div>
            );
          })}
        </motion.dl>
      </div>
    </section>
  );
}
