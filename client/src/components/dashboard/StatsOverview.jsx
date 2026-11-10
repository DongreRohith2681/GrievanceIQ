import { ClipboardList, Clock3, LoaderCircle, CircleCheck } from "lucide-react";

const stats = [
  { label: "Total complaints", key: "total", icon: ClipboardList, tone: "navy", note: "All your submissions" },
  { label: "Pending", key: "Pending", icon: Clock3, tone: "amber", note: "Awaiting review" },
  { label: "In progress", key: "In Progress", icon: LoaderCircle, tone: "blue", note: "Being addressed" },
  { label: "Resolved", key: "Resolved", icon: CircleCheck, tone: "green", note: "Issues closed" },
];

const tones = {
  navy: "bg-[#102C46]/[0.07] text-[#102C46]",
  amber: "bg-amber-50 text-amber-700",
  blue: "bg-blue-50 text-blue-700",
  green: "bg-emerald-50 text-[#176B4D]",
};

function StatsOverview({ complaints }) {
  return (
    <section aria-label="Complaint statistics" className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4">
      {stats.map(({ label, key, icon: Icon, tone, note }) => {
        const value = key === "total" ? complaints.length : complaints.filter((complaint) => complaint.status === key).length;
        return <article key={key} className="group rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-[#176B4D]/25 hover:shadow-lg sm:p-5">
          <div className="flex items-start justify-between gap-2">
            <div className={`grid size-10 place-items-center rounded-xl ${tones[tone]}`}><Icon size={19} /></div>
            <span className="rounded-full bg-slate-50 px-2 py-1 text-[10px] font-medium text-slate-500">Live overview</span>
          </div>
          <p className="mt-5 text-3xl font-bold tracking-tight text-[#102C46]">{value.toString().padStart(2, "0")}</p>
          <p className="mt-1 text-sm font-semibold text-[#172B3A]">{label}</p>
          <p className="mt-1 text-xs text-slate-500">{note}</p>
        </article>;
      })}
    </section>
  );
}

export default StatsOverview;
