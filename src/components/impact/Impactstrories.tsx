// components/impact/ImpactStories.tsx
import { useRef, useState } from "react";
import { motion, useReducedMotion, useScroll } from "framer-motion";
import { Play } from "lucide-react";
import { SectionHeader, useReveal } from "./Shared";
import { STORIES, type Story } from "./data";

const TONES = {
  green: "bg-[#E8F0EC]",
  yellow: "bg-[#FBF1D4]",
  rose: "bg-[#F8E8E3]",
} as const;

/* Photo that becomes a YouTube player only when tapped */
function Media({ story }: { story: Story }) {
  const [playing, setPlaying] = useState(false);

  if (playing && story.videoId) {
    return (
      <iframe
        title={`Video: ${story.name}`}
        src={`https://www.youtube-nocookie.com/embed/${story.videoId}?autoplay=1&rel=0`}
        allow="autoplay; encrypted-media; picture-in-picture"
        allowFullScreen
        className="aspect-[4/3] w-full rounded-[24px] bg-black"
      />
    );
  }

  return (
    <div className="relative overflow-hidden rounded-[24px] bg-[#12312B]/10">
      <img
        src={story.image}
        alt={`${story.name}, ${story.place}`}
        loading="lazy"
        className="aspect-[4/3] w-full object-cover"
      />
      {story.videoId && (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          aria-label={`Play video: ${story.name}`}
          className="absolute inset-0 grid place-items-center"
        >
          <span className="grid h-16 w-16 place-items-center rounded-full border border-white/50 bg-white/65 text-[#12312B] backdrop-blur-md">
            <Play size={22} fill="currentColor" />
          </span>
        </button>
      )}
    </div>
  );
}

function StoryRow({ story, index }: { story: Story; index: number }) {
  const reveal = useReveal();
  const textOnLeft = index % 2 === 0;

  return (
    <motion.li
      {...reveal(0)}
      className="relative grid gap-5 pl-12 lg:grid-cols-[1fr_64px_1fr] lg:items-center lg:gap-0 lg:pl-0"
    >
      {/* Dot on the line */}
      <span className="absolute left-0 top-8 z-10 grid h-6 w-6 place-items-center rounded-full bg-white ring-1 ring-[#12312B]/15 lg:static lg:col-start-2 lg:row-start-1 lg:justify-self-center">
        <span className="h-2.5 w-2.5 rounded-full bg-[#E6A100]" />
      </span>

      {/* Quote */}
      <div
        className={`lg:row-start-1 ${
          textOnLeft ? "lg:col-start-1 lg:pr-10 lg:text-right" : "lg:col-start-3 lg:pl-10"
        }`}
      >
        <figure className={`rounded-[24px] p-7 sm:p-9 ${TONES[story.tone ?? "green"]}`}>
          <blockquote className="font-heading text-[clamp(1.4rem,2.4vw,2.2rem)] font-normal leading-[1.2] tracking-[-0.02em]">
            {story.quote}
          </blockquote>
          <figcaption className="mt-6 font-sans text-sm">
            <span className="font-semibold">{story.name}</span>
            <span className="text-[#12312B]/60">, {story.place}</span>
          </figcaption>
        </figure>
      </div>

      {/* Photo or video on the opposite side */}
      <div
        className={`lg:row-start-1 ${
          textOnLeft ? "lg:col-start-3 lg:pl-10" : "lg:col-start-1 lg:pr-10"
        }`}
      >
        <Media story={story} />
      </div>
    </motion.li>
  );
}

export default function ImpactStories() {
  const reduceMotion = useReducedMotion();
  const listRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start 65%", "end 55%"],
  });

  return (
    <section className="bg-white px-4 pb-16 text-[#12312B] sm:px-6 sm:pb-20 lg:px-10 lg:pb-24">
      <div className="mx-auto max-w-[1400px]">
        <SectionHeader
          label="Stories"
          title="In their own words"
          text="The people and communities we work with, speaking for themselves."
        />

        <div className="relative mt-10 lg:mt-14">
          {/* Centre line; the gold part draws itself as you scroll */}
          <span
            aria-hidden="true"
            className="absolute bottom-0 left-3 top-0 w-px -translate-x-1/2 bg-[#12312B]/15 lg:left-1/2"
          />
          <motion.span
            aria-hidden="true"
            style={{ scaleY: reduceMotion ? 1 : scrollYProgress }}
            className="absolute bottom-0 left-3 top-0 w-[2px] origin-top -translate-x-1/2 bg-[#E6A100] lg:left-1/2"
          />

          <ol ref={listRef} className="relative space-y-10 lg:space-y-16">
            {STORIES.map((story, i) => (
              <StoryRow key={i} story={story} index={i} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}