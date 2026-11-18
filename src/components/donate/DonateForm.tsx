import { useRef, useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Lock } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { CustomArrowUpRight } from "@/components/ui/CustomIcons";
import { useReveal } from "@/components/impact/Shared";
import { DESIGNATIONS, MIN_AMOUNT, PRESETS, naira } from "./data";

/* ───────── Paystack inline typings ───────── */
type PaystackSetup = {
  key: string;
  email: string;
  amount: number; // kobo
  currency: string;
  ref: string;
  metadata?: {
    custom_fields: { display_name: string; variable_name: string; value: string }[];
  };
  callback: (response: { reference: string }) => void;
  onClose: () => void;
};

declare global {
  interface Window {
    PaystackPop?: {
      setup: (options: PaystackSetup) => { openIframe: () => void };
    };
  }
}

const PUBLIC_KEY = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY as string | undefined;
const SCRIPT_SRC = "https://js.paystack.co/v1/inline.js";

function loadPaystack(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (window.PaystackPop) return resolve();

    const existing = document.querySelector<HTMLScriptElement>(
      `script[src="${SCRIPT_SRC}"]`
    );
    if (existing) {
      existing.addEventListener("load", () => resolve());
      existing.addEventListener("error", () => reject(new Error("load failed")));
      return;
    }

    const script = document.createElement("script");
    script.src = SCRIPT_SRC;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("load failed"));
    document.body.appendChild(script);
  });
}

/* ───────── Styles ───────── */
const FIELD =
  "w-full border-b border-[#12312B]/20 bg-transparent px-0 py-3 font-sans text-sm text-[#12312B] outline-none transition-colors placeholder:text-[#12312B]/35 focus:border-[#12312B]";
const LABEL = "mb-2 block font-sans text-xs font-medium";

type Status = "idle" | "processing" | "success";

