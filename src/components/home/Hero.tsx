// import { useEffect, useRef, useState } from "react";
// import { Link } from "react-router-dom";
// import { motion } from "framer-motion";
// import { CustomArrowUpRight } from "@/components/ui/CustomIcons";

// const IMAGES = [
//   { src: "/images/hero/1.jpg", alt: "Mother and newborn at a community clinic" },
//   { src: "/images/hero/2.jpg", alt: "Children in a classroom" },
//   { src: "/images/hero/3.jpg", alt: "Health worker with a young family" },
//   { src: "/images/hero/4.jpg", alt: "Volunteers at an outreach event" },
//   { src: "/images/hero/5.jpg", alt: "Mothers at a wellness session" },
//   { src: "/images/hero/6.jpg", alt: "Children playing together" },
// ];

// const EASE = [0.76, 0, 0.24, 1] as const;

// const AUTO_SPEED = -5;
// const GAP = 10;
// const MIN_CARDS = 18;

// const clamp = (n: number, a: number, b: number) =>
//   Math.min(b, Math.max(a, n));

// const easeOutCubic = (t: number) =>
//   1 - Math.pow(1 - t, 3);

// export default function Hero() {
//   const reps = Math.ceil(MIN_CARDS / IMAGES.length);
//   const total = IMAGES.length * reps;
//   const step = 360 / total;

//   const [geo, setGeo] = useState({
//     w: 175,
//     h: 193,
//     R: 550,
//     persp: 1400,
//   });

//   const [reduceMotion, setReduceMotion] = useState(false);

//   const geoRef = useRef(geo);
//   geoRef.current = geo;

//   const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
//   const rot = useRef(0);
//   const vel = useRef(0);
//   const dragging = useRef(false);

//   const last = useRef({ x: 0, t: 0 });

//   /* Responsive carousel dimensions */
//   useEffect(() => {
//     const measure = () => {
//       const vw = window.innerWidth;
//       const mobile = vw < 640;
//       const tablet = vw >= 640 && vw < 1024;

//       const w = mobile
//         ? clamp(vw * 0.5, 175, 250)
//         : tablet
//           ? clamp(vw * 0.25, 190, 270)
//           : clamp(vw * 0.22, 230, 350);

//       const h = Math.round(w * (mobile ? 1.9 : 1.1));

//       const R =
//         (w + GAP) /
//         (2 * Math.tan((step / 2) * (Math.PI / 180)));

//       setGeo({
//         w,
//         h,
//         R,
//         persp: R * 2,
//       });
//     };

//     measure();
//     window.addEventListener("resize", measure);

//     return () => window.removeEventListener("resize", measure);
//   }, [step]);

//   /* Reduced motion accessibility */
//   useEffect(() => {
//     const media = window.matchMedia(
//       "(prefers-reduced-motion: reduce)"
//     );

//     const update = () => setReduceMotion(media.matches);

//     update();
//     media.addEventListener("change", update);

//     return () => media.removeEventListener("change", update);
//   }, []);

//   /* 3D carousel animation */
//   useEffect(() => {
//     let raf = 0;
//     let prev = performance.now();
//     const t0 = prev;

//     const tick = (now: number) => {
//       const dt = Math.min((now - prev) / 1000, 0.05);
//       prev = now;

//       if (!dragging.current) {
//         if (!reduceMotion) {
//           rot.current += (vel.current + AUTO_SPEED) * dt;
//         }

//         vel.current *= Math.exp(-3 * dt);
//       }

//       const p = easeOutCubic(
//         clamp((now - t0) / 1700, 0, 1)
//       );

//       const intro = (1 - p) * 60;
//       const { R } = geoRef.current;

//       for (let i = 0; i < total; i++) {
//         const el = cardRefs.current[i];
//         if (!el) continue;

//         let a = (i * step + rot.current + intro) % 360;

//         if (a > 180) a -= 360;
//         if (a < -180) a += 360;

//         const rad = (a * Math.PI) / 180;
//         const x = R * Math.sin(rad);
//         const z = R * (1 - Math.cos(rad));
//         const abs = Math.abs(a);

//         const opacity =
//           clamp(1 - (abs - 80) / 25, 0, 1) * p;

//         el.style.transform =
//           `translate3d(${x}px, 0, ${z}px) rotateY(${-a}deg)`;

