import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

/**
 * Soft near-black abstract: a hazy glow with thin, nested contour lines on top.
 * Position and size it with className inside a `relative overflow-hidden` section:
 *   <SoftShape className="-right-24 top-10 h-[420px] w-[420px]" />
 */
export default function SoftShape({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-6, 10]);

  return (
    <motion.div
      ref={ref}
      aria-hidden="true"
      style={reduceMotion ? undefined : { y, rotate }}
      className={`pointer-events-none absolute z-0 ${className}`}
    >
      {/* Hazy glow */}
      <div
        className="absolute inset-[8%] rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, rgba(26,26,24,0.07), rgba(26,26,24,0) 100%)",
        }}
      />
      {/* Thin contour lines, each a little smaller and shifted */}
      <svg
        viewBox="0 0 400 400"
        className="absolute inset-0 h-full w-full"
        fill="none"
      >
        <g transform="rotate(-20 200 200)">
          {Array.from({ length: 9 }, (_, i) => (
            <ellipse
              key={i}
              cx={200 + i * 4}
              cy={200 - i * 3}
              rx={190 - i * 19}
              ry={140 - i * 14}
              stroke="#1A1A18"
              strokeOpacity={0.1 - i * 0.007}
              strokeWidth="1"
            />
          ))}
        </g>
      </svg>
    </motion.div>
  );
}