
import { useRef } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ChevronsRight } from "lucide-react";

const EASE = [0.76, 0, 0.24, 1] as const;

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=2000&q=85";

export default function VolunteerHero() {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);

  const enter = (delay: number) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay, ease: EASE },
  });

  return (
    <section
      ref={ref}
      className="bg-white px-5 pt-5 font-sans sm:px-6 sm:pt-6 lg:px-10"
    >
      <div className="relative mx-auto flex h-[320px] max-w-[1400px] items-center overflow-hidden rounded-[24px] bg-[#0B1D19] sm:h-[380px] lg:h-[440px] lg:rounded-[32px]">
        <motion.img
          src={HERO_IMAGE}
          alt="Volunteers working together to make a difference"
          initial={reduceMotion ? false : { scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.6, ease: EASE }}
          style={reduceMotion ? undefined : { y: imgY }}
          className="absolute inset-x-0 -top-[12%] h-[124%] w-full object-cover object-center"
        />

        {/* Dark gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B1D19]/95 via-[#0B1D19]/75 to-[#0B1D19]/30" />

        <motion.div
          style={reduceMotion ? undefined : { opacity, y }}
          className="relative w-full px-6 sm:px-12 lg:px-16"
        >
          <motion.h1
            {...enter(0.1)}
            className="font-sans text-[clamp(2rem,6vw,5rem)] font-semibold leading-[1] tracking-[-0.04em] text-white"
          >
            Volunteer With Us
          </motion.h1>

          <motion.nav
            {...enter(0.25)}
            aria-label="Breadcrumb"
            className="mt-6"
          >
            <ol className="flex items-center gap-2.5 font-sans text-sm text-white sm:text-base">
              <li>
                <Link
                  to="/"
                  className="transition-colors hover:text-[#E6A100] focus-visible:text-[#E6A100] focus-visible:outline-none"
                >
                  Home
                </Link>
              </li>

              <li aria-hidden="true">
                <ChevronsRight size={18} strokeWidth={1.8} />
              </li>

              <li aria-current="page" className="font-medium text-[#E6A100]">
                Volunteer
              </li>
            </ol>
          </motion.nav>
        </motion.div>
      </div>
    </section>
  );
}
