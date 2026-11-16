// import { useRef } from "react";
// import {
//   motion,
//   useReducedMotion,
//   useScroll,
//   useTransform,
// } from "framer-motion";
// import logo from "@/assets/main.png";
// import ScrollText from "@/components/about/ScrollText";
// import AnimatedHeading from "@/components/about/AnimatedHeading";
// import SoftShape from "@/components/about/SoftShape";

// const EASE = [0.76, 0, 0.24, 1] as const;

// const ORG_NAME = "St. Genevieve Maternal and Child Welfare Foundation";

// const INTRO = `${ORG_NAME} was founded in response to a need we saw first-hand in underserved communities: too little access to maternal healthcare, and too little basic educational infrastructure for vulnerable children.`;

// const FACTS = [
//   { label: "Status", value: "Registered non-governmental organisation" },
//   { label: "Founded", value: "2023" },
//   {
//     label: "Programmes",
//     value:
//       "Sustainable healthcare, basic education and direct support for families in vulnerable communities",
//   },
// ];

// const STEPS = [
//   {
//     title: "We saw the gap",
//     text: "Underserved communities lacked accessible maternal healthcare and basic educational infrastructure for vulnerable children.",
//   },
//   {
//     title: "It began as community relief",
//     text: "What started as a localized relief programme grew quickly, as more families came forward for help.",
//   },
//   {
//     title: "It became a foundation",
//     text: "We now focus on sustainable relief rather than short-term aid: equipping mothers with economic skills and giving children continuous access to healthcare and education.",
//   },
// ];

// export default function AboutStory() {
//   const reduceMotion = useReducedMotion();
//   const imageRef = useRef<HTMLDivElement>(null);

//   const { scrollYProgress } = useScroll({
//     target: imageRef,
//     offset: ["start end", "end start"],
//   });

//   const imageY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

//   const reveal = (delay = 0) => ({
//     initial: reduceMotion ? false : { opacity: 0, y: 24 },
//     whileInView: { opacity: 1, y: 0 },
//     viewport: { once: true, margin: "-60px" },
//     transition: { duration: 0.8, delay, ease: EASE },
//   });

//   return (
//     <section className="relative overflow-hidden bg-white px-5 pb-20 pt-16 font-sans text-[#12312B] sm:px-6 sm:pb-24 sm:pt-20 lg:px-10 lg:pb-28 lg:pt-28">
//       <SoftShape className="-right-32 top-16 h-[340px] w-[340px] sm:h-[440px] sm:w-[440px] lg:-right-24 lg:top-10 lg:h-[560px] lg:w-[560px]" />

//       <div className="relative z-10 mx-auto max-w-[1400px]">
//         {/* Intro */}
//         <div className="grid gap-6 lg:grid-cols-12 lg:gap-16">
//           <motion.div {...reveal(0)} className="lg:col-span-4">
//             <span className="inline-flex items-center gap-3 font-sans text-xl font-medium sm:text-2xl">
//               <span className="h-2.5 w-2.5 rounded-full bg-[#12312B]" />
//               About Us
//             </span>
//           </motion.div>

//           <ScrollText
//             highlight={ORG_NAME}
//             highlightClassName="font-sans font-medium text-[#12312B]"
//             className="font-sans text-[clamp(1.5rem,2.7vw,2.5rem)] font-normal leading-[1.22] tracking-[-0.015em] lg:col-span-8"
//           >
//             {INTRO}
//           </ScrollText>
//         </div>

//         {/* Story header */}
//         <div className="mt-20 grid gap-8 lg:mt-28 lg:grid-cols-[1.1fr_1fr] lg:items-end lg:gap-16">
//           <div>
//             <motion.span
//               {...reveal(0)}
//               className="inline-flex items-center gap-2 font-sans text-[11px] font-medium uppercase tracking-[0.16em] text-[#12312B]/60"
//             >
//               <span className="h-1.5 w-1.5 rounded-full bg-[#E6A100]" />
//               Our story
//             </motion.span>

//             <AnimatedHeading
//               as="h2"
//               className="mt-4 max-w-[640px] font-sans text-[clamp(2rem,3.8vw,3.4rem)] font-semibold leading-[1.06] tracking-[-0.03em]"
//             >
//               How St. Genevieve Foundation Started
//             </AnimatedHeading>
//           </div>

