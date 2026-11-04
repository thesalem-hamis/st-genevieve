import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  animate,
  motion,
  useInView,
  useReducedMotion,
} from "framer-motion";

import { CustomArrowUpRight } from "@/components/ui/CustomIcons";
import logo from "@/assets/main.png";

const EASE = [0.76, 0, 0.24, 1] as const;

const HEADING = "font-heading";
const BODY = "font-sans";

/* Images */
const IMAGES = {
  left: {
    src: "https://images.unsplash.com/photo-1473605768212-7e1f2c756179?auto=format&fit=crop&w=1200&q=80",
    alt: "Woman carrying her baby on her back",
  },
  right: {
    src: "https://images.unsplash.com/photo-1603075405584-d3ef7a4a7c21?auto=format&fit=crop&w=1200&q=80",
    alt: "A warm moment of care and affection",
  },
};

/* Placeholder figures: replace with actual numbers */
const STATS = [
  { to: 98, suffix: "%", label: "Success Rate" },
  { to: 40, suffix: "%", label: "Trusted Partners" },
  { to: 90, suffix: "k+", label: "Lives Reached" },
  { to: 200, suffix: "%", label: "Projects Achieved" },
];

/* Text reveal */
function RevealText({
  text,
  as = "p",
  className = "",
  stagger = 0.014,
  delay = 0,
}: {
  text: string;
  as?: "p" | "h2";
  className?: string;
  stagger?: number;
  delay?: number;
}) {
  const reduceMotion = useReducedMotion();
  const Tag = as === "h2" ? motion.h2 : motion.p;

  if (reduceMotion) {
    return as === "h2" ? (
      <h2 className={className}>{text}</h2>
    ) : (
      <p className={className}>{text}</p>
    );
  }

  return (
    <Tag
      className={className}
      aria-label={text}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: stagger,
            delayChildren: delay,
          },
        },
      }}
    >
      {text.split(" ").map((word, i) => (
        <span key={`${word}-${i}`} aria-hidden="true">
          <span className="-mb-[0.16em] inline-block overflow-hidden pb-[0.16em] align-bottom">
            <motion.span
              className="inline-block will-change-transform"
              variants={{
                hidden: { y: "115%", opacity: 0 },
                show: {
                  y: "0%",
                  opacity: 1,
                  transition: { duration: 0.95, ease: EASE },
                },
              }}
            >
              {word}
            </motion.span>
          </span>{" "}
        </span>
      ))}
    </Tag>
  );
}

/* Count-up number */
function CountUp({
  to,
  suffix = "",
  delay = 0,
  duration = 2.2,
}: {
  to: number;
  suffix?: string;
  delay?: number;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);

  const inView = useInView(ref, {
    once: true,
    margin: "0px 0px -15% 0px",
  });

  const reduceMotion = useReducedMotion();
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;

    if (reduceMotion) {
      setN(to);
      return;
    }

    const controls = animate(0, to, {
      duration,
      delay,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setN(Math.round(v)),
    });

    return () => controls.stop();
  }, [inView, to, duration, delay, reduceMotion]);

  return (
    <span ref={ref} className="tabular-nums">
      {n}
      {suffix}
    </span>
  );
}

/* Dotted background */
function DotBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0"
      style={{
        backgroundImage:
          "radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1.3px)",
        backgroundSize: "18px 18px",
        WebkitMaskImage:
          "radial-gradient(ellipse at 100% 0%, #000 0%, transparent 65%)",
        maskImage:
          "radial-gradient(ellipse at 100% 0%, #000 0%, transparent 65%)",
      }}
    />
  );
}

