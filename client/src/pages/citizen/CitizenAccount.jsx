import { useState } from "react";
import { useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { BellRing, Check, Save, ShieldCheck, UserRound } from "lucide-react";

const PROFILE_KEY = "civicfix.citizen.profile";
const PREFERENCES_KEY = "civicfix.citizen.preferences";

function readSaved(key, fallback) {
  try {
    const saved = window.localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch {
    return fallback;
  }
}

function CitizenAccount() {
  const isSettings = useLocation().pathname.endsWith("/settings");
  const [profile, setProfile] = useState(() => readSaved(PROFILE_KEY, { name: "Citizen Jordan", email: "jordan@example.com", phone: "" }));
  const [preferences, setPreferences] = useState(() => readSaved(PREFERENCES_KEY, { emailUpdates: true, statusUpdates: true, productNews: false }));

  const saveProfile = (event) => {
    event.preventDefault();
    window.localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
    toast.success("Profile saved in this browser");
  };

  const togglePreference = (name) => {
    const updated = { ...preferences, [name]: !preferences[name] };
    setPreferences(updated);
    window.localStorage.setItem(PREFERENCES_KEY, JSON.stringify(updated));
    toast.success("Preferences updated");
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <header><p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#176B4D]">Account</p><h1 className="mt-2 text-2xl font-bold tracking-tight text-[#102C46]">{isSettings ? "Settings" : "My profile"}</h1><p className="mt-1 text-sm text-slate-500">Manage your citizen portal details and preferences.</p></header>
      {isSettings ? <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7"><div className="flex items-center gap-3 border-b border-slate-100 pb-5"><span className="grid size-10 place-items-center rounded-xl bg-[#176B4D]/10 text-[#176B4D]"><BellRing size={19} /></span><div><h2 className="text-sm font-bold text-[#172B3A]">Notification preferences</h2><p className="mt-1 text-xs text-slate-500">Choose which updates you want to receive.</p></div></div><div className="divide-y divide-slate-100">{[["emailUpdates", "Email notifications", "Receive important account and city service emails."], ["statusUpdates", "Complaint status updates", "Get notified when a report is reviewed or updated."], ["productNews", "CivicFix news", "Occasional platform announcements and community news."]].map(([name, label, description]) => <label key={name} className="flex cursor-pointer items-start justify-between gap-4 py-4"><span><span className="block text-sm font-semibold text-[#172B3A]">{label}</span><span className="mt-1 block text-xs leading-5 text-slate-500">{description}</span></span><input type="checkbox" checked={preferences[name]} onChange={() => togglePreference(name)} className="mt-1 size-4 shrink-0 accent-[#176B4D]" aria-label={label} /></label>)}</div><p className="mt-3 text-xs text-slate-400">Preferences are saved in this browser for this demo.</p></section> : <form onSubmit={saveProfile} className="space-y-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7"><div className="flex items-center gap-3 border-b border-slate-100 pb-5"><span className="grid size-10 place-items-center rounded-xl bg-[#176B4D]/10 text-[#176B4D]"><UserRound size={19} /></span><div><h2 className="text-sm font-bold text-[#172B3A]">Personal information</h2><p className="mt-1 text-xs text-slate-500">Update the contact details used for your reports.</p></div></div><label className="block text-sm font-semibold text-[#172B3A]">Full name<input value={profile.name} onChange={(event) => setProfile((current) => ({ ...current, name: event.target.value }))} required className="mt-2 h-11 w-full rounded-xl border border-slate-200 px-3.5 text-sm font-normal outline-none focus:border-[#176B4D] focus:ring-2 focus:ring-[#176B4D]/10" /></label><label className="block text-sm font-semibold text-[#172B3A]">Email address<input type="email" value={profile.email} onChange={(event) => setProfile((current) => ({ ...current, email: event.target.value }))} required className="mt-2 h-11 w-full rounded-xl border border-slate-200 px-3.5 text-sm font-normal outline-none focus:border-[#176B4D] focus:ring-2 focus:ring-[#176B4D]/10" /></label><label className="block text-sm font-semibold text-[#172B3A]">Phone number<input type="tel" value={profile.phone} onChange={(event) => setProfile((current) => ({ ...current, phone: event.target.value }))} placeholder="Add a contact number" className="mt-2 h-11 w-full rounded-xl border border-slate-200 px-3.5 text-sm font-normal outline-none focus:border-[#176B4D] focus:ring-2 focus:ring-[#176B4D]/10" /></label><div className="flex items-start gap-2 rounded-xl bg-slate-50 p-3 text-xs leading-5 text-slate-500"><ShieldCheck size={15} className="mt-0.5 shrink-0 text-[#176B4D]" /> Profile updates are stored locally for this demo; authentication and server-side profile sync are not connected.</div><button type="submit" className="inline-flex min-h-10 items-center gap-2 rounded-xl bg-[#176B4D] px-4 text-sm font-semibold text-white transition hover:bg-[#13543d]"><Save size={16} /> Save profile</button></form>}
      <p className="flex items-center justify-center gap-1.5 text-xs text-slate-400"><Check size={13} /> Your data is currently stored only in this browser.</p>
    </div>
  );
}

export default CitizenAccount;