//           <dl className="max-w-[560px] border-t border-[#12312B]/15 lg:justify-self-end">
//             {FACTS.map((fact, i) => (
//               <motion.div
//                 key={fact.label}
//                 {...reveal(0.05 + i * 0.1)}
//                 className="grid grid-cols-[96px_1fr] gap-4 border-b border-[#12312B]/15 py-3.5"
//               >
//                 <dt className="font-sans text-xs font-medium text-[#12312B]/55">
//                   {fact.label}
//                 </dt>

//                 <dd className="font-sans text-sm leading-relaxed text-[#12312B]">
//                   {fact.value}
//                 </dd>
//               </motion.div>
//             ))}
//           </dl>
//         </div>

//         {/* Wide image */}
//         <motion.div
//           ref={imageRef}
//           initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
//           whileInView={{ opacity: 1, scale: 1 }}
//           viewport={{ once: true, margin: "-80px" }}
//           transition={{ duration: 1, ease: EASE }}
//           className="relative mt-10 h-[380px] overflow-hidden rounded-[24px] bg-[#F7E3B2] sm:h-[480px] lg:mt-14 lg:h-[560px] lg:rounded-[32px]"
//         >
//           <motion.img
//             src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1800&q=80"
//             alt="Healthcare worker caring for a mother and child"
//             style={reduceMotion ? undefined : { y: imageY }}
//             className="absolute inset-x-0 -top-[10%] h-[120%] w-full object-cover object-center"
//           />

//           <motion.div
//             initial={reduceMotion ? false : { opacity: 0, y: 24 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true, margin: "-80px" }}
//             transition={{ duration: 0.8, delay: 0.5, ease: EASE }}
//             className="absolute inset-x-4 bottom-4 rounded-2xl border border-white/50 bg-white/75 p-5 font-sans backdrop-blur-xl sm:inset-x-auto sm:bottom-6 sm:left-6 sm:max-w-[440px] sm:p-6"
//           >
//             <p className="font-sans text-lg font-normal leading-snug text-[#12312B] sm:text-xl">
//               When you restore the health and confidence of a mother, you
//               transform the trajectory of an entire family.
//             </p>
//           </motion.div>
//         </motion.div>

//         {/* How it grew */}
//         <div className="mt-16 grid gap-10 lg:mt-24 lg:grid-cols-12 lg:gap-16">
//           <div className="lg:col-span-4 lg:sticky lg:top-28 lg:self-start">
//             <motion.span
//               {...reveal(0)}
//               className="inline-flex items-center gap-2 font-sans text-[11px] font-medium uppercase tracking-[0.16em] text-[#12312B]/60"
//             >
//               <span className="h-1.5 w-1.5 rounded-full bg-[#E6A100]" />
//               How it grew
//             </motion.span>

//             <AnimatedHeading
//               as="h3"
//               className="mt-4 font-sans text-[clamp(1.9rem,3.2vw,2.8rem)] font-semibold leading-[1.08] tracking-[-0.03em]"
//             >
//               From A Single Need To A Registered Foundation
//             </AnimatedHeading>
//           </div>

//           <ol className="border-b border-[#12312B]/15 lg:col-span-8">
//             {STEPS.map((step, i) => (
//               <motion.li
//                 key={step.title}
//                 {...reveal(0.05)}
//                 className="grid gap-x-8 gap-y-3 border-t border-[#12312B]/15 py-8 font-sans sm:grid-cols-[72px_1fr] md:grid-cols-[72px_1fr_1.25fr] md:py-10"
//               >
//                 <span className="font-sans text-4xl font-normal leading-none text-[#E6A100] sm:text-5xl">
//                   {String(i + 1).padStart(2, "0")}
//                 </span>

//                 <h4 className="font-sans text-2xl font-medium leading-[1.15] tracking-[-0.015em] sm:text-[1.7rem]">
//                   {step.title}
//                 </h4>

//                 <p className="font-sans text-sm leading-[1.8] text-[#12312B]/75 sm:col-start-2 md:col-start-auto sm:text-[15px]">
//                   {step.text}
//                 </p>
//               </motion.li>
//             ))}
//           </ol>
//         </div>

