
import { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  useInView,
  animate,
} from "motion/react";
import { ArrowUpRight, Heart, HeartHandshake } from "lucide-react";

const EASE = [0.76, 0, 0.24, 1] as const;

// Demo figures — replace with actual donation API data.
const DONATION_DATA = {
  raised: 3850000,
  goal: 5000000,
  donors: 284,
  currency: "₦",
};

const INITIAL_DONATIONS = [
  { id: 1, name: "Anonymous Supporter", amount: 50000, time: "Just now", initials: "AS" },
  { id: 2, name: "A Friend of the Foundation", amount: 25000, time: "1 min ago", initials: "FF" },
  { id: 3, name: "Anonymous Supporter", amount: 100000, time: "3 mins ago", initials: "AS" },
  { id: 4, name: "Community Supporter", amount: 15000, time: "5 mins ago", initials: "CS" },
];

// Rotating queue for the live pop-up loop
const LIVE_QUEUE = [
  { name: "Dr. Adebayo", amount: 200000, initials: "DA" },
  { name: "Selah Girl Society", amount: 150000, initials: "SG" },
  { name: "Anonymous Donor", amount: 50000, initials: "AD" },
  { name: "Foundation Partner", amount: 500000, initials: "FP" },
  { name: "Chioma K.", amount: 30000, initials: "CK" },
];

// Abstract flowing lines used as quiet depth behind the content
const LINE_PATHS = [
  "M-100 420 C 200 300, 380 560, 640 430 S 1060 250, 1340 360",
  "M-100 470 C 220 350, 400 610, 660 480 S 1080 300, 1340 410",
  "M-100 520 C 240 400, 420 660, 680 530 S 1100 350, 1340 460",
  "M-100 570 C 260 450, 440 710, 700 580 S 1120 400, 1340 510",
  "M-100 140 C 180 40, 420 240, 700 120 S 1120 20, 1340 110",
  "M-100 190 C 200 90, 440 290, 720 170 S 1140 70, 1340 160",
];

const formatCurrency = (amount: number) =>
  `₦${amount.toLocaleString("en-NG")}`;

/** Counts up when scrolled into view, and smoothly tweens on later changes. */
function AnimatedAmount({
  value,
  reduceMotion,
}: {
  value: number;
  reduceMotion: boolean | null;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const shown = useRef(0);
  const [display, setDisplay] = useState(reduceMotion ? value : 0);

  useEffect(() => {
    if (reduceMotion) {
      setDisplay(value);
      return;
    }

    if (!inView) return;

    const controls = animate(shown.current, value, {
      duration: shown.current === 0 ? 2 : 0.9,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        shown.current = v;
        setDisplay(Math.round(v));
      },
    });

    return () => controls.stop();
  }, [value, inView, reduceMotion]);

  return <span ref={ref}>{formatCurrency(display)}</span>;
}

