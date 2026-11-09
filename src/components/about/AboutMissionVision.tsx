import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { BookOpen, HandHeart, Sprout } from "lucide-react";

const EASE = [0.76, 0, 0.24, 1] as const;

const VALUES = [
  {
    icon: Sprout,
    title: "Sustainable relief",
    text: "We choose help that lasts over short-term aid, so families can stand on their own.",
  },
  {
    icon: BookOpen,
    title: "Access for every child",
    text: "Continuous access to healthcare and education for vulnerable children.",
  },
  {
    icon: HandHeart,
    title: "Skills for mothers",
    text: "Economic skills that help mothers support their families.",
  },
];

/* Concentric rings clipped in a card corner; they widen slightly on hover */
function Rings({ tone }: { tone: string }) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute -bottom-20 -right-20 h-[260px] w-[260px] transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-110 motion-reduce:transition-none motion-reduce:group-hover:scale-100 sm:-bottom-24 sm:-right-24 sm:h-[310px] sm:w-[310px]"
    >
      <span className={`absolute inset-0 rounded-full border ${tone}`} />
      <span className={`absolute inset-[18%] rounded-full border ${tone}`} />
      <span className={`absolute inset-[36%] rounded-full border ${tone}`} />
    </div>
  );
}

export default function AboutMissionVision() {
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(0);

  const reveal = (delay = 0) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-60px" },
    transition: { duration: 0.8, delay, ease: EASE },
  });

  return (
    <section className="bg-white px-4 pb-16 text-[#12312B] sm:px-6 sm:pb-20 lg:px-10 lg:pb-24">
      <div className="mx-auto max-w-[1400px]">
        {/* Header row, same pattern as the story section */}
        <motion.div
          {...reveal(0)}
          className="grid gap-6 lg:grid-cols-[1.1fr_1fr] lg:items-end lg:gap-16"
        >
          <div>
            <span className="inline-flex items-center gap-2 font-sans text-[11px] font-medium uppercase tracking-[0.16em] text-[#12312B]/60">
              <span className="h-1.5 w-1.5 rounded-full bg-[#E6A100]" />
              Mission and vision
            </span>
            <h2 className="mt-4 max-w-[640px] font-heading text-[clamp(2rem,3.8vw,3.4rem)] font-normal leading-[1.06] tracking-[-0.025em]">
              What guides our work
            </h2>
          </div>
          <p className="max-w-[520px] font-sans text-sm leading-[1.8] text-[#12312B]/75 sm:text-[15px] lg:justify-self-end">
            Our work rests on one idea: relief should last. This is what we aim
            for, and the principles we hold ourselves to.
          </p>
        </motion.div>

        <motion.div {...reveal(0.1)} className="mt-8 grid gap-3 lg:mt-10">
          {/* Mission + Vision: the word is the headline, the statement is plain text */}
          <div className="grid gap-3 md:grid-cols-2 md:items-start">
            <article className="group relative flex min-h-[290px] flex-col justify-between overflow-hidden rounded-[24px] bg-[#E8F0EC] p-7 sm:min-h-[340px] sm:p-8 lg:min-h-[380px] lg:rounded-[28px] lg:p-10">
              <Rings tone="border-[#12312B]/10" />
              <h3 className="relative font-heading text-[clamp(2.8rem,5.5vw,4.8rem)] font-semibold leading-[0.95] tracking-[-0.035em]">
                Mission
              </h3>
              <p className="relative max-w-[400px] font-sans text-sm leading-[1.7] text-[#12312B]/80 sm:text-[15px]">
                To restore the health and confidence of mothers by providing
                accessible maternal healthcare and equipping them with economic
                skills, so that the whole family benefits.
              </p>
            </article>

            {/* Vision sits lower than Mission so the pair has some movement */}
            <article className="group relative flex min-h-[290px] flex-col justify-between overflow-hidden rounded-[24px] bg-[#FBF1D4] p-7 sm:min-h-[340px] sm:p-8 md:mt-10 lg:min-h-[380px] lg:rounded-[28px] lg:p-10">
              <Rings tone="border-[#E6A100]/30" />
              <h3 className="relative font-heading text-[clamp(2.8rem,5.5vw,4.8rem)] font-semibold leading-[0.95] tracking-[-0.035em]">
                Vision
              </h3>
              <p className="relative max-w-[400px] font-sans text-sm leading-[1.7] text-[#12312B]/80 sm:text-[15px]">
                Communities where every mother is cared for and every
                vulnerable child has continuous access to healthcare and
                education.
              </p>
            </article>
          </div>

          {/* Values: one open at a time; hover, focus or tap to switch */}
          <article className="mt-3 rounded-[24px] bg-[#F8E8E3] p-7 sm:p-8 lg:rounded-[28px] lg:p-10">
            <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
              <div className="lg:col-span-4">
                <span className="inline-flex items-center gap-2 font-sans text-[11px] font-medium uppercase tracking-[0.16em] text-[#12312B]/70">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#C9705F]" />
                  What we stand for
                </span>
                <h3 className="mt-4 font-heading text-[clamp(1.9rem,3.2vw,2.8rem)] font-normal leading-[1.08] tracking-[-0.025em]">
                  The commitments behind our programmes
                </h3>
              </div>

              <ul className="border-b border-[#12312B]/15 lg:col-span-8">
                {VALUES.map((value, i) => {
                  const Icon = value.icon;
                  const open = active === i;
                  return (
                    <li key={value.title} className="border-t border-[#12312B]/15">
                      <button
                        type="button"
                        aria-expanded={open}
                        onMouseEnter={() => setActive(i)}
                        onFocus={() => setActive(i)}
                        onClick={() => setActive(i)}
                        className="flex w-full items-center gap-4 py-4 text-left sm:gap-5 sm:py-5"
                      >
                        <span
                          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#12312B]/10 backdrop-blur-md transition-colors duration-500 motion-reduce:transition-none ${
                            open
                              ? "bg-[#12312B] text-white"
                              : "bg-white/60 text-[#12312B]"
                          }`}
                        >
                          <Icon size={18} strokeWidth={1.6} />
                        </span>
                        <span
                          className={`font-heading text-[clamp(1.4rem,2.4vw,2.1rem)] font-normal leading-[1.1] tracking-[-0.02em] transition-opacity duration-500 motion-reduce:transition-none ${
                            open ? "opacity-100" : "opacity-45"
                          }`}
                        >
                          {value.title}
                        </span>
                      </button>

                      <div
                        aria-hidden={!open}
                        className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] motion-reduce:transition-none ${
                          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                        }`}
                      >
                        <div className="overflow-hidden">
                          <p className="max-w-[460px] pb-5 pl-14 font-sans text-sm leading-[1.7] text-[#12312B]/80 sm:pl-[60px] sm:text-[15px]">
                            {value.text}
                          </p>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </article>
        </motion.div>
      </div>
    </section>
  );
}