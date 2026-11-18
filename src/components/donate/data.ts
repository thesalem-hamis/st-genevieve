export const MIN_AMOUNT = 1000;

export const naira = (n: number) => `₦${n.toLocaleString("en-NG")}`;

/* PLACEHOLDER: replace the impact lines with real, verifiable figures */
export const PRESETS = [
  {
    amount: 100000,
    label: "₦100,000",
    impact: "Supports a mother through care before and after birth.",
  },
  {
    amount: 250000,
    label: "₦250,000",
    impact: "Keeps a group of children learning with school essentials.",
  },
  {
    amount: 500000,
    label: "₦500,000",
    impact: "Funds a skills training programme for mothers.",
  },
  {
    amount: 1000000,
    label: "₦1,000,000",
    impact: "Powers a full community outreach for families in need.",
  },
  {
    amount: 2000000,
    label: "₦2,000,000",
    impact: "Sponsors a programme's work across a whole community.",
  },
] as const;

export const DESIGNATIONS = [
  "Where it's needed most",
  "Maternal Healthcare",
  "Child Welfare",
  "Skills Development",
] as const;

export const USES = [
  {
    tag: "Healthcare",
    title: "Maternal Healthcare",
    text: "Accessible care for mothers before, during and after birth.",
    bg: "bg-[#E8F0EC]",
    dot: "bg-[#12312B]",
  },
  {
    tag: "Education",
    title: "Child Welfare",
    text: "Continuous access to learning and care for vulnerable children.",
    bg: "bg-[#FBF1D4]",
    dot: "bg-[#E6A100]",
  },
  {
    tag: "Empowerment",
    title: "Skills Development",
    text: "Practical skills that turn short-term relief into independence.",
    bg: "bg-[#F8E8E3]",
    dot: "bg-[#C9705F]",
  },
] as const;

/* PLACEHOLDER: replace with the foundation's real account */
export const BANK = {
  accountName: "St. Genevieve Maternal and Child Welfare Foundation",
  bankName: "Your Bank Name",
  accountNumber: "0123456789",
  email: "info@stgenevievefoundation.org",
} as const;