import { useMemo } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { FilePlus2 } from "lucide-react";
import RecentComplaints from "../../components/dashboard/RecentComplaints";
import { getComplaints } from "../../data/citizenDashboard";

function MyComplaints() {
  const { searchQuery, setSearchQuery } = useOutletContext();
  const complaints = useMemo(() => [...getComplaints()].sort((a, b) => new Date(b.date) - new Date(a.date)), []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <header><p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#176B4D]">Your activity</p><h1 className="mt-2 text-2xl font-bold tracking-tight text-[#102C46]">My complaints</h1><p className="mt-1 text-sm text-slate-500">Search, filter, and review every report you’ve submitted.</p></header>
        <Link to="/citizen/complaints/new" className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl bg-[#176B4D] px-4 text-sm font-semibold text-white transition hover:bg-[#13543d]"><FilePlus2 size={16} /> New complaint</Link>
      </div>
      <RecentComplaints complaints={complaints} searchValue={searchQuery} onSearchChange={setSearchQuery} title="All complaints" subtitle="Choose a complaint to view its details and current status." />
    </div>
  );
}

export default MyComplaints;
