import { ArrowUpRight, FilePlus2, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";

function WelcomeSection() {
  return (
    <section className="relative isolate overflow-hidden rounded-3xl bg-[#102C46] px-6 py-7 text-white shadow-lg shadow-[#102C46]/10 sm:px-8 sm:py-8 lg:px-10">
      <div className="absolute -right-12 -top-24 -z-10 size-72 rounded-full bg-[#176B4D]/45 blur-3xl" />
      <div className="absolute -bottom-28 right-1/3 -z-10 size-64 rounded-full bg-sky-500/10 blur-3xl" />
      <div className="grid items-center gap-8 lg:grid-cols-[1fr_auto]">
        <div className="max-w-2xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.13em] text-emerald-200">
            <ShieldCheck size={14} /> Community impact starts here
          </div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Your City, Your Responsibility.</h1>
          <p className="mt-3 max-w-xl text-sm leading-6 text-slate-300 sm:text-base">
            Track your complaints, report civic issues, and help make your community better.
          </p>
          <Link to="/citizen/complaints/new" className="mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#176B4D] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-black/10 transition hover:-translate-y-0.5 hover:bg-[#20835F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#102C46]">
            <FilePlus2 size={17} /> Report an issue <ArrowUpRight size={16} />
          </Link>
        </div>
        <div className="hidden items-end gap-2 self-stretch lg:flex" aria-hidden="true">
          <div className="mb-1 h-16 w-8 rounded-t-lg border border-white/10 bg-white/5" />
          <div className="h-24 w-12 rounded-t-lg border border-white/10 bg-white/10" />
          <div className="h-32 w-16 rounded-t-lg border border-white/10 bg-white/10 p-2">
            <div className="grid grid-cols-2 gap-2 opacity-70"><span className="h-2 rounded-sm bg-emerald-300/60"/><span className="h-2 rounded-sm bg-white/20"/><span className="h-2 rounded-sm bg-white/20"/><span className="h-2 rounded-sm bg-emerald-300/60"/></div>
          </div>
          <div className="h-20 w-10 rounded-t-lg border border-white/10 bg-white/5" />
          <div className="h-28 w-14 rounded-t-lg border border-white/10 bg-white/10" />
          <div className="mb-1 h-14 w-8 rounded-t-lg border border-white/10 bg-white/5" />
        </div>
      </div>
    </section>
  );
}

export default WelcomeSection;
