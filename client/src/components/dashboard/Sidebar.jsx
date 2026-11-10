import { NavLink, useNavigate } from "react-router-dom";
import {
  Activity,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  FilePlus2,
  LayoutDashboard,
  LogOut,
  MapPinned,
  Settings2,
  UserRound,
  X,
} from "lucide-react";

const primaryLinks = [
  { to: "/citizen/dashboard", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/citizen/complaints/new", label: "Submit complaint", icon: FilePlus2 },
  { to: "/citizen/complaints", label: "My complaints", icon: ClipboardList, end: true },
  { to: "/citizen/track", label: "Track complaint", icon: MapPinned },
];

function Sidebar({ collapsed, onToggle, mobileOpen, onClose, onOpenNotifications }) {
  const navigate = useNavigate();
  const isCollapsed = mobileOpen ? false : collapsed;

  const handleLogout = () => {
    onClose();
    navigate("/login");
  };

  const linkClass = ({ isActive }) =>
    `group flex min-h-11 items-center gap-3 rounded-xl px-3 text-sm font-medium transition-colors ${
      isActive
        ? "bg-[#176B4D] text-white shadow-md shadow-[#176B4D]/15"
        : "text-slate-600 hover:bg-slate-100 hover:text-[#102C46]"
    }`;

  const sidebar = (
    <aside className={`flex h-full flex-col border-r border-slate-200 bg-white transition-[width,transform] duration-200 ${isCollapsed ? "w-[76px]" : "w-[256px]"}`}>
      <div className={`flex h-[76px] items-center border-b border-slate-100 ${isCollapsed ? "justify-center px-3" : "justify-between px-5"}`}>
        <button type="button" onClick={() => navigate("/citizen/dashboard")} className="flex min-w-0 items-center gap-3 rounded-lg text-left" aria-label="CivicFix dashboard">
          <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-[#102C46] text-white shadow-sm">
            <MapPinned size={20} />
          </span>
          {!isCollapsed && <span className="truncate text-lg font-bold tracking-tight text-[#102C46]">Civic<span className="text-[#176B4D]">Fix</span></span>}
        </button>
        {mobileOpen && <button type="button" onClick={onClose} className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 lg:hidden" aria-label="Close navigation"><X size={19} /></button>}
      </div>

      <nav aria-label="Citizen dashboard" className="flex-1 space-y-1 px-3 py-5">
        <p className={`mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400 ${isCollapsed ? "sr-only" : ""}`}>Workspace</p>
        {primaryLinks.map(({ to, label, icon: Icon, end }) => (
          <NavLink key={to} to={to} end={end} onClick={onClose} className={linkClass} title={isCollapsed ? label : undefined}>
            <Icon size={19} className="shrink-0" />
            {!isCollapsed && <span>{label}</span>}
          </NavLink>
        ))}
        <button type="button" onClick={onOpenNotifications} title={isCollapsed ? "Notifications" : undefined} className="group flex min-h-11 w-full items-center gap-3 rounded-xl px-3 text-left text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-[#102C46]">
          <Activity size={19} className="shrink-0" />
          {!isCollapsed && <span>Notifications</span>}
        </button>

        <p className={`mb-3 mt-8 px-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400 ${isCollapsed ? "sr-only" : ""}`}>Account</p>
        <NavLink to="/citizen/profile" onClick={onClose} className={linkClass} title={isCollapsed ? "My profile" : undefined}>
          <UserRound size={19} className="shrink-0" />
          {!isCollapsed && <span>My profile</span>}
        </NavLink>
        <NavLink to="/citizen/settings" onClick={onClose} className={linkClass} title={isCollapsed ? "Settings" : undefined}>
          <Settings2 size={19} className="shrink-0" />
          {!isCollapsed && <span>Settings</span>}
        </NavLink>
      </nav>

      <div className="border-t border-slate-100 p-3">
        <button type="button" onClick={handleLogout} title={isCollapsed ? "Log out" : undefined} className="flex min-h-11 w-full items-center gap-3 rounded-xl px-3 text-sm font-medium text-slate-500 transition-colors hover:bg-red-50 hover:text-red-700">
          <LogOut size={19} className="shrink-0" />
          {!isCollapsed && <span>Log out</span>}
        </button>
        {!mobileOpen && <button type="button" onClick={onToggle} className="mt-2 hidden min-h-10 w-full items-center justify-center rounded-xl text-slate-500 transition-colors hover:bg-slate-100 hover:text-[#102C46] lg:flex" aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}>
          {isCollapsed ? <ChevronRight size={18} /> : <><ChevronLeft size={18} /><span className="ml-2 text-xs">Collapse sidebar</span></>}
        </button>}
      </div>
    </aside>
  );

  return (
    <>
      <div className="hidden h-full shrink-0 lg:block">{sidebar}</div>
      {mobileOpen && <div className="fixed inset-0 z-50 lg:hidden">
        <button type="button" onClick={onClose} className="absolute inset-0 bg-[#102C46]/45 backdrop-blur-[2px]" aria-label="Close navigation overlay" />
        <div className="relative h-full w-[min(84vw,300px)] shadow-2xl">{sidebar}</div>
      </div>}
    </>
  );
}

export default Sidebar;
