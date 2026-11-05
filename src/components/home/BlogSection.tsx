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

/* Variants — the card is the parent; its children inherit and stagger */
const itemVariants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

const wordVariants = {
  hidden: { opacity: 0, y: 28, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: EASE },
  },
};

export default function BlogSection() {
  const reduceMotion = useReducedMotion();

  const reveal = (delay = 0) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-50px" },
    transition: {
      duration: 0.8,
      delay,
      ease: EASE,
    },
  });

  // Card variants: the card pops in, then its contents follow one by one
  const cardVariants = (index: number) => ({
    hidden: { opacity: 0, y: 36, scale: 0.94 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 140,
        damping: 16,
        mass: 0.9,
        delay: 0.1 + index * 0.14,
        delayChildren: 0.25 + index * 0.14,
        staggerChildren: 0.09,
      },
    },
  });

  const imageWrapVariants = {
    hidden: { clipPath: "inset(0 0 100% 0)" },
    show: {
      clipPath: "inset(0 0 0% 0)",
      transition: { duration: 0.9, ease: EASE },
    },
  };

  const imageVariants = {
    hidden: { scale: 1.25 },
    show: { scale: 1, transition: { duration: 1.4, ease: EASE } },
  };

  const lineVariants = {
    hidden: { scaleX: 0 },
    show: { scaleX: 1, transition: { duration: 0.9, ease: EASE } },
  };

  return (
    <section
      id="blog-section"
      className="relative isolate overflow-hidden bg-white px-5 py-20 font-sans text-[#12312B] sm:px-10 sm:py-24 lg:px-16 lg:py-28"
    >
      {/* Faint dotted background — drifts very slowly */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage:
            "radial-gradient(rgba(18,49,43,0.2) 0.8px, transparent 0.8px)",
          backgroundSize: "18px 18px",
          opacity: 0.12,
        }}
        animate={
          reduceMotion
            ? undefined
            : { backgroundPosition: ["0px 0px", "18px 18px"] }
        }
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />

      <div className="relative z-10 mx-auto max-w-[1300px]">
        {/* Section Header */}
        <div className="mx-auto mb-14 max-w-[720px] text-center lg:mb-16">
          <motion.h2
            aria-label={HEADING_LINES.join(" ")}
            initial={reduceMotion ? false : "hidden"}
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.07 } },
            }}
            className="font-sans text-[clamp(2.4rem,5vw,4.4rem)] font-semibold leading-[1] tracking-[-0.035em] text-[#12312B]"
          >
            {HEADING_LINES.map((line) => (
              <span key={line} className="block" aria-hidden="true">
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
            {...reveal(0.45)}
            className="mx-auto mt-5 max-w-[570px] font-sans text-sm leading-[1.85] text-[#12312B]/70 sm:text-[15px]"
          >
            Explore stories, updates, and expert perspectives on maternal care,
            child welfare, digital innovation, and community development.
          </motion.p>
        </div>

        {/* Blog Cards Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {BLOG_POSTS.map((post, index) => (
            <motion.article
              key={post.title}
              initial={reduceMotion ? false : "hidden"}
              whileInView="show"
              viewport={{ once: true, margin: "-50px" }}
              variants={cardVariants(index)}
              className="relative flex flex-col overflow-hidden rounded-md border border-gray-200 bg-white"
            >
              {/* Thumbnail — wipes open, then settles from a slight zoom */}
              <motion.a
                variants={imageWrapVariants}
                href={post.href}
                tabIndex={-1}
                aria-hidden="true"
                className="relative block aspect-[16/9] w-full overflow-hidden bg-[#12312B]/5"
              >
                <motion.img
                  variants={imageVariants}
                  src={post.image}
                  alt=""
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </motion.a>

              {/* Content — each line arrives in turn */}
              <div className="flex flex-1 flex-col p-5 text-left">
                <motion.div
                  variants={itemVariants}
                  className="flex items-center gap-2.5 font-sans text-[11px] font-medium text-[#12312B]/55"
                >
                  <span>{post.date}</span>
                  <span className="h-3 w-px bg-[#12312B]/20" />
                  <span>{post.readTime}</span>
                </motion.div>

                <motion.h3
                  variants={itemVariants}
                  className="mt-3 line-clamp-2 font-sans text-[1.05rem] font-semibold leading-[1.35] tracking-[-0.015em] text-[#12312B] sm:text-[1.1rem]"
                >
                  {post.title}
                </motion.h3>

                <motion.p
                  variants={itemVariants}
                  className="mt-2 line-clamp-2 font-sans text-[13px] leading-[1.7] text-[#12312B]/60"
                >
                  {post.excerpt}
                </motion.p>

                {/* Divider draws across, then the footer fades in */}
                <div className="mt-5">
                  <motion.span
                    variants={lineVariants}
                    className="block h-px w-full origin-left bg-[#12312B]/[0.08]"
                  />

                  <motion.div
                    variants={itemVariants}
                    className="flex items-center justify-between pt-4"
                  >
                    <a
                      href={post.href}
                      className="font-sans text-[10px] font-semibold uppercase tracking-[0.14em] text-[#12312B] after:absolute after:inset-0 after:content-['']"
                    >
                      Read Article
                    </a>

                    <span className="flex h-8 w-8 items-center justify-center rounded border border-gray-200 text-[#12312B]">
                      <ArrowUpRight size={14} strokeWidth={2} />
                    </span>
                  </motion.div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}