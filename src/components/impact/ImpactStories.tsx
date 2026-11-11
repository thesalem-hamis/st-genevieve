// import { useRef, useState } from "react";
// import { motion, useReducedMotion, useScroll } from "framer-motion";
// import { Play } from "lucide-react";
// import { SectionHeader, useReveal } from "./Shared";
// import { STORIES, type Story } from "./data";

// const TONES = {
//   green: "bg-[#E8F0EC]",
//   yellow: "bg-[#FBF1D4]",
//   rose: "bg-[#F8E8E3]",
// } as const;

// /* Photo that becomes a YouTube player only when tapped */
// function Media({ story }: { story: Story }) {
//   const [playing, setPlaying] = useState(false);

//   if (playing && story.videoId) {
//     return (
//       <iframe
//         title={`Video: ${story.name}`}
//         src={`https://www.youtube-nocookie.com/embed/${story.videoId}?autoplay=1&rel=0`}
//         allow="autoplay; encrypted-media; picture-in-picture"
//         allowFullScreen
//         className="aspect-[4/3] w-full rounded-[24px] bg-black"
//       />
//     );
//   }

//   return (
//     <div className="relative overflow-hidden rounded-[24px] bg-[#12312B]/10">
//       <img
//         src={story.image}
//         alt={`${story.name}, ${story.place}`}
//         loading="lazy"
//         className="aspect-[4/3] w-full object-cover"
//       />
//       {story.videoId && (
//         <button
//           type="button"
//           onClick={() => setPlaying(true)}
//           aria-label={`Play video: ${story.name}`}
//           className="absolute inset-0 grid place-items-center"
//         >
//           <span className="grid h-16 w-16 place-items-center rounded-full border border-white/50 bg-white/65 text-[#12312B] backdrop-blur-md">
//             <Play size={22} fill="currentColor" />
//           </span>
//         </button>
//       )}
//     </div>
//   );
// }

// function StoryRow({ story, index }: { story: Story; index: number }) {
//   const reveal = useReveal();
//   const textOnLeft = index % 2 === 0;

//   return (
//     <motion.li
//       {...reveal(0)}
//       className="relative grid gap-5 pl-12 lg:grid-cols-[1fr_64px_1fr] lg:items-center lg:gap-0 lg:pl-0"
//     >
//       {/* Dot on the line */}
//       <span className="absolute left-0 top-8 z-10 grid h-6 w-6 place-items-center rounded-full bg-white ring-1 ring-[#12312B]/15 lg:static lg:col-start-2 lg:row-start-1 lg:justify-self-center">
//         <span className="h-2.5 w-2.5 rounded-full bg-[#E6A100]" />
//       </span>

//       {/* Quote */}
//       <div
//         className={`lg:row-start-1 ${
//           textOnLeft ? "lg:col-start-1 lg:pr-10 lg:text-right" : "lg:col-start-3 lg:pl-10"
//         }`}
//       >
//         <figure className={`rounded-[24px] p-7 sm:p-9 ${TONES[story.tone ?? "green"]}`}>
//           <blockquote className="font-heading text-[clamp(1.4rem,2.4vw,2.2rem)] font-normal leading-[1.2] tracking-[-0.02em]">
//             {story.quote}
//           </blockquote>
//           <figcaption className="mt-6 font-sans text-sm">
//             <span className="font-semibold">{story.name}</span>
//             <span className="text-[#12312B]/60">, {story.place}</span>
//           </figcaption>
//         </figure>
//       </div>

//       {/* Photo or video on the opposite side */}
//       <div
//         className={`lg:row-start-1 ${
//           textOnLeft ? "lg:col-start-3 lg:pl-10" : "lg:col-start-1 lg:pr-10"
//         }`}
//       >
//         <Media story={story} />
//       </div>
//     </motion.li>
//   );
// }

// export default function ImpactStories() {
//   const reduceMotion = useReducedMotion();
//   const listRef = useRef<HTMLOListElement>(null);
//   const { scrollYProgress } = useScroll({
//     target: listRef,
//     offset: ["start 65%", "end 55%"],
//   });

//   return (
//     <section className="bg-white px-4 pb-16 text-[#12312B] sm:px-6 sm:pb-20 lg:px-10 lg:pb-24">
//       <div className="mx-auto max-w-[1400px]">
//         <SectionHeader
//           label="Stories"
//           title="In their own words"
//           text="The people and communities we work with, speaking for themselves."
//         />

