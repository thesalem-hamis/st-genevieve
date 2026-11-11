
import { useState, type FormEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  FaInstagram,
  FaLinkedinIn,
  FaFacebookF,
  FaEnvelope,
  FaPhone,
} from "react-icons/fa6";
import AnimatedHeading from "@/components/about/AnimatedHeading";

const EASE = [0.76, 0, 0.24, 1] as const;

const CONTACT_TYPES = [
  "General Enquiry",
  "Partnership",
  "Volunteering",
  "Programme Enquiry",
  "Donations & Support",
  "Other",
];

const SOCIAL_LINKS = [
  {
    name: "Instagram",
    handle: "@saintgeneveive",
    href: "https://instagram.com/saintgeneveive",
    icon: FaInstagram,
  },
  {
    name: "LinkedIn",
    handle: "Saintgeneveive",
    href: "https://linkedin.com/company/saintgeneveive",
    icon: FaLinkedinIn,
  },
  {
    name: "Facebook",
    handle: "Saintgeneveive",
    href: "https://facebook.com/saintgeneveive",
    icon: FaFacebookF,
  },
  {
    name: "Email",
    handle: "info@stgenevievefoundation.org",
    href: "mailto:info@stgenevievefoundation.org",
    icon: FaEnvelope,
  },
];