/* CTA button */
function PillButton({
  to,
  children,
}: {
  to: string;
  children: string;
}) {
  return (
    <Link
      to={to}
      className={`${BODY} group relative inline-flex items-center gap-2.5 overflow-hidden rounded-full bg-[#E6A100] px-7 py-3.5 text-xs font-medium uppercase tracking-wider text-[#12312B] transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] hover:scale-[1.04] hover:text-white hover:shadow-[0_14px_32px_-10px_rgba(18,49,43,0.5)] active:scale-95`}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-1/2 aspect-square w-[160%] -translate-x-1/2 translate-y-1/2 scale-0 rounded-full bg-[#12312B] transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-100"
      />

      <span className="relative block overflow-hidden leading-[1.5]">
        <span className="block transition-transform duration-500 group-hover:-translate-y-full">
          {children}
        </span>

        <span
          aria-hidden="true"
          className="absolute inset-0 block translate-y-full transition-transform duration-500 group-hover:translate-y-0"
        >
          {children}
        </span>
      </span>

      <span className="relative block h-[14px] w-[14px] overflow-hidden">
        <span className="absolute inset-0 transition-transform duration-500 group-hover:-translate-y-full group-hover:translate-x-full">
          <CustomArrowUpRight size={14} color="currentColor" />
        </span>

        <span
          aria-hidden="true"
          className="absolute inset-0 -translate-x-full translate-y-full transition-transform duration-500 group-hover:translate-x-0 group-hover:translate-y-0"
        >
          <CustomArrowUpRight size={14} color="currentColor" />
        </span>
      </span>
    </Link>
  );
}

export default function About() {
  const reduceMotion = useReducedMotion();

  const reveal = (delay = 0) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: { duration: 0.9, delay, ease: EASE },
  });

  const paragraph = `${BODY} text-sm font-medium leading-[1.8] text-[#12312B]/80 sm:text-[15px]`;

  return (
    <section
      id="about"
      className={`${BODY} relative overflow-hidden bg-white px-5 py-20 text-[#12312B] sm:px-10 sm:py-24 lg:px-16 lg:py-28`}
    >
      <div className="mx-auto max-w-[1300px]">
        {/* Header */}
        <div className="flex flex-col items-center text-center">
          <motion.span
            {...reveal(0)}
            className={`${BODY} rounded-md bg-[#E6A100] px-3 py-1 text-[11px] font-semibold text-[#12312B]`}
          >
            About Us
          </motion.span>

          <RevealText
            as="h2"
            stagger={0.07}
            delay={0.1}
            text="Building Stronger Communities Together"
            className={`${HEADING} mt-6 max-w-[640px] text-[clamp(1.9rem,4vw,3.3rem)] font-semibold leading-[1.08] tracking-[-0.03em]`}
          />
        </div>

        {/* Text + Images */}
        <div className="mt-12 grid items-stretch gap-8 lg:mt-16 lg:grid-cols-[1fr_1.05fr_1fr] lg:gap-8">
          {/* Centre text */}
          <div className="order-1 flex flex-col justify-center py-2 lg:order-2">
            <motion.img
              {...reveal(0.1)}
              src={logo}
              alt="Saint Genevieve Foundation"
              className="mb-6 h-12 w-auto self-start object-contain sm:h-14"
            />

            <RevealText
              className={paragraph}
              text="St. Genevieve Maternal and Child Welfare Foundation was born from a deep belief in giving back and nurturing the most vital pillars of society: mothers and children."
            />

            <RevealText
              delay={0.1}
              className={`${paragraph} mt-4`}
              text="Through healthcare, education and skills development, we give mothers and children the tools they need to grow, thrive and build sustainable futures."
            />

            <RevealText
              delay={0.2}
              className={`${paragraph} mt-4`}
              text="Every initiative is guided by hope, equity and a commitment to shaping healthier families and stronger communities for generations to come."
            />
          </div>

          {/* Images */}
          <div className="order-2 -mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden scroll-pl-5 sm:-mx-10 sm:px-10 sm:scroll-pl-10 lg:contents">
            <motion.div
              {...reveal(0.15)}
              className="relative h-[380px] w-[78%] shrink-0 snap-start overflow-hidden rounded-3xl bg-[#F7E3B2] sm:w-[55%] lg:order-1 lg:h-auto lg:min-h-[360px] lg:w-auto"
            >
              <img
                src={IMAGES.left.src}
                alt={IMAGES.left.alt}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 hover:scale-105"
              />
            </motion.div>

            <motion.div
              {...reveal(0.25)}
              className="relative h-[380px] w-[78%] shrink-0 snap-start overflow-hidden rounded-3xl bg-[#F7E3B2] sm:w-[55%] lg:order-3 lg:h-auto lg:min-h-[360px] lg:w-auto"
            >
              <img
                src={IMAGES.right.src}
                alt={IMAGES.right.alt}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 hover:scale-105"
              />
            </motion.div>
          </div>
        </div>

        {/* Button */}
        <motion.div
          {...reveal(0.1)}
          className="mt-10 flex justify-center"
        >
          <PillButton to="/volunteer">
            BECOME A VOLUNTEER
          </PillButton>
        </motion.div>

        {/* Stats */}
        <div className="mx-auto mt-10 grid max-w-[440px] grid-cols-2 gap-3 sm:gap-4">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={
                reduceMotion
                  ? false
                  : { opacity: 0, y: 48, scale: 0.92 }
              }
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              whileHover={reduceMotion ? undefined : { y: -4 }}
              viewport={{ once: true, margin: "0px 0px -10% 0px" }}
              transition={{
                duration: 0.9,
                delay: i * 0.12,
                ease: EASE,
              }}
              className="relative overflow-hidden rounded-xl border border-white/20 bg-[#12312B] p-5 text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.3),inset_0_-1px_0_0_rgba(255,255,255,0.06)] sm:p-6"
            >
              <DotBackground />

              <div className="relative">
                {/* Stat numbers use the display font */}
                <span className={`${HEADING} block text-[40px] font-normal leading-none tracking-[-0.02em] sm:text-[48px]`}>
                  <CountUp
                    to={s.to}
                    suffix={s.suffix}
                    delay={0.25 + i * 0.12}
                  />
                </span>

                <p className={`${BODY} mt-3 text-[12px] font-normal text-white/70 sm:text-[13px]`}>
                  {s.label}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
