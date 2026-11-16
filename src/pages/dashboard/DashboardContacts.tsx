
import { useCallback, useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Mail,
  MessageSquare,
  Inbox,
  RefreshCw,
  X,
  ExternalLink,
  CalendarDays,
  Clock3,
  User,
  ChevronRight,
  AlertCircle,
} from "lucide-react";

import { supabase } from "@/lib/supabase";
import type { Database } from "@/lib/database";

type Contact = Database["public"]["Tables"]["contacts"]["Row"];

const formatDate = (value: string | null) => {
  if (!value) return "Unknown date";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "Unknown date";

  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
};

const formatTime = (value: string | null) => {
  if (!value) return "";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "";

  return new Intl.DateTimeFormat("en", {
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
};

export default function DashboardContacts() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  const loadContacts = useCallback(async (showLoader = false) => {
    if (showLoader) setRefreshing(true);

    const { data, error: err } = await supabase
      .from("contacts")
      .select("*")
      .order("created_at", { ascending: false });

    if (err) {
      setError(err.message);
    } else {
      setContacts(data ?? []);
      setError("");
    }

    setLoading(false);
    setRefreshing(false);
  }, []);

  useEffect(() => {
    let alive = true;

    const load = async () => {
      const { data, error: err } = await supabase
        .from("contacts")
        .select("*")
        .order("created_at", { ascending: false });

      if (!alive) return;

      if (err) {
        setError(err.message);
      } else {
        setContacts(data ?? []);
        setError("");
      }

      setLoading(false);
    };

    const channel = supabase
      .channel("contacts-realtime")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "contacts" },
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

  const filteredContacts = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return contacts;

    return contacts.filter((contact) =>
      [
        contact.name,
        contact.email,
        contact.subject ?? "",
        contact.message,
      ].some((value) => value?.toLowerCase().includes(query))
    );
  }, [contacts, search]);

  const todayCount = useMemo(() => {
    const today = new Date().toDateString();

    return contacts.filter(
      (contact) =>
        contact.created_at &&
        new Date(contact.created_at).toDateString() === today
    ).length;
  }, [contacts]);

  const latestContact = contacts[0];

  return (
    <div className="min-h-screen bg-[#F6F7F3] px-4 py-6 text-[#12312B] sm:px-6 lg:px-8 lg:py-8">
      <div className="mx-auto max-w-7xl space-y-7">

        {/* Header */}
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#12312B]/45">
              <span className="h-1.5 w-1.5 rounded-full bg-[#E6A100]" />
              Communication
            </div>

            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Contact messages
            </h1>

            <p className="mt-2 max-w-xl text-sm leading-6 text-[#12312B]/55">
              Manage enquiries and messages submitted through your website.
            </p>
          </div>

          <button
            onClick={() => loadContacts(true)}
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
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <StatCard
            icon={<Inbox size={19} />}
            label="Total messages"
            value={contacts.length}
            description="All received enquiries"
          />

          <StatCard
            icon={<MessageSquare size={19} />}
            label="Received today"
            value={todayCount}
            description="Messages submitted today"
          />

          <StatCard
            icon={<Clock3 size={19} />}
            label="Latest message"
            value={latestContact ? formatDate(latestContact.created_at) : "—"}
            description={
              latestContact
                ? `From ${latestContact.name}`
                : "No messages received yet"
            }
          />
        </div>

        {/* Messages section */}
        <section className="overflow-hidden rounded-2xl border border-[#12312B]/[0.08] bg-white shadow-[0_4px_24px_rgba(18,49,43,0.035)]">
          <div className="flex flex-col gap-4 border-b border-[#12312B]/[0.07] p-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <div>
              <h2 className="text-base font-semibold">All messages</h2>
              <p className="mt-1 text-xs text-[#12312B]/45">
                {filteredContacts.length}{" "}
                {filteredContacts.length === 1 ? "message" : "messages"} found
              </p>
            </div>

            <div className="relative w-full sm:max-w-xs">
              <Search
                size={17}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#12312B]/35"
              />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search messages..."
                className="h-11 w-full rounded-xl border border-[#12312B]/10 bg-[#F8F9F6] pl-10 pr-4 text-sm outline-none transition placeholder:text-[#12312B]/35 focus:border-[#12312B]/35 focus:bg-white"
              />
            </div>
          </div>

          {error && (
            <div className="m-5 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
              <AlertCircle size={18} className="mt-0.5 shrink-0" />
              <div>
                <p className="font-semibold">Unable to load messages</p>
                <p className="mt-1">{error}</p>
              </div>
            </div>
          )}

          {/* Loading */}
          {loading ? (
            <div className="space-y-4 p-6">
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="flex animate-pulse items-center gap-4"
                >
                  <div className="h-10 w-10 rounded-full bg-[#F0F2ED]" />
                  <div className="flex-1 space-y-2">
                    <div className="h-3 w-1/3 rounded bg-[#F0F2ED]" />
                    <div className="h-3 w-2/3 rounded bg-[#F0F2ED]" />
                  </div>
                  <div className="h-3 w-16 rounded bg-[#F0F2ED]" />
                </div>
              ))}
            </div>
          ) : filteredContacts.length === 0 ? (
            <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#F4F6F2] text-[#12312B]/45">
                {search ? (
                  <Search size={26} />
                ) : (
                  <Mail size={26} />
                )}
              </div>

              <h3 className="text-base font-semibold">
                {search ? "No matching messages" : "Your inbox is empty"}
              </h3>

              <p className="mt-2 max-w-sm text-sm leading-6 text-[#12312B]/50">
                {search
                  ? "Try another search term or check the spelling."
                  : "When someone submits a message through your contact page, it will appear here."}
              </p>

              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="mt-4 text-sm font-semibold text-[#12312B] underline underline-offset-4"
                >
                  Clear search
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
                      {["Sender", "Subject", "Message preview", "Received", ""].map(
                        (heading, index) => (
                          <th
                            key={index}
                            className="whitespace-nowrap px-6 py-4 text-[10px] font-semibold uppercase tracking-[0.13em] text-[#12312B]/40"
                          >
                            {heading}
                          </th>
                        )
                      )}
                    </tr>
                  </thead>

                  <tbody>
                    {filteredContacts.map((contact) => (
                      <tr
                        key={contact.id}
                        onClick={() => setSelectedContact(contact)}
                        className="cursor-pointer border-b border-[#12312B]/[0.06] transition last:border-0 hover:bg-[#F8F9F6]"
                      >
                        <td className="px-6 py-4">
                          <div className="flex min-w-[190px] items-center gap-3">
                            <Avatar name={contact.name} />
                            <div className="min-w-0">
                              <p className="truncate text-sm font-semibold">
                                {contact.name}
                              </p>
                              <p className="mt-1 truncate text-xs text-[#12312B]/45">
                                {contact.email}
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="max-w-[180px] px-6 py-4">
                          <p className="truncate text-sm text-[#12312B]/75">
                            {contact.subject || "General enquiry"}
                          </p>
                        </td>

                        <td className="max-w-[260px] px-6 py-4">
                          <p className="truncate text-sm text-[#12312B]/50">
                            {contact.message}
                          </p>
                        </td>

                        <td className="whitespace-nowrap px-6 py-4">
                          <p className="text-xs font-medium text-[#12312B]/70">
                            {formatDate(contact.created_at)}
                          </p>
                          <p className="mt-1 text-[11px] text-[#12312B]/40">
                            {formatTime(contact.created_at)}
                          </p>
                        </td>

                        <td className="px-6 py-4 text-right">
                          <ChevronRight
                            size={17}
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
                {filteredContacts.map((contact) => (
                  <button
                    key={contact.id}
                    onClick={() => setSelectedContact(contact)}
                    className="flex w-full items-start gap-3 p-4 text-left transition hover:bg-[#F8F9F6]"
                  >
                    <Avatar name={contact.name} />

                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <p className="truncate text-sm font-semibold">
                          {contact.name}
                        </p>
                        <span className="shrink-0 text-[10px] text-[#12312B]/40">
                          {formatDate(contact.created_at)}
                        </span>
                      </div>

                      <p className="mt-1 truncate text-xs text-[#12312B]/50">
                        {contact.email}
                      </p>

                      <p className="mt-3 truncate text-xs font-semibold text-[#12312B]/75">
                        {contact.subject || "General enquiry"}
                      </p>

                      <p className="mt-1 line-clamp-2 text-xs leading-5 text-[#12312B]/45">
                        {contact.message}
                      </p>

                      <div className="mt-3 flex items-center gap-1 text-[11px] font-semibold text-[#12312B]/55">
                        View message
                        <ChevronRight size={13} />
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </>
          )}

          <div className="border-t border-[#12312B]/[0.07] bg-[#FAFBF9] px-5 py-3.5 sm:px-6">
            <p className="text-[11px] text-[#12312B]/40">
              Contact submissions are updated automatically.
            </p>
          </div>
        </section>
      </div>

      {/* Message details modal */}
      <AnimatePresence>
        {selectedContact && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedContact(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#0A1D18]/55 p-4 backdrop-blur-sm"
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 15, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl bg-white shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-[#12312B]/[0.08] px-5 py-4 sm:px-6">
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.14em] text-[#12312B]/40">
                    Message details
                  </p>
                  <h3 className="mt-1 text-lg font-semibold">
                    Contact enquiry
                  </h3>
                </div>

                <button
                  onClick={() => setSelectedContact(null)}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F4F6F2] transition hover:bg-[#E9EDE6]"
                  aria-label="Close message"
                >
                  <X size={17} />
                </button>
              </div>

              <div className="space-y-6 p-5 sm:p-6">
                <div className="flex items-center gap-3">
                  <Avatar
                    name={selectedContact.name}
                    large
                  />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold">
                      {selectedContact.name}
                    </p>
                    <a
                      href={`mailto:${selectedContact.email}`}
                      className="mt-1 block truncate text-sm text-[#12312B]/55 hover:text-[#12312B]"
                    >
                      {selectedContact.email}
                    </a>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-3 rounded-xl bg-[#F7F8F5] p-4 sm:grid-cols-2">
                  <div>
                    <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wider text-[#12312B]/40">
                      <MessageSquare size={13} />
                      Subject
                    </div>
                    <p className="mt-2 text-sm font-medium">
                      {selectedContact.subject || "General enquiry"}
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wider text-[#12312B]/40">
                      <CalendarDays size={13} />
                      Date received
                    </div>
                    <p className="mt-2 text-sm font-medium">
                      {formatDate(selectedContact.created_at)}
                    </p>
                    <p className="mt-1 text-xs text-[#12312B]/45">
                      {formatTime(selectedContact.created_at)}
                    </p>
                  </div>
                </div>

                <div>
                  <div className="mb-3 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#12312B]/40">
                    <Mail size={14} />
                    Message
                  </div>

                  <div className="whitespace-pre-wrap rounded-xl border border-[#12312B]/[0.08] bg-white p-4 text-sm leading-7 text-[#12312B]/75">
                    {selectedContact.message}
                  </div>
                </div>

                <div className="flex flex-col-reverse gap-3 sm:flex-row">
                  <button
                    onClick={() => setSelectedContact(null)}
                    className="h-11 flex-1 rounded-xl border border-[#12312B]/10 text-sm font-semibold transition hover:bg-[#F4F6F2]"
                  >
                    Close
                  </button>

                  <a
                    href={`mailto:${encodeURIComponent(
                      selectedContact.email
                    )}?subject=${encodeURIComponent(
                      `Re: ${selectedContact.subject || "Your enquiry"}`
                    )}`}
                    className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-[#12312B] px-4 text-sm font-semibold text-white transition hover:bg-[#1B463D]"
                  >
                    Reply by email
                    <ExternalLink size={15} />
                  </a>
                </div>
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
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-[#12312B]/[0.08] bg-white p-5 shadow-[0_4px_20px_rgba(18,49,43,0.025)]">
      <div className="flex items-center justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F4F6F2] text-[#12312B]">
          {icon}
        </div>
        <span className="text-[10px] font-semibold uppercase tracking-wider text-[#12312B]/35">
          Overview
        </span>
      </div>

      <p className="mt-5 text-xs font-medium text-[#12312B]/50">{label}</p>

      <p className="mt-1 text-2xl font-semibold tracking-tight">{value}</p>

      <p className="mt-1 text-xs text-[#12312B]/40">{description}</p>
    </div>
  );
}

function Avatar({
  name,
  large = false,
}: {
  name: string;
  large?: boolean;
}) {
  const initials = name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  return (
    <div
      className={`flex shrink-0 items-center justify-center rounded-full bg-[#EAF0E9] font-semibold text-[#12312B] ${
        large ? "h-12 w-12 text-sm" : "h-10 w-10 text-xs"
      }`}
    >
      {initials || <User size={16} />}
    </div>
  );
}
