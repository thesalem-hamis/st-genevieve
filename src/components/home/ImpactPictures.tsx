import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

import impact1 from "@/assets/impact.jpeg";
import impact2 from "@/assets/impact2.jpeg";
import impact3 from "@/assets/impact3.jpeg";
import impact4 from "@/assets/impact4.jpeg";
import impact5 from "@/assets/impact5.jpeg";
import impact6 from "@/assets/impact6.jpeg";
import impact7 from "@/assets/impact16.jpeg";


const EASE = [0.76, 0, 0.24, 1] as const;
const BODY = "font-['Mona_Sans',sans-serif]";

const RATIO = {
  portrait: "aspect-[4/5]",
  landscape: "aspect-[4/3]",
  square: "aspect-square",
} as const;

const IMAGES = [
  {
    src: impact1,
    alt: "Mothers and children smiling during a community outreach program",
    title: "Community Outreaches",
    date: "Jan 15, 2026",
    category: "Field Impact",
    ratio: "portrait",
  },
  {
    src: impact2,
    alt: "Children participating in educational support classes",
    title: "Academic Benefits",
    date: "Feb 02, 2026",
    category: "Education",
    ratio: "landscape",
  },
  {
    src: impact3,
    alt: "Mother embracing her child with love and dignity",
    title: "Maternal & Child Welfare",
    date: "Mar 10, 2026",
    category: "Welfare",
    ratio: "square",
  },
  {
    src: impact4,
    alt: "Healthcare professionals assisting families in a clinic",
    title: "Hospital & Health Support",
    date: "Apr 04, 2026",
    category: "Healthcare",
    ratio: "portrait",
  },
  {
    src: impact5,
    alt: "Skill development workshop for women",
    title: "Vocational Skills Program",
    date: "May 18, 2026",
    category: "Skills",
    ratio: "landscape",
  },
  {
    src: impact6,
    alt: "Skill development workshop for women",
    title: "Vocational Skills Program",
    date: "May 18, 2026",
    category: "Skills",
    ratio: "landscape",
  },
    {
    src: impact7,
    alt: "Skill development workshop for women",
    title: "Vocational Skills Program",
    date: "May 18, 2026",
    category: "Skills",
    ratio: "landscape",
  },
  // {
  //   // Placeholder until the next asset image is added
  //   src: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1200&auto=format&fit=crop",
  //   alt: "Volunteers distributing aid to families",
  //   title: "Food Aid Distribution",
  //   date: "Jun 07, 2026",
  //   category: "Food Aid",
  //   ratio: "portrait",
  // },
  // {
  //   // Placeholder until the next asset image is added
  //   src: "https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=1200&auto=format&fit=crop",
  //   alt: "Volunteers and community members gathered at an outreach event",
  //   title: "Volunteer Drive",
  //   date: "Jul 21, 2026",
  //   category: "Community",
  //   ratio: "square",
  // },
] as const;

