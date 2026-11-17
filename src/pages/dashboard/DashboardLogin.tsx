// import { useState } from "react";
// import { Navigate, useNavigate } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   Lock,
//   Mail,
//   ArrowRight,
//   Eye,
//   EyeOff,
//   ShieldCheck,
//   Sparkles,
//   AlertCircle,
// } from "lucide-react";
// import { useAuth } from "@/lib/auth";

// const EASE = [0.76, 0, 0.24, 1] as const;

// export default function DashboardLogin() {
//   const { signIn, session } = useAuth();
//   const navigate = useNavigate();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [error, setError] = useState("");
//   const [submitting, setSubmitting] = useState(false);

//   if (session) return <Navigate to="/dashboard" replace />;

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError("");
//     setSubmitting(true);

//     try {
//       const { error: err } = await signIn(email.trim(), password);
//       if (err) throw new Error(err);
//       navigate("/dashboard");
//     } catch (err) {
//       setError(
//         err instanceof Error
//           ? err.message
//           : "Unable to sign in. Please try again."
//       );
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#F6F7F3] px-5 py-12 font-sans text-[#12312B] selection:bg-[#E6A100]/20">

//       {/* Background decoration */}
//       <div className="pointer-events-none absolute inset-0 overflow-hidden">
//         <div className="absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-[#E6A100]/[0.055] blur-[100px]" />
//         <div className="absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-[#12312B]/[0.055] blur-[100px]" />

//         <div
//           className="absolute inset-0 opacity-[0.025]"
//           style={{
//             backgroundImage:
//               "radial-gradient(#12312B 0.7px, transparent 0.7px)",
//             backgroundSize: "24px 24px",
//           }}
//         />
//       </div>

//       <motion.div
//         initial={{ opacity: 0, y: 24 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.7, ease: EASE }}
//         className="relative z-10 w-full max-w-[440px]"
//       >
//         {/* Brand */}
//         <div className="mb-8 flex flex-col items-center text-center">
//           <div className="mb-3 flex h-[52px] w-[52px] items-center justify-center rounded-2xl bg-[#12312B] shadow-lg shadow-[#12312B]/15">
//             <span className="text-[19px] font-bold tracking-[-1px] text-[#E6A100]">
//               StG
//             </span>
//           </div>

//           <h2 className="text-lg font-semibold tracking-tight text-[#12312B]">
//             Saintgenevieve
//           </h2>

//           <div className="mt-1.5 flex items-center gap-2">
//             <span className="h-px w-4 bg-[#E6A100]/60" />
//             <span className="text-[9px] font-semibold uppercase tracking-[2.5px] text-[#12312B]/45">
//               Administration Portal
//             </span>
//             <span className="h-px w-4 bg-[#E6A100]/60" />
//           </div>
//         </div>

//         {/* Login card */}
//         <div className="rounded-[28px] border border-[#12312B]/[0.07] bg-white p-7 shadow-[0_20px_70px_-25px_rgba(18,49,43,0.16)] sm:p-10">

//           {/* Heading */}
//           <div className="mb-8">
//             <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#12312B]/[0.06]">
//               <Lock size={19} className="text-[#12312B]" />
//             </div>

//             <h1 className="text-[28px] font-semibold tracking-[-1.2px] text-[#12312B]">
//               Welcome back.
//             </h1>

//             <p className="mt-2 text-[13px] leading-6 text-[#12312B]/55">
//               Sign in to access your administrative dashboard and manage your platform.
//             </p>
//           </div>

//           {/* Error message */}
//           <AnimatePresence mode="wait">
//             {error && (
//               <motion.div
//                 initial={{ opacity: 0, y: -8, height: 0 }}
//                 animate={{ opacity: 1, y: 0, height: "auto" }}
//                 exit={{ opacity: 0, y: -8, height: 0 }}
//                 className="mb-6 overflow-hidden"
//               >
//                 <div className="flex items-start gap-3 rounded-xl border border-red-100 bg-red-50 p-3.5">
//                   <AlertCircle
//                     size={17}
//                     className="mt-0.5 shrink-0 text-red-500"
//                   />
//                   <p className="text-xs leading-5 text-red-700">
//                     {error}
//                   </p>
//                 </div>
//               </motion.div>
//             )}
//           </AnimatePresence>

