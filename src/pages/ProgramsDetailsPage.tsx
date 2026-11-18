import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PillButton } from "@/components/about/Shared";
import { CustomArrowLeft } from "@/components/ui/CustomIcons";

import impact1 from "@/assets/impact.jpeg";
import impact2 from "@/assets/impact2.jpeg";
import impact3 from "@/assets/impact3.jpeg";
import impact4 from "@/assets/impact4.jpeg";
import impact5 from "@/assets/impact5.jpeg";
import impact6 from "@/assets/impact6.jpeg";
import impact7 from "@/assets/impact7.jpeg";
import impact8 from "@/assets/impact8.jpeg";
import impact9 from "@/assets/impact9.jpeg";
import impact10 from "@/assets/impact10.jpeg";
import impact11 from "@/assets/impact11.jpeg";
import impact12 from "@/assets/impact12.jpeg";
import impact13 from "@/assets/impact13.jpeg";
import impact14 from "@/assets/impact14.jpeg";
import impact16 from "@/assets/impact16.jpeg";

const EASE = [0.76, 0, 0.24, 1] as const;

/* ------------------------------------------------------------------
   Programme content. Add another programme by adding another entry
   under its slug (e.g. "child-welfare"); the page picks it up from
   the URL: /programs/:slug

   PLACEHOLDERS to replace with real content before launch:
   facts.supported, the donation goal / fallback raised amount, the
   details list, and the testimonials (sample quotes, not real people).
------------------------------------------------------------------- */

type Programme = {
  slug: string;
  tag: string;
  title: string;
  intro: string;
  image: string;
  imageAlt: string;
  about: string[];
  details: { title: string; text: string }[];
  facts: { label: string; value: string }[];
  testimonials: {
    name: string;
    role: string;
    quote: string;
    tone: string;
  }[];
  gallery: { src: string; alt: string }[];
  donation: {
    goal: number; // in naira
    fallbackRaised: number; // shown until real donations are found
    presets: number[];
  };
};

const PROGRAMMES: Record<string, Programme> = {
  "maternal-healthcare": {
    slug: "maternal-healthcare",
    tag: "Maternal Healthcare",
    title: "Care that reaches every mother.",
    intro:
      "Accessible maternal healthcare for mothers in underserved communities, so every mother is cared for before, during and after birth.",
    image: impact9,
    imageAlt: "A mother receiving care through the Maternal Healthcare programme",
    about: [
      "This programme began with something our founder saw first-hand as a midwife: mothers staying in hospital for months after giving birth because they could not afford their bills, and women choosing riskier ways to deliver because safer options were out of reach.",
      "Maternal Healthcare exists so that no mother within our reach is denied essential care because of her circumstances. We support mothers through pregnancy, birth and the weeks after, and we look after the human, emotional and financial side of care as well as the clinical.",
      "Every contribution, however small, goes towards care that restores a mother's health and confidence, and in doing so changes the path of her whole family.",
    ],
    details: [
      {
        title: "Care before birth",
        text: "Check-ups and guidance that help mothers prepare for a safe delivery.",
      },
      {
        title: "Support with bills",
        text: "Help for mothers who cannot afford hospital and delivery costs.",
      },
      {
        title: "Care after birth",
        text: "Follow-up support for mothers and newborns in the weeks that matter most.",
      },
      {
        title: "Nutrition and newborn health",
        text: "Practical support so babies are not held back by malnutrition and preventable illness.",
      },
    ],
    facts: [
      { label: "Programme", value: "Maternal Healthcare" },
      { label: "Location", value: "Lagos, Nigeria" },
      { label: "Status", value: "Ongoing" },
      { label: "Began", value: "2019" },
      { label: "Supported", value: "850+ mothers" },
    ],
    testimonials: [
      {
        name: "Ngozi A.",
        role: "Mother of three",
        quote:
          "I used to put off going to the clinic because I could not afford the trip. Now someone checks on me and my baby before things become serious.",
        tone: "bg-[#E8F0EC]",
      },
      {
        name: "Adaeze O.",
        role: "New mother",
        quote:
          "I was afraid of what delivery would cost. Knowing the bill would not keep me in the hospital let me focus on my baby.",
        tone: "bg-[#FBF1D4]",
      },
      {
        name: "Ifeoma N.",
        role: "Community volunteer",
        quote:
          "People trust us because we come back. That is what makes mothers bring their neighbours to the programme.",
        tone: "bg-[#F8E8E3]",
      },
    ],
    gallery: [
      { src: impact4, alt: "Healthcare support for mothers" },
      { src: impact8, alt: "A mother and child receiving care" },
      { src: impact10, alt: "Families at a Foundation programme" },
      { src: impact14, alt: "A moment of care during a visit" },
    ],
    donation: {
      goal: 5000000,
      fallbackRaised: 1850000,
      presets: [100000, 250000, 500000, 1000000, 2000000],
    },
  },

  "child-welfare": {
    slug: "child-welfare",
    tag: "Child Welfare",
    title: "Every child deserves a future.",
    intro:
      "Continuous access to basic education and care for vulnerable children, building the foundations they need to learn and grow.",
    image: impact5,
    imageAlt: "Children learning through the Child Welfare programme",
    about: [
      "Many children in the communities we serve have too little access to basic education and care. It is rarely because they cannot learn; books, fees, nutrition and a steady place to study are simply out of reach.",
      "Child Welfare gives vulnerable children continuous access to learning and support, so they follow a steady path through school instead of receiving help once and being left behind.",
      "By building these foundations early, we help children grow in confidence and open doors for their families as well.",
    ],
    details: [
      {
        title: "Learning materials",
        text: "Books and supplies so no child is held back for lack of the basics.",
      },
      {
        title: "School support",
        text: "Help that keeps children enrolled and in the classroom.",
      },
      {
        title: "A steady path",
        text: "Continuous support through the years, not one-time help.",
      },
      {
        title: "Foundations for growth",
        text: "The reading, writing and confidence every child builds on.",
      },
    ],
    facts: [
      { label: "Programme", value: "Child Welfare" },
      { label: "Location", value: "Nigeria" },
      { label: "Status", value: "Ongoing" },
      { label: "Began", value: "2019" },
      { label: "Supported", value: "1,200+ students" },
    ],
    testimonials: [
      {
        name: "Chinelo E.",
        role: "Parent of two",
        quote:
          "My children have books, a place to learn, and someone who notices when they miss class. That was not something I could give them alone.",
        tone: "bg-[#FBF1D4]",
      },
      {
        name: "Emeka O.",
        role: "Parent",
        quote:
          "My son used to miss school when we could not buy his books. Now he looks forward to going every morning.",
        tone: "bg-[#E8F0EC]",
      },
      {
        name: "Ifeoma N.",
        role: "Community volunteer",
        quote:
          "People trust us because we come back. That is what makes families bring their children to the programme.",
        tone: "bg-[#F8E8E3]",
      },
    ],
    gallery: [
      { src: impact2, alt: "Children taking part in a learning session" },
      { src: impact3, alt: "Families at a Foundation programme" },
      { src: impact6, alt: "Volunteers and children together" },
      { src: impact7, alt: "A community moment from an outreach" },
    ],
    donation: {
      goal: 3000000,
      fallbackRaised: 900000,
      presets: [100000, 250000, 500000, 1000000, 2000000],
    },
  },

  "skills-development": {
    slug: "skills-development",
    tag: "Skills Development",
    title: "Empowering mothers to grow.",
    intro:
      "Practical economic skills that help mothers support their families, turning short-term relief into lasting independence.",
    image: impact12,
    imageAlt: "Mothers learning practical skills together",
    about: [
      "Relief that ends when the money runs out only goes so far. We want mothers to be able to stand on their own, and to meet a child's needs without waiting for someone else to help.",
      "Skills Development equips mothers with practical skills so they can earn an income and support their families over the long term.",
      "When a mother is healthy, confident and earning, the whole family benefits, and that is the change we are working towards.",
    ],
    details: [
      {
        title: "Practical skills training",
        text: "Hands-on training in skills that can turn into an income.",
      },
      {
        title: "Earning an income",
        text: "Support to put new skills to work and build a livelihood.",
      },
      {
        title: "Confidence and community",
        text: "Learning alongside other mothers who share the same goals.",
      },
      {
        title: "Lasting independence",
        text: "Moving families from short-term help towards standing on their own.",
      },
    ],
    facts: [
      { label: "Programme", value: "Skills Development" },
      { label: "Location", value: "Nigeria" },
      { label: "Status", value: "Ongoing" },
      { label: "Began", value: "2019" },
      { label: "Supported", value: "500+ women" },
    ],
    testimonials: [
      {
        name: "Blessing U.",
        role: "Programme participant",
        quote:
          "I learned a skill I can earn from. When a child falls sick, I no longer have to wait for someone else to help.",
        tone: "bg-[#F8E8E3]",
      },
      {
        name: "Chiamaka E.",
        role: "Programme participant",
        quote:
          "Learning with other mothers gave me confidence. I now have something of my own to build on.",
        tone: "bg-[#E8F0EC]",
      },
      {
        name: "Ifeoma N.",
        role: "Community volunteer",
        quote:
          "It is wonderful to watch a mother go from asking for help to helping the mothers who come after her.",
        tone: "bg-[#FBF1D4]",
      },
    ],
    gallery: [
      { src: impact11, alt: "Mothers learning together" },
      { src: impact13, alt: "The Foundation team with families" },
      { src: impact16, alt: "Volunteers supporting mothers" },
      { src: impact1, alt: "A moment from a Foundation outreach" },
    ],
    donation: {
      goal: 4000000,
      fallbackRaised: 1200000,
      presets: [100000, 250000, 500000, 1000000, 2000000],
    },
  },
};

