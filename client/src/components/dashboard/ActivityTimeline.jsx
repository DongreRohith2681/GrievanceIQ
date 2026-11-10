import { Check, ClipboardCheck, Clock3, FilePlus2, MessageSquareText } from "lucide-react";

const activities = [
  { icon: FilePlus2, color: "bg-blue-50 text-blue-700", title: "Your road damage complaint was submitted", detail: "CF-2026-0184 · Lakeview Road", time: "Today, 9:15 AM" },
  { icon: ClipboardCheck, color: "bg-amber-50 text-amber-700", title: "Your water leakage report is being reviewed", detail: "CF-2026-0179 · Green Park", time: "Yesterday, 12:40 PM" },
  { icon: Check, color: "bg-emerald-50 text-[#176B4D]", title: "Your streetlight complaint was resolved", detail: "CF-2026-0162 · Riverside Walk", time: "Nov 4, 4:18 PM" },
];

function ActivityTimeline() {
  return (
    <section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <div><h2 className="text-base font-bold text-[#102C46]">Recent activity</h2><p className="mt-1 text-xs text-slate-500">The latest updates on your reports.</p></div>
        <span className="grid size-9 place-items-center rounded-xl bg-[#176B4D]/[0.07] text-[#176B4D]"><MessageSquareText size={17} /></span>
      </div>
      <ol className="mt-5 space-y-0">
        {activities.map((activity, index) => {
          const Icon = activity.icon;
          return <li key={activity.title} className="relative flex gap-3 pb-5 last:pb-0">
            {index !== activities.length - 1 && <span className="absolute bottom-0 left-[17px] top-9 w-px bg-slate-200" aria-hidden="true" />}
            <span className={`relative z-10 grid size-9 shrink-0 place-items-center rounded-xl ${activity.color}`}><Icon size={16} /></span>
            <span className="min-w-0 flex-1 pt-0.5"><span className="block text-xs font-semibold leading-5 text-[#172B3A]">{activity.title}</span><span className="mt-0.5 block truncate text-[11px] text-slate-500">{activity.detail}</span></span>
            <span className="flex shrink-0 items-center gap-1 pt-1 text-[10px] text-slate-400"><Clock3 size={12} />{activity.time}</span>
          </li>;
        })}
      </ol>
    </section>
  );
}

export default ActivityTimeline;
