
import { useEffect, useMemo, useState } from "react";
import {
  Users,
  Search,
  RefreshCw,
  Mail,
  Phone,
  MapPin,
  CalendarDays,
  Clock3,
  HeartHandshake,
  X,
  Copy,
  ExternalLink,
  AlertCircle,
  CheckCircle2,
  ChevronRight,
  UserRound,
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import type { Database } from "@/lib/database";

type Volunteer = Database["public"]["Tables"]["volunteers"]["Row"];

function formatDate(date: string | null) {
  if (!date) return "—";

  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) return "—";

  return new Intl.DateTimeFormat("en-NG", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(parsed);
}

function getInitials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

function StatCard({
  label,
  value,
  description,
  icon: Icon,
}: {
  label: string;
  value: number;
  description: string;
  icon: typeof Users;
}) {
  return (
    <div className="rounded-2xl border border-[#12312B]/10 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-[#12312B]/55">{label}</p>
          <p className="mt-3 text-3xl font-semibold tracking-tight text-[#12312B]">
            {value.toLocaleString()}
          </p>
          <p className="mt-1 text-xs text-[#12312B]/45">{description}</p>
        </div>

        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#F4F6F2] text-[#12312B]">
          <Icon size={20} strokeWidth={1.8} />
        </div>
      </div>
    </div>
  );
}

function LoadingRows() {
  return (
    <>
      {Array.from({ length: 5 }).map((_, index) => (
        <tr key={index} className="animate-pulse border-b border-[#12312B]/5">
          {Array.from({ length: 6 }).map((__, cell) => (
            <td key={cell} className="px-5 py-5">
              <div className="h-3 w-20 rounded-full bg-[#12312B]/10" />
            </td>
          ))}
        </tr>
      ))}
    </>
  );
}

export default function DashboardVolunteers() {
  const [volunteers, setVolunteers] = useState<Volunteer[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [selectedVolunteer, setSelectedVolunteer] =
    useState<Volunteer | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let alive = true;

    const load = async () => {
      const { data, error: queryError } = await supabase
        .from("volunteers")
        .select("*")
        .order("created_at", { ascending: false });

      if (!alive) return;

      if (queryError) {
        setError(queryError.message);
      } else {
        setError("");
        setVolunteers(data ?? []);
      }

      setLoading(false);
      setRefreshing(false);
    };

    const channel = supabase
      .channel("dashboard-volunteers")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "volunteers" },
        () => {
          if (alive) void load();
        }
      )
      .subscribe();

    void load();

    return () => {
      alive = false;
      void supabase.removeChannel(channel);
    };
  }, [refreshKey]);

  const filteredVolunteers = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return volunteers;

    return volunteers.filter((volunteer) =>
      [
        volunteer.name,
        volunteer.email,
        volunteer.phone,
        volunteer.location,
        volunteer.interest,
        volunteer.availability,
      ]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(query))
    );
  }, [volunteers, search]);

  const recentCount = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return volunteers.filter((volunteer) => {
      if (!volunteer.created_at) return false;

      const date = new Date(volunteer.created_at);
      return !Number.isNaN(date.getTime()) && date >= today;
    }).length;
  }, [volunteers]);

  const handleRefresh = () => {
    setRefreshing(true);
    setRefreshKey((current) => current + 1);
  };

  const copyEmail = async (email: string) => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setError("Unable to copy email. Please copy it manually.");
    }
  };

  return (
    <div className="min-h-screen bg-[#F6F7F3] px-4 py-6 text-[#12312B] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1500px] space-y-7">

        {/* Header */}
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#12312B]/45">
              <span>Administration</span>
              <ChevronRight size={13} />
              <span>Volunteers</span>
            </div>

            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Volunteer applications
            </h1>

            <p className="mt-2 max-w-xl text-sm leading-6 text-[#12312B]/55">
              View and manage people who have expressed interest in
              volunteering with Saint Genevieve.
            </p>
          </div>

          <button
            type="button"
            onClick={handleRefresh}
            disabled={refreshing}
            className="inline-flex h-11 items-center justify-center gap-2 self-start rounded-xl border border-[#12312B]/10 bg-white px-4 text-sm font-medium text-[#12312B] shadow-sm transition hover:bg-[#F4F6F2] disabled:cursor-not-allowed disabled:opacity-60 sm:self-auto"
          >
            <RefreshCw
              size={16}
              className={refreshing ? "animate-spin" : ""}
            />
            Refresh
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <StatCard
            label="Total applications"
            value={volunteers.length}
            description="All volunteer applications"
            icon={Users}
          />
          <StatCard
            label="Received today"
            value={recentCount}
            description="Applications submitted today"
            icon={CalendarDays}
          />
          <StatCard
            label="Available records"
            value={filteredVolunteers.length}
            description="Matching your current search"
            icon={HeartHandshake}
          />
        </div>

        {/* Main content */}
        <section className="overflow-hidden rounded-2xl border border-[#12312B]/10 bg-white shadow-sm">
          <div className="flex flex-col gap-4 border-b border-[#12312B]/10 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-semibold">All applications</h2>
              <p className="mt-1 text-xs text-[#12312B]/45">
                {filteredVolunteers.length}{" "}
                {filteredVolunteers.length === 1 ? "application" : "applications"}{" "}
                displayed
              </p>
            </div>

            <div className="relative w-full sm:max-w-sm">
              <Search
                size={17}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#12312B]/35"
              />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search applications..."
                className="h-11 w-full rounded-xl border border-[#12312B]/10 bg-[#F9FAF8] pl-10 pr-4 text-sm text-[#12312B] outline-none transition placeholder:text-[#12312B]/35 focus:border-[#12312B]/35 focus:bg-white"
              />
            </div>
          </div>

          {error && (
            <div className="mx-5 mt-5 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
              <AlertCircle size={18} className="mt-0.5 shrink-0" />
              <div className="min-w-0 flex-1">
                <p className="font-semibold">Unable to load applications</p>
                <p className="mt-1 break-words">{error}</p>
              </div>
              <button
                type="button"
                onClick={handleRefresh}
                className="shrink-0 font-semibold underline underline-offset-2"
              >
                Retry
              </button>
            </div>
          )}

          {/* Desktop table */}
          <div className="hidden overflow-x-auto md:block">
            <table className="w-full min-w-[900px] text-left">
              <thead>
                <tr className="border-b border-[#12312B]/10 bg-[#F8F9F6]">
                  {[
                    "Applicant",
                    "Contact",
                    "Location",
                    "Interest",
                    "Availability",
                    "Applied",
                  ].map((heading) => (
                    <th
                      key={heading}
                      className="px-5 py-4 text-[10px] font-semibold uppercase tracking-[0.13em] text-[#12312B]/45"
                    >
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <LoadingRows />
                ) : filteredVolunteers.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-5 py-16 text-center">
                      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F4F6F2] text-[#12312B]/45">
                        <Users size={22} />
                      </div>
                      <p className="mt-4 text-sm font-semibold">
                        {search ? "No matching applications" : "No applications yet"}
                      </p>
                      <p className="mt-1 text-xs text-[#12312B]/45">
                        {search
                          ? "Try another name, email, location, or interest."
                          : "Volunteer applications will appear here when submitted."}
                      </p>
                    </td>
                  </tr>
                ) : (
                  filteredVolunteers.map((volunteer) => (
                    <tr
                      key={volunteer.id}
                      onClick={() => setSelectedVolunteer(volunteer)}
                      className="cursor-pointer border-b border-[#12312B]/5 transition last:border-0 hover:bg-[#F8F9F6]"
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#12312B]/[0.07] text-xs font-semibold text-[#12312B]">
                            {getInitials(volunteer.name || "V")}
                          </div>
                          <div className="min-w-0">
                            <p className="truncate text-sm font-semibold">
                              {volunteer.name}
                            </p>
                            <p className="mt-0.5 text-xs text-[#12312B]/45">
                              Volunteer applicant
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-5 py-4">
                        <p className="text-sm">{volunteer.email}</p>
                        <p className="mt-1 text-xs text-[#12312B]/45">
                          {volunteer.phone || "No phone provided"}
                        </p>
                      </td>

                      <td className="px-5 py-4 text-sm text-[#12312B]/70">
                        {volunteer.location || "—"}
                      </td>

                      <td className="px-5 py-4">
                        <span className="inline-flex max-w-[180px] truncate rounded-lg bg-[#F4F6F2] px-2.5 py-1.5 text-xs font-medium text-[#12312B]/75">
                          {volunteer.interest || "Not specified"}
                        </span>
                      </td>

                      <td className="px-5 py-4 text-sm text-[#12312B]/65">
                        {volunteer.availability || "—"}
                      </td>

                      <td className="px-5 py-4">
                        <p className="text-sm font-medium">
                          {formatDate(volunteer.created_at)}
                        </p>
                        <p className="mt-1 text-xs text-[#12312B]/40">
                          View details
                        </p>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="divide-y divide-[#12312B]/5 md:hidden">
            {loading ? (
              <div className="space-y-4 p-5">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div key={index} className="animate-pulse space-y-3">
                    <div className="h-4 w-36 rounded bg-[#12312B]/10" />
                    <div className="h-3 w-52 rounded bg-[#12312B]/10" />
                    <div className="h-3 w-28 rounded bg-[#12312B]/10" />
                  </div>
                ))}
              </div>
            ) : filteredVolunteers.length === 0 ? (
              <div className="px-5 py-14 text-center">
                <Users size={28} className="mx-auto text-[#12312B]/30" />
                <p className="mt-3 text-sm font-semibold">
                  {search ? "No matching applications" : "No applications yet"}
                </p>
                <p className="mt-1 text-xs text-[#12312B]/45">
                  {search
                    ? "Try adjusting your search."
                    : "New volunteer applications will appear here."}
                </p>
              </div>
            ) : (
              filteredVolunteers.map((volunteer) => (
                <button
                  key={volunteer.id}
                  type="button"
                  onClick={() => setSelectedVolunteer(volunteer)}
                  className="flex w-full items-center gap-3 p-4 text-left transition hover:bg-[#F8F9F6]"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#12312B]/[0.07] text-xs font-semibold">
                    {getInitials(volunteer.name || "V")}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold">
                      {volunteer.name}
                    </p>
                    <p className="mt-1 truncate text-xs text-[#12312B]/55">
                      {volunteer.email}
                    </p>
                    <div className="mt-2 flex flex-wrap items-center gap-2 text-[11px] text-[#12312B]/45">
                      <span>{volunteer.location || "Location not provided"}</span>
                      <span>·</span>
                      <span>{formatDate(volunteer.created_at)}</span>
                    </div>
                  </div>

                  <ChevronRight size={18} className="shrink-0 text-[#12312B]/35" />
                </button>
              ))
            )}
          </div>

          <div className="flex flex-col gap-2 border-t border-[#12312B]/10 bg-[#FAFBF9] px-5 py-3 text-xs text-[#12312B]/45 sm:flex-row sm:items-center sm:justify-between">
            <span>
              Showing {filteredVolunteers.length} of {volunteers.length} applications
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Live updates enabled
            </span>
          </div>
        </section>
      </div>

      {/* Applicant details modal */}
      {selectedVolunteer && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-[#071A16]/55 p-0 backdrop-blur-sm sm:items-center sm:p-5"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setSelectedVolunteer(null);
            }
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="volunteer-modal-title"
            className="max-h-[92vh] w-full max-w-xl overflow-y-auto rounded-t-3xl bg-white shadow-2xl sm:rounded-3xl"
          >
            <div className="flex items-start justify-between border-b border-[#12312B]/10 p-5 sm:p-6">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#12312B]/40">
                  Volunteer application
                </p>
                <h2
                  id="volunteer-modal-title"
                  className="mt-2 text-xl font-semibold"
                >
                  Applicant details
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setSelectedVolunteer(null)}
                aria-label="Close details"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F4F6F2] text-[#12312B]/65 transition hover:bg-[#E9EDE7]"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-5 sm:p-6">
              <div className="flex items-center gap-4 rounded-2xl bg-[#F4F6F2] p-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#12312B] text-sm font-semibold text-white">
                  {getInitials(selectedVolunteer.name || "V")}
                </div>
                <div className="min-w-0">
                  <h3 className="truncate text-lg font-semibold">
                    {selectedVolunteer.name}
                  </h3>
                  <p className="mt-1 text-xs text-[#12312B]/55">
                    Submitted {formatDate(selectedVolunteer.created_at)}
                  </p>
                </div>
                <div className="ml-auto shrink-0 text-[#12312B]/35">
                  <UserRound size={22} />
                </div>
              </div>

              <div className="mt-6 space-y-5">
                <div>
                  <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#12312B]/40">
                    Contact information
                  </p>

                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#F4F6F2]">
                        <Mail size={16} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-[11px] text-[#12312B]/45">Email address</p>
                        <p className="break-all text-sm font-medium">
                          {selectedVolunteer.email}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => void copyEmail(selectedVolunteer.email)}
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#12312B]/10 text-[#12312B]/60 transition hover:bg-[#F4F6F2]"
                        title="Copy email"
                        aria-label="Copy email"
                      >
                        {copied ? (
                          <CheckCircle2 size={16} className="text-emerald-600" />
                        ) : (
                          <Copy size={16} />
                        )}
                      </button>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#F4F6F2]">
                        <Phone size={16} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-[11px] text-[#12312B]/45">Phone number</p>
                        <p className="text-sm font-medium">
                          {selectedVolunteer.phone || "Not provided"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#F4F6F2]">
                        <MapPin size={16} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-[11px] text-[#12312B]/45">Location</p>
                        <p className="text-sm font-medium">
                          {selectedVolunteer.location || "Not provided"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t border-[#12312B]/10 pt-5">
                  <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#12312B]/40">
                    Volunteer preferences
                  </p>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-xl border border-[#12312B]/10 p-4">
                      <div className="flex items-center gap-2 text-[#12312B]/45">
                        <HeartHandshake size={15} />
                        <span className="text-xs">Area of interest</span>
                      </div>
                      <p className="mt-2 text-sm font-semibold">
                        {selectedVolunteer.interest || "Not specified"}
                      </p>
                    </div>

                    <div className="rounded-xl border border-[#12312B]/10 p-4">
                      <div className="flex items-center gap-2 text-[#12312B]/45">
                        <Clock3 size={15} />
                        <span className="text-xs">Availability</span>
                      </div>
                      <p className="mt-2 text-sm font-semibold">
                        {selectedVolunteer.availability || "Not specified"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <a
                  href={`mailto:${selectedVolunteer.email}`}
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#12312B] px-4 text-sm font-semibold text-white transition hover:bg-[#1B443B]"
                >
                  <Mail size={16} />
                  Send email
                  <ExternalLink size={14} />
                </a>

                {selectedVolunteer.phone ? (
                  <a
                    href={`tel:${selectedVolunteer.phone}`}
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-[#12312B]/15 bg-white px-4 text-sm font-semibold text-[#12312B] transition hover:bg-[#F4F6F2]"
                  >
                    <Phone size={16} />
                    Call applicant
                  </a>
                ) : (
                  <button
                    type="button"
                    disabled
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-[#12312B]/10 bg-[#F4F6F2] px-4 text-sm font-semibold text-[#12312B]/35"
                  >
                    <Phone size={16} />
                    No phone number
                  </button>
                )}
              </div>

              {copied && (
                <p className="mt-3 text-center text-xs font-medium text-emerald-700">
                  Email address copied.
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
