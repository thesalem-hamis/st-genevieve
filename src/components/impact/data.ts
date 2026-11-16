/* ------------------------------------------------------------------
   Single source of data for the Impact page: stats, milestones, stories.

   IMPORTANT: the STATS values, the 2024-2026 milestone FIGURES and the
   STORIES are SAMPLE content so the layout can be judged. Replace them
   with your real numbers and genuine, consented quotes before the site
   goes live.
   The 2019 and 2022 milestones come from the founder's own account.
------------------------------------------------------------------- */

export type Stat = {
  value: number;
  suffix: string;
  label: string;
};

export const STATS: Stat[] = [
  { value: 400, suffix: "+", label: "Families supported" },
  { value: 220, suffix: "", label: "Children with access to healthcare and education" },
  { value: 60, suffix: "", label: "Mothers trained in economic skills" },
  { value: 6, suffix: "", label: "Communities served" },
];

export type Milestone = {
  year: string;
  tag: string;
  title: string;
  text: string;
  highlights: { title: string; text: string }[];
  figures: { value: string; label: string }[]; // SAMPLE figures from 2024: replace
};

export const MILESTONES: Milestone[] = [
  {
    year: "2019",
    tag: "The beginning",
    title: "A midwife sees the need",
    text: "While working as a midwife in Nigeria, Genevieve Sonia Nwokeide saw how cost and circumstance shaped the health of mothers and children. She could not change everything, but she decided to do something, and began giving 10% of her salary to families in need.",
    highlights: [
      {
        title: "What she witnessed",
        text: "Mothers staying in hospital for months because they could not pay their bills, and families making difficult healthcare decisions because of money.",
      },
      {
        title: "Risk and fear",
        text: "Women choosing riskier methods of childbirth because of societal expectations or because safer options were out of reach.",
      },
      {
        title: "A personal commitment",
        text: "10% of her salary, set aside to support mothers, children and families in need.",
      },
    ],
    figures: [{ value: "10%", label: "Of her salary given to families in need" }],
  },
  {
    year: "2022",
    tag: "Established",
    title: "A personal pledge becomes a foundation",
    text: "What began as a personal commitment grew into a larger vision. Following advice to formalise these efforts, St. Genevieve Maternal and Child Welfare Foundation was officially established on 16 April 2022.",
    highlights: [
      {
        title: "Formalising the work",
        text: "A personal giving commitment became a foundation, so the support could reach further and last longer.",
      },
      {
        title: "The name",
        text: "Inspired by St. Genevieve of Paris, remembered for her devotion to prayer, leadership and her care for the poor.",
      },
      {
        title: "The slogan",
        text: "\u201CA Slice for a Better Smile,\u201D drawn from her association with distributing loaves of bread.",
      },
    ],
    figures: [
      { value: "16 April", label: "2022, the Foundation is officially established" },
    ],
  },
  {
    year: "2024",
    tag: "Growth",
    title: "More families came forward",
    text: "As word spread, more families asked for help. The relief programme grew quickly, and education became part of the work alongside maternal healthcare.",
    highlights: [
      {
        title: "Healthcare access widened",
        text: "More mothers received check-ups and guidance before and after birth.",
      },
      {
        title: "Support for children's schooling",
        text: "Vulnerable children gained access to basic learning materials and school support.",
      },
      {
        title: "Volunteers join",
        text: "Local volunteers began helping with outreach and follow-up visits.",
      },
    ],
    figures: [
      { value: "150", label: "Families supported" },
      { value: "3", label: "Communities served" },
      { value: "25", label: "Active volunteers" },
    ],
  },
  {
    year: "2025",
    tag: "Sustainability",
    title: "From short-term aid to lasting support",
    text: "We shifted our focus from one-off help to sustainable relief: equipping mothers with economic skills and giving children continuous access to healthcare and education.",
    highlights: [
      {
        title: "Skills for mothers",
        text: "Training that helps mothers earn an income and support their own families.",
      },
      {
        title: "Continuous care for children",
        text: "Children now follow a steady path of healthcare and schooling rather than one-time help.",
      },
      {
        title: "Clear programme structure",
        text: "Healthcare, education and family support were organised into defined programmes.",
      },
    ],
    figures: [
      { value: "60", label: "Mothers trained" },
      { value: "220", label: "Children supported" },
    ],
  },
  {
    year: "2026",
    tag: "Today",
    title: "Taking the model to the next community",
    text: "With a proven approach, we are working to reach more communities while staying open about how every donation is used.",
    highlights: [
      {
        title: "New communities",
        text: "Outreach to additional underserved communities that need the same support.",
      },
      {
        title: "Partnerships",
        text: "Working with organisations and individuals who want their support to reach people directly.",
      },
      {
        title: "Open reporting",
        text: "Sharing what we do and what it achieves, so supporters can see their impact.",
      },
    ],
    figures: [
      { value: "400+", label: "Families supported to date" },
      { value: "6", label: "Communities served" },
    ],
  },
];

