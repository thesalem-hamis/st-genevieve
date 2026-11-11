import { useState, createContext, useContext } from "react";
import type { ReactNode } from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { Loader2 } from "lucide-react";

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

// --- Dashboard Pages ---
import DashboardOverview from "@/pages/dashboard/DashboardOverview";
import DashboardLogin from "@/pages/dashboard/DashboardLogin";
import DashboardDonations from "@/pages/dashboard/DashboardDonation";
import DashboardVolunteers from "@/pages/dashboard/DashboardVolunteers";
import DashboardPrograms from "@/pages/dashboard/DashboardPrograms";
import DashboardBlog from "@/pages/dashboard/DashboardBlog";
import ImpactPage from "./pages/ImpactPage";



// ==========================================
// MOCK AUTH SYSTEM (NO SUPABASE REQUIRED)
// ==========================================

interface AuthContextType {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function MockAuthProvider({ children }: { children: ReactNode }) {
  // Toggle this initial state to true if you want to skip login during dev
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const login = () => {
    setLoading(true);
    setTimeout(() => {
      setIsAuthenticated(true);
      setLoading(false);
    }, 400);
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useMockAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useMockAuth must be used within a MockAuthProvider");
  }
  return context;
}

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
  const { isAuthenticated, loading } = useMockAuth();
  if (loading) return <LoadingScreen />;
  if (!isAuthenticated) return <Navigate to="/dashboard/login" replace />;
  return <Outlet />;
}

// Anonymous Route Guard (Redirects away from login if already logged in)
function RequireAnon() {
  const { isAuthenticated, loading } = useMockAuth();
  if (loading) return <LoadingScreen />;
  if (isAuthenticated) return <Navigate to="/dashboard" replace />;
  return <Outlet />;
}

// ==========================================
// MAIN APP ROUTES
// ==========================================

export default function AppRoutes() {
  return (
    <Routes>
      {/* --- Protected Admin Dashboard Routes --- */}
      <Route
        path="/dashboard"
        element={
          <MockAuthProvider>
            <RequireAuth />
          </MockAuthProvider>
        }
      >
        <Route element={<DashboardLayout />}>
          <Route index element={<DashboardOverview />} />
          <Route path="donations" element={<DashboardDonations />} />
          <Route path="volunteers" element={<DashboardVolunteers />} />
          <Route path="programs" element={<DashboardPrograms />} />
          <Route path="blog" element={<DashboardBlog />} />
        </Route>
      </Route>

      {/* --- Dashboard Login Route --- */}
      <Route
        path="/dashboard/login"
        element={
          <MockAuthProvider>
            <RequireAnon />
          </MockAuthProvider>
        }
      >
        <Route index element={<DashboardLogin />} />
      </Route>

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
      </Route>

      {/* --- 404 Fallback --- */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