//           {/* Form */}
//           <form onSubmit={handleSubmit} className="space-y-5">

//             {/* Email */}
//             <div>
//               <label
//                 htmlFor="admin-email"
//                 className="mb-2.5 block text-[11px] font-semibold uppercase tracking-[1.3px] text-[#12312B]/70"
//               >
//                 Email address
//               </label>

//               <div className="group relative">
//                 <Mail
//                   size={17}
//                   className="absolute left-4 top-1/2 -translate-y-1/2 text-[#12312B]/35 transition-colors group-focus-within:text-[#12312B]"
//                 />

//                 <input
//                   id="admin-email"
//                   type="email"
//                   required
//                   autoComplete="username"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   placeholder="name@example.com"
//                   className="h-[54px] w-full rounded-xl border border-[#12312B]/10 bg-[#F9FAF8] pl-11 pr-4 text-[13px] text-[#12312B] outline-none transition-all duration-300 placeholder:text-[#12312B]/30 hover:border-[#12312B]/20 focus:border-[#12312B]/50 focus:bg-white focus:ring-4 focus:ring-[#12312B]/[0.04]"
//                 />
//               </div>
//             </div>

//             {/* Password */}
//             <div>
//               <div className="mb-2.5 flex items-center justify-between">
//                 <label
//                   htmlFor="admin-password"
//                   className="text-[11px] font-semibold uppercase tracking-[1.3px] text-[#12312B]/70"
//                 >
//                   Password
//                 </label>
//               </div>

//               <div className="group relative">
//                 <Lock
//                   size={17}
//                   className="absolute left-4 top-1/2 -translate-y-1/2 text-[#12312B]/35 transition-colors group-focus-within:text-[#12312B]"
//                 />

//                 <input
//                   id="admin-password"
//                   type={showPassword ? "text" : "password"}
//                   required
//                   autoComplete="current-password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   placeholder="Enter your password"
//                   className="h-[54px] w-full rounded-xl border border-[#12312B]/10 bg-[#F9FAF8] pl-11 pr-12 text-[13px] text-[#12312B] outline-none transition-all duration-300 placeholder:text-[#12312B]/30 hover:border-[#12312B]/20 focus:border-[#12312B]/50 focus:bg-white focus:ring-4 focus:ring-[#12312B]/[0.04]"
//                 />

//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   aria-label={showPassword ? "Hide password" : "Show password"}
//                   className="absolute right-4 top-1/2 -translate-y-1/2 text-[#12312B]/35 transition-colors hover:text-[#12312B]"
//                 >
//                   {showPassword ? (
//                     <EyeOff size={17} />
//                   ) : (
//                     <Eye size={17} />
//                   )}
//                 </button>
//               </div>
//             </div>

//             {/* Submit */}
//             <button
//               type="submit"
//               disabled={submitting}
//               className="group relative mt-3 flex h-[55px] w-full items-center justify-center gap-3 overflow-hidden rounded-xl bg-[#12312B] px-6 text-[12px] font-semibold uppercase tracking-[1.5px] text-[#E6A100] shadow-lg shadow-[#12312B]/10 transition-all duration-300 hover:bg-[#19443A] hover:shadow-xl hover:shadow-[#12312B]/15 active:scale-[0.985] disabled:cursor-not-allowed disabled:opacity-65"
//             >
//               <span className="relative z-10">
//                 {submitting ? "Authenticating..." : "Sign in to dashboard"}
//               </span>

