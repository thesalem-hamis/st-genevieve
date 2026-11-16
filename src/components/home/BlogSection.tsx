
import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "lucide-react";

const EASE = [0.76, 0, 0.24, 1] as const;

const BLOG_POSTS = [
  {
    date: "October 3, 2026",
    readTime: "6 min read",
    title: "Where Creative Design Meets Smart Development Solutions",
    excerpt:
      "This blog bridges the gap between creativity and technology. Learn how design thinking and modern web systems empower our community impact.",
    image:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1000&q=85",
    href: "/blog/creative-design-meets-smart-development",
  },
  {
    date: "January 8, 2027",
    readTime: "10 min read",
    title: "Exploring Innovation Through Design and Web Development",
    excerpt:
      "Dive into the latest trends, tools, and techniques shaping the future of digital platforms and community outreach systems.",
    image:
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1000&q=85",
    href: "/blog/exploring-innovation-through-design",
  },
  {
    date: "March 24, 2027",
    readTime: "14 min read",
    title: "Design Ideas, Development Tips, and Creative Solutions",
    excerpt:
      "Your go-to space for actionable insights on design trends, development practices, and creative strategies for social foundations.",
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1000&q=85",
    href: "/blog/design-ideas-development-tips",
  },
];

const HEADING_LINES = ["Stories From the", "Heart of Our Work."];

const wordVariants = {
  hidden: { opacity: 0, y: 28, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: EASE },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 35 },
  show: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay: index * 0.14,
      ease: EASE,
    },
  }),
};

const imageVariants = {
  hidden: { scale: 1.12 },
  show: {
    scale: 1,
    transition: { duration: 1.2, ease: EASE },
  },
};

