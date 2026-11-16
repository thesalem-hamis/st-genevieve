import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ChevronDown } from "lucide-react";
import founder from "@/assets/genevieve.jpeg"; // <- put her photo here
import AnimatedHeading from "@/components/about/AnimatedHeading";

const EASE = [0.76, 0, 0.24, 1] as const;

const BIO = [
  "Genevieve Sonia Nwokeide is a healthcare professional, nurse, midwife, and passionate advocate for maternal and child welfare. With a professional background in nursing and midwifery, she has developed a deep appreciation of the importance of compassionate healthcare, family wellbeing, education, and community support.",
  "Driven by a strong belief that every mother deserves dignity, every child deserves an opportunity to thrive, and every family deserves access to the support necessary to build a better future, she founded the St. Genevieve Maternal and Child Welfare Foundation to make a lasting difference in the lives of vulnerable mothers, children, and families.",
  "Her commitment to service extends beyond her professional responsibilities. She believes in the transformative power of giving, empowering individuals through education and skills development, and creating opportunities for people to overcome circumstances that might otherwise limit their potential.",
  "She envisions a future where no mother is denied essential care because of her circumstances, no child is deprived of opportunities because of their background, and families are empowered to live healthier, more secure and fulfilling lives.",
];

const VALUES = ["Faith", "Compassion", "Service", "Responsibility"];

const MESSAGE = [
  "The story of St. Genevieve Maternal and Child Welfare Foundation began in 2019 during my time working as a midwife in Nigeria.",
  "In the course of my work, I witnessed realities that deeply touched me. I saw mothers remain in hospitals for months after giving birth because they could not afford their medical bills. I witnessed families make difficult and sometimes detrimental healthcare decisions because of financial limitations. I saw women choose riskier methods of childbirth because of societal expectations, fear of what others might say, or simply because they lacked the financial means to access safer alternatives. I also witnessed newborns and young children suffer from malnutrition and illnesses associated with inadequate resources.",
  "These experiences made me realise that beyond providing clinical care, there was a greater need to support the human, emotional, and financial circumstances surrounding maternal and child health.",
  "I could not change everything, but I knew I could do something.",
  "In 2019, I began dedicating 10% of my salary towards supporting mothers, children, and families in need. What started as a personal commitment gradually developed into a greater vision. Following advice to formalise these charitable efforts, St. Genevieve Maternal and Child Welfare Foundation was officially established on 16 April 2022.",
  "The name St. Genevieve was inspired by St. Genevieve of Paris, a consecrated virgin, remembered for her devotion to prayer, leadership, and generosity, particularly her care for the poor. Her association with distributing loaves of bread inspired our slogan: “A Slice for a Better Smile.”",
  "To us, this represents a simple but profound belief: that even the smallest act of kindness can bring hope, restore dignity, and make a meaningful difference in another person's life.",
  "My aspiration is that no mother or child within our reach and capacity should receive less attention, care, or support than we are able to offer, whether emotionally, financially, or through healthcare. I believe that compassion should move beyond words and translate into practical action.",
  "Our vision extends beyond immediate assistance. Through maternal and child healthcare, education, skills development, and family empowerment, we hope to contribute to healthier families and stronger communities. We may not always know how far our efforts will take us, but we remain committed to recognising needs, responding with compassion, and growing our capacity to serve.",
  "I invite individuals, organisations, partners, and people of goodwill to join us on this journey. You do not have to possess extraordinary wealth or resources to make a difference. Every contribution, every act of kindness, and every helping hand matter.",
];

/* How many paragraphs show before "Read more" */
const PREVIEW_COUNT = 4;

const PULL_QUOTE_START = "I could not change everything";

/* Each paragraph softly comes into focus as it reaches the reading area,
   then gently fades back as the reader moves on. */
function FocusParagraph({
  children,
  pullQuote = false,
}: {
  children: string;
  pullQuote?: boolean;
}) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLParagraphElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.95", "end 0.2"],
  });

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [0.12, 1, 1, 0.35],
  );
  const y = useTransform(scrollYProgress, [0, 0.3], [16, 0]);
  const blur = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [5, 0, 0, 1.5]);
  const filter = useMotionTemplate`blur(${blur}px)`;

  const className = pullQuote
    ? "border-l-2 border-[#E6A100] pl-5 text-2xl font-medium leading-snug text-[#12312B] sm:text-3xl"
    : "text-base leading-[1.85] text-[#12312B]/90 sm:text-lg";

  if (reduceMotion) {
    return <p className={className}>{children}</p>;
  }

  return (
    <motion.p ref={ref} style={{ opacity, y, filter }} className={className}>
      {children}
    </motion.p>
  );
}

