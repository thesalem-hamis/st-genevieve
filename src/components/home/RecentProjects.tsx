import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { CustomArrowUpRight } from "@/components/ui/CustomIcons";

const EASE = [0.76, 0, 0.24, 1] as const;

const PROJECTS = [
  {
    id: "01",
    category: "Maternal Healthcare",
    title: "Care that reaches every mother.",
    description:
      "Supporting mothers through improved access to healthcare, maternal education and essential community resources.",
    location: "Lagos, Nigeria",
    status: "Ongoing",
    impact: "850+ Mothers Supported",
    date: "Jan 15, 2026",
    readTime: "4 min read",
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=85",
    imageAlt: "Healthcare professional providing care",
  },
  {
    id: "02",
    category: "Child Welfare",
    title: "Every child deserves a future.",
    description:
      "Creating opportunities for children through access to care, education and the support they need to thrive.",
    location: "Nigeria",
    status: "Ongoing",
    impact: "1,200+ Students Supported",
    date: "Jan 15, 2026",
    readTime: "4 min read",
    image:
      "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=1200&q=85",
    imageAlt: "Children enjoying a moment together",
  },
  {
    id: "03",
    category: "Skills Development",
    title: "Empowering women to grow.",
    description:
      "Helping women develop practical skills, build confidence and create more sustainable futures for their families.",
    location: "Nigeria",
    status: "Ongoing",
    impact: "500+ Women Empowered",
    date: "Jan 15, 2026",
    readTime: "5 min read",
    image:
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=85",
    imageAlt: "Women collaborating during a development programme",
  },
];

