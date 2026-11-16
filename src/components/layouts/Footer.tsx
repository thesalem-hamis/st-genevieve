import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import {
  FaInstagram,
  FaLinkedinIn,
  FaFacebookF,
  FaEnvelope,
} from "react-icons/fa";
import { Link } from "react-router-dom";

import footerImage from "@/assets/footer.svg";
import logo from "@/assets/icon.svg";

const EASE = [0.76, 0, 0.24, 1] as const;

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Work", path: "/our-work" },
  { name: "About", path: "/about" },
  { name: "Volunteer", path: "/volunteer" },
  { name: "Contact", path: "/contact" },
];

const socialLinks = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/saintgeneveive/",
    icon: FaInstagram,
    external: true,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/",
    icon: FaLinkedinIn,
    external: true,
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/",
    icon: FaFacebookF,
    external: true,
  },
  {
    name: "Email",
    href: "mailto:info@stgenevievefoundation.org",
    icon: FaEnvelope,
    external: false,
  },
];

const reveal = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: EASE,
    },
  },
};

export default function Footer() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <footer className="relative isolate min-h-[760px] overflow-hidden bg-[#050505] text-white sm:min-h-[820px]">

      {/* Main Footer Content */}
      <div className="relative z-10 mx-auto max-w-[1800px] px-6 pb-10 pt-10 sm:px-10 md:px-12 lg:px-[60px] lg:pt-9">

        <div className="grid grid-cols-1 gap-16 lg:grid-cols-[minmax(0,1fr)_220px_185px] lg:gap-10 xl:grid-cols-[minmax(0,1fr)_250px_250px]">

          {/* Left Column */}
          <div className="flex flex-col">

            {/* Logo */}
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: EASE }}
              className="mb-7"
            >
              <Link to="/" aria-label="St. Genevieve home">
                <img
                  src={logo}
                  alt="St. Genevieve"
                  className="h-12 w-auto object-contain object-left"
                />
              </Link>
            </motion.div>

            {/* Main Statement */}
            <motion.h2
              initial={shouldReduceMotion ? false : { opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: EASE }}
              className="max-w-[750px] font-sans text-[clamp(2.6rem,5vw,4.2rem)] font-normal leading-[1.04] tracking-[-0.065em] text-white"
            >
              A healthier future.
              <br />
              For every mother.
              <br />
              Every child.
            </motion.h2>

            {/* Contact */}
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
              className="mt-16 sm:mt-20 lg:mt-24"
            >
              <p className="font-sans text-[15px] font-medium leading-snug text-white">
                Get in touch:
              </p>

              <a
                href="mailto:info@stgenevievefoundation.org"
                className="group inline-flex items-center gap-2 font-sans text-[15px] leading-snug text-white transition-colors duration-300 hover:text-white/55"
              >
                info@stgenevievefoundation.org

                <ArrowUpRight
                  size={14}
                  className="opacity-0 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:opacity-100"
                />
              </a>
            </motion.div>
          </div>

          {/* Navigation Column */}
          <motion.div
            variants={reveal}
            initial={shouldReduceMotion ? false : "hidden"}
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
            className="flex flex-col items-start"
          >
            <nav aria-label="Footer navigation">
              <ul className="space-y-2">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="inline-flex font-sans text-[16px] font-medium tracking-tight text-white transition-colors duration-300 hover:text-white/50 sm:text-[18px]"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </motion.div>

          {/* Social Links Column */}
          <motion.div
            variants={reveal}
            initial={shouldReduceMotion ? false : "hidden"}
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
            className="flex flex-col items-start"
          >
            <div className="w-full space-y-7">
              {socialLinks.map((social) => {
                const Icon = social.icon;

                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target={social.external ? "_blank" : undefined}
                    rel={
                      social.external
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="group flex w-full items-center justify-between gap-4"
                  >
                    <span className="flex items-center gap-4">
                      <Icon
                        size={21}
                        className="shrink-0 text-white/65 transition-colors duration-300 group-hover:text-white"
                      />

                      <span className="font-sans text-[16px] font-medium tracking-tight text-white transition-colors duration-300 group-hover:text-white/55 sm:text-[18px]">
                        {social.name}
                      </span>
                    </span>

                    <ArrowUpRight
                      size={18}
                      className="shrink-0 text-white/80 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                    />
                  </a>
                );
              })}
            </div>

            {/* Copyright */}
            <div className="mt-16 font-sans text-[14px] leading-[1.4] tracking-tight text-white/75 sm:mt-20 lg:mt-24">
              <p>© {new Date().getFullYear()}</p>
              <p>All rights reserved.</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Large Faded Footer Image */}
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: EASE }}
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-8 z-0 flex h-[155px] items-end justify-center overflow-hidden sm:h-[210px] md:h-[270px] lg:h-[390px] xl:h-[440px]"
      >
        <img
          src={footerImage}
          alt=""
          className="h-full w-full object-contain object-bottom opacity-[0.50]"
        />
      </motion.div>

      {/* Developer Credit */}
      <div className="absolute inset-x-0 bottom-3 z-20 text-center">
        <a
          href="https://www.instagram.com/salem.hamis/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-sans text-[10px] tracking-[0.12em] text-white/45 transition-colors duration-300 hover:text-white"
        >
          Built by{" "}
          <span className="font-medium text-white/75">salemhamis</span>
          <ArrowUpRight size={11} className="ml-1 inline-block" />
        </a>
      </div>
    </footer>
  );
}