//         el.style.opacity = String(opacity);
//         el.style.visibility =
//           opacity <= 0.01 ? "hidden" : "visible";

//         el.style.zIndex = String(
//           Math.round(1000 - abs * 5)
//         );

//         el.style.filter =
//           `brightness(${1 - Math.min(abs / 140, 0.25)})`;
//       }

//       raf = requestAnimationFrame(tick);
//     };

//     raf = requestAnimationFrame(tick);

//     return () => cancelAnimationFrame(raf);
//   }, [total, step, reduceMotion]);

//   /* Drag interaction with inertia */
//   const degPerPx = () => 57.2958 / geoRef.current.R;

//   const onPointerDown = (
//     e: React.PointerEvent<HTMLDivElement>
//   ) => {
//     dragging.current = true;
//     vel.current = 0;

//     last.current = {
//       x: e.clientX,
//       t: performance.now(),
//     };

//     e.currentTarget.setPointerCapture(e.pointerId);
//   };

//   const onPointerMove = (
//     e: React.PointerEvent<HTMLDivElement>
//   ) => {
//     if (!dragging.current) return;

//     const now = performance.now();
//     const dx = e.clientX - last.current.x;

//     const dt = Math.max(
//       (now - last.current.t) / 1000,
//       0.001
//     );

//     rot.current += dx * degPerPx();

//     vel.current =
//       (dx / dt) * degPerPx() * 0.6 +
//       vel.current * 0.4;

//     last.current = {
//       x: e.clientX,
//       t: now,
//     };
//   };

//   const endDrag = (
//     e: React.PointerEvent<HTMLDivElement>
//   ) => {
//     dragging.current = false;

//     if (e.currentTarget.hasPointerCapture(e.pointerId)) {
//       e.currentTarget.releasePointerCapture(e.pointerId);
//     }
//   };

//   return (
//     <section className="relative isolate min-h-screen overflow-hidden bg-white text-[#12312B]">

//       {/* Subtle dotted background */}
//       <div
//         className="pointer-events-none absolute inset-0 -z-10"
//         style={{
//           backgroundImage: `
//             radial-gradient(
//               circle,
//               rgba(45, 45, 45, 0.16) 0.7px,
//               transparent 0.9px
//             )
//           `,
//           backgroundSize: "19px 19px",
//         }}
//       />

//       {/* Main content */}
//       <div className="relative z-10 mx-auto flex min-h-screen max-w-[1800px] flex-col justify-center pt-36 pb-10 sm:pt-40 sm:pb-12">

//         {/* Heading, subtext and button */}
//         <div className="relative z-20 mx-auto flex w-full flex-col items-center px-3 text-center sm:px-8 lg:px-12">

//           {/* Hero Heading - Mango Grotesque */}
//           <motion.h1
//             initial={{ opacity: 0, y: 35 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 1, ease: EASE }}
//             className="font-heading mx-auto flex max-w-[1450px] flex-col items-center text-[#12312B] text-[clamp(2.1rem,6vw,4rem)] font-normal sm:font-medium lg:text-[clamp(2.75rem,4.6vw,4.75rem)]"
//             style={{
//               lineHeight: 1.08,
//               letterSpacing: "-0.025em",
//             }}
//           >
//             <span className="block font-heading">
//               Care for every mother
//             </span>

//             <span className="mt-1.5 block font-heading sm:mt-2">
//               A future for every child
//             </span>
//           </motion.h1>

//           {/* Subtext - Mona Sans */}
//           <motion.p
//             initial={{ opacity: 0, y: 14 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{
//               duration: 0.7,
//               delay: 0.3,
//               ease: EASE,
//             }}
//             className="mt-5 w-full max-w-none font-sans text-xs font-normal leading-relaxed tracking-[0.005em] text-[#12312B]/75 sm:mt-5 sm:max-w-xl sm:text-balance sm:text-sm lg:text-base"
//           >
//             We are committed to transforming lives through education,
//             healthcare, skill development, and community support.
//             Join us in making a lasting impact.
//           </motion.p>

