// import { useState } from "react";
// import { NavLink, Outlet, useNavigate } from "react-router-dom";
// import { useAuth } from "@/lib/auth";
// import {
//   LayoutDashboard,
//   CreditCard,
//   Users,
//   Mail,
//   FileText,
//   LogOut,
//   Menu,
//   X,
//   ChevronRight,
//   ShieldCheck,
// } from "lucide-react";

// const nav = [
//   { to: "/dashboard", label: "Overview", icon: LayoutDashboard, end: true },
//   { to: "/dashboard/donations", label: "Donations", icon: CreditCard },
//   { to: "/dashboard/volunteers", label: "Volunteers", icon: Users },
//   { to: "/dashboard/contacts", label: "Messages", icon: Mail },
//   { to: "/dashboard/blog", label: "Blog", icon: FileText },
// ];

// export default function DashboardLayout() {
//   const { signOut, user } = useAuth();
//   const navigate = useNavigate();
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const [signingOut, setSigningOut] = useState(false);

//   const handleSignOut = async () => {
//     if (signingOut) return;

//     setSigningOut(true);

//     try {
//       await signOut();
//       navigate("/dashboard/login", { replace: true });
//     } finally {
//       setSigningOut(false);
//     }
//   };

//   const Navigation = ({ mobile = false }: { mobile?: boolean }) => (
//     <>
//       <nav className="space-y-1.5">
//         <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#12312B]/35">
//           Workspace
//         </p>

//         {nav.map((item) => {
//           const Icon = item.icon;

//           return (
//             <NavLink
//               key={item.to}
//               to={item.to}
//               end={item.end}
//               onClick={() => mobile && setMobileOpen(false)}
//               className={({ isActive }) =>
//                 `group relative flex items-center gap-3 rounded-xl px-3.5 py-3 text-[13px] font-medium transition-all duration-200 ${
//                   isActive
//                     ? "bg-[#12312B] text-white shadow-[0_4px_12px_rgba(18,49,43,0.14)]"
//                     : "text-[#12312B]/65 hover:bg-[#F4F6F2] hover:text-[#12312B]"
//                 }`
//               }
//             >
//               {({ isActive }) => (
//                 <>
//                   <Icon
//                     size={18}
//                     strokeWidth={isActive ? 2.2 : 1.8}
//                     className={
//                       isActive
//                         ? "text-[#E6A100]"
//                         : "text-[#12312B]/45 transition-colors group-hover:text-[#12312B]"
//                     }
//                   />

//                   <span className="flex-1">{item.label}</span>

//                   {isActive && (
//                     <ChevronRight
//                       size={15}
//                       className="text-white/60"
//                     />
//                   )}
//                 </>
//               )}
//             </NavLink>
//           );
//         })}
//       </nav>

//       <div className="mt-auto border-t border-[#12312B]/[0.08] pt-5">
//         <div className="mb-4 flex items-center gap-3 rounded-xl bg-[#F7F8F5] p-3">
//           <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#E5ECE5] text-sm font-semibold text-[#12312B]">
//             {user?.email?.charAt(0).toUpperCase() ?? "A"}
//           </div>

//           <div className="min-w-0 flex-1">
//             <p className="text-xs font-semibold text-[#12312B]">
//               Administrator
//             </p>
//             <p className="mt-0.5 truncate text-[10px] text-[#12312B]/45">
//               {user?.email ?? "Guest"}
//             </p>
//           </div>
//         </div>

//         <button
//           onClick={handleSignOut}
//           disabled={signingOut}
//           className="flex w-full items-center gap-3 rounded-xl px-3.5 py-3 text-[13px] font-medium text-[#12312B]/60 transition hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
//         >
//           <LogOut size={18} strokeWidth={1.8} />
//           {signingOut ? "Signing out..." : "Sign out"}
//         </button>
//       </div>
//     </>
//   );

//   return (
//     <div className="flex min-h-screen bg-[#F6F7F3] font-sans text-[#12312B]">
//       {/* Desktop sidebar */}
//       <aside className="fixed inset-y-0 left-0 z-30 hidden w-[250px] flex-col border-r border-[#12312B]/[0.08] bg-white px-4 py-6 lg:flex">
//         {/* Brand */}
//         <div className="mb-10 flex items-center gap-3 px-2">
//           <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#12312B] text-sm font-bold tracking-tight text-[#E6A100]">
//             StG
//           </div>

//           <div>
//             <p className="text-[15px] font-bold tracking-tight">
//               Saintgenevieve
//             </p>
//             <p className="mt-0.5 text-[10px] font-medium uppercase tracking-[0.14em] text-[#12312B]/40">
//               Administration
//             </p>
//           </div>
//         </div>

