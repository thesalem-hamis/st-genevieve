import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.76, 0, 0.24, 1] as const;

const PARTNERS = [
  {
    name: "HORIZON",
    symbol: "✳",
    color: "#12312B",
    accent: "#E6A100",
    style: "font-bold tracking-[0.12em]",
  },
  {
    name: "ZENITH",
    symbol: "Z",
    color: "#526C61",
    accent: "#E6A100",
    style: "font-black italic tracking-[-0.1em]",
  },
  {
    name: "NEWDAWN",
    symbol: "◉",
    color: "#12312B",
    accent: "#B3D1C2",
    style: "font-semibold tracking-[-0.06em]",
  },
  {
    name: "SOLACE",
    symbol: "✺",
    color: "#A66B38",
    accent: "#E6A100",
    style: "font-bold tracking-[0.08em]",
  },
  {
    name: "EVERROOT",
    symbol: "❋",
    color: "#416B55",
    accent: "#B3D1C2",
    style: "font-bold tracking-[-0.04em]",
  },
  {
    name: "SPARK",
    symbol: "✧",
    color: "#12312B",
    accent: "#E6A100",
    style: "font-black tracking-[0.16em]",
  },
];

function PartnerLogo({ partner }: { partner: (typeof PARTNERS)[number] }) {
  return (
    <div className="flex h-[125px] w-[230px] shrink-0 items-center justify-center gap-3 px-6 font-sans sm:h-[150px] sm:w-[270px] lg:h-[165px]">
      <span
        className="font-sans text-[38px] sm:text-[46px] lg:text-[54px]"
        style={{ color: partner.accent }}
      >
        {partner.symbol}
      </span>

      <span
        className={`font-sans text-lg sm:text-xl lg:text-[22px] ${partner.style}`}
        style={{ color: partner.color }}
      >
        {partner.name}
      </span>
    </div>
  );
}

export default function PartnersMarquee() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-white py-16 font-sans text-[#12312B] sm:py-20 lg:py-24">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-6 lg:px-10">
        {/* Section introduction */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE }}
          className="mb-8 font-sans sm:mb-10"
        >
          <span className="inline-flex items-center gap-2 font-sans text-[10px] font-semibold uppercase tracking-[0.18em] text-[#12312B]/60 sm:text-[11px]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#E6A100]" />
            Partners In Purpose
          </span>

          <h2 className="mt-3 font-sans text-xl font-semibold tracking-[-0.03em] text-[#12312B] sm:text-2xl">
            Together, we make lasting change possible.
          </h2>

          <p className="mt-2 max-w-[480px] font-sans text-sm leading-[1.8] text-[#12312B]/65">
            Every partnership brings us closer to a future where mothers
            are empowered, children are educated, and communities thrive.
          </p>
        </motion.div>
      </div>

      {/* Continuous Logo Marquee */}
      <motion.div
        initial={reduceMotion ? false : { opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="relative overflow-hidden border-y border-[#12312B]/10 font-sans"
      >
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-white to-transparent sm:w-24" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-white to-transparent sm:w-24" />

        <motion.div
          className="flex w-max font-sans"
          animate={reduceMotion ? undefined : { x: ["0%", "-50%"] }}
          transition={
            reduceMotion
              ? undefined
              : {
                  duration: 36,
                  ease: "linear",
                  repeat: Infinity,
                }
          }
          style={reduceMotion ? undefined : { willChange: "transform" }}
        >
          {[0, 1].map((group) => (
            <div
              key={group}
              className="flex shrink-0 font-sans"
              aria-hidden={group === 1}
            >
              {PARTNERS.map((partner) => (
                <div
                  key={`${group}-${partner.name}`}
                  className="border-r border-[#12312B]/10 font-sans"
                >
                  <PartnerLogo partner={partner} />
                </div>
              ))}
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
