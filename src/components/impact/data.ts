// components/impact/data.ts
// All Impact page content lives here. Everything marked PLACEHOLDER must be
// replaced with verified figures, real quotes and real photos before launch.

export const STATS = [
  // 90,000 comes from your earlier "90k+ lives touched" copy. Confirm it.
  { value: 90000, suffix: "+", label: "Lives impacted" },
  { value: 45, suffix: "", label: "Projects completed" }, // PLACEHOLDER
  { value: 30, suffix: "+", label: "Communities reached" }, // PLACEHOLDER
  { value: 150, suffix: "+", label: "Active volunteers" }, // PLACEHOLDER
];

export type Milestone = {
  year: string;
  title: string;
  text: string;
  figure?: { value: string; label: string };
};

export const MILESTONES: Milestone[] = [
  {
    year: "2023",
    title: "The Foundation is founded",
    text: "St. Genevieve Maternal and Child Welfare Foundation is established as a registered non-governmental organisation, growing out of a community relief programme.",
  },
  {
    year: "2024",
    title: "[2024 milestone title]", // PLACEHOLDER
    text: "[One or two sentences on what was achieved this year.]",
    figure: { value: "[00]", label: "[what the number counts]" },
  },
  {
    year: "2025",
    title: "[2025 milestone title]", // PLACEHOLDER
    text: "[One or two sentences on what was achieved this year.]",
    figure: { value: "[00]", label: "[what the number counts]" },
  },
  {
    year: "2026",
    title: "[2026 milestone title]", // PLACEHOLDER
    text: "[One or two sentences on what was achieved this year.]",
    figure: { value: "[00]", label: "[what the number counts]" },
  },
];

export type Story = {
  name: string;
  place: string;
  quote: string;
  tone?: "green" | "yellow" | "rose"; // no longer used by the layout
  image: string; // full-bleed background photo
  videoId?: string; // YouTube id, optional
};

// PLACEHOLDER: use real first-person quotes, with written consent from each
// person (or a parent or guardian for children).
export const STORIES: Story[] = [
  {
    name: "[Beneficiary name]",
    place: "[Community]",
    quote:
      "[Add a first-person quote here, in the person's own words. Get their written consent before publishing.]",
    tone: "green",
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1800&q=80",
    // videoId: "YOUTUBE_VIDEO_ID",
  },
  {
    name: "[Beneficiary name]",
    place: "[Community]",
    quote: "[Add a first-person quote here.]",
    tone: "yellow",
    image:
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1800&q=80",
  },
  {
    name: "[Beneficiary name]",
    place: "[Community]",
    quote: "[Add a first-person quote here.]",
    tone: "rose",
    image:
      "https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=1800&q=80",
  },
];

export type GalleryItem = {
  src: string;
  alt: string;
  caption: string;
  ratio: "portrait" | "landscape" | "square";
  videoId?: string; // YouTube id: shows a play badge and plays in the lightbox
};

// PLACEHOLDER photos: replace with your own field photos.
const u = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1200&q=80`;

export const GALLERY: GalleryItem[] = [
  { src: u("photo-1488521787991-ed7bbaae773c"), alt: "Outreach session", caption: "[Caption: what is happening, where, when]", ratio: "landscape" },
  { src: u("photo-1576091160399-112ba8d25d1d"), alt: "Healthcare outreach", caption: "[Caption: what is happening, where, when]", ratio: "portrait" },
  { src: u("photo-1559027615-cd4628902d4a"), alt: "Volunteers at work", caption: "[Caption: what is happening, where, when]", ratio: "square" },
  { src: u("photo-1509099836639-18ba1795216d"), alt: "Children at a programme", caption: "[Caption: what is happening, where, when]", ratio: "portrait" },
  { src: u("photo-1593113598332-cd288d649433"), alt: "Community volunteers", caption: "[Caption: what is happening, where, when]", ratio: "landscape" },
  { src: u("photo-1532629345422-7515f3d16bb6"), alt: "Food support distribution", caption: "[Caption: what is happening, where, when]", ratio: "square" },
];