//         <Navigation />
//       </aside>

//       {/* Main content */}
//       <div className="flex min-w-0 flex-1 flex-col lg:ml-[250px]">
//         {/* Desktop top bar */}
//         <header className="sticky top-0 z-20 hidden h-[68px] items-center justify-between border-b border-[#12312B]/[0.07] bg-white/90 px-8 backdrop-blur-md lg:flex">
//           <div>
//             <p className="text-xs font-medium text-[#12312B]/45">
//               Saintgenevieve
//             </p>
//             <p className="mt-0.5 text-sm font-semibold">
//               Admin workspace
//             </p>
//           </div>

//           <div className="flex items-center gap-2 rounded-full border border-[#12312B]/[0.08] bg-[#F8F9F6] px-3 py-2">
//             <ShieldCheck size={15} className="text-[#12312B]/55" />
//             <span className="text-[11px] font-medium text-[#12312B]/65">
//               Secure admin session
//             </span>
//           </div>
//         </header>

//         {/* Mobile header */}
//         <header className="sticky top-0 z-30 flex h-[65px] items-center justify-between border-b border-[#12312B]/[0.08] bg-white/95 px-4 backdrop-blur-md lg:hidden">
//           <div className="flex items-center gap-2.5">
//             <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#12312B] text-xs font-bold text-[#E6A100]">
//               StG
//             </div>

//             <div>
//               <p className="text-sm font-bold">Saintgenevieve</p>
//               <p className="text-[9px] font-medium uppercase tracking-[0.13em] text-[#12312B]/40">
//                 Admin
//               </p>
//             </div>
//           </div>

//           <button
//             onClick={() => setMobileOpen(!mobileOpen)}
//             className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#12312B]/10 bg-white transition hover:bg-[#F4F6F2]"
//             aria-label={mobileOpen ? "Close menu" : "Open menu"}
//           >
//             {mobileOpen ? <X size={20} /> : <Menu size={20} />}
//           </button>
//         </header>

//         {/* Page content */}
//         <main className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8">
//           <Outlet />
//         </main>
//       </div>

//       {/* Mobile navigation overlay */}
//       {mobileOpen && (
//         <div
//           className="fixed inset-0 z-40 bg-[#0A1D18]/40 backdrop-blur-[2px] lg:hidden"
//           onClick={() => setMobileOpen(false)}
//         />
//       )}

//       {/* Mobile navigation drawer */}
//       <aside
//         className={`fixed inset-y-0 left-0 z-50 flex w-[280px] flex-col border-r border-[#12312B]/10 bg-white px-4 py-6 shadow-2xl transition-transform duration-300 lg:hidden ${
//           mobileOpen ? "translate-x-0" : "-translate-x-full"
//         }`}
//       >
//         <div className="mb-10 flex items-center justify-between px-2">
//           <div className="flex items-center gap-3">
//             <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#12312B] text-sm font-bold text-[#E6A100]">
//               StG
//             </div>
//             <div>
//               <p className="text-sm font-bold">Saintgenevieve</p>
//               <p className="text-[10px] uppercase tracking-wider text-[#12312B]/40">
//                 Administration
//               </p>
//             </div>
//           </div>

//           <button
//             onClick={() => setMobileOpen(false)}
//             className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#F4F6F2]"
//             aria-label="Close navigation"
//           >
//             <X size={17} />
//           </button>
//         </div>

//         <Navigation mobile />
//       </aside>
//     </div>
//   );
// }
import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/auth";
import {
  LayoutDashboard,
  CreditCard,
  Users,
  Mail,
  FileText,
  LogOut,
  Menu,
  X,
  ChevronRight,
  ShieldCheck,
  LayoutGrid,
} from "lucide-react";

/* Logo lives in /public, so it is referenced by URL */
const LOGO = "/main.svg";

const nav = [
  { to: "/dashboard", label: "Overview", icon: LayoutDashboard, end: true },
  { to: "/dashboard/donations", label: "Donations", icon: CreditCard },
  { to: "/dashboard/volunteers", label: "Volunteers", icon: Users },
  { to: "/dashboard/programs", label: "Projects", icon: LayoutGrid },
  { to: "/dashboard/contacts", label: "Messages", icon: Mail },
  { to: "/dashboard/blog", label: "Blog", icon: FileText },
];

/* Logo at the top left, "Administration" underneath */
function Brand() {
  return (
    <div className="flex flex-col items-start">
      <img
        src={LOGO}
        alt="St. Genevieve Foundation"
        className="h-9 w-auto object-contain"
      />
      <p className="mt-1.5 text-[10px] font-medium uppercase tracking-[0.14em] text-[#12312B]/40">
        Administration
      </p>
    </div>
  );
}

