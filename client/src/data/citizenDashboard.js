export const initialComplaints = [
  {
    id: "CF-2026-0184",
    title: "Pothole causing traffic near school crossing",
    category: "Roads & Potholes",
    date: "2026-11-08T09:15:00.000Z",
    location: "Lakeview Road, Ward 04",
    status: "In Progress",
    description: "A deep pothole near the school crossing is affecting traffic and pedestrian safety.",
  },
  {
    id: "CF-2026-0179",
    title: "Water leaking from roadside pipe",
    category: "Water & Drainage",
    date: "2026-11-06T12:40:00.000Z",
    location: "Green Park, Block B",
    status: "Pending",
    description: "Continuous water leakage from a roadside pipe near the park entrance.",
  },
  {
    id: "CF-2026-0162",
    title: "Streetlight out on the east pathway",
    category: "Street Lighting",
    date: "2026-11-02T17:30:00.000Z",
    location: "Riverside Walk, Ward 07",
    status: "Resolved",
    description: "The streetlight on the east pathway was not working after sunset.",
  },
  {
    id: "CF-2026-0155",
    title: "Overflowing community waste bin",
    category: "Garbage & Sanitation",
    date: "2026-10-30T07:50:00.000Z",
    location: "Market Square, Central Ward",
    status: "Resolved",
    description: "The community waste bin beside the market was overflowing onto the footpath.",
  },
  {
    id: "CF-2026-0148",
    title: "Blocked storm drain after rainfall",
    category: "Drainage",
    date: "2026-10-27T14:05:00.000Z",
    location: "Meadow Lane, Ward 03",
    status: "Rejected",
    description: "Water was pooling near the curb after heavy rain.",
  },
  {
    id: "CF-2026-0136",
    title: "Broken pavement tile near bus stop",
    category: "Public Infrastructure",
    date: "2026-10-22T10:25:00.000Z",
    location: "Civic Centre Bus Stop",
    status: "In Progress",
    description: "Several pavement tiles are raised and create a tripping hazard.",
  },
];

export const initialNotifications = [
  {
    id: "notice-1",
    title: "Crew assigned to your report",
    message: "CF-2026-0184 is now in progress.",
    time: "Today, 10:42 AM",
    unread: true,
  },
  {
    id: "notice-2",
    title: "Issue resolved",
    message: "CF-2026-0162 has been marked resolved.",
    time: "Nov 4, 4:18 PM",
    unread: true,
  },
  {
    id: "notice-3",
    title: "Report received",
    message: "Your report CF-2026-0179 is in the review queue.",
    time: "Nov 6, 12:41 PM",
    unread: false,
  },
];

const COMPLAINTS_KEY = "civicfix.citizen.complaints";
const NOTIFICATIONS_KEY = "civicfix.citizen.notifications";

function readStorage(key, fallback) {
  try {
    const saved = window.localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch {
    return fallback;
  }
}

export function getComplaints() {
  return readStorage(COMPLAINTS_KEY, initialComplaints);
}

export function saveComplaint(complaint) {
  const complaints = [complaint, ...getComplaints()];
  window.localStorage.setItem(COMPLAINTS_KEY, JSON.stringify(complaints));
  return complaints;
}

export function getNotifications() {
  return readStorage(NOTIFICATIONS_KEY, initialNotifications);
}

export function saveNotifications(notifications) {
  window.localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(notifications));
}

export function formatComplaintDate(date) {
  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}