export default function ImpactPictures() {
  const reduceMotion = useReducedMotion();
  const [open, setOpen] = useState<number | null>(null);
  const trigger = useRef<HTMLElement | null>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);

  const n = IMAGES.length;
  const item = open === null ? null : IMAGES[open];
  const isOpen = open !== null;

  const reveal = (delay = 0) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-60px" },
    transition: { duration: 0.85, delay, ease: EASE },
  });

  // Split images into three vertical scrolling columns
  const columns = [
    IMAGES.filter((_, i) => i % 3 === 0),
    IMAGES.filter((_, i) => i % 3 === 1),
    IMAGES.filter((_, i) => i % 3 === 2),
  ];

  useEffect(() => {
    if (!isOpen) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight")
        setOpen((i) => (i === null ? i : (i + 1) % n));
      if (e.key === "ArrowLeft")
        setOpen((i) => (i === null ? i : (i - 1 + n) % n));
    };

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    closeBtn.current?.focus();

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
      trigger.current?.focus();
    };
  }, [isOpen, n]);

  const step = (d: number) =>
    setOpen((i) => (i === null ? i : (i + d + n) % n));

  return (
    <section
      id="impact-pictures"
      className={`${BODY} relative overflow-hidden bg-[#F7F5EE] px-4 pb-16 pt-24 text-[#12312B] sm:px-6 sm:pb-20 sm:pt-28 lg:px-10 lg:pb-24 lg:pt-32`}
    >
      {/* Header — centered (unchanged) */}
      <div className="mx-auto mb-14 flex max-w-[900px] flex-col items-center px-5 text-center sm:mb-16 sm:px-10">
        <motion.h1
          {...reveal(0)}
          className="text-[clamp(1.8rem,4.2vw,3.6rem)] font-sans font-semibold leading-[1.08] tracking-[-0.03em] text-[#12312B]"
        >
          Captured Moments of <br />
          Hope, Dignity & Care
        </motion.h1>

        <motion.p
          {...reveal(0.08)}
          className="mt-4 max-w-[540px] text-sm leading-[1.8] text-[#12312B]/75 sm:text-[15px]"
        >
          A visual journal of our outreach programs, hospital support drives, and
          educational sessions—restoring hope and building stronger communities.
        </motion.p>
      </div>

      {/* Animated vertical gallery */}
      <motion.div
        {...reveal(0.1)}
        className="relative mx-auto grid h-[650px] max-w-[1400px] grid-cols-2 gap-3 overflow-hidden sm:h-[850px] sm:grid-cols-3 lg:gap-4"
      >
        {/* Top and bottom fade */}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-20 bg-gradient-to-b from-[#F7F5EE] to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-20 bg-gradient-to-t from-[#F7F5EE] to-transparent" />

        {columns.map((column, colIndex) => (
          <div
            key={colIndex}
            className={`relative h-full overflow-hidden ${
              colIndex === 2 ? "hidden sm:block" : ""
            }`}
          >
            <motion.div
              animate={
                reduceMotion
                  ? undefined
                  : {
                      y: colIndex % 2 === 0 ? ["-50%", "0%"] : ["0%", "-50%"],
                    }
              }
              transition={{
                duration: 35 + colIndex * 8,
                ease: "linear",
                repeat: Infinity,
              }}
              className="flex flex-col gap-3 lg:gap-4"
            >
              {[...column, ...column, ...column, ...column].map((g, index) => {
                const originalIndex = IMAGES.indexOf(g);

                return (
                  <button
                    key={`${g.title}-${index}`}
                    type="button"
                    onClick={(e) => {
                      trigger.current = e.currentTarget;
                      setOpen(originalIndex);
                    }}
                    aria-label={`View image: ${g.title}`}
                    className="group relative block w-full shrink-0 overflow-hidden rounded-2xl bg-[#E8F0EC] text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E6A100]"
                  >
                    <img
                      src={g.src}
                      alt={g.alt}
                      loading="lazy"
                      className={`w-full object-cover transition-transform duration-700 group-hover:scale-[1.04] ${RATIO[g.ratio]}`}
                    />

                    {/* Caption on hover */}
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-col bg-gradient-to-t from-black/65 to-transparent p-4 text-white opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                      <h3 className="text-[13px] font-medium tracking-tight sm:text-sm">
                        {g.title}
                      </h3>
                      <span className="mt-1 text-xs font-medium text-[#E6A100]">
                        {g.category}
                      </span>
                    </div>
                  </button>
                );
              })}
            </motion.div>
          </div>
        ))}
      </motion.div>

      {/* Lightbox */}
      {item && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={item.title}
          onClick={() => setOpen(null)}
          className="fixed inset-0 z-[100] flex flex-col bg-[#12312B]/90 p-4 text-white backdrop-blur-md sm:p-8"
        >
          <div className="flex items-center justify-between">
            <span className="text-sm text-white/70">
              {(open as number) + 1} / {n}
            </span>

            <button
              ref={closeBtn}
              type="button"
              onClick={() => setOpen(null)}
              aria-label="Close viewer"
              className="grid h-11 w-11 place-items-center rounded-full border border-white/25 bg-white/10 backdrop-blur-md"
            >
              <X size={18} />
            </button>
          </div>

          <div className="relative flex min-h-0 flex-1 items-center justify-center py-4">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                step(-1);
              }}
              aria-label="Previous image"
              className="absolute left-0 z-10 grid h-11 w-11 place-items-center rounded-full border border-white/25 bg-white/10 backdrop-blur-md"
            >
              <ChevronLeft size={20} />
            </button>

            <div
              onClick={(e) => e.stopPropagation()}
              className="flex max-h-full w-full max-w-[1000px] justify-center px-14"
            >
              <img
                src={item.src.replace("w=1200", "w=1800")}
                alt={item.alt}
                className="max-h-full max-w-full rounded-2xl object-contain"
              />
            </div>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                step(1);
              }}
              aria-label="Next image"
              className="absolute right-0 z-10 grid h-11 w-11 place-items-center rounded-full border border-white/25 bg-white/10 backdrop-blur-md"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          <div
            onClick={(e) => e.stopPropagation()}
            className="mx-auto flex max-w-[640px] flex-wrap items-center justify-center gap-x-3 gap-y-1 text-center"
          >
            <span className="text-sm font-semibold sm:text-base">
              {item.title}
            </span>
            <span className="text-xs text-white/70">{item.date}</span>
            <span className="text-xs font-medium text-[#E6A100]">
              {item.category}
            </span>
          </div>
        </div>
      )}
    </section>
  );
}