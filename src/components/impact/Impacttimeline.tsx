// import { useRef, useState } from "react";
// import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
// import { ChevronLeft, ChevronRight } from "lucide-react";
// import { SectionHeader, EASE, useReveal } from "./Shared";
// import { MILESTONES } from "./data";

// /* The panel changes tone from year to year, using the About palette */
// const PANEL_TONES = ["bg-[#E8F0EC]", "bg-[#FBF1D4]", "bg-[#F8E8E3]"] as const;

// const ARROW =
//   "grid h-11 w-11 place-items-center rounded-full border border-[#12312B]/25 text-[#12312B] transition-colors duration-300 hover:bg-[#12312B] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E6A100] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-30 motion-reduce:transition-none";

// export default function ImpactTimeline() {
//   const reduceMotion = useReducedMotion();
//   const reveal = useReveal();
//   const [active, setActive] = useState(0);
//   const tabs = useRef<(HTMLButtonElement | null)[]>([]);
//   const total = MILESTONES.length;
//   const current = MILESTONES[active];

//   const go = (n: number) => setActive(Math.min(total - 1, Math.max(0, n)));

//   const onKeyDown = (e: React.KeyboardEvent, i: number) => {
//     let next = i;
//     if (e.key === "ArrowRight") next = (i + 1) % total;
//     else if (e.key === "ArrowLeft") next = (i - 1 + total) % total;
//     else if (e.key === "Home") next = 0;
//     else if (e.key === "End") next = total - 1;
//     else return;
//     e.preventDefault();
//     setActive(next);
//     tabs.current[next]?.focus();
//   };

//   return (
//     <section className="bg-white px-4 pb-16 text-[#12312B] sm:px-6 sm:pb-20 lg:px-10 lg:pb-24">
//       <div className="mx-auto max-w-[1400px]">
//         <SectionHeader
//           label="Milestones"
//           title="Year by year since the beginning"
//           text="How the Foundation grew from a local relief effort into a registered organisation. Select a year to see what changed."
//         />

//         <motion.div {...reveal(0.1)} className="mt-8 lg:mt-10">
//           {/* Year rail: each year owns a segment that fills in gold up to the selected year */}
//           <div
//             role="tablist"
//             aria-label="Years"
//             className="grid gap-2 sm:gap-3"
//             style={{ gridTemplateColumns: `repeat(${total}, minmax(0, 1fr))` }}
//           >
//             {MILESTONES.map((m, i) => (
//               <button
//                 key={m.year}
//                 ref={(el) => {
//                   tabs.current[i] = el;
//                 }}
//                 role="tab"
//                 id={`milestone-tab-${i}`}
//                 aria-controls="milestone-panel"
//                 aria-selected={i === active}
//                 tabIndex={i === active ? 0 : -1}
//                 type="button"
//                 onClick={() => setActive(i)}
//                 onKeyDown={(e) => onKeyDown(e, i)}
//                 className="group text-left focus-visible:outline-none"
//               >
//                 <span
//                   className={`block transition-opacity duration-500 motion-reduce:transition-none ${
//                     i === active ? "opacity-100" : "opacity-40 group-hover:opacity-75"
//                   }`}
//                 >
//                   <span className="block pb-3 font-heading text-[clamp(1.6rem,3.4vw,2.8rem)] font-semibold leading-none tracking-[-0.03em] group-focus-visible:underline group-focus-visible:decoration-[#E6A100] group-focus-visible:decoration-2 group-focus-visible:underline-offset-8 sm:pb-1">
//                     {m.year}
//                   </span>
//                   <span className="hidden pb-3 font-sans text-xs text-[#12312B]/70 sm:block">
//                     {m.tag}
//                   </span>
//                 </span>
//                 <span className="relative block h-[3px] w-full overflow-hidden rounded-full bg-[#12312B]/15">
//                   <motion.span
//                     className="absolute inset-0 origin-left rounded-full bg-[#E6A100]"
//                     initial={false}
//                     animate={{ scaleX: i <= active ? 1 : 0 }}
//                     transition={{ duration: reduceMotion ? 0 : 0.6, ease: EASE }}
//                   />
//                 </span>
//               </button>
//             ))}
//           </div>

