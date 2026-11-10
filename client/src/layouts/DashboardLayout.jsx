import { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import DashboardNavbar from "../components/dashboard/DashboardNavbar";
import Sidebar from "../components/dashboard/Sidebar";
import { getNotifications, saveNotifications } from "../data/citizenDashboard";

function DashboardLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [notifications, setNotifications] = useState(getNotifications);
  const location = useLocation();
  const navigate = useNavigate();

  const openNotifications = (open = true) => {
    navigate(open ? "/citizen/dashboard#notifications" : location.pathname);
    setMobileOpen(false);
  };

  const markAllRead = () => {
    const updated = notifications.map((notification) => ({ ...notification, unread: false }));
    setNotifications(updated);
    saveNotifications(updated);
    toast.success("Notifications marked as read");
  };

  return (
    <div className="flex min-h-screen bg-[#F4F7FA] text-[#172B3A]">
      <Sidebar
        collapsed={collapsed}
        onToggle={() => setCollapsed((value) => !value)}
        mobileOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        onOpenNotifications={() => openNotifications(true)}
      />
      <div className="flex min-h-screen min-w-0 flex-1 flex-col">
        <DashboardNavbar
          searchValue={searchQuery}
          onSearchChange={setSearchQuery}
          notifications={notifications}
          onMarkAllRead={markAllRead}
          onOpenNotifications={openNotifications}
          mobileMenuOpen={() => setMobileOpen(true)}
        />
        <main className="min-w-0 flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          <div className="mx-auto w-full max-w-[1480px]">
            <Outlet context={{ searchQuery, setSearchQuery }} />
          </div>
        </main>
      </div>
      <Toaster position="top-right" toastOptions={{ duration: 3500 }} />
    </div>
  );
}

export default DashboardLayout;
