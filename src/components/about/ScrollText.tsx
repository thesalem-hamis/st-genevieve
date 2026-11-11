// Words start faint and fill in one by one as the paragraph scrolls into view.
import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";

function Word({
  word,
  progress,
  range,
  highlighted,
  highlightClassName,
}: {
  word: string;
  progress: MotionValue<number>;
  range: [number, number];
  highlighted: boolean;
  highlightClassName: string;
}) {
  const opacity = useTransform(progress, range, [0.16, 1]);
  return (
    <motion.span
      style={{ opacity }}
      className={`inline-block ${highlighted ? highlightClassName : ""}`}
    >
      {word}
    </motion.span>
  );
}

export default function ScrollText({
  children,
  className = "",
  highlight,
  highlightClassName = "font-semibold",
}: {
  children: string;
  className?: string;
  /** Optional opening phrase to emphasise (e.g. the organisation's name) */
  highlight?: string;
  /** Classes applied to the highlighted words, e.g. "font-semibold text-[#2F7D5B]" */
  highlightClassName?: string;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "end 0.6"],
  });

  const words = children.split(" ");
  const n = words.length;
  const highlightCount =
    highlight && children.startsWith(highlight)
      ? highlight.split(" ").length
      : 0;

  if (reduceMotion) {
    return (
      <p className={className}>
        {words.map((word, i) => (
          <span key={i}>
            <span className={i < highlightCount ? highlightClassName : ""}>
              {word}
            </span>
            {i < n - 1 ? " " : ""}
          </span>
        ))}
      </p>
    );
  }

  return (
    <p ref={ref} className={className} aria-label={children}>
      {words.map((word, i) => {
        const start = (i / n) * 0.85;
        return (
          <span key={i} aria-hidden="true">
            <Word
              word={word}
              progress={scrollYProgress}
              range={[start, start + 0.15]}
              highlighted={i < highlightCount}
              highlightClassName={highlightClassName}
            />
            {i < n - 1 ? " " : ""}
          </span>
        );
      })}
    </p>
  );
}