//           {/* Selected year */}
//           <AnimatePresence mode="wait" initial={false}>
//             <motion.div
//               key={current.year}
//               id="milestone-panel"
//               role="tabpanel"
//               aria-labelledby={`milestone-tab-${active}`}
//               initial={reduceMotion ? false : { opacity: 0, y: 12 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
//               transition={{ duration: 0.4, ease: EASE }}
//               className={`relative mt-6 overflow-hidden rounded-[24px] p-7 sm:p-8 lg:rounded-[28px] lg:p-10 ${
//                 PANEL_TONES[active % PANEL_TONES.length]
//               }`}
//             >
//               {/* Oversized year sitting behind the content */}
//               <span
//                 aria-hidden="true"
//                 className="pointer-events-none absolute -top-4 right-4 font-heading text-[clamp(6rem,16vw,13rem)] font-semibold leading-none tracking-[-0.05em] text-[#12312B]/[0.05] sm:right-8"
//               >
//                 {current.year}
//               </span>

//               <div className="relative grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
//                 <div>
//                   <span className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1 font-sans text-xs font-medium">
//                     <span className="h-1.5 w-1.5 rounded-full bg-[#E6A100]" />
//                     {current.tag}
//                   </span>
//                   <h3 className="mt-5 max-w-[460px] font-heading text-[clamp(1.7rem,3vw,2.6rem)] font-semibold leading-[1.1] tracking-[-0.025em]">
//                     {current.title}
//                   </h3>
//                   <p className="mt-4 max-w-[460px] font-sans text-sm leading-[1.75] text-[#12312B]/80 sm:text-[15px]">
//                     {current.text}
//                   </p>
//                 </div>

//                 <ul className="divide-y divide-[#12312B]/15 border-y border-[#12312B]/15 lg:self-end">
//                   {current.highlights.map((h) => (
//                     <li
//                       key={h.title}
//                       className="grid gap-1 py-4 sm:grid-cols-[190px_1fr] sm:gap-6"
//                     >
//                       <h4 className="font-heading text-lg font-semibold leading-snug tracking-[-0.01em]">
//                         {h.title}
//                       </h4>
//                       <p className="font-sans text-sm leading-[1.7] text-[#12312B]/75">
//                         {h.text}
//                       </p>
//                     </li>
//                   ))}
//                 </ul>
//               </div>

//               <div className="relative mt-8 flex flex-wrap items-end justify-between gap-6 border-t border-[#12312B]/15 pt-6">
//                 <dl className="flex flex-wrap gap-x-12 gap-y-4">
//                   {current.figures.map((f) => (
//                     <div key={f.label}>
//                       <dd className="font-heading text-4xl font-semibold leading-none tracking-[-0.03em]">
//                         {f.value}
//                       </dd>
//                       <dt className="mt-2 font-sans text-sm text-[#12312B]/70">
//                         {f.label}
//                       </dt>
//                     </div>
//                   ))}
//                 </dl>

//                 <div className="flex gap-2">
//                   <button
//                     type="button"
//                     onClick={() => go(active - 1)}
//                     disabled={active === 0}
//                     aria-label="Previous year"
//                     className={ARROW}
//                   >
//                     <ChevronLeft size={20} strokeWidth={1.8} />
//                   </button>
//                   <button
//                     type="button"
//                     onClick={() => go(active + 1)}
//                     disabled={active === total - 1}
//                     aria-label="Next year"
//                     className={ARROW}
//                   >
//                     <ChevronRight size={20} strokeWidth={1.8} />
//                   </button>
//                 </div>
//               </div>
//             </motion.div>
//           </AnimatePresence>
//         </motion.div>
//       </div>
//     </section>
//   );
// }




import { useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Timeline,
  TimelineDate,
  TimelineHeader,
  TimelineIndicator,
  TimelineItem,
  TimelineSeparator,
} from "@/components/reui/timeline";
import { EASE, useReveal } from "./Shared";
import { MILESTONES } from "./data";

const PANEL_TONES = [
  "bg-[#E8F0EC]",
  "bg-[#FBF1D4]",
  "bg-[#F8E8E3]",
] as const;

const ARROW =
  "grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[#12312B]/25 font-sans text-[#12312B] transition-colors duration-300 hover:bg-[#12312B] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E6A100] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-30 motion-reduce:transition-none sm:h-11 sm:w-11";

