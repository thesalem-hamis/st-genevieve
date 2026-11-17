import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { supabase } from "@/lib/supabase";
import type { Database } from "@/lib/database";
import AnimatedHeading from "@/components/about/AnimatedHeading";
import { CustomArrowLeft } from "@/components/ui/CustomIcons";

type Post = Database["public"]["Tables"]["blog_posts"]["Row"];

const EASE = [0.76, 0, 0.24, 1] as const;

const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.85, delay, ease: EASE },
});

export default function BlogPostPage() {
  const reduceMotion = useReducedMotion();
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<Post | null>(null);
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
        .from("blog_posts")
        .select("*")
        .eq("slug", slug)
        .eq("published", true)
        .single();

      if (alive) {
        setLoading(false);
        if (err) setError(err.message);
        else setPost(data);
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

  if (!post) {
    return (
      <main className="overflow-hidden bg-white text-[#12312B]">
        <section className="px-5 pt-28 sm:px-6 sm:pt-36 lg:px-10 lg:pt-44">
          <div className="mx-auto max-w-[1400px]">
            <div className="rounded-lg border border-[#12312B]/10 p-4 text-sm text-[#12312B]/50">
              Post not found.
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
                to="/blog"
                aria-label="Back to blog"
                className="group inline-flex items-center gap-3 font-sans text-xs font-semibold uppercase tracking-wider text-[#12312B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E6A100] focus-visible:ring-offset-4"
              >
                <span className="grid h-10 w-10 place-items-center rounded-full border border-[#12312B]/20 transition-all duration-300 group-hover:border-[#12312B] group-hover:bg-[#12312B] group-hover:text-white">
                  <CustomArrowLeft
                    size={14}
                    color="currentColor"
                    className="transition-transform duration-300 group-hover:-translate-x-0.5"
                  />
                </span>
                Back to journal
              </Link>
            </motion.div>

            <motion.div {...localReveal(0.05)}>
              <span className="inline-flex items-center gap-2 font-sans text-[10px] font-semibold uppercase tracking-[0.18em] text-[#12312B]/60 sm:text-[11px]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#E6A100]" />
                {post.author_name ? "By " + post.author_name : "Journal"}
              </span>
            </motion.div>

            {post.cover_image && (
              <motion.div {...localReveal(0.1)}>
                <img
                  src={post.cover_image}
                  alt={post.title}
                  className="w-full rounded-[24px] object-cover sm:rounded-[32px]"
                />
              </motion.div>
            )}

            <div className="mt-6">
              <AnimatedHeading
                as="h1"
                className="font-sans text-[clamp(3rem,7vw,6.5rem)] font-semibold leading-[0.98] tracking-[-0.065em]"
              >
                {post.title}
              </AnimatedHeading>

              <motion.p
                {...localReveal(0.2)}
                className="mt-7 max-w-[520px] font-sans text-sm leading-[1.9] text-[#12312B]/65 sm:text-base"
              >
                {post.excerpt ?? ""}
              </motion.p>

              <div className="mt-10 text-[#12312B]/80 leading-relaxed">
                <div
                  dangerouslySetInnerHTML={{
                    __html: post.content.replace(/\n\n/g, "</p><p>"),
                  }}
                />
              </div>

              <motion.p
                {...localReveal(0.3)}
                className="mt-8 text-xs text-[#12312B]/45"
              >
                {new Date(
                  post.published_at ?? post.created_at ?? ""
                ).toLocaleDateString()}
              </motion.p>
            </div>
          </div>

          <div className="order-2 lg:col-start-2 lg:row-start-1">
            <div className="h-fit self-start rounded-[24px] bg-[#F4F6F2] p-6 sm:rounded-[30px] sm:p-9 lg:p-8 xl:p-10">
              <div className="mb-6">
                <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.16em] text-[#12312B]/45">
                  Related reading
                </span>
                <h3 className="mt-3 font-sans text-2xl font-semibold tracking-[-0.04em] sm:text-3xl">
                  More stories
                </h3>
              </div>
              <p className="text-sm text-[#12312B]/50">
                Browse the journal for more updates from the field.
              </p>
              <Link
                to="/blog"
                className="mt-4 inline-flex items-center gap-2 font-sans text-xs font-semibold uppercase tracking-wider text-[#12312B] underline underline-offset-4"
              >
                View all posts
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
