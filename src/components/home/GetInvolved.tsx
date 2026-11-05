
import { useId } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, HandHeart, Users } from "lucide-react";
import { BackgroundCubesGrid } from "@/components/ui/background-cubes-grid";

const EASE = [0.76, 0, 0.24, 1] as const;

const GREEN = "#12312B";
const GOLD = "#E6A100";
const BLUE = "#B4BFF2";

/* ------------------------------------------------------------------ */
/* Glass chrome                                                        */
/* ------------------------------------------------------------------ */

function GlassBorder() {
  return (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-20 rounded-[15px]"
      style={{
        padding: 1,
        background:
          "linear-gradient(145deg, rgba(18,49,43,0.18), rgba(18,49,43,0.04) 30%, rgba(18,49,43,0.03) 70%, rgba(18,49,43,0.12))",
        WebkitMask:
          "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
        WebkitMaskComposite: "xor",
        mask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
        maskComposite: "exclude",
      }}
    />
  );
}

function Sheen() {
  return (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 rounded-[15px]"
      style={{
        background:
          "radial-gradient(120% 70% at 0% 0%, rgba(18,49,43,0.03), transparent 55%)",
      }}
    />
  );
}

/* ------------------------------------------------------------------ */
/* Abstract artwork                                                    */
/* ------------------------------------------------------------------ */

type ArtVariant = "orbit" | "waves" | "bloom";