function AnimatedButton({
  to,
  children,
}: {
  to: string;
  children: string;
}) {
  return (
    <Link
      to={to}
      className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-full bg-[#E6A100] px-6 py-3 font-sans text-[11px] font-medium uppercase tracking-wider text-[#12312B] shadow-[0_0_0_0_rgba(18,49,43,0)] transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] hover:scale-[1.04] hover:text-white hover:shadow-[0_14px_32px_-10px_rgba(18,49,43,0.5)] active:scale-95 sm:px-7 sm:py-3.5 sm:text-xs"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-1/2 aspect-square w-[160%] -translate-x-1/2 translate-y-1/2 scale-0 rounded-full bg-[#12312B] transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-100"
      />

      <span className="relative block overflow-hidden leading-[1.5]">
        <span className="block transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full">
          {children}
        </span>

        <span
          aria-hidden="true"
          className="absolute inset-0 block translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-y-0"
        >
          {children}
        </span>
      </span>

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
  );
}

export default function RecentProject() {
  const [activeIndex, setActiveIndex] = useState(0);
  const reduceMotion = useReducedMotion();

  const activeProject = PROJECTS[activeIndex];
  const nextProject = PROJECTS[(activeIndex + 1) % PROJECTS.length];

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % PROJECTS.length);
  };

  const prevSlide = () => {
    setActiveIndex(
      (prev) => (prev - 1 + PROJECTS.length) % PROJECTS.length
    );
  };

  const reveal = (delay = 0) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-60px" },
    transition: {
      duration: 0.8,
      delay,
      ease: EASE,
    },
  });

  return (
    <section
      id="recent-projects"
      className="relative overflow-hidden bg-[#F4F5F7] px-5 py-20 text-[#12312B] sm:px-10 sm:py-28 lg:px-16 lg:py-32"
    >
      <div className="mx-auto max-w-[1400px]">

        {/* Section Introduction */}
        <div className="mx-auto mb-10 max-w-[700px] text-center sm:mb-14 lg:mb-16">

          <motion.span
            {...reveal()}
            className="inline-flex items-center gap-2 rounded-sm bg-[#E6A100] px-3 py-1.5 font-sans text-[9px] font-semibold uppercase tracking-[0.12em] text-[#12312B] sm:text-[10px]"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#12312B]" />
            Our Projects
          </motion.span>

          {/* Adjusted font size and spacing for mobile text spreading */}
          <motion.h2
            {...reveal(0.08)}
            className="mt-5 font-sans text-[clamp(2.1rem,4.8vw,4.5rem)] font-semibold leading-[1.05] tracking-[-0.025em] text-[#12312B]"
          >
            Projects Creating{" "}
            <span className="block">Community Impact</span>
          </motion.h2>

          <motion.p
            {...reveal(0.16)}
            className="mx-auto mt-4 max-w-[510px] font-sans text-[12px] leading-[1.8] text-[#12312B]/65 sm:mt-5 sm:text-[13px]"
          >
            Our initiatives focus on education, healthcare, and community
            development to improve lives and create brighter futures for
            children and families.
          </motion.p>
        </div>

        {/* Projects Carousel */}
        <motion.div {...reveal(0.2)} className="relative">

          <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_270px]">

            {/* Main Project */}
            <div className="relative min-w-0">

              <AnimatePresence mode="wait">
                <motion.article
                  key={activeProject.id}
                  initial={
                    reduceMotion ? false : { opacity: 0, x: 35 }
                  }
                  animate={{ opacity: 1, x: 0 }}
                  exit={
                    reduceMotion
                      ? undefined
                      : { opacity: 0, x: -25 }
                  }
                  transition={{ duration: 0.55, ease: EASE }}
                  className="grid min-h-0 overflow-hidden rounded-[12px] bg-[#12312B] lg:min-h-[420px] lg:grid-cols-[1.08fr_0.92fr] lg:rounded-[15px]"
                >

                  {/* Image */}
                  <div className="group relative min-h-[185px] overflow-hidden p-2.5 sm:min-h-[260px] sm:p-4 lg:min-h-full">
                    <div className="relative h-full min-h-[180px] overflow-hidden rounded-[8px] sm:min-h-[240px] lg:min-h-0">

                      <img
                        src={activeProject.image}
                        alt={activeProject.imageAlt}
                        loading="lazy"
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.04]"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-[#12312B]/70 via-transparent to-transparent" />

                      {/* Number */}
                      <div className="absolute left-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-[#E6A100] font-heading text-lg font-normal text-[#12312B] sm:left-5 sm:top-5 sm:h-11 sm:w-11 sm:text-xl">
                        {activeProject.id}
                      </div>

                      {/* Status */}
                      <span className="absolute bottom-4 left-4 rounded-full bg-[#12312B]/90 px-3 py-1.5 font-sans text-[8px] font-semibold uppercase tracking-[0.14em] text-[#E6A100] backdrop-blur-sm sm:bottom-5 sm:left-5 sm:px-4 sm:py-2 sm:text-[9px]">
                        {activeProject.status}
                      </span>
                    </div>
                  </div>

                  {/* Project Content */}
                  <div className="flex flex-col items-center justify-center px-5 pb-6 pt-3 text-center sm:px-9 sm:pb-9 sm:pt-5 lg:px-9 lg:py-10 xl:px-12">

                    <div className="mb-4 flex flex-wrap items-center justify-center gap-2 font-sans text-[9px] text-white/55 sm:mb-6 sm:text-[11px]">
                      <span>{activeProject.date}</span>
                      <span className="h-1 w-1 rounded-full bg-[#E6A100]" />
                      <span>{activeProject.readTime}</span>
                    </div>

                    <span className="mb-2 font-sans text-[9px] font-semibold uppercase tracking-[0.18em] text-[#E6A100] sm:mb-3 sm:text-[10px]">
                      {activeProject.category}
                    </span>

                    <h3 className="max-w-[390px] font-heading text-[clamp(1.85rem,3vw,3rem)] font-normal leading-[0.98] tracking-[-0.02em] text-white sm:text-[clamp(2.2rem,3.5vw,3.2rem)]">
                      {activeProject.title}
                    </h3>

                    <p className="mt-3 max-w-[400px] font-sans text-[11px] leading-[1.75] text-white/65 sm:mt-5 sm:text-[13px]">
                      {activeProject.description}
                    </p>

                    {/* Impact - White */}
                    <h4 className="mt-4 font-heading text-[1.4rem] font-normal leading-none text-white sm:mt-6 sm:text-[1.7rem]">
                      {activeProject.impact}
                    </h4>

                    {/* CTA */}
                    <div className="mt-5 sm:mt-8">
                      <AnimatedButton to="/projects">
                        View Details
                      </AnimatedButton>
                    </div>
                  </div>
                </motion.article>
              </AnimatePresence>

              {/* Previous */}
              <button
                type="button"
                onClick={prevSlide}
                aria-label="Previous project"
                className="absolute -left-2 top-[32%] z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-[#E6A100] text-[#12312B] shadow-lg transition-all duration-300 hover:scale-105 hover:bg-[#12312B] hover:text-white sm:-left-5 sm:top-1/2 sm:h-[60px] sm:w-[60px] lg:-left-6"
              >
                <ChevronLeft size={22} strokeWidth={1.7} />
              </button>

              {/* Next */}
              <button
                type="button"
                onClick={nextSlide}
                aria-label="Next project"
                className="absolute -right-2 top-[32%] z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-[#E6A100] text-[#12312B] shadow-lg transition-all duration-300 hover:scale-105 hover:bg-[#12312B] hover:text-white sm:-right-5 sm:top-1/2 sm:h-[60px] sm:w-[60px] lg:-right-6"
              >
                <ChevronRight size={22} strokeWidth={1.7} />
              </button>
            </div>

            {/* Next Project Preview */}
            <button
              type="button"
              onClick={nextSlide}
              aria-label={`View next project: ${nextProject.title}`}
              className="group relative hidden min-w-0 overflow-hidden rounded-[15px] border-[5px] border-[#12312B] bg-[#12312B] text-left lg:block"
            >
              <img
                src={nextProject.image}
                alt={nextProject.imageAlt}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#12312B]/95 via-[#12312B]/30 to-[#12312B]/10" />

              <div className="absolute inset-x-0 bottom-0 p-6">
                <span className="font-sans text-[9px] font-semibold uppercase tracking-[0.18em] text-[#E6A100]">
                  Next Project
                </span>

                <h4 className="mt-3 font-heading text-3xl font-normal leading-[0.95] text-white">
                  {nextProject.title}
                </h4>

                <div className="mt-5 flex h-10 w-10 items-center justify-center rounded-full bg-[#E6A100] text-[#12312B] transition-transform duration-300 group-hover:translate-x-1">
                  <ArrowUpRight size={19} />
                </div>
              </div>
            </button>
          </div>

          {/* Carousel Footer (Arrow text link removed) */}
          <div className="mt-6 flex items-center justify-between sm:mt-7">
            <div className="flex items-center gap-2.5 sm:gap-3">
              {PROJECTS.map((project, index) => (
                <button
                  key={project.id}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  aria-label={`Go to project ${index + 1}`}
                  className={`h-[4px] rounded-full transition-all duration-500 ${
                    activeIndex === index
                      ? "w-10 bg-[#E6A100] sm:w-12"
                      : "w-4 bg-[#12312B]/20 hover:bg-[#5069E1] sm:w-5"
                  }`}
                />
              ))}

              <span className="ml-1.5 font-sans text-[9px] font-medium tracking-[0.12em] text-[#12312B]/55 sm:ml-2 sm:text-[10px]">
                0{activeIndex + 1} / 0{PROJECTS.length}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Bottom CTA (Top border divider line removed) */}
        <motion.div
          {...reveal(0.25)}
          className="mt-14 flex flex-col items-center pt-2 text-center sm:mt-20 lg:mt-24"
        >
          <p className="max-w-[420px] mt-[-35px] font-sans text-[12px] leading-[1.8] text-[#12312B]/65 sm:text-sm">
            There is always more we can do when we work together.
            Be part of the difference.
          </p>

          <div className="mt-6 sm:mt-7">
            <AnimatedButton to="/projects">
              View All Projects
            </AnimatedButton>
          </div>
        </motion.div>

      </div>
    </section>
  );
}