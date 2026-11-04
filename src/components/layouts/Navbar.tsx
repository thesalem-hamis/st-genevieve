// VARIANT 1: Original code with a simple navbar and menu toggle
// import { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   CustomMenuIcon,
//   CustomCloseIcon,
//   CustomArrowUpRight,
// } from "@/components/ui/CustomIcons";
// import loadingLogo from "@/assets/loadingLogo.png";

// export default function Navbar() {
//   const [isOpen, setIsOpen] = useState(false);
//   const navigate = useNavigate();

//   const navLinks = [
//     { name: "Home", path: "/" },
//     { name: "About Us", path: "/about" },
//     { name: "Programs", path: "/programs" },
//     { name: "Impact", path: "/impact" },
//     { name: "Blog", path: "/blog" },
//     { name: "Contact", path: "/contact" },
//   ];

//   // Lock background scrolling and prevent layout shift
//   useEffect(() => {
//     if (!isOpen) return;

//     const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
//     const prevBodyOverflow = document.body.style.overflow;
//     const prevBodyPaddingRight = document.body.style.paddingRight;

//     document.body.style.overflow = "hidden";
//     if (scrollbarWidth > 0) {
//       document.body.style.paddingRight = `${scrollbarWidth}px`;
//     }

//     return () => {
//       document.body.style.overflow = prevBodyOverflow;
//       document.body.style.paddingRight = prevBodyPaddingRight;
//     };
//   }, [isOpen]);

//   const handleNavigation = (path: string) => {
//     setIsOpen(false);
//     navigate(path);
//   };

//   return (
//     <>
//       {/* Navbar Header */}
//       <header className="fixed top-5 left-0 right-0 z-50 px-4 pointer-events-none">
//         <div className="w-full sm:w-fit max-w-xl mx-auto pointer-events-auto">
//           <div className="flex items-center justify-between gap-3 sm:gap-6 md:gap-8 bg-white/85 backdrop-blur-2xl border border-black/25 shadow-[0_8px_30px_rgba(0,0,0,0.08)] rounded-full px-4 sm:px-6 md:px-7 py-3 sm:py-2.5 ring-1 ring-white/60 transition-all duration-300">
            
//             {/* 1. Left: Foundation Logo */}
//             <Link
//               to="/"
//               className="flex items-center shrink-0"
//               aria-label="St. Genevieve Foundation Home"
//               onClick={() => setIsOpen(false)}
//             >
//               <img
//                 src={loadingLogo}
//                 alt="St. Genevieve Foundation"
//                 className="h-9 sm:h-10 md:h-11 w-auto object-contain"
//               />
//             </Link>

//             {/* 2. Center: Menu Toggle */}
//             <button
//               onClick={() => setIsOpen(!isOpen)}
//               className="flex items-center gap-2 text-[#12312B] hover:text-[#2A4640] font-sans font-semibold tracking-wider text-xs sm:text-sm uppercase transition-colors group cursor-pointer shrink-0"
//               aria-label={isOpen ? "Close Menu" : "Open Menu"}
//               aria-expanded={isOpen}
//             >
//               <span className="hidden sm:inline">
//                 {isOpen ? "CLOSE" : "MENU"}
//               </span>

//               <span className="p-1.5 rounded-full bg-[#12312B]/5 group-hover:bg-[#12312B]/10 transition-colors">
//                 {isOpen ? (
//                   <CustomCloseIcon size={21} color="#12312B" />
//                 ) : (
//                   <CustomMenuIcon size={21} color="#12312B" />
//                 )}
//               </span>
//             </button>

//             {/* 3. Right: Donate Button */}
//             <Link
//               to="/donate"
//               onClick={() => setIsOpen(false)}
//               className="group flex items-center gap-1.5 sm:gap-2 bg-[#12312B] hover:bg-[#EBB433] text-white hover:text-[#12312B] px-4 sm:px-5 py-2 sm:py-2 rounded-full text-[11px] sm:text-xs md:text-sm font-medium whitespace-nowrap transition-all duration-300 shrink-0"
//             >
//               <span>DONATE NOW</span>
//               <span className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
//                 <CustomArrowUpRight size={14} color="currentColor" />
//               </span>
//             </Link>

//           </div>
//         </div>
//       </header>

//       {/* Fullscreen Navigation Drawer */}
//       <AnimatePresence>
//         {isOpen && (
//           <motion.div
//             initial={{ opacity: 0, y: "-100%" }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: "-100%" }}
//             transition={{
//               duration: 0.6,
//               ease: [0.76, 0, 0.24, 1],
//             }}
//             data-lenis-prevent
//             onWheel={(e) => e.stopPropagation()}
//             onTouchMove={(e) => e.stopPropagation()}
//             style={{ WebkitOverflowScrolling: "touch" }}
//             className="fixed inset-0 z-40 h-dvh overflow-y-auto overscroll-y-contain bg-[#12312B] text-white"
//           >
//             <div className="min-h-full flex flex-col justify-between pt-28 pb-8 sm:pb-12 px-6 sm:px-8 md:px-20">