export default function DashboardLayout() {
  const { signOut, user } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [signingOut, setSigningOut] = useState(false);

  const handleSignOut = async () => {
    if (signingOut) return;

    setSigningOut(true);

    try {
      await signOut();
      navigate("/dashboard/login", { replace: true });
    } finally {
      setSigningOut(false);
    }
  };

  const Navigation = ({ mobile = false }: { mobile?: boolean }) => (
    <>
      <nav className="space-y-1.5">
        <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#12312B]/35">
          Workspace
        </p>

        {nav.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={() => mobile && setMobileOpen(false)}
              className={({ isActive }) =>
                `group relative flex items-center gap-3 rounded-xl px-3.5 py-3 text-[13px] font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-[#12312B] text-white shadow-[0_4px_12px_rgba(18,49,43,0.14)]"
                    : "text-[#12312B]/65 hover:bg-[#F4F6F2] hover:text-[#12312B]"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon
                    size={18}
                    strokeWidth={isActive ? 2.2 : 1.8}
                    className={
                      isActive
                        ? "text-[#E6A100]"
                        : "text-[#12312B]/45 transition-colors group-hover:text-[#12312B]"
                    }
                  />

                  <span className="flex-1">{item.label}</span>

                  {isActive && (
                    <ChevronRight
                      size={15}
                      className="text-white/60"
                    />
                  )}
                </>
              )}
            </NavLink>
          );
        })}
      </nav>

      <div className="mt-auto border-t border-[#12312B]/[0.08] pt-5">
        <div className="mb-4 flex items-center gap-3 rounded-xl bg-[#F7F8F5] p-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#E5ECE5] text-sm font-semibold text-[#12312B]">
            {user?.email?.charAt(0).toUpperCase() ?? "A"}
          </div>

          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold text-[#12312B]">
              Administrator
            </p>
            <p className="mt-0.5 truncate text-[10px] text-[#12312B]/45">
              {user?.email ?? "Guest"}
            </p>
          </div>
        </div>

        <button
          onClick={handleSignOut}
          disabled={signingOut}
          className="flex w-full items-center gap-3 rounded-xl px-3.5 py-3 text-[13px] font-medium text-[#12312B]/60 transition hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
        >
          <LogOut size={18} strokeWidth={1.8} />
          {signingOut ? "Signing out..." : "Sign out"}
        </button>
      </div>
    </>
  );

  return (
    <div className="flex min-h-screen bg-[#F6F7F3] font-sans text-[#12312B]">
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-[250px] flex-col border-r border-[#12312B]/[0.08] bg-white px-4 py-6 lg:flex">
        {/* Brand */}
        <div className="mb-10 px-2">
          <Brand />
        </div>

        <Navigation />
      </aside>

      {/* Main content */}
      <div className="flex min-w-0 flex-1 flex-col lg:ml-[250px]">
        {/* Desktop top bar */}
        <header className="sticky top-0 z-20 hidden h-[68px] items-center justify-between border-b border-[#12312B]/[0.07] bg-white/90 px-8 backdrop-blur-md lg:flex">
          <div>
            <p className="text-xs font-medium text-[#12312B]/45">
              Saintgenevieve
            </p>
            <p className="mt-0.5 text-sm font-semibold">
              Admin workspace
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-full border border-[#12312B]/[0.08] bg-[#F8F9F6] px-3 py-2">
            <ShieldCheck size={15} className="text-[#12312B]/55" />
            <span className="text-[11px] font-medium text-[#12312B]/65">
              Secure admin session
            </span>
          </div>
        </header>

        {/* Mobile header */}
        <header className="sticky top-0 z-30 flex h-[65px] items-center justify-between border-b border-[#12312B]/[0.08] bg-white/95 px-4 backdrop-blur-md lg:hidden">
          <Brand />

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#12312B]/10 bg-white transition hover:bg-[#F4F6F2]"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </header>

        {/* Page content */}
        <main className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>

      {/* Mobile navigation overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-[#0A1D18]/40 backdrop-blur-[2px] lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile navigation drawer */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[280px] flex-col border-r border-[#12312B]/10 bg-white px-4 py-6 shadow-2xl transition-transform duration-300 lg:hidden ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="mb-10 flex items-start justify-between px-2">
          <Brand />

          <button
            onClick={() => setMobileOpen(false)}
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#F4F6F2]"
            aria-label="Close navigation"
          >
            <X size={17} />
          </button>
        </div>

        <Navigation mobile />
      </aside>
    </div>
  );
}