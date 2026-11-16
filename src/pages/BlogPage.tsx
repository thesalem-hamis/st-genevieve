import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { supabase } from "@/lib/supabase";
import type { Database } from "@/lib/database";
import AnimatedHeading from "@/components/about/AnimatedHeading";
import { CustomArrowLeft } from "@/components/ui/CustomIcons";

type Post = Database["public"]["Tables"]["blog_posts"]["Row"];

const EASE = [0.76, 0, 0.24, 1] as const;

export default function BlogPage() {
  const reduceMotion = useReducedMotion();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let alive = true;

    const load = async () => {
      const { data, error: err } = await supabase
        .from("blog_posts")
        .select(
          "id, title, slug, excerpt, cover_image, author_name, published_at, created_at"
        )
        .eq("published", true)
        .order("published_at", { ascending: false });

      if (alive) {
        setLoading(false);
        if (err) setError(err.message);
        else setPosts((data ?? []) as Post[]);
      }
    };

    load();
    return () => {
      alive = false;
    };
  }, []);

  const localReveal = (delay = 0) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-50px" },
    transition: { duration: 0.85, delay, ease: EASE },
  });

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

            <motion.div {...localReveal(0.05)}>
              <span className="inline-flex items-center gap-2 font-sans text-[10px] font-semibold uppercase tracking-[0.18em] text-[#12312B]/60 sm:text-[11px]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#E6A100]" />
                Stories from the field
              </span>
            </motion.div>

            <div className="mt-6">
              <AnimatedHeading
                as="h1"
                className="font-sans text-[clamp(3rem,7vw,6.5rem)] font-semibold leading-[0.98] tracking-[-0.065em]"
              >
                Our journal
              </AnimatedHeading>

              <motion.p
                {...localReveal(0.2)}
                className="mt-7 max-w-[520px] font-sans text-sm leading-[1.9] text-[#12312B]/65 sm:text-base"
              >
                Updates, reflections and stories from the mothers, children
                and communities we serve.
              </motion.p>
            </div>
          </div>

          <div className="order-2 lg:col-start-2 lg:row-start-1">
            {error && (
              <div className="rounded-lg bg-[#F8E8E3] p-4 text-sm text-[#12312B]">
                {error}
              </div>
            )}

            <div className="mt-10 lg:mt-0 space-y-6">
              {loading ? (
                <p className="text-sm text-[#12312B]/50">Loading posts…</p>
              ) : posts.length === 0 ? (
                <p className="text-sm text-[#12312B]/50">
                  No published posts yet.
                </p>
              ) : (
                posts.map((post) => (
                  <article
                    key={post.id}
                    className="flex items-start gap-4 border-b border-[#12312B]/10 pb-6 last:border-0 last:pb-0"
                  >
                    <Link
                      to={`/blog/${post.slug}`}
                      className="flex flex-col gap-2"
                    >
                      <h3 className="font-sans text-lg font-semibold leading-[1.3]">
                        {post.title}
                      </h3>
                      {post.excerpt && (
                        <p className="text-sm text-[#12312B]/60 leading-relaxed">
                          {post.excerpt}
                        </p>
                      )}
                      <p className="text-xs text-[#12312B]/45 mt-2">
                        {new Date(
                          post.published_at ?? post.created_at ?? ""
                        ).toLocaleDateString()}
                      </p>
                    </Link>
                  </article>
                ))
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
