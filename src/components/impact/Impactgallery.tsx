
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Play, X } from "lucide-react";
import { GALLERY } from "./data";

const RATIO = {
  portrait: "aspect-[4/5]",
  landscape: "aspect-[4/3]",
  square: "aspect-square",
} as const;

export default function ImpactGallery() {
  const [open, setOpen] = useState<number | null>(null);
  const trigger = useRef<HTMLElement | null>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);

  const n = GALLERY.length;
  const item = open === null ? null : GALLERY[open];
  const isOpen = open !== null;

  // Split gallery into three vertical scrolling columns
  const columns = [
    GALLERY.filter((_, i) => i % 3 === 0),
    GALLERY.filter((_, i) => i % 3 === 1),
    GALLERY.filter((_, i) => i % 3 === 2),
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
    <section className="overflow-hidden bg-white px-4 pb-16 font-sans text-[#12312B] sm:px-6 sm:pb-20 lg:px-10 lg:pb-24">
      <div className="mx-auto max-w-[1400px]">

        {/* Centered heading */}
        <div className="mx-auto max-w-3xl pt-16 text-center sm:pt-20 lg:pt-24">

          <motion.h2
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-3xl font-sans font-semibold tracking-tight sm:text-4xl lg:text-5xl"
          >
            Our Work On the Ground
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{
              duration: 0.9,
              delay: 0.2,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-[#12312B]/65 sm:text-base"
          >
            Photos and videos capturing the people, places and moments
            behind our programmes and the impact we create on the ground.
          </motion.p>
        </div>

        {/* Animated vertical gallery */}
        <div className="relative mt-12 grid h-[650px] grid-cols-2 gap-3 overflow-hidden sm:mt-16 sm:h-[850px] sm:grid-cols-3 lg:gap-4">

          {/* Top and bottom fade */}
          <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-20 bg-gradient-to-b from-white to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-20 bg-gradient-to-t from-white to-transparent" />

          {columns.map((column, colIndex) => (
            <div
              key={colIndex}
              className={`relative h-full overflow-hidden ${
                colIndex === 2 ? "hidden sm:block" : ""
              }`}
            >
              <motion.div
                animate={{
                  y: colIndex % 2 === 0
                    ? ["-50%", "0%"]
                    : ["0%", "-50%"],
                }}
                transition={{
                  duration: 35 + colIndex * 8,
                  ease: "linear",
                  repeat: Infinity,
                }}
                className="flex flex-col gap-3 lg:gap-4"
              >
                {[...column, ...column, ...column, ...column].map(
                  (g, index) => {
                    const originalIndex = GALLERY.indexOf(g);

                    return (
                      <button
                        key={`${g.src}-${index}`}
                        type="button"
                        onClick={(e) => {
                          trigger.current = e.currentTarget;
                          setOpen(originalIndex);
                        }}
                        aria-label={`Open photo: ${g.alt}`}
                        className="relative mb-0 block w-full shrink-0 break-inside-avoid overflow-hidden rounded-2xl bg-[#E8F0EC] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E6A100]"
                      >
                        <img
                          src={g.src}
                          alt={g.alt}
                          loading="lazy"
                          className={`w-full object-cover transition-transform duration-700 hover:scale-[1.04] ${RATIO[g.ratio]}`}
                        />

                        {g.videoId && (
                          <span className="absolute bottom-3 left-3 grid h-10 w-10 place-items-center rounded-full border border-white/50 bg-white/65 text-[#12312B] backdrop-blur-md">
                            <Play size={16} fill="currentColor" />
                          </span>
                        )}
                      </button>
                    );
                  }
                )}
              </motion.div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {item && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
          onClick={() => setOpen(null)}
          className="fixed inset-0 z-[100] flex flex-col bg-[#12312B]/90 p-4 font-sans text-white backdrop-blur-md sm:p-8"
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
              aria-label="Previous photo"
              className="absolute left-0 z-10 grid h-11 w-11 place-items-center rounded-full border border-white/25 bg-white/10 backdrop-blur-md"
            >
              <ChevronLeft size={20} />
            </button>

            <div
              onClick={(e) => e.stopPropagation()}
              className="flex max-h-full w-full max-w-[1000px] justify-center px-14"
            >
              {item.videoId ? (
                <iframe
                  title={item.alt}
                  src={`https://www.youtube-nocookie.com/embed/${item.videoId}?autoplay=1&rel=0`}
                  allow="autoplay; encrypted-media; picture-in-picture"
                  allowFullScreen
                  className="aspect-video w-full rounded-2xl bg-black"
                />
              ) : (
                <img
                  src={item.src.replace("w=1200", "w=1800")}
                  alt={item.alt}
                  className="max-h-full max-w-full rounded-2xl object-contain"
                />
              )}
            </div>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                step(1);
              }}
              aria-label="Next photo"
              className="absolute right-0 z-10 grid h-11 w-11 place-items-center rounded-full border border-white/25 bg-white/10 backdrop-blur-md"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          <p
            onClick={(e) => e.stopPropagation()}
            className="mx-auto max-w-[640px] text-center text-sm leading-relaxed text-white/85"
          >
            {item.caption}
          </p>
        </div>
      )}
    </section>
  );
}