//         {/* Identity */}
//         <motion.div
//           {...reveal(0)}
//           className="mt-10 flex items-center gap-4 border-t border-[#12312B]/10 pt-6 font-sans"
//         >
//           <img
//             src={logo}
//             alt="St. Genevieve Foundation logo"
//             className="h-10 w-auto object-contain sm:h-12"
//           />

//           <p className="font-sans text-sm font-semibold text-[#12312B]">
//             St. Genevieve Foundation
//           </p>
//         </motion.div>
//       </div>
//     </section>
//   );
// }
import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import logo from "@/assets/main.png";
import aboutImage from "@/assets/about.jpeg";
import ScrollText from "@/components/about/ScrollText";
import AnimatedHeading from "@/components/about/AnimatedHeading";
import SoftShape from "@/components/about/SoftShape";

const EASE = [0.76, 0, 0.24, 1] as const;

const ORG_NAME = "St. Genevieve Maternal and Child Welfare Foundation";

const INTRO = `${ORG_NAME} grew from one midwife's personal commitment to the mothers, children and families she met in her work: people whose health and futures were held back by what they could afford.`;

const FACTS = [
  { label: "Founder", value: "Genevieve Sonia Nwokeide" },
  { label: "Began", value: "2019, as a personal giving commitment" },
  { label: "Established", value: "16 April 2022" },
  {
    label: "Programmes",
    value:
      "Maternal and child healthcare, education, skills development and family empowerment",
  },
];

const STEPS = [
  {
    date: "2019",
    title: "She saw the need",
    text: "Working as a midwife in Nigeria, Genevieve saw mothers stay in hospital for months because they could not afford their bills, families forced into difficult healthcare decisions, and children suffering from malnutrition and preventable illness.",
  },
  {
    date: "2019",
    title: "10% of her salary",
    text: "She could not change everything, but she could do something. She began giving 10% of her salary to support mothers, children and families in need, and what started as a personal commitment grew into a larger vision.",
  },
  {
    date: "16 April 2022",
    title: "It became a foundation",
    text: "Following advice to formalise these efforts, St. Genevieve Maternal and Child Welfare Foundation was officially established. Today it works through healthcare, education, skills development and family empowerment.",
  },
];

