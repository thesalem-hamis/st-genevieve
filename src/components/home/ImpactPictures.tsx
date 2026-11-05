import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  CustomArrowLeft,
  CustomArrowRight,
  CustomCloseIcon,
} from "@/components/ui/CustomIcons";

const EASE = [0.76, 0, 0.24, 1] as const;
const BODY = "font-['Mona_Sans',sans-serif]";

const IMAGES = [
  {
    src: "https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=1200&auto=format&fit=crop",
    alt: "Mothers and children smiling during a community outreach program",
    title: "Community Outreaches",
    date: "Jan 15, 2026",
    category: "Field Impact",
    span: "lg:col-span-1 lg:row-span-1",
  },
  {
    src: "https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=1200&auto=format&fit=crop",
    alt: "Children participating in educational support classes",
    title: "Academic Benefits",
    date: "Feb 02, 2026",
    category: "Education",
    span: "row-span-2 lg:col-span-1 lg:row-span-2",
  },
  {
    src: "https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?q=80&w=1200&auto=format&fit=crop",
    alt: "Mother embracing her child with love and dignity",
    title: "Maternal & Child Welfare",
    date: "Mar 10, 2026",
    category: "Welfare",
    span: "col-span-2 lg:col-span-2 lg:row-span-1",
  },
  {
    src: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1200&auto=format&fit=crop",
    alt: "Healthcare professionals assisting families in a clinic",
    title: "Hospital & Health Support",
    date: "Apr 04, 2026",
    category: "Healthcare",
    span: "row-span-2 lg:col-span-1 lg:row-span-2",
  },
  {
    src: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1200&auto=format&fit=crop",
    alt: "Skill development workshop for women",
    title: "Vocational Skills Program",
    date: "May 18, 2026",
    category: "Skills",
    span: "lg:col-span-1 lg:row-span-1",
  },
  {
    src: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1200&auto=format&fit=crop",
    alt: "Volunteers distributing aid to families",
    title: "Food Aid Distribution",
    date: "Jun 07, 2026",
    category: "Food Aid",
    span: "row-span-2 lg:col-span-1 lg:row-span-2",
  },
  {
    src: "https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=1200&auto=format&fit=crop",
    alt: "Volunteers and community members gathered at an outreach event",
    title: "Volunteer Drive",
    date: "Jul 21, 2026",
    category: "Community",
    span: "col-span-2 lg:col-span-2 lg:row-span-1",
  },
];

export default function ImpactPictures() {
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState<number | null>(null);

  const reveal = (delay = 0) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-60px" },
    transition: { duration: 0.85, delay, ease: EASE },
  });

  const close = useCallback(() => setActive(null), []);
  const next = useCallback(
    () => setActive((i) => (i === null ? i : (i + 1) % IMAGES.length)),
    []
  );
  const prev = useCallback(
    () =>
      setActive((i) => (i === null ? i : (i - 1 + IMAGES.length) % IMAGES.length)),
    []
  );

  // Keyboard controls + scroll lock while the viewer is open
  useEffect(() => {
    if (active === null) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [active, close, next, prev]);

  const current = active !== null ? IMAGES[active] : null;

  return (
    <section
      id="impact-pictures"
      className={`${BODY} relative overflow-hidden bg-[#F7F5EE] pt-24 text-[#12312B] sm:pt-28 lg:pt-32 pb-0`}
    >
      {/* Header — centered */}
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

      {/* Edge-to-edge mosaic with adjusted mobile heights to cover black gaps */}
      <motion.div
        {...reveal(0.1)}
        className="grid auto-rows-[220px] grid-cols-2 gap-[2px] bg-[#191918] sm:auto-rows-[260px] lg:auto-rows-[280px] lg:grid-cols-4 mb-0"
      >
        {IMAGES.map((item, index) => (
          <button
            key={item.title}
            type="button"
            onClick={() => setActive(index)}
            aria-label={`View image: ${item.title}`}
            className={`group relative block cursor-zoom-in overflow-hidden bg-[#191918] text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#E6A100] ${item.span}`}
          >
            <img
              src={item.src}
              alt={item.alt}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover"
            />

            {/* Static caption gradient only */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent" />

            {/* Caption */}
            <div className="absolute inset-x-0 bottom-0 flex flex-col p-5 text-white sm:p-6">
              <h3 className="text-[13px] font-medium tracking-tight sm:text-sm">
                {item.title}
              </h3>
              <div className="mt-1.5 flex items-center gap-3 text-xs text-white/80">
                <span>{item.date}</span>
                <span className="font-medium text-[#E6A100]">{item.category}</span>
              </div>
            </div>
          </button>
        ))}
      </motion.div>

      {/* Lightbox viewer */}
      <AnimatePresence>
        {current && (
          <motion.div
            key="lightbox"
            role="dialog"
            aria-modal="true"
            aria-label={current.title}
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.35, ease: EASE }}
            onClick={close}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#191918] p-4 sm:p-8"
          >
            {/* Close */}
            <button
              type="button"
              onClick={close}
              aria-label="Close viewer"
              className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20 sm:right-8 sm:top-8"
            >
              <CustomCloseIcon size={20} color="#ffffff" />
            </button>

            {/* Prev */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              aria-label="Previous image"
              className="absolute left-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:left-8"
            >
              <CustomArrowLeft size={18} />
            </button>

            {/* Next */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              aria-label="Next image"
              className="absolute right-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:right-8"
            >
              <CustomArrowRight size={18} />
            </button>

            {/* Image + caption */}
            <motion.figure
              key={current.src}
              initial={reduceMotion ? false : { opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: reduceMotion ? 0 : 0.45, ease: EASE }}
              onClick={(e) => e.stopPropagation()}
              className="flex max-h-full max-w-[1100px] flex-col items-center"
            >
              <img
                src={current.src}
                alt={current.alt}
                className="max-h-[78vh] w-auto max-w-full rounded-lg object-contain shadow-2xl"
              />
              <figcaption className="mt-4 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-center text-white">
                <span className="text-sm font-semibold sm:text-base">
                  {current.title}
                </span>
                <span className="text-xs text-white/70">{current.date}</span>
                <span className="text-xs font-medium text-[#E6A100]">
                  {current.category}
                </span>
                <span className="text-xs text-white/50">
                  {(active ?? 0) + 1} / {IMAGES.length}
                </span>
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}