function Abstract({
  variant,
  color,
}: {
  variant: ArtVariant;
  color: string;
}) {
  const uid = useId().replace(/:/g, "");
  const glow = `${uid}-glow`;

  if (variant === "orbit") {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 500 500"
        fill="none"
        className="pointer-events-none absolute -bottom-24 -right-24 h-[460px] w-[460px] transition-transform duration-700 group-hover:scale-105 sm:h-[520px] sm:w-[520px]"
      >
        <defs>
          <radialGradient id={glow} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={color} stopOpacity="0.16" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </radialGradient>
        </defs>

        <circle cx="260" cy="260" r="230" fill={`url(#${glow})`} />

        <g stroke={color} strokeWidth="1.5">
          <circle cx="260" cy="260" r="70" strokeOpacity="0.2" />
          <circle cx="260" cy="260" r="120" strokeOpacity="0.16" />
          <circle cx="260" cy="260" r="170" strokeOpacity="0.12" />
          <circle cx="260" cy="260" r="220" strokeOpacity="0.08" />

          <ellipse
            cx="260"
            cy="260"
            rx="235"
            ry="90"
            transform="rotate(-35 260 260)"
            strokeOpacity="0.15"
          />

          <ellipse
            cx="260"
            cy="260"
            rx="235"
            ry="90"
            transform="rotate(35 260 260)"
            strokeOpacity="0.15"
          />
        </g>

        <circle cx="150" cy="170" r="10" fill={color} fillOpacity="0.25" />
        <circle cx="372" cy="360" r="7" fill={color} fillOpacity="0.25" />
      </svg>
    );
  }

  if (variant === "waves") {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 400 200"
        fill="none"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[55%] w-full"
      >
        <defs>
          <linearGradient id={glow} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0" />
            <stop offset="100%" stopColor={color} stopOpacity="0.12" />
          </linearGradient>
        </defs>

        <path
          d="M0 120 C 60 60, 120 180, 200 120 S 340 60, 400 110 L400 200 L0 200 Z"
          fill={`url(#${glow})`}
        />

        {[0, 1, 2, 3].map((i) => (
          <path
            key={i}
            d={`M0 ${100 + i * 22} C 60 ${40 + i * 22}, 120 ${160 + i * 22}, 200 ${100 + i * 22} S 340 ${40 + i * 22}, 400 ${90 + i * 22}`}
            stroke={color}
            strokeWidth="1.5"
            strokeOpacity={0.2 - i * 0.04}
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </svg>
    );
  }

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 400 400"
      fill="none"
      className="pointer-events-none absolute -bottom-20 -right-20 h-[300px] w-[300px] transition-transform duration-700 group-hover:scale-105"
    >
      <defs>
        <radialGradient id={glow} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={color} stopOpacity="0.14" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="220" cy="220" r="190" fill={`url(#${glow})`} />

      <g transform="translate(220 220)" stroke={color} strokeWidth="1.5">
        {[0, 1, 2, 3].map((i) => (
          <rect
            key={i}
            x="-90"
            y="-90"
            width="180"
            height="180"
            rx="44"
            transform={`rotate(${i * 22})`}
            fill={color}
            fillOpacity="0.05"
            strokeOpacity="0.15"
          />
        ))}
      </g>

      <circle cx="120" cy="120" r="8" fill={color} fillOpacity="0.2" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Card styling                                                        */
/* ------------------------------------------------------------------ */

const CARD =
  "group relative flex flex-col overflow-hidden rounded-[15px] bg-gradient-to-br from-white via-[#FDFDFD] to-[#F8FAF9] shadow-[0_10px_30px_-15px_rgba(18,49,43,0.07)] transition-all duration-500 hover:shadow-[0_20px_40px_-15px_rgba(18,49,43,0.12)]";

/* ------------------------------------------------------------------ */

export default function GetInvolved() {
  const reduceMotion = useReducedMotion();

  const reveal = (delay = 0) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 22 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-50px" },
    transition: {
      duration: 0.75,
      delay,
      ease: EASE,
    },
  });

  return (
    <section
      id="get-involved"
      className="relative isolate overflow-hidden bg-[#FEFAF2] px-5 py-16 font-sans text-[#12312B] sm:px-10 sm:py-20 lg:px-16 lg:py-24"
    >
      {/* Light dotted background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage:
            "radial-gradient(rgba(18,49,43,0.24) 0.8px, transparent 0.8px)",
          backgroundSize: "18px 18px",
          opacity: 0.22,
        }}
      />

      {/* Subtle ambient cube artwork */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-5%] top-[-10%] z-0 scale-90 opacity-[0.12] mix-blend-multiply sm:scale-100"
      >
        <BackgroundCubesGrid />
      </div>

      <div className="relative z-10 mx-auto max-w-[1450px]">
        {/* Section introduction */}
        <div className="mx-auto mb-14 max-w-[760px] text-center lg:mb-18">
          <motion.h2
            {...reveal(0.04)}
            className="font-heading text-[clamp(2.3rem,4.8vw,4.2rem)] font-bold leading-[0.98] tracking-[-0.025em] text-[#12312B]"
          >
            Creating Impact
            <span className="block">That Changes Lives.</span>
          </motion.h2>

          <motion.p
            {...reveal(0.12)}
            className="mx-auto mt-5 max-w-[650px] font-sans text-sm font-normal leading-[1.8] text-[#12312B]/70 sm:text-[15px]"
          >
            Meaningful change happens when people come together. Your time,
            generosity and partnerships can help us build a healthier and
            brighter future for mothers, children and communities.
          </motion.p>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:auto-rows-[320px]">
          {/* Volunteer */}
          <motion.article
            {...reveal(0.05)}
            className={`${CARD} min-h-[500px] p-7 text-[#12312B] sm:row-span-2 sm:min-h-[630px] sm:p-9 lg:min-h-0`}
          >
            <Sheen />
            <Abstract variant="orbit" color={GREEN} />
            <GlassBorder />

            <div className="relative z-10 flex flex-1 flex-col">
              <div className="flex items-center justify-between">
                <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.18em] text-[#E6A100]">
                  Give Your Time
                </span>

                <Users
                  size={21}
                  strokeWidth={1.5}
                  className="text-[#12312B]/70"
                />
              </div>

              <h3 className="mt-6 max-w-[420px] font-heading text-[26px] font-normal leading-[1.1] tracking-[-0.01em] text-[#12312B] sm:text-[30px]">
                Volunteer
                <span className="block text-[#E6A100]">With Us.</span>
              </h3>

              <p className="mt-4 max-w-[340px] font-sans text-[12px] font-normal leading-[1.75] text-[#12312B]/70 sm:text-[13px]">
                Your time, skills and compassion can make a lasting difference.
                Join our team and become part of the change happening in our
                communities.
              </p>

              <div className="mt-auto pt-8">
                <a
                  href="/volunteer"
                  className="inline-flex items-center gap-3 border-b border-[#E6A100] pb-2 font-sans text-[10px] font-semibold uppercase tracking-[0.14em] text-[#12312B] transition-all duration-300 hover:gap-5 hover:text-[#E6A100]"
                >
                  Become a Volunteer
                  <ArrowUpRight size={15} strokeWidth={1.8} />
                </a>
              </div>
            </div>
          </motion.article>

          {/* Top middle image */}
          <motion.div
            {...reveal(0.12)}
            className="group relative h-[260px] overflow-hidden rounded-[15px] bg-[#12312B] sm:h-[300px] lg:h-full"
          >
            <img
              src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=1100&q=85"
              alt="Volunteers working together to support their community"
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.045]"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#12312B]/65 via-transparent to-transparent" />

            <span className="absolute bottom-5 left-5 font-sans text-[10px] font-semibold uppercase tracking-[0.16em] text-white">
              Together, We Can Do More
            </span>

            <GlassBorder />
          </motion.div>

          {/* Partnership */}
          <motion.article
            {...reveal(0.18)}
            className={`${CARD} min-h-[280px] p-7 text-[#12312B] sm:min-h-[300px] sm:p-8 lg:h-full`}
          >
            <Sheen />
            <Abstract variant="waves" color={GOLD} />
            <GlassBorder />

            <div className="relative z-10 flex flex-1 flex-col">
              <div className="flex items-center justify-between">
                <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.17em] text-[#E6A100]">
                  Collaborate With Us
                </span>

                <Users
                  size={21}
                  strokeWidth={1.5}
                  className="text-[#12312B]/70"
                />
              </div>

              <h3 className="mt-5 font-heading text-xl font-normal leading-[1.15] tracking-[-0.01em] text-[#12312B] sm:text-[22px]">
                Partner
                <span className="block">With Us.</span>
              </h3>

              <p className="mt-3 max-w-[390px] font-sans text-[13px] font-normal leading-[1.75] text-[#12312B]/70">
                Work alongside us to expand our reach, strengthen our
                programmes and create greater impact for the people we serve.
              </p>

              <div className="mt-auto pt-5">
                <a
                  href="/contact"
                  className="inline-flex items-center gap-2 font-sans text-[10px] font-semibold uppercase tracking-[0.13em] text-[#12312B] transition-all duration-300 hover:gap-4 hover:text-[#E6A100]"
                >
                  Explore Partnerships
                  <ArrowUpRight size={15} />
                </a>
              </div>
            </div>
          </motion.article>

          {/* Donation */}
          <motion.article
            {...reveal(0.2)}
            className={`${CARD} min-h-[280px] p-7 text-[#12312B] sm:min-h-[300px] sm:p-8 lg:h-full`}
          >
            <Sheen />
            <Abstract variant="bloom" color={BLUE} />
            <GlassBorder />

            <div className="relative z-10 flex flex-1 flex-col">
              <div className="flex items-center justify-between">
                <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.17em] text-[#E6A100]">
                  Make a Difference
                </span>

                <HandHeart
                  size={22}
                  strokeWidth={1.5}
                  className="text-[#12312B]/70"
                />
              </div>

              <h3 className="mt-5 font-heading text-xl font-normal leading-[1.15] tracking-[-0.01em] text-[#12312B] sm:text-[22px]">
                Give Hope.
                <span className="block">Change Lives.</span>
              </h3>

              <p className="mt-3 max-w-[390px] font-sans text-[13px] font-normal leading-[1.75] text-[#12312B]/70">
                Every contribution helps provide essential support, improve
                access to care and give families the opportunity to thrive.
              </p>

              <div className="mt-auto pt-5">
                <a
                  href="/donate"
                  className="inline-flex items-center gap-2 font-sans text-[10px] font-semibold uppercase tracking-[0.13em] text-[#12312B] transition-all duration-300 hover:gap-4 hover:text-[#E6A100]"
                >
                  Make a Donation
                  <ArrowUpRight size={15} />
                </a>
              </div>
            </div>
          </motion.article>

          {/* Bottom right image */}
          <motion.div
            {...reveal(0.26)}
            className="group relative hidden h-[300px] overflow-hidden rounded-[15px] bg-[#12312B] sm:block lg:h-full"
          >
            <img
              src="https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=1100&q=85"
              alt="Children participating in a community support initiative"
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.045]"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#12312B]/65 via-transparent to-transparent" />

            <span className="absolute bottom-5 left-5 font-sans text-[10px] font-semibold uppercase tracking-[0.16em] text-white">
              A Brighter Future For Every Child
            </span>

            <GlassBorder />
          </motion.div>
        </div>
      </div>
    </section>
  );
}



