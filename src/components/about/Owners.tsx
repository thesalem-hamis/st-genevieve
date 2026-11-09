// components/about/Owners.tsx
import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.76, 0, 0.24, 1] as const;

const TEAM = [
  {
    name: "Dr. Genevieve Hamis",
    role: "Founder & Executive Director",
    bio: "Passionate about healthcare equity and public health initiatives across West Africa.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Adebimpe Mohammed",
    role: "Director of Programs & Strategy",
    bio: "Over 8 years managing community outreach and non-profit development programs.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Tamara Darlington",
    role: "Head of Field Operations",
    bio: "Directing logistics, partner support, and healthcare delivery across local government areas.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=80",
  },
];

export default function Owners() {
  const reduceMotion = useReducedMotion();

  const reveal = (delay = 0) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-60px" },
    transition: { duration: 0.8, delay, ease: EASE },
  });

  return (
    <section className="relative overflow-hidden bg-[#F4F5F7] px-5 py-20 text-[#12312B] sm:px-10 sm:py-28 lg:px-16 lg:py-32">
      <div className="mx-auto max-w-[1300px]">
        {/* Header */}
        <div className="mx-auto max-w-[640px] text-center">
          <motion.span
            {...reveal(0)}
            className="inline-flex items-center gap-2 rounded-sm bg-[#E6A100] px-3 py-1 font-sans text-[9px] font-semibold uppercase tracking-[0.14em] text-[#12312B] sm:text-[10px]"
          >
            Leadership & Visionaries
          </motion.span>

          <motion.h2
            {...reveal(0.08)}
            className="mt-5 font-heading text-[clamp(2.1rem,4.8vw,4.2rem)] font-normal leading-[1.05] tracking-[-0.025em] text-[#12312B]"
          >
            The People Behind the Impact
          </motion.h2>

          <motion.p
            {...reveal(0.16)}
            className="mt-4 font-sans text-xs leading-[1.8] text-[#12312B]/65 sm:text-sm"
          >
            Our leadership team brings together expertise in maternal healthcare, community development, and operational transparency.
          </motion.p>
        </div>

        {/* Team Grid */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
          {TEAM.map((member, i) => (
            <motion.div
              key={member.name}
              {...reveal(0.15 + i * 0.1)}
              className="group relative overflow-hidden rounded-[16px] bg-white p-4 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="relative aspect-[4/4] overflow-hidden rounded-[12px] bg-[#12312B]">
                <img
                  src={member.image}
                  alt={member.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#12312B]/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </div>

              <div className="px-2 pb-2 pt-5">
                <span className="font-sans text-[9px] font-semibold uppercase tracking-[0.16em] text-[#E6A100]">
                  {member.role}
                </span>

                <h3 className="mt-1 font-heading text-2xl font-normal text-[#12312B]">
                  {member.name}
                </h3>

                <p className="mt-2 font-sans text-[12px] leading-[1.7] text-[#12312B]/70">
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