//               {!submitting && (
//                 <ArrowRight
//                   size={17}
//                   className="relative z-10 transition-transform duration-300 group-hover:translate-x-1"
//                 />
//               )}

//               {submitting && (
//                 <span className="relative z-10 h-4 w-4 animate-spin rounded-full border-2 border-[#E6A100]/30 border-t-[#E6A100]" />
//               )}
//             </button>
//           </form>

//           {/* Security information */}
//           <div className="mt-7 flex items-center justify-center gap-2 border-t border-[#12312B]/[0.07] pt-6">
//             <ShieldCheck size={15} className="text-[#477A60]" />
//             <span className="text-[11px] text-[#12312B]/50">
//               Protected administrative access
//             </span>
//           </div>
//         </div>

//         {/* Footer */}
//         <div className="mt-8 flex flex-col items-center gap-3">
//           <div className="flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-[1.5px] text-[#12312B]/35">
//             <Sparkles size={12} className="text-[#E6A100]" />
//             <span>Saintgenevieve Admin</span>
//           </div>

//           <p className="text-center text-[10px] text-[#12312B]/35">
//             © {new Date().getFullYear()} Saintgenevieve. All rights reserved.
//           </p>
//         </div>
//       </motion.div>
//     </main>
//   );
// }
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { AlertCircle, Eye, EyeOff, ShieldCheck } from "lucide-react";
import { CustomArrowUpRight } from "@/components/ui/CustomIcons";
import { useAuth } from "@/lib/auth";

const EASE = [0.76, 0, 0.24, 1] as const;

/* Logo lives in /public, so it is referenced by URL, not imported */
const LOGO = "/main.svg";

/* Same underline-only field as the contact form: no box, no fill */
const FIELD =
  "w-full border-b border-[#12312B]/20 bg-transparent px-0 py-3 font-sans text-sm text-[#12312B] outline-none transition-colors placeholder:text-[#12312B]/35 focus:border-[#12312B]";

