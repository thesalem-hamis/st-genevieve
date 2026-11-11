import { useState, type FormEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  FaHeart,
  FaHandsHelping,
  FaUsers,
} from "react-icons/fa";
import VolunteerHero from "@/components/volunteer/VolunteerHero";

const EASE = [0.76, 0, 0.24, 1] as const;

const INTERESTS = [
  "Community Outreach",
  "Education & Child Development",
  "Maternal Healthcare",
  "Skills & Economic Empowerment",
  "Fundraising & Partnerships",
  "Media & Communications",
  "Administration & Support",
  "Other",
];

const AVAILABILITY = [
  "Weekdays",
  "Weekends",
  "Both weekdays and weekends",
  "Occasionally / As needed",
];

function CustomArrowUpRight({
  size = 14,
  color = "currentColor",
}: {
  size?: number;
  color?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.5 12.5L12.5 3.5M4 3.5H12.5V12"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function VolunteerPage() {
  const reduceMotion = useReducedMotion();
  const [submitted, setSubmitted] = useState(false);

  const reveal = (delay = 0) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-50px" },
    transition: { duration: 0.85, delay, ease: EASE },
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Connect your form to your backend or email service here.
    setSubmitted(true);
  };

  return (
    <main className="overflow-hidden bg-white font-sans text-[#12312B]">

      {/* HERO */}
      <VolunteerHero />

      {/* INTRODUCTION */}
      <section className="px-5 pb-12 pt-20 sm:px-6 sm:pb-16 sm:pt-24 lg:px-10 lg:pt-28">
        <div className="mx-auto grid max-w-[1400px] gap-8 lg:grid-cols-2 lg:items-end lg:gap-16">

          <motion.div {...reveal(0)}>
            <span className="inline-flex items-center gap-2 font-sans text-[10px] font-semibold uppercase tracking-[0.16em] text-[#12312B]/55 sm:text-[11px]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#E6A100]" />
              Be part of the change
            </span>

            <h2 className="mt-5 max-w-[620px] font-sans text-[clamp(2.2rem,4.5vw,4rem)] font-semibold leading-[1.06] tracking-[-0.045em]">
              Give your time.
              <br />
              <span className="text-[#12312B]/45">
                Make a difference.
              </span>
            </h2>
          </motion.div>

          <motion.p
            {...reveal(0.15)}
            className="max-w-[510px] font-sans text-sm leading-[1.9] text-[#12312B]/65 sm:text-[15px] lg:justify-self-end"
          >
            At Saintgenevieve, we believe meaningful change happens when
            people come together. By volunteering with us, you become part
            of a community committed to improving lives, empowering families
            and creating opportunities for a better future.
          </motion.p>
        </div>
      </section>

      {/* VOLUNTEER CONTENT */}
      <section className="px-5 pb-20 sm:px-6 sm:pb-24 lg:px-10 lg:pb-32">
        <div className="mx-auto grid max-w-[1400px] items-start gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">

          {/* LEFT CONTENT */}
          <motion.aside
            {...reveal(0)}
            className="flex flex-col"
          >
            <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.16em] text-[#12312B]/45">
              WHY VOLUNTEER?
            </span>

            <h3 className="mt-5 max-w-[420px] font-sans text-3xl font-semibold leading-[1.15] tracking-[-0.04em] sm:text-4xl">
              There's a place for you in the work we do.
            </h3>

            <p className="mt-5 max-w-[400px] font-sans text-sm leading-[1.9] text-[#12312B]/65">
              You don't have to have everything figured out. What matters
              is your willingness to contribute, learn and be part of
              something bigger than yourself.
            </p>

            {/* BENEFITS */}
            <div className="mt-9 border-t border-[#12312B]/10 pt-7">
              <div className="space-y-7">

                <div className="flex gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#E8F0EC] text-[#12312B]">
                    <FaHeart size={17} />
                  </div>

                  <div>
                    <h4 className="font-sans text-sm font-semibold">
                      Make a real impact
                    </h4>
                    <p className="mt-2 max-w-[310px] font-sans text-xs leading-[1.8] text-[#12312B]/60 sm:text-sm">
                      Contribute to initiatives that support mothers,
                      children and underserved communities.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#FBF1D4] text-[#12312B]">
                    <FaHandsHelping size={17} />
                  </div>

                  <div>
                    <h4 className="font-sans text-sm font-semibold">
                      Use your skills for good
                    </h4>
                    <p className="mt-2 max-w-[310px] font-sans text-xs leading-[1.8] text-[#12312B]/60 sm:text-sm">
                      Bring your experience, talents and ideas to meaningful
                      community work.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#F8E8E3] text-[#12312B]">
                    <FaUsers size={17} />
                  </div>

                  <div>
                    <h4 className="font-sans text-sm font-semibold">
                      Grow with a community
                    </h4>
                    <p className="mt-2 max-w-[310px] font-sans text-xs leading-[1.8] text-[#12312B]/60 sm:text-sm">
                      Connect with people who share a commitment to
                      compassion and positive change.
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* SMALL NOTE */}
            <div className="mt-10 border-t border-[#12312B]/10 pt-7">
              <p className="font-sans text-sm font-medium leading-[1.8]">
                Every helping hand counts.
              </p>
              <p className="mt-2 max-w-[340px] font-sans text-xs leading-[1.8] text-[#12312B]/55 sm:text-sm">
                Whether you can give a few hours or commit regularly,
                your contribution matters.
              </p>
            </div>
          </motion.aside>

          {/* VOLUNTEER FORM */}
          <motion.div
            {...reveal(0.15)}
            className="h-fit self-start rounded-[24px] bg-[#F4F6F2] p-6 sm:rounded-[30px] sm:p-9 lg:p-12"
          >
            <div className="mb-9">
              <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.16em] text-[#12312B]/45">
                VOLUNTEER APPLICATION
              </span>

              <h3 className="mt-3 font-sans text-2xl font-semibold tracking-[-0.04em] sm:text-3xl">
                Let's get to know you.
              </h3>

              <p className="mt-3 max-w-[450px] font-sans text-sm leading-[1.8] text-[#12312B]/60">
                Tell us a little about yourself and how you'd like to
                contribute to our mission.
              </p>
            </div>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex min-h-[280px] flex-col items-center justify-center text-center"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#12312B] text-2xl text-[#E6A100]">
                  ✓
                </div>

                <h3 className="mt-6 font-sans text-2xl font-semibold">
                  Thank you for stepping forward.
                </h3>

                <p className="mt-3 max-w-[340px] font-sans text-sm leading-[1.8] text-[#12312B]/60">
                  We're grateful for your interest in volunteering with
                  Saintgenevieve.
                </p>

                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-7 font-sans text-xs font-semibold uppercase tracking-wider underline underline-offset-4"
                >
                  Submit another application
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">

                {/* NAME */}
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="volunteer-name"
                      className="mb-2 block font-sans text-xs font-medium"
                    >
                      Full name
                    </label>

                    <input
                      id="volunteer-name"
                      name="name"
                      type="text"
                      required
                      autoComplete="name"
                      placeholder="Your full name"
                      className="w-full border-b border-[#12312B]/20 bg-transparent px-0 py-3 font-sans text-sm outline-none transition-colors placeholder:text-[#12312B]/35 focus:border-[#12312B]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="volunteer-email"
                      className="mb-2 block font-sans text-xs font-medium"
                    >
                      Email address
                    </label>

                    <input
                      id="volunteer-email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      placeholder="you@example.com"
                      className="w-full border-b border-[#12312B]/20 bg-transparent px-0 py-3 font-sans text-sm outline-none transition-colors placeholder:text-[#12312B]/35 focus:border-[#12312B]"
                    />
                  </div>
                </div>

                {/* PHONE & LOCATION */}
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="volunteer-phone"
                      className="mb-2 block font-sans text-xs font-medium"
                    >
                      Phone number
                    </label>

                    <input
                      id="volunteer-phone"
                      name="phone"
                      type="tel"
                      required
                      autoComplete="tel"
                      placeholder="+234 800 000 0000"
                      className="w-full border-b border-[#12312B]/20 bg-transparent px-0 py-3 font-sans text-sm outline-none transition-colors placeholder:text-[#12312B]/35 focus:border-[#12312B]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="volunteer-location"
                      className="mb-2 block font-sans text-xs font-medium"
                    >
                      Location
                    </label>

                    <input
                      id="volunteer-location"
                      name="location"
                      type="text"
                      required
                      placeholder="City / State"
                      autoComplete="address-level2"
                      className="w-full border-b border-[#12312B]/20 bg-transparent px-0 py-3 font-sans text-sm outline-none transition-colors placeholder:text-[#12312B]/35 focus:border-[#12312B]"
                    />
                  </div>
                </div>

                {/* AREA OF INTEREST */}
                <div>
                  <label
                    htmlFor="volunteer-interest"
                    className="mb-2 block font-sans text-xs font-medium"
                  >
                    Where would you like to contribute?
                  </label>

                  <select
                    id="volunteer-interest"
                    name="interest"
                    required
                    defaultValue=""
                    className="w-full appearance-none border-b border-[#12312B]/20 bg-transparent px-0 py-3 font-sans text-sm text-[#12312B] outline-none transition-colors focus:border-[#12312B]"
                  >
                    <option value="" disabled>
                      Select an area of interest
                    </option>

                    {INTERESTS.map((interest) => (
                      <option key={interest} value={interest}>
                        {interest}
                      </option>
                    ))}
                  </select>
                </div>

                {/* AVAILABILITY */}
                <div>
                  <label
                    htmlFor="volunteer-availability"
                    className="mb-2 block font-sans text-xs font-medium"
                  >
                    When are you available?
                  </label>

                  <select
                    id="volunteer-availability"
                    name="availability"
                    required
                    defaultValue=""
                    className="w-full appearance-none border-b border-[#12312B]/20 bg-transparent px-0 py-3 font-sans text-sm text-[#12312B] outline-none transition-colors focus:border-[#12312B]"
                  >
                    <option value="" disabled>
                      Select your availability
                    </option>

                    {AVAILABILITY.map((availability) => (
                      <option key={availability} value={availability}>
                        {availability}
                      </option>
                    ))}
                  </select>
                </div>

                {/* EXPERIENCE */}
                <div>
                  <label
                    htmlFor="volunteer-experience"
                    className="mb-2 block font-sans text-xs font-medium"
                  >
                    Do you have any relevant experience? (Optional)
                  </label>

                  <textarea
                    id="volunteer-experience"
                    name="experience"
                    rows={3}
                    placeholder="Tell us about your skills, experience or interests..."
                    className="w-full resize-none border-b border-[#12312B]/20 bg-transparent px-0 py-3 font-sans text-sm leading-[1.8] outline-none transition-colors placeholder:text-[#12312B]/35 focus:border-[#12312B]"
                  />
                </div>

                {/* WHY VOLUNTEER */}
                <div>
                  <label
                    htmlFor="volunteer-message"
                    className="mb-2 block font-sans text-xs font-medium"
                  >
                    Why would you like to volunteer with us?
                  </label>

                  <textarea
                    id="volunteer-message"
                    name="message"
                    required
                    rows={4}
                    placeholder="Tell us what inspires you to be part of our mission..."
                    className="w-full resize-none border-b border-[#12312B]/20 bg-transparent px-0 py-3 font-sans text-sm leading-[1.8] outline-none transition-colors placeholder:text-[#12312B]/35 focus:border-[#12312B]"
                  />
                </div>

                {/* SUBMIT BUTTON */}
                <motion.div
                  initial={reduceMotion ? false : { opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.7,
                    delay: 0.2,
                    ease: EASE,
                  }}
                  className="mt-6 font-sans"
                >
                  <button
                    type="submit"
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
                        SUBMIT APPLICATION
                      </span>

                      <span
                        aria-hidden="true"
                        className="absolute inset-0 block translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-y-0"
                      >
                        SUBMIT APPLICATION
                      </span>
                    </span>

                    {/* Animated arrow */}
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
                  </button>
                </motion.div>

                <p className="font-sans text-[11px] leading-[1.7] text-[#12312B]/45">
                  By submitting this form, you express your interest in
                  volunteering with Saintgenevieve. Our team can follow up
                  with you using the contact details provided.
                </p>

              </form>
            )}
          </motion.div>

        </div>
      </section>
    </main>
  );
}
