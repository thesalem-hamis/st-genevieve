// components/impact/ImpactGallery.tsx
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Play, X } from "lucide-react";
import { SectionHeader, useReveal } from "./Shared";
import { GALLERY } from "./data";

const RATIO = {
  portrait: "aspect-[4/5]",
  landscape: "aspect-[4/3]",
  square: "aspect-square",
} as const;

export default function ImpactGallery() {
  const reveal = useReveal();
  const [open, setOpen] = useState<number | null>(null);
  const trigger = useRef<HTMLElement | null>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const n = GALLERY.length;
  const item = open === null ? null : GALLERY[open];

  // Keyboard, scroll lock and focus handling while the lightbox is open
  const isOpen = open !== null;
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") setOpen((i) => (i === null ? i : (i + 1) % n));
      if (e.key === "ArrowLeft") setOpen((i) => (i === null ? i : (i - 1 + n) % n));
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

  const step = (d: number) => setOpen((i) => (i === null ? i : (i + d + n) % n));

  return (
    <section className="bg-white px-4 pb-16 text-[#12312B] sm:px-6 sm:pb-20 lg:px-10 lg:pb-24">
      <div className="mx-auto max-w-[1400px]">
        <SectionHeader
          label="Gallery"
          title="On the ground"
          text="Photos and video from our programmes. Select any image to view it larger."
        />

        <motion.div
          {...reveal(0.1)}
          className="mt-8 columns-1 gap-3 sm:columns-2 lg:mt-10 lg:columns-3"
        >
          {GALLERY.map((g, i) => (
            <button
              key={g.src}
              type="button"
              onClick={(e) => {
                trigger.current = e.currentTarget;
                setOpen(i);
              }}
              aria-label={`Open photo: ${g.alt}`}
              className="relative mb-3 block w-full break-inside-avoid overflow-hidden rounded-[20px] bg-[#E8F0EC] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E6A100]"
            >
              <img
                src={g.src}
                alt={g.alt}
                loading="lazy"
                className={`w-full object-cover ${RATIO[g.ratio]}`}
              />
              {g.videoId && (
                <span className="absolute bottom-3 left-3 grid h-10 w-10 place-items-center rounded-full border border-white/50 bg-white/65 text-[#12312B] backdrop-blur-md">
                  <Play size={16} fill="currentColor" />
                </span>
              )}
            </button>
          ))}
        </motion.div>
      </div>

      {/* Lightbox */}
      {item && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
          onClick={() => setOpen(null)}
          className="fixed inset-0 z-[100] flex flex-col bg-[#12312B]/90 p-4 text-white backdrop-blur-md sm:p-8"
        >
          <div className="flex items-center justify-between">
            <span className="font-sans text-sm text-white/70">
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
              onClick={(e) => { e.stopPropagation(); step(-1); }}
              aria-label="Previous photo"
              className="absolute left-0 z-10 grid h-11 w-11 place-items-center rounded-full border border-white/25 bg-white/10 backdrop-blur-md"
            >
              <ChevronLeft size={20} />
            </button>

            <div onClick={(e) => e.stopPropagation()} className="flex max-h-full w-full max-w-[1000px] justify-center px-14">
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
              onClick={(e) => { e.stopPropagation(); step(1); }}
              aria-label="Next photo"
              className="absolute right-0 z-10 grid h-11 w-11 place-items-center rounded-full border border-white/25 bg-white/10 backdrop-blur-md"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          <p
            onClick={(e) => e.stopPropagation()}
            className="mx-auto max-w-[640px] text-center font-sans text-sm leading-relaxed text-white/85"
          >
            {item.caption}
          </p>
        </div>
      )}
    </section>
  );
}