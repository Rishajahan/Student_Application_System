import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function Apply() {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone_number: "",
    course_applied: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic client-side validation
    if (!formData.full_name || !formData.email || !formData.phone_number || !formData.course_applied) {
      toast.error("Please fill all fields!");
      return;
    }

    try {
      await axios.post("http://127.0.0.1:8000/api/applications/", formData);
      toast.success("Application submitted successfully!");
      setFormData({ full_name: "", email: "", phone_number: "", course_applied: "" });
    } catch (error) {
      toast.error("Failed to submit application!");
      console.error(error);
    }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "50px auto" }}>
      <h2>Apply Now</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="full_name"
          placeholder="Full Name"
          value={formData.full_name}
          onChange={handleChange}
          style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
        />
        <input
          type="text"
          name="phone_number"
          placeholder="Phone Number"
          value={formData.phone_number}
          onChange={handleChange}
          style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
        />
        <input
          type="text"
          name="course_applied"
          placeholder="Course"
          value={formData.course_applied}
          onChange={handleChange}
          style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
        />
        <button type="submit" style={{ padding: "10px 20px" }}>Submit</button>
      </form>
      <ToastContainer />
    </div>
  );
}
<ToastContainer position="top-right" autoClose={3000} />
