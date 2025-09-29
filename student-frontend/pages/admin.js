import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

export default function AdminDashboard() {
  const router = useRouter();
  const [applications, setApplications] = useState([]);
  const [filter, setFilter] = useState("");

  // Check admin authorization
  useEffect(() => {
    const isAuthorized = sessionStorage.getItem("adminAuthorized");
    if (!isAuthorized) {
      router.push("/admin-login");
    } else {
      fetchApplications();
    }
  }, [router]);

  // Fetch applications from backend
  const fetchApplications = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/applications/");
      setApplications(res.data);
    } catch (err) {
      console.error("Failed to fetch applications:", err);
    }
  };

  // Logout function
  const handleLogout = () => {
    sessionStorage.removeItem("adminAuthorized");
    router.push("/admin-login");
  };

  // Filter applications safely
  const filteredApps = applications.filter((app) => {
    const name = app.full_name ? String(app.full_name).toLowerCase() : "";
    const course = app.course_applied ? String(app.course_applied).toLowerCase() : "";
    const search = String(filter).toLowerCase();
    return name.includes(search) || course.includes(search);
  });

  return (
    <div style={{ maxWidth: "800px", margin: "50px auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2>Admin Dashboard</h2>
        <button onClick={handleLogout} style={{ padding: "5px 10px" }}>Logout</button>
      </div>

      <input
        type="text"
        placeholder="Search by name or course"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        style={{ width: "100%", marginBottom: "20px", padding: "8px" }}
      />

      <table border="1" cellPadding="10" style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Course</th>
            <th>Submitted At</th>
          </tr>
        </thead>
        <tbody>
          {filteredApps.map((app) => (
            <tr key={app.id}>
              <td>{app.full_name || "-"}</td>
              <td>{app.email || "-"}</td>
              <td>{app.phone_number || "-"}</td>
              <td>{app.course_applied || "-"}</td>
              <td>{app.submitted_at ? new Date(app.submitted_at).toLocaleString() : "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
