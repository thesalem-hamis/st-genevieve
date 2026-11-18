import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type FormEvent,
} from "react";
import { supabase } from "@/lib/supabase";
import type { Database } from "@/lib/database";
import { AnimatePresence, motion } from "framer-motion";
import {
  Plus,
  Search,
  FileText,
  Image,
  Edit3,
  Trash2,
  X,
  Clock3,
  ArrowUpRight,
  AlertCircle,
  RefreshCw,
  Globe2,
  Save,
  LayoutList,
  Sparkles,
  Image as ImageIcon,
  LayoutGrid,
  Tag,
  MapPin,
  DollarSign,
  Activity,
  Users,
  Quote,
  CheckCircle2,
} from "lucide-react";

type Project = Database["public"]["Tables"]["projects"]["Row"];
type ProjectImage = Database["public"]["Tables"]["project_images"]["Row"];
type ProjectTestimonial = Database["public"]["Tables"]["project_testimonials"]["Row"];

type Filter = "all" | "ongoing" | "completed";

const EASE = [0.76, 0, 0.24, 1] as const;

const EMPTY_FORM = {
  project_id: "",
  title: "",
  tags: "",
  summary: "",
  start_date: "",
  important_date: "",
  location: "",
  status: "Ongoing",
  amount: "",
  cover_image: "",
  description: "",
  problem: "",
  solution: "",
  outcome: "",
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function naira(kobo: number) {
  return `₦${(kobo / 100).toLocaleString("en-NG", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
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

export default function DashboardProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [editing, setEditing] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const [form, setForm] = useState(EMPTY_FORM);
  const [manualSlug, setManualSlug] = useState(false);

  /* image uploads */
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [coverImagePreview, setCoverImagePreview] = useState<string | null>(null);
  const [secondaryImages, setSecondaryImages] = useState<File[]>([]);
  const [secondaryImagePreviews, setSecondaryImagePreviews] = useState<string[]>([]);
  const [uploadingImages, setUploadingImages] = useState(false);

  /* testimonials */
  const [testimonials, setTestimonials] = useState<{
    name: string;
    role: string;
    content: string;
    image: File | null;
    preview: string | null;
  }[]>([]);

  const [saveError, setSaveError] = useState("");
  const [saveSuccess, setSaveSuccess] = useState("");
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [actionError, setActionError] = useState("");

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<Filter>("all");

  const [deleteConfirm, setDeleteConfirm] = useState<Project | null>(null);

  const generateProjectId = () => {
    const prefix = "SGF";
    const random = Math.floor(Math.random() * 900000 + 100000);
    return `${prefix}-${random}`;
  };

  const loadProjects = useCallback(async () => {
    setError("");
    const { data, error: err } = await supabase
      .from("projects")
      .select("*, project_images(*), project_testimonials(*)")
      .order("created_at", { ascending: false });

    if (err) {
      setError(err.message);
    } else {
      setProjects(data ?? []);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    let alive = true;
    const load = async () => {
      const { data, error: err } = await supabase
        .from("projects")
        .select("*, project_images(*), project_testimonials(*)")
        .order("created_at", { ascending: false });

      if (!alive) return;
      if (err) {
        setError(err.message);
      } else {
        setProjects(data ?? []);
        setError("");
      }
      setLoading(false);
    };

    const channel = supabase
      .channel("dashboard-projects")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "projects" },
        () => {
          if (alive) load();
        }
      )
      .subscribe();

    load();
    return () => {
      alive = false;
      void supabase.removeChannel(channel);
    };
  }, []);

  const ongoingCount = projects.filter((p) => p.status === "Ongoing").length;
  const completedCount = projects.length - ongoingCount;
  const totalAmount = projects.reduce(
    (sum, p) => sum + (p.amount ?? 0),
    0
  );

  const filteredProjects = useMemo(() => {
    return projects.filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(search.toLowerCase()) ||
        post.project_id.toLowerCase().includes(search.toLowerCase()) ||
        (post.location ?? "").toLowerCase().includes(search.toLowerCase());

      const matchesFilter =
        filter === "all" ||
        (filter === "ongoing" && post.status === "Ongoing") ||
        (filter === "completed" && post.status === "Completed");

      return matchesSearch && matchesFilter;
    });
  }, [projects, search, filter]);

  const updateForm = (key: keyof typeof EMPTY_FORM, value: string) => {
    setForm((previous) => ({
      ...previous,
      [key]: value,
      ...(key === "title" && !manualSlug
        ? { slug: slugify(String(value)) }
        : {}),
    }));
  };

  const resetEditor = () => {
    setEditing(false);
    setEditingProject(null);
    setForm(EMPTY_FORM);
    setManualSlug(false);
    setCoverImage(null);
    setCoverImagePreview(null);
    setSecondaryImages([]);
    setSecondaryImagePreviews([]);
    setTestimonials([]);
    setSaveError("");
  };

  const openCreate = () => {
    resetEditor();
    setForm({
      ...EMPTY_FORM,
      project_id: generateProjectId(),
      status: "Ongoing",
    });
    setEditing(true);
  };

  const openEdit = (project: Project) => {
    setEditing(false);
    setEditingProject(project);
    setManualSlug(true);

    setForm({
      project_id: project.project_id,
      title: project.title,
      tags: (project.tags ?? []).join(", "),
      summary: project.summary ?? "",
      start_date: project.start_date ?? "",
      important_date: project.important_date ?? "",
      location: project.location ?? "",
      status: project.status,
      amount: (project.amount ?? 0).toString(),
      cover_image: project.cover_image ?? "",
      description: project.description ?? "",
      problem: project.problem ?? "",
      solution: project.solution ?? "",
      outcome: project.outcome ?? "",
    });

    setCoverImage(null);
    setCoverImagePreview(project.cover_image ?? null);

    const existingImages: ProjectImage[] = (project as unknown as {
      project_images: ProjectImage[];
    }).project_images ?? [];
    setSecondaryImages([]);
    setSecondaryImagePreviews(
      existingImages.map((img) => img.image_url)
    );

    const existingTestimonials: ProjectTestimonial[] = (project as unknown as {
      project_testimonials: ProjectTestimonial[];
    }).project_testimonials ?? [];
    setTestimonials(
      existingTestimonials.map((t) => ({
        name: t.name,
        role: t.role ?? "",
        content: t.content,
        image: null,
        preview: t.image ?? null,
      }))
    );

    setSaveError("");
    setEditing(true);
  };

  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setSaveError("Please upload a valid image file.");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      setSaveError("Cover image must be smaller than 2 MB.");
      return;
    }
    setCoverImage(file);
    setCoverImagePreview(URL.createObjectURL(file));
  };

  const removeCover = () => {
    setCoverImage(null);
    if (coverImagePreview) URL.revokeObjectURL(coverImagePreview);
    setCoverImagePreview(null);
  };

  const handleSecondaryImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    const validFiles = files.filter((f) => f.type.startsWith("image/"));
    if (validFiles.length !== files.length) {
      setSaveError("Only image files are allowed for secondary images.");
      return;
    }
    const totalSize = validFiles.reduce((sum, f) => sum + f.size, 0);
    if (totalSize > 10 * 1024 * 1024) {
      setSaveError("Secondary images total must be under 10 MB.");
      return;
    }
    setSecondaryImages((prev) => [...prev, ...validFiles]);
    validFiles.forEach((f) => {
      setSecondaryImagePreviews((prev) => [...prev, URL.createObjectURL(f)]);
    });
  };

  const removeSecondaryImage = (index: number) => {
    setSecondaryImages((prev) => prev.filter((_, i) => i !== index));
    setSecondaryImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const addTestimonial = () => {
    setTestimonials([
      ...testimonials,
      { name: "", role: "", content: "", image: null, preview: null },
    ]);
  };

  const removeTestimonial = (index: number) => {
    setTestimonials(testimonials.filter((_, i) => i !== index));
  };

  const handleTestimonialImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const file = e.target.files?.[0] ?? null;
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setSaveError("Testimonial photo must be a valid image.");
      return;
    }
    setTestimonials((prev) =>
      prev.map((t, i) =>
        i === index ? { ...t, image: file, preview: URL.createObjectURL(file) } : t
      )
    );
  };

  const uploadToStorage = async (file: File, folder: string) => {
    const fileExt = file.name.split(".").pop() ?? "jpg";
    const fileName = `${folder}/${slugify(form.title)}-${Date.now()}.${fileExt}`;
    const { error: uploadError } = await supabase.storage
      .from("project-images")
      .upload(fileName, file, {
        cacheControl: "3600",
        upsert: false,
        contentType: file.type,
      });
    if (uploadError) throw uploadError;
    const { data: urlData } = supabase.storage
      .from("project-images")
      .getPublicUrl(fileName);
    return urlData.publicUrl;
  };

  const handleSave = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaveError("");

    const cleanTitle = form.title.trim();
    const cleanSlug = slugify(cleanTitle);
    const cleanProjectId = form.project_id.trim() || generateProjectId();

    if (!cleanTitle || !cleanSlug) {
      setSaveError("Please provide a valid title.");
      return;
    }

    setSaving(true);
    setUploadingImages(true);

    try {
      let coverUrl = form.cover_image || undefined;

      if (coverImage) {
        coverUrl = await uploadToStorage(coverImage, "covers");
      }

      const secondaryUrls: string[] = [];
      for (const file of secondaryImages) {
        const url = await uploadToStorage(file, "secondary");
        secondaryUrls.push(url);
      }

      const testimonialRecords: {
        name: string;
        role: string | null;
        content: string;
        image: string | null;
      }[] = [];

      for (const t of testimonials) {
        let testimonialImage = t.preview ?? undefined;
        if (t.image) {
          testimonialImage = await uploadToStorage(t.image, "testimonials");
        }
        testimonialRecords.push({
          name: t.name.trim(),
          role: t.role.trim() || null,
          content: t.content.trim(),
          image: testimonialImage ?? null,
        });
      }

      const payload = {
        project_id: cleanProjectId,
        title: cleanTitle,
        slug: cleanSlug,
        tags: form.tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
        summary: form.summary.trim() || null,
        start_date: form.start_date || null,
        important_date: form.important_date || null,
        location: form.location.trim() || null,
        status: form.status,
        amount: parseInt(form.amount, 10) || 0,
        cover_image: coverUrl ?? null,
        description: form.description.trim() || null,
        problem: form.problem.trim() || null,
        solution: form.solution.trim() || null,
        outcome: form.outcome.trim() || null,
        updated_at: new Date().toISOString(),
      };

      if (editingProject) {
        const { error: err } = await supabase
          .from("projects")
          .update(payload)
          .eq("id", editingProject.id);

        if (err) throw err;

        await supabase
          .from("project_images")
          .delete()
          .eq("project_id", editingProject.id);
        await supabase
          .from("project_testimonials")
          .delete()
          .eq("project_id", editingProject.id);

        const newProject = await supabase
          .from("projects")
          .select("id")
          .eq("project_id", cleanProjectId)
          .single();
        const projectId = newProject.data?.id;

        if (projectId && secondaryUrls.length > 0) {
          await supabase.from("project_images").insert(
            secondaryUrls.map((url) => ({
              project_id: projectId,
              image_url: url,
              caption: "",
            }))
          );
        }

        if (projectId && testimonialRecords.length > 0) {
          await supabase.from("project_testimonials").insert(
            testimonialRecords.map((t) => ({
              project_id: projectId,
              name: t.name,
              role: t.role,
              content: t.content,
              image: t.image,
            }))
          );
        }
      } else {
        const { data: inserted, error: err } = await supabase
          .from("projects")
          .insert({ ...payload, created_at: new Date().toISOString() })
          .select()
          .single();

        if (err) throw err;
        const projectId = inserted.id;

        if (secondaryUrls.length > 0) {
          await supabase.from("project_images").insert(
            secondaryUrls.map((url) => ({
              project_id: projectId,
              image_url: url,
              caption: "",
            }))
          );
        }

        if (testimonialRecords.length > 0) {
          await supabase.from("project_testimonials").insert(
            testimonialRecords.map((t) => ({
              project_id: projectId,
              name: t.name,
              role: t.role,
              content: t.content,
              image: t.image,
            }))
          );
        }
      }

      resetEditor();
      setSaveSuccess("Project published successfully.");
      setTimeout(() => setSaveSuccess(""), 4000);
      await loadProjects();
    } catch (err) {
      setSaveError(
        err instanceof Error ? err.message : "Unable to save project."
      );
    } finally {
      setSaving(false);
      setUploadingImages(false);
    }
  };

  const handleDelete = async (project: Project) => {
    setDeletingId(project.id);
    setActionError("");
    try {
      const { error: err } = await supabase
        .from("projects")
        .delete()
        .eq("id", project.id);
      if (err) throw err;
      setProjects((prev) => prev.filter((item) => item.id !== project.id));
      setDeleteConfirm(null);
    } catch (err) {
      setActionError(
        err instanceof Error ? err.message : "Unable to delete project."
      );
    } finally {
      setDeletingId(null);
    }
  };

  const toggleStatus = async (project: Project) => {
    setActionError("");
    const nextStatus = project.status === "Ongoing" ? "Completed" : "Ongoing";
    const { error: err } = await supabase
      .from("projects")
      .update({ status: nextStatus, updated_at: new Date().toISOString() })
      .eq("id", project.id);
    if (err) {
      setActionError(err.message);
      return;
    }
    await loadProjects();
  };

  const editorOpen = editing || !!editingProject;

  return (
    <div className="min-h-screen bg-[#F6F7F3] px-4 py-6 font-sans text-[#12312B] sm:px-6 sm:py-8 lg:px-8">
      <div className="mx-auto max-w-[1450px]">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end"
        >
          <div>
            <div className="mb-3 flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#E6A100]/10 text-[#B17B00]">
                <LayoutGrid size={15} />
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-[2px] text-[#12312B]/45">
                Program Management
              </span>
            </div>
            <h1 className="text-3xl font-semibold tracking-[-1.3px] sm:text-[36px]">
              Projects & Programs
            </h1>
            <p className="mt-2 max-w-xl text-sm leading-6 text-[#12312B]/50">
              Create, manage and track projects. Each project gets a unique
              Project ID for funding linkage.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => void loadProjects()}
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
              New project
              <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>
        </motion.div>

        <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          <StatCard
            label="Total projects"
            value={projects.length}
            description="All projects in library"
            icon={LayoutGrid}
          />
          <StatCard
            label="Ongoing"
            value={ongoingCount}
            description="Currently active"
            icon={Activity}
            accent
          />
          <StatCard
            label="Completed"
            value={completedCount}
            description="Finished projects"
            icon={CheckCircle2}
          />
          <StatCard
            label="Total funding"
            value={totalAmount / 100}
            description="Amount across all projects"
            icon={DollarSign}
          />
        </div>

        <AnimatePresence>
          {editorOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-[#0b1310]/45 backdrop-blur-sm p-4 sm:p-6"
              onMouseDown={(event) => {
                if (event.target === event.currentTarget) resetEditor();
              }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="w-full max-w-4xl rounded-2xl border border-[#12312B]/[0.08] bg-white shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto"
              >
                <form
                  onSubmit={handleSave}
                  className="space-y-6"
                >
                  <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#12312B]/[0.07] px-5 py-5 sm:px-7">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#12312B]/[0.06]">
                        {editingProject ? <Edit3 size={17} /> : <Sparkles size={17} />}
                      </div>
                      <div>
                        <h2 className="text-base font-semibold">
                          {editingProject ? "Edit project" : "Create new project"}
                        </h2>
                        <p className="mt-1 text-[11px] text-[#12312B]/45">
                          {editingProject
                            ? "Update project details and content."
                            : "Add a new project to your programs."}
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

                  <div className="grid gap-8 p-0 sm:p-0 lg:grid-cols-[1fr_280px]">
                    <div className="space-y-6">
                    <div>
                      <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[1px] text-[#12312B]/60">
                        Project ID <span className="text-red-500">*</span>
                      </label>
                      <div className="flex h-12 items-center rounded-xl border border-[#12312B]/10 bg-[#FAFBF9] px-4 focus-within:border-[#12312B]/40">
                        <span className="mr-1 text-xs text-[#12312B]/35">SGF-</span>
                        <input
                          required
                          maxLength={20}
                          value={form.project_id.replace(/^SGF-/, "")}
                          onChange={(e) =>
                            updateForm(
                              "project_id",
                              "SGF-" + e.target.value
                            )
                          }
                          placeholder="123456"
                          className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-[#12312B]/30"
                        />
                      </div>
                      <p className="mt-1 text-[10px] text-[#12312B]/35">
                        Unique ID used to track and link funding to this project.
                      </p>
                    </div>

                    <div>
                      <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[1px] text-[#12312B]/60">
                        Title <span className="text-red-500">*</span>
                      </label>
                      <input
                        required
                        maxLength={180}
                        value={form.title}
                        onChange={(e) => updateForm("title", e.target.value)}
                        placeholder="Give your project a meaningful title"
                        className="h-12 w-full rounded-xl border border-[#12312B]/10 bg-[#FAFBF9] px-4 text-sm font-medium outline-none transition-all placeholder:font-normal placeholder:text-[#12312B]/30 focus:border-[#12312B]/40 focus:bg-white focus:ring-4 focus:ring-[#12312B]/[0.035]"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[1px] text-[#12312B]/60">
                        Tags
                      </label>
                      <input
                        value={form.tags}
                        onChange={(e) => updateForm("tags", e.target.value)}
                        placeholder="education, healthcare, maternal"
                        className="h-12 w-full rounded-xl border border-[#12312B]/10 bg-[#FAFBF9] px-4 text-sm outline-none transition-all placeholder:text-[#12312B]/30 focus:border-[#12312B]/40 focus:bg-white focus:ring-4 focus:ring-[#12312B]/[0.035]"
                      />
                      <p className="mt-1 text-[10px] text-[#12312B]/35">
                        Comma-separated tags.
                      </p>
                    </div>

                    <div>
                      <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[1px] text-[#12312B]/60">
                        Short summary
                      </label>
                      <textarea
                        rows={3}
                        value={form.summary}
                        onChange={(e) => updateForm("summary", e.target.value)}
                        placeholder="Brief overview of the project..."
                        className="w-full resize-y rounded-xl border border-[#12312B]/10 bg-[#FAFBF9] px-4 py-3 text-sm leading-6 outline-none transition-all placeholder:text-[#12312B]/30 focus:border-[#12312B]/40 focus:bg-white focus:ring-4 focus:ring-[#12312B]/[0.035]"
                      />
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[1px] text-[#12312B]/60">
                          Start date
                        </label>
                        <input
                          type="date"
                          value={form.start_date}
                          onChange={(e) => updateForm("start_date", e.target.value)}
                          className="h-12 w-full rounded-xl border border-[#12312B]/10 bg-[#FAFBF9] px-4 text-sm outline-none transition-all focus:border-[#12312B]/40 focus:bg-white"
                        />
                      </div>
                      <div>
                        <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[1px] text-[#12312B]/60">
                          Important date
                        </label>
                        <input
                          type="date"
                          value={form.important_date}
                          onChange={(e) =>
                            updateForm("important_date", e.target.value)
                          }
                          className="h-12 w-full rounded-xl border border-[#12312B]/10 bg-[#FAFBF9] px-4 text-sm outline-none transition-all focus:border-[#12312B]/40 focus:bg-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[1px] text-[#12312B]/60">
                        Location
                      </label>
                      <input
                        value={form.location}
                        onChange={(e) => updateForm("location", e.target.value)}
                        placeholder="City, State / Country"
                        className="h-12 w-full rounded-xl border border-[#12312B]/10 bg-[#FAFBF9] px-4 text-sm outline-none transition-all placeholder:text-[#12312B]/30 focus:border-[#12312B]/40 focus:bg-white"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[1px] text-[#12312B]/60">
                        Status
                      </label>
                      <select
                        value={form.status}
                        onChange={(e) => updateForm("status", e.target.value)}
                        className="h-12 w-full rounded-xl border border-[#12312B]/10 bg-[#FAFBF9] px-4 text-sm outline-none transition-all focus:border-[#12312B]/40 focus:bg-white"
                      >
                        <option value="Ongoing">Ongoing</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </div>

                    <div>
                      <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[1px] text-[#12312B]/60">
                        Amount
                      </label>
                      <div className="flex h-12 items-center rounded-xl border border-[#12312B]/10 bg-[#FAFBF9] px-4 focus-within:border-[#12312B]/40">
                        <span className="mr-1 text-xs text-[#12312B]/35">₦</span>
                        <input
                          type="number"
                          value={form.amount}
                          onChange={(e) => updateForm("amount", e.target.value)}
                          placeholder="0"
                          className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-[#12312B]/30"
                        />
                      </div>
                      <p className="mt-1 text-[10px] text-[#12312B]/35">
                        Project funding amount.
                      </p>
                    </div>

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
                      <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[1px] text-[#12312B]/60">
                        Secondary images
                      </label>
                      <div className="space-y-3">
                        {secondaryImagePreviews.length > 0 ? (
                          <div className="grid gap-3">
                            {secondaryImagePreviews.map((preview, i) => (
                              <div
                                key={i}
                                className="relative group"
                              >
                                <img
                                  src={preview}
                                  alt={`Secondary ${i + 1}`}
                                  className="h-32 w-32 rounded-xl object-cover border border-[#12312B]/10 bg-[#FAFBF9]"
                                />
                                <button
                                  type="button"
                                  onClick={() => removeSecondaryImage(i)}
                                  className="absolute right-1 top-1 h-7 w-7 rounded-full bg-red-100 text-red-600 flex items-center justify-center hover:bg-red-200 transition"
                                  aria-label="Remove image"
                                >
                                  <X size={12} />
                                </button>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="h-32 w-full rounded-xl border-2 border-dashed border-[#12312B]/15 bg-[#FAFBF9] flex flex-col items-center justify-center gap-3 transition-all hover:border-[#12312B]/30 hover:bg-white">
                            <ImageIcon size={20} className="text-[#12312B]/45" />
                            <p className="text-[11px] font-medium text-[#12312B]">
                              Upload secondary images
                            </p>
                            <p className="text-[10px] text-[#12312B]/40">
                              JPG, PNG or WebP · Max 10 MB total
                            </p>
                          </div>
                        )}
                        <input
                          type="file"
                          accept="image/jpeg,image/png,image/webp"
                          multiple
                          onChange={handleSecondaryImagesChange}
                          className="sr-only"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const input = document.querySelector(
                              'input[type="file"][accept="image/jpeg,image/png,image/webp"][multiple]'
                            ) as HTMLInputElement | null;
                            input?.click();
                          }}
                          className="flex h-10 items-center justify-center gap-2 rounded-lg border border-[#12312B]/10 bg-white px-4 text-xs font-semibold text-[#12312B] outline-none focus:border-[#12312B]/40 transition-all hover:bg-[#12312B]/[0.04]"
                        >
                          <ImageIcon size={16} /> Add more images
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[1px] text-[#12312B]/60">
                        Description and details
                      </label>
                      <textarea
                        rows={10}
                        value={form.description}
                        onChange={(e) => updateForm("description", e.target.value)}
                        placeholder="Full description of the project..."
                        className="w-full resize-y rounded-xl border border-[#12312B]/10 bg-[#FAFBF9] px-4 py-4 text-sm leading-7 outline-none transition-all placeholder:text-[#12312B]/30 focus:border-[#12312B]/40 focus:bg-white focus:ring-4 focus:ring-[#12312B]/[0.035]"
                      />
                    </div>

                    <div className="grid gap-4 sm:grid-cols-3">
                      <div>
                        <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[1px] text-[#12312B]/60">
                          Problem
                        </label>
                        <textarea
                          rows={4}
                          value={form.problem}
                          onChange={(e) => updateForm("problem", e.target.value)}
                          placeholder="What problem does this project solve?"
                          className="w-full resize-y rounded-xl border border-[#12312B]/10 bg-[#FAFBF9] px-4 py-3 text-sm leading-6 outline-none transition-all placeholder:text-[#12312B]/30 focus:border-[#12312B]/40 focus:bg-white"
                        />
                      </div>
                      <div>
                        <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[1px] text-[#12312B]/60">
                          Solution
                        </label>
                        <textarea
                          rows={4}
                          value={form.solution}
                          onChange={(e) => updateForm("solution", e.target.value)}
                          placeholder="How does the project solve it?"
                          className="w-full resize-y rounded-xl border border-[#12312B]/10 bg-[#FAFBF9] px-4 py-3 text-sm leading-6 outline-none transition-all placeholder:text-[#12312B]/30 focus:border-[#12312B]/40 focus:bg-white"
                        />
                      </div>
                      <div>
                        <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[1px] text-[#12312B]/60">
                          Outcome
                        </label>
                        <textarea
                          rows={4}
                          value={form.outcome}
                          onChange={(e) => updateForm("outcome", e.target.value)}
                          placeholder="What is the expected or achieved outcome?"
                          className="w-full resize-y rounded-xl border border-[#12312B]/10 bg-[#FAFBF9] px-4 py-3 text-sm leading-6 outline-none transition-all placeholder:text-[#12312B]/30 focus:border-[#12312B]/40 focus:bg-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[1px] text-[#12312B]/60">
                        Testimonials
                      </label>
                      <div className="space-y-3">
                        {testimonials.length > 0 ? (
                          testimonials.map((t, i) => (
                            <div
                              key={i}
                              className="relative flex gap-3 p-4 rounded-xl border border-[#12312B]/10 bg-[#FAFBF9]"
                            >
                              <div className="relative shrink-0">
                                {t.preview ? (
                                  <img
                                    src={t.preview}
                                    alt="Testimonial"
                                    className="h-12 w-12 rounded-full object-cover border border-[#12312B]/20"
                                  />
                                ) : (
                                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#12312B]/[0.06] text-[#12312B]">
                                    <Users size={16} />
                                  </div>
                                )}
                                <button
                                  type="button"
                                  onClick={() => removeTestimonial(i)}
                                  className="absolute -right-1 -top-1 h-6 w-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center hover:bg-red-200 transition"
                                  aria-label="Remove testimonial"
                                >
                                  <X size={12} />
                                </button>
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="grid gap-2 sm:grid-cols-2">
                                  <input
                                    value={t.name}
                                    onChange={(e) =>
                                      setTestimonials((prev) =>
                                        prev.map((x, j) =>
                                          j === i
                                            ? { ...x, name: e.target.value }
                                            : x
                                        )
                                      )
                                    }
                                    placeholder="Name"
                                    className="h-9 rounded-lg border border-[#12312B]/10 bg-white px-3 text-xs outline-none focus:border-[#12312B]/40"
                                  />
                                  <input
                                    value={t.role}
                                    onChange={(e) =>
                                      setTestimonials((prev) =>
                                        prev.map((x, j) =>
                                          j === i
                                            ? { ...x, role: e.target.value }
                                            : x
                                        )
                                      )
                                    }
                                    placeholder="Role"
                                    className="h-9 rounded-lg border border-[#12312B]/10 bg-white px-3 text-xs outline-none focus:border-[#12312B]/40"
                                  />
                                </div>
                                <textarea
                                  value={t.content}
                                  onChange={(e) =>
                                    setTestimonials((prev) =>
                                      prev.map((x, j) =>
                                        j === i
                                          ? { ...x, content: e.target.value }
                                          : x
                                      )
                                    )
                                  }
                                  rows={2}
                                    placeholder="Testimonial content..."
                                    className="w-full resize-y rounded-lg border border-[#12312B]/10 bg-white px-3 py-2 text-xs outline-none focus:border-[#12312B]/40"
                                  />
                                </div>
                                <div className="mt-2 flex items-center gap-2">
                                  <input
                                    type="file"
                                    accept="image/jpeg,image/png,image/webp"
                                    onChange={(e) =>
                                      handleTestimonialImageChange(e, i)
                                    }
                                    className="sr-only"
                                  />
                                  <button
                                    type="button"
                                    onClick={() => {
                                      const input = document.querySelector(
                                        `input[type="file"]:nth-of-type(${i + 1})`
                                      ) as HTMLInputElement | null;
                                      input?.click();
                                    }}
                                    className="flex h-8 items-center justify-center gap-1.5 rounded-lg border border-[#12312B]/10 bg-white px-2.5 text-[10px] font-semibold text-[#12312B] outline-none focus:border-[#12312B]/40 transition-all hover:bg-[#12312B]/[0.04]"
                                  >
                                    <ImageIcon size={13} />
                                    Change photo
                                  </button>
                                </div>
                          </div>
                        ))
                      ) : (
                          <div className="h-32 w-full rounded-xl border-2 border-dashed border-[#12312B]/15 bg-[#FAFBF9] flex flex-col items-center justify-center gap-3 transition-all hover:border-[#12312B]/30 hover:bg-white">
                            <Quote size={20} className="text-[#12312B]/45" />
                            <p className="text-[11px] font-medium text-[#12312B]">
                              Add testimonials
                            </p>
                            <p className="text-[10px] text-[#12312B]/40">
                              Optional beneficiary or partner quotes
                            </p>
                          </div>
                        )}
                        <button
                          type="button"
                          onClick={addTestimonial}
                          className="flex h-10 items-center justify-center gap-2 rounded-lg border border-[#12312B]/10 bg-white px-4 text-xs font-semibold text-[#12312B] outline-none focus:border-[#12312B]/40 transition-all hover:bg-[#12312B]/[0.04]"
                        >
                          <Quote size={16} /> Add testimonial
                        </button>
                      </div>
                    </div>
                  </div>

                  <aside className="space-y-5">
                    <div className="rounded-xl border border-[#12312B]/[0.07] bg-[#FAFBF9] p-4">
                      <h3 className="mb-4 text-xs font-semibold uppercase tracking-[1px]">
                        Publishing
                      </h3>
                      <button
                        type="button"
                        onClick={() => updateForm("status", form.status === "Ongoing" ? "Completed" : "Ongoing")}
                        className="flex w-full items-center justify-between gap-3"
                      >
                        <div className="flex items-center gap-2.5 text-left">
                          <div
                            className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                              form.status === "Ongoing"
                                ? "bg-emerald-100 text-emerald-700"
                                : "bg-[#12312B]/[0.06] text-[#12312B]/55"
                            }`}
                          >
                            {form.status === "Ongoing" ? (
                              <Globe2 size={16} />
                            ) : (
                              <Clock3 size={16} />
                            )}
                          </div>
                          <div>
                            <p className="text-xs font-semibold">
                              {form.status === "Ongoing" ? "Ongoing" : "Completed"}
                            </p>
                            <p className="mt-1 text-[10px] text-[#12312B]/45">
                              {form.status === "Ongoing"
                                ? "Currently active"
                                : "Project finished"}
                            </p>
                          </div>
                        </div>
                        <div
                          className={`relative h-6 w-11 rounded-full transition-colors ${
                            form.status === "Ongoing"
                              ? "bg-[#12312B]"
                              : "bg-[#12312B]/20"
                          }`}
                        >
                          <span
                            className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition-all ${
                              form.status === "Ongoing" ? "left-6" : "left-1"
                            }`}
                          />
                        </div>
                      </button>
                    </div>

                    <div className="rounded-xl border border-[#E6A100]/20 bg-[#E6A100]/[0.055] p-4">
                      <div className="flex items-center gap-2 text-[#A67500]">
                        <Sparkles size={15} />
                        <span className="text-[11px] font-semibold">
                          Project ID tip
                        </span>
                      </div>
                      <p className="mt-2 text-[11px] leading-5 text-[#12312B]/60">
                        The Project ID (e.g. SGF-123456) is used to track and
                        link funding to this specific project. Share it with
                        donors for transparent reporting.
                      </p>
                    </div>
                  </aside>
                </div>

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
                    {saveSuccess && (
                      <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 5 }}
                        className="flex items-start gap-2 text-xs text-emerald-600"
                      >
                        <CheckCircle2 size={15} className="mt-0.5 shrink-0" />
                        <span>{saveSuccess}</span>
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
                      disabled={saving || uploadingImages}
                      className="flex-1 rounded-xl bg-[#12312B] px-6 text-xs font-semibold text-[#E6A100] shadow-lg shadow-[#12312B]/10 transition-all disabled:opacity-70 active:scale-[0.98]"
                    >
                      {saving || uploadingImages ? (
                        <>
                          <RefreshCw size={14} className="animate-spin" />
                          Saving…
                        </>
                      ) : editingProject ? (
                        <>
                          <Save size={15} />
                          Save changes
                        </>
                      ) : (
                        <>
                          <Save size={15} />
                          Create project
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="overflow-hidden rounded-2xl border border-[#12312B]/[0.07] bg-white shadow-sm">
          <div className="border-b border-[#12312B]/[0.07] p-5 sm:p-6">
            <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
              <div>
                <div className="flex items-center gap-2">
                  <LayoutList size={17} className="text-[#12312B]/60" />
                  <h2 className="text-base font-semibold">
                    Your projects
                  </h2>
                  <span className="rounded-full bg-[#12312B]/[0.06] px-2.5 py-1 text-[10px] font-semibold text-[#12312B]/60">
                    {filteredProjects.length}
                  </span>
                </div>
                <p className="mt-1.5 text-xs text-[#12312B]/40">
                  Manage your projects and publication status.
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
                  placeholder="Search projects..."
                  className="h-11 w-full rounded-xl border border-[#12312B]/10 bg-[#FAFBF9] pl-10 pr-4 text-xs outline-none transition-all placeholder:text-[#12312B]/35 focus:border-[#12312B]/40 focus:bg-white"
                />
              </div>
            </div>
            <div className="mt-5 flex flex-wrap items-center gap-2">
              {(
                [
                  ["all", "All", projects.length],
                  ["ongoing", "Ongoing", ongoingCount],
                  ["completed", "Completed", completedCount],
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

          {actionError && (
            <div className="mx-5 mt-5 flex items-center gap-2 rounded-xl bg-red-50 p-3 text-xs text-red-700 sm:mx-6">
              <AlertCircle size={15} />
              {actionError}
            </div>
          )}

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#12312B]/10 border-t-[#12312B]" />
              <p className="mt-4 text-xs text-[#12312B]/45">
                Loading your projects…
              </p>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center px-5 py-16 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-500">
                <AlertCircle size={20} />
              </div>
              <h3 className="mt-4 text-sm font-semibold">
                Unable to load projects
              </h3>
              <p className="mt-2 max-w-md text-xs leading-5 text-[#12312B]/50">
                {error}
              </p>
              <button
                onClick={() => {
                  setLoading(true);
                  void loadProjects();
                }}
                className="mt-5 flex items-center gap-2 rounded-xl bg-[#12312B] px-5 py-3 text-xs font-semibold text-white"
              >
                <RefreshCw size={14} />
                Try again
              </button>
            </div>
          ) : filteredProjects.length === 0 ? (
            <div className="flex flex-col items-center justify-center px-5 py-20 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#12312B]/[0.05] text-[#12312B]/40">
                {search ? <Search size={24} /> : <LayoutGrid size={25} />}
              </div>
              <h3 className="mt-5 text-base font-semibold">
                {search || filter !== "all"
                  ? "No matching projects"
                  : "Your project library is empty"}
              </h3>
              <p className="mt-2 max-w-sm text-xs leading-6 text-[#12312B]/45">
                {search || filter !== "all"
                  ? "Try adjusting your search or selecting another filter."
                  : "Your first project is just a few clicks away. Start creating content for your programs."}
              </p>
              {!search && filter === "all" && (
                <button
                  onClick={openCreate}
                  className="mt-6 flex items-center gap-2 rounded-xl bg-[#12312B] px-5 py-3 text-xs font-semibold text-[#E6A100]"
                >
                  <Plus size={15} />
                  Create first project
                </button>
              )}
            </div>
          ) : (
            <>
              <div className="hidden overflow-x-auto md:block">
                <table className="w-full min-w-[780px] text-left">
                  <thead>
                    <tr className="border-b border-[#12312B]/[0.07] bg-[#FAFBF9]">
                      {[
                        "Project ID",
                        "Title",
                        "Status",
                        "Amount",
                        "Location",
                        "Actions",
                      ].map((heading) => (
                        <th
                          key={heading}
                          className="px-6 py-4 text-[10px] font-semibold uppercase tracking-[1.2px] text-[#12312B]/40"
                        >
                          {heading}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProjects.map((project) => (
                      <tr
                        key={project.id}
                        className="border-b border-[#12312B]/[0.055] transition-colors last:border-0 hover:bg-[#FAFBF9]"
                      >
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-2">
                            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#12312B]/[0.06] text-[#12312B]/60">
                              <Tag size={13} />
                            </div>
                            <p className="text-xs font-mono font-medium text-[#12312B]">
                              {project.project_id}
                            </p>
                          </div>
                        </td>
                        <td className="max-w-[360px] px-6 py-5">
                          <p className="truncate text-sm font-semibold text-[#12312B]">
                            {project.title}
                          </p>
                          {project.summary && (
                            <p className="mt-1 truncate font-mono text-[10px] text-[#12312B]/40">
                              {project.summary}
                            </p>
                          )}
                        </td>
                        <td className="px-6 py-5">
                          <span
                            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[10px] font-semibold ${
                              project.status === "Ongoing"
                                ? "bg-emerald-50 text-emerald-700"
                                : "bg-amber-50 text-amber-700"
                            }`}
                          >
                            <span
                              className={`h-1.5 w-1.5 rounded-full ${
                                project.status === "Ongoing"
                                  ? "bg-emerald-500"
                                  : "bg-amber-500"
                              }`}
                            />
                            {project.status}
                          </span>
                        </td>
                        <td className="px-6 py-5">
                          <p className="text-sm font-medium text-[#12312B] tabular-nums">
                            {naira(project.amount)}
                          </p>
                        </td>
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-2 text-xs text-[#12312B]/50">
                            <MapPin size={14} />
                            {project.location || "—"}
                          </div>
                        </td>
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => openEdit(project)}
                              title="Edit project"
                              className="flex h-9 w-9 items-center justify-center rounded-lg text-[#12312B]/55 transition-colors hover:bg-[#12312B]/[0.07] hover:text-[#12312B]"
                            >
                              <Edit3 size={15} />
                            </button>
                            <button
                              onClick={() => toggleStatus(project)}
                              title={
                                project.status === "Ongoing"
                                  ? "Mark as completed"
                                  : "Mark as ongoing"
                              }
                              className="flex h-9 w-9 items-center justify-center rounded-lg text-[#12312B]/55 transition-colors hover:bg-[#E6A100]/10 hover:text-[#9B6B00]"
                            >
                              {project.status === "Ongoing" ? (
                                <Clock3 size={15} />
                              ) : (
                                <Globe2 size={15} />
                              )}
                            </button>
                            <button
                              onClick={() => setDeleteConfirm(project)}
                              disabled={deletingId === project.id}
                              title="Delete project"
                              className="flex h-9 w-9 items-center justify-center rounded-lg text-red-400 transition-colors hover:bg-red-50 hover:text-red-600 disabled:opacity-40"
                            >
                              {deletingId === project.id ? (
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

              <div className="divide-y divide-[#12312B]/[0.07] md:hidden">
                {filteredProjects.map((project) => (
                  <div
                    key={project.id}
                    className="p-5 transition-colors hover:bg-[#FAFBF9]"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono font-medium text-[#12312B]">
                            {project.project_id}
                          </span>
                          <span
                            className={`shrink-0 rounded-full px-2 py-0.5 text-[9px] font-semibold ${
                              project.status === "Ongoing"
                                ? "bg-emerald-50 text-emerald-700"
                                : "bg-amber-50 text-amber-700"
                            }`}
                          >
                            {project.status}
                          </span>
                        </div>
                        <h3 className="mt-1 text-sm font-semibold leading-5 text-[#12312B]">
                          {project.title}
                        </h3>
                        <p className="mt-1 break-all font-mono text-[10px] text-[#12312B]/40">
                          {project.summary || "/no summary"}
                        </p>
                        <div className="mt-3 flex flex-wrap items-center gap-3 text-[10px] text-[#12312B]/45">
                          <span className="flex items-center gap-1.5">
                            <DollarSign size={12} />
                            {naira(project.amount)}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <MapPin size={12} />
                            {project.location || "Not set"}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => openEdit(project)}
                          className="flex h-9 w-9 items-center justify-center rounded-lg text-[#12312B]/60 hover:bg-[#12312B]/[0.06]"
                          aria-label="Edit project"
                        >
                          <Edit3 size={15} />
                        </button>
                        <button
                          onClick={() => toggleStatus(project)}
                          className="flex h-9 w-9 items-center justify-center rounded-lg text-[#12312B]/60 hover:bg-[#E6A100]/10"
                          aria-label={project.status === "Ongoing" ? "Complete" : "Reopen"}
                        >
                          {project.status === "Ongoing" ? (
                            <Clock3 size={15} />
                          ) : (
                            <Globe2 size={15} />
                          )}
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(project)}
                          disabled={deletingId === project.id}
                          className="flex h-9 w-9 items-center justify-center rounded-lg text-red-400 hover:bg-red-50 disabled:opacity-40"
                          aria-label="Delete project"
                        >
                          {deletingId === project.id ? (
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

              <div className="flex flex-col gap-2 border-t border-[#12312B]/[0.07] bg-[#FAFBF9] px-5 py-4 text-[10px] text-[#12312B]/40 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                <span>
                  Showing {filteredProjects.length} of {projects.length} projects
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  Program management active
                </span>
              </div>
            </>
          )}
        </div>

        <AnimatePresence>
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
                    <p id="delete-modal-title" className="text-lg font-semibold tracking-tight text-[#12312B]">
                      Delete project
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
                      All content, images and testimonials will be permanently removed.
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
                    <span>Delete project</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
