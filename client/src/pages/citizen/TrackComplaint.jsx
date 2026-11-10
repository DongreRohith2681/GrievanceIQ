import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, ClipboardList, MapPin } from "lucide-react";
import { formatComplaintDate, getComplaints } from "../../data/citizenDashboard";

function TrackComplaint() {
  const complaints = useMemo(() => getComplaints(), []);
  const [reference, setReference] = useState("");
  const [searched, setSearched] = useState(false);
  const result = searched ? complaints.find((complaint) => complaint.id.toLowerCase() === reference.trim().toLowerCase()) : null;

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <Link to="/citizen/dashboard" className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition-colors hover:text-[#176B4D]"><ArrowLeft size={16} /> Back to dashboard</Link>
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <span className="grid size-12 place-items-center rounded-2xl bg-[#176B4D]/10 text-[#176B4D]"><ClipboardList size={23} /></span>
        <h1 className="mt-5 text-2xl font-bold tracking-tight text-[#102C46]">Track a complaint</h1>
        <p className="mt-2 text-sm leading-6 text-slate-500">Enter the reference ID from your submission confirmation to see its latest status.</p>
        <form onSubmit={(event) => { event.preventDefault(); setSearched(true); }} className="mt-6 flex flex-col gap-3 sm:flex-row">
          <input value={reference} onChange={(event) => { setReference(event.target.value); setSearched(false); }} placeholder="e.g. CF-2026-0184" aria-label="Complaint reference ID" className="h-12 min-w-0 flex-1 rounded-xl border border-slate-200 px-4 text-sm uppercase outline-none transition focus:border-[#176B4D] focus:ring-2 focus:ring-[#176B4D]/10" />
          <button type="submit" disabled={!reference.trim()} className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[#176B4D] px-5 text-sm font-semibold text-white transition hover:bg-[#13543d] disabled:cursor-not-allowed disabled:opacity-50">Find report <ArrowRight size={16} /></button>
        </form>
        {searched && (result ? <article className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <div className="flex flex-wrap items-center justify-between gap-3"><span className="text-xs font-semibold text-[#176B4D]">{result.id}</span><span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-[#172B3A] ring-1 ring-slate-200">{result.status}</span></div>
          <h2 className="mt-3 font-semibold text-[#172B3A]">{result.title}</h2><p className="mt-1 text-xs text-slate-500">{result.category} · Submitted {formatComplaintDate(result.date)}</p><p className="mt-3 flex items-start gap-2 text-xs text-slate-600"><MapPin size={15} className="mt-0.5 shrink-0 text-[#176B4D]" />{result.location}</p>
          <Link to={`/citizen/complaints/${result.id}`} className="mt-4 inline-flex text-xs font-semibold text-[#176B4D] hover:underline">View full details</Link>
        </article> : <p role="status" className="mt-5 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">No report found with that ID. Check the reference and try again.</p>)}
      </section>
      <p className="text-center text-xs text-slate-400">Tracking searches the sample reports and submissions saved in this browser.</p>
    </div>
  );
}

export default TrackComplaint;
