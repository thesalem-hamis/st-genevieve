import { Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { BadgeCheck, HeartHandshake, ShieldCheck } from "lucide-react";
import AnimatedHeading from "@/components/about/AnimatedHeading";
import { CustomArrowLeft } from "@/components/ui/CustomIcons";
import { Label, SectionHeader, useReveal } from "@/components/impact/Shared";
import DonateForm from "@/components/donate/DonateForm";
import LiveDonations from "@/components/donate/LiveDonations";
import BankTransfer from "@/components/donate/BankTransfer";
import { USES } from "@/components/donate/data";
import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";

const TRUST = [
  { icon: ShieldCheck, text: "Secure checkout" },
  { icon: BadgeCheck, text: "Registered foundation" },
  { icon: HeartHandshake, text: "Every gift counts" },
] as const;

export default function Donate() {
  const reveal = useReveal();
  const [searchParams] = useSearchParams();
  const [projectId, setProjectId] = useState<string | undefined>();

  useEffect(() => {
    const slug = searchParams.get("project");
    if (!slug) {
      setProjectId(undefined);
      return;
    }

    const loadProject = async () => {
      try {
        const { data, error } = await supabase
          .from("projects")
          .select("id")
          .eq("slug", slug)
          .single();
        if (!error && data) {
          setProjectId(data.id);
        }
      } catch {
        setProjectId(undefined);
      }
    };

    loadProject();
  }, [searchParams]);

  return (
    <main className="overflow-hidden bg-white text-[#12312B]">
      {/* HERO: heading left, form right */}
      <section className="px-5 pb-16 pt-28 sm:px-6 sm:pb-20 sm:pt-36 lg:px-10 lg:pb-24 lg:pt-44">
        <div className="relative mx-auto grid max-w-[1400px] grid-cols-1 items-start gap-x-14 gap-y-10 lg:grid-cols-[1.2fr_1fr]">
          <div>
            {/* BACK LINK (lifted above the grid on desktop) */}
            <motion.div
              {...reveal(0)}
              className="mb-8 sm:mb-10 lg:absolute lg:-top-20 lg:left-0 lg:mb-0"
            >
              <Link
                to="/"
                aria-label="Back to home"
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

            <motion.div {...reveal(0.05)}>
              <Label>Give today</Label>
            </motion.div>

            <div className="mt-6">
              <AnimatedHeading
                as="h1"
                className="font-sans text-[clamp(2.6rem,5.4vw,5.25rem)] font-semibold leading-[0.98] tracking-[-0.06em]"
              >
                Give A Mother And Child A Brighter Tomorrow
              </AnimatedHeading>

              <motion.p
                {...reveal(0.2)}
                className="mt-7 max-w-[500px] font-sans text-sm leading-[1.9] text-[#12312B]/65 sm:text-base"
              >
                Your gift funds healthcare, education and skills for mothers and
                children in underserved communities. It takes less than a
                minute.
              </motion.p>

              <motion.ul
                {...reveal(0.3)}
                className="mt-8 flex flex-wrap gap-x-6 gap-y-3"
              >
                {TRUST.map(({ icon: Icon, text }) => (
                  <li
                    key={text}
                    className="flex items-center gap-2 font-sans text-xs font-medium text-[#12312B]/75 sm:text-[13px]"
                  >
                    <Icon size={16} className="text-[#E6A100]" />
                    {text}
                  </li>
                ))}
              </motion.ul>
            </div>
          </div>

          <DonateForm projectId={projectId} />
        </div>
      </section>

      {/* WHERE YOUR GIFT GOES */}
      <section className="px-4 pb-16 sm:px-6 sm:pb-20 lg:px-10 lg:pb-24">
        <div className="mx-auto max-w-[1400px]">
          <SectionHeader
            label="Where it goes"
            title="Your Gift At Work"
            text="Choose a programme when you give, or let us direct your gift to where it is needed most."
          />

          <div className="mt-10 grid gap-3 md:grid-cols-3 lg:mt-14">
            {USES.map((u, i) => (
              <motion.article
                key={u.title}
                {...reveal(i * 0.1)}
                className={`rounded-[24px] p-7 sm:p-8 lg:rounded-[28px] ${u.bg}`}
              >
                <span className="inline-flex items-center gap-2 font-sans text-[11px] font-medium uppercase tracking-[0.16em] text-[#12312B]/70">
                  <span className={`h-1.5 w-1.5 rounded-full ${u.dot}`} />
                  {String(i + 1).padStart(2, "0")} · {u.tag}
                </span>

                <h3 className="mt-4 font-sans text-2xl font-semibold leading-[1.1] tracking-[-0.03em] sm:text-[1.75rem]">
                  {u.title}
                </h3>

                <p className="mt-3 max-w-[340px] font-sans text-sm leading-[1.7] text-[#12312B]/75">
                  {u.text}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* RECENT GIFTS + BANK TRANSFER */}
      <section className="px-4 pb-20 sm:px-6 sm:pb-24 lg:px-10 lg:pb-32">
        <div className="mx-auto grid max-w-[1400px] gap-3 lg:grid-cols-2 lg:gap-4">
          <LiveDonations />
          <BankTransfer />
        </div>
      </section>
    </main>
  );
}
