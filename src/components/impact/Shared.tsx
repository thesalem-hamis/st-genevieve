import { motion, useReducedMotion } from "framer-motion";

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

/* Title on the left, short intro on the right: same pattern as the About page */
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
    <motion.div
      {...reveal(0)}
      className="grid gap-6 text-[#12312B] lg:grid-cols-[1.1fr_1fr] lg:items-end lg:gap-16"
    >
      <div>
        <Label>{label}</Label>
        <h2 className="mt-4 max-w-[640px] font-heading text-[clamp(2rem,3.8vw,3.4rem)] font-normal leading-[1.06] tracking-[-0.025em]">
          {title}
        </h2>
      </div>
      <p className="max-w-[520px] font-sans text-sm leading-[1.8] text-[#12312B]/75 sm:text-[15px] lg:justify-self-end">
        {text}
      </p>
    </motion.div>
  );
}