//         <div className="relative mt-10 lg:mt-14">
//           {/* Centre line; the gold part draws itself as you scroll */}
//           <span
//             aria-hidden="true"
//             className="absolute bottom-0 left-3 top-0 w-px -translate-x-1/2 bg-[#12312B]/15 lg:left-1/2"
//           />
//           <motion.span
//             aria-hidden="true"
//             style={{ scaleY: reduceMotion ? 1 : scrollYProgress }}
//             className="absolute bottom-0 left-3 top-0 w-[2px] origin-top -translate-x-1/2 bg-[#E6A100] lg:left-1/2"
//           />

//           <ol ref={listRef} className="relative space-y-10 lg:space-y-16">
//             {STORIES.map((story, i) => (
//               <StoryRow key={i} story={story} index={i} />
//             ))}
//           </ol>
//         </div>
//       </div>
//     </section>
//   );
// }

// import { useRef, useState } from "react";
// import { motion, useReducedMotion, useScroll } from "framer-motion";
// import { Play, Quote } from "lucide-react";
// import { SectionHeader, EASE } from "./Shared";
// import { STORIES, type Story } from "./data";

// const TONES = {
//   green: "bg-[#E8F0EC]",
//   yellow: "bg-[#FBF1D4]",
//   rose: "bg-[#F8E8E3]",
// } as const;

// const initials = (name: string) =>
//   name
//     .split(" ")
//     .map((w) => w[0])
//     .join("")
//     .slice(0, 2)
//     .toUpperCase();

// /* Photo that becomes a YouTube player only when tapped */
// function Media({ story }: { story: Story }) {
//   const [playing, setPlaying] = useState(false);

//   if (playing && story.videoId) {
//     return (
//       <iframe
//         title={`Video: ${story.name}`}
//         src={`https://www.youtube-nocookie.com/embed/${story.videoId}?autoplay=1&rel=0`}
//         allow="autoplay; encrypted-media; picture-in-picture"
//         allowFullScreen
//         className="aspect-[4/3] w-full rounded-[24px] bg-black"
//       />
//     );
//   }

//   return (
//     <div className="group relative overflow-hidden rounded-[24px] bg-[#12312B]/10">
//       <img
//         src={story.image}
//         alt={`${story.name}, ${story.role}`}
//         loading="lazy"
//         style={{ objectPosition: story.imagePosition }}
//         className="aspect-[4/3] w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
//       />
//       <span className="absolute bottom-4 left-4 rounded-full border border-white/50 bg-white/75 px-3 py-1 font-sans text-xs font-medium text-[#12312B] backdrop-blur-md">
//         {story.programme}
//       </span>
//       {story.videoId && (
//         <button
//           type="button"
//           onClick={() => setPlaying(true)}
//           aria-label={`Play video: ${story.name}`}
//           className="absolute inset-0 grid place-items-center focus-visible:outline-none"
//         >
//           <span className="grid h-16 w-16 place-items-center rounded-full border border-white/50 bg-white/65 text-[#12312B] backdrop-blur-md transition-colors duration-500 group-hover:bg-[#E6A100] group-focus-visible:bg-[#E6A100] motion-reduce:transition-none">
//             <Play size={22} fill="currentColor" />
//           </span>
//         </button>
//       )}
//     </div>
//   );
// }

// function StoryRow({ story, index }: { story: Story; index: number }) {
//   const reduceMotion = useReducedMotion();
//   const textOnLeft = index % 2 === 0;

//   // Quote rises first, the photo follows a beat later
//   const enter = (delay = 0) => ({
//     initial: reduceMotion ? (false as const) : { opacity: 0, y: 24 },
//     whileInView: { opacity: 1, y: 0 },
//     viewport: { once: true, margin: "-80px" },
//     transition: { duration: 0.9, delay, ease: EASE },
//   });

//   return (
//     <li className="relative grid gap-5 pl-12 lg:grid-cols-[1fr_64px_1fr] lg:items-center lg:gap-0 lg:pl-0">
//       {/* Dot on the line */}
//       <motion.span
//         initial={reduceMotion ? false : { scale: 0 }}
//         whileInView={{ scale: 1 }}
//         viewport={{ once: true, margin: "-80px" }}
//         transition={{ duration: 0.5, ease: EASE }}
//         className="absolute left-0 top-8 z-10 grid h-6 w-6 place-items-center rounded-full bg-white ring-1 ring-[#12312B]/15 lg:static lg:col-start-2 lg:row-start-1 lg:justify-self-center"
//       >
//         <span className="h-2.5 w-2.5 rounded-full bg-[#E6A100]" />
//       </motion.span>

