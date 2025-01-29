import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";  // Framer Motion for animations
import { FaUser, FaEnvelope, FaPhone, FaLock } from "react-icons/fa";  // React Icons for adding icons
import { ToastContainer, toast } from "react-toastify"; // React-toastify for toast notifications
import "react-toastify/dist/ReactToastify.css"; // Toast styling

function RegisterPage() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phoneNumber: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/register", formData);
      setMessage(response.data.message);
      toast.success(response.data.message); // Display success toast
    } catch (error) {
      console.error("Error details:", error.response || error);
      setMessage(error.response ? error.response.data.message : "There was an error with the registration.");
      toast.error(error.response ? error.response.data.message : "There was an error.");
    }
  };

  return (
    <section style={{
      display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", 
      background: "linear-gradient(360deg, rgba(0, 0, 0, 0.5), rgba(67, 5, 75, 0.4))"
    }}>
      <motion.div
        className="content"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        style={{
          width: "100%", maxWidth: "500px", padding: "2rem", backgroundColor: "#fff", 
          borderRadius: "8px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)"
        }}
      >
        <h2 style={{ textAlign: "center", color: "#4e8a8b", marginBottom: "20px" }}>Register</h2>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <label style={{ display: "flex", flexDirection: "column" }}>
            <FaUser style={{ marginBottom: "5px" }} />
            <span style={{ color: "#333" }}>Username:</span>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              style={{
                padding: "10px", border: "1px solid #ccc", borderRadius: "4px", fontSize: "16px", 
                marginTop: "5px", color: "darkgray"
              }}
            />
          </label>
          <label style={{ display: "flex", flexDirection: "column" }}>
            <FaEnvelope style={{ marginBottom: "5px" }} />
            <span style={{ color: "#333" }}>Email:</span>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              style={{
                padding: "10px", border: "1px solid #ccc", borderRadius: "4px", fontSize: "16px", marginTop: "5px"
              }}
            />
          </label>
          <label style={{ display: "flex", flexDirection: "column" }}>
            <FaPhone style={{ marginBottom: "5px" }} />
            <span style={{ color: "#333" }}>Phone Number:</span>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
              style={{
                padding: "10px", border: "1px solid #ccc", borderRadius: "4px", fontSize: "16px", marginTop: "5px"
              }}
            />
          </label>
          <label style={{ display: "flex", flexDirection: "column" }}>
            <FaLock style={{ marginBottom: "5px" }} />
            <span style={{ color: "#333" }}>Password:</span>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              style={{
                padding: "10px", border: "1px solid #ccc", borderRadius: "4px", fontSize: "16px", marginTop: "5px"
              }}
            />
          </label>
          <motion.button
            type="submit"
            style={{
              padding: "10px 20px", backgroundColor: "#4e8a8b", border: "none", borderRadius: "4px", 
              color: "#fff", cursor: "pointer", fontSize: "16px", transition: "background-color 0.3s ease"
            }}
            whileHover={{ backgroundColor: "#336c67" }}
          >
            Register
          </motion.button>
        </form>
        {message && <p style={{ color: "green", textAlign: "center", marginTop: "20px" }}>{message}</p>}
        <ToastContainer />
      </motion.div>
    </section>
  );
}

export default RegisterPage;
