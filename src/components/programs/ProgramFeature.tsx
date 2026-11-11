
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import AnimatedHeading from "@/components/about/AnimatedHeading";

const EASE = [0.76, 0, 0.24, 1] as const;

const PLACEHOLDER =
  "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1800&q=80";

const GALLERY = [
  { src: PLACEHOLDER, alt: "Mothers learning together in a training session", caption: "Learning together" },
  { src: PLACEHOLDER, alt: "A facilitator guiding a skills session", caption: "Guided by facilitators" },
  { src: PLACEHOLDER, alt: "Hands-on practical work", caption: "Hands-on practice" },
  { src: PLACEHOLDER, alt: "A group of mothers after a session", caption: "Growing in confidence" },
  { src: PLACEHOLDER, alt: "A mother at work with her new skill", caption: "Skills that earn" },
];

export default function ProgramFeature() {
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(0);

  const reveal = (delay = 0) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-60px" },
    transition: { duration: 0.8, delay, ease: EASE },
  });

  const current = GALLERY[active];

  return (
    <section className="relative overflow-hidden bg-white px-5 pb-16 pt-16 text-[#12312B] sm:px-6 sm:pb-20 sm:pt-20 lg:px-10 lg:pb-24 lg:pt-28">
      <div className="relative z-10 mx-auto max-w-[1400px]">

        {/* Header */}
        <div className="max-w-[700px]">
          <motion.span
            {...reveal(0)}
            className="inline-flex items-center gap-2 font-sans text-[11px] font-medium uppercase tracking-[0.16em] text-[#12312B]/60"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#E6A100]" />
            Featured programme
          </motion.span>

          <AnimatedHeading
            as="h2"
            className="mt-4 max-w-[640px] font-sans text-[clamp(2rem,3.8vw,3.4rem)] font-semibold leading-[1.06] tracking-[-0.03em]"
          >
            Skills Training For Mothers
          </AnimatedHeading>

          <motion.p
            {...reveal(0.15)}
            className="mt-4 max-w-[520px] font-sans text-sm leading-[1.8] text-[#12312B]/75 sm:text-[15px]"
          >
            We equip mothers with economic skills so they can support their
            families on their own. It is relief that lasts, rather than
            short-term aid.
          </motion.p>
        </div>

        {/* Main image */}
        <motion.div
          {...reveal(0.1)}
          className="relative mt-10 h-[340px] overflow-hidden rounded-[24px] bg-[#F7E3B2] sm:h-[440px] lg:mt-14 lg:h-[540px] lg:rounded-[32px]"
        >
          <AnimatePresence mode="wait">
            <motion.img
              key={active}
              src={current.src}
              alt={current.alt}
              initial={reduceMotion ? false : { opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reduceMotion ? undefined : { opacity: 0 }}
              transition={{ duration: 0.6, ease: EASE }}
              className="absolute inset-0 h-full w-full object-cover object-center"
            />
          </AnimatePresence>

          <div className="absolute inset-x-4 bottom-4 rounded-2xl border border-white/50 bg-white/75 px-5 py-4 backdrop-blur-xl sm:inset-x-auto sm:bottom-6 sm:left-6 sm:min-w-[260px] sm:px-6">
            <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.16em] text-[#12312B]/60">
              {String(active + 1).padStart(2, "0")} / {String(GALLERY.length).padStart(2, "0")}
            </span>
            <p className="mt-1 font-sans text-lg leading-snug text-[#12312B] sm:text-xl">
              {current.caption}
            </p>
          </div>
        </motion.div>

        {/* Thumbnails */}
        <motion.ul
          {...reveal(0.1)}
          className="mt-3 grid grid-cols-5 gap-2 sm:gap-3"
        >
          {GALLERY.map((item, i) => (
            <li key={i}>
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Show photo: ${item.caption}`}
                aria-current={i === active}
                className={`relative block aspect-[4/3] w-full overflow-hidden rounded-[12px] bg-[#E8F0EC] outline-none transition-all duration-500 focus-visible:ring-2 focus-visible:ring-[#E6A100] sm:rounded-[16px] ${
                  i === active
                    ? "ring-2 ring-[#E6A100] ring-offset-2"
                    : "opacity-70 hover:opacity-100"
                }`}
              >
                <img
                  src={item.src}
                  alt=""
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </button>
            </li>
          ))}
        </motion.ul>

      </div>
    </section>
  );
}