/* ------------------------------------------------------------------
   Case-study copy per programme. Markers inside `overview`:
   {{phrase}} and [[phrase]] both render as yellow spans.
------------------------------------------------------------------- */
type Case = {
  titleLead: string;
  titleAccent: string;
  pills: string[];
  overview: string;
  problem: string;
  goal: string;
  solution: string;
  outcome: string;
};

const CASES: Record<string, Case> = {
  "maternal-healthcare": {
    titleLead: "Care that reaches",
    titleAccent: "every mother.",
    pills: ["Maternal Health", "Hospital Bills", "Newborn Care"],
    overview:
      "Maternal Healthcare is a programme built to give mothers in underserved communities {{safe, dignified care}} when they need it most. By combining [[financial support]] for bills, guidance before birth and follow-up afterwards, it turns {{fear of the cost}} into healthy, confident beginnings for mother and child.",
    problem:
      "Mothers have stayed in hospital for months after giving birth because they could not pay their bills, and some choose riskier ways to deliver because safer options are out of reach.",
    goal: "Make sure no mother within our reach is denied essential care because of her circumstances, before, during and after birth.",
    solution:
      "Check-ups and guidance before birth, help with hospital and delivery costs, and follow-up support for mothers and newborns afterwards.",
    outcome:
      "Mothers recover with their health and confidence restored, babies start stronger, and whole families are set on a better path.",
  },
  "child-welfare": {
    titleLead: "Every child",
    titleAccent: "deserves a future.",
    pills: ["Child Welfare", "Learning Materials", "School Support"],
    overview:
      "Child Welfare gives vulnerable children {{continuous access to learning}}. By pairing [[books and school support]] with a steady path through the years, it turns one-time help into {{foundations}} children can build their lives on.",
    problem:
      "Books, fees and a steady place to study are out of reach for many children in the communities we serve, so they fall behind or leave school.",
    goal: "Give vulnerable children continuous access to basic education so they stay enrolled and keep learning.",
    solution:
      "Learning materials, school support and long-term follow-through, so help does not stop after a single term.",
    outcome:
      "Children grow in confidence, build reading and writing foundations, and open doors for their families.",
  },
  "skills-development": {
    titleLead: "Empowering",
    titleAccent: "mothers to grow.",
    pills: ["Skills Development", "Mothers", "Independence"],
    overview:
      "Skills Development equips mothers with {{practical skills}} to earn an income. By combining [[hands-on training]] with a community of other mothers, it turns short-term relief into {{lasting independence}}.",
    problem:
      "Relief ends when the money runs out, leaving mothers waiting on others to meet a child's needs.",
    goal: "Help mothers stand on their own and support their families over the long term.",
    solution:
      "Hands-on skills training, support to put those skills to work, and a community of mothers learning together.",
    outcome:
      "Mothers earn their own income, gain confidence, and lift their whole families.",
  },
};

