import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { ArrowLeft, FilePlus2, FileText, LoaderCircle, MapPin, Paperclip, Send, UploadCloud, X } from "lucide-react";
import { saveComplaint } from "../../data/citizenDashboard";

const categories = ["Roads & Potholes", "Garbage & Sanitation", "Water & Drainage", "Electricity & Streetlights", "Drainage", "Public Infrastructure"];

function CreateComplaint() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: "", category: "", location: "", description: "" });
  const [errors, setErrors] = useState({});
  const [attachments, setAttachments] = useState([]);
  const [attachmentError, setAttachmentError] = useState("");
  const [coordinates, setCoordinates] = useState(null);
  const [isLocating, setIsLocating] = useState(false);
  const [locationMessage, setLocationMessage] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    if (name === "location") setCoordinates(null);
    if (errors[name]) setErrors((current) => ({ ...current, [name]: "" }));
    if (name === "location") setLocationMessage("");
  };

  const addAttachments = (fileList) => {
    const files = Array.from(fileList || []);
    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "application/pdf"];
    const maxSize = 10 * 1024 * 1024;

    if (attachments.length + files.length > 5) {
      setAttachmentError("You can attach up to 5 files.");
      return;
    }

    const invalidFile = files.find((file) => !allowedTypes.includes(file.type) || file.size > maxSize);
    if (invalidFile) {
      setAttachmentError("Use JPG, PNG, WebP, or PDF files up to 10 MB each.");
      return;
    }

    setAttachments((current) => [
      ...current,
      ...files.map((file) => ({
        id: `${file.name}-${file.lastModified}-${Math.random()}`,
        file,
        preview: file.type.startsWith("image/") ? URL.createObjectURL(file) : null,
      })),
    ]);
    setAttachmentError("");
  };

  const removeAttachment = (attachmentId) => {
    setAttachments((current) => {
      const attachment = current.find((item) => item.id === attachmentId);
      if (attachment?.preview) URL.revokeObjectURL(attachment.preview);
      return current.filter((item) => item.id !== attachmentId);
    });
  };

  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      setLocationMessage("Your browser does not support location access. Enter the location manually.");
      return;
    }

    setIsLocating(true);
    setLocationMessage("Finding your area, city, and state…");
    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        const latitude = Number(coords.latitude.toFixed(6));
        const longitude = Number(coords.longitude.toFixed(6));
        const savedCoordinates = { latitude, longitude };

        try {
          const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`, {
            headers: { Accept: "application/json" },
          });
          if (!response.ok) throw new Error("Address lookup failed");

          const result = await response.json();
          const address = result.address || {};
          const area = address.neighbourhood || address.suburb || address.village || address.town || address.city_district;
          const city = address.city || address.town || address.municipality || address.county;
          const state = address.state || address.region;
          const readableLocation = [area, city, state].filter(Boolean).filter((value, index, values) => values.indexOf(value) === index).join(", ");

          if (!readableLocation) throw new Error("No readable address found");
          setForm((current) => ({ ...current, location: readableLocation }));
          setLocationMessage("Current location selected. You can edit the address if needed.");
        } catch {
          setForm((current) => ({ ...current, location: "Current location selected — add your area, city, and state" }));
          setLocationMessage("We could not convert GPS into an address. Please enter the area, city, and state manually.");
        }

        setCoordinates(savedCoordinates);
        setErrors((current) => ({ ...current, location: "" }));
        setIsLocating(false);
      },
      (error) => {
        const message = error.code === error.PERMISSION_DENIED
          ? "Location permission was denied. Allow access in your browser or enter the location manually."
          : error.code === error.TIMEOUT
            ? "Location lookup timed out. Try again or enter the location manually."
            : "Could not determine your location. Check device location services or enter it manually.";
        setLocationMessage(message);
        setIsLocating(false);
      },
      { enableHighAccuracy: true, timeout: 12000, maximumAge: 60000 },
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = {};
    for (const field of ["title", "category", "location", "description"]) {
      if (!form[field].trim()) nextErrors[field] = "This field is required.";
    }
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    const now = new Date();
    const complaint = {
      ...form,
      title: form.title.trim(),
      location: form.location.trim(),
      description: form.description.trim(),
      coordinates,
      attachments: attachments.map(({ file }) => ({
        name: file.name,
        type: file.type,
        size: file.size,
      })),
      id: `CF-${now.getFullYear()}-${String(now.getTime()).slice(-6)}`,
      date: now.toISOString(),
      status: "Pending",
    };
    saveComplaint(complaint);
    toast.success(`Report ${complaint.id} submitted`);
    navigate("/citizen/complaints");
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <Link to="/citizen/dashboard" className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition-colors hover:text-[#176B4D]"><ArrowLeft size={16} /> Back to dashboard</Link>
      <header><span className="mb-3 inline-flex size-11 items-center justify-center rounded-xl bg-[#176B4D]/10 text-[#176B4D]"><FilePlus2 size={21} /></span><h1 className="text-2xl font-bold tracking-tight text-[#102C46] sm:text-3xl">Report a civic issue</h1><p className="mt-2 text-sm text-slate-500">Share the details so the right city team can review it.</p></header>
      <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7" noValidate>
        <div>
          <label htmlFor="complaint-title" className="mb-2 block text-sm font-semibold text-[#172B3A]">Issue title</label>
          <input id="complaint-title" name="title" value={form.title} onChange={handleChange} maxLength={100} placeholder="e.g. Deep pothole near the school crossing" className="h-11 w-full rounded-xl border border-slate-200 px-3.5 text-sm outline-none transition focus:border-[#176B4D] focus:ring-2 focus:ring-[#176B4D]/10" aria-invalid={Boolean(errors.title)} />
          {errors.title && <p className="mt-1 text-xs text-rose-600">{errors.title}</p>}
        </div>
        <div>
          <label htmlFor="complaint-category" className="mb-2 block text-sm font-semibold text-[#172B3A]">Category</label>
          <select id="complaint-category" name="category" value={form.category} onChange={handleChange} className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3.5 text-sm text-[#172B3A] outline-none transition focus:border-[#176B4D] focus:ring-2 focus:ring-[#176B4D]/10" aria-invalid={Boolean(errors.category)}>
            <option value="">Select the closest category</option>{categories.map((category) => <option key={category}>{category}</option>)}
          </select>
          {errors.category && <p className="mt-1 text-xs text-rose-600">{errors.category}</p>}
        </div>
        <div>
          <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
            <label htmlFor="complaint-location" className="text-sm font-semibold text-[#172B3A]">Location</label>
            <button type="button" onClick={handleUseCurrentLocation} disabled={isLocating} className="inline-flex min-h-9 items-center gap-2 rounded-lg border border-[#176B4D]/20 bg-[#176B4D]/[0.04] px-3 text-xs font-semibold text-[#176B4D] transition hover:border-[#176B4D]/40 hover:bg-[#176B4D]/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#176B4D] disabled:cursor-wait disabled:opacity-60">
              {isLocating ? <LoaderCircle size={15} className="animate-spin" aria-hidden="true" /> : <MapPin size={15} aria-hidden="true" />}
              {isLocating ? "Finding location…" : "Use my current location"}
            </button>
          </div>
          <div className="relative"><MapPin size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" /><input id="complaint-location" name="location" value={form.location} onChange={handleChange} maxLength={140} placeholder="Street, area, ward or nearby landmark" className="h-11 w-full rounded-xl border border-slate-200 pl-10 pr-3.5 text-sm outline-none transition focus:border-[#176B4D] focus:ring-2 focus:ring-[#176B4D]/10" aria-invalid={Boolean(errors.location)} /></div>
          {errors.location && <p className="mt-1 text-xs text-rose-600">{errors.location}</p>}
          {locationMessage && <p role="status" aria-live="polite" className={`mt-1.5 text-xs ${locationMessage.startsWith("Location selected") ? "text-[#176B4D]" : "text-slate-500"}`}>{locationMessage}</p>}
          <p className="mt-1 text-xs text-slate-400">Your browser will ask for permission. The selected address stays editable.</p>
        </div>
         <div>
           <div className="mb-2 flex items-center justify-between gap-3"><label htmlFor="complaint-description" className="text-sm font-semibold text-[#172B3A]">Description</label><span className="text-xs text-slate-400">{form.description.length}/1000</span></div>
           <textarea id="complaint-description" name="description" value={form.description} onChange={handleChange} maxLength={1000} rows={5} placeholder="Describe what happened, when you noticed it, and any safety concerns." className="w-full resize-y rounded-xl border border-slate-200 px-3.5 py-3 text-sm leading-6 outline-none transition focus:border-[#176B4D] focus:ring-2 focus:ring-[#176B4D]/10" aria-invalid={Boolean(errors.description)} />
           {errors.description && <p className="mt-1 text-xs text-rose-600">{errors.description}</p>}
         </div>
         <div>
           <div className="mb-2 flex items-center justify-between gap-3"><div><p className="text-sm font-semibold text-[#172B3B]">Supporting files <span className="font-normal text-slate-400">(optional)</span></p><p className="mt-1 text-xs text-slate-500">Add photos or documents that help explain the issue.</p></div><span className="text-xs text-slate-400">{attachments.length}/5</span></div>
           <label htmlFor="complaint-attachments" className="flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50/70 px-4 py-6 text-center transition hover:border-[#176B4D]/50 hover:bg-[#176B4D]/[0.03]">
             <UploadCloud size={24} className="text-[#176B4D]" />
             <span className="mt-2 text-sm font-semibold text-[#172B3A]">Choose files or drag them here</span>
             <span className="mt-1 text-xs text-slate-500">JPG, PNG, WebP, or PDF · up to 10 MB each</span>
             <input id="complaint-attachments" type="file" multiple accept="image/jpeg,image/png,image/webp,application/pdf" onChange={(event) => { addAttachments(event.target.files); event.target.value = ""; }} className="sr-only" />
           </label>
           {attachmentError && <p role="alert" className="mt-1.5 text-xs text-rose-600">{attachmentError}</p>}
           {attachments.length > 0 && <ul className="mt-3 grid gap-2 sm:grid-cols-2">{attachments.map((attachment) => <li key={attachment.id} className="flex min-w-0 items-center gap-3 rounded-xl border border-slate-200 bg-white p-2.5"><span className="grid size-10 shrink-0 place-items-center overflow-hidden rounded-lg bg-slate-100 text-slate-500">{attachment.preview ? <img src={attachment.preview} alt="" className="size-full object-cover" /> : <FileText size={18} />}</span><span className="min-w-0 flex-1"><span className="block truncate text-xs font-semibold text-[#172B3A]">{attachment.file.name}</span><span className="mt-0.5 block text-[10px] text-slate-500">{(attachment.file.size / 1024 / 1024).toFixed(2)} MB</span></span><button type="button" onClick={() => removeAttachment(attachment.id)} className="rounded-lg p-1.5 text-slate-400 transition hover:bg-rose-50 hover:text-rose-600" aria-label={`Remove ${attachment.file.name}`}><X size={15} /></button></li>)}</ul>}
+           <p className="mt-2 flex items-center gap-1.5 text-xs text-slate-400"><Paperclip size={13} /> Files are stored as metadata in this frontend demo.</p>
+         </div>
+         <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">
          <Link to="/citizen/dashboard" className="inline-flex min-h-11 items-center justify-center rounded-xl border border-slate-200 px-5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50">Cancel</Link>
          <button type="submit" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#176B4D] px-5 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-[#13543d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#176B4D] focus-visible:ring-offset-2"><Send size={16} /> Submit report</button>
        </div>
      </form>
      <p className="text-center text-xs text-slate-400">This demo saves submissions in this browser only. No backend is connected.</p>
    </div>
  );
}

export default CreateComplaint;