// import { useId } from "react";
// import { motion, useReducedMotion } from "framer-motion";
// import { ArrowUpRight, HandHeart, Users } from "lucide-react";

// const EASE = [0.76, 0, 0.24, 1] as const;

// const GREEN = "#12312B";
// const GOLD = "#E6A100";
// const BLUE = "#0529D4";

// /* ------------------------------------------------------------------ */
// /* Glass chrome: subtle sheen + crisp border for white luxury cards    */
// /* ------------------------------------------------------------------ */
// function GlassBorder() {
//   return (
//     <span
//       aria-hidden="true"
//       className="pointer-events-none absolute inset-0 z-20 rounded-[15px]"
//       style={{
//         padding: 1,
//         background:
//           "linear-gradient(145deg, rgba(18,49,43,0.18), rgba(18,49,43,0.04) 30%, rgba(18,49,43,0.03) 70%, rgba(18,49,43,0.12))",
//         WebkitMask:
//           "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
//         WebkitMaskComposite: "xor",
//         mask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
//         maskComposite: "exclude",
//       }}
//     />
//   );
// }

// function Sheen() {
//   return (
//     <span
//       aria-hidden="true"
//       className="pointer-events-none absolute inset-0 rounded-[15px]"
//       style={{
//         background:
//           "radial-gradient(120% 70% at 0% 0%, rgba(18,49,43,0.03), transparent 55%)",
//       }}
//     />
//   );
// }

