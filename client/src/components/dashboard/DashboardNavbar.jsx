import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Bell, ChevronDown, Menu, Search, UserRound } from "lucide-react";

function DashboardNavbar({ searchValue, onSearchChange, notifications, onMarkAllRead, onOpenNotifications, mobileMenuOpen }) {
  const [profileOpen, setProfileOpen] = useState(false);
  const notificationRef = useRef(null);
  const profileRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const unreadCount = notifications.filter((item) => item.unread).length;

  const notificationsOpen = location.hash === "#notifications";

  useEffect(() => {
    const handlePointerDown = (event) => {
      if (notificationsOpen && !notificationRef.current?.contains(event.target)) onOpenNotifications(false);
      if (!profileRef.current?.contains(event.target)) setProfileOpen(false);
    };
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        if (notificationsOpen) onOpenNotifications(false);
        setProfileOpen(false);
      }
    };
    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [notificationsOpen, onOpenNotifications]);

  const toggleNotifications = () => {
    const nextOpen = !notificationsOpen;
    setProfileOpen(false);
    onOpenNotifications(nextOpen);
  };

  return (
    <header className="sticky top-0 z-30 flex min-h-[76px] items-center justify-between gap-3 border-b border-slate-200 bg-white/95 px-4 backdrop-blur-xl sm:px-6 lg:px-8">
      <div className="flex min-w-0 items-center gap-3">
        <button type="button" onClick={mobileMenuOpen} className="rounded-xl p-2 text-slate-600 hover:bg-slate-100 lg:hidden" aria-label="Open navigation"><Menu size={21} /></button>
        <div className="hidden min-w-0 sm:block">
          <p className="truncate text-sm font-semibold text-[#102C46]">Welcome back, Citizen!</p>
          <p className="text-xs text-slate-500">Here’s your community at a glance.</p>
        </div>
      </div>

      <label className="hidden h-10 w-full max-w-[340px] items-center gap-2.5 rounded-xl border border-slate-200 bg-slate-50 px-3 text-slate-400 transition focus-within:border-[#176B4D] focus-within:bg-white md:flex">
        <Search size={17} />
        <input value={searchValue} onChange={(event) => onSearchChange(event.target.value)} placeholder="Search complaints..." aria-label="Search complaints" className="min-w-0 flex-1 bg-transparent text-sm text-[#172B3A] outline-none placeholder:text-slate-400" />
        <kbd className="hidden rounded border border-slate-200 bg-white px-1.5 py-0.5 text-[10px] text-slate-400 lg:inline">⌘ K</kbd>
      </label>

      <div className="flex shrink-0 items-center gap-2 sm:gap-3">
        <div className="relative" ref={notificationRef}>
          <button type="button" onClick={toggleNotifications} aria-label={`Notifications${unreadCount ? `, ${unreadCount} unread` : ""}`} aria-expanded={notificationsOpen} className="relative grid size-10 place-items-center rounded-xl border border-slate-200 text-slate-600 transition-colors hover:border-[#176B4D]/30 hover:bg-[#176B4D]/5 hover:text-[#176B4D]">
            <Bell size={19} />
            {unreadCount > 0 && <span className="absolute right-2 top-2 size-2 rounded-full bg-rose-500 ring-2 ring-white" />}
          </button>
          {notificationsOpen && <div id="notifications" className="absolute right-0 top-12 z-50 w-[min(90vw,360px)] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-900/10">
            <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3.5">
              <div><h2 className="text-sm font-semibold text-[#102C46]">Notifications</h2><p className="mt-0.5 text-xs text-slate-500">{unreadCount ? `${unreadCount} unread update${unreadCount > 1 ? "s" : ""}` : "You’re all caught up"}</p></div>
              {unreadCount > 0 && <button type="button" onClick={onMarkAllRead} className="text-xs font-semibold text-[#176B4D] hover:underline">Mark all read</button>}
            </div>
            <ul className="max-h-80 divide-y divide-slate-100 overflow-y-auto">
              {notifications.map((notification) => <li key={notification.id} className={`flex gap-3 px-4 py-3.5 ${notification.unread ? "bg-emerald-50/50" : ""}`}>
                <span className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-lg bg-[#176B4D]/10 text-[#176B4D]"><Bell size={15} /></span>
                <div className="min-w-0 flex-1"><p className="text-xs font-semibold text-[#172B3A]">{notification.title}</p><p className="mt-1 text-xs leading-5 text-slate-500">{notification.message}</p><p className="mt-1 text-[10px] text-slate-400">{notification.time}</p></div>
                {notification.unread && <span className="mt-1.5 size-2 shrink-0 rounded-full bg-[#176B4D]" />}
              </li>)}
            </ul>
          </div>}
        </div>

        <div className="relative" ref={profileRef}>
          <button type="button" onClick={() => { setProfileOpen((open) => !open); if (notificationsOpen) onOpenNotifications(false); }} aria-expanded={profileOpen} className="flex items-center gap-2 rounded-xl p-1.5 transition-colors hover:bg-slate-50">
            <span className="grid size-9 place-items-center rounded-full bg-[#102C46] text-xs font-bold text-white">CJ</span>
            <span className="hidden text-left sm:block"><span className="block text-xs font-semibold text-[#172B3A]">Citizen Jordan</span><span className="block text-[10px] text-slate-500">Citizen account</span></span>
            <ChevronDown size={15} className={`hidden text-slate-400 transition-transform sm:block ${profileOpen ? "rotate-180" : ""}`} />
          </button>
          {profileOpen && <div className="absolute right-0 top-12 z-50 w-48 rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl">
            <Link onClick={() => setProfileOpen(false)} to="/citizen/profile" className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-slate-600 hover:bg-slate-50 hover:text-[#102C46]"><UserRound size={16} /> My profile</Link>
            <button type="button" onClick={() => { setProfileOpen(false); navigate("/login"); }} className="w-full rounded-lg px-3 py-2.5 text-left text-sm text-rose-600 hover:bg-rose-50">Log out</button>
          </div>}
        </div>
      </div>
    </header>
  );
}

export default DashboardNavbar;