export default function AboutStory() {
  const reduceMotion = useReducedMotion();
  const imageRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  const reveal = (delay = 0) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-60px" },
    transition: { duration: 0.8, delay, ease: EASE },
  });

  return (
    <section className="relative overflow-hidden bg-white px-5 pb-20 pt-16 font-sans text-[#12312B] sm:px-6 sm:pb-24 sm:pt-20 lg:px-10 lg:pb-28 lg:pt-28">
      <SoftShape className="-right-32 top-16 h-[340px] w-[340px] sm:h-[440px] sm:w-[440px] lg:-right-24 lg:top-10 lg:h-[560px] lg:w-[560px]" />

      <div className="relative z-10 mx-auto max-w-[1400px]">
        {/* Intro */}
        <div className="grid gap-6 lg:grid-cols-12 lg:gap-16">
          <motion.div {...reveal(0)} className="lg:col-span-4">
            <span className="inline-flex items-center gap-3 font-sans text-xl font-medium sm:text-2xl">
              <span className="h-2.5 w-2.5 rounded-full bg-[#12312B]" />
              About Us
            </span>
          </motion.div>

          <ScrollText
            highlight={ORG_NAME}
            highlightClassName="font-sans font-medium text-[#12312B]"
            className="font-sans text-[clamp(1.5rem,2.7vw,2.5rem)] font-normal leading-[1.22] tracking-[-0.015em] lg:col-span-8"
          >
            {INTRO}
          </ScrollText>
        </div>

        {/* Story header */}
        <div className="mt-20 grid gap-8 lg:mt-28 lg:grid-cols-[1.1fr_1fr] lg:items-end lg:gap-16">
          <div>
            <motion.span
              {...reveal(0)}
              className="inline-flex items-center gap-2 font-sans text-[11px] font-medium uppercase tracking-[0.16em] text-[#12312B]/60"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#E6A100]" />
              Our story
            </motion.span>

            <AnimatedHeading
              as="h2"
              className="mt-4 max-w-[640px] font-sans text-[clamp(2rem,3.8vw,3.4rem)] font-semibold leading-[1.06] tracking-[-0.03em]"
            >
              How St. Genevieve Foundation Started
            </AnimatedHeading>
          </div>

          <dl className="max-w-[560px] border-t border-[#12312B]/15 lg:justify-self-end">
            {FACTS.map((fact, i) => (
              <motion.div
                key={fact.label}
                {...reveal(0.05 + i * 0.1)}
                className="grid grid-cols-[96px_1fr] gap-4 border-b border-[#12312B]/15 py-3.5"
              >
                <dt className="font-sans text-xs font-medium text-[#12312B]/55">
                  {fact.label}
                </dt>

                <dd className="font-sans text-sm leading-relaxed text-[#12312B]">
                  {fact.value}
                </dd>
              </motion.div>
            ))}
          </dl>
        </div>

        {/* Wide image */}
        <motion.div
          ref={imageRef}
          initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, ease: EASE }}
          className="relative mt-10 h-[380px] overflow-hidden rounded-[24px] bg-[#F7E3B2] sm:h-[480px] lg:mt-14 lg:h-[560px] lg:rounded-[32px]"
        >
          <motion.img
            src={aboutImage}
            alt="St. Genevieve Foundation at work in the community"
            style={reduceMotion ? undefined : { y: imageY }}
            className="absolute inset-x-0 -top-[10%] h-[120%] w-full object-cover object-center"
          />

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.5, ease: EASE }}
            className="absolute inset-x-4 bottom-4 rounded-2xl border border-white/50 bg-white/75 p-5 font-sans backdrop-blur-xl sm:inset-x-auto sm:bottom-6 sm:left-6 sm:max-w-[440px] sm:p-6"
          >
            <p className="font-sans text-lg font-normal leading-snug text-[#12312B] sm:text-xl">
              I could not change everything, but I knew I could do something.
            </p>
            <p className="mt-3 text-xs font-medium text-[#12312B]/60">
              Genevieve Sonia Nwokeide, Founder
            </p>
          </motion.div>
        </motion.div>

        {/* How it grew */}
        <div className="mt-16 grid gap-10 lg:mt-24 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4 lg:sticky lg:top-28 lg:self-start">
            <motion.span
              {...reveal(0)}
              className="inline-flex items-center gap-2 font-sans text-[11px] font-medium uppercase tracking-[0.16em] text-[#12312B]/60"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#E6A100]" />
              How it grew
            </motion.span>

            <AnimatedHeading
              as="h3"
              className="mt-4 font-sans text-[clamp(1.9rem,3.2vw,2.8rem)] font-semibold leading-[1.08] tracking-[-0.03em]"
            >
              From A Personal Pledge To A Foundation
            </AnimatedHeading>
          </div>

          <ol className="lg:col-span-8">
            {STEPS.map((step, i) => (
              <motion.li
                key={step.title}
                {...reveal(0.05)}
                className="grid gap-x-8 gap-y-3 border-t border-[#12312B]/15 py-8 font-sans sm:grid-cols-[72px_1fr] md:grid-cols-[72px_1fr_1.25fr] md:py-10"
              >
                <span className="font-sans text-4xl font-normal leading-none text-[#E6A100] sm:text-5xl">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#E6A100]">
                    {step.date}
                  </span>
                  <h4 className="mt-1 font-sans text-2xl font-medium leading-[1.15] tracking-[-0.015em] sm:text-[1.7rem]">
                    {step.title}
                  </h4>
                </div>

                <p className="font-sans text-sm leading-[1.8] text-[#12312B]/75 sm:col-start-2 md:col-start-auto sm:text-[15px]">
                  {step.text}
                </p>
              </motion.li>
            ))}
          </ol>
        </div>

        {/* Identity */}
        <motion.div
          {...reveal(0)}
          className="mt-10 flex items-center gap-4 border-t border-[#12312B]/10 pt-6 font-sans"
        >
          <img
            src={logo}
            alt="St. Genevieve Foundation logo"
            className="h-10 w-auto object-contain sm:h-12"
          />

          <div>
            <p className="font-sans text-sm font-semibold text-[#12312B]">
              St. Genevieve Foundation
            </p>
            <p className="font-sans text-xs text-[#12312B]/60">
              A Slice for a Better Smile.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}