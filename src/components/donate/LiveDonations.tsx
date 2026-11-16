import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { useReveal } from "@/components/impact/Shared";
import { naira } from "./data";

type Gift = { name: string; amount: number; cause: string; paidAt: string };

const POLL_MS = 20_000;

function timeAgo(iso: string) {
  const s = Math.max(0, (Date.now() - new Date(iso).getTime()) / 1000);
  if (s < 60) return "Just now";
  if (s < 3600) return `${Math.floor(s / 60)} min ago`;
  if (s < 86400) return `${Math.floor(s / 3600)} hr ago`;
  return `${Math.floor(s / 86400)} d ago`;
}

export default function LiveDonations() {
  const reveal = useReveal();
  const [gifts, setGifts] = useState<Gift[] | null>(null);

  useEffect(() => {
    let alive = true;

    const load = async () => {
      try {
        const res = await fetch("/api/donations/recent");
        if (!res.ok) throw new Error();
        const data: Gift[] = await res.json();
        if (alive) setGifts(data.slice(0, 5));
      } catch {
        if (alive) setGifts((prev) => prev ?? []);
      }
    };

    load();
    const id = setInterval(load, POLL_MS);
    return () => {
      alive = false;
      clearInterval(id);
    };
  }, []);

  return (
    <motion.div
      {...reveal(0)}
      className="h-full rounded-[24px] border border-[#12312B]/10 bg-white p-6 sm:p-8 lg:rounded-[28px]"
    >
      <span className="inline-flex items-center gap-2 font-sans text-[11px] font-medium uppercase tracking-[0.16em] text-[#12312B]/60">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#E6A100] opacity-60 motion-reduce:animate-none" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-[#E6A100]" />
        </span>
        Live gifts
      </span>

      <h3 className="mt-3 font-sans text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">
        You'd be in good company.
      </h3>

      {gifts && gifts.length === 0 ? (
        <p className="mt-6 font-sans text-sm leading-relaxed text-[#12312B]/60">
          Be the first to give today. Your gift will appear here.
        </p>
      ) : (
        <ul className="mt-6 divide-y divide-[#12312B]/10" aria-live="polite">
          {(gifts ?? []).map((g) => (
            <motion.li
              key={`${g.paidAt}-${g.amount}-${g.name}`}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-4 py-4"
            >
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#E8F0EC] font-sans text-xs font-bold text-[#12312B]">
                {g.name === "Anonymous" ? (
                  <Heart size={15} strokeWidth={2} />
                ) : (
                  g.name.charAt(0)
                )}
              </span>

              <div className="min-w-0 flex-1">
                <p className="truncate font-sans text-sm font-semibold">{g.name}</p>
                <p className="truncate font-sans text-xs text-[#12312B]/55">
                  {g.cause} · {timeAgo(g.paidAt)}
                </p>
              </div>

              <span className="shrink-0 font-sans text-sm font-semibold tabular-nums">
                {naira(g.amount)}
              </span>
            </motion.li>
          ))}
        </ul>
      )}
    </motion.div>
  );
}