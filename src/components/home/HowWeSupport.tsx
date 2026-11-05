import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { CustomArrowUpRight } from "@/components/ui/CustomIcons";

const EASE = [0.76, 0, 0.24, 1] as const;
const BODY = "font-['Mona_Sans',sans-serif]";

const supportCategories = [
  {
    title: "Academic Benefits",
    description:
      "We provide educational support, scholarships, and learning materials to help children and young people access better opportunities.",
  },
  {
    title: "Health Benefits",
    description:
      "We support healthier communities through medical assistance, healthcare outreach, and essential health awareness programs.",
  },
  {
    title: "Skill Acquisition",
    description:
      "We empower individuals with practical vocational and entrepreneurial skills that encourage independence and sustainable livelihoods.",
  },
  {
    title: "Maternal & Child Welfare",
    description:
      "We provide support for mothers, infants, and young children through maternal care, nutrition, and essential welfare initiatives.",
  },
  {
    title: "Mental Health & Counselling",
    description:
      "We promote emotional wellbeing through accessible counselling, mental health resources, and supportive community programs.",
  },
];

/* Primary Pill Button */
function PillButton({
  to,
  children,
}: {
  to: string;
  children: string;
}) {
  return (
    <Link
      to={to}
      className={`${BODY} group relative inline-flex items-center gap-2.5 overflow-hidden rounded-full bg-[#E6A100] px-7 py-3.5 text-xs font-semibold uppercase tracking-wider text-[#12312B] shadow-md transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] hover:scale-[1.03] hover:text-white active:scale-95`}
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

export default function HowWeSupport() {
  const reduceMotion = useReducedMotion();

  const reveal = (delay = 0) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 25 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-60px" },
    transition: { duration: 0.85, delay, ease: EASE },
  });

  return (
    <section
      className={`${BODY} relative overflow-hidden bg-[#12312B] px-5 py-20 text-white sm:px-10 sm:py-24 lg:px-16 lg:py-28`}
    >
      {/* Subtle background texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #ffffff 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />

      <div className="relative mx-auto max-w-[1300px]">

        {/* Header */}
        <div className="mb-12 grid gap-6 lg:mb-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-16">
          <motion.div {...reveal(0)}>
            <span className="font-heading mb-4 inline-flex items-center rounded-full bg-[#E6A100] px-3.5 py-1 text-[10px] font-bold tracking-[0.14em] text-[#12312B] sm:text-[11px]">
              Support & Benefits
            </span>

            <h2 className="font-sans mt-2 max-w-[600px] text-[clamp(2rem,4vw,3.1rem)] font-semibold leading-[1.08] tracking-[-0.045em] text-white">
              Creating Opportunities
              <br />
              <span className="text-[#E6A100] font-sans">
                Changing Lives
              </span>
            </h2>
          </motion.div>

          <motion.p
            {...reveal(0.1)}
            className="max-w-[460px] text-[13px] font-normal leading-[1.85] text-white/70 sm:text-sm lg:justify-self-end lg:pb-1"
          >
            We believe everyone deserves the opportunity to thrive.
            Through meaningful support and community-driven initiatives,
            we provide essential resources that empower individuals,
            strengthen families, and create lasting change.
          </motion.p>
        </div>

        {/* Main content */}
        <div className="grid items-stretch gap-7 lg:grid-cols-2 lg:gap-10">

          {/* Support cards */}
          <div className="flex flex-col gap-3.5">
            {supportCategories.map((item, index) => (
              <motion.div
                key={item.title}
                {...reveal(0.08 + index * 0.06)}
                whileHover={reduceMotion ? undefined : { x: 5 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="group relative flex flex-1 flex-col justify-center overflow-hidden rounded-2xl border border-[#415A55] bg-[#2A4640] px-5 py-5 transition-colors duration-300  sm:px-6 sm:py-5"
              >
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-[15px] font-semibold tracking-[-0.025em] sm:text-base">
                    {item.title}
                  </h3>

                  <span className="shrink-0 text-[#12312B]/40 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1">
                    <CustomArrowUpRight size={17} color="currentColor" />
                  </span>
                </div>

                <p className="mt-2 max-w-[480px] text-[12px] font-normal leading-[1.8]  sm:text-[13px]">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Image and CTA */}
          <motion.div
            {...reveal(0.2)}
            className="group relative min-h-[480px] overflow-hidden rounded-[1.75rem] bg-[#E7EAEA] shadow-2xl sm:min-h-[560px] lg:min-h-full"
          >
            <img
              src="/images/hero/1.jpg"
              alt="Mother and child sharing a warm moment"
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-105"
            />

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#12312B] via-[#12312B]/35 to-transparent opacity-95" />

            {/* Image content */}
            <div className="absolute inset-x-0 bottom-0 flex flex-col items-start p-7 sm:p-9 lg:p-10">
              <span className="mb-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#E6A100] sm:text-[11px]">
                Together, We Make a Difference
              </span>

              <h3 className="max-w-[440px] text-[clamp(1.7rem,3vw,2.5rem)] font-semibold leading-[1.12] tracking-[-0.04em] text-white">
                Every Life Deserves an Opportunity to Thrive.
              </h3>

              <div className="mt-7">
                <PillButton to="/contact">
                  APPLY FOR SUPPORT
                </PillButton>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
