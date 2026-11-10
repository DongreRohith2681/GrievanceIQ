import { ArrowUpRight, ClipboardClock, FilePlus2, LifeBuoy, MapPinned } from "lucide-react";
import { Link } from "react-router-dom";

const actions = [
  { title: "Report a new issue", description: "Tell the city what needs attention.", icon: FilePlus2, to: "/citizen/complaints/new", tone: "teal" },
  { title: "Track a complaint", description: "Look up progress with a reference ID.", icon: MapPinned, to: "/citizen/track", tone: "blue" },
  { title: "Complaint history", description: "Review all your submissions.", icon: ClipboardClock, to: "/citizen/complaints", tone: "amber" },
  { title: "Contact support", description: "Get help with CivicFix.", icon: LifeBuoy, href: "mailto:support@civicfix.gov?subject=CivicFix%20citizen%20support", tone: "slate" },
];

const iconTones = { teal: "bg-emerald-50 text-[#176B4D]", blue: "bg-blue-50 text-blue-700", amber: "bg-amber-50 text-amber-700", slate: "bg-slate-100 text-slate-700" };

function QuickActions() {
  return (
    <section>
      <div className="mb-4 flex items-end justify-between gap-3">
        <div><h2 className="text-lg font-bold text-[#102C46]">Quick actions</h2><p className="mt-1 text-xs text-slate-500">Common tasks, right where you need them.</p></div>
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {actions.map(({ title, description, icon: Icon, to, href, tone }) => {
          const CardContent = <><span className={`grid size-10 shrink-0 place-items-center rounded-xl ${iconTones[tone]}`}><Icon size={19} /></span><span className="min-w-0 flex-1"><span className="block text-sm font-semibold text-[#172B3A]">{title}</span><span className="mt-1 block text-xs leading-5 text-slate-500">{description}</span></span><ArrowUpRight size={16} className="shrink-0 text-slate-400 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#176B4D]" /></>;
          const className = "group flex min-h-[88px] items-center gap-3 rounded-2xl border border-slate-200/80 bg-white p-4 text-left shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-[#176B4D]/30 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#176B4D]";
          return to ? <Link key={title} to={to} className={className}>{CardContent}</Link> : <a key={title} href={href} className={className}>{CardContent}</a>;
        })}
      </div>
    </section>
  );
}

export default QuickActions;
