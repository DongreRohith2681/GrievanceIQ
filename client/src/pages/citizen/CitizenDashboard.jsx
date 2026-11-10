import { useMemo } from "react";
import { useOutletContext } from "react-router-dom";
import ActivityTimeline from "../../components/dashboard/ActivityTimeline";
import QuickActions from "../../components/dashboard/QuickActions";
import RecentComplaints from "../../components/dashboard/RecentComplaints";
import StatsOverview from "../../components/dashboard/StatsOverview";
import WelcomeSection from "../../components/dashboard/WelcomeSection";
import { getComplaints } from "../../data/citizenDashboard";

function CitizenDashboard() {
  const { searchQuery, setSearchQuery } = useOutletContext();
  const complaints = useMemo(() => [...getComplaints()].sort((a, b) => new Date(b.date) - new Date(a.date)), []);

  return (
    <div className="dashboard-enter space-y-7">
      <WelcomeSection />
      <StatsOverview complaints={complaints} />
      <QuickActions />
      <div className="grid min-w-0 gap-5 2xl:grid-cols-[minmax(0,1fr)_360px]">
        <RecentComplaints complaints={complaints} searchValue={searchQuery} onSearchChange={setSearchQuery} />
        <ActivityTimeline />
      </div>
      <style>{`@keyframes dashboard-enter { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } } .dashboard-enter { animation: dashboard-enter .45s ease-out both; } @media (prefers-reduced-motion: reduce) { .dashboard-enter { animation: none; } }`}</style>
    </div>
  );
}

export default CitizenDashboard;