// /* ------------------------------------------------------------------ */
// /* Abstract art — using #12312B, #E6A100 & #0529D4                     */
// /* ------------------------------------------------------------------ */
// type ArtVariant = "orbit" | "waves" | "bloom";

// function Abstract({ variant, color }: { variant: ArtVariant; color: string }) {
//   const uid = useId().replace(/:/g, "");
//   const glow = `${uid}-glow`;

//   if (variant === "orbit") {
//     return (
//       <svg
//         aria-hidden="true"
//         viewBox="0 0 500 500"
//         fill="none"
//         className="pointer-events-none absolute -bottom-24 -right-24 h-[460px] w-[460px] transition-transform duration-700 group-hover:scale-105 sm:h-[520px] sm:w-[520px]"
//       >
//         <defs>
//           <radialGradient id={glow} cx="50%" cy="50%" r="50%">
//             <stop offset="0%" stopColor={color} stopOpacity="0.16" />
//             <stop offset="100%" stopColor={color} stopOpacity="0" />
//           </radialGradient>
//         </defs>
//         <circle cx="260" cy="260" r="230" fill={`url(#${glow})`} />
//         <g stroke={color} strokeWidth="1.5">
//           <circle cx="260" cy="260" r="70" strokeOpacity="0.2" />
//           <circle cx="260" cy="260" r="120" strokeOpacity="0.16" />
//           <circle cx="260" cy="260" r="170" strokeOpacity="0.12" />
//           <circle cx="260" cy="260" r="220" strokeOpacity="0.08" />
//           <ellipse
//             cx="260"
//             cy="260"
//             rx="235"
//             ry="90"
//             transform="rotate(-35 260 260)"
//             strokeOpacity="0.15"
//           />
//           <ellipse
//             cx="260"
//             cy="260"
//             rx="235"
//             ry="90"
//             transform="rotate(35 260 260)"
//             strokeOpacity="0.15"
//           />
//         </g>
//         <circle cx="150" cy="170" r="10" fill={color} fillOpacity="0.25" />
//         <circle cx="372" cy="360" r="7" fill={color} fillOpacity="0.25" />
//       </svg>
//     );
//   }

