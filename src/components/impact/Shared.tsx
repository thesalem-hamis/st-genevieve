import { motion, useReducedMotion } from "framer-motion";
import AnimatedHeading from "@/components/about/AnimatedHeading";

export const EASE = [0.76, 0, 0.24, 1] as const;

export function useReveal() {
  const reduceMotion = useReducedMotion();
  return (delay = 0) => ({
    initial: reduceMotion ? (false as const) : { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-60px" },
    transition: { duration: 0.8, delay, ease: EASE },
  });
}

export function Label({
  children,
  light = false,
}: {
  children: string;
  light?: boolean;
}) {
  return (
    <span
      className={`inline-flex items-center gap-2 font-sans text-[11px] font-medium uppercase tracking-[0.16em] ${
        light ? "text-white/80" : "text-[#12312B]/60"
      }`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-[#E6A100]" />
      {children}
    </span>
  );
}

/* Title on the left, short intro on the right: same pattern as the About page.
   The title uses the masked word reveal so it matches About. */
export function SectionHeader({
  label,
  title,
  text,
}: {
  label: string;
  title: string;
  text: string;
}) {
  const reveal = useReveal();
  return (
    <div className="grid gap-6 text-[#12312B] lg:grid-cols-[1.1fr_1fr] lg:items-end lg:gap-16">
      <div>
        <motion.div {...reveal(0)}>
          <Label>{label}</Label>
        </motion.div>
        <AnimatedHeading
          as="h2"
          className="mt-4 max-w-[640px] font-sans text-[clamp(2rem,3.5vw,3.4rem)] font-semibold leading-[1.06] tracking-[-0.03em]"
        >
          {title}
        </AnimatedHeading>
      </div>
      <motion.p
        {...reveal(0.15)}
        className="max-w-[520px] font-sans text-sm leading-[1.8] text-[#12312B]/75 sm:text-[15px] lg:justify-self-end"
      >
        {text}
      </motion.p>
    </div>
  );
}

/* Concentric rings clipped in a card corner (same as the Mission/Vision cards).
   The parent needs `group relative overflow-hidden`. */
export function Rings({ tone }: { tone: string }) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute -bottom-16 -right-16 h-[200px] w-[200px] transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-110 motion-reduce:transition-none motion-reduce:group-hover:scale-100 sm:-bottom-20 sm:-right-20 sm:h-[240px] sm:w-[240px]"
    >
      <span className={`absolute inset-0 rounded-full border ${tone}`} />
      <span className={`absolute inset-[18%] rounded-full border ${tone}`} />
      <span className={`absolute inset-[36%] rounded-full border ${tone}`} />
    </div>
  );
}