import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, CalendarDays, MapPin, Tag } from "lucide-react";
import { formatComplaintDate, getComplaints } from "../../data/citizenDashboard";

const statusTones = {
  Pending: "bg-amber-50 text-amber-700",
  "In Progress": "bg-blue-50 text-blue-700",
  Resolved: "bg-emerald-50 text-emerald-700",
  Rejected: "bg-rose-50 text-rose-700",
};

function ComplaintDetails() {
  const { complaintId } = useParams();
  const complaint = useMemo(() => getComplaints().find((item) => item.id === complaintId), [complaintId]);

  if (!complaint) {
    return <section className="mx-auto max-w-xl rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm"><h1 className="text-xl font-bold text-[#102C46]">Complaint not found</h1><p className="mt-2 text-sm text-slate-500">This reference doesn’t match a report in the current demo data.</p><Link to="/citizen/complaints" className="mt-5 inline-flex text-sm font-semibold text-[#176B4D] hover:underline">Back to complaints</Link></section>;
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <Link to="/citizen/complaints" className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition-colors hover:text-[#176B4D]"><ArrowLeft size={16} /> All complaints</Link>
      <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <header className="border-b border-slate-100 bg-slate-50/70 p-6 sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-3"><span className="text-xs font-semibold tracking-wide text-[#176B4D]">{complaint.id}</span><span className={`rounded-full px-3 py-1.5 text-xs font-semibold ${statusTones[complaint.status] || "bg-slate-100 text-slate-600"}`}>{complaint.status}</span></div>
          <h1 className="mt-4 text-2xl font-bold leading-tight text-[#102C46]">{complaint.title}</h1>
          <p className="mt-2 text-sm text-slate-500">Your report details and latest status.</p>
        </header>
        <div className="space-y-6 p-6 sm:p-8">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex items-start gap-3 rounded-xl border border-slate-100 p-4"><Tag size={17} className="mt-0.5 text-[#176B4D]" /><div><p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Category</p><p className="mt-1 text-sm font-medium text-[#172B3A]">{complaint.category}</p></div></div>
            <div className="flex items-start gap-3 rounded-xl border border-slate-100 p-4"><CalendarDays size={17} className="mt-0.5 text-[#176B4D]" /><div><p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Submitted</p><p className="mt-1 text-sm font-medium text-[#172B3A]">{formatComplaintDate(complaint.date)}</p></div></div>
            <div className="flex items-start gap-3 rounded-xl border border-slate-100 p-4 sm:col-span-2"><MapPin size={17} className="mt-0.5 text-[#176B4D]" /><div><p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Location</p><p className="mt-1 text-sm font-medium text-[#172B3A]">{complaint.location}</p>{complaint.coordinates && <><a href={`https://www.openstreetmap.org/?mlat=${complaint.coordinates.latitude}&mlon=${complaint.coordinates.longitude}#map=17/${complaint.coordinates.latitude}/${complaint.coordinates.longitude}`} target="_blank" rel="noreferrer" className="mt-2 inline-flex text-xs font-semibold text-[#176B4D] hover:underline">View selected area on OpenStreetMap</a></>}</div></div>
          </div>
          <section><h2 className="text-sm font-semibold text-[#172B3A]">Description</h2><p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-slate-600">{complaint.description || "No additional description was provided."}</p></section>
          <section className="rounded-xl border border-[#176B4D]/15 bg-[#176B4D]/[0.04] p-4"><h2 className="text-sm font-semibold text-[#102C46]">Status update</h2><p className="mt-1 text-xs leading-5 text-slate-600">{complaint.status === "Resolved" ? "This issue has been marked as resolved in the sample tracker." : complaint.status === "Rejected" ? "This report was not accepted for municipal action in the sample tracker." : complaint.status === "In Progress" ? "A municipal team is currently working on this report." : "Your report is in the review queue. You’ll see updates here as its status changes."}</p></section>
        </div>
      </article>
      <p className="text-center text-xs text-slate-400">Demo status information is stored locally and is not connected to a municipal system.</p>
    </div>
  );
}

export default ComplaintDetails;