//   if (variant === "waves") {
//     return (
//       <svg
//         aria-hidden="true"
//         viewBox="0 0 400 200"
//         fill="none"
//         preserveAspectRatio="none"
//         className="pointer-events-none absolute inset-x-0 bottom-0 h-[55%] w-full"
//       >
//         <defs>
//           <linearGradient id={glow} x1="0" y1="0" x2="0" y2="1">
//             <stop offset="0%" stopColor={color} stopOpacity="0" />
//             <stop offset="100%" stopColor={color} stopOpacity="0.12" />
//           </linearGradient>
//         </defs>
//         <path
//           d="M0 120 C 60 60, 120 180, 200 120 S 340 60, 400 110 L400 200 L0 200 Z"
//           fill={`url(#${glow})`}
//         />
//         {[0, 1, 2, 3].map((i) => (
//           <path
//             key={i}
//             d={`M0 ${100 + i * 22} C 60 ${40 + i * 22}, 120 ${160 + i * 22}, 200 ${100 + i * 22} S 340 ${40 + i * 22}, 400 ${90 + i * 22}`}
//             stroke={color}
//             strokeWidth="1.5"
//             strokeOpacity={0.2 - i * 0.04}
//             vectorEffect="non-scaling-stroke"
//           />
//         ))}
//       </svg>
//     );
//   }

//   return (
//     <svg
//       aria-hidden="true"
//       viewBox="0 0 400 400"
//       fill="none"
//       className="pointer-events-none absolute -bottom-20 -right-20 h-[300px] w-[300px] transition-transform duration-700 group-hover:scale-105"
//     >
//       <defs>
//         <radialGradient id={glow} cx="50%" cy="50%" r="50%">
//           <stop offset="0%" stopColor={color} stopOpacity="0.14" />
//           <stop offset="100%" stopColor={color} stopOpacity="0" />
//         </radialGradient>
//       </defs>
//       <circle cx="220" cy="220" r="190" fill={`url(#${glow})`} />
//       <g transform="translate(220 220)" stroke={color} strokeWidth="1.5">
//         {[0, 1, 2, 3].map((i) => (
//           <rect
//             key={i}
//             x="-90"
//             y="-90"
//             width="180"
//             height="180"
//             rx="44"
//             transform={`rotate(${i * 22})`}
//             fill={color}
//             fillOpacity="0.05"
//             strokeOpacity="0.15"
//           />
//         ))}
//       </g>
//       <circle cx="120" cy="120" r="8" fill={color} fillOpacity="0.2" />
//     </svg>
//   );
// }

// /* ------------------------------------------------------------------ */

// const CARD =
//   "group relative flex flex-col overflow-hidden rounded-[15px] bg-gradient-to-br from-white via-[#FDFDFD] to-[#F8FAF9] shadow-[0_10px_30px_-15px_rgba(18,49,43,0.07)] transition-all duration-500 hover:shadow-[0_20px_40px_-15px_rgba(18,49,43,0.12)]";

// export default function GetInvolved() {
//   const reduceMotion = useReducedMotion();

//   const reveal = (delay = 0) => ({
//     initial: reduceMotion ? false : { opacity: 0, y: 22 },
//     whileInView: { opacity: 1, y: 0 },
//     viewport: { once: true, margin: "-50px" },
//     transition: {
//       duration: 0.75,
//       delay,
//       ease: EASE,
//     },
//   });

