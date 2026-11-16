
import { useCallback, useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  RefreshCw,
  X,
  Copy,
  Check,
  CreditCard,
  TrendingUp,
  Clock3,
  Gift,
  ChevronRight,
  AlertCircle,
  CalendarDays,
  User,
  Hash,
  Heart,
} from "lucide-react";

import { supabase } from "@/lib/supabase";
import type { Database } from "@/lib/database";

type Payment = Database["public"]["Tables"]["payments"]["Row"];

const naira = (amount: number) =>
  `₦${(amount / 100).toLocaleString("en-NG", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

const formatDate = (value: string | null) => {
  if (!value) return "—";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "—";

  return new Intl.DateTimeFormat("en-NG", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
};

const formatTime = (value: string | null) => {
  if (!value) return "";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "";

  return new Intl.DateTimeFormat("en-NG", {
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
};

const normaliseStatus = (status: string | null) =>
  (status ?? "unknown").toLowerCase();

function StatusBadge({ status }: { status: string | null }) {
  const value = normaliseStatus(status);

  const styles: Record<string, string> = {
    success: "bg-emerald-50 text-emerald-700 border-emerald-200",
    successful: "bg-emerald-50 text-emerald-700 border-emerald-200",
    paid: "bg-emerald-50 text-emerald-700 border-emerald-200",
    pending: "bg-amber-50 text-amber-700 border-amber-200",
    failed: "bg-red-50 text-red-700 border-red-200",
    abandoned: "bg-slate-100 text-slate-600 border-slate-200",
    cancelled: "bg-slate-100 text-slate-600 border-slate-200",
  };

  const style =
    styles[value] ?? "bg-[#F4F6F2] text-[#12312B]/65 border-[#12312B]/10";

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-semibold capitalize ${style}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {value}
    </span>
  );
}

export default function DashboardDonations() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  const loadPayments = useCallback(async (showLoader = false) => {
    if (showLoader) setRefreshing(true);

    const { data, error: err } = await supabase
      .from("payments")
      .select("*")
      .order("created_at", { ascending: false });

    if (err) {
      setError(err.message);
    } else {
      setPayments(data ?? []);
      setError("");
    }

    setLoading(false);
    setRefreshing(false);
  }, []);

  useEffect(() => {
    let alive = true;

    const load = async () => {
      const { data, error: err } = await supabase
        .from("payments")
        .select("*")
        .order("created_at", { ascending: false });

      if (!alive) return;

      if (err) {
        setError(err.message);
      } else {
        setPayments(data ?? []);
        setError("");
      }

      setLoading(false);
    };

    const channel = supabase
      .channel("payments-realtime")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "payments" },
        () => {
          if (alive) load();
        }
      )
      .subscribe();

    load();

    return () => {
      alive = false;
      supabase.removeChannel(channel);
    };
  }, []);

  const isSuccessful = (payment: Payment) =>
    ["success", "successful", "paid"].includes(
      normaliseStatus(payment.status)
    );

  const successfulPayments = useMemo(
    () => payments.filter(isSuccessful),
    [payments]
  );

  const pendingPayments = useMemo(
    () =>
      payments.filter(
        (payment) => normaliseStatus(payment.status) === "pending"
      ),
    [payments]
  );

  const totalReceived = successfulPayments.reduce(
    (sum, payment) => sum + payment.amount,
    0
  );

  const filteredPayments = useMemo(() => {
    const query = search.trim().toLowerCase();

    return payments.filter((payment) => {
      const matchesSearch =
        !query ||
        [
          payment.reference,
          payment.donor_name ?? "",
          payment.designation ?? "",
        ].some((value) => value.toLowerCase().includes(query));

      const matchesStatus =
        statusFilter === "all" ||
        normaliseStatus(payment.status) === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [payments, search, statusFilter]);

  const copyReference = async (reference: string) => {
    try {
      await navigator.clipboard.writeText(reference);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setError("Unable to copy reference. Please copy it manually.");
    }
  };

  return (
    <div className="min-h-screen bg-[#F6F7F3] px-4 py-6 font-sans text-[#12312B] sm:px-6 lg:px-8 lg:py-8">
      <div className="mx-auto max-w-7xl space-y-7">

        {/* Header */}
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#12312B]/45">
              <span className="h-1.5 w-1.5 rounded-full bg-[#E6A100]" />
              Financial overview
            </div>

            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Donations
            </h1>

            <p className="mt-2 text-sm leading-6 text-[#12312B]/55">
              Monitor contributions, payment activity and donor information.
            </p>
          </div>

          <button
            onClick={() => loadPayments(true)}
            disabled={refreshing}
            className="inline-flex h-11 items-center justify-center gap-2 self-start rounded-xl border border-[#12312B]/10 bg-white px-4 text-sm font-medium shadow-sm transition hover:bg-[#F4F6F2] disabled:opacity-60 sm:self-auto"
          >
            <RefreshCw
              size={16}
              className={refreshing ? "animate-spin" : ""}
            />
            Refresh
          </button>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            icon={<TrendingUp size={19} />}
            label="Total received"
            value={naira(totalReceived)}
            description="Successfully completed payments"
            accent="green"
          />

          <StatCard
            icon={<Gift size={19} />}
            label="Successful gifts"
            value={successfulPayments.length}
            description="Confirmed contributions"
            accent="gold"
          />

          <StatCard
            icon={<Clock3 size={19} />}
            label="Pending payments"
            value={pendingPayments.length}
            description="Awaiting payment confirmation"
            accent="amber"
          />

          <StatCard
            icon={<CreditCard size={19} />}
            label="All transactions"
            value={payments.length}
            description="Total payment records"
            accent="neutral"
          />
        </div>

        {/* Transactions */}
        <section className="overflow-hidden rounded-2xl border border-[#12312B]/[0.08] bg-white shadow-[0_4px_24px_rgba(18,49,43,0.035)]">
          <div className="flex flex-col gap-4 border-b border-[#12312B]/[0.07] p-5 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-base font-semibold">Transactions</h2>
              <p className="mt-1 text-xs text-[#12312B]/45">
                {filteredPayments.length}{" "}
                {filteredPayments.length === 1
                  ? "transaction"
                  : "transactions"}{" "}
                displayed
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="relative sm:w-64">
                <Search
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#12312B]/35"
                />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search transactions..."
                  className="h-11 w-full rounded-xl border border-[#12312B]/10 bg-[#F8F9F6] pl-10 pr-4 text-sm outline-none transition placeholder:text-[#12312B]/35 focus:border-[#12312B]/35 focus:bg-white"
                />
              </div>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="h-11 rounded-xl border border-[#12312B]/10 bg-[#F8F9F6] px-3 text-sm text-[#12312B] outline-none focus:border-[#12312B]/35"
              >
                <option value="all">All statuses</option>
                <option value="success">Success</option>
                <option value="successful">Successful</option>
                <option value="paid">Paid</option>
                <option value="pending">Pending</option>
                <option value="failed">Failed</option>
                <option value="abandoned">Abandoned</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          {error && (
            <div className="m-5 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
              <AlertCircle size={18} className="mt-0.5 shrink-0" />
              <div>
                <p className="font-semibold">Something went wrong</p>
                <p className="mt-1">{error}</p>
              </div>
            </div>
          )}

          {loading ? (
            <div className="space-y-4 p-6">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="flex animate-pulse items-center gap-4">
                  <div className="h-9 w-9 rounded-full bg-[#F0F2ED]" />
                  <div className="flex-1 space-y-2">
                    <div className="h-3 w-1/3 rounded bg-[#F0F2ED]" />
                    <div className="h-3 w-2/3 rounded bg-[#F0F2ED]" />
                  </div>
                  <div className="h-4 w-20 rounded bg-[#F0F2ED]" />
                </div>
              ))}
            </div>
          ) : filteredPayments.length === 0 ? (
            <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#F4F6F2] text-[#12312B]/45">
                {search || statusFilter !== "all" ? (
                  <Search size={25} />
                ) : (
                  <Heart size={25} />
                )}
              </div>

              <h3 className="text-base font-semibold">
                {search || statusFilter !== "all"
                  ? "No matching transactions"
                  : "No donations yet"}
              </h3>

              <p className="mt-2 max-w-sm text-sm leading-6 text-[#12312B]/50">
                {search || statusFilter !== "all"
                  ? "Try changing your search or payment status filter."
                  : "Donations made through your website will appear here once payment records are created."}
              </p>

              {(search || statusFilter !== "all") && (
                <button
                  onClick={() => {
                    setSearch("");
                    setStatusFilter("all");
                  }}
                  className="mt-4 text-sm font-semibold underline underline-offset-4"
                >
                  Clear filters
                </button>
              )}
            </div>
          ) : (
            <>
              {/* Desktop table */}
              <div className="hidden overflow-x-auto md:block">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-[#12312B]/[0.07] bg-[#FAFBF9]">
                      {[
                        "Reference",
                        "Donor",
                        "Amount",
                        "Designation",
                        "Date",
                        "Status",
                        "",
                      ].map((heading, index) => (
                        <th
                          key={index}
                          className="whitespace-nowrap px-5 py-4 text-[10px] font-semibold uppercase tracking-[0.13em] text-[#12312B]/40"
                        >
                          {heading}
                        </th>
                      ))}
                    </tr>
                  </thead>

                  <tbody>
                    {filteredPayments.map((payment) => (
                      <tr
                        key={payment.reference}
                        onClick={() => setSelectedPayment(payment)}
                        className="cursor-pointer border-b border-[#12312B]/[0.06] transition last:border-0 hover:bg-[#F8F9F6]"
                      >
                        <td className="px-5 py-4">
                          <p className="max-w-[150px] truncate font-mono text-xs text-[#12312B]/65">
                            {payment.reference}
                          </p>
                        </td>

                        <td className="px-5 py-4">
                          <div className="flex min-w-[130px] items-center gap-2.5">
                            <Avatar name={
                              payment.anonymous || !payment.donor_name
                                ? "Anonymous"
                                : payment.donor_name
                            } />
                            <span className="text-sm font-medium">
                              {payment.anonymous || !payment.donor_name
                                ? "Anonymous"
                                : payment.donor_name}
                            </span>
                          </div>
                        </td>

                        <td className="whitespace-nowrap px-5 py-4 text-sm font-semibold tabular-nums">
                          {naira(payment.amount)}
                        </td>

                        <td className="max-w-[160px] px-5 py-4">
                          <p className="truncate text-sm text-[#12312B]/65">
                            {payment.designation || "General donation"}
                          </p>
                        </td>

                        <td className="whitespace-nowrap px-5 py-4">
                          <p className="text-xs text-[#12312B]/70">
                            {formatDate(
                              payment.paid_at ?? payment.created_at
                            )}
                          </p>
                          <p className="mt-1 text-[10px] text-[#12312B]/40">
                            {formatTime(
                              payment.paid_at ?? payment.created_at
                            )}
                          </p>
                        </td>

                        <td className="px-5 py-4">
                          <StatusBadge status={payment.status} />
                        </td>

                        <td className="px-5 py-4 text-right">
                          <ChevronRight
                            size={16}
                            className="text-[#12312B]/30"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile cards */}
              <div className="divide-y divide-[#12312B]/[0.07] md:hidden">
                {filteredPayments.map((payment) => (
                  <button
                    key={payment.reference}
                    onClick={() => setSelectedPayment(payment)}
                    className="w-full p-4 text-left transition hover:bg-[#F8F9F6]"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex min-w-0 items-center gap-3">
                        <Avatar
                          name={
                            payment.anonymous || !payment.donor_name
                              ? "Anonymous"
                              : payment.donor_name
                          }
                        />
                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold">
                            {payment.anonymous || !payment.donor_name
                              ? "Anonymous"
                              : payment.donor_name}
                          </p>
                          <p className="mt-1 truncate text-[11px] text-[#12312B]/45">
                            {payment.designation || "General donation"}
                          </p>
                        </div>
                      </div>

                      <div className="shrink-0 text-right">
                        <p className="text-sm font-semibold tabular-nums">
                          {naira(payment.amount)}
                        </p>
                        <div className="mt-2">
                          <StatusBadge status={payment.status} />
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 flex items-center justify-between gap-3 border-t border-[#12312B]/[0.06] pt-3">
                      <p className="truncate font-mono text-[10px] text-[#12312B]/40">
                        {payment.reference}
                      </p>
                      <p className="shrink-0 text-[10px] text-[#12312B]/40">
                        {formatDate(payment.paid_at ?? payment.created_at)}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </>
          )}

          <div className="border-t border-[#12312B]/[0.07] bg-[#FAFBF9] px-5 py-3.5 sm:px-6">
            <p className="text-[11px] text-[#12312B]/40">
              Payment records update automatically when Supabase Realtime is enabled.
            </p>
          </div>
        </section>
      </div>

      {/* Payment details */}
      <AnimatePresence>
        {selectedPayment && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPayment(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#0A1D18]/55 p-4 backdrop-blur-sm"
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 15, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-[#12312B]/[0.08] px-5 py-4 sm:px-6">
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.14em] text-[#12312B]/40">
                    Transaction details
                  </p>
                  <h3 className="mt-1 text-lg font-semibold">
                    Donation information
                  </h3>
                </div>

                <button
                  onClick={() => setSelectedPayment(null)}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F4F6F2] transition hover:bg-[#E9EDE6]"
                  aria-label="Close details"
                >
                  <X size={17} />
                </button>
              </div>

              <div className="space-y-5 p-5 sm:p-6">
                <div className="rounded-2xl bg-[#F4F6F2] p-5 text-center">
                  <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-white text-[#12312B]">
                    <Heart size={20} />
                  </div>

                  <p className="text-xs text-[#12312B]/50">
                    Donation amount
                  </p>

                  <h2 className="mt-1 text-3xl font-semibold tracking-tight tabular-nums">
                    {naira(selectedPayment.amount)}
                  </h2>

                  <div className="mt-3">
                    <StatusBadge status={selectedPayment.status} />
                  </div>
                </div>

                <div className="space-y-4">
                  <DetailRow
                    icon={<User size={16} />}
                    label="Donor"
                    value={
                      selectedPayment.anonymous || !selectedPayment.donor_name
                        ? "Anonymous"
                        : selectedPayment.donor_name
                    }
                  />

                  <DetailRow
                    icon={<Gift size={16} />}
                    label="Designation"
                    value={selectedPayment.designation || "General donation"}
                  />

                  <DetailRow
                    icon={<CalendarDays size={16} />}
                    label="Payment date"
                    value={formatDate(
                      selectedPayment.paid_at ?? selectedPayment.created_at
                    )}
                  />

                  <DetailRow
                    icon={<Hash size={16} />}
                    label="Reference"
                    value={selectedPayment.reference}
                  />
                </div>

                <button
                  onClick={() => copyReference(selectedPayment.reference)}
                  className="flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-[#12312B]/10 bg-white text-sm font-semibold transition hover:bg-[#F4F6F2]"
                >
                  {copied ? (
                    <>
                      <Check size={16} className="text-emerald-600" />
                      Reference copied
                    </>
                  ) : (
                    <>
                      <Copy size={15} />
                      Copy payment reference
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  description,
  accent,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  description: string;
  accent: "green" | "gold" | "amber" | "neutral";
}) {
  const accentStyles = {
    green: "bg-[#EAF0E9] text-[#12312B]",
    gold: "bg-[#FFF5D9] text-[#9A6A00]",
    amber: "bg-amber-50 text-amber-700",
    neutral: "bg-[#F1F3EF] text-[#12312B]",
  };

  return (
    <div className="rounded-2xl border border-[#12312B]/[0.08] bg-white p-5 shadow-[0_4px_20px_rgba(18,49,43,0.025)]">
      <div className="flex items-center justify-between">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-xl ${accentStyles[accent]}`}
        >
          {icon}
        </div>
        <span className="text-[10px] font-semibold uppercase tracking-wider text-[#12312B]/35">
          Overview
        </span>
      </div>

      <p className="mt-5 text-xs font-medium text-[#12312B]/50">{label}</p>

      <p className="mt-1 break-words text-2xl font-semibold tracking-tight">
        {value}
      </p>

      <p className="mt-1 text-xs text-[#12312B]/40">{description}</p>
    </div>
  );
}

function Avatar({ name }: { name: string }) {
  const initials = name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  return (
    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#EAF0E9] text-[11px] font-semibold text-[#12312B]">
      {initials || <User size={15} />}
    </div>
  );
}

function DetailRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#F4F6F2] text-[#12312B]/65">
        {icon}
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-[#12312B]/40">
          {label}
        </p>
        <p className="mt-1 break-all text-sm font-medium text-[#12312B]/85">
          {value}
        </p>
      </div>
    </div>
  );
}
