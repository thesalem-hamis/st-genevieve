import { Link } from "react-router-dom";
import { CustomArrowUpRight } from "@/components/ui/CustomIcons";

export function PillButton({
  to,
  children,
  variant = "gold",
}: {
  to: string;
  children: string;
  variant?: "gold" | "green";
}) {
  const isGold = variant === "gold";
  return (
    <Link
      to={to}
      className={`group relative inline-flex items-center gap-2.5 overflow-hidden rounded-full px-7 py-3.5 font-sans text-xs font-medium uppercase tracking-wider transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] hover:scale-[1.04] active:scale-95 ${
        isGold
          ? "bg-[#E6A100] text-[#12312B] hover:text-white hover:shadow-[0_14px_32px_-10px_rgba(18,49,43,0.5)]"
          : "bg-[#12312B] text-white hover:text-[#12312B] hover:shadow-[0_14px_32px_-10px_rgba(230,161,0,0.4)]"
      }`}
    >
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute bottom-0 left-1/2 aspect-square w-[160%] -translate-x-1/2 translate-y-1/2 scale-0 rounded-full transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-100 ${
          isGold ? "bg-[#12312B]" : "bg-[#E6A100]"
        }`}
      />

      <span className="relative block overflow-hidden leading-[1.5]">
        <span className="block transition-transform duration-500 group-hover:-translate-y-full">
          {children}
        </span>
        <span
          aria-hidden="true"
          className="absolute inset-0 block translate-y-full transition-transform duration-500 group-hover:translate-y-0"
        >
          {children}
        </span>
      </span>

      <span className="relative block h-[14px] w-[14px] overflow-hidden">
        <span className="absolute inset-0 transition-transform duration-500 group-hover:-translate-y-full group-hover:translate-x-full">
          <CustomArrowUpRight size={14} color="currentColor" />
        </span>
        <span
          aria-hidden="true"
          className="absolute inset-0 -translate-x-full translate-y-full transition-transform duration-500 group-hover:translate-x-0 group-hover:translate-y-0"
        >
          <CustomArrowUpRight size={14} color="currentColor" />
        </span>
      </span>
    </Link>
  );
}

export function DotBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0"
      style={{
        backgroundImage:
          "radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1.3px)",
        backgroundSize: "18px 18px",
        WebkitMaskImage:
          "radial-gradient(ellipse at 100% 0%, #000 0%, transparent 70%)",
        maskImage:
          "radial-gradient(ellipse at 100% 0%, #000 0%, transparent 70%)",
      }}
    />
  );
}