import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

/**
 * Abstract rings in the brand's yellow and dark green. Drop it inside any
 * `relative overflow-hidden` section and position/size it with className, e.g.
 *   <Decor className="-right-24 top-10 h-[320px] w-[320px]" />
 * It drifts and turns slowly as the section scrolls past.
 */
export default function Decor({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-25, 35]);

  return (
    <motion.div
      ref={ref}
      aria-hidden="true"
      style={reduceMotion ? undefined : { y, rotate }}
      className={`pointer-events-none absolute z-0 ${className}`}
    >
      <span className="absolute inset-0 rounded-full border border-[#12312B]/15" />
      <span className="absolute inset-[16%] rounded-full border border-[#E6A100]/60" />
      <span className="absolute inset-[32%] rounded-full border border-[#12312B]/15 bg-[#E6A100]/15" />
      {/* Two small solids that orbit as the rings turn */}
      <span className="absolute left-[12%] top-[14%] h-3 w-3 rounded-full bg-[#E6A100]" />
      <span className="absolute bottom-[22%] right-[8%] h-2.5 w-2.5 rounded-full bg-[#12312B]" />
    </motion.div>
  );
}