/* Gallery: peeking carousel. Swipe on mobile, arrows on desktop */
function Gallery({ items }: { items: { src: string; alt: string }[] }) {
  const ref = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);

  const onScroll = () => {
    const el = ref.current;
    const first = el?.children[0] as HTMLElement | undefined;
    if (!el || !first) return;
    const gap = parseFloat(getComputedStyle(el).columnGap || "0") || 0;
    const i = Math.round(el.scrollLeft / (first.offsetWidth + gap));
    setActive(Math.min(items.length - 1, Math.max(0, i)));
  };

  const go = (i: number) => {
    const next = Math.min(items.length - 1, Math.max(0, i));
    const target = ref.current?.children[next] as HTMLElement | undefined;
    target?.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
  };

  const arrow =
    "grid h-11 w-11 place-items-center rounded-full border border-[#12312B]/20 text-[#12312B] transition-colors duration-300 hover:border-[#12312B] hover:bg-[#12312B] hover:text-white disabled:pointer-events-none disabled:opacity-30";

  return (
    <div>
      <div className="mb-5 flex items-center justify-between gap-6">
        <p className="font-sans text-sm font-semibold tabular-nums">
          {String(active + 1).padStart(2, "0")}
          <span className="text-[#12312B]/35">
            {" "}
            / {String(items.length).padStart(2, "0")}
          </span>
        </p>

        <div className="mx-2 hidden h-px flex-1 bg-[#12312B]/15 sm:block">
          <div
            className="h-px bg-[#12312B] transition-all duration-500"
            style={{ width: `${((active + 1) / items.length) * 100}%` }}
          />
        </div>

        <div className="flex gap-2">
          <button type="button" aria-label="Previous photo" onClick={() => go(active - 1)} disabled={active === 0} className={arrow}>
            <ChevronLeft size={18} />
          </button>
          <button type="button" aria-label="Next photo" onClick={() => go(active + 1)} disabled={active === items.length - 1} className={arrow}>
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <ul
        ref={ref}
        onScroll={onScroll}
        className="-mx-5 flex snap-x snap-mandatory scroll-pl-5 gap-3 overflow-x-auto px-5 pb-2 [scrollbar-width:none] sm:-mx-6 sm:scroll-pl-6 sm:gap-4 sm:px-6 lg:-mx-10 lg:scroll-pl-10 lg:px-10 [&::-webkit-scrollbar]:hidden"
      >
        {items.map((g) => (
          <li key={g.src} className="w-[86%] shrink-0 snap-start sm:w-[62%] lg:w-[46%]">
            <div className="group aspect-[4/5] overflow-hidden rounded-[22px] bg-[#F4F6F2] sm:aspect-[4/3] lg:rounded-[28px]">
              <img
                src={g.src}
                alt={g.alt}
                loading="lazy"
                className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
              />
            </div>
            <p className="mt-3 font-sans text-xs text-[#12312B]">{g.alt}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* Testimonials: tinted cards, staggered on desktop, swipeable on mobile */
function Testimonials({ items }: { items: Programme["testimonials"] }) {
  const reduceMotion = useReducedMotion();

  return (
    <ul className="-mx-5 mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 [scrollbar-width:none] sm:-mx-6 sm:px-6 lg:mx-0 lg:grid lg:grid-cols-3 lg:gap-6 lg:overflow-visible lg:px-0 lg:pb-0 [&::-webkit-scrollbar]:hidden">
      {items.map((t, idx) => (
        <motion.li
          key={t.name}
          initial={reduceMotion ? false : { opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.8, delay: idx * 0.12, ease: EASE }}
          className={`w-[84%] shrink-0 snap-start sm:w-[55%] lg:w-auto ${
            idx === 1 ? "lg:mt-14" : ""
          }`}
        >
          <figure
            className={`group relative flex h-full min-h-[340px] flex-col justify-between overflow-hidden rounded-[24px] p-7 transition-transform duration-500 hover:-translate-y-1.5 motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:p-8 lg:min-h-[400px] lg:rounded-[28px] ${t.tone}`}
          >
            {/* oversized quote mark */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -right-1 -top-6 select-none font-sans text-[160px] font-semibold leading-none text-[#12312B]/[0.07] transition-transform duration-700 group-hover:scale-110 motion-reduce:transition-none"
            >
              “
            </span>

            <div className="relative">
              <span className="mb-6 block h-1 w-10 rounded-full bg-[#E6A100]" />
              <blockquote className="font-sans text-[clamp(1.1rem,1.5vw,1.35rem)] font-medium leading-[1.5] tracking-[-0.02em] text-[#12312B]">
                {t.quote}
              </blockquote>
            </div>

            <figcaption className="relative mt-10 flex items-center gap-3.5 border-t border-[#12312B]/15 pt-5">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#12312B] font-sans text-sm font-semibold text-[#E6A100]">
                {t.name.charAt(0)}
              </span>
              <span>
                <span className="block font-sans text-sm font-semibold text-[#12312B]">
                  {t.name}
                </span>
                <span className="block font-sans text-xs text-[#12312B]/70">
                  {t.role}
                </span>
              </span>
            </figcaption>
          </figure>
        </motion.li>
      ))}
    </ul>
  );
}

/* Renders overview copy with {{emphasis}} and [[gold]] markers */
function Rich({ text }: { text: string }) {
  const parts = text.split(/(\{\{.*?\}\}|\[\[.*?\]\])/g).filter(Boolean);

  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith("{{") || part.startsWith("[[")) {
          return (
            <span key={i} className="text-[#E6A100]">
              {part.slice(2, -2)}
            </span>
          );
        }

        return <span key={i}>{part}</span>;
      })}
    </>
  );
}

const DEFAULT_SLUG = "maternal-healthcare";

const naira = (n: number) => `₦${Math.round(n).toLocaleString("en-NG")}`;

/* Approximate rate (about ₦1,335 per $1 in late Oct 2026). Update as needed;
   dollar figures are shown as estimates only. */
const NGN_PER_USD = 1350;
const usd = (n: number) =>
  `≈ $${Math.round(n / NGN_PER_USD).toLocaleString("en-US")}`;

/* Live total: sums verified payments tagged to this project and refreshes
   every 30 seconds. If the table is unreachable or has nothing for this
   project, the fallback amount is shown instead. */
function useRaised(slug: string, fallback: number) {
  const [raised, setRaised] = useState(fallback);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        // Look up the project UUID by slug
        const { data: project, error: projErr } = await supabase
          .from("projects")
          .select("id")
          .eq("slug", slug)
          .single();

        if (projErr || !project) return;

        // Sum verified payments for this project
        const { data, error } = await supabase
          .from("payments")
          .select("amount")
          .eq("project_id", project.id)
          .eq("status", "paid");

        if (error || !data || data.length === 0) return;

        const total = data.reduce(
          (sum, row) => sum + Number(row.amount || 0),
          0
        );
        if (!cancelled) setRaised(total);
      } catch {
        /* keep the fallback */
      }
    };

    load();
    const id = window.setInterval(load, 30000);

    return () => {
      cancelled = true;
      window.clearInterval(id);
    };
  }, [slug]);

  return raised;
}

