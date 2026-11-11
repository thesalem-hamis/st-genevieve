import { motion } from "framer-motion";
import { useReveal } from "./Shared";

type Props = {
  label: string;
  title: string;
  text?: string;
  light?: boolean;
};

/* One centered section header used by every Impact section */
export default function SectionIntro({ label, title, text, light = false }: Props) {
  const reveal = useReveal();

  return (
    <div className="mx-auto flex max-w-[780px] flex-col items-center text-center">
      <motion.span
        {...reveal(0)}
        className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 font-sans text-xs font-semibold tracking-[0.04em] ${
          light ? "bg-white/10 text-[#E6A100]" : "bg-[#12312B]/[0.06] text-[#12312B]/70"
        }`}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-[#E6A100]" />
        {label}
      </motion.span>

      <motion.h2
        {...reveal(0.08)}
        className={`mt-6 font-heading text-[clamp(2.1rem,4.4vw,3.6rem)] font-semibold leading-[1.06] tracking-[-0.03em] ${
          light ? "text-white" : "text-[#12312B]"
        }`}
      >
        {title}
      </motion.h2>

      {text && (
        <motion.p
          {...reveal(0.16)}
          className={`mt-6 max-w-[540px] font-sans text-base leading-[1.8] ${
            light ? "text-white/70" : "text-[#12312B]/65"
          }`}
        >
          {text}
        </motion.p>
      )}
    </div>
  );
}