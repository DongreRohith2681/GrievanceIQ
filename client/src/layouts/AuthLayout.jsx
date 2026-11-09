import { MapPin } from "lucide-react";

function AuthLayout({ children }) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">

      {/* Left Section */}
      <div className="relative hidden overflow-hidden bg-slate-950 p-12 text-white lg:flex lg:flex-col lg:justify-between">

        <div className="relative z-10 flex items-center gap-3">
          <div className="rounded-xl bg-emerald-600 p-3">
            <MapPin size={25} />
          </div>

          <h1 className="text-2xl font-bold">
            Civic<span className="text-emerald-400">Fix</span>
          </h1>
        </div>

        <div className="relative z-10 max-w-lg">
          <p className="mb-5 font-semibold uppercase tracking-widest text-emerald-400">
            Building Better Communities
          </p>

          <h2 className="text-5xl font-bold leading-tight">
            Your Voice Can Make a Difference.
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-300">
            Report civic issues, monitor their progress,
            and help create cleaner, safer and smarter cities.
          </p>
        </div>

        <p className="relative z-10 text-sm text-slate-400">
          © 2026 CivicFix. All rights reserved.
        </p>

        {/* Background Decoration */}
        <div className="absolute -right-32 top-20 h-96 w-96 rounded-full bg-emerald-600/20 blur-3xl" />

      </div>

      {/* Right Section */}
      <div className="flex items-center justify-center bg-slate-50 px-6 py-12">

        <div className="w-full max-w-md">
          {children}
        </div>

      </div>

    </div>
  );
}

export default AuthLayout;