export default function BlogSection() {
  const reduceMotion = useReducedMotion();

  const reveal = (delay = 0) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 22 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-50px" },
    transition: {
      duration: 0.8,
      delay,
      ease: EASE,
    },
  });

  return (
    <section
      id="blog-section"
      className="relative isolate overflow-hidden bg-white px-5 py-20 font-sans text-[#12312B] sm:px-10 sm:py-24 lg:px-16 lg:py-28"
    >
      {/* Subtle background texture */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage:
            "radial-gradient(rgba(18,49,43,0.2) 0.8px, transparent 0.8px)",
          backgroundSize: "20px 20px",
          opacity: 0.09,
        }}
        animate={
          reduceMotion
            ? undefined
            : { backgroundPosition: ["0px 0px", "20px 20px"] }
        }
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1300px]">

        {/* Section Heading */}
        <div className="mx-auto mb-14 max-w-[760px] text-center lg:mb-20">

          <motion.div
            {...reveal()}
            className="mb-6 flex items-center justify-center gap-3"
          >
            <span className="h-px w-8 bg-[#E6A100]" />
            <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.22em] text-[#12312B]/65 sm:text-xs">
              The Journal
            </span>
            <span className="h-px w-8 bg-[#E6A100]" />
          </motion.div>

          <motion.h2
            aria-label={HEADING_LINES.join(" ")}
            initial={reduceMotion ? false : "hidden"}
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            variants={{
              hidden: {},
              show: {
                transition: { staggerChildren: 0.07 },
              },
            }}
            className="font-sans text-[clamp(2.5rem,5.5vw,4.6rem)] font-semibold leading-[1.02] tracking-[-0.045em] text-[#12312B]"
          >
            {HEADING_LINES.map((line) => (
              <span
                key={line}
                className="block"
                aria-hidden="true"
              >
                {line.split(" ").map((word, i) => (
                  <motion.span
                    key={`${word}-${i}`}
                    variants={wordVariants}
                    className="inline-block"
                  >
                    {word}
                    {"\u00A0"}
                  </motion.span>
                ))}
              </span>
            ))}
          </motion.h2>

          <motion.p
            {...reveal(0.35)}
            className="mx-auto mt-6 max-w-[550px] font-sans text-sm leading-[1.9] text-[#12312B]/65 sm:text-[15px]"
          >
            Explore stories, updates, and perspectives on maternal care,
            child welfare, and the work shaping stronger communities.
          </motion.p>
        </div>

        {/* Blog Cards */}
        <div className="grid grid-cols-1 gap-x-7 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-10">

          {BLOG_POSTS.map((post, index) => (
            <motion.article
              key={post.title}
              custom={index}
              initial={reduceMotion ? false : "hidden"}
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              variants={cardVariants}
              className="group relative flex flex-col"
            >
              {/* Image */}
              <a
                href={post.href}
                aria-label={`Read ${post.title}`}
                className="relative mb-6 block overflow-hidden bg-[#12312B]/5 aspect-[1.38/1]"
              >
                <motion.img
                  variants={imageVariants}
                  src={post.image}
                  alt=""
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-1000 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-[1.06]"
                />

                {/* Image overlay */}
                <div className="absolute inset-0 bg-[#12312B]/0 transition-colors duration-500 group-hover:bg-[#12312B]/10" />

                {/* Image corner label */}
                <div className="absolute bottom-0 left-0 bg-[#12312B] px-4 py-3 transition-colors duration-300 group-hover:bg-[#E6A100]">
                  <span className="font-sans text-[9px] font-semibold uppercase tracking-[0.17em] text-white">
                    Foundation Journal
                  </span>
                </div>

                {/* Hover arrow */}
                <div className="absolute right-4 top-4 flex h-10 w-10 translate-y-2 items-center justify-center rounded-full bg-[#E6A100] text-[#12312B] opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  <ArrowUpRight size={19} strokeWidth={1.8} />
                </div>
              </a>

              {/* Metadata */}
              <div className="mb-4 flex items-center gap-3 font-sans text-[10px] font-medium uppercase tracking-[0.12em] text-[#12312B]/50">
                <span>{post.date}</span>
                <span className="h-3 w-px bg-[#12312B]/20" />
                <span>{post.readTime}</span>
              </div>

              {/* Title */}
              <h3 className="max-w-[95%] font-sans text-[1.2rem] font-semibold leading-[1.3] tracking-[-0.025em] text-[#12312B] transition-colors duration-300 group-hover:text-[#A97800] sm:text-[1.3rem]">
                <a href={post.href}>
                  {post.title}
                </a>
              </h3>

              {/* Excerpt */}
              <p className="mt-3 line-clamp-3 font-sans text-[13px] leading-[1.85] text-[#12312B]/60">
                {post.excerpt}
              </p>

              {/* Footer */}
              <div className="mt-6 flex items-center justify-between border-t border-[#12312B]/10 pt-4">

                <a
                  href={post.href}
                  className="relative inline-flex items-center gap-2 font-sans text-[10px] font-semibold uppercase tracking-[0.16em] text-[#12312B] after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-[#E6A100] after:transition-transform after:duration-500 group-hover:after:scale-x-100"
                >
                  Read Article
                </a>

                <a
                  href={post.href}
                  aria-label={`Read ${post.title}`}
                  tabIndex={-1}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-[#12312B]/15 text-[#12312B] transition-all duration-500 group-hover:rotate-45 group-hover:border-[#E6A100] group-hover:bg-[#E6A100] group-hover:text-[#12312B]"
                >
                  <ArrowUpRight size={16} strokeWidth={1.8} />
                </a>

              </div>
            </motion.article>
          ))}

        </div>

        {/* View All Articles */}
        <motion.div
          {...reveal(0.25)}
          className="mt-16 flex justify-center lg:mt-20"
        >
          <a
            href="/blog"
            className="group relative inline-flex items-center gap-4 overflow-hidden rounded-full border border-[#12312B]/20 px-7 py-4 font-sans text-[10px] font-semibold uppercase tracking-[0.17em] text-[#12312B] transition-all duration-500 hover:border-[#12312B] hover:bg-[#12312B] hover:text-white"
          >
            <span>Explore All Stories</span>
            <ArrowUpRight
              size={15}
              className="transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </a>
        </motion.div>

      </div>
    </section>
  );
}
