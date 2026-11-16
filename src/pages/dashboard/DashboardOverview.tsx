
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import {
  TrendingUp,
  Heart,
  Users,
  Mail,
  FileText,
  Clock3,
  RefreshCw,
  AlertCircle,
  CheckCircle2,
  ArrowUpRight,
  ShieldCheck,
} from "lucide-react";

type OverviewStats = {
  donations: number;
  total: number;
  pending: number;
  volunteers: number;
  contacts: number;
  posts: number;
  publishedPosts: number;
};

const naira = (kobo: number) =>
  `₦${(kobo / 100).toLocaleString("en-NG", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

const isSuccessful = (status: string | null) =>
  ["success", "successful", "paid"].includes(
    (status ?? "").toLowerCase()
  );

export default function DashboardOverview() {
  const [stats, setStats] = useState<OverviewStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    let alive = true;

    const load = async () => {
      try {
        const [
          paymentsResult,
          volunteersResult,
          contactsResult,
          postsResult,
          publishedResult,
        ] = await Promise.all([
          supabase.from("payments").select("amount,status"),
          supabase
            .from("volunteers")
            .select("id", { count: "exact", head: true }),
          supabase
            .from("contacts")
            .select("id", { count: "exact", head: true }),
          supabase
            .from("blog_posts")
            .select("id", { count: "exact", head: true }),
          supabase
            .from("blog_posts")
            .select("id", { count: "exact", head: true })
            .eq("published", true),
        ]);

        if (!alive) return;

        const queryError =
          paymentsResult.error ||
          volunteersResult.error ||
          contactsResult.error ||
          postsResult.error ||
          publishedResult.error;

        if (queryError) {
          throw new Error(queryError.message);
        }

        const payments = paymentsResult.data ?? [];

        const successfulPayments = payments.filter((payment) =>
          isSuccessful(payment.status)
        );

        const pendingPayments = payments.filter(
          (payment) => (payment.status ?? "").toLowerCase() === "pending"
        );

        const totalReceived = successfulPayments.reduce(
          (sum, payment) => sum + payment.amount,
          0
        );

        setStats({
          donations: successfulPayments.length,
          total: totalReceived,
          pending: pendingPayments.length,
          volunteers: volunteersResult.count ?? 0,
          contacts: contactsResult.count ?? 0,
          posts: postsResult.count ?? 0,
          publishedPosts: publishedResult.count ?? 0,
        });

        setError("");
      } catch (err) {
        if (alive) {
          setError(
            err instanceof Error
              ? err.message
              : "Failed to load dashboard data."
          );
        }
      } finally {
        if (alive) {
          setLoading(false);
          setRefreshing(false);
        }
      }
    };

    const channel = supabase
      .channel("dashboard-overview-realtime")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "payments" },
        () => load()
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "volunteers" },
        () => load()
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "contacts" },
        () => load()
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "blog_posts" },
        () => load()
      )
      .subscribe();

    load();

    return () => {
      alive = false;
      supabase.removeChannel(channel);
    };
  }, [refreshKey]);

  const handleRefresh = () => {
    setRefreshing(true);
    setRefreshKey((current) => current + 1);
  };

  const cards = stats
    ? [
        {
          label: "Total donations received",
          value: naira(stats.total),
          description: "Confirmed contributions",
          icon: TrendingUp,
          accent: "green" as const,
        },
        {
          label: "Successful donations",
          value: stats.donations.toLocaleString(),
          description: "Completed transactions",
          icon: Heart,
          accent: "gold" as const,
        },
        {
          label: "Pending payments",
          value: stats.pending.toLocaleString(),
          description: "Awaiting confirmation",
          icon: Clock3,
          accent: "amber" as const,
        },
        {
          label: "Volunteer applications",
          value: stats.volunteers.toLocaleString(),
          description: "Total applications received",
          icon: Users,
          accent: "neutral" as const,
        },
        {
          label: "Contact messages",
          value: stats.contacts.toLocaleString(),
          description: "Website enquiries",
          icon: Mail,
          accent: "neutral" as const,
        },
        {
          label: "Total blog posts",
          value: stats.posts.toLocaleString(),
          description: "All articles and drafts",
          icon: FileText,
          accent: "neutral" as const,
        },
        {
          label: "Published articles",
          value: stats.publishedPosts.toLocaleString(),
          description: "Visible on the website",
          icon: CheckCircle2,
          accent: "green" as const,
        },
      ]
    : [];

  return (
    <div className="min-h-screen bg-[#F6F7F3] font-sans text-[#12312B]">
      <div className="mx-auto max-w-7xl space-y-7">

        {/* Header */}
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#12312B]/45">
              <span className="h-1.5 w-1.5 rounded-full bg-[#E6A100]" />
              Administration
            </div>

            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Dashboard overview
            </h1>

            <p className="mt-2 max-w-xl text-sm leading-6 text-[#12312B]/55">
              Here's an overview of your donations, volunteers, messages and
              website activity.
            </p>
          </div>

          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className="inline-flex h-11 items-center justify-center gap-2 self-start rounded-xl border border-[#12312B]/10 bg-white px-4 text-sm font-medium shadow-sm transition hover:bg-[#F4F6F2] disabled:opacity-60 sm:self-auto"
          >
            <RefreshCw
              size={16}
              className={refreshing ? "animate-spin" : ""}
            />
            Refresh data
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="flex flex-col gap-3 rounded-xl border border-red-200 bg-red-50 p-4 sm:flex-row sm:items-center">
            <div className="flex items-start gap-3">
              <AlertCircle
                size={19}
                className="mt-0.5 shrink-0 text-red-600"
              />
              <div>
                <p className="text-sm font-semibold text-red-800">
                  Unable to load dashboard statistics
                </p>
                <p className="mt-1 text-xs leading-5 text-red-700">
                  {error}
                </p>
              </div>
            </div>

            <button
              onClick={handleRefresh}
              className="text-left text-xs font-semibold text-red-800 underline underline-offset-4 sm:ml-auto"
            >
              Try again
            </button>
          </div>
        )}

        {/* Loading skeleton */}
        {loading && !stats ? (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 7 }).map((_, index) => (
              <div
                key={index}
                className="animate-pulse rounded-2xl border border-[#12312B]/[0.08] bg-white p-5"
              >
                <div className="h-10 w-10 rounded-xl bg-[#F0F2ED]" />
                <div className="mt-6 h-3 w-32 rounded bg-[#F0F2ED]" />
                <div className="mt-3 h-7 w-28 rounded bg-[#F0F2ED]" />
                <div className="mt-3 h-3 w-40 rounded bg-[#F0F2ED]" />
              </div>
            ))}
          </div>
        ) : stats ? (
          <>
            {/* Statistics */}
            <section>
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h2 className="text-sm font-semibold">Key statistics</h2>
                  <p className="mt-1 text-xs text-[#12312B]/45">
                    Current records from your website
                  </p>
                </div>

                <div className="hidden items-center gap-1.5 text-[10px] font-medium text-[#12312B]/45 sm:flex">
                  <ShieldCheck size={13} />
                  Live dashboard
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {cards.map((card) => (
                  <StatCard key={card.label} {...card} />
                ))}
              </div>
            </section>

            {/* Overview information */}
            <section className="grid gap-4 lg:grid-cols-2">
              <div className="rounded-2xl border border-[#12312B]/[0.08] bg-white p-5 sm:p-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EAF0E9] text-[#12312B]">
                    <Heart size={19} />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold">
                      Donation performance
                    </h3>
                    <p className="mt-1 text-xs text-[#12312B]/45">
                      Confirmed payment summary
                    </p>
                  </div>
                </div>

                <div className="mt-6">
                  <p className="text-xs text-[#12312B]/45">
                    Total successfully received
                  </p>
                  <p className="mt-1 text-2xl font-semibold tracking-tight">
                    {naira(stats.total)}
                  </p>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-3">
                  <div className="rounded-xl bg-[#F4F6F2] p-3">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-[#12312B]/45">
                      Successful
                    </p>
                    <p className="mt-1 text-lg font-semibold">
                      {stats.donations}
                    </p>
                  </div>

                  <div className="rounded-xl bg-[#FFF7E5] p-3">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-[#987000]/65">
                      Pending
                    </p>
                    <p className="mt-1 text-lg font-semibold text-[#987000]">
                      {stats.pending}
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-[#12312B]/[0.08] bg-white p-5 sm:p-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FFF5D9] text-[#987000]">
                    <FileText size={19} />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold">
                      Website content
                    </h3>
                    <p className="mt-1 text-xs text-[#12312B]/45">
                      Blog publishing overview
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex items-end justify-between gap-4">
                  <div>
                    <p className="text-xs text-[#12312B]/45">
                      Published articles
                    </p>
                    <p className="mt-1 text-2xl font-semibold">
                      {stats.publishedPosts}
                      <span className="ml-1 text-sm font-medium text-[#12312B]/35">
                        / {stats.posts}
                      </span>
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-xs text-[#12312B]/45">Drafts</p>
                    <p className="mt-1 text-lg font-semibold">
                      {Math.max(0, stats.posts - stats.publishedPosts)}
                    </p>
                  </div>
                </div>

                <div className="mt-5 h-2 overflow-hidden rounded-full bg-[#F0F2ED]">
                  <div
                    className="h-full rounded-full bg-[#12312B] transition-all duration-500"
                    style={{
                      width: `${
                        stats.posts > 0
                          ? Math.min(
                              100,
                              (stats.publishedPosts / stats.posts) * 100
                            )
                          : 0
                      }%`,
                    }}
                  />
                </div>

                <p className="mt-3 text-[11px] text-[#12312B]/45">
                  {stats.posts > 0
                    ? `${Math.round(
                        (stats.publishedPosts / stats.posts) * 100
                      )}% of your articles are published`
                    : "No articles have been created yet"}
                </p>
              </div>
            </section>

            {/* Footer */}
            <div className="flex flex-col gap-2 border-t border-[#12312B]/[0.08] pt-5 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-[11px] text-[#12312B]/40">
                Statistics are based on records currently available in your
                database.
              </p>

              <div className="flex items-center gap-1.5 text-[11px] font-medium text-[#12312B]/45">
                <CheckCircle2 size={13} />
                Dashboard data loaded
              </div>
            </div>
          </>
        ) : (
          !error && (
            <div className="rounded-2xl border border-[#12312B]/10 bg-white p-10 text-center">
              <p className="text-sm text-[#12312B]/55">
                No dashboard statistics are available.
              </p>
            </div>
          )
        )}
      </div>
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  description,
  accent,
}: {
  icon: typeof TrendingUp;
  label: string;
  value: string | number;
  description: string;
  accent: "green" | "gold" | "amber" | "neutral";
}) {
  const accentStyles = {
    green: "bg-[#EAF0E9] text-[#12312B]",
    gold: "bg-[#FFF5D9] text-[#987000]",
    amber: "bg-amber-50 text-amber-700",
    neutral: "bg-[#F1F3EF] text-[#12312B]",
  };

  return (
    <div className="group rounded-2xl border border-[#12312B]/[0.08] bg-white p-5 shadow-[0_4px_20px_rgba(18,49,43,0.025)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_25px_rgba(18,49,43,0.06)]">
      <div className="flex items-center justify-between">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-xl ${accentStyles[accent]}`}
        >
          <Icon size={19} strokeWidth={1.9} />
        </div>

        <ArrowUpRight
          size={16}
          className="text-[#12312B]/20 transition group-hover:text-[#12312B]/55"
        />
      </div>

      <p className="mt-5 text-xs font-medium text-[#12312B]/50">
        {label}
      </p>

      <p className="mt-1 break-words text-2xl font-semibold tracking-tight text-[#12312B]">
        {value}
      </p>

      <p className="mt-2 text-[11px] text-[#12312B]/40">
        {description}
      </p>
    </div>
  );
}