export default function LiveDonations() {
  const reduceMotion = useReducedMotion();
  const [donations, setDonations] = useState(INITIAL_DONATIONS);
  const [raised, setRaised] = useState(DONATION_DATA.raised);

  // Simulated live popping loop for incoming contributions
  useEffect(() => {
    if (reduceMotion) return;

    let index = 0;

    const interval = setInterval(() => {
      const nextDonor = LIVE_QUEUE[index % LIVE_QUEUE.length];

      const newEntry = {
        id: Date.now(),
        name: nextDonor.name,
        amount: nextDonor.amount,
        time: "Just now",
        initials: nextDonor.initials,
      };

      setDonations((prev) => [newEntry, ...prev.slice(0, 3)]);
      setRaised((r) => r + nextDonor.amount);
      index++;
    }, 4500);

    return () => clearInterval(interval);
  }, [reduceMotion]);

  const progress = Math.min((raised / DONATION_DATA.goal) * 100, 100);

  const reveal = (delay = 0) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-50px" },
    transition: { duration: 0.8, delay, ease: EASE },
  });

  return (
    <section
      id="live-donations"
      className="relative isolate overflow-hidden bg-[#12312B] px-5 py-14 font-sans text-white sm:px-10 sm:py-16 lg:px-16 lg:py-16"
    >
      {/* Abstract yellow line art — flat and quiet, just for depth */}
      <motion.svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 h-full w-full"
        viewBox="0 0 1240 640"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        initial={reduceMotion ? false : { opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2 }}
      >
        {LINE_PATHS.map((d, i) => (
          <motion.path
            key={i}
            d={d}
            stroke="#E6A100"
            strokeWidth={1}
            strokeOpacity={0.1 + (i % 3) * 0.04}
            initial={reduceMotion ? false : { pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 2.4,
              delay: 0.2 + i * 0.15,
              ease: EASE,
            }}
          />
        ))}
      </motion.svg>

      <div className="relative z-10 mx-auto max-w-[1300px]">

        {/* Heading */}
        <div className="mx-auto mb-10 max-w-[720px] text-center lg:mb-12">
          <motion.span
            {...reveal()}
            className="inline-flex items-center gap-2 font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-[#E6A100]"
          >
            <motion.span
              className="h-px w-7 origin-right bg-[#E6A100]"
              initial={reduceMotion ? false : { scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
            />

            Every Contribution Counts

            <motion.span
              className="h-px w-7 origin-left bg-[#E6A100]"
              initial={reduceMotion ? false : { scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
            />
          </motion.span>

          <motion.h1
            {...reveal(0.08)}
            className="mt-4 font-sans text-[clamp(2.5rem,5vw,4.5rem)] font-semibold leading-[0.98] tracking-[-0.035em] text-white"
          >
            Together, We Make
            <span className="block text-[#E6A100] font-sans">
              A Difference.
            </span>
          </motion.h1>

          <motion.p
            {...reveal(0.16)}
            className="mx-auto mt-4 max-w-[570px] font-sans text-sm leading-[1.8] text-white/70 sm:text-[15px]"
          >
            Every donation brings us closer to a world where mothers receive
            quality care, children have opportunities and communities can
            thrive.
          </motion.p>
        </div>

        {/* Dashboard */}
        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">

          {/* Donation progress */}
          <motion.div
            {...reveal(0.08)}
            className="flex min-h-[340px] flex-col lg:min-h-[370px]"
          >
            <div className="flex items-center justify-between">
              <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.18em] text-white/65">
                Our Fundraising Progress
              </span>

              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-1.5 font-sans text-[9px] font-semibold uppercase tracking-[0.12em] text-[#F2D58A]">
                <motion.span
                  className="h-1.5 w-1.5 rounded-full bg-[#E6A100]"
                  animate={reduceMotion ? undefined : { opacity: [1, 0.3, 1] }}
                  transition={{
                    duration: 1.6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                Live Feed
              </span>
            </div>

            <div className="mt-8">
              <p className="font-sans text-[11px] font-medium uppercase tracking-[0.14em] text-white/55">
                Total Contributions
              </p>

              <h3 className="mt-3 font-sans text-[clamp(2.6rem,5.2vw,4.25rem)] font-semibold leading-none tracking-[-0.035em] text-white tabular-nums">
                <AnimatedAmount
                  value={raised}
                  reduceMotion={reduceMotion}
                />
              </h3>

              <p className="mt-3 font-sans text-[13px] text-white/60">
                Our collective generosity is creating real possibilities.
              </p>
            </div>

            {/* Progress */}
            <div className="mt-auto pt-8">
              <div className="mb-3 flex items-center justify-between gap-4">
                <span className="font-sans text-[11px] font-medium text-white/70">
                  Fundraising target
                </span>

                <span className="font-sans text-[12px] font-semibold text-[#F2D58A]">
                  {progress.toFixed(0)}% reached
                </span>
              </div>

              <div
                className="h-[9px] overflow-hidden rounded-full bg-white/15"
                role="progressbar"
                aria-label="Fundraising progress"
                aria-valuenow={Math.round(progress)}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                <motion.div
                  initial={reduceMotion ? false : { width: 0 }}
                  whileInView={{ width: `${progress}%` }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 1.4,
                    delay: 0.3,
                    ease: EASE,
                  }}
                  className="relative h-full overflow-hidden rounded-full bg-[#E6A100]"
                >
                  {!reduceMotion && (
                    <motion.span
                      aria-hidden="true"
                      className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/50 to-transparent"
                      initial={{ x: "-120%" }}
                      animate={{ x: "420%" }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatDelay: 2.5,
                        ease: "easeInOut",
                      }}
                    />
                  )}
                </motion.div>
              </div>

              <div className="mt-3 flex items-center justify-between gap-4">
                <span className="font-sans text-[11px] text-white/55">
                  Raised: {formatCurrency(raised)}
                </span>

                <span className="font-sans text-[11px] text-white/55">
                  Goal: {formatCurrency(DONATION_DATA.goal)}
                </span>
              </div>

              <motion.a
                href="/donate"
                whileHover={reduceMotion ? undefined : { scale: 1.03 }}
                whileTap={reduceMotion ? undefined : { scale: 0.97 }}
                className="group mt-6 inline-flex w-full items-center justify-center gap-3 rounded-full bg-[#E6A100] px-6 py-4 font-sans text-[10px] font-bold uppercase tracking-[0.14em] text-[#12312B] transition-colors duration-300 hover:bg-white sm:w-auto"
              >
                Be Part of the Impact
                <ArrowUpRight
                  size={16}
                  className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </motion.a>
            </div>
          </motion.div>

          {/* Recent contributions */}
          <motion.div
            {...reveal(0.16)}
            className="flex min-h-[340px] flex-col lg:min-h-[370px]"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.17em] text-[#E6A100]">
                  Community Giving
                </span>

                <h3 className="mt-2 font-sans text-[clamp(1.7rem,2.6vw,2.2rem)] font-semibold leading-[1.05] tracking-[-0.025em] text-white">
                  Recent Contributions
                </h3>

                <p className="mt-2 font-sans text-[13px] leading-[1.7] text-white/60">
                  Real-time updates from supporters worldwide.
                </p>
              </div>

              <motion.div
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/10"
                animate={reduceMotion ? undefined : { scale: [1, 1.1, 1] }}
                transition={{
                  duration: 2.4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <HeartHandshake
                  size={21}
                  strokeWidth={1.6}
                  className="text-white"
                />
              </motion.div>
            </div>

            {/* Animated donations list */}
            <div className="mt-4 flex-1 divide-y divide-white/10 overflow-hidden">
              <AnimatePresence initial={false}>
                {donations.map((donation) => (
                  <motion.div
                    layout="position"
                    key={donation.id}
                    initial={
                      reduceMotion
                        ? false
                        : { opacity: 0, y: -24, scale: 0.97 }
                    }
                    animate={{
                      opacity: 1,
                      y: 0,
                      scale: 1,
                      backgroundColor: reduceMotion
                        ? "rgba(255,255,255,0)"
                        : ["rgba(255,255,255,0.09)", "rgba(255,255,255,0)"],
                    }}
                    exit={{
                      opacity: 0,
                      height: 0,
                      transition: { duration: 0.25 },
                    }}
                    transition={{
                      duration: 0.55,
                      ease: EASE,
                      backgroundColor: {
                        duration: 1.6,
                        ease: "easeOut",
                      },
                      layout: { duration: 0.5, ease: EASE },
                    }}
                    className="flex items-center justify-between gap-3 rounded-lg px-2 py-3 first:pt-3 last:pb-3"
                  >
                    <div className="flex min-w-0 items-center gap-3.5">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white font-sans text-xs font-bold text-black">
                        {donation.initials}
                      </div>

                      <div className="min-w-0">
                        <p className="truncate font-sans text-[13px] font-semibold text-white">
                          {donation.name}
                        </p>

                        <p className="mt-0.5 font-sans text-[11px] text-white/50">
                          {donation.time}
                        </p>
                      </div>
                    </div>

                    <span className="shrink-0 font-sans text-sm font-bold text-white tabular-nums">
                      {formatCurrency(donation.amount)}
                    </span>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <div className="mt-auto border-t border-white/10 pt-3">
              <p className="font-sans text-[10px] leading-[1.6] text-white/50">
                Contributions are updated securely in real-time. Privacy options
                available upon checkout.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Closing note */}
        <motion.div
          {...reveal(0.2)}
          className="mt-10 flex flex-col items-center text-center"
        >
          <div className="flex items-center gap-2 text-[#E6A100]">
            <motion.span
              animate={reduceMotion ? undefined : { scale: [1, 1.25, 1] }}
              transition={{
                duration: 1.6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="flex"
            >
              <Heart size={14} fill="currentColor" />
            </motion.span>

            <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.16em]">
              Thank You For Giving
            </span>

            <motion.span
              animate={reduceMotion ? undefined : { scale: [1, 1.25, 1] }}
              transition={{
                duration: 1.6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.4,
              }}
              className="flex"
            >
              <Heart size={14} fill="currentColor" />
            </motion.span>
          </div>

          <p className="mt-3 max-w-[490px] font-sans text-[13px] leading-[1.7] text-white/65">
            Behind every contribution is someone who believes that a better
            future is possible. Thank you for standing with us.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