//       {/* Story card */}
//       <motion.div
//         {...enter(0)}
//         className={`lg:row-start-1 ${
//           textOnLeft ? "lg:col-start-1 lg:pr-10" : "lg:col-start-3 lg:pl-10"
//         }`}
//       >
//         <figure
//           className={`rounded-[24px] p-7 sm:p-9 ${TONES[story.tone ?? "green"]}`}
//         >
//           <Quote
//             aria-hidden="true"
//             size={26}
//             strokeWidth={1.5}
//             className="text-[#E6A100]"
//             fill="currentColor"
//           />
//           <blockquote className="mt-4 font-heading text-[clamp(1.3rem,2vw,1.85rem)] font-normal leading-[1.28] tracking-[-0.02em]">
//             {story.quote}
//           </blockquote>

//           <p className="mt-5 max-w-[460px] font-sans text-sm leading-[1.75] text-[#12312B]/75">
//             {story.context}
//           </p>

//           {story.outcome && (
//             <p className="mt-5 border-l-2 border-[#E6A100] pl-3 font-sans text-sm font-medium leading-snug">
//               {story.outcome}
//             </p>
//           )}

//           <figcaption className="mt-7 flex items-center gap-3 border-t border-[#12312B]/15 pt-5">
//             <span
//               aria-hidden="true"
//               className="grid h-10 w-10 place-items-center rounded-full bg-[#12312B] font-sans text-xs font-semibold text-white"
//             >
//               {initials(story.name)}
//             </span>
//             <span className="font-sans text-sm">
//               <span className="block font-semibold">{story.name}</span>
//               <span className="text-[#12312B]/60">{story.role}</span>
//             </span>
//           </figcaption>
//         </figure>
//       </motion.div>

//       {/* Photo or video on the opposite side */}
//       <motion.div
//         {...enter(0.12)}
//         className={`lg:row-start-1 ${
//           textOnLeft ? "lg:col-start-3 lg:pl-10" : "lg:col-start-1 lg:pr-10"
//         }`}
//       >
//         <Media story={story} />
//       </motion.div>
//     </li>
//   );
// }

// export default function ImpactStories() {
//   const reduceMotion = useReducedMotion();
//   const listRef = useRef<HTMLOListElement>(null);
//   const { scrollYProgress } = useScroll({
//     target: listRef,
//     offset: ["start 65%", "end 55%"],
//   });

//   return (
//     <section className="bg-[#F4F5F7] px-4 py-16 text-[#12312B] sm:px-6 sm:py-20 lg:px-10 lg:py-24">
//       <div className="mx-auto max-w-[1400px]">
//         <SectionHeader
//           label="Stories"
//           title="In their own words"
//           text="Mothers, parents and volunteers describe what the programmes have meant for them and their families."
//         />

//         <div className="relative mt-10 lg:mt-14">
//           {/* Centre line; the gold part draws itself as you scroll */}
//           <span
//             aria-hidden="true"
//             className="absolute bottom-0 left-3 top-0 w-px -translate-x-1/2 bg-[#12312B]/15 lg:left-1/2"
//           />
//           <motion.span
//             aria-hidden="true"
//             style={{ scaleY: reduceMotion ? 1 : scrollYProgress }}
//             className="absolute bottom-0 left-3 top-0 w-[2px] origin-top -translate-x-1/2 bg-[#E6A100] lg:left-1/2"
//           />

//           <ol ref={listRef} className="relative space-y-10 lg:space-y-16">
//             {STORIES.map((story, i) => (
//               <StoryRow key={story.name} story={story} index={i} />
//             ))}
//           </ol>
//         </div>
//       </div>
//     </section>
//   );
// }



import { motion, useReducedMotion } from "framer-motion";
import { Quote } from "lucide-react";
import { STORIES } from "./data";

const initials = (name: string) =>
  name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

type Story = (typeof STORIES)[number];

function StoryCard({ story }: { story: Story }) {
  return (
    <article className="group flex h-full min-h-[285px] flex-col justify-between bg-white p-6 font-sans transition-colors duration-300 hover:bg-[#F8FAF8] sm:p-7">
      <div className="font-sans">
        {/* Programme */}
        <div className="mb-5 flex items-center justify-between font-sans">
          <span className="flex items-center gap-1.5 font-sans text-[10px] font-bold text-[#168B56]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#168B56]" />
            {story.programme}
          </span>

          <Quote
            size={19}
            strokeWidth={1.5}
            className="text-[#12312B]/25 transition-colors duration-300 group-hover:text-[#E6A100]"
          />
        </div>

        {/* Testimonial */}
        <blockquote className="font-sans text-[15px] font-semibold leading-[1.55] tracking-tight text-[#12312B]">
          "{story.quote}"
        </blockquote>

        <p className="mt-3 font-sans text-xs leading-[1.8] text-[#12312B]/60">
          {story.context}
        </p>

        {story.outcome && (
          <p className="mt-3 border-l-2 border-[#E6A100] pl-3 font-sans text-xs font-medium leading-relaxed text-[#12312B]/75">
            {story.outcome}
          </p>
        )}
      </div>

      {/* Person */}
      <div className="mt-6 flex items-center gap-3 border-t border-[#12312B]/10 pt-4 font-sans">
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#E8F0EC] font-sans text-[11px] font-bold text-[#12312B]">
          {initials(story.name)}
        </span>

        <div className="min-w-0 font-sans">
          <p className="truncate font-sans text-xs font-bold text-[#12312B]">
            {story.name}
          </p>

          <p className="mt-0.5 truncate font-sans text-[10px] text-[#12312B]/55">
            {story.role}
          </p>
        </div>
      </div>
    </article>
  );
}

