
import { useCallback, useEffect, useMemo, useState, type FormEvent } from "react";
import { supabase } from "@/lib/supabase";
import type { Database } from "@/lib/database";
import { AnimatePresence, motion } from "framer-motion";
import {
  Plus,
  Search,
  FileText,
  Image,
  Eye,
  Edit3,
  Trash2,
  X,
  Clock3,
  CalendarDays,
  UserRound,
  ArrowUpRight,
  BookOpen,
  PenLine,
  AlertCircle,
  RefreshCw,
  Globe2,
  Save,
  LayoutList,
  Sparkles,
} from "lucide-react";

type Post = Database["public"]["Tables"]["blog_posts"]["Row"];

type Filter = "all" | "published" | "drafts";

const EASE = [0.76, 0, 0.24, 1] as const;

const EMPTY_FORM = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  author_name: "",
  published: false,
  cover_image: "",
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function formatDate(value: string | null) {
  if (!value) return "Not available";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "Not available";

  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

function StatCard({
  label,
  value,
  description,
  icon: Icon,
  accent,
}: {
  label: string;
  value: number;
  description: string;
  icon: typeof FileText;
  accent?: boolean;
}) {
  return (
    <div className="rounded-2xl border border-[#12312B]/[0.07] bg-white p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#12312B]/[0.04] sm:p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[1.3px] text-[#12312B]/45">
            {label}
          </p>
          <h3 className="mt-3 text-3xl font-semibold tracking-tight text-[#12312B]">
            {value.toLocaleString()}
          </h3>
          <p className="mt-1.5 text-xs text-[#12312B]/45">{description}</p>
        </div>

        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl ${
            accent
              ? "bg-[#E6A100]/10 text-[#B17B00]"
              : "bg-[#12312B]/[0.055] text-[#12312B]"
          }`}
        >
          <Icon size={19} />
        </div>
      </div>
    </div>
  );
}

export default function DashboardBlog() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [creating, setCreating] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);

  const [form, setForm] = useState(EMPTY_FORM);
  const [manualSlug, setManualSlug] = useState(false);
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [coverImagePreview, setCoverImagePreview] = useState<string | null>(null);

  const [saveError, setSaveError] = useState("");
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [actionError, setActionError] = useState("");

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const [deleteConfirm, setDeleteConfirm] = useState<Post | null>(null);

  const loadPosts = useCallback(async () => {
    setError("");

    const { data, error: err } = await supabase
      .from("blog_posts")
      .select("*")
      .order("created_at", { ascending: false });

    if (err) {
      setError(err.message);
    } else {
      setPosts(data ?? []);
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    let alive = true;

    const load = async () => {
      const { data, error: err } = await supabase
        .from("blog_posts")
        .select("*")
        .order("created_at", { ascending: false });

      if (!alive) return;

      if (err) {
        setError(err.message);
      } else {
        setPosts(data ?? []);
        setError("");
      }

      setLoading(false);
    };

    load();

    const channel = supabase
      .channel("dashboard-blog-posts")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "blog_posts" },
        () => {
          if (alive) load();
        }
      )
      .subscribe();

    return () => {
      alive = false;
      void supabase.removeChannel(channel);
    };
  }, []);

  const publishedCount = posts.filter((post) => post.published).length;
  const draftCount = posts.length - publishedCount;

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(search.toLowerCase()) ||
        post.slug.toLowerCase().includes(search.toLowerCase()) ||
        (post.author_name ?? "").toLowerCase().includes(search.toLowerCase());

      const matchesFilter =
        filter === "all" ||
        (filter === "published" && post.published) ||
        (filter === "drafts" && !post.published);

      return matchesSearch && matchesFilter;
    });
  }, [posts, search, filter]);

  const updateForm = (key: keyof typeof EMPTY_FORM, value: string | boolean) => {
    setForm((previous) => ({
      ...previous,
      [key]: value,
      ...(key === "title" && !manualSlug
        ? { slug: slugify(String(value)) }
        : {}),
    }));
  };

  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setSaveError("Please upload a valid image file.");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setSaveError("Image must be smaller than 2 MB.");
      return;
    }

    setCoverImage(file);
    setCoverImagePreview(URL.createObjectURL(file));
  };

  const removeCover = () => {
    setCoverImage(null);
    if (coverImagePreview) {
      URL.revokeObjectURL(coverImagePreview);
    }
    setCoverImagePreview(null);
  };

  const resetEditor = () => {
    setCreating(false);
    setEditingPost(null);
    setForm(EMPTY_FORM);
    setManualSlug(false);
    setCoverImage(null);
    setCoverImagePreview(null);
    setSaveError("");
  };

  const openCreate = () => {
    resetEditor();
    setCreating(true);
  };

  const openEdit = (post: Post) => {
    setCreating(false);
    setEditingPost(post);
    setManualSlug(true);

    setForm({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt ?? "",
      content: post.content ?? "",
      author_name: post.author_name ?? "",
      published: post.published ?? false,
      cover_image: post.cover_image ?? "",
    });

    setCoverImage(null);
    setCoverImagePreview(post.cover_image ?? null);

    setSaveError("");
  };

  const handleSave = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setSaveError("");

    const cleanTitle = form.title.trim();
    const cleanSlug = slugify(form.slug);

    if (!cleanTitle || !cleanSlug) {
      setSaveError("Please provide a valid title and URL slug.");
      return;
    }

    setSaving(true);

    try {
      let coverUrl = form.cover_image || undefined;

      if (coverImage) {
        const fileExt = coverImage.name.split(".").pop() ?? "jpg";
        const fileName = `${cleanSlug}-${Date.now()}.${fileExt}`;
        const filePath = `covers/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from("blog-covers")
          .upload(filePath, coverImage, {
            cacheControl: "3600",
            upsert: false,
            contentType: coverImage.type,
          });

        if (uploadError) throw uploadError;

        const { data: urlData } = supabase.storage
          .from("blog-covers")
          .getPublicUrl(filePath);

        coverUrl = urlData.publicUrl;
      }

      const payload = {
        title: cleanTitle,
        slug: cleanSlug,
        excerpt: form.excerpt.trim() || null,
        content: form.content.trim() || null,
        author_name: form.author_name.trim() || null,
        cover_image: coverUrl ?? null,
        published: form.published,
        published_at: form.published
          ? editingPost?.published && editingPost.published_at
            ? editingPost.published_at
            : new Date().toISOString()
          : null,
      };

      if (editingPost) {
        const { error: err } = await supabase
          .from("blog_posts")
          .update({
            ...payload,
            updated_at: new Date().toISOString(),
          })
          .eq("id", editingPost.id);

        if (err) throw err;
      } else {
        const { error: err } = await supabase
          .from("blog_posts")
          .insert(payload);

        if (err) throw err;
      }

      resetEditor();
      await loadPosts();
    } catch (err) {
      setSaveError(
        err instanceof Error ? err.message : "Unable to save this post."
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (post: Post) => {
    setDeletingId(post.id);
    setActionError("");

    try {
      const { error: err } = await supabase
        .from("blog_posts")
        .delete()
        .eq("id", post.id);

      if (err) throw err;

      setPosts((previous) =>
        previous.filter((item) => item.id !== post.id)
      );
      setDeleteConfirm(null);
    } catch (err) {
      setActionError(
        err instanceof Error ? err.message : "Unable to delete post."
      );
    } finally {
      setDeletingId(null);
    }
  };

  const togglePublish = async (post: Post) => {
    setActionError("");

    const nextStatus = !post.published;

    const { error: err } = await supabase
      .from("blog_posts")
      .update({
        published: nextStatus,
        published_at: nextStatus
          ? new Date().toISOString()
          : null,
        updated_at: new Date().toISOString(),
      })
      .eq("id", post.id);

    if (err) {
      setActionError(err.message);
      return;
    }

    await loadPosts();
  };

  const editorOpen = creating || !!editingPost;

  return (
    <div className="min-h-screen bg-[#F6F7F3] px-4 py-6 font-sans text-[#12312B] sm:px-6 sm:py-8 lg:px-8">

      <div className="mx-auto max-w-[1450px]">

        {/* Page heading */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end"
        >
          <div>
            <div className="mb-3 flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#E6A100]/10 text-[#B17B00]">
                <BookOpen size={15} />
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-[2px] text-[#12312B]/45">
                Content management
              </span>
            </div>

            <h1 className="text-3xl font-semibold tracking-[-1.3px] sm:text-[36px]">
              Blog & articles
            </h1>

            <p className="mt-2 max-w-xl text-sm leading-6 text-[#12312B]/50">
              Create, manage and publish stories, updates and insights for your audience.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => void loadPosts()}
              disabled={loading}
              className="flex h-11 items-center justify-center gap-2 rounded-xl border border-[#12312B]/10 bg-white px-4 text-xs font-semibold transition-colors hover:bg-[#12312B]/[0.04] disabled:opacity-50"
            >
              <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
              Refresh
            </button>

            <button
              onClick={openCreate}
              className="group flex h-11 items-center justify-center gap-2 rounded-xl bg-[#12312B] px-5 text-xs font-semibold text-[#E6A100] shadow-lg shadow-[#12312B]/10 transition-all hover:bg-[#19443A] hover:shadow-xl active:scale-[0.98]"
            >
              <Plus size={16} />
              New article
              <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>
        </motion.div>

        {/* Stats */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <StatCard
            label="Total articles"
            value={posts.length}
            description="All content in your library"
            icon={FileText}
          />
          <StatCard
            label="Published"
            value={publishedCount}
            description="Live and visible to readers"
            icon={Globe2}
            accent
          />
          <StatCard
            label="Drafts"
            value={draftCount}
            description="Saved but not yet published"
            icon={PenLine}
          />
        </div>

        {/* Editor */}
        <AnimatePresence>
          {editorOpen && (
            <motion.div
              initial={{ opacity: 0, y: 15, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: 10, height: 0 }}
              transition={{ duration: 0.35, ease: EASE }}
              className="mb-8 overflow-hidden"
            >
              <form
                onSubmit={handleSave}
                className="rounded-2xl border border-[#12312B]/[0.08] bg-white shadow-sm"
              >
                {/* Editor header */}
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#12312B]/[0.07] px-5 py-5 sm:px-7">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#12312B]/[0.06]">
                      {editingPost ? (
                        <Edit3 size={17} />
                      ) : (
                        <Sparkles size={17} />
                      )}
                    </div>
                    <div>
                      <h2 className="text-base font-semibold">
                        {editingPost ? "Edit article" : "Create new article"}
                      </h2>
                      <p className="mt-1 text-[11px] text-[#12312B]/45">
                        {editingPost
                          ? "Update your article details and content."
                          : "Add a new story to your publication."}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={resetEditor}
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-[#12312B]/50 transition-colors hover:bg-[#12312B]/[0.06] hover:text-[#12312B]"
                    aria-label="Close editor"
                  >
                    <X size={18} />
                  </button>
                </div>

                <div className="grid gap-8 p-5 sm:p-7 lg:grid-cols-[1fr_280px]">

                  {/* Main editor */}
                  <div className="space-y-6">
                    <div>
                      <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[1px] text-[#12312B]/60">
                        Article title <span className="text-red-500">*</span>
                      </label>
                      <input
                        required
                        maxLength={180}
                        value={form.title}
                        onChange={(e) => updateForm("title", e.target.value)}
                        placeholder="Give your article a meaningful title"
                        className="h-12 w-full rounded-xl border border-[#12312B]/10 bg-[#FAFBF9] px-4 text-sm font-medium outline-none transition-all placeholder:font-normal placeholder:text-[#12312B]/30 focus:border-[#12312B]/40 focus:bg-white focus:ring-4 focus:ring-[#12312B]/[0.035]"
                      />
                    </div>

                    {/* Cover image */}
                    <div>
                      <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[1px] text-[#12312B]/60">
                        Cover image
                      </label>

                      <div className="space-y-3">
                        {coverImagePreview ? (
                          <div className="relative group">
                            <img
                              src={coverImagePreview}
                              alt="Cover preview"
                              className="h-48 w-full rounded-xl object-cover border border-[#12312B]/10 bg-[#FAFBF9]"
                            />
                            <button
                              type="button"
                              onClick={removeCover}
                              className="absolute right-3 top-3 h-8 w-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center hover:bg-red-200 transition"
                              aria-label="Remove cover image"
                            >
                              <X size={14} />
                            </button>
                          </div>
                        ) : form.cover_image ? (
                          <div className="relative group">
                            <img
                              src={form.cover_image}
                              alt="Cover preview"
                              className="h-48 w-full rounded-xl object-cover border border-[#12312B]/10 bg-[#FAFBF9]"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                setForm({ ...form, cover_image: "" });
                                setCoverImagePreview(null);
                              }}
                              className="absolute right-3 top-3 h-8 w-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center hover:bg-red-200 transition"
                              aria-label="Remove cover image"
                            >
                              <X size={14} />
                            </button>
                          </div>
                        ) : (
                          <div className="aspect-video rounded-xl border-2 border-dashed border-[#12312B]/15 bg-[#FAFBF9] flex flex-col items-center justify-center gap-3 transition-all hover:border-[#12312B]/30 hover:bg-white">
                            <div className="flex flex-col items-center justify-center gap-1">
                              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#12312B]/10 bg-white">
                                <Image size={20} className="text-[#12312B]/45" />
                              </div>
                              <p className="text-[11px] font-medium text-[#12312B]">
                                Upload cover image
                              </p>
                              <p className="text-[10px] text-[#12312B]/40">
                                JPG, PNG or WebP · Max 2 MB
                              </p>
                            </div>
                            <input
                              type="file"
                              accept="image/jpeg,image/png,image/webp"
                              onChange={handleCoverChange}
                              className="sr-only"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                const input = document.querySelector(
                              'input[type="file"][accept="image/jpeg,image/png,image/webp"]'
                            ) as HTMLInputElement | null;
                                input?.click();
                              }}
                              className="flex h-10 items-center justify-center gap-2 rounded-lg border border-[#12312B]/10 bg-white px-4 text-xs font-semibold text-[#12312B] outline-none focus:border-[#12312B]/40 transition-all hover:bg-[#12312B]/[0.04]"
                            >
                              Choose image
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      <div className="mb-2 flex items-center justify-between gap-3">
                        <label className="text-[11px] font-semibold uppercase tracking-[1px] text-[#12312B]/60">
                          URL slug <span className="text-red-500">*</span>
                        </label>
                        <span className="text-[10px] text-[#12312B]/35">
                          Used in your article URL
                        </span>
                      </div>

                      <div className="flex h-12 items-center rounded-xl border border-[#12312B]/10 bg-[#FAFBF9] px-4 focus-within:border-[#12312B]/40">
                        <span className="mr-1 text-xs text-[#12312B]/35">
                          /
                        </span>
                        <input
                          required
                          value={form.slug}
                          onChange={(e) => {
                            setManualSlug(true);
                            updateForm("slug", e.target.value);
                          }}
                          placeholder="article-url"
                          className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-[#12312B]/30"
                        />
                      </div>
                    </div>

                    <div>
                      <div className="mb-2 flex items-center justify-between">
                        <label className="text-[11px] font-semibold uppercase tracking-[1px] text-[#12312B]/60">
                          Excerpt
                        </label>
                        <span className="text-[10px] text-[#12312B]/35">
                          {form.excerpt.length}/300
                        </span>
                      </div>
                      <textarea
                        rows={3}
                        maxLength={300}
                        value={form.excerpt}
                        onChange={(e) => updateForm("excerpt", e.target.value)}
                        placeholder="Write a short introduction that gives readers a reason to continue..."
                        className="w-full resize-y rounded-xl border border-[#12312B]/10 bg-[#FAFBF9] px-4 py-3 text-sm leading-6 outline-none transition-all placeholder:text-[#12312B]/30 focus:border-[#12312B]/40 focus:bg-white focus:ring-4 focus:ring-[#12312B]/[0.035]"
                      />
                    </div>

                    <div>
                      <div className="mb-2 flex items-center justify-between">
                        <label className="text-[11px] font-semibold uppercase tracking-[1px] text-[#12312B]/60">
                          Article content
                        </label>
                        <span className="text-[10px] text-[#12312B]/35">
                          {form.content.length.toLocaleString()} characters
                        </span>
                      </div>
                      <textarea
                        rows={12}
                        value={form.content}
                        onChange={(e) => updateForm("content", e.target.value)}
                        placeholder="Start writing your article here..."
                        className="w-full resize-y rounded-xl border border-[#12312B]/10 bg-[#FAFBF9] px-4 py-4 text-sm leading-7 outline-none transition-all placeholder:text-[#12312B]/30 focus:border-[#12312B]/40 focus:bg-white focus:ring-4 focus:ring-[#12312B]/[0.035]"
                      />
                      <p className="mt-2 text-[10px] text-[#12312B]/35">
                        Plain text is supported. Your public blog must render and sanitize any rich content separately.
                      </p>
                    </div>
                  </div>

                  {/* Sidebar settings */}
                  <aside className="space-y-5">
                    <div className="rounded-xl border border-[#12312B]/[0.07] bg-[#FAFBF9] p-4">
                      <h3 className="mb-4 text-xs font-semibold uppercase tracking-[1px]">
                        Publishing
                      </h3>

                      <button
                        type="button"
                        onClick={() => updateForm("published", !form.published)}
                        className="flex w-full items-center justify-between gap-3"
                      >
                        <div className="flex items-center gap-2.5 text-left">
                          <div
                            className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                              form.published
                                ? "bg-emerald-100 text-emerald-700"
                                : "bg-[#12312B]/[0.06] text-[#12312B]/55"
                            }`}
                          >
                            {form.published ? (
                              <Globe2 size={16} />
                            ) : (
                              <Clock3 size={16} />
                            )}
                          </div>
                          <div>
                            <p className="text-xs font-semibold">
                              {form.published ? "Published" : "Draft"}
                            </p>
                            <p className="mt-1 text-[10px] text-[#12312B]/45">
                              {form.published
                                ? "Visible to everyone"
                                : "Not publicly visible"}
                            </p>
                          </div>
                        </div>

                        <div
                          className={`relative h-6 w-11 rounded-full transition-colors ${
                            form.published ? "bg-[#12312B]" : "bg-[#12312B]/20"
                          }`}
                        >
                          <span
                            className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition-all ${
                              form.published ? "left-6" : "left-1"
                            }`}
                          />
                        </div>
                      </button>
                    </div>

                    <div className="rounded-xl border border-[#12312B]/[0.07] bg-[#FAFBF9] p-4">
                      <h3 className="mb-4 text-xs font-semibold uppercase tracking-[1px]">
                        Author details
                      </h3>

                      <label className="mb-2 block text-[10px] font-semibold uppercase tracking-wider text-[#12312B]/50">
                        Author name
                      </label>

                      <div className="relative">
                        <UserRound
                          size={15}
                          className="absolute left-3 top-1/2 -translate-y-1/2 text-[#12312B]/35"
                        />
                        <input
                          value={form.author_name}
                          onChange={(e) =>
                            updateForm("author_name", e.target.value)
                          }
                          placeholder="Author name"
                          className="h-10 w-full rounded-lg border border-[#12312B]/10 bg-white pl-9 pr-3 text-xs outline-none focus:border-[#12312B]/40"
                        />
                      </div>
                    </div>

                    <div className="rounded-xl border border-[#E6A100]/20 bg-[#E6A100]/[0.055] p-4">
                      <div className="flex items-center gap-2 text-[#A67500]">
                        <Sparkles size={15} />
                        <span className="text-[11px] font-semibold">
                          Publishing tip
                        </span>
                      </div>
                      <p className="mt-2 text-[11px] leading-5 text-[#12312B]/60">
                        Write a clear title and engaging excerpt. Review your article before making it publicly available.
                      </p>
                    </div>
                  </aside>
                </div>

                {/* Editor footer */}
                <div className="flex flex-col-reverse gap-3 border-t border-[#12312B]/[0.07] px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-7">
                  <AnimatePresence>
                    {saveError && (
                      <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-start gap-2 text-xs text-red-600"
                      >
                        <AlertCircle size={15} className="mt-0.5 shrink-0" />
                        <span>{saveError}</span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="flex flex-col-reverse gap-2 sm:ml-auto sm:flex-row">
                    <button
                      type="button"
                      onClick={resetEditor}
                      className="h-11 rounded-xl border border-[#12312B]/10 px-5 text-xs font-semibold transition-colors hover:bg-[#12312B]/[0.04]"
                    >
                      Cancel
                    </button>

                    <button
                      type="submit"
                      disabled={saving}
                      className="flex h-11 items-center justify-center gap-2 rounded-xl bg-[#12312B] px-6 text-xs font-semibold text-[#E6A100] transition-all hover:bg-[#19443A] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {saving ? (
                        <RefreshCw size={15} className="animate-spin" />
                      ) : (
                        <Save size={15} />
                      )}
                      {saving
                        ? "Saving..."
                        : editingPost
                          ? "Save changes"
                          : form.published
                            ? "Publish article"
                            : "Save as draft"}
                    </button>
                  </div>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Posts section */}
        <div className="overflow-hidden rounded-2xl border border-[#12312B]/[0.07] bg-white shadow-sm">

          {/* List heading */}
          <div className="border-b border-[#12312B]/[0.07] p-5 sm:p-6">
            <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
              <div>
                <div className="flex items-center gap-2">
                  <LayoutList size={17} className="text-[#12312B]/60" />
                  <h2 className="text-base font-semibold">
                    Your articles
                  </h2>
                  <span className="rounded-full bg-[#12312B]/[0.06] px-2.5 py-1 text-[10px] font-semibold text-[#12312B]/60">
                    {filteredPosts.length}
                  </span>
                </div>
                <p className="mt-1.5 text-xs text-[#12312B]/40">
                  Manage your content and publication status.
                </p>
              </div>

              <div className="relative w-full lg:max-w-[280px]">
                <Search
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#12312B]/35"
                />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search articles..."
                  className="h-11 w-full rounded-xl border border-[#12312B]/10 bg-[#FAFBF9] pl-10 pr-4 text-xs outline-none transition-all placeholder:text-[#12312B]/35 focus:border-[#12312B]/40 focus:bg-white"
                />
              </div>
            </div>

            {/* Filters */}
            <div className="mt-5 flex flex-wrap items-center gap-2">
              {(
                [
                  ["all", "All articles", posts.length],
                  ["published", "Published", publishedCount],
                  ["drafts", "Drafts", draftCount],
                ] as const
              ).map(([key, label, count]) => (
                <button
                  key={key}
                  onClick={() => setFilter(key)}
                  className={`flex items-center gap-2 rounded-lg px-3.5 py-2.5 text-[11px] font-semibold transition-all ${
                    filter === key
                      ? "bg-[#12312B] text-white shadow-sm"
                      : "bg-[#F6F7F3] text-[#12312B]/55 hover:bg-[#12312B]/[0.08] hover:text-[#12312B]"
                  }`}
                >
                  {label}
                  <span
                    className={`text-[10px] ${
                      filter === key ? "text-[#E6A100]" : "opacity-60"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Action error */}
          {actionError && (
            <div className="mx-5 mt-5 flex items-center gap-2 rounded-xl bg-red-50 p-3 text-xs text-red-700 sm:mx-6">
              <AlertCircle size={15} />
              {actionError}
            </div>
          )}

          {/* Loading */}
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#12312B]/10 border-t-[#12312B]" />
              <p className="mt-4 text-xs text-[#12312B]/45">
                Loading your articles...
              </p>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center px-5 py-16 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-500">
                <AlertCircle size={20} />
              </div>
              <h3 className="mt-4 text-sm font-semibold">
                Unable to load articles
              </h3>
              <p className="mt-2 max-w-md text-xs leading-5 text-[#12312B]/50">
                {error}
              </p>
              <button
                onClick={() => {
                  setLoading(true);
                  void loadPosts();
                }}
                className="mt-5 flex items-center gap-2 rounded-xl bg-[#12312B] px-5 py-3 text-xs font-semibold text-white"
              >
                <RefreshCw size={14} />
                Try again
              </button>
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="flex flex-col items-center justify-center px-5 py-20 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#12312B]/[0.05] text-[#12312B]/40">
                {search ? <Search size={24} /> : <BookOpen size={25} />}
              </div>

              <h3 className="mt-5 text-base font-semibold">
                {search || filter !== "all"
                  ? "No matching articles"
                  : "Your content library is empty"}
              </h3>

              <p className="mt-2 max-w-sm text-xs leading-6 text-[#12312B]/45">
                {search || filter !== "all"
                  ? "Try adjusting your search or selecting another filter."
                  : "Your first article is just a few clicks away. Start creating content for your audience."}
              </p>

              {!search && filter === "all" && (
                <button
                  onClick={openCreate}
                  className="mt-6 flex items-center gap-2 rounded-xl bg-[#12312B] px-5 py-3 text-xs font-semibold text-[#E6A100]"
                >
                  <Plus size={15} />
                  Create first article
                </button>
              )}
            </div>
          ) : (
            <>
              {/* Desktop table */}
              <div className="hidden overflow-x-auto md:block">
                <table className="w-full min-w-[780px] text-left">
                  <thead>
                    <tr className="border-b border-[#12312B]/[0.07] bg-[#FAFBF9]">
                      {["Article", "Author", "Status", "Created", "Actions"].map(
                        (heading) => (
                          <th
                            key={heading}
                            className="px-6 py-4 text-[10px] font-semibold uppercase tracking-[1.2px] text-[#12312B]/40"
                          >
                            {heading}
                          </th>
                        )
                      )}
                    </tr>
                  </thead>

                  <tbody>
                    {filteredPosts.map((post) => (
                      <tr
                        key={post.id}
                        className="border-b border-[#12312B]/[0.055] transition-colors last:border-0 hover:bg-[#FAFBF9]"
                      >
                        <td className="max-w-[360px] px-6 py-5">
                          <p className="truncate text-sm font-semibold text-[#12312B]">
                            {post.title}
                          </p>
                          <p className="mt-1 truncate font-mono text-[10px] text-[#12312B]/40">
                            /{post.slug}
                          </p>
                        </td>

                        <td className="px-6 py-5">
                          <div className="flex items-center gap-2">
                            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#12312B]/[0.06] text-[#12312B]/60">
                              <UserRound size={13} />
                            </div>
                            <span className="text-xs text-[#12312B]/65">
                              {post.author_name || "Unassigned"}
                            </span>
                          </div>
                        </td>

                        <td className="px-6 py-5">
                          <span
                            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[10px] font-semibold ${
                              post.published
                                ? "bg-emerald-50 text-emerald-700"
                                : "bg-amber-50 text-amber-700"
                            }`}
                          >
                            <span
                              className={`h-1.5 w-1.5 rounded-full ${
                                post.published
                                  ? "bg-emerald-500"
                                  : "bg-amber-500"
                              }`}
                            />
                            {post.published ? "Published" : "Draft"}
                          </span>
                        </td>

                        <td className="px-6 py-5">
                          <div className="flex items-center gap-2 text-xs text-[#12312B]/50">
                            <CalendarDays size={14} />
                            {formatDate(post.created_at)}
                          </div>
                        </td>

                        <td className="px-6 py-5">
                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => openEdit(post)}
                              title="Edit article"
                              className="flex h-9 w-9 items-center justify-center rounded-lg text-[#12312B]/55 transition-colors hover:bg-[#12312B]/[0.07] hover:text-[#12312B]"
                            >
                              <Edit3 size={15} />
                            </button>

                            <button
                              onClick={() => void togglePublish(post)}
                              title={post.published ? "Unpublish" : "Publish"}
                              className="flex h-9 w-9 items-center justify-center rounded-lg text-[#12312B]/55 transition-colors hover:bg-[#E6A100]/10 hover:text-[#9B6B00]"
                            >
                              {post.published ? (
                                <Eye size={15} />
                              ) : (
                                <Globe2 size={15} />
                              )}
                            </button>

                            <button
                              onClick={() => setDeleteConfirm(post)}
                              disabled={deletingId === post.id}
                              title="Delete article"
                              className="flex h-9 w-9 items-center justify-center rounded-lg text-red-400 transition-colors hover:bg-red-50 hover:text-red-600 disabled:opacity-40"
                            >
                              {deletingId === post.id ? (
                                <RefreshCw size={15} className="animate-spin" />
                              ) : (
                                <Trash2 size={15} />
                              )}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile article cards */}
              <div className="divide-y divide-[#12312B]/[0.07] md:hidden">
                {filteredPosts.map((post) => (
                  <div key={post.id} className="p-5 transition-colors hover:bg-[#FAFBF9]">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0 flex-1">
                        <h3 className="text-sm font-semibold leading-5 text-[#12312B]">
                          {post.title}
                        </h3>
                        <p className="mt-1.5 break-all font-mono text-[10px] text-[#12312B]/40">
                          /{post.slug}
                        </p>
                      </div>

                      <span
                        className={`shrink-0 rounded-full px-2.5 py-1 text-[9px] font-semibold ${
                          post.published
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-amber-50 text-amber-700"
                        }`}
                      >
                        {post.published ? "Published" : "Draft"}
                      </span>
                    </div>

                    {post.excerpt && (
                      <p className="mt-3 line-clamp-2 text-xs leading-5 text-[#12312B]/50">
                        {post.excerpt}
                      </p>
                    )}

                    <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-3 text-[10px] text-[#12312B]/45">
                        <span className="flex items-center gap-1.5">
                          <UserRound size={12} />
                          {post.author_name || "Unassigned"}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <CalendarDays size={12} />
                          {formatDate(post.created_at)}
                        </span>
                      </div>

                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => openEdit(post)}
                          className="flex h-9 w-9 items-center justify-center rounded-lg text-[#12312B]/60 hover:bg-[#12312B]/[0.06]"
                          aria-label="Edit article"
                        >
                          <Edit3 size={15} />
                        </button>

                        <button
                          onClick={() => void togglePublish(post)}
                          className="flex h-9 w-9 items-center justify-center rounded-lg text-[#12312B]/60 hover:bg-[#E6A100]/10"
                          aria-label={post.published ? "Unpublish" : "Publish"}
                        >
                          <Globe2 size={15} />
                        </button>

                        <button
                          onClick={() => setDeleteConfirm(post)}
                          disabled={deletingId === post.id}
                          className="flex h-9 w-9 items-center justify-center rounded-lg text-red-400 hover:bg-red-50 disabled:opacity-40"
                          aria-label="Delete article"
                        >
                          {deletingId === post.id ? (
                            <RefreshCw size={15} className="animate-spin" />
                          ) : (
                            <Trash2 size={15} />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Footer */}
          {!loading && !error && filteredPosts.length > 0 && (
            <div className="flex flex-col gap-2 border-t border-[#12312B]/[0.07] bg-[#FAFBF9] px-5 py-4 text-[10px] text-[#12312B]/40 sm:flex-row sm:items-center sm:justify-between sm:px-6">
              <span>
                Showing {filteredPosts.length} of {posts.length} articles
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                Content management active
              </span>
            </div>
          )}
        </div>

        {/* Delete confirmation modal */}
        {deleteConfirm && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#0b1310]/45 backdrop-blur-sm p-4"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) {
                setDeleteConfirm(null);
              }
            }}
          >
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby="delete-modal-title"
              className="w-full max-w-md rounded-2xl border border-[#12312B]/[0.07] bg-white shadow-2xl p-6 sm:p-8 animate-in fade-in slide-in-from-bottom-2 duration-300"
            >
              <div className="flex items-start justify-between gap-3 mb-4">
                <div>
                  <p
                    id="delete-modal-title"
                    className="text-lg font-semibold tracking-tight text-[#12312B]"
                  >
                    Delete article
                  </p>
                  <p className="mt-1 text-xs text-[#12312B]/50">
                    This cannot be undone.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setDeleteConfirm(null)}
                  aria-label="Close"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-[#12312B]/50 transition-colors hover:bg-[#12312B]/[0.06] hover:text-[#12312B]"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-red-600">
                  <AlertCircle size={18} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-[#12312B]">
                    Delete <span className="font-semibold">"{deleteConfirm.title}"</span>?
                  </p>
                  <p className="mt-1 text-[11px] text-[#12312B]/45">
                    All content and the cover image will be permanently removed.
                  </p>
                </div>
              </div>

              <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={() => setDeleteConfirm(null)}
                  disabled={deletingId === deleteConfirm.id}
                  className="flex h-11 items-center justify-center rounded-xl border border-[#12312B]/10 bg-white px-6 text-xs font-semibold text-[#12312B] transition-colors hover:bg-[#12312B]/[0.04] disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => void handleDelete(deleteConfirm)}
                  disabled={deletingId === deleteConfirm.id}
                  className="flex h-11 items-center justify-center gap-2 rounded-xl bg-[#12312B] px-6 text-xs font-semibold text-[#E6A100] shadow-lg shadow-[#12312B]/10 transition-all hover:bg-[#19443A] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {deletingId === deleteConfirm.id ? (
                    <RefreshCw size={14} className="animate-spin" />
                  ) : (
                    <Trash2 size={15} />
                  )}
                  <span>Delete article</span>
                </button>
              </div>
            </div>
          </div>
        )}

        <p className="mt-6 text-center text-[10px] text-[#12312B]/30">
          Saintgenevieve Administration · Content Management
        </p>
      </div>
    </div>
  );
}