//   return (
//     <section
//       id="get-involved"
//       className="bg-[#F7F5EE] px-5 py-24 font-sans text-[#12312B] sm:px-10 sm:py-28 lg:px-16 lg:py-32"
//     >
//       <div className="mx-auto max-w-[1450px]">

//         {/* Section introduction header (Get Involved badge removed) */}
//         <div className="mx-auto mb-16 max-w-[760px] text-center lg:mb-20">
//           <motion.h2
//             {...reveal(0.04)}
//             className="font-sans text-[clamp(2.6rem,5.4vw,4.8rem)] font-bold leading-[0.98] tracking-[-0.04em] text-[#12312B]"
//           >
//             Creating Impact
//             <span className="block text-[#12312B]">That Changes Lives.</span>
//           </motion.h2>

//           <motion.p
//             {...reveal(0.12)}
//             className="mx-auto mt-6 max-w-[650px] font-sans text-sm font-normal leading-[1.8] text-[#12312B]/70 sm:text-[15px]"
//           >
//             Meaningful change happens when people come together. Your time,
//             generosity and partnerships can help us build a healthier and
//             brighter future for mothers, children and communities.
//           </motion.p>
//         </div>

//         {/* Bento grid */}
//         <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:auto-rows-[320px]">

//           {/* Volunteer - featured card */}
//           <motion.article
//             {...reveal(0.05)}
//             className={`${CARD} min-h-[520px] p-7 text-[#12312B] sm:row-span-2 sm:min-h-[656px] sm:p-9 lg:min-h-0`}
//           >
//             <Sheen />
//             <Abstract variant="orbit" color={GREEN} />
//             <GlassBorder />

//             <div className="relative z-10 flex flex-1 flex-col">
//               <div className="flex items-center justify-between">
//                 <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.18em] text-[#E6A100]">
//                   Give Your Time
//                 </span>
//                 <Users size={21} strokeWidth={1.5} className="text-[#12312B]/70" />
//               </div>

//               <h3 className="mt-6 max-w-[420px] font-sans text-[26px] font-semibold leading-[1.1] tracking-[-0.025em] text-[#12312B] sm:text-[30px]">
//                 Volunteer
//                 <span className="block text-[#E6A100]">With Us.</span>
//               </h3>

//               <p className="mt-4 max-w-[340px] font-sans text-[12px] font-normal leading-[1.75] text-[#12312B]/70 sm:text-[13px]">
//                 Your time, skills and compassion can make a lasting difference.
//                 Join our team and become part of the change happening in our
//                 communities.
//               </p>

//               <div className="mt-auto pt-8">
//                 <a
//                   href="/volunteer"
//                   className="inline-flex items-center gap-3 border-b border-[#E6A100] pb-2 font-sans text-[10px] font-semibold uppercase tracking-[0.14em] text-[#12312B] transition-all duration-300 hover:gap-5 hover:text-[#E6A100]"
//                 >
//                   Become a Volunteer
//                   <ArrowUpRight size={15} strokeWidth={1.8} />
//                 </a>
//               </div>
//             </div>
//           </motion.article>

//           {/* Top middle image */}
//           <motion.div
//             {...reveal(0.12)}
//             className="group relative h-[300px] overflow-hidden rounded-[15px] bg-[#12312B] sm:h-[320px] lg:h-full"
//           >
//             <img
//               src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=1100&q=85"
//               alt="Volunteers working together to support their community"
//               loading="lazy"
//               className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.045]"
//             />

//             <div className="absolute inset-0 bg-gradient-to-t from-[#12312B]/65 via-transparent to-transparent" />

//             <span className="absolute bottom-5 left-5 font-sans text-[10px] font-semibold uppercase tracking-[0.16em] text-white">
//               Together, We Can Do More
//             </span>
//             <GlassBorder />
//           </motion.div>

