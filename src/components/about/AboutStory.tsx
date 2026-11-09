import { motion, useReducedMotion } from "framer-motion";
import logo from "@/assets/main.png";

const EASE = [0.76, 0, 0.24, 1] as const;

const FACTS = [
  { label: "Status", value: "Registered non-governmental organisation" },
  { label: "Founded", value: "2023" },
  {
    label: "Programmes",
    value:
      "Sustainable healthcare, basic education and direct support for families in vulnerable communities",
  },
];

const STEPS = [
  {
    title: "We saw the gap",
    text: "Underserved communities lacked accessible maternal healthcare and basic educational infrastructure for vulnerable children.",
  },
  {
    title: "It began as community relief",
    text: "What started as a localized relief programme grew quickly, as more families came forward for help.",
  },
  {
    title: "It became a foundation",
    text: "We now focus on sustainable relief rather than short-term aid: equipping mothers with economic skills and giving children continuous access to healthcare and education.",
  },
];

export default function AboutStory() {
  const reduceMotion = useReducedMotion();

  const reveal = (delay = 0) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-60px" },
    transition: { duration: 0.8, delay, ease: EASE },
  });

  return (
    <section className="bg-white px-4 pb-20 text-[#12312B] sm:px-6 sm:pb-24 lg:px-10 lg:pb-28">
      <div className="mx-auto max-w-[1400px]">
        {/* Header row: title left, intro right */}
        <motion.div
          {...reveal(0)}
          className="grid gap-6 lg:grid-cols-[1.1fr_1fr] lg:items-end lg:gap-16"
        >
          <div>
            <span className="inline-flex items-center gap-2 font-sans text-[11px] font-medium uppercase tracking-[0.16em] text-[#12312B]/60">
              <span className="h-1.5 w-1.5 rounded-full bg-[#E6A100]" />
              Our story
            </span>
            <h2 className="mt-4 max-w-[640px] font-heading text-[clamp(2rem,3.8vw,3.4rem)] font-normal leading-[1.06] tracking-[-0.025em]">
              How St. Genevieve Foundation started
            </h2>
          </div>
          <div className="max-w-[560px] lg:justify-self-end">
            <p className="font-sans text-sm leading-[1.8] text-[#12312B]/80 sm:text-[15px]">
              St. Genevieve Maternal and Child Welfare Foundation was founded in
              response to a need we saw first-hand in underserved communities:
              too little access to maternal healthcare, and too little basic
              educational infrastructure for vulnerable children.
            </p>

            <dl className="mt-6 border-t border-[#12312B]/15">
              {FACTS.map((fact) => (
                <div
                  key={fact.label}
                  className="grid grid-cols-[96px_1fr] gap-4 border-b border-[#12312B]/15 py-3.5"
                >
                  <dt className="font-sans text-xs font-medium text-[#12312B]/55">
                    {fact.label}
                  </dt>
                  <dd className="font-sans text-sm leading-relaxed text-[#12312B]">
                    {fact.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </motion.div>

        {/* Wide image with a frosted quote */}
        <motion.div
          {...reveal(0.05)}
          className="relative mt-10 overflow-hidden rounded-[24px] bg-[#F7E3B2] lg:mt-14 lg:rounded-[32px]"
        >
          <img
            src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1800&q=80"
            alt="Healthcare worker caring for a mother and child"
            className="h-[380px] w-full object-cover object-center sm:h-[480px] lg:h-[560px]"
          />
          <div className="absolute inset-x-4 bottom-4 rounded-2xl border border-white/50 bg-white/75 p-5 backdrop-blur-xl sm:inset-x-auto sm:bottom-6 sm:left-6 sm:max-w-[440px] sm:p-6">
            <p className="font-heading text-lg font-normal leading-snug text-[#12312B] sm:text-xl">
              When you restore the health and confidence of a mother, you
              transform the trajectory of an entire family.
            </p>
          </div>
        </motion.div>

        {/* How it grew: editorial list, a real sequence */}
        <div className="mt-16 grid gap-10 lg:mt-24 lg:grid-cols-12 lg:gap-16">
          <motion.div
            {...reveal(0)}
            className="lg:col-span-4 lg:sticky lg:top-28 lg:self-start"
          >
            <span className="inline-flex items-center gap-2 font-sans text-[11px] font-medium uppercase tracking-[0.16em] text-[#12312B]/60">
              <span className="h-1.5 w-1.5 rounded-full bg-[#E6A100]" />
              How it grew
            </span>
            <h3 className="mt-4 font-heading text-[clamp(1.9rem,3.2vw,2.8rem)] font-normal leading-[1.08] tracking-[-0.025em]">
              From a single need to a registered foundation
            </h3>
          </motion.div>

          <motion.ol
            {...reveal(0.1)}
            className="lg:col-span-8 border-b border-[#12312B]/15"
          >
            {STEPS.map((step, i) => (
              <li
                key={step.title}
                className="grid gap-x-8 gap-y-3 border-t border-[#12312B]/15 py-8 sm:grid-cols-[72px_1fr] md:grid-cols-[72px_1fr_1.25fr] md:py-10"
              >
                <span className="font-heading text-4xl font-normal leading-none text-[#E6A100] sm:text-5xl">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h4 className="font-heading text-2xl font-normal leading-[1.15] tracking-[-0.015em] sm:text-[1.7rem]">
                  {step.title}
                </h4>
                <p className="font-sans text-sm leading-[1.8] text-[#12312B]/75 sm:col-start-2 md:col-start-auto sm:text-[15px]">
                  {step.text}
                </p>
              </li>
            ))}
          </motion.ol>
        </div>

        {/* Identity */}
        <motion.div
          {...reveal(0)}
          className="mt-10 flex items-center gap-4 border-t border-[#12312B]/10 pt-6"
        >
          <img
            src={logo}
            alt="St. Genevieve Foundation logo"
            className="h-10 w-auto object-contain sm:h-12"
          />
          <div>
            <p className="font-sans text-sm font-semibold text-[#12312B]">
              St. Genevieve Foundation
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}