export type Story = {
  name: string;
  role: string;
  programme: string;
  quote: string;
  context: string;
  outcome?: string;
  image: string;
  imagePosition?: string;
  videoId?: string;
  tone?: "green" | "yellow" | "rose";
};

/* SAMPLE stories: replace with real, consented quotes and your own photos */
export const STORIES: Story[] = [
  {
    name: "Ngozi A.",
    role: "Mother of three",
    programme: "Maternal healthcare",
    quote:
      "I used to put off going to the clinic because I could not afford the trip. Now someone checks on me and my baby before things become serious.",
    context:
      "Ngozi joined the maternal healthcare programme during her third pregnancy and has had regular check-ups and guidance on care after birth.",
    outcome: "Regular check-ups through pregnancy and after birth",
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1400&q=80",
    imagePosition: "center",
    tone: "green",
  },
  {
    name: "Chinelo E.",
    role: "Parent of two",
    programme: "Education",
    quote:
      "My children have books, a place to learn, and someone who notices when they miss class. That was not something I could give them alone.",
    context:
      "Both of Chinelo's children were enrolled with the Foundation's support and now attend school regularly.",
    outcome: "Both children enrolled and attending",
    image:
      "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=1400&q=80",
    imagePosition: "center",
    tone: "yellow",
  },
  {
    name: "Blessing U.",
    role: "Programme participant",
    programme: "Skills for mothers",
    quote:
      "I learned a skill I can earn from. When a child falls sick, I no longer have to wait for someone else to help.",
    context:
      "Blessing took part in the economic skills training for mothers and now earns an income from her own work.",
    outcome: "Earning an income from her own work",
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1400&q=80",
    imagePosition: "left center",
    tone: "rose",
  },
  {
    name: "Ifeoma N.",
    role: "Community volunteer",
    programme: "Community outreach",
    quote:
      "People trust us because we come back. That is what makes them bring their neighbours to the programme.",
    context:
      "Ifeoma volunteers on outreach days and follow-up visits, helping families find the support that fits them.",
    outcome: "Brings new families into the programme",
    image:
      "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=1400&q=80",
    imagePosition: "right center",
    tone: "green",
  },
];

/* ------------------------------------------------------------------
   Gallery. Each `src` must be unique (it is used as the React key) and
   Unsplash-style URLs should keep `w=1200`, because the lightbox swaps
   it for `w=1800`. If you use your own imported images, the swap is
   simply skipped and the same file is shown.
   SAMPLE entries: replace with your real photos and captions.
------------------------------------------------------------------- */

export type GalleryItem = {
  src: string;
  alt: string;
  caption: string;
  ratio: "portrait" | "landscape" | "square";
  /** Optional YouTube id: shows a play badge and opens the video in the viewer */
  videoId?: string;
};

export const GALLERY: GalleryItem[] = [
  {
    src: "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=1200&q=80&sig=1",
    alt: "Volunteers and families gathered at a community programme",
    caption: "Volunteers and families at a community programme day.",
    ratio: "landscape",
  },
  {
    src: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80&sig=2",
    alt: "Healthcare worker caring for a mother and child",
    caption: "A healthcare worker supporting a mother and her child.",
    ratio: "portrait",
  },
  {
    src: "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=1200&q=80&sig=3",
    alt: "Families at a Foundation outreach",
    caption: "Families gathering at an outreach session.",
    ratio: "square",
  },
  {
    src: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80&sig=4",
    alt: "A mother receiving healthcare support",
    caption: "A mother receiving a check-up through the maternal healthcare programme.",
    ratio: "landscape",
  },
  {
    src: "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=1200&q=80&sig=5",
    alt: "Children and volunteers together",
    caption: "Children and volunteers during an education support session.",
    ratio: "portrait",
  },
  {
    src: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80&sig=6",
    alt: "Foundation team at work in the community",
    caption: "The Foundation team at work in the community.",
    ratio: "square",
  },
];