export default function AboutFounder() {
  const reduceMotion = useReducedMotion();
  const [open, setOpen] = useState(false);

  const reveal = (delay = 0) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-60px" },
    transition: { duration: 0.9, delay, ease: EASE },
  });

  const preview = MESSAGE.slice(0, PREVIEW_COUNT);
  const rest = MESSAGE.slice(PREVIEW_COUNT);

  return (
    <section className="relative overflow-hidden bg-white px-5 pb-16 pt-6 font-sans text-[#12312B] sm:px-6 sm:pb-20 lg:px-10 lg:pb-28">
      <div className="mx-auto max-w-[1400px]">
        {/* Founder profile */}
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <motion.div
            {...reveal(0)}
            className="relative lg:sticky lg:top-28 lg:self-start"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-[24px] bg-[#F7E3B2] lg:rounded-[32px]">
              <img
                src={founder}
                alt="Genevieve Sonia Nwokeide, Founder"
                loading="lazy"
                className="h-full w-full object-cover object-top"
              />
            </div>

            <div className="absolute inset-x-4 bottom-4 rounded-2xl border border-white/50 bg-white/75 p-4 backdrop-blur-xl sm:inset-x-6 sm:bottom-6 sm:p-5">
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#E6A100]">
                Founder
              </p>
              <p className="mt-1 text-lg font-medium leading-snug sm:text-xl">
                Genevieve Sonia Nwokeide
              </p>
            </div>
          </motion.div>

          <div>
            <motion.span
              {...reveal(0)}
              className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.16em] text-[#12312B]/60"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#E6A100]" />
              About the founder
            </motion.span>

            <AnimatedHeading
              as="h2"
              className="mt-4 max-w-[640px] font-sans text-[clamp(2rem,3.8vw,3.4rem)] font-semibold leading-[1.06] tracking-[-0.03em]"
            >
              A Midwife Who Chose To Do Something
            </AnimatedHeading>

            <div className="mt-8 space-y-5">
              {BIO.map((p, i) => (
                <motion.p
                  key={i}
                  {...reveal(0.05)}
                  className="max-w-[620px] text-sm leading-[1.85] text-[#12312B]/75 sm:text-[15px]"
                >
                  {p}
                </motion.p>
              ))}
            </div>

            <motion.div
              {...reveal(0.1)}
              className="mt-8 flex flex-wrap gap-2"
            >
              {VALUES.map((v) => (
                <span
                  key={v}
                  className="rounded-full bg-[#FBF1D4] px-4 py-1.5 text-xs font-medium text-[#12312B]"
                >
                  {v}
                </span>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Message from the founder */}
        <motion.div
          {...reveal(0)}
          className="relative mt-16 overflow-hidden rounded-[24px] bg-[#FBF1D4] px-6 py-10 sm:px-10 sm:py-14 lg:mt-24 lg:rounded-[32px] lg:px-14 lg:py-16"
        >
          {/* soft rings, same language as the mission cards */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -top-24 h-[320px] w-[320px] sm:h-[400px] sm:w-[400px]"
          >
            <span className="absolute inset-0 rounded-full border border-[#E6A100]/30" />
            <span className="absolute inset-[18%] rounded-full border border-[#E6A100]/30" />
            <span className="absolute inset-[36%] rounded-full border border-[#E6A100]/30" />
          </div>

          <div className="relative grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4 lg:sticky lg:top-28 lg:self-start">
              <span className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.16em] text-[#12312B]/60">
                <span className="h-1.5 w-1.5 rounded-full bg-[#E6A100]" />
                A message from the founder
              </span>

              <AnimatedHeading
                as="h3"
                className="mt-4 font-sans text-[clamp(1.9rem,3.2vw,2.8rem)] font-semibold leading-[1.08] tracking-[-0.03em]"
              >
                Why St. Genevieve Exists
              </AnimatedHeading>

              <p className="mt-6 text-lg font-medium text-[#B87F00]">
                A Slice for a Better Smile.
              </p>
            </div>

            <div className="lg:col-span-8">
              <div className="space-y-10 sm:space-y-14">
                {preview.map((p, i) => (
                  <FocusParagraph
                    key={i}
                    pullQuote={p.startsWith(PULL_QUOTE_START)}
                  >
                    {p}
                  </FocusParagraph>
                ))}
              </div>

              <AnimatePresence initial={false}>
                {open && (
                  <motion.div
                    key="rest"
                    initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={reduceMotion ? undefined : { height: 0, opacity: 0 }}
                    transition={{ duration: 0.8, ease: EASE }}
                    className="overflow-hidden"
                  >
                    <div className="space-y-10 pt-10 sm:space-y-14 sm:pt-14">
                      {rest.map((p, i) => (
                        <FocusParagraph key={i}>{p}</FocusParagraph>
                      ))}
                    </div>

                    <p className="mt-12 text-xl font-medium leading-snug text-[#12312B] sm:text-2xl">
                      Every drop is important. Nothing is a waste.
                    </p>

                    <p className="mt-4 max-w-[560px] text-sm leading-[1.85] text-[#12312B]/75 sm:text-[15px]">
                      Together, let us give a mother hope, give a child an
                      opportunity, and give families a reason to smile.
                    </p>

                    <div className="mt-8">
                      <p className="text-sm text-[#12312B]/60">
                        With gratitude,
                      </p>
                      <p className="mt-2 text-lg font-medium">
                        Genevieve Sonia Nwokeide
                      </p>
                      <p className="text-xs uppercase tracking-[0.14em] text-[#12312B]/60">
                        Founder, St. Genevieve Maternal and Child Welfare
                        Foundation
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
                className="group mt-10 inline-flex items-center gap-2.5 rounded-full border border-[#12312B]/25 px-6 py-3 text-xs font-medium uppercase tracking-wider text-[#12312B] transition-colors duration-500 hover:bg-[#12312B] hover:text-white"
              >
                {open ? "Show less" : "Read the full message"}
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-500 ${
                    open ? "rotate-180" : ""
                  }`}
                />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}