const PHONE_NUMBERS = [
  {
    display: "+234 (0) 123 456 7890",
    href: "tel:+23401234567890",
  },
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

export default function ContactPage() {
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

    // Connect your email service or backend here.
    setSubmitted(true);
  };

  return (
    <main className="overflow-hidden bg-white text-[#12312B]">

      {/* HERO */}
      <section className="px-5 pb-14 pt-28 sm:px-6 sm:pb-20 sm:pt-36 lg:px-10 lg:pt-44">
        <div className="mx-auto max-w-[1400px]">

          <motion.div {...reveal(0)}>
            <span className="inline-flex items-center gap-2 font-sans text-[10px] font-semibold uppercase tracking-[0.18em] text-[#12312B]/60 sm:text-[11px]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#E6A100]" />
              We'd love to hear from you
            </span>
          </motion.div>

          <div className="mt-6 max-w-[850px]">
            <AnimatedHeading
              as="h1"
              className="font-sans text-[clamp(3rem,7vw,6.5rem)] font-semibold leading-[0.98] tracking-[-0.065em]"
            >
              Let's start a conversation.
            </AnimatedHeading>

            <motion.p
              {...reveal(0.2)}
              className="mt-7 max-w-[520px] font-sans text-sm leading-[1.9] text-[#12312B]/65 sm:text-base"
            >
              Whether you want to partner with us, support our work, or simply
              learn more about what we do, we'd love to hear from you.
            </motion.p>
          </div>

        </div>
      </section>

      {/* CONTACT CONTENT */}
      <section className="px-5 pb-20 sm:px-6 sm:pb-24 lg:px-10 lg:pb-32">
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 items-start gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">

          {/* LEFT COLUMN */}
          <motion.aside
            {...reveal(0)}
            className="flex flex-col"
          >
            <div>
              <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.16em] text-[#12312B]/45">
                GET IN TOUCH
              </span>

              <h2 className="mt-5 max-w-[400px] font-sans text-3xl font-semibold leading-[1.15] tracking-[-0.04em] sm:text-4xl">
                Every meaningful change starts somewhere.
              </h2>

              <p className="mt-5 max-w-[390px] font-sans text-sm leading-[1.9] text-[#12312B]/65">
                Sometimes it starts with a question, an idea, or simply
                reaching out. Whatever brings you here, we're listening.
              </p>

              {/* SOCIAL LINKS */}
              <div className="mt-9 border-t border-[#12312B]/10 pt-7">
                <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.16em] text-[#12312B]/45">
                  FIND US & CONNECT
                </span>

                <div className="mt-5 space-y-4">
                  {SOCIAL_LINKS.map((social) => {
                    const Icon = social.icon;

                    return (
                      <a
                        key={social.name}
                        href={social.href}
                        target={social.name === "Email" ? undefined : "_blank"}
                        rel={
                          social.name === "Email"
                            ? undefined
                            : "noopener noreferrer"
                        }
                        className="group flex items-center justify-between gap-3 border-b border-[#12312B]/10 pb-3 transition-colors duration-500 hover:border-[#E6A100]"
                      >
                        <span className="flex items-center gap-3 font-sans text-sm font-medium text-[#12312B]">
                          <Icon
                            size={16}
                            className="shrink-0 text-[#12312B]/65 transition-colors duration-300 group-hover:text-[#E6A100]"
                          />
                          {social.name}
                        </span>

                        <span className="flex items-center gap-2 text-right font-sans text-xs text-[#12312B]/50 transition-colors group-hover:text-[#12312B]">
                          {social.handle}

                          <span className="text-[#E6A100] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                            <CustomArrowUpRight size={13} />
                          </span>
                        </span>
                      </a>
                    );
                  })}
                </div>
              </div>

              {/* PHONE DETAILS */}
              <div className="mt-8 border-t border-[#12312B]/10 pt-7">
                <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.16em] text-[#12312B]/45">
                  CALL US
                </span>

                <div className="mt-5 space-y-4">
                  {PHONE_NUMBERS.map((phone) => (
                    <a
                      key={phone.display}
                      href={phone.href}
                      className="group flex items-center gap-3 font-sans text-sm font-medium text-[#12312B] transition-colors hover:text-[#A66B38]"
                    >
                      <FaPhone
                        size={14}
                        className="text-[#12312B]/60 transition-colors group-hover:text-[#E6A100]"
                      />
                      {phone.display}
                    </a>
                  ))}
                </div>

                <p className="mt-4 font-sans text-xs text-[#12312B]/45">
                  Lagos, Nigeria
                </p>
              </div>
            </div>

            {/* CONTACT PURPOSES */}
            <div className="mt-12 border-t border-[#12312B]/10 pt-8 lg:mt-14">
              <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.16em] text-[#12312B]/45">
                HOW YOU CAN CONNECT
              </span>

              <div className="mt-6 space-y-6">
                {[
                  {
                    number: "01",
                    title: "Partnerships",
                    text: "Let's explore how we can work together.",
                  },
                  {
                    number: "02",
                    title: "Support our work",
                    text: "Be part of something that makes a difference.",
                  },
                  {
                    number: "03",
                    title: "General enquiries",
                    text: "Questions, ideas or just saying hello.",
                  },
                ].map((item) => (
                  <div key={item.number} className="flex gap-5">
                    <span className="pt-1 font-sans text-[11px] font-medium text-[#E6A100]">
                      {item.number}
                    </span>

                    <div>
                      <h3 className="font-sans text-sm font-semibold">
                        {item.title}
                      </h3>

                      <p className="mt-1 font-sans text-xs leading-[1.8] text-[#12312B]/55 sm:text-sm">
                        {item.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.aside>

          {/* RIGHT COLUMN: CONTACT FORM */}
          <motion.div
            {...reveal(0.15)}
            className="h-fit self-start rounded-[24px] bg-[#F4F6F2] p-6 sm:rounded-[30px] sm:p-9 lg:p-12"
          >
            <div className="mb-9">
              <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.16em] text-[#12312B]/45">
                SEND US A MESSAGE
              </span>

              <h2 className="mt-3 font-sans text-2xl font-semibold tracking-[-0.04em] sm:text-3xl">
                We'd love to hear from you.
              </h2>

              <p className="mt-2 font-sans text-sm leading-relaxed text-[#12312B]/60">
                Fill in the details below and tell us what's on your mind.
              </p>
            </div>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex min-h-[260px] flex-col items-center justify-center text-center"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#12312B] text-2xl text-[#E6A100]">
                  ✓
                </div>

                <h3 className="mt-6 font-sans text-2xl font-semibold">
                  Thank you for reaching out.
                </h3>

                <p className="mt-3 max-w-[320px] font-sans text-sm leading-relaxed text-[#12312B]/60">
                  Your message has been received.
                </p>

                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-7 font-sans text-xs font-semibold uppercase tracking-wider text-[#12312B] underline underline-offset-4"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">

                {/* NAME & EMAIL */}
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="mb-2 block font-sans text-xs font-medium"
                    >
                      Your name
                    </label>

                    <input
                      id="contact-name"
                      type="text"
                      name="name"
                      required
                      placeholder="John Doe"
                      autoComplete="name"
                      className="w-full border-b border-[#12312B]/20 bg-transparent px-0 py-3 font-sans text-sm text-[#12312B] outline-none transition-colors placeholder:text-[#12312B]/35 focus:border-[#12312B]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-email"
                      className="mb-2 block font-sans text-xs font-medium"
                    >
                      Email address
                    </label>

                    <input
                      id="contact-email"
                      type="email"
                      name="email"
                      required
                      placeholder="you@example.com"
                      autoComplete="email"
                      className="w-full border-b border-[#12312B]/20 bg-transparent px-0 py-3 font-sans text-sm text-[#12312B] outline-none transition-colors placeholder:text-[#12312B]/35 focus:border-[#12312B]"
                    />
                  </div>
                </div>

                {/* ENQUIRY TYPE */}
                <div>
                  <label
                    htmlFor="contact-subject"
                    className="mb-2 block font-sans text-xs font-medium"
                  >
                    What is this about?
                  </label>

                  <select
                    id="contact-subject"
                    name="subject"
                    required
                    defaultValue=""
                    className="w-full appearance-none border-b border-[#12312B]/20 bg-transparent px-0 py-3 font-sans text-sm text-[#12312B] outline-none transition-colors focus:border-[#12312B]"
                  >
                    <option value="" disabled>
                      Select an enquiry
                    </option>

                    {CONTACT_TYPES.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                {/* MESSAGE */}
                <div>
                  <label
                    htmlFor="contact-message"
                    className="mb-2 block font-sans text-xs font-medium"
                  >
                    Your message
                  </label>

                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    rows={5}
                    placeholder="Tell us a little about what you have in mind..."
                    className="w-full resize-none border-b border-[#12312B]/20 bg-transparent px-0 py-3 font-sans text-sm leading-[1.8] text-[#12312B] outline-none transition-colors placeholder:text-[#12312B]/35 focus:border-[#12312B]"
                  />
                </div>

                {/* GOLD SUBMIT BUTTON */}
                <motion.div
                  initial={reduceMotion ? false : { opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.7,
                    delay: 0.2,
                    ease: EASE,
                  }}
                  className="mt-6 font-sans sm:mt-6"
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
                        SEND YOUR MESSAGE
                      </span>

                      <span
                        aria-hidden="true"
                        className="absolute inset-0 block translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-y-0"
                      >
                        SEND YOUR MESSAGE
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

              </form>
            )}
          </motion.div>

        </div>
      </section>

    </main>
  );
}