export default function DashboardLogin() {
  const { signIn, session } = useAuth();
  const navigate = useNavigate();
  const reduceMotion = useReducedMotion();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (session) return <Navigate to="/dashboard" replace />;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      const { error: err } = await signIn(email.trim(), password);
      if (err) throw new Error(err);
      navigate("/dashboard");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to sign in. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const label = submitting ? "Signing in..." : "Login now";

  return (
    <main className="grid min-h-screen bg-white font-sans text-[#12312B] lg:grid-cols-[1.05fr_1fr]">
      {/* Left: brand panel */}
      <aside className="relative hidden overflow-hidden bg-[#12312B] p-12 text-white lg:flex lg:flex-col lg:justify-between xl:p-16">
        {/* dots, top-right corner only */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-0 top-0 h-full w-full"
          style={{
            backgroundImage:
              "radial-gradient(rgba(255,255,255,0.22) 1.3px, transparent 1.6px)",
            backgroundSize: "18px 18px",
            WebkitMaskImage:
              "radial-gradient(ellipse 80% 60% at 100% 0%, #000 0%, transparent 70%)",
            maskImage:
              "radial-gradient(ellipse 80% 60% at 100% 0%, #000 0%, transparent 70%)",
          }}
        />

        {/* soft rings, bottom-right */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-32 -right-32 h-[460px] w-[460px]"
        >
          <span className="absolute inset-0 rounded-full border border-[#E6A100]/25" />
          <span className="absolute inset-[18%] rounded-full border border-[#E6A100]/25" />
          <span className="absolute inset-[36%] rounded-full border border-[#E6A100]/25" />
        </div>

        <div className="relative">
          <span className="inline-flex rounded-2xl bg-white px-4 py-3">
            <img
              src={LOGO}
              alt="St. Genevieve Foundation logo"
              className="h-10 w-auto object-contain"
            />
          </span>
        </div>

        <div className="relative max-w-[440px]">
          <motion.h1
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE }}
            className="font-sans text-[clamp(2.4rem,4vw,3.6rem)] font-semibold leading-[1.05] tracking-[-0.03em]"
          >
            Hello,
            <br />
            <span className="text-[#E6A100]">St. Genevieve</span>
          </motion.h1>

          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease: EASE }}
            className="mt-5 max-w-[380px] font-sans text-sm leading-[1.8] text-white/70"
          >
            Sign in to manage donations, volunteers and the stories behind the
            Foundation's work. A Slice for a Better Smile.
          </motion.p>
        </div>

        <p className="relative font-sans text-xs text-white/50">
          © {new Date().getFullYear()} St. Genevieve Maternal and Child Welfare
          Foundation.
        </p>
      </aside>

      {/* Right: form */}
      <section className="flex items-center justify-center bg-white px-5 py-12 sm:px-10">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="w-full max-w-[400px]"
        >
          {/* logo on small screens, where the green panel is hidden */}
          <div className="mb-8 flex items-center gap-3 lg:hidden">
            <img
              src={LOGO}
              alt="St. Genevieve Foundation logo"
              className="h-10 w-auto object-contain"
            />
          </div>

          <h2 className="font-sans text-[clamp(1.9rem,3vw,2.4rem)] font-semibold leading-[1.08] tracking-[-0.03em]">
            Welcome back
          </h2>

          <p className="mt-2 font-sans text-sm leading-[1.7] text-[#12312B]/65">
            Sign in to access your administrative dashboard.
          </p>

          <AnimatePresence mode="wait">
            {error && (
              <motion.div
                role="alert"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-6 overflow-hidden"
              >
                <div className="flex items-start gap-3 rounded-xl border border-red-100 bg-red-50 p-3.5">
                  <AlertCircle
                    size={17}
                    className="mt-0.5 shrink-0 text-red-500"
                  />
                  <p className="font-sans text-xs leading-5 text-red-700">
                    {error}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div>
              <label
                htmlFor="admin-email"
                className="mb-2 block font-sans text-xs font-medium"
              >
                Email address
              </label>

              <div className="group relative">
                <input
                  id="admin-email"
                  type="email"
                  required
                  autoComplete="username"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className={FIELD}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="admin-password"
                className="mb-2 block font-sans text-xs font-medium"
              >
                Password
              </label>

              <div className="group relative">
                <input
                  id="admin-password"
                  type={showPassword ? "text" : "password"}
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className={`${FIELD} pr-9`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-[#12312B]/40 transition-colors hover:text-[#12312B]"
                >
                  {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
            </div>

            {/* Same pill button as the rest of the site */}
            <button
              type="submit"
              disabled={submitting}
              className="group relative mt-2 inline-flex w-full items-center justify-center gap-2.5 overflow-hidden rounded-full bg-[#E6A100] px-7 py-4 font-sans text-xs font-medium uppercase tracking-wider text-[#12312B] transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] hover:text-white hover:shadow-[0_14px_32px_-10px_rgba(18,49,43,0.5)] active:scale-[0.98] disabled:pointer-events-none disabled:opacity-65"
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute bottom-0 left-1/2 aspect-square w-[160%] -translate-x-1/2 translate-y-1/2 scale-0 rounded-full bg-[#12312B] transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-100"
              />

              <span className="relative block overflow-hidden leading-[1.5]">
                <span className="block transition-transform duration-500 group-hover:-translate-y-full">
                  {label}
                </span>
                <span
                  aria-hidden="true"
                  className="absolute inset-0 block translate-y-full transition-transform duration-500 group-hover:translate-y-0"
                >
                  {label}
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
            </button>
          </form>

          <div className="mt-8 flex items-center justify-center gap-2 border-t border-[#12312B]/10 pt-6">
            <ShieldCheck size={15} className="text-[#12312B]/55" />
            <span className="font-sans text-[11px] text-[#12312B]/55">
              Protected administrative access
            </span>
          </div>
        </motion.div>
      </section>
    </main>
  );
}