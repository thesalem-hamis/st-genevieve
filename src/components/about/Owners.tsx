
import { motion, useReducedMotion } from "framer-motion";
import profile1 from "@/assets/profile.jpeg";
import profile2 from "@/assets/profile-2.jpeg";
import AnimatedHeading from "@/components/about/AnimatedHeading";
// import Decor from "@/components/about/Decor";

const EASE = [0.76, 0, 0.24, 1] as const;

const TEAM = [
  {
    name: "Chukwu Priscilla Ifeyinwa",
    role: "Manager of the Foundation",
    bio: "I studied Accountancy at university. Cooking, dancing, charitable acts and the presence of God are my happy places. I am a goal getter, and I believe that if it does not work this way, we try another way. I am committed to helping the foundation thrive.",
    image: profile2,
  },
  {
    name: "Zunny-Abu Chris-Mimshach",
    role: "Social Media Manager",
    bio: "I'm in my third year studying Psychology. I enjoy reading and listening to music, I love to help people, and I believe in empathy. My strengths include building strong bonds with others, and what makes me stand out is my peculiarity.",
    image: profile1,
  },
];

export default function Owners() {
  const reduceMotion = useReducedMotion();

  const reveal = (delay = 0) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-60px" },
    transition: { duration: 0.9, delay, ease: EASE },
  });

  return (
    <section className="relative overflow-hidden bg-[#F4F5F7] px-5 py-20 font-sans text-[#12312B] sm:px-10 sm:py-28 lg:px-16 lg:py-32">
      {/* <Decor className="-bottom-24 -right-28 h-[320px] w-[320px] sm:h-[420px] sm:w-[420px] lg:-right-16 lg:h-[520px] lg:w-[520px]" /> */}

      <div className="relative z-10 mx-auto max-w-[1300px]">
        {/* Header */}
        <div className="mx-auto max-w-[640px] text-center">
          <motion.span
            {...reveal(0)}
            className="inline-flex items-center gap-2 rounded-sm bg-[#E6A100] px-3 py-1 font-sans text-[9px] font-semibold uppercase tracking-[0.14em] text-[#12312B] sm:text-[10px]"
          >
            Leadership & Visionaries
          </motion.span>

          <AnimatedHeading
            as="h2"
            delay={0.1}
            className="mt-5 font-sans text-[clamp(2rem,3.8vw,3.4rem)] font-semibold leading-[1.06] tracking-[-0.03em] text-[#12312B]"
          >
            The People Behind The Impact
          </AnimatedHeading>

          <motion.p
            {...reveal(0.25)}
            className="mt-4 font-sans text-xs leading-[1.8] text-[#12312B]/65 sm:text-sm"
          >
            Our leadership team brings together expertise in maternal
            healthcare, community development, and operational transparency.
          </motion.p>
        </div>

        {/* Team Grid */}
        <div className="mx-auto mt-12 grid max-w-[900px] gap-6 sm:grid-cols-2 lg:mt-16">
          {TEAM.map((member, i) => (
            <motion.div
              key={member.name}
              {...reveal(0.1 + i * 0.12)}
              className="group relative overflow-hidden rounded-[16px] bg-white p-4 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-xl motion-reduce:transition-none motion-reduce:hover:translate-y-0"
            >
              <div className="relative aspect-[4/4] overflow-hidden rounded-[12px] bg-[#12312B]">
                <img
                  src={member.image}
                  alt={member.name}
                  loading="lazy"
                  className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#12312B]/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </div>

              <div className="px-2 pb-2 pt-5">
                <span className="font-sans text-[9px] font-semibold uppercase tracking-[0.16em] text-[#E6A100]">
                  {member.role}
                </span>

                <h3 className="mt-1 font-sans text-2xl font-normal text-[#12312B]">
                  {member.name}
                </h3>

                <p className="mt-2 font-sans text-[13px] leading-[1.7] text-[#12312B]/70">
                  {member.bio}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