//               {/* Desktop Close Button */}
//               <div className="hidden md:block absolute top-6 right-6 md:right-16">
//                 <button
//                   onClick={() => setIsOpen(false)}
//                   className="flex items-center gap-2 text-white hover:text-[#EBB433] transition-colors text-sm font-semibold uppercase tracking-widest cursor-pointer p-3"
//                 >
//                   <span>CLOSE</span>
//                   <CustomCloseIcon size={24} color="#FFFFFF" />
//                 </button>
//               </div>

//               {/* Navigation Content */}
//               <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center flex-1 py-12">

//                 {/* Navigation Links */}
//                 <nav className="flex flex-col space-y-3 sm:space-y-4">
//                   {navLinks.map((link, idx) => (
//                     <motion.div
//                       key={link.name}
//                       initial={{ opacity: 0, x: -30 }}
//                       animate={{ opacity: 1, x: 0 }}
//                       transition={{
//                         delay: 0.1 + idx * 0.08,
//                         duration: 0.5,
//                       }}
//                     >
//                       <button
//                         onClick={() => handleNavigation(link.path)}
//                         className="group flex items-center gap-4 font-heading text-4xl sm:text-5xl md:text-6xl lg:text-6xl font-bold uppercase tracking-tight text-white/90 hover:text-[#EBB433] transition-all duration-300 text-left cursor-pointer"
//                       >
//                         <span className="transition-transform duration-300 group-hover:translate-x-2">
//                           {link.name}
//                         </span>

//                         <span className="w-9 h-9 sm:w-11 sm:h-11 rounded-full border border-[#EBB433]/70 flex items-center justify-center opacity-0 scale-75 -translate-x-3 group-hover:opacity-100 group-hover:scale-100 group-hover:translate-x-0 transition-all duration-300 shrink-0">
//                           <CustomArrowUpRight size={19} color="#EBB433" />
//                         </span>
//                       </button>
//                     </motion.div>
//                   ))}
//                 </nav>

//                 {/* Sidebar Information */}
//                 <motion.div
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 0.4, duration: 0.6 }}
//                   className="font-sans space-y-8 border-t lg:border-t-0 lg:border-l border-white/15 pt-8 lg:pt-0 lg:pl-16 text-neutral-300 text-sm md:text-base"
//                 >
//                   <div>
//                     <h4 className="text-[#EBB433] uppercase text-xs tracking-widest font-semibold mb-3">
//                       Contact Foundation
//                     </h4>
//                     <p className="text-white font-medium text-lg">
//                       info@stgenevievefoundation.org
//                     </p>
//                     <p className="text-neutral-400 mt-1">
//                       +234 (0) 123 456 7890
//                     </p>
//                   </div>

//                   <div>
//                     <h4 className="text-[#EBB433] uppercase text-xs tracking-widest font-semibold mb-3">
//                       Headquarters
//                     </h4>
//                     <p className="text-white">Lagos, Nigeria</p>
//                     <p className="text-neutral-400 mt-1">
//                       Nurturing mothers and children across communities.
//                     </p>
//                   </div>

//                   <div className="pt-4 flex flex-wrap gap-4">
//                     <Link
//                       to="/volunteer"
//                       onClick={() => setIsOpen(false)}
//                       className="inline-flex items-center gap-2 bg-[#EBB433] text-[#12312B] px-6 py-3 rounded-full font-semibold text-sm hover:bg-[#E6A100] transition-colors"
//                     >
//                       <span>Become a Volunteer</span>
//                       <CustomArrowUpRight size={16} color="#12312B" />
//                     </Link>
//                   </div>
//                 </motion.div>
//               </div>

//               {/* Drawer Footer */}
//               <div className="flex flex-col sm:flex-row items-center justify-between border-t border-white/10 pt-6 text-xs text-neutral-400 gap-3">
//                 <p>
//                   © {new Date().getFullYear()} St. Genevieve Maternal and Child Welfare Foundation.
//                 </p>
//                 <p className="text-[#EBB433] tracking-widest uppercase font-semibold">
//                   Giving Back & Nurturing Lives
//                 </p>
//               </div>

//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </>
//   );
// }


//VARIANT 2: Updated code with a more complex navbar and mobile menu with animations
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  CustomMenuIcon,
  CustomCloseIcon,
  CustomArrowUpRight,
} from "@/components/ui/CustomIcons";
import loadingLogo from "@/assets/loadingLogo.png";
import mainLogo from "@/assets/main.png";

const EASE = [0.76, 0, 0.24, 1] as const;