function DonationPanel({ programme }: { programme: Programme }) {
  const reduceMotion = useReducedMotion();
  const { goal, fallbackRaised, presets } = programme.donation;
  const raised = useRaised(programme.slug, fallbackRaised);

  const [amount, setAmount] = useState<number>(presets[1] ?? presets[0]);
  const [custom, setCustom] = useState("");

  const pct = Math.min(100, Math.round((raised / goal) * 100));
  const remaining = Math.max(0, goal - raised);
  const chosen = custom ? Number(custom) || 0 : amount;

  const donateTo = `/donate?project=${programme.slug}${
    chosen ? `&amount=${chosen}` : ""
  }`;

  return (
    <div className="relative overflow-hidden rounded-[24px] bg-[#12312B] px-6 py-10 text-white sm:rounded-[30px] sm:px-10 sm:py-12 lg:px-14 lg:py-14">
      {/* soft rings, bottom-right */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-28 -right-28 h-[380px] w-[380px]"
      >
        <span className="absolute inset-0 rounded-full border border-[#E6A100]/25" />
        <span className="absolute inset-[18%] rounded-full border border-[#E6A100]/25" />
        <span className="absolute inset-[36%] rounded-full border border-[#E6A100]/25" />
      </div>

      <div className="relative grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        {/* Progress */}
        <div>
          <span className="flex items-center justify-center gap-2 font-sans text-[11px] font-medium uppercase tracking-[0.16em] text-white/70">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#E6A100] opacity-60 motion-reduce:animate-none" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#E6A100]" />
            </span>
            Live donations
          </span>

          <h2 className="mx-auto mt-4 max-w-[480px] text-center font-sans text-[clamp(1.9rem,3.4vw,2.9rem)] font-semibold leading-[1.08] tracking-[-0.035em]">
            Help us fund {programme.tag}.
          </h2>

          <p className="mx-auto mt-4 max-w-[440px] text-center font-sans text-sm leading-[1.8] text-white/70">
            Every naira goes into this programme. Here is how far we have come
            and how much is still needed.
          </p>

          <div className="mt-9">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="font-sans text-[clamp(2rem,4vw,3rem)] font-semibold leading-none tracking-[-0.03em] tabular-nums">
                  {naira(raised)}
                  <span className="ml-3 text-sm font-normal tracking-normal text-white/55">
                    {usd(raised)}
                  </span>
                </p>
                <p className="mt-2 font-sans text-xs text-white/60">
                  raised of {naira(goal)} goal ({usd(goal)})
                </p>
              </div>

              <p className="font-sans text-2xl font-semibold text-[#E6A100] tabular-nums">
                {pct}%
              </p>
            </div>

            <div
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={pct}
              aria-label="Funding progress"
              className="mt-4 h-2.5 overflow-hidden rounded-full bg-white/15"
            >
              <motion.div
                initial={reduceMotion ? false : { width: 0 }}
                whileInView={{ width: `${pct}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1.4, ease: EASE }}
                className="h-full rounded-full bg-[#E6A100]"
              />
            </div>

            <p className="mt-4 font-sans text-sm text-white/75">
              <span className="font-semibold text-white">
                {naira(remaining)}
              </span>{" "}
              still needed to reach the goal.
            </p>
          </div>
        </div>

        {/* Give */}
        <div className="rounded-[20px] bg-white p-6 text-[#12312B] sm:p-8">
          <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.16em] text-[#12312B]/45">
            CHOOSE AN AMOUNT
          </span>

          <div className="mt-4 grid grid-cols-2 gap-3">
            {presets.map((p, idx) => {
              const selected = !custom && amount === p;

              return (
                <button
                  key={p}
                  type="button"
                  onClick={() => {
                    setAmount(p);
                    setCustom("");
                  }}
                  aria-pressed={selected}
                  className={`rounded-xl px-4 py-3.5 font-sans text-sm font-semibold transition-colors duration-300 ${
                    presets.length % 2 === 1 && idx === presets.length - 1
                      ? "col-span-2"
                      : ""
                  } ${
                    selected
                      ? "bg-[#12312B] text-white"
                      : "bg-[#F4F6F2] text-[#12312B] hover:bg-[#E8F0EC]"
                  }`}
                >
                  <span className="block">{naira(p)}</span>
                  <span
                    className={`mt-0.5 block text-[11px] font-normal ${
                      selected ? "text-white/65" : "text-[#12312B]/50"
                    }`}
                  >
                    {usd(p)}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="mt-5">
            <label
              htmlFor="custom-amount"
              className="mb-1 block font-sans text-xs font-medium"
            >
              Or enter your own amount
            </label>

            <div className="flex items-center border-b border-[#12312B]/20 transition-colors focus-within:border-[#12312B]">
              <span className="font-sans text-sm text-[#12312B]/55">₦</span>
              <input
                id="custom-amount"
                type="number"
                inputMode="numeric"
                min={0}
                value={custom}
                onChange={(e) => setCustom(e.target.value)}
                placeholder="0"
                className="w-full bg-transparent px-2 py-3 font-sans text-sm outline-none placeholder:text-[#12312B]/35"
              />
            </div>
          </div>

          {chosen > 0 && (
            <p className="mt-5 font-sans text-xs text-[#12312B]/60">
              You are giving {naira(chosen)} ({usd(chosen)})
            </p>
          )}

          <div className="mt-5">
            <PillButton to={donateTo} variant="gold">
              {chosen ? `DONATE ${naira(chosen)}` : "DONATE NOW"}
            </PillButton>
          </div>

          <p className="mt-5 font-sans text-[11px] leading-[1.7] text-[#12312B]/50">
            Your gift is directed to {programme.tag}. You can review the amount
            on the next step. Dollar amounts are approximate.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function ProgramsDetailsPage() {
  const { slug = DEFAULT_SLUG } = useParams();
  const reduceMotion = useReducedMotion();
  const hardcoded = PROGRAMMES[slug];

  /* Database-backed project state (for projects created via dashboard) */
  const [dbProject, setDbProject] = useState<any>(null);
  const [dbImages, setDbImages] = useState<{ src: string; alt: string }[]>([]);
  const [dbTestimonials, setDbTestimonials] = useState<{
    name: string;
    role: string | null;
    content: string;
    image: string | null;
  }[]>([]);
  const [dbRaised, setDbRaised] = useState(0);
  const [loading, setLoading] = useState(true);
  const [dbGoal, setDbGoal] = useState(0);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      if (hardcoded) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);

        const { data: project, error: projErr } = await supabase
          .from("projects")
          .select("*")
          .eq("slug", slug)
          .single();

        if (projErr || !project) {
          if (!cancelled) setLoading(false);
          return;
        }

        setDbProject(project);
        setDbGoal(Math.round((project.amount || 0) / 100));

        /* Secondary images */
        const { data: images } = await supabase
          .from("project_images")
          .select("image_url, caption")
          .eq("project_id", project.id);

        setDbImages(
          (images ?? []).map((img: any) => ({
            src: img.image_url,
            alt: img.caption || project.title,
          }))
        );

        /* Testimonials */
        const { data: testimonials } = await supabase
          .from("project_testimonials")
          .select("name, role, content, image")
          .eq("project_id", project.id);

        setDbTestimonials(
          (testimonials ?? []).map((t: any) => ({
            name: t.name,
            role: t.role,
            content: t.content,
            image: t.image,
          }))
        );

        /* Verified payments total (kobo → naira) */
        const { data: payments } = await supabase
          .from("payments")
          .select("amount")
          .eq("project_id", project.id)
          .eq("status", "paid");

        const totalKobo = (payments ?? []).reduce(
          (sum: number, row: any) => sum + Number(row.amount || 0),
          0
        );
        setDbRaised(Math.round(totalKobo / 100));

        if (!cancelled) setLoading(false);
      } catch {
        if (!cancelled) setLoading(false);
      }
    };

    load();

    return () => {
      cancelled = true;
    };
  }, [slug, hardcoded]);

  const reveal = (delay = 0) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-50px" },
    transition: { duration: 0.85, delay, ease: EASE },
  });

  const programmeOrDb = hardcoded || dbProject;
  if (!programmeOrDb || (loading && !hardcoded)) {
    return (
      <main className="grid min-h-[70vh] place-items-center bg-white px-5 pt-32 font-sans text-[#12312B]">
        <div className="text-center">
          <h1 className="text-3xl font-semibold tracking-[-0.03em]">
            Programme not found
          </h1>
          <p className="mt-3 text-sm text-[#12312B]/65">
            We couldn't find the programme you were looking for.
          </p>
          <Link
            to="/our-work"
            className="mt-6 inline-block text-xs font-semibold uppercase tracking-wider underline underline-offset-4"
          >
            Back to programmes
          </Link>
        </div>
      </main>
    );
  }

  /* Hardcoded project path */
  if (hardcoded) {
    const c = CASES[hardcoded.slug];

    const keyFacts = hardcoded.facts
      .filter((f) => f.label !== "Programme")
      .slice(0, 4);

    const rows = [
      { label: "Problem", text: c.problem },
      { label: "Goal", text: c.goal },
      { label: "Solution", text: c.solution },
      { label: "Outcome", text: c.outcome },
    ];

    return (
      <main className="overflow-hidden bg-white font-sans text-[#12312B]">
        {/* HERO */}
        <section className="relative px-5 pt-28 sm:px-6 sm:pt-36 lg:px-10 lg:pt-40">
          <svg
            aria-hidden="true"
            viewBox="0 0 440 440"
            fill="none"
            className="pointer-events-none absolute right-0 top-0 h-[240px] w-[240px] -scale-x-100 sm:h-[320px] sm:w-[320px] lg:h-[440px] lg:w-[440px]"
          >
            <motion.g
              initial={reduceMotion ? false : { opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: EASE }}
              style={{ transformOrigin: "0px 0px" }}
            >
              <path d="M0 0 H70 A70 70 0 0 1 0 70 Z" fill="#E6A100" />
              {[110, 160, 210, 260, 310, 360].map((r, i) => (
                <path
                  key={r}
                  d={`M${r} 0 A${r} ${r} 0 0 1 0 ${r}`}
                  stroke="#E6A100"
                  strokeWidth="1.5"
                  opacity={1 - i * 0.14}
                />
              ))}
              <path
                d="M400 0 A400 400 0 0 1 0 400"
                stroke="#E6A100"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray="1 12"
              />
              <circle cx="148" cy="148" r="8" fill="#E6A100" />
              <circle cx="224" cy="224" r="5" fill="#E6A100" />
              <circle cx="296" cy="102" r="4" fill="#E6A100" opacity="0.7" />
              <circle cx="102" cy="296" r="4" fill="#E6A100" opacity="0.7" />
            </motion.g>
          </svg>

          <div className="relative mx-auto max-w-[1400px]">
            <motion.div {...reveal(0)} className="mb-8 sm:mb-10">
              <Link
                to="/our-work"
                aria-label="Back"
                className="group inline-flex items-center gap-3 font-sans text-xs font-semibold uppercase tracking-wider text-[#12312B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E6A100] focus-visible:ring-offset-4"
              >
                <span className="grid h-10 w-10 place-items-center rounded-full border border-[#12312B]/20 transition-all duration-300 group-hover:border-[#12312B] group-hover:bg-[#12312B] group-hover:text-white">
                  <CustomArrowLeft
                    size={14}
                    color="currentColor"
                    className="transition-transform duration-300 group-hover:-translate-x-0.5"
                  />
                </span>
                Back
              </Link>
            </motion.div>

            <div className="grid gap-8 lg:grid-cols-[1.5fr_0.9fr] lg:items-end lg:gap-20">
              <div>
                <motion.span
                  {...reveal(0.02)}
                  className="inline-flex items-center gap-2 font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-[#12312B]"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-[#E6A100]" />
                  Programme
                </motion.span>

                <motion.h1
                  {...reveal(0.05)}
                  className="mt-5 font-sans text-[clamp(2.8rem,6.4vw,5.8rem)] font-semibold leading-[1.02] tracking-[-0.055em]"
                >
                  {c.titleLead} {c.titleAccent}
                </motion.h1>

                <motion.ul {...reveal(0.1)} className="mt-7 flex flex-wrap gap-2">
                  {c.pills.map((pill) => (
                    <li
                      key={pill}
                      className="rounded-full border border-[#12312B]/30 px-3.5 py-1.5 font-sans text-[11px] font-medium text-[#12312B]"
                    >
                      {pill}
                    </li>
                  ))}
                </motion.ul>
              </div>

              <motion.p
                {...reveal(0.2)}
                className="max-w-[460px] font-sans text-base leading-[1.8] text-[#12312B] sm:text-lg lg:justify-self-end"
              >
                {hardcoded.intro}
              </motion.p>
            </div>

            <motion.dl
              {...reveal(0.15)}
              className="mt-10 grid grid-cols-2 border-y border-[#12312B]/20 lg:grid-cols-4"
            >
              {keyFacts.map((f, i) => (
                <div
                  key={f.label}
                  className={`px-1 py-5 sm:px-6 ${i > 0 ? "lg:border-l lg:border-[#12312B]/20" : "lg:pl-0"} ${
                    i % 2 === 1 ? "border-l border-[#12312B]/20 pl-5 lg:pl-6" : ""
                  } ${i >= 2 ? "border-t border-[#12312B]/20 lg:border-t-0" : ""}`}
                >
                  <dt className="font-sans text-[10px] font-semibold uppercase tracking-[0.14em] text-[#12312B]/70">
                    {f.label}
                  </dt>
                  <dd className="mt-1.5 font-sans text-sm font-semibold sm:text-base">
                    {f.value}
                  </dd>
                </div>
              ))}
            </motion.dl>
          </div>
        </section>

        <section className="px-5 pt-8 sm:px-6 lg:px-10">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 1, ease: EASE }}
            className="mx-auto max-w-[1400px] rounded-[28px] border border-[#12312B]/20 p-2 sm:p-3 lg:rounded-[36px]"
          >
            <div className="h-[300px] overflow-hidden rounded-[20px] bg-[#E8F0EC] sm:h-[440px] lg:h-[580px] lg:rounded-[26px]">
              <img
                src={hardcoded.image}
                alt={hardcoded.imageAlt}
                className="h-full w-full object-cover object-top"
              />
            </div>
          </motion.div>
        </section>

        <section className="px-5 pb-16 pt-16 sm:px-6 sm:pt-24 lg:px-10 lg:pb-24 lg:pt-32">
          <div className="mx-auto grid max-w-[1400px] gap-8 lg:grid-cols-[0.6fr_1.4fr] lg:gap-16">
            <motion.span
              {...reveal(0)}
              className="font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-[#12312B]"
            >
              [Programme Overview]
            </motion.span>

            <div className="max-w-[820px]">
              <motion.p
                {...reveal(0.05)}
                className="font-sans text-[clamp(1.2rem,2vw,1.6rem)] font-medium leading-[1.5] tracking-[-0.02em] text-[#12312B]"
              >
                <Rich text={c.overview} />
              </motion.p>

              <dl className="mt-12 border-b border-[#12312B]/20">
                {rows.map((r, i) => (
                  <motion.div
                    key={r.label}
                    {...reveal(i * 0.06)}
                    className="grid gap-2 border-t border-[#12312B]/20 py-6 sm:grid-cols-[180px_1fr] sm:gap-8 sm:py-7"
                  >
                    <dt className="flex items-baseline gap-3 font-sans text-xs font-semibold uppercase tracking-[0.14em]">
                      <span className="text-[#E6A100]">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {r.label}
                    </dt>
                    <dd className="font-sans text-[15px] leading-[1.8] text-[#12312B]">
                      {r.text}
                    </dd>
                  </motion.div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        <section className="px-5 pb-16 sm:px-6 lg:px-10 lg:pb-24">
          <div className="mx-auto max-w-[1400px]">
            <motion.div {...reveal(0)} className="max-w-[560px]">
              <span className="inline-flex items-center gap-2 font-sans text-[10px] font-semibold uppercase tracking-[0.16em] text-[#12312B]/55 sm:text-[11px]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#E6A100]" />
                On the ground
              </span>

              <h2 className="mt-5 font-sans text-3xl font-semibold leading-[1.12] tracking-[-0.04em] sm:text-4xl">
                Moments from the programme.
              </h2>
            </motion.div>

            <motion.div {...reveal(0.1)} className="mt-10">
              <Gallery items={hardcoded.gallery} />
            </motion.div>
          </div>
        </section>

        <section className="px-5 pb-16 sm:px-6 lg:px-10 lg:pb-24">
          <div className="mx-auto max-w-[1400px]">
            <motion.div {...reveal(0)} className="max-w-[560px]">
              <span className="inline-flex items-center gap-2 font-sans text-[10px] font-semibold uppercase tracking-[0.16em] text-[#12312B]/55 sm:text-[11px]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#E6A100]" />
                In their words
              </span>

              <h2 className="mt-5 font-sans text-3xl font-semibold leading-[1.12] tracking-[-0.04em] sm:text-4xl">
                The difference it makes.
              </h2>
            </motion.div>

            <Testimonials items={hardcoded.testimonials} />
          </div>
        </section>

        <section className="px-5 pb-20 sm:px-6 sm:pb-24 lg:px-10 lg:pb-32">
          <motion.div {...reveal(0)} className="mx-auto max-w-[1400px]">
            <DonationPanel programme={hardcoded} />
          </motion.div>
        </section>
      </main>
    );
  }

  /* Database-backed project path */
  const p = dbProject!;
  const tags = p.tags ?? [];
  const tagLabel = tags.length > 0 ? tags[0] : "Programme";
  const goalNaira = dbGoal || 0;
  const raisedNaira = dbRaised || 0;
  const pct = Math.min(100, Math.round((raisedNaira / Math.max(goalNaira, 1)) * 100));
  const remaining = Math.max(0, goalNaira - raisedNaira);

  const dbProgramme: any = {
    slug: p.slug,
    tag: tagLabel,
    title: p.title,
    intro: p.summary || "",
    image: p.cover_image || impact1,
    imageAlt: p.title,
    gallery: dbImages,
    testimonials: dbTestimonials.map((t) => ({
      name: t.name,
      role: t.role || "",
      quote: t.content,
      tone: "bg-[#E8F0EC]",
    })),
    donation: {
      goal: goalNaira,
      fallbackRaised: raisedNaira,
      presets: [100000, 250000, 500000, 1000000, 2000000],
    },
  };

  const dbKeyFacts = [
    { label: "Location", value: p.location || "Not set" },
    { label: "Status", value: p.status || "Ongoing" },
    { label: "Began", value: p.start_date ? new Date(p.start_date).toLocaleDateString("en-NG", { year: "numeric" }) : "2019" },
    { label: "Supported", value: "See dashboard" },
  ];

  const dbRows = [
    { label: "Problem", text: p.problem || "Not set" },
    { label: "Goal", text: p.description || "Not set" },
    { label: "Solution", text: p.solution || "Not set" },
    { label: "Outcome", text: p.outcome || "Not set" },
  ];

  const donateTo = `/donate?project=${p.slug}`;

  return (
    <main className="overflow-hidden bg-white font-sans text-[#12312B]">
      <section className="relative px-5 pt-28 sm:px-6 sm:pt-36 lg:px-10 lg:pt-40">
        <svg
          aria-hidden="true"
          viewBox="0 0 440 440"
          fill="none"
          className="pointer-events-none absolute right-0 top-0 h-[240px] w-[240px] -scale-x-100 sm:h-[320px] sm:w-[320px] lg:h-[440px] lg:w-[440px]"
        >
          <motion.g
            initial={reduceMotion ? false : { opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: EASE }}
            style={{ transformOrigin: "0px 0px" }}
          >
            <path d="M0 0 H70 A70 70 0 0 1 0 70 Z" fill="#E6A100" />
            {[110, 160, 210, 260, 310, 360].map((r, i) => (
              <path
                key={r}
                d={`M${r} 0 A${r} ${r} 0 0 1 0 ${r}`}
                stroke="#E6A100"
                strokeWidth="1.5"
                opacity={1 - i * 0.14}
              />
            ))}
            <path
              d="M400 0 A400 400 0 0 1 0 400"
              stroke="#E6A100"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray="1 12"
            />
            <circle cx="148" cy="148" r="8" fill="#E6A100" />
            <circle cx="224" cy="224" r="5" fill="#E6A100" />
            <circle cx="296" cy="102" r="4" fill="#E6A100" opacity="0.7" />
            <circle cx="102" cy="296" r="4" fill="#E6A100" opacity="0.7" />
          </motion.g>
        </svg>

        <div className="relative mx-auto max-w-[1400px]">
          <motion.div {...reveal(0)} className="mb-8 sm:mb-10">
            <Link
              to="/our-work"
              aria-label="Back"
              className="group inline-flex items-center gap-3 font-sans text-xs font-semibold uppercase tracking-wider text-[#12312B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E6A100] focus-visible:ring-offset-4"
            >
              <span className="grid h-10 w-10 place-items-center rounded-full border border-[#12312B]/20 transition-all duration-300 group-hover:border-[#12312B] group-hover:bg-[#12312B] group-hover:text-white">
                <CustomArrowLeft
                  size={14}
                  color="currentColor"
                  className="transition-transform duration-300 group-hover:-translate-x-0.5"
                />
              </span>
              Back
            </Link>
          </motion.div>

          <div className="grid gap-8 lg:grid-cols-[1.5fr_0.9fr] lg:items-end lg:gap-20">
            <div>
              <motion.span
                {...reveal(0.02)}
                className="inline-flex items-center gap-2 font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-[#12312B]"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-[#E6A100]" />
                Programme
              </motion.span>

              <motion.h1
                {...reveal(0.05)}
                className="mt-5 font-sans text-[clamp(2.8rem,6.4vw,5.8rem)] font-semibold leading-[1.02] tracking-[-0.055em]"
              >
                {p.title}
              </motion.h1>

              <motion.ul {...reveal(0.1)} className="mt-7 flex flex-wrap gap-2">
                {tags.map((t: string, i: number) => (
                  <li
                    key={i}
                    className="rounded-full border border-[#12312B]/30 px-3.5 py-1.5 font-sans text-[11px] font-medium text-[#12312B]"
                  >
                    {t}
                  </li>
                ))}
              </motion.ul>
            </div>

            <motion.p
              {...reveal(0.2)}
              className="max-w-[460px] font-sans text-base leading-[1.8] text-[#12312B] sm:text-lg lg:justify-self-end"
            >
              {p.summary || ""}
            </motion.p>
          </div>

          <motion.dl
            {...reveal(0.15)}
            className="mt-10 grid grid-cols-2 border-y border-[#12312B]/20 lg:grid-cols-4"
          >
            {dbKeyFacts.map((f, i) => (
              <div
                key={f.label}
                className={`px-1 py-5 sm:px-6 ${i > 0 ? "lg:border-l lg:border-[#12312B]/20" : "lg:pl-0"} ${
                  i % 2 === 1 ? "border-l border-[#12312B]/20 pl-5 lg:pl-6" : ""
                } ${i >= 2 ? "border-t border-[#12312B]/20 lg:border-t-0" : ""}`}
              >
                <dt className="font-sans text-[10px] font-semibold uppercase tracking-[0.14em] text-[#12312B]/70">
                  {f.label}
                </dt>
                <dd className="mt-1.5 font-sans text-sm font-semibold sm:text-base">
                  {f.value}
                </dd>
              </div>
            ))}
          </motion.dl>
        </div>
      </section>

      <section className="px-5 pt-8 sm:px-6 lg:px-10">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 1, ease: EASE }}
          className="mx-auto max-w-[1400px] rounded-[28px] border border-[#12312B]/20 p-2 sm:p-3 lg:rounded-[36px]"
        >
          <div className="h-[300px] overflow-hidden rounded-[20px] bg-[#E8F0EC] sm:h-[440px] lg:h-[580px] lg:rounded-[26px]">
            <img
              src={p.cover_image || impact1}
              alt={p.title}
              className="h-full w-full object-cover object-top"
            />
          </div>
        </motion.div>
      </section>

      <section className="px-5 pb-16 pt-16 sm:px-6 sm:pt-24 lg:px-10 lg:pb-24 lg:pt-32">
        <div className="mx-auto grid max-w-[1400px] gap-8 lg:grid-cols-[0.6fr_1.4fr] lg:gap-16">
          <motion.span
            {...reveal(0)}
            className="font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-[#12312B]"
          >
            [Programme Overview]
          </motion.span>

          <div className="max-w-[820px]">
            <motion.p
              {...reveal(0.05)}
              className="font-sans text-[clamp(1.2rem,2vw,1.6rem)] font-medium leading-[1.5] tracking-[-0.02em] text-[#12312B]"
            >
              {p.description || ""}
            </motion.p>

            <dl className="mt-12 border-b border-[#12312B]/20">
              {dbRows.map((r, i) => (
                <motion.div
                  key={r.label}
                  {...reveal(i * 0.06)}
                  className="grid gap-2 border-t border-[#12312B]/20 py-6 sm:grid-cols-[180px_1fr] sm:gap-8 sm:py-7"
                >
                  <dt className="flex items-baseline gap-3 font-sans text-xs font-semibold uppercase tracking-[0.14em]">
                    <span className="text-[#E6A100]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {r.label}
                  </dt>
                  <dd className="font-sans text-[15px] leading-[1.8] text-[#12312B]">
                    {r.text}
                  </dd>
                </motion.div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="px-5 pb-16 sm:px-6 lg:px-10 lg:pb-24">
        <div className="mx-auto max-w-[1400px]">
          <motion.div {...reveal(0)} className="max-w-[560px]">
            <span className="inline-flex items-center gap-2 font-sans text-[10px] font-semibold uppercase tracking-[0.16em] text-[#12312B]/55 sm:text-[11px]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#E6A100]" />
              On the ground
            </span>

            <h2 className="mt-5 font-sans text-3xl font-semibold leading-[1.12] tracking-[-0.04em] sm:text-4xl">
              Moments from the programme.
            </h2>
          </motion.div>

          <motion.div {...reveal(0.1)} className="mt-10">
            {dbImages.length > 0 ? (
              <Gallery items={dbImages} />
            ) : (
              <div className="text-[#12312B]/40 text-sm text-center py-20">
                No gallery images yet.
              </div>
            )}
          </motion.div>
        </div>
      </section>

      <section className="px-5 pb-16 sm:px-6 lg:px-10 lg:pb-24">
        <div className="mx-auto max-w-[1400px]">
          <motion.div {...reveal(0)} className="max-w-[560px]">
            <span className="inline-flex items-center gap-2 font-sans text-[10px] font-semibold uppercase tracking-[0.16em] text-[#12312B]/55 sm:text-[11px]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#E6A100]" />
              In their words
            </span>

            <h2 className="mt-5 font-sans text-3xl font-semibold leading-[1.12] tracking-[-0.04em] sm:text-4xl">
              The difference it makes.
            </h2>
          </motion.div>

          {dbTestimonials.length > 0 ? (
            <Testimonials items={dbProgramme.testimonials} />
          ) : (
            <div className="text-[#12312B]/40 text-sm text-center py-20">
              No testimonials yet.
            </div>
          )}
        </div>
      </section>

      <section className="px-5 pb-20 sm:px-6 sm:pb-24 lg:px-10 lg:pb-32">
        <motion.div {...reveal(0)} className="mx-auto max-w-[1400px]">
          <div className="relative overflow-hidden rounded-[24px] bg-[#12312B] px-6 py-10 text-white sm:rounded-[30px] sm:px-10 sm:py-12 lg:px-14 lg:py-14">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-28 -right-28 h-[380px] w-[380px]"
            >
              <span className="absolute inset-0 rounded-full border border-[#E6A100]/25" />
              <span className="absolute inset-[18%] rounded-full border border-[#E6A100]/25" />
              <span className="absolute inset-[36%] rounded-full border border-[#E6A100]/25" />
            </div>

            <div className="relative grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
              <div>
                <span className="flex items-center justify-center gap-2 font-sans text-[11px] font-medium uppercase tracking-[0.16em] text-white/70">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#E6A100] opacity-60 motion-reduce:animate-none" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-[#E6A100]" />
                  </span>
                  Live donations
                </span>

                <h2 className="mx-auto mt-4 max-w-[480px] text-center font-sans text-[clamp(1.9rem,3.4vw,2.9rem)] font-semibold leading-[1.08] tracking-[-0.035em]">
                  Help us fund {tagLabel}.
                </h2>

                <p className="mx-auto mt-4 max-w-[440px] text-center font-sans text-sm leading-[1.8] text-white/70">
                  Every naira goes into this programme. Here is how far we have come
                  and how much is still needed.
                </p>

                <div className="mt-9">
                  <div className="flex items-end justify-between gap-4">
                    <div>
                      <p className="font-sans text-[clamp(2rem,4vw,3rem)] font-semibold leading-none tracking-[-0.03em] tabular-nums">
                        {naira(raisedNaira)}
                        <span className="ml-3 text-sm font-normal tracking-normal text-white/55">
                          {usd(raisedNaira)}
                        </span>
                      </p>
                      <p className="mt-2 font-sans text-xs text-white/60">
                        raised of {naira(goalNaira)} goal ({usd(goalNaira)})
                      </p>
                    </div>

                    <p className="font-sans text-2xl font-semibold text-[#E6A100] tabular-nums">
                      {pct}%
                    </p>
                  </div>

                  <div
                    role="progressbar"
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-valuenow={pct}
                    aria-label="Funding progress"
                    className="mt-4 h-2.5 overflow-hidden rounded-full bg-white/15"
                  >
                    <motion.div
                      initial={reduceMotion ? false : { width: 0 }}
                      whileInView={{ width: `${pct}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.4, ease: EASE }}
                      className="h-full rounded-full bg-[#E6A100]"
                    />
                  </div>

                  <p className="mt-4 font-sans text-sm text-white/75">
                    <span className="font-semibold text-white">
                      {naira(remaining)}
                    </span>{" "}
                    still needed to reach the goal.
                  </p>
                </div>
              </div>

              <div className="rounded-[20px] bg-white p-6 text-[#12312B] sm:p-8">
                <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.16em] text-[#12312B]/45">
                  CHOOSE AN AMOUNT
                </span>

                <div className="mt-4 grid grid-cols-2 gap-3">
                  {dbProgramme.donation.presets.map((preset: number, idx: number) => {
                    return (
                      <button
                        key={preset}
                        type="button"
                        className={`rounded-xl px-4 py-3.5 font-sans text-sm font-semibold transition-colors duration-300 ${
                          dbProgramme.donation.presets.length % 2 === 1 && idx === dbProgramme.donation.presets.length - 1
                            ? "col-span-2"
                            : ""
                        } bg-[#F4F6F2] text-[#12312B] hover:bg-[#E8F0EC]`}
                      >
                        <span className="block">{naira(preset)}</span>
                        <span className="mt-0.5 block text-[11px] font-normal text-[#12312B]/50">
                          {usd(preset)}
                        </span>
                      </button>
                    );
                  })}
                </div>

                <div className="mt-5">
                  <label
                    htmlFor="custom-amount-db"
                    className="mb-1 block font-sans text-xs font-medium"
                  >
                    Or enter your own amount
                  </label>

                  <div className="flex items-center border-b border-[#12312B]/20 transition-colors focus-within:border-[#12312B]">
                    <span className="font-sans text-sm text-[#12312B]/55">₦</span>
                    <input
                      id="custom-amount-db"
                      type="number"
                      inputMode="numeric"
                      min={0}
                      defaultValue="0"
                      placeholder="0"
                      className="w-full bg-transparent px-2 py-3 font-sans text-sm outline-none placeholder:text-[#12312B]/35"
                    />
                  </div>
                </div>

                <div className="mt-5">
                  <PillButton to={donateTo} variant="gold">
                    DONATE NOW
                  </PillButton>
                </div>

                <p className="mt-5 font-sans text-[11px] leading-[1.7] text-[#12312B]/50">
                  Your gift is directed to {tagLabel}. Dollar amounts are approximate.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
