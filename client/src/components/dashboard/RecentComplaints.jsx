import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, ExternalLink, Search, SlidersHorizontal } from "lucide-react";
import { formatComplaintDate } from "../../data/citizenDashboard";

const statusStyles = {
  Pending: "bg-amber-50 text-amber-700 ring-amber-200",
  "In Progress": "bg-blue-50 text-blue-700 ring-blue-200",
  Resolved: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  Rejected: "bg-rose-50 text-rose-700 ring-rose-200",
};

function RecentComplaints({ complaints, searchValue = "", onSearchChange, title = "Recent complaints", subtitle = "Stay up to date with your submitted civic issues." }) {
  const [statusFilter, setStatusFilter] = useState("All statuses");
  const [categoryFilter, setCategoryFilter] = useState("All categories");
  const [page, setPage] = useState(1);
  const pageSize = 5;
  const categories = [...new Set(complaints.map((complaint) => complaint.category))];

  const filteredComplaints = useMemo(() => {
    const query = searchValue.trim().toLowerCase();
    return complaints.filter((complaint) => {
      const matchesSearch = !query || [complaint.id, complaint.title, complaint.category, complaint.location].some((value) => value.toLowerCase().includes(query));
      const matchesStatus = statusFilter === "All statuses" || complaint.status === statusFilter;
      const matchesCategory = categoryFilter === "All categories" || complaint.category === categoryFilter;
      return matchesSearch && matchesStatus && matchesCategory;
    });
  }, [complaints, searchValue, statusFilter, categoryFilter]);

  const pageCount = Math.max(1, Math.ceil(filteredComplaints.length / pageSize));
  const pageItems = filteredComplaints.slice((page - 1) * pageSize, page * pageSize);

  const updateFilter = (setter, value) => {
    setter(value);
    setPage(1);
  };

  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
      <div className="flex flex-col gap-4 border-b border-slate-100 p-5 sm:p-6 xl:flex-row xl:items-center xl:justify-between">
        <div><h2 className="text-base font-bold text-[#102C46]">{title}</h2><p className="mt-1 text-xs text-slate-500">{subtitle}</p></div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <label className="flex h-10 min-w-0 items-center gap-2 rounded-xl border border-slate-200 px-3 text-slate-400 focus-within:border-[#176B4D] sm:w-56">
            <Search size={16} />
            <input value={searchValue} onChange={(event) => { onSearchChange?.(event.target.value); setPage(1); }} placeholder="Search reports" aria-label="Search reports" className="min-w-0 flex-1 bg-transparent text-xs text-[#172B3A] outline-none placeholder:text-slate-400" />
          </label>
          <label className="flex h-10 items-center gap-2 rounded-xl border border-slate-200 px-3 text-slate-500">
            <SlidersHorizontal size={15} />
            <select value={statusFilter} onChange={(event) => updateFilter(setStatusFilter, event.target.value)} aria-label="Filter by status" className="max-w-[132px] bg-transparent text-xs outline-none">
              {["All statuses", "Pending", "In Progress", "Resolved", "Rejected"].map((status) => <option key={status}>{status}</option>)}
            </select>
          </label>
          <label className="flex h-10 items-center rounded-xl border border-slate-200 px-3 text-slate-500">
            <select value={categoryFilter} onChange={(event) => updateFilter(setCategoryFilter, event.target.value)} aria-label="Filter by category" className="max-w-[150px] bg-transparent text-xs outline-none">
              <option>All categories</option>
              {categories.map((category) => <option key={category}>{category}</option>)}
            </select>
          </label>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[920px] border-collapse text-left">
          <thead><tr className="bg-slate-50/80 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
            <th className="px-5 py-3.5">Complaint ID</th><th className="px-4 py-3.5">Complaint title</th><th className="px-4 py-3.5">Category</th><th className="px-4 py-3.5">Submitted</th><th className="px-4 py-3.5">Location</th><th className="px-4 py-3.5">Status</th><th className="px-5 py-3.5 text-right">Action</th>
          </tr></thead>
          <tbody className="divide-y divide-slate-100">
            {pageItems.map((complaint) => <tr key={complaint.id} className="transition-colors hover:bg-slate-50/70">
              <td className="whitespace-nowrap px-5 py-4 text-xs font-semibold text-[#176B4D]">{complaint.id}</td>
              <td className="max-w-[240px] px-4 py-4"><p className="truncate text-xs font-semibold text-[#172B3A]">{complaint.title}</p></td>
              <td className="whitespace-nowrap px-4 py-4 text-xs text-slate-600">{complaint.category}</td>
              <td className="whitespace-nowrap px-4 py-4 text-xs text-slate-600">{formatComplaintDate(complaint.date)}</td>
              <td className="max-w-[190px] px-4 py-4"><p className="truncate text-xs text-slate-600">{complaint.location}</p></td>
              <td className="px-4 py-4"><span className={`inline-flex whitespace-nowrap rounded-full px-2.5 py-1 text-[10px] font-semibold ring-1 ring-inset ${statusStyles[complaint.status] || "bg-slate-100 text-slate-600 ring-slate-200"}`}>{complaint.status}</span></td>
              <td className="px-5 py-4 text-right"><Link to={`/citizen/complaints/${complaint.id}`} className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-[#176B4D] transition-colors hover:bg-emerald-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#176B4D]">Details <ExternalLink size={13} /></Link></td>
            </tr>)}
            {pageItems.length === 0 && <tr><td colSpan="7" className="px-5 py-14 text-center"><p className="text-sm font-semibold text-[#172B3A]">No complaints match these filters</p><p className="mt-1 text-xs text-slate-500">Try another search or clear a filter.</p></td></tr>}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col gap-3 border-t border-slate-100 px-5 py-3.5 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
        <span>Showing {filteredComplaints.length ? (page - 1) * pageSize + 1 : 0}–{Math.min(page * pageSize, filteredComplaints.length)} of {filteredComplaints.length} complaints</span>
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <button type="button" disabled={page <= 1} onClick={() => setPage((current) => Math.max(1, current - 1))} aria-label="Previous page" className="grid size-8 place-items-center rounded-lg border border-slate-200 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"><ChevronLeft size={16} /></button>
          <span className="min-w-16 text-center">Page {page} of {pageCount}</span>
          <button type="button" disabled={page >= pageCount} onClick={() => setPage((current) => Math.min(pageCount, current + 1))} aria-label="Next page" className="grid size-8 place-items-center rounded-lg border border-slate-200 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"><ChevronRight size={16} /></button>
        </div>
      </div>
    </section>
  );
}

export default RecentComplaints;
