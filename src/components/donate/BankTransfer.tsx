import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Check, Copy } from "lucide-react";
import { useReveal } from "@/components/impact/Shared";
import { BANK } from "./data";

const ROWS = [
  { key: "accountName", label: "Account name", value: BANK.accountName },
  { key: "bankName", label: "Bank", value: BANK.bankName },
  { key: "accountNumber", label: "Account number", value: BANK.accountNumber },
] as const;

export default function BankTransfer() {
  const reveal = useReveal();
  const [copied, setCopied] = useState<string | null>(null);

  const copy = async (key: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(key);
      setTimeout(() => setCopied(null), 1800);
    } catch {
      /* clipboard unavailable: the details are still visible to copy by hand */
    }
  };

  return (
    <motion.div
      {...reveal(0.1)}
      className="h-full rounded-[24px] bg-[#12312B] p-6 text-white sm:p-8 lg:rounded-[28px]"
    >
      <span className="inline-flex items-center gap-2 font-sans text-[11px] font-medium uppercase tracking-[0.16em] text-white/70">
        <span className="h-1.5 w-1.5 rounded-full bg-[#E6A100]" />
        Bank transfer
      </span>

      <h3 className="mt-3 font-sans text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">
        Prefer to give directly?
      </h3>

      <dl className="mt-6 divide-y divide-white/15 border-y border-white/15">
        {ROWS.map((row) => (
          <div key={row.key} className="flex items-center justify-between gap-4 py-4">
            <div className="min-w-0">
              <dt className="font-sans text-[11px] uppercase tracking-wider text-white/55">
                {row.label}
              </dt>
              <dd className="mt-1 break-words font-sans text-sm font-semibold sm:text-base">
                {row.value}
              </dd>
            </div>

            <button
              type="button"
              onClick={() => copy(row.key, row.value)}
              aria-label={`Copy ${row.label}`}
              className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/25 transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E6A100]"
            >
              {copied === row.key ? (
                <Check size={15} className="text-[#E6A100]" />
              ) : (
                <Copy size={15} />
              )}
            </button>
          </div>
        ))}
      </dl>

      <p className="mt-6 font-sans text-xs leading-[1.8] text-white/70">
        After you transfer, email your name and proof of payment to{" "}
        <a
          href={`mailto:${BANK.email}`}
          className="font-semibold text-[#E6A100] underline underline-offset-4"
        >
          {BANK.email}
        </a>{" "}
        so we can acknowledge your gift. Giving from abroad or on behalf of a
        company? <Link to="/contact" className="font-semibold underline underline-offset-4">Get in touch</Link>.
      </p>
    </motion.div>
  );
}