//           {/* Top right - partnership */}
//           <motion.article
//             {...reveal(0.18)}
//             className={`${CARD} min-h-[300px] p-7 text-[#12312B] sm:min-h-[320px] sm:p-8 lg:h-full`}
//           >
//             <Sheen />
//             <Abstract variant="waves" color={GOLD} />
//             <GlassBorder />

//             <div className="relative z-10 flex flex-1 flex-col">
//               <div className="flex items-center justify-between">
//                 <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.17em] text-[#E6A100]">
//                   Collaborate With Us
//                 </span>
//                 <Users size={21} strokeWidth={1.5} className="text-[#12312B]/70" />
//               </div>

//               <h3 className="mt-5 font-sans text-xl font-semibold leading-[1.15] tracking-[-0.02em] text-[#12312B] sm:text-[22px]">
//                 Partner
//                 <span className="block text-[#12312B]">With Us.</span>
//               </h3>

//               <p className="mt-3 max-w-[390px] font-sans text-[13px] font-normal leading-[1.75] text-[#12312B]/70">
//                 Work alongside us to expand our reach, strengthen our
//                 programmes and create greater impact for the people we serve.
//               </p>

//               <div className="mt-auto pt-5">
//                 <a
//                   href="/contact"
//                   className="inline-flex items-center gap-2 font-sans text-[10px] font-semibold uppercase tracking-[0.13em] text-[#12312B] transition-all duration-300 hover:gap-4 hover:text-[#E6A100]"
//                 >
//                   Explore Partnerships
//                   <ArrowUpRight size={15} />
//                 </a>
//               </div>
//             </div>
//           </motion.article>

//           {/* Bottom middle - donation */}
//           <motion.article
//             {...reveal(0.2)}
//             className={`${CARD} min-h-[300px] p-7 text-[#12312B] sm:min-h-[320px] sm:p-8 lg:h-full`}
//           >
//             <Sheen />
//             <Abstract variant="bloom" color={BLUE} />
//             <GlassBorder />

//             <div className="relative z-10 flex flex-1 flex-col">
//               <div className="flex items-center justify-between">
//                 <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.17em] text-[#E6A100]">
//                   Make a Difference
//                 </span>
//                 <HandHeart size={22} strokeWidth={1.5} className="text-[#12312B]/70" />
//               </div>

//               <h3 className="mt-5 font-sans text-xl font-semibold leading-[1.15] tracking-[-0.02em] text-[#12312B] sm:text-[22px]">
//                 Give Hope.
//                 <span className="block text-[#12312B]">Change Lives.</span>
//               </h3>

//               <p className="mt-3 max-w-[390px] font-sans text-[13px] font-normal leading-[1.75] text-[#12312B]/70">
//                 Every contribution helps provide essential support, improve
//                 access to care and give families the opportunity to thrive.
//               </p>

//               <div className="mt-auto pt-5">
//                 <a
//                   href="/donate"
//                   className="inline-flex items-center gap-2 font-sans text-[10px] font-semibold uppercase tracking-[0.13em] text-[#12312B] transition-all duration-300 hover:gap-4 hover:text-[#E6A100]"
//                 >
//                   Make a Donation
//                   <ArrowUpRight size={15} />
//                 </a>
//               </div>
//             </div>
//           </motion.article>

//           {/* Bottom right image */}
//           <motion.div
//             {...reveal(0.26)}
//             className="group relative h-[300px] overflow-hidden rounded-[15px] bg-[#12312B] sm:h-[320px] lg:h-full"
//           >
//             <img
//               src="https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=1100&q=85"
//               alt="Children participating in a community support initiative"
//               loading="lazy"
//               className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.045]"
//             />

//             <div className="absolute inset-0 bg-gradient-to-t from-[#12312B]/65 via-transparent to-transparent" />

//             <span className="absolute bottom-5 left-5 font-sans text-[10px] font-semibold uppercase tracking-[0.16em] text-white">
//               A Brighter Future For Every Child
//             </span>
//             <GlassBorder />
//           </motion.div>

//         </div>
//       </div>
//     </section>
//   );
// }