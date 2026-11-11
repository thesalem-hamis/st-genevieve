
import { motion, useReducedMotion } from "framer-motion";
import AnimatedHeading from "@/components/about/AnimatedHeading";
import { PillButton } from "@/components/about/Shared";

const EASE = [0.76, 0, 0.24, 1] as const;

const PLACEHOLDER =
  "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1400&q=80";

const PROGRAMMES = [
  {
    tag: "Healthcare",
    title: "Maternal Healthcare",
    text: "Accessible maternal healthcare for mothers in underserved communities, so every mother is cared for before, during and after birth.",
    image: PLACEHOLDER,
    alt: "Healthcare worker caring for a mother and child",
    bg: "bg-[#E8F0EC]",
    dot: "bg-[#12312B]",
  },
  {
    tag: "Education",
    title: "Basic Education",
    text: "Continuous access to basic education for vulnerable children, building the foundations they need to learn and grow.",
    image: PLACEHOLDER,
    alt: "Children learning in a classroom",
    bg: "bg-[#FBF1D4]",
    dot: "bg-[#E6A100]",
  },
  {
    tag: "Empowerment",
    title: "Economic Skills For Mothers",
    text: "Practical economic skills that help mothers support their families, turning short-term relief into lasting independence.",
    image: PLACEHOLDER,
    alt: "Mothers learning a trade together",
    bg: "bg-[#F8E8E3]",
    dot: "bg-[#C9705F]",
  },
];

export default function ProgramsList() {
  const reduceMotion = useReducedMotion();

  const reveal = (delay = 0) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 32 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-60px" },
    transition: { duration: 0.9, delay, ease: EASE },
  });

  return (
    <section className="relative overflow-hidden bg-white px-5 pb-16 pt-20 text-[#12312B] sm:px-6 sm:pb-20 sm:pt-24 lg:px-10 lg:pb-24 lg:pt-32">
      <div className="relative z-10 mx-auto max-w-[1400px]">

        {/* Centered Header */}
        <div className="mx-auto flex max-w-[700px] flex-col items-center text-center">
          <motion.span
            {...reveal(0)}
            className="inline-flex items-center gap-2 font-sans text-[11px] font-medium uppercase tracking-[0.16em] text-[#12312B]/60"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#E6A100]" />
            What we do
          </motion.span>

          <AnimatedHeading
            as="h2"
            className="mt-4 max-w-[640px] font-sans text-[clamp(2rem,3.8vw,3.4rem)] font-semibold leading-[1.06] tracking-[-0.03em]"
          >
            Programmes Built To Last
          </AnimatedHeading>

          <motion.p
            {...reveal(0.15)}
            className="mt-5 max-w-[520px] font-sans text-sm leading-[1.8] text-[#12312B]/75 sm:text-[15px]"
          >
            Each programme answers a need we saw first-hand in the communities
            we serve.
          </motion.p>
        </div>

        {/* Programme Cards */}
        <div className="mt-10 grid gap-3 lg:mt-14">
          {PROGRAMMES.map((p, i) => {
            const flip = i % 2 === 1;

            return (
              <motion.article
                key={p.title}
                {...reveal(0)}
                className={`group grid overflow-hidden rounded-[24px] lg:rounded-[28px] md:grid-cols-2 ${p.bg}`}
              >
                <div
                  className={`relative h-[260px] overflow-hidden sm:h-[320px] md:h-auto md:min-h-[380px] ${
                    flip ? "md:order-2" : ""
                  }`}
                >
                  <img
                    src={p.image}
                    alt={p.alt}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                  />
                </div>

                <div className="flex flex-col justify-between gap-10 p-7 sm:p-8 lg:p-12">
                  <div>
                    <span className="inline-flex items-center gap-2 font-sans text-[11px] font-medium uppercase tracking-[0.16em] text-[#12312B]/70">
                      <span className={`h-1.5 w-1.5 rounded-full ${p.dot}`} />
                      {String(i + 1).padStart(2, "0")} · {p.tag}
                    </span>

                    <h3 className="mt-4 font-sans text-[clamp(1.9rem,3.2vw,2.8rem)] font-semibold leading-[1.08] tracking-[-0.03em]">
                      {p.title}
                    </h3>

                    <p className="mt-4 max-w-[420px] font-sans text-sm leading-[1.7] text-[#12312B]/80 sm:text-[15px]">
                      {p.text}
                    </p>
                  </div>

                  <div>
                    <PillButton to="/donate" variant="green">
                      SUPPORT THIS PROGRAMME
                    </PillButton>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
