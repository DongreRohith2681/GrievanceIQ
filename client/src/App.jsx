import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CitizenDashboard from "./pages/citizen/CitizenDashboard";
import CreateComplaint from "./pages/citizen/CreateComplaint";
import MyComplaints from "./pages/citizen/MyComplaints";
import TrackComplaint from "./pages/citizen/TrackComplaint";
import ComplaintDetails from "./pages/citizen/ComplaintDetails";
import CitizenAccount from "./pages/citizen/CitizenAccount";
import DashboardLayout from "./layouts/DashboardLayout";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/citizen" element={<DashboardLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<CitizenDashboard />} />
          <Route path="complaints/new" element={<CreateComplaint />} />
          <Route path="complaints" element={<MyComplaints />} />
          <Route path="complaints/:complaintId" element={<ComplaintDetails />} />
          <Route path="track" element={<TrackComplaint />} />
          <Route path="profile" element={<CitizenAccount />} />
          <Route path="settings" element={<CitizenAccount />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