// Origin of the circular reveal = the menu button (top right)
const CLIP_ORIGIN = "at calc(100% - 44px) 44px";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const reduceMotion = useReducedMotion();

  const navLinks = [
    { name: "About Us", path: "/about" },
    { name: "Programs", path: "/programs" },
    { name: "Impact", path: "/impact" },
    { name: "Blog", path: "/blog" },
    { name: "Contact", path: "/contact" },
  ];

  // Scroll tracking: drives the mobile logo -> icon swap
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 30);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock background scroll while the menu is open + close on Escape
  useEffect(() => {
    if (!isOpen) return;

    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;
    const prevOverflow = document.body.style.overflow;
    const prevPadding = document.body.style.paddingRight;

    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setIsOpen(false);
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = prevOverflow;
      document.body.style.paddingRight = prevPadding;
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen]);

  const handleNavigation = (path: string) => {
    setIsOpen(false);
    navigate(path);
  };

  return (
    <>
      {/* ───────────── Header ───────────── */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 bg-white px-5 sm:px-8 transition-all duration-500 ${
          isScrolled
            ? "py-3 shadow-[0_1px_0_rgba(18,49,43,0.08)]"
            : "py-5"
        }`}
      >
        <div className="relative mx-auto flex h-12 max-w-7xl items-center justify-between">
          
          {/* Left: Desktop Nav Links (Not All Caps, Green Color, Underline on Hover) */}
          <nav className="hidden xl:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="group relative font-heading text-base font-semibold text-[#12312B] transition-colors"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 h-0.5 w-full origin-left scale-x-0 bg-[#12312B] transition-transform duration-300 group-hover:scale-x-100" />
              </Link>
            ))}
          </nav>

          {/* Centre: Logo */}
          <Link
            to="/"
            aria-label="Home"
            className={`absolute top-1/2 -translate-y-1/2 flex items-center transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] xl:left-1/2 xl:-translate-x-1/2 ${
              isScrolled
                ? "left-0 translate-x-0"
                : "left-1/2 -translate-x-1/2"
            }`}
          >
            {/* Desktop logo */}
            <img
              src={loadingLogo}
              alt="Foundation logo"
              className="hidden xl:block h-11 w-auto object-contain"
            />

            {/* Mobile logo swap */}
            <span className="xl:hidden block">
              <AnimatePresence mode="wait" initial={false}>
                <motion.img
                  key={isScrolled ? "icon" : "full"}
                  src={isScrolled ? mainLogo : loadingLogo}
                  alt="Foundation logo"
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.85 }}
                  transition={{ duration: 0.2 }}
                  className={`w-auto object-contain ${
                    isScrolled ? "h-8" : "h-9"
                  }`}
                />
              </AnimatePresence>
            </span>
          </Link>

          {/* Right: button (+ menu trigger on mobile) */}
          <div className="ml-auto flex items-center gap-2.5">
            {/* Desktop CTA, always visible */}
            <Link
              to="/donate"
              className="group hidden xl:inline-flex items-center gap-2 rounded-full bg-[#12312B] px-6 py-3 text-xs font-medium tracking-wider uppercase text-white transition-all duration-300 hover:bg-[#E6A100] hover:text-[#12312B]"
            >
              <span>SUPPORT MISSION</span>
              <span className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                <CustomArrowUpRight size={14} color="currentColor" />
              </span>
            </Link>

            {/* Mobile CTA: only appears once scrolled */}
            <AnimatePresence>
              {isScrolled && (
                <motion.div
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 12 }}
                  transition={{ duration: 0.3, ease: EASE }}
                  className="xl:hidden"
                >
                  <Link
                    to="/donate"
                    className="inline-flex items-center rounded-full bg-[#12312B] px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white transition-colors duration-300 hover:bg-[#E6A100] hover:text-[#12312B]"
                  >
                    Support
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Menu trigger: mobile / tablet only */}
            <button
              onClick={() => setIsOpen(true)}
              className="xl:hidden flex h-10 w-10 items-center justify-center rounded-full text-[#12312B] transition-colors hover:bg-[#12312B]/5 cursor-pointer"
              aria-label="Open menu"
              aria-expanded={isOpen}
            >
              <CustomMenuIcon size={22} color="#12312B" />
            </button>
          </div>
        </div>
      </header>

      {/* ───────────── Mobile menu (Full Screen Guaranteed) ───────────── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="drawer"
            initial={
              reduceMotion
                ? { opacity: 0 }
                : { clipPath: `circle(0% ${CLIP_ORIGIN})` }
            }
            animate={
              reduceMotion
                ? { opacity: 1 }
                : { clipPath: `circle(150% ${CLIP_ORIGIN})` }
            }
            exit={
              reduceMotion
                ? { opacity: 0 }
                : { clipPath: `circle(0% ${CLIP_ORIGIN})` }
            }
            transition={{ duration: 0.8, ease: EASE }}
            data-lenis-prevent
            onWheel={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
            style={{ WebkitOverflowScrolling: "touch" }}
            className="xl:hidden fixed inset-0 z-[60] h-dvh w-screen overflow-y-auto overscroll-y-contain bg-white text-[#12312B]"
          >
            {/* Rainbow edge on the right */}
            <motion.div
              aria-hidden
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.9, delay: 0.25, ease: EASE }}
              className="pointer-events-none fixed inset-y-0 right-0 w-[30%] max-w-[140px] overflow-hidden"
            >
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to right, rgba(255,255,255,0) 0%, #FFF1CC 9%, #F7CF6B 22%, #E6A100 34%, #EE7A2E 46%, #CD2700 57%, #8E3F8F 68%, #5069E1 80%, #3F5B8C 91%, #596F6B 100%)",
                }}
              />

              {[
                { c: "#FFD36B", pos: "top-[4%] -left-8 h-56 w-32", d: 8, y: 26 },
                { c: "#CD2700", pos: "top-[30%] left-1 h-60 w-32", d: 10, y: -30 },
                { c: "#5069E1", pos: "top-[56%] left-3 h-64 w-32", d: 9, y: 28 },
                { c: "#8FA5F5", pos: "top-[76%] left-0 h-48 w-28", d: 11, y: -24 },
                { c: "#596F6B", pos: "-bottom-10 right-0 h-52 w-28", d: 12, y: 20 },
              ].map((b, i) => (
                <motion.div
                  key={i}
                  className={`absolute rounded-full blur-2xl opacity-70 ${b.pos}`}
                  style={{ backgroundColor: b.c }}
                  animate={reduceMotion ? undefined : { y: [0, b.y, 0] }}
                  transition={{
                    duration: b.d,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              ))}

              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(115deg, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0) 40%, rgba(255,255,255,0.12) 100%)",
                }}
              />
            </motion.div>

            <div className="relative flex min-h-full flex-col px-6 sm:px-10 pr-[calc(30%+8px)] sm:pr-[150px] pb-8">
              {/* Top row: logo */}
              <div className="flex h-[76px] shrink-0 items-center justify-between">
                <img
                  src={mainLogo}
                  alt="Foundation logo"
                  className="h-8 w-auto object-contain"
                />
              </div>

              {/* Close Button: Solid Dark Green Background */}
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Close menu"
                className="group fixed right-5 top-5 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-[#12312B] shadow-lg cursor-pointer transition-all duration-300 hover:bg-[#2A4640] hover:scale-105"
              >
                <span className="transition-transform duration-300 group-hover:rotate-90">
                  <CustomCloseIcon size={20} color="#FFFFFF" />
                </span>
              </button>

              {/* Primary links */}
              <nav className="mt-8 flex flex-col gap-1">
                {[{ name: "Home", path: "/" }, ...navLinks].map((link, idx) => (
                  <div key={link.name} className="overflow-hidden py-1">
                    <motion.button
                      onClick={() => handleNavigation(link.path)}
                      initial={{ y: "110%" }}
                      animate={{ y: 0 }}
                      transition={{
                        delay: 0.35 + idx * 0.07,
                        duration: 0.7,
                        ease: EASE,
                      }}
                      className="group flex w-full items-center gap-3 text-left font-heading text-4xl sm:text-5xl md:text-6xl font-bold uppercase leading-[1.1] tracking-tight text-[#12312B] hover:text-[#E6A100] transition-colors duration-300 cursor-pointer"
                    >
                      <span className="transition-transform duration-300 group-hover:translate-x-2">
                        {link.name}
                      </span>
                      <span className="opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                        <CustomArrowUpRight size={22} color="#E6A100" />
                      </span>
                    </motion.button>
                  </div>
                ))}
              </nav>

              {/* Secondary info + CTA */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.6, ease: EASE }}
                className="mt-auto pt-12 font-sans"
              >
                <div className="space-y-2 text-sm font-semibold">
                  <Link
                    to="/volunteer"
                    onClick={() => setIsOpen(false)}
                    className="block"
                  >
                    Become a volunteer
                  </Link>
                  <a
                    href="mailto:info@stgenevievefoundation.org"
                    className="block text-[#12312B]/60 font-medium break-all"
                  >
                    info@stgenevievefoundation.org
                  </a>
                  <p className="text-[#12312B]/60 font-medium">
                    +234 (0) 123 456 7890 · Lagos, Nigeria
                  </p>
                </div>

                <Link
                  to="/donate"
                  onClick={() => setIsOpen(false)}
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-[#12312B] py-4 text-xs font-medium tracking-wider uppercase text-white transition-colors duration-300 hover:bg-[#E6A100] hover:text-[#12312B]"
                >
                  <span>SUPPORT MISSION</span>
                  <CustomArrowUpRight size={16} color="currentColor" />
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}