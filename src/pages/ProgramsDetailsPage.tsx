import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { supabase } from "@/lib/supabase";
import type { Database } from "@/lib/database";
import AnimatedHeading from "@/components/about/AnimatedHeading";
import { CustomArrowLeft } from "@/components/ui/CustomIcons";

type Project = Database["public"]["Tables"]["projects"]["Row"];
type ProjectImage = Database["public"]["Tables"]["project_images"]["Row"];
type ProjectTestimonial = Database["public"]["Tables"]["project_testimonials"]["Row"];

const EASE = [0.76, 0, 0.24, 1] as const;

const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.85, delay, ease: EASE },
});

function naira(kobo: number) {
  return `₦${(kobo / 100).toLocaleString("en-NG", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

function formatDate(value: string | null) {
  if (!value) return "Not set";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Not set";
  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

export default function ProgramsDetailsPage() {
  const reduceMotion = useReducedMotion();
  const { slug } = useParams<{ slug: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [images, setImages] = useState<ProjectImage[]>([]);
  const [testimonials, setTestimonials] = useState<ProjectTestimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const localReveal = (delay = 0) => ({
    ...reveal(delay),
    initial: reduceMotion ? false : reveal(delay).initial,
  });

  useEffect(() => {
    let alive = true;

    const load = async () => {
      if (!slug) {
        setLoading(false);
        return;
      }

      const { data, error: err } = await supabase
        .from("projects")
        .select("*, project_images(*), project_testimonials(*)")
        .eq("slug", slug)
        .single();

      if (alive) {
        setLoading(false);
        if (err) {
          setError(err.message);
        } else {
          setProject(data);
          setImages((data?.project_images ?? []) as ProjectImage[]);
          setTestimonials(
            (data?.project_testimonials ?? []) as ProjectTestimonial[]
    );
  }
}
    };

    load();
    return () => {
      alive = false;
    };
  }, [slug]);

  if (loading) {
    return (
      <main className="overflow-hidden bg-white text-[#12312B]">
        <section className="px-5 pt-28 sm:px-6 sm:pt-36 lg:px-10 lg:pt-44">
          <div className="mx-auto max-w-[1400px]">
            <p className="text-sm text-[#12312B]/50">Loading…</p>
          </div>
        </section>
      </main>
    );
  }

  if (error) {
    return (
      <main className="overflow-hidden bg-white text-[#12312B]">
        <section className="px-5 pt-28 sm:px-6 sm:pt-36 lg:px-10 lg:pt-44">
          <div className="mx-auto max-w-[1400px]">
            <div className="rounded-lg bg-[#F8E8E3] p-4 text-sm text-[#12312B]">
              {error}
            </div>
          </div>
        </section>
      </main>
    );
  }

  if (!project) {
    return (
      <main className="overflow-hidden bg-white text-[#12312B]">
        <section className="px-5 pt-28 sm:px-6 sm:pt-36 lg:px-10 lg:pt-44">
          <div className="mx-auto max-w-[1400px]">
            <div className="rounded-lg border border-[#12312B]/10 p-4 text-sm text-[#12312B]/50">
              Project not found.
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="overflow-hidden bg-white text-[#12312B]">
      <section className="px-5 pb-20 pt-28 sm:px-6 sm:pb-24 sm:pt-36 lg:px-10 lg:pb-32 lg:pt-44">
        <div className="relative mx-auto grid max-w-[1400px] grid-cols-1 items-start gap-x-8 gap-y-12 lg:grid-cols-[1.4fr_0.95fr] xl:gap-x-14">
          <div className="order-1 lg:col-start-1 lg:row-start-1">
            <motion.div
              {...localReveal(0)}
              className="mb-8 sm:mb-10 lg:absolute lg:-top-20 lg:left-0 lg:mb-0"
            >
              <Link
                to="/projects"
                aria-label="Back to projects"
                className="group inline-flex items-center gap-3 font-sans text-xs font-semibold uppercase tracking-wider text-[#12312B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E6A100] focus-visible:ring-offset-4"
              >
                <span className="grid h-10 w-10 place-items-center rounded-full border border-[#12312B]/20 transition-all duration-300 group-hover:border-[#12312B] group-hover:bg-[#12312B] group-hover:text-white">
                  <CustomArrowLeft
                    size={14}
                    color="currentColor"
                    className="transition-transform duration-300 group-hover:-translate-x-0.5"
                  />
                </span>
                Back to projects
              </Link>
            </motion.div>

            <motion.div {...localReveal(0.05)}>
              <span className="inline-flex items-center gap-2 font-sans text-[10px] font-semibold uppercase tracking-[0.18em] text-[#12312B]/60 sm:text-[11px]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#E6A100]" />
                {project.project_id}
              </span>
            </motion.div>

            <div className="mt-6 flex items-center gap-3">
              <span
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[10px] font-semibold ${
                  project.status === "Ongoing"
                    ? "bg-emerald-50 text-emerald-700"
                    : "bg-amber-50 text-amber-700"
              }`}
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    project.status === "Ongoing"
                      ? "bg-emerald-500"
                      : "bg-amber-500"
                  }`}
                />
                {project.status}
              </span>
              <span className="flex items-center gap-2 text-xs text-[#12312B]/50">
                <span className="flex h-6 w-6 items-center justify-center rounded-full border border-[#12312B]/20">
                  <span className="text-[10px] font-medium">{project.location || "—"}</span>
                </span>
                <span className="text-xs font-medium">{formatDate(project.start_date)}</span>
              </span>
            </div>

            <div className="mt-6">
              <AnimatedHeading
                as="h1"
                className="font-sans text-[clamp(3rem,7vw,6.5rem)] font-semibold leading-[0.98] tracking-[-0.065em]"
              >
                {project.title}
              </AnimatedHeading>

              <motion.p
                {...localReveal(0.2)}
                className="mt-7 max-w-[520px] font-sans text-sm leading-[1.9] text-[#12312B]/65 sm:text-base"
              >
                {project.summary ?? ""}
              </motion.p>

              {project.cover_image && (
                <motion.div {...localReveal(0.25)}>
                  <img
                    src={project.cover_image}
                    alt={project.title}
                    className="mt-8 w-full rounded-[24px] object-cover sm:rounded-[32px]"
                  />
                </motion.div>
              )}

              {/* Key details */}
              <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-xl border border-[#12312B]/10 bg-[#F4F6F2] p-5">
                  <p className="text-xs text-[#12312B]/50 uppercase font-semibold">
                    Project ID
                  </p>
                  <p className="mt-1 text-sm font-mono font-semibold text-[#12312B]">
                    {project.project_id}
                  </p>
                </div>
                <div className="rounded-xl border border-[#12312B]/10 bg-[#F4F6F2] p-5">
                  <p className="text-xs text-[#12312B]/50 uppercase font-semibold">
                    Funding amount
                  </p>
                  <p className="mt-1 text-lg font-semibold text-[#12312B] tabular-nums">
                    {naira(project.amount)}
                  </p>
                </div>
                <div className="rounded-xl border border-[#12312B]/10 bg-[#F4F6F2] p-5">
                  <p className="text-xs text-[#12312B]/50 uppercase font-semibold">
                    Start date
                  </p>
                  <p className="mt-1 text-sm text-[#12312B]/70">
                    {formatDate(project.start_date)}
                  </p>
                </div>
                <div className="rounded-xl border border-[#12312B]/10 bg-[#F4F6F2] p-5">
                  <p className="text-xs text-[#12312B]/50 uppercase font-semibold">
                    Important date
                  </p>
                  <p className="mt-1 text-sm text-[#12312B]/70">
                    {formatDate(project.important_date)}
                  </p>
                </div>
              </div>

              {/* Description */}
              {project.description && (
                <motion.div {...localReveal(0.3)}>
                  <div className="mt-12">
                    <h2 className="mb-4 text-xl font-semibold tracking-tight">
                      About this project
                    </h2>
                    <div
                      className="text-[#12312B]/80 leading-relaxed"
                      dangerouslySetInnerHTML={{
                        __html: project.description.replace(/\n\n/g, "</p><p>"),
                      }}
                    />
                  </div>
                </motion.div>
              )}

              {/* Problem */}
              {project.problem && (
                <motion.div {...localReveal(0.35)}>
                  <div className="mt-12">
                    <h2 className="mb-4 text-xl font-semibold tracking-tight">
                      The problem
                    </h2>
                    <p className="text-[#12312B]/80 leading-relaxed">
                      {project.problem}
                    </p>
                  </div>
                </motion.div>
              )}

              {/* Solution */}
              {project.solution && (
                <motion.div {...localReveal(0.4)}>
                  <div className="mt-12">
                    <h2 className="mb-4 text-xl font-semibold tracking-tight">
                      Our solution
                    </h2>
                    <p className="text-[#12312B]/80 leading-relaxed">
                      {project.solution}
                    </p>
                  </div>
                </motion.div>
              )}

              {/* Outcome */}
              {project.outcome && (
                <motion.div {...localReveal(0.45)}>
                  <div className="mt-12">
                    <h2 className="mb-4 text-xl font-semibold tracking-tight">
                      Outcome
                    </h2>
                    <p className="text-[#12312B]/80 leading-relaxed">
                      {project.outcome}
                    </p>
                  </div>
                </motion.div>
              )}

              <motion.p
                {...localReveal(0.5)}
                className="mt-10 text-xs text-[#12312B]/45"
              >
                {new Date(
                  project.created_at ?? ""
                ).toLocaleDateString()}
              </motion.p>
            </div>

            <div className="order-2 lg:col-start-2 lg:row-start-1">
              {/* Secondary images gallery */}
              {images.length > 0 && (
                <motion.div {...localReveal(0)}>
                  <div className="h-fit self-start rounded-[24px] bg-[#F4F6F2] p-6 sm:rounded-[30px] sm:p-9 lg:p-8 xl:p-10">
                    <div className="mb-6">
                      <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.16em] text-[#12312B]/45">
                        Project gallery
                      </span>
                      <h3 className="mt-3 font-sans text-2xl font-semibold tracking-[-0.04em] sm:text-3xl">
                        Images
                      </h3>
                    </div>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {images.map((img) => (
                        <div
                          key={img.id}
                          className="relative group overflow-hidden rounded-xl bg-[#FAFBF9]"
                        >
                          <img
                            src={img.image_url}
                            alt={img.caption || "Project image"}
                            className="w-full h-40 object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          {img.caption && (
                            <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-[#12312B]/90 to-transparent">
                              <p className="text-xs text-white leading-tight">
                                {img.caption}
                              </p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Testimonials */}
              {testimonials.length > 0 && (
                <motion.div {...localReveal(0.1)}>
                  <div className="h-fit self-start rounded-[24px] bg-[#F4F6F2] p-6 sm:rounded-[30px] sm:p-9 lg:p-8 xl:p-10 mt-8 lg:mt-0">
                    <div className="mb-6">
                      <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.16em] text-[#12312B]/45">
                        What they say
                      </span>
                      <h3 className="mt-3 font-sans text-2xl font-semibold tracking-[-0.04em] sm:text-3xl">
                        Testimonials
                      </h3>
                    </div>
                    <div className="space-y-6">
                      {testimonials.map((t) => (
                        <div
                          key={t.id}
                          className="flex gap-4"
                        >
                          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#12312B]/[0.06] text-[#12312B]">
                            {t.image ? (
                              <img
                                src={t.image}
                                alt={t.name}
                                className="w-full h-full rounded-full object-cover"
                              />
                            ) : (
                              <span className="text-xs font-medium">{t.name.charAt(0)}</span>
                            )}
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-[11px] font-medium text-[#12312B]/80 leading-relaxed italic">
                              "{t.content}"
                            </p>
                            <p className="mt-2 text-xs font-semibold text-[#12312B]">
                              {t.name}
                            </p>
                            {t.role && (
                              <p className="mt-0.5 text-[10px] text-[#12312B]/50">
                                {t.role}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              <div className="mt-8 h-fit self-start rounded-[24px] bg-[#F4F6F2] p-6 sm:rounded-[30px] sm:p-9 lg:p-8 xl:p-10">
                <div className="mb-6">
                  <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.16em] text-[#12312B]/45">
                    Share this project
                  </span>
                  <h3 className="mt-3 font-sans text-2xl font-semibold tracking-[-0.04em] sm:text-3xl">
                    Help spread the word
                  </h3>
                </div>
                <p className="text-sm text-[#12312B]/50">
                  Share this project page to help us reach more supporters and
                  funders.
                </p>
                <div className="mt-6 flex gap-3">
                  <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(project.title)}&url=${encodeURIComponent(window.location.href)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#12312B] text-white transition hover:bg-[#1B443A]"
                  >
                    <span className="text-xs font-semibold">T</span>
                  </a>
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#12312B] text-white transition hover:bg-[#1B443A]"
                  >
                    <span className="text-xs font-semibold">f</span>
                  </a>
                  <a
                    href={`https://wa.me/?text=${encodeURIComponent(project.title + " - " + window.location.href)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#12312B] text-white transition hover:bg-[#1B443A]"
                  >
                    <span className="text-xs font-semibold">W</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        </section>
      </main>
    );
  }
