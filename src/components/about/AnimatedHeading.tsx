import { Fragment } from "react";
import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.76, 0, 0.24, 1] as const;

type Tag = "h1" | "h2" | "h3" | "h4";

/**
 * Heading whose words slide up out of a mask, one after another,
 * the first time it scrolls into view.
 */
export default function AnimatedHeading({
  as = "h2",
  children,
  className = "",
  delay = 0,
}: {
  as?: Tag;
  children: string;
  className?: string;
  delay?: number;
}) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    const Plain = as;
    return <Plain className={className}>{children}</Plain>;
  }

  const MotionTag = motion[as] as typeof motion.h2;
  const words = children.split(" ");

  return (
    <MotionTag
      className={className}
      aria-label={children}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.07, delayChildren: delay } },
      }}
    >
      {words.map((word, i) => (
        <Fragment key={i}>
          <span
            aria-hidden="true"
            className="-mb-[0.14em] inline-block overflow-hidden pb-[0.14em] align-bottom"
          >
            <motion.span
              className="inline-block"
              variants={{
                hidden: { y: "110%" },
                show: { y: "0%", transition: { duration: 0.85, ease: EASE } },
              }}
            >
              {word}
            </motion.span>
          </span>
          {i < words.length - 1 ? " " : ""}
        </Fragment>
      ))}
    </MotionTag>
  );
}