//           {/* Gold button - Mona Sans */}
//           <motion.div
//             initial={{ opacity: 0, y: 14 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{
//               duration: 0.7,
//               delay: 0.45,
//               ease: EASE,
//             }}
//             className="mt-6 font-sans sm:mt-6"
//           >
//             <Link
//               to="/donate"
//               className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-full bg-[#E6A100] px-7 py-3.5 font-sans text-xs font-medium uppercase tracking-wider text-[#12312B] shadow-[0_0_0_0_rgba(18,49,43,0)] transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] hover:scale-[1.04] hover:text-white hover:shadow-[0_14px_32px_-10px_rgba(18,49,43,0.5)] active:scale-95"
//             >
//               {/* Green circle hover effect */}
//               <span
//                 aria-hidden="true"
//                 className="pointer-events-none absolute bottom-0 left-1/2 aspect-square w-[160%] -translate-x-1/2 translate-y-1/2 scale-0 rounded-full bg-[#12312B] transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-100"
//               />

//               {/* Button text */}
//               <span className="relative block overflow-hidden leading-[1.5]">
//                 <span className="block transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full">
//                   SUPPORT OUR MISSION
//                 </span>

//                 <span
//                   aria-hidden="true"
//                   className="absolute inset-0 block translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-y-0"
//                 >
//                   SUPPORT OUR MISSION
//                 </span>
//               </span>

//               {/* Arrow */}
//               <span className="relative block h-[14px] w-[14px] overflow-hidden">
//                 <span className="absolute inset-0 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full group-hover:translate-x-full">
//                   <CustomArrowUpRight size={14} color="currentColor" />
//                 </span>

//                 <span
//                   aria-hidden="true"
//                   className="absolute inset-0 -translate-x-full translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-x-0 group-hover:translate-y-0"
//                 >
//                   <CustomArrowUpRight size={14} color="currentColor" />
//                 </span>
//               </span>
//             </Link>
//           </motion.div>

//         </div>

//         {/* Image gallery */}
//         <div
//           className="relative mt-2 w-full cursor-grab select-none active:cursor-grabbing sm:mt-4 lg:mt-2"
//           style={{
//             height: geo.h + 70,
//             perspective: `${geo.persp}px`,
//             touchAction: "pan-y",
//           }}
//           onPointerDown={onPointerDown}
//           onPointerMove={onPointerMove}
//           onPointerUp={endDrag}
//           onPointerCancel={endDrag}
//           aria-label="Photo gallery. Drag to rotate."
//         >

//           {/* Carousel cards */}
//           {Array.from({ length: total }).map((_, i) => {
//             const img = IMAGES[i % IMAGES.length];

//             return (
//               <div
//                 key={i}
//                 ref={(el) => {
//                   cardRefs.current[i] = el;
//                 }}
//                 className="absolute left-1/2 top-1/2 overflow-hidden rounded-md bg-[#E6EAFB] shadow-[0_18px_40px_-18px_rgba(18,49,43,0.35)] will-change-transform"
//                 style={{
//                   width: geo.w,
//                   height: geo.h,
//                   marginLeft: -geo.w / 2,
//                   marginTop: -geo.h / 2,
//                   opacity: 0,
//                   backfaceVisibility: "hidden",
//                 }}
//               >
//                 <img
//                   src={img.src}
//                   alt={img.alt}
//                   draggable={false}
//                   loading={i < 6 ? "eager" : "lazy"}
//                   className="pointer-events-none h-full w-full object-cover"
//                 />

//                 <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-white/[0.04]" />
//               </div>
//             );
//           })}

//         </div>

//       </div>
//     </section>
//   );
// }


import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CustomArrowUpRight } from "@/components/ui/CustomIcons";

const IMAGES = [
  { src: "/images/hero/1.jpg", alt: "Mother and newborn at a community clinic" },
  { src: "/images/hero/2.jpg", alt: "Children in a classroom" },
  { src: "/images/hero/3.jpg", alt: "Health worker with a young family" },
  { src: "/images/hero/4.jpg", alt: "Volunteers at an outreach event" },
  { src: "/images/hero/5.jpg", alt: "Mothers at a wellness session" },
  { src: "/images/hero/6.jpg", alt: "Children playing together" },
];

const EASE = [0.76, 0, 0.24, 1] as const;

const AUTO_SPEED = -5;
const GAP = 10;
const MIN_CARDS = 18;

const clamp = (n: number, a: number, b: number) =>
  Math.min(b, Math.max(a, n));

const easeOutCubic = (t: number) =>
  1 - Math.pow(1 - t, 3);

