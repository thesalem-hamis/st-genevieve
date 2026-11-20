import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { Image } from "lucide-react";
import AnimatedHeading from "@/components/about/AnimatedHeading";
import { PillButton } from "@/components/about/Shared";
import { supabase } from "@/lib/supabase";
import type { Database } from "@/lib/database";
import { useEffect, useState } from "react";

const EASE = [0.76, 0, 0.24, 1] as const;

type Project = Database["public"]["Tables"]["projects"]["Row"];

export default function ProgramsList() {
  const reduceMotion = useReducedMotion();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  const reveal = (delay = 0) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 32 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-60px" },
    transition: { duration: 0.9, delay, ease: EASE },
  });

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("projects")
          .select("*")
          .order("created_at", { ascending: false });
        if (error) throw error;
        setProjects(data ?? []);
      } catch {
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <section className="relative overflow-hidden bg-white px-5 pb-16 pt-20 text-[#12312B] sm:px-6 sm:pb-20 sm:pt-24 lg:px-10 lg:pb-24 lg:pt-32">
      <div className="relative z-10 mx-auto max-w-[1400px]">

        {/* Centered Header */}
        <div className="mx-auto flex max-w-[700px] flex-col items-center text-center">
          <motion.span
            {...reveal(0)}
            className="inline-flex items-center gap-2 font-sans text-[11px] font-medium uppercase tracking-[0.16em] text-[#12312B]/60"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#E6A100]" />
            What we do
          </motion.span>

          <AnimatedHeading
            as="h2"
            className="mt-4 max-w-[640px] font-sans text-[clamp(2rem,3.8vw,3.4rem)] font-semibold leading-[1.06] tracking-[-0.03em]"
          >
            Programmes Built To Last
          </AnimatedHeading>

          <motion.p
            {...reveal(0.15)}
            className="mt-5 max-w-[520px] font-sans text-sm leading-[1.8] text-[#12312B]/75 sm:text-[15px]"
          >
            Each programme answers a need we saw first-hand in the communities
            we serve.
          </motion.p>
        </div>

        {/* Programme Cards */}
        <div className="mt-10 grid gap-3 lg:mt-14">
          {loading ? (
            <>
              {[1, 2, 3].map((i) => (
                <motion.article
                  key={i}
                  animate={{ opacity: 1 }}
                  className="group grid overflow-hidden rounded-[24px] lg:rounded-[28px] md:grid-cols-2 bg-[#F4F6F2]"
                >
                  <div className={`relative h-[260px] overflow-hidden sm:h-[320px] md:h-auto md:min-h-[380px] ${
                    i % 2 === 1 ? "md:order-2" : ""
                  }`}>
                    <div className="absolute inset-0 h-full w-full bg-[#E8F0EC] animate-pulse" />
                  </div>
                  <div className="flex flex-col justify-between gap-10 p-7 sm:p-8 lg:p-12">
                    <div className="space-y-4">
                      <div className="h-3 w-1/2 rounded bg-[#E8F0EC] animate-pulse" />
                      <div className="h-4 w-3/4 rounded bg-[#E8F0EC] animate-pulse" />
                      <div className="h-3 w-full rounded bg-[#E8F0EC] animate-pulse" />
                    </div>
                    <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
                      <div className="h-9 w-24 rounded-full bg-[#E8F0EC] animate-pulse" />
                      <div className="h-9 w-32 rounded-full bg-[#E8F0EC] animate-pulse" />
                    </div>
                  </div>
                </motion.article>
              ))}
            </>
          ) : projects.length === 0 ? (
            <div className="col-span-full flex flex-col items-center justify-center py-24 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#12312B]/5 mb-4">
                <Image size={24} color="#12312B" />
              </div>
              <p className="text-[#12312B]/40 text-sm font-medium">No programmes published yet.</p>
              <p className="mt-1 text-[#12312B]/30 text-xs">Add one from the dashboard.</p>
            </div>
          ) : (
            projects.map((p, i) => {
              const flip = i % 2 === 1;
              const detailPath = `/projects/${p.slug}`;

              return (
                <motion.article
                  key={p.id}
                  {...reveal(0)}
                  className={`group grid overflow-hidden rounded-[24px] lg:rounded-[28px] md:grid-cols-2 ${flip ? "bg-[#E8F0EC]" : "bg-[#FBF1D4]"}`}
                >
                  {/* Image links to the programme page */}
                  <Link
                    to={detailPath}
                    aria-label={`View ${p.title}`}
                    className={`relative block h-[260px] overflow-hidden sm:h-[320px] md:h-auto md:min-h-[380px] ${
                      flip ? "md:order-2" : ""
                    }`}
                  >
                    {p.cover_image ? (
                      <img
                        src={p.cover_image}
                        alt={p.title}
                        loading="lazy"
                        className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                      />
                    ) : (
                      <div className="absolute inset-0 h-full w-full flex items-center justify-center bg-[#12312B]/[0.05]">
                        <span className="text-xs text-[#12312B]/30">No image</span>
                      </div>
                    )}
                  </Link>

                  <div className="flex flex-col justify-between gap-10 p-7 sm:p-8 lg:p-12">
                    <div>
                      <span className="inline-flex items-center gap-2 font-sans text-[11px] font-medium uppercase tracking-[0.16em] text-[#12312B]/70">
                        <span
                          className="h-1.5 w-1.5 rounded-full bg-[#12312B]"
                        />
                        {String(i + 1).padStart(2, "0")} ·
                        {p.tags?.[0] ?? "Programme"}
                      </span>

                      <h3 className="mt-4 font-sans text-[clamp(1.9rem,3.2vw,2.8rem)] font-semibold leading-[1.08] tracking-[-0.03em]">
                        <Link
                          to={detailPath}
                          className="transition-colors hover:text-[#12312B]/70"
                        >
                          {p.title}
                        </Link>
                      </h3>

                      <p className="mt-4 max-w-[420px] font-sans text-sm leading-[1.7] text-[#12312B]/80 sm:text-[15px]">
                        {p.summary ?? p.description ?? ""}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
                      <PillButton to={detailPath} variant="green">
                        VIEW PROGRAMME
                      </PillButton>

                      <Link
                        to={`/donate?programme=${p.slug}`}
                        className="font-sans text-xs font-semibold uppercase tracking-wider text-[#12312B] underline decoration-[#E6A100] decoration-2 underline-offset-4 transition-colors hover:text-[#12312B]/60"
                      >
                        Support this programme
                      </Link>
                    </div>
                  </div>
                </motion.article>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
}