export default function DonateForm({ projectId }: { projectId?: string } = {}) {
  const reveal = useReveal();

  const [selected, setSelected] = useState<number | "custom">(100000);
  const [customValue, setCustomValue] = useState("");
  const [designation, setDesignation] = useState<string>(DESIGNATIONS[0]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [anonymous, setAnonymous] = useState(false);

  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [reference, setReference] = useState("");
  const [paidAmount, setPaidAmount] = useState(0);

  // Paystack fires onClose after a successful payment too; this stops it
  // from resetting the success state.
  const paid = useRef(false);

  const amountValue =
    selected === "custom" ? Number(customValue || 0) : selected;

  const impact =
    selected === "custom"
      ? "Every naira goes to work for mothers and children."
      : PRESETS.find((p) => p.amount === selected)?.impact ?? "";

  const label =
    status === "processing"
      ? "OPENING CHECKOUT"
      : amountValue >= MIN_AMOUNT
        ? `DONATE ${naira(amountValue)}`
        : "DONATE NOW";

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!PUBLIC_KEY) {
      setError(
        "Online payments aren't switched on yet. Please use the bank transfer details below."
      );
      return;
    }

    if (!amountValue || amountValue < MIN_AMOUNT) {
      setError(`The minimum gift is ${naira(MIN_AMOUNT)}.`);
      return;
    }

    setStatus("processing");
    paid.current = false;

    try {
      await loadPaystack();
    } catch {
      setStatus("idle");
      setError(
        "We couldn't load the secure payment window. Check your connection and try again."
      );
      return;
    }

    const ref = `SGF-${Date.now()}-${Math.floor(Math.random() * 1_000_000)}`;

    const handler = window.PaystackPop!.setup({
      key: PUBLIC_KEY,
      email: email.trim(),
      amount: Math.round(amountValue * 100),
      currency: "NGN",
      ref,
      metadata: {
        custom_fields: [
          { display_name: "Donor name", variable_name: "donor_name", value: name.trim() },
          { display_name: "Designation", variable_name: "designation", value: designation },
          { display_name: "Anonymous", variable_name: "anonymous", value: anonymous ? "Yes" : "No" },
        ],
      },
      callback: async (response) => {
        paid.current = true;
        setReference(response.reference);
        setPaidAmount(amountValue);
        setStatus("success");

        try {
          await supabase.from("payments").insert({
            reference: response.reference,
            amount: Math.round(amountValue * 100),
            currency: "NGN",
            donor_name: name.trim() || null,
            email: email.trim() || null,
            designation,
            project_id: projectId || null,
            anonymous,
            status: "paid",
          });
        } catch {
          // Payment succeeded on Paystack; the record failed to sync.
          // It will appear once the donor checks their email receipt.
        }
      },
      onClose: () => {
        if (!paid.current) setStatus("idle");
      },
    });

    handler.openIframe();
  };

  const donateAgain = () => {
    paid.current = false;
    setReference("");
    setStatus("idle");
  };

  const firstName = name.trim().split(" ")[0];

  return (
    <motion.div
      {...reveal(0.15)}
      id="donate-form"
      className="h-fit scroll-mt-28 rounded-[24px] bg-[#F4F6F2] p-6 sm:rounded-[30px] sm:p-9 lg:p-8 xl:p-10"
    >
      <div className="mb-8">
        <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.16em] text-[#12312B]/45">
          MAKE A DONATION
        </span>

        <h2 className="mt-3 font-sans text-2xl font-semibold tracking-[-0.04em] sm:text-3xl">
          Choose an amount.
        </h2>
      </div>

      {status === "success" ? (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex min-h-[320px] flex-col items-center justify-center text-center"
        >
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#12312B] text-2xl text-[#E6A100]">
            ✓
          </div>

          <h3 className="mt-6 font-sans text-2xl font-semibold">
            Thank you{firstName ? `, ${firstName}` : ""}.
          </h3>

          <p className="mt-3 max-w-[340px] font-sans text-sm leading-relaxed text-[#12312B]/65">
            Your gift of {naira(paidAmount)} will go to work for mothers and
            children in our communities.
          </p>

          <p className="mt-5 break-all font-sans text-xs text-[#12312B]/45">
            Payment reference: {reference}
          </p>

          <button
            type="button"
            onClick={donateAgain}
            className="mt-7 font-sans text-xs font-semibold uppercase tracking-wider text-[#12312B] underline underline-offset-4"
          >
            Give again
          </button>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-7">
          {/* AMOUNT */}
          <div>
            <div
              role="radiogroup"
              aria-label="Donation amount"
              className="grid grid-cols-3 gap-2.5"
            >
              {PRESETS.map((p) => {
                const on = selected === p.amount;
                return (
                  <button
                    key={p.amount}
                    type="button"
                    role="radio"
                    aria-checked={on}
                    aria-label={naira(p.amount)}
                    onClick={() => setSelected(p.amount)}
                    className={`rounded-xl border px-2 py-3.5 text-center font-sans text-[13px] font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E6A100] focus-visible:ring-offset-2 sm:text-sm ${
                      on
                        ? "border-[#12312B] bg-[#12312B] text-white"
                        : "border-[#12312B]/15 bg-white text-[#12312B] hover:border-[#12312B]/50"
                    }`}
                  >
                    {p.label}
                  </button>
                );
              })}

              <button
                type="button"
                role="radio"
                aria-checked={selected === "custom"}
                onClick={() => setSelected("custom")}
                className={`rounded-xl border px-2 py-3.5 text-center font-sans text-[13px] font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E6A100] focus-visible:ring-offset-2 sm:text-sm ${
                  selected === "custom"
                    ? "border-[#12312B] bg-[#12312B] text-white"
                    : "border-[#12312B]/15 bg-white text-[#12312B] hover:border-[#12312B]/50"
                }`}
              >
                Other
              </button>
            </div>

            {selected === "custom" && (
              <div className="mt-4 flex items-center gap-2 border-b border-[#12312B]/20 focus-within:border-[#12312B]">
                <span className="font-sans text-lg font-semibold">₦</span>
                <input
                  type="text"
                  inputMode="numeric"
                  aria-label="Custom amount in naira"
                  placeholder={`Minimum ${MIN_AMOUNT.toLocaleString("en-NG")}`}
                  value={customValue ? Number(customValue).toLocaleString("en-NG") : ""}
                  onChange={(e) =>
                    setCustomValue(e.target.value.replace(/\D/g, "").slice(0, 9))
                  }
                  className="w-full bg-transparent py-3 font-sans text-lg font-semibold text-[#12312B] outline-none placeholder:text-sm placeholder:font-normal placeholder:text-[#12312B]/35"
                />
              </div>
            )}

            <motion.p
              key={impact}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="mt-4 border-l-2 border-[#E6A100] pl-3 font-sans text-xs leading-relaxed text-[#12312B]/70 sm:text-[13px]"
            >
              {impact}
            </motion.p>
          </div>

          {/* DESIGNATION */}
          <div>
            <label htmlFor="donate-designation" className={LABEL}>
              Where should your gift go?
            </label>
            <select
              id="donate-designation"
              value={designation}
              onChange={(e) => setDesignation(e.target.value)}
              className={`${FIELD} appearance-none`}
            >
              {DESIGNATIONS.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          {/* NAME & EMAIL */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            <div>
              <label htmlFor="donate-name" className={LABEL}>
                Your name
              </label>
              <input
                id="donate-name"
                type="text"
                required
                autoComplete="name"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={FIELD}
              />
            </div>

            <div>
              <label htmlFor="donate-email" className={LABEL}>
                Email address
              </label>
              <input
                id="donate-email"
                type="email"
                required
                autoComplete="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={FIELD}
              />
            </div>
          </div>

          {/* ANONYMOUS */}
          <label className="flex cursor-pointer items-center gap-3 font-sans text-xs text-[#12312B]/75 sm:text-[13px]">
            <input
              type="checkbox"
              checked={anonymous}
              onChange={(e) => setAnonymous(e.target.checked)}
              className="h-4 w-4 shrink-0 accent-[#12312B]"
            />
            Keep my name private
          </label>

          {error && (
            <p
              role="alert"
              className="rounded-lg bg-[#F8E8E3] px-4 py-3 font-sans text-xs leading-relaxed text-[#12312B]"
            >
              {error}
            </p>
          )}

          {/* SUBMIT */}
          <div>
            <button
              type="submit"
              disabled={status === "processing"}
              className="group relative inline-flex w-full items-center justify-center gap-2.5 overflow-hidden rounded-full bg-[#E6A100] px-7 py-4 font-sans text-xs font-medium uppercase tracking-wider text-[#12312B] shadow-[0_0_0_0_rgba(18,49,43,0)] transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] hover:scale-[1.02] hover:text-white hover:shadow-[0_14px_32px_-10px_rgba(18,49,43,0.5)] active:scale-95 disabled:pointer-events-none disabled:opacity-70 sm:w-auto"
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute bottom-0 left-1/2 aspect-square w-[160%] -translate-x-1/2 translate-y-1/2 scale-0 rounded-full bg-[#12312B] transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-100"
              />

              <span className="relative block overflow-hidden leading-[1.5]">
                <span className="block transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full">
                  {label}
                </span>
                <span
                  aria-hidden="true"
                  className="absolute inset-0 block translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-y-0"
                >
                  {label}
                </span>
              </span>

              <span className="relative block h-[14px] w-[14px] overflow-hidden">
                <span className="absolute inset-0 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full group-hover:translate-x-full">
                  <CustomArrowUpRight size={14} color="currentColor" />
                </span>
                <span
                  aria-hidden="true"
                  className="absolute inset-0 -translate-x-full translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-x-0 group-hover:translate-y-0"
                >
                  <CustomArrowUpRight size={14} color="currentColor" />
                </span>
              </span>
            </button>

            <p className="mt-4 flex items-center gap-2 font-sans text-[11px] leading-relaxed text-[#12312B]/55">
              <Lock size={12} className="shrink-0" />
              Secure payment by Paystack. We never see or store your card details.
            </p>
          </div>
        </form>
      )}
    </motion.div>
  );
}