export default function ImpactStories() {
  const reduceMotion = useReducedMotion();

  const stories = STORIES.slice(0, 4);
  const backgroundImage = stories[0]?.image;

  return (
    <section className="relative isolate overflow-hidden px-4 py-14 font-sans text-white sm:px-6 sm:py-16 lg:px-10 lg:py-20">
      {/* Full section background image */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-[#12312B] bg-cover bg-center"
        style={{
          backgroundImage: backgroundImage
            ? `url("${backgroundImage}")`
            : undefined,
        }}
      />

      {/* Dark overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[#071C18]/80"
      />

      <div className="mx-auto max-w-[1400px] font-sans">
        {/* Header */}
        <div className="mb-10 flex min-h-[260px] items-end justify-between gap-6 py-8 font-sans sm:min-h-[290px] sm:py-10 lg:mb-12 lg:min-h-[320px]">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-xl font-sans"
          >
            <span className="mb-3 inline-flex items-center gap-2 font-sans text-[10px] font-semibold uppercase tracking-[0.18em] text-white/75">
              <span className="h-px w-5 bg-[#E6A100]" />
              Stories
            </span>

            <h2 className="font-sans text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
              In their own words
            </h2>

            <p className="mt-3 max-w-md font-sans text-xs leading-6 text-white/70 sm:text-sm">
              Mothers, parents and volunteers describe what the programmes have meant for them and their families.
            </p>
          </motion.div>

          {/* Community avatars */}
          <div className="hidden shrink-0 flex-col items-end gap-2 font-sans sm:flex">
            <div className="flex -space-x-3">
              {stories.map((story) => (
                <span
                  key={story.name}
                  className="grid h-10 w-10 place-items-center rounded-full border-2 border-white/80 bg-[#E8F0EC] font-sans text-[10px] font-bold text-[#12312B]"
                >
                  {initials(story.name)}
                </span>
              ))}
            </div>

            <p className="font-sans text-[10px] text-white/70">
              Voices from our community
            </p>
          </div>
        </div>

        {/* Automatic testimonial marquee */}
        <div className="relative overflow-hidden font-sans">
          {/* Moving track */}
          <motion.div
            className="flex w-max font-sans"
            animate={
              reduceMotion
                ? { x: 0 }
                : { x: ["0%", "-50%"] }
            }
            transition={{
              duration: 32,
              ease: "linear",
              repeat: reduceMotion ? 0 : Infinity,
              repeatType: "loop",
            }}
          >
            {/* Original four cards */}
            {stories.map((story) => (
              <div
                key={story.name}
                className="w-[85vw] shrink-0 border-r border-[#12312B]/10 font-sans sm:w-[calc((100vw-3rem)/2)] lg:w-[calc((100vw-5rem)/3)] lg:max-w-[466.667px]"
              >
                <StoryCard story={story} />
              </div>
            ))}

            {/* Duplicate four cards for seamless looping */}
            {stories.map((story) => (
              <div
                key={`duplicate-${story.name}`}
                aria-hidden="true"
                className="w-[85vw] shrink-0 border-r border-[#12312B]/10 font-sans sm:w-[calc((100vw-3rem)/2)] lg:w-[calc((100vw-5rem)/3)] lg:max-w-[466.667px]"
              >
                <StoryCard story={story} />
              </div>
            ))}
          </motion.div>

          {/* Soft fade on both edges */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-[#12312B]/80 to-transparent sm:w-12"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-[#12312B]/80 to-transparent sm:w-12"
          />
        </div>

        {/* Bottom caption */}
        <p className="mt-5 text-center font-sans text-[10px] font-medium uppercase tracking-[0.16em] text-white/55">
          Every story matters. Every life makes a difference.
        </p>
      </div>
    </section>
  );
}
