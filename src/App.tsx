import { useState, useEffect } from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";

// --- Layouts ---
import MainLayout from "@/layouts/MainLayout";
import DashboardLayout from "@/pages/dashboard/DashboardLayout";


// --- Public NGO Pages ---
import HomePage from "@/pages/HomePage";
import AboutPage from "@/pages/AboutPage";
import ProgramsPage from "@/pages/ProgramsPage";
import ProgramDetailPage from "@/pages/ProgramsDetailsPage";
import DonatePage from "@/pages/DonatePage";
import VolunteerPage from "@/pages/VolunteerPage";
import ContactPage from "@/pages/ContactPage";
import BlogPage from "@/pages/BlogPage";
import BlogPostPage from "@/pages/BlogPostPage";
import NotFound from "@/pages/NotFound";
import OurWorkPage from "@/pages/OurWorkPage";

// --- Dashboard Pages ---
import DashboardOverview from "@/pages/dashboard/DashboardOverview";
import DashboardLogin from "@/pages/dashboard/DashboardLogin";
import DashboardDonations from "@/pages/dashboard/DashboardDonation";
import DashboardVolunteers from "@/pages/dashboard/DashboardVolunteers";
import DashboardPrograms from "@/pages/dashboard/DashboardProjects";
import DashboardBlog from "@/pages/dashboard/DashboardBlog";
import DashboardContacts from "@/pages/dashboard/DashboardContacts";
import ImpactPage from "./pages/ImpactPage";

// --- Real Supabase Auth ---
import { AuthProvider, useAuth } from "@/lib/auth";

// Loading Spinner
function LoadingScreen() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <Loader2 className="h-6 w-6 animate-spin text-[#12312B]" />
    </div>
  );
}

// Protected Route Guard
function RequireAuth() {
  const { session, loading } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (!session) {
      setChecking(false);
      return;
    }

    const checkAdmin = async () => {
      const { data } = await supabase
        .from("admins")
        .select("user_id")
        .eq("user_id", session.user.id)
        .single();
      setIsAdmin(!!data);
      setChecking(false);
    };

    checkAdmin();
  }, [session]);

  if (loading || checking) return <LoadingScreen />;
  if (!session) return <Navigate to="/dashboard/login" replace />;
  if (!isAdmin) return <div className="p-10 font-sans text-[#12312B] text-center">
    <h1 className="text-2xl font-semibold">Access denied</h1>
    <p className="mt-3 text-[#12312B]/60">Your account is not authorized to access the administration portal.</p>
  </div>;
  return <Outlet />;
}

// Anonymous Route Guard (Redirects away from login if already logged in)
function RequireAnon() {
  const { session, loading } = useAuth();
  if (loading) return <LoadingScreen />;
  if (session) return <Navigate to="/dashboard" replace />;
  return <Outlet />;
}

// ==========================================
// MAIN APP ROUTES
// ==========================================

export default function AppRoutes() {
  return (
    <AuthProvider>
      <Routes>
        {/* --- Protected Admin Dashboard Routes --- */}
        <Route
          path="/dashboard"
          element={
            <RequireAuth />
          }
        >
          <Route element={<DashboardLayout />}>
            <Route index element={<DashboardOverview />} />
            <Route path="donations" element={<DashboardDonations />} />
            <Route path="volunteers" element={<DashboardVolunteers />} />
            <Route path="programs" element={<DashboardPrograms />} />
            <Route path="blog" element={<DashboardBlog />} />
            <Route path="contacts" element={<DashboardContacts />} />
          </Route>
        </Route>

        {/* --- Dashboard Login Route --- */}
        <Route
          path="/dashboard/login"
          element={
            <RequireAnon />
          }
        >
          <Route index element={<DashboardLogin />} />
        </Route>

        {/* --- /admin alias -> /dashboard --- */}
        <Route path="/admin" element={<Navigate to="/dashboard" replace />} />

        {/* --- Public Foundation Web Pages --- */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="impact" element={<ImpactPage />} />
          <Route path="projects" element={<ProgramsPage />} />
          <Route path="projects/:slug" element={<ProgramDetailPage />} />
          <Route path="donate" element={<DonatePage />} />
          <Route path="volunteer" element={<VolunteerPage />} />
          <Route path="blog" element={<BlogPage />} />
          <Route path="blog/:slug" element={<BlogPostPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="/our-work" element={<OurWorkPage />} />
          <Route path="/projects" element={<Navigate to="/our-work" replace />} />
          <Route path="/impact" element={<Navigate to="/our-work" replace />} />
        </Route>

        {/* --- 404 Fallback --- */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthProvider>
  );
}