export default function Hero() {
  const reps = Math.ceil(MIN_CARDS / IMAGES.length);
  const total = IMAGES.length * reps;
  const step = 360 / total;

  const [geo, setGeo] = useState({
    w: 175,
    h: 193,
    R: 550,
    persp: 1400,
  });

  const [reduceMotion, setReduceMotion] = useState(false);

  const geoRef = useRef(geo);
  geoRef.current = geo;

  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const rot = useRef(0);
  const vel = useRef(0);
  const dragging = useRef(false);

  const last = useRef({ x: 0, t: 0 });

  /* Responsive carousel dimensions */
  useEffect(() => {
    const measure = () => {
      const vw = window.innerWidth;
      const mobile = vw < 640;
      const tablet = vw >= 640 && vw < 1024;

      const w = mobile
        ? clamp(vw * 0.5, 175, 250)
        : tablet
          ? clamp(vw * 0.25, 190, 270)
          : clamp(vw * 0.22, 230, 350);

      const h = Math.round(w * (mobile ? 1.9 : 1.1));

      const R =
        (w + GAP) /
        (2 * Math.tan((step / 2) * (Math.PI / 180)));

      setGeo({
        w,
        h,
        R,
        persp: R * 2,
      });
    };

    measure();
    window.addEventListener("resize", measure);

    return () => window.removeEventListener("resize", measure);
  }, [step]);

  /* Reduced motion accessibility */
  useEffect(() => {
    const media = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    const update = () => setReduceMotion(media.matches);

    update();
    media.addEventListener("change", update);

    return () => media.removeEventListener("change", update);
  }, []);

  /* 3D carousel animation */
  useEffect(() => {
    let raf = 0;
    let prev = performance.now();
    const t0 = prev;

    const tick = (now: number) => {
      const dt = Math.min((now - prev) / 1000, 0.05);
      prev = now;

      if (!dragging.current) {
        if (!reduceMotion) {
          rot.current += (vel.current + AUTO_SPEED) * dt;
        }

        vel.current *= Math.exp(-3 * dt);
      }

      const p = easeOutCubic(
        clamp((now - t0) / 1700, 0, 1)
      );

      const intro = (1 - p) * 60;
      const { R } = geoRef.current;

      for (let i = 0; i < total; i++) {
        const el = cardRefs.current[i];
        if (!el) continue;

        let a = (i * step + rot.current + intro) % 360;

        if (a > 180) a -= 360;
        if (a < -180) a += 360;

        const rad = (a * Math.PI) / 180;
        const x = R * Math.sin(rad);
        const z = R * (1 - Math.cos(rad));
        const abs = Math.abs(a);

        const opacity =
          clamp(1 - (abs - 80) / 25, 0, 1) * p;

        el.style.transform =
          `translate3d(${x}px, 0, ${z}px) rotateY(${-a}deg)`;

        el.style.opacity = String(opacity);
        el.style.visibility =
          opacity <= 0.01 ? "hidden" : "visible";

        el.style.zIndex = String(
          Math.round(1000 - abs * 5)
        );

        el.style.filter =
          `brightness(${1 - Math.min(abs / 140, 0.25)})`;
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(raf);
  }, [total, step, reduceMotion]);

  /* Drag interaction with inertia */
  const degPerPx = () => 57.2958 / geoRef.current.R;

  const onPointerDown = (
    e: React.PointerEvent<HTMLDivElement>
  ) => {
    dragging.current = true;
    vel.current = 0;

    last.current = {
      x: e.clientX,
      t: performance.now(),
    };

    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (
    e: React.PointerEvent<HTMLDivElement>
  ) => {
    if (!dragging.current) return;

    const now = performance.now();
    const dx = e.clientX - last.current.x;

    const dt = Math.max(
      (now - last.current.t) / 1000,
      0.001
    );

    rot.current += dx * degPerPx();

    vel.current =
      (dx / dt) * degPerPx() * 0.6 +
      vel.current * 0.4;

    last.current = {
      x: e.clientX,
      t: now,
    };
  };

  const endDrag = (
    e: React.PointerEvent<HTMLDivElement>
  ) => {
    dragging.current = false;

    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
  };

  return (
    <section className="relative isolate min-h-screen overflow-hidden bg-white font-sans text-[#12312B]">

      {/* Subtle dotted background */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          backgroundImage: `
            radial-gradient(
              circle,
              rgba(45, 45, 45, 0.16) 0.7px,
              transparent 0.9px
            )
          `,
          backgroundSize: "19px 19px",
        }}
      />

      {/* Main content */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-[1800px] flex-col justify-center pt-36 pb-10 sm:pt-40 sm:pb-12">

        {/* Heading, subtext and button */}
        <div className="relative z-20 mx-auto flex w-full flex-col items-center px-3 text-center sm:px-8 lg:px-12">

          {/* Hero Heading - Mango Grotesque */}
          <motion.h1
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE }}
            className="font-heading mx-auto flex max-w-[1450px] flex-col items-center text-[#12312B] text-[clamp(2.1rem,6vw,4rem)] font-normal sm:font-medium lg:text-[clamp(2.75rem,4.6vw,4.75rem)]"
            style={{
              lineHeight: 1.08,
              letterSpacing: "-0.025em",
            }}
          >
            <span className="block font-heading">
              Care For Every Mother
            </span>

            <span className="mt-1.5 block font-heading sm:mt-2">
              A Future For Every Child
            </span>
          </motion.h1>

          {/* Subtext - Mona Sans */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              delay: 0.3,
              ease: EASE,
            }}
            className="mt-5 w-full max-w-none font-sans text-xs font-normal leading-relaxed tracking-[0.005em] text-[#12312B]/75 sm:mt-5 sm:max-w-xl sm:text-balance sm:text-sm lg:text-base"
          >
            We are committed to transforming lives through education,
            healthcare, skill development, and community support.
            Join us in making a lasting impact.
          </motion.p>

          {/* Gold button - Mona Sans */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              delay: 0.45,
              ease: EASE,
            }}
            className="mt-6 font-sans sm:mt-6"
          >
            <Link
              to="/donate"
              className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-full bg-[#E6A100] px-7 py-3.5 font-sans text-xs font-medium uppercase tracking-wider text-[#12312B] shadow-[0_0_0_0_rgba(18,49,43,0)] transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] hover:scale-[1.04] hover:text-white hover:shadow-[0_14px_32px_-10px_rgba(18,49,43,0.5)] active:scale-95"
            >
              {/* Green circle hover effect */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute bottom-0 left-1/2 aspect-square w-[160%] -translate-x-1/2 translate-y-1/2 scale-0 rounded-full bg-[#12312B] transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-100"
              />

              {/* Button text */}
              <span className="relative block overflow-hidden leading-[1.5]">
                <span className="block transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full">
                  SUPPORT OUR MISSION
                </span>

                <span
                  aria-hidden="true"
                  className="absolute inset-0 block translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-y-0"
                >
                  SUPPORT OUR MISSION
                </span>
              </span>

              {/* Arrow */}
              <span className="relative block h-[14px] w-[14px] overflow-hidden">
                <span className="absolute inset-0 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full group-hover:translate-x-full">
                  <CustomArrowUpRight size={14} color="currentColor" />
                </span>

                <span
                  aria-hidden="true"
                  className="absolute inset-0 -translate-x-full translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-x-0 group-hover:translate-y-0"
                >
                  <CustomArrowUpRight size={14} color="currentColor" />
                </span>
              </span>
            </Link>
          </motion.div>

        </div>

        {/* Image gallery */}
        <div
          className="relative mt-2 w-full cursor-grab select-none active:cursor-grabbing sm:mt-4 lg:mt-2"
          style={{
            height: geo.h + 70,
            perspective: `${geo.persp}px`,
            touchAction: "pan-y",
          }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          aria-label="Photo gallery. Drag to rotate."
        >

          {/* Carousel cards */}
          {Array.from({ length: total }).map((_, i) => {
            const img = IMAGES[i % IMAGES.length];

            return (
              <div
                key={i}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                className="absolute left-1/2 top-1/2 overflow-hidden rounded-md bg-[#E6EAFB] shadow-[0_18px_40px_-18px_rgba(18,49,43,0.35)] will-change-transform"
                style={{
                  width: geo.w,
                  height: geo.h,
                  marginLeft: -geo.w / 2,
                  marginTop: -geo.h / 2,
                  opacity: 0,
                  backfaceVisibility: "hidden",
                }}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  draggable={false}
                  loading={i < 6 ? "eager" : "lazy"}
                  className="pointer-events-none h-full w-full object-cover"
                />

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-white/[0.04]" />
              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}