export default function ImpactTimeline() {
  const reduceMotion = useReducedMotion();
  const reveal = useReveal();
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const mobileRail = useRef<HTMLDivElement>(null);

  const total = MILESTONES.length;
  const current = MILESTONES[active];

  const go = (n: number) => {
    const next = Math.min(total - 1, Math.max(0, n));
    setActive(next);

    // Keep the selected year visible on mobile
    tabs.current[next]?.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "nearest",
      inline: "center",
    });
  };

  const onKeyDown = (e: React.KeyboardEvent, i: number) => {
    let next = i;

    if (e.key === "ArrowRight") next = (i + 1) % total;
    else if (e.key === "ArrowLeft") next = (i - 1 + total) % total;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = total - 1;
    else return;

    e.preventDefault();
    go(next);
    tabs.current[next]?.focus();
  };

  return (
    <section className="mt-12 bg-white px-4 pb-14 font-sans text-[#12312B] sm:mt-16 sm:px-6 sm:pb-20 lg:mt-24 lg:px-10 lg:pb-24">
      <div className="mx-auto max-w-[1400px]">
        {/* Section heading */}
        <motion.div
          {...reveal(0)}
          className="mx-auto flex max-w-[720px] flex-col items-center text-center font-sans"
        >
          <span className="inline-flex items-center gap-2 font-sans text-[10px] font-medium uppercase tracking-[0.14em] text-[#12312B]/70 sm:text-[11px]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#E6A100]" />
            Milestones
          </span>

          <h2 className="mt-3 font-sans text-[clamp(1.8rem,5vw,3.4rem)] font-semibold leading-[1.1] tracking-[-0.03em] sm:mt-4">
            Year By Year Since The Beginning
          </h2>

          <p className="mt-3 max-w-[520px] font-sans text-[13px] leading-7 text-[#12312B]/75 sm:mt-4 sm:text-[15px]">
            How the Foundation grew from a local relief effort into a registered
            organisation. Select a year to see what changed.
          </p>
        </motion.div>

        <motion.div {...reveal(0.1)} className="mt-8 sm:mt-10">
          {/* Mobile year selector */}
          <div className="mb-8 md:hidden">
            <div
              ref={mobileRail}
              className="flex gap-2 overflow-x-auto overscroll-x-contain px-1 pb-3 scrollbar-none"
              role="tablist"
              aria-label="Milestone years"
            >
              {MILESTONES.map((m, i) => {
                const selected = i === active;

                return (
                  <button
                    key={m.year}
                    ref={(el) => {
                      tabs.current[i] = el;
                    }}
                    id={`milestone-tab-${i}`}
                    type="button"
                    role="tab"
                    aria-controls="milestone-panel"
                    aria-selected={selected}
                    aria-label={`${m.year}, ${m.tag}`}
                    tabIndex={selected ? 0 : -1}
                    onClick={() => go(i)}
                    onKeyDown={(e) => onKeyDown(e, i)}
                    className={`min-w-[76px] shrink-0 rounded-xl border px-4 py-3 text-center font-sans text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E6A100] focus-visible:ring-offset-2 ${
                      selected
                        ? "border-[#12312B] bg-[#12312B] text-white shadow-sm"
                        : "border-[#12312B]/15 bg-white text-[#12312B]/55"
                    }`}
                  >
                    {m.tag}
                  </button>
                );
              })}
            </div>

            <div className="h-[2px] overflow-hidden rounded-full bg-[#12312B]/10">
              <motion.div
                className="h-full rounded-full bg-[#E6A100]"
                animate={{
                  width: `${((active + 1) / total) * 100}%`,
                }}
                transition={{ duration: 0.4, ease: EASE }}
              />
            </div>
          </div>

          {/* Desktop timeline */}
          <div className="hidden md:block">
            <Timeline
              value={active + 1}
              orientation="horizontal"
              role="tablist"
              aria-label="Years"
              className="w-full pb-10 font-sans"
            >
              {MILESTONES.map((m, i) => {
                const done = i <= active;
                const selected = i === active;

                return (
                  <TimelineItem
                    key={m.year}
                    step={i + 1}
                    role="presentation"
                    className="group relative font-sans"
                  >
                    <button
                      ref={(el) => {
                        tabs.current[i] = el;
                      }}
                      role="tab"
                      id={`milestone-desktop-tab-${i}`}
                      aria-controls="milestone-panel"
                      aria-selected={selected}
                      aria-label={`${m.year}, ${m.tag}`}
                      tabIndex={selected ? 0 : -1}
                      type="button"
                      onClick={() => go(i)}
                      onKeyDown={(e) => onKeyDown(e, i)}
                      className="peer absolute inset-0 z-10 cursor-pointer rounded-md font-sans focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E6A100] focus-visible:ring-offset-4"
                    />

                    <TimelineHeader>
                      <TimelineSeparator
                        className={`!left-1/2 !ml-3 !h-[3px] !w-[calc(100%-1.5rem)] rounded-full transition-colors duration-500 ${
                          i < active
                            ? "!bg-[#E6A100]"
                            : "!bg-[#12312B]/15"
                        }`}
                      />

                      <TimelineDate
                        className={`relative !top-11 !left-0 !w-full !font-sans !text-center !text-[clamp(0.95rem,1.7vw,1.4rem)] !font-semibold !leading-tight !text-[#12312B] transition-opacity duration-500 ${
                          selected
                            ? "opacity-100"
                            : "opacity-40 group-hover:opacity-75"
                        }`}
                      >
                        {m.tag}
                      </TimelineDate>

                      <TimelineIndicator
                        className={`relative !left-1/2 !-translate-x-1/2 !size-4 !border-2 transition-colors duration-500 ${
                          done
                            ? "!border-[#E6A100] !bg-[#E6A100]"
                            : "!border-[#12312B]/25 !bg-white"
                        }`}
                      >
                        {selected && (
                          <motion.span
                            aria-hidden="true"
                            className="absolute -inset-[7px] rounded-full border border-[#E6A100]"
                            initial={
                              reduceMotion
                                ? false
                                : { opacity: 0, scale: 0.6 }
                            }
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4, ease: EASE }}
                          />
                        )}
                      </TimelineIndicator>
                    </TimelineHeader>
                  </TimelineItem>
                );
              })}
            </Timeline>
          </div>

          {/* Selected year panel */}
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={current.year}
              id="milestone-panel"
              role="tabpanel"
              aria-labelledby={`milestone-tab-${active}`}
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: 0.4, ease: EASE }}
              className={`relative mt-5 overflow-hidden rounded-[20px] p-5 font-sans sm:mt-8 sm:rounded-[24px] sm:p-8 lg:rounded-[28px] lg:p-10 ${
                PANEL_TONES[active % PANEL_TONES.length]
              }`}
            >
              {/* Background year */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -top-1 right-2 font-sans text-[clamp(5rem,18vw,13rem)] font-semibold leading-none tracking-[-0.05em] text-[#12312B]/[0.05] sm:-top-4 sm:right-8"
              >
                {current.year}
              </span>

              <div className="relative grid gap-7 font-sans sm:gap-8 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
                {/* Main story */}
                <div className="font-sans">
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1 font-sans text-[11px] font-medium sm:text-xs">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#E6A100]" />
                    {current.tag}
                  </span>

                  <h3 className="mt-4 max-w-[460px] font-sans text-[clamp(1.55rem,5vw,2.6rem)] font-semibold leading-[1.12] tracking-[-0.025em] sm:mt-5">
                    {current.title}
                  </h3>

                  <p className="mt-3 max-w-[460px] font-sans text-[13px] leading-[1.8] text-[#12312B]/80 sm:mt-4 sm:text-[15px]">
                    {current.text}
                  </p>
                </div>

                {/* Highlights */}
                <ul className="divide-y divide-[#12312B]/15 border-y border-[#12312B]/15 font-sans lg:self-end">
                  {current.highlights.map((h) => (
                    <li
                      key={h.title}
                      className="grid gap-1 py-3 font-sans sm:grid-cols-[160px_1fr] sm:gap-5 sm:py-4 lg:grid-cols-[190px_1fr] lg:gap-6"
                    >
                      <h4 className="font-sans text-base font-semibold leading-snug tracking-[-0.01em] sm:text-lg">
                        {h.title}
                      </h4>

                      <p className="font-sans text-[13px] leading-[1.75] text-[#12312B]/75 sm:text-sm">
                        {h.text}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Figures and navigation */}
              <div className="relative mt-6 flex flex-col gap-6 border-t border-[#12312B]/15 pt-6 font-sans sm:mt-8 sm:flex-row sm:items-end sm:justify-between">
                <dl className="grid grid-cols-2 gap-x-4 gap-y-6 font-sans sm:flex sm:flex-wrap sm:gap-x-10 sm:gap-y-4 lg:gap-x-12">
                  {current.figures.map((f) => (
                    <div key={f.label} className="min-w-0 font-sans">
                      <dd className="font-sans text-3xl font-semibold leading-none tracking-[-0.03em] sm:text-4xl">
                        {f.value}
                      </dd>

                      <dt className="mt-2 font-sans text-xs leading-relaxed text-[#12312B]/70 sm:text-sm">
                        {f.label}
                      </dt>
                    </div>
                  ))}
                </dl>

                <div className="flex items-center justify-between gap-3 font-sans sm:justify-end">
                  <span className="font-sans text-xs text-[#12312B]/60 sm:hidden">
                    {active + 1} of {total} milestones
                  </span>

                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => go(active - 1)}
                      disabled={active === 0}
                      aria-label="Previous year"
                      className={ARROW}
                    >
                      <ChevronLeft size={19} strokeWidth={1.8} />
                    </button>

                    <button
                      type="button"
                      onClick={() => go(active + 1)}
                      disabled={active === total - 1}
                      aria-label="Next year"
                      className={ARROW}
                    >
                      <ChevronRight size={19} strokeWidth={1.8} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
