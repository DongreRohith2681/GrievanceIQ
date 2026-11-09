import { MapPin } from "lucide-react";

function AuthLayout({ children }) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Left Section - Premium Dark Navy & Teal Theme */}
      <div className="relative hidden overflow-hidden bg-[#102C46] p-12 text-white lg:flex lg:flex-col lg:justify-between">
        <div className="relative z-10 flex items-center gap-3">
          <div className="rounded-xl bg-[#176B4D] p-3 shadow-lg shadow-[#176B4D]/30">
            <MapPin size={25} />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">
            Civic<span className="text-emerald-300">Fix</span>
          </h1>
        </div>

        <div className="relative z-10 max-w-lg">
          <p className="mb-5 font-semibold uppercase tracking-widest text-emerald-300">
            Building Better Communities
          </p>
          <h2 className="text-5xl font-bold leading-tight">
            Your Voice Can Make a Difference.
          </h2>
          <p className="mt-6 text-lg leading-8 text-slate-300">
            Report civic issues, monitor their progress, and help create cleaner, safer and smarter cities.
          </p>
        </div>

        <p className="relative z-10 text-sm text-slate-400">
          © 2026 CivicFix. All rights reserved.
        </p>

        {/* Background Decoration - Teal Glow */}
        <div className="absolute -right-32 top-20 h-96 w-96 rounded-full bg-[#176B4D]/20 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-96 w-96 rounded-full bg-slate-900/40 blur-3xl" />
      </div>

      {/* Right Section - Clean Light Background with Subtle Grid Pattern */}
      <div className="relative flex items-center justify-center bg-[#F8FAFC] px-6 py-12">
        {/* Subtle Grid Pattern Background */}
        <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
        
        <div className="relative w-full max-w-md">
          {children}
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;
